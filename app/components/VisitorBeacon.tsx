'use client'

import { useEffect, useRef } from 'react'

export default function VisitorBeacon() {
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true

    const sendVisit = async () => {
      try {
        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            width: window.screen.width,
            height: window.screen.height,
            pageUrl: window.location.href,
            referrer: document.referrer,
          }),
          keepalive: true,
        })
      } catch {
        // Silent by design.
      }
    }

    void sendVisit()
  }, [])

  return null
}
