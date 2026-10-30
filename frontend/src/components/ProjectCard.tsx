import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'
import { Tag } from './ui/Tag'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group relative flex flex-col gap-5">
      <ProjectPreview project={project} className="aspect-[16/10] rounded-md" />
      <div className="flex flex-1 flex-col gap-3">
        <p className="truncate font-mono text-[11px] tracking-[0.15em] text-muted uppercase">{project.classification}</p>
        <h3 className="flex items-center justify-between gap-3 text-xl font-medium text-fg">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </button>
          <ArrowUpRight size={18} className="shrink-0 text-muted transition group-hover:text-fg" aria-hidden />
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg2">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1" aria-label="Technologies">
          {project.tags.slice(0, 3).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
