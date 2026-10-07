import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import logo from '../assets/logo.png'
import { Button, Container, Img, Reveal, Section, SectionHeading, Card } from '../components/ui'
import { focusAreas, site } from '../data/site'
import { NoticeList } from '../components/Notices'
import { Socials } from '../components/Socials'
import { Icon } from '../lib/icons'
import { useTitle } from '../hooks/useTitle'

export default function Home() {
  useTitle()
  return <>
    <section className="bg-brand-tint">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="font-bold text-brand">Rongmongve Youth Society</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Empower Today. Lead Tomorrow.</h1>
          <p className="mt-5 max-w-xl text-lg text-mute">Building stronger communities through youth leadership, participation, service and collective action.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button to="/about">Learn About Us</Button><Button to="/contact" variant="outline">Get Involved</Button></div>
          <p className="mt-6 text-sm font-semibold text-mute">Established 2019 • {site.location}</p>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-lg"><Img
  src="/images/hero/hero.png"
  alt="Rongmongve Youth Society community"
  className="w-full h-full object-cover"
/></div>
          <img src={logo} alt="Rongmongve Youth Society logo" width={120} height={120} className="absolute -bottom-6 left-4 h-24 w-24 rounded-full bg-white p-1 shadow-lg sm:left-6 sm:h-28 sm:w-28" />
        </div>
      </Container>
    </section>
    <section className="border-b border-black/5"><Container><dl className="grid grid-cols-2 divide-x divide-black/10 py-8 md:grid-cols-4">
      {site.stats.map(([a, b]) => <div key={b} className="px-4 py-3 text-center"><dt className="text-2xl font-extrabold text-brand">{a}</dt><dd className="font-semibold text-mute">{b}</dd></div>)}
    </dl></Container></section>
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal><div className="aspect-[4/3] overflow-hidden rounded-lg"><Img
  src="/images/about/about.png"
  alt="Members of Rongmongve Youth Society"
  className="w-full h-full object-cover"
/></div></Reveal>
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Who We Are</h2>
          <p className="mt-4 text-lg text-mute">Rongmongve Youth Society is a youth and community organization, established in 2019, that encourages young people to take part in community development, leadership, social responsibility, culture and constructive activities.</p>
          <ul className="mt-5 space-y-2">{['Community participation', 'Leadership development', 'Cultural preservation', 'Youth activities'].map(t => <li key={t} className="flex gap-2 font-semibold"><Check className="h-5 w-5 text-brand-2" aria-hidden />{t}</li>)}</ul>
          <div className="mt-7"><Button to="/about">Learn More About RYS</Button></div>
        </Reveal>
      </div>
    </Section>
    <Section tone="paper">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-brand p-8 text-white"><h2 className="text-2xl !text-white">Our Vision</h2><p className="mt-3 text-lg text-white/90">{site.vision}</p></div>
        <div className="rounded-lg border-l-4 border-accent bg-white p-8 shadow-sm"><h2 className="text-2xl">Our Mission</h2><ul className="mt-3 space-y-1.5 text-mute">{site.mission.map(m => <li key={m}>{m}</li>)}</ul></div>
      </div>
    </Section>
    <Section>
      <SectionHeading title="Our Work" text="Six areas where Rongmongve Youth Society works with and for the community." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{focusAreas.map(f => <Card key={f.id} to="/our-work"><div className="p-6"><Icon name={f.icon} className="h-7 w-7 text-brand-2" /><h3 className="mt-4 text-xl">{f.title}</h3><p className="mt-2 text-mute">{f.description}</p></div></Card>)}</div>
    </Section>
    <Section tone="tint">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div><h2 className="text-3xl sm:text-4xl">Community Impact</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{['Youth Participation', 'Community Engagement', 'Leadership', 'Cultural Awareness', 'Volunteerism', 'Collective Action'].map(t => <li key={t} className="rounded-md bg-white px-4 py-3 font-semibold shadow-sm">{t}</li>)}</ul></div>
        <Reveal><div className="aspect-[4/3] overflow-hidden rounded-lg"><Img alt="RYS community activity (placeholder)" /></div></Reveal>
      </div>
    </Section>
    <Section tone="paper">
      <div className="mb-8 flex items-end justify-between gap-4"><h2 className="text-3xl sm:text-4xl">Latest Notices</h2><Link to="/notices" className="font-bold text-brand">View all notices</Link></div>
      <NoticeList limit={3} />
    </Section>
    <Section>
      <SectionHeading title="Follow Us" text="Stay connected with Rongmongve Youth Society on social media." />
      <Socials />
    </Section>
    <section className="bg-brand py-16 text-center text-white"><Container>
      <h2 className="text-3xl !text-white sm:text-4xl">Be Part of the Change</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">Young people have the power to shape stronger communities. Join us in building a more active, responsible and connected future.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Button to="/contact" variant="light">Volunteer</Button><Link to="/contact" className="inline-flex min-h-11 items-center rounded-md border-2 border-white px-5 text-sm font-bold hover:bg-white/10">Contact Us</Link></div>
    </Container></section>
  </>
}
