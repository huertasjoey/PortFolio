import { Mail, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { SectionHeading } from '../components/SectionHeading'
import { Button, ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; text: string }
  | { kind: 'unconfigured' }

const empty: Fields = { name: '', email: '', subject: '', message: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please enter your name.'
  if (!f.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.subject.trim()) e.subject = 'Please add a subject.'
  if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

const inputClass =
  'w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted transition focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs tracking-wider text-muted uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactSection() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setFields((f) => ({ ...f, [k]: e.target.value }))

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(
    `${fields.message}\n\n— ${fields.name} (${fields.email})`,
  )}`

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) return

    if (!profile.contactEndpoint) {
      setStatus({ kind: 'unconfigured' })
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(profile.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setStatus({ kind: 'sent' })
      setFields(empty)
    } catch {
      setStatus({ kind: 'error', text: 'Your message could not be sent. Please try again or email me directly.' })
    }
  }

  const a11y = (k: keyof Fields) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 lg:py-28">
      <SectionHeading
        number="06"
        label="Contact"
        description="I'm open to opportunities, freelance projects, and collaborations involving web development, IoT, embedded systems, and emerging technologies."
      >
        <span id="contact-title">
          Have something worth <strong>building?</strong>
        </span>
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="flex flex-col items-start gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>
            <Mail size={16} /> {profile.email}
          </ButtonLink>
          <ButtonLink href={profile.github} variant="secondary" target="_blank" rel="noopener noreferrer">
            <GithubIcon /> GitHub
          </ButtonLink>
          <ButtonLink href={profile.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon /> LinkedIn
          </ButtonLink>
          <p className="mt-2 font-mono text-xs text-muted">Email, GitHub and LinkedIn links are placeholders until set in src/data/profile.ts.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="theme-fade space-y-5 rounded-[18px] border border-line bg-card p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" autoComplete="name" className={inputClass} value={fields.name} onChange={set('name')} {...a11y('name')} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" className={inputClass} value={fields.email} onChange={set('email')} {...a11y('email')} />
              </Field>
            </div>
            <Field id="subject" label="Subject" error={errors.subject}>
              <input id="subject" className={inputClass} value={fields.subject} onChange={set('subject')} {...a11y('subject')} />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" rows={6} className={`${inputClass} resize-y`} value={fields.message} onChange={set('message')} {...a11y('message')} />
            </Field>

            <Button type="submit" disabled={status.kind === 'sending'}>
              <Send size={16} /> {status.kind === 'sending' ? 'Sending…' : 'Send message'}
            </Button>

            <div role="status" aria-live="polite" className="text-sm">
              {status.kind === 'sent' && <p className="text-accent">Message sent. Thank you — I'll reply by email.</p>}
              {status.kind === 'error' && <p className="text-red-400">{status.text}</p>}
              {status.kind === 'unconfigured' && (
                <div className="rounded-xl border border-line bg-bg p-4 text-fg2">
                  <p className="mb-2 text-fg">Your message was not sent.</p>
                  <p>
                    This form isn't connected to an email service yet, so nothing has been delivered. Set{' '}
                    <code className="font-mono text-xs text-accent">VITE_CONTACT_ENDPOINT</code> to enable it, or{' '}
                    <a className="text-accent underline underline-offset-2" href={mailto}>
                      send this message from your email app
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
