import { bagSizes, printPrograms } from '@/lib/products'
import { money } from '@/lib/quoteMath'

export default function PricingTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-bone">
      <table className="min-w-[760px] w-full border-collapse text-left text-sm">
        <thead className="bg-white">
          <tr>
            <th className="border-b border-line px-4 py-3 font-black text-ink">Size</th>
            <th className="border-b border-line px-4 py-3 font-black text-ink">Dimensions</th>
            <th className="border-b border-line px-4 py-3 font-black text-ink">Bags/case</th>
            {printPrograms.map((program) => (
              <th key={program.id} className="border-b border-line px-4 py-3 font-black text-ink">
                {program.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bagSizes.map((size) => (
            <tr key={size.id} className="border-b border-line last:border-b-0">
              <td className="px-4 py-3 font-black text-leaf">
                {size.label}
                {size.primary ? <span className="ml-2 text-xs font-bold text-kraft">Primary</span> : null}
              </td>
              <td className="px-4 py-3 text-mute">{size.dimensions}</td>
              <td className="px-4 py-3 text-mute">{size.bagsPerCase ? size.bagsPerCase.toLocaleString() : 'Confirm'}</td>
              {printPrograms.map((program) => (
                <td key={program.id} className="px-4 py-3 font-bold text-ink">
                  {money(program.prices[size.id])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
