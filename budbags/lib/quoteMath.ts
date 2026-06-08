import { bagSizes, printPrograms, stateZoneGroups, type ArtworkStatus, type PrintProgramId, type PrintSide } from './products'

export type QuoteInput = {
  programId: PrintProgramId
  sizeId: string
  cases: number
  printSide: PrintSide
  artworkStatus: ArtworkStatus
  state: string
}

export type QuoteEstimate = {
  programName: string
  sizeLabel: string
  dimensions: string
  cases: number
  pricePerCase: number
  productSubtotal: number
  artPlateFee: number
  backPrintSetupFee: number
  surcharge: number
  estimatedFsc: number
  estimatedTotal: number
  zoneGroup: string
  fscRate: number
  freightNote: string
}

export function money(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

export function getProgram(programId: PrintProgramId) {
  return printPrograms.find((program) => program.id === programId) || printPrograms[0]
}

export function getBagSize(sizeId: string) {
  return bagSizes.find((size) => size.id === sizeId) || bagSizes[3]
}

export function getZoneForState(state: string) {
  return stateZoneGroups[state] || { group: '4-6', fscRate: 0.075 }
}

export function calculateQuote(input: QuoteInput): QuoteEstimate {
  const program = getProgram(input.programId)
  const size = getBagSize(input.sizeId)
  const cases = Math.max(1, Number.isFinite(input.cases) ? Math.floor(input.cases) : 1)
  const pricePerCase = program.prices[size.id] || program.startingAt
  const productSubtotal = pricePerCase * cases
  const artPlateFee = 75
  const backPrintSetupFee = input.printSide === 'front-back' ? 35 : 0
  const surcharge = program.id === 'FC3C' && cases < 12 ? productSubtotal * 0.25 : 0
  const zone = getZoneForState(input.state)
  const estimatedFsc = cases >= 8 ? (productSubtotal + surcharge) * zone.fscRate : 0
  const estimatedTotal = productSubtotal + artPlateFee + backPrintSetupFee + surcharge + estimatedFsc
  const freightNote =
    cases >= 8
      ? `Free freight to commercial addresses, FSC placeholder ${Math.round(zone.fscRate * 1000) / 10}%. Final freight confirmed at follow-up.`
      : 'Under 8 cases: standard UPS Ground rates are added to the invoice. Final freight confirmed at follow-up.'

  return {
    programName: program.name,
    sizeLabel: size.label,
    dimensions: size.dimensions,
    cases,
    pricePerCase,
    productSubtotal,
    artPlateFee,
    backPrintSetupFee,
    surcharge,
    estimatedFsc,
    estimatedTotal,
    zoneGroup: zone.group,
    fscRate: zone.fscRate,
    freightNote,
  }
}
