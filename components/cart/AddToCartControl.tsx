'use client'

import { useMemo, useState } from 'react'
import { useCart } from '@/components/cart/CartProvider'
import type { CartItem } from '@/lib/cart'

type AddToCartControlProps = {
  item: CartItem
  showQuantity?: boolean
  buttonLabel?: string
  className?: string
}

export default function AddToCartControl({
  item,
  showQuantity = true,
  buttonLabel = 'Add to Cart',
  className = '',
}: AddToCartControlProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(String(item.quantity || 1))
  const [feedback, setFeedback] = useState('')

  const parsedQuantity = useMemo(() => {
    const value = Number.parseInt(quantity, 10)
    return Number.isFinite(value) && value > 0 ? value : 1
  }, [quantity])

  const submit = () => {
    addItem({ ...item, quantity: parsedQuantity })
    setFeedback('Added to cart')
    window.setTimeout(() => setFeedback(''), 1800)
  }

  return (
    <div className={className}>
      <div className={`flex ${showQuantity ? 'flex-wrap gap-2' : ''}`}>
        {showQuantity && (
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">
            Qty
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="w-20 rounded-md border border-[#C4935A66] bg-white px-3 py-2 text-sm font-semibold text-[#1E4D2B]"
            />
          </label>
        )}
        <button type="button" onClick={submit} className="btn-primary">
          {buttonLabel}
        </button>
      </div>
      {feedback && <p className="mt-2 text-xs font-semibold text-[#1E4D2B]">{feedback}</p>}
    </div>
  )
}
