import type { CatalogProduct } from '@/lib/catalogProducts'

const CUSTOM_IMAGE_MAP = {
  '1-color': {
    '12': '/catalog/custom/1-color/CBC-12-FC1C.webp',
    '14': '/catalog/custom/1-color/CBC-14-FC1C.webp',
    '15': '/catalog/custom/1-color/CBC-15-FC1C.webp',
    '21': '/catalog/custom/1-color/CBC-21-FC1C.webp',
    '22': '/catalog/custom/1-color/CBC-22-FC1C.webp',
    '23': '/catalog/custom/1-color/CBC-23-FC1C.webp',
    '25': '/catalog/custom/1-color/CBC-25-FC1C.webp',
    '26': '/catalog/custom/1-color/CBC-26-FC1C.webp',
    '28': '/catalog/custom/1-color/CBC-28-FC1C.webp',
  },
  '2-color': {
    '12': '/catalog/custom/2-color/CBC-12-FC2C.webp',
    '14': '/catalog/custom/2-color/CBC-14-FC2C.webp',
    '15': '/catalog/custom/2-color/CBC-15-FC2C.webp',
    '21': '/catalog/custom/2-color/CBC-21-FC2C_146e97e4-dd9e-4b3b-83bd-9aac9ce573a3.webp',
    '22': '/catalog/custom/2-color/CBC-22-FC2C.webp',
    '23': '/catalog/custom/2-color/CBC-23-FC2C.webp',
    '25': '/catalog/custom/2-color/CBC-25-FC2C.webp',
    '26': '/catalog/custom/2-color/CBC-26-FC2C.webp',
    '28': '/catalog/custom/2-color/CBC-28-FC2C.webp',
  },
  '3-color': {
    '12': '/catalog/custom/3-color/CBC-12-FC3C.webp',
    '14': '/catalog/custom/3-color/CBC-14-FC3C.webp',
    '15': '/catalog/custom/3-color/CBC-15-FC3C.webp',
    '21': '/catalog/custom/3-color/CBC-21-FC3C.webp',
    '22': '/catalog/custom/3-color/CBC-22-FC3C.webp',
    '23': '/catalog/custom/3-color/CBC-23-FC3C.webp',
    '25': '/catalog/custom/3-color/CBC-25-FC3C.webp',
    '26': '/catalog/custom/3-color/CBC-26-FC3C.webp',
    '28': '/catalog/custom/3-color/CBC-28-FC3C.webp',
  },
} as const

type CustomImageProgram = keyof typeof CUSTOM_IMAGE_MAP

function getCustomProgramFromImage(imagePath: string): CustomImageProgram | null {
  if (imagePath.includes('/catalog/custom/1-color/')) return '1-color'
  if (imagePath.includes('/catalog/custom/2-color/')) return '2-color'
  if (imagePath.includes('/catalog/custom/3-color/')) return '3-color'
  return null
}

function getCustomSizeNumber(sizeLabel: string): string | null {
  return sizeLabel.match(/#(\d+)(?=\s|\(|$)/i)?.[1] || null
}

export function getCustomCatalogImageForSize(product: CatalogProduct, sizeLabel: string): string {
  const program = getCustomProgramFromImage(product.image)
  const sizeNumber = getCustomSizeNumber(sizeLabel)

  if (!program || !sizeNumber) {
    return product.sizeImages?.[sizeLabel] || product.image
  }

  return CUSTOM_IMAGE_MAP[program][sizeNumber as keyof (typeof CUSTOM_IMAGE_MAP)[typeof program]] || product.image
}
