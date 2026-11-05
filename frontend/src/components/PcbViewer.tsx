import { useState } from 'react'
import type { ImageView } from '../types'
import { ModelViewer } from './ModelViewer'
import { ZoomableImage } from './ZoomableImage'

interface Props {
  description: string
  views: ImageView[]
  /** Optional 3D model, shown as the first tab. */
  model?: { src: string; alt: string }
  /** Accessible name of the tab list. */
  label?: string
}

const frame = { cover: 'bg-card', contain: 'bg-white', natural: 'bg-white' }
const img = {
  cover: 'aspect-video w-full object-cover',
  contain: 'aspect-video w-full object-contain',
  natural: 'max-h-[80vh] w-full object-contain',
}

/** Tabbed viewer: a 3D tab (when a model is provided) plus 2D views such as a PCB layout, schematic or flowchart. */
export function PcbViewer({ description, views, model, label = 'PCB views' }: Props) {
  const tabs = [...(model ? ['3D'] : []), ...views.map((v) => v.label)]
  const [active, setActive] = useState(tabs[0])
  const view = views.find((v) => v.label === active)
  const fit = view?.fit ?? 'contain'

  return (
    <div className="space-y-4">
      <p>{description}</p>
      <div role="tablist" aria-label={label} className="inline-flex max-w-full flex-wrap rounded-lg border border-line bg-card p-1">
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
        {active === '3D' && model ? (
          <ModelViewer {...model} />
        ) : (
          view && (
            <ZoomableImage
              key={view.src}
              src={view.src}
              alt={view.alt}
              caption={view.caption}
              className={`w-full overflow-hidden rounded-xl border border-line ${frame[fit]}`}
              imgClassName={img[fit]}
            />
          )
        )}
        <figcaption className="mt-2 font-mono text-xs text-fg2">{active === '3D' && model ? model.alt : view?.caption}</figcaption>
      </figure>
    </div>
  )
}
