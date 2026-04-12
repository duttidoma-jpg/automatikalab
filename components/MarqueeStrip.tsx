'use client'

const ITEMS = [
  'Telegram-боты', '·', 'AI-ассистенты', '·', 'Автоматизация', '·',
  'Веб-сайты', '·', 'Постпродакшн', '·', 'CRM-интеграции', '·', 'AI-агенты', '·', 'Видео', '·',
]

interface MarqueeStripProps {
  inverted?: boolean
  speed?: number // секунды, по умолчанию 24
}

export default function MarqueeStrip({ inverted = false, speed = 24 }: MarqueeStripProps) {
  // Дублируем для seamless loop
  const doubled = [...ITEMS, ...ITEMS]

  const bg = inverted ? 'var(--forest)' : 'var(--cream)'
  const borderColor = inverted ? 'rgba(244,237,230,0.08)' : 'var(--border-light)'
  const textColor = inverted ? 'var(--text-inverse)' : 'var(--text-primary)'

  return (
    <div
      style={{
        overflow: 'hidden',
        background: bg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        padding: '14px 0',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '28px',
          width: 'max-content',
          animation: `marquee-scroll ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: item === '·' ? 0 : '0.1em',
              textTransform: 'uppercase',
              color: textColor,
              opacity: item === '·' ? 0.15 : 0.38,
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
