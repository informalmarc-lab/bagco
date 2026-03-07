'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const PING_INTERVAL_MS = 5 * 60 * 1000
const PING_ACTIVE_WINDOW_MS = 5 * 60 * 1000
const INACTIVITY_MS = 8 * 60 * 60 * 1000

export default function AdminSessionHeartbeat() {
  const router = useRouter()
  const lastActiveRef = useRef(Date.now())

  useEffect(() => {
    let cancelled = false

    const markActive = () => {
      lastActiveRef.current = Date.now()
    }

    const ping = async () => {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store' })
        if (!response.ok && !cancelled) router.replace('/admin/login')
      } catch {
        if (!cancelled) router.replace('/admin/login')
      }
    }

    const tick = () => {
      const idleMs = Date.now() - lastActiveRef.current
      if (idleMs > INACTIVITY_MS) {
        router.replace('/admin/login')
        return
      }
      if (idleMs <= PING_ACTIVE_WINDOW_MS && document.visibilityState === 'visible') {
        void ping()
      }
    }

    const events: Array<keyof WindowEventMap> = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart']
    events.forEach((name) => window.addEventListener(name, markActive, { passive: true }))

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        markActive()
        void ping()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    void ping()
    const timer = window.setInterval(tick, PING_INTERVAL_MS)
    return () => {
      cancelled = true
      window.clearInterval(timer)
      events.forEach((name) => window.removeEventListener(name, markActive))
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [router])

  return null
}
