import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import type { Language } from './types'
import {
  LanguageContext,
  type LanguageContextValue,
  dictionaries,
  detectSystemLanguage,
  STORAGE_KEY,
} from './context'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => detectSystemLanguage())

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch {
      // localStorage might be unavailable
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const dict = useMemo(() => dictionaries[language] || dictionaries.en, [language])

  const t = useCallback(
    (path: string, params?: Record<string, string | number>): string => {
      const keys = path.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = dict
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let fallback: any = dictionaries.en
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = fallback[fk]
            } else {
              return path
            }
          }
          value = fallback
          break
        }
      }

      if (typeof value === 'string') {
        if (params) {
          return value.replace(/\{(\w+)\}/g, (_, key) =>
            key in params ? String(params[key]) : `{${key}}`
          )
        }
        return value
      }

      return path
    },
    [dict]
  )

  const getCharLabel = useCallback(
    (char: string, fallback?: string): string => {
      return (
        dict.characteristics?.[char] ||
        dictionaries.en.characteristics?.[char] ||
        fallback ||
        char
      )
    },
    [dict]
  )

  const getConfidenceLabel = useCallback(
    (level: string, fallback?: string): string => {
      switch (level) {
        case 'High':
          return dict.timeline.confidenceHigh
        case 'Medium':
          return dict.timeline.confidenceMedium
        case 'Low':
          return dict.timeline.confidenceLow
        case 'Speculative':
          return dict.timeline.confidenceSpeculative
        default:
          return fallback || level
      }
    },
    [dict]
  )

  const getRegionLabel = useCallback(
    (region: string, fallback?: string): string => {
      return dict.regions?.[region] || dictionaries.en.regions?.[region] || fallback || region
    },
    [dict]
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dict,
      t,
      getCharLabel,
      getConfidenceLabel,
      getRegionLabel,
    }),
    [language, setLanguage, dict, t, getCharLabel, getConfidenceLabel, getRegionLabel]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
