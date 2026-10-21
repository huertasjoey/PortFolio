import { GraduationCap, MapPin } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { education } from '../data/education'

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-24 lg:py-28">
      <SectionHeading number="05" label="Education">
        <span id="education-title">
          Engineering my <strong>foundation.</strong>
        </span>
      </SectionHeading>
      <ol className="relative space-y-5 border-l border-line pl-8">
        {education.map((e) => (
          <li key={e.degree} className="relative">
            <span className="absolute top-8 -left-[37px] size-2.5 rounded-full border-2 border-accent bg-bg" aria-hidden />
            <Reveal>
              <article className="theme-fade flex gap-5 rounded-[18px] border border-line bg-card p-6 sm:p-8">
                <span className="hidden size-12 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent sm:grid">
                  <GraduationCap size={22} />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-fg">{e.degree}</h3>
                  <p className="mt-1 text-fg2">{e.institution}</p>
                  <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
                    <MapPin size={13} /> {e.location}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
