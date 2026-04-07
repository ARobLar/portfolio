'use client'

import { useState } from 'react'
import MeetingModal from '@/components/MeetingModal'
import CompanyBanner from '@/components/CompanyBanner'
import ProjectTabs from '@/components/ProjectTabs'
import NavBar from '@/components/NavBar'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <NavBar onBookCall={() => setModalOpen(true)} />

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white"
      >
        {/* decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-300 ring-1 ring-blue-400/30">
              Available for new engagements
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Robin Larsson
              <span className="block text-blue-400">Senior AI & Software Consultant</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
              I build digital platforms with AI integrations — from MVP to production-grade systems.
              With 8+ years of experience across Sweden, the Netherlands, and Japan, I combine deep
              technical expertise with sharp business acumen to turn ideas into scalable solutions.
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate-400">
              MSc Robotics · MSc AI · Background in startups, high-critical systems & R&D.
              Currently Senior Consultant at Sopra Steria.
            </p>

            {/* Service pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Agentic AI',
                'Solution Architecture',
                'Technical Ownership',
                'Full Stack Engineering',
                'Data Engineering',
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-lg bg-blue-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Book a call
              </button>
              <a
                href="#projects"
                className="rounded-lg bg-white/10 px-8 py-3.5 text-base font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                View my work
              </a>
            </div>
          </div>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 0C1200 50 960 70 720 45C480 20 240 60 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── What I offer ──────────────────────────────────────── */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">What I bring to your project</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
          I work end-to-end — from architecture decisions to hands-on implementation — in small, fast-moving teams.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-7 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                {svc.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{svc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{svc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Company Banner ────────────────────────────────────── */}
      <CompanyBanner />

      {/* ─── Projects ──────────────────────────────────────────── */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Projects</h2>
        <p className="mt-3 text-slate-500">
          Professional assignments, research, academic work, and side projects.
        </p>
        <div className="mt-10">
          <ProjectTabs />
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-slate-50 py-12 text-center text-sm text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Robin Larsson &middot;{' '}
          <a
            href="https://www.linkedin.com/in/robin-larsson-29b593137/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </footer>

      {/* ─── Meeting Modal ─────────────────────────────────────── */}
      {modalOpen && <MeetingModal onClose={() => setModalOpen(false)} />}
    </main>
  )
}

const services = [
  {
    icon: '🤖',
    title: 'Agentic AI & AI Integration',
    description:
      'Design and build AI-powered features — LLM integrations, agent workflows, prompt engineering, and generative AI products embedded into real applications.',
  },
  {
    icon: '🏗️',
    title: 'Solution Architecture',
    description:
      'Define system boundaries, data models, API contracts, and infrastructure patterns that scale — from MVP to production, with reliability built in from day one.',
  },
  {
    icon: '🛠️',
    title: 'Technical Ownership',
    description:
      'Act as the technical owner end-to-end: managing backlog, coordinating teams, communicating with stakeholders, and ensuring quality from requirements to release.',
  },
  {
    icon: '⚡',
    title: 'Full Stack Engineering',
    description:
      'Build complete web platforms — Next.js frontends, .NET or Node.js backends, databases, APIs, and CI/CD pipelines — with clean, maintainable code.',
  },
  {
    icon: '📊',
    title: 'Data Engineering & Analytics',
    description:
      'Design ETL pipelines, data models, and analytics dashboards that surface actionable insights — from raw sensor data to business KPIs.',
  },
  {
    icon: '🚀',
    title: 'MVP & Startup Delivery',
    description:
      'Translate founder vision into a testable MVP fast — using LEAN methodology, hypothesis-driven development, and pragmatic architecture choices.',
  },
]
