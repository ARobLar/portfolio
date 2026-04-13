'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

function toDecimal([year, month]: [number, number]) {
  return year + (month - 1) / 12
}

const NOW: [number, number] = [2026, 4]

// Maps client → employer company (used for colour).
// Clients not listed here fall back to their own name as the company.
const CLIENT_TO_COMPANY: Record<string, string> = {
  'Region Stockholm (via Sopra Steria)': 'Sopra Steria',
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

const COMPANY_COLORS: Record<string, string> = {
  'Mälardalen University':     '#7c3aed',
  'Engineers Without Borders': '#059669',
  '2M Engineering':            '#d97706',
  'ABB':                       '#dc2626',
  'Jönköping University':      '#0891b2',
  'Ubit':                      '#6366f1',
  'Elefant':                   '#db2777',
  'Sopra Steria':              '#2563eb',
}
const FALLBACK_COLOR = '#64748b'

function getCompany(p: Project) { return CLIENT_TO_COMPANY[p.client] ?? p.client }
function getColor(p: Project)   { return COMPANY_COLORS[getCompany(p)] ?? FALLBACK_COLOR }

// Short display name for the sub-label (client / project company)
function shortClient(p: Project): string {
  return p.client
    .replace(' (Netherlands)', '')
    .replace(' (via Sopra Steria)', '')
    .replace(' (EWB)', '')
    .replace(', Japan', '')
}

interface LanedProject {
  project: Project
  lane: number
  startDec: number
  endDec: number
}

function assignLanes(items: LanedProject[]): LanedProject[] {
  // Greedy top-fill: sort by start date, place each item in the lowest
  // available lane. This maximises row usage and makes overlaps obvious.
  const sorted = [...items].sort((a, b) => a.startDec - b.startDec)
  const laneEnds: number[] = []
  return sorted.map((item) => {
    const lane = laneEnds.findIndex((end) => end <= item.startDec + 0.1)
    const assigned = lane === -1 ? laneEnds.length : lane
    laneEnds[assigned] = item.endDec
    return { ...item, lane: assigned }
  })
}

// Layout
const HEADER_H = 28
const BAR_H    = 26
const SUB_H    = 15   // sub-label row height
const SUB_GAP  = 3    // gap between bar and sub-label
const LANE_H   = BAR_H + SUB_GAP + SUB_H   // 44 px
const LANE_GAP = 10

export default function Timeline() {
  const [tooltip, setTooltip] = useState<{
    project: Project; bx: number; by: number
  } | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const { laned, minYear, maxYear, totalSpan, laneCount, yearMarkers } = useMemo(() => {
    // 'ubit-consulting' is an umbrella entry — its individual engagements are
    // already shown as separate bars, so exclude it to avoid a redundant overlay.
    const TIMELINE_EXCLUDE = new Set(['ubit-consulting'])

    const raw: LanedProject[] = projects
      .filter((p) => p.dateStart && p.dateEnd !== undefined && !TIMELINE_EXCLUDE.has(p.slug))
      .map((p) => ({
        project: p,
        lane: 0,
        startDec: toDecimal(p.dateStart),
        endDec: toDecimal(p.dateEnd ?? NOW),
      }))

    const laned = assignLanes(raw)
    const minYear = Math.floor(Math.min(...laned.map((l) => l.startDec)))
    const maxYear = Math.ceil(Math.max(...laned.map((l) => l.endDec))) + 0.1
    const totalSpan = maxYear - minYear
    const laneCount = Math.max(...laned.map((l) => l.lane)) + 1

    const yearMarkers: number[] = []
    for (let y = minYear; y <= Math.ceil(maxYear); y++) yearMarkers.push(y)

    return { laned, minYear, maxYear, totalSpan, laneCount, yearMarkers }
  }, [])

  const totalH = HEADER_H + laneCount * (LANE_H + LANE_GAP)

  function pct(dec: number) {
    return ((dec - minYear) / totalSpan) * 100
  }

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Career Timeline</h2>
      <p className="mt-3 text-slate-500">
        Every engagement mapped across time — overlapping bars show concurrent work.
        Colour = employer company.
      </p>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {Object.entries(COMPANY_COLORS).map(([name, bg]) => (
          <div key={name} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: bg }} />
            <span className="text-sm text-slate-600">{name}</span>
          </div>
        ))}
      </div>

      {/* Chart — horizontally scrollable on mobile */}
      <div className="relative mt-8 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
        <p className="mb-2 text-right text-[11px] text-slate-400 sm:hidden">← Scroll to explore →</p>
        <div
          ref={chartRef}
          className="relative w-full"
          style={{ height: totalH, minWidth: 600 }}
          onPointerLeave={() => setTooltip(null)}
        >
          {/* Year grid lines + labels */}
          {yearMarkers.map((y) => {
            const left = pct(y)
            if (left < 0 || left > 100) return null
            return (
              <div
                key={y}
                className="absolute top-0 bottom-0 flex flex-col"
                style={{ left: `${left}%` }}
              >
                <span className="pl-0.5 text-[10px] font-semibold text-slate-400 select-none">
                  {y}
                </span>
                <div className="mt-1 flex-1 border-l border-dashed border-slate-200" />
              </div>
            )
          })}

          {/* Today line */}
          {(() => {
            const todayPct = pct(toDecimal(NOW))
            return (
              <div
                className="absolute top-0 bottom-0 z-10 border-l-2 border-blue-400"
                style={{ left: `${todayPct}%` }}
              >
                <span className="absolute top-0 left-1 whitespace-nowrap select-none text-[10px] font-semibold text-blue-500">
                  Today
                </span>
              </div>
            )
          })()}

          {/* Project items */}
          {laned.map(({ project, lane, startDec, endDec }) => {
            const left    = pct(startDec)
            const width   = pct(endDec) - left
            const itemTop = HEADER_H + lane * (LANE_H + LANE_GAP)
            const color   = getColor(project)

            // Bar label: primary role; sub-label: employer company (drives colour).
            const company     = getCompany(project)
            const roleLabel   = project.roles[0] ?? project.title.split(' — ')[0]
            const clientLabel = company

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}/`}
                style={{
                  position: 'absolute',
                  left:     `${left}%`,
                  width:    `max(${width}%, 0.4%)`,
                  top:      itemTop,
                  zIndex:   5,
                  textDecoration: 'none',
                  minWidth: 6,
                }}
                onMouseEnter={(e) => {
                  const rect  = chartRef.current!.getBoundingClientRect()
                  const bRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  setTooltip({
                    project,
                    bx: bRect.left - rect.left + bRect.width / 2,
                    by: itemTop,
                  })
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                {/* ── Main bar ── */}
                <div
                  style={{
                    height:     BAR_H,
                    background: color,
                    borderRadius: 6,
                    overflow:   'hidden',
                    display:    'flex',
                    alignItems: 'center',
                    boxShadow:  `0 1px 4px ${color}44`,
                    transition: 'filter 0.15s, transform 0.12s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter    = 'brightness(1.15)'
                    e.currentTarget.style.transform = 'scaleY(1.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter    = ''
                    e.currentTarget.style.transform = ''
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
                    {roleLabel}
                  </span>
                </div>

                {/* ── Company sub-label ── */}
                <div
                  style={{
                    marginTop:  SUB_GAP,
                    height:     SUB_H,
                    paddingLeft: 4,
                    overflow:   'hidden',
                    display:    'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize:     9,
                      fontWeight:   600,
                      color,
                      whiteSpace:   'nowrap',
                      overflow:     'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight:   1,
                    }}
                  >
                    {clientLabel}
                  </span>
                </div>
              </Link>
            )
          })}

          {/* Tooltip */}
          {tooltip && (
            <div
              className="pointer-events-none absolute z-30 rounded-xl bg-slate-900 p-3 shadow-xl text-white"
              style={{
                width:     224,
                fontSize:  12,
                left: Math.max(
                  112,
                  Math.min(tooltip.bx, (chartRef.current?.offsetWidth ?? 9999) - 112),
                ),
                top:       Math.max(0, tooltip.by - 115),
                transform: 'translateX(-50%)',
              }}
            >
              {(() => {
                const company = getCompany(tooltip.project)
                const bg      = COMPANY_COLORS[company] ?? FALLBACK_COLOR
                return (
                  <>
                    <div
                      style={{
                        display:      'inline-block',
                        background:   bg,
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
                    <div className="font-semibold leading-snug mb-1">
                      {tooltip.project.title}
                    </div>
                    <div className="text-slate-400 mb-0.5">{tooltip.project.period}</div>
                    <div className="text-[11px] text-slate-400">
                      {shortClient(tooltip.project)}
                    </div>
                    <div className="mt-2 text-[10px] text-blue-400">Click to read more →</div>
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
