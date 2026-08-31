import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { zh } from './locales/zh'
import { en } from './locales/en'
import { SUPPORTED_LANGUAGES } from './types'

function getNestedPaths(obj: object, prefix = ''): string[] {
  let paths: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      paths = paths.concat(getNestedPaths(value, fullKey))
    } else {
      paths.push(fullKey)
    }
  }
  return paths
}

function getValueByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined), obj)
}

function getAllSourceFiles(dir: string): string[] {
  let results: string[] = []
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      results = results.concat(getAllSourceFiles(fullPath))
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath)
    }
  }
  return results
}

describe('i18n dictionaries integrity', () => {
  const locales = { zh, en }

  it('supports Chinese and English languages', () => {
    expect(SUPPORTED_LANGUAGES.map((l) => l.code)).toEqual(['zh', 'en'])
  })

  it('has identical recursive key structure in all locales', () => {
    const zhPaths = getNestedPaths(zh).sort()
    const enPaths = getNestedPaths(en).sort()
    expect(enPaths).toEqual(zhPaths)
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

  it('has all highlightCards, methodologyRows, confidenceTiers and archiveLinks populated', () => {
    for (const [code, dict] of Object.entries(locales)) {
      expect(dict.analysis.confidenceTiers.length, `confidenceTiers in ${code}`).toBe(4)
      expect(dict.agenciesPage.highlightCards.length, `highlightCards in ${code}`).toBe(3)
      expect(dict.agenciesPage.methodologyRows.length, `methodologyRows in ${code}`).toBe(7)
      expect(dict.agenciesPage.methodologyDimension, `methodologyDimension in ${code}`).toBeTruthy()
      expect(dict.footer.archiveLinks.length, `archiveLinks in ${code}`).toBeGreaterThan(0)
    }
  })

  it('has valid translations for all t() calls used in source files', () => {
    const srcDir = join(__dirname, '..')
    const files = getAllSourceFiles(srcDir).filter((f) => !f.endsWith('.test.ts'))
    const tRegex = /\bt\(\s*['"]([^'"]+)['"]/g
    const missingKeys: string[] = []

    for (const file of files) {
      const content = readFileSync(file, 'utf8')
      let match: RegExpExecArray | null
      while ((match = tRegex.exec(content)) !== null) {
        const key = match[1]
        for (const [code, dict] of Object.entries(locales)) {
          const val = getValueByPath(dict, key)
          if (val === undefined || typeof val !== 'string') {
            missingKeys.push(`[${code}] Key "${key}" in ${file}`)
          }
        }
      }
    }

    expect(missingKeys).toEqual([])
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
