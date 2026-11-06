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
  /** Shown on the contact card. */
  location: 'Pampanga, Philippines',
  /** Optional: your Facebook profile URL. Leave '' to hide the Facebook link. */
  facebook: '',
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
  /** {count} is replaced with the total number of projects. */
  viewAll: 'View all {count} projects',
}

/** The separate /work page with every project, filterable by category. */
const workPage = {
  title: 'Work',
  heading: 'All **work.**',
  description: 'Every project I’ve designed and built, from circuit boards and embedded firmware to full-stack web apps.',
  backLabel: 'Back to home',
  allLabel: 'All projects',
  emptyNone: 'No projects in this category yet.',
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
    pcb: 'PCB design',
    model3d: '3D model',
    flowchart: 'System flowchart',
    howItWorks: 'How it works',
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
    title: 'IoT',
    description: 'Connected devices, monitoring and automation in the real world.',
    icon: 'wifi',
  },
  {
    id: 'pcb',
    title: 'PCB Design',
    description: 'Custom circuit boards designed in KiCad, from schematic to routed, hand-built board.',
    icon: 'cpu',
  },
  {
    id: 'ai',
    title: 'AI & Computer Vision',
    description: 'Trained models that see and decide, running on real hardware.',
    icon: 'cpu',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web',
    description: 'Web apps with interfaces, data and APIs end to end.',
    icon: 'globe',
  },
]

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
    categories: ['embedded', 'iot', 'pcb', 'ai'],
    previewKind: 'hardware',
    icon: 'flame',
    image: '/images/lycodry/cover.jpg',
    status: 'Completed',
    featured: true,
    summary:
      'An AI machine that grades, slices and dries tomatoes in 24 hours. Our capstone at Pampanga State University (2026).',
    role: 'Hardware engineer & project architect (team of five)',
    tags: ['YOLOv11', 'Raspberry Pi 5', 'ESP32', 'Python', 'C++', 'Computer Vision'],
    caseStudy: {
      banner: false,
      thesis: {
        label: 'Capstone thesis',
        title: 'LycoDry: An Automated Solanum Lycopersicum Quality Grading and Dehydration System',
        meta: 'BS Computer Engineering · Pampanga State University · June 2026',
      },
      overview:
        'A machine that grades, slices and dries tomatoes on its own. AI sorts each tomato as Market, Processing or Reject, and the processing ones are sliced and dried in 24 hours. Our BS Computer Engineering capstone at Pampanga State University (2026).',
      video: {
        title: 'Promo video',
        src: '/videos/lycodry-promo.mp4',
        poster: '/videos/lycodry-promo-poster.jpg',
        caption: '1-minute promo with sound: how we built it, the machine at work, and the results. Press play.',
      },
      metrics: [
        { value: '0.876', label: 'AI model accuracy (mAP@0.5)' },
        { value: '82–93%', label: 'sorting accuracy per grade' },
        { value: '24 h vs 8 days', label: 'machine vs sun drying' },
        { value: '11.66%', label: 'mass left after drying' },
        { value: 'No Salmonella', label: 'in the DOST lab test (sun-dried: detected)' },
        { value: '4.55 / 5.00', label: 'usability score from a farm owner' },
      ],
      gallery: [
        { src: '/images/lycodry/prototype.jpg', alt: 'The built LycoDry prototype with its stainless-steel enclosure and dehydration chamber', caption: 'The LycoDry prototype' },
        { src: '/images/lycodry/render.jpg', alt: '3D render of the enclosed LycoDry machine', caption: '3D render of the enclosed unit' },
        { src: '/images/lycodry/model-isometric.jpg', alt: 'Isometric 3D model of the frame with funnel, ramp, cutting module and dehydrator chamber', caption: '3D model: funnel, gravity ramp, cutting module, conveyor and dehydration chamber' },
        { src: '/images/lycodry/dashboard.jpg', alt: 'LycoDry kiosk dashboard with live camera feed and production counters', caption: 'Kiosk dashboard: live feed, counters and alerts' },
      ],
      flowchart: {
        live: true,
        description:
          'Watch a simulated run of the machine, from sorting to a finished batch.',
        views: [
          {
            label: '1 · Start-up',
            src: '/images/lycodry/flowchart-startup.png',
            alt: 'Flowchart of system start-up: power on, the conveyor runs, and the tray is locked and the camera unlocked once IR sensor 1 detects the drying tray',
            caption: 'Stage 1: system initialization and hardware interlock',
            fit: 'natural',
          },
          {
            label: '2 · Sorting',
            src: '/images/lycodry/flowchart-sorting.png',
            alt: 'Flowchart of image analysis and routing: the YOLO v11 model grades each tomato, servos route market and reject grades to baskets, and processing grades go to the pneumatic slicer',
            caption: 'Stage 2: image analysis and mechanical routing',
            fit: 'natural',
          },
          {
            label: '3 · Drying',
            src: '/images/lycodry/flowchart-drying.jpg',
            alt: 'Flowchart of the drying stage: basket limit and batch checks, 15-minute UV-C sterilization, then 24 hours of drying held between 45 °C and 55 °C before the "ready to harvest" pop-up',
            caption: 'Stage 3: smart thresholds and active-convection dehydration',
            fit: 'natural',
          },
        ],
      },
      model3d: {
        description:
          'Drag to explore the machine in 3D.',
        views: [
          {
            label: 'Finished prototype',
            src: '/models/lycodry-prototype.glb',
            alt: 'Interactive 3D model of the finished LycoDry prototype: stainless-steel enclosure, funnel, electronics housing, screen mount and dehydration chamber',
            caption: 'Simplified 3D model of the finished, enclosed prototype',
          },
          {
            label: 'Frame',
            src: '/models/lycodry-machine.glb',
            alt: 'Interactive 3D model of the LycoDry frame: funnel, ramp, electronics tray, screen mount, cutting module, conveyor and dehydration chamber',
            caption: 'Simplified 3D model of the frame, built from the design drawing (47 × 25 × 40 in frame, 21 × 19.75 × 15.5 in chamber)',
          },
        ],
      },
      pcb: {
        description:
          'The ESP32 control board I designed in KiCad and made by hand.',
        views: [
          { label: 'Layout', src: '/images/lycodry/pcb.png', alt: 'KiCad PCB layout of the LycoDry control board with top and bottom copper traces', caption: 'Custom PCB layout (KiCad)' },
          { label: 'Built board', src: '/images/lycodry/pcb-built.png', alt: 'The finished LycoDry control board wired into the machine, with the ESP32, terminal blocks, relay module, solid-state relays and buck converters', caption: 'The finished board, wired into the machine with its relays and power converters', fit: 'cover' },
          { label: 'Schematic', src: '/images/lycodry/schematic.png', alt: 'KiCad schematic of the LycoDry control board: ESP32, sensor, servo, relay and motor-driver headers', caption: 'Circuit schematic (KiCad): ESP32 control board' },
        ],
        model: { src: '/models/lycodry-pcb.glb', alt: 'Interactive 3D model of the LycoDry ESP32 control board' },
      },
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
        'Tomato gluts leave farmers dumping fruit or selling at a loss. Sun drying takes 8 days, depends on the weather, and exposes the fruit to dust and pests.',
      solution:
        'One offline machine that sorts, slices and dries tomatoes: a Raspberry Pi 5 runs the AI and an ESP32 controls the hardware, keeping the chamber at 45–55 °C in any weather.',
      howItWorksIntro: { lead: 'From raw tomato to', accent: 'dried batch.', chips: ['Edge inference', 'Fully offline'] },
      howItWorks: [
        {
          title: 'Load', stage: 'Input', text: 'Raw tomatoes are poured into the funnel.', video: '/videos/how/load.mp4', poster: '/videos/how/load.jpg',
          specs: [['Feed', 'Single-file funnel'], ['Interlock', 'IR sensor 1 · tray check'], ['Loading', 'Any time, while running']],
        },
        {
          title: 'Scan', stage: 'Vision', text: 'Each tomato rolls past the camera, one at a time.', video: '/videos/how/scan.mp4', poster: '/videos/how/scan.jpg',
          specs: [['Camera', 'Pi Camera Module 3'], ['Compute', 'Raspberry Pi 5'], ['Window', '3–5 s per tomato']],
        },
        {
          title: 'Grade', stage: 'Inference', text: 'The AI labels it Market, Processing or Reject.', video: '/videos/how/grade.mp4', poster: '/videos/how/grade.jpg',
          specs: [['Model', 'YOLOv11 · custom'], ['Input', '640 × 640'], ['mAP@0.5', '0.876']],
        },
        {
          title: 'Route', stage: 'Actuation', text: 'Servo gates send Market and Reject tomatoes to their baskets.', video: '/videos/how/route.mp4', poster: '/videos/how/route.jpg',
          specs: [['Controller', 'ESP32'], ['Actuators', 'Gate + push servos'], ['Verify', 'Basket IR · +1']],
        },
        {
          title: 'Slice', stage: 'Processing', text: 'Processing tomatoes are cut into 2 cm slices.', video: '/videos/how/slice.mp4', poster: '/videos/how/slice.jpg',
          specs: [['Actuator', 'Pneumatic'], ['Blade', 'Fixed grid'], ['Cut', '2 cm slices']],
        },
        {
          title: 'Fill the tray', stage: 'Batching', text: 'The slices land on the drying tray.', video: '/videos/how/tray.mp4', poster: '/videos/how/tray.jpg',
          specs: [['Verify', 'Processing IR · +1'], ['Batch', '5 trays'], ['Early start', '≥ 3 + empty funnel']],
        },
        {
          title: 'Sterilise', stage: 'Sterilisation', text: 'UV-C light cleans the chamber for 15 minutes.', video: '/videos/how/sterilise.mp4', poster: '/videos/how/sterilise.jpg',
          specs: [['Lamp', 'UV-C'], ['Duration', '15 min'], ['Then', 'Fans · Peltier · coils on']],
        },
        {
          title: 'Dry', stage: 'Control loop', text: '24 hours at 45–55 °C, then “Ready to harvest”.', video: '/videos/how/dry.mp4', poster: '/videos/how/dry.jpg',
          specs: [['Sensor', 'DS18B20'], ['Setpoint', '45–55 °C'], ['Cycle', '24 h']],
        },
      ],
      comparison: {
        heading: { lead: 'Same tomatoes,', accent: 'two methods.' },
        a: 'LycoDry machine',
        b: 'Sun-dried',
        highlights: [
          { value: '8×', label: 'faster: 24 hours instead of 8 days' },
          { value: '70×+', label: 'fewer yeast and moulds' },
          { value: '0', label: 'Salmonella found (sun-dried: detected)' },
        ],
        rows: [
          { metric: 'Drying time', a: '24 h', b: '192 h (8 days)', gap: '8× faster', better: 'a', bars: [24, 192] },
          { metric: 'Mass left after drying', a: '11.66%', b: '13.51%', gap: 'Drier', better: 'a', bars: [11.66, 13.51], note: 'Lower is drier. Both meet the 10–15% target.' },
          { metric: 'Lycopene (colour test)', a: 'Orange-red · moderate', b: 'Yellow · low or none', gap: 'Nutrients kept', better: 'a', note: 'The machine-dried sample matched fresh tomatoes.' },
          { metric: 'Aerobic plate count', a: '2.4 × 10³ CFU/g', b: '2.5 × 10⁴ CFU/g', gap: '~10× lower', better: 'a', bars: [2400, 25000] },
          { metric: 'Yeast & moulds', a: '4.2 × 10³ CFU/g', b: '> 3.0 × 10⁵ CFU/g', gap: '70×+ lower', better: 'a', bars: [4200, 300000] },
          { metric: 'Coliforms', a: '< 10 CFU/g', b: '3.2 × 10³ CFU/g', gap: '300×+ lower', better: 'a', bars: [10, 3200] },
          { metric: 'Salmonella', a: 'Not detected', b: 'Detected', gap: 'Safe', better: 'a' },
        ],
        note: 'Lab results: DOST Regional Standards and Testing Laboratory, Pampanga (one sample each). CFU/g = colony-forming units per gram; lower is cleaner.',
      },
      results: [
        'Sorted 300 farmer-graded tomatoes with 82–93% accuracy per grade.',
        'Dried a batch in 24 hours instead of 8 days in the sun.',
        'DOST lab test: no Salmonella in the machine-dried sample; the sun-dried one tested positive.',
        'Usability score of 4.55 / 5 from a local farm owner.',
      ],
      team: [
        'Joey P. Huertas — hardware & architecture',
        'Eli Mishael G. Dela Cruz — AI model, build partner',
        'Renz Carlo L. Dela Cruz — documentation',
        'Jon Michael S. Lugtu — support',
        'Adam I. Gatus — team leader',
      ],
      contribution:
        'I designed and built all the hardware: the machine itself and its custom PCB.',
      challenges:
        'Small defects like black spots were hard for the AI to detect, and Reject was the weakest grade to sort (82%).',
      futureWork:
        'Faster sorting, bigger batches, solar power, a mobile alert app, and support for other crops.',
      note: 'Source: “LycoDry: An Automated Solanum Lycopersicum Quality Grading and Dehydration System”, Pampanga State University, June 2026.',
    },
  },
  {
    id: 'aquarium-monitor',
    title: 'Aquarium Monitor',
    classification: 'IoT · Water-Quality Monitoring · PCB Design',
    categories: ['iot', 'embedded', 'pcb'],
    previewKind: 'hardware',
    icon: 'fish',
    status: 'In progress',
    summary:
      'A Wi-Fi aquarium controller board I designed in KiCad and etched by hand: it reads pH, TDS and temperature, and runs fans and a pump.',
    role: 'Hardware designer — schematic and PCB layout (personal project)',
    image: '/images/arduino/cover.jpg',
    tags: ['IoT', 'KiCad', 'PCB Design', 'ATmega328P', 'ESP-01', 'Sensors'],
    caseStudy: {
      overview:
        'One board with everything an aquarium monitor needs: an Arduino-compatible ATmega328P, ESP-01 Wi-Fi, pH, TDS and temperature inputs, and terminals for two fans and a pump. Single-sided and all through-hole, so it can be made at home.',
      banner: false,
      metrics: [
        { value: '46', label: 'through-hole parts, no SMD' },
        { value: '296', label: 'tracks on one copper layer' },
        { value: '91 × 125 mm', label: 'board size' },
      ],
      gallery: [
        { src: '/images/arduino/cover.jpg', alt: 'Angled 3D render of the Aquarium Monitor board', caption: '3D render: the assembled board (KiCad render)' },
        { src: '/images/arduino/render-top.jpg', alt: 'Top-down 3D render of the Aquarium Monitor board with every part placed', caption: 'Top view: ATmega328P, ESP-01 socket, sensor headers and load terminals' },
        { src: '/images/arduino/render-bottom.jpg', alt: '3D render of the bottom of the Aquarium Monitor board showing the copper tracks', caption: 'Bottom view: the single copper layer (KiCad render)' },
      ],
      pcb: {
        description: 'Schematic and single-sided layout, designed in KiCad.',
        views: [
          { label: 'Routing', src: '/images/arduino/routing-full.jpg', alt: 'Aquarium Monitor PCB routing on the bottom copper layer with a ground pour', caption: 'Routing: every track on the bottom layer, with a ground pour' },
          { label: 'Schematic', src: '/images/arduino/schematic-full.jpg', alt: 'Aquarium Monitor schematic in KiCad', caption: 'Schematic: MCU core, ESP-01, sensor inputs, power and loads' },
        ],
        model: { src: '/models/arduino.glb', alt: 'Interactive 3D model of the Aquarium Monitor board, exported from KiCad' },
      },
      galleries: [
        {
          title: 'Documentation',
          slides: [
            { src: '/images/aquarium/process/01.jpg', full: '/images/aquarium/process/01-full.jpg', alt: 'Aquarium Monitor build photo: laying out the board in KiCad', caption: 'Design: laying out the board in KiCad' },
            { src: '/images/aquarium/process/02.jpg', full: '/images/aquarium/process/02-full.jpg', alt: 'Aquarium Monitor build photo: printing the board artwork', caption: 'Printing: printing the board artwork' },
            { src: '/images/aquarium/process/03.jpg', full: '/images/aquarium/process/03-full.jpg', alt: 'Aquarium Monitor build photo: the routing printed as a negative on transparent film', caption: 'Artwork: the routing printed as a negative on transparent film' },
            { src: '/images/aquarium/process/04.jpg', full: '/images/aquarium/process/04-full.jpg', alt: 'Aquarium Monitor build photo: the board under a UV lamp in a cardboard exposure box', caption: 'Exposure: the board under a UV lamp in a cardboard exposure box' },
            { src: '/images/aquarium/process/05.jpg', full: '/images/aquarium/process/05-full.jpg', alt: 'Aquarium Monitor build photo: lining up the film and board under the UV light', caption: 'Exposure: lining up the film and board under the UV light' },
            { src: '/images/aquarium/process/06.jpg', full: '/images/aquarium/process/06-full.jpg', alt: 'Aquarium Monitor build photo: checking the developed board against the light', caption: 'Developing: checking the developed board against the light' },
            { src: '/images/aquarium/process/07.jpg', full: '/images/aquarium/process/07-full.jpg', alt: 'Aquarium Monitor build photo: screw terminals and headers ready for assembly', caption: 'Parts: screw terminals and headers ready for assembly' },
            { src: '/images/aquarium/process/08.jpg', full: '/images/aquarium/process/08-full.jpg', alt: 'Aquarium Monitor build photo: fitting the parts at the desk, with the layout on screen', caption: 'Soldering: fitting the parts at the desk, with the layout on screen' },
            { src: '/images/aquarium/process/09.jpg', full: '/images/aquarium/process/09-full.jpg', alt: 'Aquarium Monitor build photo: close-up of the soldered capacitors and a screw terminal', caption: 'Soldering: close-up of the soldered capacitors and a screw terminal' },
            { src: '/images/aquarium/process/10.jpg', full: '/images/aquarium/process/10-full.jpg', alt: 'Aquarium Monitor build photo: the populated board, top view', caption: 'Assembly: the populated board, top view' },
            { src: '/images/aquarium/process/11.jpg', full: '/images/aquarium/process/11-full.jpg', alt: 'Aquarium Monitor build photo: the board with its jumper wires in place', caption: 'Assembly: the board with its jumper wires in place' },
            { src: '/images/aquarium/process/12.jpg', full: '/images/aquarium/process/12-full.jpg', alt: 'Aquarium Monitor build photo: wiring the board up for a test', caption: 'Testing: wiring the board up for a test' },
            { src: '/images/aquarium/process/13.jpg', full: '/images/aquarium/process/13-full.jpg', alt: 'Aquarium Monitor build photo: trying parts on a breadboard with the Arduino IDE', caption: 'Testing: trying parts on a breadboard with the Arduino IDE' },
            { src: '/images/aquarium/process/14.jpg', full: '/images/aquarium/process/14-full.jpg', alt: 'Aquarium Monitor build photo: the board with its printed aquarium-themed top layer and labelled connectors', caption: 'Finished: the board with its printed aquarium-themed top layer and labelled connectors' },
          ],
        },
      ],
      problem:
        'Water quality changes slowly and is easy to miss. Monitoring it on a breadboard means loose wires, noisy sensor readings and nowhere solid to connect a pump or fans.',
      solution:
        'One purpose-built board: microcontroller, Wi-Fi, sensor inputs and power in one place, with screw terminals for the loads and a separate, filtered ground for the analog sensors.',
      howItWorksIntro: { title: 'How it’s made', lead: 'From KiCad file to', accent: 'finished board.', chips: ['Hand-etched', 'Through-hole only'] },
      howItWorks: [
        {
          title: 'Design', stage: 'KiCad', text: 'Schematic and layout drawn in KiCad.', poster: '/images/aquarium/process/01-full.jpg',
          specs: [['Board', '91 × 125 mm'], ['Copper', 'Single-sided'], ['Tracks', '296']],
        },
        {
          title: 'Print', stage: 'Artwork', text: 'The routing is printed as a negative on transparent film.', poster: '/images/aquarium/process/03-full.jpg',
          specs: [['Artwork', 'Negative film'], ['Layer', 'Bottom copper']],
        },
        {
          title: 'Expose', stage: 'UV transfer', text: 'UV light transfers the pattern onto the board.', poster: '/images/aquarium/process/04-full.jpg',
          specs: [['Light', 'UV lamp'], ['Rig', 'Cardboard exposure box']],
        },
        {
          title: 'Develop', stage: 'Etch', text: 'The developed board is checked against the light.', poster: '/images/aquarium/process/06-full.jpg',
          specs: [['Check', 'Backlit inspection'], ['Ground', 'Digital-ground pour']],
        },
        {
          title: 'Solder', stage: 'Assembly', text: 'Every part is through-hole, soldered by hand.', poster: '/images/aquarium/process/09-full.jpg',
          specs: [['Parts', '46 through-hole'], ['SMD', 'None']],
        },
        {
          title: 'Assemble', stage: 'Wiring', text: 'The populated board with its jumper wires in place.', poster: '/images/aquarium/process/11-full.jpg',
          specs: [['MCU', 'ATmega328P'], ['Wi-Fi', 'ESP-01'], ['Display', 'OLED header']],
        },
        {
          title: 'Test', stage: 'Bring-up', text: 'Parts are tried on a breadboard with the Arduino IDE.', poster: '/images/aquarium/process/13-full.jpg',
          specs: [['Toolchain', 'Arduino IDE'], ['Sensors', 'pH · TDS · DS18B20']],
        },
        {
          title: 'Finish', stage: 'Done', text: 'Aquarium-themed top layer and labelled connectors.', poster: '/images/aquarium/process/14-full.jpg',
          specs: [['Loads', '2 fans + water pump'], ['Power', '12 V jack + 5 V input']],
        },
      ],
      contribution:
        'I designed the schematic and layout in KiCad, then etched, soldered and tested the board myself.',
      challenges:
        'Fitting every connection on one copper layer while keeping the small pH and TDS signals clean.',
      futureWork:
        'Firmware that sends Wi-Fi alerts when readings stay out of range, and automatic filtration through the relay.',
      note: 'Schematic, routing and 3D views are exported from the KiCad project; the 3D views are renders, not photos.',
    },
  },
  {
    id: 'adc-8bit',
    title: '8-bit ADC',
    classification: 'Mixed-Signal Circuit · PCB Design',
    categories: ['embedded', 'pcb'],
    previewKind: 'hardware',
    icon: 'flame',
    status: 'In progress',
    summary:
      'An analog-to-digital converter built only from logic chips, no microcontroller. My midterm project, designed in KiCad.',
    role: 'Circuit designer — schematic and PCB layout (midterm project)',
    image: '/images/adc/cover.jpg',
    tags: ['KiCad', 'PCB Design', 'Analog', 'Digital Logic', 'LM339', '74148'],
    caseStudy: {
      overview:
        'A flash ADC you can follow by eye: 16 comparators check the input voltage against a resistor ladder, logic chips encode the result, and LEDs and a 7-segment display show it.',
      banner: false,
      metrics: [
        { value: '16', label: 'comparators (4 × LM339)' },
        { value: '47', label: 'through-hole parts' },
        { value: '153 × 86 mm', label: 'single-sided board' },
      ],
      gallery: [
        { src: '/images/adc/cover.jpg', alt: 'Angled 3D render of the 8-bit ADC board', caption: '3D render of the board (KiCad render)' },
        { src: '/images/adc/render-top.jpg', alt: 'Top-down 3D render of the 8-bit ADC board', caption: 'Top view: comparators, encoders, decoder, LEDs and the input stage' },
        { src: '/images/adc/render-bottom.jpg', alt: '3D render of the bottom of the 8-bit ADC board showing the copper tracks', caption: 'Bottom view: the single copper layer (KiCad render)' },
      ],
      pcb: {
        description: 'Schematic and single-sided layout in KiCad. Routing is still in progress.',
        views: [
          { label: 'Routing', src: '/images/adc/routing-full.jpg', alt: '8-bit ADC PCB routing on the bottom copper layer', caption: 'Routing in progress: every track is on the bottom layer' },
          { label: 'Schematic', src: '/images/adc/schematic-full.jpg', alt: '8-bit ADC schematic in KiCad', caption: 'Schematic: input stage, resistor ladder, comparators, encoders, XOR logic and display driver' },
        ],
        model: { src: '/models/adc.glb', alt: 'Interactive 3D model of the 8-bit ADC board, exported from KiCad' },
      },
      problem:
        'Analog-to-digital conversion usually hides inside a microcontroller, easy to use and impossible to see.',
      solution:
        'A flash converter built from individual chips, so every stage, from reference voltages to the display, can be followed on the board.',
      howItWorksIntro: { lead: 'From voltage to', accent: 'digits.', chips: ['No microcontroller', 'Pure logic'] },
      howItWorks: [
        {
          title: 'Input', stage: 'Signal in', text: 'A potentiometer sets the voltage; a UA741 op-amp conditions it.', poster: '/images/adc/how/input.jpg',
          specs: [['Source', '10 kΩ potentiometer'], ['Op-amp', 'UA741'], ['Switch', '2N7000 MOSFET']],
        },
        {
          title: 'Reference', stage: 'Ladder', text: 'A ladder of 1 kΩ resistors makes evenly spaced reference voltages.', poster: '/images/adc/how/ladder.jpg',
          specs: [['Resistors', '1 kΩ ladder'], ['Steps', 'Evenly spaced']],
        },
        {
          title: 'Compare', stage: 'Flash', text: '16 comparators check the input against every reference at once.', poster: '/images/adc/how/compare.jpg',
          specs: [['Comparators', '16'], ['Chips', '4 × LM339']],
        },
        {
          title: 'Encode', stage: 'Logic', text: 'Two priority encoders and XOR gates turn the result into binary.', poster: '/images/adc/how/encode.jpg',
          specs: [['Encoders', '2 × 74148, cascaded'], ['Gates', '3 × 74LS86 XOR']],
        },
        {
          title: 'Display', stage: 'Output', text: 'LEDs show the code; a 7447 drives the 7-segment display.', poster: '/images/adc/how/display.jpg',
          specs: [['LEDs', '4, with 220 Ω'], ['Decoder', '7447'], ['Display', 'D198K, common cathode']],
        },
        {
          title: 'Board', stage: 'PCB', text: 'Everything routed on one copper layer in KiCad.', poster: '/images/adc/routing-full.jpg',
          specs: [['Board', '153 × 86 mm'], ['Parts', '47 through-hole'], ['Tracks', '1 mm power · 0.5 mm signal']],
        },
      ],
      contribution:
        'I designed the circuit and drew the schematic and PCB layout in KiCad. [Add whether it was built and tested.]',
      challenges:
        'Fitting 16 comparators, two encoders and the display logic onto one copper layer without jumpers.',
      futureWork:
        'Finish routing the comparator and LED outputs and the ground, then etch and test the board.',
      note: 'Schematic, routing and 3D views are exported from the KiCad project; the 3D views are renders, not photos. Text in [brackets] is placeholder content.',
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
      'A habit tracker, planner and private diary in one web app, built with React and Supabase.',
    role: 'Designer & full-stack developer (personal project)',
    image: '/images/kaizen/cover.jpg',
    tags: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vite', 'Full-Stack'],
    caseStudy: {
      overview:
        'Track habits across the week, take rest days without breaking progress, plan today, chase goals and keep a daily diary, all synced to your own private account.',
      banner: false,
      background: 'fading-stars',
      video: {
        title: 'Promo video',
        src: '/videos/kaizen-promo.mp4',
        poster: '/videos/kaizen-promo-poster.jpg',
        caption: '32-second promo with sound. Press play.',
      },
      metrics: [
        { value: '5', label: 'database tables, all private per user' },
        { value: '3', label: 'themes: Light, Dark, Night' },
        { value: '4', label: 'optional AI writing tools' },
      ],
      gallery: [
        { src: '/images/kaizen/week.jpg', alt: 'Kaizen weekly planner with daily plan, goals, diary markers and habit grid', caption: 'Weekly planner: daily plan, goals, diary markers and the habit grid' },
        { src: '/images/kaizen/habits.jpg', alt: 'Kaizen habit grid with a check for each day and a weekly count per habit', caption: 'Habit grid: tick each day, with a weekly count for every habit' },
        { src: '/images/kaizen/rest-day.jpg', alt: 'Kaizen weekly habit grid with Saturday marked as a striped rest day', caption: 'Rest day: tap the moon under a weekday and the whole day is skipped' },
        { src: '/images/kaizen/rest-menu.jpg', alt: 'Kaizen right-click menu offering Set as rest day for one habit on one day', caption: 'Right-click a box (or long-press on a phone) to rest just one habit' },
        { src: '/images/kaizen/rest-habit.jpg', alt: 'Kaizen habit grid where one habit has a rest day and its count changes from 4 of 6 to 3 of 5', caption: 'One habit resting: its count becomes 3/5 instead of counting against you' },
        { src: '/images/kaizen/daily-plan.jpg', alt: 'Kaizen daily plan with today’s tasks and an optional Tomorrow list', caption: 'Daily plan: today’s tasks and an optional Tomorrow list' },
        { src: '/images/kaizen/goals.jpg', alt: 'Kaizen goals list with progress bars and Active, Overdue and Completed statuses', caption: 'Goals with progress, deadlines and Active / Overdue / Completed status' },
        { src: '/images/kaizen/goal-details.jpg', alt: 'Kaizen goal details dialog with dates, target, current value, unit and completion', caption: 'Goal details: dates, target, current value, unit and completion' },
        { src: '/images/kaizen/month.jpg', alt: 'Kaizen month view with daily and weekly progress charts and every habit by day', caption: 'Month view: daily and weekly progress charts, a progress level and the progress guide' },
        { src: '/images/kaizen/month-rest.jpg', alt: 'Kaizen month view with a Rest day row and a striped rest day in the charts and grid', caption: 'Month view: a Rest day row, with striped days left out of every average' },
        { src: '/images/kaizen/delete-habit.jpg', alt: 'Kaizen dialog asking to delete a removed habit for good', caption: 'Removed habits can be deleted for good, after a confirmation' },
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
        'Habits, goals, to-dos and journaling usually live in separate apps, so it’s hard to see how your days add up, and personal notes online raise privacy questions.',
      solution:
        'One planner for the week, today’s tasks, goals and a diary, saved to your own account and kept private by the database itself.',
      howItWorksIntro: { lead: 'From sign-in to', accent: 'a better week.', chips: ['React + Supabase', 'Private by design'] },
      howItWorks: [
        {
          title: 'Sign in', stage: 'Auth', text: 'Each account signs in with email; its data stays private.', poster: '/images/kaizen/login.jpg',
          specs: [['Auth', 'Supabase Auth'], ['Privacy', 'Row Level Security'], ['Tables', '5']],
        },
        {
          title: 'Plan the week', stage: 'Planner', text: 'The week, goals and daily plan sit side by side.', poster: '/images/kaizen/week.jpg',
          specs: [['Front end', 'React 19 + Vite'], ['Styling', 'Tailwind CSS v4']],
        },
        {
          title: 'Tick habits', stage: 'Tracking', text: 'Tick each day; every habit gets a weekly count.', poster: '/images/kaizen/habits.jpg',
          specs: [['Saving', 'Per row, per checkbox'], ['Sync', 'Re-checks on tab focus']],
        },
        {
          title: 'Take a rest day', stage: 'Rest days', text: 'Rest a whole day or one habit without breaking your progress.', poster: '/images/kaizen/rest-day.jpg',
          specs: [['Scope', 'Whole day or one habit'], ['Effect', 'Left out of every average']],
        },
        {
          title: 'Plan today', stage: 'Daily plan', text: 'Up to 30 tasks a day, plus a Tomorrow list.', poster: '/images/kaizen/daily-plan.jpg',
          specs: [['Limit', '30 tasks a day'], ['Rollover', 'Tomorrow → today at midnight']],
        },
        {
          title: 'Track goals', stage: 'Goals', text: 'Targets and deadlines, with automatic status.', poster: '/images/kaizen/goals.jpg',
          specs: [['Status', 'Active · Overdue · Completed'], ['Progress', 'Bar + percentage']],
        },
        {
          title: 'Write the diary', stage: 'Journal', text: 'One entry a day, with mood, reflections and a word goal.', poster: '/images/kaizen/editor.jpg',
          specs: [['Moods', '8'], ['Reflections', '4 prompts'], ['Safety', 'Warns before losing text']],
        },
        {
          title: 'Improve writing', stage: 'AI assist', text: 'Optional AI suggestions, applied only when you choose.', poster: '/images/kaizen/assistant-result.jpg',
          specs: [['Tools', '4'], ['Runs on', 'Supabase Edge Function'], ['Limit', '6,000 characters']],
        },
        {
          title: 'Review the month', stage: 'Insights', text: 'Charts and progress levels show how the month went.', poster: '/images/kaizen/month.jpg',
          specs: [['Levels', 'Just starting → Excellent'], ['Themes', 'Light · Dark · Night']],
        },
      ],
      contribution:
        'I designed and built it end to end: the interface, database schema, security policies and every feature.',
      challenges:
        'Never losing writing, keeping private notes private, and keeping the AI key off the front end.',
      futureWork:
        'Sync rest days across devices, live updates with Supabase Realtime, and production sign-up emails.',
      note: 'Screenshots show sample data, and the AI suggestions shown are sample output.',
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
      'A magazine-style blog with an admin area for publishing and secure, session-based login. React, Express and MongoDB.',
    role: 'Designer & full-stack developer (personal project)',
    image: '/images/fieldnote/cover.jpg',
    tags: ['React', 'Express', 'MongoDB', 'Node.js', 'Tailwind CSS', 'Full-Stack'],
    caseStudy: {
      overview:
        'Readers browse a featured story, filter and search articles, and subscribe; admins publish, feature and edit articles from their own private area.',
      banner: false,
      video: {
        title: 'Promo video',
        src: '/videos/fieldnote-promo.mp4',
        poster: '/videos/fieldnote-promo-poster.jpg',
        caption: '29-second promo with sound. Press play.',
      },
      metrics: [
        { value: '13', label: 'backend tests, all passing' },
        { value: '2', label: 'roles: reader and admin' },
        { value: '4', label: 'MongoDB collections' },
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
        'Small blogs either can’t publish without touching code, or bolt on a login that’s easy to get wrong.',
      solution:
        'A clean reading site with a small, locked-down API behind it: an admin page for publishing, and server-side sessions so logout takes effect instantly.',
      howItWorksIntro: { lead: 'From login to', accent: 'published story.', chips: ['React + Express', 'MongoDB'] },
      howItWorks: [
        {
          title: 'Log in', stage: 'Auth', text: 'The whole site requires an account.', poster: '/images/fieldnote/login.jpg',
          specs: [['Sessions', 'HttpOnly cookie'], ['Passwords', 'bcrypt'], ['Abuse', 'Rate-limited']],
        },
        {
          title: 'Browse', stage: 'Home', text: 'A featured story above the latest articles.', poster: '/images/fieldnote/home.jpg',
          specs: [['Featured', 'One at a time'], ['Grid', '9 stories a page']],
        },
        {
          title: 'Filter', stage: 'Categories', text: 'Six categories, one click away.', poster: '/images/fieldnote/category.jpg',
          specs: [['Categories', '6'], ['Also in', 'Top navigation']],
        },
        {
          title: 'Search', stage: 'Search', text: 'Results update as you type.', poster: '/images/fieldnote/search.jpg',
          specs: [['Input', 'Debounced'], ['Scope', 'All articles']],
        },
        {
          title: 'Read', stage: 'Article', text: 'Article pages built for long reads.', poster: '/images/fieldnote/article.jpg',
          specs: [['Read time', 'Calculated automatically'], ['Links', 'By ID or slug']],
        },
        {
          title: 'Subscribe', stage: 'Newsletter', text: 'Email signup with validation.', poster: '/images/fieldnote/newsletter.jpg',
          specs: [['Storage', 'MongoDB'], ['Duplicates', 'Detected']],
        },
        {
          title: 'Publish', stage: 'Admin', text: 'Admins upload articles with a live cover preview.', poster: '/images/fieldnote/editor.jpg',
          specs: [['Access', 'Admin role only'], ['Writes', 'CSRF token required']],
        },
        {
          title: 'Manage', stage: 'Admin', text: 'View, feature, edit or delete any article.', poster: '/images/fieldnote/admin.jpg',
          specs: [['Tests', '13 passing'], ['Hosting', 'Render + MongoDB Atlas']],
        },
      ],
      contribution:
        'I designed and built all of it: the React site, Express API, MongoDB models, security layer, admin tools, tests and deployment.',
      challenges:
        'Getting authentication right: admin-only writes, CSRF-safe cookies, real logout, and one same-origin deployment.',
      futureWork:
        'Password reset, email verification, rich-text articles, newsletter emails, and real image uploads.',
      note: 'Screenshots use the project’s sample articles and demo accounts, not real content or users.',
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

/**
 * Skill cards, laid out as a bento grid in this order (two wide cards, then three).
 * `category` links the card's "See N projects" to the /work page filtered to that category.
 */
const skillGroups: SkillGroup[] = [
  {
    title: 'Embedded & IoT',
    icon: 'cpu',
    description: 'Microcontrollers and sensors wired into machines that react to the real world.',
    items: ['Embedded Systems', 'Microcontrollers', 'Sensors', 'IoT'],
    category: 'embedded',
  },
  {
    title: 'Frontend Development',
    icon: 'code',
    description: 'Clear, responsive interfaces that make the data easy to use.',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    category: 'fullstack',
  },
  {
    title: 'PCB Design',
    icon: 'circuit',
    description: 'From schematic to routed, hand-built board.',
    items: ['Circuit Design', 'KiCad'],
    category: 'pcb',
  },
  {
    title: 'Backend & Data',
    icon: 'database',
    description: 'APIs, authentication and the data behind the interface.',
    items: ['Supabase', 'Database fundamentals', 'REST APIs'],
    category: 'fullstack',
  },
  {
    title: 'AI & Continuous Learning',
    icon: 'brain',
    description: 'Applying AI where it earns its place.',
    // Keep "Python" only if it is part of your actual skill set.
    items: ['Python', 'AI Engineering fundamentals', 'Automation'],
    category: 'ai',
  },
]

/**
 * Scrolling logo strip. `icon` must be one of:
 * 'react' | 'javascript' | 'html' | 'css' | 'tailwind' | 'supabase' | 'python' | 'kicad'
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
  { icon: 'kicad', title: 'KiCad', href: 'https://www.kicad.org', hoverColor: '#314cb0' },
]

const skills = {
  heading: 'Tools I **work with.**',
  description: 'The languages, tools and engineering skills behind my projects, each one put to work in something real.',
  logosLabel: 'Technologies I use',
  /** {count} and {projects} are filled in, e.g. "See 3 projects". */
  seeProjects: 'See {count} {projects}',
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
  heading: 'Let’s build **something.**',
  description:
    'Have a project, a role or just a question? My inbox is open for opportunities, freelance work and collaborations in web development, IoT and embedded systems.',
  emailLabel: 'Email me',
  availability: 'Open to full-time roles and freelance projects',
  sendButton: 'Send an email',
  copyButton: 'Copy email',
  copiedLabel: 'Copied',
  githubButton: 'GitHub',
  linkedinButton: 'LinkedIn',
  facebookButton: 'Facebook',
  /** Small print under the links. Set to '' to hide. */
  note: 'The LinkedIn link is a placeholder until set in src/content.ts.',
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
  workPage,
  projectUi,
  categories,
  projects,
  experience,
  skills,
  education,
  contact,
  footer,
}
