import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'
import { Tag } from './ui/Tag'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group theme-fade relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/50">
      <ProjectPreview project={project} className="h-40 border-b border-line" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase">{project.classification}</p>
        <h3 className="text-xl font-semibold text-fg">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </button>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg2">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Technologies">
          {project.tags.slice(0, 3).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <ArrowUpRight
        size={18}
        className="absolute top-4 right-4 text-muted transition group-hover:text-accent"
        aria-hidden
      />
    </article>
  )
}
