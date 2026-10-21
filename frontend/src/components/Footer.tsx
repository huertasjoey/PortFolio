import { profile } from '../data/profile'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-8 font-mono text-xs text-muted">
      © {year} {profile.name}. Built with React &amp; Tailwind CSS.
    </footer>
  )
}
