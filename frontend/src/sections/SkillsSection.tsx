import { Brain, Code2, Cpu, Database, type LucideIcon } from 'lucide-react'
import { LogoLoop } from '../components/LogoLoop'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { SiCss, SiHtml5, SiJavascript, SiPython, SiReact, SiSupabase, SiTailwindcss } from 'react-icons/si'
import { skillGroups, type SkillGroup } from '../data/skills'

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev', hoverColor: '#61dafb' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/docs/Web/JavaScript', hoverColor: '#f7df1e' },
  { node: <SiHtml5 />, title: 'HTML', href: 'https://developer.mozilla.org/docs/Web/HTML', hoverColor: '#e34f26' },
  { node: <SiCss />, title: 'CSS', href: 'https://developer.mozilla.org/docs/Web/CSS', hoverColor: '#1572b6' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com', hoverColor: '#38bdf8' },
  { node: <SiSupabase />, title: 'Supabase', href: 'https://supabase.com', hoverColor: '#3ecf8e' },
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org', hoverColor: '#3776ab' },
]

const icons: Record<SkillGroup['icon'], LucideIcon> = { code: Code2, database: Database, cpu: Cpu, brain: Brain }

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 lg:py-28">
      <SectionHeading number="04" label="Skills">
        <span id="skills-title">
          Tools I <strong>work with.</strong>
        </span>
      </SectionHeading>
      <div className="theme-fade mb-10 rounded-[18px] border border-line bg-card py-6 text-muted">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={56}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Technologies I use"
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, i) => {
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
