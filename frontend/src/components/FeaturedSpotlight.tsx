import { ArrowRight, BookOpen, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { content } from '../content'
import type { Project } from '../types'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Spotlight for a featured project on the /work page: title, thesis and poster on top,
 * and its "How it works" stages as a full-width pipeline strip that plays each stage's clip in turn.
 */
export function FeaturedSpotlight({ project, number, onOpen }: { project: Project; number: number; onOpen: (p: Project) => void }) {
  const cs = project.caseStudy
  const stages = cs.howItWorks ?? []
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [motionOk] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const box = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const playing = motionOk && inView
  const highlights = cs.comparison?.highlights ?? []
  const facts = highlights.length
    ? highlights.map((h) => ({ value: h.value, label: h.label.replace(/\s*\(.*?\)/g, '').split(':')[0] }))
    : (cs.metrics?.slice(0, 3) ?? [])

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Play the active stage's clip while on screen; still images advance on a timer instead.
  useEffect(() => {
    const v = video.current
    if (v) {
      if (playing) v.play().catch(() => {})
      else v.pause()
      return
    }
    if (!playing || stages.length < 2) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % stages.length), 4000)
    return () => window.clearTimeout(id)
  }, [playing, active, stages.length])

  return (
    <article
      ref={box}
      className="relative overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-2xl shadow-gold/5"
      aria-label={`${content.projectUi.featuredLabel}: ${project.title}`}
    >
      <span aria-hidden className="pointer-events-none absolute -top-40 -left-32 size-120 rounded-full bg-gold/10 blur-3xl" />

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

      {/* Title + poster */}
      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-10">
        <div className="flex flex-col">
          <p className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
            <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">{pad(number)}</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            {project.classification}
          </p>
          <h2 className="mt-5 font-serif text-6xl leading-none font-light tracking-tight text-fg sm:text-7xl">{project.title}</h2>
          {cs.thesis && <p className="mt-4 font-serif text-lg leading-snug text-fg2 italic">“{cs.thesis.title}”</p>}
          <p className="mt-5 leading-[1.8] text-fg2">{project.summary}</p>

          {facts.length > 0 && (
            <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {facts.map((m) => (
                <div key={m.label} className="flex flex-col-reverse justify-end bg-card px-4 py-3.5">
                  <dt className="mt-1.5 text-[11px] leading-snug text-muted">{m.label}</dt>
                  <dd className="font-serif text-3xl leading-none text-gold lining-nums">{m.value}</dd>
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

        {project.image && (
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`${content.projectUi.caseStudyButton}: ${project.title}`}
            className="group relative self-center overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50"
          >
            <img src={project.image} alt={`${project.title} poster`} className="w-full transition-transform duration-700 group-hover:scale-[1.02]" />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden /> Thesis poster
            </span>
          </button>
        )}
      </div>

      {/* The pipeline: one tile per stage, played in turn */}
      {stages.length > 0 && (
        <div className="relative border-t border-gold/20 bg-bg/40 px-6 pt-7 pb-8 sm:px-8 lg:px-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">{stages.length}-stage pipeline</p>
            <p className="font-serif text-xl text-fg italic sm:text-2xl">
              {cs.howItWorksIntro ? `${cs.howItWorksIntro.lead} ${cs.howItWorksIntro.accent}` : 'From start to finish.'}
            </p>
          </div>

          {/* Progress rail (wide screens) */}
          <div aria-hidden className="relative mb-4 hidden lg:block">
            <div className="absolute top-1/2 h-px -translate-y-1/2 bg-line" style={{ left: `${50 / stages.length}%`, right: `${50 / stages.length}%` }}>
              <div
                className="h-full origin-left bg-gold transition-transform duration-700"
                style={{ transform: `scaleX(${stages.length > 1 ? active / (stages.length - 1) : 1})` }}
              />
            </div>
            <div className="relative grid" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
              {stages.map((s, i) => (
                <span key={s.title} className="flex justify-center">
                  <span
                    className={`grid size-7 place-items-center rounded-full border font-mono text-[10px] transition-colors duration-300 ${
                      i === active ? 'border-gold bg-gold text-bg' : i < active ? 'border-gold/70 bg-card text-gold' : 'border-line bg-card text-muted'
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8" aria-label={`${project.title} stages`}>
            {stages.map((s, i) => {
              const on = i === active
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? 'step' : undefined}
                    className={`group relative block w-full overflow-hidden rounded-lg border text-left transition-all duration-300 ${
                      on ? 'border-gold shadow-lg shadow-gold/15' : 'border-line hover:border-gold/50'
                    }`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-black">
                      {on && s.video ? (
                        <video
                          ref={video}
                          key={s.video}
                          src={s.video}
                          poster={s.poster}
                          muted
                          playsInline
                          autoPlay={playing}
                          onEnded={() => setActive((a) => (a + 1) % stages.length)}
                          className="size-full object-cover"
                          aria-hidden
                        />
                      ) : (
                        <img
                          src={s.poster}
                          alt=""
                          loading="lazy"
                          className={`size-full object-cover transition duration-500 ${on ? '' : 'opacity-60 grayscale-[40%] group-hover:opacity-90 group-hover:grayscale-0'}`}
                        />
                      )}
                      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
                      {on && playing && s.video && (
                        <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] text-white uppercase backdrop-blur">
                          <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> Live
                        </span>
                      )}
                      <span className="absolute bottom-2 left-2.5 font-mono text-[10px] text-white/80 lg:hidden">{pad(i + 1)}</span>
                    </span>
                    <span className={`block px-3 py-2.5 transition-colors ${on ? 'bg-gold/10' : 'bg-card'}`}>
                      <span className={`block font-mono text-[9px] tracking-[0.16em] uppercase ${on ? 'text-gold' : 'text-muted'}`}>
                        {s.stage ?? `Stage ${pad(i + 1)}`}
                      </span>
                      <span className={`mt-0.5 block truncate text-sm font-medium ${on ? 'text-fg' : 'text-fg2'}`}>{s.title}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <p className="mt-5 min-h-6 text-sm text-fg2" aria-live="polite">
            <span className="mr-2 font-mono text-xs text-gold">
              {pad(active + 1)} / {pad(stages.length)}
            </span>
            {stages[active].text}
          </p>
        </div>
      )}
    </article>
  )
}
