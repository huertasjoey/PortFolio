import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'

export function FeaturedProject({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group grid border-4 border-fg bg-card shadow-[10px_10px_0_0_var(--fg)] md:grid-cols-[1.15fr_1fr]">
      <ProjectPreview
        project={project}
        className="aspect-[4/3] border-b-4 border-fg md:aspect-auto md:min-h-[28rem] md:border-r-4 md:border-b-0"
      />
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <p className="flex flex-wrap gap-2 font-mono text-[11px] font-bold tracking-wider uppercase">
          <span className="bg-brut px-2 py-1 text-black">{content.projectUi.featuredLabel}</span>
          <span className="bg-fg px-2 py-1 text-bg">{project.classification}</span>
        </p>
        <h3 className="text-5xl leading-[0.9] font-black tracking-tight text-fg uppercase sm:text-6xl">{project.title}</h3>
        <p className="leading-relaxed text-fg">{project.summary}</p>
        <dl className="border-y-4 border-fg font-mono text-sm">
          <div className="flex gap-4 border-b-2 border-fg py-2">
            <dt className="w-16 shrink-0 font-bold uppercase">{content.projectUi.statusLabel}</dt>
            <dd>{project.status}</dd>
          </div>
          <div className="flex gap-4 py-2">
            <dt className="w-16 shrink-0 font-bold uppercase">{content.projectUi.roleLabel}</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t} className="border-2 border-fg px-2 py-0.5 font-mono text-xs font-bold uppercase">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="inline-flex min-h-12 items-center gap-3 border-4 border-fg bg-brut px-6 font-black tracking-wide text-black uppercase shadow-[6px_6px_0_0_var(--fg)] transition hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none"
          >
            {content.projectUi.caseStudyButton}
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </article>
  )
}
