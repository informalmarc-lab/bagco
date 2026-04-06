'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminShortLinkRecord } from '@/lib/admin/shortLinks'

type Props = {
  initialLinks: AdminShortLinkRecord[]
  siteUrl: string
}

function formatDate(value: string | null): string {
  if (!value) return 'Never'

  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AdminShortLinkManager({ initialLinks, siteUrl }: Props) {
  const router = useRouter()
  const [links, setLinks] = useState(initialLinks)
  const [slug, setSlug] = useState('')
  const [destinationUrl, setDestinationUrl] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState('')
  const [deletingId, setDeletingId] = useState('')

  const previewUrl = useMemo(() => {
    const normalized = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
    return normalized ? `${siteUrl}/s/${normalized}` : `${siteUrl}/s/your-slug`
  }, [siteUrl, slug])

  const createLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/admin/short-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, destinationUrl }),
      })

      const data = (await response.json()) as {
        record?: AdminShortLinkRecord
        errors?: string[]
        error?: string
      }

      if (!response.ok || !data.record) {
        setError(data.errors?.join(' ') || data.error || 'Unable to create short link.')
        setLoading(false)
        return
      }

      setLinks((current) => [data.record!, ...current.filter((item) => item.id !== data.record!.id)])
      setSlug('')
      setDestinationUrl('')
      setSuccess(`Created ${siteUrl}/s/${data.record.slug}`)
      router.refresh()
    } catch {
      setError('Unable to create short link.')
    } finally {
      setLoading(false)
    }
  }

  const deleteLink = async (id: string) => {
    setDeletingId(id)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/admin/short-links/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        setError('Unable to delete short link.')
        setDeletingId('')
        return
      }

      setLinks((current) => current.filter((link) => link.id !== id))
      setSuccess('Short link deleted.')
      router.refresh()
    } catch {
      setError('Unable to delete short link.')
    } finally {
      setDeletingId('')
    }
  }

  const copyLink = async (slugValue: string, id: string) => {
    const value = `${siteUrl}/s/${slugValue}`

    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setSuccess(`Copied ${value}`)
      window.setTimeout(() => setCopiedId((current) => (current === id ? '' : current)), 1800)
    } catch {
      setError('Copy failed. You can copy the link directly from the table.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#C4935A66] bg-white p-6 shadow-[0_14px_34px_rgba(30,77,43,0.1)]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={createLink} className="grid gap-4">
            <div>
              <h2 className="heading-serif text-2xl font-black text-[#1E4D2B]">Create a short link</h2>
              <p className="mt-2 text-sm text-[#5F4D33]">
                Create a branded BagSupplyCo redirect like <span className="font-semibold">{siteUrl}/s/sample-kit</span>.
              </p>
            </div>

            <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">
              Short slug
              <input
                type="text"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="sample-kit"
                className="rounded-xl border border-[#C4935A99] px-3 py-2"
                required
              />
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">
              Destination URL or site path
              <input
                type="text"
                value={destinationUrl}
                onChange={(event) => setDestinationUrl(event.target.value)}
                placeholder="/catalog/pharmacy or https://bagsupplyco.com/catalog/pharmacy"
                className="rounded-xl border border-[#C4935A99] px-3 py-2"
                required
              />
            </label>

            {error && <p className="rounded-xl border border-[#C0392B33] bg-[#FFF5F3] px-3 py-2 text-sm font-semibold text-[#C0392B]">{error}</p>}
            {success && <p className="rounded-xl border border-[#1E4D2B22] bg-[#F4FAF4] px-3 py-2 text-sm font-semibold text-[#1E4D2B]">{success}</p>}

            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Creating...' : 'Create Short Link'}
              </button>
              <p className="self-center text-xs font-semibold uppercase tracking-[0.08em] text-[#B5813A]">
                Lowercase letters, numbers, and hyphens only
              </p>
            </div>
          </form>

          <aside className="rounded-2xl border border-[#1E4D2B14] bg-[#FAF6F0] p-5">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">Preview</p>
            <p className="mt-3 break-all text-xl font-black text-[#1E4D2B]">{previewUrl}</p>
            <div className="mt-5 space-y-3 text-sm text-[#5F4D33]">
              <p>Short links are protected by the same admin login as your quote portal.</p>
              <p>Destinations are limited to BagSupplyCo pages so the tool stays locked to your site.</p>
              <p>Every visit is counted so you can see which links are getting used.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="rounded-2xl border border-[#C4935A66] bg-white p-6 shadow-[0_14px_34px_rgba(30,77,43,0.1)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="heading-serif text-2xl font-black text-[#1E4D2B]">Existing short links</h2>
            <p className="mt-2 text-sm text-[#5F4D33]">Manage your active BagSupplyCo redirects in one place.</p>
          </div>
          <p className="rounded-full border border-[#B5813A55] bg-[#FAF6F0] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">
            {links.length} total
          </p>
        </div>

        {links.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#C4935A88] bg-[#FAF6F0] px-4 py-8 text-center text-sm text-[#5F4D33]">
            No short links yet. Create your first redirect above.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#C4935A55] text-[#5F4D33]">
                  <th className="px-3 py-3 font-black uppercase tracking-[0.08em]">Short URL</th>
                  <th className="px-3 py-3 font-black uppercase tracking-[0.08em]">Destination</th>
                  <th className="px-3 py-3 font-black uppercase tracking-[0.08em]">Visits</th>
                  <th className="px-3 py-3 font-black uppercase tracking-[0.08em]">Last Visit</th>
                  <th className="px-3 py-3 font-black uppercase tracking-[0.08em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="border-b border-[#C4935A22] align-top">
                    <td className="px-3 py-4">
                      <p className="font-bold text-[#1E4D2B]">{siteUrl}/s/{link.slug}</p>
                      <p className="mt-1 text-xs text-[#5F4D33]">Created {formatDate(link.createdAt)}</p>
                    </td>
                    <td className="px-3 py-4">
                      <a
                        href={link.destinationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all font-semibold text-[#1E4D2B] underline"
                      >
                        {link.destinationUrl}
                      </a>
                    </td>
                    <td className="px-3 py-4 font-bold text-[#1E4D2B]">{link.visits}</td>
                    <td className="px-3 py-4 text-[#5F4D33]">{formatDate(link.lastVisitedAt)}</td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => copyLink(link.slug, link.id)} className="btn-quiet px-4 py-2">
                          {copiedId === link.id ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLink(link.id)}
                          disabled={deletingId === link.id}
                          className="inline-flex items-center justify-center rounded-md border border-[#C0392B55] px-4 py-2 text-sm font-bold text-[#C0392B] hover:bg-[#FFF3F1]"
                        >
                          {deletingId === link.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
