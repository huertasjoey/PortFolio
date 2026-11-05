import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'

interface Props {
  project: Project
  /** Position shown as an italic numeral, e.g. 2 → "02". */
  index: number
  onOpen: (p: Project) => void
}

export function ProjectCard({ project, index, onOpen }: Props) {
  return (
    <article className="group relative flex flex-col">
      <ProjectPreview project={project} className="aspect-[4/3] rounded-[2px]" />
      <div className="mt-7 flex items-baseline gap-4">
        <span className="font-serif text-lg text-gold italic lining-nums">{String(index).padStart(2, '0')}</span>
        <p className="truncate text-[11px] tracking-[0.25em] text-muted uppercase">{project.classification.split('·')[0].trim()}</p>
      </div>
      <h3 className="mt-3 font-serif text-4xl leading-[1.05] font-light text-fg transition-colors duration-300 group-hover:text-gold">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-haspopup="dialog"
          className="text-left after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </button>
      </h3>
      <p className="mt-4 line-clamp-3 text-sm leading-[1.85] text-fg2">{project.summary}</p>
      <p className="mt-6 text-xs tracking-wide text-muted" aria-label="Technologies">
        {project.tags.slice(0, 3).join('  ·  ')}
      </p>
      <span aria-hidden className="mt-6 inline-flex items-center gap-2 text-sm text-gold transition-[gap] duration-300 group-hover:gap-3">
        {content.projectUi.caseStudyButton} <ArrowRight size={15} strokeWidth={1.75} />
      </span>
    </article>
  )
}
