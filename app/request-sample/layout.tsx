import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sample Requests',
  description:
    'Request paper bag samples from Bag Supply Co by email.',
}

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
