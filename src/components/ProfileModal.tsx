'use client'

import { useEffect, useRef, useState } from 'react'

interface ProfileModalProps {
  platform: 'github' | 'linkedin'
  url: string
  onClose: () => void
}

const PLATFORM_META = {
  github: {
    label: 'GitHub',
    color: '#24292f',
    accent: '#4f79c4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#0077b5',
    accent: '#00a0dc',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
}

export default function ProfileModal({ platform, url, onClose }: ProfileModalProps) {
  const meta = PLATFORM_META[platform]
  const backdropRef = useRef<HTMLDivElement>(null)
  const [iframeBlocked, setIframeBlocked] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Detect if iframe load silently fails (LinkedIn/GitHub block embedding)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!iframeLoaded) setIframeBlocked(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [iframeLoaded])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: 'min(82vh, 680px)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* ── Top bar ──────────────────────────────────────────────────────── */}
        <div
          style={{
            background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.accent} 100%)`,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          {/* Platform icon + name */}
          <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {meta.icon}
            <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.02em' }}>
              {meta.label}
            </span>
          </span>

          {/* URL hint */}
          <span
            style={{
              flex: 1,
              fontSize: '12px',
              color: 'rgba(255,255,255,0.55)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {url}
          </span>

          {/* Open in new tab */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 13, height: 13 }} aria-hidden="true">
              <path d="M6.5 1.75a.75.75 0 0 0 0 1.5h4.19L3.22 10.72a.75.75 0 1 0 1.06 1.06l7.47-7.47v4.19a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75h-6z" />
            </svg>
            Open in new tab
          </a>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              width: '34px',
              height: '34px',
              color: '#fff',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,100,100,0.45)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 16, height: 16 }} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Content area ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, position: 'relative', background: '#fff', overflow: 'hidden' }}>
          {/* Loading shimmer */}
          {!iframeLoaded && !iframeBlocked && (
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: '#f8f9fa',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '40px', height: '40px',
                  border: `3px solid ${meta.color}22`,
                  borderTop: `3px solid ${meta.color}`,
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <span style={{ color: '#888', fontSize: '14px' }}>Loading {meta.label}…</span>
            </div>
          )}

          {/* Blocked fallback — LinkedIn/GitHub refuse embedding */}
          {iframeBlocked && (
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: `linear-gradient(160deg, #f8f9fa 0%, ${meta.color}0a 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '72px', height: '72px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${meta.color}, ${meta.accent})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: `0 8px 32px ${meta.color}44`,
                }}
              >
                <span style={{ transform: 'scale(2.2)' }}>{meta.icon}</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '18px', color: '#1a1a1a', margin: '0 0 8px' }}>
                  {meta.label} blocks embedding
                </p>
                <p style={{ color: '#666', fontSize: '14px', maxWidth: '340px', lineHeight: 1.6, margin: 0 }}>
                  {meta.label} prevents its page from being shown inside other websites for security reasons.
                  Click the button below to view the full profile in a new tab.
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: `linear-gradient(135deg, ${meta.color}, ${meta.accent})`,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: `0 4px 20px ${meta.color}55`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = `0 8px 28px ${meta.color}77`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = `0 4px 20px ${meta.color}55`
                }}
              >
                {meta.icon}
                View on {meta.label} ↗
              </a>
            </div>
          )}

          <iframe
            src={url}
            title={`${meta.label} Profile`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  )
}
