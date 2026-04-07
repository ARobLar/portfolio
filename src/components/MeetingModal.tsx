'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  onClose: () => void
}

export default function MeetingModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Compose a mailto link and open it
    const subject = encodeURIComponent(`Meeting request from ${name}${company ? ` (${company})` : ''}`)
    const body = encodeURIComponent(
      `Hi Robin,\n\nI'd like to schedule a call.\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
    )
    window.open(`mailto:robin@soprasteria.se?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between rounded-t-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-7">
          <div>
            <h2 className="text-xl font-bold text-white">Book a call</h2>
            <p className="mt-1 text-sm text-slate-300">Tell me a bit about your project — I'll get back to you within 24h.</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-full p-1 text-white/60 transition hover:text-white"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Your email client has opened!</h3>
            <p className="mt-2 text-sm text-slate-500">
              Complete sending the email — I'll reply within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-400"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-7">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Your name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Company
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your email *
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                What do you need help with? *
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, challenge, or what kind of engagement you're looking for..."
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send meeting request
            </button>

            <p className="text-center text-xs text-slate-400">
              This will open your email client pre-filled with your request.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
