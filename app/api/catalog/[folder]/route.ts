import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const ALLOWED_FOLDERS = ['pharmacy', 'veterinary']
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string }> }
) {
  const { folder } = await params
  if (!folder || !ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ images: [] }, { status: 404 })
  }

  const catalogPath = path.join(process.cwd(), 'public', 'catalog', folder)
  const images: { src: string; name: string }[] = []

  if (!fs.existsSync(catalogPath)) {
    return NextResponse.json({ images: [] })
  }

  try {
    const list = fs.readdirSync(catalogPath)
    for (const file of list) {
      const fullPath = path.join(catalogPath, file)
      const stat = fs.statSync(fullPath)
      const ext = path.extname(file).toLowerCase()
      if (!stat.isDirectory() && IMAGE_EXT.includes(ext)) {
        images.push({
          src: `/catalog/${folder}/${file}`,
          name: path.basename(file, ext),
        })
      }
    }
  } catch {
    return NextResponse.json({ images: [] })
  }

  images.sort((a, b) => a.src.localeCompare(b.src))
  return NextResponse.json({ images })
}
