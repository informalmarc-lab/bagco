export const CONTACT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactSubmissionPayload = {
  submissionType?: unknown
  sourcePage?: unknown
  name?: unknown
  email?: unknown
  phone?: unknown
  company?: unknown
  bagType?: unknown
  quantity?: unknown
  message?: unknown
  industry?: unknown
  shippingPreference?: unknown
  existingCustomer?: unknown
  website?: unknown
  submitted_at?: unknown
}

export type NormalizedContactSubmission = {
  submissionType: string
  sourcePage: string
  name: string
  email: string
  phone: string
  company: string
  bagType: string
  quantity: string
  message: string
  industry: string
  shippingPreference: string
  existingCustomer: string
  website: string
  submitted_at: string
}

export function safeContactText(value: unknown, max = 2000): string {
  return String(value || '').trim().slice(0, max)
}

export function normalizeContactSubmission(
  data: ContactSubmissionPayload,
): NormalizedContactSubmission {
  return {
    submissionType: safeContactText(data.submissionType, 140) || 'Contact Form',
    sourcePage: safeContactText(data.sourcePage, 240) || 'N/A',
    name: safeContactText(data.name, 120),
    email: safeContactText(data.email, 180),
    phone: safeContactText(data.phone, 80),
    company: safeContactText(data.company, 140),
    bagType: safeContactText(data.bagType, 140),
    quantity: safeContactText(data.quantity, 120),
    message: safeContactText(data.message, 4000),
    industry: safeContactText(data.industry, 120),
    shippingPreference: safeContactText(data.shippingPreference, 120),
    existingCustomer: safeContactText(data.existingCustomer, 40),
    website: safeContactText(data.website, 255),
    submitted_at: safeContactText(data.submitted_at, 80) || new Date().toISOString(),
  }
}

export function validateContactSubmission(
  data: NormalizedContactSubmission,
): { ok: true } | { ok: false; status: number; error: string } {
  if (data.website) {
    return { ok: true }
  }

  if (!data.name || !data.email || !data.message) {
    return { ok: false, status: 400, error: 'Missing required fields' }
  }

  if (!CONTACT_EMAIL_REGEX.test(data.email)) {
    return { ok: false, status: 400, error: 'Invalid email address' }
  }

  return { ok: true }
}
