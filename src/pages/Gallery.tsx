import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { Img, PageHero, Section } from '../components/ui'
import { useTitle } from '../hooks/useTitle'

const categories = [
  'All',
  'Community',
  'Youth',
  'Culture',
  'Sports',
  'Events',
]

type SanityGallery = {
  _id: string
  category: string
  imageUrl?: string
}

export default function Gallery() {
  const [gallery, setGallery] = useState<SanityGallery[]>([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useTitle('Gallery')

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await sanityClient.fetch<SanityGallery[]>(
          `*[_type == "gallery"] | order(_createdAt desc) {
            _id,
            category,
            "imageUrl": image.asset->url
          }`
        )

        setGallery(data)
      } catch (error) {
        console.error(
          'Failed to fetch gallery from Sanity:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredGallery =
    category === 'All'
      ? gallery
      : gallery.filter((item) => item.category === category)

  return (
    <>
      <PageHero
        title="Gallery"
        text="Moments, activities and memories from Rongmongve Youth Society."
      />

      <Section>
        {/* Category Filter */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter gallery"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                category === item
                  ? 'border-brand bg-brand text-white'
                  : 'border-black/15 text-mute hover:border-brand hover:text-brand'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Loading gallery...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredGallery.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No photos have been published yet.
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && filteredGallery.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGallery.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {item.imageUrl ? (
                    <Img
                      src={item.imageUrl}
                      alt={`Rongmongve Youth Society ${item.category} gallery photo`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Img
                      alt="Rongmongve Youth Society gallery photo"
                      className="h-full w-full"
                    />
                  )}
                </div>

                <div className="px-4 py-3">
                  <span className="inline-block rounded-full bg-brand-tint px-2.5 py-1 text-xs font-bold text-brand">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}