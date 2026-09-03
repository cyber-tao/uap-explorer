export interface AgenciesPreviewConfig {
  sectionLabel: string
  /** Substring matchers against Agency.agency — single source is src/data/agencies.ts */
  previewAgencyMatchers: string[]
}

export interface FooterLink {
  text: string
  href: string
}

export interface FooterConfig {
  sources: FooterLink[]
}

export const agenciesPreviewConfig: AgenciesPreviewConfig = {
  sectionLabel: "OFFICIAL AGENCIES / 官方机构",
  previewAgencyMatchers: [
    "GEIPAN",
    "AARO",
    "NASA UAP",
    "PURSUE",
    "跨党派",
  ],
}

export const footerConfig: FooterConfig = {
  sources: [
    { text: "GEIPAN", href: "https://www.cnes-geipan.fr" },
    { text: "AARO", href: "https://www.aaro.mil" },
    { text: "NASA UAP", href: "https://science.nasa.gov/uap" },
    { text: "PURSUE", href: "https://www.war.gov/UFO" },
  ],
}
