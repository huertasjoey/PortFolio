import { useEffect, useRef } from 'react'
import { hexToRgb, type RGB } from '../lib/color'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * A quiet web of drifting nodes joined by thin threads that fade with distance.
 * Fixed behind the page, theme-aware, and still (one drawn frame) when reduced motion is on.
 */
export function ThreadsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mouse = { x: -9999, y: -9999 }
    let nodes: Node[] = []
    let w = 0
    let h = 0
    let link = 140
    let fg: RGB = [255, 255, 255]
    let accent: RGB = [54, 136, 216]
    let strength = 0.2
    let raf = 0
    let last = 0

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      fg = hexToRgb(cs.getPropertyValue('--fg'), fg)
      accent = hexToRgb(cs.getPropertyValue('--accent'), accent)
      strength = document.documentElement.dataset.theme === 'light' ? 0.34 : 0.3
    }

    const seed = () => {
      const target = Math.min(110, Math.max(26, Math.round((w * h) / 13000)))
      const next: Node[] = []
      for (let i = 0; i < target; i++) {
        const a = Math.random() * Math.PI * 2
        const speed = 5 + Math.random() * 11 // px per second: slow and calm
        next.push({
          x: nodes[i]?.x ?? Math.random() * w,
          y: nodes[i]?.y ?? Math.random() * h,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
        })
      }
      nodes = next
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      link = Math.min(200, Math.max(115, Math.min(w, h) * 0.2))
      seed()
      draw()
    }

    const line = (x1: number, y1: number, x2: number, y2: number, rgb: RGB, alpha: number) => {
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > link * link) continue
          const t = 1 - Math.sqrt(d2) / link
          line(a.x, a.y, b.x, b.y, fg, Math.pow(t, 1.3) * strength)
        }
        // threads reach toward the cursor in the accent colour
        const mx = a.x - mouse.x
        const my = a.y - mouse.y
        const md = Math.sqrt(mx * mx + my * my)
        if (md < link * 1.35) line(a.x, a.y, mouse.x, mouse.y, accent, (1 - md / (link * 1.35)) * 0.45)
      }

      ctx.fillStyle = `rgba(${fg[0]},${fg[1]},${fg[2]},${strength * 1.6})`
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < -20) n.x = w + 20
        else if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        else if (n.y > h + 20) n.y = -20
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
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (reduced.matches) draw()
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
      if (reduced.matches) draw()
    }

    readColors()
    resize()
    start()

    const themeObserver = new MutationObserver(() => {
      readColors()
      draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', start)
    reduced.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', start)
      reduced.removeEventListener('change', start)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 print:hidden" />
}
