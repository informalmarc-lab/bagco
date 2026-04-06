function hasMojibakeSignature(value: string): boolean {
  return /(?:Ã.|Â.|â..|â.|¤|�)/.test(value)
}

function repairUtf8Mojibake(value: string): string {
  try {
    const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff)
    const repaired = new TextDecoder('utf-8', { fatal: false }).decode(bytes)

    if (repaired.includes('\uFFFD') && !value.includes('\uFFFD')) {
      return value
    }

    return repaired
  } catch {
    return value
  }
}

function postProcess(value: string): string {
  return value
    .replace(/\u00a0/g, ' ')
    .replace(/Â®/g, '®')
    .replace(/Â°/g, '°')
    .replace(/Â™/g, '™')
    .replace(/Â·/g, '·')
    .normalize('NFC')
}

export function cleanText(value: string): string {
  if (!value) return value

  const repaired = hasMojibakeSignature(value)
    ? repairUtf8Mojibake(value)
    : value

  return postProcess(repaired)
}

export function cleanTextArray(values: string[]): string[] {
  return values.map((value) => cleanText(value))
}

export function cleanTextDeep<const T>(value: T): T {
  if (typeof value === 'string') {
    return cleanText(value) as T
  }

  if (Array.isArray(value)) {
    return value.map((item) => cleanTextDeep(item)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, cleanTextDeep(entry)]),
    ) as T
  }

  return value
}
