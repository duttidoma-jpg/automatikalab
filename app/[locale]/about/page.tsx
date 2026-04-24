'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about')

  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const isMobile = window.innerWidth <= 768
      const gctx = gsap.context(() => {
        if (isMobile) return
        gsap.fromTo('.about-intro-text', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out', delay: 0.3 })
        gsap.utils.toArray<HTMLElement>('.about-block').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
        })
      })
      ctx.revert = () => { gctx.revert(); ScrollTrigger.getAll().forEach((tr) => tr.kill()) }
    }
    init()
    return () => ctx.revert()
  }, [])

  const tags = t.raw('tags') as string[]
  const principles = t.raw('principles') as { title: string; desc: string }[]

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>

      {/* INTRO */}
      <section style={{ background: 'var(--forest)', color: 'var(--text-inverse)', padding: 'clamp(48px, 6vh, 80px) clamp(24px, 5vw, 120px) clamp(40px, 5vh, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <p className="about-intro-text" style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '48px' }}>
          {t('label')}
        </p>
        <h1>
          <span className="about-intro-text" style={{ display: 'block', fontFamily: 'var(--font-hanken)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {t('heading1')}
          </span>
          <span className="about-intro-text" style={{ display: 'block', fontFamily: 'var(--font-hanken)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', fontStyle: 'italic', color: 'var(--sage-light)' }}>
            {t('heading2')}
          </span>
        </h1>
      </section>

      {/* ОСНОВАТЕЛЬ */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 5vh, 64px) clamp(24px, 5vw, 120px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="resp-grid-2 about-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'center' }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', maxWidth: '440px', width: '100%' }}>
            <Image src="/images/founder.png" alt={t('founderName')} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 768px) 100vw, 40vw" priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 70%, rgba(244,237,230,0.15) 100%)', pointerEvents: 'none' }} />
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '20px' }}>
              {t('founderLabel')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {t('founderName')}
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: 'var(--sage)', fontWeight: 500, marginBottom: '32px', letterSpacing: '0.01em' }}>
              {t('founderRole')}
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {t('founderBio1')}
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
              {t('founderBio2')}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '32px' }}>
              {tags.map((tag) => (
                <span key={tag} style={{ padding: '6px 16px', border: '1px solid var(--border-light)', borderRadius: '9999px', fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ФИЛОСОФИЯ */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 5vh, 64px) clamp(24px, 5vw, 120px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'start' }}>
          <div className="about-block">
            <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '24px' }}>
              {t('philHeading1')}
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t('philBody1')}
            </p>
          </div>
          <div className="about-block">
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {t('philBody2')}
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t('philBody3')}
            </p>
          </div>
        </div>
      </section>

      {/* AI-FIRST */}
      <section className="about-block" style={{ background: 'var(--forest)', padding: 'clamp(48px, 6vh, 80px) clamp(24px, 5vw, 120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'end', marginBottom: 'clamp(64px, 10vh, 100px)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '32px' }}>
              {t('agentLabel')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--text-inverse)' }}>
              {t('agentHeading1')}<br />
              <span style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>{t('agentHeading2')}</span>
              <br />{t('agentHeading3')}<br />{t('agentHeading4')}
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.7, color: 'var(--text-inverse)', opacity: 0.6, maxWidth: '480px' }}>
            {t('agentBody')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {principles.map((item, i) => (
            <div
              key={item.title}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '40px',
                alignItems: 'start',
                padding: 'clamp(24px, 3vh, 36px) 0',
                borderTop: '1px solid rgba(244,237,230,0.1)',
                ...(i === 2 ? { borderBottom: '1px solid rgba(244,237,230,0.1)' } : {}),
              }}
            >
              <span style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sage)' }}>
                {item.title}
              </span>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.65, color: 'var(--text-inverse)', opacity: 0.55, paddingTop: '4px' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
