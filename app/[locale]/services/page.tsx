'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const CARD = {
  bg: 'var(--forest)',
  textColor: 'var(--text-inverse)',
  accentColor: 'var(--sage)',
  isLight: false,
  ctaBg: 'var(--sage)',
  ctaColor: 'var(--forest)',
}

export default function ServicesPage() {
  const t = useTranslations('services')
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const services = (t.raw('items') as { number: string; title: string; tagline: string; description: string; outcomes: string[]; forWho: string }[]).map((item) => ({ ...item, ...CARD }))

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const changeService = useCallback((idx: number) => {
    if (idx === activeIdx) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
    timerRef.current = setTimeout(() => { setActiveIdx(idx); setVisible(true) }, 150)
  }, [activeIdx])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  useEffect(() => {
    const init = async () => {
      if (window.innerWidth <= 900) return
      const { gsap } = await import('gsap')
      gsap.fromTo('.srv-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 })
    }
    setTimeout(init, 50)
  }, [])

  const s = services[activeIdx]

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', paddingTop: '80px' }}>

      <div style={{ background: 'var(--cream)', padding: 'clamp(32px, 4vh, 56px) clamp(24px, 5vw, 120px) clamp(24px, 3vh, 40px)', borderBottom: '1px solid var(--border-light)' }}>
        <p className="srv-heading" style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '16px' }}>
          {t('label')}
        </p>
        <h1 className="srv-heading" style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text-primary)' }}>
          {t('heading')}
        </h1>
      </div>

      {isMobile ? (
        <div>
          {services.map((srv) => (
            <div key={srv.number} style={{ background: srv.bg, padding: '48px clamp(24px, 5vw, 120px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-hanken)', fontSize: '13px', fontWeight: 300, color: srv.accentColor, opacity: 0.7 }}>{srv.number}</span>
                <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: srv.textColor }}>{srv.title}</h2>
              </div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: srv.accentColor, marginBottom: '16px' }}>{srv.tagline}</p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', lineHeight: 1.7, color: srv.textColor, opacity: 0.7, marginBottom: '24px' }}>{srv.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {srv.outcomes.map((o) => (
                  <div key={o} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: srv.accentColor, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: srv.textColor, opacity: 0.7 }}>{o}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: srv.textColor, opacity: 0.4 }}>{srv.forWho}</span>
                <Link href="https://t.me/Automaticalabbot" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', padding: '12px 28px', background: srv.ctaBg, color: srv.ctaColor, borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                  {t('discuss')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ width: '42%', position: 'sticky', top: '80px', height: 'calc(100vh - 80px)', borderRight: '1px solid var(--border-light)', background: 'var(--cream)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 'clamp(32px, 4vh, 56px) clamp(24px, 4vw, 80px)', overflowY: 'auto' }}>
            {services.map((srv, i) => (
              <div
                key={srv.number}
                onMouseEnter={() => changeService(i)}
                onClick={() => changeService(i)}
                style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: 'clamp(16px, 2.2vh, 24px) 0', borderBottom: i < services.length - 1 ? '1px solid var(--border-light)' : 'none', cursor: 'pointer', paddingLeft: activeIdx === i ? '10px' : '0', transition: 'padding-left 300ms cubic-bezier(0.25, 0.1, 0.25, 1)' }}
              >
                <div style={{ width: '3px', height: activeIdx === i ? '100%' : '0', minHeight: activeIdx === i ? '28px' : '0', background: 'var(--sage)', borderRadius: '2px', flexShrink: 0, transition: 'min-height 300ms ease' }} />
                <span style={{ fontFamily: 'var(--font-hanken)', fontSize: '12px', fontWeight: 300, color: activeIdx === i ? 'var(--sage)' : 'var(--text-muted)', minWidth: '24px', transition: 'color 200ms' }}>{srv.number}</span>
                <span style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(18px, 1.8vw, 28px)', fontWeight: activeIdx === i ? 700 : 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: activeIdx === i ? 'var(--text-primary)' : 'var(--text-muted)', flex: 1, transition: 'color 200ms' }}>{srv.title}</span>
                <span style={{ color: 'var(--sage)', fontSize: '18px', opacity: activeIdx === i ? 1 : 0, transform: activeIdx === i ? 'translateX(0)' : 'translateX(-8px)', transition: 'opacity 250ms, transform 250ms', flexShrink: 0 }}>→</span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, background: s.bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', minHeight: 'calc(100vh - 80px)', padding: 'clamp(48px, 6vh, 80px) clamp(32px, 4vw, 80px)' }}>
            <div style={{ position: 'absolute', bottom: '-0.12em', right: '-0.02em', fontFamily: 'var(--font-hanken)', fontSize: 'clamp(220px, 32vw, 400px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: 'rgba(244,237,230,0.06)', userSelect: 'none', pointerEvents: 'none', transition: 'color 400ms' }}>
              {s.number}
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 150ms ease, transform 150ms ease' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.accentColor, marginBottom: '20px' }}>{s.tagline}</p>
              <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0, color: s.textColor, marginBottom: '20px' }}>{s.title}</h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.75, color: s.textColor, opacity: 0.68, marginBottom: '32px' }}>{s.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
                {s.outcomes.map((o) => (
                  <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.accentColor, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1vw, 15px)', color: s.textColor, opacity: 0.72 }}>{o}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: s.textColor, opacity: 0.4 }}>
                  {t('forWho', { target: s.forWho })}
                </span>
                <Link
                  href="https://t.me/Automaticalabbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', background: s.ctaBg, color: s.ctaColor, borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', textDecoration: 'none', transition: 'background 400ms ease, transform 200ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {t('discuss')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <section style={{ background: 'var(--cream)', padding: 'clamp(64px, 8vh, 96px) clamp(24px, 5vw, 120px)', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
        <p style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {t('ctaHeading1')}<br />{t('ctaHeading2')}
        </p>
        <Link
          href="https://t.me/Automaticalabbot"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', padding: '18px 48px', background: 'var(--sage)', color: 'var(--forest)', borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 600, letterSpacing: '0.02em', textDecoration: 'none', transition: 'background 300ms ease, transform 200ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sage-dark)'; e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {t('ctaButton')}
        </Link>
      </section>
    </div>
  )
}
