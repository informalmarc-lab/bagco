import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: 'Food and Beverage Packaging Programs',
  description:
    'Food service and bakery paper bag programs with stock takeout formats and custom print options.',
}

export default function FoodBeverageIndustryPage() {
  return (
    <IndustryLandingPage
      industry="food-beverage"
      title="Food & Beverage Packaging Programs"
      description="Choose durable stock takeout bags or custom bakery print lines with clear case counts and lead-time expectations."
    />
  )
}
