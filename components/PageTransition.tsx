'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)

  useEffect(() => {
    // Первую загрузку пропускаем — у каждой страницы своя GSAP entrance-анимация
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const runTransition = async () => {
      const { gsap } = await import('gsap')
      if (!overlayRef.current) return

      // Оверлей закрывает контент — opacity самого контента НЕ трогаем
      // чтобы не было зависания прозрачности при ошибке
      const tl = gsap.timeline()
      tl.set(overlayRef.current, { yPercent: -100, display: 'block' })
        .to(overlayRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power3.in',
        })
        .to(overlayRef.current, {
          yPercent: 100,
          duration: 0.55,
          ease: 'power3.out',
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = 'none'
          },
        })
    }

    runTransition()
  }, [pathname])

  return (
    <>
      {/* Оверлей перехода — поверх всего контента */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--forest)',
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'none',
        }}
      />
      {/* Контент — без манипуляций opacity */}
      {children}
    </>
  )
}
