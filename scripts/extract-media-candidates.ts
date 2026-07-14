/**
 * Extract image candidates from events.ts + research/raw/media_*.json
 * Writes research/raw/media-candidates.json
 */
import { writeFileSync, mkdirSync } from 'fs'
import {
  parseEventsFile,
  collectCandidates,
  looksLikeDirectImageUrl,
  rootPath,
} from './lib/event-media'

const events = parseEventsFile()
const candidates = collectCandidates(events)

const byEvent = new Map<string, typeof candidates>()
for (const c of candidates) {
  const list = byEvent.get(c.eventId) ?? []
  list.push(c)
  byEvent.set(c.eventId, list)
}

const summary = {
  generatedAt: new Date().toISOString(),
  eventCount: events.length,
  candidateCount: candidates.length,
  directLikely: candidates.filter((c) => looksLikeDirectImageUrl(c.url)).length,
  events: events.map((ev) => ({
    id: ev.id,
    cover: ev.image,
    imageCandidates: (byEvent.get(ev.id) ?? []).length,
    videoCount: ev.videos.length,
    candidates: byEvent.get(ev.id) ?? [],
  })),
}

const outPath = rootPath('research/raw/media-candidates.json')
mkdirSync(rootPath('research/raw'), { recursive: true })
writeFileSync(outPath, JSON.stringify(summary, null, 2), 'utf8')
console.log(`Wrote ${candidates.length} candidates for ${events.length} events → ${outPath}`)
