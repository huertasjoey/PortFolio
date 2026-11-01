import { content } from '../content'
import { countByCategory } from '../lib/utils'
import type { Category, CategoryId } from '../types'

interface Props {
  category: Category
  selected: boolean
  onSelect: (id: CategoryId) => void
}

/** A quiet serif filter: title, count, and a thin gold line under the selected one. */
export function ProjectCategory({ category, selected, onSelect }: Props) {
  const count = countByCategory(category.id)
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
      className={`group flex min-h-11 items-baseline gap-3 border-b py-2 text-left transition-colors duration-300 ${
        selected ? 'border-gold text-fg' : 'border-transparent text-fg2 hover:text-fg'
      }`}
    >
      <span className="font-serif text-2xl font-light">{category.title}</span>
      <span className="text-[11px] tracking-[0.2em] uppercase">
        {count} {count === 1 ? content.projectUi.projectSingular : content.projectUi.projectPlural}
      </span>
    </button>
  )
}
