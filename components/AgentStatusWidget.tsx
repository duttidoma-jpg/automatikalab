'use client'

import { useState, useEffect } from 'react'

interface Agent {
  name: string
  action: string
  minutesAgo: number
}

const INITIAL_AGENTS: Agent[] = [
  { name: 'Client Agent', action: 'принял заявку', minutesAgo: 1 },
  { name: 'Lead Notification', action: 'уведомил владельца', minutesAgo: 4 },
  { name: 'Content Agent', action: 'сгенерировал пост', minutesAgo: 22 },
  { name: 'Instagram Bot', action: 'подготовил контент', minutesAgo: 47 },
  { name: 'PM Status Update', action: 'обновил статус клиента', minutesAgo: 73 },
]

function formatTime(min: number): string {
  if (min < 1) return 'только что'
  if (min < 60) return `${min} мин назад`
  return `${Math.floor(min / 60)} ч назад`
}

export default function AgentStatusWidget() {
  const [open, setOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS)
  const [pulse, setPulse] = useState(false)

  // Каждые ~40 сек симулируем активность одного агента
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        const next = [...prev]
        // Увеличиваем время у всех
        const updated = next.map(a => ({ ...a, minutesAgo: a.minutesAgo + 1 }))
        // Случайный агент "срабатывает" — сбрасываем его время
        const idx = Math.floor(Math.random() * updated.length)
        updated[idx] = { ...updated[idx], minutesAgo: 0 }
        return updated
      })
      setPulse(true)
      setTimeout(() => setPulse(false), 1000)
    }, 40000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @keyframes widget-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(143,163,108,0.4); }
          50% { transform: scale(1.06); box-shadow: 0 0 0 8px rgba(143,163,108,0); }
        }
        @keyframes dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes widget-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Плавающая кнопка */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Статус агентов"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9998,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--forest)',
          border: '1px solid rgba(143,163,108,0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          animation: pulse ? 'widget-pulse 0.8s ease' : 'none',
          transition: 'border-color 200ms ease, background 200ms ease',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--sage)'
          e.currentTarget.style.background = 'rgba(46,58,31,0.95)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(143,163,108,0.35)'
          e.currentTarget.style.background = 'var(--forest)'
        }}
      >
        {/* Три точки — иконка активности */}
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--sage)',
              animation: `dot-blink 1.6s ease ${i * 0.25}s infinite`,
            }}
          />
        ))}
      </button>

      {/* Панель */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '28px',
            zIndex: 9997,
            width: '300px',
            background: 'var(--forest)',
            border: '1px solid rgba(143,163,108,0.2)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            animation: 'widget-in 0.25s ease forwards',
          }}
        >
          {/* Шапка */}
          <div
            style={{
              padding: '16px 20px 14px',
              borderBottom: '1px solid rgba(244,237,230,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                  animation: 'dot-blink 2s ease infinite',
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-inverse)',
                opacity: 0.9,
              }}>
                Система активна
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-inverse)',
                opacity: 0.35,
                fontSize: '18px',
                lineHeight: 1,
                padding: '0 2px',
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.35' }}
            >
              ×
            </button>
          </div>

          {/* Список агентов */}
          <div style={{ padding: '8px 0' }}>
            {agents.map((agent) => (
              <div
                key={agent.name}
                style={{
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: agent.minutesAgo === 0 ? '#4ade80' : 'var(--sage)',
                    opacity: agent.minutesAgo === 0 ? 1 : 0.6,
                    marginTop: '5px',
                    flexShrink: 0,
                    animation: agent.minutesAgo === 0 ? 'dot-blink 1s ease infinite' : 'none',
                    boxShadow: agent.minutesAgo === 0 ? '0 0 5px rgba(74,222,128,0.5)' : 'none',
                    transition: 'background 300ms ease',
                  }}
                />
                <div>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-inverse)',
                    opacity: 0.9,
                    lineHeight: 1.3,
                    marginBottom: '2px',
                  }}>
                    {agent.name}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    color: 'var(--text-inverse)',
                    opacity: 0.4,
                    lineHeight: 1.3,
                  }}>
                    {agent.action} · {formatTime(agent.minutesAgo)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Подвал */}
          <div style={{
            padding: '12px 20px',
            borderTop: '1px solid rgba(244,237,230,0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              color: 'var(--sage)',
              opacity: 0.7,
              letterSpacing: '0.04em',
            }}>
              {agents.length} агентов · работает 24/7
            </span>
          </div>
        </div>
      )}
    </>
  )
}
