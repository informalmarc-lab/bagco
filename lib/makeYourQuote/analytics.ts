export function trackQuoteEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new CustomEvent('bagco:quote-event', { detail: { eventName, payload } }))

  const maybeDataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer
  maybeDataLayer?.push({ event: eventName, ...payload })
}
