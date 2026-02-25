import path from 'path'

const BLOCKED_NAME_SNIPPETS = [
  'cardinal-bag',
  'cardeinal-bag',
  'b5d758abb5_image-asset',
  'a592ac04a4_image-asset',
  'd9beeed5f9_image-asset',
  'a0996dabff_image-asset',
]

export function isBlockedImageFile(fileName: string): boolean {
  const normalized = path.parse(fileName).name.toLowerCase()
  return BLOCKED_NAME_SNIPPETS.some((snippet) => normalized.includes(snippet))
}
