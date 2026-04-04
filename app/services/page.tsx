'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    number: '01',
    title: 'Telegram-боты',
    description:
      'Автоматизируем приём заявок, консультации и уведомления. Бот работает 24/7 без вашего участия — клиенты получают ответы мгновенно.',
    bg: 'var(--cream)',
    color: 'var(--text-primary)',
    numColor: 'var(--text-primary)',
    border: '1px solid var(--border-light)',
  },
  {
    number: '02',
    title: 'AI-ассистенты',
    description:
      'Умные ассистенты на базе GPT-4 и Claude. Обрабатывают документы, отвечают на вопросы, помогают с рутинными задачами вашей команды.',
    bg: 'var(--forest)',
    color: 'var(--text-inverse)',
    numColor: 'var(--text-inverse)',
    border: 'none',
  },
  {
    number: '03',
    title: 'Автоматизация',
    description:
      'Связываем CRM, мессенджеры, таблицы и сервисы в единую систему. Ручной труд превращается в автоматические процессы.',
    bg: 'var(--cream)',
    color: 'var(--text-primary)',
    numColor: 'var(--text-primary)',
    border: '1px solid var(--border-light)',
  },
  {
    number: '04',
    title: 'Сайты',
    description:
      'Корпоративные сайты и лендинги с дизайном уровня Awwwards. Быстро, адаптивно, с анимациями которые запоминаются.',
    bg: 'var(--forest)',
    color: 'var(--text-inverse)',
    numColor: 'var(--text-inverse)',
    border: 'none',
  },
]

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Заголовок страницы
      gsap.fromTo(
        '.srv-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      )

      // Каждая строка услуги
      document.querySelectorAll<HTMLElement>('.srv-row').forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll('.srv-cell'),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })

      ctx.revert = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
        gsap.killTweensOf('*')
      }
    }

    init()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Заголовок */}
      <div
        style={{
          background: 'var(--cream)',
          padding: 'clamp(60px, 8vh, 96px) clamp(24px, 5vw, 120px) clamp(40px, 5vh, 64px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <p
          className="srv-heading"
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
          Что мы делаем
        </p>
        <h1
          className="srv-heading"
          style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--text-primary)',
          }}
        >
          Услуги
        </h1>
      </div>

      {/* Список услуг */}
      {services.map((service) => (
        <div
          key={service.number}
          className="srv-row"
          style={{
            background: service.bg,
            borderTop: service.border,
            padding: 'clamp(48px, 7vh, 96px) clamp(24px, 5vw, 120px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr 1fr',
              gap: 'clamp(24px, 4vw, 64px)',
              alignItems: 'start',
            }}
          >
            {/* Номер */}
            <span
              className="srv-cell"
              style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(56px, 7vw, 100px)',
                fontWeight: 300,
                lineHeight: 1,
                color: service.numColor,
                opacity: 0.2,
                display: 'block',
              }}
            >
              {service.number}
            </span>

            {/* Название */}
            <h2
              className="srv-cell"
              style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(28px, 3.5vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: service.color,
                paddingTop: '8px',
              }}
            >
              {service.title}
            </h2>

            {/* Описание */}
            <p
              className="srv-cell"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                color: service.color,
                opacity: 0.72,
                paddingTop: '12px',
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
