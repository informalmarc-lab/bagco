import nodemailer from 'nodemailer'

type EmailPayload = {
  subject: string
  html: string
  text: string
}

export async function sendQuoteEmail(payload: EmailPayload) {
  const to = process.env.QUOTE_TO_EMAIL || 'marc@bagsupplyco.com'
  const from = process.env.QUOTE_FROM_EMAIL || 'quotes@budbags.net'
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    console.info('Bud Bags quote email skipped. Configure SMTP_HOST, SMTP_USER, and SMTP_PASS.', {
      to,
      subject: payload.subject,
    })
    return { skipped: true }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  await transporter.sendMail({
    to,
    from,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  })

  return { skipped: false }
}
