import { Instagram, Facebook, Youtube, MessageCircle, type LucideIcon } from 'lucide-react'
import { site } from '../data/site'
const items: [string, string, LucideIcon][] = [['instagram', 'Instagram', Instagram], ['facebook', 'Facebook', Facebook], ['youtube', 'YouTube', Youtube], ['whatsapp', 'WhatsApp', MessageCircle]]
export function Socials() {
  return <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(([k, label, I]) => { const url = site.social[k]; const body = <><I className="h-7 w-7 text-brand-2" aria-hidden /><span className="mt-3 font-bold">{label}</span><span className="text-sm text-mute">{url ? 'Follow us' : 'Link coming soon'}</span></>
    const c = 'flex h-full flex-col items-start rounded-lg border border-black/10 bg-white p-5'
    return <li key={k}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" className={`${c} transition-shadow hover:shadow-md`}>{body}</a> : <div className={`${c} opacity-70`}>{body}</div>}</li> })}</ul>
}
