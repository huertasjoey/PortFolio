import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { content } from '../content'
import { gmailComposeUrl } from '../lib/utils'

const { profile } = content

const links = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'Email', href: gmailComposeUrl(), Icon: Mail, external: true },
]

export function SocialLinks() {
  return (
    <ul className="flex gap-2">
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid size-11 place-items-center rounded-xl border border-line text-fg2 transition hover:border-accent hover:text-accent"
          >
            <Icon size={16} />
          </a>
        </li>
      ))}
    </ul>
  )
}
