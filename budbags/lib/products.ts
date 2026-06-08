export type PrintProgramId = 'FC1C' | 'FC2C' | 'FC3C'
export type PrintSide = 'front' | 'front-back' | 'front-gussets'
export type ArtworkStatus = 'print-ready' | 'needs-help'

export type BagSize = {
  id: string
  label: string
  dimensions: string
  bagsPerCase?: number
  primary?: boolean
}

export type PrintProgram = {
  id: PrintProgramId
  name: string
  colorCount: string
  startingAt: number
  image: string
  description: string
  prices: Record<string, number>
}

export type StockBagProduct = {
  id: string
  name: string
  label: string
  image: string
  positioning: string
  shipping: string
  description: string
  sizes: {
    sku: string
    dimensions: string
    quantity: string
    price: number
  }[]
}

export const contactInfo = {
  phone: '(704) 862-9256',
  phoneHref: 'tel:+17048629256',
  textHref: 'sms:+17048629256',
  address: '912 Houston Drive, Monroe, NC 28110',
  support: 'Monday-Friday support, cannabis bag follow-up within 24 hours',
  email: 'marc@bagsupplyco.com',
  domain: 'budbags.net',
}

export const bagSizes: BagSize[] = [
  { id: '21', label: '#21', dimensions: '3.5" x 1.5" x 10"' },
  { id: '22', label: '#22', dimensions: '4.5" x 2.25" x 11"' },
  { id: '23', label: '#23', dimensions: '5" x 2" x 10"' },
  { id: '25', label: '#25', dimensions: '6" x 4" x 11"', bagsPerCase: 1000, primary: true },
  { id: '26', label: '#26', dimensions: '7" x 4" x 14"' },
  { id: '28', label: '#28', dimensions: '8" x 5" x 16.5"', bagsPerCase: 500, primary: true },
  { id: '12', label: '#12', dimensions: '7" x 10" flat' },
  { id: '14', label: '#14', dimensions: '9" x 11" flat' },
  { id: '15', label: '#15', dimensions: '8.5" x 3.5" x 14.5"' },
]

const oneAndTwoColorPrices = {
  '21': 95.56,
  '22': 119.8,
  '23': 117.4,
  '25': 133.08,
  '26': 102.29,
  '28': 112.1,
  '12': 115.35,
  '14': 99.68,
  '15': 95.78,
}

export const printPrograms: PrintProgram[] = [
  {
    id: 'FC1C',
    name: '1-Color Custom',
    colorCount: '1-color print',
    startingAt: 95.56,
    image: 'https://bagsupplyco.com/catalog/custom/1-color/CBC-25-FC1C.webp',
    description: 'A clean logo bag for shops that want every walkout order branded without overbuilding the first run.',
    prices: oneAndTwoColorPrices,
  },
  {
    id: 'FC2C',
    name: '2-Color Custom',
    colorCount: '2-color print',
    startingAt: 95.56,
    image: 'https://bagsupplyco.com/catalog/custom/2-color/CBC-25-FC2C.webp',
    description: 'The balanced program for cannabis brand marks that need contrast at the counter and still need practical case pricing.',
    prices: { ...oneAndTwoColorPrices, '23': 117.39 },
  },
  {
    id: 'FC3C',
    name: '3-Color Custom',
    colorCount: '3-color print',
    startingAt: 119.46,
    image: 'https://bagsupplyco.com/catalog/custom/3-color/CBC-25-FC3C.webp',
    description: 'A stronger checkout bag for dispensaries, house brands, delivery menus, or multi-store groups that need more color depth.',
    prices: {
      '21': 119.46,
      '22': 149.76,
      '23': 146.76,
      '25': 166.36,
      '26': 127.86,
      '28': 140.12,
      '12': 144.18,
      '14': 124.61,
      '15': 119.71,
    },
  },
]

export const stockBagProducts: StockBagProduct[] = [
  {
    id: 'ty',
    name: '"Thank You" Design',
    label: 'Stock Bag 1 - TY',
    image: 'https://bagsupplyco.com/catalog/pharmacy/ty/TY-22-FRONT.webp',
    positioning: 'Need bags fast? Cover the register while your custom order is in production',
    shipping: 'Stock paper bag - ships same day before 1 PM ET, no custom print',
    description:
      'A fast counter bag for cannabis retailers who need clean, ready-to-ship paper while the branded run is being proofed or printed.',
    sizes: [
      { sku: '#25', dimensions: '6" x 4" x 11"', quantity: '1,000/case', price: 65.91 },
      { sku: '#26', dimensions: '7" x 4" x 14"', quantity: '1,000/case', price: 102.29 },
      { sku: '#28', dimensions: '8" x 5" x 17"', quantity: '500/case', price: 112.1 },
    ],
  },
  {
    id: 'ds',
    name: 'Dispensary Exit Bag',
    label: 'Stock Bag 2 - DS',
    image: 'https://cardinalbag.store/cdn/shop/products/21-ds.jpg?v=1677602787',
    positioning: 'Plain exit bags for dispensaries that need compliant-feeling coverage fast',
    shipping: 'Plain stock exit bag - no print, ships fast',
    description:
      'A no-print exit bag option for teams that need paper inventory on hand for checkout, pickup, delivery staging, and short-notice reorder coverage.',
    sizes: [
      { sku: '#21-DS', dimensions: '3.5" x 1.5" x 10"', quantity: '1,000 qty', price: 36 },
      { sku: '#12-DS', dimensions: '7" x 10"', quantity: '1,000 qty', price: 45 },
      { sku: '#23-DS', dimensions: '5" x 2" x 10"', quantity: '1,000 qty', price: 39 },
      { sku: '#25-DS', dimensions: '6" x 3.5" x 11"', quantity: '500 qty', price: 35 },
    ],
  },
]

export const productImages = [
  'https://bagsupplyco.com/catalog/custom/1-color/CBC-25-FC1C.webp',
  'https://bagsupplyco.com/catalog/custom/2-color/CBC-25-FC2C.webp',
  'https://bagsupplyco.com/catalog/custom/3-color/CBC-25-FC3C.webp',
  'https://bagsupplyco.com/catalog/custom/1-color/CBC-28-FC1C.webp',
  'https://bagsupplyco.com/catalog/custom/2-color/CBC-28-FC2C.webp',
  'https://bagsupplyco.com/catalog/custom/3-color/CBC-28-FC3C.webp',
]

export const stateZoneGroups: Record<string, { group: string; fscRate: number }> = {
  NC: { group: '2-3', fscRate: 0.05 },
  SC: { group: '2-3', fscRate: 0.05 },
  VA: { group: '2-3', fscRate: 0.05 },
  GA: { group: '2-3', fscRate: 0.05 },
  TN: { group: '2-3', fscRate: 0.05 },
  AL: { group: '2-3', fscRate: 0.05 },
  FL: { group: '4-6', fscRate: 0.075 },
  NY: { group: '4-6', fscRate: 0.075 },
  NJ: { group: '4-6', fscRate: 0.075 },
  PA: { group: '4-6', fscRate: 0.075 },
  OH: { group: '4-6', fscRate: 0.075 },
  MI: { group: '4-6', fscRate: 0.075 },
  IL: { group: '4-6', fscRate: 0.075 },
  MO: { group: '4-6', fscRate: 0.075 },
  TX: { group: '4-6', fscRate: 0.075 },
  OK: { group: '4-6', fscRate: 0.075 },
  CO: { group: '7-8', fscRate: 0.1 },
  AZ: { group: '7-8', fscRate: 0.1 },
  NM: { group: '7-8', fscRate: 0.1 },
  NV: { group: '7-8', fscRate: 0.1 },
  CA: { group: '7-8', fscRate: 0.1 },
  OR: { group: '7-8', fscRate: 0.1 },
  WA: { group: '7-8', fscRate: 0.1 },
}

export const states = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]
