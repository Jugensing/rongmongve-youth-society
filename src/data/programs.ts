import type { Program } from '../types'
export const programCategories = ['All', 'Youth Development', 'Community Service', 'Education', 'Cultural Activities', 'Sports', 'Awareness Programs', 'Social Initiatives']
// PLACEHOLDER entries — replace with real programmes.
export const programs: Program[] = ['Youth Development', 'Community Service', 'Cultural Activities'].map((c, i) => ({ id: 'p' + i, title: 'Programme title (placeholder)', category: c, image: '', description: 'Short description to be added.', year: '2026' }))
