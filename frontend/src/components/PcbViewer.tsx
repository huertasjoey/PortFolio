import { Box, Loader2, Move3d } from 'lucide-react'
import { createElement, useEffect, useRef, useState } from 'react'
import type { Project } from '../types'
import { ZoomableImage } from './ZoomableImage'

type Pcb = NonNullable<Project['caseStudy']['pcb']>
type ModelState = 'loading' | 'ready' | 'error'

/** <model-viewer> is ~1 MB, so it is only fetched once someone opens the 3D tab. */
function Model3D({ src, alt }: NonNullable<Pcb['model']>) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<ModelState>('loading')

  useEffect(() => {
    let alive = true
    // Draco-compressed models are decoded with the copy in public/draco/. model-viewer reads this
    // global config when it loads, so it has to be set before the import.
    const w = window as Window & { ModelViewerElement?: Record<string, string> }
    w.ModelViewerElement = { ...w.ModelViewerElement, dracoDecoderLocation: '/draco/' }
    import('@google/model-viewer').catch(() => alive && setState('error'))
    const el = ref.current
    const onLoad = () => setState('ready')
    const onError = () => setState('error')
    el?.addEventListener('load', onLoad)
    el?.addEventListener('error', onError)
    return () => {
      alive = false
      el?.removeEventListener('load', onLoad)
      el?.removeEventListener('error', onError)
    }
  }, [src])

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-card sm:aspect-video">
      {createElement('model-viewer', {
        ref,
        src,
        alt,
        'camera-controls': '',
        'touch-action': 'pan-y',
        'auto-rotate': '',
        'auto-rotate-delay': '1500',
        'interaction-prompt': 'none',
        'shadow-intensity': '1',
        exposure: '1.1',
        'camera-orbit': '30deg 60deg auto',
        style: { width: '100%', height: '100%', background: 'transparent' },
      })}
      {state === 'loading' && (
        <div className="absolute inset-0 grid place-items-center text-sm text-fg2">
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading 3D model…
          </span>
        </div>
      )}
      {state === 'error' && (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-fg2">
          <span className="flex flex-col items-center gap-2">
            <Box size={22} className="text-muted" />
            The 3D model couldn’t be loaded. Try the Layout or Schematic view.
          </span>
        </div>
      )}
      {state === 'ready' && (
        <p className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-bg/80 px-2.5 py-1 font-mono text-[11px] text-fg2 backdrop-blur">
          <Move3d size={13} /> Drag to rotate · scroll or pinch to zoom
        </p>
      )}
    </div>
  )
}

/** PCB section: a 3D tab (when a model is provided) plus 2D views such as the layout and schematic. */
export function PcbViewer({ pcb }: { pcb: Pcb }) {
  const tabs = [...(pcb.model ? ['3D'] : []), ...pcb.views.map((v) => v.label)]
  const [active, setActive] = useState(tabs[0])
  const view = pcb.views.find((v) => v.label === active)

  return (
    <div className="space-y-4">
      <p>{pcb.description}</p>
      <div role="tablist" aria-label="PCB views" className="inline-flex rounded-lg border border-line bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={t === active}
            onClick={() => setActive(t)}
            className={`min-h-9 rounded-md px-4 font-mono text-xs tracking-wide transition ${
              t === active ? 'bg-gold text-bg' : 'text-fg2 hover:text-fg'
            }`}
          >
            {t === '3D' ? '3D view' : t}
          </button>
        ))}
      </div>
      <figure role="tabpanel" aria-label={active}>
        {active === '3D' && pcb.model ? (
          <Model3D {...pcb.model} />
        ) : (
          view && (
            <ZoomableImage
              src={view.src}
              alt={view.alt}
              caption={view.caption}
              className={`w-full overflow-hidden rounded-xl border border-line ${view.fit === 'cover' ? 'bg-card' : 'bg-white'}`}
              imgClassName={`aspect-video w-full ${view.fit === 'cover' ? 'object-cover' : 'object-contain'}`}
            />
          )
        )}
        <figcaption className="mt-2 font-mono text-xs text-fg2">
          {active === '3D' && pcb.model ? pcb.model.alt : view?.caption}
        </figcaption>
      </figure>
    </div>
  )
}
