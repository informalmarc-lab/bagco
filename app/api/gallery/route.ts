import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

function getImages(dir: string, baseUrl: string): { src: string; folder: string; name: string }[] {
  const results: { src: string; folder: string; name: string }[] = []
  let list: string[] = []

  try {
    list = fs.readdirSync(dir)
  } catch {
    return results
  }

  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    const ext = path.extname(file).toLowerCase()

    if (stat.isDirectory()) {
      results.push(...getImages(fullPath, baseUrl))
    } else if (IMAGE_EXT.includes(ext)) {
      const relative = path.relative(path.join(process.cwd(), 'public'), fullPath).replace(/\\/g, '/')
      const folder = path.relative(path.join(process.cwd(), 'public', 'gallery'), path.dirname(fullPath)).replace(/\\/g, '/') || 'gallery'
      results.push({
        src: '/' + relative,
        folder: folder === '.' ? 'gallery' : folder,
        name: path.basename(file, ext),
      })
    }
  }

  return results.sort((a, b) => a.src.localeCompare(b.src))
}

export async function GET() {
  const galleryPath = path.join(process.cwd(), 'public', 'gallery')

  if (!fs.existsSync(galleryPath)) {
    return NextResponse.json({ images: [], folders: [] })
  }

  const images = getImages(galleryPath, '/gallery')
  const folders = [...new Set(images.map((i) => i.folder))].filter(Boolean).sort()

  return NextResponse.json({ images, folders })
}
