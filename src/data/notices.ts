import type { Notice } from '../types'
// Put files in public/notices/ and add an entry, newest first. type: 'image' | 'pdf' | 'document'
// Example: { id: 'n1', title: 'General meeting notice', date: '2026-10-10', type: 'pdf', file: '/notices/meeting.pdf' }
export const notices: Notice[] = []
