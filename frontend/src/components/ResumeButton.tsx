import { FileText } from 'lucide-react'
import { profile } from '../data/profile'
import { Button, ButtonLink } from './ui/Button'

export function ResumeButton({ className = '' }: { className?: string }) {
  if (!profile.resumeUrl) {
    return (
      <Button
        variant="secondary"
        disabled
        className={className}
        title="Add your resume PDF to public/ and set resumeUrl in src/data/profile.ts"
      >
        <FileText size={16} /> Resume (not added)
      </Button>
    )
  }
  return (
    <ButtonLink variant="secondary" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <FileText size={16} /> Resume
    </ButtonLink>
  )
}
