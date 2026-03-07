import type { Metadata } from 'next'
import GenericQuoteTool from '@/components/GenericQuoteTool'

export const metadata: Metadata = {
  title: {
    absolute: 'Get an Instant Bag Quote | Bag Supply Co',
  },
  description:
    'Build a case-level paper bag quote in minutes. No sales call required. Stock and custom print options for any business type.',
}

export default function GenericBagQuotePage() {
  return <GenericQuoteTool />
}
