import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { content } from '../content'
import type { SectionId } from '../types'
import { ResumeButton } from './ResumeButton'
import { NavLinks, StatusDot } from './Sidebar'
import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ThemeToggle'

const { profile } = content

interface Props {
  active: SectionId
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

/** Compact sticky header with a disclosure menu, shown below lg. */
export function MobileNavigation({ active, theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="theme-fade fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/90 backdrop-blur lg:hidden">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <a href="#about" className="flex items-center gap-3 font-semibold text-fg">
          {profile.name}
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-normal tracking-wider text-muted">
            <StatusDot /> OPEN
          </span>
        </a>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className="-mr-3 grid size-11 place-items-center rounded-md text-fg"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line"
          >
            <nav aria-label="Primary" className="p-4 sm:px-6">
              <NavLinks active={active} onNavigate={() => setOpen(false)} />
              <div className="mt-4 space-y-4">
                <ResumeButton className="w-full" />
                <div className="flex items-center justify-between">
                  <SocialLinks />
                  <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
