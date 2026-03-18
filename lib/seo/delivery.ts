export type DeliveryEstimate = {
  timeline: string
  pickupLabel: string
  distanceLabel: string
}

export function getDeliveryEstimate(distanceMiles: number, pickupEligible: boolean): DeliveryEstimate {
  if (pickupEligible) {
    return {
      timeline: 'Same-day pickup or 1-2 business day freight',
      pickupLabel: 'Same-day pickup available (within 100 miles)',
      distanceLabel: `${distanceMiles.toFixed(1)} miles from Monroe, NC`,
    }
  }

  if (distanceMiles <= 300) {
    return {
      timeline: '1-2 business day freight',
      pickupLabel: 'Pickup not available (over 100 miles)',
      distanceLabel: `${distanceMiles.toFixed(1)} miles from Monroe, NC`,
    }
  }

  if (distanceMiles <= 800) {
    return {
      timeline: '2-3 business day freight',
      pickupLabel: 'Pickup not available (over 100 miles)',
      distanceLabel: `${distanceMiles.toFixed(1)} miles from Monroe, NC`,
    }
  }

  return {
    timeline: '3-5 business day freight',
    pickupLabel: 'Pickup not available (over 100 miles)',
    distanceLabel: `${distanceMiles.toFixed(1)} miles from Monroe, NC`,
  }
}
