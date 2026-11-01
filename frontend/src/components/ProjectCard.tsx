import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group relative flex flex-col border-4 border-fg bg-card shadow-[8px_8px_0_0_var(--fg)] transition duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_var(--fg)]">
      <ProjectPreview project={project} className="aspect-[16/10] border-b-4 border-fg" />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="self-start bg-fg px-2 py-1 font-mono text-[11px] font-bold tracking-wider text-bg uppercase">
          {project.classification.split('·')[0].trim()}
        </p>
        <h3 className="text-3xl leading-[0.95] font-black tracking-tight text-fg uppercase">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="text-left uppercase after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </button>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-1" aria-label="Technologies">
          {project.tags.slice(0, 3).map((t) => (
            <li key={t} className="border-2 border-fg px-2 py-0.5 font-mono text-xs font-bold uppercase">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <span
        aria-hidden
        className="absolute top-0 right-0 grid size-11 place-items-center border-b-4 border-l-4 border-fg bg-brut text-black"
      >
        <ArrowUpRight size={22} strokeWidth={3} />
      </span>
    </article>
  )
}
