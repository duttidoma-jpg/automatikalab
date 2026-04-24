'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }

    const init = async () => {
      const { gsap } = await import('gsap')
      const isMobile = window.innerWidth <= 768
      const gctx = gsap.context(() => {
        if (isMobile) return
        gsap.timeline({ delay: 0.15 })
          .fromTo('.c-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .fromTo('.c-heading', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
          .fromTo('.c-sub', { opacity: 0, y: 20 }, { opacity: 0.65, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
          .fromTo('.c-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
      }, pageRef)
      ctx.revert = () => gctx.revert()
    }

    init()
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={pageRef}
      style={{
        background: 'var(--forest)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vh, 120px) clamp(24px, 5vw, 120px)',
        textAlign: 'center',
        color: 'var(--text-inverse)',
      }}
    >
      <p className="c-label" style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '32px' }}>
        {t('label')}
      </p>

      <h1 className="c-heading" style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(80px, 14vw, 180px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95, color: 'var(--text-inverse)', marginBottom: '40px' }}>
        {t('heading')}
      </h1>

      <p className="c-sub" style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, maxWidth: '480px', marginBottom: '56px' }}>
        {t('body')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', maxWidth: '380px' }}>
        <a
          className="c-cta"
          href="https://t.me/Automaticalabbot"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '18px 40px', background: 'var(--sage)', color: 'var(--forest)', borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '16px', fontWeight: 600, letterSpacing: '0.02em', textDecoration: 'none', transition: 'background 300ms ease, transform 200ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sage-light)'; e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.77l-1.68 7.92c-.12.55-.46.68-.93.42l-2.58-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.19-2.67 4.84-4.37c.21-.19-.05-.29-.32-.1L7.8 14.23l-2.53-.79c-.55-.17-.56-.55.12-.81l9.88-3.81c.45-.17.85.11.66.95z" fill="currentColor"/>
          </svg>
          {t('telegram')}
        </a>

        <a
          className="c-cta"
          href="https://max.ru/u/f9LHodD0cOKU_ohTHxNZF_PcP9vtHwWwtoLCoVC77jvq62Y3DaGIxzf5WQY"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '18px 40px', background: 'transparent', color: 'var(--text-inverse)', border: '1px solid rgba(244,237,230,0.25)', borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '16px', fontWeight: 500, letterSpacing: '0.02em', textDecoration: 'none', transition: 'border-color 300ms ease, background 300ms ease, transform 200ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.background = 'rgba(143,163,108,0.1)'; e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(244,237,230,0.25)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', background: 'rgba(244,237,230,0.15)', borderRadius: '50%', fontFamily: 'var(--font-hanken)', fontSize: '11px', fontWeight: 700, letterSpacing: '-0.02em' }}>M</span>
          {t('max')}
        </a>

        <a
          className="c-cta"
          href="mailto:contact@automaticalab.app"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--text-inverse)', opacity: 0.4, textDecoration: 'none', borderBottom: '1px solid rgba(244,237,230,0.15)', paddingBottom: '2px', transition: 'opacity 200ms ease', marginTop: '8px' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4' }}
        >
          contact@automaticalab.app
        </a>
      </div>
    </div>
  )
}
