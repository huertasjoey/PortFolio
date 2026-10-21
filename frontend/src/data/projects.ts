/**
 * Project content. Add, edit or remove entries in `projects`.
 * Every project below is described as a CONCEPT / personal project — update
 * `status` and the case-study text once you have real outcomes to share.
 * Do not add metrics you have not measured.
 */
export type CategoryId = 'embedded' | 'iot' | 'fullstack'
export type ProjectStatus = 'Concept' | 'In progress' | 'Prototype' | 'Completed'
export type IconName = 'flame' | 'fish' | 'notebook' | 'sprout'

export interface Project {
  id: string
  title: string
  /** Mono label shown above the title, e.g. "Embedded Systems · IoT" */
  classification: string
  categories: CategoryId[]
  /** Which abstract illustration to show on hover. */
  previewKind: 'hardware' | 'software'
  icon: IconName
  status: ProjectStatus
  featured?: boolean
  summary: string
  role: string
  tags: string[]
  caseStudy: {
    overview: string
    problem: string
    solution: string
    implementation: string[]
    contribution: string
    challenges: string
  }
}

export const categories: { id: CategoryId; title: string; description: string; icon: 'cpu' | 'wifi' | 'globe' }[] = [
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

export const projects: Project[] = [
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

export const countByCategory = (id: CategoryId) => projects.filter((p) => p.categories.includes(id)).length
