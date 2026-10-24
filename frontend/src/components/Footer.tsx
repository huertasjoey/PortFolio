import { content } from '../content'
import { fill } from '../lib/utils'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-8 font-mono text-xs text-muted">
      {fill(content.footer.text, { year, name: content.profile.name })}
    </footer>
  )
}
