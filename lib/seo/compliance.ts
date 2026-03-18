import type { IndustryKey } from '@/lib/seo/industries'

export function getComplianceNote(industryKey: IndustryKey, stateName: string): string | null {
  if (industryKey === 'pharmacy') {
    return `In ${stateName}, pharmacy dispensing and labeling requirements are governed by the ${stateName} Board of Pharmacy. We size pharmacy bags to fit required prescription labels, auxiliary warnings, and patient counseling inserts.`
  }

  if (industryKey === 'veterinary') {
    return `In ${stateName}, veterinary dispensing and recordkeeping rules follow the ${stateName} Veterinary Medical Board. We recommend bag sizes that accommodate medication labels, dosing instructions, and client handouts.`
  }

  return null
}
