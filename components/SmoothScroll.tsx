'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Плавный скролл через Lenis + синхронизация с GSAP ScrollTrigger.
// Без синхронизации ScrollTrigger читает неправильную позицию и анимации
// срабатывают со смещением — lenis.on('scroll', ScrollTrigger.update) это фиксит.
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tickerFn: ((time: number) => void) | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      // ScrollTrigger обновляется при каждом Lenis-тике
      lenis.on('scroll', ScrollTrigger.update)

      // Lenis тикает через GSAP ticker (не через отдельный RAF)
      tickerFn = (time: number) => { lenis!.raf(time * 1000) }
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      // tickerFn удалится вместе с GSAP-контекстом при размонтировании
    }
  }, [])

  return null
}
