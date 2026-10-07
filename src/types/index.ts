export interface TeamMember {
  group: string;
  id: string;
  name: string;
  position: string;
  image?: string;
  bio?: string;
}
export interface EventItem { id: string; title: string; slug: string; date: string; location: string; image: string; description: string; upcoming: boolean; highlights?: string[] }
export interface NewsItem { id: string; title: string; slug: string; date: string; category: string; image: string; excerpt: string; content: string[] }
export interface Program { id: string; title: string; category: string; image: string; description: string; year: string }
export interface GalleryItem { id: string; src: string; alt: string; category: string }
export interface FocusArea { id: string; icon: string; title: string; description: string; activities: string[] }
export interface Notice {
  id: string
  title: string
  date: string
  type: 'image' | 'pdf' | 'document'
  file?: string
  description?: string
}
