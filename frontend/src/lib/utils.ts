import { content } from '../content'
import type { CategoryId } from '../types'

/** Opens a Gmail compose window addressed to `content.profile.email` (optionally prefilled). */
export const gmailComposeUrl = (subject = '', body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(content.profile.email)}` +
  (subject ? `&su=${encodeURIComponent(subject)}` : '') +
  (body ? `&body=${encodeURIComponent(body)}` : '')

export const countByCategory = (id: CategoryId) => content.projects.filter((p) => p.categories.includes(id)).length

/** Replaces {tokens} in a content string, e.g. fill('© {year}', { year: 2026 }). */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`))
