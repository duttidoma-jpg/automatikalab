'use client'

// PageTransition — обёртка для плавных переходов между страницами
// Используется как wrapper в layout или отдельных страницах

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const runTransition = async () => {
      const { gsap } = await import('gsap')

      if (!overlayRef.current || !contentRef.current) return

      // Overlay slide in сверху, затем slide out
      const tl = gsap.timeline()

      tl.set(overlayRef.current, { yPercent: -100, display: 'block' })
        .set(contentRef.current, { opacity: 0 })
        .to(overlayRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power3.in',
        })
        .to(contentRef.current, { opacity: 1, duration: 0.1 }, '+=0.15')
        .to(overlayRef.current, {
          yPercent: 100,
          duration: 0.5,
          ease: 'power3.out',
        })
    }

    runTransition()
  }, [pathname])

  return (
    <>
      {/* Overlay для page transition */}
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
      {/* Контент страницы */}
      <div ref={contentRef}>{children}</div>
    </>
  )
}
