import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isBlockedImageFile } from '@/lib/imageFilters'

const RESERVED = new Set(['custom', 'pharmacy', 'veterinary'])
const BLOCKED_CATALOGS = new Set(['grocery'])
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])
const HIDDEN_PREFIX = '.'

const LABELS: Record<string, { title: string; description: string }> = {
  bakery: {
    title: 'Bakery Bags',
    description: 'Browse bakery paper bag designs and request pricing for your preferred sizes.',
  },
  college: {
    title: 'College & University Bags',
    description: 'Campus-themed bag styles and related paper packaging designs.',
  },
  dispensary: {
    title: 'Dispensary Bags',
    description: 'Dispensary-ready paper bag options with multiple design styles.',
  },
  faith: {
    title: 'Faith & Religious Bags',
    description: 'Faith and religious-themed paper bag design collection.',
  },
  holiday: {
    title: 'Holiday Bags',
    description: 'Holiday-themed paper bag designs including seasonal programs.',
  },
  'magazine-comics': {
    title: 'Dispensary Store Bags',
    description: 'Bag options and print examples for dispensary storefront and counter use.',
  },
  minicases: {
    title: 'Mini Cases',
    description:
      'Mini cases are often lower-commitment options with smaller case counts. Contact us for current availability and pricing.',
  },
  pride: {
    title: 'Pride Bags',
    description: 'Pride-themed paper bag designs for inclusive retail programs.',
  },
  seasonal: {
    title: 'Seasonal Bags',
    description: 'Seasonal and holiday-style paper bag designs.',
  },
  usa: {
    title: 'USA Bags',
    description: 'USA-themed bag design collection with non-duplicate imported assets.',
  },
  winery: {
    title: 'Winery Bags',
    description: 'Winery and bottle-shop oriented paper bag design examples.',
  },
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function getImageList(dirPath: string, slug: string): { src: string; name: string }[] {
  const images: { src: string; name: string }[] = []
  if (!fs.existsSync(dirPath)) return images

  const walk = (current: string, webPrefix: string) => {
    const list = fs.readdirSync(current)
    for (const file of list) {
      const fullPath = path.join(current, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath, `${webPrefix}/${file}`)
      } else {
        const ext = path.extname(file).toLowerCase()
        if (!IMAGE_EXT.has(ext)) continue
        if (isBlockedImageFile(file)) continue

        images.push({
          src: `${webPrefix}/${file}`.replace(/\\/g, '/'),
          name: path.basename(file, ext),
        })
      }
    }
  }

  walk(dirPath, `/catalog/${slug}`)
  return images.sort((a, b) => a.src.localeCompare(b.src))
}

function isCatalogDirectory(basePath: string, folderName: string): boolean {
  if (
    !folderName ||
    folderName.startsWith(HIDDEN_PREFIX) ||
    RESERVED.has(folderName) ||
    BLOCKED_CATALOGS.has(folderName)
  ) {
    return false
  }

  const fullPath = path.join(basePath, folderName)
  try {
    return fs.statSync(fullPath).isDirectory()
  } catch {
    return false
  }
}

export async function generateStaticParams() {
  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  if (!fs.existsSync(catalogRoot)) return []

  return fs
    .readdirSync(catalogRoot)
    .filter((folder) => isCatalogDirectory(catalogRoot, folder))
    .map((folder) => ({ folder }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folder: string }>
}): Promise<Metadata> {
  const { folder } = await params
  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  if (!isCatalogDirectory(catalogRoot, folder)) return {}

  const copy = LABELS[folder]
  const title = copy?.title || `${titleFromSlug(folder)} Bags`
  const description =
    copy?.description || `Browse ${titleFromSlug(folder)} bag designs and request pricing from Bag Supply Co.`

  return { title, description }
}

export default async function CatalogFolderPage({
  params,
}: {
  params: Promise<{ folder: string }>
}) {
  const { folder } = await params
  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  if (!isCatalogDirectory(catalogRoot, folder)) notFound()

  const folderPath = path.join(catalogRoot, folder)
  const images = getImageList(folderPath, folder)
  const copy = LABELS[folder]
  const pageTitle = copy?.title || `${titleFromSlug(folder)} Bags`
  const description =
    copy?.description || `Browse ${titleFromSlug(folder)} paper bag options and request pricing.`

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Specialty Collection</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">{pageTitle}</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">{description}</p>
        </div>
      </section>

      <section className="section-container py-12">
        {images.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((img) => (
              <div key={img.src} className="surface-card overflow-hidden rounded-2xl">
                <div className="relative aspect-square bg-[#FAF6F0]">
                  <Image
                    src={img.src}
                    alt={img.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="tonal-panel text-center muted-text">No images found in this catalog section yet.</p>
        )}
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Need Pricing for This Collection?</h2>
          <p className="mt-3 muted-text">
            Tell us your quantity target, preferred bag size, and delivery location for a structured quote.
          </p>
          <Link href={`/contact?collection=${folder}`} className="btn-primary mt-6">
            Request Pricing for {pageTitle}
          </Link>
        </div>
      </section>

      <section className="section-container pt-3">
        <div className="tonal-panel">
          <h2 className="section-title">Ready to order? Get a quote ?</h2>
          <p className="mt-3 muted-text">
            Start your quote with this collection pre-selected and submit in minutes.
          </p>
          <Link href="/generic-bag-quote" className="btn-primary mt-5">
            Get a Quote ?
          </Link>
        </div>
      </section>
    </div>
  )
}



