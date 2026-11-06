import { ArrowLeft, Box, CircuitBoard, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { content } from '../content'
import { useTheme } from '../hooks/useTheme'
import type { Project } from '../types'
import { BinaryOrbit } from './BinaryOrbit'
import {
  Comparison,
  Credits,
  FeatureGrid,
  Findings,
  Hero,
  Kpis,
  Outlook,
  Panel,
  PhotoGrid,
  ProblemSolution,
  SectionHeader,
  SpecList,
} from './caseStudy/Sections'
import { FadingStars } from './FadingStars'
import { HowItWorks } from './HowItWorks'
import { LiveFlowchart } from './LiveFlowchart'
import { ModelTabs } from './ModelViewer'
import { PcbViewer } from './PcbViewer'
import { ProjectPreview } from './ProjectPreview'
import { ThemeToggle } from './ThemeToggle'

const ui = content.projectUi

interface Props {
  project: Project | null
  onClose: () => void
}

/** The case study page: a wide, sectioned layout. Sections without data are skipped and the rest renumber. */
function CaseStudyBody({ project, onClose }: { project: Project; onClose: () => void }) {
  const cs = project.caseStudy
  const h = ui.caseStudyHeadings
  let n = 0
  const next = () => String(++n).padStart(2, '0')
  const photos = [...(cs.gallery ?? []), ...(cs.galleries ?? []).flatMap((g) => g.slides)]
  const hardware = [cs.model3d, cs.pcb].filter(Boolean).length

  return (
    <>
      {cs.banner !== false && (
        <div className="group">
          <ProjectPreview project={project} className="h-52 border-b border-line sm:h-72" />
        </div>
      )}
      <div
        className={`mx-auto max-w-7xl space-y-20 px-5 pt-20 pb-12 sm:space-y-28 sm:px-10 sm:pb-16 ${
          cs.background ? 'my-6 rounded-3xl bg-bg/80 backdrop-blur-[6px]' : ''
        }`}
      >
        <div className="space-y-10">
          <Hero project={project} titleId="case-study-title" />
          {cs.metrics && <Kpis metrics={cs.metrics} />}
        </div>

        <section>
          <SectionHeader
            index={next()}
            title={`${h.problem} & ${h.solution}`}
            heading={
              <>
                The problem, <em>and our answer.</em>
              </>
            }
          />
          <ProblemSolution problem={cs.problem} solution={cs.solution} />
        </section>

        {cs.howItWorks && (
          <section>
            <HowItWorks steps={cs.howItWorks} title={cs.howItWorksIntro?.title ?? h.howItWorks} intro={cs.howItWorksIntro} index={next()} />
          </section>
        )}

        {cs.features && (
          <section>
            <SectionHeader
              index={next()}
              title={h.features}
              heading={
                <>
                  What it <em>does.</em>
                </>
              }
            />
            <FeatureGrid features={cs.features} />
          </section>
        )}

        {cs.implementation && (
          <section>
            <SectionHeader
              index={next()}
              title={h.implementation}
              heading={
                <>
                  Under <em>the hood.</em>
                </>
              }
            />
            <SpecList items={cs.implementation} />
          </section>
        )}

        {cs.flowchart && (
          <section>
            <SectionHeader
              index={next()}
              title={h.flowchart}
              heading={
                <>
                  The logic, <em>running live.</em>
                </>
              }
              aside={<p className="max-w-sm text-sm text-fg2">{cs.flowchart.description}</p>}
            />
            {cs.flowchart.live ? <LiveFlowchart figures={cs.flowchart.views} /> : <PcbViewer {...cs.flowchart} label="Flowchart stages" />}
          </section>
        )}

        {hardware > 0 && (
          <section>
            <SectionHeader
              index={next()}
              title="Hardware"
              heading={
                <>
                  Designed <em>and built.</em>
                </>
              }
            />
            <div className={`grid gap-4 ${hardware > 1 ? 'xl:grid-cols-2' : ''}`}>
              {cs.model3d && (
                <Panel label={h.model3d} icon={<Box size={14} />}>
                  <p className="mb-4 text-sm text-fg2">{cs.model3d.description}</p>
                  <ModelTabs views={cs.model3d.views} orbit="30deg 65deg auto" />
                </Panel>
              )}
              {cs.pcb && (
                <Panel label={h.pcb} icon={<CircuitBoard size={14} />}>
                  <PcbViewer {...cs.pcb} />
                </Panel>
              )}
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <section>
            <SectionHeader
              index={next()}
              title={h.gallery}
              heading={
                <>
                  {project.previewKind === 'hardware' ? (
                    <>
                      From the <em>workshop.</em>
                    </>
                  ) : (
                    <>
                      Screen <em>by screen.</em>
                    </>
                  )}
                </>
              }
              aside={<p className="font-mono text-xs text-fg2">{photos.length} photos</p>}
            />
            <PhotoGrid photos={photos} />
          </section>
        )}

        {cs.comparison && (
          <section>
            <SectionHeader
              index={next()}
              title={`${cs.comparison.a} vs ${cs.comparison.b}`}
              heading={
                <>
                  {cs.comparison.heading?.lead ?? 'Side by'} <em>{cs.comparison.heading?.accent ?? 'side.'}</em>
                </>
              }
              aside={
                <p className="flex items-center gap-4 font-mono text-[11px] text-fg2">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-gold" aria-hidden /> {cs.comparison.a}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-muted/60" aria-hidden /> {cs.comparison.b}
                  </span>
                </p>
              }
            />
            <Comparison data={cs.comparison} />
          </section>
        )}

        {cs.results && (
          <section>
            <SectionHeader
              index={next()}
              title={h.results}
              heading={
                <>
                  What we <em>proved.</em>
                </>
              }
            />
            <Findings results={cs.results} />
          </section>
        )}

        <section>
          <SectionHeader
            index={next()}
            title={h.contribution}
            heading={
              <>
                Who <em>built it.</em>
              </>
            }
          />
          <Credits project={project} />
        </section>

        <section>
          <SectionHeader
            index={next()}
            title={cs.futureWork ? `${h.challenges} & ${h.futureWork}` : h.challenges}
            heading={
              <>
                Lessons and <em>what&rsquo;s next.</em>
              </>
            }
          />
          <Outlook challenges={cs.challenges} futureWork={cs.futureWork} />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="max-w-2xl font-mono text-[11px] leading-relaxed text-muted">{cs.note ?? ui.disclaimer}</p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-fg transition hover:border-gold hover:text-gold"
          >
            <ArrowLeft size={16} /> Back to projects
          </button>
        </footer>
      </div>
    </>
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
        <motion.div className="fixed inset-0 z-50 bg-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            <CaseStudyBody project={project} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
