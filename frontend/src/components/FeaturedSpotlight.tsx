import { ArrowRight, BookOpen, Play, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { content } from '../content'
import type { Project } from '../types'

/**
 * The spotlight card for a featured project on the /work page: a muted reel of its
 * "How it works" clips with a camera HUD, plus thesis, headline numbers and highlights.
 */
export function FeaturedSpotlight({ project, number, onOpen }: { project: Project; number: number; onOpen: (p: Project) => void }) {
  const cs = project.caseStudy
  const reel = (cs.howItWorks ?? []).filter((s) => s.video)
  const [clip, setClip] = useState(0)
  const [inView, setInView] = useState(false)
  const [motionOk] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const box = useRef<HTMLElement>(null)
  const playing = motionOk && inView && reel.length > 0
  const step = reel[clip]
  const metrics = cs.metrics?.slice(0, 3) ?? []
  const highlights = cs.comparison?.highlights ?? []

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Play/pause the current clip as the card scrolls in and out of view.
  useEffect(() => {
    const videos = box.current?.querySelectorAll('video')
    const v = videos?.[videos.length - 1]
    if (!v) return
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [playing, clip])

  return (
    <article
      ref={box}
      className="relative overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-2xl shadow-gold/5"
      aria-label={`${content.projectUi.featuredLabel}: ${project.title}`}
    >
      <span aria-hidden className="pointer-events-none absolute -top-40 -right-32 size-120 rounded-full bg-gold/10 blur-3xl" />

      {/* Top bar */}
      <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-gold/20 px-6 py-3.5 sm:px-8">
        <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
          <Star size={13} className="fill-gold" /> Featured project
        </p>
        {cs.thesis && (
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-fg2">
            <BookOpen size={13} strokeWidth={1.5} className="text-gold" /> {cs.thesis.label ?? 'Thesis'} · {cs.thesis.meta}
          </p>
        )}
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Reel */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`${content.projectUi.caseStudyButton}: ${project.title}`}
          className="group relative aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-136"
        >
          {step ? (
            <AnimatePresence initial={false}>
              <motion.video
                key={step.video}
                src={step.video}
                poster={step.poster}
                muted
                playsInline
                autoPlay={playing}
                preload="auto"
                onEnded={() => setClip((c) => (c + 1) % reel.length)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                aria-hidden
              />
            </AnimatePresence>
          ) : (
            project.image && <img src={project.image} alt="" className="absolute inset-0 size-full object-cover" />
          )}
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/30" />
          {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((c) => (
            <span key={c} aria-hidden className={`absolute size-5 border-gold/70 ${c}`} />
          ))}
          {step && (
            <span className="absolute top-6 left-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase">
              <span className="relative flex size-2">
                {playing && <span className="absolute inset-0 animate-ping rounded-full bg-red-500/70" />}
                <span className={`relative size-2 rounded-full ${playing ? 'bg-red-500' : 'bg-white/40'}`} />
              </span>
              {playing ? 'Live' : 'Paused'} · Cam 01
            </span>
          )}
          {step && (
            <span className="absolute bottom-7 left-8 text-left">
              <span className="block font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                Stage {String(clip + 1).padStart(2, '0')} · {step.stage ?? step.title}
              </span>
              <span className="mt-1 block font-serif text-3xl text-white">{step.title}</span>
            </span>
          )}
          <span className="absolute right-8 bottom-7 grid size-12 place-items-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition group-hover:border-gold group-hover:text-gold">
            <Play size={18} className="translate-x-px" />
          </span>
          {reel.length > 1 && (
            <span aria-hidden className="absolute inset-x-8 bottom-3 flex gap-1">
              {reel.map((s, i) => (
                <span key={s.title} className={`h-0.5 flex-1 rounded-full transition-colors ${i === clip ? 'bg-gold' : i < clip ? 'bg-gold/50' : 'bg-white/20'}`} />
              ))}
            </span>
          )}
        </button>

        {/* Details */}
        <div className="flex flex-col p-7 sm:p-10">
          <p className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
            <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">{String(number).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            {project.classification}
          </p>
          <h2 className="mt-5 font-serif text-6xl leading-none font-light tracking-tight text-fg sm:text-7xl">{project.title}</h2>
          {cs.thesis && <p className="mt-4 font-serif text-lg leading-snug text-fg2 italic">“{cs.thesis.title}”</p>}
          <p className="mt-5 leading-[1.8] text-fg2">{project.summary}</p>

          {highlights.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <li key={h.label} className="flex items-baseline gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs text-fg">
                  <span className="font-serif text-base text-gold">{h.value}</span>
                  {h.label.replace(/\s*\(.*?\)/g, '').split(':')[0]}
                </li>
              ))}
            </ul>
          )}

          {metrics.length > 0 && (
            <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse justify-end bg-card px-4 py-3.5">
                  <dt className="mt-1.5 text-[11px] leading-snug text-muted">{m.label}</dt>
                  <dd className="font-serif text-2xl leading-none text-gold lining-nums sm:text-3xl">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              className="group/cta inline-flex min-h-12 items-center gap-3 rounded-md bg-gold px-6 text-sm font-medium tracking-wide text-bg shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:gap-5 hover:shadow-xl hover:shadow-gold/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {content.projectUi.caseStudyButton}
              <ArrowRight size={18} strokeWidth={2} className="transition-transform duration-300 group-hover/cta:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
