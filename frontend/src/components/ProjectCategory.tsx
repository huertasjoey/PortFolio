import { content } from '../content'
import { countByCategory } from '../lib/utils'
import type { Category, CategoryId } from '../types'

interface Props {
  category: Category
  selected: boolean
  onSelect: (id: CategoryId) => void
}

/** A slab of the category bar: huge uppercase title, project count, flat highlight when selected. */
export function ProjectCategory({ category, selected, onSelect }: Props) {
  const count = countByCategory(category.id)
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
      className={`flex min-h-32 flex-col justify-between gap-6 p-5 text-left transition-colors ${
        selected ? 'bg-brut text-black' : 'bg-transparent text-fg hover:bg-fg hover:text-bg'
      }`}
    >
      <span className="text-2xl leading-none font-black tracking-tight uppercase">{category.title}</span>
      <span className="font-mono text-xs font-bold uppercase">
        {count} {count === 1 ? content.projectUi.projectSingular : content.projectUi.projectPlural}
      </span>
    </button>
  )
}
