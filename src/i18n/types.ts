export type Language = 'zh' | 'en'

export interface LanguageOption {
  code: Language
  label: string
  nativeLabel: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'zh', label: '中文', nativeLabel: '简体中文' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
]

export interface TranslationDictionary {
  nav: {
    home: string
    timeline: string
    hotspots: string
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
    confidenceTiers: Array<{
      level: 'High' | 'Medium' | 'Low' | 'Speculative'
      pct: string
      criteria: string
      example: string
      color: string
    }>
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
    milestoneTransparency: string
    milestoneInstitution: string
    milestoneReport: string
    methodologyTitle: string
    methodologyDimension: string
    visitOfficial: string
    highlightCards: Array<{
      tag: string
      tagColor: string
      title: string
      stats: string
      desc: string
      link: string
      linkLabel: string
    }>
    methodologyRows: string[][]
  }
  footer: {
    visionText: string
    brandName: string
    brandTagline: string
    sourcesTitle: string
    navTitle: string
    legalTitle: string
    archiveLinks: Array<{ text: string; href: string }>
    homeNav: {
      home: string
      observables: string
      gallery: string
      agencies: string
    }
    pageNav: {
      home: string
      timeline: string
      hotspots: string
      analysis: string
      agencies: string
    }
    legal: string[]
    copyright: string
  }
  hotspots: {
    eyebrow: string
    title: string
    subtitle: string
    statsIncidents: string
    statsCorridors: string
    statsDeclassified: string
    layerModeLabel: string
    layerHeatmap: string
    layerTactical: string
    layerHybrid: string
    regionFilterLabel: string
    confidenceFilterLabel: string
    characteristicFilterLabel: string
    yearFilterLabel: string
    allYears: string
    resetZoom: string
    zoomIn: string
    zoomOut: string
    fitBounds: string
    fullscreen: string
    exitFullscreen: string
    clusterLabel: string
    drawerTitle: string
    drawerCoordinates: string
    drawerDate: string
    drawerLocation: string
    drawerConfidence: string
    drawerSensors: string
    drawerCharacteristics: string
    viewFullDossier: string
    corridorsTitle: string
    corridorsSubtitle: string
    activeFilterCount: string
    clearFilters: string
    noEventsMatch: string
    radarSweep: string
    legendHigh: string
    legendMedium: string
    legendLow: string
    legendSpeculative: string
    legendCluster: string
    legendHeatmap: string
    orbitalEventNote: string
    quickJump: string
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
    reload: string
  }
  regions: Record<string, string>
  characteristics: Record<string, string>
}
