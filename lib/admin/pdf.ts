import { PDFDocument, StandardFonts, rgb, type PDFFont } from 'pdf-lib'
import { type AdminQuoteRecord } from '@/lib/admin/types'

const GREEN = rgb(30 / 255, 77 / 255, 43 / 255)
const TAN = rgb(181 / 255, 129 / 255, 58 / 255)
const BLACK = rgb(26 / 255, 26 / 255, 26 / 255)
const GRAY = rgb(0.8, 0.8, 0.8)
const CREAM = rgb(250 / 255, 246 / 255, 240 / 255)

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 54

function fmtMoney(value: number): string {
  return `$${value.toFixed(2)}`
}

function drawText(
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color = BLACK,
) {
  return { text, x, y, size, font, color }
}

function splitLines(text: string, maxChars = 45): string[] {
  if (!text.trim()) return ['']
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

export async function generateQuotePdf(record: AdminQuoteRecord): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const addPage = () => pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  const page = addPage()
  let y = PAGE_HEIGHT - MARGIN

  const lineItems = record.lineItems.map((item) => ({
    ...item,
    amount: item.qty * item.price,
  }))
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const total = subtotal + record.freightCost
  const isQuote = record.docType === 'QUOTE'

  page.drawText('BagSupplyCo', { x: MARGIN, y, size: 28, font: fontBold, color: GREEN })
  y -= 22
  page.drawText('Custom Paper Bags â€¢ BagSupplyCo.com', { x: MARGIN, y, size: 10, font: fontRegular, color: BLACK })
  y -= 13
  page.drawText('912 Houston Drive, Monroe, NC 28110', { x: MARGIN, y, size: 9, font: fontRegular, color: BLACK })
  y -= 12
  page.drawText('Phone: (252) 516-1944', { x: MARGIN, y, size: 9, font: fontRegular, color: BLACK })
  y -= 12
  page.drawText('hello@bagsupplyco.com', { x: MARGIN, y, size: 9, font: fontRegular, color: BLACK })

  const headerRightX = PAGE_WIDTH - MARGIN - 190
  page.drawText(record.docType, { x: headerRightX, y: PAGE_HEIGHT - MARGIN, size: 30, font: fontBold, color: GREEN })
  page.drawText(record.docNumber, { x: headerRightX, y: PAGE_HEIGHT - MARGIN - 30, size: 18, font: fontBold, color: TAN })

  const infoBoxY = PAGE_HEIGHT - MARGIN - 95
  page.drawRectangle({
    x: headerRightX,
    y: infoBoxY,
    width: 190,
    height: 74,
    borderColor: GRAY,
    borderWidth: 1,
  })
  const infoRows: Array<[string, string]> = [
    ['Invoice Date', record.date],
    ['Terms', record.terms.paymentTerms === 'Custom' ? record.terms.customPaymentTerms || 'Custom' : record.terms.paymentTerms],
    ['Your Order No.', record.customer.orderNumber || ''],
    ['Customer Number', record.customer.customerNumber || ''],
  ]
  let rowY = infoBoxY + 57
  for (const [label, value] of infoRows) {
    page.drawText(label, { x: headerRightX + 6, y: rowY, size: 8, font: fontBold, color: BLACK })
    page.drawText(value, { x: headerRightX + 92, y: rowY, size: 8, font: fontRegular, color: BLACK })
    rowY -= 16
  }

  y = PAGE_HEIGHT - MARGIN - 112
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 2,
    color: GREEN,
  })

  y -= 24
  page.drawText('BILL TO:', { x: MARGIN, y, size: 9, font: fontBold, color: BLACK })
  page.drawText('SHIP TO:', { x: PAGE_WIDTH / 2 + 6, y, size: 9, font: fontBold, color: BLACK })
  y -= 7

  const boxHeight = 82
  const boxWidth = (PAGE_WIDTH - MARGIN * 2 - 14) / 2
  page.drawRectangle({ x: MARGIN, y: y - boxHeight, width: boxWidth, height: boxHeight, borderColor: GRAY, borderWidth: 1 })
  page.drawRectangle({ x: MARGIN + boxWidth + 14, y: y - boxHeight, width: boxWidth, height: boxHeight, borderColor: GRAY, borderWidth: 1 })

  const billText = [
    record.customer.businessName,
    record.customer.contactName,
    record.customer.email,
    record.customer.phone,
    record.customer.billToAddress,
  ]
    .filter(Boolean)
    .join('\n')
  const shipText = [
    record.customer.businessName,
    record.customer.contactName,
    record.customer.shipToAddress,
  ]
    .filter(Boolean)
    .join('\n')

  let billY = y - 14
  for (const line of billText.split('\n')) {
    for (const wrapped of splitLines(line, 36)) {
      page.drawText(wrapped, { x: MARGIN + 8, y: billY, size: 8.5, font: fontRegular, color: BLACK })
      billY -= 11
    }
  }
  let shipY = y - 14
  for (const line of shipText.split('\n')) {
    for (const wrapped of splitLines(line, 36)) {
      page.drawText(wrapped, { x: MARGIN + boxWidth + 22, y: shipY, size: 8.5, font: fontRegular, color: BLACK })
      shipY -= 11
    }
  }

  y = y - boxHeight - 22
  const columns = [
    { label: 'QTY.', width: 38 },
    { label: 'ITEM', width: 58 },
    { label: 'SIZE and PAPER', width: 96 },
    { label: 'DESCRIPTION', width: 208 },
    { label: 'PRICE', width: 62 },
    { label: 'AMOUNT', width: 70 },
  ]

  page.drawRectangle({
    x: MARGIN,
    y: y - 18,
    width: PAGE_WIDTH - MARGIN * 2,
    height: 18,
    color: GREEN,
  })
  let cx = MARGIN + 4
  for (const col of columns) {
    page.drawText(col.label, { x: cx, y: y - 12, size: 8, font: fontBold, color: rgb(1, 1, 1) })
    cx += col.width
  }
  y -= 18

  for (let i = 0; i < lineItems.length; i += 1) {
    const item = lineItems[i]
    const rowHeight = 18
    if (i % 2 === 1) {
      page.drawRectangle({
        x: MARGIN,
        y: y - rowHeight,
        width: PAGE_WIDTH - MARGIN * 2,
        height: rowHeight,
        color: CREAM,
      })
    }
    page.drawRectangle({
      x: MARGIN,
      y: y - rowHeight,
      width: PAGE_WIDTH - MARGIN * 2,
      height: rowHeight,
      borderColor: GRAY,
      borderWidth: 0.5,
    })

    let x = MARGIN + 4
    const cells = [
      String(item.qty),
      item.item,
      item.sizeAndPaper,
      item.description,
      fmtMoney(item.price),
      fmtMoney(item.amount),
    ]
    cells.forEach((value, index) => {
      const width = columns[index].width
      page.drawText(value, { x, y: y - 12, size: 8, font: fontRegular, color: BLACK })
      x += width
    })
    y -= rowHeight
  }

  y -= 18
  page.drawText('Freight Prepaid - add to invoice', { x: MARGIN, y, size: 9, font: fontRegular, color: BLACK })

  const totalsX = PAGE_WIDTH - MARGIN - 220
  page.drawText(`Subtotal: ${fmtMoney(subtotal)}`, { x: totalsX, y, size: 10, font: fontRegular, color: BLACK })
  y -= 14
  page.drawText(`Cost of Freight: ${fmtMoney(record.freightCost)}`, { x: totalsX, y, size: 10, font: fontRegular, color: BLACK })
  y -= 20

  page.drawRectangle({
    x: totalsX - 4,
    y: y - 4,
    width: 224,
    height: 18,
    color: GREEN,
  })
  page.drawText(`TOTAL: ${fmtMoney(total)}`, { x: totalsX + 8, y: y + 2, size: 11, font: fontBold, color: rgb(1, 1, 1) })

  y -= 24
  if (record.terms.shippingNote.trim()) {
    page.drawText('Shipping Note:', { x: MARGIN, y, size: 9, font: fontBold, color: BLACK })
    y -= 12
    for (const line of splitLines(record.terms.shippingNote, 78)) {
      page.drawText(line, { x: MARGIN, y, size: 8.5, font: fontRegular, color: BLACK })
      y -= 10
    }
    y -= 8
  } else {
    y -= 10
  }

  if (record.terms.includeVisaMastercardNotice) {
    page.drawText('Visa & MasterCard Now Accepted', {
      x: MARGIN + 145,
      y,
      size: 12,
      font: fontBold,
      color: BLACK,
    })
    y -= 20
  }

  if (record.terms.includeCardLateFeeNotice) {
    const fine = record.terms.cardLateFeeNoticeText
    for (const line of splitLines(fine, 108)) {
      page.drawText(line, { x: MARGIN, y, size: 7.5, font: fontRegular, color: BLACK })
      y -= 10
    }
  }

  if (isQuote) {
    page.drawText(`Valid for: ${record.validForDays}`, {
      x: MARGIN,
      y: PAGE_HEIGHT - MARGIN - 82,
      size: 8.5,
      font: fontBold,
      color: BLACK,
    })
  }

  const footerY = 28
  page.drawLine({
    start: { x: MARGIN, y: footerY + 12 },
    end: { x: PAGE_WIDTH - MARGIN, y: footerY + 12 },
    thickness: 1,
    color: GRAY,
  })
  page.drawText('bagsupplyco.com  |  (252) 516-1944  |  hello@bagsupplyco.com', {
    x: MARGIN + 75,
    y: footerY,
    size: 8,
    font: fontRegular,
    color: BLACK,
  })
  page.drawText('Page 1 of 1', { x: PAGE_WIDTH - MARGIN - 48, y: footerY - 11, size: 8, font: fontRegular, color: BLACK })

  return pdf.save()
}
