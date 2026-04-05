'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  useEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const isMobile = window.innerWidth <= 768

      const gctx = gsap.context(() => {
        // На мобильных анимации skip — элементы сразу видимы
        if (isMobile) return

        gsap.fromTo('.about-intro-text',
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
        )

        gsap.utils.toArray<HTMLElement>('.about-block').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 80%' } }
          )
        })

      })

      ctx.revert = () => {
        gctx.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    init()
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>

      {/* INTRO */}
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

      {/* ОСНОВАТЕЛЬ */}
      <section
        style={{
          background: 'var(--cream)',
          padding: 'clamp(80px, 10vh, 128px) clamp(24px, 5vw, 120px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div
          className="resp-grid-2 about-block"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'center',
          }}
        >
          {/* Фото */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              maxWidth: '440px',
              width: '100%',
            }}
          >
            <Image
              src="/images/founder.png"
              alt="Вячеслав Валерьевич — основатель AutomatikaGroup"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {/* Тонкий оверлей для плавности в цветовую схему */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 70%, rgba(244,237,230,0.15) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Текст */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                marginBottom: '20px',
              }}
            >
              Основатель
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              Вячеслав Валерьевич
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '15px',
                color: 'var(--sage)',
                fontWeight: 500,
                marginBottom: '32px',
                letterSpacing: '0.01em',
              }}
            >
              Основатель & CEO · AutomatikaGroup · Казахстан
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(16px, 1.3vw, 18px)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              AutomatikaLab — флагманский продукт компании AutomatikaGroup.
              Мы специализируемся на автоматизации бизнес-процессов, внедрении
              нейросетей, веб-дизайне и постпродакшне.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(16px, 1.3vw, 18px)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
              }}
            >
              Работаем с малым и средним бизнесом в СНГ. Понимаем специфику
              рынка — знаем что реально работает, а что красиво только на бумаге.
              База в Казахстане, клиенты по всему СНГ.
            </p>

            {/* Теги-пиллы */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '32px' }}>
              {['Автоматизация', 'AI / Нейросети', 'Веб-дизайн', 'Постпродакшн', 'Казахстан'].map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 16px',
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
          </div>
        </div>
      </section>

      {/* ФИЛОСОФИЯ */}
      <section
        style={{
          background: 'var(--cream)',
          padding: 'clamp(64px, 8vh, 96px) clamp(24px, 5vw, 120px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div
          className="resp-grid-2"
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
              AutomatikaLab — агентство нового типа
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
              Стек подбирается под задачу: Python и aiogram для ботов,
              Next.js и GSAP для сайтов, FastAPI для API, Claude и GPT-4
              для AI-продуктов.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              Используем AI-агентов в собственном процессе — не как маркетинг,
              а как реальный инструмент. Это позволяет работать быстрее
              без потери в качестве.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
