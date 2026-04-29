export function buildIndustryCityMeta({
  industryLabel,
  marketLabel,
  city,
  stateAbbr,
  distanceMiles,
  pickupEligible,
  deliveryTimeline,
  startingPrice,
  businessCount,
  countyName,
}) {
  void deliveryTimeline
  const pickupText = pickupEligible ? 'same-day pickup within 100 miles' : `shipping based on ${distanceMiles.toFixed(1)} miles from Monroe, NC`
  const priceText = startingPrice ? `Stock prices from $${startingPrice.toFixed(2)} per case` : 'Factory-direct case pricing'
  const countText = Number.isFinite(businessCount)
    ? `CBP reports ${businessCount} ${marketLabel} establishments in ${countyName}`
    : 'County-level business counts included'

  return {
    title: `${industryLabel} in ${city}, ${stateAbbr} | Bag Supply Co`,
    description: `${industryLabel} in ${city}, ${stateAbbr} with ${pickupText}. ${priceText}. ${countText}.`,
  }
}

export function buildCityMeta({ city, stateAbbr, distanceMiles, pickupEligible, totalEstablishments, countyName }) {
  const pickupText = pickupEligible ? 'same-day pickup available' : 'fast freight shipping'
  const distanceText = `${distanceMiles.toFixed(1)} miles from Monroe, NC`
  const countText = Number.isFinite(totalEstablishments)
    ? `CBP shows ${totalEstablishments} establishments in ${countyName}`
    : 'County business counts included'

  return {
    title: `Bag Programs in ${city}, ${stateAbbr} | Bag Supply Co`,
    description: `Wholesale paper bag programs for ${city}, ${stateAbbr} with ${pickupText} and delivery based on ${distanceText}. ${countText}.`,
  }
}

export function buildIndustryMeta({ industryLabel, startingPrice }) {
  const priceText = startingPrice ? `Starting at $${startingPrice.toFixed(2)} per case` : 'Factory-direct case pricing'
  return {
    title: `${industryLabel} | Bag Supply Co`,
    description: `${industryLabel} programs with stock and custom options, predictable lead times, and ${priceText}.`,
  }
}
