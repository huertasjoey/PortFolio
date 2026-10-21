import { X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { FeaturedProject } from '../components/FeaturedProject'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'
import { ProjectCategory } from '../components/ProjectCategory'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { categories, projects, type CategoryId, type Project } from '../data/projects'

export function WorkSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [category, setCategory] = useState<CategoryId | null>(null)
  const close = useCallback(() => setOpenProject(null), [])

  const featured = projects.find((p) => p.featured) ?? projects[0]
  const others = projects
    .filter((p) => p !== featured)
    .filter((p) => !category || p.categories.includes(category))
  const activeCategory = categories.find((c) => c.id === category)

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 lg:py-28">
      <SectionHeading
        number="02"
        label="Work"
        description="From connected hardware to full-stack applications, a selection of projects I've designed and built."
      >
        <span id="work-title">
          Selected <strong>builds.</strong>
        </span>
      </SectionHeading>

      {featured && (
        <Reveal>
          <FeaturedProject project={featured} onOpen={setOpenProject} />
        </Reveal>
      )}

      <Reveal className="mt-16">
        <h3 className="mb-5 font-mono text-xs tracking-[0.18em] text-muted uppercase">Browse by category</h3>
        <div className="grid gap-4 md:grid-cols-3">
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

      <div className="mt-10" aria-live="polite">
        <div className="mb-5 flex min-h-8 items-center justify-between gap-4">
          <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {activeCategory ? `${activeCategory.title} — more projects` : 'More projects'}
          </h3>
          {category && (
            <button
              type="button"
              onClick={() => setCategory(null)}
              className="inline-flex items-center gap-1 text-sm text-fg2 transition hover:text-accent"
            >
              <X size={14} /> Clear filter
            </button>
          )}
        </div>
        {others.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />
            ))}
          </div>
        ) : (
          <p className="rounded-[18px] border border-dashed border-line p-8 text-center text-sm text-fg2">
            {featured.categories.includes(category as CategoryId)
              ? `The featured project above is the only one in ${activeCategory?.title}.`
              : 'No other projects in this category yet.'}
          </p>
        )}
      </div>

      <ProjectCaseStudy project={openProject} onClose={close} />
    </section>
  )
}
