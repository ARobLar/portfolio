'use client'

import { useState, useMemo } from 'react'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import type { ProjectCategory } from '@/data/projects'

type Tab = ProjectCategory | 'all'

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',          label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'hobby',        label: 'Hobby' },
  { id: 'academic',     label: 'Academic' },
]

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [query, setQuery] = useState('')

  const displayed = useMemo(() => {
    const base =
      activeTab === 'all'
        ? projects
        : projects.filter((p) => p.category === activeTab)

    if (!query.trim()) return base
    const q = query.toLowerCase()
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q)) ||
        p.roles.some((r) => r.toLowerCase().includes(q)),
    )
  }, [activeTab, query])

  const tabCount = (tab: Tab) =>
    tab === 'all'
      ? projects.length
      : projects.filter((p) => p.category === tab).length

  return (
    <div>
      {/* Tab bar — scrollable on mobile */}
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex w-max gap-1 rounded-xl bg-slate-100 p-1 sm:w-auto sm:inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-none whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-all sm:px-5 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {tabCount(tab.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search bar — visible on all tabs */}
      <div className="mt-5">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, client, role, or technology…"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        {query && (
          <p className="mt-2 text-sm text-slate-500">
            {displayed.length === 0
              ? 'No projects matched your search.'
              : `${displayed.length} project${displayed.length !== 1 ? 's' : ''} found`}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {displayed.length === 0 && !query && (
        <p className="mt-8 text-sm text-slate-400">No projects in this category yet.</p>
      )}
    </div>
  )
}
