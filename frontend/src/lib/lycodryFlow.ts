/**
 * LycoDry system flowchart (capstone paper, Figures 6–8) as data, plus a simulated run of the
 * machine that walks a tomato through it. Used by components/LiveFlowchart.tsx.
 */

export type StageId = 'start' | 'sort' | 'dry'
export type NodeKind = 'box' | 'diamond' | 'pill'

export interface FlowNode {
  id: string
  x: number
  y: number
  label: string
  kind?: NodeKind
  w?: number
  h?: number
}

export interface FlowEdge {
  from: string
  to: string
  label?: string
  /** Hand-routed polyline; otherwise routed automatically. */
  points?: [number, number][]
  /** Shifts a horizontal edge up/down so two opposite edges can run side by side. */
  offset?: number
}

export interface Stage {
  id: StageId
  title: string
  height: number
  nodes: FlowNode[]
  edges: FlowEdge[]
}

export const FLOW_WIDTH = 680
const C = 340
const L = 115
const R = 565

export const stages: Stage[] = [
  {
    id: 'start',
    title: 'Start-up',
    height: 430,
    nodes: [
      { id: 'start', x: C, y: 40, kind: 'pill', label: 'Power on · system start' },
      { id: 'conveyor', x: C, y: 125, label: 'Conveyor runs; tomatoes\npoured into the funnel' },
      { id: 'tray', x: C, y: 225, kind: 'diamond', label: 'Drying tray on\nIR sensor 1?' },
      { id: 'loadTray', x: R, y: 225, label: 'Kiosk: “Please\nload tray”' },
      { id: 'lock', x: C, y: 325, label: 'Tray locked,\ncamera unlocks' },
      { id: 'toSort', x: C, y: 400, kind: 'pill', label: 'On to sorting →' },
    ],
    edges: [
      { from: 'start', to: 'conveyor' },
      { from: 'conveyor', to: 'tray' },
      { from: 'tray', to: 'loadTray', label: 'No', offset: -9 },
      { from: 'loadTray', to: 'tray', offset: 9 },
      { from: 'tray', to: 'lock', label: 'Yes' },
      { from: 'lock', to: 'toSort' },
    ],
  },
  {
    id: 'sort',
    title: 'Sorting',
    height: 725,
    nodes: [
      { id: 'fromStart', x: L, y: 40, kind: 'pill', w: 170, label: 'Next tomato' },
      { id: 'camera', x: C, y: 40, label: 'Tomato enters\ncamera view' },
      { id: 'yolo', x: C, y: 125, label: 'YOLO v11 grades it\n(3–5 s decision window)' },
      { id: 'isTomato', x: C, y: 225, kind: 'diamond', label: 'Is it a tomato?' },
      { id: 'grade', x: C, y: 335, kind: 'diamond', label: 'Assigned grade?' },
      { id: 'market', x: L, y: 440, label: 'Market gate opens' },
      { id: 'slice', x: C, y: 440, label: 'Pneumatic slicer cuts\n2 cm slices onto tray' },
      { id: 'reject', x: R, y: 440, label: 'Reject gate opens' },
      { id: 'mPush', x: L, y: 520, label: 'Push servo →\nmarket basket' },
      { id: 'pCount', x: C, y: 520, label: 'Processing IR\ncounts it (+1)' },
      { id: 'rPush', x: R, y: 520, label: 'Push servo →\nreject basket' },
      { id: 'mCount', x: L, y: 600, label: 'Basket IR:\nMarket +1' },
      { id: 'bump', x: C, y: 600, label: 'Conveyor bumps to\nthe next tray spot' },
      { id: 'rCount', x: R, y: 600, label: 'Basket IR:\nReject +1' },
      { id: 'toDry', x: C, y: 690, kind: 'pill', label: 'On to checks & drying →' },
    ],
    edges: [
      { from: 'fromStart', to: 'camera' },
      { from: 'camera', to: 'yolo' },
      { from: 'yolo', to: 'isTomato' },
      { from: 'isTomato', to: 'grade', label: 'Yes' },
      { from: 'isTomato', to: 'reject', label: 'No', points: [[445, 225], [R, 225], [R, 413]] },
      { from: 'grade', to: 'market', label: 'Market' },
      { from: 'grade', to: 'slice', label: 'Processing' },
      { from: 'grade', to: 'reject', label: 'Reject' },
      { from: 'market', to: 'mPush' },
      { from: 'mPush', to: 'mCount' },
      { from: 'slice', to: 'pCount' },
      { from: 'pCount', to: 'bump' },
      { from: 'reject', to: 'rPush' },
      { from: 'rPush', to: 'rCount' },
      { from: 'mCount', to: 'toDry', points: [[L, 627], [L, 650], [C, 650], [C, 670]] },
      { from: 'bump', to: 'toDry' },
      { from: 'rCount', to: 'toDry', points: [[R, 627], [R, 650], [C, 650], [C, 670]] },
    ],
  },
  {
    id: 'dry',
    title: 'Checks & drying',
    height: 785,
    nodes: [
      { id: 'fromSort', x: C, y: 35, kind: 'pill', label: 'From sorting' },
      { id: 'basketFull', x: C, y: 135, kind: 'diamond', label: 'A basket full?\n(10 tomatoes)' },
      { id: 'empty', x: L, y: 135, label: 'Kiosk: empty the\nbin, counter resets' },
      { id: 'batch', x: C, y: 260, kind: 'diamond', w: 236, h: 104, label: 'Batch complete?\n5 trays, or ≥ 3 and\nthe funnel is empty' },
      { id: 'next', x: L, y: 260, kind: 'pill', w: 170, h: 48, label: 'Next tomato\n(back to sorting)' },
      { id: 'uv', x: C, y: 375, label: 'Tray centred (10 s),\nUV-C sterilises 15 min' },
      { id: 'heat', x: C, y: 460, label: 'Fans, Peltier and\nheating coils on' },
      { id: 'done24', x: C, y: 560, kind: 'diamond', label: '24 h of drying\ndone?' },
      { id: 'hold', x: R, y: 560, label: 'Keep 45–55 °C\nheat < 45 · cool > 55' },
      { id: 'shutdown', x: C, y: 660, label: 'Climate hardware off,\nprocessing count resets' },
      { id: 'ready', x: C, y: 745, kind: 'pill', w: 230, label: 'Pop-up: “Ready to harvest”' },
    ],
    edges: [
      { from: 'fromSort', to: 'basketFull' },
      { from: 'basketFull', to: 'empty', label: 'Yes' },
      { from: 'basketFull', to: 'batch', label: 'No' },
      { from: 'empty', to: 'next' },
      { from: 'batch', to: 'next', label: 'No' },
      { from: 'batch', to: 'uv', label: 'Yes' },
      { from: 'uv', to: 'heat' },
      { from: 'heat', to: 'done24' },
      { from: 'done24', to: 'hold', label: 'No', offset: -9 },
      { from: 'hold', to: 'done24', offset: 9 },
      { from: 'done24', to: 'shutdown', label: 'Yes' },
      { from: 'shutdown', to: 'ready' },
    ],
  },
]

/* ---------- Geometry ---------- */

export function size(n: FlowNode) {
  const kind = n.kind ?? 'box'
  const side = n.x !== C
  const w = n.w ?? (kind === 'diamond' ? 210 : kind === 'pill' ? 200 : side ? 170 : 200)
  const h = n.h ?? (kind === 'diamond' ? 84 : kind === 'pill' ? 40 : 54)
  return { kind, w, h }
}

/** Half-width of a node at a vertical offset from its centre (diamonds narrow towards the tips). */
function halfWidthAt(n: FlowNode, dy: number) {
  const { kind, w, h } = size(n)
  return kind === 'diamond' ? (w / 2) * (1 - Math.abs(dy) / (h / 2)) : w / 2
}

export function route(e: FlowEdge, byId: Map<string, FlowNode>): [number, number][] {
  if (e.points) return e.points
  const a = byId.get(e.from)!
  const b = byId.get(e.to)!
  const sa = size(a)
  const sb = size(b)
  if (a.x === b.x) {
    return b.y > a.y
      ? [[a.x, a.y + sa.h / 2], [b.x, b.y - sb.h / 2]]
      : [[a.x, a.y - sa.h / 2], [b.x, b.y + sb.h / 2]]
  }
  const dir = Math.sign(b.x - a.x)
  if (a.y === b.y) {
    const o = e.offset ?? 0
    return [[a.x + dir * halfWidthAt(a, o), a.y + o], [b.x - dir * halfWidthAt(b, o), b.y + o]]
  }
  return [[a.x + dir * sa.w / 2, a.y], [b.x, a.y], [b.x, b.y - sb.h / 2]]
}

/* ---------- Simulation ---------- */

export type Climate = 'off' | 'heating' | 'holding' | 'cooling'

export interface Sim {
  run: number
  market: number
  reject: number
  processing: number
  funnel: number
  temp: number | null
  hours: number
  conveyor: 'stopped' | 'running'
  camera: 'locked' | 'on'
  uv: boolean
  climate: Climate
}

export interface Step {
  stage: StageId
  node: string
  /** The edge the tomato travels to reach `node`; omitted when it jumps (a new stage). */
  from?: string
  log: string
  /** Extra time on this step, in ms at 1× speed. */
  dwell?: number
  apply?: (s: Sim) => void
}

export const LIMITS = { basket: 10, batch: 5, hours: 24 }

export function initialSim(run = 1): Sim {
  return { run, market: 0, reject: 0, processing: 0, funnel: 0, temp: null, hours: 0, conveyor: 'stopped', camera: 'locked', uv: false, climate: 'off' }
}

type Grade = 'market' | 'reject' | 'processing' | 'other'

function pickGrade(): Grade {
  const r = Math.random()
  return r < 0.42 ? 'market' : r < 0.62 ? 'reject' : r < 0.95 ? 'processing' : 'other'
}

const gradeName = { market: 'Market', reject: 'Reject', processing: 'Processing' }

/** One endless simulated operation of the machine: start-up, sorting tomatoes, checks, drying, harvest, repeat. */
export function* simulate(s: Sim): Generator<Step, never> {
  for (;;) {
    const run = s.run
    yield { stage: 'start', node: 'start', log: 'Power on: the controller boots and initialises its sensors.', apply: (x) => Object.assign(x, initialSim(run)) }
    yield { stage: 'start', node: 'conveyor', from: 'start', log: 'The main conveyor starts and 10 tomatoes are poured into the input funnel.', apply: (x) => { x.conveyor = 'running'; x.funnel = 10 } }
    yield { stage: 'start', node: 'tray', from: 'conveyor', log: 'IR sensor 1 checks for the drying tray…' }
    yield { stage: 'start', node: 'loadTray', from: 'tray', log: 'No tray yet: the camera stays locked and the kiosk shows “Please load tray”.' }
    yield { stage: 'start', node: 'tray', from: 'loadTray', log: 'Tray loaded: IR sensor 1 detects it.' }
    yield { stage: 'start', node: 'lock', from: 'tray', log: 'The conveyor stops, the tray locks in its starting position and the camera unlocks.', apply: (x) => { x.conveyor = 'stopped'; x.camera = 'on' } }
    yield { stage: 'start', node: 'toSort', from: 'lock', log: 'Ready to sort.', dwell: -300 }

    sorting: for (;;) {
      const refill = s.funnel === 0
      yield {
        stage: 'sort',
        node: 'fromStart',
        log: refill ? 'The funnel is empty, so the operator pours in 10 more tomatoes.' : 'The next tomato rolls down the single-file ramp.',
        apply: refill ? (x) => { x.funnel = 10 } : undefined,
      }
      yield { stage: 'sort', node: 'camera', from: 'fromStart', log: 'It enters the camera’s field of view and tracking pauses for the decision window.', apply: (x) => { x.funnel -= 1 } }
      yield { stage: 'sort', node: 'yolo', from: 'camera', log: 'The custom-trained YOLO v11 model (best.pt) classifies the fruit…', dwell: 300 }
      yield { stage: 'sort', node: 'isTomato', from: 'yolo', log: 'Is the object a tomato?' }

      const grade = pickGrade()
      let last: string
      if (grade === 'other') {
        yield { stage: 'sort', node: 'reject', from: 'isTomato', log: 'Not a tomato, so it goes down the reject path. The reject servo opens.' }
        last = 'reject'
      } else {
        yield { stage: 'sort', node: 'grade', from: 'isTomato', log: `Tomato confirmed. Assigned grade: ${gradeName[grade]}.` }
        if (grade === 'market') {
          yield { stage: 'sort', node: 'market', from: 'grade', log: 'The market servo rotates to open the market path.' }
          last = 'market'
        } else if (grade === 'reject') {
          yield { stage: 'sort', node: 'reject', from: 'grade', log: 'The reject servo rotates to open the reject path.' }
          last = 'reject'
        } else {
          yield { stage: 'sort', node: 'slice', from: 'grade', log: 'No diversion: the pneumatic actuator forces it through the fixed blade grid, laying 2 cm slices on the tray.' }
          yield { stage: 'sort', node: 'pCount', from: 'slice', log: 'The processing IR sensor verifies it passed: Processing +1.', apply: (x) => { x.processing += 1 } }
          yield {
            stage: 'sort',
            node: 'bump',
            from: 'pCount',
            log: 'The conveyor bumps forward to give the next slices an empty tray spot.',
            apply: (x) => { x.conveyor = 'running' },
          }
          last = 'bump'
        }
      }
      if (last === 'market') {
        yield { stage: 'sort', node: 'mPush', from: 'market', log: 'The push servo fires and retracts; the tomato rolls into the market basket.' }
        yield { stage: 'sort', node: 'mCount', from: 'mPush', log: 'The basket IR sensor confirms it: Market +1. The market gate closes.', apply: (x) => { x.market += 1 } }
        last = 'mCount'
      } else if (last === 'reject') {
        yield { stage: 'sort', node: 'rPush', from: 'reject', log: 'The push servo fires and retracts; the tomato rolls into the reject basket.' }
        yield { stage: 'sort', node: 'rCount', from: 'rPush', log: 'The basket IR sensor confirms it: Reject +1. The reject gate closes.', apply: (x) => { x.reject += 1 } }
        last = 'rCount'
      }
      yield { stage: 'sort', node: 'toDry', from: last, log: 'On to the safety and batch checks.', dwell: -300, apply: (x) => { x.conveyor = 'stopped' } }

      yield { stage: 'dry', node: 'fromSort', log: 'Checking the basket limits and the batch.', dwell: -300 }
      yield { stage: 'dry', node: 'basketFull', from: 'fromSort', log: `Is a basket full? Market ${s.market}/10, Reject ${s.reject}/10.` }
      if (s.market >= LIMITS.basket || s.reject >= LIMITS.basket) {
        const which = s.market >= LIMITS.basket ? 'market' : 'reject'
        yield {
          stage: 'dry',
          node: 'empty',
          from: 'basketFull',
          log: `The ${which} basket is full. Sorting pauses until the operator empties it and confirms; its counter resets to 0.`,
          dwell: 800,
          apply: (x) => { x[which] = 0 },
        }
        yield { stage: 'dry', node: 'next', from: 'empty', log: 'Bin emptied: back to sorting.' }
        continue
      }
      yield { stage: 'dry', node: 'batch', from: 'basketFull', log: 'Is the dehydration batch complete?' }
      const complete = s.processing >= LIMITS.batch || (s.processing >= 3 && s.funnel === 0)
      if (!complete) {
        yield { stage: 'dry', node: 'next', from: 'batch', log: `Not yet (${s.processing} of 5 trays filled): back to sorting.` }
        continue
      }

      yield {
        stage: 'dry',
        node: 'uv',
        from: 'batch',
        log: `Batch complete with ${s.processing} trays. The conveyor centres the tray (10 s) and the UV-C lamp sterilises the chamber for 15 minutes.`,
        dwell: 900,
        apply: (x) => { x.uv = true; x.camera = 'locked' },
      }
      yield {
        stage: 'dry',
        node: 'heat',
        from: 'uv',
        log: 'UV-C off. The air-intake fans, Peltier module and heating coils switch on.',
        apply: (x) => { x.uv = false; x.temp = 28; x.climate = 'heating' },
      }
      let from = 'heat'
      for (;;) {
        yield { stage: 'dry', node: 'done24', from, log: `${s.hours} of 24 hours dried. Is drying done?`, dwell: -200 }
        if (s.hours >= LIMITS.hours) break
        const t = s.temp ?? 28
        const action: Climate = t < 45 ? 'heating' : t > 55 ? 'cooling' : 'holding'
        const next =
          action === 'heating' ? t + 5 + Math.random() * 4 : action === 'cooling' ? t - 4 - Math.random() * 4 : t + (Math.random() - 0.3) * 6
        const msg =
          action === 'heating'
            ? `Chamber at ${t.toFixed(1)} °C, below 45 °C: the heating coils raise the temperature.`
            : action === 'cooling'
              ? `Chamber at ${t.toFixed(1)} °C, above 55 °C: the Peltier module and heating coils switch off to cool down.`
              : `Chamber at ${t.toFixed(1)} °C, inside 45–55 °C: no change, drying continues.`
        yield {
          stage: 'dry',
          node: 'hold',
          from: 'done24',
          log: msg,
          dwell: -200,
          apply: (x) => { x.climate = action; x.temp = next; x.hours += 3 },
        }
        from = 'hold'
      }
      yield {
        stage: 'dry',
        node: 'shutdown',
        from: 'done24',
        log: '24 hours reached: the fans, Peltier module and heating coils shut down and the processing counter resets.',
        apply: (x) => { x.climate = 'off'; x.processing = 0 },
      }
      yield {
        stage: 'dry',
        node: 'ready',
        from: 'shutdown',
        log: 'The kiosk pops up “Ready to harvest” and the sorting line unlocks. The simulation restarts.',
        dwell: 2200,
        apply: (x) => { x.temp = null },
      }
      break sorting
    }
    s.run += 1
  }
}
