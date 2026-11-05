import { ArrowRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link } from '../components/Link'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { ProjectCollage } from '../components/ProjectCollage'
import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'
import { fill } from '../lib/utils'
import type { Project } from '../types'

const { work, projects } = content

/** Home-page collage of every project; the detailed, filterable list lives on the /work page. */
export function WorkSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const close = useCallback(() => setOpenProject(null), [])

  return (
    <section id="work" aria-labelledby="work-title" className="py-28 lg:py-40">
      <header className="mb-16 md:mb-20">
        <p className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
          <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">02</span>
          <span className="h-px w-12 bg-line" aria-hidden />
          Work
        </p>
        <h2 className="font-serif text-6xl leading-[0.95] font-light tracking-tight text-fg sm:text-7xl lg:text-8xl [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic">
          <span id="work-title">
            <RichText text={work.heading} />
          </span>
        </h2>
        <p className="mt-10 max-w-md text-base leading-[1.8] text-fg2">{work.description}</p>
      </header>

      <ProjectCollage projects={projects} onOpen={setOpenProject} />

      <Reveal className="mt-16 flex items-center gap-6 md:mt-20">
        <span className="h-px flex-1 bg-line" aria-hidden />
        <Link
          href="/work"
          className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-gold/60 px-7 text-sm tracking-[0.18em] text-fg uppercase transition-all duration-300 hover:border-gold hover:bg-gold hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {fill(work.viewAll, { count: projects.length })}
          <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </Reveal>

      <ProjectCaseStudy project={openProject} onClose={close} />
    </section>
  )
}
