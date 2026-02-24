export const companyName = 'Bag Supply Co'
export const contactEmail = 'info@bagco.com'
export const contactPhone = '(252) 516-1944'
export const contactPhoneHref = 'tel:+12525161944'
export const contactAddress = ['912 Houston Drive', 'Monroe, NC 28110']
export const subjectTemplate = 'Pricing Request - Pharmacy - [City, State]'

export const pricingMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subjectTemplate)}`
