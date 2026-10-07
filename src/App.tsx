import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
const P = (f: () => Promise<{ default: React.ComponentType }>) => lazy(f)
const Home = P(() => import('./pages/Home')), About = P(() => import('./pages/About')), Work = P(() => import('./pages/Work')),
  Lists = P(() => import('./pages/Lists')), Detail = P(() => import('./pages/Detail')), Gallery = P(() => import('./pages/Gallery')), Contact = P(() => import('./pages/Contact')), Notices = P(() => import('./pages/Notices'))
export default function App() {
  return <Suspense fallback={<div className="min-h-screen" />}><Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="about" element={<About />} /><Route path="our-work" element={<Work />} />
    <Route path="programs" element={<Lists />} /><Route path="events" element={<Lists />} /><Route path="team" element={<Lists />} /><Route path="news" element={<Lists />} />
    <Route path="events/:slug" element={<Detail />} /><Route path="news/:slug" element={<Detail />} />
    <Route path="gallery" element={<Gallery />} /><Route path="notices" element={<Notices />} /><Route path="contact" element={<Contact />} /><Route path="*" element={<Home />} />
  </Route></Routes></Suspense>
}
