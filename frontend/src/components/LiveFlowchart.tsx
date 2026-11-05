import { Images, Pause, Play, RotateCcw, StepForward } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FLOW_WIDTH, LIMITS, initialSim, route, simulate, size, stages, type FlowNode, type Sim, type StageId, type Step } from '../lib/lycodryFlow'
import type { ImageView } from '../types'
import { Lightbox } from './Lightbox'

const TRAVEL = 550 // ms for the tomato to travel an edge, at 1×
const DWELL = 750 // ms the tomato rests on a node, at 1×
const SPEEDS = [1, 2, 4] as const

interface View {
  step: Step | null
  n: number
  sim: Sim
  log: { n: number; text: string }[]
  /** Edges the current tomato has travelled in this stage, as "from>to". */
  trail: string[]
}

const fresh = (): View => ({ step: null, n: 0, sim: initialSim(), log: [], trail: [] })

const climateLabel = { off: 'Off', heating: 'Heating', holding: 'Holding', cooling: 'Cooling' }

/**
 * Live, animated version of the LycoDry system flowchart: a simulated run of the machine moves a
 * tomato through every decision, with the counters, chamber temperature and drying time updating
 * as it goes. Pauses while off screen; starts paused for people who prefer reduced motion.
 */
export function LiveFlowchart({ description, figures = [] }: { description?: string; figures?: ImageView[] }) {
  const sim = useRef<Sim>(initialSim())
  const gen = useRef<Generator<Step, never> | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>(fresh)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1)
  const [inView, setInView] = useState(false)
  const [pinned, setPinned] = useState<{ stage: StageId; at: StageId } | null>(null)
  const [figure, setFigure] = useState<number | null>(null)

  function advance() {
    gen.current ??= simulate(sim.current)
    const step = gen.current.next().value
    step.apply?.(sim.current)
    setView((v) => {
      const key = step.from ? `${step.from}>${step.node}` : ''
      const sameRun = v.step?.stage === step.stage && step.node !== 'fromStart'
      return {
        step,
        n: v.n + 1,
        sim: { ...sim.current },
        log: [{ n: v.n + 1, text: step.log }, ...v.log].slice(0, 4),
        trail: key ? [...(sameRun ? v.trail : []), key] : [],
      }
    })
  }

  function reset() {
    sim.current = initialSim()
    gen.current = null
    setPinned(null)
    setView(fresh())
  }

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || !inView) return
    const step = view.step
    const delay = step ? ((step.from ? TRAVEL : 0) + DWELL + (step.dwell ?? 0)) / speed : 400
    const id = window.setTimeout(advance, delay)
    return () => window.clearTimeout(id)
  }, [view.n, playing, inView, speed]) // eslint-disable-line react-hooks/exhaustive-deps

  const liveStage: StageId = view.step?.stage ?? 'start'
  const shown = pinned && pinned.at === liveStage ? pinned.stage : liveStage
  const stage = stages.find((s) => s.id === shown)!
  const s = view.sim
  const activeX = (shown === liveStage && stage.nodes.find((nd) => nd.id === view.step?.node)?.x) || FLOW_WIDTH / 2

  // On narrow screens the diagram scrolls sideways: keep the tomato in view.
  useEffect(() => {
    const el = scroller.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    const pad = 12
    const left = pad + (activeX / FLOW_WIDTH) * (el.scrollWidth - 2 * pad) - el.clientWidth / 2
    el.scrollTo({ left, behavior: 'smooth' })
  }, [activeX, shown])

  const stats = [
    { label: 'Market', value: `${s.market}`, of: LIMITS.basket, ratio: s.market / LIMITS.basket },
    { label: 'Reject', value: `${s.reject}`, of: LIMITS.basket, ratio: s.reject / LIMITS.basket },
    { label: 'Processing', value: `${s.processing}`, of: LIMITS.batch, ratio: s.processing / LIMITS.batch },
    { label: 'Funnel', value: `${s.funnel}`, of: null, ratio: s.funnel / 10 },
    { label: 'Chamber', value: s.temp === null ? '—' : `${s.temp.toFixed(1)}°`, of: null, ratio: s.temp === null ? 0 : Math.min(1, s.temp / 60) },
    { label: 'Drying', value: `${s.hours}h`, of: LIMITS.hours, ratio: s.hours / LIMITS.hours },
  ]
  const status = [
    { label: 'Conveyor', value: s.conveyor === 'running' ? 'Running' : 'Stopped', on: s.conveyor === 'running' },
    { label: 'Camera', value: s.camera === 'on' ? 'On' : 'Locked', on: s.camera === 'on' },
    { label: 'UV-C', value: s.uv ? 'On' : 'Off', on: s.uv },
    { label: 'Climate', value: climateLabel[s.climate], on: s.climate !== 'off' },
  ]

  const btn =
    'inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 font-mono text-xs tracking-wide text-fg2 transition hover:text-fg focus-visible:outline-2 focus-visible:outline-gold'

  return (
    <div ref={box} className="space-y-5">
      {description && <p>{description}</p>}

      <div className="overflow-hidden rounded-xl border border-line bg-card">
        {/* Header: live badge + controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-fg2 uppercase">
            <span className="relative flex size-2">
              {playing && <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />}
              <span className={`relative size-2 rounded-full ${playing ? 'bg-gold' : 'bg-muted'}`} />
            </span>
            Simulated run · batch {s.run}
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <button type="button" onClick={() => setPlaying((p) => !p)} className={`${btn} text-fg`} aria-pressed={playing}>
              {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={advance} disabled={playing} className={`${btn} disabled:opacity-40 disabled:hover:text-fg2`}>
              <StepForward size={14} /> Step
            </button>
            <button
              type="button"
              onClick={() => setSpeed((v) => SPEEDS[(SPEEDS.indexOf(v) + 1) % SPEEDS.length])}
              className={`${btn} w-14 justify-center`}
              aria-label={`Speed ${speed}×, change speed`}
            >
              {speed}×
            </button>
            <button type="button" onClick={reset} className={btn} aria-label="Restart the simulation">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0 border-b border-line lg:border-r lg:border-b-0">
        {/* Stage tabs: follow the tomato, or pick one to look at */}
        <div role="tablist" aria-label="Flowchart stage" className="flex gap-1 overflow-x-auto px-3 pt-3">
          {stages.map((st, i) => (
            <button
              key={st.id}
              type="button"
              role="tab"
              aria-selected={st.id === shown}
              onClick={() => setPinned({ stage: st.id, at: liveStage })}
              className={`flex min-h-9 shrink-0 items-center gap-2 rounded-md px-3 font-mono text-xs tracking-wide transition ${
                st.id === shown ? 'bg-gold text-bg' : 'text-fg2 hover:text-fg'
              }`}
            >
              {i + 1} · {st.title}
              {st.id === liveStage && <span className={`size-1.5 rounded-full ${st.id === shown ? 'bg-bg' : 'bg-gold'}`} aria-label="(live)" />}
            </button>
          ))}
        </div>

        {/* The flowchart */}
        <div ref={scroller} className="overflow-x-auto px-3 py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={stage.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <Diagram
                stageId={stage.id}
                active={shown === liveStage ? view.step : null}
                n={view.n}
                trail={shown === liveStage ? view.trail : []}
                hold={holdLabel(s)}
                speed={speed}
              />
            </motion.div>
          </AnimatePresence>
        </div>

          </div>
          <div className="min-w-0">
        {/* Live readings */}
        <dl className="grid grid-cols-3 gap-px border-b border-line bg-line sm:grid-cols-6 lg:grid-cols-2">
          {stats.map((st) => (
            <div key={st.label} className="bg-card px-4 py-3">
              <dt className="text-[10px] tracking-[0.18em] text-muted uppercase">{st.label}</dt>
              <dd className="mt-1 font-serif text-2xl leading-none text-fg lining-nums tabular-nums">
                {st.value}
                {st.of !== null && <span className="ml-0.5 text-sm text-muted">/{st.of}</span>}
              </dd>
              <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-gold transition-[width] duration-500" style={{ width: `${Math.round(st.ratio * 100)}%` }} />
              </div>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-2 border-b border-line px-4 py-3">
          {status.map((st) => (
            <li
              key={st.label}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors ${
                st.on ? 'border-gold/50 text-fg' : 'border-line text-muted'
              }`}
            >
              <span className={`size-1.5 rounded-full ${st.on ? 'bg-gold' : 'bg-muted/50'}`} aria-hidden />
              {st.label}: <span className={st.on ? 'text-gold' : ''}>{st.value}</span>
            </li>
          ))}
        </ul>

        {/* Narration */}
        <ol className="space-y-1.5 px-4 py-4" aria-live={playing ? 'off' : 'polite'}>
          {view.log.length === 0 && <li className="text-sm text-muted">Press play to start the machine.</li>}
          {view.log.map((l, i) => (
            <motion.li
              key={l.n}
              initial={i === 0 ? { opacity: 0, x: -6 } : false}
              animate={{ opacity: 1, x: 0 }}
              className={i === 0 ? 'text-sm leading-relaxed text-fg' : 'text-xs leading-relaxed text-muted'}
            >
              {i === 0 && <span className="mr-2 text-gold">▸</span>}
              {l.text}
            </motion.li>
          ))}
        </ol>
          </div>
        </div>
      </div>

      {figures.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setFigure(0)}
            className="inline-flex items-center gap-2 font-mono text-xs text-fg2 underline-offset-4 transition hover:text-gold hover:underline"
          >
            <Images size={14} /> View the original flowcharts from the paper ({figures.length})
          </button>
          <Lightbox
            slides={figures.map((f) => ({ src: f.src, alt: f.alt, caption: f.caption }))}
            index={figure}
            onChange={setFigure}
            onClose={() => setFigure(null)}
          />
        </>
      )}
    </div>
  )
}

function holdLabel(s: Sim) {
  if (s.climate === 'off' || s.temp === null) return null
  return `Keep 45–55 °C\n${climateLabel[s.climate]} · ${s.temp.toFixed(1)} °C`
}

/* ---------- SVG diagram ---------- */

function Diagram({
  stageId,
  active,
  n,
  trail,
  hold,
  speed,
}: {
  stageId: StageId
  active: Step | null
  n: number
  trail: string[]
  hold: string | null
  speed: number
}) {
  const stage = stages.find((s) => s.id === stageId)!
  const byId = useMemo(() => new Map(stage.nodes.map((nd) => [nd.id, nd])), [stage])
  const edges = useMemo(() => stage.edges.map((e) => ({ ...e, key: `${e.from}>${e.to}`, pts: route(e, byId) })), [stage, byId])
  const current = active ? `${active.from}>${active.node}` : ''
  const travelled = edges.find((e) => e.key === current)

  return (
    <svg
      viewBox={`0 0 ${FLOW_WIDTH} ${stage.height}`}
      className="mx-auto block w-full max-w-170 min-w-135"
      role="img"
      aria-label={`LycoDry flowchart, ${stage.title} stage${active ? `; current step: ${byId.get(active.node)?.label.replace(/\n/g, ' ')}` : ''}`}
    >
      <defs>
        <marker id="lf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-muted" />
        </marker>
        <marker id="lf-arrow-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-gold" />
        </marker>
      </defs>

      {edges.map((e) => {
        const on = e.key === current
        const lit = on || trail.includes(e.key)
        const d = 'M' + e.pts.map((p) => p.join(',')).join(' L')
        const [a, b] = e.pts
        const horizontal = a[1] === b[1]
        return (
          <g key={e.key}>
            <path
              d={d}
              fill="none"
              strokeWidth={lit ? 2 : 1.25}
              markerEnd={`url(#${lit ? 'lf-arrow-on' : 'lf-arrow'})`}
              className={`transition-[stroke] duration-300 ${lit ? 'stroke-gold' : 'stroke-muted/45'}`}
              strokeOpacity={lit && !on ? 0.55 : 1}
            />
            {on && <path d={d} fill="none" strokeWidth={2} strokeDasharray="4 8" className="lf-flow stroke-bg" />}
            {e.label && (
              <text
                x={horizontal ? (a[0] + b[0]) / 2 : a[0] + 8}
                y={horizontal ? a[1] - 7 : (a[1] + b[1]) / 2 + 4}
                textAnchor={horizontal ? 'middle' : 'start'}
                className={`font-mono text-[11px] tracking-wide ${lit ? 'fill-gold' : 'fill-muted'}`}
              >
                {e.label}
              </text>
            )}
          </g>
        )
      })}

      {stage.nodes.map((nd) => (
        <Node key={nd.id} node={nd} on={active?.node === nd.id} label={nd.id === 'hold' && hold ? hold : nd.label} />
      ))}

      {active && <Token key={n} pts={travelled?.pts ?? null} at={byId.get(active.node)!} speed={speed} />}
    </svg>
  )
}

function Node({ node, on, label }: { node: FlowNode; on: boolean; label: string }) {
  const { kind, w, h } = size(node)
  const { x, y } = node
  const shape = `transition-[fill,stroke] duration-300 ${on ? 'fill-gold/12 stroke-gold' : 'fill-bg stroke-line'}`
  const lines = label.split('\n')
  const lh = 15

  return (
    <g style={on ? { filter: 'drop-shadow(0 0 10px color-mix(in oklab, var(--gold) 45%, transparent))' } : undefined}>
      {kind === 'diamond' ? (
        <polygon points={`${x},${y - h / 2} ${x + w / 2},${y} ${x},${y + h / 2} ${x - w / 2},${y}`} strokeWidth={on ? 2 : 1.25} className={shape} />
      ) : (
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={kind === 'pill' ? h / 2 : 8} strokeWidth={on ? 2 : 1.25} className={shape} />
      )}
      <text textAnchor="middle" dominantBaseline="central" className={`text-[12.5px] transition-[fill] duration-300 ${on ? 'fill-fg font-medium' : 'fill-fg2'}`}>
        {lines.map((line, i) => (
          <tspan key={i} x={x} y={y - ((lines.length - 1) * lh) / 2 + i * lh}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

/** The tomato: travels the edge into the active node, then rests at the node's entry point. */
function Token({ pts, at, speed }: { pts: [number, number][] | null; at: FlowNode; speed: number }) {
  const path = pts ?? [[at.x, at.y - size(at).h / 2] as [number, number]]
  const lengths = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]))
  const total = lengths.reduce((a, b) => a + b, 0) || 1
  const times = [0, ...lengths.map((_, i) => lengths.slice(0, i + 1).reduce((a, b) => a + b, 0) / total)]
  const xs = path.map((p) => p[0])
  const ys = path.map((p) => p[1])
  const transition = { duration: pts ? TRAVEL / 1000 / speed : 0, times, ease: 'linear' as const }

  return (
    <g pointerEvents="none">
      <motion.circle r={11} className="fill-gold/25" initial={{ cx: xs[0], cy: ys[0] }} animate={{ cx: xs, cy: ys }} transition={transition} />
      <motion.circle r={6} className="fill-[#e2563b] stroke-bg" strokeWidth={1.5} initial={{ cx: xs[0], cy: ys[0] }} animate={{ cx: xs, cy: ys }} transition={transition} />
    </g>
  )
}
