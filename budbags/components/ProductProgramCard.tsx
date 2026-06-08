import Image from 'next/image'
import Link from 'next/link'
import { money } from '@/lib/quoteMath'
import type { PrintProgram } from '@/lib/products'

export default function ProductProgramCard({ program }: { program: PrintProgram }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[4/3] border-b border-line bg-white">
        <Image
          src={program.image}
          alt={`${program.name} custom printed paper bag`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-black text-leaf">{program.name}</h2>
          <p className="text-right text-sm font-black text-ink">From {money(program.startingAt)}/case</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-mute">{program.description}</p>
        <ul className="mt-4 grid gap-2 text-sm text-ink">
          <li>4-case minimum for dispensary brand programs</li>
          <li>About 4 weeks after proof approval</li>
          <li>Front, back, and gusset printing for counter-ready branding</li>
        </ul>
        <Link href={`/quote?program=${program.id}`} className="btn-primary mt-5 w-full">
          Quote {program.colorCount}
        </Link>
      </div>
    </article>
  )
}
