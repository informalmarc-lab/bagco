import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: 'Veterinary Packaging Programs',
  description:
    'Veterinary bag programs with paw print stock options, custom handled/flat formats, and case-level pricing anchors.',
}

export default function VeterinaryIndustryPage() {
  return (
    <IndustryLandingPage
      industry="veterinary"
      title="Veterinary Packaging Programs"
      description="Support clinic workflows with paw print stock lines and custom veterinary bag formats built for repeat prescription handoff."
    />
  )
}
