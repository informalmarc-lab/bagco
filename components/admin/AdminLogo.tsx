type AdminLogoProps = {
  compact?: boolean
  light?: boolean
}

export default function AdminLogo({ compact = false, light = false }: AdminLogoProps) {
  const textColor = light ? 'text-white' : 'text-[#1E4D2B]'
  const subColor = light ? 'text-[#F4E8D8]' : 'text-[#B5813A]'
  const badgeBg = light ? 'bg-[#B5813A]' : 'bg-[#1E4D2B]'

  return (
    <div className="inline-flex items-center gap-3">
      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${badgeBg} text-sm font-black text-white`}>
        BS
      </span>
      {!compact && (
        <div>
          <p className={`text-sm font-black uppercase tracking-[0.12em] ${textColor}`}>BagSupplyCo</p>
          <p className={`text-xs font-semibold ${subColor}`}>Custom Paper Bags</p>
        </div>
      )}
    </div>
  )
}
