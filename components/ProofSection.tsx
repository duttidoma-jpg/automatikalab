'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

export default function ProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Scroll-анимации секции
  useEffect(() => {
    let ctx = { revert: () => {} }
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (window.innerWidth <= 768) return
      const gctx = gsap.context(() => {
        gsap.fromTo('.proof-left',
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        )
        gsap.fromTo('.proof-right',
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        )
        gsap.fromTo('.proof-item',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } }
        )
      }, sectionRef)
      ctx.revert = () => gctx.revert()
    }
    init()
    return () => ctx.revert()
  }, [])

  // Лайтбокс — анимация входа
  useEffect(() => {
    if (!lightboxOpen) return
    const animate = async () => {
      const { gsap } = await import('gsap')
      gsap.fromTo('.lb-overlay', { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
      gsap.fromTo('.lb-modal',
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.34, ease: 'power3.out' }
      )
    }
    animate()
  }, [lightboxOpen])

  const closeLightbox = async () => {
    const { gsap } = await import('gsap')
    gsap.to('.lb-modal', { scale: 0.94, opacity: 0, duration: 0.2, ease: 'power2.in' })
    gsap.to('.lb-overlay', {
      opacity: 0, duration: 0.24, ease: 'power2.in',
      onComplete: () => setLightboxOpen(false),
    })
  }

  return (
    <>
      {/* ─── СЕКЦИЯ СРАВНЕНИЯ ─── */}
      <section ref={sectionRef} style={{ overflow: 'hidden' }}>
        <div className="proof-section-inner" style={{
          display: 'flex',
          minHeight: 'clamp(480px, 58vh, 680px)',
        }}>

          {/* ЛЕВАЯ — "Как обычно" (forest) */}
          <div className="proof-left" style={{
            position: 'relative',
            flex: '0 0 42%',
            background: 'var(--forest)',
            padding: 'clamp(48px, 7vw, 96px) clamp(32px, 4vw, 72px)',
            clipPath: 'polygon(0 0, 100% 0, 86% 100%, 0 100%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
          }}>
            <p className="proof-item" style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
            }}>Как обычно</p>

            <div className="proof-item">
              <span style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'rgba(244,237,230,0.2)',
                textDecoration: 'line-through',
                textDecorationColor: 'rgba(244,237,230,0.15)',
              }}>2–3</span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                color: 'rgba(244,237,230,0.3)',
                marginTop: '4px',
              }}>месяца разработки</span>
            </div>

            <div className="proof-item" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Команда из 5+ человек',
                'От 500 000 ₽ и выше',
                'Месяцы согласований',
                'Результат — в самом конце',
              ].map((text, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'rgba(244,237,230,0.3)',
                  paddingLeft: '14px',
                  borderLeft: '1px solid rgba(244,237,230,0.1)',
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(244,237,230,0.15)',
                }}>{text}</p>
              ))}
            </div>
          </div>

          {/* ПРАВАЯ — "У нас" (cream) */}
          <div className="proof-right" style={{
            flex: '1',
            background: 'var(--cream)',
            padding: 'clamp(48px, 7vw, 96px) clamp(56px, 7vw, 96px) clamp(48px, 7vw, 96px) clamp(64px, 8vw, 96px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Лягушка — декоративный элемент справа */}
            <img
              src="/images/frog-mascot.png"
              alt=""
              aria-hidden="true"
              className="frog-bounce proof-frog"
              style={{
                position: 'absolute',
                right: 'clamp(16px, 5%, 48px)',
                bottom: 'clamp(24px, 6%, 48px)',
                width: 'clamp(140px, 18vw, 220px)',
                height: 'auto',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                opacity: 0.92,
                pointerEvents: 'none',
              }}
            />

            {/* Стрелка — между кнопкой и лягушкой */}
            <svg
              width="110" height="90" viewBox="0 0 110 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="proof-arrow-svg"
              style={{
                position: 'absolute',
                right: 'clamp(150px, 21vw, 260px)',
                bottom: 'clamp(115px, 17%, 165px)',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <defs>
                <marker
                  id="proof-tip"
                  markerWidth="10" markerHeight="8"
                  refX="9" refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 4 L 0 8 Z" fill="#8fa36c" />
                </marker>
              </defs>

              {/* Кривая от лягушки к кнопке с наконечником */}
              <path
                d="M 95 12 C 80 24, 58 44, 36 62 C 24 70, 14 76, 8 82"
                stroke="#8fa36c"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                markerEnd="url(#proof-tip)"
                className="proof-arrow-path"
              />

              {/* Подпись — над стрелкой */}
              <text
                x="80" y="10"
                textAnchor="middle"
                fontFamily="var(--font-inter)"
                fontSize="10"
                fill="#8fa36c"
                opacity="0.8"
                transform="rotate(-12, 80, 10)"
                className="proof-arrow-label"
              >живой пример</text>
            </svg>
            <p className="proof-item" style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
            }}>У нас</p>

            <div className="proof-item">
              <span style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--forest)',
              }}>3</span>
              <span style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--forest)',
                marginLeft: '8px',
              }}>дня</span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                marginTop: '4px',
              }}>от брифа до живого продукта</span>
            </div>

            <div className="proof-item" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Один специалист — полная ответственность',
                'Фиксированная цена без сюрпризов',
                'Видите прогресс каждый день',
                'Результат — уже через 3 дня',
              ].map((text, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--text-secondary)',
                  paddingLeft: '14px',
                  borderLeft: '2px solid var(--sage)',
                }}>{text}</p>
              ))}
            </div>

            {/* KvaKva — кнопка открытия лайтбокса */}
            <div className="proof-item">
              <button
                onClick={() => setLightboxOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'var(--forest)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  transition: 'transform 200ms ease',
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 600, color: 'var(--sage)', marginBottom: '2px' }}>
                    KvaKva — живой пример
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(244,237,230,0.5)' }}>
                    AI travel платформа · построена за 1 день →
                  </p>
                </div>
                <span style={{
                  background: 'var(--sage)',
                  color: 'var(--forest)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '4px 10px',
                  borderRadius: '99px',
                  whiteSpace: 'nowrap',
                }}>1 день</span>
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* ─── ЛАЙТБОКС — рендерим в document.body через портал ─── */}
      {mounted && lightboxOpen && createPortal(
        <div
          className="lb-overlay"
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(46,58,31,0.93)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            className="lb-modal"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--cream)',
              borderRadius: '4px',
              maxWidth: '860px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(32px, 5vw, 56px)',
              position: 'relative',
            }}
          >
            {/* Закрыть */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'none',
                border: '1px solid rgba(46,58,31,0.15)',
                borderRadius: '50%',
                width: '36px', height: '36px',
                cursor: 'pointer',
                fontSize: '18px',
                color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--forest)'; e.currentTarget.style.color = 'var(--forest)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(46,58,31,0.15)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >×</button>

            {/* Заголовок */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <h2 style={{
                  fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>KvaKva</h2>
                <span style={{
                  background: 'var(--forest)',
                  color: 'var(--sage)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  padding: '5px 12px',
                  borderRadius: '99px',
                }}>1 ДЕНЬ</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '540px',
                margin: 0,
              }}>
                AI Travel платформа для рынка СНГ — планировщик маршрутов, авиабилеты, отели. От идеи до продакшна за один рабочий день.
              </p>
            </div>

            {/* Статы */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '28px' }}>
              {[
                { label: 'Разработка', value: '1 день' },
                { label: 'Команда', value: '1 чел.' },
                { label: 'Статус', value: 'Live' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--forest)', padding: '20px 16px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--cream)', letterSpacing: '-0.02em', margin: 0 }}>{s.value}</p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--sage)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Детали */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
              {[
                { title: 'Задача', text: 'AI-сервис планирования путешествий с учётом реалий СНГ: визы, карты, доступные маршруты и цены в рублях.' },
                { title: 'Решение', text: 'Next.js + Claude Haiku (OpenRouter). AI генерирует детальные маршруты по бюджету, дням и предпочтениям пользователя.' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '8px' }}>{item.title}</p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Стек */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '10px' }}>Стек</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Next.js', 'TypeScript', 'Claude AI', 'OpenRouter', 'Vercel'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    padding: '5px 12px',
                    border: '1px solid rgba(46,58,31,0.15)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://kvakva.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 28px',
                background: 'var(--forest)',
                color: 'var(--cream)',
                borderRadius: '99px',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 200ms',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Открыть сайт →
            </a>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
