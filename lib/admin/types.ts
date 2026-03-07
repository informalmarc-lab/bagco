export type AdminDocumentType = 'QUOTE' | 'INVOICE'
export type AdminQuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Declined'

export type AdminLineItem = {
  id: string
  qty: number
  item: string
  sizeAndPaper: string
  description: string
  price: number
  locked?: boolean
}

export type AdminCustomerInfo = {
  businessName: string
  contactName: string
  email: string
  phone: string
  billToAddress: string
  shipToAddress: string
  shipToSameAsBillTo: boolean
  customerNumber: string
  orderNumber: string
}

export type AdminTermsInfo = {
  paymentTerms: 'Net 30 Days' | 'Due on Receipt' | '50% Deposit / 50% on Delivery' | 'Custom'
  customPaymentTerms: string
  shippingNote: string
  includeCardLateFeeNotice: boolean
  cardLateFeeNoticeText: string
  includeVisaMastercardNotice: boolean
}

export type AdminQuoteRecord = {
  id: string
  docType: AdminDocumentType
  docNumber: string
  docSequence: number
  date: string
  validForDays: '7 days' | '14 days' | '30 days'
  customer: AdminCustomerInfo
  lineItems: AdminLineItem[]
  includeSetupFee: boolean
  freightCost: number
  terms: AdminTermsInfo
  internalNotes: string
  status: AdminQuoteStatus
  createdAt: string
  updatedAt: string
}

export type AdminQuotePayload = {
  id?: string
  docType: AdminDocumentType
  docNumber: string
  date: string
  validForDays: '7 days' | '14 days' | '30 days'
  customer: AdminCustomerInfo
  lineItems: AdminLineItem[]
  includeSetupFee: boolean
  freightCost: number
  terms: AdminTermsInfo
  internalNotes: string
  status?: AdminQuoteStatus
}

export type AdminStore = {
  lastSequence: number
  usedDocNumbers: string[]
  quotes: AdminQuoteRecord[]
}
