'use client'

import { useEffect, useMemo, useState } from 'react'

type AccessibilitySettings = {
  largeText: boolean
  highContrast: boolean
  reduceMotion: boolean
  underlineLinks: boolean
}

const STORAGE_KEY = 'bagsupplyco-accessibility-v1'

const DEFAULT_SETTINGS: AccessibilitySettings = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false,
}

const CLASS_MAP: Record<keyof AccessibilitySettings, string> = {
  largeText: 'a11y-large-text',
  highContrast: 'a11y-high-contrast',
  reduceMotion: 'a11y-reduce-motion',
  underlineLinks: 'a11y-underline-links',
}

function readStoredSettings(): AccessibilitySettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>
    return {
      largeText: Boolean(parsed.largeText),
      highContrast: Boolean(parsed.highContrast),
      reduceMotion: Boolean(parsed.reduceMotion),
      underlineLinks: Boolean(parsed.underlineLinks),
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement
  for (const [key, className] of Object.entries(CLASS_MAP) as Array<[keyof AccessibilitySettings, string]>) {
    root.classList.toggle(className, settings[key])
  }
}

export default function AccessibilityControls() {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS)
  const [open, setOpen] = useState(false)
  const activeCount = useMemo(
    () => Object.values(settings).filter(Boolean).length,
    [settings],
  )

  useEffect(() => {
    const stored = readStoredSettings()
    setSettings(stored)
    applySettings(stored)
  }, [])

  useEffect(() => {
    applySettings(settings)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const reset = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  return (
    <div className="accessibility-widget print-hide">
      {open && (
        <section
          id="accessibility-panel"
          className="accessibility-panel"
          aria-labelledby="accessibility-title"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="accessibility-title" className="text-base font-black text-[#1E4D2B]">
                Accessibility Options
              </h2>
              <p className="mt-1 text-sm text-[#5F4D33]">
                These settings stay on for this browser.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="accessibility-close"
              aria-label="Close accessibility options"
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            <label className="accessibility-option">
              <span>
                <strong>Larger text</strong>
                <span>Increase page text size.</span>
              </span>
              <input
                type="checkbox"
                checked={settings.largeText}
                onChange={(event) => updateSetting('largeText', event.target.checked)}
              />
            </label>

            <label className="accessibility-option">
              <span>
                <strong>High contrast</strong>
                <span>Use darker text and stronger borders.</span>
              </span>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(event) => updateSetting('highContrast', event.target.checked)}
              />
            </label>

            <label className="accessibility-option">
              <span>
                <strong>Reduce motion</strong>
                <span>Turn off non-essential animation.</span>
              </span>
              <input
                type="checkbox"
                checked={settings.reduceMotion}
                onChange={(event) => updateSetting('reduceMotion', event.target.checked)}
              />
            </label>

            <label className="accessibility-option">
              <span>
                <strong>Underline links</strong>
                <span>Make text links easier to spot.</span>
              </span>
              <input
                type="checkbox"
                checked={settings.underlineLinks}
                onChange={(event) => updateSetting('underlineLinks', event.target.checked)}
              />
            </label>
          </div>

          <button type="button" onClick={reset} className="accessibility-reset">
            Reset options
          </button>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="accessibility-trigger"
        aria-expanded={open}
        aria-controls="accessibility-panel"
      >
        <span aria-hidden="true">Aa</span>
        Accessibility
        {activeCount > 0 && (
          <span className="accessibility-count" aria-label={`${activeCount} accessibility options active`}>
            {activeCount}
          </span>
        )}
      </button>
    </div>
  )
}
