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

  for (const ev of events) {
    const idToken = `id: '${ev.id}'`
    const idIdx = text.indexOf(idToken)
    if (idIdx < 0) {
      errors.push(`${ev.id}: missing in file`)
      continue
    }
    const rest = text.slice(idIdx)
    const next = rest.slice(idToken.length).match(/\n\s+id:\s*'/)
    const block =
      next?.index != null ? rest.slice(0, idToken.length + next.index) : rest.slice(0, 12000)

    const figuresMatch = block.match(/figures:\s*\[([\s\S]*?)\]/)
    if (!figuresMatch) {
      errors.push(`${ev.id}: no figures array`)
      continue
    }

    const srcs = [...figuresMatch[1].matchAll(/src:\s*'([^']+)'/g)].map((m) => m[1])
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

    if (/type:\s*'image'/.test(block)) {
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
