import Image from 'next/image'
import Link from 'next/link'
import { money } from '@/lib/quoteMath'
import type { StockBagProduct } from '@/lib/products'

export default function StockBagCard({ product }: { product: StockBagProduct }) {
  return (
    <article className="card overflow-hidden">
      <div className="grid gap-5 p-5 md:grid-cols-[220px_1fr] md:p-6">
        <div className="relative aspect-square rounded-lg border border-line bg-white">
          <Image
            src={product.image}
            alt={`${product.name} stock paper bag`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 220px"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black text-kraft">{product.label}</p>
              <h3 className="mt-1 text-2xl font-black text-leaf">{product.name}</h3>
            </div>
            <p className="max-w-xs text-sm font-bold leading-6 text-ink">{product.shipping}</p>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">{product.positioning}</p>
          <p className="mt-2 text-sm leading-6 text-mute">{product.description}</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 pr-3 font-black text-ink">Size</th>
                  <th className="py-2 pr-3 font-black text-ink">Dimensions</th>
                  <th className="py-2 pr-3 font-black text-ink">Qty</th>
                  <th className="py-2 pr-3 font-black text-ink">Price</th>
                </tr>
              </thead>
              <tbody>
                {product.sizes.map((size) => (
                  <tr key={size.sku} className="border-b border-line/70 last:border-b-0">
                    <td className="py-2 pr-3 font-black text-leaf">{size.sku}</td>
                    <td className="py-2 pr-3 text-mute">{size.dimensions}</td>
                    <td className="py-2 pr-3 text-mute">{size.quantity}</td>
                    <td className="py-2 pr-3 font-bold text-ink">{money(size.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/contact" className="btn-secondary mt-5">
            Ask About Stock Bags
          </Link>
        </div>
      </div>
    </article>
  )
}
