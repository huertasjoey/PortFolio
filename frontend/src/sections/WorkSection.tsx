import { X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { FeaturedProject } from '../components/FeaturedProject'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { ProjectCategory } from '../components/ProjectCategory'
import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'
import { fill } from '../lib/utils'
import type { CategoryId, Project } from '../types'

const { work, categories, projects } = content

export function WorkSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [category, setCategory] = useState<CategoryId | null>(null)
  const close = useCallback(() => setOpenProject(null), [])

  const featured = projects.find((p) => p.featured) ?? projects[0]
  const others = projects
    .filter((p) => p !== featured)
    .filter((p) => !category || p.categories.includes(category))
  const activeCategory = categories.find((c) => c.id === category)
  const categoryTitle = activeCategory?.title ?? ''

  return (
    <section id="work" aria-labelledby="work-title" className="py-28 lg:py-40">
      <header className="mb-20 md:mb-28">
        <p className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
          <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">02</span>
          <span className="h-px w-12 bg-line" aria-hidden />
          Work
        </p>
        <h2 className="font-serif text-6xl leading-[0.95] font-light tracking-tight text-fg sm:text-7xl lg:text-8xl [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic">
          <span id="work-title">
            <RichText text={work.heading} />
          </span>
        </h2>
        <p className="mt-10 max-w-md text-base leading-[1.8] text-fg2">{work.description}</p>
      </header>

      {featured && (
        <Reveal>
          <FeaturedProject project={featured} onOpen={setOpenProject} />
        </Reveal>
      )}

      <Reveal className="mt-32">
        <h3 className="mb-6 text-[11px] tracking-[0.3em] text-muted uppercase">{work.browseTitle}</h3>
        <div className="flex flex-wrap items-baseline gap-x-14 gap-y-2 border-y border-line py-3">
          {categories.map((c) => (
            <ProjectCategory
              key={c.id}
              category={c}
              selected={category === c.id}
              onSelect={(id) => setCategory((cur) => (cur === id ? null : id))}
            />
          ))}
        </div>
      </Reveal>

      <div className="mt-20" aria-live="polite">
        {activeCategory && <p className="mb-10 max-w-xl font-serif text-2xl leading-snug font-light text-fg2 italic">{activeCategory.description}</p>}
        <div className="mb-12 flex min-h-8 items-center justify-between gap-4">
          <h3 className="text-[11px] tracking-[0.3em] text-muted uppercase">
            {activeCategory ? fill(work.moreTitleFiltered, { category: categoryTitle }) : work.moreTitle}
          </h3>
          {category && (
            <button
              type="button"
              onClick={() => setCategory(null)}
              className="inline-flex min-h-11 items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition hover:text-gold"
            >
              <X size={13} /> {work.clearFilter}
            </button>
          )}
        </div>
        {others.length ? (
          <div className="grid gap-x-12 gap-y-24 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 2} onOpen={setOpenProject} />
            ))}
          </div>
        ) : (
          <p className="border-t border-line py-10 font-serif text-2xl font-light text-fg2 italic">
            {featured.categories.includes(category as CategoryId)
              ? fill(work.emptyOnlyFeatured, { category: categoryTitle })
              : work.emptyNone}
          </p>
        )}
      </div>

      <ProjectCaseStudy project={openProject} onClose={close} />
    </section>
  )
}
