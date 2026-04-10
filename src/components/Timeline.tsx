'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

// Convert [year, month] to a decimal year value
function toDecimal([year, month]: [number, number]) {
  return year + (month - 1) / 12
}

const NOW: [number, number] = [2026, 4]

const categoryColor: Record<string, { bar: string; hover: string; legend: string }> = {
  professional: {
    bar: 'bg-blue-500',
    hover: 'hover:bg-blue-400',
    legend: 'bg-blue-500',
  },
  academic: {
    bar: 'bg-violet-500',
    hover: 'hover:bg-violet-400',
    legend: 'bg-violet-500',
  },
  hobby: {
    bar: 'bg-emerald-500',
    hover: 'hover:bg-emerald-400',
    legend: 'bg-emerald-500',
  },
}

interface LanedProject {
  project: Project
  lane: number
  startDec: number
  endDec: number
}

function assignLanes(items: LanedProject[]): LanedProject[] {
  const sorted = [...items].sort((a, b) => a.startDec - b.startDec)
  const laneEnds: number[] = []

  return sorted.map((item) => {
    // Find lowest lane that ended before this one starts (with tiny gap)
    const lane = laneEnds.findIndex((end) => end <= item.startDec + 0.01)
    const assignedLane = lane === -1 ? laneEnds.length : lane
    laneEnds[assignedLane] = item.endDec
    return { ...item, lane: assignedLane }
  })
}

export default function Timeline() {
  const [tooltip, setTooltip] = useState<{ project: Project; x: number; y: number } | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const { laned, minYear, maxYear, totalSpan, laneCount, yearMarkers } = useMemo(() => {
    const raw: LanedProject[] = projects
      .filter((p) => p.dateStart && p.dateEnd !== undefined)
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

    // Year markers
    const yearMarkers: number[] = []
    for (let y = minYear; y <= Math.ceil(maxYear); y++) yearMarkers.push(y)

    return { laned, minYear, maxYear, totalSpan, laneCount, yearMarkers }
  }, [])

  const LANE_H = 40   // px per lane
  const LANE_GAP = 8  // px between lanes
  const BAR_H = 30    // px bar height
  const HEADER_H = 28 // px for year labels
  const totalH = HEADER_H + laneCount * (LANE_H + LANE_GAP)

  function pct(dec: number) {
    return ((dec - minYear) / totalSpan) * 100
  }

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Career Timeline</h2>
      <p className="mt-3 text-slate-500">
        Every project mapped across time — overlapping bars show concurrent engagements.
      </p>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-5">
        {(['professional', 'academic', 'hobby'] as const).map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <span className={`inline-block h-3 w-3 rounded-sm ${categoryColor[cat].legend}`} />
            <span className="text-sm capitalize text-slate-600">{cat}</span>
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
              <div key={y} className="absolute top-0 bottom-0 flex flex-col" style={{ left: `${left}%` }}>
                <span className="text-[10px] font-semibold text-slate-400 select-none">{y}</span>
                <div className="mt-1 flex-1 border-l border-dashed border-slate-200" />
              </div>
            )
          })}

          {/* Today marker */}
          {(() => {
            const todayPct = pct(toDecimal(NOW))
            return (
              <div
                className="absolute top-0 bottom-0 z-10 border-l-2 border-blue-400"
                style={{ left: `${todayPct}%` }}
              >
                <span className="absolute top-0 left-1 text-[10px] font-semibold text-blue-500 select-none whitespace-nowrap">
                  Today
                </span>
              </div>
            )
          })()}

          {/* Project bars */}
          {laned.map(({ project, lane, startDec, endDec }) => {
            const left = pct(startDec)
            const width = pct(endDec) - left
            const top = HEADER_H + lane * (LANE_H + LANE_GAP) + (LANE_H - BAR_H) / 2
            const colors = categoryColor[project.category]

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}/`}
                className={`absolute rounded-md ${colors.bar} ${colors.hover} transition-all duration-150 cursor-pointer group`}
                style={{
                  left: `${left}%`,
                  width: `max(${width}%, 0.5%)`,
                  top,
                  height: BAR_H,
                  minWidth: 4,
                }}
                onPointerEnter={(e) => {
                  const rect = (e.currentTarget as HTMLElement)
                    .closest('.relative')!
                    .getBoundingClientRect()
                  const barRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  setTooltip({
                    project,
                    x: barRect.left - rect.left + barRect.width / 2,
                    y: top,
                  })
                }}
                onPointerLeave={() => setTooltip(null)}
              >
                {/* Label inside bar if wide enough */}
                <span className="absolute inset-0 flex items-center px-2 overflow-hidden">
                  <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap overflow-hidden text-ellipsis leading-none">
                    {project.client.split(' (')[0].split(' — ')[0]}
                  </span>
                </span>
              </Link>
            )
          })}

          {/* Tooltip */}
          {tooltip && (
            <div
              className="pointer-events-none absolute z-30 w-56 rounded-xl bg-slate-900 p-3 shadow-xl text-white text-xs sm:w-64"
              style={{
                left: Math.max(112, Math.min(tooltip.x, (chartRef.current?.offsetWidth ?? 9999) - 112)),
                top: Math.max(0, tooltip.y - 95),
                transform: 'translateX(-50%)',
              }}
            >
              <div className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold mb-1 ${categoryColor[tooltip.project.category].bar}`}>
                {tooltip.project.category}
              </div>
              <div className="font-semibold leading-snug">{tooltip.project.title}</div>
              <div className="mt-1 text-slate-400">{tooltip.project.period}</div>
              <div className="mt-0.5 text-slate-400">{tooltip.project.client}</div>
              <div className="mt-2 text-blue-400 text-[10px]">Click to read more →</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
