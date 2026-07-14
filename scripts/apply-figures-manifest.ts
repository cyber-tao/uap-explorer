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

function formatFigure(f: ManifestFigure, indent: string, i: number): string {
  const layout = f.layout ?? (i === 0 ? 'full' : i < 3 ? 'pair' : 'inset')
  const parts = [
    `src: '${escapeTsString(f.src)}'`,
    `caption: '${escapeTsString(f.caption)}'`,
  ]
  if (f.credit) parts.push(`credit: '${escapeTsString(f.credit)}'`)
  if (f.sourceUrl) parts.push(`sourceUrl: '${escapeTsString(f.sourceUrl)}'`)
  parts.push(`layout: '${layout}'`)
  return `${indent}  { ${parts.join(', ')} }`
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

    // Strip existing figures / media (keep following field indentation)
    block = block.replace(/\n\s*figures:\s*\[[\s\S]*?\n\s*\],?/m, '\n')
    block = block.replace(/\n\s*media:\s*\[[\s\S]*?\n\s*\],?/m, '\n')
    // Normalize bare field keys that lost indent after prior applies
    block = block.replace(/\nlimitations:/g, '\n    limitations:')
    block = block.replace(/\nsensors:/g, '\n    sensors:')
    block = block.replace(/\nphysicalCharacteristics:/g, '\n    physicalCharacteristics:')
    block = block.replace(/\nsources:/g, '\n    sources:')
    block = block.replace(/\nrelatedEvents:/g, '\n    relatedEvents:')

    const imageMatch = block.match(/\n(\s*)image:\s*'[^']*',?/)
    if (!imageMatch || imageMatch.index == null) {
      console.warn(`No image field for ${ev.id}`)
      continue
    }
    const indent = imageMatch[1]
    const insertAt = imageMatch.index + imageMatch[0].length

    let insert = `\n${indent}figures: [\n${figures
      .map((f, i) => formatFigure(f, indent, i))
      .join(',\n')},\n${indent}]`

    if (ev.videos.length > 0) {
      insert += `,\n${indent}media: [\n${ev.videos
        .map(
          (v) =>
            `${indent}  { type: 'video', url: '${escapeTsString(v.url)}', caption: '${escapeTsString(v.caption)}' }`,
        )
        .join(',\n')},\n${indent}]`
    }

    // Ensure comma after inserted block before following property
    const after = block.slice(insertAt)
    const needsComma = !after.trimStart().startsWith(',')
    block = block.slice(0, insertAt) + insert + (needsComma ? ',' : '') + after

    text = text.slice(0, idIdx) + block + text.slice(blockEnd)
    console.log(`Applied ${figures.length} figures + ${ev.videos.length} videos → ${ev.id}`)
  }

  writeFileSync(eventsPath, text, 'utf8')
  console.log('Updated', eventsPath)
}

main()
