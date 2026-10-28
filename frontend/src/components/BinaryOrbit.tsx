import { useEffect, useRef } from 'react'

type RGB = [number, number, number]

interface Star {
  r: number // distance from the core (px)
  a: number // angle in the disc
  z: number // slight vertical scatter (px)
  spin: number // multiplier on the galaxy's rotation speed
}

// Core (white-lilac) -> lavender -> deep purple, by distance from the centre.
const DARK_PALETTE: RGB[] = [
  [255, 246, 255],
  [238, 222, 255],
  [212, 192, 255],
  [186, 160, 255],
  [156, 126, 250],
  [128, 98, 238],
  [104, 76, 220],
]
// On a light page the stars are drawn darker so they stay visible.
const LIGHT_PALETTE: RGB[] = [
  [74, 40, 170],
  [82, 48, 178],
  [90, 58, 188],
  [100, 68, 198],
  [110, 80, 208],
  [120, 92, 216],
  [132, 106, 224],
]

const TILT = 0.46 // how flat the disc looks (1 = face on)
const PHI = -0.14 // slight rotation of the whole disc on screen
const ALPHAS = [0.4, 0.9]

const gauss = () => {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/**
 * "Binary Orbit": a slowly turning spiral galaxy made of thousands of tiny stars, with a bright
 * core and purple arms. Theme-aware, eases toward the pointer, and is a still frame when reduced
 * motion is on.
 */
export function BinaryOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let w = 0
    let h = 0
    let R = 0
    let stars: Star[] = []
    let buckets: number[][] = []
    let sparkles: { i: number; phase: number; speed: number }[] = []
    let light = false
    let raf = 0
    let last = 0
    let t = 0
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    // soft glow used for the brightest stars
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 48
    const sctx = sprite.getContext('2d')!
    const sg = sctx.createRadialGradient(24, 24, 0, 24, 24, 24)
    sg.addColorStop(0, 'rgba(255,255,255,1)')
    sg.addColorStop(0.18, 'rgba(235,220,255,0.7)')
    sg.addColorStop(1, 'rgba(180,150,255,0)')
    sctx.fillStyle = sg
    sctx.fillRect(0, 0, 48, 48)

    const readTheme = () => {
      light = document.documentElement.dataset.theme === 'light'
    }

    const build = () => {
      if (w < 2 || h < 2) {
        stars = []
        buckets = []
        sparkles = []
        return // not laid out yet; the ResizeObserver calls resize() again once it has a size
      }
      R = Math.min(w, h * 1.7) * 0.44
      const count = Math.round(Math.min(13000, Math.max(6500, (w * h) / 100)))
      stars = []
      for (let i = 0; i < count; i++) {
        const kind = Math.random()
        let r: number
        let a: number
        let spin = 1
        if (kind < 0.2) {
          // bright bulge around the core
          r = R * 0.2 * Math.abs(gauss())
          a = Math.random() * Math.PI * 2
          spin = 1.8
        } else if (kind < 0.9) {
          // two spiral arms; fuzzier toward the rim
          r = R * (0.05 + 0.95 * Math.pow(Math.random(), 1.12))
          const arm = Math.random() < 0.5 ? 0 : Math.PI
          const t01 = r / R
          a = arm + t01 * 5.0 + gauss() * (0.04 + 0.12 * t01)
        } else {
          // faint scattered halo
          r = R * (0.1 + 0.95 * Math.random())
          a = Math.random() * Math.PI * 2
        }
        stars.push({ r, a, z: gauss() * R * 0.012, spin })
      }

      // group stars into colour/brightness buckets so each frame sets fillStyle only a few times
      buckets = Array.from({ length: DARK_PALETTE.length * ALPHAS.length }, () => [])
      stars.forEach((s, i) => {
        const t01 = R > 0 ? Math.min(1, s.r / R) : 0
        const ci = Math.min(DARK_PALETTE.length - 1, Math.floor(Math.pow(t01, 0.8) * DARK_PALETTE.length))
        const bright = Math.random() < 0.34 + 0.46 * (1 - t01) ? 1 : 0
        buckets[ci * ALPHAS.length + bright].push(i)
      })
      sparkles = Array.from({ length: Math.round(count / 45) }, () => ({
        i: Math.floor(Math.random() * stars.length),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.6,
      }))
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

    const cosP = Math.cos(PHI)
    const sinP = Math.sin(PHI)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      if (!stars.length) return
      const cx = w * 0.5 + pointer.x
      const cy = h * 0.46 + pointer.y
      const spinNow = t * 0.05 // radians per second

      // ---- core and arm glow (additive on dark, normal blend on light)
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter'
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(PHI)
      ctx.scale(1, TILT + 0.12)
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.62)
      if (light) {
        glow.addColorStop(0, 'rgba(120,90,230,0.30)')
        glow.addColorStop(0.3, 'rgba(140,110,240,0.14)')
        glow.addColorStop(1, 'rgba(160,130,250,0)')
      } else {
        glow.addColorStop(0, 'rgba(255,244,255,0.62)')
        glow.addColorStop(0.1, 'rgba(226,206,255,0.36)')
        glow.addColorStop(0.38, 'rgba(120,92,236,0.16)')
        glow.addColorStop(1, 'rgba(80,60,200,0)')
      }
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, 0, R * 0.62, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // ---- stars
      const pal = light ? LIGHT_PALETTE : DARK_PALETTE
      const alphaBoost = light ? 1 : 1
      for (let b = 0; b < buckets.length; b++) {
        const list = buckets[b]
        if (!list.length) continue
        const c = pal[Math.floor(b / ALPHAS.length)]
        const bright = b % ALPHAS.length
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${ALPHAS[bright] * alphaBoost})`
        const size = bright ? 1.6 : 1.1
        for (let k = 0; k < list.length; k++) {
          const s = stars[list[k]]
          const ang = s.a + spinNow * s.spin
          const x0 = s.r * Math.cos(ang)
          const y0 = s.r * Math.sin(ang) * TILT
          ctx.fillRect(cx + x0 * cosP - y0 * sinP, cy + x0 * sinP + y0 * cosP + s.z, size, size)
        }
      }

      // ---- twinkling bright stars
      if (!light) {
        for (const sp of sparkles) {
          const s = stars[sp.i]
          const ang = s.a + spinNow * s.spin
          const x0 = s.r * Math.cos(ang)
          const y0 = s.r * Math.sin(ang) * TILT
          const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * sp.speed + sp.phase))
          ctx.globalAlpha = tw * 0.9
          ctx.drawImage(sprite, cx + x0 * cosP - y0 * sinP - 8, cy + x0 * sinP + y0 * cosP + s.z - 8, 16, 16)
        }
        ctx.globalAlpha = 1
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      t += dt
      pointer.x += (target.x - pointer.x) * Math.min(1, dt * 2.2)
      pointer.y += (target.y - pointer.y) * Math.min(1, dt * 2.2)
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
      target.x = (e.clientX / window.innerWidth - 0.5) * 36
      target.y = (e.clientY / window.innerHeight - 0.5) * 24
      if (reduced.matches) {
        pointer.x = target.x
        pointer.y = target.y
        draw()
      }
    }

    readTheme()
    resize()
    start()

    const themeObserver = new MutationObserver(() => {
      readTheme()
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

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full opacity-40 sm:opacity-60 lg:opacity-100 print:hidden" />
}
