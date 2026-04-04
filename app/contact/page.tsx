'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }

    const init = async () => {
      const { gsap } = await import('gsap')

      const gctx = gsap.context(() => {
        gsap.timeline({ delay: 0.15 })
          .fromTo('.c-label',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          )
          .fromTo('.c-heading',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo('.c-sub',
            { opacity: 0, y: 20 },
            { opacity: 0.65, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo('.c-cta',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          )
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
      <p
        className="c-label"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--sage)',
          marginBottom: '32px',
        }}
      >
        Готовы к следующему шагу?
      </p>

      <h1
        className="c-heading"
        style={{
          fontFamily: 'var(--font-hanken)',
          fontSize: 'clamp(80px, 14vw, 180px)',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          color: 'var(--text-inverse)',
          marginBottom: '40px',
        }}
      >
        Начнём?
      </h1>

      <p
        className="c-sub"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          lineHeight: 1.6,
          maxWidth: '480px',
          marginBottom: '56px',
        }}
      >
        Расскажите о задаче — остальное возьмём на себя
      </p>

      <div
        className="c-cta"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
      >
        <Link
          href="https://t.me/automatikalab"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '20px 56px',
            background: 'var(--sage)',
            color: 'var(--forest)',
            borderRadius: '9999px',
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            transition: 'background 300ms ease, transform 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--sage-light)'
            e.currentTarget.style.transform = 'scale(1.03)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--sage)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Написать в Telegram
        </Link>

        <a
          href="mailto:contact@automaticalab.app"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            color: 'var(--text-inverse)',
            opacity: 0.45,
            textDecoration: 'none',
            borderBottom: '1px solid rgba(244,237,230,0.2)',
            paddingBottom: '2px',
            transition: 'opacity 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.45' }}
        >
          contact@automaticalab.app
        </a>
      </div>
    </div>
  )
}
