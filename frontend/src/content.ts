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
    features: 'Features',
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
      banner: false,
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
      galleries: [
        {
          title: 'Created by hand',
          slides: [
            { src: '/images/lycodry/process/01.jpg', full: '/images/lycodry/process/01-full.jpg', alt: 'LycoDry build photo: planning: researching parts and requirements', caption: 'Planning: researching parts and requirements' },
            { src: '/images/lycodry/process/02.jpg', full: '/images/lycodry/process/02-full.jpg', alt: 'LycoDry build photo: frame: cutting and welding the stainless-steel frame', caption: 'Frame: cutting and welding the stainless-steel frame' },
            { src: '/images/lycodry/process/03.jpg', full: '/images/lycodry/process/03-full.jpg', alt: 'LycoDry build photo: frame: welding the main structure', caption: 'Frame: welding the main structure' },
            { src: '/images/lycodry/process/04.jpg', full: '/images/lycodry/process/04-full.jpg', alt: 'LycoDry build photo: frame: welding late into the evening', caption: 'Frame: welding late into the evening' },
            { src: '/images/lycodry/process/05.jpg', full: '/images/lycodry/process/05-full.jpg', alt: 'LycoDry build photo: frame: cutting steel with an angle grinder', caption: 'Frame: cutting steel with an angle grinder' },
            { src: '/images/lycodry/process/06.jpg', full: '/images/lycodry/process/06-full.jpg', alt: 'LycoDry build photo: frame: grinding joints smooth', caption: 'Frame: grinding joints smooth' },
            { src: '/images/lycodry/process/07.jpg', full: '/images/lycodry/process/07-full.jpg', alt: 'LycoDry build photo: frame: first assembly with the conveyor belt in place', caption: 'Frame: first assembly with the conveyor belt in place' },
            { src: '/images/lycodry/process/08.jpg', full: '/images/lycodry/process/08-full.jpg', alt: 'LycoDry build photo: frame: assembling the upper structure', caption: 'Frame: assembling the upper structure' },
            { src: '/images/lycodry/process/09.jpg', full: '/images/lycodry/process/09-full.jpg', alt: 'LycoDry build photo: frame: measuring and fitting panels', caption: 'Frame: measuring and fitting panels' },
            { src: '/images/lycodry/process/10.jpg', full: '/images/lycodry/process/10-full.jpg', alt: 'LycoDry build photo: conveyor: aligning the roller frame', caption: 'Conveyor: aligning the roller frame' },
            { src: '/images/lycodry/process/11.jpg', full: '/images/lycodry/process/11-full.jpg', alt: 'LycoDry build photo: conveyor: preparing the roller pipes', caption: 'Conveyor: preparing the roller pipes' },
            { src: '/images/lycodry/process/12.jpg', full: '/images/lycodry/process/12-full.jpg', alt: 'LycoDry build photo: conveyor: cutting parts by hand', caption: 'Conveyor: cutting parts by hand' },
            { src: '/images/lycodry/process/13.jpg', full: '/images/lycodry/process/13-full.jpg', alt: 'LycoDry build photo: conveyor: fitting the pulley on a roller shaft', caption: 'Conveyor: fitting the pulley on a roller shaft' },
            { src: '/images/lycodry/process/14.jpg', full: '/images/lycodry/process/14-full.jpg', alt: 'LycoDry build photo: conveyor: mounting the rollers', caption: 'Conveyor: mounting the rollers' },
            { src: '/images/lycodry/process/15.jpg', full: '/images/lycodry/process/15-full.jpg', alt: 'LycoDry build photo: conveyor: fitting the belt', caption: 'Conveyor: fitting the belt' },
            { src: '/images/lycodry/process/16.jpg', full: '/images/lycodry/process/16-full.jpg', alt: 'LycoDry build photo: conveyor: shaping the belt mat', caption: 'Conveyor: shaping the belt mat' },
            { src: '/images/lycodry/process/17.jpg', full: '/images/lycodry/process/17-full.jpg', alt: 'LycoDry build photo: cutting module: test-fitting the slicer parts', caption: 'Cutting module: test-fitting the slicer parts' },
            { src: '/images/lycodry/process/18.jpg', full: '/images/lycodry/process/18-full.jpg', alt: 'LycoDry build photo: cutting module: parts and tools on the workbench', caption: 'Cutting module: parts and tools on the workbench' },
            { src: '/images/lycodry/process/19.jpg', full: '/images/lycodry/process/19-full.jpg', alt: 'LycoDry build photo: funnel mounted on the frame', caption: 'Funnel mounted on the frame' },
            { src: '/images/lycodry/process/20.jpg', full: '/images/lycodry/process/20-full.jpg', alt: 'LycoDry build photo: electronics: designing the PCB and prototyping the circuit', caption: 'Electronics: designing the PCB and prototyping the circuit' },
            { src: '/images/lycodry/process/21.jpg', full: '/images/lycodry/process/21-full.jpg', alt: 'LycoDry build photo: electronics: the finished DIY PCB, component side', caption: 'Electronics: the finished DIY PCB, component side' },
            { src: '/images/lycodry/process/22.jpg', full: '/images/lycodry/process/22-full.jpg', alt: 'LycoDry build photo: electronics: the DIY PCB, copper side', caption: 'Electronics: the DIY PCB, copper side' },
            { src: '/images/lycodry/process/23.jpg', full: '/images/lycodry/process/23-full.jpg', alt: 'LycoDry build photo: electronics: preparing wire harnesses', caption: 'Electronics: preparing wire harnesses' },
            { src: '/images/lycodry/process/24.jpg', full: '/images/lycodry/process/24-full.jpg', alt: 'LycoDry build photo: electronics: wiring the control system', caption: 'Electronics: wiring the control system' },
            { src: '/images/lycodry/process/25.jpg', full: '/images/lycodry/process/25-full.jpg', alt: 'LycoDry build photo: electronics: controller board wired into the machine', caption: 'Electronics: controller board wired into the machine' },
            { src: '/images/lycodry/process/26.jpg', full: '/images/lycodry/process/26-full.jpg', alt: 'LycoDry build photo: electronics: the machine with its wiring in place', caption: 'Electronics: the machine with its wiring in place' },
            { src: '/images/lycodry/process/27.jpg', full: '/images/lycodry/process/27-full.jpg', alt: 'LycoDry build photo: electronics: testing and checking connections', caption: 'Electronics: testing and checking connections' },
            { src: '/images/lycodry/process/28.jpg', full: '/images/lycodry/process/28-full.jpg', alt: 'LycoDry build photo: assembly: fitting the dehydration chamber', caption: 'Assembly: fitting the dehydration chamber' },
            { src: '/images/lycodry/process/29.jpg', full: '/images/lycodry/process/29-full.jpg', alt: 'LycoDry build photo: assembly: chamber and UV lighting installed', caption: 'Assembly: chamber and UV lighting installed' },
            { src: '/images/lycodry/process/30.jpg', full: '/images/lycodry/process/30-full.jpg', alt: 'LycoDry build photo: assembly: working on the enclosure', caption: 'Assembly: working on the enclosure' },
            { src: '/images/lycodry/process/31.jpg', full: '/images/lycodry/process/31-full.jpg', alt: 'LycoDry build photo: assembly: late-night work on the build', caption: 'Assembly: late-night work on the build' },
            { src: '/images/lycodry/process/32.jpg', full: '/images/lycodry/process/32-full.jpg', alt: 'LycoDry build photo: assembly: looking down into the drying chamber', caption: 'Assembly: looking down into the drying chamber' },
            { src: '/images/lycodry/process/33.jpg', full: '/images/lycodry/process/33-full.jpg', alt: 'LycoDry build photo: assembly: the machine taking shape', caption: 'Assembly: the machine taking shape' },
            { src: '/images/lycodry/process/34.jpg', full: '/images/lycodry/process/34-full.jpg', alt: 'LycoDry build photo: assembly: UV-C and fan section of the chamber', caption: 'Assembly: UV-C and fan section of the chamber' },
            { src: '/images/lycodry/process/35.jpg', full: '/images/lycodry/process/35-full.jpg', alt: 'LycoDry build photo: the enclosed prototype', caption: 'The enclosed prototype' },
            { src: '/images/lycodry/process/36.jpg', full: '/images/lycodry/process/36-full.jpg', alt: 'LycoDry build photo: the enclosed prototype from another angle', caption: 'The enclosed prototype from another angle' },
            { src: '/images/lycodry/process/37.jpg', full: '/images/lycodry/process/37-full.jpg', alt: 'LycoDry build photo: testing: tomato slices on the drying tray', caption: 'Testing: tomato slices on the drying tray' },
            { src: '/images/lycodry/process/38.jpg', full: '/images/lycodry/process/38-full.jpg', alt: 'LycoDry build photo: testing: slices going into the chamber', caption: 'Testing: slices going into the chamber' },
            { src: '/images/lycodry/process/39.jpg', full: '/images/lycodry/process/39-full.jpg', alt: 'LycoDry build photo: testing: weighing the dried tomatoes', caption: 'Testing: weighing the dried tomatoes' },
          ],
        },
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
        'Renz Carlo L. Dela Cruz — documentation and logistics',
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
    title: 'Kaizen',
    classification: 'Habit Tracker & Daily Journal · Full-Stack',
    categories: ['fullstack'],
    previewKind: 'software',
    icon: 'notebook',
    status: 'In progress',
    summary:
      'Kaizen is a personal productivity web app (Habit Tracker & Daily Journal) that combines weekly habit tracking, a daily plan, goals and a private diary with an optional AI writing assistant — built with React and Supabase, with every user’s data protected by Row Level Security.',
    role: 'Designer & full-stack developer (personal project)',
    image: '/images/kaizen/cover.jpg',
    tags: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vite', 'Full-Stack'],
    caseStudy: {
      overview:
        'Kaizen — a Habit Tracker & Daily Journal — started as a weekly habit grid and grew into a small personal planner. You sign in, tick habits across the week, plan today’s tasks, track goals with deadlines, and write a daily diary — all synced to your own account through Supabase and kept private by database-level security. It was built from a to-do list project and has been extended feature by feature.',
      banner: false,
      background: 'fading-stars',
      video: {
        title: 'Promo video',
        src: '/videos/kaizen-promo.mp4',
        poster: '/videos/kaizen-promo-poster.jpg',
        caption: '29-second promo with sound. Press play.',
      },
      metrics: [
        { value: '5', label: 'Supabase tables (weeks, week tasks, goals, diary entries, day tasks), all with Row Level Security' },
        { value: '3', label: 'themes: Light, Dark and Night' },
        { value: '4', label: 'optional AI writing tools: correct, make natural, explain mistakes, vocabulary' },
      ],
      gallery: [
        { src: '/images/kaizen/week.jpg', alt: 'Kaizen weekly planner with daily plan, goals, diary markers and habit grid', caption: 'Weekly planner: daily plan, goals, diary markers and the habit grid' },
        { src: '/images/kaizen/habits.jpg', alt: 'Kaizen habit grid with a check for each day and a weekly count per habit', caption: 'Habit grid: tick each day, with a weekly count for every habit' },
        { src: '/images/kaizen/daily-plan.jpg', alt: 'Kaizen daily plan with today’s tasks and an optional Tomorrow list', caption: 'Daily plan: today’s tasks and an optional Tomorrow list' },
        { src: '/images/kaizen/goals.jpg', alt: 'Kaizen goals list with progress bars and Active, Overdue and Completed statuses', caption: 'Goals with progress, deadlines and Active / Overdue / Completed status' },
        { src: '/images/kaizen/goal-details.jpg', alt: 'Kaizen goal details dialog with dates, target, current value, unit and completion', caption: 'Goal details: dates, target, current value, unit and completion' },
        { src: '/images/kaizen/month.jpg', alt: 'Kaizen month view with daily and weekly progress charts and every habit by day', caption: 'Month view: daily and weekly progress charts, and every habit by day' },
        { src: '/images/kaizen/diary.jpg', alt: 'Kaizen diary history with search, date range and mood filters', caption: 'Diary history: newest first, with search, date range and mood filters' },
        { src: '/images/kaizen/editor.jpg', alt: 'Kaizen diary editor with title, mood, journal text and word goal', caption: 'Diary editor: title, mood, journal, word goal and reflections' },
        { src: '/images/kaizen/assistant-tools.jpg', alt: 'Kaizen Improve my writing panel with four AI tools and a consent checkbox', caption: 'Improve my writing: four AI tools, with consent before anything is sent' },
        { src: '/images/kaizen/assistant-result.jpg', alt: 'Kaizen writing assistant showing a corrected version and explanations', caption: 'Suggestions with explanations — apply them (with undo) or copy' },
        { src: '/images/kaizen/progress.jpg', alt: 'Kaizen writing progress page with totals, streak, weekly activity and a heatmap', caption: 'Writing progress: totals, streaks, weekly activity and a 26-week heatmap' },
        { src: '/images/kaizen/theme-dark.jpg', alt: 'Kaizen planner in the Dark theme', caption: 'Dark theme' },
        { src: '/images/kaizen/theme-night.jpg', alt: 'Kaizen planner in the Night theme', caption: 'Night theme' },
        { src: '/images/kaizen/login.jpg', alt: 'Kaizen sign-in page', caption: 'Sign in: email accounts with confirmation and password reset' },
      ],
      problem:
        'Habits, goals, daily to-dos and journaling usually live in separate apps, so it is hard to see how your days add up. Many planners also lose data when a tab closes, and keeping personal notes in an online tool raises privacy questions.',
      solution:
        'One planner where the week, the month, today’s tasks, goals and the diary sit side by side, saved to the cloud per account, with careful handling so writing is never silently lost or overwritten, and a privacy model where the database itself refuses to show one person’s rows to another.',
      features: [
        {
          group: 'Habits & planner',
          items: [
            'Weekly habit grid (Monday–Sunday): add habits, tick the days you did them, and add notes for the week.',
            'Browse any week with the arrows or a mini calendar; today is marked and the selected week is highlighted.',
            'Month view with a daily progress chart and every habit against every day, plus a weekly average for each week of the month.',
            'Sidebar with the live date and time, a month calendar, the week’s progress and the tools.',
            'Print the planner, export the week to a CSV file that opens cleanly in Excel (formula-safe), or reset the week’s marks after confirming.',
          ],
        },
        {
          group: 'Daily plan',
          items: [
            'Small tasks for a specific date, up to 30 per day, kept separate from the weekly habit grid.',
            'An optional “Tomorrow” list that automatically becomes today’s list at midnight.',
          ],
        },
        {
          group: 'Goals',
          items: [
            'Goals with a start date, end date and an optional target, current value and unit (for example “Read 12 books”).',
            'A progress bar and percentage when a target is set; a goal completes itself when it reaches the target, or you can mark it done by hand.',
            'Automatic status — Active, Completed or Overdue — with the nearest deadlines listed first, and goal lanes shown inside the week view.',
          ],
        },
        {
          group: 'Daily diary',
          items: [
            'One diary entry per date: write a journal, save a draft or the finished entry, and edit it later.',
            'Optional mood (Happy, Productive, Grateful, Calm, Tired, Sad, Anxious, Frustrated) and four guided reflections: highlights, challenges, lessons learned and tomorrow’s plan.',
            'A daily word goal with a live progress bar, and writing progress by day with current and longest writing streaks. It counts words written, not English ability.',
            'Diary history, newest first, with search, a date range and a mood filter; days with an entry get a marker on the calendars.',
          ],
        },
        {
          group: 'Improve my writing (optional AI assistant)',
          items: [
            'Four tools: correct my writing, make it sound more natural, explain my mistakes, and suggest vocabulary.',
            'Nothing is sent anywhere until you tick an agreement box and press a tool; your text is never changed until you press Apply, which has a one-click undo.',
            'Runs as a Supabase Edge Function that holds the AI API key as a secret, accepts only signed-in users and limits each request to 6,000 characters.',
          ],
        },
        {
          group: 'Accounts, privacy & polish',
          items: [
            'Email sign-up with confirmation, sign-in, password reset and sign-out; signed-out visitors are redirected to the login page.',
            'Every table has Row Level Security so an account can only read and change its own rows.',
            'Light, Dark and Night themes with a keyboard-friendly switcher; native dialogs for modals and confirmations, and accessible labels throughout.',
          ],
        },
      ],
      implementation: [
        'Front end: React 19 with Vite, React Router for pages and route guards, Tailwind CSS v4 for styling, and react-hot-toast for notifications.',
        'Backend as a service: Supabase Auth for accounts and a Postgres database for weeks, habits, goals, diary entries and day tasks. The browser talks to Supabase directly with only the public anon key; the schema lives in versioned SQL migrations.',
        'Security: Row Level Security with four policies per table; the service-role key is never in the front end. The AI key lives only in a Supabase Edge Function secret.',
        'Saving: changes are saved per row (one habit, one checkbox, the notes) so two devices editing different habits do not overwrite each other. The app re-checks the database when a tab regains focus, if there are no unsaved edits.',
        'Hosting: a small Express server serves the built site, or the front end can be deployed to any static host (build command npm run build, output folder dist) with all paths rewritten to index.html.',
      ],
      contribution:
        'I designed and built the app end to end — the interface, the database schema and security policies, the Supabase integration, and each feature above. It lives in my GitHub repository, diy-todo-list. [Edit: add anything else you want to credit, such as a live demo link.]',
      challenges:
        'The hard parts were trust and safety rather than layout: never losing writing (the diary warns before you leave with unsaved text and asks whether to keep your version or load another device’s if both changed the same entry), keeping private notes private with Row Level Security, and keeping an AI key off the front end. Syncing is deliberately simple: there is no live push between devices, and two devices editing the very same field is last-write-wins.',
      futureWork:
        'Live updates between devices with Supabase Realtime, and setting up a custom email sender for production sign-ups. [Edit: add your own ideas, for example streaks and reminders for habits.]',
      note: 'Details come from the project’s source code and setup notes. Screenshots show sample data, not real entries, and the AI suggestions shown are sample output. Text in [brackets] is placeholder content.',
    },
  },
  {
    id: 'fieldnote',
    title: 'Fieldnote',
    classification: 'Editorial Blog Platform · Full-Stack',
    categories: ['fullstack'],
    previewKind: 'software',
    icon: 'notebook',
    status: 'Completed',
    summary:
      'Fieldnote is a full-stack editorial blog: a React front end and an Express + MongoDB API with featured stories, category filters, search, a newsletter, an admin area for publishing articles, and secure session-based login with CSRF protection and rate limiting.',
    role: 'Designer & full-stack developer (personal project)',
    image: '/images/fieldnote/cover.jpg',
    tags: ['React', 'Express', 'MongoDB', 'Node.js', 'Tailwind CSS', 'Full-Stack'],
    caseStudy: {
      overview:
        'Fieldnote is a magazine-style blog. Signed-in readers get a featured story, a grid of recent stories they can filter by category or search, full article pages and a newsletter signup. Administrators get a private area to upload, edit, feature and delete articles. The React site and the Express API are built to ship as one service, so login cookies stay on a single origin.',
      banner: false,
      video: {
        title: 'Promo video',
        src: '/videos/fieldnote-promo.mp4',
        poster: '/videos/fieldnote-promo-poster.jpg',
        caption: '29-second promo with sound. Press play.',
      },
      metrics: [
        { value: '13', label: 'automated backend tests covering sign-up, login, sessions, CSRF, roles and rate limiting — all passing' },
        { value: '2', label: 'roles: readers can read and subscribe; only administrators can create, edit, feature or delete articles' },
        { value: '4', label: 'MongoDB collections: articles, users, sessions and newsletter subscribers' },
      ],
      gallery: [
        { src: '/images/fieldnote/home.jpg', alt: 'Fieldnote homepage with a featured story, search box and category filters', caption: 'Homepage: featured story, search and category filters' },
        { src: '/images/fieldnote/stories.jpg', alt: 'Fieldnote recent stories grid with cover images, categories and read times', caption: 'Recent stories: cover, category, author, date and read time' },
        { src: '/images/fieldnote/category.jpg', alt: 'Fieldnote stories filtered to the Places category', caption: 'Category filter: Culture, Places, Ideas, Lifestyle, Technology, Stories' },
        { src: '/images/fieldnote/search.jpg', alt: 'Fieldnote search results for the word morning', caption: 'Search: results update as you type' },
        { src: '/images/fieldnote/article.jpg', alt: 'Fieldnote article page with title, author, date and cover image', caption: 'Article page: category, author, date, read time and cover' },
        { src: '/images/fieldnote/article-body.jpg', alt: 'Fieldnote article body text in a serif reading layout', caption: 'Reading layout built for long text' },
        { src: '/images/fieldnote/newsletter.jpg', alt: 'Fieldnote newsletter signup with a thank-you message', caption: 'Newsletter signup with validation and a confirmation message' },
        { src: '/images/fieldnote/about.jpg', alt: 'Fieldnote About page', caption: 'About page' },
        { src: '/images/fieldnote/login.jpg', alt: 'Fieldnote log in page with a remember-me option', caption: 'Log in: show password and “Remember me for 30 days”' },
        { src: '/images/fieldnote/register-rules.jpg', alt: 'Fieldnote create account page with live password rules', caption: 'Create account: password rules update as you type' },
        { src: '/images/fieldnote/admin.jpg', alt: 'Fieldnote Manage articles page listing every article with View, Feature, Edit and Delete', caption: 'Admin: view, feature, edit or delete any article' },
        { src: '/images/fieldnote/delete-confirm.jpg', alt: 'Fieldnote delete confirmation dialog', caption: 'Deleting asks for confirmation first' },
        { src: '/images/fieldnote/editor.jpg', alt: 'Fieldnote Upload a blog form with a live cover preview', caption: 'Upload a blog: title, excerpt, category, author, cover preview and content' },
        { src: '/images/fieldnote/mobile-menu.jpg', alt: 'Fieldnote mobile navigation menu', caption: 'Mobile: full navigation in a menu', fit: 'contain' },
      ],
      problem:
        'Many small blogs either have no way to publish without touching code, or bolt on a login that is easy to get wrong. A publishing site needs readers to browse quickly, authors to add articles safely, and write access that can never be reached by an ordinary account.',
      solution:
        'A single application with a clean reading experience on the front and a small, locked-down API behind it. Articles live in MongoDB; an admin page replaces editing files; and authentication uses server-side sessions, so a logout or a database change takes effect immediately.',
      features: [
        {
          group: 'Reading',
          items: [
            'A featured story on the homepage (one at a time, falling back to the newest article) above a grid of recent stories, nine per page with Previous / Next.',
            'Six category filters (Culture, Places, Ideas, Lifestyle, Technology, Stories), also reachable from the top navigation, and a search box that waits for you to stop typing.',
            'Article pages with category, author, date and estimated read time; articles open by database ID or by a readable slug.',
            'An About page, a 404 page, and clear loading, error and empty states; broken cover images fall back gracefully.',
            'Responsive layout with a mobile menu.',
          ],
        },
        {
          group: 'Newsletter',
          items: [
            'Email signup with validation; a duplicate address is recognised instead of stored twice.',
            'Subscribers are saved in MongoDB.',
          ],
        },
        {
          group: 'Admin: manage and publish',
          items: [
            'A Manage articles page listing every article with View, Feature, Edit and Delete.',
            'An Upload a blog form: title, excerpt, category, author, cover image URL with a live preview, and content where a blank line starts a new paragraph.',
            'Read time is calculated automatically, slugs are kept unique, and only one article can be featured at a time.',
            'Deleting opens a confirmation dialog that keeps keyboard focus inside it and closes with Esc.',
          ],
        },
        {
          group: 'Accounts & security',
          items: [
            'Create an account with live password rules, or log in with a show-password toggle and an optional “Remember me for 30 days”.',
            'The whole site requires login, and public registration can only ever create an ordinary reader. Administrators are created with a command-line script.',
            'Server-side sessions in an HttpOnly cookie; only a SHA-256 hash of the session token is stored, and logging out deletes the session on the server.',
            'Passwords are hashed with bcrypt. The login check takes the same path whether or not the email exists, so response time does not reveal registered emails.',
            'CSRF protection: each session has its own token that every write request must send, and requests from an unexpected origin are rejected.',
            'Rate limiting on login and sign-up to slow down guessing.',
          ],
        },
      ],
      implementation: [
        'Front end: React 19 with Vite, React Router for pages and route guards (signed-in, then admin-only), Tailwind CSS v4, Lucide icons, and small hooks for async loading and debouncing.',
        'Back end: Node.js and Express 5 with Mongoose models for articles, users, sessions and subscribers. Controllers and routes are separated, with centralised error handling and input validation.',
        'Authorization is enforced on the server: every read needs a session and every write needs the admin role, regardless of what the front end shows.',
        'Data tooling: an idempotent seed script that adds seven sample articles without overwriting edits, plus scripts to create or promote an administrator.',
        'Testing: 13 automated tests with Node’s built-in test runner against an in-memory MongoDB, covering registration, login, sessions, logout, role checks, CSRF and rate limiting.',
        'Deployment: one Render web service serves both the API and the built React site on the same origin, with a health-check endpoint and a render.yaml blueprint; MongoDB Atlas holds the data.',
      ],
      contribution:
        'I designed and built the whole project: the React interface, the Express API, the MongoDB data models, the authentication and security layer, the admin tools, the tests and the deployment setup. [Edit: add your GitHub repository link and a live demo link if you have them.]',
      challenges:
        'The hard part was authentication done properly rather than the blog itself: keeping write access away from ordinary accounts, making cookies safe against cross-site requests, letting logout truly end a session, and making a separate front end and API work together in development while shipping as one same-origin service in production.',
      futureWork:
        'Password reset and email verification, security headers and request logging, Markdown or rich-text articles, double opt-in confirmation emails (subscribers are stored, but no emails are sent yet), and real image uploads instead of image URLs.',
      note: 'Details come from the project’s source code, README and test run. Screenshots were taken from a local copy running on a temporary database with the project’s seven sample articles (placeholder text, stock photos and fictional authors) and demo accounts, not real content or users. Text in [brackets] is placeholder content.',
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
