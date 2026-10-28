import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ZoomableImage } from './ZoomableImage'

export interface Slide {
  src: string
  alt: string
  caption: string
  fit?: 'cover' | 'contain'
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Swipeable scroll-snap carousel. Slides open full screen on click. Arrow keys work when focused. */
export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const raf = useRef(0)
  const [index, setIndex] = useState(0)
  const last = slides.length - 1

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current
      const slide = track?.children[Math.min(Math.max(i, 0), last)] as HTMLElement | undefined
      if (!track || !slide) return
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: reduceMotion() ? 'auto' : 'smooth',
      })
    },
    [last],
  )

  // Track which slide is closest to the centre while scrolling or swiping.
  const onScroll = () => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track) return
      const centre = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      Array.from(track.children).forEach((el, i) => {
        const s = el as HTMLElement
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - centre)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setIndex(best)
    })
  }

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(index - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      goTo(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      goTo(last)
    }
  }

  const arrow =
    'grid size-11 place-items-center rounded-full border border-line bg-card text-fg transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown}>
      <ul
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label={`${label} — use left and right arrow keys`}
        className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 py-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <li
            key={s.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={`aspect-[16/10] w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl border bg-bg transition duration-500 sm:w-[72%] ${
              i === index ? 'scale-100 border-accent/40 opacity-100' : 'scale-[0.96] border-line opacity-50'
            }`}
          >
            <ZoomableImage
              src={s.src}
              alt={s.alt}
              caption={s.caption}
              className="size-full"
              imgClassName={`size-full ${s.fit === 'contain' ? 'bg-white object-contain' : 'object-cover'}`}
            />
          </li>
        ))}
      </ul>

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
    </div>
  )
}
