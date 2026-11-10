import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'

const { experience } = content

/** Experience: a sticky heading beside a timeline of internships and projects, then the roles I take on. */
export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-28 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
            <span className="text-gold">03</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            Experience
          </p>
          <h2
            id="experience-title"
            className="mt-6 font-serif text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] font-light tracking-tight text-fg [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic"
          >
            <RichText text={experience.heading} />
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-fg2">{experience.description}</p>
        </Reveal>

        <div className="min-w-0">
          {/* Timeline of internships and major projects */}
          {experience.entries.length > 0 && (
            <>
              <Reveal delay={0.05}>
                <p className="mb-6 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{experience.entriesLabel}</p>
              </Reveal>
              <ol className="relative space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-px before:bg-line sm:space-y-8">
                {experience.entries.map((e, i) => (
                  <li key={`${e.organization}-${e.role}`} className="relative pl-9 sm:pl-12">
                    <span aria-hidden className="absolute top-7 left-0 flex size-[15px] items-center justify-center rounded-full border border-gold/60 bg-bg sm:top-9">
                      <span className="size-[7px] rounded-full bg-gold" />
                    </span>
                    <Reveal delay={0.1 + i * 0.05}>
                      <article className="group rounded-2xl border border-line bg-card p-6 transition-colors hover:border-gold/40 sm:p-8">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="font-mono text-xs tracking-[0.14em] text-gold uppercase">{e.period}</span>
                          {e.kind && (
                            <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.16em] text-gold uppercase">
                              {e.kind}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-4 font-serif text-3xl leading-tight font-light text-fg transition-colors group-hover:text-gold sm:text-4xl">{e.role}</h3>
                        <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{e.organization}</p>
                        <p className="mt-4 max-w-2xl leading-relaxed text-fg2">{e.description}</p>
                        {e.highlights && e.highlights.length > 0 && (
                          <ul className="mt-5 space-y-2.5">
                            {e.highlights.map((h) => (
                              <li key={h} className="flex gap-3 leading-relaxed text-fg2">
                                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold/70" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                        <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5" aria-label={experience.technologiesLabel}>
                          {e.tech.map((t) => (
                            <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-fg2">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </>
          )}

          {/* Roles taken on across projects */}
          <Reveal delay={0.1}>
            <p className="mt-16 mb-6 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{experience.rolesLabel}</p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {experience.roles.map((r, i) => (
              <li key={r.title}>
                <Reveal delay={0.1 + i * 0.05} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line p-6 transition-colors hover:border-gold/40">
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 h-px w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full"
                    />
                    <span className="font-serif text-xl text-gold/80 italic lining-nums">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 font-serif text-2xl leading-tight font-light text-fg transition-colors group-hover:text-gold">{r.title}</h3>
                    <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{r.context}</p>
                    <p className="mt-3 text-sm leading-relaxed text-fg2">{r.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={experience.technologiesLabel}>
                      {r.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-fg2">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg2">
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
                  <span className="relative size-1.5 rounded-full bg-gold" />
                </span>
                {experience.now.title}
              </span>
              {experience.now.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
