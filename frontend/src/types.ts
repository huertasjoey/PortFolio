/** Shapes of the data in src/content.ts. You normally don't need to edit this file. */

export type SectionId = 'about' | 'work' | 'experience' | 'skills' | 'education' | 'contact'

export interface NavItem {
  id: SectionId
  number: string
  label: string
}

export type CategoryId = 'embedded' | 'iot' | 'pcb' | 'ai' | 'fullstack'
export type ProjectStatus = 'Concept' | 'In progress' | 'Prototype' | 'Completed'
export type IconName = 'flame' | 'fish' | 'notebook' | 'sprout'

export interface Category {
  id: CategoryId
  title: string
  description: string
  icon: 'cpu' | 'wifi' | 'globe'
}

/**
 * One tab of a 2D image viewer (PCB views, flowcharts).
 * fit: 'contain' (default, 16:9 on white, for diagrams), 'cover' (fills the frame, for photos)
 * or 'natural' (keeps the image's own shape, for tall diagrams).
 */
export interface ImageView {
  label: string
  src: string
  alt: string
  caption: string
  fit?: 'cover' | 'contain' | 'natural'
}

export interface HowItWorksIntro {
  /** Section label; defaults to "How it works" (e.g. "How it's made"). */
  title?: string
  lead: string
  accent: string
  chips?: string[]
}

/** One step of a "How it works" walkthrough. `video` is a short muted clip; `poster` is its first frame (or the image to show). */
export interface ProcessStep {
  title: string
  text: string
  /** Short engineering stage name, e.g. 'Inference'. */
  stage?: string
  /** Up to three [label, value] facts shown under the player, e.g. ['Model', 'YOLOv11']. */
  specs?: [string, string][]
  video?: string
  poster: string
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
    /**
     * Optional head-to-head benchmark, e.g. machine vs sun drying. `a` is this project, `b` the baseline.
     * `bars` are raw values for a linear bar pair; `better` says which side wins.
     */
    comparison?: {
      heading?: { lead: string; accent: string }
      a: string
      b: string
      highlights?: { value: string; label: string }[]
      rows: { metric: string; a: string; b: string; gap: string; better?: 'a' | 'b'; bars?: [number, number]; note?: string }[]
      note?: string
    }
    /** Optional thesis / paper this project comes from, shown at the top of the case study. */
    thesis?: { title: string; meta: string; label?: string }
    /** Heading, label and chips for the "How it works" section, e.g. lead 'From raw tomato to', accent 'dried batch.' */
    howItWorksIntro?: HowItWorksIntro
    /** Optional "How it works" walkthrough, start to finish: one short clip (or image) per step. */
    howItWorks?: ProcessStep[]
    /** Optional "Technical implementation" bullet list. */
    implementation?: string[]
    contribution: string
    challenges: string
    /** Optional headline numbers shown as stat tiles. Only use measured figures. */
    metrics?: { value: string; label: string }[]
    /** Optional video shown under the metrics. Files live in public/videos/. */
    video?: { title: string; src: string; poster: string; caption: string }
    /** Optional figures, e.g.{ src: '/images/x.jpg', alt: '…', caption: '…' }. Files live in public/images/. */
    gallery?: { src: string; alt: string; caption: string; fit?: 'cover' | 'contain'; full?: string }[]
    /** Optional extra carousels, each with its own heading. `full` is a larger image for full screen. */
    galleries?: {
      title: string
      slides: { src: string; alt: string; caption: string; fit?: 'cover' | 'contain'; full?: string }[]
    }[]
    /** Optional interactive 3D models of the whole project, one tab each. `src` is a .glb file in public/models/. */
    model3d?: { description: string; views: { label: string; src: string; alt: string; caption: string }[] }
    /**
     * Optional PCB design section with 2D views and an interactive 3D model.
     * `model` is a .glb file in public/models/ (KiCad 8+: PCB Editor → File → Export → GLB).
     */
    pcb?: {
      description: string
      views: ImageView[]
      model?: { src: string; alt: string }
    }
    /**
     * Optional system flowchart(s), one tab each (e.g. start-up, sorting, drying).
     * live: show the animated LycoDry simulation (components/LiveFlowchart.tsx) instead,
     * with the images behind a "View the original flowcharts" button.
     */
    flowchart?: { description: string; views: ImageView[]; live?: boolean }
    /** Optional grouped feature list, e.g. { group: 'Habits', items: ['…'] }. */
    features?: { group: string; items: string[] }[]
    /** Optional bullet list of results and findings. */
    results?: string[]
    /** Optional co-authors / team members. */
    team?: string[]
    /** Optional planned improvements. */
    futureWork?: string
    /** Set to false to hide the picture banner at the top of the case study. Default: shown. */
    banner?: boolean
    /** Optional animated background behind the full-screen case study. */
    background?: 'binary-orbit' | 'fading-stars'
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
  icon: 'code' | 'database' | 'cpu' | 'brain' | 'circuit'
  /** One line under the title. */
  description?: string
  items: string[]
  /** Work-page category the card's "See N projects" link opens. */
  category?: CategoryId
}

export type TechIcon = 'react' | 'javascript' | 'html' | 'css' | 'tailwind' | 'supabase' | 'python' | 'kicad'

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
