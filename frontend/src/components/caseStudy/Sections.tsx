import { AlertTriangle, ArrowRight, ArrowUpRight, BookOpen, Check, Cpu, Images, Lightbulb, Maximize2, Play, Rocket, Wrench } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { content } from '../../content'
import type { Project } from '../../types'
import { Lightbox } from '../Lightbox'
import { Tag } from '../ui/Tag'

type CaseStudy = Project['caseStudy']

/** Shared section header: "03 — TITLE" eyebrow, optional serif heading, optional aside on the right. */
export function SectionHeader({ index, title, heading, aside }: { index: string; title: string; heading?: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="min-w-0">
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          <span className="text-gold">{index}</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          {title}
        </p>
        {heading && <h3 className="mt-3 font-serif text-4xl leading-[1.05] font-light text-fg sm:text-5xl [&_em]:text-gold">{heading}</h3>}
      </div>
      {aside}
    </div>
  )
}

/* ---------- Hero: title, overview, tags, and the promo video (or cover image) ---------- */

export function Hero({ project, titleId }: { project: Project; titleId: string }) {
  const cs = project.caseStudy
  const media = cs.video ? (
    <figure className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden /> {cs.video.title}
        </span>
        <span>16:9 · Sound on</span>
      </div>
      <video controls playsInline preload="metadata" poster={cs.video.poster} className="aspect-video w-full bg-black">
        <source src={cs.video.src} type="video/mp4" />
      </video>
      <figcaption className="px-4 py-3 text-xs text-fg2">{cs.video.caption}</figcaption>
    </figure>
  ) : project.image ? (
    <div className="overflow-hidden rounded-xl border border-line">
      <img src={project.image} alt="" className="aspect-4/3 w-full object-cover" />
    </div>
  ) : null

  return (
    <header>
      {cs.thesis && (
        <div className="mb-12 grid gap-x-8 gap-y-3 border-y border-line py-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
            <BookOpen size={15} strokeWidth={1.5} /> {cs.thesis.label ?? 'Thesis'}
          </p>
          <p className="font-serif text-xl leading-snug text-fg italic sm:text-2xl">“{cs.thesis.title}”</p>
          <p className="font-mono text-[11px] tracking-wide text-fg2">{cs.thesis.meta}</p>
        </div>
      )}
      <div className={`grid items-center gap-10 ${media ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14' : ''}`}>
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.18em] text-accent uppercase">
            <span>Case study</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            <span className="text-fg2">{project.classification}</span>
          </p>
          <h2 id={titleId} className="mt-4 font-serif text-6xl leading-[0.95] font-light tracking-tight text-fg sm:text-7xl xl:text-8xl">
            {project.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg2">{cs.overview}</p>
          <dl className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line text-sm">
            <div className="bg-bg px-4 py-3">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Status</dt>
              <dd className="mt-1 flex items-center gap-2 text-fg">
                <span className="size-1.5 rounded-full bg-gold" aria-hidden /> {project.status}
              </dd>
            </div>
            <div className="bg-bg px-4 py-3">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">My role</dt>
              <dd className="mt-1 text-fg">{project.role}</dd>
            </div>
          </dl>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </div>
        {media && <div className="min-w-0">{media}</div>}
      </div>
    </header>
  )
}

/* ---------- KPI strip ---------- */

// Columns per KPI count, so the strip never leaves empty cells.
const KPI_COLS: Record<number, string> = {
  1: 'grid-cols-1!',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-3 xl:grid-cols-6',
}

export function Kpis({ metrics }: { metrics: NonNullable<CaseStudy['metrics']> }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line max-md:[&>*:last-child:nth-child(odd)]:col-span-2 ${KPI_COLS[metrics.length] ?? KPI_COLS[6]}`}
    >
      {metrics.map((m, i) => (
        <div key={m.label} className="flex flex-col justify-between gap-4 bg-bg p-5 transition-colors hover:bg-card">
          <span className="font-mono text-[10px] text-muted">KPI {String(i + 1).padStart(2, '0')}</span>
          <div>
            <dd className="font-serif text-3xl leading-none text-gold lining-nums tabular-nums">{m.value}</dd>
            <dt className="mt-2 text-xs leading-snug text-fg2">{m.label}</dt>
          </div>
        </div>
      ))}
    </dl>
  )
}

/* ---------- Problem → Solution ---------- */

export function ProblemSolution({ problem, solution }: { problem: string; solution: string }) {
  const card = (icon: ReactNode, label: string, text: string, accent: boolean) => (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl border p-7 sm:p-9 ${accent ? 'border-gold/40 bg-card' : 'border-line bg-bg'}`}
    >
      {accent && <span aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-gold/10 blur-3xl" />}
      <div className="relative flex items-center gap-3">
        <span
          className={`grid size-9 place-items-center rounded-full border ${accent ? 'border-gold/60 text-gold' : 'border-line text-fg2'}`}
        >
          {icon}
        </span>
        <span className={`font-mono text-xs tracking-[0.18em] uppercase ${accent ? 'text-gold' : 'text-muted'}`}>{label}</span>
      </div>
      <p className="relative mt-6 font-serif text-2xl leading-snug text-fg sm:text-[1.75rem]">{text}</p>
    </div>
  )
  return (
    <div className="relative grid gap-4 lg:grid-cols-2 lg:gap-12">
      {card(<AlertTriangle size={16} strokeWidth={1.5} />, content.projectUi.caseStudyHeadings.problem, problem, false)}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-bg text-gold lg:grid"
      >
        <ArrowRight size={18} />
      </span>
      {card(<Lightbulb size={16} strokeWidth={1.5} />, content.projectUi.caseStudyHeadings.solution, solution, true)}
    </div>
  )
}

/* ---------- Features: one card per group ---------- */

export function FeatureGrid({ features }: { features: NonNullable<CaseStudy['features']> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {features.map((f, i) => (
        <div key={f.group} className="rounded-xl border border-line bg-card p-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Module {String(i + 1).padStart(2, '0')}</p>
          <h4 className="mt-2 font-serif text-2xl text-fg">{f.group}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-fg2">
            {f.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check size={15} className="mt-0.5 shrink-0 text-gold" /> <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ---------- Technical implementation: spec table ---------- */

export function SpecList({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line">
      {items.map((item, i) => {
        const [head, ...rest] = item.split(/:\s(.+)/s)
        const hasHead = rest.length > 0 && head.length < 40
        return (
          <li key={item} className="grid gap-2 px-5 py-4 sm:grid-cols-[3rem_12rem_minmax(0,1fr)] sm:gap-6">
            <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
            {hasHead ? (
              <span className="font-mono text-xs tracking-[0.14em] text-fg uppercase">{head}</span>
            ) : (
              <span className="max-sm:hidden" />
            )}
            <span className="text-sm leading-relaxed text-fg2">{hasHead ? rest[0] : item}</span>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Panel: a titled card with a header bar (used for 3D, PCB, …) ---------- */

export function Panel({
  label,
  icon,
  children,
  className = '',
}: {
  label: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-xl border border-line bg-card ${className}`}>
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-fg2 uppercase">
        <span className="text-gold">{icon ?? <Cpu size={14} />}</span>
        {label}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

/* ---------- Photos: bento grid that opens a lightbox ---------- */

interface Photo {
  src: string
  full?: string
  alt: string
  caption: string
}

export function PhotoGrid({ photos, max = 7 }: { photos: Photo[]; max?: number }) {
  const [open, setOpen] = useState<number | null>(null)
  const shown = photos.slice(0, max)
  const more = photos.length - shown.length
  const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', '', '', 'md:col-span-2']

  return (
    <>
      <ul className="grid auto-rows-36 grid-cols-2 gap-3 sm:auto-rows-44 md:grid-cols-4 lg:auto-rows-48">
        {shown.map((p, i) => {
          const isLast = i === shown.length - 1 && more > 0
          return (
            <li key={p.src} className={spans[i % spans.length]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={isLast ? `View all ${photos.length} photos` : `View ${p.alt} full screen`}
                className="group relative block size-full overflow-hidden rounded-xl border border-line bg-card"
              >
                <img
                  src={p.src}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {p.caption}
                </span>
                {isLast ? (
                  <span className="absolute inset-0 grid place-items-center bg-black/60 text-white backdrop-blur-[2px]">
                    <span className="flex flex-col items-center gap-1">
                      <Images size={20} className="text-gold" />
                      <span className="font-serif text-3xl">+{more + 1}</span>
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase">View all</span>
                    </span>
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-lg bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                  >
                    <Maximize2 size={14} />
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
      <Lightbox
        slides={photos.map((p) => ({
          src: p.full ?? p.src,
          alt: p.alt,
          caption: p.caption,
        }))}
        index={open}
        onChange={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  )
}

/* ---------- Results: verified findings ---------- */

export function Findings({ results }: { results: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {results.map((r, i) => (
        <li key={r} className="flex gap-4 rounded-xl border border-line bg-card p-5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
            <Check size={16} />
          </span>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Finding {String(i + 1).padStart(2, '0')}</p>
            <p className="mt-1 leading-relaxed text-fg">{r}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Credits: my role + team ---------- */

export function Credits({ project }: { project: Project }) {
  const me = content.profile.name.toLowerCase().split(/\s+/)
  const isMe = (member: string) => me.every((w) => member.toLowerCase().includes(w))
  const team = project.caseStudy.team

  return (
    <div className={`grid gap-4 ${team ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]' : ''}`}>
      <div className="relative overflow-hidden rounded-xl border border-gold/40 bg-card p-7 sm:p-9">
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-gold/10 blur-3xl" />
        <p className="relative font-mono text-xs tracking-[0.18em] text-gold uppercase">
          {content.projectUi.caseStudyHeadings.contribution}
        </p>
        <p className="relative mt-4 font-serif text-3xl leading-tight text-fg sm:text-4xl">{project.role}</p>
        <p className="relative mt-4 leading-relaxed text-fg2">{project.caseStudy.contribution}</p>
      </div>
      {team && (
        <div className="overflow-hidden rounded-xl border border-line">
          <p className="border-b border-line px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-fg2 uppercase">
            {content.projectUi.caseStudyHeadings.team} · {team.length}
          </p>
          <ul className="divide-y divide-line">
            {team.map((member) => {
              const [name, role] = member.split(/\s+—\s+/)
              const mine = isMe(member)
              return (
                <li key={member} className={`flex items-center justify-between gap-4 px-5 py-3.5 ${mine ? 'bg-gold/5' : ''}`}>
                  <span className="flex items-center gap-3 text-sm text-fg">
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${mine ? 'border-gold text-gold' : 'border-line text-fg2'}`}
                    >
                      {name
                        .split(/\s+/)
                        .filter((w) => /^[A-Z][a-z]/.test(w))
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    {name}
                    {mine && (
                      <span className="rounded-full border border-gold/50 px-2 py-0.5 font-mono text-[9px] tracking-widest text-gold uppercase">
                        Me
                      </span>
                    )}
                  </span>
                  {role && <span className="text-right font-mono text-[11px] text-muted">{role}</span>}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ---------- Challenges + future work ---------- */

export function Outlook({ challenges, futureWork }: { challenges: string; futureWork?: string }) {
  const h = content.projectUi.caseStudyHeadings
  const card = (icon: ReactNode, label: string, text: string) => (
    <div className="rounded-xl border border-line bg-card p-7">
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-fg2 uppercase">
        <span className="grid size-8 place-items-center rounded-full border border-line text-gold">{icon}</span>
        {label}
      </p>
      <p className="mt-5 text-lg leading-relaxed text-fg">{text}</p>
    </div>
  )
  return (
    <div className={`grid gap-4 ${futureWork ? 'md:grid-cols-2' : ''}`}>
      {card(<Wrench size={15} strokeWidth={1.5} />, h.challenges, challenges)}
      {futureWork && card(<Rocket size={15} strokeWidth={1.5} />, h.futureWork, futureWork)}
    </div>
  )
}

/* ---------- Benchmark: this project vs a baseline, with the gap highlighted ---------- */

export function Comparison({ data }: { data: NonNullable<CaseStudy['comparison']> }) {
  return (
    <div className="space-y-4">
      {data.highlights && (
        <ul className="grid gap-4 md:grid-cols-3">
          {data.highlights.map((h) => (
            <li key={h.label} className="relative overflow-hidden rounded-xl border border-gold/40 bg-card p-6 sm:p-7">
              <span aria-hidden className="pointer-events-none absolute -top-20 -right-16 size-52 rounded-full bg-gold/10 blur-3xl" />
              <p className="relative font-serif text-6xl leading-none text-gold lining-nums sm:text-7xl">{h.value}</p>
              <p className="relative mt-3 text-sm text-fg2">{h.label}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="overflow-hidden rounded-xl border border-line">
        {/* Column heads (desktop) */}
        <div className="hidden grid-cols-[13rem_minmax(0,1fr)_minmax(0,1fr)_9rem] gap-6 border-b border-line bg-card px-6 py-3 font-mono text-[10px] tracking-[0.18em] text-muted uppercase lg:grid">
          <span>Metric</span>
          <span className="flex items-center gap-2 text-gold">
            <span className="size-2 rounded-full bg-gold" aria-hidden /> {data.a}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-muted/60" aria-hidden /> {data.b}
          </span>
          <span className="text-right">Gap</span>
        </div>

        <ul className="divide-y divide-line">
          {data.rows.map((r) => {
            const max = r.bars ? Math.max(...r.bars) : 1
            const pct = (v: number) => `${Math.max(1.2, (v / max) * 100)}%`
            const side = (label: string, value: string, win: boolean, bar?: number) => (
              <div className="min-w-0">
                <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase lg:hidden">{label}</p>
                <p className={`text-sm ${win ? 'font-medium text-fg' : 'text-fg2'}`}>{value}</p>
                {bar !== undefined && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/60">
                    <div className={`h-full rounded-full ${win ? 'bg-gold' : 'bg-muted/70'}`} style={{ width: pct(bar) }} />
                  </div>
                )}
              </div>
            )
            return (
              <li
                key={r.metric}
                className="grid grid-cols-2 gap-x-6 gap-y-4 px-6 py-5 transition-colors hover:bg-card/60 lg:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1fr)_9rem] lg:items-center"
              >
                <div className="col-span-2 flex items-start justify-between gap-4 lg:col-span-1 lg:block">
                  <div>
                    <p className="text-sm font-medium text-fg">{r.metric}</p>
                    {r.note && <p className="mt-1 text-xs leading-snug text-muted">{r.note}</p>}
                  </div>
                  <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 font-mono text-[11px] text-gold lg:hidden">{r.gap}</span>
                </div>
                {side(data.a, r.a, r.better === 'a', r.bars?.[0])}
                {side(data.b, r.b, r.better === 'b', r.bars?.[1])}
                <div className="hidden justify-end lg:flex">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-xs text-gold">{r.gap}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {data.note && <p className="font-mono text-[11px] leading-relaxed text-muted">{data.note}</p>}
    </div>
  )
}

/* ---------- Full demo: YouTube, loaded only on click ---------- */

export function DemoVideo({ demo }: { demo: NonNullable<CaseStudy['demo']> }) {
  const [playing, setPlaying] = useState(false)
  const watchUrl = `https://youtu.be/${demo.youtubeId}`

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-fg2 uppercase">
        <span className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-red-500" aria-hidden /> {demo.title}
        </span>
        <span className="tabular-nums">{demo.duration}</span>
      </div>
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${demo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={demo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${demo.title} (${demo.duration})`}
            className="group absolute inset-0 block size-full"
          >
            <img src={demo.poster} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <span aria-hidden className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/20" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="flex flex-col items-center gap-4">
                <span className="grid size-20 place-items-center rounded-full bg-gold text-bg shadow-2xl shadow-black/50 transition-transform duration-300 group-hover:scale-110 sm:size-24">
                  <Play size={30} className="translate-x-0.5 fill-bg" />
                </span>
                <span className="rounded-full bg-black/55 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-white uppercase backdrop-blur">
                  Play full demo · {demo.duration}
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 text-xs text-fg2">
        <span>{demo.caption ?? 'Plays from YouTube.'}</span>
        <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-[11px] text-gold hover:underline">
          Watch on YouTube <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  )
}
