'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

function toDecimal([year, month]: [number, number]) {
  return year + (month - 1) / 12
}

const NOW: [number, number] = [2026, 4]

// Map client → canonical employer / company name
const CLIENT_TO_COMPANY: Record<string, string> = {
  'Region Stockholm (via Sopra Steria)': 'Sopra Steria',
  'Elefant':                             'Ubit',
  'Secondry':                            'Ubit',
  'All White Online':                    'Ubit',
  'Ingenius':                            'Ubit',
  'Celebratix':                          'Ubit',
  'ABB':                                 'ABB',
  '2M Engineering (Netherlands)':        '2M Engineering',
  "Yoshida's Space Robotics Lab, Japan": 'Mälardalen University',
  'Engineers Without Borders (EWB)':     'Engineers Without Borders',
  'Technische Universiteit Eindhoven':   'Mälardalen University',
  'Mälardalen University':               'Mälardalen University',
  'Jönköping University':                'Jönköping University',
}

const COMPANY_COLORS: Record<string, { bg: string; bgLight: string; border: string }> = {
  'Mälardalen University':    { bg: '#7c3aed', bgLight: 'rgba(124,58,237,0.07)', border: '#7c3aed' },
  'Engineers Without Borders':{ bg: '#059669', bgLight: 'rgba(5,150,105,0.07)',  border: '#059669' },
  '2M Engineering':           { bg: '#d97706', bgLight: 'rgba(217,119,6,0.07)',   border: '#d97706' },
  'ABB':                      { bg: '#dc2626', bgLight: 'rgba(220,38,38,0.07)',   border: '#dc2626' },
  'Jönköping University':     { bg: '#0891b2', bgLight: 'rgba(8,145,178,0.07)',   border: '#0891b2' },
  'Ubit':                     { bg: '#6366f1', bgLight: 'rgba(99,102,241,0.07)',  border: '#6366f1' },
  'Sopra Steria':             { bg: '#2563eb', bgLight: 'rgba(37,99,235,0.07)',   border: '#2563eb' },
}
const FALLBACK_COLOR = { bg: '#64748b', bgLight: 'rgba(100,116,139,0.07)', border: '#64748b' }

function getCompany(p: Project) {
  return CLIENT_TO_COMPANY[p.client] ?? p.client
}

interface PlacedProject {
  project: Project
  subLane: number
  startDec: number
  endDec: number
}

interface CompanyRow {
  name: string
  items: PlacedProject[]
  subLaneCount: number
  startDec: number
}

function assignSubLanes(
  items: { project: Project; startDec: number; endDec: number }[],
): PlacedProject[] {
  const sorted = [...items].sort((a, b) => a.startDec - b.startDec)
  const laneEnds: number[] = []
  return sorted.map((item) => {
    const lane = laneEnds.findIndex((end) => end <= item.startDec + 0.01)
    const subLane = lane === -1 ? laneEnds.length : lane
    laneEnds[subLane] = item.endDec
    return { ...item, subLane }
  })
}

// Layout constants
const LABEL_W   = 152  // px — company label column width
const HEADER_H  = 28   // px — year label row
const LANE_H    = 34   // px — height of each sub-lane
const LANE_GAP  = 6    // px — gap between sub-lanes
const BAND_PAD  = 6    // px — top/bottom padding inside company band
const CO_GAP    = 14   // px — gap between company bands
const BAR_H     = 26   // px — bar height

function companyBlockHeight(subLaneCount: number) {
  return (
    BAND_PAD * 2 +
    subLaneCount * LANE_H +
    Math.max(0, subLaneCount - 1) * LANE_GAP +
    CO_GAP
  )
}

export default function Timeline() {
  const [tooltip, setTooltip] = useState<{
    project: Project
    bx: number
    by: number
  } | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const { companyRows, minYear, maxYear, totalSpan, yearMarkers, companyBlocks, totalChartH } =
    useMemo(() => {
      const raw = projects
        .filter((p) => p.dateStart && p.dateEnd !== undefined)
        .map((p) => ({
          project: p,
          startDec: toDecimal(p.dateStart),
          endDec: toDecimal(p.dateEnd ?? NOW),
        }))

      // Group by company
      const byCompany = new Map<string, typeof raw>()
      for (const item of raw) {
        const co = getCompany(item.project)
        if (!byCompany.has(co)) byCompany.set(co, [])
        byCompany.get(co)!.push(item)
      }

      // Build rows sorted by earliest start
      const rows: CompanyRow[] = Array.from(byCompany.entries())
        .map(([name, items]) => {
          const placed = assignSubLanes(items)
          return {
            name,
            items: placed,
            subLaneCount: Math.max(...placed.map((p) => p.subLane)) + 1,
            startDec: Math.min(...items.map((i) => i.startDec)),
          }
        })
        .sort((a, b) => a.startDec - b.startDec)

      const allDecs = raw.flatMap((r) => [r.startDec, r.endDec])
      const minYear = Math.floor(Math.min(...allDecs))
      const maxYear = Math.ceil(Math.max(...allDecs)) + 0.1
      const totalSpan = maxYear - minYear

      const yearMarkers: number[] = []
      for (let y = minYear; y <= Math.ceil(maxYear); y++) yearMarkers.push(y)

      // Compute Y position for each company block in the chart
      let y = HEADER_H
      const companyBlocks = rows.map((row) => {
        const blockY = y
        const blockH = companyBlockHeight(row.subLaneCount)
        y += blockH
        return { row, blockY, blockH }
      })

      return {
        companyRows: rows,
        minYear,
        maxYear,
        totalSpan,
        yearMarkers,
        companyBlocks,
        totalChartH: y,
      }
    }, [])

  function pct(dec: number) {
    return ((dec - minYear) / totalSpan) * 100
  }

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Career Timeline</h2>
      <p className="mt-3 text-slate-500">
        Each horizontal band is one employer — parallel bands show concurrent engagements.
        Same colour = same company.
      </p>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {companyRows.map(({ name }) => {
          const c = COMPANY_COLORS[name] ?? FALLBACK_COLOR
          return (
            <div key={name} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ background: c.bg }}
              />
              <span className="text-sm text-slate-600">{name}</span>
            </div>
          )
        })}
      </div>

      {/* Chart — scrollable on narrow screens */}
      <div className="relative mt-8 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
        <p className="px-4 pt-2 text-right text-[11px] text-slate-400 sm:hidden">← Scroll →</p>

        <div style={{ display: 'flex', minWidth: 720 }}>
          {/* ── Company label column ───────────────────────────────────── */}
          <div
            style={{
              width: LABEL_W,
              flexShrink: 0,
              paddingTop: HEADER_H,
              borderRight: '1px solid #e2e8f0',
            }}
          >
            {companyBlocks.map(({ row, blockH }) => {
              const c = COMPANY_COLORS[row.name] ?? FALLBACK_COLOR
              return (
                <div
                  key={row.name}
                  style={{
                    height: blockH,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 14,
                    paddingRight: 8,
                    borderLeft: `4px solid ${c.border}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: c.border,
                      lineHeight: 1.3,
                    }}
                  >
                    {row.name}
                  </span>
                </div>
              )
            })}
          </div>

          {/* ── Chart area ─────────────────────────────────────────────── */}
          <div
            ref={chartRef}
            style={{ flex: 1, position: 'relative', height: totalChartH }}
            onPointerLeave={() => setTooltip(null)}
          >
            {/* Year grid lines + labels */}
            {yearMarkers.map((y) => {
              const left = pct(y)
              if (left < 0 || left > 100) return null
              return (
                <div
                  key={y}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${left}%`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#94a3b8',
                      userSelect: 'none',
                      paddingLeft: 3,
                    }}
                  >
                    {y}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      borderLeft: '1px dashed #e2e8f0',
                      marginTop: 3,
                    }}
                  />
                </div>
              )
            })}

            {/* Today line */}
            {(() => {
              const todayPct = pct(toDecimal(NOW))
              return (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${todayPct}%`,
                    zIndex: 10,
                    borderLeft: '2px solid #60a5fa',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#3b82f6',
                      whiteSpace: 'nowrap',
                      userSelect: 'none',
                    }}
                  >
                    Today
                  </span>
                </div>
              )
            })()}

            {/* Company bands + project bars */}
            {companyBlocks.map(({ row, blockY, blockH }) => {
              const c = COMPANY_COLORS[row.name] ?? FALLBACK_COLOR

              return (
                <div key={row.name}>
                  {/* Band background */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 2,
                      right: 2,
                      top: blockY,
                      height: blockH - CO_GAP,
                      background: c.bgLight,
                      borderRadius: 8,
                      borderLeft: `3px solid ${c.border}22`,
                    }}
                  />

                  {/* Project bars */}
                  {row.items.map(({ project, subLane, startDec, endDec }) => {
                    const left  = pct(startDec)
                    const width = pct(endDec) - left
                    const barTop =
                      blockY +
                      BAND_PAD +
                      subLane * (LANE_H + LANE_GAP) +
                      (LANE_H - BAR_H) / 2

                    return (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}/`}
                        style={{
                          position: 'absolute',
                          left:     `${left}%`,
                          width:    `max(${width}%, 0.4%)`,
                          top:      barTop,
                          height:   BAR_H,
                          minWidth: 6,
                          background: c.bg,
                          borderRadius: 6,
                          zIndex: 5,
                          display: 'flex',
                          alignItems: 'center',
                          overflow: 'hidden',
                          textDecoration: 'none',
                          transition: 'filter 0.15s, transform 0.12s',
                          boxShadow: `0 1px 4px ${c.bg}55`,
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.filter    = 'brightness(1.18)'
                          el.style.transform = 'scaleY(1.1)'
                          const rect  = chartRef.current!.getBoundingClientRect()
                          const bRect = el.getBoundingClientRect()
                          setTooltip({
                            project,
                            bx: bRect.left - rect.left + bRect.width / 2,
                            by: barTop,
                          })
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.filter    = ''
                          el.style.transform = ''
                          setTooltip(null)
                        }}
                      >
                        <span
                          style={{
                            padding:      '0 8px',
                            fontSize:     10,
                            fontWeight:   700,
                            color:        'rgba(255,255,255,0.93)',
                            whiteSpace:   'nowrap',
                            overflow:     'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight:   1,
                          }}
                        >
                          {project.title.split(' — ')[0]}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )
            })}

            {/* Tooltip */}
            {tooltip && (
              <div
                style={{
                  position:   'absolute',
                  zIndex:     30,
                  pointerEvents: 'none',
                  width:      224,
                  borderRadius: 12,
                  background: '#0f172a',
                  padding:    12,
                  boxShadow:  '0 12px 40px rgba(0,0,0,0.35)',
                  color:      '#fff',
                  fontSize:   12,
                  left: Math.max(
                    112,
                    Math.min(tooltip.bx, (chartRef.current?.offsetWidth ?? 9999) - 112),
                  ),
                  top:       Math.max(0, tooltip.by - 112),
                  transform: 'translateX(-50%)',
                }}
              >
                {(() => {
                  const company = getCompany(tooltip.project)
                  const c = COMPANY_COLORS[company] ?? FALLBACK_COLOR
                  return (
                    <>
                      <div
                        style={{
                          display:      'inline-block',
                          background:   c.bg,
                          borderRadius: 4,
                          padding:      '2px 8px',
                          fontSize:     10,
                          fontWeight:   700,
                          marginBottom: 6,
                          color:        '#fff',
                        }}
                      >
                        {company}
                      </div>
                      <div style={{ fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>
                        {tooltip.project.title}
                      </div>
                      <div style={{ color: '#94a3b8', marginBottom: 2 }}>
                        {tooltip.project.period}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: 11 }}>
                        {tooltip.project.client}
                      </div>
                      <div style={{ marginTop: 8, color: '#60a5fa', fontSize: 10 }}>
                        Click to read more →
                      </div>
                    </>
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
