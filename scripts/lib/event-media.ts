import { readdirSync, readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export interface MediaCandidate {
  eventId: string
  url: string
  caption: string
  source: 'events.ts' | 'research'
}

export interface ParsedEventMedia {
  id: string
  name: string
  image: string
  images: Array<{ url: string; caption: string }>
  videos: Array<{ url: string; caption: string }>
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')

export function rootPath(...parts: string[]) {
  return join(ROOT, ...parts)
}

export function parseEventsFile(filePath = rootPath('src/data/events.ts')): ParsedEventMedia[] {
  const text = readFileSync(filePath, 'utf8')
  const events: ParsedEventMedia[] = []
  const idRe = /\bid:\s*'([^']+)'/g
  const matches = [...text.matchAll(idRe)]

  for (let i = 0; i < matches.length; i++) {
    const id = matches[i][1]
    // Skip non-event ids inside physicalCharLabels etc. — only take ids inside events array
    const start = matches[i].index!
    const end = i + 1 < matches.length ? matches[i + 1].index! : text.length
    const block = text.slice(start, end)

    // Event blocks always have sortDate nearby
    if (!/\bsortDate:\s*'/.test(block) || !/\bimage:\s*'/.test(block)) continue

    const name = block.match(/\bname:\s*'((?:\\'|[^'])*)'/)?.[1] ?? id
    const image = block.match(/\bimage:\s*'([^']+)'/)?.[1] ?? ''
    const mediaMatch = block.match(/\bmedia:\s*\[([\s\S]*?)\]\s*,?\s*(?:limitations|relatedEvents|figures|sources)/)
      ?? block.match(/\bmedia:\s*\[([\s\S]*?)\]/)

    const images: Array<{ url: string; caption: string }> = []
    const videos: Array<{ url: string; caption: string }> = []

    if (mediaMatch) {
      const itemRe =
        /\{\s*type:\s*'(image|video)'\s*,\s*url:\s*'((?:\\'|[^'])*)'\s*,\s*caption:\s*'((?:\\'|[^'])*)'\s*\}/g
      let m: RegExpExecArray | null
      while ((m = itemRe.exec(mediaMatch[1]))) {
        const item = { url: m[2].replace(/\\'/g, "'"), caption: m[3].replace(/\\'/g, "'") }
        if (m[1] === 'image') images.push(item)
        else videos.push(item)
      }
    }

    events.push({ id, name, image, images, videos })
  }

  return events
}

export function collectResearchCandidates(): MediaCandidate[] {
  const dir = rootPath('research/raw')
  if (!existsSync(dir)) return []
  const out: MediaCandidate[] = []
  for (const file of readdirSync(dir)) {
    if (!file.startsWith('media_') || !file.endsWith('.json')) continue
    try {
      const data = JSON.parse(readFileSync(join(dir, file), 'utf8')) as {
        eventId?: string
        media?: Array<{ type?: string; url?: string; caption?: string }>
      }
      if (!data.eventId || !Array.isArray(data.media)) continue
      for (const item of data.media) {
        if (item.type === 'image' && item.url) {
          out.push({
            eventId: data.eventId,
            url: item.url,
            caption: item.caption || 'Research archive image',
            source: 'research',
          })
        }
      }
    } catch {
      // ignore malformed research files
    }
  }
  return out
}

export function collectCandidates(events: ParsedEventMedia[]): MediaCandidate[] {
  const out: MediaCandidate[] = []
  for (const ev of events) {
    for (const img of ev.images) {
      out.push({ eventId: ev.id, url: img.url, caption: img.caption, source: 'events.ts' })
    }
  }
  out.push(...collectResearchCandidates())
  return out
}

export function looksLikeDirectImageUrl(url: string): boolean {
  if (!/^https?:\/\//i.test(url)) return false
  const path = url.split('?')[0].toLowerCase()
  if (/\.(jpe?g|png|gif|webp|avif|bmp|tif{1,2})$/.test(path)) return true
  // known CDN image endpoints without extension
  if (
    /gannett-cdn\.com|s\.yimg\.com|nimg\.ws\.126\.net|upload\.wikimedia\.org|images\.squarespace-cdn\.com|ufofiles\.app|theufodatabase\.com|cdn\d*\.img\.|wp-content\/uploads|nicap\.org|blackvault\.com/i.test(
      url,
    )
  ) {
    return true
  }
  return false
}

export function extFromContentType(ct: string | null, url: string): string {
  const lower = (ct || '').toLowerCase()
  if (lower.includes('png')) return 'png'
  if (lower.includes('webp')) return 'webp'
  if (lower.includes('gif')) return 'gif'
  if (lower.includes('jpeg') || lower.includes('jpg')) return 'jpg'
  const path = url.split('?')[0].toLowerCase()
  const m = path.match(/\.(jpe?g|png|gif|webp)$/)
  if (m) return m[1] === 'jpeg' ? 'jpg' : m[1]
  return 'jpg'
}

export function escapeTsString(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function formatFiguresTs(
  figures: Array<{ src: string; caption: string; credit?: string; sourceUrl?: string; layout?: string }>,
): string {
  const lines = figures.map((f, i) => {
    const layout = f.layout ?? (i === 0 ? 'full' : i < 3 ? 'pair' : 'inset')
    const parts = [
      `src: '${escapeTsString(f.src)}'`,
      `caption: '${escapeTsString(f.caption)}'`,
    ]
    if (f.credit) parts.push(`credit: '${escapeTsString(f.credit)}'`)
    if (f.sourceUrl) parts.push(`sourceUrl: '${escapeTsString(f.sourceUrl)}'`)
    parts.push(`layout: '${layout}'`)
    return `      { ${parts.join(', ')} }`
  })
  return `figures: [\n${lines.join(',\n')},\n    ]`
}

export function formatVideosTs(videos: Array<{ url: string; caption: string }>): string {
  if (videos.length === 0) return ''
  const lines = videos.map(
    (v) =>
      `      { type: 'video', url: '${escapeTsString(v.url)}', caption: '${escapeTsString(v.caption)}' }`,
  )
  return `media: [\n${lines.join(',\n')},\n    ]`
}
