'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Главная — единственная страница с тёмным hero
  // На остальных страницах nav всегда тёмный (кремовый фон сверху)
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    // Проверяем сразу при маунте (если страница уже прокручена)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Логика цвета:
  // - Главная + не прокручено: прозрачный фон, белый текст (поверх видео)
  // - Главная + прокручено: кремовый фон, тёмный текст
  // - Остальные страницы: всегда кремовый/белый фон, тёмный текст
  const isTransparent = isHome && !scrolled
  const textColor = isTransparent ? 'var(--text-inverse)' : 'var(--text-primary)'
  const bgColor = isTransparent
    ? 'transparent'
    : 'rgba(244, 237, 230, 0.92)'
  const blurStyle = !isTransparent ? 'blur(20px) saturate(1.5)' : 'none'
  const borderColor = !isTransparent ? '1px solid var(--border-light)' : '1px solid transparent'

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: scrolled ? '60px' : '80px',
        padding: '0 clamp(24px, 5vw, 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'height 400ms ease, background 400ms ease, border-color 400ms ease, color 400ms ease',
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
        }}
      >
        AutomatikaLab
      </Link>

      {/* Центральные ссылки */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
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

      {/* CTA кнопка */}
      <Link
        href="/contact"
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
          transition: 'background 350ms ease, color 350ms ease, border-color 350ms ease',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--sage)'
          e.currentTarget.style.color = 'var(--forest)'
          e.currentTarget.style.borderColor = 'var(--sage)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = isTransparent ? 'var(--text-inverse)' : 'var(--text-primary)'
          e.currentTarget.style.borderColor = 'var(--sage)'
        }}
      >
        Начать проект
      </Link>
    </nav>
  )
}
