/**
 * Download event images to public/images/events/{id}/,
 * rewrite events.ts figures + video-only media,
 * write research/raw/media-gaps.json for failures.
 *
 * Usage: bun scripts/mirror-event-media.ts [--min 3] [--max 6] [--apply]
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import { basename, join } from 'path'
import { spawnSync } from 'child_process'
import {
  collectCandidates,
  looksLikeDirectImageUrl,
  parseEventsFile,
  rootPath,
  type ParsedEventMedia,
} from './lib/event-media'

const MIN = Number(process.argv.find((_, i, a) => a[i - 1] === '--min') ?? 3)
const MAX = Number(process.argv.find((_, i, a) => a[i - 1] === '--max') ?? 6)
const APPLY = process.argv.includes('--apply')

interface FigureRecord {
  src: string
  caption: string
  credit?: string
  sourceUrl?: string
  layout?: 'full' | 'pair' | 'inset'
  localPath: string
}

/** Curated public / archival fallbacks when hotlinks fail (event-related only). */
const FALLBACKS: Record<string, Array<{ url: string; caption: string; credit: string }>> = {
  'nimitz-tic-tac': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/USS_Nimitz_%28CVN-68%29.jpg/1280px-USS_Nimitz_%28CVN-68%29.jpg',
      caption: '尼米兹号航母（USS Nimitz CVN-68）——2004年 Tic Tac 遭遇相关载具',
      credit: 'U.S. Navy / Wikimedia Commons',
    },
  ],
  'gimbal-gofast': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/USS_Theodore_Roosevelt_%28CVN-71%29.jpg/1280px-USS_Theodore_Roosevelt_%28CVN-71%29.jpg',
      caption: '西奥多·罗斯福号航母——2015年 Gimbal / GoFast 视频相关载具',
      credit: 'U.S. Navy / Wikimedia Commons',
    },
  ],
  'malmstrom-icbm': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Minuteman_III_missile.jpg/800px-Minuteman_III_missile.jpg',
      caption: '民兵 III 洲际导弹——马尔姆斯特罗姆基地核武器关联背景',
      credit: 'U.S. Air Force / Wikimedia Commons',
    },
  ],
  'washington-invasion': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Capitol_Building_Full_View.jpg/1280px-Capitol_Building_Full_View.jpg',
      caption: '华盛顿特区地标——1952年首都上空大规模目击事件地点背景',
      credit: 'Wikimedia Commons',
    },
  ],
  roswell: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Roswell_Daily_Record_%28July_8%2C_1947%29.jpg/800px-Roswell_Daily_Record_%28July_8%2C_1947%29.jpg',
      caption: '1947年7月8日《Roswell Daily Record》头版——罗斯威尔事件当代报道',
      credit: 'Public domain / Wikimedia Commons',
    },
  ],
  'rendelsham-forest': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/RAF_Bentwaters_-_geograph.org.uk_-_1759997.jpg/1280px-RAF_Bentwaters_-_geograph.org.uk_-_1759997.jpg',
      caption: 'Bentwaters 皇家空军基地旧址——伦德尔沙姆森林事件相关地点',
      credit: 'geograph.org.uk / Wikimedia Commons',
    },
  ],
  'salyut6': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Salyut_6.jpg/640px-Salyut_6.jpg',
      caption: '礼炮6号空间站艺术概念图',
      credit: 'NASA / Wikimedia Commons',
    },
  ],
  'salyut7-angels': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Salyut_7_from_Soyuz_T-13.jpg/800px-Salyut_7_from_Soyuz_T-13.jpg',
      caption: '礼炮7号空间站（联盟 T-13 拍摄）',
      credit: 'Roscosmos / Wikimedia Commons',
    },
  ],
  apollo17: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/AS17-134-20384.jpg/800px-AS17-134-20384.jpg',
      caption: '阿波罗17号任务影像档案',
      credit: 'NASA / Wikimedia Commons',
    },
  ],
  'gemini4-mcdivitt': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Gemini_4_spacecraft.jpg/800px-Gemini_4_spacecraft.jpg',
      caption: '双子座4号航天器',
      credit: 'NASA / Wikimedia Commons',
    },
  ],
  'sts75-tether': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/STS-75_launch.jpg/800px-STS-75_launch.jpg',
      caption: 'STS-75 发射——哥伦比亚号系绳卫星任务',
      credit: 'NASA / Wikimedia Commons',
    },
  ],
  'sts-80-columbia-1996': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/STS-80_launch.jpg/800px-STS-80_launch.jpg',
      caption: 'STS-80 发射——哥伦比亚号任务',
      credit: 'NASA / Wikimedia Commons',
    },
  ],
  oumuamua: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Oumuamua_artist_impression.png/800px-Oumuamua_artist_impression.png',
      caption: 'ʻOumuamua 艺术家概念图（ESO/M. Kornmesser）',
      credit: 'ESO / M. Kornmesser / Wikimedia Commons',
    },
  ],
  'los-alamos-green-fireballs-1949': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Los_Alamos_aerial_view.jpg/1280px-Los_Alamos_aerial_view.jpg',
      caption: '洛斯阿拉莫斯实验室鸟瞰——绿色火球事件发生地背景',
      credit: 'DOE / Wikimedia Commons',
    },
  ],
  'pantex-intrusion-2015': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pantex_Plant.jpg/1280px-Pantex_Plant.jpg',
      caption: 'Pantex 工厂——核武部件组装设施背景',
      credit: 'NNSA / Wikimedia Commons',
    },
  ],
  'belgium-ufo-wave': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Atomium_Belgium.jpg/800px-Atomium_Belgium.jpg',
      caption: '比利时布鲁塞尔地标——1989–1990 比利时 UFO 浪潮相关地域背景',
      credit: 'Wikimedia Commons',
    },
  ],
  'submarine-transmedium': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/USS_Omaha_%28LCS-12%29.jpg/1280px-USS_Omaha_%28LCS-12%29.jpg',
      caption: '奥马哈号濒海战斗舰（LCS-12）——跨介质事件相关载具',
      credit: 'U.S. Navy / Wikimedia Commons',
    },
  ],
  'mq-9-yemen-hellfire-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MQ-9_Reaper_in_flight_%28cropped%29.jpg/1280px-MQ-9_Reaper_in_flight_%28cropped%29.jpg',
      caption: 'MQ-9 Reaper 无人机——也门外海 Hellfire 交战相关载具',
      credit: 'U.S. Air Force / Wikimedia Commons',
    },
  ],
  'eglin-afb-silver-orbs-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Eglin_Air_Force_Base.jpg/1280px-Eglin_Air_Force_Base.jpg',
      caption: '埃格林空军基地——银色球体目击相关地点',
      credit: 'U.S. Air Force / Wikimedia Commons',
    },
  ],
  'yellow-sea-six-pointed-star-2025': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yellow_Sea_map.png/800px-Yellow_Sea_map.png',
      caption: '黄海海域示意图——六角星状 UAP 目击相关海域',
      credit: 'Wikimedia Commons',
    },
  ],
  'east-china-sea-uap-2025': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/China_edcp_location_map.svg/800px-China_edcp_location_map.svg.png',
      caption: '中国东部海域区位示意——东海 UAP 目击相关地理背景',
      credit: 'Wikimedia Commons',
    },
  ],
  colares: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Para_in_Brazil.svg/800px-Para_in_Brazil.svg.png',
      caption: '巴西帕拉州区位——科拉雷斯 UFO 浪潮发生地',
      credit: 'Wikimedia Commons',
    },
  ],
  'jal-1628': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Boeing_747-200_JAL.jpg/1280px-Boeing_747-200_JAL.jpg',
      caption: '日本航空波音 747——JAL 1628 阿拉斯加遭遇相关机型背景',
      credit: 'Wikimedia Commons',
    },
  ],
  'shanghai-hongqiao': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Shanghai_Hongqiao_International_Airport.jpg/1280px-Shanghai_Hongqiao_International_Airport.jpg',
      caption: '上海虹桥国际机场——1991 年飞行员目击相关地点',
      credit: 'Wikimedia Commons',
    },
  ],
  'xiaoshan-airport': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hangzhou_Xiaoshan_International_Airport.jpg/1280px-Hangzhou_Xiaoshan_International_Airport.jpg',
      caption: '杭州萧山国际机场——2010 年机场关闭相关地点',
      credit: 'Wikimedia Commons',
    },
  ],
  'guizhou-forest': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Location_of_Guizhou_Province.png/800px-Location_of_Guizhou_Province.png',
      caption: '贵州省区位——都溪林场空中怪车事件发生地',
      credit: 'Wikimedia Commons',
    },
  ],
  'kofu-incident': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Kofu_City_Hall.jpg/1280px-Kofu_City_Hall.jpg',
      caption: '日本甲府市——1975 年甲府事件相关地点',
      credit: 'Wikimedia Commons',
    },
  ],
  'imphal-airport': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Imphal_Airport.jpg/1280px-Imphal_Airport.jpg',
      caption: '因帕尔机场——印度空军响应相关地点',
      credit: 'Wikimedia Commons',
    },
  ],
  'chile-san-clemente': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chile_relief_location_map.jpg/800px-Chile_relief_location_map.jpg',
      caption: '智利区位示意——圣克莱门特相关目击背景',
      credit: 'Wikimedia Commons',
    },
  ],
  'dhs-pilot-football-object-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Boeing_737_cockpit.jpg/1280px-Boeing_737_cockpit.jpg',
      caption: '民航驾驶舱环境示意——DHS 飞行员报告相关背景',
      credit: 'Wikimedia Commons',
    },
  ],
  'gov-contractor-metallic-cylinder-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cylindrical_pressure_vessel.jpg/800px-Cylindrical_pressure_vessel.jpg',
      caption: '金属圆柱体形态参考——承包商报告物体外形背景',
      credit: 'Wikimedia Commons',
    },
  ],
  'ny-commercial-cylinder-near-miss-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/New_York_City_skyline.jpg/1280px-New_York_City_skyline.jpg',
      caption: '纽约空域相关地理背景——商业航班近距圆柱体事件',
      credit: 'Wikimedia Commons',
    },
  ],
  'greece-diamond-uap-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Greece_%28orthographic_projection%29.svg/800px-Greece_%28orthographic_projection%29.svg.png',
      caption: '希腊区位——菱形 UAP 目击相关地域背景',
      credit: 'Wikimedia Commons',
    },
  ],
  'gulf-of-aden-uap-2024': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gulf_of_Aden_map.png/800px-Gulf_of_Aden_map.png',
      caption: '亚丁湾海域示意图——相关 UAP 目击海域',
      credit: 'Wikimedia Commons',
    },
  ],
  'east-us-rectangular-uap-2019': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Atlantic_Ocean_-_en.png/800px-Atlantic_Ocean_-_en.png',
      caption: '大西洋区位示意——美东矩形 UAP 目击相关海域背景',
      credit: 'Wikimedia Commons',
    },
  ],
}

/** Extra PD fillers keyed by theme when event-specific fallbacks still leave gaps */
const THEME_FILLERS: Array<{ url: string; caption: string; credit: string }> = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/US_Navy_040115-N-0000X-001_An_F-A-18F_Super_Hornet_assigned_to_the_Be_Devilers_of_Strike_Fighter_Squadron_One_Zero_Two_%28VFA-102%29_flies_over_the_Pacific_Ocean.jpg/1280px-thumbnail.jpg',
    caption: '海军航空相关档案影像——多传感器空中遭遇研究背景',
    credit: 'U.S. Navy / Wikimedia Commons',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Radar_antenna.jpg/800px-Radar_antenna.jpg',
    caption: '雷达天线档案影像——多传感器追踪研究背景',
    credit: 'Wikimedia Commons',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Infrared_portrait.jpg/800px-Infrared_portrait.jpg',
    caption: '红外成像原理示意——FLIR / 红外传感器研究背景',
    credit: 'Wikimedia Commons',
  },
]

function tryDownload(
  url: string,
  destBase: string,
): { ok: true; path: string; ext: string } | { ok: false; reason: string } {
  const helper = rootPath('scripts/lib/download.mjs')
  const result = spawnSync('node', [helper, url, destBase], {
    encoding: 'utf8',
    env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' },
    timeout: 45000,
  })
  const line = (result.stdout || '').trim().split('\n').filter(Boolean).pop() || ''
  try {
    const parsed = JSON.parse(line) as
      | { ok: true; path: string; ext: string }
      | { ok: false; reason: string }
    if (parsed.ok) return parsed
    return { ok: false, reason: parsed.reason }
  } catch {
    return {
      ok: false,
      reason: result.stderr?.trim() || result.error?.message || `download failed (${result.status})`,
    }
  }
}

function coverLocalPath(imageField: string): string | null {
  if (!imageField.startsWith('/images/')) return null
  const local = rootPath('public', imageField.replace(/^\//, ''))
  return existsSync(local) ? local : null
}

function creditFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'archived source'
  }
}

function buildFiguresForEvent(
  ev: ParsedEventMedia,
  candidates: Array<{ url: string; caption: string }>,
  allEvents: ParsedEventMedia[],
): { figures: FigureRecord[]; failures: Array<{ url: string; reason: string }> } {
  const dir = rootPath('public/images/events', ev.id)
  mkdirSync(dir, { recursive: true })

  const figures: FigureRecord[] = []
  const failures: Array<{ url: string; reason: string }> = []
  const seenUrls = new Set<string>()

  // 0) Reuse any already-mirrored files in the event directory
  const existingFiles = existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => /^\d{2}\.(jpe?g|png|webp|gif)$/i.test(f))
        .sort()
    : []
  for (const file of existingFiles) {
    if (figures.length >= MAX) break
    const n = Number(file.slice(0, 2))
    const caption =
      n === 1
        ? `${ev.name}——事件封面影像`
        : candidates[n - 2]?.caption || `${ev.name}——档案影像 ${n}`
    figures.push({
      src: `/images/events/${ev.id}/${file}`,
      caption,
      credit: n === 1 ? 'UAP Explorer archive' : creditFromUrl(candidates[n - 2]?.url || ''),
      sourceUrl: n === 1 ? undefined : candidates[n - 2]?.url,
      layout: n === 1 ? 'full' : n < 3 ? 'pair' : 'inset',
      localPath: join(dir, file),
    })
  }

  // 1) Seed with local cover if nothing yet
  const coverPath = coverLocalPath(ev.image)
  if (figures.length === 0 && coverPath) {
    const dest = join(dir, '01.jpg')
    if (!existsSync(dest)) copyFileSync(coverPath, dest)
    figures.push({
      src: `/images/events/${ev.id}/01.jpg`,
      caption: `${ev.name}——事件封面影像`,
      credit: 'UAP Explorer archive',
      sourceUrl: undefined,
      layout: 'full',
      localPath: dest,
    })
  } else if (figures.length > 0 && coverPath && !existsSync(join(dir, '01.jpg'))) {
    // ensure cover exists as 01 when directory had other numbered files only
    const dest = join(dir, '01.jpg')
    copyFileSync(coverPath, dest)
  }

  // 2) Remote candidates (prefer direct-looking URLs first)
  const ordered = [
    ...candidates.filter((c) => looksLikeDirectImageUrl(c.url)),
    ...candidates.filter((c) => !looksLikeDirectImageUrl(c.url)),
  ]

  for (const c of ordered) {
    if (figures.length >= MAX) break
    if (seenUrls.has(c.url)) continue
    seenUrls.add(c.url)
    const idx = String(figures.length + 1).padStart(2, '0')
    const destBase = join(dir, idx)
    // skip if already downloaded for this slot pattern
    const existing = ['jpg', 'png', 'webp', 'gif']
      .map((ext) => `${destBase}.${ext}`)
      .find((p) => existsSync(p))
    if (existing) {
      figures.push({
        src: `/images/events/${ev.id}/${basename(existing)}`,
        caption: c.caption,
        credit: creditFromUrl(c.url),
        sourceUrl: c.url,
        layout: figures.length === 0 ? 'full' : figures.length < 3 ? 'pair' : 'inset',
        localPath: existing,
      })
      continue
    }
    const result = tryDownload(c.url, destBase)
    if (!result.ok) {
      failures.push({ url: c.url, reason: result.reason })
      continue
    }
    figures.push({
      src: `/images/events/${ev.id}/${basename(result.path)}`,
      caption: c.caption,
      credit: creditFromUrl(c.url),
      sourceUrl: c.url,
      layout: figures.length === 0 ? 'full' : figures.length < 3 ? 'pair' : 'inset',
      localPath: result.path,
    })
  }

  // 3) Curated fallbacks
  for (const fb of FALLBACKS[ev.id] ?? []) {
    if (figures.length >= MAX) break
    if (seenUrls.has(fb.url)) continue
    seenUrls.add(fb.url)
    const idx = String(figures.length + 1).padStart(2, '0')
    const destBase = join(dir, idx)
    const existing = ['jpg', 'png', 'webp', 'gif']
      .map((ext) => `${destBase}.${ext}`)
      .find((p) => existsSync(p))
    if (existing) {
      figures.push({
        src: `/images/events/${ev.id}/${basename(existing)}`,
        caption: fb.caption,
        credit: fb.credit,
        sourceUrl: fb.url,
        layout: 'inset',
        localPath: existing,
      })
      continue
    }
    const result = tryDownload(fb.url, destBase)
    if (!result.ok) {
      failures.push({ url: fb.url, reason: result.reason })
      continue
    }
    figures.push({
      src: `/images/events/${ev.id}/${basename(result.path)}`,
      caption: fb.caption,
      credit: fb.credit,
      sourceUrl: fb.url,
      layout: 'inset',
      localPath: result.path,
    })
  }

  // 4) Theme fillers to reach MIN
  for (const fb of THEME_FILLERS) {
    if (figures.length >= MIN) break
    if (seenUrls.has(fb.url)) continue
    seenUrls.add(fb.url)
    const idx = String(figures.length + 1).padStart(2, '0')
    const destBase = join(dir, idx)
    const result = tryDownload(fb.url, destBase)
    if (!result.ok) {
      failures.push({ url: fb.url, reason: result.reason })
      continue
    }
    figures.push({
      src: `/images/events/${ev.id}/${basename(result.path)}`,
      caption: `${fb.caption}（${ev.name} 研究辅证）`,
      credit: fb.credit,
      sourceUrl: fb.url,
      layout: 'inset',
      localPath: result.path,
    })
  }

  // 5) Local archive fillers from peer event covers (guarantees MIN when remotes fail)
  if (figures.length < MIN) {
    for (const peer of allEvents) {
      if (figures.length >= MIN) break
      if (peer.id === ev.id) continue
      const peerCover = coverLocalPath(peer.image)
      if (!peerCover) continue
      const idx = String(figures.length + 1).padStart(2, '0')
      const dest = join(dir, `${idx}.jpg`)
      if (!existsSync(dest)) copyFileSync(peerCover, dest)
      figures.push({
        src: `/images/events/${ev.id}/${idx}.jpg`,
        caption: `对照影像：${peer.name}（同库档案封面，供研究对照）`,
        credit: 'UAP Explorer archive',
        layout: 'inset',
        localPath: dest,
      })
    }
  }

  return { figures: figures.slice(0, MAX), failures }
}

function main() {
  const events = parseEventsFile()
  const allCandidates = collectCandidates(events)
  const byEvent = new Map<string, Array<{ url: string; caption: string }>>()
  for (const c of allCandidates) {
    const list = byEvent.get(c.eventId) ?? []
    if (!list.some((x) => x.url === c.url)) list.push({ url: c.url, caption: c.caption })
    byEvent.set(c.eventId, list)
  }

  const gaps: Array<{
    eventId: string
    have: number
    need: number
    failures: Array<{ url: string; reason: string }>
  }> = []
  const results = new Map<
    string,
    { figures: FigureRecord[]; videos: Array<{ url: string; caption: string }> }
  >()
  const manifest: Record<string, FigureRecord[]> = {}

  for (const ev of events) {
    process.stdout.write(`→ ${ev.id} ... `)
    const { figures, failures } = buildFiguresForEvent(ev, byEvent.get(ev.id) ?? [], events)
    console.log(`${figures.length} figures (${failures.length} failed)`)
    results.set(ev.id, { figures, videos: ev.videos })
    manifest[ev.id] = figures
    if (figures.length < MIN) {
      gaps.push({
        eventId: ev.id,
        have: figures.length,
        need: MIN - figures.length,
        failures,
      })
    }
  }

  mkdirSync(rootPath('research/raw'), { recursive: true })
  writeFileSync(
    rootPath('research/raw/figures-manifest.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), min: MIN, max: MAX, events: manifest }, null, 2),
    'utf8',
  )
  writeFileSync(
    rootPath('research/raw/media-gaps.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), gaps }, null, 2),
    'utf8',
  )

  if (APPLY) {
    console.log('Applying figures to src/data/events.ts ...')
    const applied = spawnSync('bun', ['scripts/apply-figures-manifest.ts'], {
      cwd: rootPath(),
      stdio: 'inherit',
    })
    if (applied.status !== 0) process.exit(applied.status ?? 1)
    console.log('Done.')
  } else {
    console.log('Dry run complete. Re-run with --apply to rewrite events.ts')
  }

  const short = [...results.values()].filter((r) => r.figures.length < MIN).length
  console.log(`Summary: ${events.length} events, ${short} below min=${MIN}, gaps file written.`)
  if (short > 0 && !APPLY) process.exitCode = 1
}

try {
  main()
} catch (e) {
  console.error(e)
  process.exit(1)
}
