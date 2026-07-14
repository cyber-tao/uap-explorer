#!/usr/bin/env node
/**
 * Audit event cover files and media image URLs for uniqueness / archival placeholders.
 * Usage: node scripts/audit-event-images.mjs
 */
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(root, 'src/data/events.ts'), 'utf8')
const starts = [...src.matchAll(/^\s+id:\s*'([^']+)'/gm)]

const events = []
for (let i = 0; i < starts.length; i++) {
  const id = starts[i][1]
  const block = src.slice(starts[i].index, i + 1 < starts.length ? starts[i + 1].index : src.length)
  const image = (block.match(/image:\s*'([^']+)'/) || [])[1]
  const mediaImages = [...block.matchAll(/\{ type: 'image',\s*url: '([^']+)'/g)].map((m) => m[1])
  events.push({ id, image, mediaImages })
}

const issues = []
const pathToEvents = new Map()
const hashToFiles = new Map()
const urlToEvents = new Map()

for (const e of events) {
  if (!e.image) {
    issues.push(`MISSING_IMAGE_FIELD ${e.id}`)
    continue
  }
  ;(pathToEvents.get(e.image) || pathToEvents.set(e.image, []).get(e.image)).push(e.id)
  const local = join(root, 'public', e.image.replace(/^\//, ''))
  if (!existsSync(local)) {
    issues.push(`MISSING_FILE ${e.id} ${e.image}`)
    continue
  }
  const buf = readFileSync(local)
  const hash = createHash('sha256').update(buf).digest('hex')
  ;(hashToFiles.get(hash) || hashToFiles.set(hash, []).get(hash)).push({ id: e.id, file: e.image, size: buf.length })
  if (buf.includes(Buffer.from('ARCHIVAL ENTRY'))) {
    issues.push(`ARCHIVAL_PLACEHOLDER ${e.id} ${e.image}`)
  }
  for (const url of e.mediaImages) {
    ;(urlToEvents.get(url) || urlToEvents.set(url, []).get(url)).push(e.id)
  }
}

for (const [path, ids] of pathToEvents) {
  if (ids.length > 1) issues.push(`SHARED_PATH ${path} <- ${ids.join(', ')}`)
}
for (const [hash, files] of hashToFiles) {
  if (files.length > 1) issues.push(`SHARED_HASH ${hash.slice(0, 16)} <- ${files.map((f) => f.id).join(', ')}`)
}
for (const [url, ids] of urlToEvents) {
  const unique = [...new Set(ids)]
  if (unique.length > 1) issues.push(`SHARED_MEDIA_IMAGE ${unique.join(', ')} | ${url.slice(0, 120)}`)
}

const dhs = events.find((e) => e.id === 'dhs-pilot-football-object-2024')
if (dhs) {
  for (const url of dhs.mediaImages) {
    if (/PR46|INDOPACOM-2024|DOW-UAP-PR46/i.test(url)) {
      issues.push(`DHS_PR46_LEAK ${url.slice(0, 120)}`)
    }
  }
}

console.log(`events=${events.length}`)
console.log(`issues=${issues.length}`)
for (const i of issues) console.log(`- ${i}`)
process.exit(issues.length ? 1 : 0)
