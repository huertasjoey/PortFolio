/**
 * Personal details and links. Edit this file to update the sidebar, hero,
 * contact section and footer.
 *
 * Anything containing "your-" or "example.com" is a PLACEHOLDER.
 */
export const profile = {
  name: 'Joey Huertas',
  title: 'Computer Engineer · Full-Stack Developer',
  shortTitle: 'COMPUTER ENGINEER · FULL-STACK',
  interests: ['IoT', 'Embedded Systems', 'AI Engineering'],
  availability: 'Open to work',
  /** Used for every email link and the contact form fallback. */
  email: 'joeyhuertas12@gmail.com',
  /** PLACEHOLDER (LinkedIn) — replace with your real profile URL. */
  github: 'https://github.com/huertasjoey',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  /**
   * Put your resume PDF in `frontend/public/` (e.g. `resume.pdf`) and set this
   * to '/resume.pdf'. While empty, the Resume button is shown as disabled.
   */
  resumeUrl: '',
  /**
   * Optional form endpoint (Formspree, Web3Forms, your own API…). Set
   * VITE_CONTACT_ENDPOINT in `.env`. Without it the form cannot deliver mail.
   */
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '',
}

export const navItems = [
  { id: 'about', number: '01', label: 'About' },
  { id: 'work', number: '02', label: 'Work' },
  { id: 'experience', number: '03', label: 'Experience' },
  { id: 'skills', number: '04', label: 'Skills' },
  { id: 'education', number: '05', label: 'Education' },
  { id: 'contact', number: '06', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const focusAreas = [
  'Full-stack web applications',
  'Embedded systems & sensors',
  'IoT & automation',
  'Applied AI engineering',
]

/** Opens a Gmail compose window addressed to `profile.email` (optionally prefilled). */
export const gmailComposeUrl = (subject = '', body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}` +
  (subject ? `&su=${encodeURIComponent(subject)}` : '') +
  (body ? `&body=${encodeURIComponent(body)}` : '')
