import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import https from 'https'
import readline from 'readline'

const ROOT = process.cwd()
const DATA_DIR = path.join(ROOT, 'data', 'seo')
const RAW_DIR = path.join(DATA_DIR, '_raw')

const STATES = JSON.parse(await fsp.readFile(path.join(DATA_DIR, 'states.json'), 'utf8'))

const MONROE = { lat: 34.9854, lon: -80.5495 }

const PLACE_BY_COUNTY_URL =
  'https://www2.census.gov/geo/docs/reference/codes2020/national_place_by_county2020.txt'
const GAZ_BASE_URL =
  'https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2020_Gazetteer'
const DEC_PLACE_URL = 'https://api.census.gov/data/2020/dec/pl?get=NAME,P1_001N&for=place:*&in=state:'
const DEC_COUNTY_URL = 'https://api.census.gov/data/2020/dec/pl?get=NAME,P1_001N&for=county:*&in=state:'
const CBP_BASE_URL = 'https://api.census.gov/data/2022/cbp?get=ESTAB&for=county:*&in=state:'

const INDUSTRIES = [
  { key: 'pharmacy', naics: '446110' },
  { key: 'veterinary', naics: '541940' },
  { key: 'dispensary', naics: '453998' },
  { key: 'smoke-shop', naics: '453991' },
  { key: 'retail', naics: '44-45' },
  { key: 'food-beverage', naics: '722' },
  { key: 'wineries-breweries', naics: '3121' },
  { key: 'event-company', naics: '56192' },
]

const TOTAL_NAICS = '00'
const COMPETITION_NAICS = '424130'
const PRIORITY_SLUGS = ['charlotte-nc', 'raleigh-nc', 'greensboro-nc']

const API_KEY = process.env.CENSUS_API_KEY

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Request failed ${res.statusCode} for ${url}`))
          return
        }
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

async function fetchJson(url, retries = 3) {
  const text = await fetchText(url)
  if (!text.trim()) {
    return []
  }
  try {
    return JSON.parse(text)
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 750))
      return fetchJson(url, retries - 1)
    }
    console.warn(`Failed to parse JSON from ${url}: ${error.message}`)
    return []
  }
}

function toNumber(value) {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

function slugifyCity(name, stateAbbr) {
  return (
    name
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') +
    `-${stateAbbr.toLowerCase()}`
  )
}

function normalizePlaceName(name) {
  return name
    .replace(/\s+(city|town|village|borough|cdp|municipio|metropolitan government)\b/gi, '')
    .replace(/\s+\(balance\)/gi, '')
    .replace(/\s+balance\b/gi, '')
    .trim()
}

function haversineMiles(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return 3958.8 * c
}

async function downloadIfMissing(url, targetPath) {
  if (fs.existsSync(targetPath)) return
  const text = await fetchText(url)
  await fsp.writeFile(targetPath, text, 'utf8')
}

async function loadPlaceToCounty() {
  ensureDir(RAW_DIR)
  const filePath = path.join(RAW_DIR, 'national_place_by_county2020.txt')
  await downloadIfMissing(PLACE_BY_COUNTY_URL, filePath)

  const placeMap = new Map()
  const rl = readline.createInterface({ input: fs.createReadStream(filePath), crlfDelay: Infinity })
  let isHeader = true

  for await (const line of rl) {
    if (isHeader) {
      isHeader = false
      continue
    }
    if (!line.trim()) continue
    const [state, stateFips, countyFips, countyName, placeFips] = line.split('|')
    if (!stateFips || !placeFips || !countyFips) continue
    const placeKey = `${stateFips}${placeFips}`
    const entry = placeMap.get(placeKey) || []
    entry.push({ countyFips, countyName, stateFips })
    placeMap.set(placeKey, entry)
  }

  return placeMap
}

async function loadPlacePopulation(stateFips) {
  const url = `${DEC_PLACE_URL}${stateFips}${API_KEY ? `&key=${API_KEY}` : ''}`
  const data = await fetchJson(url)
  const [header, ...rows] = data
  const nameIdx = header.indexOf('NAME')
  const popIdx = header.indexOf('P1_001N')
  const placeIdx = header.indexOf('place')

  const result = new Map()
  for (const row of rows) {
    const placeFips = row[placeIdx]
    const placeKey = `${stateFips}${placeFips}`
    result.set(placeKey, {
      name: row[nameIdx],
      population: toNumber(row[popIdx]),
    })
  }
  return result
}

async function loadCountyPopulation(stateFips) {
  const url = `${DEC_COUNTY_URL}${stateFips}${API_KEY ? `&key=${API_KEY}` : ''}`
  const data = await fetchJson(url)
  const [header, ...rows] = data
  const nameIdx = header.indexOf('NAME')
  const popIdx = header.indexOf('P1_001N')
  const countyIdx = header.indexOf('county')

  const result = new Map()
  for (const row of rows) {
    const countyFips = row[countyIdx]
    const countyKey = `${stateFips}${countyFips}`
    result.set(countyKey, {
      name: row[nameIdx],
      population: toNumber(row[popIdx]),
    })
  }
  return result
}

async function loadGazetteer(stateFips) {
  ensureDir(RAW_DIR)
  const fileName = `2020_gaz_place_${stateFips}.txt`
  const filePath = path.join(RAW_DIR, fileName)
  await downloadIfMissing(`${GAZ_BASE_URL}/${fileName}`, filePath)

  const rl = readline.createInterface({ input: fs.createReadStream(filePath), crlfDelay: Infinity })
  let headers = []
  const places = new Map()

  for await (const line of rl) {
    if (!line.trim()) continue
    if (!headers.length) {
      headers = line.split('\t').map((header) => header.trim())
      continue
    }
    const cols = line.split('\t')
    const row = Object.fromEntries(
      headers.map((header, index) => [header, (cols[index] || '').trim()]),
    )
    const placeKey = `${stateFips}${row.GEOID.trim().slice(2)}`
    places.set(placeKey, {
      name: row.NAME,
      funcstat: row.FUNCSTAT,
      lat: toNumber(row.INTPTLAT),
      lon: toNumber(row.INTPTLONG),
    })
  }

  return places
}

async function loadCbpCounts(stateFips, naics) {
  ensureDir(RAW_DIR)
  const safeNaics = naics.replace(/[^a-zA-Z0-9]/g, '')
  const filePath = path.join(RAW_DIR, `cbp_${stateFips}_${safeNaics}.json`)

  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(await fsp.readFile(filePath, 'utf8'))
    } catch {
      await fsp.unlink(filePath)
    }
  }

  const url = `${CBP_BASE_URL}${stateFips}&NAICS2017=${encodeURIComponent(naics)}&LFO=001&EMPSZES=001${
    API_KEY ? `&key=${API_KEY}` : ''
  }`
  const data = await fetchJson(url)
  await fsp.writeFile(filePath, JSON.stringify(data), 'utf8')
  return data
}

function buildCbpMap(cbpData) {
  if (!Array.isArray(cbpData) || cbpData.length === 0) {
    return new Map()
  }
  const [header, ...rows] = cbpData
  if (!Array.isArray(header)) {
    return new Map()
  }
  const estabIdx = header.indexOf('ESTAB')
  const countyIdx = header.indexOf('county')
  const stateIdx = header.indexOf('state')
  const map = new Map()

  for (const row of rows) {
    const countyFips = row[countyIdx]
    const stateFips = row[stateIdx]
    const estabRaw = row[estabIdx]
    const estab = Number.isFinite(Number(estabRaw)) ? Number(estabRaw) : 0
    map.set(`${stateFips}${countyFips}`, estab)
  }
  return map
}

function selectPrimaryCounty(counties, countyPopMap) {
  if (!counties || counties.length === 0) return null
  let best = counties[0]
  let bestPop = 0

  for (const county of counties) {
    const key = `${county.stateFips}${county.countyFips}`
    const pop = countyPopMap.get(key)?.population || 0
    if (pop > bestPop) {
      bestPop = pop
      best = county
    }
  }

  return best
}

async function buildData() {
  ensureDir(DATA_DIR)
  ensureDir(RAW_DIR)

  const placeToCounty = await loadPlaceToCounty()

  const placePopMap = new Map()
  const countyPopMap = new Map()
  const gazMap = new Map()

  for (const state of STATES) {
    const [placePop, countyPop, gazPlaces] = await Promise.all([
      loadPlacePopulation(state.fips),
      loadCountyPopulation(state.fips),
      loadGazetteer(state.fips),
    ])

    placePop.forEach((value, key) => placePopMap.set(key, value))
    countyPop.forEach((value, key) => countyPopMap.set(key, value))
    gazPlaces.forEach((value, key) => gazMap.set(key, value))
  }

  const cities = []

  for (const [placeKey, placePop] of placePopMap.entries()) {
    const gaz = gazMap.get(placeKey)
    if (!gaz || gaz.funcstat !== 'A') continue
    if (placePop.population < 50000) continue

    const name = normalizePlaceName(gaz.name)
    if (!name || name.toLowerCase().includes('balance')) continue

    const stateFips = placeKey.slice(0, 2)
    const state = STATES.find((item) => item.fips === stateFips)
    if (!state) continue

    const counties = placeToCounty.get(placeKey)
    const primaryCounty = selectPrimaryCounty(counties, countyPopMap)
    if (!primaryCounty) continue

    const countyKey = `${primaryCounty.stateFips}${primaryCounty.countyFips}`
    const countyPop = countyPopMap.get(countyKey)
    if (!countyPop) continue

    const distance = haversineMiles(MONROE.lat, MONROE.lon, gaz.lat, gaz.lon)

    cities.push({
      placeKey,
      placeFips: placeKey.slice(2),
      stateFips,
      stateName: state.name,
      stateAbbr: state.abbr,
      city: name,
      population: placePop.population,
      countyName: primaryCounty.countyName,
      countyFips: primaryCounty.countyFips,
      countyPopulation: countyPop.population,
      lat: gaz.lat,
      lon: gaz.lon,
      distanceMiles: distance,
      pickupEligible: distance <= 100,
    })
  }

  const naicsList = [TOTAL_NAICS, COMPETITION_NAICS, ...INDUSTRIES.map((item) => item.naics)]
  const cbpMaps = new Map()

  for (const naics of naicsList) {
    const naicsMap = new Map()
    for (const state of STATES) {
      const cbpData = await loadCbpCounts(state.fips, naics)
      const map = buildCbpMap(cbpData)
      map.forEach((value, key) => naicsMap.set(key, value))
    }
    cbpMaps.set(naics, naicsMap)
  }

  const cityRecords = cities.map((city) => {
    const countyKey = `${city.stateFips}${city.countyFips}`
    const totalEstab = cbpMaps.get(TOTAL_NAICS)?.get(countyKey) || 0
    const competition = cbpMaps.get(COMPETITION_NAICS)?.get(countyKey) || 0
    const density = city.countyPopulation
      ? Number(((totalEstab / city.countyPopulation) * 1000).toFixed(2))
      : 0

    const industryCounts = {}
    for (const industry of INDUSTRIES) {
      industryCounts[industry.key] =
        cbpMaps.get(industry.naics)?.get(countyKey) || 0
    }

    return {
      ...city,
      slug: slugifyCity(city.city, city.stateAbbr),
      totalEstablishments: totalEstab,
      businessDensityScore: density,
      competitionCount: competition,
      industryCounts,
    }
  })

  let topCities = cityRecords
    .filter((city) => city.totalEstablishments > 0)
    .sort((a, b) => b.businessDensityScore - a.businessDensityScore)
    .slice(0, 200)

  const topSlugSet = new Set(topCities.map((city) => city.slug))
  const priorityCities = cityRecords.filter((city) => PRIORITY_SLUGS.includes(city.slug))
  for (const city of priorityCities) {
    if (!topSlugSet.has(city.slug)) {
      topCities.push(city)
      topSlugSet.add(city.slug)
    }
  }

  if (topCities.length > 200) {
    const prioritySet = new Set(PRIORITY_SLUGS)
    const priorityCitiesFinal = topCities.filter((city) => prioritySet.has(city.slug))
    const remainingSlots = Math.max(0, 200 - priorityCitiesFinal.length)
    const nonPriorityCities = topCities
      .filter((city) => !prioritySet.has(city.slug))
      .sort((a, b) => b.businessDensityScore - a.businessDensityScore)
      .slice(0, remainingSlots)

    topCities = [...priorityCitiesFinal, ...nonPriorityCities].sort(
      (a, b) => b.businessDensityScore - a.businessDensityScore,
    )
  }

  const citiesOutput = topCities.map((city) => ({
    slug: city.slug,
    city: city.city,
    state: city.stateName,
    stateAbbr: city.stateAbbr,
    stateFips: city.stateFips,
    placeFips: city.placeFips,
    population: city.population,
    countyName: city.countyName,
    countyFips: city.countyFips,
    countyPopulation: city.countyPopulation,
    lat: city.lat,
    lon: city.lon,
    distanceMiles: Number(city.distanceMiles.toFixed(1)),
    pickupEligible: city.pickupEligible,
    businessDensityScore: city.businessDensityScore,
    totalEstablishments: city.totalEstablishments,
  }))

  const countsOutput = {
    meta: {
      cbpYear: 2022,
      populationYear: 2020,
      source: 'Census County Business Patterns (CBP) and 2020 Decennial Census PL',
      naics: {
        total: TOTAL_NAICS,
        competition: COMPETITION_NAICS,
        industries: INDUSTRIES.reduce((acc, item) => {
          acc[item.key] = item.naics
          return acc
        }, {}),
      },
    },
    counts: Object.fromEntries(
      topCities.map((city) => [
        city.slug,
        {
          countyName: city.countyName,
          countyFips: city.countyFips,
          totalEstablishments: city.totalEstablishments,
          competitionCount: city.competitionCount,
          industryCounts: city.industryCounts,
        },
      ]),
    ),
  }

  await fsp.writeFile(path.join(DATA_DIR, 'cities.json'), JSON.stringify(citiesOutput, null, 2))
  await fsp.writeFile(
    path.join(DATA_DIR, 'industryCounts.json'),
    JSON.stringify(countsOutput, null, 2),
  )

  console.log(`Saved ${citiesOutput.length} cities to data/seo/cities.json`)
}

await buildData()
