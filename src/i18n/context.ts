import { createContext, useContext } from 'react'
import type { Language, TranslationDictionary } from './types'
import { zh } from './locales/zh'
import { en } from './locales/en'

export const dictionaries: Record<Language, TranslationDictionary> = {
  zh,
  en,
}

export const STORAGE_KEY = 'uap_language'

export function detectSystemLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null
    if (saved && (saved === 'zh' || saved === 'en')) {
      return saved
    }
  } catch {
    // localStorage might be unavailable in restricted environments
  }

  const browserLangs =
    typeof navigator !== 'undefined'
      ? navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || '']
      : ['en']

  for (const lang of browserLangs) {
    if (!lang) continue
    const lower = lang.toLowerCase()
    if (lower.startsWith('zh')) return 'zh'
    if (lower.startsWith('en')) return 'en'
  }

  return 'en'
}

export interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  dict: TranslationDictionary
  t: (path: string, params?: Record<string, string | number>) => string
  getCharLabel: (char: string, fallback?: string) => string
  getConfidenceLabel: (level: string, fallback?: string) => string
  getRegionLabel: (region: string, fallback?: string) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider')
  }
  return context
}
