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
    gallery: 'Gallery',
    results: 'Results',
    team: 'Team',
    futureWork: 'Future work',
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
    classification: 'Embedded Systems · Computer Vision',
    categories: ['embedded', 'iot'],
    previewKind: 'hardware',
    icon: 'flame',
    image: '/images/lycodry/cover.jpg',
    status: 'Completed',
    featured: true,
    summary:
      'An automated Solanum lycopersicum (tomato) quality grading and dehydration system — a BS Computer Engineering design project (Pampanga State University, 2026) pairing a custom YOLOv11 grader on a Raspberry Pi 5 with an ESP32-controlled slicer and 24-hour dehydration chamber.',
    role: 'Hardware engineer & project architect (team of five)',
    tags: ['YOLOv11', 'Raspberry Pi 5', 'ESP32', 'Python', 'C++', 'Computer Vision'],
    caseStudy: {
      overview:
        'LycoDry is a fully automated post-harvest unit for tomatoes (Solanum lycopersicum). Raw fruit goes into a funnel; a custom YOLOv11 model grades each tomato as Market, Processing or Reject, a pneumatic actuator slices the processing-grade fruit into 2 cm pieces, and the slices are sterilised with UV-C and dried in an enclosed forced-convection chamber held at 45–55 °C for 24 hours. It was developed as a design project for the Bachelor of Science in Computer Engineering at Pampanga State University (June 2026) and passed oral examination.',
      metrics: [
        { value: '0.876', label: 'mAP@0.5 of the custom YOLOv11 model' },
        { value: '82–93%', label: 'sorting accuracy per grade on 300 farmer-graded tomatoes' },
        { value: '24 h vs 8 days', label: 'machine drying vs sun drying (about 8× faster)' },
        { value: '11.66%', label: 'mass retention after the machine cycle (sun-dried: 13.51%)' },
        { value: 'No Salmonella', label: 'detected in the prototype’s dried sample in a microbial test the team requested from DOST Pampanga; the sun-dried sample tested positive' },
        { value: '4.55 / 5.00', label: 'ISO 9241-11 usability score from a local farm owner' },
      ],
      gallery: [
        { src: '/images/lycodry/prototype.jpg', alt: 'The built LycoDry prototype with its stainless-steel enclosure and dehydration chamber', caption: 'The LycoDry prototype' },
        { src: '/images/lycodry/render.jpg', alt: '3D render of the enclosed LycoDry machine', caption: '3D render of the enclosed unit' },
        { src: '/images/lycodry/model-isometric.jpg', alt: 'Isometric 3D model of the frame with funnel, ramp, cutting module and dehydrator chamber', caption: '3D model: funnel, gravity ramp, cutting module, conveyor and dehydration chamber' },
        { src: '/images/lycodry/schematic.png', alt: 'KiCad schematic of the LycoDry control board: ESP32, sensor, servo, relay and motor-driver headers', caption: 'Circuit schematic (KiCad): ESP32 control board', fit: 'contain' },
        { src: '/images/lycodry/pcb.png', alt: 'KiCad PCB layout of the LycoDry control board with top and bottom copper traces', caption: 'Custom PCB layout (KiCad)', fit: 'contain' },
        { src: '/images/lycodry/dashboard.jpg', alt: 'LycoDry kiosk dashboard with live camera feed and production counters', caption: 'Kiosk dashboard: live feed, counters and alerts' },
        { src: '/images/lycodry/history.jpg', alt: 'LycoDry processing history page listing completed cycles', caption: 'Processing history page' },
      ],
      problem:
        'Tomatoes in the Philippines are harvested in simultaneous batches, which causes seasonal gluts, dumped produce and farmers selling at a loss. Sun drying is slow (8 days in the team’s control test), depends on the weather, exposes the fruit to dust, pests and mould, and degrades lycopene. Separating rotten fruit from good fruit by eye is inconsistent, and dryness is judged by touch and fixed timing rather than measurement.',
      solution:
        'Combine automated grading, slicing and dehydration in one machine that runs without cloud connectivity. Computer vision separates safe processing-grade fruit from market-grade and rejected fruit before anything reaches the chamber. The enclosed chamber uses UV-C sterilisation, a Peltier dehumidifier, heating coils and fans, with a dual-controller design (Raspberry Pi 5 for vision and UI, ESP32 for real-time control) to keep temperatures in a lycopene-safe 45–55 °C range regardless of weather.',
      implementation: [
        'Vision: custom YOLOv11 (Ultralytics) trained in Google Colab on a Roboflow-annotated dataset — about 2,891 original images expanded to 22,548 with flip/rotation augmentation, 640×640 input, early stopping (patience 25). It runs on-device on the Raspberry Pi 5 with a Camera Module 3 (detection threshold about 0.40, near the F1 peak of 0.84).',
        'Control: ESP32 firmware (C++/Arduino) drives sorting servos, a pneumatic slicing actuator, the conveyor and solid-state relays for the UV-C lamp, heating coil, fans and Peltier module, and reads IR break-beam sensors and a DS18B20 temperature probe. It talks to the Pi over USB serial.',
        'Process flow: tray interlock → 3–5 s image decision → servo diversion of Market/Reject fruit → 2 cm pneumatic slicing → batch of 5 (or 3 with an empty funnel) → 15-minute UV-C sterilisation → 24-hour thermal cycle held at 45–55 °C → “Ready to Harvest” alert. Safety interlocks stop sorting when a bin reaches 10 tomatoes or while a batch is drying.',
        'Dashboard: offline CustomTkinter kiosk on the Pi’s touchscreen with a live camera feed and YOLO overlays, production counters, alerts, emergency stop, a history log (local database) and a configuration page for drying time and temperature limits.',
        'Hardware: custom KiCad-designed PCB, 24 V supply with 12/6/5 V buck converters, BTS7960 motor driver, and a 47 × 40 × 25 in stainless-steel frame with a 40-litre drying chamber.',
      ],
      results: [
        'Grading model: mAP@0.5 of 0.876 overall; per-class precision 0.983 (Reject), 0.951 (Processing), 0.920 (Market), and 0.650 for the small “black spot” defect class.',
        'Physical sorting test with 300 tomatoes (100 per grade, pre-sorted by a local farmer): 87% of Market, 93% of Processing and 82% of Reject tomatoes were sorted correctly.',
        'Thermal control over a 24-hour run: average chamber temperature 50.85 °C, ranging 45.56–56.25 °C (one reading briefly exceeded the 55 °C upper limit before the cooling logic corrected it).',
        'Drying: 403 g of fresh slices dried to 47 g (11.66% mass retention) in 24 hours, versus 592 g to 80 g (13.51%) in 8 days (192 hours) of sun drying — both within the 10–15% target.',
        'Lycopene (semi-quantitative oil-extraction colour test against a colour-grade chart): the machine-dried and fresh samples both graded Orange-Red/Moderate; the sun-dried sample graded Yellow/Low-or-none.',
        'Microbial testing: the team submitted samples dried by the LycoDry prototype, along with a sun-dried control sample, to the Department of Science and Technology (DOST) Regional Standards and Testing Laboratory in San Fernando, Pampanga, and requested a microbial analysis. DOST issued the Certificates of Analysis (one sample each): machine-dried — aerobic plate count 2.4×10³ CFU/g, yeast and moulds 4.2×10³ CFU/g, coliforms and E. coli below 10 CFU/g, Salmonella not detected. Sun-dried — aerobic plate count 2.5×10⁴ CFU/g, yeast and moulds estimated above 3.0×10⁵ CFU/g, coliforms 3.2×10³ CFU/g, Salmonella detected.',
        'Usability (ISO 9241-11, evaluated by one local farm owner): effectiveness 4.33, efficiency 5.00, satisfaction 4.33 — overall 4.55 out of 5.00 (“Very Reliable”).',
        'Prototype build cost: ₱78,517, including ₱8,000 of laboratory testing.',
      ],
      team: [
        'Joey P. Huertas — hardware engineer and project architect',
        'Eli Mishael G. Dela Cruz — AI model training, and my general partner in building the whole project',
        'Renz Carlo L. Dela Cruz — documentation',
        'Jon Michael S. Lugtu — project support',
        'Adam I. Gatus — team leader',
      ],
      contribution:
        'I was the architect of the whole project and the engineer behind all of its hardware. I personally designed and built the physical prototype, and I designed the custom DIY PCB in KiCad that carries the ESP32 control board. LycoDry was developed with a team of five Computer Engineering students; the roles of each member are listed above.',
      challenges:
        'Small, highly variable defects (“black spots”) were much harder for the model to detect than whole-fruit grades (0.650 precision). Reject-grade sorting was the weakest on the physical test at 82%. Chamber temperature briefly overshot the 55 °C limit once during the 24-hour run. The prototype is deliberately slow and small — a 3–5 second decision per tomato and batches of 5 — to prioritise accuracy, and it was validated on a single crop with single-sample lab tests and a single farm-owner evaluator.',
      futureWork:
        'Reduce decision latency and scale capacity (the thesis suggests up to about 100 tomatoes per batch), add an adjustable or replaceable slicing blade matrix, use food-grade antimicrobial plastics for conveyors, add solar power for off-grid farms, build an ESP32 Wi-Fi mobile app for SMS/push alerts, and extend the vision model to other perishable crops such as mangoes and bell peppers.',
      note: 'Source: “LycoDry: An Automated Solanum Lycopersicum Quality Grading and Dehydration System”, BS Computer Engineering design project, Pampanga State University, June 2026. Text in [brackets] is placeholder content.',
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
