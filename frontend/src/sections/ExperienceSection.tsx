import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { content } from '../content'

const { experience } = content

function ExperienceTimeline() {
  return (
    <ol className="relative space-y-10 border-l border-line pl-8">
      {experience.entries.map((e) => (
        <li key={`${e.organization}-${e.role}`} className="relative">
          <span className="absolute top-1.5 -left-[37px] size-2.5 rounded-full border-2 border-accent bg-bg" aria-hidden />
          <p className="font-mono text-xs text-muted">{e.period}</p>
          <h3 className="mt-1 text-xl font-semibold text-fg">{e.role}</h3>
          <p className="text-sm text-accent">{e.organization}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-fg2">{e.description}</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={experience.technologiesLabel}>
            {e.tech.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

function IndependentWork() {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-3">
        {experience.fallbackItems.map((item, i) => (
          <li key={item.title} className="theme-fade rounded-[18px] border border-line bg-card p-6">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-lg font-semibold text-fg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg2">{item.text}</p>
          </li>
        ))}
      </ul>
      {experience.fallbackNote && <p className="mt-5 font-mono text-xs text-muted">{experience.fallbackNote}</p>}
    </div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 lg:py-28">
      <SectionHeading number="03" label="Experience" id="experience-title" title={experience.heading} />
      <Reveal>{experience.entries.length ? <ExperienceTimeline /> : <IndependentWork />}</Reveal>
    </section>
  )
}
