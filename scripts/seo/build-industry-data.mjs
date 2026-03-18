import fs from 'fs'
import path from 'path'

const root = process.cwd()
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data', 'catalogProducts.json'), 'utf8'))

const INDUSTRIES = [
  {
    key: 'pharmacy',
    label: 'Pharmacy Bags',
    catalogIndustry: 'pharmacy',
    complianceNote:
      'Pharmacies must follow state board labeling rules for prescriptions and auxiliary warnings; bags should fit full prescription labels and counseling inserts.',
  },
  {
    key: 'veterinary',
    label: 'Veterinary Bags',
    catalogIndustry: 'veterinary',
    complianceNote:
      'Veterinary dispensing rules require clear labeling and client instructions; bag sizes should fit medication labels and dosing guides.',
  },
  {
    key: 'dispensary',
    label: 'Dispensary Bags',
    catalogIndustry: 'dispensary',
    complianceNote:
      'Dispensary exit bags often require opaque materials and warning label placement; sizes should allow for sealed product containers and compliance stickers.',
  },
  {
    key: 'smoke-shop',
    label: 'Smoke Shop Bags',
    catalogIndustry: 'smoke-shop',
    complianceNote:
      'Smoke shop packaging should allow for warning labels and age-restricted messaging; sizes should fit accessories and glassware safely.',
  },
  {
    key: 'retail',
    label: 'Retail Bags',
    catalogIndustry: 'retail',
    complianceNote:
      'Retail bag programs focus on weight capacity, branding visibility, and any local bag fee requirements.',
  },
  {
    key: 'food-beverage',
    label: 'Food & Beverage Bags',
    catalogIndustry: 'food-beverage',
    complianceNote:
      'Food bags should support grease resistance, weight capacity, and health department labeling when applicable.',
  },
  {
    key: 'wineries-breweries',
    label: 'Wineries & Breweries Bags',
    catalogIndustry: 'food-beverage',
    complianceNote:
      'Bottle carryout bags should support weight, handle strength, and any state alcohol warning requirements.',
  },
  {
    key: 'event-company',
    label: 'Event Company Bags',
    catalogIndustry: 'retail',
    complianceNote:
      'Event kitting bags should handle mixed-weight items and allow for branding or sponsor requirements.',
  },
]

function getMostCommonSizes(products) {
  const counts = new Map()
  products.forEach((product) => {
    product.sizeOptions.forEach((size) => {
      counts.set(size, (counts.get(size) || 0) + 1)
    })
  })
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([size]) => size)
}

const output = INDUSTRIES.map((industry) => {
  const products = catalog.filter((product) => product.industry === industry.catalogIndustry)
  return {
    key: industry.key,
    label: industry.label,
    skus: products.map((product) => product.sku),
    recommendedSizes: getMostCommonSizes(products),
    complianceNote: industry.complianceNote,
  }
})

fs.writeFileSync(path.join(root, 'data', 'seo', 'industryData.json'), JSON.stringify(output, null, 2))
console.log('Saved data/seo/industryData.json')
