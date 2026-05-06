'use client'

import Link from 'next/link'
import { useCart } from '@/components/cart/CartProvider'

type CartLinkProps = {
  mobile?: boolean
  onClick?: () => void
}

export default function CartLink({ mobile = false, onClick }: CartLinkProps) {
  const { itemCount, hydrated } = useCart()
  const count = hydrated ? itemCount : 0

  if (mobile) {
    return (
      <Link
        href="/cart"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0]"
        onClick={onClick}
        aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
      >
        Cart ({count})
      </Link>
    )
  }

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#1E4D2B]"
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7.2" />
        <circle cx="10" cy="19" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="17" cy="19" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span>Cart</span>
      <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#1E4D2B] px-1.5 py-0.5 text-xs font-black text-white">
        {count}
      </span>
    </Link>
  )
}
