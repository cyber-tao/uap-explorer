/** Homepage featured event IDs — single source for ImmersiveGallery */
export const featuredEventIds = [
  'nimitz-tic-tac',
  'sts-80-columbia-1996',
  'yellow-sea-six-pointed-star-2025',
  'jal-1628',
  'belgium-ufo-wave',
  'xiaoshan-airport',
] as const

export type FeaturedEventId = (typeof featuredEventIds)[number]
