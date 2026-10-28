import { useEffect, useRef } from 'react'

type RGB = [number, number, number]

interface Streak {
  ang: number // radians from straight up
  d: number // distance travelled from the origin (px)
  max: number // distance at which it has fully faded
  speed: number // px per second
  len: number // tail length (px)
  size: number // head radius (px)
  bright: number // 0.4 … 1
}

const DARK = { line: [128, 100, 245] as RGB, head: [240, 214, 255] as RGB, boost: 1 }
const LIGHT = { line: [92, 62, 200] as RGB, head: [78, 46, 180] as RGB, boost: 0.85 }
const SEGMENTS = 5
const OPACITY = 0.9 // overall strength, kept low so the text stays the star of the page

/**
 * "Fading Stars": points of light fly up and outward from the bottom centre, each leaving a thin
 * streak that fades to nothing. Quiet by design (slow, dim). Theme-aware, eases toward the pointer,
 * and is a single still frame when reduced motion is on.
 */
export function FadingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let w = 0
    let h = 0
    let streaks: Streak[] = []
    let light = false
    let raf = 0
    let last = 0
    const pointer = { x: 0 }
    const target = { x: 0 }

    // soft glow for each head
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 32
    const sctx = sprite.getContext('2d')!
    const g = sctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(255,255,255,0.45)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    sctx.fillStyle = g
    sctx.fillRect(0, 0, 32, 32)

    const spawn = (s: Streak, fresh: boolean) => {
      s.ang = (Math.random() - 0.5) * Math.PI * 0.92
      s.max = h * (0.45 + Math.random() * 0.75)
      s.speed = 22 + Math.random() * 46
      s.len = 70 + Math.random() * 230
      s.size = 0.9 + Math.random() * 1.5
      s.bright = 0.4 + Math.random() * 0.6
      s.d = fresh ? Math.random() * s.max : 0
    }

    const build = () => {
      if (w < 2 || h < 2) {
        streaks = []
        return // not laid out yet; the ResizeObserver calls resize() again once it has a size
      }
      const count = Math.round(Math.min(300, Math.max(120, w / 5)))
      streaks = Array.from({ length: count }, () => {
        const s = {} as Streak
        spawn(s, true)
        return s
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      if (!streaks.length) return
      const pal = light ? LIGHT : DARK
      const ox = w * 0.5 + pointer.x
      const oy = h * 1.02
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter'
      ctx.lineCap = 'round'

      for (const s of streaks) {
        const p = s.d / s.max // 0 → 1 over the streak's life
        // fade in quickly, hold, then fade out toward the end of its travel
        const env = Math.min(1, p * 6) * Math.pow(1 - p, 0.8)
        if (env <= 0.01) continue
        const sin = Math.sin(s.ang)
        const cos = Math.cos(s.ang)
        const hx = ox + sin * s.d
        const hy = oy - cos * s.d
        const tail = Math.min(s.len, s.d)
        const a = env * s.bright * OPACITY * pal.boost

        // tail: a few segments, each fainter than the last, running back toward the origin
        ctx.lineWidth = 1
        for (let i = 0; i < SEGMENTS; i++) {
          const t0 = i / SEGMENTS
          const t1 = (i + 1) / SEGMENTS
          const fade = Math.pow(1 - (t0 + t1) / 2, 1.7)
          ctx.strokeStyle = `rgba(${pal.line[0]},${pal.line[1]},${pal.line[2]},${a * 0.9 * fade})`
          ctx.beginPath()
          ctx.moveTo(hx - sin * tail * t0, hy + cos * tail * t0)
          ctx.lineTo(hx - sin * tail * t1, hy + cos * tail * t1)
          ctx.stroke()
        }

        // head
        const r = s.size * 5
        ctx.globalAlpha = Math.min(1, a * 1.15)
        ctx.drawImage(sprite, hx - r, hy - r, r * 2, r * 2)
        ctx.globalAlpha = 1
        ctx.fillStyle = `rgba(${pal.head[0]},${pal.head[1]},${pal.head[2]},${Math.min(1, a * 1.6)})`
        ctx.beginPath()
        ctx.arc(hx, hy, s.size * 0.7, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      pointer.x += (target.x - pointer.x) * Math.min(1, dt * 2)
      for (const s of streaks) {
        s.d += s.speed * dt
        if (s.d >= s.max) spawn(s, false)
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (reduced.matches || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 90
      if (reduced.matches) {
        pointer.x = target.x
        draw()
      }
    }

    light = document.documentElement.dataset.theme === 'light'
    resize()
    start()

    const themeObserver = new MutationObserver(() => {
      light = document.documentElement.dataset.theme === 'light'
      draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', start)
    reduced.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', start)
      reduced.removeEventListener('change', start)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full print:hidden" />
}
