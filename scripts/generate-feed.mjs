import fs from 'node:fs'
import path from 'node:path'
import { buildMerchantFeedXml, getMerchantFeedItems } from '../lib/feed/merchant.mjs'

const outputPath = path.join(process.cwd(), 'public', 'feed.xml')

fs.writeFileSync(outputPath, buildMerchantFeedXml(), 'utf8')
console.log(`Generated public/feed.xml with ${getMerchantFeedItems().length} items.`)
