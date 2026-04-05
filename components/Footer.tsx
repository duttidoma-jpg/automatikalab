'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/work', label: 'Работы' },
  { href: '/services', label: 'Услуги' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакт' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--forest)',
        color: 'var(--text-inverse)',
        borderTop: '1px solid rgba(244,237,230,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Большой типографский заголовок */}
      <div
        style={{
          padding: 'clamp(48px, 6vh, 80px) clamp(24px, 5vw, 120px) 0',
          borderBottom: '1px solid rgba(244,237,230,0.06)',
          marginBottom: 'clamp(40px, 5vh, 64px)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'block',
            fontFamily: 'var(--font-hanken, sans-serif)',
            fontSize: 'clamp(56px, 11vw, 180px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            color: 'var(--text-inverse)',
            textDecoration: 'none',
            opacity: 0.07,
            transition: 'opacity 500ms ease',
            paddingBottom: 'clamp(32px, 4vh, 56px)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.18' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.07' }}
        >
          AutomatikaLab
        </Link>
      </div>

      {/* Верхняя часть */}
      <div
        className="resp-footer-top"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'start',
          marginBottom: 'clamp(32px, 4vh, 48px)',
          paddingBottom: 'clamp(32px, 4vh, 48px)',
          paddingLeft: 'clamp(24px, 5vw, 120px)',
          paddingRight: 'clamp(24px, 5vw, 120px)',
          borderBottom: '1px solid rgba(244,237,230,0.08)',
        }}
      >
        {/* Левая колонка — логотип + манифест */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-hanken, sans-serif)',
              fontSize: '22px',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'var(--text-inverse)',
              letterSpacing: '-0.02em',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            AutomatikaLab
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'var(--text-inverse)',
              opacity: 0.45,
              maxWidth: '360px',
            }}
          >
            Автоматизируем бизнес с помощью AI-агентов, Telegram-ботов
            и современных веб-решений. Пока конкуренты думают — вы уже впереди.
          </p>
        </div>

        {/* Правая колонка — навигация + контакты */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 4vw, 64px)',
          }}
        >
          {/* Навигация */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter, sans-serif)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                marginBottom: '20px',
              }}
            >
              Разделы
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-inter, sans-serif)',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--text-inverse)',
                    textDecoration: 'none',
                    opacity: 0.55,
                    transition: 'opacity 200ms ease',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter, sans-serif)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                marginBottom: '20px',
              }}
            >
              Связаться
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="https://t.me/automatikagroup"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-inter, sans-serif)',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--text-inverse)',
                  textDecoration: 'none',
                  opacity: 0.55,
                  transition: 'opacity 200ms ease',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55' }}
              >
                Telegram
              </Link>
              <a
                href="mailto:contact@automaticalab.app"
                style={{
                  fontFamily: 'var(--font-inter, sans-serif)',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--text-inverse)',
                  textDecoration: 'none',
                  opacity: 0.55,
                  transition: 'opacity 200ms ease',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55' }}
              >
                contact@automaticalab.app
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть — копирайт + манифест */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingLeft: 'clamp(24px, 5vw, 120px)',
          paddingRight: 'clamp(24px, 5vw, 120px)',
          paddingBottom: 'clamp(32px, 4vh, 48px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter, sans-serif)',
            fontSize: '13px',
            color: 'var(--text-inverse)',
            opacity: 0.3,
          }}
        >
          © {year} AutomatikaLab
        </p>
        <p
          style={{
            fontFamily: 'var(--font-hanken, sans-serif)',
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'var(--sage)',
            opacity: 0.6,
            letterSpacing: '-0.01em',
          }}
        >
          Будущее — не страшно. Мы проведём за руку.
        </p>
      </div>
    </footer>
  )
}
