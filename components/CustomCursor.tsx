'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const viewLabelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Только на устройствах с точным указателем (мышь)
    if (!window.matchMedia('(pointer: fine)').matches) return

    // Все мутабельные переменные — в refs, не в state
    // Это предотвращает перезапуск эффекта и конкурирующие RAF loops
    let mouseX = 0
    let mouseY = 0
    let outerX = 0
    let outerY = 0
    let cursorState: 'default' | 'hover' | 'card' = 'default'
    let visible = false
    let animId: number

    const outer = outerRef.current
    const inner = innerRef.current
    const viewLabel = viewLabelRef.current
    if (!outer || !inner) return

    // Применяем стиль cursor напрямую — без React state
    const applyState = (state: typeof cursorState) => {
      cursorState = state
      const size = state === 'card' ? 80 : state === 'hover' ? 56 : 36
      outer.style.width = `${size}px`
      outer.style.height = `${size}px`
      outer.style.mixBlendMode = state === 'hover' ? 'difference' : 'normal'
      inner.style.opacity = state === 'card' ? '0' : visible ? '1' : '0'
      if (viewLabel) viewLabel.style.opacity = state === 'card' ? '1' : '0'
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!visible) {
        visible = true
        outer.style.opacity = '0.6'
        inner.style.opacity = '1'
      }

      // Inner dot следует мгновенно
      inner.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
    }

    // Один RAF loop — никогда не пересоздаётся
    const tick = () => {
      const size = cursorState === 'card' ? 80 : cursorState === 'hover' ? 56 : 36
      // Плавный lerp без скачков
      outerX += (mouseX - outerX) * 0.10
      outerY += (mouseY - outerY) * 0.10
      outer.style.transform = `translate(${outerX - size / 2}px, ${outerY - size / 2}px)`
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Hover-обработчики — делегирование на document, без per-element listeners
    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('[data-cursor="card"]')) {
        applyState('card')
      } else if (t.closest('a, button')) {
        applyState('hover')
      }
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.relatedTarget as Element | null
      if (!t || (!t.closest('[data-cursor="card"]') && !t.closest('a, button'))) {
        applyState('default')
      }
    }

    document.addEventListener('mouseover', onEnter, { passive: true })
    document.addEventListener('mouseout', onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, []) // Пустой deps — запускается один раз, RAF управляет анимацией

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1px solid var(--sage)',
          borderRadius: '50%',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 250ms ease, height 250ms ease, opacity 200ms ease, mix-blend-mode 0ms',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={viewLabelRef}
          style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--sage)',
            textTransform: 'uppercase',
            opacity: 0,
            transition: 'opacity 200ms ease',
            userSelect: 'none',
          }}
        >
          VIEW
        </span>
      </div>

      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          background: 'var(--sage)',
          borderRadius: '50%',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'opacity 200ms ease',
        }}
      />
    </>
  )
}
