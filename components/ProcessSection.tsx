'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const STEPS = [
  {
    num:    '01',
    title:  'Бриф',
    text:   'Вы рассказываете о задаче. Мы задаём правильные вопросы — не для галочки, а чтобы понять суть.',
    timing: '1–2 дня',
    hint:   'Звонок или переписка — как удобно вам',
    video:  '/videos/process/step-01-brief.mp4',
    // лёгкий forest-оверлей — видео уже тёмное и зелёное
    overlay: 'rgba(20,30,10,0.55)',
  },
  {
    num:    '02',
    title:  'Стратегия',
    text:   'Предлагаем решение, стек и сроки. Без воды — конкретный план с понятным результатом.',
    timing: '1 день',
    hint:   'Вы видите всё до старта — никаких сюрпризов',
    video:  '/videos/process/step-02-strategy.mp4',
    overlay: 'rgba(20,30,10,0.50)',
  },
  {
    num:    '03',
    title:  'Разработка',
    text:   'Пишем, собираем, тестируем. Держим в курсе на каждом этапе. Работаем быстро, но без потери качества.',
    timing: '2–4 недели',
    hint:   'Статус-апдейты в процессе, без чёрных ящиков',
    video:  '/videos/process/step-03-dev.mp4',
    overlay: 'rgba(15,25,8,0.48)',
  },
  {
    num:    '04',
    title:  'Запуск',
    text:   'Деплоим, настраиваем, передаём. И остаёмся рядом — поддерживаем и развиваем после запуска.',
    timing: '1 день',
    hint:   'Не прощаемся — продолжаем работать',
    video:  '/videos/process/step-04-launch.mp4',
    overlay: 'rgba(40,20,5,0.52)',   // чуть теплее для launch-видео
  },
]

// ─── Переключатель видео с fade-анимацией ─────────────────────────────────────
function VideoLayer({ active }: { active: number }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([])

  // При смене активного шага — играем нужное видео
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.play().catch(() => {})
      } else {
        // Ставим на паузу после завершения fade (700ms)
        setTimeout(() => { v.pause() }, 750)
      }
    })
  }, [active])

  return (
    <>
      {STEPS.map((step, i) => (
        <video
          key={step.video}
          ref={(el) => { refs.current[i] = el }}
          muted
          loop
          playsInline
          preload={i === 0 ? 'auto' : 'none'}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1)',
            zIndex: 0,
          }}
        >
          <source src={step.video} type="video/mp4" />
        </video>
      ))}
    </>
  )
}

// ─── Мобильная версия ─────────────────────────────────────────────────────────
function ProcessMobile() {
  const [active, setActive]       = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const startXRef                 = useRef<number | null>(null)

  const goTo = (idx: number, dir: 'next' | 'prev') => {
    if (animating || idx === active) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => { setActive(idx); setAnimating(false) }, 300)
  }

  const next = () => { if (active < STEPS.length - 1) goTo(active + 1, 'next') }
  const prev = () => { if (active > 0) goTo(active - 1, 'prev') }

  const onTouchStart = (e: React.TouchEvent) => { startXRef.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (startXRef.current === null) return
    const dx = e.changedTouches[0].clientX - startXRef.current
    if (dx < -50) next()
    else if (dx > 50) prev()
    startXRef.current = null
  }

  const step = STEPS[active]

  return (
    <section
      className="process-mobile"
      style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'var(--forest-deep)',
      }}
    >
      {/* Видео-фоны */}
      <VideoLayer active={active} />

      {/* Оверлей */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(to bottom, ${step.overlay} 0%, rgba(10,18,6,0.82) 100%)`,
        transition: 'background 700ms ease',
        pointerEvents: 'none',
      }} />

      {/* Контент */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative', zIndex: 2,
          padding: 'clamp(56px,8vh,72px) clamp(24px,5vw,40px) clamp(40px,5vh,56px)',
        }}
      >
        {/* Лейбл */}
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--sage)', opacity: 0.85, marginBottom: '12px',
        }}>
          Процесс
        </p>

        {/* Большой декоративный номер */}
        <div style={{
          fontFamily: 'var(--font-hanken)',
          fontSize: 'clamp(100px, 32vw, 180px)',
          fontWeight: 800, lineHeight: 0.85,
          color: 'var(--cream)', opacity: 0.06,
          letterSpacing: '-0.05em', userSelect: 'none',
          marginBottom: '-16px',
          transition: 'opacity 300ms ease',
        }}>
          {step.num}
        </div>

        {/* Заголовок */}
        <h2
          style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(40px,11vw,64px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            lineHeight: 1.0, color: 'var(--text-inverse)',
            marginBottom: '20px',
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === 'next' ? '-32px' : '32px'})`
              : 'translateX(0)',
            transition: animating
              ? 'opacity 260ms ease, transform 260ms ease'
              : 'opacity 320ms ease, transform 320ms ease',
          }}
        >
          {step.title}
        </h2>

        {/* Текст */}
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: '16px',
          lineHeight: 1.7, color: 'var(--text-inverse)',
          marginBottom: '28px', maxWidth: '380px',
          opacity: animating ? 0 : 0.7,
          transition: 'opacity 280ms ease',
        }}>
          {step.text}
        </p>

        {/* Тайминг + хинт */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 500,
            letterSpacing: '0.06em', color: 'var(--sage)',
            padding: '6px 16px',
            border: '1px solid rgba(143,163,108,0.4)', borderRadius: '9999px',
          }}>
            {step.timing}
          </span>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '12px',
            color: 'var(--text-inverse)', opacity: 0.35, fontStyle: 'italic',
          }}>
            {step.hint}
          </span>
        </div>

        {/* Прогресс-точки */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              style={{
                width: i === active ? '28px' : '8px', height: '8px',
                borderRadius: '4px',
                background: i === active ? 'var(--sage)' : 'rgba(255,255,255,0.2)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>

        {/* Навигация */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={prev}
            disabled={active === 0}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: active === 0 ? 'default' : 'pointer',
              opacity: active === 0 ? 0.3 : 1,
              transition: 'opacity 200ms ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="var(--text-inverse)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            disabled={active === STEPS.length - 1}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '1px solid rgba(143,163,108,0.4)',
              background: active === STEPS.length - 1 ? 'transparent' : 'var(--sage)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: active === STEPS.length - 1 ? 'default' : 'pointer',
              opacity: active === STEPS.length - 1 ? 0.3 : 1,
              transition: 'opacity 200ms ease, background 200ms ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '12px',
            color: 'var(--text-inverse)', opacity: 0.3,
            marginLeft: '4px', letterSpacing: '0.04em',
          }}>
            {active + 1} / {STEPS.length}
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Десктоп версия — pinned scroll + видео-фоны ──────────────────────────────
function ProcessDesktop() {
  const sectionRef    = useRef<HTMLElement>(null)
  const progressRef   = useRef<HTMLDivElement>(null)
  const stepEls       = useRef<(HTMLDivElement | null)[]>([])
  const dotEls        = useRef<(HTMLDivElement | null)[]>([])
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Управляем видео из-за пределов useIsomorphicLayoutEffect
  const videoLayerRef = useRef<{ setActive: (i: number) => void } | null>(null)

  useIsomorphicLayoutEffect(() => {
    let ctx: { revert: () => void } = { revert: () => {} }
    let mounted = true

    const init = async () => {
      const { gsap }         = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!mounted) return

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh()

      const gctx = gsap.context(() => {
        // Начальные состояния текстов
        gsap.set(stepEls.current[0], { opacity: 1, y: 0 })
        stepEls.current.slice(1).forEach((el) => {
          if (el) gsap.set(el, { opacity: 0, y: 60 })
        })
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
        }
        if (dotEls.current[0]) {
          gsap.set(dotEls.current[0], { backgroundColor: 'var(--sage)', borderColor: 'var(--sage)', scale: 1 })
        }

        const totalDur = 3
        const seg = totalDur / (STEPS.length - 1)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${STEPS.length * 280}vh`,
            pin: true,
            scrub: 1.2,
            onUpdate: (self) => {
              // Обновляем активный шаг для смены видео
              const idx = Math.min(
                STEPS.length - 1,
                Math.floor(self.progress * STEPS.length)
              )
              setActiveStep(idx)

              // Scroll hint исчезает после начала скролла
              if (scrollHintRef.current) {
                scrollHintRef.current.style.opacity = self.progress > 0.02 ? '0' : '1'
              }
            },
          },
        })

        // Прогресс-линия
        tl.to(progressRef.current, { scaleX: 1, ease: 'none', duration: totalDur }, 0)

        // Переходы шагов
        for (let i = 0; i < STEPS.length - 1; i++) {
          const t = i * seg

          // Dot активация
          tl.to(dotEls.current[i + 1], {
            backgroundColor: 'var(--sage)', borderColor: 'var(--sage)', scale: 1.3, duration: 0.15,
          }, t + seg - 0.1)
          tl.to(dotEls.current[i + 1], { scale: 1, duration: 0.15 }, t + seg + 0.05)

          // Текст: уходит вверх
          tl.to(stepEls.current[i], {
            opacity: 0, y: -50, duration: seg * 0.35, ease: 'power2.in',
          }, t + seg * 0.45)

          // Текст: появляется снизу
          tl.to(stepEls.current[i + 1], {
            opacity: 1, y: 0, duration: seg * 0.4, ease: 'power2.out',
          }, t + seg * 0.65)
        }

        // Entrance заголовка секции
        gsap.fromTo('.process-heading',
          { opacity: 0, y: 24 },
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
    return () => { mounted = false; ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="process-desktop"
      style={{
        height: '100vh',
        background: 'var(--forest-deep)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Видео-слой ── */}
      <VideoLayer active={activeStep} />

      {/* ── Тёмный оверлей — меняется вместе с шагом ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: STEPS[activeStep].overlay,
          transition: 'background 700ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Градиент снизу для читаемости текста ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '50%', zIndex: 2,
        background: 'linear-gradient(to top, rgba(10,16,6,0.75) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── UI поверх видео ── */}
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        padding: 'clamp(56px,7vh,88px) clamp(24px,5vw,120px) clamp(40px,5vh,64px)',
        position: 'relative', zIndex: 3,
      }}>

        {/* Шапка секции */}
        <div className="process-heading" style={{ marginBottom: 'clamp(32px,5vh,56px)' }}>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--sage)', opacity: 0.85, marginBottom: '12px',
          }}>
            Процесс
          </p>
          <h2 style={{
            fontFamily: 'var(--font-hanken)',
            fontSize: 'clamp(28px,3.2vw,48px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--text-inverse)',
          }}>
            Как происходит работа с нами
          </h2>
        </div>

        {/* Прогресс-линия */}
        <div style={{
          position: 'relative', marginBottom: 'clamp(28px,4vh,48px)',
          height: '24px', display: 'flex', alignItems: 'center',
        }}>
          {/* Трек */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '1px',
            background: 'rgba(255,255,255,0.12)',
          }} />
          {/* Заполнение */}
          <div ref={progressRef} style={{
            position: 'absolute', left: 0, right: 0, height: '1px',
            background: 'var(--sage)',
            transformOrigin: 'left center',
          }} />
          {/* Точки */}
          {STEPS.map((step, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${(i / (STEPS.length - 1)) * 100}%`,
              transform: 'translateX(-50%)',
            }}>
              <div ref={(el) => { dotEls.current[i] = el }} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }} />
            </div>
          ))}
        </div>

        {/* Лейблы шагов */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          marginBottom: 'clamp(20px,3vh,40px)',
        }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-inverse)',
              opacity: i === activeStep ? 0.6 : 0.25,
              transition: 'opacity 500ms ease',
              textAlign: i === STEPS.length - 1 ? 'right' : i === 0 ? 'left' : 'center',
            }}>
              {step.title}
            </div>
          ))}
        </div>

        {/* Контент шагов */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepEls.current[i] = el }}
              className="resp-grid-2"
              style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(32px,6vw,96px)', alignItems: 'center',
                opacity: i === 0 ? 1 : 0,
              }}
            >
              {/* Левая колонка: большой номер + title */}
              <div>
                <span style={{
                  display: 'block', fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(96px,14vw,200px)', fontWeight: 800,
                  lineHeight: 0.85, color: 'var(--cream)', opacity: 0.06,
                  letterSpacing: '-0.05em', userSelect: 'none', marginBottom: '8px',
                }}>
                  {step.num}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-hanken)',
                  fontSize: 'clamp(40px,5vw,80px)',
                  fontWeight: 700, letterSpacing: '-0.03em',
                  lineHeight: 1.0, color: 'var(--text-inverse)',
                }}>
                  {step.title}
                </h3>
              </div>

              {/* Правая колонка: описание + метаданные */}
              <div style={{ paddingTop: 'clamp(16px,3vw,48px)' }}>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(16px,1.4vw,20px)',
                  lineHeight: 1.7, color: 'var(--text-inverse)', opacity: 0.7,
                  marginBottom: '28px', maxWidth: '440px',
                }}>
                  {step.text}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{
                    display: 'inline-block', fontFamily: 'var(--font-inter)',
                    fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
                    color: 'var(--sage)', padding: '6px 14px',
                    border: '1px solid rgba(143,163,108,0.4)', borderRadius: '9999px',
                    width: 'fit-content',
                  }}>
                    {step.timing}
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: '13px',
                    color: 'var(--text-inverse)', opacity: 0.35, fontStyle: 'italic',
                  }}>
                    {step.hint}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.4s ease' }}
        >
          <div style={{
            width: '24px', height: '24px',
            border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
              <path d="M4 1v8M1 6l3 3 3-3" stroke="var(--sage)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '11px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--text-inverse)', opacity: 0.3,
          }}>
            Прокрутите
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function ProcessSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile ? <ProcessMobile /> : <ProcessDesktop />
}
