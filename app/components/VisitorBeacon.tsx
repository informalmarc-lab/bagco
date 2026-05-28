'use client'

import { useEffect, useRef } from 'react'

const SEEN_KEY = 'bagco_visitor_seen'
const QUOTE_VISITED_KEY = 'bagco_quote_visited'

type NavigatorWithDeviceInfo = Navigator & {
  deviceMemory?: number
  connection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
    saveData?: boolean
  }
}

function getTrackingParams(searchParams: URLSearchParams) {
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid', 'msclkid']
  return keys.reduce<Record<string, string>>((params, key) => {
    const value = searchParams.get(key)
    if (value) params[key] = value
    return params
  }, {})
}

export default function VisitorBeacon() {
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true

    const sendVisit = async () => {
      try {
        const navigatorInfo = window.navigator as NavigatorWithDeviceInfo
        const searchParams = new URLSearchParams(window.location.search)
        const wasSeen = window.localStorage.getItem(SEEN_KEY) === '1'
        const isQuotePage =
          window.location.pathname.startsWith('/makeyourquote') || window.location.pathname.startsWith('/generic-bag-quote')
        const visitedQuotePage = window.localStorage.getItem(QUOTE_VISITED_KEY) === '1' || isQuotePage

        window.localStorage.setItem(SEEN_KEY, '1')
        if (isQuotePage) window.localStorage.setItem(QUOTE_VISITED_KEY, '1')

        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            width: window.screen.width,
            height: window.screen.height,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio,
            orientation: window.screen.orientation?.type || '',
            pageUrl: window.location.href,
            pagePath: `${window.location.pathname}${window.location.search}`,
            pageTitle: document.title,
            referrer: document.referrer,
            visitStatus: wasSeen ? 'Repeat visitor' : 'First visit',
            visitedQuotePage,
            isQuotePage,
            utm: getTrackingParams(searchParams),
            language: navigatorInfo.language,
            languages: navigatorInfo.languages,
            platform: navigatorInfo.platform,
            vendor: navigatorInfo.vendor,
            cookieEnabled: navigatorInfo.cookieEnabled,
            doNotTrack: navigatorInfo.doNotTrack,
            onLine: navigatorInfo.onLine,
            hardwareConcurrency: navigatorInfo.hardwareConcurrency,
            deviceMemory: navigatorInfo.deviceMemory,
            maxTouchPoints: navigatorInfo.maxTouchPoints,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            connection: navigatorInfo.connection || null,
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
