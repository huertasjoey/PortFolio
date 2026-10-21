import { ArrowDown, Mail } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'
import { focusAreas, profile } from '../data/profile'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex min-h-svh flex-col justify-center py-24 lg:py-28">
      <Reveal>
        <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent">01 — ABOUT</p>
        <h1
          id="about-title"
          className="max-w-4xl text-4xl leading-[1.08] font-light tracking-tight text-fg sm:text-5xl lg:text-7xl [&_strong]:font-bold"
        >
          Building at the intersection of <strong>hardware</strong>, <strong>software</strong>, and{' '}
          <strong>intelligence.</strong>
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-fg2 sm:text-lg">
          <p>
            I'm <span className="text-fg">{profile.name}</span>, a Computer Engineering graduate growing into
            full-stack web development, IoT, embedded systems and AI engineering.
          </p>
          <p>
            I like problems that cross layers — a sensor reading that ends up on a screen, a microcontroller that
            decides when to act, an interface that makes the data useful. I start from the real-world need, sketch the
            system end to end, then build and test it in small steps.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">Focus areas</h2>
          <ul className="space-y-2">
            {focusAreas.map((a) => (
              <li key={a} className="flex items-center gap-3 border-b border-line pb-2 text-sm text-fg2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="#work">
          Explore my projects <ArrowDown size={16} />
        </ButtonLink>
        <ButtonLink href="#contact" variant="secondary">
          <Mail size={16} /> Get in touch
        </ButtonLink>
      </Reveal>
    </section>
  )
}
