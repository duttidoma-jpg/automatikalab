'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  // Seamless video loop: два видео, плавный кросс-фейд
  useEffect(() => {
    const v1 = videoRef.current
    const v2 = video2Ref.current
    if (!v1 || !v2) return

    const FADE_DURATION = 1200 // ms до конца — начинаем фейд
    let rafId: number
    let fading = false

    const checkFade = () => {
      if (!v1.duration || v1.paused) { rafId = requestAnimationFrame(checkFade); return }
      const remaining = (v1.duration - v1.currentTime) * 1000

      if (remaining <= FADE_DURATION && !fading) {
        fading = true
        // Запускаем v2 заранее и фейдим
        v2.currentTime = 0
        v2.style.opacity = '0'
        v2.play().catch(() => {})

        const start = performance.now()
        const fade = (now: number) => {
          const t = Math.min((now - start) / FADE_DURATION, 1)
          v1.style.opacity = String(1 - t)
          v2.style.opacity = String(t)
          if (t < 1) { requestAnimationFrame(fade) }
          else {
            // v2 стал главным — меняем роли
            v1.style.opacity = '0'
            v2.style.opacity = '1'
            v1.currentTime = 0
            v1.pause()
            fading = false
            // Теперь отслеживаем v2
            startWatching(v2, v1)
          }
        }
        requestAnimationFrame(fade)
      }
      if (!fading) rafId = requestAnimationFrame(checkFade)
    }

    const startWatching = (active: HTMLVideoElement, standby: HTMLVideoElement) => {
      cancelAnimationFrame(rafId)
      let f = false

      const watch = () => {
        if (!active.duration || active.paused) { requestAnimationFrame(watch); return }
        const rem = (active.duration - active.currentTime) * 1000
        if (rem <= FADE_DURATION && !f) {
          f = true
          standby.currentTime = 0
          standby.style.opacity = '0'
          standby.play().catch(() => {})

          const s = performance.now()
          const doFade = (now: number) => {
            const t = Math.min((now - s) / FADE_DURATION, 1)
            active.style.opacity = String(1 - t)
            standby.style.opacity = String(t)
            if (t < 1) { requestAnimationFrame(doFade) }
            else {
              active.style.opacity = '0'
              standby.style.opacity = '1'
              active.currentTime = 0
              active.pause()
              f = false
              startWatching(standby, active)
            }
          }
          requestAnimationFrame(doFade)
        }
        if (!f) requestAnimationFrame(watch)
      }
      requestAnimationFrame(watch)
    }

    v1.play().catch(() => {})
    rafId = requestAnimationFrame(checkFade)

    return () => cancelAnimationFrame(rafId)
  }, [])

  // GSAP entrance — без clipPath, только opacity + y (надёжно)
  useEffect(() => {
    const ctx = { revert: () => {} }
    let timeoutId: ReturnType<typeof setTimeout>

    const init = async () => {
      const { gsap } = await import('gsap')
      const gctx = gsap.context(() => {
        gsap.timeline({ delay: 0.2 })
          .fromTo('.hero-label',
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
          )
          .fromTo('.hero-line-1',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo('.hero-line-2',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
          )
          .fromTo('.hero-sub',
            { opacity: 0, y: 20 },
            { opacity: 0.85, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo('.hero-cta',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
      }, sectionRef)
      ctx.revert = () => gctx.revert()
    }

    timeoutId = setTimeout(init, 50)
    return () => {
      clearTimeout(timeoutId)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: 'var(--forest)', // заглушка пока видео не загрузилось
      }}
    >
      {/* Видео 1 — основное */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 1,
          transition: 'none',
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Видео 2 — для кросс-фейда */}
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0,
          transition: 'none',
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(46,58,31,0.60) 0%, rgba(46,58,31,0.25) 50%, rgba(244,237,230,0.12) 100%)',
          zIndex: 1,
        }}
      />

      {/* Контент */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '0 clamp(24px, 5vw, 120px)',
          paddingBottom: 'clamp(60px, 8vh, 120px)',
          color: 'var(--text-inverse)',
        }}
      >
        <p
          className="hero-label"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--sage)',
            marginBottom: '24px',
          }}
        >
          АВТОМАТИЗАЦИЯ / 2026
        </p>

        <h1 style={{ marginBottom: '32px' }}>
          <span
            className="hero-line-1"
            style={{
              display: 'block',
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(42px, 9vw, 140px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
            }}
          >
            Автоматизация
          </span>
          <span
            className="hero-line-2"
            style={{
              display: 'block',
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(42px, 9vw, 140px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              fontStyle: 'italic',
            }}
          >
            будущего
          </span>
        </h1>

        <p
          className="hero-sub"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            lineHeight: 1.6,
            maxWidth: '520px',
            marginBottom: '40px',
          }}
        >
          Пока конкуренты думают — вы уже впереди
        </p>

        <div className="hero-cta" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href="https://t.me/automatikagroup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 32px',
              background: 'var(--sage)',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: 'var(--forest)',
              textDecoration: 'none',
              transition: 'background 300ms ease, transform 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--sage-light)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--sage)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Начать проект
          </Link>
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 32px',
              border: '1px solid rgba(244,237,230,0.5)',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: 'var(--text-inverse)',
              textDecoration: 'none',
              transition: 'border-color 300ms ease, background 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--sage)'
              e.currentTarget.style.background = 'rgba(143,163,108,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244,237,230,0.5)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Смотреть работы →
          </Link>
        </div>
      </div>
    </section>
  )
}
