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
    <section id="work" aria-labelledby="work-title" className="py-28 lg:py-36">
      {/* Brutalist heading: stamped label, oversized uppercase type, a highlighter on the bold word, a heavy rule */}
      <header className="mb-14 border-b-8 border-fg pb-8 md:mb-20">
        <p className="mb-6 inline-block bg-fg px-3 py-1 font-mono text-xs font-bold tracking-[0.2em] text-bg">02 — WORK</p>
        <h2 className="text-5xl leading-[0.9] font-black tracking-tight text-fg uppercase sm:text-7xl lg:text-8xl [&_strong]:bg-brut [&_strong]:px-2 [&_strong]:text-black">
          <span id="work-title">
            <RichText text={work.heading} />
          </span>
        </h2>
        <p className="mt-8 max-w-xl border-l-8 border-fg pl-4 font-mono text-sm leading-relaxed text-fg">{work.description}</p>
      </header>

      {featured && (
        <Reveal>
          <FeaturedProject project={featured} onOpen={setOpenProject} />
        </Reveal>
      )}

      <Reveal className="mt-24">
        <h3 className="mb-4 font-mono text-xs font-bold tracking-[0.18em] text-fg uppercase">/ {work.browseTitle}</h3>
        <div className="grid divide-y-4 divide-fg border-4 border-fg md:grid-cols-3 md:divide-x-4 md:divide-y-0">
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

      <div className="mt-16" aria-live="polite">
        {activeCategory && (
          <p className="mb-8 max-w-xl border-l-8 border-brut pl-4 font-mono text-sm leading-relaxed text-fg">
            {activeCategory.description}
          </p>
        )}
        <div className="mb-8 flex min-h-11 items-center justify-between gap-4 border-b-4 border-fg pb-3">
          <h3 className="font-mono text-xs font-bold tracking-[0.18em] text-fg uppercase">
            / {activeCategory ? fill(work.moreTitleFiltered, { category: categoryTitle }) : work.moreTitle}
          </h3>
          {category && (
            <button
              type="button"
              onClick={() => setCategory(null)}
              className="inline-flex min-h-11 items-center gap-2 border-2 border-fg px-3 font-mono text-xs font-bold uppercase transition hover:bg-fg hover:text-bg"
            >
              <X size={14} strokeWidth={3} /> {work.clearFilter}
            </button>
          )}
        </div>
        {others.length ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />
            ))}
          </div>
        ) : (
          <p className="border-4 border-dashed border-fg p-8 font-mono text-sm font-bold uppercase">
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
