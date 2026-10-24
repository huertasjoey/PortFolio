import { content } from '../content'
import type { SectionId } from '../types'
import { ResumeButton } from './ResumeButton'
import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ThemeToggle'

const { profile } = content

export function StatusDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-accent" />
    </span>
  )
}

interface NavProps {
  active: SectionId
  onNavigate?: () => void
}

export function NavLinks({ active, onNavigate }: NavProps) {
  return (
    <ul className="space-y-1">
      {content.nav.map(({ id, number, label }) => {
        const isActive = active === id
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'true' : undefined}
              className={`group flex min-h-11 items-center gap-3 rounded-xl border-l-2 px-3 text-sm transition ${
                isActive
                  ? 'border-accent bg-accent/10 text-fg'
                  : 'border-transparent text-fg2 hover:bg-fg/5 hover:text-fg'
              }`}
            >
              <span className={`font-mono text-xs ${isActive ? 'text-accent' : 'text-muted'}`}>{number}</span>
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

interface Props extends NavProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

/** Fixed desktop sidebar (hidden below lg; MobileNavigation takes over). */
export function Sidebar({ active, theme, onToggleTheme }: Props) {
  return (
    <aside className="theme-fade fixed inset-y-0 left-0 z-30 hidden w-[245px] flex-col border-r border-line bg-sidebar p-6 lg:flex">
      <div className="mb-10">
        <a href="#about" className="block text-xl font-semibold tracking-tight text-fg">
          {profile.name}
        </a>
        <p className="mt-2 font-mono text-[11px] leading-snug tracking-[0.12em] text-muted">{profile.shortTitle}</p>
        <p className="mt-4 flex items-center gap-2 text-xs text-fg2">
          <StatusDot /> {profile.availability}
        </p>
      </div>

      <nav aria-label="Primary">
        <NavLinks active={active} />
      </nav>

      <div className="mt-auto space-y-4">
        <ResumeButton className="w-full" />
        <div className="flex items-center justify-between">
          <SocialLinks />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </aside>
  )
}
