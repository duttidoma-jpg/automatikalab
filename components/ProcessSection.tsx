'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const steps = [
  {
    num: '01',
    title: 'Бриф',
    text: 'Вы рассказываете о задаче. Мы задаём правильные вопросы — не для галочки, а чтобы понять суть.',
    timing: '1–2 дня',
    hint: 'Звонок или переписка — как удобно вам',
  },
  {
    num: '02',
    title: 'Стратегия',
    text: 'Предлагаем решение, стек и сроки. Без воды — конкретный план с понятным результатом.',
    timing: '1 день',
    hint: 'Вы видите всё до старта — никаких сюрпризов',
  },
  {
    num: '03',
    title: 'Разработка',
    text: 'Пишем, собираем, тестируем. Держим в курсе на каждом этапе. Работаем быстро, но без потери качества.',
    timing: '2–4 недели',
    hint: 'Статус-апдейты в процессе, без чёрных ящиков',
  },
  {
    num: '04',
    title: 'Запуск',
    text: 'Деплоим, настраиваем, передаём. И остаёмся рядом — поддерживаем и развиваем после запуска.',
    timing: '1 день',
    hint: 'Не прощаемся — продолжаем работать',
  },
]

// ─── Мобильная версия — анимированная карусель ──────────────────────────────
function ProcessMobile() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const trackRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number | null>(null)

  const goTo = (idx: number, dir: 'next' | 'prev') => {
    if (animating || idx === active) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 320)
  }

  const next = () => { if (active < steps.length - 1) goTo(active + 1, 'next') }
  const prev = () => { if (active > 0) goTo(active - 1, 'prev') }

  // Swipe поддержка
  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return
    const dx = e.changedTouches[0].clientX - startXRef.current
    if (dx < -50) next()
    else if (dx > 50) prev()
    startXRef.current = null
  }

  const step = steps[active]
  const slideOffset = animating
    ? direction === 'next' ? '-60px' : '60px'
    : '0px'

  return (
    <section
      className="process-mobile"
      style={{
        background: 'var(--caramel)',
        padding: 'clamp(56px, 8vh, 72px) clamp(24px, 5vw, 40px) clamp(40px, 5vh, 56px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Атмосферный оверлей */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 20% 70%, rgba(140,110,68,0.2) 0%, transparent 65%)',
      }} />

      {/* Шапка */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--caramel-deep)', opacity: 0.8, marginBottom: '10px',
        }}>
          Процесс
        </p>
        <h2 style={{
          fontFamily: 'var(--font-hanken)', fontSize: 'clamp(24px, 7vw, 36px)',
          fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--forest)',
        }}>
          Как происходит<br />работа с нами
        </h2>
      </div>

      {/* Прогресс-точки */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '32px',
        position: 'relative', zIndex: 1,
      }}>
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? 'next' : 'prev')}
            style={{
              width: i === active ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === active ? 'var(--caramel-deep)' : 'rgba(46,58,31,0.2)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 300ms ease, background 300ms ease',
            }}
          />
        ))}
      </div>

      {/* Карточка шага — анимированная */}
      <div
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative', zIndex: 1,
          opacity: animating ? 0 : 1,
          transform: `translateX(${slideOffset})`,
          transition: animating
            ? 'opacity 280ms ease, transform 280ms ease'
            : 'opacity 300ms ease, transform 300ms ease',
        }}
      >
        {/* Большой декоративный номер */}
        <div style={{
          fontFamily: 'var(--font-hanken)',
          fontSize: 'clamp(80px, 28vw, 160px)',
          fontWeight: 800, lineHeight: 0.85,
          color: 'var(--forest)', opacity: 0.07,
          letterSpacing: '-0.05em', userSelect: 'none',
          marginBottom: '-12px',
        }}>
          {step.num}
        </div>

        {/* Заголовок */}
        <h3 style={{
          fontFamily: 'var(--font-hanken)',
          fontSize: 'clamp(32px, 9vw, 52px)',
          fontWeight: 700, letterSpacing: '-0.03em',
          lineHeight: 1.05, color: 'var(--forest)',
          marginBottom: '16px',
        }}>
          {step.title}
        </h3>

        {/* Описание */}
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: '16px',
          lineHeight: 1.7, color: 'var(--forest)', opacity: 0.65,
          marginBottom: '24px',
        }}>
          {step.text}
        </p>

        {/* Тайминг + хинт */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <span style={{
            display: 'inline-block', fontFamily: 'var(--font-inter)',
            fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
            color: 'var(--forest)', padding: '6px 16px',
            border: '1px solid rgba(46,58,31,0.3)', borderRadius: '9999px',
          }}>
            {step.timing}
          </span>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '12px',
            color: 'var(--forest)', opacity: 0.4, fontStyle: 'italic',
          }}>
            {step.hint}
          </span>
        </div>
      </div>

      {/* Кнопки навигации */}
      <div style={{
        display: 'flex', gap: '12px', position: 'relative', zIndex: 1,
      }}>
        <button
          onClick={prev}
          disabled={active === 0}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1px solid rgba(46,58,31,0.25)', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: active === 0 ? 'default' : 'pointer',
            opacity: active === 0 ? 0.3 : 1,
            transition: 'opacity 200ms ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={next}
          disabled={active === steps.length - 1}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1px solid rgba(46,58,31,0.25)',
            background: active === steps.length - 1 ? 'transparent' : 'var(--caramel-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: active === steps.length - 1 ? 'default' : 'pointer',
            opacity: active === steps.length - 1 ? 0.3 : 1,
            transition: 'opacity 200ms ease, background 200ms ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke={active === steps.length - 1 ? 'var(--forest)' : 'var(--cream)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '12px',
          color: 'var(--forest)', opacity: 0.35,
          alignSelf: 'center', marginLeft: '4px',
          letterSpacing: '0.04em',
        }}>
          {active + 1} / {steps.length}
        </span>
      </div>
    </section>
  )
}

// ─── Десктоп версия — pinned scroll ────────────────────────────────────────
function ProcessDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const stepEls = useRef<(HTMLDivElement | null)[]>([])
  const dotEls = useRef<(HTMLDivElement | null)[]>([])
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }
    let mounted = true

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      if (!mounted) return

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh()

      const gctx = gsap.context(() => {
        gsap.set(stepEls.current[0], { opacity: 1, y: 0 })
        stepEls.current.slice(1).forEach((el) => {
          if (el) gsap.set(el, { opacity: 0, y: 60 })
        })

        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' })
        }

        if (dotEls.current[0]) {
          gsap.set(dotEls.current[0], { backgroundColor: 'var(--caramel-deep)', borderColor: 'var(--caramel-deep)', scale: 1 })
        }

        const totalDuration = 3
        const seg = totalDuration / (steps.length - 1)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${steps.length * 150}vh`,
            pin: true,
            scrub: 1.2,
            onUpdate: (self) => {
              if (scrollHintRef.current) {
                scrollHintRef.current.style.opacity = self.progress > 0.02 ? '0' : '1'
              }
            },
          },
        })

        tl.to(progressLineRef.current, { scaleX: 1, ease: 'none', duration: totalDuration }, 0)

        for (let i = 0; i < steps.length - 1; i++) {
          const t = i * seg

          tl.to(dotEls.current[i + 1], {
            backgroundColor: 'var(--caramel-deep)', borderColor: 'var(--caramel-deep)', scale: 1.3, duration: 0.15,
          }, t + seg - 0.1)

          tl.to(dotEls.current[i + 1], { scale: 1, duration: 0.15 }, t + seg + 0.05)

          tl.to(stepEls.current[i], { opacity: 0, y: -50, duration: seg * 0.35, ease: 'power2.in' }, t + seg * 0.45)

          tl.to(stepEls.current[i + 1], { opacity: 1, y: 0, duration: seg * 0.4, ease: 'power2.out' }, t + seg * 0.65)
        }

        gsap.fromTo('.process-heading',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          }
        )
      }, sectionRef)

      ctx.revert = () => {
        gctx.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    init()
    return () => {
      mounted = false
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="process-desktop"
      style={{
        height: '100vh',
        background: 'var(--caramel)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(ellipse 70% 60% at 10% 60%, rgba(140,110,68,0.25) 0%, transparent 65%)',
          'radial-gradient(ellipse 50% 70% at 90% 20%, rgba(216,192,160,0.3) 0%, transparent 55%)',
          'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(100,80,44,0.15) 0%, transparent 60%)',
        ].join(', '),
        pointerEvents: 'none',
      }} />

      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(56px, 7vh, 88px) clamp(24px, 5vw, 120px) clamp(40px, 5vh, 64px)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="process-heading" style={{ marginBottom: 'clamp(40px, 5vh, 64px)' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--caramel-deep)',
            marginBottom: '14px', opacity: 0.8,
          }}>
            Процесс
          </p>
          <h2 style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--forest)',
          }}>
            Как происходит работа с нами
          </h2>
        </div>

        {/* Прогресс-линия */}
        <div style={{ position: 'relative', marginBottom: 'clamp(32px, 5vh, 56px)', height: '24px', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'rgba(46,58,31,0.15)' }} />
          <div ref={progressLineRef} style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'var(--caramel-deep)', transformOrigin: 'left center' }} />
          {steps.map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: `${(i / (steps.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}>
              <div ref={(el) => { dotEls.current[i] = el }} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                border: '1px solid rgba(46,58,31,0.25)', background: 'transparent',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }} />
            </div>
          ))}
        </div>

        {/* Лейблы */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 'clamp(28px, 4vh, 48px)' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--forest)', opacity: 0.35,
              textAlign: i === steps.length - 1 ? 'right' : i === 0 ? 'left' : 'center',
            }}>
              {step.title}
            </div>
          ))}
        </div>

        {/* Контент шагов */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepEls.current[i] = el }}
              className="resp-grid-2"
              style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(32px, 6vw, 96px)', alignItems: 'center',
                opacity: i === 0 ? 1 : 0,
              }}
            >
              <div>
                <span style={{
                  display: 'block', fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(96px, 16vw, 200px)', fontWeight: 800,
                  lineHeight: 0.85, color: 'var(--forest)', opacity: 0.06,
                  letterSpacing: '-0.05em', userSelect: 'none', marginBottom: '8px',
                }}>
                  {step.num}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-hanken)', fontSize: 'clamp(40px, 5.5vw, 80px)',
                  fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--forest)',
                }}>
                  {step.title}
                </h3>
              </div>

              <div style={{ paddingTop: 'clamp(16px, 3vw, 48px)' }}>
                <p style={{
                  fontFamily: 'var(--font-inter)', fontSize: 'clamp(16px, 1.4vw, 20px)',
                  lineHeight: 1.7, color: 'var(--forest)', opacity: 0.65,
                  marginBottom: '28px', maxWidth: '440px',
                }}>
                  {step.text}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{
                    display: 'inline-block', fontFamily: 'var(--font-inter)',
                    fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
                    color: 'var(--forest)', padding: '6px 14px',
                    border: '1px solid rgba(46,58,31,0.25)', borderRadius: '9999px', width: 'fit-content',
                  }}>
                    {step.timing}
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: '13px',
                    color: 'var(--forest)', opacity: 0.4, fontStyle: 'italic',
                  }}>
                    {step.hint}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Подсказка скролла */}
        <div ref={scrollHintRef} style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.4s ease' }}>
          <div style={{
            width: '24px', height: '24px', border: '1px solid rgba(46,58,31,0.2)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
              <path d="M4 1v8M1 6l3 3 3-3" stroke="var(--caramel-deep)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '11px', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--forest)', opacity: 0.35,
          }}>
            Прокрутите
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Главный компонент ──────────────────────────────────────────────────────
export default function ProcessSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // На мобильном — статичный стек без GSAP pin
  // На десктопе — pinned scroll-анимация
  return isMobile ? <ProcessMobile /> : <ProcessDesktop />
}
