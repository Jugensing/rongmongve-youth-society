import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import { Container, Img, Section, Tag } from '../components/ui'
import { sanityClient } from '../lib/sanity'
import { fmtDate } from '../lib/icons'
import { useTitle } from '../hooks/useTitle'

type RichTextBlock = {
  _key?: string
  _type: string
  style?: string
  children?: Array<{
    _key?: string
    _type: string
    text?: string
  }>
}

type SanityNews = {
  _id: string
  title: string
  slug?: {
    current: string
  }
  date: string
  category?: string
  excerpt?: string
  imageUrl?: string
  content?: RichTextBlock[]
}

type SanityEvent = {
  _id: string
  title: string
  slug?: {
    current: string
  }
  date: string
  location?: string
  description?: string
  imageUrl?: string
  content?: RichTextBlock[]
  highlights?: string[]
}

function RichText({
  content,
}: {
  content?: RichTextBlock[]
}) {
  if (!content?.length) return null

  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        if (block._type !== 'block') return null

        const text =
          block.children
            ?.map((child) => child.text || '')
            .join('') || ''

        if (!text.trim()) return null

        if (block.style === 'h2') {
          return (
            <h2
              key={block._key || index}
              className="pt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              {text}
            </h2>
          )
        }

        if (block.style === 'h3') {
          return (
            <h3
              key={block._key || index}
              className="pt-4 text-xl font-bold text-slate-900"
            >
              {text}
            </h3>
          )
        }

        return (
          <p
            key={block._key || index}
            className="text-[17px] leading-8 text-slate-600"
          >
            {text}
          </p>
        )
      })}
    </div>
  )
}

export default function Detail() {
  const { slug } = useParams()
  const location = useLocation()

  const isEvent = location.pathname.startsWith('/events')

  const [newsItem, setNewsItem] = useState<SanityNews | null>(null)
  const [eventItem, setEventItem] =
    useState<SanityEvent | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchContent = async () => {
      try {
        if (isEvent) {
          const data =
            await sanityClient.fetch<SanityEvent | null>(
              `*[_type == "event" && slug.current == $slug][0] {
                _id,
                title,
                slug,
                date,
                location,
                description,
                "imageUrl": coverImage.asset->url,
                content,
                highlights
              }`,
              { slug }
            )

          setEventItem(data)
        } else {
          const data =
            await sanityClient.fetch<SanityNews | null>(
              `*[_type == "news" && slug.current == $slug][0] {
                _id,
                title,
                slug,
                date,
                category,
                excerpt,
                "imageUrl": coverImage.asset->url,
                content
              }`,
              { slug }
            )

          setNewsItem(data)
        }
      } catch (error) {
        console.error(
          'Failed to fetch content from Sanity:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [slug, isEvent])

  useTitle(
    isEvent
      ? eventItem?.title ?? 'Event'
      : newsItem?.title ?? 'News'
  )

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <Section>
        <div className="py-20 text-center text-slate-500">
          Loading...
        </div>
      </Section>
    )
  }

  /* =====================================================
     EVENT NOT FOUND
  ===================================================== */

  if (isEvent && !eventItem) {
    return (
      <Section>
        <div className="mx-auto max-w-xl py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Event not found
          </h1>

          <p className="mt-2 text-slate-500">
            This event may have been removed or is no longer
            available.
          </p>

          <Link
            to="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </div>
      </Section>
    )
  }

  /* =====================================================
     NEWS NOT FOUND
  ===================================================== */

  if (!isEvent && !newsItem) {
    return (
      <Section>
        <div className="mx-auto max-w-xl py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Article not found
          </h1>

          <p className="mt-2 text-slate-500">
            This news article may have been removed or is no
            longer available.
          </p>

          <Link
            to="/news"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </div>
      </Section>
    )
  }

  /* =====================================================
     EVENT ARTICLE
  ===================================================== */

  if (isEvent && eventItem) {
    return (
      <article className="bg-white">

        {/* Header */}
        <div className="border-b border-slate-100 bg-slate-50">
          <Container className="max-w-5xl py-10 sm:py-14">

            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>

            <div className="mt-8 max-w-4xl">

              <Tag>Event</Tag>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {eventItem.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-medium text-slate-500">

                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {fmtDate(eventItem.date)}
                </span>

                {eventItem.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {eventItem.location}
                  </span>
                )}

              </div>

            </div>
          </Container>
        </div>

        {/* Cover Image */}
        <Container className="max-w-5xl">

          {eventItem.imageUrl ? (
            <div className="overflow-hidden rounded-b-3xl shadow-lg">
              <div className="aspect-[16/8]">
                <Img
                  src={eventItem.imageUrl}
                  alt={eventItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[16/8] items-center justify-center rounded-b-3xl bg-brand-tint">
              <div className="text-center">
                <p className="text-lg font-bold text-brand">
                  Rongmongve Youth Society
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Official Event
                </p>
              </div>
            </div>
          )}

        </Container>

        {/* Content */}
        <Container className="max-w-5xl py-12 sm:py-16">

          <div className="mx-auto max-w-3xl">

            {eventItem.description && (
              <p className="border-b border-slate-200 pb-8 text-xl font-medium leading-8 text-slate-700 sm:text-2xl sm:leading-9">
                {eventItem.description}
              </p>
            )}

            {eventItem.content && (
              <div className="pt-8">
                <RichText
                  content={eventItem.content}
                />
              </div>
            )}

            {/* Highlights */}
            {eventItem.highlights &&
              eventItem.highlights.length > 0 && (
                <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">

                  <h2 className="text-2xl font-bold text-slate-900">
                    Event Highlights
                  </h2>

                  <ul className="mt-5 space-y-3">
                    {eventItem.highlights.map(
                      (highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-[16px] leading-7 text-slate-600"
                        >
                          <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-brand" />

                          <span>{highlight}</span>
                        </li>
                      )
                    )}
                  </ul>

                </div>
              )}

          </div>

        </Container>

        {/* Bottom navigation */}
        <div className="border-t border-slate-100">
          <Container className="max-w-5xl py-8">

            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Events
            </Link>

          </Container>
        </div>

      </article>
    )
  }

  /* =====================================================
     NEWS ARTICLE
  ===================================================== */

  if (newsItem) {
    return (
      <article className="bg-white">

        {/* Header */}
        <div className="border-b border-slate-100 bg-slate-50">
          <Container className="max-w-5xl py-10 sm:py-14">

            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>

            <div className="mt-8 max-w-4xl">

              {newsItem.category && (
                <Tag>{newsItem.category}</Tag>
              )}

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {newsItem.title}
              </h1>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500">
                <CalendarDays className="h-4 w-4" />
                {fmtDate(newsItem.date)}
              </div>

            </div>
          </Container>
        </div>

        {/* Cover Image */}
        <Container className="max-w-5xl">

          {newsItem.imageUrl ? (
            <div className="overflow-hidden rounded-b-3xl shadow-lg">
              <div className="aspect-[16/8]">
                <Img
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[16/8] items-center justify-center rounded-b-3xl bg-brand-tint">
              <div className="text-center">
                <p className="text-lg font-bold text-brand">
                  Rongmongve Youth Society
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Official News & Updates
                </p>
              </div>
            </div>
          )}

        </Container>

        {/* Article body */}
        <Container className="max-w-5xl py-12 sm:py-16">

          <div className="mx-auto max-w-3xl">

            {newsItem.excerpt && (
              <p className="border-b border-slate-200 pb-8 text-xl font-medium leading-8 text-slate-700 sm:text-2xl sm:leading-9">
                {newsItem.excerpt}
              </p>
            )}

            <div className="pt-8">
              <RichText
                content={newsItem.content}
              />
            </div>

          </div>

        </Container>

        {/* Bottom navigation */}
        <div className="border-t border-slate-100">
          <Container className="max-w-5xl py-8">

            <Link
              to="/news"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              View All News
            </Link>

          </Container>
        </div>

      </article>
    )
  }

  return null
}