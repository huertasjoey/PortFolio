import { Maximize2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Lightbox } from './Lightbox'

interface Props {
  src: string
  alt: string
  /** Classes for the thumbnail <img>. */
  imgClassName?: string
  /** Classes for the clickable wrapper (size / positioning). */
  className?: string
  /** Optional caption shown under the full-screen image. */
  caption?: string
}

/** Thumbnail that opens one image full screen on click. */
export function ZoomableImage({ src, alt, imgClassName = '', className = '', caption }: Props) {
  const [open, setOpen] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`View ${alt} full screen`}
        className={`group/zoom relative block cursor-zoom-in ${className}`}
      >
        <img src={src} alt={alt} decoding="async" className={imgClassName} />
        <span
          aria-hidden
          className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-lg border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur transition group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 max-sm:opacity-100"
        >
          <Maximize2 size={16} />
        </span>
      </button>
      <Lightbox
        slides={[{ src, alt, caption }]}
        index={open ? 0 : null}
        onChange={() => {}}
        onClose={() => {
          setOpen(false)
          openerRef.current?.focus()
        }}
      />
    </>
  )
}
