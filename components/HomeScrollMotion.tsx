'use client'

import { useEffect, useState } from 'react'

export default function HomeScrollMotion({
  children,
}: {
  children: React.ReactNode
}) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        const nextOffset = Math.min(180, Math.max(0, window.scrollY * 0.08))
        setOffset(nextOffset)
        rafId = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="home-scroll-motion"
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
    >
      {children}
    </div>
  )
}
