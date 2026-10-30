import { content } from '../content'
import type { SectionId } from '../types'
import { ResumeButton } from './ResumeButton'
import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ThemeToggle'

const { profile } = content

export function StatusDot() {
  return <span className="inline-flex size-1.5 rounded-full bg-fg" aria-hidden />
}

interface NavProps {
  active: SectionId
  onNavigate?: () => void
}

export function NavLinks({ active, onNavigate }: NavProps) {
  return (
    <ul>
      {content.nav.map(({ id, number, label }) => {
        const isActive = active === id
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'true' : undefined}
              className={`group flex min-h-11 items-center gap-3 text-sm transition-colors ${
                isActive ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              <span className="font-mono text-[11px]">{number}</span>
              <span className={`h-px transition-all duration-300 ${isActive ? 'w-6 bg-fg' : 'w-3 bg-muted/60 group-hover:w-5'}`} aria-hidden />
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
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[245px] flex-col p-8 lg:flex">
      <div className="mb-14">
        <a href="#about" className="block text-base font-medium tracking-tight text-fg">
          {profile.name}
        </a>
        <p className="mt-2 font-mono text-[11px] leading-snug tracking-[0.12em] text-muted">{profile.shortTitle}</p>
        <p className="mt-5 flex items-center gap-2 text-xs text-muted">
          <StatusDot /> {profile.availability}
        </p>
      </div>

      <nav aria-label="Primary">
        <NavLinks active={active} />
      </nav>

      <div className="mt-auto space-y-2">
        <ResumeButton className="w-full" />
        <div className="flex items-center justify-between">
          <SocialLinks />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </aside>
  )
}
