'use client'

import { useEffect, useRef } from 'react'

// ── Visual constants ─────────────────────────────────────────────────────────
const CELL        = 20          // grid cell size in px
const BG          = '#051505'   // dark PCB green
const COPPER      = '#b87333'   // copper trace colour
const COPPER_DIM  = '#7a4e22'   // slightly dimmer copper
const VIA         = '#d4a843'   // via pad gold
const CPU_FILL    = '#0c0c0c'   // CPU die (black)
const CPU_BORDER  = '#2d2d2d'   // CPU edge highlight
const PIN_COL     = '#b0b0b0'   // SMD pad silver
const DOT_COL     = 'rgba(0,70,0,0.55)' // PCB substrate dots

interface Pt { x: number; y: number }

// ── Path builder ─────────────────────────────────────────────────────────────
function buildPaths(
  cols: number,
  rows: number,
  cpuX: number,
  cpuY: number,
  cpuW: number,
  cpuH: number,
): Pt[][] {
  const k         = (x: number, y: number) => `${x},${y}`
  const occupied  = new Set<string>()

  // Block CPU body + 1-cell clearance buffer
  for (let x = cpuX - 2; x <= cpuX + cpuW + 1; x++)
    for (let y = cpuY - 2; y <= cpuY + cpuH + 1; y++)
      occupied.add(k(x, y))

  // ── Pin layout ────────────────────────────────────────────────────────────
  const pinsH = Math.max(4, Math.floor(cpuH / 3))   // pins on left/right side
  const pinsW = Math.max(4, Math.floor(cpuW / 3))   // pins on top/bottom

  const linspace = (count: number, len: number) =>
    Array.from({ length: count }, (_, i) =>
      Math.round(1 + (i * (len - 2)) / Math.max(1, count - 1)),
    )

  const pins: { sx: number; sy: number; dx: number; dy: number }[] = []

  linspace(pinsW, cpuW).forEach(o => {
    pins.push({ sx: cpuX + o, sy: cpuY - 1,     dx:  0, dy: -1 }) // top
    pins.push({ sx: cpuX + o, sy: cpuY + cpuH,  dx:  0, dy:  1 }) // bottom
  })
  linspace(pinsH, cpuH).forEach(o => {
    pins.push({ sx: cpuX - 1,      sy: cpuY + o, dx: -1, dy: 0 }) // left
    pins.push({ sx: cpuX + cpuW,   sy: cpuY + o, dx:  1, dy: 0 }) // right
  })

  // Allow pin cells (they start unblocked so the trace can begin there)
  pins.forEach(p => occupied.delete(k(p.sx, p.sy)))

  // ── Random-walk path builder ──────────────────────────────────────────────
  const paths: Pt[][] = pins.map(pin => {
    const path: Pt[] = [{ x: pin.sx, y: pin.sy }]
    occupied.add(k(pin.sx, pin.sy))

    let cx = pin.sx, cy = pin.sy
    let dx = pin.dx, dy = pin.dy
    let budget = 400

    while (budget-- > 0) {
      // Option list: prefer current direction (2× weight), allow perpendicular turns
      const opts: [number, number][] =
        dx !== 0
          ? [[dx, dy], [dx, dy],  [0, 1],  [0, -1]]
          : [[dx, dy], [dx, dy],  [1, 0], [-1,  0]]

      // Fisher-Yates shuffle
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[opts[i], opts[j]] = [opts[j], opts[i]]
      }

      let moved = false
      for (const [ndx, ndy] of opts) {
        const nx = cx + ndx
        const ny = cy + ndy
        if (nx < 1 || nx >= cols - 1 || ny < 1 || ny >= rows - 1) continue
        if (occupied.has(k(nx, ny))) continue

        occupied.add(k(nx, ny))
        path.push({ x: nx, y: ny })
        dx = ndx; dy = ndy
        cx = nx;  cy = ny
        moved = true
        break
      }

      if (!moved) break
      // Stop when the trace reaches the outer 1-cell margin
      if (cx <= 1 || cx >= cols - 2 || cy <= 1 || cy >= rows - 2) break
    }

    return path
  })

  return paths
}

// ── Component ────────────────────────────────────────────────────────────────
export default function CircuitBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!

    let raf = 0

    function init() {
      if (!canvas) return
      cancelAnimationFrame(raf)

      // Match canvas pixel dimensions to parent layout dimensions
      canvas.width  = parent.offsetWidth
      canvas.height = parent.offsetHeight

      const W    = canvas.width
      const H    = canvas.height
      const ctx  = canvas.getContext('2d')!
      const cols = Math.floor(W / CELL)
      const rows = Math.floor(H / CELL)

      // ── CPU geometry (grid cells) ─────────────────────────────────────────
      // Keep a sensible aspect ratio; tall enough to suggest housing the text
      const cpuW = Math.max(8, Math.round(cols * 0.18))
      const cpuH = Math.max(8, Math.round(rows * 0.62))
      const cpuX = Math.floor((cols - cpuW) / 2)
      const cpuY = Math.floor((rows - cpuH) / 2)

      // ── Build paths (randomised on every call → every resize / page load) ─
      const paths = buildPaths(cols, rows, cpuX, cpuY, cpuW, cpuH)

      // ── Pin list (re-derived identically for drawing) ─────────────────────
      const pinsH = Math.max(4, Math.floor(cpuH / 3))
      const pinsW = Math.max(4, Math.floor(cpuW / 3))
      const ls    = (count: number, len: number) =>
        Array.from({ length: count }, (_, i) =>
          Math.round(1 + (i * (len - 2)) / Math.max(1, count - 1)),
        )
      const pins: { sx: number; sy: number }[] = []
      ls(pinsW, cpuW).forEach(o => {
        pins.push({ sx: cpuX + o, sy: cpuY - 1    })
        pins.push({ sx: cpuX + o, sy: cpuY + cpuH })
      })
      ls(pinsH, cpuH).forEach(o => {
        pins.push({ sx: cpuX - 1,     sy: cpuY + o })
        pins.push({ sx: cpuX + cpuW,  sy: cpuY + o })
      })

      const maxLen = Math.max(...paths.map(p => p.length))
      let step = 0
      const SPEED = 1 // cells advanced per frame — lower = slower reveal

      // ── Draw one frame ────────────────────────────────────────────────────
      function drawFrame(upTo: number) {
        // Background
        ctx.fillStyle = BG
        ctx.fillRect(0, 0, W, H)

        // PCB substrate dot grid
        ctx.fillStyle = DOT_COL
        for (let gx = 0; gx < cols; gx++)
          for (let gy = 0; gy < rows; gy++) {
            ctx.beginPath()
            ctx.arc((gx + 0.5) * CELL, (gy + 0.5) * CELL, 0.9, 0, Math.PI * 2)
            ctx.fill()
          }

        // ── Copper traces ─────────────────────────────────────────────────
        for (const path of paths) {
          const end = Math.min(upTo, path.length - 1)
          if (end < 1) continue

          ctx.strokeStyle = COPPER
          ctx.lineWidth   = 3
          ctx.lineCap     = 'square'
          ctx.lineJoin    = 'miter'
          ctx.beginPath()
          ctx.moveTo((path[0].x + 0.5) * CELL, (path[0].y + 0.5) * CELL)
          for (let i = 1; i <= end; i++)
            ctx.lineTo((path[i].x + 0.5) * CELL, (path[i].y + 0.5) * CELL)
          ctx.stroke()

          // Dim "tail" segment while still growing (leading edge effect)
          if (end < path.length - 1) {
            const tip = path[end]
            ctx.strokeStyle = COPPER_DIM
            ctx.lineWidth   = 2
            ctx.beginPath()
            ctx.moveTo((path[end > 0 ? end - 1 : 0].x + 0.5) * CELL, (path[end > 0 ? end - 1 : 0].y + 0.5) * CELL)
            ctx.lineTo((tip.x + 0.5) * CELL, (tip.y + 0.5) * CELL)
            ctx.stroke()
          }

          // Via pad at terminus
          if (end === path.length - 1 && path.length > 2) {
            const last = path[end]
            const cx   = (last.x + 0.5) * CELL
            const cy   = (last.y + 0.5) * CELL
            ctx.fillStyle   = VIA
            ctx.strokeStyle = '#111'
            ctx.lineWidth   = 1.5
            ctx.beginPath()
            ctx.arc(cx, cy, 4.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            // Hole
            ctx.fillStyle = '#222'
            ctx.beginPath()
            ctx.arc(cx, cy, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // ── SMD pads ──────────────────────────────────────────────────────
        ctx.fillStyle = PIN_COL
        for (const p of pins) {
          const px = (p.sx + 0.5) * CELL
          const py = (p.sy + 0.5) * CELL
          ctx.fillRect(px - 3.5, py - 3.5, 7, 7)
        }

        // ── CPU die ───────────────────────────────────────────────────────
        const bx = cpuX * CELL
        const by = cpuY * CELL
        const bw = cpuW * CELL
        const bh = cpuH * CELL

        // Drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(bx + 6, by + 6, bw, bh)

        // Body
        ctx.fillStyle   = CPU_FILL
        ctx.fillRect(bx, by, bw, bh)

        // Subtle inner gradient overlay
        const grad = ctx.createLinearGradient(bx, by, bx + bw, by + bh)
        grad.addColorStop(0,   'rgba(255,255,255,0.04)')
        grad.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(bx, by, bw, bh)

        // Border
        ctx.strokeStyle = CPU_BORDER
        ctx.lineWidth   = 1.5
        ctx.strokeRect(bx, by, bw, bh)

        // Pin-1 indicator dot (top-left)
        ctx.fillStyle = '#444'
        ctx.beginPath()
        ctx.arc(bx + 9, by + 9, 3, 0, Math.PI * 2)
        ctx.fill()

        // IC text label (very faint — doesn't compete with the overlay content)
        const labelSize = Math.max(9, Math.floor(bw / 12))
        ctx.fillStyle       = 'rgba(80,80,80,0.6)'
        ctx.font            = `bold ${labelSize}px monospace`
        ctx.textAlign       = 'center'
        ctx.textBaseline    = 'bottom'
        ctx.fillText('RL-CPU', bx + bw / 2, by + bh - 10)
      }

      // ── Animation loop ───────────────────────────────────────────────────
      function tick() {
        drawFrame(step)
        step += SPEED
        if (step <= maxLen + 4) {
          raf = requestAnimationFrame(tick)
        }
        // After animation ends the final static frame stays painted
      }

      raf = requestAnimationFrame(tick)
    }

    init()
    window.addEventListener('resize', init)
    return () => {
      window.removeEventListener('resize', init)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
