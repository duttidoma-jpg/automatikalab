'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const projectIds = ['foodcourt', 'kvakva', 'office-assistant'] as const
const projectMeta = [
  { id: 'foodcourt', year: '2024', imageSrc: '/images/foodcourt.jpg', imageBg: '#1a1a1a', href: 'https://atmosferafood.ru', external: true },
  { id: 'kvakva',    year: '2025', imageSrc: '/images/kvakva.jpg',    imageBg: '#1a2533', href: 'https://kvakva.vercel.app', external: true },
  { id: 'office-assistant', year: '2025', imageSrc: '/images/office-assistant.png', imageBg: '#f0ede8', href: '#', external: false },
]

export default function WorkPage() {
  const t = useTranslations('work')
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
        gsap.fromTo('.work-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 })
        document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
          gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
        })
      }, pageRef)
      ctx.revert = () => { gctx.revert(); ScrollTrigger.getAll().forEach((tr) => tr.kill()) }
    }
    init()
    return () => ctx.revert()
  }, [])

  const projects = t.raw('projects') as { title: string; category: string; location: string; description: string }[]

  return (
    <div ref={pageRef} style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: '80px' }}>

      <div style={{ padding: 'clamp(32px, 4vh, 56px) clamp(24px, 5vw, 120px) clamp(24px, 3vh, 40px)', borderBottom: '1px solid var(--border-light)' }}>
        <p className="work-heading" style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '16px' }}>
          {t('label')}
        </p>
        <h1 className="work-heading" style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text-primary)' }}>
          {t('heading')}
        </h1>
      </div>

      <div style={{ padding: '0 clamp(24px, 5vw, 120px)' }}>
        {projectMeta.map((meta, i) => {
          const proj = projects[i]
          return (
            <article
              key={meta.id}
              className="project-card resp-grid-2 resp-order-reset"
              style={{ padding: 'clamp(28px, 3.5vh, 48px) 0', borderBottom: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}
            >
              <div
                className="project-image-wrap"
                style={{ order: i % 2 === 0 ? 0 : 1, position: 'relative', aspectRatio: '16/10', overflow: 'hidden', width: '100%', background: meta.imageBg }}
              >
                <Image src={meta.imageSrc} alt={proj.title} fill style={{ objectFit: 'contain', objectPosition: 'center' }} sizes="50vw" />
              </div>

              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                    {proj.category}
                  </span>
                  <span style={{ width: '1px', height: '12px', background: 'var(--border-light)' }} />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {meta.year} · {proj.location}
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '20px' }}>
                  {proj.title}
                </h2>

                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  {proj.description}
                </p>

                {meta.external && (
                  <Link
                    href={meta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid var(--border-light)', paddingBottom: '2px', transition: 'color 200ms, border-color 200ms' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sage)'; e.currentTarget.style.borderColor = 'var(--sage)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-light)' }}
                  >
                    {t('openSite')}
                  </Link>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <div style={{ padding: 'clamp(48px, 6vh, 80px) clamp(24px, 5vw, 120px)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          {t('moreSoon')}
        </p>
        <Link
          href="/contact"
          style={{ display: 'inline-flex', padding: '16px 40px', background: 'var(--forest)', color: 'var(--text-inverse)', borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'background 300ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = 'var(--forest)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--forest)'; e.currentTarget.style.color = 'var(--text-inverse)' }}
        >
          {t('discussProject')}
        </Link>
      </div>
    </div>
  )
}
