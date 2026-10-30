import type { ReactNode } from 'react'
import { SiCss, SiHtml5, SiJavascript, SiPython, SiReact, SiSupabase, SiTailwindcss } from 'react-icons/si'
import { LogoLoop } from '../components/LogoLoop'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { content } from '../content'
import type { TechIcon } from '../types'

const { skills } = content

/** Add a new logo here, then use its key in `skills.logos` in src/content.ts. */
const techIcons: Record<TechIcon, ReactNode> = {
  react: <SiReact />,
  javascript: <SiJavascript />,
  html: <SiHtml5 />,
  css: <SiCss />,
  tailwind: <SiTailwindcss />,
  supabase: <SiSupabase />,
  python: <SiPython />,
}

const logos = skills.logos.map(({ icon, ...rest }) => ({ node: techIcons[icon], ...rest }))

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-28 lg:py-36">
      <SectionHeading number="04" label="Skills" id="skills-title" title={skills.heading} />
      <div className="mb-20 border-y border-line py-8 text-muted">
        <LogoLoop
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={56}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel={skills.logosLabel}
        />
      </div>
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {skills.groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="h-full border-t border-line pt-6">
              <h3 className="mb-5 text-lg font-medium text-fg">{group.title}</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
