import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { Link } from '../components/Link'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { ProjectCategory } from '../components/ProjectCategory'
import { ProjectPanel } from '../components/ProjectPanel'
import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'
import { countByCategory } from '../lib/utils'
import type { CategoryId, Project } from '../types'

const { workPage, categories, projects } = content

/** /work: every project, filterable by category. */
export function WorkPage() {
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [category, setCategory] = useState<CategoryId | null>(null)
  const close = useCallback(() => setOpenProject(null), [])

  const listed = projects.filter((p) => !category || p.categories.includes(category))
  const activeCategory = categories.find((c) => c.id === category)

  return (
    <section id="work" aria-labelledby="work-page-title" className="py-28 lg:py-40">
      <Link
        href="/#work"
        className="mb-16 inline-flex min-h-11 items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition hover:text-gold"
      >
        <ArrowLeft size={14} /> {workPage.backLabel}
      </Link>

      <header className="mb-20">
        <h1
          id="work-page-title"
          className="font-serif text-6xl leading-[0.95] font-light tracking-tight text-fg sm:text-7xl lg:text-8xl [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic"
        >
          <RichText text={workPage.heading} />
        </h1>
        <p className="mt-10 max-w-md text-base leading-[1.8] text-fg2">{workPage.description}</p>
      </header>

      <Reveal>
        <div
          role="tablist"
          aria-label="Project categories"
          className="-mx-4 flex gap-x-10 overflow-x-auto border-y border-line px-4 py-3 sm:mx-0 sm:flex-wrap sm:gap-y-2 sm:px-0"
        >
          <ProjectCategory
            label={workPage.allLabel}
            count={projects.length}
            selected={category === null}
            onSelect={() => setCategory(null)}
          />
          {categories.map((c) => (
            <ProjectCategory
              key={c.id}
              label={c.title}
              count={countByCategory(c.id)}
              selected={category === c.id}
              onSelect={() => setCategory(c.id)}
            />
          ))}
        </div>
      </Reveal>

      <div className="mt-14" aria-live="polite">
        {activeCategory && (
          <p className="mb-16 max-w-xl font-serif text-2xl leading-snug font-light text-fg2 italic">{activeCategory.description}</p>
        )}
        {listed.length ? (
          <motion.div
            key={category ?? 'all'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-28 md:space-y-40"
          >
            {listed.map((p, i) => (
              <ProjectPanel key={p.id} project={p} number={projects.indexOf(p) + 1} flip={i % 2 === 1} onOpen={setOpenProject} />
            ))}
          </motion.div>
        ) : (
          <p className="border-t border-line py-10 font-serif text-2xl font-light text-fg2 italic">{workPage.emptyNone}</p>
        )}
      </div>

      <ProjectCaseStudy project={openProject} onClose={close} />
    </section>
  )
}
