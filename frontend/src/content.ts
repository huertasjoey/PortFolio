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
      'Aquarium Monitor is a custom Arduino-compatible controller board I designed in KiCad for monitoring an aquarium: an ATmega328P with an ESP-01 Wi-Fi module, inputs for pH, TDS and DS18B20 temperature sensors, and outputs for a relay, two fans and a water pump — on a single-sided, all through-hole PCB that can be etched and soldered by hand.',
    role: 'Hardware designer — schematic and PCB layout (personal project)',
    image: '/images/arduino/cover.jpg',
    tags: ['IoT', 'KiCad', 'PCB Design', 'ATmega328P', 'ESP-01', 'Sensors'],
    caseStudy: {
      overview:
        'Aquarium Monitor puts everything a small monitoring-and-control project needs onto one board. At its centre is an ATmega328P with its own crystal, reset circuit and decoupling, broken out to Arduino-style headers. Around it sit an ESP-01 for Wi-Fi, sensor inputs for pH, TDS and temperature, an OLED header, a relay header, and screw terminals for two fans and a water pump powered from a 12 V jack. The board is single-sided with only through-hole parts, so it can be made at home.',
      banner: false,
      metrics: [
        { value: '46', label: 'through-hole parts and no surface-mount parts, so it can be soldered by hand' },
        { value: '296', label: 'tracks, all on the bottom copper layer (0.5 mm) — a single-sided board' },
        { value: '91 × 125 mm', label: 'board, with a digital-ground copper pour on the bottom layer' },
      ],
      gallery: [
        { src: '/images/arduino/cover.jpg', alt: 'Angled 3D render of the Aquarium Monitor board', caption: '3D render: the assembled board (KiCad render)' },
        { src: '/images/arduino/render-top.jpg', alt: 'Top-down 3D render of the Aquarium Monitor board with every part placed', caption: 'Top view: ATmega328P, ESP-01 socket, sensor headers and load terminals' },
        { src: '/images/arduino/render-bottom.jpg', alt: '3D render of the bottom of the Aquarium Monitor board showing the copper tracks', caption: 'Bottom view: the single copper layer (KiCad render)' },
      ],
      pcb: {
        description:
          'I designed the schematic and the single-sided board in KiCad. Every track is on the bottom copper layer, with a digital-ground pour filling the rest, and every part is through-hole so the board can be etched and soldered by hand.',
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
        'Water parameters like pH, temperature and conductivity (TDS) change gradually and are easy to miss, yet they directly affect aquatic life. Watching them takes several sensors, Wi-Fi and 12 V loads like a pump and fans — which gets messy fast on an off-the-shelf Arduino and breadboard: loose jumper wires, noisy analog readings, and nowhere solid to connect the loads.',
      solution:
        'One purpose-built board: the microcontroller, Wi-Fi module, sensor inputs and power all in one place, with screw terminals for the loads, a filtered supply and separate ground for the analog sensors, and labelled headers that keep the familiar Arduino pin names.',
      features: [
        {
          group: 'Microcontroller core',
          items: [
            'ATmega328P (DIP-28) with an external crystal and 22 pF load capacitors, a reset button with a 10 kΩ pull-up, and 0.1 µF decoupling on the supply pins.',
            'Arduino-style headers breaking out A0–A5, D2–D7 and D8–D13.',
            'An interrupt push button on D2 with a debounce capacitor, and indicator LEDs on D5 and D8.',
          ],
        },
        {
          group: 'Wi-Fi and display',
          items: [
            'ESP-01 socket on a 3.3 V supply header, with its own reset button and a 10 kΩ / 4.7 kΩ divider that drops the 5 V serial line to a safe level for the ESP-01.',
            'A 4-pin OLED header wired to A4/A5 (the I²C pins).',
          ],
        },
        {
          group: 'Sensors',
          items: [
            'pH (A1) and TDS (A0) inputs, each with a 100 Ω series resistor and a 0.1 µF filter capacitor.',
            'A DS18B20 temperature-probe header on D7 with a 4.7 kΩ pull-up.',
            'The analog sensors run from their own supply (VCC_ANA), filtered from 5 V by a 10 Ω resistor with 0.1 µF and 10 µF capacitors.',
          ],
        },
        {
          group: 'Power and loads',
          items: [
            'A 12 V DC barrel jack feeding screw terminals for two fans and a water pump.',
            'A separate 5 V screw-terminal input, and a header for a 5 V relay module driven from D6.',
          ],
        },
        {
          group: 'PCB layout',
          items: [
            'Single-sided: every track is on the bottom copper layer, 0.5 mm wide, with a digital-ground copper pour filling the rest.',
            'Separate digital and analog grounds that meet at a single star point.',
            'All through-hole parts, with the power and load connectors grouped along one edge of the 91 × 125 mm board.',
          ],
        },
      ],
      implementation: [
        'Schematic drawn in KiCad using the standard symbol libraries plus an ESP-01 symbol and footprint.',
        'Board laid out in the KiCad PCB editor as a two-layer file with all routing on the bottom copper, so it can be made as a single-sided board.',
        'The schematic, routing and 3D renders shown here were exported straight from the project files with KiCad.',
      ],
      contribution:
        'I designed the schematic and the PCB layout in KiCad. [Edit: add whether the board was etched, assembled and tested, and what it was used for.]',
      challenges:
        'The design goal was to fit every connection onto one copper layer so the board can be made at home, while keeping the low-level pH and TDS signals clean — hence the filtered analog supply, the separate analog ground with a star point, and the 12 V load wiring kept along its own edge of the board. [Edit: add what was actually hardest for you.]',
      futureWork:
        'Firmware that alerts over Wi-Fi when readings stay out of range (rather than on every brief spike), and automatic filtration control through the relay — the original goals of the project. [Edit: add test results and anything already working.]',
      note: 'The schematic, routing and 3D views are exported directly from the KiCad project. The 3D views are KiCad renders, not photographs. Text in [brackets] is placeholder content.',
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
      'A flash analog-to-digital converter built entirely from discrete chips — no microcontroller. A resistor ladder and four LM339 quad comparators sample an input voltage, two 74148 priority encoders turn the result into a binary code, and the code is shown on LEDs and a 7-segment display. Designed in KiCad as my midterm project.',
    role: 'Circuit designer — schematic and PCB layout (midterm project)',
    image: '/images/adc/cover.jpg',
    tags: ['KiCad', 'PCB Design', 'Analog', 'Digital Logic', 'LM339', '74148'],
    caseStudy: {
      overview:
        'This converter shows how an ADC works with nothing hidden in software. A potentiometer sets the input voltage, a UA741 op-amp conditions it, and a ladder of 1 kΩ resistors creates a set of reference voltages. Sixteen comparators (four LM339 chips) compare the input against every reference at once. Two cascaded 74148 priority encoders and three 74LS86 XOR gates turn the comparator outputs into a binary code, which drives four LEDs and, through a 7447 decoder, a 7-segment display.',
      banner: false,
      metrics: [
        { value: '16', label: 'comparators (four LM339 quad comparators) checking the input against a resistor ladder' },
        { value: '47', label: 'through-hole parts and no surface-mount parts, so it can be built by hand' },
        { value: '153 × 86 mm', label: 'single-sided board, with all tracks on the bottom copper layer' },
      ],
      gallery: [
        { src: '/images/adc/cover.jpg', alt: 'Angled 3D render of the 8-bit ADC board', caption: '3D render of the board (KiCad render)' },
        { src: '/images/adc/render-top.jpg', alt: 'Top-down 3D render of the 8-bit ADC board', caption: 'Top view: comparators, encoders, decoder, LEDs and the input stage' },
        { src: '/images/adc/render-bottom.jpg', alt: '3D render of the bottom of the 8-bit ADC board showing the copper tracks', caption: 'Bottom view: the single copper layer (KiCad render)' },
      ],
      pcb: {
        description:
          'I drew the schematic and laid out a single-sided board in KiCad, with 1 mm tracks for power and 0.5 mm tracks for signals. The layout is still a work in progress: the input stage, timer and part of the encoder section are routed, while the comparator outputs, the LED outputs and the ground connections are still to be routed.',
        views: [
          { label: 'Routing', src: '/images/adc/routing-full.jpg', alt: '8-bit ADC PCB routing on the bottom copper layer', caption: 'Routing in progress: every track is on the bottom layer' },
          { label: 'Schematic', src: '/images/adc/schematic-full.jpg', alt: '8-bit ADC schematic in KiCad', caption: 'Schematic: input stage, resistor ladder, comparators, encoders, XOR logic and display driver' },
        ],
        model: { src: '/models/adc.glb', alt: 'Interactive 3D model of the 8-bit ADC board, exported from KiCad' },
      },
      problem:
        'Analog-to-digital conversion usually happens inside a microcontroller, where it is easy to use and hard to see. The goal here was to build the whole conversion out of individual chips, so every stage — reference voltages, comparison, encoding and display — can be followed on the board.',
      solution:
        'A flash-type converter: the input is compared against every reference voltage at the same time, and priority encoders report the highest comparator that is switched on. That code is shown directly on LEDs and decoded for a 7-segment display.',
      features: [
        {
          group: 'Input and timing',
          items: [
            'A 10 kΩ potentiometer sets the input voltage, conditioned by a UA741 op-amp with offset-adjust resistors.',
            'A 2N7000 MOSFET in the input stage, and an LM555 timer circuit with its own resistors and capacitor.',
            'Power through a two-way screw terminal.',
          ],
        },
        {
          group: 'Comparison',
          items: [
            'A ladder of 1 kΩ resistors divides the reference into evenly spaced voltages.',
            'Sixteen comparators — four LM339 quad comparators — each compare the input with one ladder voltage.',
          ],
        },
        {
          group: 'Encoding and display',
          items: [
            'Two 74148 8-to-3 priority encoders, each handling eight comparators and cascaded through their enable pins.',
            'Three 74LS86 XOR gates combine the two encoders into one binary code.',
            'Four LEDs (with 220 Ω resistors) show the code, and a 7447 BCD-to-7-segment decoder drives a D198K common-cathode display.',
          ],
        },
        {
          group: 'PCB layout',
          items: [
            'Single-sided: every track on the bottom copper layer, 1 mm wide for power and 0.5 mm for signals.',
            'All 47 parts are through-hole, with the chips in DIP packages for easy soldering and replacement.',
          ],
        },
      ],
      implementation: [
        'Schematic drawn in KiCad with the standard libraries plus imported symbols and footprints for the LM339 and UA741.',
        'Board laid out in the KiCad PCB editor on a 153 × 86 mm outline.',
        'The schematic, routing and 3D renders shown here were exported straight from the project files with KiCad. The four LM339s, the 7-segment display and the potentiometer have no 3D models in their footprints, so they appear as outlines in the 3D views.',
      ],
      contribution:
        'I designed the circuit and drew the schematic and PCB layout in KiCad. [Edit: add whether it was built and tested on a breadboard or board, and who you worked with.]',
      challenges:
        'Fitting sixteen comparators, two encoders and the display logic onto one copper layer without jumpers is the hard part of the layout, which is why the routing is still being finished. [Edit: add what was hardest for you, for example calibrating the ladder or cascading the encoders.]',
      futureWork:
        'Finish routing the comparator outputs, the LED outputs and the ground, then etch and test the board. [Edit: add your own next steps.]',
      note: 'The schematic, routing and 3D views are exported directly from the KiCad project. The 3D views are KiCad renders, not photographs. Text in [brackets] is placeholder content.',
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
      'Kaizen is a personal productivity web app (Habit Tracker & Daily Journal) that combines weekly habit tracking with rest days and progress levels, a daily plan, goals and a private diary with an optional AI writing assistant — built with React and Supabase, with every user’s data protected by Row Level Security.',
    role: 'Designer & full-stack developer (personal project)',
    image: '/images/kaizen/cover.jpg',
    tags: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vite', 'Full-Stack'],
    caseStudy: {
      overview:
        'Kaizen — a Habit Tracker & Daily Journal — started as a weekly habit grid and grew into a small personal planner. You sign in, tick habits across the week, take rest days without breaking your progress, plan today’s tasks, track goals with deadlines, and write a daily diary — all synced to your own account through Supabase and kept private by database-level security. It was built from a to-do list project and has been extended feature by feature.',
      banner: false,
      background: 'fading-stars',
      video: {
        title: 'Promo video',
        src: '/videos/kaizen-promo.mp4',
        poster: '/videos/kaizen-promo-poster.jpg',
        caption: '32-second promo with sound. Press play.',
      },
      metrics: [
        { value: '5', label: 'Supabase tables (weeks, week tasks, goals, diary entries, day tasks), all with Row Level Security' },
        { value: '3', label: 'themes: Light, Dark and Night' },
        { value: '4', label: 'optional AI writing tools: correct, make natural, explain mistakes, vocabulary' },
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
            'Rest days: tap the moon under any weekday to rest the whole day, or right-click a box (the menu key, or a long press on a phone) to rest just one habit on one day — handy for habits like drinking water that never take a day off. Rest days are striped, never count for or against you, and are left out of every percentage and average.',
            'Progress levels: every weekly and monthly average gets a plain label — Just starting (0–29%), Building (30–49%), Steady (50–69%), Strong (70–84%) or Excellent (85–100%) — shown beside the week ring and the month average, with a Progress guide so months can be compared on the same scale.',
            'In the Month view, a habit you removed from the Week view stays visible as “Removed” with its past marks, and can be deleted for good, with its marks for that month, after a confirmation.',
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
        'Rest days: kept in the browser’s local storage for each account (a whole date, or a date plus one habit). Every calculation skips them — the week ring, the daily bars, the weekly and monthly averages and the “3/5”-style counts — so they are never treated as missed days.',
        'Hosting: a small Express server serves the built site, or the front end can be deployed to any static host (build command npm run build, output folder dist) with all paths rewritten to index.html.',
      ],
      contribution:
        'I designed and built the app end to end — the interface, the database schema and security policies, the Supabase integration, and each feature above. It lives in my GitHub repository, diy-todo-list. [Edit: add anything else you want to credit, such as a live demo link.]',
      challenges:
        'The hard parts were trust and safety rather than layout: never losing writing (the diary warns before you leave with unsaved text and asks whether to keep your version or load another device’s if both changed the same entry), keeping private notes private with Row Level Security, and keeping an AI key off the front end. Syncing is deliberately simple: there is no live push between devices, and two devices editing the very same field is last-write-wins. Rest days are saved in the browser rather than the database, so they do not follow you to another device yet.',
      futureWork:
        'Saving rest days to the database so they sync between devices, live updates between devices with Supabase Realtime, and setting up a custom email sender for production sign-ups. [Edit: add your own ideas, for example streaks and reminders for habits.]',
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
