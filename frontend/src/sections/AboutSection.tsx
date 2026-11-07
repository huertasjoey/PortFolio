import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { ZoomableImage } from '../components/ZoomableImage'
import { content } from '../content'

const { about, profile } = content

/** About: framed portrait beside an editorial statement, a profile fact sheet, and a "how I work" process strip. */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-28 lg:py-36">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          <span className="text-gold">01</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          About
        </p>
      </Reveal>

      <div className={`mt-10 grid items-start gap-12 lg:gap-16 ${about.photo.src ? 'lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]' : ''}`}>
        {/* Portrait */}
        {about.photo.src && (
          <Reveal delay={0.05} className="mx-auto w-full max-w-80 lg:mx-0 lg:max-w-none">
            <figure className="relative">
              <div className="relative overflow-hidden rounded-xl border border-line bg-card p-2">
                <ZoomableImage
                  src={about.photo.src}
                  alt={about.photo.alt}
                  caption={about.photo.caption}
                  className="w-full overflow-hidden rounded-lg"
                  imgClassName="aspect-4/5 w-full object-cover object-top"
                />
                {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((c) => (
                  <span key={c} aria-hidden className={`pointer-events-none absolute size-4 border-gold/70 ${c}`} />
                ))}
              </div>
              <figcaption className="mt-4 flex items-start justify-between gap-4">
                <span>
                  <span className="block text-sm font-medium text-fg">{profile.name}</span>
                  <span className="mt-0.5 block font-mono text-[11px] tracking-wide text-muted">{about.photo.caption}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-fg">
                  <span className="relative flex size-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {profile.availability}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        )}

        {/* Statement */}
        <div className="min-w-0">
          <Reveal delay={0.1}>
            <h2
              id="about-title"
              className="max-w-3xl font-serif text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] font-light tracking-tight text-fg [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic"
            >
              <RichText text={about.headline} />
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-fg2 sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          {/* Fact sheet */}
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {about.facts.map((f) => (
                <div key={f.label} className="bg-bg px-4 py-4 transition-colors hover:bg-card">
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">{f.label}</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* How I work */}
      <Reveal delay={0.1} className="mt-20">
        <div className="mb-6 flex items-center gap-4">
          <h3 className="font-mono text-xs tracking-[0.18em] text-fg2 uppercase">{about.processTitle}</h3>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.process.map((step, i) => (
            <li key={step.title} className="group relative bg-bg p-6 transition-colors hover:bg-card">
              <span className="flex items-center justify-between">
                <span className="font-serif text-4xl leading-none text-gold/80 italic lining-nums">{String(i + 1).padStart(2, '0')}</span>
                {i < about.process.length - 1 && (
                  <span aria-hidden className="hidden font-mono text-muted transition-transform duration-300 group-hover:translate-x-1 lg:inline">
                    →
                  </span>
                )}
              </span>
              <h4 className="mt-5 text-base font-medium text-fg">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-fg2">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
