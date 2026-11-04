import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'

export function FeaturedProject({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group grid items-start gap-12 md:grid-cols-[1.15fr_1fr] md:gap-20">
      <ProjectPreview project={project} className="aspect-[4/3] rounded-[2px] md:aspect-[5/4]" />
      <div>
        <p className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
          <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">01</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          {content.projectUi.featuredLabel}
        </p>
        <h3 className="mt-8 font-serif text-6xl leading-none font-light tracking-tight text-fg sm:text-7xl">{project.title}</h3>
        <p className="mt-3 text-xs tracking-[0.2em] text-muted uppercase">{project.classification}</p>
        <p className="mt-8 leading-[1.85] text-fg2">{project.summary}</p>

        <dl className="mt-10 text-sm">
          <div className="flex gap-6 border-t border-line py-3">
            <dt className="w-20 shrink-0 text-[11px] tracking-[0.2em] text-muted uppercase">{content.projectUi.statusLabel}</dt>
            <dd className="text-fg2">{project.status}</dd>
          </div>
          <div className="flex gap-6 border-y border-line py-3">
            <dt className="w-20 shrink-0 text-[11px] tracking-[0.2em] text-muted uppercase">{content.projectUi.roleLabel}</dt>
            <dd className="text-fg2">{project.role}</dd>
          </div>
        </dl>

        <p className="mt-6 text-xs leading-relaxed tracking-wide text-muted" aria-label="Technologies">
          {project.tags.join('  ·  ')}
        </p>

        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-haspopup="dialog"
          className="group/cta mt-10 inline-flex min-h-12 items-center gap-3 rounded-md bg-gold px-6 text-sm font-medium tracking-wide text-bg shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:gap-5 hover:shadow-xl hover:shadow-gold/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {content.projectUi.caseStudyButton}
          <ArrowRight size={18} strokeWidth={2} className="transition-transform duration-300 group-hover/cta:translate-x-0.5" />
        </button>
      </div>
    </article>
  )
}
