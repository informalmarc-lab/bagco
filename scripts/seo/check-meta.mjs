import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildIndustryCityMeta, buildCityMeta, buildIndustryMeta } from '../../lib/seo/meta.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..', '..')

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const cities = readJson(path.join(root, 'data', 'seo', 'cities.json'), [])
const counts = readJson(path.join(root, 'data', 'seo', 'industryCounts.json'), { counts: {} }).counts || {}
const catalogProducts = JSON.parse(fs.readFileSync(path.join(root, 'data', 'catalogProducts.json'), 'utf8'))

const INDUSTRIES = [
  { key: 'pharmacy', slug: 'pharmacy-bags', label: 'Pharmacy Bags', marketLabel: 'pharmacy', catalogIndustry: 'pharmacy' },
  { key: 'veterinary', slug: 'veterinary-bags', label: 'Veterinary Bags', marketLabel: 'veterinary', catalogIndustry: 'veterinary' },
  { key: 'dispensary', slug: 'dispensary-bags', label: 'Dispensary Bags', marketLabel: 'dispensary', catalogIndustry: 'dispensary' },
  { key: 'smoke-shop', slug: 'smoke-shop-bags', label: 'Smoke Shop Bags', marketLabel: 'smoke shop', catalogIndustry: 'smoke-shop' },
  { key: 'retail', slug: 'retail-bags', label: 'Retail Bags', marketLabel: 'retail', catalogIndustry: 'retail' },
  { key: 'food-beverage', slug: 'food-beverage-bags', label: 'Food & Beverage Bags', marketLabel: 'food & beverage', catalogIndustry: 'food-beverage' },
  { key: 'wineries-breweries', slug: 'wineries-breweries-bags', label: 'Wineries & Breweries Bags', marketLabel: 'wineries and breweries', catalogIndustry: 'food-beverage' },
  { key: 'event-company', slug: 'event-company-bags', label: 'Event Company Bags', marketLabel: 'event companies', catalogIndustry: 'retail' },
]

function getStartingPrice(catalogIndustry) {
  const products = catalogProducts.filter((product) => product.industry === catalogIndustry)
  if (!products.length) return 0
  return Math.min(...products.map((product) => product.startingPrice))
}

function registerMeta(map, key, description) {
  const list = map.get(description) || []
  list.push(key)
  map.set(description, list)
}

const descriptionMap = new Map()

for (const industry of INDUSTRIES) {
  const meta = buildIndustryMeta({
    industryLabel: industry.label,
    startingPrice: getStartingPrice(industry.catalogIndustry),
  })
  registerMeta(descriptionMap, `/${industry.slug}`, meta.description)
}

for (const city of cities) {
  const countsEntry = counts[city.slug]
  if (!countsEntry) continue
  const meta = buildCityMeta({
    city: city.city,
    stateAbbr: city.stateAbbr,
    distanceMiles: city.distanceMiles,
    pickupEligible: city.pickupEligible,
    totalEstablishments: countsEntry.totalEstablishments,
    countyName: countsEntry.countyName,
  })
  registerMeta(descriptionMap, `/local/${city.slug}`, meta.description)

  for (const industry of INDUSTRIES) {
    const metaIndustry = buildIndustryCityMeta({
      industryLabel: industry.label,
      marketLabel: industry.marketLabel,
      city: city.city,
      stateAbbr: city.stateAbbr,
      distanceMiles: city.distanceMiles,
      pickupEligible: city.pickupEligible,
      deliveryTimeline: '',
      startingPrice: getStartingPrice(industry.catalogIndustry),
      businessCount: countsEntry.industryCounts?.[industry.key] ?? 0,
      countyName: countsEntry.countyName,
    })
    registerMeta(descriptionMap, `/${industry.slug}/${city.slug}`, metaIndustry.description)
  }
}

const duplicates = Array.from(descriptionMap.entries()).filter(([, pages]) => pages.length > 1)

if (duplicates.length > 0) {
  console.error('Duplicate meta descriptions found:')
  for (const [description, pages] of duplicates) {
    console.error(`\n${description}\n  -> ${pages.join(', ')}`)
  }
  process.exit(1)
}

console.log(`Meta check passed for ${descriptionMap.size} pages.`)
