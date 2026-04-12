'use client'

import { useEffect, useRef } from 'react'

// ── Visual constants ──────────────────────────────────────────────────────────
const CELL      = 18                        // grid pitch px
const CORNER_R  = 6                         // arcTo corner radius px
const BG        = '#050f05'                 // dark PCB substrate
const DOT       = 'rgba(0,55,0,0.55)'       // substrate via-holes grid
const COPPER    = '#c8752a'                 // trace fill
const GLOW_COL  = '#ff9944'                 // shadow glow colour
const CPU_DARK  = '#0a0a0a'
const PAD_COL   = '#c0c0c0'                 // SMD silver pads
const VIA_GOLD  = '#d4a843'

interface Pt { gx: number; gy: number }

// ── Grid-based path builder ───────────────────────────────────────────────────
function buildPaths(
  cols: number, rows: number,
  cgx: number, cgy: number, cgw: number, cgh: number,
): Pt[][] {
  const key = (x: number, y: number) => `${x},${y}`
  const occ = new Set<string>()

  // Block CPU die + 2-cell clearance
  for (let x = cgx - 2; x <= cgx + cgw + 1; x++)
    for (let y = cgy - 2; y <= cgy + cgh + 1; y++)
      occ.add(key(x, y))

  // Pin positions: every PIN_STEP cells along each edge
  const PIN_STEP = 3
  const topOffsets: number[] = []
  for (let i = PIN_STEP; i < cgw - 1; i += PIN_STEP) topOffsets.push(i)
  const sideOffsets: number[] = []
  for (let i = PIN_STEP; i < cgh - 1; i += PIN_STEP) sideOffsets.push(i)

  const pins: { gx: number; gy: number; dx: number; dy: number }[] = []
  topOffsets.forEach(o => {
    pins.push({ gx: cgx + o, gy: cgy - 1,      dx: 0,  dy: -1 })
    pins.push({ gx: cgx + o, gy: cgy + cgh,     dx: 0,  dy:  1 })
  })
  sideOffsets.forEach(o => {
    pins.push({ gx: cgx - 1,      gy: cgy + o,  dx: -1, dy: 0 })
    pins.push({ gx: cgx + cgw,    gy: cgy + o,  dx:  1, dy: 0 })
  })

  // Free pin cells from occupancy (they are path start points)
  pins.forEach(p => occ.delete(key(p.gx, p.gy)))

  return pins.map(pin => {
    const path: Pt[] = [{ gx: pin.gx, gy: pin.gy }]
    occ.add(key(pin.gx, pin.gy))
    let cx = pin.gx, cy = pin.gy, dx = pin.dx, dy = pin.dy
    let budget = 400

    while (budget-- > 0) {
      // Prefer straight (3× weight), allow perpendicular turns
      const opts: [number, number][] =
        dx !== 0
          ? [[dx, dy], [dx, dy], [dx, dy], [0, 1], [0, -1]]
          : [[dx, dy], [dx, dy], [dx, dy], [1, 0], [-1, 0]]

      for (let i = opts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0
        ;[opts[i], opts[j]] = [opts[j], opts[i]]
      }

      let moved = false
      for (const [ndx, ndy] of opts) {
        const nx = cx + ndx, ny = cy + ndy
        if (nx < 1 || nx >= cols - 1 || ny < 1 || ny >= rows - 1) continue
        if (occ.has(key(nx, ny))) continue
        occ.add(key(nx, ny))
        path.push({ gx: nx, gy: ny })
        dx = ndx; dy = ndy; cx = nx; cy = ny
        moved = true
        break
      }
      if (!moved) break
      if (cx <= 1 || cx >= cols - 2 || cy <= 1 || cy >= rows - 2) break
    }
    return path
  })
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const cpx = (gx: number) => (gx + 0.5) * CELL
const cpy = (gy: number) => (gy + 0.5) * CELL

/** Approximate pixel length of a path (straight segments — slight overestimate
 *  vs arcTo which trims corners; ensures full reveal before t reaches 1). */
function pathPxLen(pts: Pt[]): number {
  let l = 0
  for (let i = 1; i < pts.length; i++) {
    const dx = (pts[i].gx - pts[i - 1].gx) * CELL
    const dy = (pts[i].gy - pts[i - 1].gy) * CELL
    l += Math.sqrt(dx * dx + dy * dy)
  }
  return l
}

/** Draw path using arcTo for smooth rounded corners */
function tracePath(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  if (pts.length < 2) return
  ctx.beginPath()
  ctx.moveTo(cpx(pts[0].gx), cpy(pts[0].gy))
  for (let i = 1; i < pts.length - 1; i++) {
    ctx.arcTo(
      cpx(pts[i].gx), cpy(pts[i].gy),
      cpx(pts[i + 1].gx), cpy(pts[i + 1].gy),
      CORNER_R,
    )
  }
  ctx.lineTo(cpx(pts[pts.length - 1].gx), cpy(pts[pts.length - 1].gy))
  ctx.stroke()
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CircuitBoard() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const parent = canvas.parentElement!
    let raf = 0

    function init() {
      if (!canvas) return
      cancelAnimationFrame(raf)

      const W0 = parent.offsetWidth
      const H0 = parent.offsetHeight
      // Guard: if layout hasn't painted yet, dimensions will be 0 — skip
      if (!W0 || !H0) return

      canvas.width  = W0
      canvas.height = H0

      const W = canvas.width
      const H = canvas.height
      const ctx = canvas.getContext('2d')!

      const cols = Math.floor(W / CELL)
      const rows = Math.floor(H / CELL)

      // ── CPU size: 30% larger than original to fill more of the hero ─────
      const cpuPxW = Math.max(Math.min(W * 0.88, 1118), Math.min(W - 20, 936))
      const cpuPxH = Math.max(Math.min(H * 0.88, 676),  Math.min(H - 30, 520))
      const cgw    = Math.max(10, Math.floor(cpuPxW / CELL))
      const cgh    = Math.max(10, Math.floor(cpuPxH / CELL))
      const cgx    = Math.floor((cols - cgw) / 2)
      const cgy    = Math.floor((rows - cgh) / 2)

      // Pixel rect of the die
      const DX = cgx * CELL
      const DY = cgy * CELL
      const DW = cgw * CELL
      const DH = cgh * CELL

      // ── Build paths ───────────────────────────────────────────────────────
      const paths  = buildPaths(cols, rows, cgx, cgy, cgw, cgh)
      const lens   = paths.map(pathPxLen)
      const maxLen = Math.max(...lens, 1)

      // Stagger start times + durations proportional to path length
      const TOTAL_MS   = 3600   // ms for the longest trace
      const MAX_DELAY  = 700    // ms max stagger delay
      const delays     = paths.map(() => Math.random() * MAX_DELAY)
      const durations  = lens.map(l =>
        (l / maxLen) * TOTAL_MS * 0.75 + TOTAL_MS * 0.25,
      )
      const finishTime = MAX_DELAY + TOTAL_MS + 200

      // ── Re-derive pad positions for rendering ─────────────────────────────
      const PIN_STEP = 3
      const pads: { gx: number; gy: number; horiz: boolean }[] = []
      for (let i = PIN_STEP; i < cgw - 1; i += PIN_STEP) {
        pads.push({ gx: cgx + i, gy: cgy - 1,    horiz: false })
        pads.push({ gx: cgx + i, gy: cgy + cgh,   horiz: false })
      }
      for (let i = PIN_STEP; i < cgh - 1; i += PIN_STEP) {
        pads.push({ gx: cgx - 1,      gy: cgy + i, horiz: true })
        pads.push({ gx: cgx + cgw,    gy: cgy + i, horiz: true })
      }

      // ── Pre-draw substrate dot grid to offscreen canvas (static) ──────────
      const dotCanvas = document.createElement('canvas')
      dotCanvas.width  = W
      dotCanvas.height = H
      const dctx = dotCanvas.getContext('2d')!
      dctx.fillStyle = BG
      dctx.fillRect(0, 0, W, H)
      dctx.fillStyle = DOT
      for (let gx = 0; gx < cols; gx++)
        for (let gy = 0; gy < rows; gy++) {
          dctx.beginPath()
          dctx.arc((gx + 0.5) * CELL, (gy + 0.5) * CELL, 0.85, 0, Math.PI * 2)
          dctx.fill()
        }

      const t0 = performance.now()

      function frame(now: number) {
        const elapsed = now - t0

        // ── Background (blit pre-drawn dots) ─────────────────────────────
        ctx.drawImage(dotCanvas, 0, 0)

        // ── Traces ───────────────────────────────────────────────────────
        ctx.lineCap  = 'round'
        ctx.lineJoin = 'round'

        for (let i = 0; i < paths.length; i++) {
          const pts = paths[i]
          if (pts.length < 2) continue

          const tNorm = Math.max(0, Math.min(1,
            (elapsed - delays[i]) / durations[i],
          ))
          if (tNorm <= 0) continue

          // Progressive reveal via lineDashOffset:
          //   dash = full path length, gap = full path length (so pattern = [len, len])
          //   offset starts at `len` (fully hidden) and decreases to 0 (fully visible)
          // This approach works reliably in all browsers including WebKit/Blink on static exports.
          const len    = lens[i]
          const offset = len * (1 - tNorm)

          // ── Outer glow pass ───────────────────────────────────────────
          ctx.save()
          ctx.shadowColor    = GLOW_COL
          ctx.shadowBlur     = 14
          ctx.globalAlpha    = 0.6
          ctx.strokeStyle    = COPPER
          ctx.lineWidth      = 5
          ctx.setLineDash([len, len])
          ctx.lineDashOffset = offset
          tracePath(ctx, pts)
          ctx.restore()

          // ── Core trace ────────────────────────────────────────────────
          ctx.save()
          ctx.shadowColor    = GLOW_COL
          ctx.shadowBlur     = 5
          ctx.strokeStyle    = '#e09040'
          ctx.lineWidth      = 2.5
          ctx.setLineDash([len, len])
          ctx.lineDashOffset = offset
          tracePath(ctx, pts)
          ctx.restore()

          // ── Bright highlight (thin, on top) ───────────────────────────
          ctx.save()
          ctx.globalAlpha    = 0.35
          ctx.strokeStyle    = '#ffd090'
          ctx.lineWidth      = 1
          ctx.setLineDash([len, len])
          ctx.lineDashOffset = offset
          tracePath(ctx, pts)
          ctx.restore()

          // ── Via pad at terminus ───────────────────────────────────────
          if (tNorm >= 1) {
            const last = pts[pts.length - 1]
            const vx = cpx(last.gx), vy = cpy(last.gy)
            ctx.save()
            ctx.shadowColor = '#ffcc55'
            ctx.shadowBlur  = 14
            // outer ring
            ctx.fillStyle   = VIA_GOLD
            ctx.beginPath()
            ctx.arc(vx, vy, 5.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
            // centre hole
            ctx.fillStyle = '#111'
            ctx.beginPath()
            ctx.arc(vx, vy, 2.2, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        ctx.setLineDash([])   // reset after trace drawing

        // ── SMD pads ──────────────────────────────────────────────────────
        ctx.fillStyle = PAD_COL
        for (const p of pads) {
          const px2 = cpx(p.gx), py2 = cpy(p.gy)
          const pw = p.horiz ? 7 : 4.5
          const ph = p.horiz ? 4.5 : 7
          // slight metallic gradient per pad
          const g = ctx.createLinearGradient(px2 - pw, py2 - ph, px2 + pw, py2 + ph)
          g.addColorStop(0, '#d8d8d8')
          g.addColorStop(1, '#909090')
          ctx.fillStyle = g
          ctx.fillRect(px2 - pw / 2, py2 - ph / 2, pw, ph)
        }

        // ── CPU die ───────────────────────────────────────────────────────
        // Drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.75)'
        ctx.fillRect(DX + 10, DY + 10, DW, DH)

        // Body gradient
        const bg = ctx.createLinearGradient(DX, DY, DX + DW, DY + DH)
        bg.addColorStop(0,    '#1c1c1c')
        bg.addColorStop(0.35, '#141414')
        bg.addColorStop(1,    '#080808')
        ctx.fillStyle = bg
        ctx.fillRect(DX, DY, DW, DH)

        // Chamfered-corner highlight (top-left edge bright, bottom-right dark)
        ctx.strokeStyle = 'rgba(255,255,255,0.09)'
        ctx.lineWidth   = 1.5
        ctx.beginPath()
        ctx.moveTo(DX + 1, DY + DH - 1)
        ctx.lineTo(DX + 1, DY + 1)
        ctx.lineTo(DX + DW - 1, DY + 1)
        ctx.stroke()

        ctx.strokeStyle = 'rgba(0,0,0,0.6)'
        ctx.beginPath()
        ctx.moveTo(DX + DW - 1, DY + 1)
        ctx.lineTo(DX + DW - 1, DY + DH - 1)
        ctx.lineTo(DX + 1, DY + DH - 1)
        ctx.stroke()

        // Outer border
        ctx.strokeStyle = 'rgba(255,255,255,0.14)'
        ctx.lineWidth   = 1.5
        ctx.strokeRect(DX, DY, DW, DH)

        // Inset die area
        const ins = 14
        ctx.fillStyle = 'rgba(0,0,0,0.35)'
        ctx.fillRect(DX + ins, DY + ins, DW - ins * 2, DH - ins * 2)

        // Inner circuit grid (very faint)
        ctx.save()
        ctx.strokeStyle = 'rgba(255,255,255,0.018)'
        ctx.lineWidth   = 0.5
        ctx.setLineDash([2, 5])
        const gs = 22
        for (let x = DX + ins + gs; x < DX + DW - ins; x += gs) {
          ctx.beginPath(); ctx.moveTo(x, DY + ins); ctx.lineTo(x, DY + DH - ins); ctx.stroke()
        }
        for (let y = DY + ins + gs; y < DY + DH - ins; y += gs) {
          ctx.beginPath(); ctx.moveTo(DX + ins, y); ctx.lineTo(DX + DW - ins, y); ctx.stroke()
        }
        ctx.restore()

        // Pin-1 dot (top-left)
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.beginPath()
        ctx.arc(DX + 16, DY + 16, 4, 0, Math.PI * 2)
        ctx.fill()

        // Die label (bottom, very subtle)
        const fs = Math.max(9, Math.min(13, DW / 22))
        ctx.save()
        ctx.globalAlpha     = 0.09
        ctx.fillStyle       = '#ffffff'
        ctx.font            = `600 ${fs}px 'Courier New', monospace`
        ctx.textAlign       = 'center'
        ctx.textBaseline    = 'middle'
        ctx.fillText('RL · AI PROCESSOR', DX + DW / 2, DY + DH - 20)
        ctx.restore()

        // ── Vignette (darken edges, draw attention to centre) ─────────────
        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, H * 0.85)
        vig.addColorStop(0, 'rgba(0,0,0,0)')
        vig.addColorStop(1, 'rgba(0,0,0,0.45)')
        ctx.fillStyle = vig
        ctx.fillRect(0, 0, W, H)

        // Keep looping until animation finishes, then paint one final frame
        if (elapsed < finishTime) {
          raf = requestAnimationFrame(frame)
        }
      }

      raf = requestAnimationFrame(frame)
    }

    // ResizeObserver fires on initial layout AND on every resize — more reliable
    // than window 'resize' for a static export where the first paint may arrive
    // after useEffect runs and the canvas has zero dimensions.
    const ro = new ResizeObserver(() => init())
    ro.observe(parent)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
