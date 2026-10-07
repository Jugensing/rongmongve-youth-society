import { NoticeList } from '../components/Notices'
import { PageHero, Section } from '../components/ui'
import { useTitle } from '../hooks/useTitle'
export default function Notices() { useTitle('Notices'); return <><PageHero title="Notices" text="Official notices from Rongmongve Youth Society as images, PDFs and documents." /><Section><NoticeList /></Section></> }
