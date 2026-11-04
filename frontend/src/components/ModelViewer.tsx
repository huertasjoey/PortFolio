import { Box, Loader2, Move3d } from 'lucide-react'
import { createElement, useEffect, useRef, useState } from 'react'

type ModelState = 'loading' | 'ready' | 'error'

interface Props {
  src: string
  alt: string
  /** Starting camera angle, model-viewer syntax, e.g. '30deg 60deg auto'. */
  orbit?: string
}

type View = { label: string; src: string; alt: string; caption: string }

/** Several models behind a tab switcher, e.g. finished prototype vs bare frame. */
export function ModelTabs({ views, orbit }: { views: View[]; orbit?: string }) {
  const [active, setActive] = useState(0)
  const view = views[active]

  return (
    <div className="space-y-4">
      {views.length > 1 && (
        <div role="tablist" aria-label="3D models" className="inline-flex rounded-lg border border-line bg-card p-1">
          {views.map((v, i) => (
            <button
              key={v.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`min-h-9 rounded-md px-4 font-mono text-xs tracking-wide transition ${
                i === active ? 'bg-gold text-bg' : 'text-fg2 hover:text-fg'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      <figure role="tabpanel" aria-label={view.label}>
        <ModelViewer key={view.src} src={view.src} alt={view.alt} orbit={orbit} />
        <figcaption className="mt-2 font-mono text-xs text-fg2">{view.caption}</figcaption>
      </figure>
    </div>
  )
}

/** Interactive .glb viewer. <model-viewer> is ~1 MB, so it is only fetched when one is shown. */
export function ModelViewer({ src, alt, orbit = '30deg 60deg auto' }: Props) {
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
        'camera-orbit': orbit,
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
            The 3D model couldn’t be loaded.
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
