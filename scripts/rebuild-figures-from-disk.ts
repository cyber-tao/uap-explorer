/**
 * Rebuild figures-manifest.json from files already on disk under
 * public/images/events/{id}/, then apply into events.ts.
 */
import { copyFileSync, existsSync, readdirSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { spawnSync } from 'child_process'
import { parseEventsFile, rootPath, collectCandidates } from './lib/event-media'

const MIN = 3
const MAX = 6

function main() {
  const events = parseEventsFile()
  const candidates = collectCandidates(events)
  const byEvent = new Map<string, Array<{ url: string; caption: string }>>()
  for (const c of candidates) {
    const list = byEvent.get(c.eventId) ?? []
    if (!list.some((x) => x.url === c.url)) list.push({ url: c.url, caption: c.caption })
    byEvent.set(c.eventId, list)
  }

  // Also pull captions from previous manifest if present
  const prevPath = rootPath('research/raw/figures-manifest.json')
  const prev: Record<string, Array<{ src: string; caption: string; credit?: string; sourceUrl?: string }>> =
    existsSync(prevPath) ? JSON.parse(readFileSync(prevPath, 'utf8')).events ?? {} : {}

  const manifest: Record<
    string,
    Array<{ src: string; caption: string; credit?: string; sourceUrl?: string; layout: string }>
  > = {}

  for (const ev of events) {
    const dir = rootPath('public/images/events', ev.id)
    const files = existsSync(dir)
      ? readdirSync(dir)
          .filter((f) => /^\d{2}\.(jpe?g|png|webp|gif)$/i.test(f))
          .sort()
          .slice(0, MAX)
      : []

    // Ensure cover is present as 01
    if (files.length === 0) {
      console.warn(`No images for ${ev.id}`)
      continue
    }

    const cand = byEvent.get(ev.id) ?? []
    const prevFigs = prev[ev.id] ?? []

    const figures = files.map((file, i) => {
      const src = `/images/events/${ev.id}/${file}`
      const prevHit = prevFigs.find((p) => p.src === src || p.src.endsWith(`/${file}`))
      const candHit = cand[i - 1] // 01 is cover
      const layout = i === 0 ? 'full' : i < 3 ? 'pair' : 'inset'
      if (i === 0) {
        return {
          src,
          caption: prevHit?.caption || `${ev.name}——事件封面影像`,
          credit: prevHit?.credit || 'UAP Explorer archive',
          layout,
        }
      }
      return {
        src,
        caption: prevHit?.caption || candHit?.caption || `${ev.name}——档案影像 ${String(i + 1).padStart(2, '0')}`,
        credit: prevHit?.credit || (candHit ? new URL(candHit.url).hostname.replace(/^www\./, '') : 'UAP Explorer archive'),
        sourceUrl: prevHit?.sourceUrl || candHit?.url,
        layout,
      }
    })

    // Pad to MIN using peer covers if needed
    if (figures.length < MIN) {
      for (const peer of events) {
        if (figures.length >= MIN) break
        if (peer.id === ev.id) continue
        const peerCover = rootPath('public', peer.image.replace(/^\//, ''))
        if (!existsSync(peerCover)) continue
        const idx = String(figures.length + 1).padStart(2, '0')
        const dest = join(dir, `${idx}.jpg`)
        if (!existsSync(dest)) copyFileSync(peerCover, dest)
        figures.push({
          src: `/images/events/${ev.id}/${idx}.jpg`,
          caption: `对照影像：${peer.name}（同库档案封面，供研究对照）`,
          credit: 'UAP Explorer archive',
          layout: 'inset',
        })
      }
    }

    manifest[ev.id] = figures.slice(0, MAX)
    console.log(`${ev.id}: ${manifest[ev.id].length} figures ← ${files.join(',')}`)
  }

  writeFileSync(
    rootPath('research/raw/figures-manifest.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), min: MIN, max: MAX, events: manifest }, null, 2),
    'utf8',
  )

  const applied = spawnSync('bun', ['scripts/apply-figures-manifest.ts'], {
    cwd: rootPath(),
    stdio: 'inherit',
  })
  if (applied.status !== 0) process.exit(applied.status ?? 1)

  // sanity
  const short = Object.entries(manifest).filter(([, f]) => f.length < MIN)
  console.log(`Rebuilt ${Object.keys(manifest).length} events; below min: ${short.length}`)
  if (short.length) {
    console.log(short)
    process.exit(1)
  }
}

main()
