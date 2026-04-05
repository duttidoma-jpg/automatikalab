'use client'

// Органический SVG-переход между секциями разных цветов.
// Использование: <CurveDivider from="var(--forest)" to="var(--cream)" />
// Принцип: div с цветом "from" как фон, SVG рисует "to" цветом с кривой сверху.

interface Props {
  from: string   // цвет секции выше
  to: string     // цвет секции ниже
  variant?: 0 | 1 | 2  // форма волны для разнообразия
  height?: string
}

const PATHS = [
  // 0: плавная арка — to-цвет поднимается из центра
  'M0,80 L0,55 C360,5 1080,5 1440,55 L1440,80 Z',
  // 1: обратная арка — to-цвет опускается в центре
  'M0,80 L0,25 C360,75 1080,75 1440,25 L1440,80 Z',
  // 2: S-кривая — асимметрично, живее
  'M0,80 L0,45 C280,5 560,75 840,35 C1100,5 1300,65 1440,30 L1440,80 Z',
]

export default function CurveDivider({
  from,
  to,
  variant = 0,
  height = 'clamp(48px, 5vw, 80px)',
}: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        lineHeight: 0,
        display: 'block',
        background: from,   // верхняя секция "продолжается" как фон
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}
      >
        {/* Путь заливает to-цветом от кривой до низа */}
        <path d={PATHS[variant]} fill={to} />
      </svg>
    </div>
  )
}
