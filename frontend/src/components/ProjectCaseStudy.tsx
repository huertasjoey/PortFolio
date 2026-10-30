import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { content } from '../content'
import type { Project } from '../types'
import { ProjectPreview } from './ProjectPreview'
import { useTheme } from '../hooks/useTheme'
import { BinaryOrbit } from './BinaryOrbit'
import { Carousel } from './Carousel'
import { FadingStars } from './FadingStars'
import { ThemeToggle } from './ThemeToggle'
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
  const { theme, toggle: toggleTheme } = useTheme()

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

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {project.caseStudy.background === 'binary-orbit' && <BinaryOrbit />}
          {project.caseStudy.background === 'fading-stars' && <FadingStars />}
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
            className="relative z-10 h-dvh w-full overflow-y-auto outline-none"
          >
            <div className="fixed top-3 right-3 z-10 flex items-center gap-2 rounded-2xl border border-line bg-bg/80 p-1 backdrop-blur sm:top-4 sm:right-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <button
                type="button"
                onClick={onClose}
                aria-label={ui.closeLabel}
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-line bg-card/80 px-3 text-sm text-fg transition hover:border-accent hover:text-accent"
              >
                <X size={18} /> <span className="hidden sm:inline">Close</span>
              </button>
            </div>
            {project.caseStudy.banner !== false && (
              <div className="group">
                <ProjectPreview project={project} className="h-52 border-b border-line sm:h-72" />
              </div>
            )}
            <div
              className={`mx-auto max-w-4xl space-y-8 px-5 pt-16 pb-10 sm:space-y-10 sm:px-10 sm:pb-14 ${
                project.caseStudy.background ? 'my-6 rounded-3xl bg-bg/80 backdrop-blur-[6px]' : ''
              }`}
            >
              <header className="space-y-3">
                <p className="font-mono text-xs tracking-[0.15em] text-accent uppercase">
                  {project.classification} · {project.status}
                </p>
                <h2 id="case-study-title" className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  {project.title}
                </h2>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-1" aria-label="Technologies">
                  {project.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </header>
              <Block title={ui.caseStudyHeadings.overview}>{project.caseStudy.overview}</Block>
              {project.caseStudy.metrics && (
                <dl className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
                  {project.caseStudy.metrics.map((m) => (
                    <div key={m.label} className="theme-fade flex flex-col-reverse justify-end border-t border-line pt-4">
                      <dt className="mt-1 text-xs leading-snug text-fg2">{m.label}</dt>
                      <dd className="font-mono text-lg font-medium break-words text-accent sm:text-xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {project.caseStudy.video && (
                <Block title={project.caseStudy.video.title}>
                  <figure>
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={project.caseStudy.video.poster}
                      className="aspect-video w-full rounded-xl border border-line bg-black"
                    >
                      <source src={project.caseStudy.video.src} type="video/mp4" />
                    </video>
                    <figcaption className="mt-2 font-mono text-xs text-fg2">{project.caseStudy.video.caption}</figcaption>
                  </figure>
                </Block>
              )}
              <Block title={ui.caseStudyHeadings.problem}>{project.caseStudy.problem}</Block>
              <Block title={ui.caseStudyHeadings.solution}>{project.caseStudy.solution}</Block>
              {project.caseStudy.features && (
                <Block title={ui.caseStudyHeadings.features}>
                  <div className="space-y-5">
                    {project.caseStudy.features.map((f) => (
                      <div key={f.group}>
                        <h4 className="mb-1.5 text-sm font-semibold text-fg">{f.group}</h4>
                        <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                          {f.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Block>
              )}
              <Block title={ui.caseStudyHeadings.implementation}>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                  {project.caseStudy.implementation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
              {project.caseStudy.gallery && (
                <Block title={ui.caseStudyHeadings.gallery}>
                  <Carousel slides={project.caseStudy.gallery} label={ui.caseStudyHeadings.gallery} />
                </Block>
              )}
              {project.caseStudy.galleries?.map((g) => (
                <Block key={g.title} title={g.title}>
                  <Carousel slides={g.slides} label={g.title} />
                </Block>
              ))}
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
                  <div className="mb-3 text-sm">
                    <p className="mb-1 text-fg">{ui.caseStudyHeadings.team}:</p>
                    <ul className="space-y-1 pl-4">
                      {project.caseStudy.team.map((member) => (
                        <li key={member} className="list-disc marker:text-accent">
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>
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
    </AnimatePresence>,
    document.body,
  )
}
