import type { CartItem } from '@/lib/cart'

export type PaymentPreference = 'Check' | 'Card' | 'Other'

export type OrderCustomer = {
  fullName: string
  companyName: string
  shippingAddress: string
  email: string
  phone: string
  orderNotes: string
  paymentPreference: PaymentPreference
  otherPaymentMethod?: string
}

export type OrderSubmissionPayload = {
  customer: OrderCustomer
  items: CartItem[]
  submittedAt?: string
}
