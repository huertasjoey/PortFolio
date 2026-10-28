import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { Lightbox } from './Lightbox'

export interface Slide {
  src: string
  alt: string
  caption: string
  fit?: 'cover' | 'contain'
}

const VISIBLE = 3 // how many neighbours show on each side of the active slide
const SWIPE = 45 // px of horizontal drag that counts as a swipe

/** Where a slide sits, given its distance `d` from the active one (0 = centre). */
const place = (d: number): CSSProperties => {
  const a = Math.abs(d)
  const side = Math.sign(d)
  if (a > VISIBLE) {
    return { transform: `translate(-50%, -50%) translateX(${side * 150}%) scale(0.5)`, opacity: 0, pointerEvents: 'none', zIndex: 0 }
  }
  return {
    transform:
      a === 0
        ? 'translate(-50%, -50%)'
        : `translate(-50%, -50%) translateX(${side * (46 + (a - 1) * 20)}%) translateZ(${-a * 130}px) rotateY(${-side * 42}deg) scale(${1 - a * 0.06})`,
    opacity: a === 0 ? 1 : Math.max(0.25, 0.85 - (a - 1) * 0.3),
    filter: a === 0 ? 'none' : `brightness(${Math.max(0.35, 0.78 - (a - 1) * 0.2)})`,
    zIndex: 10 - a,
  }
}

/** 3D "depth" carousel (coverflow). Click a side image to bring it forward, the centre one to open it full screen. */
export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [viewer, setViewer] = useState<number | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const drag = useRef<{ x: number; moved: boolean } | null>(null)
  const last = slides.length - 1

  const goTo = useCallback((i: number) => setIndex(Math.min(Math.max(i, 0), last)), [last])

  const onKeyDown = (e: KeyboardEvent) => {
    const to = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: last }[e.key]
    if (to === undefined) return
    e.preventDefault()
    goTo(to)
  }

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, moved: false }
  }
  const onPointerUp = (e: PointerEvent) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) >= SWIPE) {
      d.moved = true
      goTo(index + (dx < 0 ? 1 : -1))
      // swallow the click that follows a swipe
      const stop = (ev: Event) => ev.stopPropagation()
      window.addEventListener('click', stop, { capture: true, once: true })
      setTimeout(() => window.removeEventListener('click', stop, true), 0)
    }
  }

  const arrow =
    'grid size-11 place-items-center rounded-full border border-line bg-card text-fg transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown}>
      <div
        tabIndex={0}
        aria-label={`${label} — use left and right arrow keys`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        className="relative -mx-6 aspect-[16/10] touch-pan-y overflow-hidden select-none sm:-mx-10 sm:aspect-[16/9]"
        style={{ perspective: '1300px', perspectiveOrigin: '50% 45%' }}
      >
        {slides.map((s, i) => {
          const d = i - index
          const active = d === 0
          return (
            <button
              key={s.src}
              type="button"
              aria-roledescription="slide"
              aria-label={active ? `View ${s.alt} full screen` : `Show image ${i + 1} of ${slides.length}: ${s.caption}`}
              aria-haspopup={active ? 'dialog' : undefined}
              tabIndex={active ? 0 : -1}
              onClick={(e) => {
                if (active) {
                  openerRef.current = e.currentTarget
                  setViewer(i)
                } else {
                  goTo(i)
                }
              }}
              style={place(d)}
              className={`group/zoom absolute top-1/2 left-1/2 block aspect-[16/10] w-[78%] overflow-hidden rounded-2xl border bg-bg transition duration-700 ease-[cubic-bezier(0.22,0.8,0.3,1)] will-change-transform motion-reduce:transition-none sm:w-[62%] ${
                active ? 'cursor-zoom-in border-accent/40 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]' : 'cursor-pointer border-line'
              }`}
            >
              <img
                src={s.src}
                alt={active ? s.alt : ''}
                draggable={false}
                decoding="async"
                className={`size-full ${s.fit === 'contain' ? 'bg-white object-contain' : 'object-cover'}`}
              />
              {active && (
                <span
                  aria-hidden
                  className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-lg border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur transition group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 max-sm:opacity-100"
                >
                  <Maximize2 size={16} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous image" className={arrow}>
          <ChevronLeft size={18} />
        </button>

        <div className="min-w-0 flex-1 text-center">
          <p aria-live="polite" className="truncate font-mono text-xs text-fg2">
            {slides[index]?.caption}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-accent' : 'w-1.5 bg-line hover:bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] tracking-widest text-muted">
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
        </div>

        <button type="button" onClick={() => goTo(index + 1)} disabled={index === last} aria-label="Next image" className={arrow}>
          <ChevronRight size={18} />
        </button>
      </div>

      <Lightbox
        slides={slides}
        index={viewer}
        onChange={(i) => {
          setViewer(i)
          goTo(i)
        }}
        onClose={() => {
          setViewer(null)
          openerRef.current?.focus()
        }}
      />
    </div>
  )
}
