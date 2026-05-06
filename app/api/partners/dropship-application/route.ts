import { NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const LEFT = 54
const RIGHT = PAGE_WIDTH - 54

function drawWrappedText(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
  maxWidth: number,
  color: ReturnType<typeof rgb>,
  lineHeight = size * 1.45,
): number {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const testLine = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(testLine, size) <= maxWidth) {
      current = testLine
    } else {
      if (current) lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    })
  })

  return y - lines.length * lineHeight
}

function drawField(
  page: PDFPage,
  label: string,
  y: number,
  labelFont: PDFFont,
  labelSize: number,
  lineColor: ReturnType<typeof rgb>,
  textColor: ReturnType<typeof rgb>,
): number {
  page.drawText(label, {
    x: LEFT,
    y,
    size: labelSize,
    font: labelFont,
    color: textColor,
  })

  const lineY = y - 10
  page.drawLine({
    start: { x: LEFT, y: lineY },
    end: { x: RIGHT, y: lineY },
    thickness: 1,
    color: lineColor,
  })

  return y - 36
}

export async function GET() {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])

  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const cream = rgb(250 / 255, 246 / 255, 240 / 255)
  const darkGreen = rgb(30 / 255, 77 / 255, 43 / 255)
  const tan = rgb(181 / 255, 129 / 255, 58 / 255)
  const kraft = rgb(196 / 255, 147 / 255, 90 / 255)
  const bodyText = rgb(62 / 255, 52 / 255, 39 / 255)

  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: cream,
  })

  page.drawRectangle({
    x: LEFT,
    y: PAGE_HEIGHT - 90,
    width: RIGHT - LEFT,
    height: 58,
    color: rgb(1, 1, 1),
    borderColor: kraft,
    borderWidth: 1.2,
    opacity: 0.22,
  })

  const title =
    'BagSupplyCo Drop Ship Partner Application — Email completed form to dropship@bagsupplyco.com'
  let cursorY = drawWrappedText(page, title, fontBold, 13, LEFT + 12, PAGE_HEIGHT - 52, RIGHT - LEFT - 24, darkGreen)

  cursorY -= 8
  page.drawLine({
    start: { x: LEFT, y: cursorY },
    end: { x: RIGHT, y: cursorY },
    thickness: 2,
    color: tan,
  })

  cursorY -= 24
  cursorY = drawField(page, 'Business name', cursorY, fontBold, 11, kraft, bodyText)
  cursorY = drawField(page, 'Contact name', cursorY, fontBold, 11, kraft, bodyText)
  cursorY = drawField(page, 'Email address', cursorY, fontBold, 11, kraft, bodyText)
  cursorY = drawField(page, 'Phone number', cursorY, fontBold, 11, kraft, bodyText)
  cursorY = drawField(page, 'Website or storefront URL', cursorY, fontBold, 11, kraft, bodyText)
  cursorY = drawField(page, 'Industry / type of business', cursorY, fontBold, 11, kraft, bodyText)
  cursorY = drawField(page, 'Approximate monthly bag volume needed', cursorY, fontBold, 11, kraft, bodyText)

  page.drawText('Products or bag types they are interested in', {
    x: LEFT,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: bodyText,
  })
  page.drawRectangle({
    x: LEFT,
    y: cursorY - 106,
    width: RIGHT - LEFT,
    height: 92,
    borderWidth: 1,
    borderColor: kraft,
    color: rgb(1, 1, 1),
    opacity: 0.1,
  })

  cursorY -= 130
  page.drawText('How they heard about BagSupplyCo', {
    x: LEFT,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: bodyText,
  })
  page.drawLine({
    start: { x: LEFT, y: cursorY - 10 },
    end: { x: RIGHT, y: cursorY - 10 },
    thickness: 1,
    color: kraft,
  })

  page.drawText('Return completed application to: dropship@bagsupplyco.com', {
    x: LEFT,
    y: 66,
    size: 10,
    font: fontRegular,
    color: tan,
  })
  page.drawText('Bag Supply Co | 912 Houston Drive, Monroe, NC 28110 | (704) 862-9256', {
    x: LEFT,
    y: 50,
    size: 9,
    font: fontRegular,
    color: bodyText,
  })

  const bytes = await pdf.save()

  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="bagsupplyco-dropship-partner-application.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}
