import fs from 'node:fs'
import path from 'node:path'
import { getAllRetailProducts } from '../retailCatalog.ts'
import { getAllCigarProducts } from '../cigarCatalog.ts'

const ROOT = process.cwd()
const DEFAULT_SITE_URL = 'https://bagsupplyco.com'
const GOOGLE_CATEGORY = 'Business & Industrial > Packaging Materials'

function cleanSiteUrl(value) {
  return (value || DEFAULT_SITE_URL).replace(/\/+$/, '')
}

function siteUrl() {
  return cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
}

function toAbsoluteUrl(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${siteUrl()}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function repairMojibake(value) {
  if (!/[ÃâÂ]/.test(value)) return value

  const repaired = Buffer.from(value, 'latin1').toString('utf8')
  return repaired.includes('\uFFFD') ? value : repaired
}

function normalizeText(value) {
  return repairMojibake(normalizeWhitespace(value))
    .replace(/\u2019/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/Â/g, '')
}

function escapeXml(value) {
  return normalizeText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatPrice(price) {
  return `${Number(price).toFixed(2)} USD`
}

function slugifySegment(value) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item'
}

function getCatalogSkuSlug(sku) {
  return slugifySegment(sku)
}

function stripRowToSizeLabel(label) {
  return normalizeWhitespace(label)
    .replace(/\s+\d[\d,]*\s*(?:qty|per case|\/case).*$/i, '')
    .replace(/\s+\d+\s*-\s*color$/i, '')
    .trim()
}

function getCatalogSizeSlug(sizeLabel) {
  const numericMatch = sizeLabel.match(/#(\d+)(?=\s|\(|$)/i)
  if (numericMatch) return numericMatch[1]

  const normalized = sizeLabel
    .replace(/\([^)]*\)/g, ' ')
    .replace(/^#/, '')
    .replace(/\s+/g, ' ')
    .trim()

  return slugifySegment(normalized)
}

function getCatalogRows(product) {
  if (Array.isArray(product.sizePricing) && product.sizePricing.length > 0) {
    return product.sizePricing.map((row) => ({
      ...row,
      sizeLabel: stripRowToSizeLabel(row.label) || row.label,
    }))
  }

  if (Array.isArray(product.sizeOptions) && product.sizeOptions.length > 0) {
    return product.sizeOptions.map((sizeLabel) => ({
      label: `${sizeLabel} ${product.caseCount}`.trim(),
      price: product.startingPrice,
      sizeLabel,
    }))
  }

  return [
    {
      label: product.caseCount || 'Standard size',
      price: product.startingPrice,
      sizeLabel: 'Standard size',
    },
  ]
}

function buildItem(fields) {
  return {
    id: fields.id,
    title: normalizeText(fields.title),
    description: normalizeText(fields.description),
    link: toAbsoluteUrl(fields.link),
    imageLink: toAbsoluteUrl(fields.imageLink),
    price: formatPrice(fields.price),
    availability: 'in stock',
    condition: 'new',
    brand: 'BagSupplyCo',
    googleProductCategory: GOOGLE_CATEGORY,
  }
}

function getCatalogFeedItems() {
  const catalogProducts = readJson('data/catalogProducts.json')

  return catalogProducts.flatMap((product) => {
    const skuSlug = getCatalogSkuSlug(product.sku)

    return getCatalogRows(product).map((row) => {
      const sizeSlug = getCatalogSizeSlug(row.sizeLabel)
      return buildItem({
        id: `catalog-${product.industry}-${skuSlug}-${sizeSlug}`,
        title: `${product.name} - ${row.sizeLabel}`,
        description: `${product.description} Size: ${row.sizeLabel}. Price applies to ${row.label}.`,
        link: `/catalog/${product.industry}/${skuSlug}/${sizeSlug}`,
        imageLink: product.image,
        price: row.price,
      })
    })
  })
}

function getMylarFeedItems() {
  const mylarProducts = readJson('data/mylarProducts.json').products || []

  return mylarProducts.map((product) =>
    buildItem({
      id: `mylar-${product.slug}`,
      title: product.name,
      description: product.description,
      link: `/catalog/mylar-bags/${product.slug}`,
      imageLink: product.image,
      price: product.price,
    }),
  )
}

function getLabelFeedItems() {
  const labelProducts = readJson('data/labelProducts.json').products || []

  return labelProducts.map((product) =>
    buildItem({
      id: `label-${product.slug}`,
      title: product.name,
      description: product.description,
      link: `/catalog/labels?sku=${product.slug}`,
      imageLink: product.image,
      price: product.price,
    }),
  )
}

function getRetailFeedItems() {
  return getAllRetailProducts().flatMap((product) =>
    product.variants.map((variant) =>
      buildItem({
        id: `retail-${product.slug}-${variant.slug}`,
        title: `${product.name} - ${variant.label}`,
        description: `${product.description} ${variant.caseCount.toLocaleString('en-US')} bags per case.`,
        link: `/catalog/retail-bags/${product.slug}`,
        imageLink: product.image,
        price: variant.price,
      }),
    ),
  )
}

function getCigarFeedItems() {
  return getAllCigarProducts().map((product) =>
    buildItem({
      id: `cigar-${product.slug}`,
      title: `${product.name} ${product.size}`,
      description: product.description,
      link: `/catalog/cigar-bags/${product.slug}`,
      imageLink: product.image,
      price: product.price,
    }),
  )
}

export function getMerchantFeedItems() {
  return [
    ...getCatalogFeedItems(),
    ...getRetailFeedItems(),
    ...getMylarFeedItems(),
    ...getCigarFeedItems(),
    ...getLabelFeedItems(),
  ]
}

function renderItem(item) {
  return [
    '    <item>',
    `      <g:id>${escapeXml(item.id)}</g:id>`,
    `      <g:title>${escapeXml(item.title)}</g:title>`,
    `      <g:description>${escapeXml(item.description)}</g:description>`,
    `      <g:link>${escapeXml(item.link)}</g:link>`,
    `      <g:image_link>${escapeXml(item.imageLink)}</g:image_link>`,
    `      <g:price>${escapeXml(item.price)}</g:price>`,
    `      <g:availability>${escapeXml(item.availability)}</g:availability>`,
    `      <g:condition>${escapeXml(item.condition)}</g:condition>`,
    `      <g:brand>${escapeXml(item.brand)}</g:brand>`,
    `      <g:google_product_category>${escapeXml(item.googleProductCategory)}</g:google_product_category>`,
    '    </item>',
  ].join('\n')
}

export function buildMerchantFeedXml() {
  const items = getMerchantFeedItems().sort((a, b) => a.id.localeCompare(b.id))

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    '  <channel>',
    '    <title>BagSupplyCo Product Feed</title>',
    `    <link>${escapeXml(siteUrl())}</link>`,
    '    <description>Google Merchant Center product feed for BagSupplyCo wholesale packaging products.</description>',
    ...items.map(renderItem),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
