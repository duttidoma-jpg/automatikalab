'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/work', label: 'Работы' },
  { href: '/services', label: 'Услуги' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакт' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuEverOpened = useRef(false)

  const isHome = pathname === '/'

  // Закрываем меню при смене маршрута
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // GSAP анимация мобильного меню
  useEffect(() => {
    const animate = async () => {
      if (!menuRef.current) return
      const { gsap } = await import('gsap')
      gsap.killTweensOf(menuRef.current)
      gsap.killTweensOf('.mobile-nav-link')

      if (menuOpen) {
        menuEverOpened.current = true
        menuRef.current.style.display = 'flex'
        gsap.fromTo(menuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out' }
        )
        gsap.fromTo('.mobile-nav-link',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out', delay: 0.1 }
        )
      } else if (menuEverOpened.current) {
        gsap.to(menuRef.current, {
          opacity: 0, duration: 0.28, ease: 'power2.in',
          onComplete: () => {
            if (menuRef.current) menuRef.current.style.display = 'none'
          },
        })
      }
    }
    animate()
  }, [menuOpen])

  const isTransparent = isHome && !scrolled
  // Когда меню открыто — текст всегда белый (поверх тёмного оверлея)
  const textColor = menuOpen || isTransparent ? 'var(--text-inverse)' : 'var(--text-primary)'
  const bgColor = menuOpen ? 'transparent' : (isTransparent ? 'transparent' : 'rgba(244, 237, 230, 0.92)')
  const blurStyle = !menuOpen && !isTransparent ? 'blur(20px) saturate(1.5)' : 'none'
  const borderColor = !menuOpen && !isTransparent ? '1px solid var(--border-light)' : '1px solid transparent'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: scrolled ? '60px' : '80px',
          padding: '0 clamp(24px, 5vw, 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 400ms ease, background 400ms ease, border-color 400ms ease',
          backgroundColor: bgColor,
          backdropFilter: blurStyle,
          WebkitBackdropFilter: blurStyle,
          borderBottom: borderColor,
          color: textColor,
        }}
      >
        {/* Логотип */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-hanken, sans-serif)',
            fontSize: '18px',
            fontWeight: 600,
            textDecoration: 'none',
            color: 'inherit',
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          AutomatikaLab
        </Link>

        {/* Desktop: ссылки */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-inter, sans-serif)',
                fontSize: '15px',
                fontWeight: pathname === link.href ? 500 : 400,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                color: 'inherit',
                opacity: pathname === link.href ? 1 : 0.7,
                transition: 'opacity 200ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = pathname === link.href ? '1' : '0.7'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop: CTA кнопка */}
        <Link
          href="/contact"
          className="nav-cta-desktop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 24px',
            border: '1px solid var(--sage)',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            color: isTransparent ? 'var(--text-inverse)' : 'var(--text-primary)',
            transition: 'background 350ms ease, color 350ms ease',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--sage)'
            e.currentTarget.style.color = 'var(--forest)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = isTransparent ? 'var(--text-inverse)' : 'var(--text-primary)'
          }}
        >
          Начать проект
        </Link>

        {/* Mobile: бургер-кнопка */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          style={{
            display: 'none', // показывается через CSS media query
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            padding: '8px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '1.5px',
            background: textColor,
            transition: 'transform 300ms ease',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '1.5px',
            background: textColor,
            transition: 'opacity 300ms ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '1.5px',
            background: textColor,
            transition: 'transform 300ms ease',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile: полноэкранное меню */}
      <div
        ref={menuRef}
        style={{
          display: 'none', // GSAP управляет показом
          position: 'fixed',
          inset: 0,
          background: 'var(--forest)',
          zIndex: 999,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 'clamp(80px, 12vh, 120px) clamp(24px, 6vw, 60px) clamp(40px, 6vh, 80px)',
        }}
      >
        {/* Большие ссылки */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              style={{
                fontFamily: 'var(--font-hanken, sans-serif)',
                fontSize: 'clamp(44px, 13vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                textDecoration: 'none',
                color: pathname === link.href ? 'var(--sage)' : 'var(--text-inverse)',
                opacity: 0, // GSAP анимирует
                display: 'block',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + email внизу */}
        <div
          className="mobile-nav-link"
          style={{
            marginTop: '48px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(244,237,230,0.1)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            opacity: 0, // GSAP анимирует
          }}
        >
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 40px',
              background: 'var(--sage)',
              color: 'var(--forest)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-inter)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              width: 'fit-content',
            }}
          >
            Начать проект
          </Link>
          <a
            href="mailto:contact@automaticalab.app"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              color: 'var(--text-inverse)',
              opacity: 0.4,
              textDecoration: 'none',
            }}
          >
            contact@automaticalab.app
          </a>
        </div>
      </div>
    </>
  )
}
