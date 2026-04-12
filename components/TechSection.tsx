'use client'

// ─── Три ряда инструментов (разные скорости и направления) ───────────────────

const ROW_1 = [
  { name: 'n8n',      src: '/icons/n8n.svg' },
  { name: 'Make',     src: '/icons/make.svg' },
  { name: 'Zapier',   src: '/icons/zapier.svg' },
  { name: 'Claude',   src: '/icons/claude.svg' },
  { name: 'ChatGPT',  src: '/icons/chatgpt.svg' },
  { name: 'Gemini',   src: '/icons/gemini.svg' },
]

const ROW_2 = [
  { name: 'Telegram',   src: '/icons/telegram.svg' },
  { name: 'WhatsApp',   src: '/icons/whatsapp.svg' },
  { name: 'AmoCRM',     src: '/icons/amocrm.svg' },
  { name: 'Bitrix24',   src: '/icons/bitrix24.svg' },
  { name: 'HubSpot',    src: '/icons/hubspot.svg' },
  { name: 'Supabase',   src: '/icons/supabase.svg' },
]

const ROW_3 = [
  { name: 'PostgreSQL', src: '/icons/postgresql.svg' },
  { name: 'Notion',     src: '/icons/notion.svg' },
  { name: 'Next.js',    src: '/icons/nextjs.svg' },
  { name: 'WordPress',  src: '/icons/wordpress.svg' },
  { name: 'Python',     src: '/icons/python.svg' },
  { name: 'GitHub',     src: '/icons/github.svg' },
  { name: 'Higgsfield', src: '/icons/higgsfield.svg' },
  { name: 'Runway',     src: '/icons/runway.svg' },
]

// ─── Один элемент в ряду ─────────────────────────────────────────────────────

function Chip({ name, src }: { name: string; src: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px 10px 14px',
        border: '1px solid rgba(244,237,230,0.1)',
        borderRadius: '9999px',
        background: 'rgba(244,237,230,0.04)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Иконка */}
      <div
        style={{
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          width={22}
          height={22}
          style={{
            width: '22px',
            height: '22px',
            objectFit: 'contain',
            filter: 'brightness(0) invert(0.85)',
            display: 'block',
          }}
        />
      </div>

      {/* Название */}
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.01em',
          color: 'var(--text-inverse)',
          opacity: 0.65,
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    </div>
  )
}

// ─── Один бегущий ряд ────────────────────────────────────────────────────────

function MarqueeRow({
  items,
  direction = 'left',
  speed = 40,
}: {
  items: { name: string; src: string }[]
  direction?: 'left' | 'right'
  speed?: number
}) {
  // Дублируем для бесшовного лупа
  const doubled = [...items, ...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        // Мягкие края через маску
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          width: 'max-content',
          animation: `marquee-${direction} ${speed}s linear infinite`,
          willChange: 'transform',
          paddingLeft: '12px',
        }}
      >
        {doubled.map((item, i) => (
          <Chip key={`${item.name}-${i}`} name={item.name} src={item.src} />
        ))}
      </div>
    </div>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────

export default function TechSection() {
  return (
    <section
      style={{
        background: 'var(--forest)',
        padding: 'clamp(72px, 9vh, 112px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Шапка — с боковыми отступами */}
      <div
        style={{
          padding: '0 clamp(24px, 5vw, 120px)',
          marginBottom: 'clamp(44px, 6vh, 64px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginBottom: '12px',
            }}
          >
            Технологии
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-hanken)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--text-inverse)',
              margin: 0,
            }}
          >
            Стек под любую задачу
          </h2>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            lineHeight: 1.65,
            color: 'var(--text-inverse)',
            opacity: 0.38,
            maxWidth: '300px',
            textAlign: 'right',
          }}
        >
          20+ инструментов. Подбираем под&nbsp;задачу — не наоборот.
        </p>
      </div>

      {/* Три бегущих ряда */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <MarqueeRow items={ROW_1} direction="left"  speed={38} />
        <MarqueeRow items={ROW_2} direction="right" speed={44} />
        <MarqueeRow items={ROW_3} direction="left"  speed={50} />
      </div>

      {/* CSS анимации */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
