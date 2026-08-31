import { describe, it, expect } from 'vitest'
import { zh } from './locales/zh'
import { en } from './locales/en'
import { SUPPORTED_LANGUAGES } from './types'

describe('i18n dictionaries integrity', () => {
  const locales = { zh, en }

  it('supports Chinese and English languages', () => {
    expect(SUPPORTED_LANGUAGES.map((l) => l.code)).toEqual(['zh', 'en'])
  })

  it('has identical top-level structure in all locales', () => {
    const zhKeys = Object.keys(zh).sort()
    for (const [code, dict] of Object.entries(locales)) {
      expect(Object.keys(dict).sort(), `Mismatch in ${code}`).toEqual(zhKeys)
    }
  })

  it('has all nav links translated in all locales', () => {
    const zhNavKeys = Object.keys(zh.nav).sort()
    for (const [code, dict] of Object.entries(locales)) {
      expect(Object.keys(dict.nav).sort(), `Nav mismatch in ${code}`).toEqual(zhNavKeys)
    }
  })

  it('has all 5 observables translated in all locales', () => {
    const obsKeys = ['instantaneous-acceleration', 'low-observability', 'transmedium', 'anti-gravity', 'multi-sensor']
    for (const [code, dict] of Object.entries(locales)) {
      expect(Object.keys(dict.observables).sort(), `Observables keys in ${code}`).toEqual(obsKeys.sort())
      for (const key of obsKeys) {
        expect(dict.observables[key].title, `Observable ${key} title in ${code}`).toBeTruthy()
        expect(dict.observables[key].description, `Observable ${key} description in ${code}`).toBeTruthy()
        expect(dict.observables[key].homeDescription, `Observable ${key} homeDescription in ${code}`).toBeTruthy()
      }
    }
  })

  it('has all region mappings translated in all locales', () => {
    const zhRegions = Object.keys(zh.regions).sort()
    for (const [code, dict] of Object.entries(locales)) {
      expect(Object.keys(dict.regions).sort(), `Regions mismatch in ${code}`).toEqual(zhRegions)
    }
  })

  it('has complete English translations for all event media and telemetry', async () => {
    const { events } = await import('../data/events')
    for (const ev of events) {
      expect(ev.nameEn, `Event ${ev.id} nameEn`).toBeTruthy()
      expect(ev.countryEn, `Event ${ev.id} countryEn`).toBeTruthy()
      expect(ev.locationEn, `Event ${ev.id} locationEn`).toBeTruthy()
      expect(ev.shortDescEn, `Event ${ev.id} shortDescEn`).toBeTruthy()
      expect(ev.descriptionEn, `Event ${ev.id} descriptionEn`).toBeTruthy()
      expect(ev.limitationsEn?.length, `Event ${ev.id} limitationsEn`).toBeGreaterThan(0)
      expect(ev.sensorsEn?.length, `Event ${ev.id} sensorsEn`).toBeGreaterThan(0)

      for (const fig of ev.figures) {
        expect(fig.captionEn, `Figure captionEn in ${ev.id}`).toBeTruthy()
      }

      for (const m of ev.media || []) {
        expect(m.captionEn, `Media captionEn in ${ev.id}`).toBeTruthy()
      }
    }
  })
})
