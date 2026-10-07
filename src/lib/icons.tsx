import { Users, BookOpen, Home, Landmark, Trophy, HeartHandshake, type LucideIcon } from 'lucide-react'
const map: Record<string, LucideIcon> = { Users, BookOpen, Home, Landmark, Trophy, HeartHandshake }
export const Icon = ({ name, className }: { name: string; className?: string }) => { const C = map[name] ?? Users; return <C className={className} aria-hidden /> }
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
