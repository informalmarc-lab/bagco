'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import FallbackImage from '@/components/FallbackImage'
import { getCatalogImageClass } from '@/lib/catalogImagePresentation'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import {
  DEFAULT_CATALOG_FILTERS,
  INDUSTRY_LABELS,
  INDUSTRY_ORDER,
  applyCatalogFilters,
  getCatalogFilterOptions,
  getCatalogOverviewPath,
  getStartingPriceByIndustry,
  isCatalogProductQuoteOnly,
  money,
  type CatalogAvailability,
  type CatalogFilters,
  type CatalogIndustryKey,
  type CatalogProduct,
} from '@/lib/catalogProducts'

type CatalogExplorerClientProps = {
  products: CatalogProduct[]
  searchParams: Record<string, string | string[] | undefined>
}

type ActiveFilterChip = {
  key: string
  label: string
  onRemove: () => void
}

function parseIndustry(value: string | null): CatalogIndustryKey | 'all' {
  if (!value) return 'all'
  return INDUSTRY_ORDER.includes(value as CatalogIndustryKey)
    ? (value as CatalogIndustryKey)
    : 'all'
}

function parseAvailability(value: string | null): CatalogAvailability | 'all' {
  if (value === 'stock' || value === 'custom') return value
  return 'all'
}

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
): string | null {
  const value = searchParams[key]
  if (Array.isArray(value)) return value[0] || null
  return value || null
}

function readFilters(searchParams: Record<string, string | string[] | undefined>): CatalogFilters {
  return {
    industry: parseIndustry(getParam(searchParams, 'industry')),
    bagType: getParam(searchParams, 'bagType') || 'all',
    size: getParam(searchParams, 'size') || 'all',
    color: getParam(searchParams, 'color') || 'all',
    availability: parseAvailability(getParam(searchParams, 'availability')),
    usaMadeOnly: getParam(searchParams, 'usaMade') === '1',
    seasonalOnly: getParam(searchParams, 'seasonal') === '1',
    search: getParam(searchParams, 'search') || '',
  }
}

const BUYER_PATHS = [
  {
    href: '/industries/pharmacies',
    title: 'Pharmacy Bags',
    detail: 'Prescription bag programs for stores and regional chains.',
  },
  {
    href: '/industries/veterinary',
    title: 'Veterinary Bags',
    detail: 'Clinic-ready paper bags for meds, discharge kits, and retail.',
  },
  {
    href: '/industries/dispensary',
    title: 'Dispensary Packaging',
    detail: 'Exit bags, labels, and compliant packaging paths.',
  },
  {
    href: '/industries/retail',
    title: 'Retail Bags',
    detail: 'Checkout bag options for general storefront buyers.',
  },
]

export default function CatalogExplorerClient({ products, searchParams }: CatalogExplorerClientProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const options = useMemo(() => getCatalogFilterOptions(products), [products])
  const filters = useMemo(() => readFilters(searchParams), [searchParams])
  const filtered = useMemo(() => applyCatalogFilters(products, filters), [products, filters])

  const updateFilters = (updates: Partial<CatalogFilters>) => {
    const next: CatalogFilters = { ...filters, ...updates }
    const params = new URLSearchParams()

    const setParam = (key: string, value: string, defaultValue: string) => {
      if (!value || value === defaultValue) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    setParam('industry', next.industry, DEFAULT_CATALOG_FILTERS.industry)
    setParam('bagType', next.bagType, DEFAULT_CATALOG_FILTERS.bagType)
    setParam('size', next.size, DEFAULT_CATALOG_FILTERS.size)
    setParam('color', next.color, DEFAULT_CATALOG_FILTERS.color)
    setParam('availability', next.availability, DEFAULT_CATALOG_FILTERS.availability)
    setParam('search', next.search, DEFAULT_CATALOG_FILTERS.search)

    if (next.usaMadeOnly) params.set('usaMade', '1')
    else params.delete('usaMade')

    if (next.seasonalOnly) params.set('seasonal', '1')
    else params.delete('seasonal')

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const resetFilters = () => {
    router.replace(pathname, { scroll: false })
    setShowMobileFilters(false)
  }

  const activeChips: ActiveFilterChip[] = []

  if (filters.search) {
    activeChips.push({
      key: 'search',
      label: `Search: ${filters.search}`,
      onRemove: () => updateFilters({ search: '' }),
    })
  }
  if (filters.industry !== 'all') {
    activeChips.push({
      key: 'industry',
      label: `Industry: ${INDUSTRY_LABELS[filters.industry]}`,
      onRemove: () => updateFilters({ industry: 'all' }),
    })
  }
  if (filters.bagType !== 'all') {
    activeChips.push({
      key: 'bagType',
      label: `Bag Type: ${filters.bagType}`,
      onRemove: () => updateFilters({ bagType: 'all' }),
    })
  }
  if (filters.size !== 'all') {
    activeChips.push({
      key: 'size',
      label: `Size: ${filters.size}`,
      onRemove: () => updateFilters({ size: 'all' }),
    })
  }
  if (filters.color !== 'all') {
    activeChips.push({
      key: 'color',
      label: `Color: ${filters.color}`,
      onRemove: () => updateFilters({ color: 'all' }),
    })
  }
  if (filters.availability !== 'all') {
    activeChips.push({
      key: 'availability',
      label: filters.availability === 'stock' ? 'In Stock' : 'Custom Print',
      onRemove: () => updateFilters({ availability: 'all' }),
    })
  }
  if (filters.usaMadeOnly) {
    activeChips.push({
      key: 'usaMadeOnly',
      label: 'USA-Made',
      onRemove: () => updateFilters({ usaMadeOnly: false }),
    })
  }
  if (filters.seasonalOnly) {
    activeChips.push({
      key: 'seasonalOnly',
      label: 'Seasonal',
      onRemove: () => updateFilters({ seasonalOnly: false }),
    })
  }

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="kicker">Catalog</p>
              <h1 className="heading-display mt-5">Wholesale Bag Catalog by Industry, Size, and Material</h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Use the filters to narrow products fast, then jump into sizes, pricing, and stock status without
                bouncing between category pages.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/makeyourquote" className="btn-primary">
                  Build a Quote
                </Link>
                <button type="button" className="btn-secondary" onClick={resetFilters}>
                  Reset Catalog
                </button>
              </div>
            </div>

            <div className="hero-panel p-5">
              <p className="text-sm font-black uppercase tracking-[0.08em] text-accent-600">Catalog Snapshot</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <p className="text-3xl font-black tracking-[-0.04em] text-brand-600">{filtered.length}</p>
                  <p className="text-sm text-muted">matching products</p>
                </div>
                <div>
                  <p className="text-lg font-black text-brand-600">
                    {money(Math.min(...INDUSTRY_ORDER.map((industry) => getStartingPriceByIndustry(industry))))}
                  </p>
                  <p className="text-sm text-muted">lowest starting case price</p>
                </div>
                <div>
                  <p className="text-lg font-black text-brand-600">{INDUSTRY_ORDER.length}</p>
                  <p className="text-sm text-muted">core buying paths</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-8">
        <div className="mb-4 lg:hidden">
          <div className="rounded-xl border border-kraft-300/60 bg-white p-4 shadow-[0_2px_10px_rgba(30,77,43,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-brand-600">Catalog Filters</p>
                <p className="text-sm text-muted">
                  {filtered.length} result{filtered.length === 1 ? '' : 's'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileFilters((prev) => !prev)}
                className="btn-secondary"
                aria-expanded={showMobileFilters}
                aria-controls="catalog-filters"
              >
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside id="catalog-filters" className={`${showMobileFilters ? 'block' : 'hidden'} lg:sticky lg:top-24 lg:block lg:self-start`}>
            <div className="tonal-panel p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-brand-600">Filters</h2>
                <button type="button" onClick={resetFilters} className="text-sm font-bold text-accent-600">
                  Clear all
                </button>
              </div>

              <label className="mt-5 grid gap-1 text-sm font-semibold text-muted">
                Search catalog
                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilters({ search: event.target.value })}
                  placeholder="SKU, bag type, size..."
                  className="rounded-xl border border-kraft-400/40 bg-white px-3 py-2.5"
                />
              </label>

              <div className="mt-5">
                <p className="text-sm font-semibold text-muted">Quick industry picks</p>
                <div className="mt-3 grid gap-2">
                  {INDUSTRY_ORDER.map((industry) => {
                    const active = filters.industry === industry
                    return (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => {
                          updateFilters({ industry: active ? 'all' : industry })
                          setShowMobileFilters(false)
                        }}
                        aria-pressed={active}
                        className={`rounded-xl border px-3 py-3 text-left transition ${
                          active
                            ? 'border-brand-600 bg-brand-600 text-white'
                            : 'border-kraft-300/60 bg-white text-brand-600 hover:border-accent-400/60 hover:bg-[#FFFCF7]'
                        }`}
                      >
                        <p className="text-sm font-black">{INDUSTRY_LABELS[industry]}</p>
                        <p className={`mt-1 text-xs ${active ? 'text-[#F4E8D8]' : 'text-accent-600'}`}>
                          Starts at {money(getStartingPriceByIndustry(industry))}/case
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <label className="grid gap-1 text-sm font-semibold text-muted">
                  Industry
                  <select
                    value={filters.industry}
                    onChange={(event) => updateFilters({ industry: parseIndustry(event.target.value) })}
                    className="rounded-xl border border-kraft-400/40 bg-white px-3 py-2.5"
                  >
                    <option value="all">All Industries</option>
                    {INDUSTRY_ORDER.map((industry) => (
                      <option key={industry} value={industry}>
                        {INDUSTRY_LABELS[industry]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1 text-sm font-semibold text-muted">
                  Bag Type
                  <select
                    value={filters.bagType}
                    onChange={(event) => updateFilters({ bagType: event.target.value || 'all' })}
                    className="rounded-xl border border-kraft-400/40 bg-white px-3 py-2.5"
                  >
                    <option value="all">All Bag Types</option>
                    {options.bagTypes.map((bagType) => (
                      <option key={bagType} value={bagType}>
                        {bagType}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1 text-sm font-semibold text-muted">
                  Size
                  <select
                    value={filters.size}
                    onChange={(event) => updateFilters({ size: event.target.value || 'all' })}
                    className="rounded-xl border border-kraft-400/40 bg-white px-3 py-2.5"
                  >
                    <option value="all">All Sizes</option>
                    {options.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1 text-sm font-semibold text-muted">
                  Color
                  <select
                    value={filters.color}
                    onChange={(event) => updateFilters({ color: event.target.value || 'all' })}
                    className="rounded-xl border border-kraft-400/40 bg-white px-3 py-2.5"
                  >
                    <option value="all">All Colors</option>
                    {options.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1 text-sm font-semibold text-muted">
                  Availability
                  <select
                    value={filters.availability}
                    onChange={(event) => updateFilters({ availability: parseAvailability(event.target.value) })}
                    className="rounded-xl border border-kraft-400/40 bg-white px-3 py-2.5"
                  >
                    <option value="all">All</option>
                    <option value="stock">In Stock</option>
                    <option value="custom">Custom Print</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 grid gap-2">
                <label className="inline-flex items-center gap-2 rounded-xl border border-kraft-300/60 bg-white px-3 py-3 text-sm font-semibold text-muted">
                  <input
                    type="checkbox"
                    checked={filters.usaMadeOnly}
                    onChange={(event) => updateFilters({ usaMadeOnly: event.target.checked })}
                  />
                  USA-Made Collection
                </label>
                <label className="inline-flex items-center gap-2 rounded-xl border border-kraft-300/60 bg-white px-3 py-3 text-sm font-semibold text-muted">
                  <input
                    type="checkbox"
                    checked={filters.seasonalOnly}
                    onChange={(event) => updateFilters({ seasonalOnly: event.target.checked })}
                  />
                  Seasonal Collection
                </label>
              </div>

              <div className="mt-5 lg:hidden">
                <button type="button" onClick={() => setShowMobileFilters(false)} className="btn-primary w-full">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="tonal-panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-brand-600">Results</h2>
                  <p className="mt-1 text-sm text-muted">
                    <span className="sr-only" aria-live="polite">
                      {filtered.length} product{filtered.length === 1 ? '' : 's'} found.
                    </span>
                    {filtered.length} product{filtered.length === 1 ? '' : 's'} matching your current filter set.
                  </p>
                </div>
                <Link href="/makeyourquote" className="btn-secondary">
                  Need help choosing?
                </Link>
              </div>

              {activeChips.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.onRemove}
                      aria-label={`Remove ${chip.label} filter`}
                      className="inline-flex items-center gap-2 rounded-xl border border-kraft-300/60 bg-white px-3 py-2 text-sm font-semibold text-brand-600 hover:border-[#C4935A] hover:bg-[#FFFCF7]"
                    >
                      <span>{chip.label}</span>
                      <span className="text-accent-600" aria-hidden="true">x</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-accent-600">
                  No filters active. You&apos;re viewing the full catalog.
                </p>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-kraft-300/60 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-brand-600">Need a more guided path?</h3>
                  <p className="mt-1 text-sm text-muted">
                    These category pages are cleaner if you already know the type of buyer or store you&apos;re shopping for.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {BUYER_PATHS.map((path) => (
                  <Link
                    key={path.href}
                    href={path.href}
                    className="rounded-xl border border-kraft-300/40 bg-[#FFFCF7] p-4 transition hover:border-[#C4935A] hover:bg-white"
                  >
                    <p className="font-black text-brand-600">{path.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{path.detail}</p>
                  </Link>
                ))}
              </div>
            </div>

            <section className="mt-6">
              {filtered.length === 0 ? (
                <div className="tonal-panel text-center">
                  <h3 className="text-xl font-black text-brand-600">No matches for this filter set</h3>
                  <p className="mt-2 text-sm text-muted">
                    Try clearing one or two filters, or switch to a broader industry selection.
                  </p>
                  <button type="button" onClick={resetFilters} className="btn-primary mt-5">
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {filtered.map((product) => (
                    <article key={product.sku} className="surface-card product-card flex h-full flex-col">
                      <Link href={getCatalogOverviewPath(product)} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                        <FallbackImage
                          src={product.image}
                          fallbackSrc="/images/catalog/placeholder.svg"
                          alt={getCatalogProductAlt(product)}
                          fill
                          className={getCatalogImageClass(product)}
                          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`rounded-xl px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] ${
                              product.availability === 'stock'
                                ? 'bg-[#1E4D2B14] text-brand-600'
                                : 'bg-[#B5813A1F] text-accent-600'
                            }`}
                          >
                            {product.availability === 'stock' ? 'Stock' : 'Custom Print'}
                          </span>
                          {product.collections.includes('usa-made') && (
                            <span className="rounded-xl bg-[#C4935A1D] px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] text-accent-500">
                              USA-Made
                            </span>
                          )}
                          {product.collections.includes('seasonal') && (
                            <span className="rounded-xl bg-[#E8DDCD] px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] text-accent-600">
                              Seasonal
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-xl font-black leading-tight text-brand-600">{product.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent-600">
                          SKU {product.sku}
                        </p>

                        <div className="mt-4 grid gap-3 text-sm text-muted">
                          <div className="flex items-start justify-between gap-4 rounded-xl border border-kraft-300/40 bg-white p-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-600">Bag Type</p>
                              <p className="mt-1 font-semibold leading-6 text-brand-600">{product.bagType}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-600">Lead Time</p>
                              <p className="mt-1 font-semibold text-brand-600">
                                {product.availability === 'stock' ? 'Same day' : '3-4 weeks'}
                              </p>
                            </div>
                          </div>
                          <div className="rounded-xl bg-[#FCF8F2] p-3">
                            <p className="font-semibold text-brand-600">Sizes</p>
                            <p className="mt-1 leading-6">{product.sizeOptions.join(', ')}</p>
                          </div>
                          <div className="flex items-end justify-between gap-4 rounded-xl border border-kraft-300/40 bg-white p-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-600">Case Count</p>
                              <p className="mt-1 font-semibold text-brand-600">{product.caseCount}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-600">Starting Price</p>
                              <p className="mt-1 text-lg font-black text-accent-500">{money(product.startingPrice)}/case</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          {isCatalogProductQuoteOnly(product) ? (
                            <Link href={`/makeyourquote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                              Get a Quote
                            </Link>
                          ) : (
                            <Link href={getCatalogOverviewPath(product)} className="btn-primary">
                              Select Size
                            </Link>
                          )}
                          <Link href={getCatalogOverviewPath(product)} className="btn-secondary">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
