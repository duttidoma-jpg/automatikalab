'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import WorkCard from '@/components/WorkCard'
import ProcessSection from '@/components/ProcessSection'
import CurveDivider from '@/components/CurveDivider'

// Цветовой ритм главной страницы:
// forest → cream → caramel → forest → cream → caramel → forest
// Каждый переход оформлен через CurveDivider — органическая SVG-кривая

export default function HomePage() {
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

        // Манифест
        gsap.fromTo(
          '.manifest-line',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: '.manifest-section', start: 'top 78%', once: true },
          }
        )

        // Заголовок работ
        gsap.fromTo(
          '.works-header',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: '.works-section', start: 'top 80%', once: true },
          }
        )

        // Карточки
        gsap.fromTo(
          '.works-preview-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: '.works-grid', start: 'top 82%', once: true },
          }
        )

        // Финальный CTA
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

      {/* ① HERO — forest */}
      <HeroSection />

      {/* forest → cream */}
      <CurveDivider from="var(--forest)" to="var(--cream)" variant={0} />

      {/* ② МАНИФЕСТ — cream */}
      <section
        className="manifest-section"
        style={{
          background: 'var(--cream)',
          color: 'var(--text-primary)',
          padding: 'clamp(64px, 10vh, 128px) clamp(24px, 5vw, 120px)',
        }}
      >
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
          Наш манифест
        </p>

        <div>
          <span
            className="manifest-line"
            style={{
              display: 'block',
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            Будущее — не страшно.
          </span>
          <span
            className="manifest-line"
            style={{
              display: 'block',
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontStyle: 'italic',
              color: 'var(--forest)',
            }}
          >
            Мы проведём за руку.
          </span>
        </div>

        <p
          className="manifest-line"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            marginTop: '40px',
          }}
        >
          Автоматизация — это не технология ради технологии.
          Это конкурентное преимущество, которое работает прямо сейчас,
          пока другие ещё принимают решение.
        </p>
      </section>

      {/* cream → caramel */}
      <CurveDivider from="var(--cream)" to="var(--caramel)" variant={2} />

      {/* ③ ПРОЦЕСС — caramel */}
      <ProcessSection />

      {/* caramel → forest */}
      <CurveDivider from="var(--caramel)" to="var(--forest)" variant={1} />

      {/* ④ ТЕХНОЛОГИИ — forest */}
      <section
        style={{
          background: 'var(--forest)',
          padding: 'clamp(64px, 10vh, 128px) clamp(24px, 5vw, 120px)',
        }}
      >
        <div
          className="resp-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                marginBottom: '24px',
              }}
            >
              Технологии
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-hanken)',
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'var(--text-inverse)',
                marginBottom: '28px',
              }}
            >
              Автоматизация внутри нашей автоматизации
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--text-inverse)',
                opacity: 0.65,
                maxWidth: '480px',
              }}
            >
              Мы используем AI-агентов в собственном процессе разработки.
              Это не маркетинг — это то, как мы работаем каждый день.
              Быстрее, точнее, без потери в качестве.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { label: 'Агентный пайплайн', desc: 'Каждый проект проходит через систему специализированных AI-агентов — от брифа до деплоя' },
              { label: 'Параллельная разработка', desc: 'Дизайн, бэкенд и фронтенд строятся одновременно. Мы не ждём — мы делаем' },
              { label: 'Автоматическое тестирование', desc: 'Проверка качества встроена в процесс, а не добавлена в конце' },
              { label: 'Живые инструменты', desc: 'Claude, GPT-4, Higgsfield, GSAP — мы работаем с тем, что даёт результат сегодня' },
            ].map((item) => (
              <div
                key={item.label}
                className="tech-table-row"
                style={{
                  padding: '20px 24px',
                  borderTop: '1px solid rgba(244,237,230,0.08)',
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: '24px',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, color: 'var(--sage)', letterSpacing: '0.01em', paddingTop: '2px' }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-inverse)', opacity: 0.55 }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* forest → cream */}
      <CurveDivider from="var(--forest)" to="var(--cream)" variant={2} />

      {/* ⑤ РАБОТЫ — cream */}
      <section
        className="works-section"
        style={{
          background: 'var(--cream)',
          padding: 'clamp(64px, 10vh, 128px) clamp(24px, 5vw, 120px)',
        }}
      >
        <div
          className="works-header"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '12px' }}>
              Избранные работы
            </p>
            <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Проекты которые<br />говорят сами за себя
            </h2>
          </div>
          <Link
            href="/work"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid var(--border-light)', paddingBottom: '2px', transition: 'border-color 200ms ease, color 200ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.color = 'var(--sage)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          >
            Все работы →
          </Link>
        </div>

        <div className="works-grid resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <div className="works-preview-card">
            <WorkCard title="Атмосфера Фудкорт" category="Сайт + Автоматизация" year="2024" bg="var(--forest)" imageSrc="/images/foodcourt.jpg" href="/work" featured />
          </div>
          <div className="works-preview-card">
            <WorkCard title="Office Assistant" category="AI-ассистент" year="2025" bg="var(--forest-light)" imageSrc="/images/office-assistant.png" href="/work" featured />
          </div>
        </div>
      </section>

      {/* cream → caramel */}
      <CurveDivider from="var(--cream)" to="var(--caramel)" variant={0} />

      {/* ⑥ ОТЗЫВЫ — caramel */}
      <section
        style={{
          background: 'var(--caramel)',
          padding: 'clamp(64px, 10vh, 128px) clamp(24px, 5vw, 120px)',
        }}
      >
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--forest)', opacity: 0.6, marginBottom: '48px' }}>
          Что говорят клиенты
        </p>

        <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {[
            {
              quote: 'Ребята сделали нам Telegram-бота для приёма заказов за 4 дня. До этого менеджеры тратили 3 часа в день только на обработку входящих. Теперь — ноль.',
              name: 'Алексей К.',
              role: 'Владелец ресторанной сети · Алматы',
            },
            {
              quote: 'Объяснил задачу один раз — получил готовый AI-ассистент для команды. Никаких лишних вопросов, никаких сюрпризов. Работает стабильно уже полгода.',
              name: 'Дмитрий Е.',
              role: 'CTO · IT-компания · Астана',
            },
            {
              quote: 'Сайт сделали с нуля за 2 недели. Дизайн лучше чем у конкурентов, которые тратили месяцы. Ещё и объяснили как всё работает — не оставили один на один.',
              name: 'Марина С.',
              role: 'Директор по маркетингу · E-commerce',
            },
          ].map((review) => (
            <div
              key={review.name}
              style={{
                padding: 'clamp(28px, 4vw, 44px)',
                borderLeft: '1px solid rgba(46,58,31,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-hanken)', fontSize: '48px', lineHeight: 1, color: 'var(--forest)', opacity: 0.2, display: 'block', marginBottom: '-8px' }}>
                "
              </span>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.7, color: 'var(--forest)', opacity: 0.75, flex: 1 }}>
                {review.quote}
              </p>
              <div>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 600, color: 'var(--forest)', marginBottom: '4px' }}>
                  {review.name}
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--forest)', opacity: 0.5, letterSpacing: '0.02em' }}>
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* caramel → forest */}
      <CurveDivider from="var(--caramel)" to="var(--forest)" variant={1} />

      {/* ⑦ ФИНАЛЬНЫЙ CTA — forest */}
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
          Готовы автоматизировать<br />ваш бизнес?
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
          Начать проект
        </Link>
      </section>

    </div>
  )
}
