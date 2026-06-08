import { NextResponse } from 'next/server'
import { sendQuoteEmail } from '@/lib/email'
import { calculateQuote, money } from '@/lib/quoteMath'
import type { ArtworkStatus, PrintProgramId, PrintSide } from '@/lib/products'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.type === 'contact') {
      const contact = body.contact || {}
      if (!contact.name || !contact.email || !contact.phone) {
        return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 })
      }

      await sendQuoteEmail({
        subject: `Bud Bags contact: ${contact.dispensaryName || contact.name}`,
        text: [
          'Bud Bags contact request',
          `Dispensary: ${contact.dispensaryName || 'Not provided'}`,
          `Name: ${contact.name}`,
          `Email: ${contact.email}`,
          `Phone: ${contact.phone}`,
          `State: ${contact.state || 'Not provided'}`,
          `Message: ${contact.message || 'Not provided'}`,
        ].join('\n'),
        html: `
          <h1>Bud Bags contact request</h1>
          <p><strong>Dispensary:</strong> ${escapeHtml(contact.dispensaryName || 'Not provided')}</p>
          <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>
          <p><strong>State:</strong> ${escapeHtml(contact.state || 'Not provided')}</p>
          <p><strong>Message:</strong><br />${escapeHtml(contact.message || 'Not provided')}</p>
        `,
      })

      return NextResponse.json({ ok: true })
    }

    const contact = body.contact || {}
    if (!contact.dispensaryName || !contact.ownerName || !contact.email || !contact.phone || !contact.state) {
      return NextResponse.json({ error: 'Complete contact information is required.' }, { status: 400 })
    }

    const estimate = calculateQuote({
      programId: body.programId as PrintProgramId,
      sizeId: String(body.sizeId || '25'),
      cases: Number(body.cases || 4),
      printSide: body.printSide as PrintSide,
      artworkStatus: body.artworkStatus as ArtworkStatus,
      state: contact.state,
    })

    await sendQuoteEmail({
      subject: `Bud Bags quote: ${contact.dispensaryName} - ${estimate.programName}`,
      text: [
        'Bud Bags quote request',
        `Dispensary: ${contact.dispensaryName}`,
        `Owner/buyer: ${contact.ownerName}`,
        `Email: ${contact.email}`,
        `Phone: ${contact.phone}`,
        `State: ${contact.state}`,
        '',
        `Program: ${estimate.programName}`,
        `Size: ${estimate.sizeLabel} ${estimate.dimensions}`,
        `Cases: ${estimate.cases}`,
        `Price per case: ${money(estimate.pricePerCase)}`,
        `Product subtotal: ${money(estimate.productSubtotal)}`,
        `Art/plate fee: ${money(estimate.artPlateFee)}`,
        `Back setup fee: ${money(estimate.backPrintSetupFee)}`,
        `3-color surcharge: ${money(estimate.surcharge)}`,
        `Zone group: ${estimate.zoneGroup}`,
        `FSC placeholder: ${money(estimate.estimatedFsc)}`,
        `Estimated total: ${money(estimate.estimatedTotal)}`,
        `Freight note: ${estimate.freightNote}`,
        `Printing sides: ${body.printSide}`,
        `Artwork: ${body.artworkStatus}`,
      ].join('\n'),
      html: `
        <h1>Bud Bags quote request</h1>
        <h2>Contact</h2>
        <p><strong>Dispensary:</strong> ${escapeHtml(contact.dispensaryName)}</p>
        <p><strong>Owner/buyer:</strong> ${escapeHtml(contact.ownerName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>
        <p><strong>State:</strong> ${escapeHtml(contact.state)}</p>
        <h2>Estimate</h2>
        <p><strong>Program:</strong> ${estimate.programName}</p>
        <p><strong>Size:</strong> ${estimate.sizeLabel} ${estimate.dimensions}</p>
        <p><strong>Cases:</strong> ${estimate.cases}</p>
        <p><strong>Price per case:</strong> ${money(estimate.pricePerCase)}</p>
        <p><strong>Product subtotal:</strong> ${money(estimate.productSubtotal)}</p>
        <p><strong>Art/plate fee:</strong> ${money(estimate.artPlateFee)}</p>
        <p><strong>Back setup fee:</strong> ${money(estimate.backPrintSetupFee)}</p>
        <p><strong>3-color surcharge:</strong> ${money(estimate.surcharge)}</p>
        <p><strong>Zone group:</strong> ${estimate.zoneGroup}</p>
        <p><strong>FSC placeholder:</strong> ${money(estimate.estimatedFsc)}</p>
        <p><strong>Estimated total:</strong> ${money(estimate.estimatedTotal)}</p>
        <p><strong>Freight note:</strong> ${escapeHtml(estimate.freightNote)}</p>
        <p><strong>Printing sides:</strong> ${escapeHtml(body.printSide)}</p>
        <p><strong>Artwork:</strong> ${escapeHtml(body.artworkStatus)}</p>
      `,
    })

    return NextResponse.json({ ok: true, estimate })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Quote request failed.' }, { status: 500 })
  }
}

function escapeHtml(value: unknown) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
