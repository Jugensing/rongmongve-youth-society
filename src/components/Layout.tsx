import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUp } from 'lucide-react'
import logo from '../assets/logo.png'
import { initScroll, scrollTop } from '../lib/scroll'
import { site } from '../data/site'
import { Button, Container } from './ui'

function Navbar() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false), { pathname } = useLocation()
  useEffect(() => { const f = () => setScrolled(window.scrollY > 8); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])
  const link = ({ isActive }: { isActive: boolean }) => `rounded px-2.5 py-2 text-sm font-semibold transition-colors ${isActive ? 'text-brand underline decoration-2 underline-offset-8' : 'text-mute hover:text-brand'}`
  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-black/5'}`}>
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Rongmongve Youth Society home">
          <img src={logo} alt="Rongmongve Youth Society logo" width={52} height={52} className="h-12 w-12 sm:h-[52px] sm:w-[52px]" />
          <span className="text-sm font-extrabold leading-tight text-brand sm:text-base">Rongmongve<br />Youth Society</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center xl:flex">{site.nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={link}>{l}</NavLink>)}</nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><Button to="/contact">Get Involved</Button></span>
          <button className="rounded p-2 xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </Container>
      {open && <nav id="mobile-menu" data-lenis-prevent aria-label="Mobile" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-black/5 bg-white px-4 pb-6 pt-2 xl:hidden">
        {site.nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `block border-b border-black/5 py-3.5 font-semibold ${isActive ? 'text-brand' : 'text-ink'}`}>{l}</NavLink>)}
        <div className="mt-4"><Button to="/contact">Get Involved</Button></div>
      </nav>}
    </header>
  )
}
function Footer() {
  const socials = Object.entries(site.social).filter(([, u]) => u)
  const col = (t: string, items: [string, string][]) => <div><h2 className="mb-3 text-sm font-bold !text-white">{t}</h2><ul className="space-y-2 text-sm">{items.map(([to, l]) => <li key={l}><Link className="text-white/75 hover:text-white" to={to}>{l}</Link></li>)}</ul></div>
  return (
    <footer className="bg-[#0A3B35] text-white/80"><Container className="py-12">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div><img src={logo} alt="Rongmongve Youth Society logo" width={88} height={88} loading="lazy" className="rounded-full bg-white p-1" style={{ width: 88, height: 88 }} /><p className="mt-3 font-bold text-white">Rongmongve Youth Society</p><p className="text-sm">{site.tagline}</p></div>
        {col('Organization', [['/about', 'About'], ['/our-work', 'Our Work'], ['/programs', 'Programs'], ['/events', 'Events'], ['/gallery', 'Gallery']])}
        {col('Resources', [['/notices', 'Notices'], ['/news', 'News'], ['/contact', 'Get Involved'], ['/contact', 'Contact']])}
        <div><h2 className="mb-3 text-sm font-bold !text-white">Follow Us</h2>{socials.length ? <ul className="space-y-2 text-sm">{socials.map(([k, u]) => <li key={k}><a className="capitalize hover:text-white" href={u} rel="noopener noreferrer" target="_blank">{k}</a></li>)}</ul> : <p className="text-sm">Social links coming soon.</p>}</div>
      </div>
      <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-sm sm:flex-row"><p>© 2026 Rongmongve Youth Society. All rights reserved.</p><p>Privacy Policy · Terms / Disclaimer</p></div>
    </Container></footer>
  )
}
function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(window.scrollY > 600); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return show ? <button aria-label="Scroll to top" onClick={() => scrollTop()} className="fixed bottom-5 right-5 z-30 rounded-full bg-brand p-3 text-white shadow-lg hover:bg-brand-2"><ArrowUp className="h-5 w-5" /></button> : null
}
export default function Layout() {
  useEffect(() => initScroll(), [])
  return <><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a><Navbar /><main id="main"><Outlet /></main><Footer /><ScrollToTop /></>
}
