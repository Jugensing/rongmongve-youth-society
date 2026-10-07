import type { TeamMember } from '../types'
export const teamGroups = ['Office Bearers', 'Advisors', 'Members']
const m = (group: string, position: string, ...names: string[]): TeamMember[] =>
  names.map(name => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')

    const photos: Record<string, string> = {
      'johon-tisso': '/team/johon-tisso.jpeg',
      'busing-tokbi': '/team/busing-tokbi.jpeg',
      'jugensing-tokbi': '/team/jugensing-tokbi.jpeg',
    }

    return {
      group,
      id: `${position}-${slug}`,
      name,
      position,
      image: photos[slug],
    }
  })
// Add `image: '/team/name.jpg'` (file in public/team) and `bio` to any member.
export const team: TeamMember[] = [
  ...m('Office Bearers', 'President', 'Jiten Chandra Bey'),
  ...m('Office Bearers', 'Vice President', 'Bidya Sing Terang'),
  ...m('Office Bearers', 'General Secretary', 'Bibison Ingti Kathar'),
  ...m('Office Bearers', 'Assistant Secretary', 'Johon Tisso'),
  ...m('Office Bearers', 'Finance Secretary', 'Prosenjit Killing', 'Hingchong Ronghang', 'Rajesh Phangcho', 'Topon Engti'),
  ...m('Office Bearers', 'Publicity Secretary', 'Jugensing Tokbi'),
  ...m('Office Bearers', 'Cultural Secretary', 'Tenzing Bey', 'Busing Tokbi'),
  ...m('Advisors', 'Advisor', 'Ruve Sing Bey', 'Bidyaram Singnar', 'Raju Tisso', 'Sing Tisso'),
  ...m('Members', 'Member', 'Lokhiram Terang', 'Rosemina Taropi'),
]
