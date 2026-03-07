'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        setError('Incorrect username or password')
        setLoading(false)
        return
      }
      router.replace('/admin/dashboard')
      router.refresh()
    } catch {
      setError('Incorrect username or password')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">
        Username
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="rounded-lg border border-[#C4935A99] px-3 py-2"
          required
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-lg border border-[#C4935A99] px-3 py-2"
          required
        />
      </label>
      {error && <p className="text-sm font-semibold text-[#C0392B]">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary mt-2 justify-center">
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}
