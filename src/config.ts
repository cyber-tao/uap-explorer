export interface HeroConfig {
  wordmarkText: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  descriptionLine1: string
  descriptionLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface AgencyPreviewItem {
  cn: string
  en: string
  description: string
}

export interface AgenciesPreviewConfig {
  sectionLabel: string
  items: AgencyPreviewItem[]
}

export interface FooterEntry {
  text: string
  href?: string
  /** In-page section id — use instead of hash href under HashRouter */
  scrollTargetId?: string
}

export interface FooterColumn {
  heading: string
  entries: FooterEntry[]
}

export interface FooterConfig {
  visionText: string
  brandName: string
  columns: FooterColumn[]
  copyright: string
}

export const heroConfig: HeroConfig = {
  wordmarkText: "不明异常现象",
  eyebrow: "全球UAP/UFO深度研究报告 · 2026",
  titleLine1: "探索者",
  titleLine2: "",
  descriptionLine1: "基于全球22国、10个研究维度、",
  descriptionLine2: "300+独立信息源的科学评估",
  ctaText: "探索事件",
  ctaTargetId: "observables",
}

export const agenciesPreviewConfig: AgenciesPreviewConfig = {
  sectionLabel: "OFFICIAL AGENCIES / 官方机构",
  items: [
    {
      cn: "GEIPAN",
      en: "FRANCE CNES",
      description: "运行50年，3200+案例，全球首个科学调查UAP的官方机构。A/B/C/D四级分类系统被全球参考。",
    },
    {
      cn: "AARO",
      en: "USA DOD",
      description: "2022年成立，1600+案例审查，21起真正异常。美国历史上最大规模政府UAP调查。",
    },
    {
      cn: "NASA",
      en: "UAP STUDY",
      description: "2022年独立研究小组，科学数据收集方法论。专注于科学数据收集而非案例审查。",
    },
    {
      cn: "PURSUE",
      en: "2026 DECRYPT",
      description: "2026年5–7月四轮解密累计334份UAP档案；2026年7月10日Release 04新增40份（含STS-80、印太视频）。历史性透明度提升。",
    },
    {
      cn: "防卫省",
      en: "JAPAN MOD",
      description: "2020年建立军事报告程序，2024年跨党派调查团体。推动建立类似AARO的专门机构。",
    },
  ],
}

export const footerConfig: FooterConfig = {
  visionText: "UAP是真实存在的物理现象，但截至2026年7月，全球没有任何国家公开独立验证过外星技术碎片。约2-5%的案例仍无法解释——这不是\"是否真实\"的问题，而是\"是什么\"的问题。",
  brandName: "UAP Explorer",
  columns: [
    {
      heading: "SOURCES",
      entries: [
        { text: "GEIPAN", href: "https://www.cnes-geipan.fr" },
        { text: "AARO", href: "https://www.aaro.mil" },
        { text: "NASA UAP", href: "https://science.nasa.gov/uap" },
        { text: "PURSUE", href: "https://www.war.gov/UFO" },
      ],
    },
    {
      heading: "NAVIGATION",
      entries: [
        { text: "首页", scrollTargetId: "hero-section" },
        { text: "物理特征", scrollTargetId: "observables" },
        { text: "重点事件", scrollTargetId: "gallery" },
        { text: "官方机构", scrollTargetId: "agencies-preview" },
      ],
    },
    {
      heading: "LEGAL",
      entries: [
        { text: "数据截至 2026-07-10" },
        { text: "300+ 独立信息源" },
        { text: "22 国/地区覆盖" },
      ],
    },
  ],
  copyright: "© 2026 UAP Explorer",
}
