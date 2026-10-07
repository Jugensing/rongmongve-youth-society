import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { Card, Img, PageHero, Section, Tag } from '../components/ui'
import { team, teamGroups } from '../data/team'
import { sanityClient } from '../lib/sanity'
import { fmtDate } from '../lib/icons'
import { useTitle } from '../hooks/useTitle'

const grid = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

/* =====================================================
   PROGRAMS — SANITY CMS
===================================================== */

type SanityProgram = {
  _id: string
  title: string
  category: string
  year: number
  description?: string
  imageUrl?: string
}

function Programs() {
  const [programs, setPrograms] = useState<SanityProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('All')

  const categories = [
    'All',
    'Youth Development',
    'Community Service',
    'Education',
    'Cultural Activities',
    'Sports',
    'Awareness Programs',
    'Social Initiatives',
  ]

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data =
          await sanityClient.fetch<SanityProgram[]>(
            `*[_type == "program"] | order(year desc) {
              _id,
              title,
              category,
              year,
              description,
              "imageUrl": coverImage.asset->url
            }`
          )

        setPrograms(data)
      } catch (error) {
        console.error(
          'Failed to fetch programs from Sanity:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const filteredPrograms = programs.filter(
    (program) =>
      cat === 'All' ||
      program.category === cat
  )

  if (loading) {
    return (
      <div className="py-16 text-center text-mute">
        Loading programs...
      </div>
    )
  }

  return (
    <>
      {/* Category Filters */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter programs"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={cat === category}
            onClick={() => setCat(category)}
            className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
              cat === category
                ? 'border-brand bg-brand text-white'
                : 'border-black/15 text-mute hover:border-brand'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Program Cards */}
      {filteredPrograms.length ? (
        <div className={grid}>
          {filteredPrograms.map((program) => (
            <Card
              key={program._id}
              className="overflow-hidden"
            >
              {/* Cover Image */}
              {program.imageUrl ? (
                <div className="aspect-[3/2] overflow-hidden">
                  <Img
                    src={program.imageUrl}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[3/2] items-center justify-center bg-brand-tint">
                  <div className="text-center">
                    <div className="text-3xl text-brand/70">
                      ◎
                    </div>

                    <p className="mt-2 text-sm font-medium text-brand">
                      Photo to be added
                    </p>
                  </div>
                </div>
              )}

              {/* Program Information */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <Tag>{program.category}</Tag>

                  <span className="text-sm text-mute">
                    {program.year}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold">
                  {program.title}
                </h3>

                {program.description && (
                  <p className="mt-2 text-mute">
                    {program.description}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-12 text-center">
          <p className="text-sm text-mute">
            {cat === 'All'
              ? 'No programs have been published yet.'
              : `No programs found in ${cat}.`}
          </p>
        </div>
      )}
    </>
  )
}

/* =====================================================
   EVENTS — SANITY CMS
===================================================== */

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
  highlights?: string[]
}

function Events() {
  const [eventList, setEventList] = useState<SanityEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await sanityClient.fetch<SanityEvent[]>(
          `*[_type == "event"] | order(date asc) {
            _id,
            title,
            slug,
            date,
            location,
            description,
            "imageUrl": coverImage.asset->url,
            highlights
          }`
        )

        setEventList(data)
      } catch (error) {
        console.error(
          'Failed to fetch events from Sanity:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="py-16 text-center text-mute">
        Loading events...
      </div>
    )
  }

  const now = new Date()

  const upcomingEvents = eventList.filter(
    (event) => new Date(event.date) >= now
  )

  const pastEvents = eventList
    .filter(
      (event) => new Date(event.date) < now
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )

  const eventSection = (
    title: string,
    list: SanityEvent[]
  ) => (
    <div className="mb-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {title}
          </h2>

          <div className="mt-2 h-1 w-12 rounded-full bg-brand" />
        </div>

        {list.length > 0 && (
          <span className="text-sm text-mute">
            {list.length}{' '}
            {list.length === 1 ? 'event' : 'events'}
          </span>
        )}
      </div>

      {list.length ? (
        <div className={grid}>
          {list.map((event) => (
            <Card
              key={event._id}
              to={
                event.slug?.current
                  ? `/events/${event.slug.current}`
                  : undefined
              }
              className="group overflow-hidden"
            >
              {event.imageUrl ? (
                <div className="aspect-[16/10] overflow-hidden">
                  <Img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-brand-tint">
                  <span className="font-semibold text-brand">
                    Rongmongve Youth Society
                  </span>
                </div>
              )}

              <div className="p-5">
                <p className="text-sm font-bold text-brand">
                  {fmtDate(event.date)}
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {event.title}
                </h3>

                {event.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-mute">
                    <MapPin
                      className="h-4 w-4 shrink-0"
                      aria-hidden
                    />
                    {event.location}
                  </p>
                )}

                {event.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-mute">
                    {event.description}
                  </p>
                )}

                <p className="mt-4 text-sm font-bold text-brand">
                  View Event →
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-10 text-center">
          <p className="text-sm text-mute">
            No {title.toLowerCase()} listed yet.
          </p>
        </div>
      )}
    </div>
  )

  return (
    <>
      {eventSection(
        'Upcoming Events',
        upcomingEvents
      )}

      {eventSection(
        'Past Events',
        pastEvents
      )}
    </>
  )
}

/* =====================================================
   TEAM
===================================================== */

const initials = (n: string) =>
  n
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

const Team = () => (
  <div className="space-y-14">
    {teamGroups.map((g) => (
      <div key={g}>
        <h2 className="mb-5 text-2xl">
          {g}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team
            .filter((m) => m.group === g)
            .map((m) => (
              <li key={m.id}>
                <Card>
                  {m.image ? (
                    <div className="aspect-square overflow-hidden">
                      <Img
                        src={m.image}
                        alt={m.name}
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className="flex aspect-[5/3] items-center justify-center bg-brand-tint text-4xl font-extrabold text-brand/70"
                    >
                      {initials(m.name)}
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-lg">
                      {m.name}
                    </h3>

                    <p className="font-semibold text-brand">
                      {m.position}
                    </p>

                    {m.bio && (
                      <p className="mt-2 text-mute">
                        {m.bio}
                      </p>
                    )}
                  </div>
                </Card>
              </li>
            ))}
        </ul>
      </div>
    ))}
  </div>
)

/* =====================================================
   NEWS — SANITY CMS
===================================================== */

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
}

const News = () => {
  const [news, setNews] = useState<SanityNews[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await sanityClient.fetch<SanityNews[]>(
          `*[_type == "news"] | order(date desc) {
            _id,
            title,
            slug,
            date,
            category,
            excerpt,
            "imageUrl": coverImage.asset->url
          }`
        )

        setNews(data)
      } catch (error) {
        console.error(
          'Failed to fetch news from Sanity:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading news...
      </div>
    )
  }

  if (!news.length) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No news has been published yet.
          Check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className={grid}>
      {news.map((item) => (
        <Card
          key={item._id}
          to={
            item.slug?.current
              ? `/news/${item.slug.current}`
              : undefined
          }
          className="group overflow-hidden"
        >
          {item.imageUrl ? (
            <div className="aspect-[3/2] overflow-hidden">
              <Img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-[3/2] items-center justify-center bg-brand-tint text-brand">
              <span className="text-sm font-semibold">
                Rongmongve Youth Society
              </span>
            </div>
          )}

          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <Tag>
                {item.category || 'Society News'}
              </Tag>

              <span className="text-sm text-mute">
                {fmtDate(item.date)}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold">
              {item.title}
            </h3>

            {item.excerpt && (
              <p className="mt-2 line-clamp-3 text-mute">
                {item.excerpt}
              </p>
            )}

            <p className="mt-4 text-sm font-bold text-brand">
              Read More →
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}

/* =====================================================
   PAGE ROUTES
===================================================== */

const pages: Record<
  string,
  [string, string, () => JSX.Element]
> = {
  '/programs': [
    'Our Programs & Initiatives',
    'Activities and initiatives run by Rongmongve Youth Society.',
    Programs,
  ],

  '/events': [
    'Events',
    'Upcoming and past events.',
    Events,
  ],

  '/team': [
    'Meet Our Team',
    'The people leading Rongmongve Youth Society.',
    Team,
  ],

  '/news': [
    'Latest News & Updates',
    'Announcements and stories from RYS.',
    News,
  ],
}

export default function Lists() {
  const { pathname } = useLocation()

  const [title, text, Body] =
    pages[pathname] ?? pages['/news']

  useTitle(title)

  return (
    <>
      <PageHero
        title={title}
        text={text}
      />

      <Section>
        <Body />
      </Section>
    </>
  )
}