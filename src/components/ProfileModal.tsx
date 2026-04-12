'use client'

import { useEffect, useRef } from 'react'

interface ProfileModalProps {
  platform: 'github' | 'linkedin'
  url: string
  onClose: () => void
}

const META = {
  github: {
    label: 'GitHub',
    handle: '@ARobLar',
    tagline: 'Open source · Projects · Code',
    color: '#24292f',
    colorLight: '#f0f6ff',
    accent: '#4f79c4',
    icon: (size = 56) => (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    handle: 'robin-larsson-29b593137',
    tagline: 'Senior AI & Software Consultant · Sopra Steria',
    color: '#0077b5',
    colorLight: '#f0f8ff',
    accent: '#00a0dc',
    icon: (size = 56) => (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
}

export default function ProfileModal({ platform, url, onClose }: ProfileModalProps) {
  const meta = META[platform]
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)',
          background: '#fff',
        }}
      >
        {/* ── Header bar ──────────────────────────────────────────── */}
        <div
          style={{
            background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.accent} 100%)`,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
            {meta.icon(20)}
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.02em' }}>
              {meta.label}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 8,
              width: 32, height: 32,
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,80,80,0.45)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={15} height={15} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Profile card body ───────────────────────────────────── */}
        <div
          style={{
            padding: '40px 36px 36px',
            background: meta.colorLight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 0,
          }}
        >
          {/* Avatar circle with platform icon */}
          <div
            style={{
              width: 90, height: 90,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${meta.color}, ${meta.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              boxShadow: `0 8px 32px ${meta.color}55`,
              marginBottom: 20,
            }}
          >
            {meta.icon(40)}
          </div>

          {/* Name */}
          <h3
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            Robin Larsson
          </h3>

          {/* Tagline */}
          <p
            style={{
              margin: '6px 0 0',
              fontSize: 14,
              color: '#475569',
              lineHeight: 1.5,
            }}
          >
            {meta.tagline}
          </p>

          {/* Handle pill */}
          <div
            style={{
              marginTop: 12,
              display: 'inline-block',
              background: `${meta.color}15`,
              border: `1px solid ${meta.color}30`,
              borderRadius: 99,
              padding: '4px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: meta.color,
            }}
          >
            {platform === 'github' ? meta.handle : `in/${meta.handle}`}
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: `${meta.color}18`,
              margin: '28px 0',
            }}
          />

          {/* Note about external page */}
          <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
            {platform === 'linkedin'
              ? 'View Robin\'s full professional profile, work history, and endorsements on LinkedIn.'
              : 'Browse Robin\'s repositories, open-source contributions, and project code on GitHub.'}
          </p>

          {/* CTA */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              background: `linear-gradient(135deg, ${meta.color}, ${meta.accent})`,
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              padding: '13px 32px',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: `0 4px 20px ${meta.color}55`,
              transition: 'transform 0.18s, box-shadow 0.18s',
              width: '100%',
              justifyContent: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 8px 30px ${meta.color}77`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = `0 4px 20px ${meta.color}55`
            }}
          >
            {meta.icon(18)}
            Open {meta.label} ↗
          </a>

          <p style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
            Opens in a new tab
          </p>
        </div>
      </div>
    </div>
  )
}
