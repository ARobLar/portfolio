'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ProfileModal = dynamic(() => import('./ProfileModal'), { ssr: false })

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function GitHubIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
           0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
           -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
           .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
           -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844
           c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
           .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
           0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
               2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37
               4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063
               2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782
               13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792
               24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── CSS keyframes injected once ───────────────────────────────────────────────
const STYLES = `
  @keyframes gh-spin {
    0%   { transform: rotate(0deg)   scale(1);   }
    40%  { transform: rotate(200deg) scale(1.25); }
    100% { transform: rotate(360deg) scale(1);   }
  }
  @keyframes li-bounce {
    0%   { transform: translateY(0px);  }
    25%  { transform: translateY(-7px); }
    55%  { transform: translateY(-3px); }
    75%  { transform: translateY(-5px); }
    100% { transform: translateY(0px);  }
  }
  .gh-btn:hover  .gh-icon  { animation: gh-spin  0.65s cubic-bezier(0.4,0,0.2,1) forwards; }
  .li-btn:hover  .li-icon  { animation: li-bounce 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }

  /* Navbar icon-only variants */
  @keyframes gh-spin-sm {
    0%   { transform: rotate(0deg)   scale(1);   }
    40%  { transform: rotate(200deg) scale(1.3); }
    100% { transform: rotate(360deg) scale(1);   }
  }
  @keyframes li-bounce-sm {
    0%   { transform: translateY(0px);  }
    30%  { transform: translateY(-5px); }
    65%  { transform: translateY(-2px); }
    80%  { transform: translateY(-4px); }
    100% { transform: translateY(0px);  }
  }
  .gh-icon-btn:hover .gh-icon-sm { animation: gh-spin-sm  0.6s cubic-bezier(0.4,0,0.2,1) forwards; }
  .li-icon-btn:hover .li-icon-sm { animation: li-bounce-sm 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
`

function StyleOnce() {
  return <style dangerouslySetInnerHTML={{ __html: STYLES }} />
}

const GITHUB_URL   = 'https://github.com/ARobLar'
const LINKEDIN_URL = 'https://www.linkedin.com/in/robin-larsson-29b593137/'

// ── Hero / full-size buttons ──────────────────────────────────────────────────
export function SocialLinks() {
  const [modal, setModal] = useState<'github' | null>(null)

  return (
    <>
      <StyleOnce />
      <div className="flex flex-wrap justify-center gap-4">
        {/* GitHub */}
        <button
          type="button"
          onClick={() => setModal('github')}
          className="gh-btn group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style={{ background: '#24292f' }}
          aria-label="View Robin's GitHub profile"
        >
          {/* Shimmer sweep */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.6s ease',
            }}
            className="group-hover:[transform:translateX(100%)]"
          />
          <span className="gh-icon relative z-10 flex items-center">
            <GitHubIcon className="h-5 w-5" />
          </span>
          <span className="relative z-10">GitHub</span>
        </button>

        {/* LinkedIn — opens in new tab */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="li-btn group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style={{ background: '#0077b5' }}
          aria-label="View Robin's LinkedIn profile"
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.6s ease',
            }}
            className="group-hover:[transform:translateX(100%)]"
          />
          <span className="li-icon relative z-10 flex items-center">
            <LinkedInIcon className="h-5 w-5" />
          </span>
          <span className="relative z-10">LinkedIn</span>
        </a>
      </div>

      {modal && (
        <ProfileModal
          platform={modal}
          url={GITHUB_URL}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}

// ── Navbar / icon-only buttons ────────────────────────────────────────────────
export function SocialIconLinks({ scrolled }: { scrolled: boolean }) {
  const [modal, setModal] = useState<'github' | null>(null)
  const ring = scrolled ? 'ring-slate-200' : 'ring-white/20'
  const bg   = scrolled ? 'bg-slate-50 hover:bg-slate-100 text-slate-700' : 'bg-white/10 hover:bg-white/20 text-white'

  return (
    <>
      <StyleOnce />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setModal('github')}
          className={`gh-icon-btn flex h-9 w-9 items-center justify-center rounded-lg ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${bg} ${ring}`}
          aria-label="GitHub"
          title="GitHub"
        >
          <span className="gh-icon-sm flex items-center">
            <GitHubIcon className="h-4 w-4" />
          </span>
        </button>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`li-icon-btn flex h-9 w-9 items-center justify-center rounded-lg ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${bg} ${ring}`}
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <span className="li-icon-sm flex items-center">
            <LinkedInIcon className="h-4 w-4" />
          </span>
        </a>
      </div>

      {modal && (
        <ProfileModal
          platform={modal}
          url={GITHUB_URL}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
