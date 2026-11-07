import { GraduationCap, MapPin } from 'lucide-react'
import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'

const { education } = content

/** Education: one credential card per school, with the school's wordmark, campus backdrop and areas of study. */
export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-28 lg:py-36">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          <span className="text-gold">05</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          Education
        </p>
        <h2
          id="education-title"
          className="mt-6 font-serif text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.02] font-light tracking-tight text-fg [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic"
        >
          <RichText text={education.heading} />
        </h2>
      </Reveal>

      <ol className="mt-12 space-y-8">
        {education.entries.map((e) => (
          <li key={e.degree}>
            <Reveal delay={0.1}>
              <article className="overflow-hidden rounded-2xl border border-line bg-card">
                {/* Banner: campus backdrop + wordmark plate */}
                <div className="relative isolate overflow-hidden border-b border-line">
                  {e.photo && (
                    <>
                      <img src={e.photo} alt="" aria-hidden className="absolute inset-0 -z-10 size-full object-cover opacity-40 grayscale-[30%]" />
                      <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-card via-card/85 to-card/40" />
                    </>
                  )}
                  <div className="flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                      {e.logo ? (
                        <div className="inline-flex rounded-lg bg-[#fbf8f3] px-5 py-3.5 shadow-lg shadow-black/20 ring-1 ring-black/5">
                          <img src={e.logo} alt={e.institution} className="h-5 w-auto sm:h-7" />
                        </div>
                      ) : (
                        <p className="text-lg text-fg">{e.institution}</p>
                      )}
                      <h3 className="mt-7 max-w-2xl font-serif text-3xl leading-tight font-light text-fg sm:text-4xl">{e.degree}</h3>
                      <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-fg2">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} strokeWidth={1.5} className="text-muted" /> {e.location}
                        </span>
                      </p>
                    </div>
                    {e.period && (
                      <span className="flex shrink-0 items-center gap-2.5 self-start rounded-full border border-gold/50 bg-bg/70 px-4 py-2 text-sm text-fg backdrop-blur lg:self-end">
                        <GraduationCap size={16} strokeWidth={1.5} className="text-gold" /> {e.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Areas of study */}
                {e.focus && e.focus.length > 0 && (
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                    <p className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{education.focusLabel}</p>
                    <ul className="flex flex-wrap gap-2">
                      {e.focus.map((f) => (
                        <li key={f} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg2">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
