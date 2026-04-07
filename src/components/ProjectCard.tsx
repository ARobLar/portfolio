import Link from 'next/link'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
}

const categoryColors: Record<string, string> = {
  professional: 'bg-blue-100 text-blue-700',
  academic: 'bg-purple-100 text-purple-700',
  hobby: 'bg-emerald-100 text-emerald-700',
}

// Gradient per category for the card image placeholder
const categoryGradients: Record<string, string> = {
  professional: 'from-blue-900 to-slate-800',
  academic: 'from-purple-900 to-indigo-800',
  hobby: 'from-emerald-900 to-teal-800',
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Card image / gradient placeholder */}
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${
          categoryGradients[project.category]
        } overflow-hidden`}
      >
        <span className="text-5xl opacity-60">{categoryIcon(project.category)}</span>
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-yellow-900">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              categoryColors[project.category]
            }`}
          >
            {project.category}
          </span>
          <span className="text-[11px] text-slate-400">{project.period}</span>
        </div>

        <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        <p className="mt-1 text-[11px] font-medium text-slate-400">{project.client}</p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{project.summary}</p>

        {/* Keywords */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.keywords.slice(0, 5).map((kw) => (
            <span key={kw} className="keyword-pill">
              {kw}
            </span>
          ))}
          {project.keywords.length > 5 && (
            <span className="keyword-pill">+{project.keywords.length - 5}</span>
          )}
        </div>

        <div className="mt-5 flex items-center text-sm font-semibold text-blue-500 group-hover:gap-2 transition-all">
          Read more
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

function categoryIcon(cat: string) {
  if (cat === 'professional') return '💼'
  if (cat === 'academic') return '🎓'
  return '⭐'
}
