import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { HowItWorksIntro, ProcessStep } from '../types'

const STEP_SECONDS = 4
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * "How it works" as a pipeline console: a camera-style player loops each stage's clip with a HUD,
 * a spec readout shows that stage's real numbers, and a vertical pipeline rail tracks progress.
 * Advances on its own while on screen; waits for Play when the visitor prefers reduced motion.
 */
export function HowItWorks({ steps, title, index, intro }: { steps: ProcessStep[]; title: string; index?: string; intro?: HowItWorksIntro }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [inView, setInView] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const running = playing && inView
  const step = steps[active]
  const go = (i: number) => setActive((i + steps.length) % steps.length)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Step timer (JS, not CSS, so reduced-motion settings can't make it skip).
  const [timer, setTimer] = useState({ step: 0, value: 0 })
  const progress = timer.step === active ? timer.value : 0
  const elapsed = useRef({ step: 0, seconds: 0 })
  useEffect(() => {
    if (!running) return
    if (elapsed.current.step !== active) elapsed.current = { step: active, seconds: 0 }
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      elapsed.current.seconds += (now - last) / 1000
      last = now
      if (elapsed.current.seconds >= STEP_SECONDS) {
        setActive((a) => (a + 1) % steps.length)
        return
      }
      setTimer({ step: active, value: elapsed.current.seconds / STEP_SECONDS })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [running, active, steps.length])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (running) v.play().catch(() => {})
    else v.pause()
  }, [running, active])

  const clock = (active + progress) * STEP_SECONDS
  const timecode = `T+${pad(Math.floor(clock / 60))}:${pad(Math.floor(clock % 60))}.${Math.floor((clock % 1) * 10)}`

  return (
    <div ref={box}>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
            {index && (
              <>
                <span className="text-gold">{index}</span>
                <span className="h-px w-8 bg-line" aria-hidden />
              </>
            )}
            {title}
          </p>
          <h3 className="font-serif text-4xl leading-[1.05] font-light text-fg sm:text-5xl">
            {intro?.lead ?? 'From start'} <em className="text-gold">{intro?.accent ?? 'to finish.'}</em>
          </h3>
        </div>
        <ul className="flex flex-wrap gap-2 font-mono text-[11px] tracking-wide text-fg2">
          {[`${steps.length} stages`, ...(intro?.chips ?? [])].map((c) => (
            <li key={c} className="rounded-full border border-line px-3 py-1.5">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Player + readout */}
        <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-card">
          <div className="relative aspect-video overflow-hidden bg-black">
            <AnimatePresence initial={false}>
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {step.video ? (
                  <video ref={video} src={step.video} poster={step.poster} muted loop playsInline autoPlay={running} preload="auto" aria-hidden className="size-full object-cover" />
                ) : (
                  <>
                    {/* Stills: blurred backdrop + the whole image, with a slow push-in */}
                    <img src={step.poster} alt="" className="absolute inset-0 size-full scale-110 object-cover opacity-60 blur-2xl" />
                    <motion.img
                      src={step.poster}
                      alt=""
                      initial={{ scale: 1 }}
                      animate={{ scale: running ? 1.06 : 1 }}
                      transition={{ duration: STEP_SECONDS + 1, ease: 'linear' }}
                      className="relative size-full object-contain"
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* HUD */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-black/40" />
            {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((c) => (
              <span key={c} aria-hidden className={`pointer-events-none absolute size-5 border-gold/70 ${c}`} />
            ))}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-8 pt-6 font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase sm:text-[11px]">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  {running && step.video && <span className="absolute inset-0 animate-ping rounded-full bg-red-500/70" />}
                  <span className={`relative size-2 rounded-full ${running && step.video ? 'bg-red-500' : running ? 'bg-gold' : 'bg-white/40'}`} />
                </span>
                {step.video ? `${running ? 'Live' : 'Paused'} · Cam 01` : `${running ? 'Playing' : 'Paused'} · Frame ${pad(active + 1)}`}
              </span>
              <span className="tabular-nums">{timecode}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 px-6 pb-7 sm:px-8 sm:pb-8">
              <div className="flex items-end justify-between gap-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="min-w-0"
                    aria-live={playing ? 'off' : 'polite'}
                  >
                    <p className="inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-black/40 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-gold uppercase backdrop-blur">
                      Stage {pad(active + 1)} · {step.stage ?? step.title}
                    </p>
                    <p className="mt-2 font-serif text-3xl leading-tight text-white sm:text-5xl">{step.title}</p>
                    <p className="mt-1 max-w-lg text-sm text-white/80 max-sm:hidden">{step.text}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex shrink-0 gap-1.5">
                  {[
                    { label: 'Previous step', icon: <ChevronLeft size={18} />, on: () => go(active - 1) },
                    { label: playing ? 'Pause' : 'Play', icon: playing ? <Pause size={16} /> : <Play size={16} />, on: () => setPlaying((p) => !p) },
                    { label: 'Next step', icon: <ChevronRight size={18} />, on: () => go(active + 1) },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={b.on}
                      aria-label={b.label}
                      className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      {b.icon}
                    </button>
                  ))}
                </div>
              </div>
              {/* Whole-pipeline progress, one segment per stage */}
              <div className="mt-5 flex gap-1" aria-hidden>
                {steps.map((s, i) => (
                  <span key={s.title} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
                    <span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${i < active ? 1 : i === active ? progress : 0})` }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Spec readout for the current stage */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.dl
              key={step.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x"
            >
              {(step.specs ?? []).map(([k, v]) => (
                <div key={k} className="px-5 py-4">
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">{k}</dt>
                  <dd className="mt-1 text-sm text-fg">{v}</dd>
                </div>
              ))}
              <div className="px-5 py-4 max-sm:col-span-2 sm:ml-auto">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Next</dt>
                <dd className="mt-1">
                  <button type="button" onClick={() => go(active + 1)} className="inline-flex items-center gap-1 text-sm text-gold hover:underline">
                    {steps[(active + 1) % steps.length].title} <ChevronRight size={14} />
                  </button>
                </dd>
              </div>
            </motion.dl>
          </AnimatePresence>
        </div>

        {/* Pipeline rail */}
        <ol className="relative rounded-xl border border-line bg-card p-3 lg:flex lg:flex-col" aria-label="Pipeline stages">
          {steps.map((s, i) => {
            const on = i === active
            const done = i < active
            return (
              <li key={s.title} className="relative lg:flex-1">
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute top-9 bottom-[-0.5rem] left-6 w-px bg-line">
                    <span className="block w-full origin-top bg-gold transition-transform duration-500" style={{ height: '100%', transform: `scaleY(${done ? 1 : on ? progress : 0})` }} />
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={on ? 'step' : undefined}
                  className={`relative flex w-full items-start gap-3.5 rounded-lg px-2.5 py-2 text-left transition-colors ${on ? 'bg-bg/70' : 'hover:bg-bg/40'}`}
                >
                  <span
                    className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-colors ${
                      on ? 'border-gold bg-gold text-bg' : done ? 'border-gold/70 bg-card text-gold' : 'border-line bg-card text-muted'
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1 pt-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={`text-sm font-medium ${on ? 'text-fg' : 'text-fg2'}`}>{s.title}</span>
                      {s.stage && <span className="font-mono text-[9px] tracking-[0.16em] text-muted uppercase">{s.stage}</span>}
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-1 pb-0.5 text-[13px] leading-relaxed text-fg2">{s.text}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
