import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { events } from './events'

const publicRoot = join(process.cwd(), 'public')

describe('event image integrity', () => {
  it('every event has a local cover file with unique bytes', () => {
    const hashes = new Map<string, string>()
    for (const event of events) {
      expect(event.image, `${event.id} missing image`).toMatch(/^\/images\/event-.+\.jpe?g$/i)
      const abs = join(publicRoot, event.image.replace(/^\//, ''))
      expect(existsSync(abs), `${event.id} missing file ${event.image}`).toBe(true)
      const buf = readFileSync(abs)
      expect(buf.length, `${event.id} empty cover`).toBeGreaterThan(5_000)
      const hash = createHash('sha256').update(buf).digest('hex')
      const prior = hashes.get(hash)
      expect(prior, `${event.id} shares cover hash with ${prior}`).toBeUndefined()
      hashes.set(hash, event.id)
    }
  })

  it('does not use ARCHIVAL ENTRY template cards as covers', () => {
    for (const event of events) {
      const abs = join(publicRoot, event.image.replace(/^\//, ''))
      const buf = readFileSync(abs)
      // Template cards store the phrase as readable ASCII in the JPEG payload
      // for our generated placeholders; keep this guard for regression.
      expect(buf.includes(Buffer.from('ARCHIVAL ENTRY')), `${event.id} archival card`).toBe(false)
    }
  })

  it('does not reuse media image URLs across events', () => {
    const urlToEvent = new Map<string, string>()
    for (const event of events) {
      for (const item of event.media ?? []) {
        if (item.type !== 'image') continue
        const prior = urlToEvent.get(item.url)
        expect(prior, `${event.id} shares media image with ${prior}: ${item.url}`).toBeUndefined()
        urlToEvent.set(item.url, event.id)
      }
    }
  })

  it('keeps DHS pilot media free of Indo-Pacific PR46 assets', () => {
    const dhs = events.find((e) => e.id === 'dhs-pilot-football-object-2024')
    expect(dhs).toBeTruthy()
    for (const item of dhs!.media ?? []) {
      expect(item.url).not.toMatch(/PR46|INDOPACOM-2024|DOW-UAP-PR46/i)
      expect(item.caption).not.toMatch(/PR46|INDOPACOM/i)
    }
  })

  it('keeps MQ-9 Hellfire and Gulf of Aden media image sets disjoint', () => {
    const mq9 = events.find((e) => e.id === 'mq-9-yemen-hellfire-2024')
    const gulf = events.find((e) => e.id === 'gulf-of-aden-uap-2024')
    expect(mq9 && gulf).toBeTruthy()
    const mq9Urls = new Set((mq9!.media ?? []).filter((m) => m.type === 'image').map((m) => m.url))
    for (const item of gulf!.media ?? []) {
      if (item.type !== 'image') continue
      expect(mq9Urls.has(item.url), `gulf reuses mq9 image ${item.url}`).toBe(false)
    }
  })
})
