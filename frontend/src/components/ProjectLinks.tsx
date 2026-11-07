import { ArrowUpRight, Globe } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import type { Project } from '../types'

/** "Open the live app" and "View the code" buttons for a project; renders nothing when it has no links. */
export function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  const { live, repo, note } = project.links ?? {}
  if (!live && !repo) return null

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the live ${project.title} app (opens in a new tab)`}
            className="group/live inline-flex min-h-12 items-center gap-2.5 rounded-md border border-gold/60 bg-gold/10 px-5 text-sm font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative size-2 rounded-full bg-emerald-400" />
            </span>
            <Globe size={16} strokeWidth={1.75} className="text-gold" />
            Open the live app
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View the ${project.title} source code on GitHub (opens in a new tab)`}
            className="inline-flex min-h-12 items-center gap-2 rounded-md border border-line px-5 text-sm text-fg2 transition-colors duration-300 hover:border-gold/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <GithubIcon size={16} /> View the code <ArrowUpRight size={14} />
          </a>
        )}
      </div>
      {note && <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p>}
    </div>
  )
}
