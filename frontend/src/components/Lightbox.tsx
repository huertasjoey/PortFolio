import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface LightboxSlide {
  src: string
  alt: string
  caption?: string
}

interface Props {
  slides: LightboxSlide[]
  /** Index of the open image, or null when closed. */
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}

const round =
  'grid size-12 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-white/60 disabled:pointer-events-none disabled:opacity-25'

/** Full-screen image viewer. Esc, backdrop click or X closes; ← → keys, buttons or a swipe change image. */
export function Lightbox({ slides, index, onChange, onClose }: Props) {
  const open = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const last = slides.length - 1
  const many = slides.length > 1
  const current = index ?? 0

  // Lock page scroll and focus the close button while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Keyboard: capture phase so Esc closes only this viewer, not a dialog behind it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        onClose()
      } else if (e.key === 'ArrowRight' && many) {
        e.preventDefault()
        e.stopImmediatePropagation()
        if (current < last) onChange(current + 1)
      } else if (e.key === 'ArrowLeft' && many) {
        e.preventDefault()
        e.stopImmediatePropagation()
        if (current > 0) onChange(current - 1)
      } else if (e.key === 'Tab') {
        // keep focus on the viewer's own buttons
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-lightbox-btn]:not(:disabled)'))
        if (!buttons.length) return
        e.preventDefault()
        const i = buttons.indexOf(document.activeElement as HTMLButtonElement)
        const next = e.shiftKey ? (i <= 0 ? buttons.length - 1 : i - 1) : (i + 1) % buttons.length
        buttons[next].focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open, current, last, many, onChange, onClose])

  // Warm the cache for the neighbouring images so Next / Prev feel instant.
  useEffect(() => {
    if (!open) return
    for (const i of [current - 1, current + 1]) {
      if (slides[i]) new Image().src = slides[i].src
    }
  }, [open, current, slides])

  const slide = slides[current]

  return createPortal(
    <AnimatePresence>
      {open && slide && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={slide.alt}
          className="fixed inset-0 z-[70] flex cursor-zoom-out flex-col items-center justify-center bg-black/95 px-3 pt-16 pb-24 sm:px-24 sm:pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null || !many) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            if (Math.abs(dx) < 50) return
            if (dx < 0 && current < last) onChange(current + 1)
            if (dx > 0 && current > 0) onChange(current - 1)
          }}
        >
          <button
            ref={closeRef}
            data-lightbox-btn
            type="button"
            aria-label="Close image"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className={`${round} fixed top-4 right-4 z-10 cursor-pointer`}
          >
            <X size={20} />
          </button>

          {many && (
            <>
              <button
                data-lightbox-btn
                type="button"
                aria-label="Previous image"
                disabled={current === 0}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(current - 1)
                }}
                className={`${round} fixed bottom-4 left-4 z-10 cursor-pointer sm:top-1/2 sm:bottom-auto sm:left-6 sm:-translate-y-1/2`}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                data-lightbox-btn
                type="button"
                aria-label="Next image"
                disabled={current === last}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(current + 1)
                }}
                className={`${round} fixed right-4 bottom-4 z-10 cursor-pointer sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2`}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full cursor-default rounded-lg object-contain"
          />

          <div className="fixed inset-x-0 bottom-5 z-10 px-20 text-center" onClick={(e) => e.stopPropagation()}>
            {slide.caption && <p className="font-mono text-xs text-white/80">{slide.caption}</p>}
            {many && (
              <p aria-live="polite" className="mt-1 font-mono text-[11px] tracking-widest text-white/50">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
