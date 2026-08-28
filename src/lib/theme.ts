/** Design tokens — mirror CSS `--uap-*` in src/index.css */
export const theme = {
  base: '#050A0F',
  surface: '#0A1117',
  elevated: '#0F1923',
  ivory: '#EDE8E4',
  muted: '#8A99A8',
  cyan: '#30B0D0',
  amber: '#F5A623',
  high: '#00D9A5',
  medium: '#F5A623',
  low: '#FF6B35',
  speculative: '#B8B8B8',
  nuclear: '#FF2E63',
} as const

export type ThemeColor = keyof typeof theme
