import { FileText } from 'lucide-react'
import { content } from '../content'
import { Button, ButtonLink } from './ui/Button'

const { profile } = content

export function ResumeButton({ className = '' }: { className?: string }) {
  if (!profile.resumeUrl) {
    return (
      <Button variant="ghost" disabled className={`justify-start ${className}`} title={profile.resumeMissingHint}>
        <FileText size={16} /> {profile.resumeMissingLabel}
      </Button>
    )
  }
  return (
    <ButtonLink
      variant="ghost"
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`justify-start ${className}`}
    >
      <FileText size={16} /> {profile.resumeLabel}
    </ButtonLink>
  )
}
