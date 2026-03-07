type LeadFormType = 'quote' | 'contact' | 'newsletter'
const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1475270117947342900/bhXHtbtVkQSQ0HoynBEjwfe6P9N2JNbJvyg14Ovw2NettYcZVRq-7resSwowh58XajcF'

type LeadSubmissionResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

function toCleanRecord(input: Record<string, unknown>): Record<string, unknown> {
  const record: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (trimmed.length > 0) record[key] = trimmed
      continue
    }
    record[key] = value
  }
  return record
}

async function postJson(url: string, payload: Record<string, unknown>): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
}

export async function submitLeadToWebhook(
  formType: LeadFormType,
  payload: Record<string, unknown>,
): Promise<LeadSubmissionResult> {
  const cleanPayload = toCleanRecord(payload)
  const submittedAt =
    typeof cleanPayload.submitted_at === 'string' && cleanPayload.submitted_at
      ? cleanPayload.submitted_at
      : new Date().toISOString()

  const eventPayload: Record<string, unknown> = {
    form_type: formType,
    submitted_at: submittedAt,
    ...cleanPayload,
  }

  try {
    const primary = await postJson(DISCORD_WEBHOOK_URL, eventPayload)
    if (!primary.ok) {
      const body = await primary.text().catch(() => '')
      return {
        ok: false,
        status: 502,
        error: `Webhook request failed (${primary.status}). ${body}`.trim(),
      }
    }

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unexpected server error',
    }
  }
}
