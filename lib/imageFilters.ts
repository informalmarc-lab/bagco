import path from 'path'

const BLOCKED_NAME_SNIPPETS = [
  'b5d758abb5_image-asset',
  'a592ac04a4_image-asset',
  'd9beeed5f9_image-asset',
  'a0996dabff_image-asset',
  '33fe92fe76_image-asset_8ba91d7c',
]

export function isBlockedImageFile(fileName: string): boolean {
  const normalized = path.parse(fileName).name.toLowerCase()
  return BLOCKED_NAME_SNIPPETS.some((snippet) => normalized.includes(snippet))
}
