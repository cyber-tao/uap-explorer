/**
 * World Vector Map Data and Geographic Projections for Tactical UAP Hotspots HUD
 * Powered by high-resolution TopoJSON geometry (177 sovereign nations) and D3 Geo projections.
 */

import countries110m from 'world-atlas/countries-110m.json'
import * as topojson from 'topojson-client'
import { geoNaturalEarth1, geoPath } from 'd3-geo'

export interface CountryGeometry {
  id: string
  name: string
  nameZh: string
  path: string
  center: { x: number; y: number }
}

export interface RegionPreset {
  id: string
  labelZh: string
  labelEn: string
  center: { x: number; y: number }
  zoom: number
  descriptionZh: string
  descriptionEn: string
}

export interface HotspotCorridor {
  id: string
  titleZh: string
  titleEn: string
  region: string
  center: { lng: number; lat: number }
  zoom: number
  descriptionZh: string
  descriptionEn: string
  eventIds: string[]
}

// Canvas viewport dimensions
export const MAP_WIDTH = 1000
export const MAP_HEIGHT = 520

// 1. Natural Earth projection fitted precisely to 1000x520 canvas
const topologyData = countries110m as unknown as Parameters<typeof topojson.feature>[0]
const countriesObject = (countries110m as { objects: { countries: Parameters<typeof topojson.feature>[1] } }).objects.countries

const countriesFeatureCollection = topojson.feature(
  topologyData,
  countriesObject
) as unknown as GeoJSON.FeatureCollection

export const projection = geoNaturalEarth1().fitSize(
  [MAP_WIDTH, MAP_HEIGHT],
  countriesFeatureCollection
)

const pathGenerator = geoPath(projection)

// Country name Chinese translation dictionary
export const COUNTRY_NAME_ZH_MAP: Record<string, string> = {
  'United States of America': '美国',
  'United States': '美国',
  China: '中国',
  'United Kingdom': '英国',
  Japan: '日本',
  Brazil: '巴西',
  Chile: '智利',
  Greece: '希腊',
  'United Arab Emirates': '阿联酋',
  Yemen: '也门',
  Syria: '叙利亚',
  Afghanistan: '阿富汗',
  Belgium: '比利时',
  India: '印度',
  Russia: '俄罗斯',
  Canada: '加拿大',
  Mexico: '墨西哥',
  Australia: '澳大利亚',
  France: '法国',
  Germany: '德国',
  Italy: '意大利',
  Spain: '西班牙',
  Peru: '秘鲁',
  Argentina: '阿根廷',
  Iran: '伊朗',
  Iraq: '伊拉克',
  'Saudi Arabia': '沙特阿拉伯',
  Turkey: '土耳其',
  Egypt: '埃及',
  'South Africa': '南非',
  Greenland: '格陵兰',
  Iceland: '冰岛',
  Norway: '挪威',
  Sweden: '瑞典',
  Finland: '芬兰',
  Poland: '波兰',
  Ukraine: '乌克兰',
  Philippines: '菲律宾',
  Indonesia: '印度尼西亚',
  Vietnam: '越南',
  Thailand: '泰国',
  'South Korea': '韩国',
  'North Korea': '朝鲜',
  'New Zealand': '新西兰',
  Colombia: '哥伦比亚',
}

// Unified China geometry (including Taiwan)
const countryGeometries = (countriesObject as unknown as { geometries: Array<{ id: string; properties?: { name?: string } }> }).geometries || []
const chinaUnifiedGeom = topojson.merge(
  topologyData as never,
  countryGeometries.filter(
    (g) => g.id === '156' || g.id === '158' || g.properties?.name === 'China' || g.properties?.name === 'Taiwan'
  ) as never
)
const chinaUnifiedPath = pathGenerator(chinaUnifiedGeom as never) || ''

// Pre-compute all sovereign country paths and centroids
export const WORLD_COUNTRIES: CountryGeometry[] = countriesFeatureCollection.features
  .filter((feature) => feature.id !== '158' && (feature.properties as { name?: string })?.name !== 'Taiwan')
  .map((feature) => {
    const isChina = feature.id === '156' || (feature.properties as { name?: string })?.name === 'China'
    const rawName = isChina ? 'China' : (feature.properties as { name?: string })?.name || 'Unknown'
    const nameZh = isChina ? '中国' : COUNTRY_NAME_ZH_MAP[rawName] || rawName
    const path = isChina && chinaUnifiedPath ? chinaUnifiedPath : pathGenerator(feature) || ''
    const centroid = isChina && chinaUnifiedGeom ? pathGenerator.centroid(chinaUnifiedGeom as never) : pathGenerator.centroid(feature)
    const cx = isNaN(centroid[0]) ? 500 : centroid[0]
    const cy = isNaN(centroid[1]) ? 260 : centroid[1]

    return {
      id: String(feature.id),
      name: rawName,
      nameZh,
      path,
      center: {
        x: Math.round(cx * 10) / 10,
        y: Math.round(cy * 10) / 10,
      },
    }
  })
  .filter((c) => c.path.length > 0)

// Pre-compute national borders mesh (vector line separating adjacent countries, unified China)
const bordersMesh = topojson.mesh(
  topologyData as never,
  countriesObject as never,
  (a: unknown, b: unknown) => {
    const ga = a as { id?: string }
    const gb = b as { id?: string }
    if (ga === gb) return false
    if ((ga.id === '156' && gb.id === '158') || (ga.id === '158' && gb.id === '156')) {
      return false
    }
    return true
  }
)
export const WORLD_BORDERS_PATH: string = pathGenerator(bordersMesh as never) || ''

// Pre-compute overall coastline outline
const landObject = (countries110m as { objects: { land: Parameters<typeof topojson.feature>[1] } }).objects.land
const landFeature = topojson.feature(
  topologyData,
  landObject
)
export const WORLD_LAND_OUTLINE_PATH: string = pathGenerator(landFeature as never) || ''

/**
 * Converts Geographic [Longitude, Latitude] to SVG Canvas [X, Y] via D3 Natural Earth projection
 */
export function geoToSvg(coords: [number, number]): { x: number; y: number } {
  const [lng, lat] = coords
  const pt = projection([lng, lat])
  if (!pt || isNaN(pt[0]) || isNaN(pt[1])) {
    return { x: 500, y: 260 }
  }
  return {
    x: Math.round(pt[0] * 10) / 10,
    y: Math.round(pt[1] * 10) / 10,
  }
}

/**
 * Strategic Oceans and Maritime Watermark Labels
 */
export interface OceanLabel {
  id: string
  labelEn: string
  labelZh: string
  x: number
  y: number
  tracking: string
}

export const STRATEGIC_OCEAN_LABELS: OceanLabel[] = [
  { id: 'pacific-n', labelEn: 'NORTH PACIFIC OCEAN', labelZh: '北太平洋海空域', x: 200, y: 200, tracking: '0.25em' },
  { id: 'pacific-s', labelEn: 'SOUTH PACIFIC OCEAN', labelZh: '南太平洋海域', x: 230, y: 390, tracking: '0.2em' },
  { id: 'atlantic-n', labelEn: 'NORTH ATLANTIC OCEAN', labelZh: '北大西洋作战区', x: 390, y: 170, tracking: '0.25em' },
  { id: 'atlantic-s', labelEn: 'SOUTH ATLANTIC OCEAN', labelZh: '南大西洋海域', x: 440, y: 390, tracking: '0.2em' },
  { id: 'indian', labelEn: 'INDIAN OCEAN', labelZh: '印度洋海空走廊', x: 670, y: 370, tracking: '0.25em' },
  { id: 'arctic', labelEn: 'ARCTIC OCEAN', labelZh: '北冰洋战略区', x: 500, y: 45, tracking: '0.3em' },
  { id: 'mediterranean', labelEn: 'MEDITERRANEAN', labelZh: '地中海', x: 530, y: 185, tracking: '0.15em' },
  { id: 'arabian', labelEn: 'ARABIAN SEA', labelZh: '阿拉伯海', x: 640, y: 245, tracking: '0.15em' },
  { id: 'philippine', labelEn: 'PHILIPPINE SEA', labelZh: '菲律宾海', x: 840, y: 245, tracking: '0.15em' },
]

/**
 * Tactical Grid Lines (Equator, Tropics, Prime Meridian, Major Latitude Parallels)
 */
export const TACTICAL_GRID_LINES = [
  { y: 70, label: '60° N', major: false },
  { y: 155, label: '30° N', major: false },
  { y: 260, label: '0° EQUATOR', major: true },
  { y: 365, label: '30° S', major: false },
  { y: 450, label: '60° S', major: false },
  { x: 140, label: '135° W', major: false },
  { x: 260, label: '90° W', major: false },
  { x: 380, label: '45° W', major: false },
  { x: 500, label: '0° PRIME MERIDIAN', major: true },
  { x: 620, label: '45° E', major: false },
  { x: 740, label: '90° E', major: false },
  { x: 860, label: '135° E', major: false },
]

/**
 * Region Presets for rapid tactical viewport navigation
 */
export const REGION_PRESETS: RegionPreset[] = [
  {
    id: 'global',
    labelZh: '全球总览',
    labelEn: 'Global View',
    center: { x: 500, y: 260 },
    zoom: 1,
    descriptionZh: '全域 65 起解密与重要目击事件宏观热力分布',
    descriptionEn: 'Macro density matrix of all 65 declassified & verified UAP incidents',
  },
  {
    id: 'north-america',
    labelZh: '北美战区',
    labelEn: 'North America',
    center: { x: 235, y: 165 },
    zoom: 2.6,
    descriptionZh: '太平洋外海、美东军事作战区与核设施走廊高发带',
    descriptionEn: 'Pacific naval range, East Coast operating areas & nuclear facilities',
  },
  {
    id: 'europe',
    labelZh: '欧洲与地中海',
    labelEn: 'Europe & Med',
    center: { x: 525, y: 145 },
    zoom: 3.6,
    descriptionZh: '英吉利海峡、西欧波次与爱琴海多传感器捕获区',
    descriptionEn: 'UK Rendlesham corridor, Belgian wave & Aegean multi-spectral tracks',
  },
  {
    id: 'asia-pacific',
    labelZh: '亚太海空域',
    labelEn: 'Asia-Pacific',
    center: { x: 780, y: 210 },
    zoom: 2.8,
    descriptionZh: '东海、黄海、菲律宾海与中国民航雷达目击走廊',
    descriptionEn: 'East China Sea, Yellow Sea, Philippine Sea & civilian radar vectors',
  },
  {
    id: 'middle-east',
    labelZh: '中东与红海',
    labelEn: 'Middle East',
    center: { x: 610, y: 220 },
    zoom: 3.8,
    descriptionZh: '波斯湾、阿曼湾、红海与霍尔木兹海峡多目标红外追踪',
    descriptionEn: 'Persian Gulf, Gulf of Oman, Red Sea & Strait of Hormuz EO/IR locks',
  },
  {
    id: 'south-america',
    labelZh: '拉丁美洲',
    labelEn: 'Latin America',
    center: { x: 345, y: 345 },
    zoom: 2.5,
    descriptionZh: '波多黎各阿瓜迪亚、巴西柯拉瑞斯与智利安第斯走廊',
    descriptionEn: 'Puerto Rico Aguadilla, Colares Brazil & Chile San Clemente',
  },
  {
    id: 'space-orbit',
    labelZh: '近地轨道/太空',
    labelEn: 'Orbital & Space',
    center: { x: 500, y: 260 },
    zoom: 1.1,
    descriptionZh: '礼炮号空间站、双子座、阿波罗与航天飞机任务轨道异常',
    descriptionEn: 'Salyut, Gemini, Apollo & Space Shuttle orbital telemetry encounters',
  },
]

/**
 * Key Hotspot Corridors (Dense Clusters) with tactical telemetry context
 */
export const HOTSPOT_CORRIDORS: HotspotCorridor[] = [
  {
    id: 'pacific-naval-range',
    titleZh: '加州外海与太平洋战区走廊',
    titleEn: 'California Offshore & Pacific Range',
    region: 'North America',
    center: { lng: -118.2, lat: 32.6 },
    zoom: 4.8,
    descriptionZh: '以圣迭戈外海（USS Princeton / Nimitz Tic Tac）及圣克莱门特岛 W-291 靶场为核心的高超音速与跨介质异常聚集区。',
    descriptionEn: 'High-density hypersonic & transmedium cluster centered around San Diego offshore & San Clemente W-291 range.',
    eventIds: [
      'nimitz-tic-tac',
      'uss-jackson-tictac-2023',
      'submarine-transmedium',
      'fbi-western-red-lights-2026',
    ],
  },
  {
    id: 'us-east-coast-w72',
    titleZh: '美东大西洋军事作战空域',
    titleEn: 'US East Coast & Atlantic W-72',
    region: 'North America',
    center: { lng: -76.0, lat: 37.0 },
    zoom: 4.5,
    descriptionZh: '弗吉尼亚海滩外海 W-72 警告区与汉普顿兰利空军基地，记录了 Gimbal、GoFast 及群集入侵等著名事件。',
    descriptionEn: 'Virginia Beach W-72 warning area and Langley AFB, site of Gimbal, GoFast, and drone swarm encounters.',
    eventIds: [
      'gimbal-gofast',
      'east-us-rectangular-uap-2019',
      'langley-afb-drone-swarm-2023',
      'fbi-isosceles-triangle-2011',
      'ny-commercial-cylinder-near-miss-2024',
    ],
  },
  {
    id: 'middle-east-maritime',
    titleZh: '中东-波斯湾/红海海空走廊',
    titleEn: 'Middle East Maritime & Gulf Corridor',
    region: 'Asia',
    center: { lng: 52.5, lat: 23.5 },
    zoom: 4.2,
    descriptionZh: '五角大楼 AARO/PURSUE 解密文件中的高频战区红外锁定区，涵盖阿曼湾 AC-130 冷球群、阿布扎比与红海红外追踪。',
    descriptionEn: 'Pentagon AARO declassified IR target tracking zone spanning Persian Gulf, Gulf of Oman, Abu Dhabi & Red Sea.',
    eventIds: [
      'gulf-of-oman-cold-orbs-2021',
      'uae-ir-track-2023',
      'uae-inverted-teardrop-2024',
      'middle-east-ir-track-2023',
      'middle-east-reticle-2023',
      'middle-east-dual-contrast-2023',
      'middle-east-eoir-2025',
      'gulf-of-aden-uap-2024',
      'mq-9-yemen-hellfire-2024',
      'syria-white-light-orb-2024',
    ],
  },
  {
    id: 'us-nuclear-mountain-axis',
    titleZh: '美西核设施与落基山脉走廊',
    titleEn: 'US Nuclear & Rocky Mountain Axis',
    region: 'North America',
    center: { lng: -106.0, lat: 38.0 },
    zoom: 4.0,
    descriptionZh: '连接马姆斯特罗姆核导弹基地、洛斯阿拉莫斯、潘泰克斯核工厂及科罗拉多斯普林斯的战略空域。',
    descriptionEn: 'Strategic vector connecting Malmstrom ICBM, Los Alamos, Pantex Plant, White Sands & Colorado Springs.',
    eventIds: [
      'malmstrom-icbm',
      'los-alamos-green-fireballs-1949',
      'pantex-intrusion-2015',
      'army-ir-dual-contrast-2026',
      'western-us-autotrack-2020',
      'colorado-springs-triangle-2023',
      'colorado-springs-translucent-2023',
      'fbi-blackhawk-thermal-2026',
      'fbi-slow-moving-objects-2026',
      'roswell',
    ],
  },
  {
    id: 'aegean-mediterranean',
    titleZh: '爱琴海与地中海多传感器走廊',
    titleEn: 'Aegean Sea & Mediterranean Corridor',
    region: 'Europe',
    center: { lng: 25.0, lat: 37.5 },
    zoom: 5.2,
    descriptionZh: '希腊近海记录的多起钻石形、圆形及 90 度瞬时直角转弯异常空中目标。',
    descriptionEn: 'Greek coastal zone with declassified military IR recordings of diamond-shaped, circular and 90-degree turning UAPs.',
    eventIds: [
      'greece-diamond-uap-2024',
      'greece-ocean-90deg-2023',
      'greece-circular-ocean-2023',
    ],
  },
  {
    id: 'east-asia-maritime',
    titleZh: '东亚海空域与民航走廊',
    titleEn: 'East Asia Maritime & Aviation Corridor',
    region: 'Asia',
    center: { lng: 122.0, lat: 31.0 },
    zoom: 4.6,
    descriptionZh: '涵盖东海红外跟踪、黄海六角星 UAP 以及杭州萧山与上海虹桥民航雷达/目视重大事件。',
    descriptionEn: 'East China Sea IR locks, Yellow Sea star UAP, and major airport radar/visual incursions at Xiaoshan & Hongqiao.',
    eventIds: [
      'east-china-sea-uap-2025',
      'yellow-sea-six-pointed-star-2025',
      'xiaoshan-airport',
      'shanghai-hongqiao',
      'guizhou-forest',
    ],
  },
  {
    id: 'caribbean-latin-corridor',
    titleZh: '加勒比海与拉美走廊',
    titleEn: 'Caribbean & Latin American Corridor',
    region: 'South America',
    center: { lng: -60.0, lat: 5.0 },
    zoom: 3.4,
    descriptionZh: '涵盖波多黎各阿瓜迪亚国土安全部跨介质红外录像、巴西柯拉瑞斯行动与智利空军多光谱跟踪。',
    descriptionEn: 'Aguadilla Puerto Rico DHS thermal transmedium track, Operation Prato Brazil & Chile San Clemente.',
    eventIds: [
      'dhs-pilot-football-object-2024',
      'colares',
      'chile-san-clemente',
      'gulf-of-america-flicker-2019',
    ],
  },
]
