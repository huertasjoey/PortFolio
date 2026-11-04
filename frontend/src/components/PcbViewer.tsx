import { useState } from 'react'
import type { Project } from '../types'
import { ModelViewer } from './ModelViewer'
import { ZoomableImage } from './ZoomableImage'

type Pcb = NonNullable<Project['caseStudy']['pcb']>

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
          <ModelViewer {...pcb.model} />
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
