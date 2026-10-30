import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'

const { education } = content

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-28 lg:py-36">
      <SectionHeading number="05" label="Education" id="education-title" title={education.heading} />
      <ol className="space-y-10">
        {education.entries.map((e) => (
          <li key={e.degree}>
            <Reveal>
              <article className="border-t border-line pt-6">
                <h3 className="text-2xl font-medium text-fg">{e.degree}</h3>
                <p className="mt-2 text-fg2">{e.institution}</p>
                {e.period && <p className="mt-1 font-mono text-xs text-muted">{e.period}</p>}
                <p className="mt-3 font-mono text-xs text-muted">{e.location}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
