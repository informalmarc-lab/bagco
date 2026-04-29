import fs from 'fs'
import path from 'path'

const root = process.cwd()
const sourceCsv = path.join(root, 'products.csv')
const outputCsv = path.join(root, 'ebay_upload.csv')

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        value += '"'
        i += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        value += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(value)
      value = ''
    } else if (char === '\n') {
      row.push(value.replace(/\r$/, ''))
      rows.push(row)
      row = []
      value = ''
    } else {
      value += char
    }
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value.replace(/\r$/, ''))
    rows.push(row)
  }

  return rows
}

function csvEscape(value) {
  const text = String(value ?? '')
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function loadProducts() {
  const text = fs.readFileSync(sourceCsv, 'utf8')
  const rows = parseCsv(text)
  const [headers, ...dataRows] = rows
  return dataRows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])))
}

const productRows = loadProducts()
const byKey = new Map(productRows.map((row) => [row.product_key, row]))

function getImage(productKey) {
  const row = byKey.get(productKey)
  if (!row) throw new Error(`Missing product row for ${productKey}`)
  return row.image_url
}

function buildDescription({
  heading,
  intro,
  details,
  shipping = 'Flat $10 shipping per case.',
  betterPricing = 'Contact VetRx Supply Co. directly for a cheaper rate, even if you are ordering just one case. Better pricing may be available before purchase.',
  closing = 'Sold as a full case only. Reliable supply for pharmacies, clinics, hospitals, and retail counters. Please message with any questions.',
}) {
  return [
    'VetRx Supply Co.',
    heading,
    'Full Case - Made in the USA',
    '',
    intro,
    '',
    'Product Details',
    ...details,
    '',
    'Shipping',
    shipping,
    'Orders ship within 2 business days - most ship same or next business day.',
    '',
    'Better Pricing Available',
    betterPricing,
    '',
    closing,
  ].join('\n')
}

const listings = [
  {
    sku: 'GS-21',
    item_id: '406693847767',
    product_key: 'Pharmacy Bags - GS Design - #21 (3.5" x 1.5" x 10")',
    title: 'Pharmacy Paper Bags GS Design #21 - 3.5 x 1.5 x 10 - 3,000/Case - Made in USA',
    price: '125.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - GS Design #21',
      intro:
        'High-quality pharmacy prescription bags featuring the classic GS stock design. Strong, dependable paper bags built for everyday pharmacy counter use, prescription handoff, and retail checkout.',
      details: [
        'Design: GS Design #21',
        'Size: 3.5" x 1.5" x 10"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'GS-22',
    item_id: '406693851721',
    product_key: 'Pharmacy Bags - GS Design - #22 (4.5" x 2.25" x 11")',
    title: 'Pharmacy Paper Bags GS Design #22 - 4.5 x 2.25 x 11 - 3,000/Case - Made in USA',
    price: '135.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 8% off | Buy 4 get 9% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - GS Design #22',
      intro:
        'High-quality pharmacy prescription bags featuring the classic GS stock design. Strong, dependable paper bags sized for daily pharmacy use, prescription pickup, and general counter service.',
      details: [
        'Design: GS Design #22',
        'Size: 4.5" x 2.25" x 11"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'GS-23',
    item_id: '406693856751',
    product_key: 'Pharmacy Bags - GS Design - #23 (5" x 2" x 10")',
    title: 'Pharmacy Paper Bags GS Design #23 - 5 x 2 x 10 - 3,000/Case - Made in USA',
    price: '140.99',
    available_qty: '25',
    best_offer_enabled: 'No',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 8% off | Buy 4 get 9% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - GS Design #23',
      intro:
        'High-quality pharmacy prescription bags featuring the classic GS stock design. Reliable paper bags for prescription packaging, front-counter dispensing, and everyday pharmacy workflows.',
      details: [
        'Design: GS Design #23',
        'Size: 5" x 2" x 10"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'GS-26',
    item_id: '406693863364',
    product_key: 'Pharmacy Bags - GS Design - #26 (7" x 4" x 14")',
    title: 'Pharmacy Paper Bags GS Design #26 - 7 x 4 x 14 - 1,000/Case - Made in USA',
    price: '130.99',
    available_qty: '10',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - GS Design #26',
      intro:
        'Large-format pharmacy paper bags featuring the GS stock design. A dependable choice for bulkier prescriptions, boxed items, retail checkout, and medical office use.',
      details: [
        'Design: GS Design #26',
        'Size: 7" x 4" x 14"',
        'Quantity: 1,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'GS-28',
    item_id: '406693865495',
    product_key: 'Pharmacy Bags - GS Design - #28 (8" x 5" x 17")',
    title: 'Pharmacy Paper Bags GS Design #28 - 8 x 5 x 17 - 500/Case - Made in USA',
    price: '135.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - GS Design #28',
      intro:
        'Large pharmacy paper bags featuring the GS stock design. Built for oversized prescription orders, retail carryout, and everyday store counter use.',
      details: [
        'Design: GS Design #28',
        'Size: 8" x 5" x 17"',
        'Quantity: 500 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'GS-12',
    item_id: '406693866537',
    product_key: 'Pharmacy Bags - GS Design - #12 (7" x 10")',
    title: 'Pharmacy Paper Bags GS Design #12 - 7 x 10 - 3,000/Case - Made in USA',
    price: '135.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - GS Design #12',
      intro:
        'Flat pharmacy paper bags featuring the classic GS stock design. A reliable option for prescription handoff, medical offices, and pharmacy counter operations.',
      details: [
        'Design: GS Design #12',
        'Size: 7" x 10"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'PFCGSP-32',
    item_id: '406697853735',
    product_key: 'Pharmacy Bags - Plastic GS Design - #32 (9" x 5.5" x 18")',
    title: 'Plastic Pharmacy Bags GS Design #32 - 9 x 5.5 x 18 - 1,000/Case - White RX T-Shirt Bag',
    price: '115.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Plastic Pharmacy Bags - GS Design #32',
      intro:
        'White plastic pharmacy t-shirt bags printed in the classic GS RX design. Strong, dependable bags for pharmacy checkout, prescription pickup, and retail carryout.',
      details: [
        'Design: Plastic GS Design #32',
        'Size: 9" x 5.5" x 18"',
        'Quantity: 1,000 bags per case',
        'Material: White plastic',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'PFCGSP-35',
    item_id: '406697921592',
    product_key: 'Pharmacy Bags - Plastic GS Design - #35 (12" x 7" x 23")',
    title: 'Plastic Pharmacy Bags GS Design #35 - 12 x 7 x 23 - 1,000/Case - White RX T-Shirt Bags',
    price: '115.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Plastic Pharmacy Bags - GS Design #35',
      intro:
        'White plastic pharmacy t-shirt bags printed in the classic GS RX design. A dependable size for larger prescription orders, retail carryout, and everyday pharmacy use.',
      details: [
        'Design: Plastic GS Design #35',
        'Size: 12" x 7" x 23"',
        'Quantity: 1,000 bags per case',
        'Material: White plastic',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'PFCGSP-30',
    item_id: '406697923250',
    product_key: 'Pharmacy Bags - Plastic GS Design - #30 (12" x 7" x 25")',
    title: 'Plastic Pharmacy Bags GS Design #30 - 12 x 7 x 25 - 500/Case - White RX T-Shirt Bags',
    price: '145.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Plastic Pharmacy Bags - GS Design #30',
      intro:
        'White plastic pharmacy t-shirt bags printed in the classic GS RX design. Extra-large carryout bags built for higher-volume or oversized pharmacy orders.',
      details: [
        'Design: Plastic GS Design #30',
        'Size: 12" x 7" x 25"',
        'Quantity: 500 bags per case',
        'Material: White plastic',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
  {
    sku: 'VB2-FULL',
    item_id: '406697925982',
    product_key: 'Veterinary Bag Design #VB2 - Pinch bottom #22 (4.5" x 2.25" x 11")',
    title: 'Veterinary Paper Bags VB2 Design - Full Case - 3,000 or 1,000 Bags - Made in USA',
    price: '135.99',
    available_qty: '10',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Veterinary Paper Bags - VB2 Design',
      intro:
        'Adorable veterinary paper bags featuring our VB2 stock design. A dependable choice for pet clinics, veterinary hospitals, and pet retail stores handling prescriptions and take-home orders.',
      details: [
        'Design: VB2 Veterinary Design',
        'Available Sizes: #22 (4.5" x 2.25" x 11"), #12 (7" x 10"), #25 (6" x 4" x 11")',
        'Case Quantities: 3,000 bags for #22 and #12; 1,000 bags for #25',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
      betterPricing:
        'Contact VetRx Supply Co. directly for lower pricing and to confirm your preferred size before purchase. Better pricing may be available even on single-case orders.',
      closing:
        'Sold as a full case only. Reliable supply for veterinary clinics, pet hospitals, and animal care teams. Please message with any questions.',
    }),
  },
  {
    sku: 'VB2-12',
    item_id: '406697937562',
    product_key: 'Veterinary Bag Design #VB2 - Flat bag #12 (7" x 10")',
    title: 'Veterinary Paper Bags VB2 #12 - 7 x 10 - 3,000/Case - Vet / Pet Store Bags',
    price: '140.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Veterinary Paper Bags - VB2 #12',
      intro:
        'Veterinary paper bags featuring the VB2 stock design in a flat 7 x 10 format. Built for prescription handoff, clinic checkout, and pet store retail use.',
      details: [
        'Design: VB2 Veterinary Design #12',
        'Size: 7" x 10"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
      closing:
        'Sold as a full case only. Reliable supply for veterinary clinics, pet hospitals, and animal care teams. Please message with any questions.',
    }),
  },
  {
    sku: 'VB2-25',
    item_id: '406697938466',
    product_key: 'Veterinary Bag Design #VB2 - Square bottom #25 (6" x 4" x 11")',
    title: 'Veterinary Paper Bags VB2 #25 - 6 x 4 x 11 - 1,000/Case - Square Bottom Vet Bags',
    price: '95.99',
    available_qty: '25',
    best_offer_enabled: 'No',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Veterinary Paper Bags - VB2 #25',
      intro:
        'Square-bottom veterinary paper bags featuring the VB2 stock design. A dependable format for medications, supplies, and take-home pet care orders.',
      details: [
        'Design: VB2 Veterinary Design #25',
        'Size: 6" x 4" x 11"',
        'Quantity: 1,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
      closing:
        'Sold as a full case only. Reliable supply for veterinary clinics, pet hospitals, and animal care teams. Please message with any questions.',
    }),
  },
  {
    sku: 'VB1-FULL',
    item_id: '406698017465',
    product_key: 'Veterinary Bag Design #VB1 - Pinch bottom #22 (4.5" x 2.25" x 11")',
    title: 'Veterinary Paper Bags VB1 Design - Full Case - 3,000 or 1,000 Bags - Made in USA',
    price: '135.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 8% off | Buy 4 get 9% off',
    description: buildDescription({
      heading: 'Veterinary Paper Bags - VB1 Design',
      intro:
        'Veterinary paper bags featuring our VB1 stock design. A dependable program for pet clinics, veterinary hospitals, prescription handoff, and animal care checkout.',
      details: [
        'Design: VB1 Veterinary Design',
        'Available Sizes: #22 (4.5" x 2.25" x 11"), #12 (7" x 10"), #25 (6" x 4" x 11")',
        'Case Quantities: 3,000 bags for #22 and #12; 1,000 bags for #25',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
      betterPricing:
        'Contact VetRx Supply Co. directly for lower pricing and to confirm your preferred size before purchase. Better pricing may be available even on single-case orders.',
      closing:
        'Sold as a full case only. Reliable supply for veterinary clinics, pet hospitals, and animal care teams. Please message with any questions.',
    }),
  },
  {
    sku: 'VB1-12',
    item_id: '406698018383',
    product_key: 'Veterinary Bag Design #VB1 - Flat bag #12 (7" x 10")',
    title: 'Veterinary Paper Bags VB1 #12 - 7 x 10 - 3,000 Bags Full Case',
    price: '135.99',
    available_qty: '10',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Veterinary Paper Bags - VB1 #12',
      intro:
        'Flat veterinary paper bags featuring the VB1 stock design. Built for prescription pickup, pet clinic checkout, and animal hospital dispensing.',
      details: [
        'Design: VB1 Veterinary Design #12',
        'Size: 7" x 10"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
      closing:
        'Sold as a full case only. Reliable supply for veterinary clinics, pet hospitals, and animal care teams. Please message with any questions.',
    }),
  },
  {
    sku: 'VB1-25',
    item_id: '406698019328',
    product_key: 'Veterinary Bag Design #VB1 - Square bottom #25 (6" x 4" x 11")',
    title: 'Veterinary Paper Bags VB1 #25 - 6 x 4 x 11 - 1,000 Bags Full Case',
    price: '100.00',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 7% off | Buy 4 get 8% off',
    description: buildDescription({
      heading: 'Veterinary Paper Bags - VB1 #25',
      intro:
        'Square-bottom veterinary paper bags featuring the VB1 stock design. A dependable format for medication pickup, pet retail use, and clinic take-home orders.',
      details: [
        'Design: VB1 Veterinary Design #25',
        'Size: 6" x 4" x 11"',
        'Quantity: 1,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
      closing:
        'Sold as a full case only. Reliable supply for veterinary clinics, pet hospitals, and animal care teams. Please message with any questions.',
    }),
  },
  {
    sku: 'TY-21',
    item_id: '406613357757',
    product_key: 'Pharmacy Bags - TY Design - #21 (3.5" x 1.5" x 10")',
    title: 'Pharmacy Paper Bags TY Design #21 - 3.5 x 1.5 x 10 - 3,000/Case - Made in USA',
    price: '125.99',
    available_qty: '25',
    best_offer_enabled: 'Yes',
    volume_pricing: 'Buy 2 get 5% off | Buy 3 get 8% off | Buy 4 get 9% off',
    description: buildDescription({
      heading: 'Pharmacy Paper Bags - TY Design #21',
      intro:
        'High-quality pharmacy prescription bags featuring the classic Thank You design. Strong, dependable paper bags built for everyday pharmacy and retail use.',
      details: [
        'Design: Thank You (TY Design #21)',
        'Size: 3.5" x 1.5" x 10"',
        'Quantity: 3,000 bags per case',
        'Material: Durable paper',
        'Condition: Brand new',
        'Country of Manufacture: Made in the USA',
      ],
    }),
  },
]

const headers = [
  'sku',
  'item_id',
  'title',
  'price',
  'available_qty',
  'best_offer_enabled',
  'shipping_cost',
  'handling_time_days',
  'volume_pricing',
  'image_url',
  'description',
]

const output = [
  headers.join(','),
  ...listings.map((listing) => {
    const row = {
      ...listing,
      shipping_cost: '10.00',
      handling_time_days: '2',
      image_url: getImage(listing.product_key),
    }
    return headers.map((header) => csvEscape(row[header] ?? '')).join(',')
  }),
].join('\n')

fs.writeFileSync(outputCsv, `${output}\n`, 'utf8')
console.log(`Wrote ${listings.length} listings to ${outputCsv}`)
