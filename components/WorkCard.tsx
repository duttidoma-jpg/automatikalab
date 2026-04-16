'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface WorkCardProps {
  title: string
  category: string
  year: string
  bg?: string
  imageSrc?: string
  featured?: boolean
  href?: string
  soon?: boolean
}

export default function WorkCard({
  title,
  category,
  year,
  bg = 'var(--forest)',
  imageSrc,
  featured = false,
  href = '#',
  soon = false,
}: WorkCardProps) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -6, y: x * 6 })                       // ±6 градусов
  }

  const onMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      data-cursor="card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        display: 'block',
        position: 'relative',
        aspectRatio: featured ? '21/9' : '16/10',
        overflow: 'hidden',
        borderRadius: 0,
        textDecoration: 'none',
        color: 'var(--text-inverse)',
        background: bg,
        perspective: '1000px',
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: hovered
          ? 'transform 100ms ease-out'
          : 'transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'transform',
      }}
    >
      {/* Фоновое изображение или цвет */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'top center',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: bg,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />
      )}

      {/* Текстурный паттерн */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(143,163,108,0.08) 0%, transparent 50%)',
          zIndex: 1,
        }}
      />

      {/* Overlay при hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(29, 37, 18, 0.6)',
          opacity: hovered ? 0.7 : 0,
          transition: 'opacity 400ms ease',
          zIndex: 2,
        }}
      />

      {/* Иконка "+" по центру при hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      >
        <span
          style={{
            fontSize: '48px',
            fontWeight: 200,
            color: 'var(--cream)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>

      {/* Метка SOON */}
      {soon && (
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            padding: '6px 14px',
            border: '1px solid rgba(244,237,230,0.3)',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(244,237,230,0.6)',
            zIndex: 4,
          }}
        >
          Скоро
        </div>
      )}

      {/* Нижняя информация */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 32px',
          background:
            'linear-gradient(to top, rgba(29,37,18,0.85) 0%, rgba(29,37,18,0.3) 60%, transparent 100%)',
          zIndex: 4,
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-hanken, sans-serif)',
            fontSize: featured ? '32px' : '20px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            marginBottom: '8px',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          <span>{category}</span>
          <span style={{ opacity: 0.4 }}>—</span>
          <span>{year}</span>
        </div>
      </div>
    </Link>
  )
}
