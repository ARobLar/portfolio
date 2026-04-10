import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAdjacentProjects, projects } from '@/data/projects'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Robin Larsson`,
    description: project.summary,
  }
}

const categoryColors: Record<string, string> = {
  professional: 'bg-blue-100 text-blue-700',
  academic: 'bg-purple-100 text-purple-700',
  hobby: 'bg-emerald-100 text-emerald-700',
}

const categoryGradients: Record<string, string> = {
  professional: 'from-blue-900 to-slate-800',
  academic: 'from-purple-900 to-indigo-800',
  hobby: 'from-emerald-900 to-teal-800',
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(params.slug)

  // Convert markdown-like bold + line breaks into HTML-ish paragraphs
  const bodyParagraphs = project.fullDescription
    .trim()
    .split('\n\n')
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to portfolio
          </Link>
          <span className="text-sm font-bold text-slate-900">Robin Larsson</span>
        </div>
      </header>

      {/* Hero banner */}
      <div
        className={`flex h-56 items-center justify-center bg-gradient-to-br ${
          categoryGradients[project.category]
        } sm:h-72`}
      >
        <div className="text-center">
          <span className="text-6xl">{categoryIcon(project.category)}</span>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              categoryColors[project.category]
            }`}
          >
            {project.category}
          </span>
          <span className="text-sm text-slate-400">{project.period}</span>
          <span className="text-slate-300">·</span>
          <span className="text-sm text-slate-500">{project.client}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-slate-500">{project.summary}</p>

        {/* Roles */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.roles.map((role) => (
            <span
              key={role}
              className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-10 border-slate-100" />

        {/* Body */}
        <div className="prose">
          {bodyParagraphs.map((para, i) => {
            // Detect bold headers like **As Tech Lead**
            const boldMatch = para.match(/^\*\*(.+?)\*\*,?\s*(.*)/s)
            if (boldMatch) {
              return (
                <p key={i}>
                  <strong>{boldMatch[1]}</strong>
                  {boldMatch[2] ? ` ${boldMatch[2]}` : ''}
                </p>
              )
            }
            // Detect bullet lists
            if (para.startsWith('- ')) {
              const items = para.split('\n').filter((l) => l.startsWith('- '))
              return (
                <ul key={i}>
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^- /, '')}</li>
                  ))}
                </ul>
              )
            }
            return <p key={i}>{para}</p>
          })}
        </div>

        {/* Keywords */}
        <div className="mt-10">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Technologies & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.keywords.map((kw) => (
              <span key={kw} className="keyword-pill text-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 p-6 text-center text-white sm:p-8">
          <h2 className="text-xl font-bold">Interested in working together?</h2>
          <p className="mt-2 text-slate-300">
            I'm available for new engagements. Let's talk about your project.
          </p>
          <a
            href="/"
            className="mt-6 inline-block w-full rounded-lg bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-blue-400 sm:w-auto"
          >
            Book a call on the homepage
          </a>
        </div>

        {/* Prev / Next */}
        <nav className="mt-14 grid gap-4 border-t border-slate-100 pt-10 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}/`}
              className="group flex items-start gap-4 rounded-xl border border-slate-100 p-5 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Previous</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}/`}
              className="group flex items-start justify-end gap-4 rounded-xl border border-slate-100 p-5 text-right transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Next</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                  {next.title}
                </p>
              </div>
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  )
}

function categoryIcon(cat: string) {
  if (cat === 'professional') return '💼'
  if (cat === 'academic') return '🎓'
  return '⭐'
}
