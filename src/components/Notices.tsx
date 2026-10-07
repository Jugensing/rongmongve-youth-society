import { useEffect, useState } from 'react'
import { CalendarDays, FileText, Download, ArrowUpRight } from 'lucide-react'
import { sanityClient } from '../lib/sanity'
import { fmtDate } from '../lib/icons'
import type { Notice } from '../types'

type SanityNotice = {
  _id: string
  title: string
  date: string
  category?: string
  excerpt?: string
  attachmentUrl?: string
  attachmentName?: string
}

export function NoticeList({ limit }: { limit?: number }) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await sanityClient.fetch<SanityNotice[]>(
          `*[_type == "notice"] | order(date desc) {
            _id,
            title,
            date,
            category,
            excerpt,
            "attachmentUrl": attachment.asset->url,
            "attachmentName": attachment.asset->originalFilename
          }`
        )

        const mappedNotices: Notice[] = data.map((notice) => {
          const isPdf =
            notice.attachmentName?.toLowerCase().endsWith('.pdf') ?? false

          return {
            id: notice._id,
            title: notice.title,
            date: notice.date,
            type: isPdf ? 'pdf' : 'document',
            file: notice.attachmentUrl,
            description: notice.excerpt,
          }
        })

        setNotices(mappedNotices)
      } catch (error) {
        console.error('Failed to fetch notices from Sanity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  const items = limit ? notices.slice(0, limit) : notices

  if (loading) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading notices...
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-12 text-center">
        <FileText className="mx-auto h-10 w-10 text-black/30" />
        <p className="mt-4 text-sm text-muted-foreground">
          No notices have been published yet. Check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((notice) => (
        <article
          key={notice.id}
          className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-brand-2" />
              <span>{fmtDate(notice.date)}</span>
            </div>

            <span className="rounded-full bg-brand-2/10 px-3 py-1 text-xs font-semibold capitalize text-brand-2">
              Notice
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-black">
            {notice.title}
          </h3>

          {/* Description */}
          {notice.description && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {notice.description}
            </p>
          )}

          {/* Bottom */}
          <div className="mt-auto pt-6">
            {notice.file ? (
              <a
                href={notice.file}
                target="_blank"
                rel="noopener noreferrer"
                download={notice.type === 'image' ? true : undefined}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-2 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                {notice.type === 'pdf'
                  ? 'Open PDF'
                  : 'Open Document'}
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-2">
                <FileText className="h-4 w-4" />
                Official Notice
                <ArrowUpRight className="h-4 w-4 opacity-60" />
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}