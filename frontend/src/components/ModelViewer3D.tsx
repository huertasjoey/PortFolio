import { createElement, useEffect, useState } from 'react'

interface Props {
  src: string
  poster: string
  alt: string
}

/**
 * Interactive 3D model (drag to rotate, scroll or pinch to zoom). The <model-viewer> library is
 * loaded only when this component mounts, so pages without a 3D model never download it.
 * Draco-compressed models are decoded with the copy of the decoder in public/draco/.
 */
export function ModelViewer3D({ src, poster, alt }: Props) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    // model-viewer reads this global config when it loads, so it must be set before the import.
    const w = window as Window & { ModelViewerElement?: Record<string, string> }
    w.ModelViewerElement = { ...w.ModelViewerElement, dracoDecoderLocation: '/draco/' }
    import('@google/model-viewer')
      .then(() => {
        if (alive) setReady(true)
      })
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-card">
      {ready && !failed ? (
        createElement('model-viewer', {
          src,
          poster,
          alt,
          'camera-controls': true,
          'auto-rotate': true,
          'auto-rotate-delay': '1500',
          'rotation-per-second': '18deg',
          'camera-orbit': '-30deg 55deg 78%',
          'shadow-intensity': '1',
          exposure: '1.05',
          'interaction-prompt': 'none',
          'touch-action': 'pan-y',
          style: { width: '100%', height: '100%', backgroundColor: 'transparent' },
        })
      ) : (
        <img src={poster} alt={alt} className="size-full object-contain" />
      )}
      <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px] tracking-wider text-muted">
        {failed ? '3D viewer unavailable — showing a render' : 'Drag to rotate · scroll to zoom'}
      </p>
    </div>
  )
}
