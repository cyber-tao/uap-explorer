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
      expect(buf.includes(Buffer.from('ARCHIVAL ENTRY')), `${event.id} archival card`).toBe(false)
    }
  })

  it('does not reuse local figure src paths across events', () => {
    const srcToEvent = new Map<string, string>()
    for (const event of events) {
      for (const fig of event.figures ?? []) {
        const prior = srcToEvent.get(fig.src)
        expect(prior, `${event.id} shares figure src with ${prior}: ${fig.src}`).toBeUndefined()
        srcToEvent.set(fig.src, event.id)
      }
    }
  })

  it('keeps DHS pilot figures/media free of Indo-Pacific PR46 assets', () => {
    const dhs = events.find((e) => e.id === 'dhs-pilot-football-object-2024')
    expect(dhs).toBeTruthy()
    for (const fig of dhs!.figures ?? []) {
      expect(fig.src).not.toMatch(/PR46|INDOPACOM-2024|DOW-UAP-PR46/i)
      expect(fig.caption).not.toMatch(/PR46|INDOPACOM/i)
      expect(fig.sourceUrl ?? '').not.toMatch(/PR46|INDOPACOM-2024|DOW-UAP-PR46/i)
    }
    for (const item of dhs!.media ?? []) {
      expect(item.url).not.toMatch(/PR46|INDOPACOM-2024|DOW-UAP-PR46/i)
      expect(item.caption).not.toMatch(/PR46|INDOPACOM/i)
    }
  })

  it('keeps media video-only and MQ-9 / Gulf of Aden video sets may overlap only with distinct captions handled in data', () => {
    for (const event of events) {
      for (const item of event.media ?? []) {
        expect(item.type, `${event.id} media type`).toBe('video')
      }
    }
  })
})
