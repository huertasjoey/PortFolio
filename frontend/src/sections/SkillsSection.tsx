import { Brain, Code2, Cpu, Database, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { SiCss, SiHtml5, SiJavascript, SiPython, SiReact, SiSupabase, SiTailwindcss } from 'react-icons/si'
import { LogoLoop } from '../components/LogoLoop'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { content } from '../content'
import type { SkillGroup, TechIcon } from '../types'

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

const icons: Record<SkillGroup['icon'], LucideIcon> = { code: Code2, database: Database, cpu: Cpu, brain: Brain }

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 lg:py-28">
      <SectionHeading number="04" label="Skills" id="skills-title" title={skills.heading} />
      <div className="theme-fade mb-10 rounded-[18px] border border-line bg-card py-6 text-muted">
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
      <div className="grid gap-5 md:grid-cols-2">
        {skills.groups.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="theme-fade h-full rounded-[18px] border border-line bg-card p-6 transition-colors hover:border-accent/50">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-lg font-semibold text-fg">{group.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
