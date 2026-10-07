import { Button, Img, PageHero, Reveal, Section, SectionHeading } from '../components/ui'
import { site } from '../data/site'
import { useTitle } from '../hooks/useTitle'
export default function About() {
  useTitle('About')
  return <>
    <PageHero title="About Rongmongve Youth Society" text="A youth and community organization working for empowerment, leadership, culture and community development." />
    <Section><div className="grid items-center gap-10 lg:grid-cols-2">
      <div><h2 className="text-3xl">Who We Are</h2><p className="mt-4 text-lg text-mute">Rongmongve Youth Society was established in 2019 to encourage young people to take part in community development, leadership, social responsibility, culture and constructive activities.</p></div>
      <div className="aspect-[4/3] overflow-hidden rounded-lg"><Img alt="RYS members (placeholder)" /></div>
    </div></Section>
    <Section tone="paper"><SectionHeading title="Our Story" />
      <ol className="border-l-2 border-brand-2 pl-6"><li><p className="text-xl font-extrabold text-brand">2019</p><p className="text-mute">Rongmongve Youth Society established.</p></li></ol>
    </Section>
    <Section><div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg bg-brand p-8 text-white"><h2 className="text-2xl !text-white">Vision</h2><p className="mt-3 text-white/90">{site.vision}</p></div>
      <div className="rounded-lg border border-black/10 p-8"><h2 className="text-2xl">Mission</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-mute">{site.mission.map(m => <li key={m}>{m}</li>)}</ul></div>
    </div></Section>
    <Section tone="tint"><SectionHeading title="Core Values" />
      <Reveal><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{site.values.map(v => <li key={v} className="rounded-md bg-white p-4 text-center font-bold text-brand shadow-sm">{v}</li>)}</ul></Reveal></Section>
    <Section><SectionHeading title="Our Approach" text="We encourage participation, put young people in leadership roles, and work alongside the wider community and its culture." />
      <Button to="/team" variant="outline">Meet Our Team</Button> <span className="ml-2"><Button to="/contact">Get Involved</Button></span></Section>
  </>
}
