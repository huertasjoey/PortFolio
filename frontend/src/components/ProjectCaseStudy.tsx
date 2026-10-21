import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'
import type { Project } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'
import { Tag } from './ui/Tag'

interface Props {
  project: Project | null
  onClose: () => void
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 font-mono text-xs tracking-[0.18em] text-accent uppercase">{title}</h3>
      <div className="leading-relaxed text-fg2">{children}</div>
    </section>
  )
}

/** Accessible modal case study: Esc to close, focus trap, focus restored, background scroll locked. */
export function ProjectCaseStudy({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[20px] border border-line bg-card outline-none sm:rounded-[20px]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-xl border border-line bg-card/80 text-fg backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <X size={18} />
            </button>
            <div className="group">
              <ProjectPreview project={project} className="h-44 border-b border-line" />
            </div>
            <div className="space-y-8 p-6 sm:p-10">
              <header className="space-y-3">
                <p className="font-mono text-xs tracking-[0.15em] text-accent uppercase">
                  {project.classification} · {project.status}
                </p>
                <h2 id="case-study-title" className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  {project.title}
                </h2>
                <ul className="flex flex-wrap gap-2 pt-1" aria-label="Technologies">
                  {project.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </header>
              <Block title="Overview">{project.caseStudy.overview}</Block>
              <Block title="Problem">{project.caseStudy.problem}</Block>
              <Block title="Solution">{project.caseStudy.solution}</Block>
              <Block title="Technical implementation">
                <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                  {project.caseStudy.implementation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
              <Block title="My contribution">
                <p className="mb-2 text-sm text-fg">Role: {project.role}</p>
                {project.caseStudy.contribution}
              </Block>
              <Block title="Challenges">{project.caseStudy.challenges}</Block>
              <p className="border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-muted">
                Text in [brackets] is placeholder content. No results or metrics are claimed for this project.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
