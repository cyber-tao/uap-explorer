/**
 * Apply research/raw/figures-manifest.json into src/data/events.ts:
 * - inject/replace figures[]
 * - keep only video entries in media[]
 */
import { readFileSync, writeFileSync } from 'fs'
import { parseEventsFile, rootPath, escapeTsString } from './lib/event-media'

interface ManifestFigure {
  src: string
  caption: string
  credit?: string
  sourceUrl?: string
  layout?: string
}

interface Manifest {
  events: Record<string, ManifestFigure[]>
}

function formatFiguresBlock(figures: ManifestFigure[], indent: string): string {
  const lines = figures.map((f, i) => {
    const layout = f.layout ?? (i === 0 ? 'full' : i < 3 ? 'pair' : 'inset')
    const parts = [
      `src: '${escapeTsString(f.src)}'`,
      `caption: '${escapeTsString(f.caption)}'`,
    ]
    if (f.credit) parts.push(`credit: '${escapeTsString(f.credit)}'`)
    if (f.sourceUrl) parts.push(`sourceUrl: '${escapeTsString(f.sourceUrl)}'`)
    parts.push(`layout: '${layout}'`)
    return `${indent}  { ${parts.join(', ')} },`
  })
  return `${indent}figures: [\n${lines.join('\n')}\n${indent}],`
}

function formatVideosBlock(
  videos: Array<{ url: string; caption: string }>,
  indent: string,
): string {
  if (videos.length === 0) return ''
  const lines = videos.map(
    (v) =>
      `${indent}  { type: 'video', url: '${escapeTsString(v.url)}', caption: '${escapeTsString(v.caption)}' },`,
  )
  return `${indent}media: [\n${lines.join('\n')}\n${indent}],`
}

/** Remove a top-level array property `name: [ ... ],` with nested brackets. */
function stripArrayProp(block: string, name: string): string {
  const startRe = new RegExp(`\\n\\s*${name}:\\s*\\[`)
  const start = block.search(startRe)
  if (start < 0) return block
  const openIdx = block.indexOf('[', start)
  let depth = 0
  for (let i = openIdx; i < block.length; i++) {
    const ch = block[i]
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) {
        let end = i + 1
        if (block[end] === ',') end++
        return block.slice(0, start) + block.slice(end)
      }
    }
  }
  return block
}

function main() {
  const manifestPath = rootPath('research/raw/figures-manifest.json')
  const eventsPath = rootPath('src/data/events.ts')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest
  const parsed = parseEventsFile(eventsPath)
  let text = readFileSync(eventsPath, 'utf8')

  for (const ev of parsed) {
    const figures = manifest.events[ev.id]
    if (!figures?.length) {
      console.warn(`No figures in manifest for ${ev.id}`)
      continue
    }

    const idToken = `id: '${ev.id}'`
    const idIdx = text.indexOf(idToken)
    if (idIdx < 0) continue

    const rest = text.slice(idIdx + idToken.length)
    const next = rest.match(/\n\s+id:\s*'/)
    const blockEnd = next?.index != null ? idIdx + idToken.length + next.index : text.length
    let block = text.slice(idIdx, blockEnd)

    block = stripArrayProp(block, 'figures')
    block = stripArrayProp(block, 'media')

    const imageMatch = block.match(/\n(\s*)image:\s*'[^']*',?/)
    if (!imageMatch || imageMatch.index == null) {
      console.warn(`No image field for ${ev.id}`)
      continue
    }
    const indent = imageMatch[1]
    const insertAt = imageMatch.index + imageMatch[0].length

    const figuresBlock = formatFiguresBlock(figures, indent)
    const videosBlock = formatVideosBlock(ev.videos, indent)
    const insert = `\n${figuresBlock}${videosBlock ? `\n${videosBlock}` : ''}`

    block = block.slice(0, insertAt) + insert + block.slice(insertAt)
    // Normalize bare keys
    block = block.replace(/\nlimitations:/g, '\n    limitations:')
    block = block.replace(/\nsensors:/g, '\n    sensors:')
    block = block.replace(/\nphysicalCharacteristics:/g, '\n    physicalCharacteristics:')
    block = block.replace(/\nsources:/g, '\n    sources:')
    block = block.replace(/\nrelatedEvents:/g, '\n    relatedEvents:')

    text = text.slice(0, idIdx) + block + text.slice(blockEnd)
    console.log(`Applied ${figures.length} figures + ${ev.videos.length} videos → ${ev.id}`)
  }

  writeFileSync(eventsPath, text, 'utf8')
  console.log('Updated', eventsPath)
}

main()
