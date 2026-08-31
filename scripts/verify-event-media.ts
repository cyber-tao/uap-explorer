/**
 * Verify every event has 3–6 local figures and files exist on disk.
 */
import { existsSync, readFileSync } from 'fs'
import { parseEventsFile, rootPath } from './lib/event-media'

const MIN = 3
const MAX = 6

function main() {
  const eventsPath = rootPath('src/data/events.ts')
  const text = readFileSync(eventsPath, 'utf8')
  const events = parseEventsFile(eventsPath)
  const errors: string[] = []

  if (events.length === 0) {
    console.error('FAIL: No events parsed from events.ts')
    process.exit(1)
  }

  for (const ev of events) {
    const idRe = new RegExp(`["']?id["']?\\s*:\\s*["']${ev.id}["']`)
    const idMatch = idRe.exec(text)
    if (!idMatch || idMatch.index == null) {
      errors.push(`${ev.id}: missing in file`)
      continue
    }
    const idIdx = idMatch.index
    const rest = text.slice(idIdx)
    const next = rest.slice(idMatch[0].length).match(/\n\s*["']?id["']?\s*:\s*["']/)
    const block =
      next?.index != null ? rest.slice(0, idMatch[0].length + next.index) : rest.slice(0, 12000)

    const figuresMatch = block.match(/["']?figures["']?\s*:\s*\[([\s\S]*?)\]/)
    if (!figuresMatch) {
      errors.push(`${ev.id}: no figures array`)
      continue
    }

    const srcs = [...figuresMatch[1].matchAll(/["']?src["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1])
    if (srcs.length < MIN || srcs.length > MAX) {
      errors.push(`${ev.id}: figures.length=${srcs.length} not in [${MIN},${MAX}]`)
    }

    if (!ev.image.startsWith('/images/')) {
      errors.push(`${ev.id}: image not local: ${ev.image}`)
    }
    const coverPath = rootPath('public', ev.image.replace(/^\//, ''))
    if (!existsSync(coverPath)) {
      errors.push(`${ev.id}: cover missing on disk: ${ev.image}`)
    }

    for (const src of srcs) {
      if (!src.startsWith('/images/')) {
        errors.push(`${ev.id}: non-local figure src ${src}`)
        continue
      }
      const file = rootPath('public', src.replace(/^\//, ''))
      if (!existsSync(file)) {
        errors.push(`${ev.id}: figure file missing ${src}`)
      }
    }

    if (/["']?type["']?\s*:\s*["']image["']/.test(block)) {
      errors.push(`${ev.id}: still has type:'image' in media`)
    }
  }

  console.log(`Checked ${events.length} events`)
  if (errors.length) {
    console.error('FAIL:')
    for (const e of errors) console.error(' -', e)
    process.exit(1)
  }
  console.log('OK: all events have 3–6 local figures and video-only media')
}

main()
