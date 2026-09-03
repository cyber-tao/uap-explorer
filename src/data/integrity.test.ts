import { describe, expect, it } from 'vitest'
import { events, getEventById, physicalCharLabels, searchEvents } from './events'
import { observables } from './analysis'
import { featuredEventIds } from './featured'
import { agencies } from './agencies'
import { agenciesPreviewConfig } from '../config'

const eventIds = new Set(events.map((e) => e.id))

describe('event data integrity', () => {
  it('has unique event ids', () => {
    expect(eventIds.size).toBe(events.length)
  })

  it('resolves every relatedEvents id', () => {
    for (const event of events) {
      for (const relatedId of event.relatedEvents ?? []) {
        expect(eventIds.has(relatedId), `${event.id} → related ${relatedId}`).toBe(true)
      }
    }
  })

  it('uses only known physicalCharacteristics slugs', () => {
    for (const event of events) {
      for (const char of event.physicalCharacteristics) {
        expect(char in physicalCharLabels, `${event.id} unknown char ${char}`).toBe(true)
      }
    }
  })

  it('resolves featuredEventIds', () => {
    for (const id of featuredEventIds) {
      expect(eventIds.has(id), `featured missing ${id}`).toBe(true)
    }
  })

  it('resolves observable eventIds', () => {
    for (const obs of observables) {
      for (const id of obs.eventIds) {
        expect(eventIds.has(id), `${obs.id} → ${id}`).toBe(true)
      }
    }
  })

  it('getEventById returns known events and undefined for missing', () => {
    expect(getEventById('nimitz-tic-tac')?.id).toBe('nimitz-tic-tac')
    expect(getEventById('malmstrom-icbm')?.id).toBe('malmstrom-icbm')
    expect(getEventById('does-not-exist')).toBeUndefined()
  })

  it('searchEvents matches name or location', () => {
    const hits = searchEvents('Nimitz')
    expect(hits.some((e) => e.id === 'nimitz-tic-tac')).toBe(true)
    expect(searchEvents('zzzz-no-match-zzzz')).toHaveLength(0)
  })

  it('requires 3–6 local figures per event', () => {
    for (const event of events) {
      expect(event.figures?.length, `${event.id} figures`).toBeGreaterThanOrEqual(3)
      expect(event.figures.length, `${event.id} figures`).toBeLessThanOrEqual(6)
      expect(event.image.startsWith('/images/'), `${event.id} cover`).toBe(true)
      for (const fig of event.figures) {
        expect(fig.src.startsWith('/images/'), `${event.id} → ${fig.src}`).toBe(true)
        expect(fig.caption.length, `${event.id} caption`).toBeGreaterThan(0)
      }
    }
  })

  it('keeps media as video-only when present', () => {
    for (const event of events) {
      for (const item of event.media ?? []) {
        expect(item.type, `${event.id} media type`).toBe('video')
      }
    }
  })

  it('provides valid English mapsQuery for all events', () => {
    for (const event of events) {
      expect(event.mapsQuery, `${event.id} mapsQuery`).toBeTruthy()
      expect(event.locationEn, `${event.id} locationEn`).toBeTruthy()
      // Ensure mapsQuery is in printable ASCII / Latin format for Google Maps
      expect(/^[\x20-\x7E\u00C0-\u024F]+$/.test(event.mapsQuery!), `${event.id} mapsQuery English`).toBe(true)
    }
  })

  it('provides valid geographic coordinates for all events', () => {
    for (const event of events) {
      expect(event.coordinates, `${event.id} coordinates defined`).toBeDefined()
      expect(event.coordinates?.length, `${event.id} coordinates length`).toBe(2)
      const [lng, lat] = event.coordinates!
      expect(typeof lng).toBe('number')
      expect(typeof lat).toBe('number')
      expect(lng).toBeGreaterThanOrEqual(-180)
      expect(lng).toBeLessThanOrEqual(180)
      expect(lat).toBeGreaterThanOrEqual(-90)
      expect(lat).toBeLessThanOrEqual(90)
    }
  })

  it('resolves every agencies preview matcher to at least one agency', () => {
    for (const matcher of agenciesPreviewConfig.previewAgencyMatchers) {
      const match = agencies.some((a) => a.agency.includes(matcher))
      expect(match, `agency preview matcher "${matcher}" did not match any agency in agencies.ts`).toBe(true)
    }
  })
})
