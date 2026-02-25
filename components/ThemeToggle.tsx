'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'bagco-theme'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = saved ? saved === 'dark' : prefersDark

    document.documentElement.classList.toggle('theme-dark', initialDark)
    setIsDark(initialDark)
    setIsReady(true)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('theme-dark', next)
    window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
  }

  if (!isReady) return null

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`print-hide fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-full border px-5 py-2 text-sm font-black shadow-lg backdrop-blur md:bottom-6 ${
        isDark
          ? 'border-slate-500/80 bg-slate-900/95 text-slate-100 hover:bg-slate-800'
          : 'border-slate-900/20 bg-white/95 text-slate-900 hover:bg-amber-50'
      }`}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
