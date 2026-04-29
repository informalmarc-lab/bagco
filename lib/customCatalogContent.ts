import type { CatalogProduct } from '@/lib/catalogProducts'

type CustomProgramTone = {
  headline: string
  shortPitch: string
  bestFor: string
}

const PROGRAM_TONES: Record<string, CustomProgramTone> = {
  FC1C: {
    headline: '1-color custom bags keep the entry cost low while still moving buyers into branded packaging.',
    shortPitch: 'Best entry point for teams that want a branded bag program without jumping straight into more complex print work.',
    bestFor: 'Budget-conscious buyers, first custom runs, and programs where logo visibility matters more than multi-color detail.',
  },
  FC2C: {
    headline: '2-color custom bags are the sweet spot for most repeat B2B buyers.',
    shortPitch: 'This is usually the strongest balance of visual impact, flexibility, and repeat-order practicality.',
    bestFor: 'Most pharmacy, retail, and distributor-led programs that want stronger brand presence without overbuilding the first run.',
  },
  FC3C: {
    headline: '3-color custom bags are the premium path when presentation matters at the counter.',
    shortPitch: 'Use this route when the bag itself needs to feel branded, polished, and noticeably stronger than a standard stock program.',
    bestFor: 'Buyers who want higher visual impact, more shelf presence, and a more premium branded checkout experience.',
  },
}

const BASE_CUSTOM_RULES = [
  '4 case minimum for each custom bag program',
  'Standard lead time is about 4 weeks after proof approval',
  '$75 art and plate fee applies to initial orders and proof changes',
  'Back and gusset printing may require additional setup fees',
  'Free freight to commercial addresses on orders of 8 cases or more',
  'Orders under 8 total cases ship at standard UPS rates',
]

const BASE_CUSTOM_FEATURES = [
  'Printing available on the front, back, and gussets',
  '30-50# machine-finished paper',
  'Pinch-bottom with gusset and flat-bottom style options',
  'Bag Supply Co follow-up within 24 hours after quote submission',
]

function getColorCount(product: CatalogProduct): string {
  const colorOption = product.colorOptions[0] || ''
  const match = colorOption.match(/(\d+)-Color/i)
  return match?.[1] || 'Custom'
}

export function getCustomProgramContent(product: CatalogProduct) {
  const tone = PROGRAM_TONES[product.sku] || {
    headline: 'Custom printed bags give buyers a stronger branded checkout path than plain stock inventory.',
    shortPitch: 'Use custom print when repeatability and presentation matter as much as availability.',
    bestFor: 'Buyers who want a more intentional branded bag program.',
  }

  return {
    ...tone,
    printLabel: `${getColorCount(product)} stock color${getColorCount(product) === '1' ? '' : 's'} included`,
    features: [
      `${getColorCount(product)}-color custom print program`,
      ...BASE_CUSTOM_FEATURES,
    ],
    rules: BASE_CUSTOM_RULES,
  }
}

export const CUSTOM_COMPARE_ROWS = [
  {
    key: 'Best fit',
    values: ['Cost-sensitive branded programs', 'Most balanced choice', 'Highest visual impact'],
  },
  {
    key: 'Print setup',
    values: ['1 stock color', '2 stock colors', '3 stock colors'],
  },
  {
    key: 'MOQ',
    values: ['4 cases', '4 cases', '4 cases'],
  },
  {
    key: 'Lead time',
    values: ['About 4 weeks after proof approval', 'About 4 weeks after proof approval', 'About 4 weeks after proof approval'],
  },
]

export const CUSTOM_ORDER_STEPS = [
  'Choose the print level and bag sizes that fit the program.',
  'Send artwork or work from a logo file and bag direction.',
  'Review the proof, approve the design, and lock the run.',
  'Move into repeat ordering once the size mix is established.',
]

export const CUSTOM_PROOF_POINTS = [
  '4 case minimums keep custom programs accessible.',
  '$75 setup fee keeps the quoting process clear upfront.',
  '8+ case orders ship free to commercial addresses.',
  'Proof approval drives the production clock, not the initial inquiry.',
]
