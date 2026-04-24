'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import HeroSection from '@/components/HeroSection'
import ProcessSection from '@/components/ProcessSection'
import ProofSection from '@/components/ProofSection'
import TechSection from '@/components/TechSection'

const MorphingGeometry = dynamic(() => import('@/components/MorphingGeometry'), { ssr: false })

const worksData = [
  { title: 'KvaKva',             category: 'Travel platform',          year: '2025', image: '/images/kvakva.jpg',            href: 'https://kvakva.vercel.app', external: true  },
  { title: 'Office Assistant',   category: 'AI assistant',             year: '2025', image: '/images/office-assistant.png',  href: '/work',                     external: false },
  { title: 'Atmosfera Foodcourt',category: 'Website + Delivery',       year: '2024', image: '/images/foodcourt.jpg',         href: 'https://atmosferafood.ru',  external: true  },
]

export default function HomePage() {
  const t = useTranslations()
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const isMobile = window.innerWidth <= 768

      const gctx = gsap.context(() => {
        if (isMobile) return

        gsap.fromTo(
          '.manifest-line',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: '.manifest-section', start: 'top 78%', once: true },
          }
        )

        gsap.fromTo(
          '.works-header',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: '.works-section', start: 'top 80%', once: true },
          }
        )

        gsap.fromTo(
          '.works-preview-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: '.works-grid', start: 'top 82%', once: true },
          }
        )

        gsap.fromTo(
          '.final-cta',
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: '.final-cta', start: 'top 88%', once: true },
          }
        )
      }, pageRef)

      ctx.revert = () => { gctx.revert() }
    }

    init()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>

      {/* ① HERO */}
      <HeroSection />

      {/* ② МАНИФЕСТ */}
      <section
        className="manifest-section"
        style={{
          background: 'var(--cream)',
          color: 'var(--text-primary)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: 'clamp(40px, 5vh, 64px) clamp(24px, 5vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p
            className="manifest-line"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginBottom: '48px',
            }}
          >
            {t('manifest.label')}
          </p>

          <div>
            <span
              className="manifest-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(32px, 4vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              {t('manifest.heading1')}
            </span>
            <span
              className="manifest-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(32px, 4vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontStyle: 'italic',
                color: 'var(--forest)',
              }}
            >
              {t('manifest.heading2')}
            </span>
          </div>

          <p
            className="manifest-line"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '440px',
              marginTop: '40px',
            }}
          >
            {t('manifest.body')}
          </p>
        </div>

        <div className="manifest-3d" style={{ position: 'relative', background: 'var(--cream)' }}>
          <MorphingGeometry />
        </div>
      </section>

      {/* ③ ДОКАЗАТЕЛЬСТВО */}
      <ProofSection />

      {/* ④ ПРОЦЕСС */}
      <ProcessSection />

      {/* ⑤ ТЕХНОЛОГИИ */}
      <TechSection />

      {/* ⑥ РАБОТЫ */}
      <section
        className="works-section"
        style={{
          background: 'var(--cream)',
          padding: 'clamp(40px, 5vh, 64px) clamp(24px, 5vw, 120px)',
        }}
      >
        {/* Шапка */}
        <div
          className="works-header"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '12px' }}>
              {t('works.label')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {t('works.heading1')}<br />{t('works.heading2')}
            </h2>
          </div>
          <Link
            href="/work"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid var(--border-light)', paddingBottom: '2px', transition: 'border-color 200ms ease, color 200ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.color = 'var(--sage)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          >
            {t('works.allWorks')}
          </Link>
        </div>

        {/* Agency list */}
        <div style={{ borderTop: '1px solid var(--border-light)' }}>
          {worksData.map((work, i) => (
            <Link
              key={work.title}
              href={work.href}
              target={work.external ? '_blank' : undefined}
              rel={work.external ? 'noopener noreferrer' : undefined}
              className="works-preview-card works-row"
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(46,58,31,0.04)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto auto 100px',
                alignItems: 'center',
                gap: '24px',
                padding: 'clamp(18px, 2.5vh, 28px) clamp(12px, 1.5vw, 24px)',
                borderBottom: '1px solid var(--border-light)',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'background 180ms ease',
                cursor: 'pointer',
              }}
            >
              {/* Номер */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Название + категория */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}>
                  {work.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--sage)',
                }}>
                  {work.category}
                </div>
              </div>

              {/* Год */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {work.year}
              </span>

              {/* Стрелка */}
              <span style={{
                fontSize: '18px',
                color: 'var(--sage)',
                lineHeight: 1,
              }}>
                →
              </span>

              {/* Миниатюра — всегда видна, не hover-зависима */}
              <div style={{
                width: '100px',
                height: '64px',
                overflow: 'hidden',
                borderRadius: '6px',
                flexShrink: 0,
                position: 'relative',
                background: 'var(--cream-dark)',
              }}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  sizes="100px"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ⑦ ФИНАЛЬНЫЙ CTA */}
      <section
        className="final-cta"
        style={{
          background: 'var(--forest)',
          padding: 'clamp(64px, 8vh, 96px) clamp(24px, 5vw, 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(22px, 3vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-inverse)',
            lineHeight: 1.2,
          }}
        >
          {t('finalCta.heading1')}<br />{t('finalCta.heading2')}
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '18px 48px',
            background: 'var(--sage)',
            color: 'var(--forest)',
            borderRadius: '9999px',
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            transition: 'background 300ms ease, transform 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sage-light)'; e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {t('finalCta.button')}
        </Link>
      </section>

    </div>
  )
}
