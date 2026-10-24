import { Cpu, Globe, Wifi, type LucideIcon } from 'lucide-react'
import { content } from '../content'
import { countByCategory } from '../lib/utils'
import type { Category, CategoryId } from '../types'

const icons: Record<Category['icon'], LucideIcon> = { cpu: Cpu, wifi: Wifi, globe: Globe }

interface Props {
  category: Category
  selected: boolean
  onSelect: (id: CategoryId) => void
}

export function ProjectCategory({ category, selected, onSelect }: Props) {
  const Icon = icons[category.icon]
  const count = countByCategory(category.id)
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
      className={`group theme-fade flex flex-col gap-4 rounded-[18px] border bg-card p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-accent/60 ${
        selected ? 'border-accent shadow-[0_0_30px_var(--glow)]' : 'border-line'
      }`}
    >
      <span className="grid size-11 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent transition group-hover:scale-110">
        <Icon size={20} />
      </span>
      <span>
        <span className="block text-lg font-semibold text-fg">{category.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-fg2">{category.description}</span>
      </span>
      <span className="mt-auto font-mono text-xs text-muted">
        {count} {count === 1 ? content.projectUi.projectSingular : content.projectUi.projectPlural}
      </span>
    </button>
  )
}
