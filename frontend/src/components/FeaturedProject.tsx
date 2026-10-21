import { ArrowRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'
import { Button } from './ui/Button'
import { Tag } from './ui/Tag'

export function FeaturedProject({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group theme-fade grid overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-accent/50 md:grid-cols-2">
      <ProjectPreview project={project} className="min-h-64 border-b border-line md:min-h-[26rem] md:border-r md:border-b-0" />
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
        <p className="font-mono text-xs tracking-[0.15em] text-accent uppercase">
          Featured · {project.classification}
        </p>
        <h3 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{project.title}</h3>
        <p className="leading-relaxed text-fg2">{project.summary}</p>
        <dl className="space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="font-mono text-xs text-muted">STATUS</dt>
            <dd className="text-fg2">{project.status}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-mono text-xs text-muted">ROLE</dt>
            <dd className="text-fg2">{project.role}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <div>
          <Button onClick={() => onOpen(project)} aria-haspopup="dialog">
            Read the case study
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </article>
  )
}
