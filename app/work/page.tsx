'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 'foodcourt',
    title: 'Атмосфера Фудкорт',
    category: 'Сайт + Автоматизация доставки',
    year: '2024',
    location: 'Сочи',
    description:
      'Фудкорт с четырьмя кухнями под одной крышей. Разработали сайт с системой онлайн-заказов и автоматизированной обработкой заказов — рейтинг 4.9 с 1700+ отзывов.',
    tags: ['Next.js', 'Telegram-бот', 'Автоматизация'],
    hasImage: true,
    imageSrc: '/images/foodcourt.jpg',
    href: 'https://atmosferafood.ru',
    external: true,
  },
  {
    id: 'office-assistant',
    title: 'Office Assistant',
    category: 'AI-ассистент',
    year: '2025',
    location: 'Корпоративный',
    description:
      'Универсальная AI-система для работы с данными. Внедряется в любой бизнес: анализирует документы, отвечает на запросы, автоматизирует рутину. Первый кейс — корпоративная среда банка.',
    tags: ['Claude API', 'RAG', 'Python'],
    hasImage: true,
    imageSrc: '/images/office-assistant.png',
    href: '#',
    external: false,
  },
]

export default function WorkPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const gctx = gsap.context(() => {
        gsap.fromTo(
          '.work-heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
        )

        document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        })
      }, pageRef)

      ctx.revert = () => {
        gctx.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    init()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Заголовок */}
      <div
        style={{
          padding: 'clamp(60px, 8vh, 96px) clamp(24px, 5vw, 120px) clamp(40px, 5vh, 64px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <p
          className="work-heading"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--sage)',
            marginBottom: '16px',
          }}
        >
          Наши проекты
        </p>
        <h1
          className="work-heading"
          style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--text-primary)',
          }}
        >
          Работы
        </h1>
      </div>

      {/* Проекты */}
      <div style={{ padding: '0 clamp(24px, 5vw, 120px)' }}>
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="project-card resp-grid-2 resp-order-reset"
            style={{
              padding: 'clamp(48px, 6vh, 80px) 0',
              borderBottom: '1px solid var(--border-light)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(32px, 5vw, 80px)',
              alignItems: 'center',
            }}
          >
            {/* Изображение — чередуем сторону */}
            <div
              style={{
                order: i % 2 === 0 ? 0 : 1,
                position: 'relative',
                aspectRatio: '16/10',
                overflow: 'hidden',
                borderRadius: 0,
              }}
            >
              {project.hasImage ? (
                <Image
                  src={project.imageSrc!}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="50vw"
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #1d2512 0%, #2e3a1f 40%, #3d4e2a 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Абстрактный паттерн для AI-проекта */}
                  <svg
                    width="120" height="120" viewBox="0 0 120 120" fill="none"
                    style={{ opacity: 0.25 }}
                  >
                    <circle cx="60" cy="60" r="50" stroke="#8fa36c" strokeWidth="1"/>
                    <circle cx="60" cy="60" r="35" stroke="#8fa36c" strokeWidth="1"/>
                    <circle cx="60" cy="60" r="20" stroke="#8fa36c" strokeWidth="1"/>
                    <line x1="60" y1="10" x2="60" y2="110" stroke="#8fa36c" strokeWidth="0.5"/>
                    <line x1="10" y1="60" x2="110" y2="60" stroke="#8fa36c" strokeWidth="0.5"/>
                    <line x1="25" y1="25" x2="95" y2="95" stroke="#8fa36c" strokeWidth="0.5"/>
                    <line x1="95" y1="25" x2="25" y2="95" stroke="#8fa36c" strokeWidth="0.5"/>
                    <circle cx="60" cy="60" r="4" fill="#8fa36c"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Контент */}
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--sage)',
                  }}
                >
                  {project.category}
                </span>
                <span style={{ width: '1px', height: '12px', background: 'var(--border-light)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {project.year} · {project.location}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                }}
              >
                {project.title}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '32px',
                }}
              >
                {project.description}
              </p>

              {/* Теги */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '6px 14px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.external && (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border-light)',
                    paddingBottom: '2px',
                    transition: 'color 200ms, border-color 200ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--sage)'
                    e.currentTarget.style.borderColor = 'var(--sage)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--border-light)'
                  }}
                >
                  Открыть сайт →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Футер работ */}
      <div
        style={{
          padding: 'clamp(48px, 6vh, 80px) clamp(24px, 5vw, 120px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            color: 'var(--text-muted)',
            marginBottom: '24px',
          }}
        >
          Больше проектов — скоро
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            padding: '16px 40px',
            background: 'var(--forest)',
            color: 'var(--text-inverse)',
            borderRadius: '9999px',
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 300ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = 'var(--forest)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--forest)'; e.currentTarget.style.color = 'var(--text-inverse)' }}
        >
          Обсудить ваш проект
        </Link>
      </div>
    </div>
  )
}
