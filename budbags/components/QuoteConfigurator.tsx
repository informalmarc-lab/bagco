'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  bagSizes,
  printPrograms,
  states,
  type ArtworkStatus,
  type PrintProgramId,
  type PrintSide,
} from '@/lib/products'
import { calculateQuote, money } from '@/lib/quoteMath'

type ContactState = {
  dispensaryName: string
  ownerName: string
  email: string
  phone: string
  state: string
}

const printSides: { id: PrintSide; label: string; detail: string }[] = [
  { id: 'front', label: 'Front only', detail: 'Best first run for putting your shop logo on the customer-facing side.' },
  { id: 'front-back', label: 'Front + back', detail: '$35 additional setup for shop info, warning copy, loyalty copy, or reorder branding.' },
  { id: 'front-gussets', label: 'Front + gussets', detail: 'Good when the bag sits sideways on pickup shelves or at the register.' },
]

const artworkOptions: { id: ArtworkStatus; label: string; detail: string }[] = [
  { id: 'print-ready', label: 'Print-ready vector files', detail: 'AI, EPS, or production-ready PDF from your designer is available.' },
  { id: 'needs-help', label: 'Need design help', detail: 'You have a logo, strain-brand direction, or shop colors, but need help getting the bag layout ready.' },
]

export default function QuoteConfigurator() {
  const searchParams = useSearchParams()
  const initialProgram = (searchParams.get('program') as PrintProgramId | null) || 'FC2C'
  const [step, setStep] = useState(1)
  const [programId, setProgramId] = useState<PrintProgramId>(
    printPrograms.some((program) => program.id === initialProgram) ? initialProgram : 'FC2C',
  )
  const [sizeId, setSizeId] = useState('25')
  const [cases, setCases] = useState(4)
  const [printSide, setPrintSide] = useState<PrintSide>('front')
  const [artworkStatus, setArtworkStatus] = useState<ArtworkStatus>('print-ready')
  const [contact, setContact] = useState<ContactState>({
    dispensaryName: '',
    ownerName: '',
    email: '',
    phone: '',
    state: 'CA',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const estimate = useMemo(
    () =>
      calculateQuote({
        programId,
        sizeId,
        cases,
        printSide,
        artworkStatus,
        state: contact.state,
      }),
    [artworkStatus, cases, contact.state, printSide, programId, sizeId],
  )

  const canSubmit = contact.dispensaryName && contact.ownerName && contact.email && contact.phone && contact.state

  async function submitQuote() {
    setStatus('sending')
    setError('')

    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'quote',
        programId,
        sizeId,
        cases,
        printSide,
        artworkStatus,
        contact,
      }),
    })

    if (!response.ok) {
      const result = await response.json().catch(() => ({}))
      setStatus('error')
      setError(result.error || 'The quote could not be sent. Please text or call and we will help.')
      return
    }

    setStatus('sent')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
      <section className="card p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-line pb-4">
          <h1 className="text-2xl font-black text-leaf md:text-3xl">Cannabis Custom Bag Quote</h1>
          <p className="text-sm font-bold text-mute">Step {step} of 8</p>
        </div>

        {step === 1 && (
          <StepShell title="Choose how much brand color the bag needs">
            <div className="grid gap-3 md:grid-cols-3">
              {printPrograms.map((program) => (
                <ChoiceButton
                  key={program.id}
                  selected={programId === program.id}
                  title={program.name}
                  detail={`Starting at ${money(program.startingAt)}/case`}
                  onClick={() => setProgramId(program.id)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell title="Pick the size your shop actually uses">
            <div className="grid gap-3 md:grid-cols-3">
              {bagSizes.map((size) => (
                <ChoiceButton
                  key={size.id}
                  selected={sizeId === size.id}
                  title={`${size.label} ${size.primary ? 'Primary' : ''}`}
                  detail={`${size.dimensions}${size.bagsPerCase ? `, ${size.bagsPerCase.toLocaleString()} bags/case` : ''}`}
                  onClick={() => setSizeId(size.id)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell title="Set the case count for this shop or rollout">
            <label className="field-label" htmlFor="cases">Number of cases</label>
            <input
              id="cases"
              className="field-input max-w-xs"
              type="number"
              min={1}
              value={cases}
              onChange={(event) => setCases(Math.max(1, Number(event.target.value)))}
            />
            <p className="mt-3 text-sm leading-6 text-mute">
              Standard custom program minimum is 4 cases. A 3-case mini program is available for cannabis shops that want to test paper bags before committing to a full branded run.
            </p>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell title="Choose where shoppers should see your shop name">
            <div className="grid gap-3 md:grid-cols-3">
              {printSides.map((side) => (
                <ChoiceButton
                  key={side.id}
                  selected={printSide === side.id}
                  title={side.label}
                  detail={side.detail}
                  onClick={() => setPrintSide(side.id)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 5 && (
          <StepShell title="Tell us where the artwork stands">
            <div className="grid gap-3 md:grid-cols-2">
              {artworkOptions.map((option) => (
                <ChoiceButton
                  key={option.id}
                  selected={artworkStatus === option.id}
                  title={option.label}
                  detail={option.detail}
                  onClick={() => setArtworkStatus(option.id)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 6 && (
          <StepShell title="Where should we send the follow-up?">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Dispensary name" value={contact.dispensaryName} onChange={(value) => setContact({ ...contact, dispensaryName: value })} />
              <TextField label="Owner or purchasing contact" value={contact.ownerName} onChange={(value) => setContact({ ...contact, ownerName: value })} />
              <TextField label="Email" type="email" value={contact.email} onChange={(value) => setContact({ ...contact, email: value })} />
              <TextField label="Phone" value={contact.phone} onChange={(value) => setContact({ ...contact, phone: value })} />
              <label className="field-label">
                State
                <select className="field-input" value={contact.state} onChange={(event) => setContact({ ...contact, state: event.target.value })}>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>
            </div>
          </StepShell>
        )}

        {step === 7 && (
          <StepShell title="Review estimate">
            <Summary estimate={estimate} />
            <p className="mt-4 text-sm leading-6 text-mute">
              This is a working estimate for planning. Final freight, artwork, production timing, and any state-specific packaging concerns are confirmed during follow-up.
            </p>
          </StepShell>
        )}

        {step === 8 && (
          <StepShell title="Send the quote request">
            {status === 'sent' ? (
              <div className="rounded-lg border border-leaf bg-white p-5">
                <h2 className="text-xl font-black text-leaf">Quote request sent.</h2>
                <p className="mt-2 text-sm leading-6 text-mute">
                  A real person will follow up within 24 hours to confirm artwork, production timing, freight, and whether stock bags should ship while the custom run is in production.
                </p>
              </div>
            ) : (
              <>
                <Summary estimate={estimate} />
                {error ? <p className="mt-4 text-sm font-bold text-red-700">{error}</p> : null}
                <button className="btn-primary mt-5" disabled={!canSubmit || status === 'sending'} onClick={submitQuote}>
                  {status === 'sending' ? 'Sending...' : 'Send Quote Request'}
                </button>
                {!canSubmit ? <p className="mt-3 text-sm text-mute">Complete contact information before submitting.</p> : null}
              </>
            )}
          </StepShell>
        )}

        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-line pt-5">
          <button className="btn-secondary" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))}>
            Back
          </button>
          {step < 8 ? (
            <button className="btn-primary" onClick={() => setStep((current) => Math.min(8, current + 1))}>
              Continue
            </button>
          ) : null}
        </div>
      </section>

      <aside className="card h-fit p-5">
        <h2 className="text-lg font-black text-leaf">Working Shop Estimate</h2>
        <Summary estimate={estimate} compact />
      </aside>
    </div>
  )
}

function StepShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-black text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function ChoiceButton({
  selected,
  title,
  detail,
  onClick,
}: {
  selected: boolean
  title: string
  detail: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={`rounded-lg border p-4 text-left transition-colors ${
        selected ? 'border-leaf bg-white ring-2 ring-leaf/20' : 'border-line bg-bone hover:bg-white'
      }`}
      onClick={onClick}
    >
      <span className="block text-sm font-black text-ink">{title}</span>
      <span className="mt-2 block text-sm leading-5 text-mute">{detail}</span>
    </button>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="field-label">
      {label}
      <input className="field-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function Summary({ estimate, compact = false }: { estimate: ReturnType<typeof calculateQuote>; compact?: boolean }) {
  const rows = [
    ['Program', estimate.programName],
    ['Size', `${estimate.sizeLabel} ${estimate.dimensions}`],
    ['Cases', estimate.cases.toString()],
    ['Price/case', money(estimate.pricePerCase)],
    ['Bag subtotal', money(estimate.productSubtotal)],
    ['Art/plate fee', money(estimate.artPlateFee)],
    ['Back setup', money(estimate.backPrintSetupFee)],
    ['3-color surcharge', money(estimate.surcharge)],
    ['Zone group', estimate.zoneGroup],
    ['FSC placeholder', money(estimate.estimatedFsc)],
  ]

  return (
    <div className={compact ? 'mt-4' : 'rounded-lg border border-line bg-white p-4'}>
      <div className="grid gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-line/70 py-2 text-sm last:border-b-0">
            <span className="font-semibold text-mute">{label}</span>
            <span className="text-right font-bold text-ink">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between gap-4 border-t border-line pt-4">
        <span className="text-base font-black text-leaf">Estimated total</span>
        <span className="text-base font-black text-leaf">{money(estimate.estimatedTotal)}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-mute">{estimate.freightNote}</p>
    </div>
  )
}
