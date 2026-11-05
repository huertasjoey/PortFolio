import { ArrowRight, Brain, CircuitBoard, Code2, Cpu, Database, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { SiCss, SiHtml5, SiJavascript, SiKicad, SiPython, SiReact, SiSupabase, SiTailwindcss } from 'react-icons/si'
import { Link } from '../components/Link'
import { LogoLoop } from '../components/LogoLoop'
import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'
import { countByCategory, fill } from '../lib/utils'
import type { SkillGroup, TechIcon } from '../types'

const { skills, projectUi } = content

/** Add a new logo here, then use its key in `skills.logos` in src/content.ts. */
const techIcons: Record<TechIcon, ReactNode> = {
  react: <SiReact />,
  javascript: <SiJavascript />,
  html: <SiHtml5 />,
  css: <SiCss />,
  tailwind: <SiTailwindcss />,
  supabase: <SiSupabase />,
  python: <SiPython />,
  kicad: <SiKicad />,
}

const logos = skills.logos.map(({ icon, ...rest }) => ({ node: techIcons[icon], ...rest }))

/** Small logo shown inside a skill chip, matched by the skill's name. */
const chipIcons: Record<string, ReactNode> = {
  React: <SiReact />,
  JavaScript: <SiJavascript />,
  HTML: <SiHtml5 />,
  CSS: <SiCss />,
  'Tailwind CSS': <SiTailwindcss />,
  Supabase: <SiSupabase />,
  Python: <SiPython />,
  KiCad: <SiKicad />,
}

const groupIcons: Record<SkillGroup['icon'], LucideIcon> = {
  cpu: Cpu,
  code: Code2,
  circuit: CircuitBoard,
  database: Database,
  brain: Brain,
}

/** Bento widths on large screens: two wide cards, then three equal ones, repeating. */
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const Icon = groupIcons[group.icon]
  const count = group.category ? countByCategory(group.category) : 0
  const featured = index === 0

  return (
    <article
      className={`group relative flex w-full flex-col overflow-hidden rounded-[3px] border p-7 transition-colors duration-500 sm:p-9 ${
        featured ? 'border-gold/35 bg-card' : 'border-line bg-card/40 hover:border-gold/35'
      }`}
    >
      {/* Lead card gets a soft gold glow; the rest pick it up on hover. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-gold/15 blur-3xl transition-opacity duration-700 ${
          featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
        }`}
      />

      <div className="relative flex items-start gap-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
          <Icon size={20} strokeWidth={1.25} />
        </span>
        <div className="min-w-0">
          <p className="font-serif text-sm text-gold italic lining-nums">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-0.5 font-serif text-3xl leading-tight font-light text-fg">{group.title}</h3>
          {group.description && <p className="mt-2 text-sm leading-relaxed text-fg2">{group.description}</p>}
        </div>
      </div>

      <ul className="relative mt-8 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
        {group.items.map((s) => (
          <li
            key={s}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-3.5 py-1.5 text-[13px] text-fg2 transition-colors duration-300 hover:border-gold/60 hover:text-fg"
          >
            {chipIcons[s] && <span className="text-[13px] text-muted">{chipIcons[s]}</span>}
            {s}
          </li>
        ))}
      </ul>

      {count > 0 && (
        <div className="relative mt-auto pt-8">
          <div className="border-t border-line pt-5">
            <Link
              href={`/work?category=${group.category}`}
              className="group/link inline-flex min-h-11 items-center gap-2 text-sm tracking-wide text-fg transition-colors hover:text-gold"
            >
              {fill(skills.seeProjects, { count, projects: count === 1 ? projectUi.projectSingular : projectUi.projectPlural })}
              <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}

export function SkillsSection() {
  const groups = skills.groups

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-28 lg:py-40">
      <header className="mb-16 md:mb-20">
        <p className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
          <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">04</span>
          <span className="h-px w-12 bg-line" aria-hidden />
          Skills
        </p>
        <h2 className="font-serif text-6xl leading-[0.95] font-light tracking-tight text-fg sm:text-7xl lg:text-8xl [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic">
          <span id="skills-title">
            <RichText text={skills.heading} />
          </span>
        </h2>
        <p className="mt-10 max-w-md text-base leading-[1.8] text-fg2">{skills.description}</p>
      </header>

      <Reveal className="mb-10 md:mb-14">
        <p className="mb-6 text-[11px] tracking-[0.3em] text-muted uppercase">{skills.logosLabel}</p>
        <div className="border-y border-line py-8 text-muted">
          <LogoLoop
            logos={logos}
            speed={50}
            direction="left"
            logoHeight={36}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel={skills.logosLabel}
          />
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.06} className={`flex ${placement(i, groups.length)}`}>
            <SkillCard group={group} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Grid placement for card i. On tablets (2 columns) the first card and a lone last card span the full width. */
function placement(i: number, count: number) {
  const tabletWide = i === 0 || (i === count - 1 && (count - 1) % 2 === 1)
  return `${tabletWide ? 'md:col-span-2' : ''} ${spans[i % spans.length]}`
}
