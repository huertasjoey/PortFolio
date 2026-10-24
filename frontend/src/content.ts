/**
 * ──────────────────────────────────────────────────────────────────────────
 *  ALL PORTFOLIO CONTENT LIVES HERE.
 *  Edit the text, links, projects, skills, etc. in this file only — you
 *  should not need to touch anything in src/components or src/sections.
 *
 *  Tips
 *  • Wrap words in **double asterisks** to make them bold in headings.
 *  • Text in [square brackets] is a placeholder — replace or delete it.
 *  • Don't add metrics, awards or employers you can't back up.
 * ──────────────────────────────────────────────────────────────────────────
 */
import type { Category, EducationEntry, ExperienceEntry, NavItem, Project, SkillGroup, TechLogo } from './types'

/* ───────────────────────── Profile & links ───────────────────────── */

const profile = {
  name: 'Joey Huertas',
  /** Full title (used in the page header area / meta). */
  title: 'Computer Engineer · Full-Stack Developer',
  /** Small uppercase label under your name in the sidebar. */
  shortTitle: 'COMPUTER ENGINEER · FULL-STACK',
  /** Text next to the blue status dot. */
  availability: 'Open to work',
  email: 'joeyhuertas12@gmail.com',
  github: 'https://github.com/huertasjoey',
  /** PLACEHOLDER — replace with your real LinkedIn profile URL. */
  linkedin: 'https://www.linkedin.com/in/your-profile',
  /**
   * Resume: put your PDF in `frontend/public/` (e.g. resume.pdf) and set this to
   * '/resume.pdf'. While empty, the Resume button is shown as disabled.
   */
  resumeUrl: '',
  resumeLabel: 'Resume',
  resumeMissingLabel: 'Resume (not added)',
  resumeMissingHint: 'Add your resume PDF to public/ and set resumeUrl in src/content.ts',
  /**
   * Contact form endpoint (Formspree, Web3Forms, your own API…). Set the
   * VITE_CONTACT_ENDPOINT environment variable rather than putting it here.
   */
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '',
}

/** Sidebar / mobile menu links. Keep the ids — they match the section ids on the page. */
const nav: NavItem[] = [
  { id: 'about', number: '01', label: 'About' },
  { id: 'work', number: '02', label: 'Work' },
  { id: 'experience', number: '03', label: 'Experience' },
  { id: 'skills', number: '04', label: 'Skills' },
  { id: 'education', number: '05', label: 'Education' },
  { id: 'contact', number: '06', label: 'Contact' },
]

/* ───────────────────────────── 01 About ───────────────────────────── */

const about = {
  /** Portrait shown beside the headline. Files live in frontend/public/images/. Set src to '' to hide it. */
  photo: {
    src: '/images/joey-portrait.jpg',
    alt: 'Portrait of Joey Huertas in graduation attire',
    caption: 'Computer Engineering · Pampanga State University',
  },
  headline: 'Building at the intersection of **hardware**, **software**, and **intelligence.**',
  paragraphs: [
    'I’m Joey Huertas, a Computer Engineering graduate growing into full-stack web development, IoT, embedded systems and AI engineering.',
    'I like problems that cross layers — a sensor reading that ends up on a screen, a microcontroller that decides when to act, an interface that makes the data useful. I start from the real-world need, sketch the system end to end, then build and test it in small steps.',
  ],
  focusTitle: 'Focus areas',
  focusAreas: [
    'Full-stack web applications',
    'Embedded systems & sensors',
    'IoT & automation',
    'Applied AI engineering',
  ],
  primaryButton: 'Explore my projects',
  secondaryButton: 'Get in touch',
}

/* ────────────────────────────── 02 Work ───────────────────────────── */

const work = {
  heading: 'Selected **builds.**',
  description:
    'From connected hardware to full-stack applications, a selection of projects I’ve designed and built.',
  browseTitle: 'Browse by category',
  moreTitle: 'More projects',
  /** {category} is replaced with the selected category name. */
  moreTitleFiltered: '{category} — more projects',
  clearFilter: 'Clear filter',
  emptyOnlyFeatured: 'The featured project above is the only one in {category}.',
  emptyNone: 'No other projects in this category yet.',
}

/** Wording used on project cards, the featured card and the case-study dialog. */
const projectUi = {
  featuredLabel: 'Featured',
  statusLabel: 'STATUS',
  roleLabel: 'ROLE',
  caseStudyButton: 'Read the case study',
  closeLabel: 'Close case study',
  hardwarePreviewLabel: 'Hardware / Firmware',
  softwarePreviewLabel: 'Software / Web',
  projectSingular: 'project',
  projectPlural: 'projects',
  caseStudyHeadings: {
    overview: 'Overview',
    problem: 'Problem',
    solution: 'Solution',
    implementation: 'Technical implementation',
    contribution: 'My contribution',
    challenges: 'Challenges',
  },
  roleInline: 'Role:',
  disclaimer: 'Text in [brackets] is placeholder content. No results or metrics are claimed for this project.',
}

const categories: Category[] = [
  {
    id: 'embedded',
    title: 'Embedded Systems',
    description: 'Microcontrollers, sensors and firmware close to the metal.',
    icon: 'cpu',
  },
  {
    id: 'iot',
    title: 'IoT & Hardware',
    description: 'Connected devices, monitoring and automation in the real world.',
    icon: 'wifi',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Applications',
    description: 'Web apps with interfaces, data and APIs end to end.',
    icon: 'globe',
  },
]

const ROLE_PLACEHOLDER = '[Edit: describe your exact role]'
const CONTRIBUTION_PLACEHOLDER = '[Edit: describe what you designed, built or researched on this project.]'

/**
 * Projects. Add, edit or remove entries freely. The one with `featured: true`
 * gets the large card; the rest appear in the grid below it.
 * icon: 'flame' | 'fish' | 'notebook' | 'sprout'
 * categories: any of 'embedded' | 'iot' | 'fullstack'
 */
const projects: Project[] = [
  {
    id: 'lycodry',
    title: 'LycoDry',
    classification: 'Embedded Systems · Automation',
    categories: ['embedded', 'iot'],
    previewKind: 'hardware',
    icon: 'flame',
    status: 'Concept',
    featured: true,
    summary: 'An automated Solanum lycopersicum (tomato) quality grading and dehydration system.',
    role: `System design — ${ROLE_PLACEHOLDER}`,
    tags: ['Embedded Systems', 'Automation', 'Sensors', 'Hardware'],
    caseStudy: {
      overview:
        'LycoDry is an automated system that grades the quality of tomatoes (Solanum lycopersicum) and dehydrates them. [Edit: confirm project status.]',
      problem:
        'Manual grading of tomatoes is slow and inconsistent, and dehydration quality depends on careful monitoring. [Edit: confirm and refine the problem you set out to solve.]',
      solution:
        'Combine automated quality grading with a controlled dehydration process in a single system. [Edit: describe how it works.]',
      implementation: [
        '[Edit: grading method, e.g. sensors or camera, and the quality criteria used.]',
        '[Edit: dehydrator control, e.g. temperature and airflow.]',
        '[Edit: microcontroller, firmware and any connectivity.]',
      ],
      contribution: CONTRIBUTION_PLACEHOLDER,
      challenges: '[Edit: add real challenges. No results are claimed for this project.]',
    },
  },
  {
    id: 'aquarium-monitor',
    title: 'Aquarium Monitoring System',
    classification: 'IoT · Environmental Monitoring',
    categories: ['iot', 'embedded'],
    previewKind: 'hardware',
    icon: 'fish',
    status: 'Concept',
    summary:
      'A smart aquarium monitoring concept that tracks water pH, temperature, and conductivity, with automated filtration and notifications when water conditions remain abnormal.',
    role: `System design — ${ROLE_PLACEHOLDER}`,
    tags: ['IoT', 'Sensors', 'Automation', 'Embedded Systems'],
    caseStudy: {
      overview:
        'A concept for continuously monitoring aquarium water quality and reacting when conditions drift out of range.',
      problem:
        'Water parameters like pH, temperature and conductivity change gradually and are easy to miss, yet they directly affect aquatic life.',
      solution:
        'Measure the three parameters with sensors, trigger automated filtration, and send a notification if abnormal readings persist.',
      implementation: [
        'pH, temperature and conductivity sensors connected to a microcontroller.',
        'Threshold logic that only alerts when abnormal conditions persist.',
        'Relay-driven filtration control.',
        'Notification channel (to be selected).',
      ],
      contribution: CONTRIBUTION_PLACEHOLDER,
      challenges:
        'Likely challenges include sensor calibration and drift, waterproofing, and avoiding false alarms. [Edit: replace with what you actually encountered.]',
    },
  },
  {
    id: 'habit-journal',
    title: 'Habit Tracker & Daily Journal',
    classification: 'Full-Stack Web Application',
    categories: ['fullstack'],
    previewKind: 'software',
    icon: 'notebook',
    status: 'In progress',
    summary:
      'A personal productivity application for tracking daily habits, managing goals, writing journal entries, and reviewing progress over time.',
    role: `Full-stack developer — ${ROLE_PLACEHOLDER}`,
    tags: ['React', 'Tailwind CSS', 'Supabase', 'Full-Stack'],
    caseStudy: {
      overview:
        'A web app that brings habit tracking, goals and journaling into one place so progress is easy to review.',
      problem:
        'Habits, goals and reflections are often scattered across separate tools, which makes it hard to see the bigger picture.',
      solution:
        'A single application where daily habits are checked off, goals are managed, entries are written, and progress is reviewed over time.',
      implementation: [
        'React front end styled with Tailwind CSS.',
        'Supabase for authentication and data storage.',
        'Views for daily check-ins, journal entries and progress review.',
      ],
      contribution: '[Edit: describe what you built — UI, data model, auth, etc.]',
      challenges: '[Edit: add real challenges, e.g. data modelling, state management or auth flow.]',
    },
  },
  {
    id: 'recoir',
    title: 'ReCoir',
    classification: 'Smart Agriculture · IoT',
    categories: ['iot', 'embedded'],
    previewKind: 'hardware',
    icon: 'sprout',
    status: 'Concept',
    summary:
      'A proposed smart coconut husk processing machine concept exploring the conversion of agricultural waste into useful coir materials.',
    role: `Concept & system design — ${ROLE_PLACEHOLDER}`,
    tags: ['IoT', 'Embedded Systems', 'Automation', 'Sustainability'],
    caseStudy: {
      overview:
        'ReCoir is a proposed machine concept for turning coconut husks, a common agricultural by-product, into useful coir materials.',
      problem:
        'Coconut husks are often discarded as waste even though the fibre inside has value. Processing is typically labour-intensive.',
      solution:
        'A smart, partly automated machine that handles husk processing with sensing and control to make the process more efficient.',
      implementation: [
        'Mechanical processing stage (design to be defined).',
        'Microcontroller-based control and safety interlocks.',
        'Sensors for monitoring the machine state.',
      ],
      contribution: CONTRIBUTION_PLACEHOLDER,
      challenges: '[Edit: add real challenges. This is a proposed concept; no results are claimed.]',
    },
  },
]

/* ─────────────────────────── 03 Experience ────────────────────────── */

/**
 * Leave `entries` EMPTY to show the "independent work" cards instead.
 * Example entry:
 *   { role: 'Intern', organization: 'Company', period: '2025', description: '…', tech: ['React'] }
 */
const experienceEntries: ExperienceEntry[] = []

const experience = {
  heading: 'Where I’ve **grown.**',
  entries: experienceEntries,
  /** Shown while `entries` is empty. */
  fallbackItems: [
    {
      title: 'Independent projects',
      text: 'Self-directed builds across embedded hardware, IoT and full-stack web — see the Work section.',
    },
    {
      title: 'Practical engineering',
      text: 'Applying computer engineering coursework to sensors, microcontrollers and circuit design.',
    },
    {
      title: 'Continuous learning',
      text: 'Growing in AI engineering, automation and modern web tooling.',
    },
  ],
  fallbackNote: 'No formal employment is listed here. Add entries in src/content.ts to replace this view.',
  technologiesLabel: 'Technologies',
}

/* ───────────────────────────── 04 Skills ──────────────────────────── */

const skillGroups: SkillGroup[] = [
  { title: 'Frontend Development', icon: 'code', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Backend & Data', icon: 'database', items: ['Supabase', 'Database fundamentals', 'REST APIs'] },
  {
    title: 'Computer Engineering',
    icon: 'cpu',
    items: ['Embedded Systems', 'Microcontrollers', 'Sensors', 'Circuit Design', 'IoT'],
  },
  {
    title: 'AI & Continuous Learning',
    icon: 'brain',
    // Keep "Python" only if it is part of your actual skill set.
    items: ['Python', 'AI Engineering fundamentals', 'Automation'],
  },
]

/**
 * Scrolling logo strip. `icon` must be one of:
 * 'react' | 'javascript' | 'html' | 'css' | 'tailwind' | 'supabase' | 'python'
 * (To add a new icon, register it in src/sections/SkillsSection.tsx.)
 */
const techLogos: TechLogo[] = [
  { icon: 'react', title: 'React', href: 'https://react.dev', hoverColor: '#61dafb' },
  { icon: 'javascript', title: 'JavaScript', href: 'https://developer.mozilla.org/docs/Web/JavaScript', hoverColor: '#f7df1e' },
  { icon: 'html', title: 'HTML', href: 'https://developer.mozilla.org/docs/Web/HTML', hoverColor: '#e34f26' },
  { icon: 'css', title: 'CSS', href: 'https://developer.mozilla.org/docs/Web/CSS', hoverColor: '#1572b6' },
  { icon: 'tailwind', title: 'Tailwind CSS', href: 'https://tailwindcss.com', hoverColor: '#38bdf8' },
  { icon: 'supabase', title: 'Supabase', href: 'https://supabase.com', hoverColor: '#3ecf8e' },
  { icon: 'python', title: 'Python', href: 'https://www.python.org', hoverColor: '#3776ab' },
]

const skills = {
  heading: 'Tools I **work with.**',
  logosLabel: 'Technologies I use',
  groups: skillGroups,
  logos: techLogos,
}

/* ──────────────────────────── 05 Education ────────────────────────── */

const educationEntries: EducationEntry[] = [
  {
    degree: 'Computer Engineering',
    institution: 'Pampanga State University',
    location: 'Pampanga, Philippines',
    // period: '2020 — 2024',
  },
]

const education = {
  heading: 'Engineering my **foundation.**',
  entries: educationEntries,
}

/* ───────────────────────────── 06 Contact ─────────────────────────── */

const contact = {
  heading: 'Have something worth **building?**',
  description:
    'I’m open to opportunities, freelance projects, and collaborations involving web development, IoT, embedded systems, and emerging technologies.',
  githubButton: 'GitHub',
  linkedinButton: 'LinkedIn',
  /** Small print under the buttons. Set to '' to hide. */
  note: 'The LinkedIn link is a placeholder until set in src/content.ts.',
  form: {
    nameLabel: 'Name',
    emailLabel: 'Email',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    submit: 'Send message',
    sending: 'Sending…',
    errors: {
      name: 'Please enter your name.',
      emailMissing: 'Please enter your email.',
      emailInvalid: 'Enter a valid email address.',
      subject: 'Please add a subject.',
      message: 'Message should be at least 10 characters.',
    },
    sent: 'Message sent. Thank you — I’ll reply by email.',
    failed: 'Your message could not be sent. Please try again or email me directly.',
    notConnectedTitle: 'Your message was not sent.',
    notConnectedBody:
      'This form isn’t connected to an email service yet, so nothing has been delivered. Set VITE_CONTACT_ENDPOINT to enable it, or',
    gmailFallback: 'send this message from Gmail',
  },
}

/* ────────────────────────────── Footer ────────────────────────────── */

const footer = {
  /** {year} and {name} are filled in automatically. */
  text: '© {year} {name}. Built with React & Tailwind CSS.',
}

/* ────────────────────────────── Export ────────────────────────────── */

export const content = {
  profile,
  nav,
  about,
  work,
  projectUi,
  categories,
  projects,
  experience,
  skills,
  education,
  contact,
  footer,
}
