import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectLinks } from './ProjectLinks'
import { ProjectPreview } from './ProjectPreview'

interface Props {
  project: Project
  /** Number shown above the title, e.g. 2 → "02". */
  number: number
  /** Puts the image on the right; alternate it so panels zig-zag down the page. */
  flip?: boolean
  onOpen: (p: Project) => void
}

/** Full-width project panel: large cover on one side, headline numbers and the case-study button on the other. */
export function ProjectPanel({ project, number, flip = false, onOpen }: Props) {
  const metrics = project.caseStudy.metrics?.slice(0, 3) ?? []

  return (
    <article className="group grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-24">
      <ProjectPreview
        project={project}
        className={`aspect-[4/3] rounded-[2px] md:aspect-[5/4] ${flip ? 'md:order-last' : ''}`}
      />
      <div>
        <p className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
          <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">{String(number).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          {project.featured ? content.projectUi.featuredLabel : project.status}
        </p>
        <h3 className="mt-6 font-serif text-5xl leading-none font-light tracking-tight text-fg sm:text-6xl">{project.title}</h3>
        <p className="mt-3 text-xs tracking-[0.2em] text-muted uppercase">{project.classification}</p>
        <p className="mt-6 line-clamp-4 leading-[1.85] text-fg2">{project.summary}</p>

        {metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 border-t border-line pt-6 min-[480px]:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1.5 line-clamp-3 text-xs leading-snug text-muted">{m.label}</dt>
                <dd className="font-serif text-3xl leading-none font-light text-gold lining-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-haspopup="dialog"
          aria-label={`${content.projectUi.caseStudyButton}: ${project.title}`}
          className="group/cta mt-10 inline-flex min-h-12 items-center gap-3 rounded-md bg-gold px-6 text-sm font-medium tracking-wide text-bg shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:gap-5 hover:shadow-xl hover:shadow-gold/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {content.projectUi.caseStudyButton}
          <ArrowRight size={18} strokeWidth={2} className="transition-transform duration-300 group-hover/cta:translate-x-0.5" />
        </button>
        <ProjectLinks project={project} className="mt-4" />
      </div>
    </article>
  )
}
