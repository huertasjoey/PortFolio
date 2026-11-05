import { content } from '../content'

interface Props {
  label: string
  count: number
  selected: boolean
  onSelect: () => void
}

/** A quiet serif filter: title, count, and a thin gold line under the selected one. */
export function ProjectCategory({ label, count, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      role="tab"
      onClick={onSelect}
      aria-selected={selected}
      className={`group flex min-h-11 shrink-0 items-baseline gap-3 border-b py-2 text-left transition-colors duration-300 ${
        selected ? 'border-gold text-fg' : 'border-transparent text-fg2 hover:text-fg'
      }`}
    >
      <span className="font-serif text-2xl font-light whitespace-nowrap">{label}</span>
      <span className="text-[11px] tracking-[0.2em] whitespace-nowrap uppercase">
        {count} {count === 1 ? content.projectUi.projectSingular : content.projectUi.projectPlural}
      </span>
    </button>
  )
}
