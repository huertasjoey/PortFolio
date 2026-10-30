import { content } from '../content'
import { countByCategory } from '../lib/utils'
import type { Category, CategoryId } from '../types'

interface Props {
  category: Category
  selected: boolean
  onSelect: (id: CategoryId) => void
}

/** A plain text filter: title, project count, and an underline when selected. */
export function ProjectCategory({ category, selected, onSelect }: Props) {
  const count = countByCategory(category.id)
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
      className={`flex min-h-11 items-baseline gap-2 border-b py-2 text-left text-base transition-colors ${
        selected ? 'border-fg text-fg' : 'border-transparent text-muted hover:text-fg'
      }`}
    >
      {category.title}
      <span className="font-mono text-xs">
        {count} {count === 1 ? content.projectUi.projectSingular : content.projectUi.projectPlural}
      </span>
    </button>
  )
}
