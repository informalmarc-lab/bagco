'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartProvider'
import { formatCartUnit, getCartItemCount, getCartLineTotal, getCartPriceUnitLabel } from '@/lib/cart'
import { money } from '@/lib/catalogProducts'

export default function CartPageClient() {
  const { items, subtotal, hydrated, updateQuantity, removeItem } = useCart()

  if (!hydrated) {
    return (
      <section className="section-container py-20">
        <div className="tonal-panel">
          <p className="text-sm font-semibold text-[#5F4D33]">Loading cart...</p>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="section-container py-20">
        <div className="tonal-panel text-center">
          <h2 className="section-title">Your cart is empty</h2>
          <p className="mt-4 text-sm text-[#5F4D33]">
            Add paper bags, mylar bags, or labels to start your order.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/catalog" className="btn-primary">
              Browse Paper Bags
            </Link>
            <Link href="/catalog/mylar-bags" className="btn-secondary">
              Shop Mylar Bags
            </Link>
            <Link href="/catalog/labels" className="btn-secondary">
              Shop Labels
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-container py-20">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="tonal-panel">
          <h2 className="section-title">Review Your Items</h2>
          <p className="mt-3 text-sm text-[#5F4D33]">
            Free shipping on 8+ cases.
          </p>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <article key={item.id} className="surface-card rounded-2xl p-4">
                <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#FAF6F0]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {item.sku}</p>
                      <h3 className="mt-1 text-xl font-black text-[#1E4D2B]">{item.name}</h3>
                      {item.sizeLabel && (
                        <p className="mt-1 text-sm font-semibold text-[#5F4D33]">{item.sizeLabel}</p>
                      )}
                      <p className="mt-1 text-sm text-[#5F4D33]">
                        {money(item.unitPrice)} / {getCartPriceUnitLabel(item)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-end gap-3">
                      <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">
                        Quantity
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(event) => updateQuantity(item.id, Number.parseInt(event.target.value || '1', 10))}
                          className="w-24 rounded-md border border-[#C4935A66] bg-white px-3 py-2 text-sm font-semibold text-[#1E4D2B]"
                        />
                      </label>
                      <div className="min-w-[120px]">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Line Total</p>
                        <p className="text-lg font-black text-[#1E4D2B]">{money(getCartLineTotal(item))}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={item.productHref} className="btn-secondary">
                          View Item
                        </Link>
                        <button type="button" onClick={() => removeItem(item.id)} className="btn-quiet">
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-[#5F4D33]">
                      {formatCartUnit(item.quantity, item.unit)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="tonal-panel lg:sticky lg:top-24 lg:self-start">
          <h2 className="section-title text-3xl">Cart Summary</h2>
          <div className="mt-5 space-y-3 text-sm text-[#5F4D33]">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span className="font-semibold text-[#1E4D2B]">{getCartItemCount(items)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#C4935A66] pt-3">
              <span className="text-base font-semibold text-[#1E4D2B]">Order Total</span>
              <span className="text-2xl font-black text-[#1E4D2B]">{money(subtotal)}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <Link href="/checkout" className="btn-primary">
              Continue to Checkout
            </Link>
            <Link href="/catalog" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
