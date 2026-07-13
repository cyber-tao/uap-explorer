export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavLink {
  label: string
  targetId: string
}

export interface NavigationConfig {
  brandMark: string
  links: NavLink[]
}

export interface HeroConfig {
  wordmarkText: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  descriptionLine1: string
  descriptionLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface PhilosophyFeature {
  index: string
  key: string
  cn: string
  en: string
  metric: string
  metricLabel: string
  description: string
}

export interface PhilosophyConfig {
  eyebrow: string
  title: string
  body: string
  features: PhilosophyFeature[]
}

export interface ProjectMeta {
  label: string
  value: string
}

export interface ProjectData {
  id: string
  title: string
  location: string
  year: string
  image: string
  subtitle: string
  meta: ProjectMeta[]
  paragraphs: string[]
}

export interface GalleryConfig {
  sectionLabel: string
  title: string
  projects: ProjectData[]
}

export interface MediumItem {
  cn: string
  en: string
  description: string
}

export interface MediumsConfig {
  sectionLabel: string
  items: MediumItem[]
}

export interface FooterEntry {
  text: string
  href?: string
}

export interface FooterColumn {
  heading: string
  entries: FooterEntry[]
}

export interface FooterConfig {
  visionText: string
  brandName: string
  columns: FooterColumn[]
  copyright: string
  videoPath: string
}

export interface ProjectDetailConfig {
  backLabel: string
}

export const siteConfig: SiteConfig = {
  language: "zh-CN",
  siteTitle: "UAP Explorer · 不明异常现象探索者",
  siteDescription: "基于全球22国、10个研究维度、300+独立信息源的UAP/UFO科学评估。追踪高置信度事件，探索未知现象的物理证据。",
}

export const navigationConfig: NavigationConfig = {
  brandMark: "UAP",
  links: [
    { label: "首页", targetId: "hero-section" },
    { label: "特征", targetId: "philosophy" },
    { label: "事件", targetId: "gallery" },
    { label: "机构", targetId: "mediums" },
  ],
}

export const heroConfig: HeroConfig = {
  wordmarkText: "不明异常现象",
  eyebrow: "全球UAP/UFO深度研究报告 · 2026",
  titleLine1: "探索者",
  titleLine2: "",
  descriptionLine1: "基于全球22国、10个研究维度、",
  descriptionLine2: "300+独立信息源的科学评估",
  ctaText: "探索事件",
  ctaTargetId: "philosophy",
}

export const philosophyConfig: PhilosophyConfig = {
  eyebrow: "PHYSICAL CHARACTERISTICS / 物理特征",
  title: "五类可观测特征",
  body: "全球高可信度UAP案例在五个物理维度上显示出跨文化一致性：瞬时加速、低可观测性、跨介质能力、正升力/反重力、以及多传感器同步验证。这些特征构成了区分已知现象与真正异常的科学基准。",
  features: [
    {
      index: "01",
      key: "instantaneous-acceleration",
      cn: "瞬时加速",
      en: "Instantaneous Acceleration",
      metric: "> 5,000 g",
      metricLabel: "估算峰值加速度",
      description: "高可信度案例中，UAP 展现出远超已知飞行器与生物耐受极限的加速能力。Nimitz「Tic Tac」在数秒内完成大高度俯冲，多份雷达记录显示其瞬时速度变化对应数千 g 的加速度，却无可见推进羽流、音爆或热信号——这种近乎「无惯性」的运动，是区分真正异常与常规航空器的首要判据。",
    },
    {
      index: "02",
      key: "low-observability",
      cn: "低可观测性",
      en: "Low Observability",
      metric: "多波段隐身",
      metricLabel: "跨光谱特征管理",
      description: "部分目标仅在特定传感器波段可见。2024 年 Eglin 空军基地案例中的银色球体仅在短波红外（SWIR）中显现，可见光与雷达近乎无回波。目标可选择性地规避雷达、红外与目视探测，暗示其表面材质或场效应具备主动的多光谱管理能力，远超现役隐身技术的水平。",
    },
    {
      index: "03",
      key: "transmedium",
      cn: "跨介质",
      en: "Transmedium Travel",
      metric: "空 ↔ 海 无减速",
      metricLabel: "介质穿越能力",
      description: "跨介质指目标在空气、水体乃至临近真空之间自由穿行而不减速、不解体。Nimitz 事件中目标潜入海面下方仍保持高速；亚丁湾与潜艇声呐亦记录到水下高速运动体。空气与水的密度相差约 800 倍，常规载具无法承受这种介质突变——跨介质因此成为最具颠覆性的观测特征。",
    },
    {
      index: "04",
      key: "anti-gravity",
      cn: "正升力 / 反重力",
      en: "Positive Lift",
      metric: "无翼面悬浮",
      metricLabel: "未知升力机制",
      description: "目标常在无任何可见气动翼面、旋翼或喷口的情况下静止悬停或垂直爬升，且不受强风扰动。这种「正升力」既无法用浮力解释，也不符合常规气动推进，研究者推测其可能涉及尚未被理解的场推进或质量—惯性调制机制，是 UAP 研究中最接近「新物理」的方向。",
    },
    {
      index: "05",
      key: "multi-sensor",
      cn: "多传感器验证",
      en: "Multi-Sensor Confirmation",
      metric: "4+ 独立系统",
      metricLabel: "同步交叉验证",
      description: "最高可信度的判据，是同一目标被多个相互独立的传感器同时捕获。Nimitz 事件由 SPY-1 宙斯盾雷达、E-2C 预警机、飞行员目视与 ATFLIR 红外四路同步锁定，排除了单一传感器伪影、光学错觉与软件故障的可能。多传感器一致性，将「个人目击」提升为可被科学检验的物理证据。",
    },
  ],
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: "FEATURED EVENTS / 重点事件",
  title: "高置信度案例",
  projects: [
    {
      id: "nimitz-tic-tac",
      title: "Nimitz Tic Tac",
      location: "美国 · 圣地亚哥海岸",
      year: "2004",
      image: "images/event-nimitz.jpg",
      subtitle: "多传感器同步捕获的标杆案例",
      meta: [
        { label: "DATE", value: "2004-11-14" },
        { label: "LOCATION", value: "圣地亚哥海岸, 美国" },
        { label: "CONFIDENCE", value: "高置信度" },
        { label: "SENSORS", value: "雷达, FLIR, 目视, EW" },
      ],
      paragraphs: [
        "VF-41中队F/A-18F飞行员使用AN/ASQ-228 ATFLIR吊舱捕获了著名的\"Tic Tac\"视频。UAP被描述为白色椭圆形物体，约40英尺长，无可见推进系统。",
        "在8万英尺高空瞬间降至海面，并在海面上方以超音速飞行，无音爆。E-2C预警机雷达、SPY-1宙斯盾雷达、飞行员目视和FLIR红外同步捕获。",
        "2017年《纽约时报》/TTSA首次披露；2019年美国海军官方确认视频真实性；2024年AARO年度报告确认21起\"真正异常\"之一。"
      ],
    },
    {
      id: "colares",
      title: "Colares事件",
      location: "巴西 · 帕拉州",
      year: "1986",
      image: "images/event-colares.jpg",
      subtitle: "军方调查，平民受伤，大规模目击",
      meta: [
        { label: "DATE", value: "1986-05-19" },
        { label: "LOCATION", value: "Colares, 巴西" },
        { label: "CONFIDENCE", value: "高置信度" },
        { label: "SENSORS", value: "军方雷达, 目视, 医疗记录" },
      ],
      paragraphs: [
        "巴西空军正式启动Operação Prato（飞碟行动），由Uyrangê Hollanda上尉指挥。1986年5月19日大规模事件中，21名平民和5名军人受伤。",
        "超过2000名目击者报告低空发光物体。巴西空军部署F-5E和F-103战斗机，但未能拦截目标。2022年巴西国家档案馆正式公开档案。",
        "被光束照射导致烧伤、脱发、低血压等。物理样本未被保存于可靠证据链中，部分平民报告可能受社会心理因素影响。"
      ],
    },
    {
      id: "jal-1628",
      title: "JAL 1628",
      location: "日本 · 阿拉斯加上空",
      year: "1986",
      image: "images/event-jal1628.jpg",
      subtitle: "巨型UAP，雷达确认，FAA介入",
      meta: [
        { label: "DATE", value: "1986-11-17" },
        { label: "LOCATION", value: "阿拉斯加上空" },
        { label: "CONFIDENCE", value: "高置信度" },
        { label: "SENSORS", value: "雷达, 目视, FAA调查" },
      ],
      paragraphs: [
        "机长Kenju Terauchi报告目击两个小型UAP和一个巨型UAP（暗灰色，矩形，表面有灯光），描述为\"两倍于航空母舰大小\"。",
        "Anchorage空管在雷达上确认飞机附近存在不明目标。美国联邦航空管理局（FAA）正式介入调查，事件被FAA列为\"未解释\"。",
        "FAA未公开完整调查报告，雷达记录仅显示\"目标存在\"，未确认物体的物理特征。无其他航班同时目击。"
      ],
    },
    {
      id: "guizhou-forest",
      title: "空中怪车",
      location: "中国 · 贵州都溪",
      year: "1994",
      image: "images/event-guizhou.jpg",
      subtitle: "400亩树木截断，火车逆向位移",
      meta: [
        { label: "DATE", value: "1994-12-01" },
        { label: "LOCATION", value: "贵州都溪林场" },
        { label: "CONFIDENCE", value: "高置信度" },
        { label: "SENSORS", value: "目视, 物理痕迹, 气象记录" },
      ],
      paragraphs: [
        "数百名目击者被巨大轰鸣声惊醒，目击空中出现发红、绿色强光的不明物体。都溪林场约400亩马尾松被成片拦腰截断。",
        "相距5公里的贵阳车辆厂，50-70吨重火车车厢在略上坡轨道上逆向位移20余米。钢管柱被切断、砖砌围墙被推倒。",
        "现场无人员、牲畜伤亡，高压线、电话线、电缆完好。无军方传感器记录，无金属残骸或物理样本回收。"
      ],
    },
  ],
}

export const mediumsConfig: MediumsConfig = {
  sectionLabel: "OFFICIAL AGENCIES / 官方机构",
  items: [
    {
      cn: "GEIPAN",
      en: "FRANCE CNES",
      description: "运行50年，3200+案例，全球首个科学调查UAP的官方机构。A/B/C/D四级分类系统被全球参考。",
    },
    {
      cn: "AARO",
      en: "USA DOD",
      description: "2022年成立，1600+案例审查，21起真正异常。美国历史上最大规模政府UAP调查。",
    },
    {
      cn: "NASA",
      en: "UAP STUDY",
      description: "2022年独立研究小组，科学数据收集方法论。专注于科学数据收集而非案例审查。",
    },
    {
      cn: "PURSUE",
      en: "2026 DECRYPT",
      description: "2026年5–7月四轮解密累计334份UAP档案；2026年7月10日Release 04新增40份（含STS-80、印太视频）。历史性透明度提升。",
    },
    {
      cn: "防卫省",
      en: "JAPAN MOD",
      description: "2020年建立军事报告程序，2024年跨党派调查团体。推动建立类似AARO的专门机构。",
    },
  ],
}

export const footerConfig: FooterConfig = {
  visionText: "UAP是真实存在的物理现象，但截至2026年7月，全球没有任何国家公开独立验证过外星技术碎片。约2-5%的案例仍无法解释——这不是\"是否真实\"的问题，而是\"是什么\"的问题。",
  brandName: "UAP Explorer",
  columns: [
    {
      heading: "SOURCES",
      entries: [
        { text: "GEIPAN", href: "https://www.cnes-geipan.fr" },
        { text: "AARO", href: "https://www.aaro.mil" },
        { text: "NASA UAP", href: "https://science.nasa.gov/uap" },
        { text: "PURSUE", href: "https://www.war.gov/UFO" },
      ],
    },
    {
      heading: "NAVIGATION",
      entries: [
        { text: "首页", href: "#hero-section" },
        { text: "物理特征", href: "#philosophy" },
        { text: "重点事件", href: "#gallery" },
        { text: "官方机构", href: "#mediums" },
      ],
    },
    {
      heading: "LEGAL",
      entries: [
        { text: "数据截至 2026-07-10" },
        { text: "300+ 独立信息源" },
        { text: "22 国/地区覆盖" },
      ],
    },
  ],
  copyright: "© 2026 UAP Explorer",
  videoPath: "",
}

export const projectDetailConfig: ProjectDetailConfig = {
  backLabel: "← 返回",
}

export function getProjectById(id: string): ProjectData | undefined {
  return galleryConfig.projects.find((p) => p.id === id)
}
