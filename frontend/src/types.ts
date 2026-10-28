/** Shapes of the data in src/content.ts. You normally don't need to edit this file. */

export type SectionId = 'about' | 'work' | 'experience' | 'skills' | 'education' | 'contact'

export interface NavItem {
  id: SectionId
  number: string
  label: string
}

export type CategoryId = 'embedded' | 'iot' | 'fullstack'
export type ProjectStatus = 'Concept' | 'In progress' | 'Prototype' | 'Completed'
export type IconName = 'flame' | 'fish' | 'notebook' | 'sprout'

export interface Category {
  id: CategoryId
  title: string
  description: string
  icon: 'cpu' | 'wifi' | 'globe'
}

export interface Project {
  id: string
  title: string
  /** Mono label shown above the title, e.g. "Embedded Systems · IoT" */
  classification: string
  categories: CategoryId[]
  /** Which abstract illustration to show on hover. */
  previewKind: 'hardware' | 'software'
  icon: IconName
  /** Optional cover image (in public/images/). Replaces the dotted icon preview. */
  image?: string
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
    /** Optional headline numbers shown as stat tiles. Only use measured figures. */
    metrics?: { value: string; label: string }[]
    /** Optional figures, e.g. { src: '/images/x.jpg', alt: '…', caption: '…' }. Files live in public/images/. */
    gallery?: { src: string; alt: string; caption: string; fit?: 'cover' | 'contain' }[]
    /** Optional bullet list of results and findings. */
    results?: string[]
    /** Optional co-authors / team members. */
    team?: string[]
    /** Optional planned improvements. */
    futureWork?: string
    /** Optional note shown at the bottom instead of the default disclaimer. */
    note?: string
  }
}

export interface ExperienceEntry {
  role: string
  organization: string
  period: string
  description: string
  tech: string[]
}

export interface SkillGroup {
  title: string
  icon: 'code' | 'database' | 'cpu' | 'brain'
  items: string[]
}

export type TechIcon = 'react' | 'javascript' | 'html' | 'css' | 'tailwind' | 'supabase' | 'python'

export interface TechLogo {
  icon: TechIcon
  title: string
  href: string
  hoverColor: string
}

export interface EducationEntry {
  degree: string
  institution: string
  location: string
  /** Optional, e.g. "2020 — 2024". Leave out if you don't want it shown. */
  period?: string
}
