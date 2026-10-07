import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Img } from './ui'
import type { GalleryItem } from '../types'
export function Lightbox({ items, index, onClose, onChange }: { items: GalleryItem[]; index: number; onClose: () => void; onChange: (i: number) => void }) {
  const n = items.length
  useEffect(() => {
    const go = (d: number) => onChange((index + d + n) % n)
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [index, n, onClose, onChange])
  const b = 'absolute rounded-full bg-white/15 p-3 text-white hover:bg-white/30'
  const step = (e: React.MouseEvent, d: number) => { e.stopPropagation(); onChange((index + d + n) % n) }
  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button aria-label="Close" onClick={onClose} className={`${b} right-4 top-4`}><X /></button>
      <button aria-label="Previous image" onClick={e => step(e, -1)} className={`${b} left-2 sm:left-4`}><ChevronLeft /></button>
      <button aria-label="Next image" onClick={e => step(e, 1)} className={`${b} right-2 sm:right-4`}><ChevronRight /></button>
      <div className="h-[75vh] w-full max-w-4xl overflow-hidden rounded-lg" onClick={e => e.stopPropagation()}><Img src={items[index].src} alt={items[index].alt} className="!object-contain" /></div>
    </div>
  )
}
