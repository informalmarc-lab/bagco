import type { Metadata } from 'next'
import GenericQuoteTool from '@/components/GenericQuoteTool'

export const metadata: Metadata = {
  title: 'Generic Bag Quote',
  description:
    'Build an estimated generic bag quote with case-level pricing and free-shipping eligibility messaging.',
}

export default function GenericBagQuotePage() {
  return <GenericQuoteTool />
}
