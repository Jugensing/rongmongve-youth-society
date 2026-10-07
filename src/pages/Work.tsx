import { Img, PageHero, Reveal, Section } from '../components/ui'
import { focusAreas } from '../data/site'
import { Icon } from '../lib/icons'
import { useTitle } from '../hooks/useTitle'
export default function Work() {
  useTitle('Our Work')
  return <>
    <PageHero title="Our Work" text="The areas where Rongmongve Youth Society works with and for the community." />
    {focusAreas.map((f, i) => <Section key={f.id} tone={i % 2 ? 'paper' : 'white'}><div className="grid items-center gap-8 lg:grid-cols-2">
      <Reveal className={i % 2 ? 'lg:order-2' : ''}><div className="aspect-[4/3] overflow-hidden rounded-lg"><Img alt={`${f.title} (placeholder)`} /></div></Reveal>
      <div><Icon name={f.icon} className="h-8 w-8 text-brand-2" /><h2 className="mt-3 text-3xl">{f.title}</h2><p className="mt-3 text-lg text-mute">{f.description}</p>
        <h3 className="mt-5 text-base">Key activities</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-mute">{f.activities.map(a => <li key={a}>{a}</li>)}</ul></div>
    </div></Section>)}
  </>
}
