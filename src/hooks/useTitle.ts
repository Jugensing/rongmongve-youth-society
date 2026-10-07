import { useEffect } from 'react'
import { scrollTop } from '../lib/scroll'
export function useTitle(t?: string) { useEffect(() => { document.title = t ? `${t} | Rongmongve Youth Society` : 'Rongmongve Youth Society | Empower Today, Lead Tomorrow'; scrollTop(true) }, [t]) }
