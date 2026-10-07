import type { GalleryItem } from '../types'
export const galleryCategories = ['All', 'Community', 'Youth', 'Culture', 'Sports', 'Events']
// PLACEHOLDER entries — set `src` to real photos (e.g. /gallery/photo1.jpg).
export const gallery: GalleryItem[] = ['Community', 'Youth', 'Culture', 'Sports', 'Events', 'Community'].map((c, i) => ({ id: 'g' + i, src: '', alt: `${c} photo placeholder`, category: c }))
