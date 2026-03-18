import fs from 'fs'
import path from 'path'
import { isBlockedImageFile } from '@/lib/imageFilters'

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])

export type CatalogImage = {
  src: string
  name: string
}

function getImagesFromFolder(dir: string, webPrefix: string): CatalogImage[] {
  const images: CatalogImage[] = []
  if (!fs.existsSync(dir)) return images

  const list = fs.readdirSync(dir)
  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) continue

    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXT.has(ext)) continue
    if (isBlockedImageFile(file)) continue

    images.push({
      src: `${webPrefix}/${file}`.replace(/\\/g, '/'),
      name: path.basename(file, ext),
    })
  }

  return images.sort((a, b) => a.src.localeCompare(b.src))
}

export function getPharmacyCatalogImages() {
  const basePath = path.join(process.cwd(), 'public', 'catalog', 'pharmacy')
  return {
    ty: getImagesFromFolder(path.join(basePath, 'ty'), '/catalog/pharmacy/ty'),
    gs: getImagesFromFolder(path.join(basePath, 'gs'), '/catalog/pharmacy/gs'),
    'plastic-gs': getImagesFromFolder(path.join(basePath, 'plastic-gs'), '/catalog/pharmacy/plastic-gs'),
  }
}

export function getVeterinaryCatalogImages() {
  const basePath = path.join(process.cwd(), 'public', 'catalog', 'veterinary')
  return {
    vb1: getImagesFromFolder(path.join(basePath, 'vb1'), '/catalog/veterinary/vb1'),
    vb2: getImagesFromFolder(path.join(basePath, 'vb2'), '/catalog/veterinary/vb2'),
    vb6: getImagesFromFolder(path.join(basePath, 'vb6'), '/catalog/veterinary/vb6'),
  }
}

export function getCustomCatalogImages() {
  const basePath = path.join(process.cwd(), 'public', 'catalog', 'custom')
  return {
    '1-color': getImagesFromFolder(path.join(basePath, '1-color'), '/catalog/custom/1-color'),
    '2-color': getImagesFromFolder(path.join(basePath, '2-color'), '/catalog/custom/2-color'),
    '3-color': getImagesFromFolder(path.join(basePath, '3-color'), '/catalog/custom/3-color'),
  }
}
