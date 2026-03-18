import type { Metadata } from 'next'
import IndustryHubPage from '@/components/seo/IndustryHubPage'
import { getIndustryByKey, getIndustryStartingPrice } from '@/lib/seo/industries'
import { buildIndustryMeta } from '@/lib/seo/meta'

const industry = getIndustryByKey('food-beverage')
const meta = buildIndustryMeta({
  industryLabel: industry.label,
  startingPrice: getIndustryStartingPrice(industry),
})

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

export default function IndustryPage() {
  return <IndustryHubPage industry={industry} />
}
