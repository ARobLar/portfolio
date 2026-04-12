'use client'

import { useEffect, useRef } from 'react'

interface ProfileModalProps {
  platform: 'github' | 'linkedin'
  url: string
  onClose: () => void
}

// ── Shared icons ──────────────────────────────────────────────────────────────
function LiIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GhIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

// ── Header bar (shared) ───────────────────────────────────────────────────────
function ModalHeader({
  platform, url, onClose,
}: { platform: 'github' | 'linkedin'; url: string; onClose: () => void }) {
  const isLi = platform === 'linkedin'
  const color  = isLi ? '#0077b5' : '#24292f'
  const accent = isLi ? '#00a0dc' : '#4f79c4'
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color} 0%, ${accent} 100%)`,
      padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
    }}>
      <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 7 }}>
        {isLi ? <LiIcon size={18} /> : <GhIcon size={18} />}
        <span style={{ fontWeight: 700, fontSize: 14 }}>{isLi ? 'LinkedIn' : 'GitHub'}</span>
      </span>
      <span style={{ flex: 1, fontSize: 11, color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
      <a href={url} target="_blank" rel="noopener noreferrer"
        style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:7, padding:'5px 11px', color:'#fff', fontSize:12, fontWeight:600, textDecoration:'none', flexShrink:0 }}
        onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.28)')}
        onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,255,255,0.15)')}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" style={{width:12,height:12}} aria-hidden="true"><path d="M6.5 1.75a.75.75 0 0 0 0 1.5h4.19L3.22 10.72a.75.75 0 1 0 1.06 1.06l7.47-7.47v4.19a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75h-6z"/></svg>
        Open
      </a>
      <button onClick={onClose} aria-label="Close"
        style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:7, width:30, height:30, color:'#fff', cursor:'pointer' }}
        onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,80,80,0.45)')}
        onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,255,255,0.12)')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={14} height={14} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  )
}

// ── LinkedIn profile mockup ───────────────────────────────────────────────────
function LinkedInProfile({ url }: { url: string }) {
  const LI_BLUE = '#0a66c2'
  const BG = '#f3f2ef'
  const CARD: React.CSSProperties = { background: '#fff', borderRadius: 8, marginBottom: 8, overflow: 'hidden' }
  const SEC_TITLE: React.CSSProperties = { fontSize: 20, fontWeight: 600, color: 'rgba(0,0,0,.9)', margin: '0 0 12px' }

  type ExpEntry = { logo: React.ReactNode; title: string; company: string; period: string; location?: string; desc?: string }
  type EduEntry = { logo: React.ReactNode; school: string; degree: string; years: string }

  const Badge = ({ initials, bg }: { initials: string; bg: string }) => (
    <div style={{ width:48, height:48, borderRadius:4, background:bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:14, flexShrink:0 }}>
      {initials}
    </div>
  )

  const experiences: ExpEntry[] = [
    {
      logo: <img src="/logos/soprasteria.svg" alt="Sopra Steria" style={{width:48,height:48,objectFit:'contain',borderRadius:4,border:'1px solid #e0e0e0'}} />,
      title: 'Senior AI & Software Consultant',
      company: 'Sopra Steria',
      period: 'May 2025 – Present · 1 yr',
      location: 'Stockholm, Sweden',
      desc: 'Technical Owner and .NET developer on Region Stockholm's Assistive Devices Portal, building an API integration layer for 300+ healthcare suppliers.',
    },
    {
      logo: <Badge initials="EL" bg="#1a1a2e" />,
      title: 'CTO & Co-Founder',
      company: 'Elefant',
      period: 'Feb 2024 – Apr 2025 · 1 yr 3 mos',
      location: 'Sweden',
      desc: 'Co-founded a Retail Media Network combining physical in-store touchpoints with AI-driven digital campaigns. First pilot delivered 300% sales uplift.',
    },
    {
      logo: <Badge initials="UB" bg="#6366f1" />,
      title: 'Tech Lead & Solution Architect',
      company: 'Ubit',
      period: 'Feb 2023 – Apr 2025 · 2 yrs 3 mos',
      location: 'Sweden',
      desc: 'Delivered four digital platforms for startup clients across EdTech, fintech, e-commerce, and events as sole technical owner.',
    },
    {
      logo: <img src="/logos/abb.svg" alt="ABB" style={{width:48,height:48,objectFit:'contain',borderRadius:4,border:'1px solid #e0e0e0'}} />,
      title: 'Solution Architect & Full Stack Developer',
      company: 'ABB',
      period: 'Feb 2021 – Jul 2022 · 1 yr 6 mos',
      location: 'Sweden',
      desc: 'Designed the Industry 4.0 cloud architecture enabling centralised control of autonomous robot cells across factory floors.',
    },
    {
      logo: <img src="/logos/2m-engineering.svg" alt="2M Engineering" style={{width:48,height:48,objectFit:'contain',borderRadius:4,border:'1px solid #e0e0e0'}} />,
      title: 'Tech Lead & Solution Architect',
      company: '2M Engineering',
      period: 'Feb 2019 – Sep 2020 · 1 yr 8 mos',
      location: 'Netherlands',
      desc: 'Built real-time 3D rehabilitation platforms using wearable sensors for home-based stroke and hand therapy.',
    },
  ]

  const education: EduEntry[] = [
    {
      logo: <Badge initials="JU" bg="#0891b2" />,
      school: 'Jönköping University',
      degree: 'MSc, Artificial Intelligence',
      years: '2021 – 2022',
    },
    {
      logo: <Badge initials="MDH" bg="#7c3aed" />,
      school: 'Mälardalen University',
      degree: 'BSc+MSc, Robotics — Software & Architecture',
      years: '2014 – 2020',
    },
    {
      logo: <Badge initials="TU/e" bg="#d97706" />,
      school: 'Technische Universiteit Eindhoven',
      degree: 'Exchange Semester — Machine Learning, Signal Processing, BI',
      years: '2018',
    },
  ]

  const skills = ['Agentic AI', 'C# / .NET', 'Next.js', 'Azure', 'Solution Architecture', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'REST APIs', 'Machine Learning', 'LLM Integration']

  return (
    <div style={{ background: BG, overflowY: 'auto', flex: 1, fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif' }}>

      {/* LinkedIn nav bar */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e0e0e0', padding:'0 16px', display:'flex', alignItems:'center', gap:8, height:52, position:'sticky', top:0, zIndex:10 }}>
        {/* Logo */}
        <div style={{ width:34, height:34, borderRadius:4, background:'#0a66c2', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:18, flexShrink:0 }}>in</div>
        {/* Search */}
        <div style={{ background:'#eef3f8', borderRadius:4, padding:'6px 10px', fontSize:13, color:'#666', display:'flex', alignItems:'center', gap:6, minWidth:140 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2} width={14} height={14}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Search
        </div>
        <div style={{ flex:1 }} />
        {/* Nav icons */}
        {['Home','Network','Jobs','Messaging'].map(label => (
          <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, cursor:'default', opacity:.7 }}>
            <div style={{ width:22, height:22, background:'#e0e0e0', borderRadius:2 }} />
            <span style={{ fontSize:10, color:'#666' }}>{label}</span>
          </div>
        ))}
        <div style={{ width:32, height:32, borderRadius:'50%', background:'#c0c0c0', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#fff', fontSize:13 }}>RL</div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '8px 0 24px' }}>

        {/* Profile card */}
        <div style={CARD}>
          {/* Banner */}
          <div style={{ height: 100, background: 'linear-gradient(135deg, #1e3a5f 0%, #0a66c2 60%, #00a0dc 100%)', position:'relative' }}>
            {/* open profile link */}
            <a href={url} target="_blank" rel="noopener noreferrer"
              style={{ position:'absolute', top:8, right:8, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:6, padding:'4px 10px', color:'#fff', fontSize:11, fontWeight:600, textDecoration:'none', backdropFilter:'blur(4px)' }}>
              View on LinkedIn ↗
            </a>
          </div>

          {/* Avatar */}
          <div style={{ padding: '0 20px', position:'relative' }}>
            <div style={{ width:80, height:80, borderRadius:'50%', background:'#0a66c2', border:'3px solid #fff', position:'absolute', top:-40, left:20, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:26, boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
              RL
            </div>
            <div style={{ paddingTop: 48 }}>
              <h1 style={{ margin:'0 0 2px', fontSize:22, fontWeight:600, color:'rgba(0,0,0,.9)' }}>Robin Larsson</h1>
              <p style={{ margin:'0 0 4px', fontSize:14, color:'rgba(0,0,0,.7)', lineHeight:1.4 }}>
                Senior AI &amp; Software Consultant · MSc Robotics &amp; AI · .NET · Next.js · Azure
              </p>
              <p style={{ margin:'0 0 6px', fontSize:13, color:'rgba(0,0,0,.6)' }}>
                Stockholm, Stockholm County, Sweden
              </p>
              <p style={{ margin:'0 0 12px', fontSize:13, color: LI_BLUE, fontWeight:500, cursor:'default' }}>
                500+ connections
              </p>
              {/* CTA buttons */}
              <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  style={{ padding:'5px 16px', borderRadius:99, background:LI_BLUE, color:'#fff', fontSize:14, fontWeight:600, textDecoration:'none' }}>
                  Connect
                </a>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  style={{ padding:'5px 16px', borderRadius:99, border:`1px solid ${LI_BLUE}`, color:LI_BLUE, fontSize:14, fontWeight:600, textDecoration:'none', background:'transparent' }}>
                  Message
                </a>
                <div style={{ padding:'5px 12px', borderRadius:99, border:'1px solid #666', color:'#666', fontSize:14, fontWeight:600, cursor:'default' }}>
                  More ▾
                </div>
              </div>
              {/* Current & Education */}
              <div style={{ borderTop:'1px solid #e0e0e0', paddingTop:10, display:'flex', gap:20, fontSize:13, color:'rgba(0,0,0,.6)', marginBottom:4 }}>
                <div>
                  <div style={{ fontWeight:600, color:'rgba(0,0,0,.8)', marginBottom:2 }}>Current</div>
                  <div>Senior Consultant at Sopra Steria</div>
                </div>
                <div>
                  <div style={{ fontWeight:600, color:'rgba(0,0,0,.8)', marginBottom:2 }}>Education</div>
                  <div>MSc AI · Jönköping University</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div style={{ ...CARD, padding: '16px 20px' }}>
          <h2 style={SEC_TITLE}>About</h2>
          <p style={{ fontSize:14, color:'rgba(0,0,0,.8)', lineHeight:1.6, margin:0 }}>
            Senior AI &amp; Software Consultant with 8+ years of experience across Sweden, the Netherlands, and Japan.
            I build digital platforms with AI integrations — from MVP to production-grade systems — combining deep
            technical expertise with sharp business acumen.<br/><br/>
            MSc Robotics · MSc Artificial Intelligence · Background in startups, high-critical systems &amp; R&amp;D.
            Currently Senior Consultant at Sopra Steria, previously CTO &amp; Co-Founder at Elefant, Tech Lead at Ubit,
            and Solution Architect at ABB.
          </p>
        </div>

        {/* Experience */}
        <div style={{ ...CARD, padding: '16px 20px' }}>
          <h2 style={SEC_TITLE}>Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} style={{ display:'flex', gap:12, marginBottom: i < experiences.length-1 ? 20 : 0 }}>
              {exp.logo}
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color:'rgba(0,0,0,.9)' }}>{exp.title}</div>
                <div style={{ fontSize:13, color:'rgba(0,0,0,.9)', marginTop:1 }}>{exp.company}</div>
                <div style={{ fontSize:12, color:'rgba(0,0,0,.6)', marginTop:1 }}>{exp.period}</div>
                {exp.location && <div style={{ fontSize:12, color:'rgba(0,0,0,.6)' }}>{exp.location}</div>}
                {exp.desc && <div style={{ fontSize:13, color:'rgba(0,0,0,.75)', marginTop:6, lineHeight:1.5 }}>{exp.desc}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ ...CARD, padding: '16px 20px' }}>
          <h2 style={SEC_TITLE}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ display:'flex', gap:12, marginBottom: i < education.length-1 ? 16 : 0 }}>
              {edu.logo}
              <div>
                <div style={{ fontSize:15, fontWeight:600, color:'rgba(0,0,0,.9)' }}>{edu.school}</div>
                <div style={{ fontSize:13, color:'rgba(0,0,0,.8)', marginTop:1 }}>{edu.degree}</div>
                <div style={{ fontSize:12, color:'rgba(0,0,0,.6)', marginTop:1 }}>{edu.years}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ ...CARD, padding: '16px 20px' }}>
          <h2 style={SEC_TITLE}>Skills</h2>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {skills.map(s => (
              <span key={s} style={{ padding:'4px 12px', borderRadius:99, border:'1px solid #e0e0e0', fontSize:13, color:'rgba(0,0,0,.8)', background:'#f9f9f9' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── GitHub profile mockup ─────────────────────────────────────────────────────
function GitHubProfile({ url }: { url: string }) {
  return (
    <div style={{ background:'#0d1117', overflowY:'auto', flex:1, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif', color:'#e6edf3' }}>
      {/* GitHub nav */}
      <div style={{ background:'#161b22', borderBottom:'1px solid #30363d', padding:'12px 16px', display:'flex', alignItems:'center', gap:10, position:'sticky', top:0, zIndex:10 }}>
        <svg viewBox="0 0 16 16" fill="#e6edf3" width={24} height={24} aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        <span style={{ fontWeight:600, fontSize:14, color:'#e6edf3' }}>GitHub</span>
        <div style={{ flex:1 }} />
        <a href={url} target="_blank" rel="noopener noreferrer"
          style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #30363d', background:'#21262d', color:'#e6edf3', fontSize:12, fontWeight:500, textDecoration:'none' }}>
          View profile ↗
        </a>
      </div>
      {/* Profile layout */}
      <div style={{ maxWidth:800, margin:'0 auto', padding:'20px 16px', display:'flex', gap:24, flexWrap:'wrap' }}>
        {/* Left col */}
        <div style={{ width:240, flexShrink:0 }}>
          <div style={{ width:240, height:240, borderRadius:'50%', background:'#21262d', border:'1px solid #30363d', display:'flex', alignItems:'center', justifyContent:'center', fontSize:72, fontWeight:700, color:'#58a6ff', marginBottom:16 }}>RL</div>
          <h1 style={{ margin:'0 0 2px', fontSize:24, fontWeight:600, color:'#e6edf3' }}>Robin Larsson</h1>
          <p style={{ margin:'0 0 12px', fontSize:16, color:'#8b949e' }}>ARobLar</p>
          <a href={url} target="_blank" rel="noopener noreferrer"
            style={{ display:'block', width:'100%', padding:'5px 0', borderRadius:6, border:'1px solid #30363d', background:'#21262d', color:'#e6edf3', fontSize:14, fontWeight:500, textDecoration:'none', textAlign:'center', marginBottom:16 }}>
            Follow
          </a>
          <p style={{ fontSize:14, color:'#e6edf3', marginBottom:12, lineHeight:1.5 }}>
            Senior AI &amp; Software Consultant · MSc Robotics &amp; AI · Building AI-powered platforms.
          </p>
          <div style={{ fontSize:13, color:'#8b949e', display:'flex', flexDirection:'column', gap:6 }}>
            <span>📍 Stockholm, Sweden</span>
            <span>🏢 Sopra Steria</span>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color:'#58a6ff', textDecoration:'none' }}>🔗 linkedin.com/in/robin-larsson...</a>
          </div>
          <div style={{ marginTop:16, fontSize:13, color:'#e6edf3' }}>
            <span style={{ color:'#e6edf3', fontWeight:600 }}>47</span><span style={{ color:'#8b949e' }}> followers · </span>
            <span style={{ color:'#e6edf3', fontWeight:600 }}>62</span><span style={{ color:'#8b949e' }}> following</span>
          </div>
        </div>
        {/* Right col */}
        <div style={{ flex:1, minWidth:280 }}>
          {/* Contribution graph placeholder */}
          <div style={{ background:'#161b22', border:'1px solid #30363d', borderRadius:8, padding:16, marginBottom:16 }}>
            <div style={{ fontSize:13, color:'#8b949e', marginBottom:10 }}>contributions in the last year</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(52,1fr)', gap:2 }}>
              {Array.from({length:364}).map((_,i) => {
                const v = Math.random()
                const bg = v < 0.6 ? '#161b22' : v < 0.75 ? '#0e4429' : v < 0.87 ? '#006d32' : v < 0.95 ? '#26a641' : '#39d353'
                return <div key={i} style={{ aspectRatio:'1', background:bg, borderRadius:2 }} />
              })}
            </div>
          </div>
          {/* Pinned repos */}
          <h2 style={{ fontSize:14, fontWeight:600, color:'#e6edf3', marginBottom:10 }}>Pinned</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
            {[
              { name:'portfolio', desc:'Personal portfolio — Next.js, Tailwind, Cloudflare Pages', lang:'TypeScript', color:'#3178c6' },
              { name:'job-hunter', desc:'AI-powered job search tool using Claude + Swedish job API', lang:'TypeScript', color:'#3178c6' },
              { name:'industry40-cloud', desc:'ABB Industry 4.0 cloud architecture PoC', lang:'C#', color:'#178600' },
              { name:'rehabilitation-platform', desc:'Real-time 3D rehab platform with wearable sensors', lang:'C#', color:'#178600' },
            ].map(repo => (
              <div key={repo.name} style={{ background:'#161b22', border:'1px solid #30363d', borderRadius:6, padding:12 }}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, fontWeight:600, color:'#58a6ff', textDecoration:'none' }}>ARobLar/{repo.name}</a>
                <p style={{ fontSize:12, color:'#8b949e', margin:'6px 0 8px', lineHeight:1.4 }}>{repo.desc}</p>
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#8b949e' }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:repo.color, display:'inline-block' }} />
                  {repo.lang}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ProfileModal({ platform, url, onClose }: ProfileModalProps) {
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

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
      style={{
        position:'fixed', inset:0, zIndex:1000,
        background:'rgba(0,0,0,0.7)',
        backdropFilter:'blur(8px)',
        WebkitBackdropFilter:'blur(8px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'16px',
      }}
    >
      <div style={{
        width:'100%',
        maxWidth: platform === 'linkedin' ? 720 : 860,
        height:'min(88vh, 740px)',
        borderRadius:16,
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        boxShadow:'0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <ModalHeader platform={platform} url={url} onClose={onClose} />
        {platform === 'linkedin'
          ? <LinkedInProfile url={url} />
          : <GitHubProfile url={url} />
        }
      </div>
    </div>
  )
}
