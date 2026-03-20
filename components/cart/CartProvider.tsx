'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  CART_STORAGE_KEY,
  getCartItemCount,
  getCartSubtotal,
  isCartItem,
  type CartItem,
} from '@/lib/cart'

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  hydrated: boolean
  addItem: (item: CartItem) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function normalizeQuantity(quantity: number): number {
  return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1
}

function readStoredItems(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCartItem)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(readStoredItems())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [hydrated, items])

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      itemCount: getCartItemCount(items),
      subtotal: getCartSubtotal(items),
      hydrated,
      addItem: (item) => {
        setItems((current) => {
          const existing = current.find((entry) => entry.id === item.id)
          const nextQuantity = normalizeQuantity(item.quantity)
          if (!existing) return [...current, { ...item, quantity: nextQuantity }]
          return current.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + nextQuantity }
              : entry,
          )
        })
      },
      updateQuantity: (id, quantity) => {
        const nextQuantity = normalizeQuantity(quantity)
        setItems((current) =>
          current.map((entry) => (entry.id === id ? { ...entry, quantity: nextQuantity } : entry)),
        )
      },
      removeItem: (id) => {
        setItems((current) => current.filter((entry) => entry.id !== id))
      },
      clearCart: () => {
        setItems([])
      },
    }
  }, [hydrated, items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
