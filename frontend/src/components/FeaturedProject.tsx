import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'
import { Button } from './ui/Button'
import { Tag } from './ui/Tag'

export function FeaturedProject({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
      <ProjectPreview project={project} className="aspect-[4/3] rounded-md md:aspect-auto md:min-h-[28rem]" />
      <div className="flex flex-col gap-6">
        <p className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
          {content.projectUi.featuredLabel} · {project.classification}
        </p>
        <h3 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">{project.title}</h3>
        <p className="leading-relaxed text-fg2">{project.summary}</p>
        <dl className="space-y-1 text-sm">
          <div className="flex gap-3">
            <dt className="font-mono text-xs text-muted">{content.projectUi.statusLabel}</dt>
            <dd className="text-fg2">{project.status}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-mono text-xs text-muted">{content.projectUi.roleLabel}</dt>
            <dd className="text-fg2">{project.role}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <div>
          <Button variant="secondary" onClick={() => onOpen(project)} aria-haspopup="dialog">
            {content.projectUi.caseStudyButton}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </article>
  )
}
