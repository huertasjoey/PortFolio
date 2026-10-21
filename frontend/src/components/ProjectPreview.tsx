import { Flame, FishSymbol, NotebookPen, Sprout, type LucideIcon } from 'lucide-react'
import type { IconName, Project } from '../data/projects'

const icons: Record<IconName, LucideIcon> = {
  flame: Flame,
  fish: FishSymbol,
  notebook: NotebookPen,
  sprout: Sprout,
}

/** Abstract schematic shown on hover for hardware projects. */
function HardwareArt() {
  return (
    <svg viewBox="0 0 200 120" className="size-full" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <rect x="70" y="35" width="60" height="50" rx="4" />
      {[45, 55, 65, 75].map((y) => (
        <g key={y}>
          <path d={`M70 ${y}H50V${y - 25}H20`} />
          <path d={`M130 ${y}H150V${y + 25}H180`} />
        </g>
      ))}
      <circle cx="20" cy="20" r="3" />
      <circle cx="180" cy="120" r="3" />
    </svg>
  )
}

/** Abstract window shown on hover for software projects. */
function SoftwareArt() {
  return (
    <svg viewBox="0 0 200 120" className="size-full" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <rect x="25" y="15" width="150" height="90" rx="6" />
      <path d="M25 33H175" />
      <circle cx="37" cy="24" r="2" />
      <circle cx="46" cy="24" r="2" />
      <path d="M40 50h50M40 62h90M40 74h70M40 86h40" />
    </svg>
  )
}

export function ProjectIcon({ name, size = 28 }: { name: IconName; size?: number }) {
  const Icon = icons[name]
  return <Icon size={size} strokeWidth={1.5} />
}

interface Props {
  project: Project
  className?: string
}

/** Dotted-grid preview. Place inside an element with the Tailwind `group` class to get the hover swap. */
export function ProjectPreview({ project, className = '' }: Props) {
  return (
    <div
      className={`dot-grid relative grid place-items-center overflow-hidden bg-bg/50 ${className}`}
      role="img"
      aria-label={`${project.title} preview illustration`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow),transparent_65%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-6 text-accent/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {project.previewKind === 'hardware' ? <HardwareArt /> : <SoftwareArt />}
      </div>
      <div className="relative grid size-16 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent transition duration-500 group-hover:scale-110 group-hover:bg-accent/20">
        <ProjectIcon name={project.icon} />
      </div>
      <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
        {project.previewKind === 'hardware' ? 'Hardware / Firmware' : 'Software / Web'}
      </span>
    </div>
  )
}
