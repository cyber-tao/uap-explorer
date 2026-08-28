export type Language = 'zh' | 'en' | 'ja' | 'fr'

export interface LanguageOption {
  code: Language
  label: string
  nativeName: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'zh', label: '中文', nativeName: '简体中文' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
]

export interface TranslationDictionary {
  nav: {
    home: string
    timeline: string
    analysis: string
    agencies: string
    search: string
    searchAll: string
    language: string
  }
  hero: {
    wordmarkText: string
    eyebrow: string
    titleLine1: string
    titleLine2: string
    descriptionLine1: string
    descriptionLine2: string
    ctaText: string
  }
  observablesSection: {
    eyebrow: string
    title: string
    body: string
  }
  observables: Record<string, {
    title: string
    cnShort: string
    metric: string
    metricLabel: string
    consistency: string
    description: string
    homeDescription: string
  }>
  gallery: {
    eyebrow: string
    title: string
    description: string
    viewDetails: string
    browseAll: string
  }
  agenciesPreview: {
    sectionLabel: string
    viewAll: string
  }
  timeline: {
    eyebrow: string
    title: string
    description: string
    searchPlaceholder: string
    allConfidence: string
    allRegions: string
    allCharacteristics: string
    reset: string
    resetAll: string
    sortByConfidence: string
    sortByDate: string
    totalEvents: string
    noMatching: string
    noMatchingHint: string
    confidenceHigh: string
    confidenceMedium: string
    confidenceLow: string
    confidenceSpeculative: string
    gridMode: string
    timelineMode: string
  }
  eventDetail: {
    back: string
    backToTimeline: string
    notFound: string
    overview: string
    description: string
    figures: string
    figuresInserted: string
    characteristics: string
    limitations: string
    videos: string
    sources: string
    relatedEvents: string
    fastNav: string
    copyLink: string
    copied: string
    playVideo: string
    viewOnMap: string
    sourceOriginal: string
    sensors: string
    visualWitness: string
    date: string
    location: string
    confidence: string
  }
  analysis: {
    eyebrow: string
    title: string
    subtitle: string
    section1Number: string
    section1Title: string
    section2Number: string
    section2Title: string
    section3Number: string
    section3Title: string
    section3Subtitle: string
    section4Number: string
    section4Title: string
    section5Number: string
    section5Title: string
    consistencyLabel: string
    relatedEventsLabel: string
    hypothesesTable: {
      hypothesis: string
      physicalModel: string
      supportingEvidence: string
      opposingEvidence: string
      credibility: string
    }
    impactLabel: string
    recommendationLabel: string
  }
  agenciesPage: {
    eyebrow: string
    title: string
    subtitle: string
    tableHeaders: {
      country: string
      agency: string
      established: string
      cases: string
      transparency: string
      methodology: string
      unexplainedRate: string
      officialLink: string
    }
    highlightsTitle: string
    milestonesTitle: string
    methodologyTitle: string
    visitOfficial: string
  }
  footer: {
    visionText: string
    brandName: string
    brandTagline: string
    sourcesTitle: string
    navTitle: string
    legalTitle: string
    homeNav: {
      home: string
      observables: string
      gallery: string
      agencies: string
    }
    pageNav: {
      home: string
      timeline: string
      analysis: string
      agencies: string
    }
    legal: string[]
    copyright: string
  }
  bgm: {
    play: string
    pause: string
    buttonText: string
  }
  sourceCategories: {
    official: string
    media: string
    academic: string
    other: string
  }
  lightbox: {
    close: string
    prev: string
    next: string
    originalSource: string
  }
  errorBoundary: {
    title: string
    description: string
    backHome: string
  }
  regions: Record<string, string>
  characteristics: Record<string, string>
}
