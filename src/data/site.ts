import type { FocusArea } from '../types'
export const site = {
  name: 'Rongmongve Youth Society', tagline: 'Empower Today, Lead Tomorrow', established: 2019,
  location: 'Rongmongve, Karbi Anglong, Assam',
  // Fill these in when available; empty values are hidden or shown as placeholders.
  contacts: [
    { name: 'Johon Tisso', role: 'Assistant Secretary', phone: '69007 13315', email: 'johontisso11@gmail.com' },
    { name: 'Jugensing Tokbi', role: 'Publicity Secretary', phone: '86386 78880', email: 'jugensing11@gmail.com' },
  ],
  social: { facebook: '', instagram: '', youtube: '', whatsapp: '' } as Record<string, string>,
  nav: [['/', 'Home'], ['/about', 'About'], ['/our-work', 'Our Work'], ['/programs', 'Programs'], ['/events', 'Events'], ['/notices', 'Notices'], ['/gallery', 'Gallery'], ['/team', 'Team'], ['/news', 'News'], ['/contact', 'Contact']] as [string, string][],
  stats: [['2019', 'Established'], ['Youth', 'Leadership'], ['Community', 'Service'], ['Culture &', 'Heritage']] as [string, string][],
  vision: 'To build an empowered, responsible and united generation of young people who contribute positively to their community and society.',
  mission: ['Youth empowerment and leadership', 'Education and awareness', 'Community service', 'Cultural awareness', 'Social development and participation'],
  values: ['Unity', 'Responsibility', 'Participation', 'Respect for culture', 'Service'],
}
export const focusAreas: FocusArea[] = [
  { id: 'youth', icon: 'Users', title: 'Youth Empowerment', description: 'Helping young people develop confidence, leadership and participation.', activities: ['Leadership activities', 'Youth participation'] },
  { id: 'education', icon: 'BookOpen', title: 'Education', description: 'Encouraging learning, awareness and educational opportunities.', activities: ['Awareness activities', 'Learning support'] },
  { id: 'community', icon: 'Home', title: 'Community Development', description: 'Supporting activities that strengthen the local community.', activities: ['Local initiatives', 'Community gatherings'] },
  { id: 'culture', icon: 'Landmark', title: 'Culture & Heritage', description: 'Promoting cultural identity, traditions and community heritage.', activities: ['Cultural programmes', 'Heritage awareness'] },
  { id: 'sports', icon: 'Trophy', title: 'Sports & Recreation', description: 'Encouraging healthy, constructive and inclusive youth activities.', activities: ['Sports events', 'Youth recreation'] },
  { id: 'social', icon: 'HeartHandshake', title: 'Social Responsibility', description: 'Promoting volunteerism, service and collective responsibility.', activities: ['Volunteering', 'Service drives'] },
]
