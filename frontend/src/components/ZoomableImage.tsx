import { Maximize2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  src: string
  alt: string
  /** Classes for the thumbnail <img>. */
  imgClassName?: string
  /** Classes for the clickable wrapper (size / positioning). */
  className?: string
  /** Optional caption shown under the full-screen image. */
  caption?: string
  closeLabel?: string
}

/** Thumbnail that opens full screen on click. Esc, click or the close button dismiss it. */
export function ZoomableImage({ src, alt, imgClassName = '', className = '', caption, closeLabel = 'Close image' }: Props) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    // Capture phase so Esc closes only this viewer, not a case-study dialog behind it.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        setOpen(false)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    const opener = openerRef.current
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [open])

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

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              className="fixed inset-0 z-[70] flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-black/95 p-3 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            >
              <button
                ref={closeRef}
                type="button"
                aria-label={closeLabel}
                onClick={() => setOpen(false)}
                className="fixed top-4 right-4 z-10 grid size-11 cursor-pointer place-items-center rounded-xl border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-white/50"
              >
                <X size={20} />
              </button>
              <motion.img
                src={src}
                alt={alt}
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="max-h-[calc(100dvh-4rem)] max-w-full rounded-lg object-contain"
              />
              {caption && <p className="font-mono text-xs text-white/70">{caption}</p>}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
