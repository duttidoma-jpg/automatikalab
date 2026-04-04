'use client'

import { useEffect } from 'react'

export default function AboutPage() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from('.about-intro-text', {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      })

      gsap.utils.toArray<HTMLElement>('.about-block').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 80%' },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
        })
      })
    }
    init()
  }, [])

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>

      {/* INTRO — тёмная секция с манифестом */}
      <section
        style={{
          background: 'var(--forest)',
          color: 'var(--text-inverse)',
          padding: 'clamp(80px, 12vh, 160px) clamp(24px, 5vw, 120px)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <p
          className="about-intro-text"
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
          О нас
        </p>
        <h1>
          <span
            className="about-intro-text"
            style={{
              display: 'block',
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Будущее не страшно.
          </span>
          <span
            className="about-intro-text"
            style={{
              display: 'block',
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontStyle: 'italic',
              color: 'var(--sage-light)',
            }}
          >
            Мы автоматизируем — вы растёте.
          </span>
        </h1>
      </section>

      {/* ФИЛОСОФИЯ */}
      <section
        style={{
          background: 'var(--cream)',
          padding: 'clamp(80px, 10vh, 128px) clamp(24px, 5vw, 120px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'start',
          }}
        >
          <div className="about-block">
            <h2
              style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}
            >
              AutomatikaLab — это агентство нового типа
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              Мы не продаём услуги — мы строим системы. Каждый проект начинается
              с понимания бизнеса и заканчивается работающей автоматизацией,
              которая приносит результат.
            </p>
          </div>
          <div className="about-block">
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              Наш стек — это не дань моде, а выбор инструментов под задачу.
              Python и aiogram для ботов, Next.js и GSAP для сайтов, FastAPI
              для API. Всё подбирается под конкретный проект.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              Работаем с малым и средним бизнесом в СНГ. Понимаем специфику
              рынка, знаем что работает, а что красиво на бумаге.
            </p>
          </div>
        </div>
      </section>

      {/* ЦИФРЫ */}
      <section
        style={{
          background: 'var(--forest)',
          padding: 'clamp(64px, 8vh, 96px) clamp(24px, 5vw, 120px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}
        >
          {[
            { value: '30+', label: 'Проектов запущено' },
            { value: '98%', label: 'Клиентов рекомендуют нас' },
            { value: '3–7', label: 'Дней до первой версии' },
          ].map((stat) => (
            <div
              key={stat.value}
              className="about-block"
              style={{
                padding: 'clamp(32px, 4vw, 48px)',
                borderLeft: '1px solid var(--border-dark)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: 'var(--sage)',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                  color: 'var(--text-inverse)',
                  opacity: 0.6,
                  letterSpacing: '0.02em',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
