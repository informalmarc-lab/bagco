import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Veterinary Bags for Vet Clinics',
  description:
    'Wholesale veterinary bags for clinics that need stock designs, custom print options, and BagSupplyCo support for repeat medication handoff orders.',
  path: '/industries/veterinary',
  imagePath: '/catalog/veterinary/vb1/VB1-22-FRONT.webp',
})

const faqItems = [
  {
    question: 'Which veterinary bag sizes are most common for clinic counters?',
    answer:
      'Most vet clinics start with #22, #12, and #25 formats because they cover medication handoff, discharge papers, and take-home retail well.',
  },
  {
    question: 'Can we order stock veterinary bags first and add custom print later?',
    answer:
      'Yes. Many clinics begin with stock paw-print bags, then move into custom printed veterinary bags once reorder volume is predictable.',
  },
  {
    question: 'Where can I see the veterinary bag catalog before requesting pricing?',
    answer:
      'Use the veterinary catalog page to review available designs, sizes, and case pricing before building a quote with BagSupplyCo.',
  },
]

export default function VeterinaryIndustryPage() {
  return (
    <IndustryLandingPage
      industry="veterinary"
      title="Wholesale Veterinary Bags for Vet Clinics"
      description="Support clinic workflows with stock veterinary paper bags and custom print options built for medication handoff, discharge kits, and repeat reorders."
      bottomCatalogHref="/catalog/veterinary"
      bottomCatalogLabel="Open Veterinary Bag Catalog"
      faqItems={faqItems}
      faqTitle="Wholesale veterinary bag FAQs for clinic buyers."
      faqIntro="These answers help veterinary buyers compare bag sizes, stock options, and the next step into the catalog."
    />
  )
}

