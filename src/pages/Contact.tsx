import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import { site } from '../data/site'
import { useTitle } from '../hooks/useTitle'
const fields = ['name', 'email', 'phone', 'subject', 'message'] as const
type F = Record<(typeof fields)[number], string>
export default function Contact() {
  useTitle('Contact')
  const [v, setV] = useState<F>({ name: '', email: '', phone: '', subject: '', message: '' }), [err, setErr] = useState<Partial<F>>({}), [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault(); const x: Partial<F> = {}
    if (!v.name.trim()) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = 'Enter a valid email address.'
    if (v.phone && !/^[+\d\s-]{7,15}$/.test(v.phone)) x.phone = 'Enter a valid phone number.'
    if (!v.subject.trim()) x.subject = 'Enter a subject.'
    if (v.message.trim().length < 10) x.message = 'Write at least 10 characters.'
    setErr(x); if (!Object.keys(x).length) setDone(true) // TODO: connect backend / Firebase
  }
  const input = 'mt-1 w-full rounded-md border border-black/20 px-3 py-2.5 focus:border-brand-2'
  return <><PageHero title="Contact Us" text="Get in touch with Rongmongve Youth Society." />
    <Section><div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl">Rongmongve Youth Society</h2>
        <ul className="mt-5 space-y-4 text-mute">
          <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand-2" aria-hidden />Rongmongve<br />Karbi Anglong<br />Assam, India</li>
        </ul>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">{site.contacts.map(p => <div key={p.name} className="rounded-lg border border-black/10 p-4"><p className="font-bold">{p.name}</p><p className="text-sm text-mute">{p.role}</p><a className="mt-2 flex items-center gap-2 font-semibold text-brand" href={`tel:+91${p.phone.replace(/\s/g, '')}`}><Phone className="h-4 w-4" aria-hidden />{p.phone}</a><a className="mt-1 flex items-center gap-2 break-all font-semibold text-brand" href={`mailto:${p.email}`}><Mail className="h-4 w-4 shrink-0" aria-hidden />{p.email}</a></div>)}</div>
        <div className="mt-8 flex aspect-[16/10] items-center justify-center rounded-lg bg-brand-tint p-4 text-center text-sm font-semibold text-brand/80" role="img" aria-label="Map placeholder">Map will appear here once the exact location is provided.</div>
      </div>
      {done ? <div className="flex flex-col items-center justify-center rounded-lg bg-brand-tint p-10 text-center" role="status"><CheckCircle className="h-10 w-10 text-brand-2" aria-hidden /><h2 className="mt-3 text-2xl">Message sent</h2><p className="mt-2 text-mute">Thank you. We will get back to you soon.</p></div> :
      <form onSubmit={submit} noValidate className="space-y-4">
        {fields.map(f => <div key={f}><label htmlFor={f} className="font-semibold capitalize">{f}{f === 'phone' && ' (optional)'}</label>
          {f === 'message' ? <textarea id={f} rows={5} className={input} value={v[f]} onChange={e => setV({ ...v, [f]: e.target.value })} aria-invalid={!!err[f]} aria-describedby={err[f] ? f + '-e' : undefined} /> :
            <input id={f} type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'} className={input} value={v[f]} onChange={e => setV({ ...v, [f]: e.target.value })} aria-invalid={!!err[f]} aria-describedby={err[f] ? f + '-e' : undefined} />}
          {err[f] && <p id={f + '-e'} className="mt-1 text-sm font-semibold text-accent">{err[f]}</p>}</div>)}
        <button type="submit" className="min-h-11 rounded-md bg-brand px-6 font-bold text-white hover:bg-brand-2">Send Message</button>
      </form>}
    </div></Section></>
}
