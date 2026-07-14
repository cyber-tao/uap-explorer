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

export interface AgenciesPreviewConfig {
  sectionLabel: string
  /** Substring matchers against Agency.agency — single source is src/data/agencies.ts */
  previewAgencyMatchers: string[]
}

export interface FooterLink {
  text: string
  href: string
}

export interface FooterRouteLink {
  text: string
  to: string
}

export interface FooterScrollLink {
  text: string
  scrollTargetId: string
}

export interface FooterConfig {
  visionText: string
  brandName: string
  brandTagline: string
  sources: FooterLink[]
  archiveLinks: FooterLink[]
  homeNav: FooterScrollLink[]
  pageNav: FooterRouteLink[]
  legal: string[]
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
  previewAgencyMatchers: [
    "GEIPAN",
    "AARO",
    "NASA UAP",
    "PURSUE",
    "防卫省UAP",
  ],
}

export const footerConfig: FooterConfig = {
  visionText:
    'UAP是真实存在的物理现象，但截至2026年7月，全球没有任何国家公开独立验证过外星技术碎片。约2-5%的案例仍无法解释——这不是"是否真实"的问题，而是"是什么"的问题。',
  brandName: "UAP Explorer",
  brandTagline: "不明异常现象探索者",
  sources: [
    { text: "GEIPAN", href: "https://www.cnes-geipan.fr" },
    { text: "AARO", href: "https://www.aaro.mil" },
    { text: "NASA UAP", href: "https://science.nasa.gov/uap" },
    { text: "PURSUE", href: "https://www.war.gov/UFO" },
  ],
  archiveLinks: [
    { text: "巴西国家档案馆", href: "https://www.arquivo.gov.br" },
    { text: "英国国家档案馆", href: "https://www.nationalarchives.gov.uk" },
  ],
  homeNav: [
    { text: "首页", scrollTargetId: "hero-section" },
    { text: "物理特征", scrollTargetId: "observables" },
    { text: "重点事件", scrollTargetId: "gallery" },
    { text: "官方机构", scrollTargetId: "agencies-preview" },
  ],
  pageNav: [
    { text: "首页", to: "/" },
    { text: "事件时间线", to: "/timeline" },
    { text: "分析洞察", to: "/analysis" },
    { text: "官方机构", to: "/agencies" },
  ],
  legal: [
    "数据截至 2026-07-10",
    "置信度框架：High / Medium / Low / Speculative",
    "参考文献：300+独立信息源",
    "覆盖范围：全球22国/地区",
  ],
  copyright: "© 2026 UAP Explorer",
}
