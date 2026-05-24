export type QuoteCategory = 'Prescription Bags' | 'Flat & Gusset Bags' | 'SOS Grocery Bags' | 'Plastic Bags'

export type QuoteProduct = {
  item: string
  category: QuoteCategory
  size: string
  material: string
  pack: number
  customPrintable: boolean
  image: string
  prices: Record<string, number>
}

export type PrintSides = 'Front only' | 'Front + back'

export type CustomerInfo = {
  name: string
  company: string
  email: string
  phone: string
  zip: string
}

export type QuoteSubmissionPayload = {
  customer: CustomerInfo
  product: QuoteProduct
  quantity: number
  caseCount: number
  printColors: 0 | 1 | 2 | 3
  printSides: PrintSides | 'Stock only'
  subtotal: number
  plateFees: number
  fsc: number | null
  fscRate: number | null
  upsZone: number | null
  estimatedTotal: number | null
  freightMessage: string
  leadTime: string
  disclaimer: string
  submittedAt: string
  sourcePath: string
}
