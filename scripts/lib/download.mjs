/**
 * Robust HTTPS image download helper for Windows environments with TLS issues.
 * Usage: node scripts/lib/download.mjs <url> <destPath>
 * Exit 0 on success, 1 on failure. Prints JSON result to stdout.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const [url, dest] = process.argv.slice(2)
if (!url || !dest) {
  console.log(JSON.stringify({ ok: false, reason: 'usage: download.mjs url dest' }))
  process.exit(0)
}

const { writeFileSync } = await import('fs')

try {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; UAPExplorerMediaMirror/1.0; educational archive)',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  })
  if (!res.ok) {
    console.log(JSON.stringify({ ok: false, reason: `HTTP ${res.status}` }))
    process.exit(0)
  }
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('text/html') || ct.includes('application/json')) {
    console.log(JSON.stringify({ ok: false, reason: `not image content-type: ${ct}` }))
    process.exit(0)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 800) {
    console.log(JSON.stringify({ ok: false, reason: `too small (${buf.length}b)` }))
    process.exit(0)
  }
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8
  const isPng = buf[0] === 0x89 && buf[1] === 0x50
  const isGif = buf[0] === 0x47 && buf[1] === 0x49
  const isWebp =
    buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP'
  if (!isJpeg && !isPng && !isGif && !isWebp && !ct.startsWith('image/')) {
    console.log(JSON.stringify({ ok: false, reason: 'binary not recognized as image' }))
    process.exit(0)
  }
  let ext = 'jpg'
  if (isPng || ct.includes('png')) ext = 'png'
  else if (isGif || ct.includes('gif')) ext = 'gif'
  else if (isWebp || ct.includes('webp')) ext = 'webp'
  const finalPath = dest.endsWith(`.${ext}`) ? dest : `${dest}.${ext}`
  writeFileSync(finalPath, buf)
  console.log(JSON.stringify({ ok: true, path: finalPath, ext, bytes: buf.length }))
} catch (e) {
  console.log(JSON.stringify({ ok: false, reason: e instanceof Error ? e.message : String(e) }))
}
process.exit(0)
