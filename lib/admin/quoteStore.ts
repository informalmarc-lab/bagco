import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import {
  type AdminLineItem,
  type AdminQuotePayload,
  type AdminQuoteRecord,
  type AdminQuoteStatus,
  type AdminStore,
} from '@/lib/admin/types'

const STORE_DIR = path.join(process.cwd(), 'data')
const STORE_PATH = path.join(STORE_DIR, 'quotes.json')
const SETUP_FEE_AMOUNT = 50

const defaultStore: AdminStore = {
  lastSequence: 0,
  usedDocNumbers: [],
  quotes: [],
}

export function formatDocNumber(sequence: number): string {
  return `BSC-${String(sequence).padStart(4, '0')}`
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true })
  try {
    await fs.access(STORE_PATH)
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(defaultStore, null, 2), 'utf8')
  }
}

async function readStore(): Promise<AdminStore> {
  await ensureStore()
  const raw = await fs.readFile(STORE_PATH, 'utf8')
  try {
    const parsed = JSON.parse(raw) as AdminStore
    if (!parsed || !Array.isArray(parsed.quotes) || typeof parsed.lastSequence !== 'number') {
      return { ...defaultStore }
    }

    const used = new Set<string>()
    if (Array.isArray(parsed.usedDocNumbers)) {
      for (const doc of parsed.usedDocNumbers) {
        if (typeof doc === 'string' && doc.trim()) used.add(doc.trim().toLowerCase())
      }
    }
    for (const quote of parsed.quotes) {
      if (quote?.docNumber) used.add(quote.docNumber.trim().toLowerCase())
    }

    return {
      ...parsed,
      usedDocNumbers: [...used],
    }
  } catch {
    return { ...defaultStore }
  }
}

async function writeStore(store: AdminStore): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8')
}

function normalizeLineItems(items: AdminLineItem[], includeSetupFee: boolean): AdminLineItem[] {
  const normalized = items
    .filter((item) => item.item.trim() || item.description.trim())
    .map((item) => ({
      ...item,
      qty: Number.isFinite(item.qty) && item.qty > 0 ? item.qty : 1,
      price: Number.isFinite(item.price) && item.price >= 0 ? item.price : 0,
      item: item.item.trim(),
      sizeAndPaper: item.sizeAndPaper.trim(),
      description: item.description.trim(),
    }))

  const withoutSetupFee = normalized.filter((item) => item.id !== 'setup-fee')
  if (!includeSetupFee) return withoutSetupFee

  return [
    ...withoutSetupFee,
    {
      id: 'setup-fee',
      qty: 1,
      item: 'SETUP',
      sizeAndPaper: 'N/A',
      description: 'New Customer Custom Artwork Setup Fee (One-Time)',
      price: SETUP_FEE_AMOUNT,
      locked: true,
    },
  ]
}

function validatePayload(payload: AdminQuotePayload): string[] {
  const errors: string[] = []
  if (!payload.customer.businessName.trim()) errors.push('Business Name is required.')
  if (!payload.customer.contactName.trim()) errors.push('Contact Name is required.')
  if (!payload.customer.email.trim()) errors.push('Email is required.')
  if (!payload.docNumber.trim()) errors.push('Document number is required.')
  if (!payload.date.trim()) errors.push('Date is required.')
  if (payload.lineItems.length === 0) errors.push('At least one line item is required.')
  return errors
}

function normalizeDocNumber(value: string): string {
  return value.trim().toLowerCase()
}

function getNextGeneratedDocNumber(store: AdminStore): { sequence: number; docNumber: string } {
  const used = new Set(store.usedDocNumbers)
  let sequence = store.lastSequence + 1
  let docNumber = formatDocNumber(sequence)

  while (used.has(normalizeDocNumber(docNumber))) {
    sequence += 1
    docNumber = formatDocNumber(sequence)
  }

  return { sequence, docNumber }
}

export async function getNextDocNumber(): Promise<string> {
  const store = await readStore()
  return getNextGeneratedDocNumber(store).docNumber
}

export async function listQuotes(): Promise<AdminQuoteRecord[]> {
  const store = await readStore()
  return [...store.quotes].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

export async function getQuoteById(id: string): Promise<AdminQuoteRecord | null> {
  const store = await readStore()
  return store.quotes.find((quote) => quote.id === id) || null
}

export async function saveQuote(payload: AdminQuotePayload): Promise<{ record?: AdminQuoteRecord; errors?: string[] }> {
  const store = await readStore()
  const usedDocNumbers = new Set(store.usedDocNumbers)
  const normalizedItems = normalizeLineItems(payload.lineItems, payload.includeSetupFee)
  const mergedPayload: AdminQuotePayload = {
    ...payload,
    lineItems: normalizedItems,
  }
  const errors = validatePayload(mergedPayload)
  if (errors.length > 0) return { errors }

  const now = new Date().toISOString()
  const existing = payload.id ? store.quotes.find((quote) => quote.id === payload.id) : undefined

  if (existing) {
    const requestedDocNumber = payload.docNumber.trim()
    if (!requestedDocNumber) return { errors: ['Document number is required.'] }
    const requestedKey = normalizeDocNumber(requestedDocNumber)
    const existingKey = normalizeDocNumber(existing.docNumber)

    if (requestedKey !== existingKey && usedDocNumbers.has(requestedKey)) {
      return { errors: ['Document number already exists.'] }
    }

    if (requestedKey !== existingKey) usedDocNumbers.add(requestedKey)

    const updated: AdminQuoteRecord = {
      ...existing,
      ...mergedPayload,
      docNumber: requestedDocNumber,
      status: mergedPayload.status || existing.status,
      updatedAt: now,
    }
    store.quotes = store.quotes.map((quote) => (quote.id === existing.id ? updated : quote))
    store.usedDocNumbers = [...usedDocNumbers]
    await writeStore(store)
    return { record: updated }
  }

  const generated = getNextGeneratedDocNumber(store)
  let sequence = store.lastSequence + 1
  let docNumber = payload.docNumber.trim()
  if (!docNumber) {
    sequence = generated.sequence
    docNumber = generated.docNumber
  }

  const docNumberKey = normalizeDocNumber(docNumber)
  if (usedDocNumbers.has(docNumberKey)) return { errors: ['Document number already exists.'] }
  usedDocNumbers.add(docNumberKey)

  store.lastSequence = sequence
  const record: AdminQuoteRecord = {
    id: crypto.randomUUID(),
    docSequence: sequence,
    docNumber,
    docType: payload.docType,
    date: payload.date,
    validForDays: payload.validForDays,
    customer: payload.customer,
    lineItems: normalizedItems,
    includeSetupFee: payload.includeSetupFee,
    freightCost: Number.isFinite(payload.freightCost) ? payload.freightCost : 0,
    terms: payload.terms,
    internalNotes: payload.internalNotes || '',
    status: payload.status || 'Draft',
    createdAt: now,
    updatedAt: now,
  }

  store.quotes.push(record)
  store.usedDocNumbers = [...usedDocNumbers]
  await writeStore(store)
  return { record }
}

export async function deleteQuote(id: string): Promise<boolean> {
  const store = await readStore()
  const before = store.quotes.length
  store.quotes = store.quotes.filter((quote) => quote.id !== id)
  if (store.quotes.length === before) return false
  await writeStore(store)
  return true
}

export async function duplicateQuote(id: string): Promise<AdminQuoteRecord | null> {
  const store = await readStore()
  const usedDocNumbers = new Set(store.usedDocNumbers)
  const target = store.quotes.find((quote) => quote.id === id)
  if (!target) return null

  const generated = getNextGeneratedDocNumber(store)
  const sequence = generated.sequence
  store.lastSequence = sequence
  const now = new Date().toISOString()
  const copy: AdminQuoteRecord = {
    ...target,
    id: crypto.randomUUID(),
    docSequence: sequence,
    docNumber: generated.docNumber,
    date: now.slice(0, 10),
    status: 'Draft',
    createdAt: now,
    updatedAt: now,
  }
  usedDocNumbers.add(normalizeDocNumber(copy.docNumber))
  store.usedDocNumbers = [...usedDocNumbers]
  store.quotes.push(copy)
  await writeStore(store)
  return copy
}

export async function updateQuoteStatus(id: string, status: AdminQuoteStatus): Promise<AdminQuoteRecord | null> {
  const store = await readStore()
  const target = store.quotes.find((quote) => quote.id === id)
  if (!target) return null
  target.status = status
  target.updatedAt = new Date().toISOString()
  await writeStore(store)
  return target
}

export async function getDashboardStats() {
  const quotes = await listQuotes()
  const now = new Date()
  const thisMonth = quotes.filter((quote) => {
    const created = new Date(quote.createdAt)
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
  })
  return {
    totalQuotes: quotes.length,
    quotesThisMonth: thisMonth.length,
    mostRecentQuote: quotes[0] || null,
  }
}
