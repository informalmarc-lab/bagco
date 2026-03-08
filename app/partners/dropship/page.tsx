import type { Metadata } from 'next'
import DropShipPartnerLanding from '@/components/DropShipPartnerLanding'

export const metadata: Metadata = {
  title: 'Drop Ship Partner Program',
  description:
    'Invite-only drop ship partner program for BagSupplyCo fulfillment and blind shipping operations.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DropShipPartnerPage() {
  return <DropShipPartnerLanding />
}
