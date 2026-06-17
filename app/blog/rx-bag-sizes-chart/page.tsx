import type { Metadata } from 'next'
import BlogPostTemplate, { type BlogPostInternalLink, type BlogPostSection } from '@/components/BlogPostTemplate'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Rx Bag Sizes Explained: Which Size Is Right for Your Pharmacy?',
  description:
    'Understand #6, #8, #10, #12, and #14 pharmacy bag sizes and how to match each format to prescription type and pickup workflow.',
  path: '/blog/rx-bag-sizes-chart',
})

const sections: BlogPostSection[] = [
  {
    heading: 'Why Rx Bag Size Selection Should Be Intentional',
    paragraphs: [
      'Bag size decisions are often made from habit, but that usually creates waste, inconsistent packing, and uneven inventory turns. The better approach is to choose sizes based on order profile. A pharmacy that plans bag selection around real script mix will usually lower material overuse and speed up handoff at the same time.',
      'Size strategy is operational, not cosmetic. When technicians know which format fits each order type, decisions become faster and more consistent across shifts. That consistency helps with forecasting, reduces substitution at the counter, and makes replenishment more predictable.'
    ]
  },
  {
    heading: '#6 and #8: Compact Daily Pickup Formats',
    paragraphs: [
      'Size #6 is typically used for compact single-prescription transactions where there are no larger add-ons. It works well for streamlined handoffs and helps keep material usage efficient for small orders. Pharmacies with high single-script traffic often see strong turn rates in this category.',
      'Size #8 is a flexible step up and is useful for slightly bulkier single fills, two-item combinations, or orders with extra printed material. Many stores use #8 as a bridge size to reduce unnecessary moves into larger bags. If your pickup mix includes moderate variability, #8 can smooth operations without increasing complexity.'
    ]
  },
  {
    heading: '#10 and #12: Core Mid-Range Workhorses',
    paragraphs: [
      'Size #10 is frequently the center of a pharmacy bag program because it handles a broad mix of common multi-item orders. It is often the best balance between carrying capacity and material efficiency. In many operations, #10 becomes the default for routine prescriptions that exceed compact size limits.',
      'Size #12 is generally used for larger combinations, added counseling packets, or orders that include non-prescription items. It is a critical fallback and a practical daily option in stores with larger average basket size. The key is to use it deliberately, not as a universal default, so cost per handoff stays controlled.'
    ]
  },
  {
    heading: '#14: Large-Format Coverage for Complex Orders',
    paragraphs: [
      'Size #14 supports larger or more complex pickups, including bundled orders that do not fit comfortably in mid-range formats. Without this coverage, teams may be forced to overpack or double-bag, which adds labor and can reduce the quality of presentation at pickup.',
      'Because #14 usually turns slower than smaller sizes, it should run on a defined threshold strategy. Keep enough stock to prevent emergency substitution, but avoid carrying excessive inventory that takes space from high-frequency SKUs. This keeps storage efficient while preserving operational readiness.'
    ]
  },
  {
    heading: 'How to Match Size to Prescription Type in Real Time',
    paragraphs: [
      'A practical method is to assign default rules: #6 or #8 for compact single scripts, #10 for routine multi-item orders, #12 for heavier mixed pickups, and #14 for oversized or bundled transactions. Staff training should reinforce these defaults so size decisions are quick and consistent.',
      'Review size utilization monthly against actual dispense patterns. If one size is being overused, check whether the issue is forecasting, placement, or training. Small adjustments in default rules and reorder thresholds can significantly improve cost and flow over a single quarter.'
    ]
  },
  {
    heading: 'Build a Size Standard Your Team Can Follow',
    paragraphs: [
      'A documented size chart only helps if it is easy to use on shift. Keep the rule set visible near fulfillment with clear examples of what goes into each format, then train new hires against the same standard. The goal is to remove hesitation at pickup and reduce variation between technicians. When everyone follows the same chart, handoff quality improves and inventory math becomes more reliable.',
      'Treat the chart as a living operational document, not static wall art. Review it quarterly against actual dispensing data, update it when your product mix changes, and confirm that reorder thresholds still match usage. Pharmacies that maintain this discipline usually see fewer stockouts, fewer oversized bag substitutions, and better case-level purchasing accuracy over time.'
    ]
  }
]

const internalLinks: BlogPostInternalLink[] = [
  { href: '/catalog/pharmacy', label: 'Pharmacy Catalog Sizes' },
  { href: '/blog/how-many-pharmacy-bags-per-case', label: 'Case Count Planning Guide' },
  { href: '/makeyourquote', label: 'Build a Quote' }
]

export default function RxBagSizesChartPage() {
  return (
    <BlogPostTemplate
      title="Rx Bag Sizes Explained: Which Size Is Right for Your Pharmacy?"
      date="2026-03-06"
      intro="Choosing the right Rx bag size is one of the easiest ways to improve checkout speed and keep purchasing stable. This guide explains how #6, #8, #10, #12, and #14 sizes are commonly used in pharmacy operations."
      sections={sections}
      internalLinks={internalLinks}
    />
  )
}

