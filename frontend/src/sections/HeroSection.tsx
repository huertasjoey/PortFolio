import { ArrowRight, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { RichText } from '../components/RichText'
import { content } from '../content'

const { hero, profile } = content

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
})

/**
 * Opening screen above About: an editorial serif statement with a quote on the left,
 * and a live "signal path" (sense → infer → act → show) on the right.
 */
export function HeroSection() {
  const [step, setStep] = useState(0)
  const [motionOk] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (!motionOk) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % hero.chain.length), 1600)
    return () => window.clearInterval(id)
  }, [motionOk])

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-svh flex-col justify-center py-28">
      {/* Faint engineering grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -right-4 -left-4 text-fg opacity-[0.06] sm:-right-8 sm:-left-8 lg:-right-12 lg:-left-12"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 60% 45%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 60% 45%, black 20%, transparent 80%)',
        }}
      />
      <span aria-hidden className="pointer-events-none absolute top-1/4 right-0 size-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative grid items-center gap-16 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-20">
        {/* Statement */}
        <div>
          <motion.p {...rise(0.05)} className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
            <span className="text-fg">{profile.name}</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            <span>{profile.location}</span>
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            id="hero-title"
            className="mt-8 max-w-4xl font-serif text-[clamp(2.75rem,5.6vw,5.75rem)] leading-[0.98] font-light tracking-tight text-fg [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic"
          >
            <RichText text={hero.headline} />
          </motion.h1>

          <motion.p {...rise(0.3)} className="mt-8 max-w-xl text-base leading-relaxed text-fg2 sm:text-lg">
            {hero.description}
          </motion.p>

          <motion.figure {...rise(0.42)} className="mt-8 max-w-xl border-l-2 border-gold/60 pl-5">
            <blockquote className="flex gap-3 font-serif text-xl leading-snug text-fg italic sm:text-2xl">
              <Quote size={18} className="mt-1 shrink-0 text-gold" aria-hidden />
              <p>{hero.quote.text}</p>
            </blockquote>
            <figcaption className="mt-2 pl-[30px] font-mono text-[11px] tracking-[0.2em] text-muted uppercase">— {hero.quote.author}</figcaption>
          </motion.figure>

          <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-gold px-6 text-sm font-medium tracking-wide text-bg shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:gap-4 hover:shadow-xl hover:shadow-gold/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {hero.cta}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-md border border-line px-6 text-sm text-fg transition-colors duration-300 hover:border-gold/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>
        </div>

        {/* Signal path */}
        <motion.figure {...rise(0.35)} aria-label="What I build, as a signal path: sense, infer, act, show" className="relative">
          <div className="rounded-2xl border border-line bg-card/70 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              <span className="flex items-center gap-2">
                <span className="relative flex size-1.5">
                  {motionOk && <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />}
                  <span className="relative size-1.5 rounded-full bg-gold" />
                </span>
                Signal path
              </span>
              <span className="tabular-nums">
                {String(step + 1).padStart(2, '0')} / {String(hero.chain.length).padStart(2, '0')}
              </span>
            </div>

            <ol className="relative">
              {hero.chain.map((c, i) => {
                const on = i === step
                const done = i < step
                return (
                  <li key={c.label} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < hero.chain.length - 1 && (
                      <span aria-hidden className="absolute top-9 bottom-0 left-[17px] w-px bg-line">
                        <span
                          className="block h-full w-full origin-top bg-gold transition-transform duration-700"
                          style={{ transform: `scaleY(${done ? 1 : 0})` }}
                        />
                      </span>
                    )}
                    <span
                      className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-all duration-500 ${
                        on ? 'border-gold bg-gold text-bg shadow-lg shadow-gold/30' : done ? 'border-gold/60 bg-card text-gold' : 'border-line bg-card text-muted'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 rounded-lg border px-4 py-2.5 transition-all duration-500 ${
                        on ? 'border-gold/50 bg-gold/10' : 'border-transparent'
                      }`}
                    >
                      <span className={`block font-mono text-xs tracking-[0.2em] uppercase transition-colors ${on ? 'text-gold' : 'text-fg'}`}>{c.label}</span>
                      <span className="mt-0.5 block text-sm text-fg2">{c.detail}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
          <figcaption className="mt-3 text-center font-mono text-[10px] tracking-[0.2em] text-muted uppercase">From the sensor to the screen</figcaption>
        </motion.figure>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-muted uppercase transition-colors hover:text-gold [@media(min-height:1000px)]:sm:flex"
      >
        <span className="translate-x-[0.2em]">{hero.scrollLabel}</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[hero-scroll_1.8s_ease-in-out_infinite] bg-gold" />
        </span>
      </a>
    </section>
  )
}
