import { ArrowUpRight, Check, Copy, Download, Mail, MapPin } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { RichText } from '../components/RichText'
import { Reveal } from '../components/ui/Reveal'
import { content } from '../content'
import { gmailComposeUrl } from '../lib/utils'

const { profile, contact } = content

function Pill({ href, download, children }: { href: string; download?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download || undefined}
      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-fg transition-colors duration-300 hover:border-gold/70 hover:text-gold"
    >
      {children}
    </a>
  )
}

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.open(gmailComposeUrl(), '_blank', 'noopener')
    }
  }

  // Links with an empty URL in src/content.ts are left out.
  const links = [
    { label: contact.githubButton, href: profile.github },
    { label: contact.linkedinButton, href: profile.linkedin },
    { label: contact.facebookButton, href: profile.facebook },
  ].filter((l) => l.href)

  return (
    <section id="contact" aria-labelledby="contact-title" className="flex min-h-dvh flex-col justify-center py-24 lg:py-16">
      <Reveal>
        <p className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.3em] text-muted uppercase">
          <span className="font-serif text-lg tracking-normal text-gold italic lining-nums">06</span>
          <span className="h-px w-12 bg-line" aria-hidden />
          Contact
        </p>
        <h2 className="font-serif text-6xl leading-[0.95] font-light tracking-tight text-fg sm:text-7xl [&_strong]:font-light [&_strong]:text-gold [&_strong]:italic">
          <span id="contact-title">
            <RichText text={contact.heading} />
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-[1.8] text-fg2">{contact.description}</p>
      </Reveal>

      {/* The email card: the main way to reach me. */}
      <Reveal delay={0.08} className="mt-10">
        <div className="relative overflow-hidden rounded-[3px] border border-gold/30 bg-card p-7 sm:p-10 lg:p-12">
          <span aria-hidden className="pointer-events-none absolute -top-40 -left-24 size-96 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2.5 text-[11px] tracking-[0.3em] text-gold uppercase">
                <Mail size={14} strokeWidth={1.5} /> {contact.emailLabel}
              </p>
              <a
                href={gmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block font-serif text-3xl leading-tight font-light break-all text-fg lining-nums transition-colors hover:text-gold sm:text-5xl sm:break-normal"
              >
                {profile.email}
              </a>
              <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg2">
                <span className="flex items-center gap-2">
                  <MapPin size={15} strokeWidth={1.5} className="text-muted" /> {profile.location}
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gold" aria-hidden /> {contact.availability}
                </span>
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={gmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-gold px-6 text-sm font-medium text-bg shadow-lg shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <Mail size={16} strokeWidth={1.75} /> {contact.sendButton}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-bg/40 px-6 text-sm text-fg transition-colors duration-300 hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {copied ? <Check size={16} className="text-gold" /> : <Copy size={16} strokeWidth={1.5} />}
                <span aria-live="polite">{copied ? contact.copiedLabel : contact.copyButton}</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.14} className="mt-6 flex flex-wrap gap-3">
        {links.map((l) => (
          <Pill key={l.label} href={l.href}>
            {l.label}
            <ArrowUpRight size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Pill>
        ))}
        {profile.resumeUrl && (
          <Pill href={profile.resumeUrl} download>
            <Download size={15} strokeWidth={1.5} /> {profile.resumeLabel}
          </Pill>
        )}
      </Reveal>
      {contact.note && <p className="mt-5 text-[11px] text-muted">{contact.note}</p>}
    </section>
  )
}
