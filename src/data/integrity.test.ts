import { describe, expect, it } from 'vitest'
import { events, getEventById, physicalCharLabels, searchEvents } from './events'
import { observables } from './analysis'
import { featuredEventIds } from './featured'

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
})
