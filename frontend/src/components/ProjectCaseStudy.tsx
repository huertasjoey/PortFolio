import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'
import { ZoomableImage } from './ZoomableImage'
import { Tag } from './ui/Tag'

const ui = content.projectUi

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
          className="fixed inset-0 z-50 bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            className="relative h-dvh w-full overflow-y-auto bg-bg outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.closeLabel}
              className="fixed top-4 right-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-card/80 px-3 text-sm text-fg backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <X size={18} /> <span className="hidden sm:inline">Close</span>
            </button>
            <div className="group">
              <ProjectPreview project={project} className="h-52 border-b border-line sm:h-72" />
            </div>
            <div className="mx-auto max-w-4xl space-y-10 px-6 py-10 sm:px-10 sm:py-14">
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
              <Block title={ui.caseStudyHeadings.overview}>{project.caseStudy.overview}</Block>
              {project.caseStudy.metrics && (
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.caseStudy.metrics.map((m) => (
                    <div key={m.label} className="theme-fade flex flex-col-reverse justify-end rounded-xl border border-line bg-bg p-4">
                      <dt className="mt-1 text-xs leading-snug text-fg2">{m.label}</dt>
                      <dd className="font-mono text-xl font-medium text-accent">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <Block title={ui.caseStudyHeadings.problem}>{project.caseStudy.problem}</Block>
              <Block title={ui.caseStudyHeadings.solution}>{project.caseStudy.solution}</Block>
              <Block title={ui.caseStudyHeadings.implementation}>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                  {project.caseStudy.implementation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
              {project.caseStudy.gallery && (
                <Block title={ui.caseStudyHeadings.gallery}>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.caseStudy.gallery.map((g) => (
                      <li key={g.src}>
                        <figure className="theme-fade overflow-hidden rounded-xl border border-line bg-bg">
                          <ZoomableImage
                            src={g.src}
                            alt={g.alt}
                            caption={g.caption}
                            className="w-full"
                            imgClassName="aspect-[4/3] w-full object-cover"
                          />
                          <figcaption className="border-t border-line px-3 py-2 font-mono text-[11px] leading-snug text-muted">
                            {g.caption}
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
              {project.caseStudy.results && (
                <Block title={ui.caseStudyHeadings.results}>
                  <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                    {project.caseStudy.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Block>
              )}
              <Block title={ui.caseStudyHeadings.contribution}>
                <p className="mb-2 text-sm text-fg">{ui.roleInline} {project.role}</p>
                {project.caseStudy.team && (
                  <p className="mb-2 text-sm">
                    {ui.caseStudyHeadings.team}: {project.caseStudy.team.join(', ')}
                  </p>
                )}
                {project.caseStudy.contribution}
              </Block>
              <Block title={ui.caseStudyHeadings.challenges}>{project.caseStudy.challenges}</Block>
              {project.caseStudy.futureWork && (
                <Block title={ui.caseStudyHeadings.futureWork}>{project.caseStudy.futureWork}</Block>
              )}
              <p className="border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-muted">
                {project.caseStudy.note ?? ui.disclaimer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
