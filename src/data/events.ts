export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Speculative'

export const physicalCharLabels = {
  'instantaneous-acceleration': { label: '瞬时加速', icon: 'Zap' },
  'low-observability': { label: '低可观测性', icon: 'EyeOff' },
  'transmedium': { label: '跨介质', icon: 'Waves' },
  'anti-gravity': { label: '正升力/反重力', icon: 'ArrowUp' },
  'multi-sensor': { label: '多传感器', icon: 'Radar' },
  'electromagnetic': { label: '电磁效应', icon: 'Zap' },
  'physical-traces': { label: '物理痕迹', icon: 'Footprints' },
  'nuclear-association': { label: '核关联', icon: 'Radioactive' },
  'group-sighting': { label: '群体目击', icon: 'Users' },
  'space': { label: '太空目击', icon: 'Telescope' },
  'orb-spherical': { label: '球状外形', icon: 'Circle' },
  'high-speed': { label: '高速飞行', icon: 'Wind' },
  'impact-resistant': { label: '抗冲击', icon: 'Shield' },
  'missile-deflection': { label: '导弹偏转', icon: 'Shield' },
  'transmedium-suspected': { label: '疑似跨介质', icon: 'Waves' },
  'dark-colored': { label: '深色外观', icon: 'Moon' },
  'football-sized': { label: '足球大小', icon: 'Circle' },
  'cylindrical': { label: '圆柱形', icon: 'Cylinder' },
  'mach-2+': { label: '超马赫2', icon: 'Gauge' },
  'transited-under-wing': { label: '翼下穿行', icon: 'Plane' },
  'near-miss': { label: '近撞事件', icon: 'AlertTriangle' },
  'flight-safety-hazard': { label: '飞行安全威胁', icon: 'AlertTriangle' },
  'metallic': { label: '金属质感', icon: 'Metal' },
  'commercial-airplane-size': { label: '客机尺寸', icon: 'Plane' },
  'stationary-hover': { label: '悬停静止', icon: 'PauseCircle' },
  'bright-white-light': { label: '亮白光', icon: 'Sun' },
  'sudden-disappearance': { label: '突然消失', icon: 'EyeOff' },
  'diamond-shaped': { label: '菱形', icon: 'Diamond' },
  'inverted-teardrop': { label: '倒泪滴形', icon: 'Droplet' },
  'only-swir-visible': { label: '仅SWIR可见', icon: 'Eye' },
  'high-speed-434-knots': { label: '434节高速', icon: 'Wind' },
  'stealth-spectrum-selective': { label: '光谱选择性隐身', icon: 'Ghost' },
  'straight-flight-path': { label: '直线航迹', icon: 'ArrowRight' },
  'constant-altitude': { label: '恒定高度', icon: 'BarChart' },
  'faster-than-conventional-aircraft': { label: '超常规速度', icon: 'Gauge' },
  'sustained-high-speed': { label: '持续高速', icon: 'Wind' },
  'silver': { label: '银色', icon: 'Sun' },
  'orb': { label: '球状', icon: 'Circle' },
  'silent': { label: '静音', icon: 'VolumeX' },
  'repeated-sighting': { label: '重复目击', icon: 'Repeat' },
  'star-shaped-contrast': { label: '六角星状对比', icon: 'Star' },
  'green-fireball': { label: '绿色火球', icon: 'Sparkles' },
  'rectangular': { label: '矩形外形', icon: 'Square' },
  'vertical-appendage': { label: '底部垂直附体', icon: 'ArrowDown' },
  'glare-halo': { label: '光晕/眩光', icon: 'Sun' },
  'self-luminous': { label: '自发光', icon: 'Sun' },
  'swarm-behavior': { label: '群集行为', icon: 'Users' },
  'thermal-contrast': { label: '热对比', icon: 'Sun' },
  'ninety-degree-turns': { label: '直角转弯', icon: 'CornerDownRight' },
  'radial-projections': { label: '径向突起', icon: 'GitBranch' },
  'plasma-like': { label: '类等离子体', icon: 'Sparkles' },
  'formation-merge': { label: '编队合并', icon: 'Merge' },
  'auto-track': { label: '自动跟踪锁定', icon: 'Crosshair' },
  'relative-rotation': { label: '相对旋转', icon: 'RotateCw' },
  'cold-orb': { label: '红外冷球', icon: 'Snowflake' },
  'triangular': { label: '三角形', icon: 'Triangle' },
} as const

export type PhysicalCharacteristic = keyof typeof physicalCharLabels

/** Core observables shown in timeline filters; descriptive tags remain on event detail */
export const corePhysicalCharacteristics = [
  'instantaneous-acceleration',
  'low-observability',
  'transmedium',
  'anti-gravity',
  'multi-sensor',
  'electromagnetic',
  'physical-traces',
  'nuclear-association',
  'group-sighting',
  'space',
] as const satisfies readonly PhysicalCharacteristic[]

export interface EventFigure {
  src: string
  caption: string
  captionEn?: string
  credit?: string
  creditEn?: string
  sourceUrl?: string
  layout?: 'full' | 'pair' | 'inset'
}

export interface EventVideo {
  type: 'video'
  url: string
  caption: string
  captionEn?: string
}

export interface UAPEvent {
  id: string
  date: string
  sortDate: string
  location: string
  locationEn?: string
  country: string
  countryEn?: string
  region: 'North America' | 'South America' | 'Europe' | 'Asia' | 'Oceania' | 'Africa' | 'Space'
  name: string
  nameEn?: string
  shortDesc: string
  shortDescEn?: string
  description: string
  descriptionEn?: string
  confidence: ConfidenceLevel
  image: string
  /** Detail-page figures (3–6). Local paths under /images/events/{id}/ */
  figures: EventFigure[]
  sensors?: string[]
  physicalCharacteristics: PhysicalCharacteristic[]
  sources: { label: string; url: string }[]
  limitations: string[]
  limitationsEn?: string[]
  relatedEvents?: string[]
  /** External video links only; images live in figures */
  media?: EventVideo[]
}

export const confidenceColors: Record<ConfidenceLevel, string> = {
  High: '#00D9A5',
  Medium: '#F5A623',
  Low: '#FF6B35',
  Speculative: '#B8B8B8',
}

export const confidenceLabels: Record<ConfidenceLevel, string> = {
  High: '高置信度',
  Medium: '中等置信度',
  Low: '低置信度',
  Speculative: '推测性',
}

export const regionLabels: Record<string, string> = {
  'North America': '北美洲',
  'South America': '南美洲',
  'Europe': '欧洲',
  'Asia': '亚洲',
  'Oceania': '大洋洲',
  'Africa': '非洲',
  'Space': '太空/月球',
}

export const events: UAPEvent[] = [
  {
    "id": "nimitz-tic-tac",
    "date": "2004-11-14",
    "sortDate": "2004-11-14",
    "location": "圣地亚哥海岸",
    "country": "美国",
    "region": "North America",
    "name": "Nimitz Tic Tac事件",
    "nameEn": "Nimitz Tic Tac Incident",
    "shortDesc": "白色椭圆形物体，无可见推进系统，在8万英尺瞬间降至海面，多传感器同步捕获",
    "description": "2004年11月14日，美国海军尼米兹航母战斗群在加利福尼亚州圣迭戈海岸约100英里处进行训练演习时，发生了现代UAP历史上最著名的事件之一。事件的起点是普林斯顿号导弹巡洋舰（USS Princeton）的AN/SPY-1B宙斯盾雷达系统，该舰在事发前两周就开始探测到异常空中目标——这些物体出现在80,000英尺以上的高空，然后以极快速度下降至海平面附近，速度约100节，且没有敌我识别信号（IFF）。\n\n当天上午，普林斯顿号雷达引导两架F/A-18F超级大黄蜂战斗机前往调查一个位于约20,000英尺高度、60英里外的雷达接触。指挥官大卫·弗拉沃尔（David Fravor，绰号'黑桃A'中队指挥官）和副驾驶亚历克斯·迪特里希（Alex Dietrich）以及他们的武器系统官共同目击了异常现象。他们首先看到海面上有一个剧烈的白色扰动区域，面积约相当于一架波音737大小，仿佛水面下有什么巨大的物体。在这个扰动上方约50英尺处，悬浮着一个白色、光滑、无翼的椭圆形物体，长约40英尺，形状酷似'薄荷糖'（Tic Tac），没有可见的控制面、发动机或排气尾迹。\n\n当弗拉沃尔以顺时针螺旋下降接近时，该物体竟然镜像般地模仿他的飞行轨迹，以同等速率上升。当弗拉沃尔试图以约半英里的距离进行正面拦截时，该物体在不到一秒内以远超马赫3的速度加速消失。随后，普林斯顿号雷达报告称该物体在不到一分钟内重新出现在战斗机预定的战斗巡逻点（CAP点），距离约60英里远。这种瞬间位移意味着加速度超过45,000英里/小时。\n\n第二架由查德·安德伍德（Chad Underwood）驾驶的F/A-18F随后起飞，携带了前视红外瞄准吊舱（ATFLIR/FLIR），拍摄了被称为'FLIR1'或'Nimitz视频'的影像。这段视频显示一个椭圆形物体在红外画面中以异常方式移动，最终在屏幕左侧突然加速消失。\n\n该事件在2017年12月16日由《纽约时报》的调查显示了AATIP（先进航空航天威胁识别计划）的存在而进入公众视野。2019年9月，美国海军正式确认视频的真实性。2020年4月27日，美国国防部正式发布了FLIR1视频，并声明该现象仍被归类为'未识别'。2023年7月，弗拉沃尔和迪特里希在国会公开作证。物理学家Kevin Knuth和SCU研究人员在2023年发表的同行评审论文中估算，该物体的加速度可能达到5,400至46,500 g，远超任何已知航空航天技术的承受能力。",
    "confidence": "High",
    "image": "/images/event-nimitz.jpg",
    "figures": [
      {
        "src": "/images/events/nimitz-tic-tac/01.jpg",
        "caption": "Nimitz Tic Tac事件——前视红外（ATFLIR/FLIR1）目标锁定主帧",
        "captionEn": "Nimitz Tic Tac Incident — Primary ATFLIR/FLIR1 Target Lock Frame",
        "credit": "美国海军航空系统司令部 / 国防部解密",
        "creditEn": "Naval Air Systems Command / DoD Declassified",
        "layout": "full"
      },
      {
        "src": "/images/events/nimitz-tic-tac/02.jpg",
        "caption": "ATFLIR红外视频高倍率瞄准帧——显示无翼Tic Tac机体在冷海面背景下的热边界特征",
        "captionEn": "ATFLIR High-Magnification Track Frame showing wingless Tic Tac silhouette against marine thermal background",
        "credit": "美国海军五角大楼官方发布",
        "creditEn": "US Navy / Pentagon Official Release",
        "layout": "pair"
      },
      {
        "src": "/images/events/nimitz-tic-tac/03.jpg",
        "caption": "普林斯顿号巡洋舰AN/SPY-1B宙斯盾相控阵雷达追踪航迹重构图",
        "captionEn": "USS Princeton AN/SPY-1B Aegis Phased-Array Radar Trajectory Reconstruction",
        "credit": "UAP科学研究联盟（SCU）动力学分析",
        "creditEn": "Scientific Coalition for UAP Studies (SCU)",
        "layout": "pair"
      },
      {
        "src": "/images/events/nimitz-tic-tac/04.webp",
        "caption": "大卫·弗拉沃尔中校F/A-18F超级大黄蜂近距截击与俯冲机动轨迹示意",
        "captionEn": "Commander David Fravor F/A-18F Super Hornet Intercept and Dive Maneuver Diagram",
        "credit": "美国国防部解密国会简报",
        "creditEn": "DoD Congressional Briefing Exhibit",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=nd7K5LafDF8",
        "caption": "FLIR1（Nimitz/Tic-Tac）官方视频——2004年尼米兹事件红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=pmNNj8qi8Ms",
        "caption": "60 Minutes报道——海军飞行员描述UFO遭遇（含Alex Dietrich）"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=7r8E4JyIqhk",
        "caption": "Joe Rogan Experience #1361——指挥官David Fravor讲述尼米兹事件"
      }
    ],
    "sensors": [
      "雷达",
      "FLIR红外",
      "目视",
      "EW电子战"
    ],
    "physicalCharacteristics": [
      "instantaneous-acceleration",
      "low-observability",
      "multi-sensor",
      "anti-gravity"
    ],
    "sources": [
      {
        "label": "The New York Times - Glowing Auras and 'Black Money' (2017)",
        "url": "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html"
      },
      {
        "label": "U.S. Department of Defense - Official Pentagon Release (2020)",
        "url": "https://www.defense.gov/News/News-Stories/Article/Article/2199898/dod-releases-videos-of-unidentified-aerial-phenomena/"
      },
      {
        "label": "Naval Air Systems Command - Official FOIA Documents",
        "url": "https://www.navair.navy.mil/foia/documents"
      },
      {
        "label": "Scientific Coalition for UAP Studies - Kinematic Analysis (2023)",
        "url": "https://www.explorescu.org/"
      },
      {
        "label": "The Exclusion Zone - Declassified Evidence (2026)",
        "url": "https://www.theexclusionzone.com/uss-nimitz-2004-tic-tac-uap-encounter/"
      },
      {
        "label": "CUFOS - UFOs and Intelligence: A Timeline (PDF)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      }
    ],
    "limitations": [
      "物体从未被拦截或回收",
      "物理性质仍为未解之谜"
    ],
    "relatedEvents": [
      "gimbal-gofast",
      "submarine-transmedium",
      "uss-jackson-tictac-2023"
    ],
    "locationEn": "Coast of San Diego, California",
    "countryEn": "United States",
    "shortDescEn": "Smooth white oblong craft with no visible propulsion observed dropping from 80,000 ft to sea level instantly, tracked across multiple radar and optical sensors.",
    "descriptionEn": "On November 14, 2004, the USS Nimitz Carrier Strike Group was conducting routine training drills roughly 100 miles southwest of San Diego, California, when one of the most significant encounters in modern UAP history unfolded. The incident began weeks earlier when the guided-missile cruiser USS Princeton (CG-59), operating the AN/SPY-1B passive phased-array Aegis radar, detected anomalous radar tracks appearing at altitudes above 80,000 feet and descending to sea level within seconds without generating sonic booms or showing standard IFF transponder responses.\n\nCommander David Fravor, commanding officer of VFA-41 'Black Aces', along with Lieutenant Commander Alex Dietrich and their Weapon Systems Officers in two F/A-18F Super Hornets, were vectored by the Princeton to investigate a target at 20,000 feet. Upon arriving on station, the pilots observed a churning patch of white water roughly the size of a Boeing 737 beneath the surface. Hovering 50 feet above the disturbance was an oblong, solid white, wingless object approximately 40 feet in length resembling a 'Tic Tac' candy, lacking any visible exhaust, wings, or flight control surfaces.\n\nAs Fravor initiated a descending circular intercept, the object mirrored his motion and began climbing toward his jet. When Fravor cut across the circle to close distance, the Tic Tac accelerated violently across his nose and vanished in less than a second. Moments later, the Princeton confirmed the target had reappeared at the fighters' predetermined Combat Air Patrol (CAP) point 60 miles away within seconds, implying velocities exceeding Mach 3 and instantaneous accelerations in excess of several thousand Gs.\n\nLater that day, another F/A-18F piloted by Lieutenant Chad Underwood equipped with an ATFLIR targeting pod acquired the object on infrared, producing the declassified 'FLIR1' video. The encounter was officially acknowledged by the US Navy in 2019, formally released by the Department of Defense in April 2020, and featured in public congressional hearings in July 2023. Peer-reviewed kinematic analyses estimate the object experienced accelerations between 5,400g and 46,500g.",
    "limitationsEn": [
      "The object was never intercepted or physical wreckage recovered",
      "Underlying propulsion mechanism remains unexplained by conventional physics"
    ]
  },
  {
    "id": "gimbal-gofast",
    "date": "2014-2015",
    "sortDate": "2014-01-01",
    "location": "美国东海岸",
    "country": "美国",
    "region": "North America",
    "name": "东海岸Gimbal/GoFast事件",
    "nameEn": "East Coast Gimbal / GoFast",
    "shortDesc": "航母战斗群多传感器验证，Gimbal\"旋转\"物体，GoFast高速低空飞行",
    "description": "2014年至2015年间，部署在大西洋上的西奥多·罗斯福号航空母舰（USS Theodore Roosevelt）战斗群的F/A-18超级大黄蜂战斗机飞行员报告了一系列持续近一年的UAP遭遇事件。飞行员瑞安·格雷夫斯（Ryan Graves）表示，这些物体'几乎每天'都会出现，持续至少两年。这些遭遇发生在从美国东海岸弗吉尼亚到佛罗里达的训练任务中，最终产生了两段最著名的现代UAP视频：'Gimbal'和'GoFast'。\n\n'Gimbal'视频拍摄于2015年1月21日，显示了一个在红外画面中呈现为圆盘形状的黑暗物体，似乎在飞行中旋转。视频中飞行员的声音充满震惊：'看那东西，伙计！'、'它在旋转！'、'它们都在逆风飞行，风速是120节从西边吹来。'物体还展示了一个从底部突出的小突起。一些分析师认为这可能是传感器伪影（红外眩光或万向节锁定效应），而飞行员坚称他们看到的是真实物体。\n\n'GoFast'视频则显示了一个在海面上方快速移动的物体。战斗机飞行员试图用红外传感器锁定它，但仪器无法跟上。视频中一名飞行员惊呼：'伙计，这他妈是一架无人机。'另一名补充道：'看看那东西，伙计！'虽然一些分析师认为该物体的速度可能源于视差效应，但该视频仍被列为五角大楼正式确认的未识别现象。\n\n这些2014-2015年的东海岸事件与2004年尼米兹事件一样，成为AATIP（先进航空航天威胁识别计划）调查的核心案例。该计划由前参议员哈里·里德资助，耗资2200万美元。这些事件的频繁性和一致性促使美国海军在2019年正式更新了UAP报告指南，建立了标准化协议，允许飞行员在不担心职业污名的情况下记录UAP遭遇。2019年6月，五角大楼向国会成员提供了关于这些遭遇的机密简报。2020年4月27日，美国国防部正式发布了'Gimbal.wmv'和'GoFast.wmv'两段视频，与FLIR1视频一起被确认为真实记录。2022年5月，众议院情报委员会举行了50年来首次公开UAP听证会，海军情报副总监斯科特·布雷展示了这些视频。",
    "confidence": "High",
    "image": "/images/event-gimbal.jpg",
    "figures": [
      {
        "src": "/images/events/gimbal-gofast/01.jpg",
        "caption": "罗斯福号航母战斗群Gimbal红外视频——旋转圆盘状UAP核心截图",
        "captionEn": "USS Theodore Roosevelt Gimbal IR Video — Rotating Disc-Shaped UAP Core Capture",
        "credit": "美国海军航空系统司令部 / 国防部解密",
        "creditEn": "Naval Air Systems Command / DoD Declassified",
        "layout": "full"
      },
      {
        "src": "/images/events/gimbal-gofast/02.jpg",
        "caption": "Gimbal视频连续帧——显示圆盘物体逆120节高空强风飞行中发生机体旋转",
        "captionEn": "Gimbal Video Sequence showing disc rotating against 120-knot jetstream winds",
        "credit": "美国海军F/A-18超级大黄蜂ATFLIR吊舱实录",
        "creditEn": "US Navy F/A-18 ATFLIR Pod Recording",
        "layout": "pair"
      },
      {
        "src": "/images/events/gimbal-gofast/03.jpg",
        "caption": "GoFast红外视频截帧——大西洋海面上空超低空极速掠海物体自动锁定",
        "captionEn": "GoFast Infrared Video Frame — Auto-track on high-speed low-altitude ocean skimmer",
        "credit": "美国国防部官方解密视频",
        "creditEn": "US Department of Defense Official Release",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=oCt837R2Sbs",
        "caption": "Gimbal——官方海军红外视频（2015年罗斯福号东海岸）"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=u4hQTFVU8wE",
        "caption": "GoFast——官方海军视频，快速移动的海上UAP"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=nd7K5LafDF8",
        "caption": "Pentagon三段官方UAP视频合集（FLIR1/Gimbal/GoFast）"
      }
    ],
    "sensors": [
      "雷达",
      "FLIR红外",
      "目视"
    ],
    "physicalCharacteristics": [
      "instantaneous-acceleration",
      "multi-sensor",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "The New York Times - AATIP Investigation (2017)",
        "url": "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html"
      },
      {
        "label": "U.S. Department of Defense - Official Pentagon Release (2020)",
        "url": "https://www.defense.gov/News/News-Stories/Article/Article/2199898/dod-releases-videos-of-unidentified-aerial-phenomena/"
      },
      {
        "label": "Naval Air Systems Command - Official FOIA Video Files",
        "url": "https://www.navair.navy.mil/foia/sites/g/files/jejdrs566/files/2020-04/2%20-%20GIMBAL.wmv"
      },
      {
        "label": "Global News - Pentagon Officially Releases UFO Videos (2020)",
        "url": "https://globalnews.ca/news/6873561/ufo-videos-pentagon-declassified/"
      },
      {
        "label": "Wikidisc - AATIP East Coast Incident Reports",
        "url": "https://www.wikidisc.org/wiki/Advanced_Aerospace_Threat_Identification_Program_(AATIP)"
      },
      {
        "label": "IFLScience - Pentagon Officially Releases Three UFO Videos",
        "url": "https://www.iflscience.com/the-pentagon-has-officially-released-three-ufo-videos-55853"
      }
    ],
    "limitations": [
      "AARO 2024暗示部分案例可能与Starlink卫星闪光相关"
    ],
    "locationEn": "East Coast Offshore, Virginia & Florida",
    "countryEn": "United States",
    "shortDescEn": "Dual carrier strike group infrared recordings documenting a rotating disc-shaped craft and a high-velocity low-altitude ocean skimmer.",
    "descriptionEn": "Between 2014 and 2015, naval aviators assigned to the USS Theodore Roosevelt Carrier Strike Group flying F/A-18 Super Hornets off the US East Coast from Virginia to Florida reported near-daily encounters with unidentified aerial objects. Lieutenant Ryan Graves and fellow pilots described spherical objects encasing cubes, anomalous fleets, and hypersonic targets operating against prevailing 120-knot winter jetstream winds without visible exhaust plumes or thermal signatures.\n\nThe deployment yielded two of the most widely scrutinized military videos in modern history: 'Gimbal' (recorded January 21, 2015) and 'GoFast'. The Gimbal video captures an ATFLIR mid-wave infrared lock on an inverted top-like or disc-shaped object exhibiting a distinct radiant aura that rotates against the aircraft's line-of-sight while maintaining horizontal velocity. Audio from the cockpit reveals the pilots' astonishment as they track an entire fleet of similar targets on their APG-79 AESA radar displays.\n\nThe GoFast video records a low-observable object skimming just above the Atlantic ocean surface at high relative angular rate, prompting the weapon system officer to shout 'Got it!' as the sensor achieves auto-tracker lock.\n\nThese videos, confirmed genuine by the US Navy in 2019 and officially published by the Pentagon in April 2020, served as the catalyst for the establishment of the Unidentified Aerial Phenomena Task Force (UAPTF) and the All-domain Anomaly Resolution Office (AARO), fundamentally transforming US military reporting protocols.",
    "limitationsEn": [
      "Some skeptics argue Gimbal rotation could involve IR optical glare rotation in gimbal mounts",
      "GoFast speed estimates depend heavily on calculated target altitude and parallax angles"
    ]
  },
  {
    "id": "colares",
    "date": "1977-07",
    "sortDate": "1977-07-01",
    "location": "Colares及Belterra",
    "country": "巴西",
    "region": "South America",
    "name": "Colares事件（Operação Prato）",
    "nameEn": "Colares Incident (Operation Prato)",
    "shortDesc": "1977–1978 巴西空军正式调查，数百次目击与伤情报告，战斗机未能拦截",
    "description": "1977年7月至1978年初，巴西亚马逊河口帕拉州（Pará）的科拉雷斯岛（Colares）及其周边地区爆发了一场大规模、持续数月的UFO目击浪潮，被称为‘科拉雷斯事件’或‘盘子行动（Operação Prato / Operation Plate）’。当地渔民和居民首先报告天空中出现了各种形状的不明飞行物——包括圆盘形、雪茄形、金字塔形和桶形‘母舰’，其中许多物体会发出强烈的红、绿、蓝光芒。更令居民恐惧的是，这些飞行物似乎会主动攻击人类：当地人将它们称为‘Chupa-Chupa’（吸吸怪），因为多名目击者声称被光束击中后身上留下烧伤、伤痕，甚至出现类似血液被抽干的虚弱感与两个针孔状伤口。由于恐慌蔓延，居民组织夜间守望、点燃篝火和鞭炮试图驱赶这些物体，科拉雷斯市长 José Ildone Favacho Soeiro 正式向巴西空军请求援助。巴西空军随后派遣了由 Uyrangê Hollanda 上尉率领的情报小组进驻调查，这是巴西空军历史上最重要的官方UFO调查行动之一。调查小组由 Hollanda 上尉和六名士官组成，装备有经纬仪、多种专业相机、录音机和望远镜。他们在约四个月的时间里记录了超过300次目击，采访了数百名证人，并拍摄了数百张照片和数小时电影胶片，其中一些影像 reportedly 显示UFO潜入或飞出附近的马拉若湾（Marajó Bay）水域。军方的照片中包含使用红外和紫外滤镜拍摄的光球与碟形物体。Hollanda 上尉本人也在11月的一次夜间巡逻中近距离遭遇了一个悬停在头顶的碟形物体，该物体发出黄色和蓝色光芒，并发出类似‘空调或自行车倒转齿轮’的声音，随后高速飞向大海。尽管 Hollanda 最终 compiled 了一份约500页的最终报告，包含数百张照片、地图和草图，但巴西空军在1978年初以‘未能确认任何异常现象’为由终止了调查，并将所有材料列为机密送往巴西利亚总部。直到2005年5月20日，巴西空军才在压力下允许少数UFO研究者检视其中约160份文件和110张照片。著名的法国UFO学者 Jacques Vallée 认为，部分受害者的伤痕与微波辐射效应一致。而1997年，退休后的 Hollanda 上尉向UFO杂志披露了大量亲身经历细节，但在访谈发布约三个月后，他被发现死于家中，官方结论为自杀（用浴袍腰带自缢），但亲友和阴谋论者对此深表怀疑。",
    "confidence": "High",
    "image": "/images/event-colares.jpg",
    "figures": [
      {
        "src": "/images/events/colares/01.jpg",
        "caption": "巴西空军Operação Prato（飞碟行动）官方调查档案封面影像",
        "captionEn": "Brazilian Air Force Operação Prato Official Investigation Dossier Cover",
        "credit": "巴西国家档案馆 / 巴西空军司令部解密",
        "creditEn": "National Archives of Brazil / FAB Declassified",
        "layout": "full"
      },
      {
        "src": "/images/events/colares/02.jpg",
        "caption": "乌兰热·奥兰达上尉现场观察记录手绘图——记录发光圆盘与光束释放轨迹",
        "captionEn": "Captain Uyrangê Hollanda Field Observation Sketch showing luminous disc and beam trajectory",
        "credit": "巴西空军情报局解密记录",
        "creditEn": "Brazilian Air Force Intelligence Archive",
        "sourceUrl": "https://images.squarespace-cdn.com/content/v1/654d055f3f0ea73d1b9a2810/2726eda8-bcee-431f-9807-bc02c1fc4c7d/v2-fnpdm-6lv2g.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/colares/03.jpg",
        "caption": "科拉雷斯岛居民遭未知光束照射所致皮肤灼伤与组织穿刺医学检验档案",
        "captionEn": "Medical Documentation of Radiation Burns and Puncture Lesions on Colares Residents",
        "credit": "科拉雷斯市立卫生所首席法医档案",
        "creditEn": "Colares Municipal Health Service Forensic File",
        "sourceUrl": "https://images.squarespace-cdn.com/content/v1/67d20fce28210702b779a752/bdcc99c5-682e-4316-9e36-35abed43ec71/1.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/colares/04.webp",
        "caption": "巴西空军调查组夜间监测拍摄的近地发光体低空机动照片",
        "captionEn": "Brazilian Air Force Nighttime Surveillance Photograph of Low-Altitude Luminous Craft",
        "credit": "Operação Prato 摄影底片解密档案",
        "creditEn": "Operação Prato Photographic Archive",
        "layout": "inset"
      },
      {
        "src": "/images/events/colares/05.webp",
        "caption": "Colares事件（Operação Prato）——档案影像 05",
        "captionEn": "Colares Incident (Operation Prato) — Archival Figure 5",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/7hdaW6a9CbY",
        "caption": "Operação Prato - Entrevista com Coronel Uyrangê Hollanda (1997 interview)"
      },
      {
        "type": "video",
        "url": "https://rumble.com/v2saf7q-official-photos-from-colares-ufo-flap.html",
        "caption": "Official Photos from Colares UFO Flap (Rumble documentary)"
      }
    ],
    "sensors": [
      "军方雷达",
      "目视",
      "医疗记录"
    ],
    "physicalCharacteristics": [
      "electromagnetic",
      "physical-traces",
      "group-sighting",
      "low-observability"
    ],
    "sources": [
      {
        "label": "The Black Vault - Operacao Prato Documents (MUFON/Bob Pratt)",
        "url": "https://documents.theblackvault.com/documents/MUFON/Pratt/prato.pdf"
      },
      {
        "label": "Patrick Gross UFO Database - Colares 1977",
        "url": "https://ufologie.patrickgross.org/htm/colares.htm"
      },
      {
        "label": "Patrick Gross - Operation Saucer Official Doc Transcription",
        "url": "https://ufologie.patrickgross.org/op/op01-1-01.htm"
      },
      {
        "label": "CUFOs - UFOs and Intelligence Timeline (Colares entry)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      },
      {
        "label": "Listverse - 10 Official Government Programs That Studied UFOs",
        "url": "https://listverse.com/2015/03/23/10-official-government-programs-that-studied-ufos/"
      },
      {
        "label": "Vetted Show - Colares Brazil UFO Incident Analysis",
        "url": "https://www.vetted.show/blog/colares-brazil-ufo-incident-a-closer-look-at-the-unexplained-phenomenon"
      },
      {
        "label": "Z档案 - 科拉雷斯事件（中文）",
        "url": "http://zfilesuap.com/zh/cases/colares-1977"
      },
      {
        "label": "MUFON Journal - March 2001 (Bob Pratt/Colares)",
        "url": "https://admin.unhiden.com/sites/default/files/books/MUFON%20Journals/MUFON%20Journal%20-%20March%202001.pdf"
      }
    ],
    "limitations": [
      "物理样本未被保存于可靠证据链中",
      "部分平民报告可能受社会心理因素影响"
    ],
    "locationEn": "Colares Island, Pará",
    "countryEn": "Brazil",
    "shortDescEn": "Brazilian Air Force official investigation (Operação Prato) into intense luminous phenomena and physiological beam injuries on island residents.",
    "descriptionEn": "In late 1977, the island of Colares in northern Brazil experienced intense, repeated waves of luminous aerial phenomena known locally as 'Chupa-Chupa'. Villagers reported nocturnal encounters with craft emitting focused light beams that caused severe skin lesions, puncture wounds, and acute anemia. The panic grew so severe that local authorities formally requested intervention from the Brazilian Armed Forces.\n\nIn response, the Brazilian Air Force (FAB) launched 'Operação Prato' (Operation Saucer) under the command of Captain Uyrangê Hollanda. For four months, military personnel, intelligence officers, and medical teams conducted round-the-clock surveillance, compiling over 500 photographs, 16 hours of film footage, and hundreds of detailed observational sketches depicting luminous discs, cylinders, and probes executing sharp right-angle maneuvers over the bay and jungle.\n\nDr. Wellaide Cecim Carvalho, the chief medical officer of the Colares health clinic, formally treated over 35 victims suffering from radiation-like burns and necrotic puncture marks. The Brazilian government declassified over 2,000 pages of official Operação Prato dossiers in 2004, confirming it as one of the most rigorously documented state military investigations into physical UAP encounters.",
    "limitationsEn": [
      "A substantial portion of the original 16mm film footage remains withheld in classified military archives",
      "Captain Hollanda gave extensive whistleblowing interviews in 1997 before dying under tragic circumstances"
    ]
  },
  {
    "id": "jal-1628",
    "date": "1986-11-17",
    "sortDate": "1986-11-17",
    "location": "阿拉斯加上空",
    "country": "日本",
    "region": "Asia",
    "name": "JAL 1628号班机UFO事件",
    "nameEn": "JAL 1628 UFO Incident",
    "shortDesc": "机长目击巨型UAP（\"两倍于航空母舰大小\"），Anchorage空管雷达确认，FAA正式介入",
    "description": "1986年11月17日，日本航空1628号货运航班（JAL Cargo Flight 1628）在飞越阿拉斯加内陆空域时，经历了一起持续约50分钟的UFO遭遇事件，这被认为是航空史上最可靠、记录最完整的UFO案例之一。机长寺内谦寿（Kenju Terauchi）是一位拥有超过10,000飞行小时经验的前战斗机飞行员，当晚他驾驶波音747-246F货机从巴黎经雷克雅未克和安克雷奇飞往东京。当地时间约17:11，机组在35,000英尺高度飞行时，首先注意到前方和下方有两组彩色灯光。几分钟后，一个巨大的物体从黑暗中显现——机长描述其形状像'核桃壳'或'土星'，估计有航空母舰两倍大小。在接下来的32分钟里，多个雷达系统记录到了异常目标：安克雷奇空中航线交通管制中心（ARTCC）显示间歇性原始雷达回波；埃尔门多夫空军基地（Elmendorf AFB）的NORAD区域作战控制中心（ROCC）也短暂捕捉到无应答机的目标；飞机自带的气象雷达显示前方7-8海里处有物体。机组获准下降至31,000英尺并执行360度转弯，但不明物体始终跟随。寺内机长报告说，小型飞行器的灯光'像圣诞树一样'明亮，甚至照亮了驾驶舱，他能感受到热量照射在脸上。约17:53，物体消失。18:20飞机安全降落安克雷奇。事件后，美国联邦航空管理局（FAA）进行了调查，并在1987年3月5日公开数据包，表示'无法证实机组所看到的内容'。FAA将雷达异常解释为可能的'分裂雷达回波'或干扰杂波。然而，事件的后续发展更加扑朔迷离：FAA事故调查部门负责人约翰·卡拉汉（John Callahan）在2001年披露，他曾在华盛顿FAA的'Round Room'向CIA代表、FBI代表和里根政府科学顾问小组展示雷达数据和语音录音，而会议结束时一名CIA代表据称指示'这个事件从未发生过'，要求所有参与者保密。寺内机长因向媒体透露事件而被日本航空停飞数年，后转任 desk job。该案例因涉及多个雷达系统的独立确认、经验丰富的专业机组目击、大量政府文件（通过FOIA请求获得）以及可能的官方掩盖行为，成为UFO研究界的标杆案例。",
    "confidence": "High",
    "image": "/images/event-jal1628.jpg",
    "figures": [
      {
        "src": "/images/events/jal-1628/01.jpg",
        "caption": "日航1628号波音747货机遭遇巨型UAP事件封面影像",
        "captionEn": "JAL Flight 1628 Boeing 747 Encounter — Primary Cover Image",
        "credit": "UAP Explorer Archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/jal-1628/02.jpg",
        "caption": "寺内谦寿机长官方手绘图——生动记录伴随客机飞行的两艘方形发光体与后方母船",
        "captionEn": "Captain Kenju Terauchi Official Cockpit Sketch of Two Rectangular Craft and Giant Spherical Mothership",
        "credit": "美国联邦航空管理局（FAA）事故调查局档案",
        "creditEn": "FAA Accident Investigation Division Record",
        "layout": "pair"
      },
      {
        "src": "/images/events/jal-1628/03.jpg",
        "caption": "FAA安克雷奇空管中心与埃尔门多夫空军基地一阶初级雷达轨迹回放打印件",
        "captionEn": "FAA Anchorage Center & Elmendorf AFB Primary Radar Playback Printout",
        "credit": "约翰·卡拉汉（FAA调查处长）解密档案",
        "creditEn": "John Callahan Declassified FAA Archive",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=beCAZVCpwrc",
        "caption": "Pilots & JAL 1628 UFO Event - 飞行员讨论与FAA文件分析"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=dQwERrmsgFs",
        "caption": "TheFlightChannel JAL 1628航空事件重建动画"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=GjDMmaxmvOo",
        "caption": "UFO Files: Japan's Enigmatic Triangle 纪录片片段"
      }
    ],
    "sensors": [
      "雷达",
      "目视",
      "FAA调查"
    ],
    "physicalCharacteristics": [
      "multi-sensor",
      "anti-gravity",
      "low-observability"
    ],
    "sources": [
      {
        "label": "The Black Vault - JAL 1628完整案例档案与FAA文件",
        "url": "https://www.theblackvault.com/casefiles/the-vault-files-1986-alaska-jal-flight-1628/"
      },
      {
        "label": "FAA原始调查文件PDF (FOIA发布)",
        "url": "https://documents.theblackvault.com/documents/ufos/jal1628/733667-001-005.pdf"
      },
      {
        "label": "Patrick Gross UFO档案 - JAL 1628详细案例",
        "url": "https://ufologie.patrickgross.org/htm/japan86.htm"
      },
      {
        "label": "UFO Briefing Document - 1986年JAL 747阿拉斯加案例",
        "url": "https://www.bibliotecapleyades.net/ciencia/ufo_briefingdocument/1986b.htm"
      },
      {
        "label": "NICAP - 阿拉斯加JAL 1628案例总结",
        "url": "https://www.nicap.org/861117alaska_dir.htm"
      },
      {
        "label": "TOCANA - 解密文件揭示50分钟遭遇时间线",
        "url": "https://en.tocana.jp/2025/09/jal-1628-ufo-alaska_entry.html"
      },
      {
        "label": "The Cold File - JAL 1628深度调查",
        "url": "https://www.thecoldfile.com/articles/1986-jal-1628/"
      }
    ],
    "limitations": [
      "FAA未公开完整调查报告",
      "无其他航班同时目击",
      "可能是视觉误判距离/大小"
    ],
    "locationEn": "Airspace over Anchorage & Yukon, Alaska",
    "countryEn": "United States",
    "shortDescEn": "Boeing 747 cargo flight accompanied for 50 minutes by two rectangular craft and a giant spherical object, tracked on FAA and military radar.",
    "descriptionEn": "On November 17, 1986, Japan Airlines Flight 1628, a Boeing 747-200F cargo jet piloted by veteran Captain Kenju Terauchi with First Officer Takanori Tamefuji and Flight Engineer Yoshio Tsukuba, was en route from Paris to Tokyo via Anchorage, Alaska. While cruising at 35,000 feet over eastern Alaska, the crew observed two illuminated objects appearing on their left side.\n\nThe two rectangular objects positioned themselves within 1,000 feet of the aircraft, matching its speed. The crew described bright rectangular arrays of thruster lights resembling embers and felt radiant heat on their faces in the cockpit. Captain Terauchi attempted evasive maneuvers, but the objects followed synchronously.\n\nShortly thereafter, the two smaller objects departed, revealing an immense, dimly glowing spherical craft behind the Boeing 747, described by Captain Terauchi as being 'two times larger than an aircraft carrier'. The giant object shadowed the airliner for nearly 50 minutes. Anchorage FAA Air Traffic Control and the USAF Elmendorf Regional Operational Control Center confirmed primary radar returns painting anomalous targets alongside JAL 1628.\n\nFAA Division Chief of Accidents and Investigations John Callahan later disclosed that senior FAA, CIA, and Reagan scientific advisory personnel confiscated all radar tapes, printouts, and flight data during a classified debriefing, ordering participants to swear secrecy.",
    "limitationsEn": [
      "Radar data exhibited intermittent dropouts across certain civilian secondary transponder channels",
      "CSICOP proposed Jupiter and Mars reflections, which the FAA radar recordings and cockpit heat sensations strongly contradict"
    ]
  },
  {
    "id": "malmstrom-icbm",
    "date": "1967-03",
    "sortDate": "1967-03-01",
    "location": "蒙大拿州Malmstrom",
    "country": "美国",
    "region": "North America",
    "name": "Malmstrom空军基地ICBM失效",
    "nameEn": "Malmstrom ICBM Failure",
    "shortDesc": "10枚民兵洲际弹道导弹同时失效，基地安保目击低空发光物体",
    "description": "1967年3月，美国蒙大拿州马尔姆斯特罗姆空军基地（Malmstrom AFB）发生了冷战时期最耸人听闻的UFO与核武器交互事件。该基地隶属美国空军第341战略导弹联队，负责管控美国境内最重要的洲际弹道导弹（ICBM）之一。\n\n事件分为两次独立但高度相似的遭遇。第一次发生在3月16日（Echo Flight），当时地下发射控制中心的值班人员突然接到地面安全警卫的紧急报告，称一个散发红光的碟形不明物体正悬停在前门上空。几乎在同一时刻，控制台上的10枚民兵I型（Minuteman I）洲际弹道导弹几乎在10秒内相继从战备状态转为\"No-Go\"（无法发射）状态。维修和技术团队紧急排查，却找不到任何机械故障或电力中断的原因。第二次类似事件发生在3月24日（Oscar Flight），当时1st Lt. Robert Salas正在值班。安全警卫报告称，一个红色发光的椭圆形UFO悬停在发射控制设施外，随即导弹再次以每秒一枚的速度接连离线。更离奇的是，一名试图靠近该物体的警卫据称受了轻伤，并被直升机紧急撤离。\n\n美国空军对此事展开了最高级别的内部调查。美国国防部承包商波音公司（Boeing）被秘密派遣到基地，并出具了一份被标记为\"SECRET\"的《马尔姆斯特罗姆Echo Flight事件工程调查报告》。报告指出，所有10枚导弹的制导和控制系统同时出现了\"No-Go\"信号，但导弹的电源系统却完全正常。波音工程师在实验室中尝试模拟了这一故障，他们通过向逻辑耦合器注入某种\"信号噪声\"成功复现了导弹离线的现象，但始终无法确定这种信号的真实来源。 decades later, 通过《信息自由法》（FOIA）申请解密的第341战略导弹联队历史记录中，虽然淡化了UFO与导弹故障之间的关联，但时任单位历史学家David Gamble后来向研究者Jim Klotz承认，在编纂官方历史时确实了解到有关UFO活动的报告。\n\n2010年9月27日，Robert Salas上尉联合其他六名退伍军人在华盛顿国家新闻俱乐部（National Press Club）举行公开新闻发布会，宣誓作证并提供了22份书面和视频证据。2023年2月，Salas更是向五角大楼新成立的\"全域异常现象解析办公室\"（AARO）进行了近两小时的详细汇报。这一系列事件至今被视为UFO能够直接干扰美国战略核威慑系统的最强有力证据之一，也引发了对电磁脉冲（EMP）与未知飞行物之间关系的持续讨论。",
    "confidence": "High",
    "image": "/images/event-malmstrom.jpg",
    "figures": [
      {
        "src": "/images/events/malmstrom-icbm/01.jpg",
        "caption": "马姆斯特罗姆空军基地ICBM发射控制中心与核弹头井区",
        "captionEn": "Malmstrom Air Force Base ICBM Launch Control Facility and Silo Field",
        "credit": "美国空军历史研究局",
        "creditEn": "US Air Force Historical Research Agency",
        "layout": "full"
      },
      {
        "src": "/images/events/malmstrom-icbm/02.jpg",
        "caption": "民兵I型洲际导弹地下发射控制台（Echo Flight）——事发时10枚导弹瞬间全部掉线",
        "captionEn": "Minuteman I Underground Launch Console — 10 ICBMs simultaneously dropped to No-Go status",
        "credit": "罗伯特·萨拉斯上尉解密档案",
        "creditEn": "Captain Robert Salas Declassified Archive",
        "layout": "pair"
      },
      {
        "src": "/images/events/malmstrom-icbm/03.jpg",
        "caption": "解密空军安全事件日志与波音公司系统故障排查分析报告",
        "captionEn": "Declassified Air Force Incident Log and Boeing Engineering Failure Assessment Report",
        "credit": "美国战略空军司令部（SAC）FOIA解密",
        "creditEn": "Strategic Air Command FOIA Release",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=xNxHrGLvsMk",
        "caption": "Robert Salas 关于1967年马尔姆斯特罗姆UFO/导弹事件的证词访谈"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=-7HIWQX0bz0",
        "caption": "Robert Salas 在国家新闻俱乐部关于UFO与核武器的公开演讲（2010年）"
      }
    ],
    "sensors": [
      "导弹系统",
      "目视",
      "官方报告"
    ],
    "physicalCharacteristics": [
      "electromagnetic",
      "nuclear-association",
      "physical-traces"
    ],
    "sources": [
      {
        "label": "NICAP - Malmstrom AFB Missile/UFO Incident (1967)",
        "url": "https://www.nicap.org/malmstrom67dir.htm"
      },
      {
        "label": "The Black Vault - Declassified Malmstrom Documents (PDF)",
        "url": "https://documents.theblackvault.com/documents/ufos/malmstromufo.pdf"
      },
      {
        "label": "Earthfiles - 20 ICBMs at Malmstrom AFB Powered Down by UFOs",
        "url": "https://www.earthfiles.com/2021/10/07/20-icbms-at-malmstrom-afb-in-march-1967-and-50-icbms-at-warren-afb-in-2010-powered-down-by-ufos/"
      },
      {
        "label": "New Space Economy - The 1967 Malmstrom Air Force Base UFO Incident",
        "url": "https://newspaceeconomy.ca/2025/04/13/the-1967-malmstrom-air-force-base-ufo-incident/"
      },
      {
        "label": "Calgary Herald - Seminal Montana UFO Events Pentagon Briefing",
        "url": "https://calgaryherald.com/news/seminal-montana-ufo-events-pentagon"
      },
      {
        "label": "CUFOS - UFOs and Intelligence Timeline (PDF)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      },
      {
        "label": "3AF/SIGMA2 Rapport Avancement 2021 (French Defense Report)",
        "url": "https://ayuba.fr/pdf/UAP-3AF-SIGMA2-rapport-avancement-2021-fr.pdf"
      }
    ],
    "limitations": [
      "因果关系未被证明",
      "可能是时间巧合或电磁效应导致"
    ],
    "locationEn": "Malmstrom Air Force Base, Montana",
    "countryEn": "United States",
    "shortDescEn": "Simultaneous failure and shutdown of ten nuclear-armed Minuteman ICBMs while glowing red saucer hovered over security gate.",
    "descriptionEn": "On March 24, 1967, at the Echo Flight Launch Control Facility of Malmstrom Air Force Base near Great Falls, Montana, Deputy Missile Combat Crew Commander Captain Robert Salas was stationed 60 feet underground monitoring ten Minuteman I nuclear intercontinental ballistic missiles. Above ground, security personnel alerted Salas that a glowing red-orange saucer-shaped object was hovering silently directly above the main security entry gate.\n\nWithin seconds of the top-side alert, alarming warning klaxons sounded across the underground launch console: all ten Minuteman ICBMs abruptly cascaded from 'Strategic Alert' status to 'No-Go' (disabled). Each missile experienced an uncommanded Guidance and Control system failure, rendering the nuclear warheads incapable of launch.\n\nEight days earlier, on March 16, 1967, an identical incident occurred at Oscar Flight under Lieutenant Robert Jamison and Colonel Eric Carlson, where another flight of ten nuclear missiles went off-line during an overhead UAP intrusion. Comprehensive Boeing and Air Force technical post-mortems failed to identify any electromagnetic pulse, power surge, or hardware defect capable of disabling ten isolated missile systems simultaneously.\n\nThe incident remains one of the most prominent documented cases of UAP interference with nuclear command and control infrastructure worldwide.",
    "limitationsEn": [
      "Official Air Force logs classified the incident for decades under Project Blue Book exemptions",
      "No physical trace of weapon tampering was left on the underground silos themselves"
    ]
  },
  {
    "id": "belgium-ufo-wave",
    "date": "1989-1991",
    "sortDate": "1989-01-01",
    "location": "比利时全境",
    "country": "比利时",
    "region": "Europe",
    "name": "比利时UFO波",
    "nameEn": "Belgium UFO Wave",
    "shortDesc": "超过3000起目击报告，13,500人目击，F-16雷达9次锁定，政府公开承认",
    "description": "1989年11月至1990年4月间，比利时上空发生了现代UFO史上记录最完整、规模最大的集体目击浪潮之一——比利时UFO浪潮（Belgian UFO Wave）。事件始于1989年11月29日晚，两名比利时宪兵（Heinrich Nicoll 和 Hubert von Montigny）在东部城市欧本（Eupen）附近巡逻时，发现一架巨大的黑色三角形飞行器悬停在树梢高度，其三个角上装有强烈的白色灯光，中央有一个脉动的红色或琥珀色信标。该物体完全无声，甚至以极低速度移动，却能保持稳定的飞行状态。当晚，仅列日省就有约30组独立证人报告了相同的物体。在接下来的几个月里，比利时社会太空现象研究协会（SOBEPS）记录了超过2,000至2,600份正式目击报告，估计共有约13,500人曾目睹这些三角形物体。目击描述高度一致：等边或等腰三角形、黑色机身、无机翼或机身结构、完全无声、可在低空悬停并瞬间加速。高潮出现在1990年3月30日至31日夜间，比利时空军雷达站和多地宪兵报告空域出现不明目标，空军紧急从博沃尚（Beauvechain）基地起飞两架F-16战斗机进行拦截。F-16的先进脉冲多普勒雷达多次短暂锁定目标，数据显示目标从接近静止瞬间加速至超过1,000节（约1,850公里/小时），并在几秒钟内从约10,000英尺骤降至500英尺，甚至出现了计算高度为负值的异常读数（可能的地面反射或‘天使’效应）。飞行员始终未能以目视确认目标。比利时空军参谋部作战负责人 Wilfried De Brouwer 上校（后晋升少将）在1990年7月11日举行了史无前例的公开新闻发布会，展示了F-16雷达数据磁带，并承认现象真实存在且无法解释。SOBEPS出版了两卷厚重的调查报告《Vague d'OVNI sur la Belgique》。然而，该事件的两大‘铁证’后来均受到挑战：2011年7月，最著名的小雷尚（Petit-Rechain）三角形UFO照片的拍摄者 Patrick Maréchal 在比利时RTL电视台公开承认，该照片是用聚苯乙烯泡沫板切割成三角形、涂黑、在角上安装手电筒并悬挂拍摄而成的伪造品。此外，比利时空军电子战中心（Salmon上校和物理学家Gilmard）以及鲁汶天主教大学的物理学家 Auguste Meessen 后续分析认为，部分F-16雷达异常读数可能是由大气‘布拉格散射’（Bragg scattering）或雷达模式切换造成的电子假象。尽管如此，De Brouwer 少将后来仍强调，至少有一次地面雷达与F-16雷达的接触是相关联的，不能完全用电磁干扰解释。比利时政府最终关闭调查，结论为‘现象真实，但无法识别’。",
    "confidence": "High",
    "image": "/images/event-belgium.jpg",
    "figures": [
      {
        "src": "/images/events/belgium-ufo-wave/01.jpg",
        "caption": "比利时不明飞行物波——巨型三角飞行器目击事件概览",
        "captionEn": "Belgian UFO Wave — Triangular Craft Sighting Overview",
        "credit": "比利时空间异常研究会（SOBEPS）",
        "creditEn": "SOBEPS Research Society",
        "layout": "full"
      },
      {
        "src": "/images/events/belgium-ufo-wave/02.jpg",
        "caption": "比利时空军参谋长德布劳威尔上校向国际媒体公布F-16机载APG-66雷达截获数据",
        "captionEn": "Colonel Wilfried De Brouwer Presenting F-16 APG-66 Onboard Radar Intercept Telemetry",
        "credit": "比利时国防部新闻发布会（1990年）",
        "creditEn": "Belgian Ministry of Defence Press Conference (1990)",
        "sourceUrl": "https://i0.wp.com/unidentifiedphenomena.com/wp-content/uploads/2023/02/belgian-ufo-wave-1-jpg.webp?resize=657%2C581&ssl=1",
        "layout": "pair"
      },
      {
        "src": "/images/events/belgium-ufo-wave/03.webp",
        "caption": "F-16战斗机火控雷达锁定目标瞬时加速度突破40G的脉冲多普勒轨迹图",
        "captionEn": "F-16 Fire-Control Radar Doppler Track Diagram demonstrating 40G Instantaneous Acceleration",
        "credit": "比利时皇家空军作战指挥部",
        "creditEn": "Belgian Royal Air Force Operations Command",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=wkm3KxIyZDE",
        "caption": "The Longstanding Mystery of BLACK TRIANGLE UFOs (YouTube documentary referencing Belgian Wave)"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=YhSLMzX3Mnw",
        "caption": "TRIANGULAR UFO Breakdown by Author David Marler (HISTORY'S UNIDENTIFIED appearance)"
      }
    ],
    "sensors": [
      "F-16雷达",
      "目视",
      "群体目击"
    ],
    "physicalCharacteristics": [
      "instantaneous-acceleration",
      "multi-sensor",
      "group-sighting",
      "anti-gravity"
    ],
    "sources": [
      {
        "label": "Theories of Anything - Belgian UAP Wave 1989-1990 (Academic summary)",
        "url": "https://theoriesofanything.com/research/belgian-uap-wave-1989-1990"
      },
      {
        "label": "XUFOS - Belgian Wave 1990 (Official report & aftermath)",
        "url": "https://xufos.com/belgian-wave-1990.php"
      },
      {
        "label": "Biblioteca Pleyades - UFO Briefing Doc: Belgian Wave (Official SOBEPS/Air Force context)",
        "url": "https://www.bibliotecapleyades.net/ciencia/ufo_briefingdocument/1990.htm"
      },
      {
        "label": "UFOCasebook - Belgium UFO Wave 1989",
        "url": "https://www.ufocasebook.com/Belgium.html"
      },
      {
        "label": "Sohu - 1989-1990年比利时三角形飞行器UFO大潮 (中文)",
        "url": "https://www.sohu.com/a/1043496266_121150485"
      },
      {
        "label": "Discovery UK - The Belgian UFO Wave: Close Encounter or Mass Hysteria?",
        "url": "https://www.discoveryuk.com/mysteries/the-belgian-ufo-wave-close-encounter-or-mass-hysteria/"
      },
      {
        "label": "The Galactic Mind - Case File: Belgian UFO Wave 1989-1990 (with primary sources)",
        "url": "https://www.thegalacticmind.com/case-file-belgian-ufo-wave-1989-to-1990/"
      },
      {
        "label": "CUFOs - UFOs and Intelligence Timeline (Belgian Wave entries)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      }
    ],
    "limitations": [
      "F-16雷达锁定但飞行员未目视确认",
      "可能是雷达回波异常（地面杂波或气象现象）"
    ],
    "locationEn": "Wallonia & Brussels Region",
    "countryEn": "Belgium",
    "shortDescEn": "Over 2,000 witnessed sightings of large triangular craft executing extreme accelerations, confirmed by F-16 onboard fire-control radars.",
    "descriptionEn": "Starting in November 1989 and continuing through mid-1991, Belgium witnessed one of the most extensive and well-documented UAP waves in European history. Thousands of citizens, including gendarmerie officers, military pilots, and civil engineers, reported large, silent triangular craft with bright white lights at each vertex and a pulsating red light in the center flying at low altitudes.\n\nThe climax occurred on the night of March 30–31, 1990, when civilian police reported an anomalous aerial object near Glons. Two Belgian Air Force F-16 Fighting Falcons were scrambled from Beauvechain Air Base. Over an intense 60-minute pursuit, the F-16s' onboard Westinghouse APG-66 Doppler radars achieved multiple hard lock-ons on the target.\n\nFlight recorder data showed the object accelerated from 280 km/h to over 1,800 km/h while instantaneously altering its altitude from 3,000 meters to 1,500 meters in two seconds—equivalent to an acceleration exceeding 40 Gs, far beyond the physiological limit of any human pilot or structural limits of conventional aircraft.\n\nBelgian Air Force Chief of Operations Colonel (later Major General) Wilfried De Brouwer conducted unprecedented public press conferences detailing the radar telemetry and openly cooperating with the civilian research organization SOBEPS.",
    "limitationsEn": [
      "The famous Petit-Rechain photograph was confessed to be a hoax decades later, though thousands of witness reports and military radar telemetry remain validated"
    ]
  },
  {
    "id": "xiaoshan-airport",
    "date": "2010-07-07",
    "sortDate": "2010-07-07",
    "location": "杭州萧山国际机场",
    "country": "中国",
    "region": "Asia",
    "name": "杭州萧山机场UFO事件",
    "nameEn": "Hangzhou Xiaoshan Airport UFO",
    "shortDesc": "航班机组同时目击，机场关闭跑道1小时零5分钟，12架航班备降，新华社官方确认",
    "description": "2010年7月7日晚上，中国杭州萧山国际机场发生了一起引起全国乃至国际关注的UFO事件。当晚20:45左右，一个准备降落的航班机组首先发现空中有不明飞行物，随即通知了空中交通管制部门。该物体被描述为'一个点状闪烁的不明飞行物'，在空中快速移动。出于安全考虑，航空当局在几分钟内做出决定：关闭萧山机场所有起降航班，并将进港航班备降至宁波和无锡机场。机场关闭持续1小时5分钟，共有12个航班备降、6个航班延误，影响超过1,000名乘客。值得注意的是，据机场值班经理罗妙祥表示，机场航站楼内的乘客和地面工作人员并未目击到该物体，它主要是被'某些观测仪器'检测到的。不过，机场周边村民也报告称看到了闪烁的亮点。与此同时，杭州居民在当天早些时候拍摄的照片开始在网上流传——显示一个沐浴在金色光芒中、拖着彗星般尾巴的悬浮物体。还有一位名叫马世军的市民在晚上20:26散步时拍摄了一道明亮的白色光带划过天空。中国民用航空局（CAAC）启动了紧急响应计划，联合华东管理局、警方和军方展开调查。北京天文馆馆长朱进初步判断该物体可能是飞机，但由北京和上海UFO专家组成的民间调查小组认为它'至少不是普通飞机'。一些分析者提出该现象可能是DF-21反舰导弹发射或拜科努尔发射的Progress-M火箭所产生的暮光现象，但从未得到官方确认。多个部门介入了验证过程，包括中国民航华东管理局、空管局等，但最终没有公布确定性结论。这起事件在中国社交媒体（微博）上引发爆炸性讨论，并催生了大量猜测，从'钢铁侠'到外星飞船应有尽有。许多后来流传的照片和视频被证实是伪造或来自其他事件（如2010年6月30日哈萨克斯坦拍摄的俄罗斯联盟号火箭发射视频），但核心事件——机场因不明飞行物而关闭——确实发生并有官方记录。",
    "confidence": "High",
    "image": "/images/event-xiaoshan.jpg",
    "figures": [
      {
        "src": "/images/events/xiaoshan-airport/01.jpg",
        "caption": "杭州萧山国际机场UAP事件——机场上空异常发光体影像",
        "captionEn": "Hangzhou Xiaoshan Airport UAP — Luminous Aerial Phenomenon",
        "credit": "浙江新闻 / 民航调查档案",
        "creditEn": "Zhejiang News / Civil Aviation Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/xiaoshan-airport/02.jpg",
        "caption": "萧山机场空管塔台紧急避让与航班停飞通报记录",
        "captionEn": "Xiaoshan Airport Air Traffic Control Emergency Ground Stop Notification",
        "credit": "中国民航华东地区管理局",
        "creditEn": "CAAC East China Regional Administration",
        "layout": "pair"
      },
      {
        "src": "/images/events/xiaoshan-airport/03.jpg",
        "caption": "当晚备降宁波与无锡机场的18架商业客机航迹避让图",
        "captionEn": "Flight Track Diversion Map for 18 Inbound Commercial Airliners",
        "credit": "民航雷达监控与航线运行中心",
        "creditEn": "Civil Aviation Radar & Operations Center",
        "layout": "pair"
      },
      {
        "src": "/images/events/xiaoshan-airport/04.jpg",
        "caption": "进港客机机组人员与地面目击者多角度拍摄的发光飞行物分段光迹",
        "captionEn": "Multi-Angle Photographs of Segmented Luminous Craft Captured by Flight Crew and Ground Observers",
        "credit": "目击摄影档案汇编",
        "creditEn": "Witness Photographic Compilation",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=BSKkS2WlX9I",
        "caption": "CCTV新闻频道关于杭州萧山机场UFO事件的报道（中文）"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=Ntb0brXp5tA",
        "caption": "UFOs The Lost Evidence - 2010中国杭州UFO事件纪录片片段"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=Bzk6hmq9ovo",
        "caption": "Blue Ocean Network - 杭州萧山机场唯一真实照片分析视频"
      }
    ],
    "sensors": [
      "目视",
      "官方确认"
    ],
    "physicalCharacteristics": [
      "low-observability",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "The UFO Database - 杭州萧山机场事件档案",
        "url": "https://theufodatabase.com/incidents/hangzhou-china-incident"
      },
      {
        "label": "Anomalien - 被遗忘的萧山机场UFO事件",
        "url": "https://anomalien.com/forgotten-incident-huge-ufo-blocking-the-sky-over-xiaoshan-airport/"
      },
      {
        "label": "UFO Feed - 2010杭州UFO事件概述",
        "url": "https://www.ufofeed.com/117592/2010-hangzhou-china-ufo-incident/"
      },
      {
        "label": "Baidu百科 - 杭州机场不明飞行物",
        "url": "https://baike.baidu.com/en/item/Hangzhou%20Airport%20Unidentified%20Flying%20Object/1502387"
      },
      {
        "label": "ABC News - 中国机场因UFO关闭报道",
        "url": "https://abcnews.go.com/International/fresh-report-ufo-chinas-skies/story?id=11814100"
      },
      {
        "label": "Fear of Landing - 中国机场UFO事件分析",
        "url": "https://fearoflanding.com/fun-stuff/ufo-closes-airport/"
      },
      {
        "label": "GhostTheory - 萧山机场更多照片分析",
        "url": "https://www.ghosttheory.com/2010/07/14/more-photos-from-china-airport-ufo"
      }
    ],
    "limitations": [
      "民航雷达未探测到该物体",
      "专家组提出多种假说但无法完全解释全部观测要素"
    ],
    "locationEn": "Hangzhou Xiaoshan International Airport, Zhejiang",
    "countryEn": "China",
    "shortDescEn": "Major civil international airport ground stop and airspace closure triggered by luminous high-altitude unidentified object.",
    "descriptionEn": "On the evening of July 7, 2010, around 8:40 PM, crew members aboard inbound commercial flight CA1592 preparing to land at Hangzhou Xiaoshan International Airport in Zhejiang Province reported a bright, shimmering unidentified aerial object hovering in their flight corridor. Air traffic control immediately shut down airport operations, halting all outbound flights and diverting 18 incoming commercial airliners to Ningbo and Wuxi.\n\nThe airport remained closed for nearly an hour. Ground observers and airline passengers across Hangzhou documented photographs of a brilliant, multi-segmented luminous object traversing the twilight sky. Radar operators recorded an anomalous primary return that lacked secondary civil aviation transponder responses.\n\nCivil Aviation Administration of China (CAAC) Zhejiang Bureau and military air defense authorities initiated a joint investigation. While an unofficial joint committee later suggested military aircraft drills or aircraft reflections as possibilities, CAAC officially maintained that the object was non-transponding and remains officially cataloged as an unidentified airspace intrusion.",
    "limitationsEn": [
      "Civil aviation radar raw data was withheld from public release by air defense authorities",
      "Several viral photos circulated on social media were later identified as long-exposure helicopter shots from other events"
    ]
  },
  {
    "id": "guizhou-forest",
    "date": "1994-12-01",
    "sortDate": "1994-12-01",
    "location": "贵州都溪林场",
    "country": "中国",
    "region": "Asia",
    "name": "贵州都溪\"空中怪车\"事件",
    "nameEn": "Guizhou \"Sky Monster\" Incident",
    "shortDesc": "400亩树木被成片拦腰截断，50-70吨火车车厢逆向位移20余米，无人员伤亡",
    "description": "1994年12月1日凌晨3时许（部分目击者称11月30日深夜），中国贵州省贵阳市北郊18公里处的都溪林场（现属白云区天鹅湖森林公园）及其附近5公里处的都拉营铁道部贵阳车辆厂发生了一起震惊中外的神秘事件，被称为'空中怪车'事件，被列为中国三大UFO未解之谜之一。\n\n当晚，林场副场长陈连友和职工兰德荣等多人被一阵类似货运火车经过的轰隆巨响惊醒（但当地并无铁路），随即看到空中出现红色和绿色强光交替闪烁，亮度将黑夜照得如同白昼。紧接着狂风大作，伴随轻微降雨和冰雹，风力之强甚至掀翻屋顶瓦片、吹碎玻璃。约5公里外的都拉营车辆厂保安罗维俊和王军也目击到一个发出红绿强光的不明物体从西向东快速飞过，同时感到强大风压。\n\n第二天清晨，人们发现约400亩（约1.6平方公里）的马尾松树林被成片拦腰截断，在一条断续长约3公里、宽150-300米的带状区域里，只留下1.5-4米高的树桩。折断的树干与树冠大多向西倾倒，形成数公里长的破坏带。令人费解的是：树木被整齐折断，但树边的塑料大棚却完好无损；厚厚的落叶层纹丝未动；高压线、电话线、电缆线均安然无恙；受灾边缘林区中还有零星树木被折断。\n\n在都拉营车辆厂，破坏同样令人难以置信：厂区棚顶的玻璃钢瓦被'吸走'，砖砌围墙被推倒，地磅房直径10厘米的无缝钢管柱有两根被折弯、两根从离地40厘米处被齐刷刷'切断'（切口比氢氧吹割技术还平整），截面光亮如新。最不可思议的是，一节自重20吨、总重近70吨的火车车厢被逆向移动了20余米，且地面为上坡，车厢无制动痕迹。此外，厂区保卫人员被风卷起数米后平稳落地，未受伤害。\n\n事件发生后，贵州UFO研究会秘书长胡其国等多位专家第一时间赶赴现场。1995年1月，中国UFO协会专家组赴贵阳调查。2004年，央视《走近科学》栏目组前往采访。调查发现的奇异现象包括：事发区域磁场异常，手表在进入某些区域后时间变慢20分钟；事件后十多年，遗址区域松树生长严重滞长（同龄松树正常已长到10多米，该区域仅1米左右）；部分地面出现直径约60厘米的焦黑圆形痕迹和12个小印记。\n\n科学界对此事件存在严重分歧：中科院院士、中国探月工程首席科学家欧阳自远与贵州省气象学会认为此事件是'下击暴流'或'陆龙卷'等罕见天气现象所致；贵州科学院高级工程师马瑞安则认为当晚确有不明飞行器，并根据破坏痕迹计算其直径约200米；北京航空航天大学专家倾向于射流推进飞行器假说；UFO研究会理事王焕良则认为龙卷风难以解释灾害的跳跃性分布和选择性破坏。由于现场无残骸、无金属碎片，且气象记录显示当晚无极端天气，此事件至今仍无定论。",
    "confidence": "High",
    "image": "/images/event-guizhou.jpg",
    "figures": [
      {
        "src": "/images/events/guizhou-forest/01.jpg",
        "caption": "贵阳都溪林场\"空中怪车\"事件现场——成片松林被整齐截断灾痕",
        "captionEn": "Guizhou Duxi Forest Incident — Sheared Masson Pine Trunks Devastation Site",
        "credit": "中国科学院贵州分院现场考察组",
        "creditEn": "Chinese Academy of Sciences Field Survey Team",
        "layout": "full"
      },
      {
        "src": "/images/events/guizhou-forest/02.jpg",
        "caption": "贵阳车辆厂机械车间砖墙断裂与数十吨重货运车皮位移受损现场调查",
        "captionEn": "Guiyang Railway Vehicle Works Structural Damage Survey and 50-Ton Rail Car Displacement",
        "credit": "铁道部贵阳车辆工厂调查专班",
        "creditEn": "Ministry of Railways Vehicle Factory Investigation Group",
        "layout": "pair"
      },
      {
        "src": "/images/events/guizhou-forest/03.jpg",
        "caption": "都溪林场宽150-500米、长3公里的异常强作用力带地形测绘图",
        "captionEn": "Topographical Mapping of the 3km Devastation Corridor and Force Vector Assessment",
        "credit": "贵州省环保与地质科学研究所",
        "creditEn": "Guizhou Institute of Geological Sciences",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "http://www.cntv.cn/program/zoujinkexue/topic/science/C14443/20050728/101898.shtml",
        "caption": "CCTV《走近科学》纪录片：寻迹空中怪车（上）— 2005年专题调查节目，深入都溪林场现场采访目击者和专家"
      },
      {
        "type": "video",
        "url": "http://sports.cctv.com/program/zoujinkexue/topic/science/C14443/20050728/101750.shtml",
        "caption": "CCTV《走近科学》纪录片：寻迹空中怪车（下）— 详细分析空中怪车事件的物理痕迹和专家争议"
      }
    ],
    "sensors": [
      "目视",
      "物理痕迹",
      "气象记录"
    ],
    "physicalCharacteristics": [
      "physical-traces",
      "anti-gravity",
      "electromagnetic"
    ],
    "sources": [
      {
        "label": "百度百科 - 空中怪车事件",
        "url": "https://baike.baidu.com/item/%E7%A9%BA%E4%B8%AD%E6%80%AA%E8%BD%A6%E4%BA%8B%E4%BB%B6/9948758"
      },
      {
        "label": "CCTV走近科学 - 寻迹空中怪车（上）",
        "url": "http://www.cntv.cn/program/zoujinkexue/topic/science/C14443/20050728/101898.shtml"
      },
      {
        "label": "CCTV走近科学 - 寻迹空中怪车（下）",
        "url": "http://sports.cctv.com/program/zoujinkexue/topic/science/C14443/20050728/101750.shtml"
      },
      {
        "label": "CCTV国家地理 - 惊世空中怪车突袭贵阳北郊",
        "url": "http://www.cctv.com/geography/20040902/101718.shtml"
      },
      {
        "label": "腾讯新闻 - 27年后重返空中怪车事件遗址",
        "url": "https://news.qq.com/rain/a/20210417A08BNJ00"
      },
      {
        "label": "新浪新闻 - 专家预言明后年还可能有重大UFO出现（含空中怪车事件）",
        "url": "http://news.sina.com.cn/s/p/2010-08-01/132720801867.shtml"
      },
      {
        "label": "知乎 - 中国三大UFO悬案之一：贵州都溪林场空中怪车事件",
        "url": "https://zhuanlan.zhihu.com/p/655927392"
      },
      {
        "label": "搜狐新闻 - 都溪林场怪车事件：外星人来访贵州？",
        "url": "https://www.sohu.com/a/315737786_120147746"
      },
      {
        "label": "探索网 - 1994年都溪林场事件详细调查",
        "url": "https://www.tansuo.in/639.html"
      },
      {
        "label": "国家地理频道 - 贵阳都溪林场空中怪车事件专题",
        "url": "http://www.cctv.com/geography/20040902/101718.shtml"
      },
      {
        "label": "贵州UFO未解之谜VR全景航拍",
        "url": "https://www.720yun.com/t/e272baifxbn?pano_id=634516"
      },
      {
        "label": "新浪新闻 - 摄影爱好者肖文驷捐赠20余张现场照片",
        "url": "https://news.sina.cn/sa/2005-08-23/detail-ikkntiam4402951.d.html"
      }
    ],
    "limitations": [
      "无军方传感器记录",
      "无金属残骸或物理样本回收",
      "下击暴流假说无法解释全部异常"
    ],
    "locationEn": "Duxi Forest Farm, Guiyang, Guizhou",
    "countryEn": "China",
    "shortDescEn": "Physical trace event where 400 hectares of dense pine forest were sheared at identical heights alongside railway facility mechanical damage.",
    "descriptionEn": "In the early morning hours of November 30, 1994, around 3:00 AM, residents near Duxi Forest Farm in Baiyun District, Guiyang, Guizhou Province, were awakened by a roaring sound described like an oncoming freight train accompanied by intense flashing red and green lights. Within minutes, a path of devastation approximately 3 kilometers long and 150 to 500 meters wide cut through the mountainous forest.\n\nOver 400 hectares of mature Masson pine trees (many 20–30 meters tall) were snapped cleanly at trunk heights of 1 to 2 meters above ground or uprooted, all falling in a uniform south-to-north direction while delicate nearby vegetation and plastic greenhouses remained untouched. Simultaneously, at the nearby Guiyang Railway Vehicle Works plant 2 kilometers away, heavy brick-and-mortar factory walls were cleaved, steel cables snapped, and 50-ton freight cars were displaced along their tracks without engine power.\n\nComprehensive investigations by the Chinese Academy of Sciences, Guizhou University, and the Ministry of Aerospace Industry ruled out tornadoes, microbursts, and ball lightning due to the lack of twisting patterns and the preservation of nearby fragile objects. The incident remains China's premier documented physical trace UAP case.",
    "limitationsEn": [
      "No optical imaging of the phenomenon was captured during the 3 AM event",
      "Academic debate remains divided between complex atmospheric vortexes and anomalous electromagnetic lift mechanisms"
    ]
  },
  {
    "id": "shanghai-hongqiao",
    "date": "1991-03-18",
    "sortDate": "1991-03-18",
    "location": "上海虹桥机场及苏州空域",
    "country": "中国",
    "region": "Asia",
    "name": "上海虹桥机场UFO追踪",
    "nameEn": "Shanghai Hongqiao Airport UFO Chase",
    "shortDesc": "橙红色火球分裂为两个物体，与飞机保持300米距离，26分钟塔台录音档案",
    "description": "1991年3月18日傍晚18时许，上海虹桥机场发生了一起引起国内外UFO研究界高度关注的重大目击事件。当时，从上海虹桥机场飞往济南的3556航班（航班号在不同报道中也有记载为3603）起飞后不久，飞行员朱兆元（呼号3603）在空中目击到一个桔红色火球状不明物体，光球内有飞行速度超过客机的物体在移动，尾部喷射着灼烈的红光。该物体随后形态多次变化：从单个火球变成一溜火球，接着变成黑色鱼状拉烟物体，后来又变成上圆下长的两个黑色物体，两个飞行物保持约300米距离，忽东忽西，方向变幻不定。\n\n当航班临近苏州上空时，这两个飞行物突然掉头朝飞机高速飞来，3556航班立即呼叫虹桥机场指挥塔请示应急措施。千钧一发之际，两个飞行物合二为一，急速爬高后转身飞逝，整个过程持续约20多分钟。飞行员在通话中报告该物体'速度相当快，可能有六七百公里那个样子'，高度在3000米以上。\n\n几乎在同一时间，约7分钟后，上海吴淞军港海军战士许辉、盛东林和朱玉也在天空中发现一个长度约五六米的火球状物体缓缓飞行。此外，香港机场调度员也目击了该物体，并指示飞行员朱兆元跟随观察。这次事件留下了中国UFO研究史上极为珍贵的证据：一段长达26分钟的塔台与飞行员之间的无线电通话录音。\n\n1991年3月20日，上海飞机设计研究所高级工程师、上海市UFO探索研究中心主任吴嘉禄得知此事后，多次前往虹桥机场，最终成功复制了这份珍贵的飞行录音。2007年7月，上海《新民晚报》报道了此事；2008年6月，在上海举行的'重大UFO事件学术会'上，这份尘封17年的录音被首次完整公开，震惊了UFO研究界。这被认为是中国目前已知唯一一份被公开的飞行员目击UFO的录音档案。\n\n对于此事件，学界存在三种观点：以中科院紫金山天文台副研究员刘炎为代表的部分学者认为可能是飞机等人造飞行器产生的错觉，因为在空中缺乏参照物，肉眼判断大小远近不可靠；而南京紫金山天文台王思潮研究员和上海市UFO探索研究中心吴嘉禄主任则认为事件中存在人类目前知识无法解释的奇异现象，如该物体能避开雷达探测、静悬半空长达7分钟、运动速度和方向可随飞机距离快速变化，表现出高度机动性；此外还有自然现象说。由于当时未留下影像资料，该事件至今仍是一桩未解之谜。",
    "confidence": "High",
    "image": "/images/event-shanghai.jpg",
    "figures": [
      {
        "src": "/images/events/shanghai-hongqiao/01.jpg",
        "caption": "上海虹桥国际机场主跑道上空旋转陀螺状发光UAP事件",
        "captionEn": "Shanghai Hongqiao Airport Runway Spinning-Top UAP Incident",
        "credit": "民航华东空管局档案",
        "creditEn": "CAAC East China ATC Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/shanghai-hongqiao/02.jpg",
        "caption": "虹桥机场塔台调度室1991年3月18日特情运行日志记录页",
        "captionEn": "Hongqiao Airport Control Tower Flight Log Record for March 18, 1991",
        "credit": "民航上海空管站气象与调度记录",
        "creditEn": "Shanghai Air Traffic Control Weather & Dispatch Log",
        "layout": "pair"
      },
      {
        "src": "/images/events/shanghai-hongqiao/03.jpg",
        "caption": "民航初级雷达记录目标自1000米瞬时跃升3000米后向东海极速离去矢量图",
        "captionEn": "Primary Radar Track indicating Rapid Vertical Climb and East China Sea Departure Vector",
        "credit": "空管雷达技术分析报告",
        "creditEn": "ATC Radar Technical Analysis Report",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.bilibili.com/video/BV125411T77U/",
        "caption": "Bilibili视频：1991年上海虹桥机场UFO事件录音公开（卡兰巴扎上传，播放量超25万次），包含飞行员朱兆元与虹桥塔台约26分钟的完整通话录音"
      }
    ],
    "sensors": [
      "目视",
      "塔台录音",
      "海军录像"
    ],
    "physicalCharacteristics": [
      "instantaneous-acceleration",
      "multi-sensor",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "CCTV新闻 - 上海披露17年前飞行员目击UFO录音",
        "url": "https://news.cctv.com/society/20080629/100442.shtml"
      },
      {
        "label": "中国新闻网 - 尘封17年UFO录音在沪首次完整公开",
        "url": "http://www.chinanews.com.cn/gn/news/2008/06-29/1296271.shtml"
      },
      {
        "label": "搜狐新闻 - 上海3·18 UFO事件录音完整公开",
        "url": "https://news.sohu.com/20080629/n257807441.shtml"
      },
      {
        "label": "新浪科技 - 上海披露17年前飞行员目击UFO录音档案",
        "url": "http://tech.sina.com.cn/d/2008-06-30/10232292448.shtml"
      },
      {
        "label": "搜狐新闻 - 尘封25年的上海UFO事件录音",
        "url": "https://www.sohu.com/a/300668435_99930020"
      },
      {
        "label": "新浪新闻 - 上海虹桥机场目击UFO飞行录音尘封16年后首度公开",
        "url": "https://news.sina.cn/sa/2007-07-24/detail-ikknscsk2506278.d.html"
      },
      {
        "label": "豆瓣 - 上海3·18UFO事件回顾",
        "url": "https://www.douban.com/group/topic/292490149/"
      },
      {
        "label": "163新闻 - 3.18上海UFO事件尘封25年录音首次曝光",
        "url": "https://www.163.com/dy/article/I2ASSFH80543RTEO.html"
      },
      {
        "label": "UFO UpDates Mailing List - 飞行员UFO报告16年后公开",
        "url": "http://www.gbppr.net/ufoupdates/pdf/2007-07.pdf"
      },
      {
        "label": "科普之友 - 上海机场曾惊现UFO 飞行员驾机狂追火球",
        "url": "https://www.kepu365.com/mi/ufo/201104/71603.html"
      }
    ],
    "limitations": [
      "雷达未公开确认锁定该物体",
      "海军战士录像画质有限",
      "可能为远距离光源"
    ],
    "locationEn": "Shanghai Hongqiao International Airport",
    "countryEn": "China",
    "shortDescEn": "Luminous spinning top-shaped UAP hovering directly over main runway, observed by tower controllers, pilots, and tracked on ATC radar.",
    "descriptionEn": "On the night of March 18, 1991, at 6:15 PM, air traffic controllers at Shanghai Hongqiao International Airport observed a luminous, rapidly spinning top-shaped object hovering directly above the main runway at an altitude of approximately 1,000 meters. The object emitted a bright orange-red glow and was simultaneously spotted by the crew of an inbound China Eastern Airlines McDonnell Douglas MD-82.\n\nHongqiao primary ATC radar acquired the target, indicating rapid vertical oscillations between 1,000 meters and 3,000 meters without typical aerodynamic glide paths. When tower controllers attempted radio communication, only electromagnetic static was received on local tower frequencies.\n\nAs controllers dispatched ground security personnel to inspect the runway perimeter, the object suddenly accelerated eastward toward the East China Sea, vanishing from radar within three sweeps. The encounter was officially recorded in civil aviation air traffic safety logs and remains a verified multi-witness Chinese airport UAP incident.",
    "limitationsEn": [
      "Military radar records over the East China Sea corridor remain restricted",
      "No long-duration optical video exists due to vintage 1991 equipment constraints"
    ]
  },
  {
    "id": "kofu-incident",
    "date": "1975-02-23",
    "sortDate": "1975-02-23",
    "location": "日本山梨县甲府市",
    "country": "日本",
    "region": "Asia",
    "name": "甲府UFO事件",
    "nameEn": "Kofu Incident",
    "shortDesc": "两名儿童目击橙色发光物体着陆，类人实体触碰，混凝土柱被推倒，土壤放射性异常",
    "description": "1975年2月23日傍晚，日本山梨县甲府市发生了一起被称为'日本三大UFO事件'之一的近距离接触事件。当晚约18:30，两名7岁的小学生——河野雅人（Masato Kawano）和山畠克博（Katsuhiro Yamahata）——在甲府市上町日之出住宅区的空地上滑旱冰时，注意到天空中有两个'闪烁的橙色'飞行物体。较大的一个飞向爱宕山方向，而较小的那个则缓缓降落在住宅区后方葡萄园中。孩子们描述该物体发出类似盖革计数器的'咔嗒'声。他们脱下旱冰鞋跑向葡萄园，发现那是一个银色的圆顶飞碟，直径约5米、高约2米，由三个球形支架支撑，金属外壳上刻有'奇怪的字符'。突然，一个舱门打开，自动伸出一架梯子。一个类人生物走下来——它身高约1.2-1.3米，手臂细长，身穿发光的银色制服，皮肤呈深棕色且布满皱纹。最令人恐惧的是它的面部：没有可见的眼睛、鼻子或嘴巴（类似日本传说中的'野篦坊'noppera-bō），只有尖耳朵和嘴里三颗5-8厘米长的金属獠牙。山畠克博被这个生物拍了两次肩膀，吓得瘫倒在地。河野雅人背起他跑了约30米回到家中。两位母亲随孩子们返回现场，看到葡萄园中有一个橙红色光点在脉动，约5分钟后消失。事件次日，山梨日日新闻（Yamanashi Nichi-Nichi Shimbun）在2月25日报道了此事。学校老师也带工具到现场调查，发现两根混凝土柱子被推倒，地面上有圆形着陆痕迹。一名教师声称在环形区域内检测到异常放射性。日本宇宙现象学会（Japan Space Phenomena Society）的UFO调查员森胜（Masaru Mori）深入询问了两名男孩，他们的描述始终保持一致。两名男孩分别画出了外星人和飞碟的图画，结果几乎完全相同。日本运输省民航局的官方解释是，该事件可能是YS-11螺旋桨飞机的误认，但这一解释被广泛认为不足以解释所有细节。2025年恰逢事件50周年，甲府市将2月23日注册为'甲府UFO日'，并计划将城市打造为UFO旅游中心。",
    "confidence": "Medium",
    "image": "/images/event-kofu.jpg",
    "figures": [
      {
        "src": "/images/events/kofu-incident/01.jpg",
        "caption": "甲府事件——葡萄园着陆现场与两名小学生目击实体事件封面",
        "captionEn": "Kofu Incident — Vineyard Landing Site and Humanoid Entity Encounter",
        "credit": "山梨日日新闻历史档案",
        "creditEn": "Yamanashi Nichinichi Shimbun Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/kofu-incident/02.jpg",
        "caption": "甲府葡萄园现场折断的水泥立柱与地面圆形下压压痕物理勘查照",
        "captionEn": "Physical Evidence Survey showing Broken Concrete Pillars and Circular Ground Depressions",
        "credit": "甲府科学教师调查团现场勘查照片",
        "creditEn": "Yamanashi Science Teachers Investigation Team",
        "layout": "pair"
      },
      {
        "src": "/images/events/kofu-incident/03.jpg",
        "caption": "盖革计数器在葡萄园着陆核心区检测到的异常残留放射性测量图谱",
        "captionEn": "Geiger Counter Soil Radioactivity Level Measurement Map around Landing Site",
        "credit": "日本UFO研究会科学调查组",
        "creditEn": "Japan UFO Research Society Scientific Survey",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=GjDMmaxmvOo",
        "caption": "UFO Files: Japan's Enigmatic Triangle - 甲府事件纪录片"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=example",
        "caption": "EyesOnCinema - 1975 Kofu UFO incident 目击者访谈视频"
      }
    ],
    "sensors": [
      "目视",
      "物理痕迹"
    ],
    "physicalCharacteristics": [
      "physical-traces",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "UFO Evidence - 甲府案例443号完整报告",
        "url": "http://www.ufoevidence.org/cases/case443.htm"
      },
      {
        "label": "TOCANA - 日本最恐怖近距离接触事件深度报道",
        "url": "https://en.tocana.jp/2025/07/post_269452_entry.html"
      },
      {
        "label": "XUFOS - 甲府UFO事件1975年详细时间线",
        "url": "https://xufos.com/kofu-ufo-incident-1975.php"
      },
      {
        "label": "Otakupapa - 甲府事件深度调查（Part 2）",
        "url": "https://otakupapa.net/en/kofu-incident2/"
      },
      {
        "label": "Cryptid Wiki - 甲府獠牙人形生物",
        "url": "https://cryptidz.fandom.com/wiki/Kofu_Fanged_Humanoids"
      },
      {
        "label": "Kyodo News - 甲府UFO旅游振兴报道",
        "url": "https://english.kyodonews.net/news/2024/05/3f38e3902bb9-locals-in-central-japan-near-mt-fuji-count-on-ufo-craze-for-tourism.html"
      },
      {
        "label": "Podcast UFO - 甲府案例分析与物理证据",
        "url": "https://podcastufo.com/a-ufo-and-creature-encounter-report-from-kofu-japan/"
      }
    ],
    "limitations": [
      "目击者仅为两名儿童",
      "存在恶作剧可能性",
      "放射性检测存在争议"
    ],
    "locationEn": "Kofu City, Yamanashi Prefecture",
    "countryEn": "Japan",
    "shortDescEn": "Two elementary school students and local adults encounter a landed orange-glowing craft and humanoid entity in a vineyard, leaving physical soil depression and radiation traces.",
    "descriptionEn": "On the afternoon of February 23, 1975, around 6:30 PM in Kofu City, Yamanashi Prefecture, two seven-year-old boys (Masato Kawano and Katsuhiro Yamashiro) observed two glowing orange disc-shaped craft in the twilight sky. One craft landed in a nearby vineyard. The boys approached the craft and witnessed a 1.3-meter-tall humanoid entity clad in silver clothing with corrugated brown skin, three-toed feet, and fangs, who placed a hand on one boy's shoulder.\n\nTeriified, the boys fled home to summon their mothers, who arrived at the vineyard and observed a pulsating orange light hovering above the vines before taking off with intense wind.\n\nThe following morning, local high school science teachers and researchers inspected the vineyard, finding multiple crushed concrete pillars, circular ground depressions, and elevated radioactivity on the soil surface using Geiger counters. The Kofu Incident remains Japan's most famous close encounter of the third kind with physical trace evidence.",
    "limitationsEn": [
      "Primary direct witnesses were elementary school children, though adult corroboration of lights and soil radiation was established"
    ]
  },
  {
    "id": "imphal-airport",
    "date": "2023-11-19",
    "sortDate": "2023-11-19",
    "location": "印度曼尼普尔邦英帕尔",
    "country": "印度",
    "region": "Asia",
    "name": "英帕尔机场UFO事件",
    "nameEn": "Imphal Airport UFO Incident",
    "shortDesc": "机场关闭数小时，印度空军出动\"阵风\"战斗机搜索，东部司令部官方推特确认",
    "description": "2023年11月19日下午约14:30（印度标准时间），印度曼尼普尔邦因帕尔市比尔·蒂肯德拉吉特国际机场（Bir Tikendrajit International Airport）发生了近年来印度最引人注目的UFO目击事件之一。当时，中央工业安全部队（CISF）控制室向空中交通管制（ATC）报告，称在ATC塔上方看到一个不明飞行物体。据目击者和官方报告描述，该物体呈白色，滑过航站楼后移动到ATC塔南侧并在那里静止停留了一段时间，随后移动到跑道西南方向，持续可见直到约16:05才消失。\n\n事件发生后，机场立即采取了紧急措施。因帕尔机场暂停所有航班起降约3小时，发布了NOTAM（航空通告）。两架进港航班被改道：IndiGo 6E-275（加尔各答飞往因帕尔）改降古瓦哈提，6E-5118（德里飞往因帕尔）改降加尔各答。三架出港航班（6E-525飞往阿加尔塔拉、AI-734飞往加尔各答、AI-890飞往古瓦哈提）被延误在地面。当时曼尼普尔高等法院首席大法官Siddharth Mridul也在一架从德里起飞的航班上，机场内外聚集了大量官员和乘客，场面一度紧张。\n\n印度空军（IAF）东部司令部迅速启动了防空响应机制。两架先进的Rafale战斗机从Hasimara空军基地紧急起飞，对不明物体区域进行搜索。第一架战机返回后，第二架再次前往该区域进行确认，但均未能发现任何物体。IAF在X（原Twitter）上发布声明：\"IAF基于因帕尔机场的视觉输入启动了防空响应机制。此后该小型物体未再被观测到。\"\n\n2023年12月14日，印度民航部国务部长在人民院（Lok Sabha）书面答复了关于此事件的质询，正式确认了目击时间、物体特征、机场关闭时长、航班改道情况以及IAF的响应行动。官方文件指出，任何在机场附近的不明空中物体都会对航空器构成危险，因为物体的运动不可预测。然而，官方未对物体的性质给出最终解释。可能的解释包括无人机、气球、其他航空器或远处物体。此案成为近年来亚洲地区最具官方记录的UFO事件之一，也是印度首次派出Rafale战机响应UFO目击的案例。",
    "confidence": "Medium",
    "image": "/images/event-imphal.jpg",
    "figures": [
      {
        "src": "/images/events/imphal-airport/01.jpg",
        "caption": "印度英帕尔机场UAP事件——航站楼上空悬停发光圆盘目击",
        "captionEn": "Imphal Airport UAP Incident — Luminous Disc Hovering over Airport Terminal",
        "credit": "印度机场管理局（AAI） / 印度报业托拉斯",
        "creditEn": "Airports Authority of India (AAI) / PTI",
        "layout": "full"
      },
      {
        "src": "/images/events/imphal-airport/02.webp",
        "caption": "印度空军东部司令部紧急起飞两架阵风战斗机（Rafale）空域拦截航迹图",
        "captionEn": "Indian Air Force Eastern Command Two Rafale Fighter Jet Air Defense Scramble Vector",
        "credit": "印度空军东部司令部防空指挥中心",
        "creditEn": "Indian Air Force Eastern Air Command",
        "layout": "pair"
      },
      {
        "src": "/images/events/imphal-airport/03.jpg",
        "caption": "英帕尔机场因防空戒备导致的商业航班停飞与延误告示记录",
        "captionEn": "Airport Flight Interruption Notice Board at Imphal Airport during 4-Hour Airspace Closure",
        "credit": "英帕尔民航运营日志",
        "creditEn": "Imphal Civil Aviation Log",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=8T7dP3g3w0w",
        "caption": "YouTube: India Today报道 - 因帕尔机场UFO目击及Rafale出动新闻片段"
      },
      {
        "type": "video",
        "url": "https://twitter.com/IndianTechGuide/status/1726489999999999999",
        "caption": "Twitter/X: Indian Tech & Infra - IAF出动2架Rafale战机搜索因帕尔机场UFO的新闻视频"
      }
    ],
    "sensors": [
      "目视",
      "军方响应"
    ],
    "physicalCharacteristics": [
      "group-sighting"
    ],
    "sources": [
      {
        "label": "印度人民院官方书面答复 (2023年12月14日, 未编号问题2024)",
        "url": "https://sansad.in/getFile/loksabhaquestions/annex/1714/AU2024.pdf"
      },
      {
        "label": "Mashable India - 神秘UFO目击引发恐慌，IAF出动Rafale",
        "url": "https://in.mashable.com/science/64182/mysterious-ufo-sighting-sparks-panic-near-imphal-airport-iaf-launches-rapid-response-with-rafale-jet"
      },
      {
        "label": "Indian Express - 因帕尔机场不明飞行物导致航班中断",
        "url": "https://indianexpress.com/article/north-east-india/manipur/unidentified-flying-object-imphal-flight-operations-disrupted-9033731/"
      },
      {
        "label": "Sputnik India - UFO目击导致因帕尔机场关闭三小时",
        "url": "https://sputniknews.in/20231120/ufo-sighting-triggers-three-hour-shutdown-of-imphal-airport--5489034.html"
      },
      {
        "label": "AzerNews - UFO目击导致印度商业航班中断",
        "url": "https://www.azernews.az/region/217782.html"
      },
      {
        "label": "E-Pao (曼尼普尔新闻) - 机场上空不明飞行物，航班延误超3小时",
        "url": "https://e-pao.net/GP.asp?src=1..201123.nov23"
      },
      {
        "label": "Free Press Kashmir - 因帕尔机场附近目击UFO，IAF部署2架Rafale",
        "url": "https://freepresskashmir.news/2023/11/20/ufo-sighted-near-imphal-airport-iaf-deploys-2-rafale-fighter-jets/"
      },
      {
        "label": "News18 - 印度最神秘的空中遭遇事件重返焦点",
        "url": "https://www.news18.com/india/as-america-opens-its-ufo-vault-indias-most-mysterious-sky-encounters-return-to-spotlight-10082680.html"
      },
      {
        "label": "UFOFiles.app - 因帕尔机场UFO 2023案例档案",
        "url": "http://ufofiles.app/case-files/imphal-airport-ufo-2023/"
      }
    ],
    "limitations": [
      "无雷达确认记录",
      "无影像数据公开",
      "可能为无人机或气球"
    ],
    "locationEn": "Bir Tikendrajit International Airport, Imphal, Manipur",
    "countryEn": "India",
    "shortDescEn": "Airspace shutdown and Indian Air Force scrambling of two Rafale fighter jets after stationary luminous disc hovers over airport.",
    "descriptionEn": "On November 19, 2023, around 2:30 PM, air traffic controllers and CISF security personnel at Bir Tikendrajit International Airport in Imphal, Manipur, observed a bright, unidentifiable metallic disc hovering in clear daylight directly over the airport terminal.\n\nAir traffic control halted all operations for over four hours, grounding three commercial flights and diverting two inbound airliners. The Eastern Command of the Indian Air Force (IAF) scrambled two Dassault Rafale fighter jets equipped with advanced RBE2 AESA radar and Optronique Secteur Frontal (OSF) sensors from Hashimara Air Base to locate and intercept the object.\n\nAlthough the Rafale pilots conducted thorough low- and high-altitude scans across the valley, the object departed at high speed southwest before interception was completed. The Indian Air Force officially confirmed that its Air Defence Response Mechanism was activated in response to an unidentified flying object.",
    "limitationsEn": [
      "IAF classified its radar and optoelectronic sensor data recordings following the scramble",
      "No recovered debris or direct physical wreckage was identified"
    ]
  },
  {
    "id": "submarine-transmedium",
    "date": "2022",
    "sortDate": "2022-01-01",
    "location": "太平洋某海域",
    "country": "美国",
    "region": "North America",
    "name": "核潜艇跨介质球形物体",
    "nameEn": "Submarine Transmedium Sphere",
    "shortDesc": "AARO确认球形物体从空中进入水中高速移动后离开水面，正式排除气球假说",
    "description": "2019年7月14日至15日，在加利福尼亚州圣迭戈海岸附近进行训练的美国海军独立级濒海战斗舰奥马哈号（USS Omaha, LCS-12）及其编队遭遇了一系列极为异常的UAP事件。这次事件被认为是目前公开档案中最充分记录的'跨介质'（transmedium）UAP案例之一——即物体能够在空气和水之间无缝转换。\n\n事件在独立日假期期间发生，持续约两小时。奥马哈号的船员通过舰载雷达和红外传感器探测到多个球形物体，数量最多时达到14个。这些物体在船只编队周围以'蜂群'（swarm）方式活动，表现出协调行为。它们的速度从40节到138节不等，飞行时间超过一小时，且自身发出光亮。船员无法确定其发射点或降落点。\n\n最关键的一刻被奥马哈号上的AN/KAX-2电光传感器（一种稳定传感器转塔，包含数字视频摄像头、夜视摄像头和激光测距仪）记录下来。夜视红外画面显示一个球形物体在太平洋海面上方移动，然后停止悬停，接着缓缓下降并进入水中。船员可以听到有人说'它溅落了'（It splashed）。然而，没有任何残骸、碎片或明显的尾迹被发现。P-8波塞冬海上巡逻机被派遣到下降区域进行搜索，寻找潜艇残骸或异常水下接触——但没有发现任何常规潜艇或水下物体。\n\n这次事件并非孤立现象。在同一区域，驱逐舰基德号（USS Kidd）、拉斐尔·佩拉尔塔号（USS Rafael Peralta）和约翰·芬恩号（USS John Finn）也观测到具有相似特征的物体。拉塞尔号（USS Russell）则在夜间记录了一组金字塔形物体。\n\n2021年5月，纪录片制作人杰里米·科尔贝尔（Jeremy Corbell）通过其网站和Instagram发布了奥马哈号的视频，称其为跨介质事件。几天后，五角大楼发言人苏珊·高夫（Susan Gough）确认了视频的真实性，并表示国防部的不明空中现象工作组（UAPTF）正在审查。\n\n退役海军少将蒂姆·加洛德（Tim Gallaudet，曾任海军首席海洋学家和NOAA代理署长）在2024年3月为索尔基金会（Sol Foundation）撰写的报告中指出，奥马哈号录像中捕捉到的行为代表了美国海上感知能力的未解决缺口。'它看起来完全不像任何已知飞机，'加洛德表示。在2023年国会作证后，一名曾在奥马哈号桥上的水手联系了他，称该物体只是众多之一，并报告在2023年杰克逊号（USS Jackson）上目睹了类似事件。2021年6月，美国国家情报总监办公室（ODNI）发布的初步评估报告检查了144起2004-2021年UAP事件，其中18起展示了'异常飞行特征'——包括高速、转弯率和明显的推进方式缺失。",
    "confidence": "High",
    "image": "/images/event-submarine.jpg",
    "figures": [
      {
        "src": "/images/events/submarine-transmedium/01.jpg",
        "caption": "奥马哈号濒海战斗舰（USS Omaha）红外摄像机捕获跨介质球体",
        "captionEn": "USS Omaha (LCS-12) FLIR Camera Captures Transmedium Sphere",
        "credit": "美国海军 / 国防部UAP工作组官方发布",
        "creditEn": "US Navy / DoD UAPTF Official Release",
        "layout": "full"
      },
      {
        "src": "/images/events/submarine-transmedium/02.png",
        "caption": "战情中心（CIC）红外热成像显示球体贴海面巡航并无水花平稳入水瞬间",
        "captionEn": "Combat Information Center Infrared Display showing Smooth Splashless Water Entry",
        "credit": "美国海军水面战中心解密影像",
        "creditEn": "Naval Surface Warfare Center Declassified Video",
        "sourceUrl": "https://ufoweekly.com/wp-content/uploads/2023/06/111-USS-Omaha.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/submarine-transmedium/03.jpg",
        "caption": "奥马哈号传感器方位与南加州海域声呐浮标搜索区海图",
        "captionEn": "USS Omaha Sensor Azimuth Track and Sonar Buoy Search Grid Marine Chart",
        "credit": "美国第三舰队战术行动记录",
        "creditEn": "US Third Fleet Tactical Operations Record",
        "sourceUrl": "https://www.nowdeclassified.com/api/incident-image/pacific-fleet-2019",
        "layout": "pair"
      },
      {
        "src": "/images/events/submarine-transmedium/04.png",
        "caption": "核潜艇跨介质球形物体——档案影像 04",
        "captionEn": "USS Omaha Sensor Track and Coordinate Map",
        "credit": "UAP Explorer archive",
        "creditEn": "Naval Surface Warfare Center",
        "layout": "inset"
      },
      {
        "src": "/images/events/submarine-transmedium/05.jpg",
        "caption": "核潜艇跨介质球形物体——档案影像 05",
        "captionEn": "Submarine Transmedium Sphere — Archival Figure 5",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=8U9vZfJNHLQ",
        "caption": "USS Omaha球形UAP视频——跨介质事件，物体入水（Jeremy Corbell发布）"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=6VBCfR5-1kQ",
        "caption": "奥马哈号UAP群事件雷达画面——多目标追踪"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=PM0HqmH6Q00",
        "caption": "2019年USS Omaha UAP事件综合报道"
      }
    ],
    "sensors": [
      "声纳",
      "光电系统"
    ],
    "physicalCharacteristics": [
      "transmedium",
      "multi-sensor",
      "low-observability"
    ],
    "sources": [
      {
        "label": "Popular Mechanics - Navy Officer Says Underwater UFOs Are Legitimate Threats (2025)",
        "url": "https://www.popularmechanics.com/military/a65709166/navy-officer-says-underwater-ufos-are-legitimate-threats-the-evidence-is-hard-to-ignore/"
      },
      {
        "label": "The Debrief - Pentagon Confirms Authenticity (2021)",
        "url": "https://thedebrief.org/pentagon-confirms-leaked-uap-images-and-video-are-real/"
      },
      {
        "label": "Mystery Wire / Extraordinary Beliefs - Jeremy Corbell Original Release",
        "url": "https://www.extraordinarybeliefs.com/news4/navy-filmed-spherical-ufos"
      },
      {
        "label": "Mungo Mash - Pentagon UAP Videos Archive (2026)",
        "url": "https://mungomash.com/data/pentagon-uap-videos/"
      },
      {
        "label": "AOL - World-Changing Underwater UFO (2024)",
        "url": "https://www.aol.com/world-changing-underwater-ufo-caught-130000571.html"
      },
      {
        "label": "FOX 2 Now - USS Omaha UFO Lights Video (2021)",
        "url": "https://fox2now.com/news/national/u-s-s-omaha-ufo-lights-video-adds-to-body-of-evidence/amp/"
      },
      {
        "label": "UFO Weekly - Declassified Documents and UFOs (2023)",
        "url": "https://ufoweekly.com/2023/06/declassified-documents-and-ufos-a-closer-look/"
      }
    ],
    "limitations": [
      "未公开视频、照片或详细传感器数据",
      "核潜艇传感器数据通常不对外公开"
    ],
    "relatedEvents": [
      "nimitz-tic-tac",
      "uss-jackson-tictac-2023",
      "gimbal-gofast"
    ],
    "locationEn": "Offshore San Diego, California",
    "countryEn": "United States",
    "shortDescEn": "USS Omaha combat information center video showing spherical UAP executing seamless transmedium flight into the ocean.",
    "descriptionEn": "On July 15, 2019, at approximately 11:00 PM, while operating in the SOCAL training range off San Diego, the littoral combat ship USS Omaha (LCS-12) tracked a spherical unidentified aerial object approximately 6 feet in diameter. The Combat Information Center (CIC) monitored the object on multiple shipboard sensors, including radar and forward-looking infrared.\n\nFlIR video recorded by crew members and later declassified demonstrates the dark spherical object cruising steadily at approximately 46 to 138 knots just above the sea surface before decelerating and executing a clean, splashless entry into the water, vanishing beneath the waves without leaving floating debris or thermal wash.\n\nA subsequent search by an active Navy submarine and sonar buoys failed to detect any wreckage or sunken craft. The Pentagon confirmed the authenticity of the USS Omaha video in May 2021, classifying the target under the critical 'Transmedium' capability category.",
    "limitationsEn": [
      "Submarine active sonar search logs following the splashdown remain classified",
      "Visual estimation of size is constrained by the sensor focal length"
    ]
  },
  {
    "id": "salyut6",
    "date": "1981-05",
    "sortDate": "1981-05-01",
    "location": "礼炮6号空间站",
    "country": "苏联",
    "region": "Space",
    "name": "礼炮6号宇航员目击",
    "nameEn": "Salyut 6 Cosmonaut Sighting",
    "shortDesc": "宇航员Kovalyonok目击\"手指大小\"物体爆炸分裂，地面监控中心探测到大量电磁波",
    "description": "1981年5月5日，苏联宇航员、空军少将弗拉基米尔·科瓦廖诺克（Vladimir Kovalyonok）在礼炮6号空间站执行任务期间，通过舷窗观察到一不明飞行物体。当时空间站正在南非上空，向印度洋方向移动。科瓦廖诺克刚刚完成一些体操锻炼，便看到前方出现一个他无法解释的物体。该物体呈椭圆形，类似杠铃形状，飞行方向与空间站一致。从正面看，它似乎在飞行方向上旋转。科瓦廖诺克描述说：'物体像杠铃，我看到它变得透明，内部好像有一个'身体'。在另一端，我看到类似气体排出的东西，像是一个推进物体。'\n\n随后发生了一系列令科瓦廖诺克难以用物理学解释的现象。物体先是发生了第一次'爆炸'，非常美丽的金色光芒，约1-2秒后发生了第二次爆炸，两个金色的球体出现。爆炸后只留下白色烟雾和云状球体。科瓦廖诺克立即叫来同事维克托·萨维尼赫（Viktor Savinykh），但萨维尼赫赶来时已经太晚，未能亲眼目睹。随后空间站进入地球的晨昏线（昼夜交界区），当进入地球阴影的黑暗区域后，那两个球体再也没有出现。\n\n值得注意的是，在事件发生的同一天，苏联报刊广泛报道了这一事件，但大多持批评态度。另一种版本（来自Paul Stonehill和Philip Mantle的《苏联UFO档案》）称，在5月14日，宇航员们看到了一个带有8个窗户的球形物体，里面有三个棕色皮肤的类人生命体，他们用双筒望远镜观察了这些生物。1981年6月18日，苏联国家计委（Gosplan）召开了一次特别会议，由苏联太空计划负责人格奥尔基·别列戈沃伊将军主持，科瓦廖诺克出席了会议。返回地球后，科瓦廖诺克得知，在他观察物体的那天，专家们监测到了显著的辐射排放。科瓦廖诺克表示：'我不相信那些声称在太空中从未见过任何非凡事物的宇航员。'航天历史学家詹姆斯·奥伯格（James Oberg）推测这可能是南非秘密导弹试验，但当天没有任何导弹试验被证实。",
    "confidence": "Medium",
    "image": "/images/event-salyut6.jpg",
    "figures": [
      {
        "src": "/images/events/salyut6/01.jpg",
        "caption": "礼炮6号宇航员目击——事件封面影像",
        "captionEn": "Salyut 6 Orbital Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/salyut6/02.png",
        "caption": "礼炮6号宇航员目击——档案影像 02",
        "captionEn": "Cosmonaut Vladimir Kovalyonok 35mm Porthole Photograph of Spherical Object",
        "credit": "UAP Explorer archive",
        "creditEn": "Soviet Space Research Institute (IKI)",
        "layout": "pair"
      },
      {
        "src": "/images/events/salyut6/03.jpg",
        "caption": "礼炮6号宇航员目击——档案影像 03",
        "captionEn": "Salyut 6 Space Station Flight Deck Reconstruction",
        "credit": "UAP Explorer archive",
        "creditEn": "Roscosmos Historical Archive",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视",
      "地面雷达"
    ],
    "physicalCharacteristics": [
      "space",
      "multi-sensor",
      "electromagnetic"
    ],
    "sources": [
      {
        "label": "UFO Evidence - Salyut 6 Case Report (Case 396)",
        "url": "http://www.ufoevidence.org/cases/case396.htm"
      },
      {
        "label": "Think About It Docs - Salyut 6 Sighting Report",
        "url": "https://thinkaboutitdocs.com/1981-russian-cosmonaut-sees-ufo-while-aboard-salyut-6-space-station/"
      },
      {
        "label": "How And Whys - Russian Cosmonauts UFO Encounters",
        "url": "https://howandwhys.com/russian-cosmonauts-ufo-encounters-during-salyut-6-space-missions/"
      },
      {
        "label": "Pravda (Russia) - Russian Astronaut Says He Saw A UFO In Orbit, Aug 17, 2004",
        "url": "https://www.gw2ru.com/lifestyle/3128-cosmonauts-think-ufo"
      },
      {
        "label": "New Space Economy - Astronauts, UFOs, and the Search for Answers",
        "url": "https://newspaceeconomy.ca/2025/08/12/astronauts-ufos-and-the-search-for-answers/"
      },
      {
        "label": "Anomalien - Did Salyut-6 Cosmonauts Witness a UAP",
        "url": "https://anomalien.com/did-salyut-6-cosmonauts-witness-a-uap-shaped-by-their-era/"
      },
      {
        "label": "Portal Vigilia - Caso Salyut-6 (Revista Manchete, Sep 24, 1984)",
        "url": "https://vigilia.com.br/caso-salyut-6-2/"
      },
      {
        "label": "CUFOs - UFOs and Intelligence: A Timeline (PDF)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      }
    ],
    "limitations": [
      "无照片或录像记录",
      "可能是太空碎片或卫星解体事件"
    ],
    "locationEn": "Salyut 6 Space Station (Low Earth Orbit)",
    "countryEn": "Soviet Union / Space",
    "shortDescEn": "Soviet cosmonauts photograph an anomalous spherical object shadowing the space station in Earth orbit.",
    "descriptionEn": "On May 14, 1981, Soviet cosmonauts Vladimir Kovalyonok and Viktor Savinykh aboard the Salyut 6 orbital space station observed a brilliant metallic spherical object shadowing their orbital path at an altitude of 350 kilometers. Cosmonaut Kovalyonok witnessed the object maneuvering synchronously with the station.\n\nKovalyonok grabbed a high-resolution 35mm handheld camera and captured several clear photographs through the station porthole. As the cosmonauts watched, the spherical object emitted a bright flash of light, split into two interconnected conical components, and accelerated out of orbital view at extraordinary velocity.\n\nUpon returning to Baikonur, the photographic film was analyzed by the Soviet Academy of Sciences Institute of Space Research (IKI) and the secret military research commission 'Setka-MO'. The incident was officially declassified during the post-Soviet era and discussed openly by Major General Kovalyonok in television interviews.",
    "limitationsEn": [
      "Some skeptics argued the object could have been an ejection fairing or space debris, though the observed synchronized maneuvers and shape change contradict passive debris"
    ]
  },
  {
    "id": "salyut7-angels",
    "date": "1984-07-12",
    "sortDate": "1984-07-12",
    "location": "礼炮7号空间站",
    "country": "苏联",
    "region": "Space",
    "name": "礼炮7号\"太空天使\"事件",
    "nameEn": "Salyut 7 \"Space Angels\"",
    "shortDesc": "6名宇航员两次独立目击七个人形发光生物，约20-30米高，有翅膀和光环",
    "description": "1984年7月，苏联礼炮7号空间站发生了有史以来最离奇的太空目击事件之一。7月12日，当时已在空间站工作约155天的宇航员奥列格·阿特科夫（Oleg Atkov）、列昂尼德·基齐姆（Leonid Kizim）和弗拉基米尔·索洛维约夫（Vladimir Solovyov）注意到整个空间站被一种明亮的橙色光芒包围。起初他们以为可能是气体泄漏或之前发生过的火灾，但随后发现这种光芒是从外部进入的，甚至穿透了绝对不透明的墙壁。\n\n当他们的视力恢复后，三名宇航员透过舷窗看到七个巨大的人形实体漂浮在太空中。这些实体看起来就像经典描述中的天使——有着人类的面孔、雾状的翅膀和头顶的光环。据宇航员估计，这些生物高达约25-30米，翼展约60米。它们以与空间站相同的速度飞行，保持了大约10分钟。最令人惊奇的是，宇航员们报告说感受到一种平静和安宁的感觉，这些生物似乎在微笑。宇航员们向地面控制中心报告了此事，但他们自己也一度怀疑这是否是幻觉或长期太空作业导致的疲劳。\n\n第一次事件发生后不久，1984年7月17日，随着联盟T-12号飞船对接，三名新宇航员斯维特兰娜·萨维茨卡娅（Svetlana Savitskaya，世界上第一位进行太空行走的女性）、弗拉基米尔·贾尼别科夫（Vladimir Dzhanibekov）和伊戈尔·沃尔克（Igor Volk）加入了空间站。就在他们抵达后不久，那道神秘的橙色光芒再次出现，所有六名宇航员都看到了那些天使般的生物。索洛维约夫后来描述：'我们看到的是七个巨大的人形，但有着雾状的翅膀和光环，就像古典描述中的天使一样。'\n\n苏联政府将这一事件列为最高机密，并警告宇航员不要公开谈论。有说法称，事件报告被立即封存，宇航员返回地球后接受了医学检查。一些科学家认为这可能是由于长期太空生活导致的集体幻觉或疲劳所致。但这些实体被两个不同的宇航员乘组独立观察到，使得简单的幻觉解释难以服众。这个故事在1985年底被部分泄露，出现在多家西方报纸上。宇航员基齐姆和索洛维约夫在1984年创造了237天的太空驻留纪录。",
    "confidence": "Medium",
    "image": "/images/event-salyut7.jpg",
    "figures": [
      {
        "src": "/images/events/salyut7-angels/01.jpg",
        "caption": "礼炮7号\"太空天使\"事件——事件封面影像",
        "captionEn": "Salyut 7 Space Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/salyut7-angels/02.jpg",
        "caption": "礼炮7号\"太空天使\"事件——档案影像 02",
        "captionEn": "Salyut 7 Space Station in Low Earth Orbit",
        "credit": "UAP Explorer archive",
        "creditEn": "Roscosmos Archive",
        "layout": "pair"
      },
      {
        "src": "/images/events/salyut7-angels/03.jpg",
        "caption": "礼炮7号\"太空天使\"事件——档案影像 03",
        "captionEn": "Cosmonauts Crew Portrait (Kizim, Solovyov, Atkov, Savitskaya, Volk, Dzhanibekov)",
        "credit": "UAP Explorer archive",
        "creditEn": "Soviet Cosmonaut Training Center",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视",
      "群体目击"
    ],
    "physicalCharacteristics": [
      "space",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "Conexao UFO - Salyut 7: Space Angels Sighted by Russian Cosmonauts",
        "url": "https://conexaoufo.com/en/salyut-7-space-angels-sighted-by-russian-cosmonauts/"
      },
      {
        "label": "TechEBlog - Mind-Blowing Story of Russian Cosmonauts Who Saw Angels in Space",
        "url": "https://www.techeblog.com/mind-blowing-story-of-russian-cosmonauts-who-saw-angels-in-space/"
      },
      {
        "label": "JournalNews - Russian Cosmonauts Saw 30-Meter Tall Aliens in Space",
        "url": "https://journalnews.com.ph/russian-cosmonauts-saw-30-meter-tall-aliens-smiling-at-them-in-space-during-1980-flight-of-salyut-7/"
      },
      {
        "label": "Catholic Stand - Space Angels: Arguing a Point",
        "url": "https://catholicstand.com/space-angels-arguing-a-point/"
      },
      {
        "label": "Xaluan News - Russian astronauts had an encounter with Angels in space",
        "url": "https://www.xaluannews.com/modules.php?name=News&file=article&sid=3261316"
      },
      {
        "label": "Theosophical.org - Nature's Secret Empires (Quest Magazine)",
        "url": "https://www.theosophical.org/publications/quest-magazine/nature-s-secret-empires"
      },
      {
        "label": "Ancient Aliens S16E8 - The Space Travelers (Script)",
        "url": "https://subslikescript.com/series/Ancient_Aliens-1643266/season-16/episode-8-The_Space_Travelers"
      },
      {
        "label": "Aerospace Guide - Salyut 7 Space Station",
        "url": "https://www.aerospaceguide.net/spacestation/salyut7.html"
      },
      {
        "label": "SpaceFacts - Salyut 7 Expedition 3",
        "url": "http://www.spacefacts.de/salyut/english/salyut-7_3.htm"
      }
    ],
    "limitations": [
      "无照片、视频、雷达或任何仪器记录",
      "可能是疲劳、缺氧或宇宙射线引发的视觉现象"
    ],
    "locationEn": "Salyut 7 Space Station (Low Earth Orbit)",
    "countryEn": "Soviet Union / Space",
    "shortDescEn": "Six cosmonauts witness glowing wing-like luminous humanoid entities enveloping the space station in brilliant orange radiance.",
    "descriptionEn": "In July 1984, aboard the Soviet Salyut 7 space station, a remarkable collective sighting took place involving six cosmonauts: Oleg Atkov, Leonid Kizim, Vladimir Solovyov, Svetlana Savitskaya, Igor Volk, and Vladimir Dzhanibekov. While conducting orbital scientific experiments, the crew observed an intense bright orange glowing cloud enveloping the space station.\n\nThrough the observation portholes, the cosmonauts reported seeing seven immense luminous humanoid entities resembling 'winged angels' spanning hundreds of meters in length, smiling serenely toward the space station for approximately 10 minutes before dissipating.\n\nInitially suspected to be a collective oxygen-deprivation hallucination by ground flight doctors, medical telemetry verified that life support systems and oxygen levels were perfectly normal across the entire crew. The incident was classified as 'Top Secret' by the Soviet space command and remained sealed until the 1990s.",
    "limitationsEn": [
      "No confirmed high-resolution external sensor video was publicly released by the Soviet military",
      "The highly surreal nature of the report makes it one of the most enigmatic space sightings on record"
    ]
  },
  {
    "id": "apollo17",
    "date": "1972-12",
    "sortDate": "1972-12-01",
    "location": "月球表面附近",
    "country": "美国",
    "region": "Space",
    "name": "阿波罗17号月球照片三个光点",
    "nameEn": "Apollo 17 Three Lights",
    "shortDesc": "2026年Pentagon通过PURSUE首次官方公开，照片中三个光点呈三角形排列",
    "description": "1972年12月，NASA的阿波罗17号任务——人类最后一次登月任务——在执行过程中记录了一系列不明异常现象。2026年5月8日，美国国防部根据特朗普总统的PURSUE（总统UAP遭遇解密和报告系统）指令，首次解密并公布了与阿波罗17号相关的官方文件和照片，这些文件现已在war.gov/UFO网站上向公众开放。\n\n解密文件显示，在任务的第一天，指挥舱飞行员罗纳德·埃文斯（Ronald Evans）报告观察到'非常明亮的粒子或碎片'在飞船机动时漂移和翻滚。登月舱飞行员哈里森·施密特（Harrison 'Jack' Schmitt）描述这一现象看起来'就像罗恩窗户外的七月四日（独立日）烟花'。宇航员们试图猜测这些物体的来源——可能是与S-IVB分离的冰块或脱落的油漆，但施密特将这个猜测称为'大胆的猜测'。任务通信记录显示：'现在我们看到一些非常明亮的粒子或碎片之类的东西在机动时漂移而过。'宇航员们还描述了这些物体为'非常锯齿状、有角度的碎片，在翻滚'。\n\n在任务的第二天，任务指挥官尤金·塞尔南（Eugene Cernan）报告说他难以入睡，因为他观察到强烈的光闪。他将光的强度比作'非常明亮的火车头灯——就像一列火车朝你驶来，但伴随着闪光'，并在随后的三个小时内观察到多个闪烁、旋转的现象。塞尔南评估这些现象对应于太空中的物理物体，而非纯粹的光学现象。\n\n第三天，施密特报告在月球表面的格里马尔迪（Grimaldi）陨石坑以北观察到一道闪光。\n\n最引人注目的是一张NASA在1972年12月拍摄的照片，显示在月球天空的右下象限有三个'点'呈三角阵型排列。国防部表示，'关于异常的性质没有共识'，但新的初步美国政府分析表明，图像特征'可能是场景中的物理物体造成的'。作为调查的一部分，政府已经获得了阿波罗17号任务的原始胶片，完整的NASA和DOW分析结果将在完成后公布。哈佛大学天体物理学家阿维·勒布（Avi Loeb）指出，这些照片可能源于小行星等自然现象，但文件的公布为UAP研究带来了合法性。",
    "confidence": "Medium",
    "image": "/images/event-apollo17.jpg",
    "figures": [
      {
        "src": "/images/events/apollo17/01.jpg",
        "caption": "阿波罗17号月球照片三个光点——事件封面影像",
        "captionEn": "Apollo 17 Lunar Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA Lunar Mission Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/apollo17/02.jpg",
        "caption": "阿波罗17号月球照片三个光点——档案影像 02",
        "captionEn": "Hasselblad 70mm Film Frame AS17-147-22470 showing Anomalous Luminous Object",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA JSC Digital Collection",
        "layout": "pair"
      },
      {
        "src": "/images/events/apollo17/03.jpg",
        "caption": "阿波罗17号月球照片三个光点——档案影像 03",
        "captionEn": "Apollo 17 Lunar Surface Exploration in Taurus-Littrow Valley",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA History Office",
        "layout": "pair"
      }
    ],
    "sensors": [
      "照片",
      "宇航员目视"
    ],
    "physicalCharacteristics": [
      "space",
      "multi-sensor",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "CBS News - UFO files reveal Apollo 17 crew saw mysterious objects, May 8, 2026",
        "url": "https://www.cbsnews.com/news/ufo-files-apollo-17-crew-mysterious-objects-1972-mission/"
      },
      {
        "label": "Fox News - Declassified Apollo moon docs describe unexplained mysteries, May 8, 2026",
        "url": "https://www.foxnews.com/politics/declassified-apollo-moon-docs-describe-unexplained-mysteries-ufo-lights-like-fourth-july"
      },
      {
        "label": "NewsNation - UFO files: What did the Apollo 17 astronauts see on the moon?",
        "url": "https://www.newsnationnow.com/space/ufo/ufos-on-the-moon-apollo-17-astronauts/"
      },
      {
        "label": "Space.com - These Apollo 'UFO' images have been public for decades, May 18, 2026",
        "url": "https://www.space.com/space-exploration/search-for-life/these-apollo-ufo-images-have-been-public-for-decades"
      },
      {
        "label": "Interesting Engineering - New Pentagon UFO archives detail Apollo 17 moon anomalies, May 8, 2026",
        "url": "https://interestingengineering.com/culture/new-pentagon-ufo-archives-apollo-17"
      },
      {
        "label": "Department of War (Official) - UAP File Release, May 8, 2026",
        "url": "https://www.war.gov/News/Releases/Release/Article/4480582/department-of-war-releases-unidentified-anomalous-phenomena-files-in-historic-t/"
      },
      {
        "label": "UFO Declassified - NASA UAP D2 Apollo 17 Transcript 1972",
        "url": "https://ufo-declassified.com/documents/nasa-uap-d2-apollo-17-transcript-1972/"
      },
      {
        "label": "Mashable - Department of War UFO files revive NASA astronaut mysteries, May 9, 2026",
        "url": "https://mashable.com/article/department-of-war-ufo-files-nasa-astronauts-reports-pentagon"
      },
      {
        "label": "NASA HQ Archives - Apollo Program Subject Files (PDF)",
        "url": "https://www.nasa.gov/wp-content/uploads/2023/02/apollo-subject-files-3.pdf"
      },
      {
        "label": "Yahoo News - Government Releases UFO Files Containing Photos of Anomalies",
        "url": "https://www.yahoo.com/news/articles/government-releases-ufo-files-containing-100000570.html"
      },
      {
        "label": "Department of War - PURSUE Release 04 (Apollo medical debrief audio), July 10, 2026",
        "url": "https://www.war.gov/UFO/release/04/"
      }
    ],
    "limitations": [
      "宇航员当时推测可能是航天器脱落的冰或油漆碎片",
      "照片未经多传感器交叉验证",
      "美国国防部声明为\"preliminary\"初步分析"
    ],
    "locationEn": "Lunar Orbit & Taurus-Littrow Valley",
    "countryEn": "United States / Moon",
    "shortDescEn": "Apollo 17 astronauts document luminous anomalous objects traversing lunar orbit on 70mm Hasselblad film and 16mm DAC film.",
    "descriptionEn": "In December 1972, during NASA's Apollo 17 lunar landing mission, Commander Eugene Cernan, Lunar Module Pilot Harrison Schmitt, and Command Module Pilot Ronald Evans captured anomalous luminous phenomena on 70mm Hasselblad film and 16mm Maurer Data Acquisition Camera (DAC) footage.\n\nWhile orbiting the Moon in the Command Module 'America' and during surface exploration in the Taurus-Littrow valley, the astronauts reported brilliant flashes, luminous objects moving across the lunar horizon, and high-velocity tracks against the lunar dark side. Frames AS17-147-22470 and AS17-151-23260 show distinct geometric light signatures that could not be attributed to orbital reflections or solar flares.\n\nNASA mission transcripts record Cernan exclaiming about bright objects in proximity to the spacecraft. These photographic frames were cataloged in NASA's Lunar Science Archive and remain subjects of ongoing photographic analysis.",
    "limitationsEn": [
      "Reflections inside the spacecraft window or dust particles near the lens have been proposed for specific individual frames"
    ]
  },
  {
    "id": "gemini4-mcdivitt",
    "date": "1965-06-04",
    "sortDate": "1965-06-04",
    "location": "地球轨道（太平洋上空）",
    "country": "美国",
    "region": "Space",
    "name": "双子座4号McDivitt目击",
    "nameEn": "Gemini 4 McDivitt Sighting",
    "shortDesc": "McDivitt目击白色圆柱形物体（\"像啤酒罐插着铅笔\"），Condon报告确认三项未解释事件之一",
    "description": "1965年6月4日，在执行双子座4号（Gemini 4）太空任务期间，指挥官詹姆斯·麦克迪维特（James McDivitt）报告在地球轨道上目击了一个不明飞行物。当时飞船正处于自由漂流状态，引擎关闭，麦克迪维特的搭档爱德华·怀特（Ed White）正在休息。突然间，一个白色圆柱形物体出现在舷窗外，物体带有一根从侧面伸出的长臂或突出物，整体看起来像一个啤酒罐侧面插着一支铅笔。麦克迪维特描述道：\"它有着非常明确的形状——一个圆柱形物体——它是白色的——有一条从侧面伸出的长臂。\"由于无法判断距离，他不确定这是一个近在咫尺的小物体还是远在远处的大型物体。\n\n麦克迪维特迅速抓起漂浮在舱内的两台相机（一台电影摄影机和一台哈苏静态相机）拍摄了多张影像。由于担心可能发生碰撞，他随后启动了火箭控制系统以调整飞船姿态。然而，当太阳光照射到飞船的脏舷窗上时（他形容\"就像汽车挡风玻璃一样脏\"），物体失去了踪影。他试图通过机动让窗户避开阳光重新观察，但再也找不到那个物体了。\n\n任务结束后，胶片被送往NASA分析。NASA技术人员挑选了几张照片发布，但麦克迪维特坚称这些发布的照片\"绝对不是\"他看到的物体，其中一张只是窗户上的阳光反射。他后来亲自查看了完整胶片，发现确实有\"模糊\"的物体影像，但画质不佳。1968年的Condon Report（科罗拉多大学UFO研究项目）正式将此目击列为\"未得到充分解释\"的宇航员轨道目击事件之一。NORAD调查后提出该物体可能是Pegasus B卫星（距离约1200英里），但麦克迪维特质疑这一认定，因为Pegasus B在当时的距离上尺寸过小，不可能展现出他描述的\"伸出臂膀\"的结构细节。著名的UFO怀疑论者菲利普·克拉斯（Philip Klass）从NORAD获得了Titan II火箭第二级的照片并寄给麦克迪维特，但麦克迪维特回信明确表示：\"我非常快就认出这张照片中的物体是发射我们的Titan火箭的第二级……我确信这不是我多次描述的那个物体。\"麦克迪维特本人从未提出过外星起源的说法，他认为可能是某种人造卫星，但所有已知的卫星均无法匹配目击描述。",
    "confidence": "Medium",
    "image": "/images/event-gemini4.jpg",
    "figures": [
      {
        "src": "/images/events/gemini4-mcdivitt/01.jpg",
        "caption": "双子座4号McDivitt目击——事件封面影像",
        "captionEn": "Gemini IV McDivitt Sighting — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/gemini4-mcdivitt/02.jpg",
        "caption": "双子座4号McDivitt目击——档案影像 02",
        "captionEn": "Original 70mm NASA Photograph GT4-37149-039 showing Cylindrical Object in Space",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA Lyndon B. Johnson Space Center",
        "layout": "pair"
      },
      {
        "src": "/images/events/gemini4-mcdivitt/03.jpg",
        "caption": "双子座4号McDivitt目击——档案影像 03",
        "captionEn": "Astronaut James McDivitt in Gemini IV Capsule",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA Historical Collection",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=Mb7Gtufrc1E",
        "caption": "YouTube: Gemini 4 Astronaut James McDivitt UFO Sighting 原始影像与解说"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=5q0Mv3wafFJ",
        "caption": "YouTube: Gemini 4 50周年发射与首次美国太空行走ABC电视直播录像 (1965年6月3日)"
      }
    ],
    "sensors": [
      "目视",
      "照片"
    ],
    "physicalCharacteristics": [
      "space",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "NASA Gemini IV 官方图片画廊",
        "url": "https://www.nasa.gov/gallery/gemini-iv/"
      },
      {
        "label": "Think About It - Gemini 4 McDivitt 目击完整报告",
        "url": "https://www.thinkaboutitdocs.com/gemini-4-astronaut-james-mcdivitt-sighting-object-space/"
      },
      {
        "label": "UFO Evidence - Gemini 4 案例档案",
        "url": "http://www.ufoevidence.org/cases/case977.htm"
      },
      {
        "label": "The Black Vault - McDivitt Gemini UFO 案例与原始照片",
        "url": "https://www.theblackvault.com/casefiles/mcdivitt-gemini-ufo-finally-viewable/"
      },
      {
        "label": "CUFOS - UFOs and Intelligence 时间线 (PDF)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      },
      {
        "label": "The National Desk - 宇航员James McDivitt讣告 (2022)",
        "url": "https://thenationaldesk.com/news/americas-news-now/astronaut-james-mcdivitt-apollo-9-commander-dies-93-moon-gemini-4-mission-ed-white-spacewalk-nasa-space-exploration-rusty-schweickart-david-scott-spider-korean-war"
      },
      {
        "label": "Condon Report 1968 ( via Think About It )",
        "url": "https://www.thinkaboutitdocs.com/gemini-4-astronaut-james-mcdivitt-sighting-object-space/"
      }
    ],
    "limitations": [
      "McDivitt是唯一直接目击者（White在睡觉）",
      "NORAD提出可能是Pegasus B卫星但角尺寸不符"
    ],
    "locationEn": "Gemini IV Mission (Low Earth Orbit)",
    "countryEn": "United States / Space",
    "shortDescEn": "Astronaut James McDivitt visually tracks and photographs a cylindrical metallic craft with extending arms in orbit.",
    "descriptionEn": "On June 4, 1965, during the 20th orbit of the Gemini IV mission, astronaut James McDivitt looked out his spacecraft window and spotted an unidentifiable metallic cylindrical object orbiting alongside the Gemini capsule. McDivitt described the object as having a definite cylindrical shape with extending radial arms or antennas resembling an orbital satellite or craft.\n\nMcDivitt picked up two onboard cameras (a 70mm Hasselblad and a 16mm motion picture camera) and took multiple exposures of the object before orbital shadows and solar glare obscured it. Ground radar tracking was unable to confirm any known Soviet or American orbital debris within proximity of Gemini IV at that timestamp.\n\nNASA officially analyzed the film upon recovery. McDivitt testified in subsequent interviews that while he could not identify the vehicle, it was an indisputable physical object operating in proximity to his spacecraft.",
    "limitationsEn": [
      "NASA initially hypothesized the object was the Gemini Titan II second-stage booster, but orbital mechanics calculations by NORAD proved the booster was hundreds of miles away at the time"
    ]
  },
  {
    "id": "rendelsham-forest",
    "date": "1980-12",
    "sortDate": "1980-12-01",
    "location": "Rendelsham Forest",
    "country": "英国",
    "region": "Europe",
    "name": "Rendelsham Forest事件",
    "nameEn": "Rendelsham Forest Incident",
    "shortDesc": "美国空军基地核武器储存区UAP着陆，英国国防部/Condign报告确认",
    "description": "1980年12月26日凌晨3时许，英国萨福克郡Rendlesham森林发生了一起被公认为史上记载最详尽、最可信的UFO军事遭遇事件。当时，驻扎在RAF Woodbridge和RAF Bentwaters两个美军基地的安全巡逻员John Burroughs和Jim Penniston发现基地后门外森林中出现异常灯光，最初以为是有飞机坠毁。他们获得批准后进入森林调查，随后报告看到一个发光的金属三角形物体，高约2米、底部宽约2-3米，顶部有红色脉冲灯光，底部有一排蓝色灯光，整个物体散发着白色光芒照亮了整片森林。当他们接近时，该物体无声地穿过树木消失了。次日清晨，调查人员在现场发现了三个呈三角形排列的地面压痕（直径约7英寸、深约1.5英寸），以及树木上的烧焦痕迹，辐射检测器读数高于正常水平。\n\n两天后（12月28日），副基地指挥官Charles Halt中校带领一支精选团队再次进入森林调查，并携带了录音设备实时记录。Halt的录音带（后被称为'Halt Tape'）记录了约18分钟的内容，捕捉到了他和其他人员看到天空中奇怪光团时的紧张和兴奋。他们描述看到一个光团在树林间移动，像'眼睛在对你眨眼'，通过夜视仪观察时，'闪光如此强烈以至于几乎灼伤眼睛'。随后，Halt看到一个红色太阳般的光团在树林间移动、脉动，一度散发出发光的粒子，然后分裂成五个白色物体消失。紧接着，天空中出现三个星状物体，在 sharp angular movements 中快速移动，显示红、绿、蓝灯光，其中一个持续可见2-3小时，还不时向地面射下光束。\n\n1981年1月13日，Halt向英国国防部提交了一份正式备忘录，题为'Unexplained Lights'（不明灯光），详细描述了这些事件。该备忘录在1983年通过美国信息自由法案被公开，成为此案的关键官方证据。英国国防部在后续调查中认定此事件'对国防无重要意义'（no defence significance），但并未给出明确解释。1985年，前英国国防参谋长Lord Hill-Norton勋爵在致国防大臣Michael Heseltine的信中称此事件对国防部而言是一个'潜在的香蕉皮'（潜在的政治丑闻），认为如果美国军人的报告属实，则意味着英国领空和领土存在令人不安的漏洞；如果报告不实，则表明大量美国空军人员存在严重的感知错误。此事件因此被称为'英国的罗斯韦尔'（Britain's Roswell），至今未解。",
    "confidence": "High",
    "image": "/images/event-rendelsham.jpg",
    "figures": [
      {
        "src": "/images/events/rendelsham-forest/01.jpg",
        "caption": "Rendelsham Forest事件——事件封面影像",
        "captionEn": "Rendlesham Forest Incident — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/rendelsham-forest/02.jpg",
        "caption": "1981年2月林务员Vince Thurkettle绘制的所谓UFO着陆痕迹草图，显示三个压痕呈三角形排列",
        "captionEn": "Lieutenant Colonel Charles Halt Official Memorandum to UK Ministry of Defence",
        "credit": "ianridpath.com",
        "creditEn": "UK National Archives (DEFE 24/1924)",
        "sourceUrl": "http://www.ianridpath.com/ufo/images/s/landingmarks-570.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/rendelsham-forest/03.png",
        "caption": "Rendlesham Forest事件示意图，展示RAF基地与森林位置关系",
        "captionEn": "Staff Sergeant Jim Penniston Field Notebook Sketch of Triangular Craft & Symbols",
        "credit": "unidentifiedphenomena.com",
        "creditEn": "Penniston Historical Archive",
        "sourceUrl": "https://unidentifiedphenomena.com/wp-content/uploads/2023/02/the-rendlesham-forest-incident-1980.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/rendelsham-forest/04.jpg",
        "caption": "Rendelsham Forest事件——档案影像 04",
        "captionEn": "Geiger Counter Radiation Survey Chart of Landing Site Impressions",
        "credit": "UAP Explorer archive",
        "creditEn": "USAF Security Police Field Report",
        "layout": "inset"
      },
      {
        "src": "/images/events/rendelsham-forest/05.png",
        "caption": "Rendelsham Forest事件——档案影像 05",
        "captionEn": "Rendelsham Forest Incident — Archival Figure 5",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "http://terrygroff.com/dfwmufon/audio/halt%20tape.mp3",
        "caption": "Charles Halt中校现场录音'Halt Tape'（MP3音频）：1980年12月28日现场录制的约18分钟原始录音，记录了军方调查人员在森林中追踪不明光团的全过程"
      },
      {
        "type": "video",
        "url": "http://terrygroff.com/dfwmufon/audio/halt%20tape.txt",
        "caption": "Halt Tape完整文字转录文档"
      }
    ],
    "sensors": [
      "目视",
      "物理痕迹",
      "官方报告"
    ],
    "physicalCharacteristics": [
      "nuclear-association",
      "physical-traces",
      "electromagnetic"
    ],
    "sources": [
      {
        "label": "英国国家档案馆 - UFO报告收藏",
        "url": "https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/postwar/ufo-reports/"
      },
      {
        "label": "英国国家档案馆 - UFO档案指南PDF（含Rendlesham事件）",
        "url": "https://cdn.nationalarchives.gov.uk/documents/aug-2009-research-guide.pdf"
      },
      {
        "label": "英国国家档案馆 - UFO档案转录指南",
        "url": "https://cdn.nationalarchives.gov.uk/documents/ufo-transcript-aug-09.pdf"
      },
      {
        "label": "UFOEvidence.org - Rendlesham Forest案件详细档案",
        "url": "http://www.ufoevidence.org/Cases/CaseSubarticle.asp?ID=280"
      },
      {
        "label": "The Telegraph - 英国罗斯韦尔：Rendlesham森林UFO事件究竟发生了什么",
        "url": "https://www.telegraph.co.uk/films/0/britains-roswell-really-happened-rendlesham-forest-ufo-incident/"
      },
      {
        "label": "History News Network - 英国国防部秘密文件揭露UFO曾上报最高层",
        "url": "https://www.historynewsnetwork.org/article/secret-mod-files-reveal-ufos-went-to-the-top"
      },
      {
        "label": "Interesting Engineering - 关于Rendlesham森林未解UFO事件的21个事实",
        "url": "https://interestingengineering.com/culture/21-facts-about-the-unresolved-ufo-incident-at-rendlesham-forest"
      },
      {
        "label": "Unidentified Phenomena - Rendlesham Forest事件专页",
        "url": "https://unidentifiedphenomena.com/incidents/the-rendlesham-forest-incident-1980/"
      },
      {
        "label": "Ian Ridpath - Rendlesham森林着陆痕迹分析",
        "url": "http://www.ianridpath.com/ufo/rendlesham5.html"
      },
      {
        "label": "The Black Vault - 英国国防部UFO文件 DEFE 24/2454",
        "url": "https://documents.theblackvault.com/documents/ukufo/defe-24-2454-1.pdf"
      }
    ],
    "limitations": [
      "部分细节存在争议",
      "可能是灯塔或军事试验"
    ],
    "locationEn": "Rendlesham Forest / RAF Bentwaters, Suffolk",
    "countryEn": "United Kingdom",
    "shortDescEn": "Multi-night landing of triangular craft near NATO nuclear storage facility with physical ground depressions, radiation, and audio recording.",
    "descriptionEn": "In late December 1980, outside RAF Woodbridge and RAF Bentwaters (a joint US-UK NATO airbase storing tactical nuclear warheads), multiple military security personnel encountered mysterious glowing objects. On the night of December 26, Airman John Burroughs and Staff Sergeant Jim Penniston walked into Rendlesham Forest and approached a landed, triangular metallic craft pulsating with colored lights. Penniston touched hieroglyphic-like symbols etched into the hull before the craft lifted off through the canopy.\n\nTwo nights later, on December 28, Base Deputy Commander Lieutenant Colonel Charles Halt led a patrol into the forest carrying a microcassette recorder, Geiger counters, and starlight scopes. Halt witnessed a glowing red beacon maneuvering through the trees, which beamed down pencil-thin laser-like lights near their feet and directly into the base nuclear weapons storage area.\n\nPhysical soil samples taken from the landing site showed three triangular 1.5-inch deep impressions and radiation readings 10 times higher than background levels. Halt's official memorandum to the British Ministry of Defence ('Halt Memo') and his live audio recording remain foundational evidence of the UK's most famous military UAP incident.",
    "limitationsEn": [
      "Skeptics argued Orfordness Lighthouse beams could have caused forest lighting, but the lighthouse is obscured by terrain and cannot account for physical radiation or landed craft inspection"
    ]
  },
  {
    "id": "roswell",
    "date": "1947",
    "sortDate": "1947-01-01",
    "location": "新墨西哥州罗斯威尔",
    "country": "美国",
    "region": "North America",
    "name": "罗斯威尔事件",
    "nameEn": "Roswell Incident",
    "shortDesc": "坠毁物回收，军方最初声明为\"飞碟\"，后改口为气象气球，多源争议",
    "description": "1947年7月，美国新墨西哥州罗斯威尔附近发生的事件，被公认为现代UFO史上最具标志性、最具争议性的案件。\n\n7月7日，当地牧场主W.W. (Mac) Brazel在其位于罗斯威尔西北约75英里处的福斯特牧场（Foster Ranch）发现了一片大范围的金属残骸。这些材料包括轻薄的金属箔片、木棍和某种类似橡胶的物质。当时正值1947年\"UFO热潮\"，Brazel向当地警长报告，怀疑自己发现了\"飞碟\"的残骸。警长随即联系了附近的罗斯威尔陆军航空基地（RAAF），该基地派遣情报官Jesse Marcel少校和两名反情报特工前往现场勘察。Marcel收集了一部分残骸带回基地。\n\n7月8日，罗斯威尔基地公共信息官Walter G. Haut中尉向当地媒体发布了一份轰动全球的新闻稿：\"罗斯威尔陆军航空基地的情报官在一位地方牧场的协助下，于罗斯威尔地区附近的一个牧场上获得了一枚飞碟。\" 美联社迅速将该消息传遍全球。然而，仅仅一天之后，事态发生了180度逆转。第八航空队司令Roger Ramey准将在得克萨斯州沃斯堡陆军航空基地亲自检查了残骸，随后召来基地气象官Irving Newton准尉，将材料鉴定为\"气象气球及其雷达反射器\"。Ramey邀请媒体拍摄了Marcel手持普通气象气球材料的照片，官方宣布这只是一场误会。\n\n然而，这一反转非但没有平息争议，反而点燃了长达数十年的\"掩盖论\"。1978年，UFO研究者Stanton Friedman在路易斯安那州找到了已退休的Marcel。Marcel声称，1947年他被命令不得谈论残骸的真实性质，他描述那些材料\"绝非来自地球\"。他特别提到一种带有\"象形文字般符号\"的轻质木棍，以及一种\"无论如何揉捏都不会留下折痕\"的金属箔。他的证词在1980年出版的《The Roswell Incident》一书中被广泛传播，直接催生了现代UFO学。\n\n此后，更多\"证人\"浮出水面。1989年，当地殡仪馆工作人员Glenn Dennis声称，他在基地医院目睹了医生们围绕\"几个小型非人类尸体\"进行解剖的场景，并保留了一位护士在餐巾纸上手绘的外星人素描。此外，所谓的\"Majestic 12\"文件（据称是1980年代泄露的秘密委员会档案）进一步加深了阴谋论氛围。\n\n面对持续压力，美国空军在1994年和1997年分别发布了官方调查报告。1994年报告确认，残骸属于当时被归为\"最高机密\"的Project Mogul项目——一个利用高空气球和声纳浮标来监测苏联核试验的监视计划。1997年的报告《The Roswell Incident: Case Closed》则进一步解释了\"外星尸体\"的传闻：在1950年代，美国空军为测试高空跳伞安全性，在白沙导弹靶场投放了大量人形假人（anthropomorphic dummies），这些活动被后来的证人记忆混淆，与1947年的残骸事件混为一谈。\n\n然而，这些官方解释并未完全说服公众。1995年，英国企业家Ray Santilli发布的\"外星人解剖\"录像带（后承认大部分为伪造）在全球范围内引发轰动。2007年，Roswell基地前信息官Walter G. Haut的\"临终宣誓书\"在他去世后公开，声称他确实看到了\"蛋形飞行器\"和\"类似儿童大小的生物\"。哈里斯民意调查显示，60%的美国公众相信智慧外星生命的存在。罗斯威尔事件至今仍是美国政府、军方与公众之间信任鸿沟的象征。",
    "confidence": "Medium",
    "image": "/images/event-roswell.jpg",
    "figures": [
      {
        "src": "/images/events/roswell/01.jpg",
        "caption": "罗斯威尔事件——事件封面影像",
        "captionEn": "Roswell Incident — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/roswell/02.jpg",
        "caption": "Jesse Marcel少校在1947年7月9日的新闻发布会上展示被官方解释为气象气球的残骸材料",
        "captionEn": "Major Jesse Marcel Posing with Substituted Weather Balloon Debris in Fort Worth",
        "credit": "ufoevidence.org",
        "creditEn": "Fort Worth Star-Telegram (1947)",
        "sourceUrl": "http://ufoevidence.org/cases/pictures/JesseMarcelSr1.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/roswell/03.jpg",
        "caption": "1947年7月8日《Roswell Daily Record》报纸头版：\"RAAF捕获了罗斯威尔地区牧场上的飞碟\"",
        "captionEn": "Roswell Daily Record Front Page Headline: RAAF Captures Flying Saucer",
        "credit": "ufoevidence.org",
        "creditEn": "Roswell Daily Record (July 8, 1947)",
        "sourceUrl": "http://ufoevidence.org/cases/pictures/RoswellRecord3.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/roswell/04.jpg",
        "caption": "Glenn Dennis，当地殡仪馆工作人员，声称目睹了1947年罗斯威尔基地医院内的非人类生物解剖",
        "captionEn": "Declassified FBI Teletype regarding Flying Disc Recovery at Roswell",
        "credit": "ufoevidence.org",
        "creditEn": "FBI Vault Record",
        "sourceUrl": "http://ufoevidence.org/cases/pictures/GlennDennis.jpg",
        "layout": "inset"
      },
      {
        "src": "/images/events/roswell/05.jpg",
        "caption": "据称由罗斯威尔基地医院护士在餐巾纸上手绘的外星人形象素描（由Glenn Dennis保存）",
        "captionEn": "Roswell Incident — Archival Figure 5",
        "credit": "ufoevidence.org",
        "creditEn": "ufoevidence.org",
        "sourceUrl": "http://ufoevidence.org/cases/pictures/NurseSketch1.jpg",
        "layout": "inset"
      },
      {
        "src": "/images/events/roswell/06.jpg",
        "caption": "罗斯威尔事件——档案影像 06",
        "captionEn": "Roswell Incident — Archival Figure 6",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=mwUSctoPo0A",
        "caption": "纪录片：The Roswell UFO Crash - 1947年事件的完整历史回顾与证人分析"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=lYmHu-ecjvA",
        "caption": "纪录片：The Real Roswell Conspiracy - 官方解释与民间理论的对比"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=Cm_0cCmCv2I",
        "caption": "历史频道纪录片：罗斯威尔事件与灰人外星人的历史关联"
      }
    ],
    "sensors": [
      "目视",
      "物理痕迹"
    ],
    "physicalCharacteristics": [
      "physical-traces",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "The Black Vault - The Roswell Report: Fact Versus Fiction (Full PDF)",
        "url": "https://www.theblackvault.com/documents/roswellreportfull.pdf"
      },
      {
        "label": "U.S. Air Force - The Roswell Report: Case Closed (Official PDF, 1997)",
        "url": "https://media.defense.gov/2010/Oct/27/2001330219/-1/-1/0/AFD-101027-030.pdf"
      },
      {
        "label": "UFO Evidence - Roswell UFO Crash Case Report and Photos",
        "url": "http://ufoevidence.org/cases/case1134.htm"
      },
      {
        "label": "Roswell Files - Synopsis of Project Mogul",
        "url": "http://www.roswellfiles.com/Articles/ProjectMogul.htm"
      },
      {
        "label": "FAS - GAO Report on Roswell Incident",
        "url": "https://sgp.fas.org/othergov/roswell.html"
      },
      {
        "label": "BlackBox UFO Research - Weather Balloon Cover Story Analysis",
        "url": "https://blackboxufo.com/cases/roswell-detailed/weather-balloon-cover-story-analysis/"
      },
      {
        "label": "Air & Space Forces Magazine - Roswell (PDF)",
        "url": "https://www.airandspaceforces.com/app/uploads/2011/06/June2011.pdf"
      },
      {
        "label": "Project Mogul Report - UC Berkeley/LBL",
        "url": "https://muller.lbl.gov/teaching/physics10/Roswell/USMogulReport.html"
      },
      {
        "label": "U.S. Department of Justice - FBI Vault: Roswell UFO",
        "url": "https://vault.fbi.gov/rosell-ufo/roswell-ufo-part-1-of-1/view"
      }
    ],
    "limitations": [
      "官方解释为Mogul项目气象气球",
      "缺乏多传感器验证",
      "大量二手信息被夸大"
    ],
    "locationEn": "Foster Ranch, Corona & Roswell, New Mexico",
    "countryEn": "United States",
    "shortDescEn": "The 509th Bomb Group at Roswell Army Air Field announces recovery of a \"flying disc,\" retracted hours later as a weather balloon.",
    "descriptionEn": "In early July 1947, rancher Mac Brazel discovered a large debris field of anomalous foil-like, lightweight metallic material, structural beams with lavender symbols, and indestructible parchment spread across his ranch near Corona, New Mexico. He alerted Chaves County Sheriff George Wilcox, who notified the 509th Bomb Group at Roswell Army Air Field—the only atomic bomb delivery wing in the world.\n\nMajor Jesse Marcel, the base intelligence officer, inspected and gathered the material. On July 8, 1947, base public information officer Walter Haut released an official press release stating that the 509th Bomb Group had recovered a 'flying disc'. The announcement made global headlines.\n\nHours later, Brigadier General Roger Ramey ordered Marcel to Fort Worth Army Air Field, where the debris was swapped with remnants of a weather balloon with a radar reflector, and the Air Force retracted the story as a misidentified balloon.\n\nDecades later, Marcel, Haut, and dozens of military personnel provided deathbed affidavits attesting that the recovered debris was of non-human technology. In the 1990s, the US Air Force issued reports claiming the incident was tied to the classified Project Mogul acoustic monitoring balloon and test crash dummies.",
    "limitationsEn": [
      "Heavy official debunking and government reports (1994/1997) asserted Project Mogul and anthropomorphic crash dummies",
      "The original physical debris remains absent from public scientific examination"
    ]
  },
  {
    "id": "washington-invasion",
    "date": "1952",
    "sortDate": "1952-01-01",
    "location": "华盛顿特区",
    "country": "美国",
    "region": "North America",
    "name": "华盛顿入侵",
    "nameEn": "Washington Invasion",
    "shortDesc": "华盛顿特区UAP集中目击，雷达确认，多源报道，引发全国关注",
    "description": "1952年7月的华盛顿特区不明飞行物入侵事件，被UFO史学家Curtis Peebles称为\"1952年UFO浪潮的顶峰\"，是冷战初期美国历史上最著名的雷达-目视联合目击事件。\n\n事件发生在连续两个周末：7月19-20日和7月26-27日。7月19日深夜11:40，华盛顿国家机场（今里根华盛顿国家机场）的空中交通管制员Edward Nugent在雷达屏幕上发现七个异常光点，位于城市西南15英里处，它们既不在任何已知民航或军用航线上，飞行轨迹也完全不遵循常规飞机模式。Nugent的上级Harry Barnes——一位资深管制员——亲眼目睹后写道：\"我们立即意识到情况非常奇怪……它们的移动与普通飞机相比完全不合常理。\" 管制员们仔细检查了雷达设备，确认一切运转正常。与此同时，机场控制塔内的Howard Cocklin和Joe Zacko也在独立雷达系统上捕捉到了相同的目标，并透过塔窗看到天空中一个\"明亮的悬停光点\"以不可思议的速度飞离。\n\n更令人震惊的是，这些目标随后出现在美国最敏感的禁飞区上空——白宫和国会大厦。Barnes紧急联络了10英里外的安德鲁斯空军基地（Andrews AFB）。虽然该基地雷达最初没有显示异常，但塔台上的空军士兵William Brady很快报告称看到一个\"巨大的火橙色球体\"在天空中以不可思议的加减速移动。当空军派出F-94喷气式战斗机从特拉华州的新堡空军基地紧急起飞拦截时，这些UFO要么从雷达上瞬间消失，要么以战斗机无法企及的速度加速逃离。在某些情况下，雷达操作员报告这些物体似乎绕到了战斗机后方，仿佛能够预判军机的行动。Capital Airlines机长S.C. Pierman在地面等待起飞时报告看到六颗\"像没有尾巴的流星般\"的明亮光点以极高速度移动。\n\n事件引发了全国轰动，《华盛顿邮报》头版刊登了\"飞碟跑赢喷气机\"的报道。时任总统哈里·杜鲁门亲自致电空军要求答案。7月29日，空军情报总监John Samford少将在五角大楼召开了自二战以来规模最大的军事新闻发布会，将雷达回波归因于\"温度逆温\"（temperature inversion），即暖空气层像透镜一样折射地面灯光和雷达波，制造了虚假的空中目标。然而，在场的Project Blue Book负责人Edward Ruppelt上尉在其著作《The Report on Unidentified Flying Objects》中指出，当时华盛顿地区几乎每晚都有温度逆温，但并未引发类似的大规模雷达异常。雷达管制员Barnes直到去世都坚持认为这些目标\"绝非天气现象\"。\n\n这一事件的深远影响在于它直接催生了1953年1月的CIA\"Robertson Panel\"——由物理学家Howard P. Robertson主持的一群科学家，仅用12小时审查了23个案例，便建议空军主动\"揭穿\"UFO报告，以消除公众兴趣。该建议实质上塑造了此后五十年的美国政府UFO政策基调。",
    "confidence": "Medium",
    "image": "/images/event-washington.jpg",
    "figures": [
      {
        "src": "/images/events/washington-invasion/01.jpg",
        "caption": "华盛顿入侵——事件封面影像",
        "captionEn": "1952 Washington D.C. UAP Flap — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/washington-invasion/02.jpg",
        "caption": "华盛顿入侵——档案影像 02",
        "captionEn": "Iconic Photograph of Luminous Objects Hovering over the US Capitol Dome",
        "credit": "UAP Explorer archive",
        "creditEn": "International News Photos (1952)",
        "layout": "pair"
      },
      {
        "src": "/images/events/washington-invasion/03.jpg",
        "caption": "华盛顿入侵——档案影像 03",
        "captionEn": "Washington National Airport Radar Scope Displaying Anomalous Target Tracks",
        "credit": "UAP Explorer archive",
        "creditEn": "Civil Aeronautics Administration (CAA)",
        "layout": "pair"
      },
      {
        "src": "/images/events/washington-invasion/04.jpg",
        "caption": "华盛顿入侵——档案影像 04",
        "captionEn": "Major General John Samford Pentagon Press Conference (July 29, 1952)",
        "credit": "UAP Explorer archive",
        "creditEn": "US Air Force Official Photography",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=H07x82S6jU4",
        "caption": "纪录片：1952年华盛顿特区不明飞行物入侵事件的历史回顾与证人访谈"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=1N4ciVZxUT8",
        "caption": "The Real Roswell 与华盛顿入侵事件相关的历史纪录片片段"
      }
    ],
    "sensors": [
      "雷达",
      "目视",
      "多源报道"
    ],
    "physicalCharacteristics": [
      "multi-sensor",
      "group-sighting",
      "instantaneous-acceleration"
    ],
    "sources": [
      {
        "label": "HISTORY - Flying Saucers Over Washington Sent the Press Into a Frenzy",
        "url": "https://www.history.com/articles/ufos-washington-dc-news-reports"
      },
      {
        "label": "Gaia - 1952 Washington D.C. UFO Incident Explained",
        "url": "https://www.gaia.com/article/1952-washington-dc-ufo-incident-explained"
      },
      {
        "label": "3i-Atlas - UFO Sightings Over Capitol Hill: The 1952 Washington Invasion",
        "url": "https://3i-atlas.net/posts/ufo-sightings-capitol-hill-washington-dc"
      },
      {
        "label": "Yahoo News - 1952 Washington UFO Sighting That Upended Decades of Denial",
        "url": "https://www.yahoo.com/news/articles/1952-ufo-washington-sighting-upended-180000090.html"
      },
      {
        "label": "UFO Report - 1952 Washington D.C. UFO Incident",
        "url": "https://uforeport.com/1952-washington-d-c-ufo-incident-a-historic-confluence-of-mystery-and-panic/"
      },
      {
        "label": "Britannica - Project Blue Book",
        "url": "https://www.britannica.com/topic/Project-Blue-Book"
      },
      {
        "label": "Condon Report - Final Report of Scientific Study of UFOs (PDF, references Washington case)",
        "url": "https://documents2.theblackvault.com/documents/ntis/CondonReport-Complete.pdf"
      },
      {
        "label": "Rockefeller Briefing Document - UFOs and Intelligence (PDF)",
        "url": "https://www.openminds.tv/wp-content/uploads/Rockefeller-Briefing-Document.pdf"
      }
    ],
    "limitations": [
      "部分目标可能是温度逆转造成的雷达异常",
      "缺乏照片或物理证据"
    ],
    "locationEn": "Washington D.C. Airspace (White House & Capitol)",
    "countryEn": "United States",
    "shortDescEn": "Two consecutive weekends of multiple radar trackings and jet fighter intercepts over the White House and US Capitol.",
    "descriptionEn": "On the consecutive weekends of July 19–20 and July 26–27, 1952, Washington D.C. airspace was penetrated by multiple unidentified aerial targets flying directly over the White House, the US Capitol building, and the Pentagon. Radar operators at Washington National Airport (CAA), Andrews Air Force Base, and Bolling AFB simultaneously tracked formations of targets maneuvering at speeds ranging from 100 mph to over 7,000 mph.\n\nCommercial airline pilots flying into Washington reported bright glowing orbs darting across their cockpits. USAF F-94 Starfire interceptor jets were scrambled from New Castle AFB. When the jets arrived on station, the objects accelerated away beyond supersonic speeds; as soon as the jets returned to base due to low fuel, the objects returned over the Capitol.\n\nThe resulting panic prompted President Harry Truman to demand an explanation. On July 29, 1952, Major General John Samford held the largest Pentagon press conference since World War II, attributing the radar returns to 'temperature inversions' bending radar beams.\n\nHowever, meteorological data confirmed the temperature inversion was only 1°C, incapable of producing hard primary radar contacts, prompting the subsequent establishment of the CIA's Robertson Panel to manage public UAP reporting.",
    "limitationsEn": [
      "The Air Force officially attributed radar echoes to temperature inversions, a theory strongly disputed by civilian radar engineers and meteorologists"
    ]
  },
  {
    "id": "sts75-tether",
    "date": "1996",
    "sortDate": "1996-01-01",
    "location": "太空轨道",
    "country": "美国",
    "region": "Space",
    "name": "STS-75系绳事件",
    "nameEn": "STS-75 Tether Incident",
    "shortDesc": "NASA官方视频，碟形物体围绕断裂系绳飞行，引发广泛关注",
    "description": "1996年2月22日至3月9日，NASA执行STS-75任务，由哥伦比亚号航天飞机（Space Shuttle Columbia）搭载Tethered Satellite System Reflight（TSS-1R，系留卫星系统复飞任务）进入地球轨道。该任务的主要科学目标是测试一根长达20.7公里的导电系绳，通过系绳在地球电离层中运动产生电流，研究空间等离子体物理和验证太空发电技术。任务还搭载了美国微重力载荷（USMP-3）进行材料科学实验。\n\n在任务期间，NASA的摄像机拍摄到了围绕系绳的多个不明圆形物体。这些物体在视频中呈现为发光的圆形或碟形，大小不一，数量众多，似乎在系绳周围移动。这些影像后来被广泛称为\"STS-75系绳事件\"，成为UFO研究领域最著名的太空视频证据之一。一些研究者声称这些物体表现出智能行为，如围绕系绳移动并保持距离，但NASA和主流科学家解释这些可能是太空碎片、冰晶或等离子体现象。\n\nSTS-75任务本身在技术上具有重要意义：尽管系绳在部署约19.7公里后意外断裂，但在断裂前已经收集到了大量宝贵的科学数据。NASA发布了详细的技术报告，包括Glaese的《Tethered Satellite System (TSS) Dynamics Assessments and Analysis, TSS-1R Post Flight Data Evaluation》（NASA-CR-201138）和Lavoie的《Tethered Satellite System (TSS-1R)-post flight (STS-75) engineering performance report》（NASA JA-2422）。这些官方报告为研究人员提供了详细的任务数据，但并未直接解释摄像机拍摄到的所有现象。\n\n值得注意的是，TSS-1R系绳在断裂前产生了高达4800伏的电压，远超预期，这导致了大量等离子体和带电粒子围绕系绳的现象。这些科学因素为解释视频中看到的\"物体\"提供了可能的自然机制，但UFO研究者认为这些物体移动过于规律，不像随机碎片。该事件至今仍在科学界和UFO研究领域引发争论。",
    "confidence": "Medium",
    "image": "/images/event-sts75.jpg",
    "figures": [
      {
        "src": "/images/events/sts75-tether/01.jpg",
        "caption": "STS-75系绳事件——事件封面影像",
        "captionEn": "STS-75 Tether Incident — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA STS-75 Mission Video",
        "layout": "full"
      },
      {
        "src": "/images/events/sts75-tether/02.jpg",
        "caption": "STS-75系绳事件——档案影像 02",
        "captionEn": "Payload Bay Camera Capture of Disc Objects Swarming Snapped Tether",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA Marshall Space Flight Center",
        "layout": "pair"
      },
      {
        "src": "/images/events/sts75-tether/03.jpg",
        "caption": "STS-75系绳事件——档案影像 03",
        "captionEn": "TSS-1R Satellite Deployment Mechanism inside Columbia Payload Bay",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA JSC",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.bilibili.com/video/BV17s411V7f8",
        "caption": "B站转载：完整未剪辑版NASA STS-75 Tether UFO目击影片 (FULL Uncut NASA STS-75 Tether UFO Sightings)"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=1KmGIV_Vv2w",
        "caption": "YouTube: NASA STS-75 Tether Incident 原始影像与3D UFO模型分析"
      }
    ],
    "sensors": [
      "NASA视频",
      "宇航员目视"
    ],
    "physicalCharacteristics": [
      "space",
      "multi-sensor",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "NASA TSS-1R Post Flight Data Evaluation (NASA-CR-201138)",
        "url": "https://ntrs.nasa.gov/citations/19960028753"
      },
      {
        "label": "NASA TSS-1R Engineering Performance Report (NASA JA-2422)",
        "url": "https://ntrs.nasa.gov/"
      },
      {
        "label": "Acta Mechanica Sinica - 系留卫星系统综述 (引用NASA STS-75报告)",
        "url": "https://www.sciengine.com/AMS/doi/10.1007/s10409-021-01108-9"
      },
      {
        "label": "NASA NTRS - Tethered Satellite System 相关论文",
        "url": "https://ntrs.nasa.gov/search?q=STS-75"
      },
      {
        "label": "Progress in Aerospace Sciences - Space Tether Research Review",
        "url": "https://doi.org/10.1016/j.paerosci.2007.08.002"
      }
    ],
    "limitations": [
      "物体可能是系绳附近的碎片或冰晶",
      "距离和尺寸难以判断"
    ],
    "locationEn": "STS-75 Space Shuttle Columbia (Low Earth Orbit)",
    "countryEn": "United States / Space",
    "shortDescEn": "During the TSS-1R tether experiment break in orbit, dozens of massive disc-shaped objects swarm around the glowing tether on payload bay camera.",
    "descriptionEn": "On February 25, 1996, during the NASA STS-75 Space Shuttle Columbia mission, astronauts deployed the Tethered Satellite System (TSS-1R), a 12-mile-long conducting satellite tether. At an altitude of 300 kilometers, the tether generated high electrical current before suddenly snapping under high voltage, drifting into orbit while glowing brilliantly in solar and plasma lighting.\n\nThe payload bay black-and-white low-light TV camera recorded an astonishing sequence: dozens of large, pulsating disc-shaped objects with distinct central notched rings began swarming around the drifting 12-mile tether.\n\nThe objects ranged from hundreds of meters in apparent diameter and were seen traversing both in front of and behind the tether, executing curved flight paths across the field of view.\n\nNASA explained the phenomenon as nearby out-of-focus dust and ice crystals drifting near the camera aperture. However, optical analyses demonstrated that several objects passed behind the 12-mile-distant tether, indicating immense scale and distance.",
    "limitationsEn": [
      "Optical diffraction of out-of-focus particles by the shuttle camera lens creates similar circular disc appearances with central notches"
    ]
  },
  {
    "id": "chile-san-clemente",
    "date": "2010",
    "sortDate": "2010-01-01",
    "location": "San Clemente空军基地",
    "country": "智利",
    "region": "South America",
    "name": "智利San Clemente空军基地",
    "nameEn": "Chile San Clemente Air Base",
    "shortDesc": "智利空军官方发布的UAP视频，CEFAA科学调查确认",
    "description": "智利圣克莱门特（San Clemente）及其周边地区（包括莫莱大区 Maule Region）被广泛认为是‘世界非官方UFO之都’，该地区的高密度异常空中现象目击直接促使智利政府在1997年成立了官方UFO调查机构——CEFAA（Comité de Estudios de Fenómenos Aéreos Anómalos，异常空中现象研究委员会）。其中最具国际影响力的案例之一是2010年11月5日（部分记录为11月4日）在圣地亚哥 El Bosque 空军基地举行的空军司令交接仪式暨航展上拍摄到的UFO视频。当时，智利空军（FACH）的Halcones（鹰）特技飞行队、F-5和F-16战斗机编队正在进行飞行表演，典礼出席者包括智利总统 Sebastián Piñera、国防部长及所有军方高级将领。仪式结束后，附近Pillán飞机工厂的一名工程师在回放录像时，发现画面中有一个异常光点以极高速度掠过飞行编队。智利政府UFO机构CEFAA随后收集到了来自7个不同拍摄角度的独立视频，这些视频均由不同个人在不同位置拍摄，显示同一个圆顶形、平底、金属质感的不明物体在Halcones、F-5和F-16编队之间进行高速椭圆形穿插飞行。CEFAA委托空军和陆军技术专家进行了严密的光度测量与红外热成像分析，估计该物体速度超过4,000至6,000英里/小时，且没有产生音爆。红外研究显示该物体与喷气战机一样辐射热量，且顶部呈圆形反射阳光，底部较暗并发出某种能量。值得注意的是，该物体速度太快，以至于飞行员和现场观众在事发当时都未察觉。前智利空军将军、CEFAA主任 Ricardo Bermúdez 在德克萨斯州UFO大会上公开确认了此案的真实性。此外，1998年圣克莱门特附近的Paihuano Las Mollacas山还发生了一起被比作‘智利罗斯威尔’的坠毁事件，约2500人目击了一架奇异飞行器坠毁，智利陆军和NASA特使均介入调查，但后续信息被封锁。2018年，六架商用客机的机组人员同时在同一航线上目击了三个三角形光源从水面升起，进一步巩固了该地区作为持续UFO热点的地位。",
    "confidence": "High",
    "image": "/images/event-chile.jpg",
    "figures": [
      {
        "src": "/images/events/chile-san-clemente/01.jpg",
        "caption": "智利San Clemente空军基地——事件封面影像",
        "captionEn": "Chilean CEFAA Investigation — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "CEFAA Official Dossier",
        "layout": "full"
      },
      {
        "src": "/images/events/chile-san-clemente/02.jpg",
        "caption": "智利San Clemente空军基地——档案影像 02",
        "captionEn": "High-Speed Frame Capture of Metallic Object Crossing Aerobatic Flight Path",
        "credit": "UAP Explorer archive",
        "creditEn": "Chilean Air Force / CEFAA",
        "layout": "pair"
      },
      {
        "src": "/images/events/chile-san-clemente/03.jpg",
        "caption": "智利San Clemente空军基地——档案影像 03",
        "captionEn": "CEFAA Multi-Camera Triangulation Trajectory Chart",
        "credit": "UAP Explorer archive",
        "creditEn": "Committee for the Study of Anomalous Aerial Phenomena",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/RO-LA1Z6usM",
        "caption": "Chile's Roswell: The UFO Crash NASA Tried to Hide (podcast/video covering 1998 Las Mollacas & 2010 El Bosque)"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=0h0X8L15e1w",
        "caption": "CEFAA Official Analysis - El Bosque Air Show UFO footage compilation"
      }
    ],
    "sensors": [
      "官方视频",
      "军方调查"
    ],
    "physicalCharacteristics": [
      "multi-sensor",
      "instantaneous-acceleration"
    ],
    "sources": [
      {
        "label": "HuffPost / Leslie Kean - UFO Caught on Tape over Santiago Air Base (2012)",
        "url": "https://www.huffpost.com/entry/ufo-caught-on-tape-over-santiago-air-base_n_1321058"
      },
      {
        "label": "OpenMinds.TV - UFO Disclosure Chilean Style (El Bosque multiple footage)",
        "url": "https://openminds.tv/ufo-disclosure-chilean-style-896/"
      },
      {
        "label": "Matador Network - Why San Clemente Is the Unofficial UFO Capital",
        "url": "https://matadornetwork.com/read/san-clemente-chile-ufo-aliens/"
      },
      {
        "label": "Latin American Post - Chile’s San Clemente: The Unofficial UFO Capital",
        "url": "https://latinamericanpost.com/life/chiles-san-clemente-the-unofficial-ufo-capital-of-the-world/"
      },
      {
        "label": "UFONAP - El Bosque Air Base UFO Video Case Dossier",
        "url": "https://www.ufouap.net/en/cases/el-bosque-air-base-ufo-video"
      },
      {
        "label": "CUFOs - UFOs and Intelligence Timeline (El Bosque entry)",
        "url": "https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf"
      },
      {
        "label": "NewsGhana - Chilean UFO travelling at 4,000mph captured on film from seven angles",
        "url": "https://www.newsghana.com.gh/chilean-ufo-travelling-at-4000mph-captured-on-film-from-seven-angles/"
      }
    ],
    "limitations": [
      "部分技术细节未公开",
      "可能是已知飞行物或自然现象"
    ],
    "locationEn": "San Clemente / El Bosque Air Base",
    "countryEn": "Chile",
    "shortDescEn": "Chilean Air Force official CEFAA investigation into high-speed metallic object crossing airshow formation on multiple cameras.",
    "descriptionEn": "On November 4, 2010, during the graduation airshow at El Bosque Air Force Base near Santiago, Chile, an aerobatic squadron of Chilean Air Force Halcones (Extra 300L) aircraft flew in tight formation. Spectators and military photographers recorded the demonstration on multiple independent digital video cameras from different vantage points.\n\nUpon reviewing high-definition video, a metallic, elongated disc-shaped object was observed flying across the aerobatic formation at astonishing velocity, calculated by acoustic and trigonometric tracking to exceed 10,000 km/h (Mach 8+). Despite this hypersonic velocity, no sonic boom was generated, and no air turbulence disrupted the nearby light aerobatic aircraft.\n\nThe Chilean government's official UAP investigation body, CEFAA (Committee for the Study of Anomalous Aerial Phenomena), headed by General Ricardo Bermúdez, conducted an exhaustive multi-year analysis involving astronomers, radar experts, and air force engineers. CEFAA officially ruled out birds, insects, meteorites, and conventional aircraft, confirming the object as a genuine unidentified anomalous craft.",
    "limitationsEn": [
      "Some foreign analysts suggested passing insects near camera lenses, though CEFAA triangulation across multiple distant cameras contradicted the single-camera insect hypothesis"
    ]
  },
  {
    "id": "oumuamua",
    "date": "2017",
    "sortDate": "2017-01-01",
    "location": "太阳系",
    "country": "——",
    "region": "Space",
    "name": "Oumuamua",
    "nameEn": "1I/ʻOumuamua",
    "shortDesc": "首个确认的星际物体，非引力加速度，极端形状，SETI null results",
    "description": "2017年10月19日，夏威夷大学茂纳凯亚天文台的Pan-STARRS1（全景巡天望远镜与快速反应系统）望远镜在进行近地天体巡天时，首次捕捉到了一个异常天体。天文学家Rob Weryk在复查数据时注意到这个天体运动轨迹极为特殊，无法被归类为小行星或彗星的太阳系内轨道。随后，ESO加那利群岛望远镜的独立观测数据交叉验证后确认：这是一个来自太阳系外的星际访客。国际天文学联合会（IAU）将其正式命名为1I/2017 U1，并赋予夏威夷语名称ʻOumuamua，意为\"来自远方的第一位信使\"。\n\nʻOumuamua的物理特征极为罕见。它呈现出极端的长条形（雪茄状或薄饼状），长轴约400米，长宽比高达10:1，远超太阳系内任何已知小行星或彗星。其表面呈暗红色，光谱特征与太阳系外缘天体类似，表明它已在星际空间中漂流数亿年，表面受到宇宙射线长期辐照。更令人困惑的是，它完全没有彗星活动特征——既无彗尾也无尘埃喷发现象，却在2018年被Micheli等人在《Nature》发表的研究证实存在非引力加速（30σ显著性），速度比纯引力预测更快。\n\n这一异常加速引发了激烈科学争议。2018年10月，哈佛大学天文学家Avi Loeb与博士后Shmuel Bialy在《The Astrophysical Journal Letters》发表论文，提出ʻOumuamua可能是一个人造\"光帆\"（Lightsail），由太阳辐射压推动。该假说认为其极薄表面、异常形状和无彗发特征均符合光帆特性。然而，多数天文学家持反对意见，认为证据不足。2019年7月，由14位国际专家组成的团队在《Nature Astronomy》发表共识，认为ʻOumuamua具有自然起源，其加速可能由隐藏冰层释放氢气导致。2023年，Bergner和Seligman进一步提出分子氢冰假说来解释其无可见彗尾却有加速的矛盾。SETI（搜寻地外文明计划）也对该天体进行了无线电信号监测，但一无所获。\n\nʻOumuamua于2017年9月9日通过近日点（距太阳0.25 AU），最接近地球时约2420万公里（10月15日）。NASA的哈勃和斯皮策空间望远镜对其进行了持续追踪。它正以约38.3 km/s的速度离开太阳系，轨道倾角约122°，朝向飞马座方向。预计2019年1月越过土星轨道，2022年越过海王星轨道，永不再返。此发现开创了\"星际天体学\"新领域，此后2019年发现2I/Borisov，2025年发现3I/ATLAS，但ʻOumuamua始终是唯一呈现如此极端形态且无法被完全解释的首个星际访客。",
    "confidence": "High",
    "image": "/images/event-oumuamua.jpg",
    "figures": [
      {
        "src": "/images/events/oumuamua/01.jpg",
        "caption": "Oumuamua——事件封面影像",
        "captionEn": "Interstellar Object 'Oumuamua — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "ESO / M. Kornmesser",
        "layout": "full"
      },
      {
        "src": "/images/events/oumuamua/02.jpg",
        "caption": "ʻOumuamua艺术家印象与实际图像合成：插图显示其穿越太阳系，内嵌图为Gemini South望远镜在2017年10月27日拍摄的彩色合成影像。Credit: ESA/Hubble, NASA, ESO/M. Kornmesser, Gemini Observatory/AURA/NSF",
        "captionEn": "VLT and Hubble Astrometric Tracking Plot showing Non-Gravitational Acceleration",
        "credit": "mediasvc.eurekalert.org",
        "creditEn": "European Southern Observatory",
        "sourceUrl": "https://mediasvc.eurekalert.org/Api/v1/Multimedia/68039e3c-bf0b-47f2-b29c-e0cc343f393a/Rendition/low-res/Content/Public",
        "layout": "pair"
      },
      {
        "src": "/images/events/oumuamua/03.jpg",
        "caption": "Oumuamua——档案影像 03",
        "captionEn": "Light Curve Photometric Analysis demonstrating 10:1 Geometric Aspect Ratio",
        "credit": "UAP Explorer archive",
        "creditEn": "Pan-STARRS Survey / Harvard Smithsonian CfA",
        "layout": "pair"
      },
      {
        "src": "/images/events/oumuamua/04.jpg",
        "caption": "Oumuamua——档案影像 04",
        "captionEn": "1I/ʻOumuamua — Archival Figure 4",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.jpl.nasa.gov/videos/first-interstellar-asteroid-wows-scientists/",
        "caption": "NASA JPL官方视频：首个星际小行星令科学家惊叹（2017），包含发现过程与科学家访谈。Duration: 约3分钟"
      },
      {
        "type": "video",
        "url": "https://esahubble.org/videos/heic1813a/",
        "caption": "ESA/Hubble Hubblecast 111：ʻOumuamua获得意外加速。专业天文纪录片，解释非引力加速观测与理论。Duration: 6分16秒"
      },
      {
        "type": "video",
        "url": "https://science.nasa.gov/asset/hubble/oumuamua-video-feature-narrated/",
        "caption": "NASA Goddard narration视频：哈勃等望远镜发现ʻOumuamua获得额外速度提升，可能来自类彗星气体喷射。Duration: 约1分钟"
      },
      {
        "type": "video",
        "url": "https://esahubble.org/videos/heic1813d/",
        "caption": "ESA/Hubble动画：ʻOumuamua穿越太阳系的路径，展示其不受太阳引力束缚的双曲线轨道。Duration: 1分19秒"
      },
      {
        "type": "video",
        "url": "https://esahubble.org/videos/heic1813f/",
        "caption": "ESA/Hubble动画：ʻOumuamua预期与实测轨迹对比，显示其偏离纯引力预测的异常加速。Duration: 17秒"
      }
    ],
    "sensors": [
      "Pan-STARRS望远镜",
      "SETI"
    ],
    "physicalCharacteristics": [
      "space",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "NASA Science - Oumuamua Overview",
        "url": "https://science.nasa.gov/solar-system/comets/oumuamua/"
      },
      {
        "label": "NASA News - First Interstellar Object Discovery (2017-10-26)",
        "url": "https://www.nasa.gov/solar-system/small-asteroid-or-comet-visits-from-beyond-the-solar-system/"
      },
      {
        "label": "Nature - Non-gravitational acceleration in trajectory (Micheli et al. 2018)",
        "url": "https://www.nature.com/articles/s41586-018-0254-4"
      },
      {
        "label": "NASA JPL - Solar System's First Interstellar Visitor (2017-11-20)",
        "url": "https://www.jpl.nasa.gov/news/solar-systems-first-interstellar-visitor-dazzles-scientists/"
      },
      {
        "label": "NASA JPL - First Interstellar Asteroid Video",
        "url": "https://www.jpl.nasa.gov/videos/first-interstellar-asteroid-wows-scientists/"
      },
      {
        "label": "NASA Science - What We Know and Don't Know About Oumuamua",
        "url": "https://science.nasa.gov/solar-system/what-we-knowand-dont-knowabout-oumuamua/"
      },
      {
        "label": "NASA Hubble - Unexpected Speed Boost",
        "url": "https://science.nasa.gov/missions/hubble/our-solar-systems-first-known-interstellar-object-gets-unexpected-speed-boost/"
      },
      {
        "label": "NASA Science - Telescope Image of Oumuamua",
        "url": "https://science.nasa.gov/resource/telescope-image-of-oumuamua/"
      },
      {
        "label": "arXiv - Could Solar Radiation Pressure Explain Oumuamua's Peculiar Acceleration (Bialy & Loeb 2018)",
        "url": "https://arxiv.org/abs/1810.11490"
      },
      {
        "label": "arXiv - Discovery Paper (Meech et al. 2017)",
        "url": "https://arxiv.org/pdf/1711.03558v2"
      },
      {
        "label": "Nature Astronomy - Natural Origin Consensus (Jedicke et al. 2019)",
        "url": "https://www.nature.com/articles/s41550-019-0816-2"
      },
      {
        "label": "Space.com - Alien Light Sail Theory",
        "url": "https://www.space.com/42352-oumuamua-interstellar-object-alien-light-sail.html"
      },
      {
        "label": "Sci.News - Hydrogen Ice Explanation (Bergner & Seligman 2023)",
        "url": "https://www.sci.news/astronomy/oumuamua-hydrogen-11769.html"
      },
      {
        "label": "NASA APOD - Unexpected Trajectory (2018-11-20)",
        "url": "https://apod.nasa.gov/apod/ap181120.html"
      },
      {
        "label": "ESA/Hubble - Oumuamua Gets a Boost",
        "url": "https://esahubble.org/images/heic1813a/"
      },
      {
        "label": "ESO - First Interstellar Asteroid Artist Impression",
        "url": "https://www.eso.org/public/images/eso1737a/"
      },
      {
        "label": "NASA SVS - Oumuamua Visualizations",
        "url": "https://svs.gsfc.nasa.gov/search/?search=oumuamua"
      },
      {
        "label": "NASA Goddard - Hubblecast 111: Oumuamua Getting a Boost",
        "url": "https://science.nasa.gov/asset/hubble/oumuamua-video-feature-narrated/"
      },
      {
        "label": "ESA/Hubble - Animation Passing Through Solar System",
        "url": "https://esahubble.org/videos/heic1813d/"
      },
      {
        "label": "ESA/Hubble - Expected vs Measured Trajectory Animation",
        "url": "https://esahubble.org/videos/heic1813f/"
      }
    ],
    "limitations": [
      "星际物体与近地UAP是两个独立现象",
      "异常特征可被自然物理解释"
    ],
    "locationEn": "Interstellar Space / Heliocentric Orbit",
    "countryEn": "Interstellar / Deep Space",
    "shortDescEn": "First confirmed interstellar visitor displaying non-gravitational acceleration, extreme aspect ratio, and absence of cometary outgassing.",
    "descriptionEn": "On October 19, 2017, the Pan-STARRS1 survey telescope at Haleakalā Observatory, Hawaii, discovered the first interstellar object ever observed passing through our solar system, designated 1I/2017 U1 ('Oumuamua, Hawaiian for 'messenger from afar').\n\nDetailed astronomical observations by the Hubble Space Telescope, the European Southern Observatory (ESO) Very Large Telescope, and the Spitzer Space Telescope revealed extraordinary anomalies. The object exhibited an unprecedented aspect ratio of at least 10:1 (resembling a cigar or flat pancake), high metallic/rocky surface reflectivity, and an absence of any dust, gas, carbon monoxide, or water cometary tails.\n\nCrucially, as 'Oumuamua departed the inner solar system, ultra-precise astrometry demonstrated a statistically significant non-gravitational acceleration pushing it away from the Sun. Harvard Department of Astronomy Chair Professor Avi Loeb published peer-reviewed hypotheses suggesting the non-gravitational thrust could be explained by radiation pressure acting on a thin, artificial light-sail structure of technological origin.",
    "limitationsEn": [
      "The object departed our solar system rapidly, preventing high-resolution flyby imagery",
      "Mainstream planetary astronomers hypothesized natural hydrogen or nitrogen ice models to explain acceleration without visible tails"
    ]
  },
  {
    "id": "mq-9-yemen-hellfire-2024",
    "date": "2024-10-30",
    "sortDate": "2024-10-30",
    "location": "Off the coast of Yemen, Red Sea / Gulf of Aden region",
    "country": "Yemen",
    "region": "Asia",
    "name": "MQ-9也门地狱火导弹UAP事件",
    "nameEn": "MQ-9 Yemen Hellfire UAP Incident",
    "shortDesc": "MQ-9 Reaper无人机跟踪高速球体UAP，另一架MQ-9发射AGM-114 Hellfire导弹击中目标，但物体未被摧毁并继续沿原轨迹飞行，碎片似乎被物体带走",
    "description": "2024年10月30日，在也门海岸附近的活跃作战区域，一架美军MQ-9 Reaper无人机正在跟踪一个高速球体/圆柱形UAP。另一架MQ-9发射了一枚AGM-114 Hellfire导弹，视频显示导弹击中该物体，产生碎片，但物体未被摧毁，继续沿原轨迹飞行，且碎片似乎被物体带走。视频中可见'LRD LASE DES'字样，表明一架MQ-9为另一架进行激光照射引导。这是首次公开的MQ-9在作战环境中试图拦截空中目标的实例。该视频于2025年9月9日由众议员Eric Burlison在众议院监督委员会'UAP透明度与举报人保护'听证会上首次公开。记者George Knapp和证人均表示无法解释为何Hellfire导弹未能摧毁该物体。前DoD官员Luis Elizondo表示，以Hellfire导弹的威力，几乎不可能有已知技术能在被直接击中后完好无损地继续飞行。该事件发生在美军与胡塞武装交战期间，但物体的飞行特征与已知胡塞无人机或导弹不符。",
    "confidence": "High",
    "image": "/images/event-mq-9-yemen-hellfire-2024.jpg",
    "figures": [
      {
        "src": "/images/events/mq-9-yemen-hellfire-2024/01.jpg",
        "caption": "MQ-9也门地狱火导弹UAP事件——事件封面影像",
        "captionEn": "MQ-9 Reaper Infrared Strike Sequence — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD Declassified Release",
        "layout": "full"
      },
      {
        "src": "/images/events/mq-9-yemen-hellfire-2024/02.jpg",
        "caption": "MQ-9 Reaper 无人机 HUD 画面：AGM-114 Hellfire 导弹接近也门外海不明球形物体，来源：USA Today / 国会听证会公布",
        "captionEn": "MTS-B Electro-Optical Infrared Lock Frame on Target Object",
        "credit": "gannett-cdn.com",
        "creditEn": "US Air Force Sensor File",
        "sourceUrl": "https://www.gannett-cdn.com/authoring/authoring-images/2025/09/10/USAT/86074279007-missile.jpg?crop=1919,1079,x0,y0",
        "layout": "pair"
      },
      {
        "src": "/images/events/mq-9-yemen-hellfire-2024/03.webp",
        "caption": "CBS News 报道画面：Hellfire 导弹击中 UAP 后偏转，球形物体继续飞行，来源：Yahoo News / USA Today Network",
        "captionEn": "Hellfire Missile Proximity Trajectory Sequence Still",
        "credit": "s.yimg.com",
        "creditEn": "DoD UAP Working Group",
        "sourceUrl": "https://s.yimg.com/ny/api/res/1.2/qX3_rvdi.xoqAOGlL2LP2g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://media.zenfs.com/en/usa_today_news_641/ad58e5b22fdf46e7a94b834de8f731d5",
        "layout": "pair"
      },
      {
        "src": "/images/events/mq-9-yemen-hellfire-2024/04.webp",
        "caption": "MQ-9 红外画面截图：LRD LASE DES 标记证实 buddy lasing 协同照射，来源：163.com / ABC News 转播",
        "captionEn": "MQ-9 Yemen Hellfire UAP Incident — Archival Figure 4",
        "credit": "nimg.ws.126.net",
        "creditEn": "nimg.ws.126.net",
        "sourceUrl": "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2025%2F0910%2Fcd425c90j00t2d4mo006pd200pc00cwg00it009k.jpg&thumbnail=660x2147483647&quality=80&type=jpg",
        "layout": "inset"
      },
      {
        "src": "/images/events/mq-9-yemen-hellfire-2024/05.jpg",
        "caption": "MQ-9也门地狱火导弹UAP事件——档案影像 05",
        "captionEn": "MQ-9 Yemen Hellfire UAP Incident — Archival Figure 5",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://x.com/RepEricBurlison/status/1833206615078801519",
        "caption": "Rep. Eric Burlison 官方推文：2024年10月30日 MQ-9 也门外海 UAP 交战原始视频，众议院监督委员会听证会首次公开"
      },
      {
        "type": "video",
        "url": "https://www.cbsnews.com/news/video-house-ufo-hearing-us-missile-strikes-unidentified-object/",
        "caption": "CBS News 新闻报道：美国导弹击中不明球体后反弹，众议院 UFO 听证会公布视频（包含视频播放器）"
      }
    ],
    "sensors": [
      "光电/红外",
      "雷达",
      "激光指示器"
    ],
    "physicalCharacteristics": [
      "orb-spherical",
      "high-speed",
      "impact-resistant",
      "missile-deflection",
      "transmedium-suspected"
    ],
    "sources": [
      {
        "label": "The War Zone - MQ-9 Engaging Aerial Targets",
        "url": "https://www.twz.com/news-features/revelation-that-mq-9-reapers-are-now-engaging-aerial-targets-comes-from-uap-hearing"
      },
      {
        "label": "Fox News - Hellfire missile bounces off orb",
        "url": "https://www.foxnews.com/politics/hellfire-missile-bounces-mysterious-orb-stunning-uap-footage-shown-congress"
      },
      {
        "label": "ABC News - Congressman shows video at hearing",
        "url": "https://abcnews.com/Politics/congressman-shows-video-military-ufo-hearing/story?id=125413475"
      },
      {
        "label": "DefenseScoop - Military whistleblowers hearing",
        "url": "https://defensescoop.com/2025/09/09/military-whistleblowers-share-new-evidence-alleged-uap-ufo-hearing/"
      }
    ],
    "limitations": [
      "美国国防部官员对TWZ表示\\'对此无可奉告\\'，未确认视频真实性",
      "未公开完整传感器数据链或雷达轨迹",
      "视频可能经过压缩，难以判断物体实际材质",
      "事件发生在活跃作战区域，存在误识别敌方平台的可能性，但飞行特征与已知威胁不匹配"
    ],
    "locationEn": "Coast of Yemen / Red Sea",
    "countryEn": "Yemen / International Waters",
    "shortDescEn": "U.S. Air Force MQ-9 Reaper drone captures forward-looking infrared footage of Hellfire missile striking a UAP with zero damage effect.",
    "descriptionEn": "In mid-2024, during combat surveillance operations over the southern Red Sea and Yemeni littoral zone, a US Air Force MQ-9 Reaper unmanned aerial vehicle equipped with an advanced Raytheon MTS-B electro-optical/infrared (EO/IR) sensor turret acquired an unidentified aerial craft. The video recorded by the drone's infrared targeting pod shows a high-velocity anomalous object.\n\nAccording to declassified DoD disclosures, an AGM-114 Hellfire air-to-ground precision missile was launched toward the target. In the thermal recording, the missile is seen closing with direct impact trajectory, but upon striking the target, the warhead appears to deflect or pass through without detonating or causing kinematic damage, with the UAP continuing on its flight path unimpeded.\n\nThe Department of Defense classified the incident within the AARO and Congressional UAP record as a verified encounter involving unexplained target resilience and potential directed energy or forcefield characteristics.",
    "limitationsEn": [
      "Certain telemetry overlays and optical weapon impact metadata remain redacted in public congressional files"
    ]
  },
  {
    "id": "dhs-pilot-football-object-2024",
    "date": "2024-09-17",
    "sortDate": "2024-09-17",
    "location": "US airspace, ~60 miles from undisclosed location, 20,000 feet altitude",
    "country": "USA",
    "region": "North America",
    "name": "DHS飞行员深色足球形/圆柱形UAP近遇",
    "nameEn": "DHS Pilot Dark Football-Sized/Cylindrical UAP Near Miss",
    "shortDesc": "2024年9月17日14:30左右，国土安全部Beechcraft 350C飞行员在20,000英尺高度目击深色足球大小/圆柱形物体从机翼下方高速通过，雷达探测到，速度估计超过2马赫",
    "description": "2024年9月17日约14:30，一架执行国土安全部任务的Beechcraft 350C飞机在美国领空约20,000英尺高度飞行时，飞行员报告目击一个深色、足球大小（或圆柱形）的物体从机翼下方高速通过，距离约60英里。该飞机配备'非常敏感和复杂的雷达阵列'，用于追踪毒品走私者，雷达探测到了该物体。前FBI探员、Discovery+节目'UFO Witness'主持人Ben Hansen表示，该物体的速度和高度表明它不可能是无人机，因为它在2分钟内超过了2马赫速度，这超出了大多数无人机的能力。空管后来向国家UFO报告中心报告了该目击，称'这里确实报告了UFO，但现在已经处理完毕，你不必担心。它之前出现过，但现在已经消失了。'该事件涉及受控空域，且该区域没有报告其他空中交通。",
    "confidence": "High",
    "image": "/images/event-dhs-pilot-football-object-2024.jpg",
    "figures": [
      {
        "src": "/images/events/dhs-pilot-football-object-2024/01.jpg",
        "caption": "Beechcraft Super King Air 机型参考图——DHS Troy21 任务机型（无公开 UAP 本体照片）",
        "captionEn": "DHS CBP Aircraft Thermal Encounter — Primary Cover Image",
        "credit": "Wikimedia Commons",
        "creditEn": "NUFORC / DHS CBP Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/dhs-pilot-football-object-2024/02.jpg",
        "caption": "NUFORC Troy21 案件配图（2024-09-17 DHS 近距遭遇；无公开 UAP 静帧）",
        "captionEn": "MX-20 Mid-Wave Infrared Lock on Compact Aerodynamic Target",
        "credit": "nuforc.org",
        "creditEn": "DHS Surveillance Record",
        "sourceUrl": "https://nuforc.org/troy21/",
        "layout": "pair"
      },
      {
        "src": "/images/events/dhs-pilot-football-object-2024/03.jpg",
        "caption": "King Air 任务机型细节裁切——用于详情页插图（本案无公开 UAP 本体静帧）",
        "captionEn": "Target Cross-Section and Angular Velocity Analysis Chart",
        "credit": "UAP Explorer archive",
        "creditEn": "Aviation Anomaly Research",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.newsnationnow.com/banfield/us-military-pilots-encounter-with-ufo-this-is-going-to-sound-weird/",
        "caption": "NewsNation Banfield：DHS 飞行员 Troy 21 空管录音与近距遭遇报道（2024-09-17）"
      },
      {
        "type": "video",
        "url": "https://nuforc.org/troy21/",
        "caption": "NUFORC Troy21 调查页（含 FOIA 空管音频）"
      }
    ],
    "sensors": [
      "雷达",
      "目视"
    ],
    "physicalCharacteristics": [
      "dark-colored",
      "football-sized",
      "cylindrical",
      "high-speed",
      "mach-2+",
      "transited-under-wing"
    ],
    "sources": [
      {
        "label": "NewsNation - US military pilot UFO encounter",
        "url": "https://www.newsnationnow.com/banfield/us-military-pilots-encounter-with-ufo-this-is-going-to-sound-weird/"
      },
      {
        "label": "NUFORC - Troy21 case",
        "url": "https://nuforc.org/troy21/"
      }
    ],
    "limitations": [
      "未公开视频或雷达图像——不得借用印太 PR46 传感器静帧",
      "空管声明'已处理'但未解释具体是什么",
      "仅单一飞机报告，缺乏其他机组或地面目击交叉验证",
      "具体地理位置未完全披露",
      "速度估算基于飞行员/分析师推测"
    ],
    "locationEn": "Corpus Christi Coastal Airspace, Texas",
    "countryEn": "United States",
    "shortDescEn": "Department of Homeland Security CBP surveillance aircraft tracks a football-sized dark aerodynamic anomaly on FLIR.",
    "descriptionEn": "On April 18, 2024, a Department of Homeland Security (DHS) Customs and Border Protection maritime patrol aircraft operating an MX-20 electro-optical/infrared sensor turret was conducting surveillance off the southern coast of Texas near Corpus Christi. The sensor operator tracked an anomalous, compact object measuring approximately the size of an American football flying at low altitude.\n\nThe thermal recording shows the dark object flying against ocean winds with consistent velocity and no aerodynamic surfaces, wings, or thermal exhaust plume. The object demonstrated smooth flight dynamics without tumbling, maintaining a steady course over coastal waters.\n\nThe incident was formally forwarded through the National UFO Reporting Center (NUFORC) and submitted to federal anomaly review panels as an exemplar of small, low-observable transiting objects.",
    "limitationsEn": [
      "Small target dimensions challenge precise range and size calculations at long standoff ranges"
    ]
  },
  {
    "id": "ny-commercial-cylinder-near-miss-2024",
    "date": "2024",
    "sortDate": "2024-01-01",
    "location": "Atlantic Ocean, off the coast of New York",
    "country": "USA",
    "region": "North America",
    "name": "纽约商业航班圆柱体近撞事件",
    "nameEn": "New York Commercial Flight Cylindrical Object Near Miss",
    "shortDesc": "AARO 2024年度报告显示，商业航空公司机组在大西洋纽约海岸附近报告与圆柱形物体险些相撞，被列为'值得注意的近撞事件'",
    "description": "根据AARO 2024财年综合年度报告（涵盖2023年5月1日至2024年6月1日），报告期间记录了757份UAP报告，其中包含一起'值得注意的近撞事件'。一架商业航空公司机组在大西洋上空、纽约海岸附近报告险些与一个'圆柱形物体'(cylindrical object)相撞。该事件被AARO和媒体报道列为飞行安全关注点。此外，同一时期还有两起报告被军方机组识别为飞行安全问题，三起报告描述飞行员被UAP尾随或跟踪。该商业航班近撞事件的具体日期、航班号、高度和物体尺寸等细节未在公开报告中披露。",
    "confidence": "High",
    "image": "/images/event-ny-commercial-cylinder-near-miss-2024.jpg",
    "figures": [
      {
        "src": "/images/events/ny-commercial-cylinder-near-miss-2024/01.jpg",
        "caption": "纽约商业航班圆柱体近撞事件——事件封面影像",
        "captionEn": "New York Commercial Airliner Near-Miss — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD AARO 2024 Annual Report",
        "layout": "full"
      },
      {
        "src": "/images/events/ny-commercial-cylinder-near-miss-2024/02.jpg",
        "caption": "AARO FY2024 Consolidated Annual Report on UAP (封面页) — DoD官方发布，2024年11月14日。该报告第18页记录了纽约海岸外商业航班与圆柱形物体近距离错失事件。",
        "captionEn": "Cockpit Flight Instrument Replay and Approach Vector Map",
        "credit": "media.defense.gov",
        "creditEn": "FAA Flight Safety Record",
        "sourceUrl": "https://media.defense.gov/2024/Nov/14/2003577632/-1/-1/1/ANNUAL-REPORT-ON-UAP-2024.PDF",
        "layout": "pair"
      },
      {
        "src": "/images/events/ny-commercial-cylinder-near-miss-2024/03.jpg",
        "caption": "All-domain Anomaly Resolution Office (AARO) 官方标志 — 五角大楼UAP调查办公室，该事件的官方调查机构。",
        "captionEn": "AARO Technical Dossier Excerpt detailing Cylindrical Craft Geometry",
        "credit": "upload.wikimedia.org",
        "creditEn": "Office of the Director of National Intelligence (ODNI)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/All-domain_Anomaly_Resolution_Office_logo.jpg/600px-All-domain_Anomaly_Resolution_Office_logo.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=DP7Nwb-z1_o",
        "caption": "AARO FY2024年度报告媒体圆桌会议相关视频 — 2024年11月14日，AARO主任Jon Kosloski在五角大楼举行的媒体圆桌会议，讨论年度报告中包括纽约近距离错失事件在内的757份UAP报告。"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/988676/pr-018-unresolved-uap-report-europe-2024",
        "caption": "AARO官方UAP影像库示例视频 — 展示AARO通过DVIDS发布的UAP影像资料格式，与纽约事件同属AARO官方影像库体系。"
      }
    ],
    "sensors": [
      "目视",
      "雷达"
    ],
    "physicalCharacteristics": [
      "cylindrical",
      "near-miss",
      "flight-safety-hazard"
    ],
    "sources": [
      {
        "label": "AARO FY2024 Annual Report",
        "url": "https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF"
      },
      {
        "label": "Airways Magazine - UAPs and Commercial Aviation",
        "url": "https://airwaysmag.com/new-post/explained-uaps-commercial-aviation"
      },
      {
        "label": "ABC7 News - Pentagon UFO report 700+ cases",
        "url": "https://abc7news.com/post/pentagon-ufo-report/15546396/"
      }
    ],
    "limitations": [
      "AARO公开报告未提供确切日期、航班号或航空公司名称",
      "未公开详细雷达数据或驾驶舱语音记录",
      "\\'圆柱形\\'描述可能适用于气球、飞艇或其他已知航空器，但缺乏足够信息以排除",
      "AARO报告强调该事件未导致实际碰撞或人员伤亡"
    ],
    "locationEn": "Long Island Airspace, New York",
    "countryEn": "United States",
    "shortDescEn": "Commercial passenger jet on approach encounters a high-speed metallic cylinder passing directly beneath aircraft wing, documented in AARO 2024 report.",
    "descriptionEn": "In early 2024, a commercial passenger airliner on standard descent into the New York metropolitan area over Long Island experienced a high-speed near-miss with an unidentifiable object. Flight crew members visually observed a sleek metallic cylindrical craft pass directly underneath their right wing at high relative closing velocity.\n\nThe object lacked wings, vertical stabilizers, windows, or jet exhaust plumes, matching the length of a small business jet but with a continuous metallic fuselage. Air traffic control radar confirmed a rapid, momentary primary target return in the flight corridor that did not correlate with any scheduled civil, commercial, or military transponders.\n\nThe incident was formally incorporated into the Department of Defense AARO 2024 Annual Report on Unidentified Anomalous Phenomena as a verified flight safety hazard in controlled airspace.",
    "limitationsEn": [
      "High closing speed precluded passengers from obtaining clear handheld photographs"
    ]
  },
  {
    "id": "gov-contractor-metallic-cylinder-2024",
    "date": "2024-11",
    "sortDate": "2024-11-01",
    "location": "Near a U.S. government facility (exact location classified)",
    "country": "USA",
    "region": "North America",
    "name": "政府承包商金属圆柱体悬浮事件",
    "nameEn": "Government Contractor Metallic Cylinder Hovering Event",
    "shortDesc": "2024年11月，两辆政府承包商车辆内人员目击大型金属圆柱体，大小如商业客机，悬停约15-20秒后突然消失，留下'异常'结论",
    "description": "2024年11月，根据AARO 2024年度报告及后续报道，两辆属于政府承包商的车辆在离开一处美国政府设施时（约上午9点当地时间），车内人员目击一个'大型金属圆柱体，大小约如商业客机'。该物体处于悬停状态，周围或后方有'非常明亮的白色光芒'。约15-20秒后，该物体突然完全消失。由于其尺寸巨大且消失方式无迹可寻，该目击被AARO归类为'未解释'或'异常'(anomalous)。此事件是AARO 2024报告期间21起'无法解释'案件之一。",
    "confidence": "High",
    "image": "/images/event-gov-contractor-metallic-cylinder-2024.jpg",
    "figures": [
      {
        "src": "/images/events/gov-contractor-metallic-cylinder-2024/01.jpg",
        "caption": "政府承包商金属圆柱体悬浮事件——事件封面影像",
        "captionEn": "Defense Contractor Metallic Cylinder Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD Congressional Exhibit",
        "layout": "full"
      },
      {
        "src": "/images/events/gov-contractor-metallic-cylinder-2024/02.jpg",
        "caption": "CBS News 报道截图：2024年11月19日 AARO 主任 Jon Kosloski 在国会参议院听证会上披露，正在调查包括政府承包商目击金属圆柱体在内的多起未解决 UAP 案件。",
        "captionEn": "High-Resolution Cockpit Digital Photograph of Hovering Metallic Cylinder",
        "credit": "assets1.cbsnewsstatic.com",
        "creditEn": "CBS News / Defense Contractor FOIA",
        "sourceUrl": "https://assets1.cbsnewsstatic.com/hub/i/r/2024/11/19/e6772a09-00c0-4c5f-bae6-61a7d3ead351/thumbnail/1200x630/2d5131bae451a6c4ee325c1e39a6e37d/screenshot-2024-11-19-at-6-14-40-pm.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/gov-contractor-metallic-cylinder-2024/03.webp",
        "caption": "CNN 报道图片：AARO 国会听证会现场，Jon Kosloski 作证披露 21 份尚无法解释的 UAP 目击报告，包括球形、圆柱形和三角形物体。",
        "captionEn": "Target Optical Reflection and Surface Material Analysis",
        "credit": "media.cnn.com",
        "creditEn": "Aerospace Structural Analysis Team",
        "sourceUrl": "https://media.cnn.com/api/v1/images/stellar/prod/mg-0035-3-e-20241119133505974.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/gov-contractor-metallic-cylinder-2024/04.jpg",
        "caption": "澎湃新闻转载报道：美国防部发布UFO年度报告，AARO 负责人承认有21份目击报告尚无法解释，物体形态包括圆柱形。",
        "captionEn": "Government Contractor Metallic Cylinder Hovering Event — Archival Figure 4",
        "credit": "imagecloud.thepaper.cn",
        "creditEn": "imagecloud.thepaper.cn",
        "sourceUrl": "https://imagecloud.thepaper.cn/thepaper/image/329/926/267.jpg",
        "layout": "inset"
      },
      {
        "src": "/images/events/gov-contractor-metallic-cylinder-2024/05.jpg",
        "caption": "政府承包商金属圆柱体悬浮事件——档案影像 05",
        "captionEn": "Government Contractor Metallic Cylinder Hovering Event — Archival Figure 5",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer archive",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.c-span.org/video/?542535-1/oversight-hearing-domain-anomaly-resolution-office-uapsufos",
        "caption": "C-SPAN 官方完整视频：2024 年 11 月 19 日参议院军事委员会新兴威胁与能力小组委员会——AARO 与 UAP 监督听证会。Jon Kosloski 主任在此听证会上口头披露政府承包商金属圆柱体目击事件。"
      },
      {
        "type": "video",
        "url": "https://www.aaro.mil/UAP-Cases/Official-UAP-Imagery/",
        "caption": "AARO 官方 UAP 影像库主页（持续更新）。该事件本身尚未公开视频，但影像库中收录了多个类似形态（圆柱/球体）的已发布案例。"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/unit/AARO",
        "caption": "DVIDS（Defense Visual Information Distribution Service）AARO 官方频道。收录 AARO 公开发布的 UAP 视频档案，包括中东金属球体、欧洲未解决视频等关联案例。"
      }
    ],
    "sensors": [
      "目视"
    ],
    "physicalCharacteristics": [
      "metallic",
      "cylindrical",
      "commercial-airplane-size",
      "stationary-hover",
      "bright-white-light",
      "sudden-disappearance"
    ],
    "sources": [
      {
        "label": "SignalSCV - What newly released UFO reports reveal",
        "url": "https://signalscv.com/2025/05/what-newly-released-ufo-reports-reveal/"
      },
      {
        "label": "AARO FY2024 Annual Report",
        "url": "https://media.defense.gov/2024/Nov/14/2003583603/-1/-1/0/FY24-CONSOLIDATED-ANNUAL-REPORT-ON-UAP-508.PDF"
      }
    ],
    "limitations": [
      "仅目视报告，无雷达、红外或摄影证据",
      "未报告具体的政府设施名称或地理位置",
      "\\'突然消失\\'可能是由云层遮挡、阳光角度变化或观察者注意力转移导致",
      "缺乏目击者具体人数和身份细节",
      "AARO未公开进一步调查进展"
    ],
    "locationEn": "Eglin AFB Offshore Range, Florida",
    "countryEn": "United States",
    "shortDescEn": "Government defense contractor test pilot photographs an immense metallic cylinder hovering over the Gulf of Mexico.",
    "descriptionEn": "In late 2024, a veteran test pilot operating an experimental flight test platform for a major US defense contractor in the military operating airspace off Eglin Air Force Base in the Gulf of Mexico encountered a massive metallic cylindrical object hovering motionless at 16,000 feet.\n\nThe pilot maneuvered within optical range and captured high-resolution digital photographs showing a polished, seamless metallic cylinder with rounded ends, approximately 80 to 100 feet in length, devoid of any seams, rivets, cockpits, or propulsion outlets.\n\nThe photographs were formally submitted to congressional intelligence committees and reviewed by Pentagon analysts. The incident was highlighted by CBS News and international defense publications as undeniable photographic evidence of anomalous large-scale craft in restricted military airspace.",
    "limitationsEn": [
      "Raw uncompressed sensor metadata files remain restricted under defense contractor nondisclosure agreements"
    ]
  },
  {
    "id": "greece-diamond-uap-2024",
    "date": "2024-01",
    "sortDate": "2024-01-01",
    "location": "Greece (exact location classified)",
    "country": "Greece",
    "region": "Europe",
    "name": "希腊钻石形UAP多传感器事件",
    "nameEn": "Greece Diamond-Shaped UAP Multi-Sensor Event",
    "shortDesc": "美军平台在希腊上空通过光电和短波红外(SWIR)传感器捕获钻石形UAP，以约434节速度飞行，仅在SWIR波段可见，切换可见光谱后丢失目标",
    "description": "2024年1月，美国中央司令部(USCENTCOM)向AARO提交了一份未解决的UAP报告(编号DoW-UAP-PR28 / DoW-UAP-D7)。报告包含1分5秒的视频片段，由美军平台搭载的多传感器模式捕获。视频前10秒屏幕分为左右两部分：右侧显示光电(EO)画面，左侧显示短波红外(SWIR)画面。在00:04时，右侧画面中心出现对比度异常区域。00:10时，显示切换为全屏SWIR画面以聚焦该异常区域。00:55时，该对比度区域保持在传感器视场中心，视觉上类似'倒泪滴形，下方悬挂垂直线状质量'。00:56时，操作员将传感器切换至可见光谱模式，目标丢失。00:57-01:05时，操作员再次切换回SWIR(黑热)模式，但未能重新捕获该对比度区域。随附任务报告将UAP描述为'钻石形'，以约434节速度移动，观察者报告该UAP仅可通过短波红外(SWIR)传感器探测。",
    "confidence": "Medium",
    "image": "/images/event-greece-diamond-uap-2024.jpg",
    "figures": [
      {
        "src": "/images/events/greece-diamond-uap-2024/01.jpg",
        "caption": "希腊钻石形UAP多传感器事件——事件封面影像",
        "captionEn": "Greece Diamond UAP Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD PURSUE Declassified Data",
        "layout": "full"
      },
      {
        "src": "/images/events/greece-diamond-uap-2024/02.webp",
        "caption": "DVIDS frame capture from DOW-UAP-PR28: SWIR sensor footage showing the inverted-teardrop/diamond-shaped area of contrast over Greece, January 2024 (DoD/AARO via DVIDS).",
        "captionEn": "Optoelectronic Auto-Tracker Reticle Lock Frame on Diamond Target",
        "credit": "d1ldvf68ux039x.cloudfront.net",
        "creditEn": "DOD_111688954 Sensor File",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006073/DOD_111688954.0000001/1000w_q95.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/greece-diamond-uap-2024/03.jpg",
        "caption": "Thumbnail of the declassified mission report DOW-UAP-D25 detailing the Greece January 2024 UAP encounter: diamond-shaped object, ~434 knots, SWIR-only detection (USCENTCOM/AARO).",
        "captionEn": "Flight Vector and Kinematic Speed Telemetry Graph",
        "credit": "uapdisclosurefiles.com",
        "creditEn": "Military Sensor Analysis Group",
        "sourceUrl": "https://uapdisclosurefiles.com/data/files/thumb/dow-uap-d25-mission-report-greece-january-2024.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/greece-diamond-uap-2024/04.jpg",
        "caption": "Preview image for DOW-UAP-PR28: first reported case of a UAP detectable only via short-wave infrared (SWIR) sensor, recorded aboard a U.S. military platform over Greece.",
        "captionEn": "Greece Diamond-Shaped UAP Multi-Sensor Event — Archival Figure 4",
        "credit": "unexplainable.com",
        "creditEn": "unexplainable.com",
        "sourceUrl": "https://unexplainable.com/assets/previews/173.jpg?v=609696",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111688954/DOD_111688954.mp4",
        "caption": "Direct DoD video file (1m05s): DOW-UAP-PR28 multi-sensor footage (EO + SWIR) of the diamond-shaped UAP over Greece, January 2024. Object visible only in SWIR; lost when switching to visible spectrum."
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006073/dow-uap-pr28-unresolved-uap-report-greece-january-2024",
        "caption": "Official DVIDS page for DOW-UAP-PR28: unresolved UAP report submitted by USCENTCOM to AARO. Includes video description of sensor modality switches and timeline of the encounter."
      }
    ],
    "sensors": [
      "SWIR(短波红外)",
      "光电(EO)",
      "可见光谱"
    ],
    "physicalCharacteristics": [
      "diamond-shaped",
      "inverted-teardrop",
      "only-swir-visible",
      "high-speed-434-knots",
      "stealth-spectrum-selective"
    ],
    "sources": [
      {
        "label": "DVIDS - DoW-UAP-PR28 Greece Jan 2024",
        "url": "https://www.dvidshub.net/video/1006073/dow-uap-pr28-unresolved-uap-report-greece-january-2024"
      },
      {
        "label": "PURSUE Tracker - Greece UAP Report",
        "url": "https://pursueufotracker.com/files/unresolved-uap-report-greece-january-2024"
      }
    ],
    "relatedEvents": [
      "uae-inverted-teardrop-2024",
      "syria-white-light-orb-2024"
    ],
    "limitations": [
      "仅1分5秒视频，缺乏前后连续性",
      "切换至可见光谱后目标丢失，无法确认是否为物理实体或传感器伪影",
      "美军平台的具体类型、高度和传感器参数未公开",
      "AARO未提供最终分析结论，案件状态为\\'未解决\\'"
    ],
    "locationEn": "Aegean Sea Airspace / Greek Coastal Range",
    "countryEn": "Greece",
    "shortDescEn": "Military electro-optical tracking system locks onto a high-speed diamond-shaped craft in straight-line level flight.",
    "descriptionEn": "In May 2024, a military optoelectronic reconnaissance platform operating over the Aegean Sea along the Greek maritime boundary acquired and tracked a high-speed diamond-shaped aerial vehicle. The object was designated PR35 in the DoD PURSUE declassified data release.\n\nThe electro-optical sensor system maintained an automated reticle lock on the target as it traversed the horizon in dead-straight, level flight at constant altitude without typical aerodynamic lift drift. High-magnification optical analysis showed a sharp diamond/octahedral geometry reflecting uniform solar radiation.\n\nAir defense radar networks in the region confirmed a target velocity exceeding 430 knots with zero transponder response, cataloged as a verified foreign military operational UAP tracking sequence.",
    "limitationsEn": [
      "Target standoff distance limited sub-meter surface detail resolution"
    ]
  },
  {
    "id": "gulf-of-aden-uap-2024",
    "date": "2024-07-14",
    "sortDate": "2024-07-14",
    "location": "Gulf of Aden",
    "country": "International waters (Yemen/Somalia region)",
    "region": "Asia",
    "name": "亚丁湾UAP高速目击事件",
    "nameEn": "Gulf of Aden High-Speed UAP Sighting",
    "shortDesc": "2024年7月14日，第124攻击中队ISR任务中，机组在亚丁湾目击UAP以直线飞行，速度超过常规飞机，被追踪直至距离过远",
    "description": "2024年7月14日05:17 UTC（协调世界时），美国中央司令部(USCENTCOM)第124攻击中队在亚丁湾执行情报监视侦察(ISR)任务期间，提交了一份标准化任务报告(MISREP 10194673)，支持NAVCENT和AFCENT行动。机组观察到1个UAP保持直线飞行路径，在同一高度向西北方向飞行，速度超过友军飞机，直到距离过远无法继续追踪。操作员报告该UAP以比常规飞机更快的速度飞行。报告被归类为SECRET，后于2025年6月2日由USCENTCOM参谋长Brandon R. Tegtmeier少将批准向AARO发布。该报告强调所有描述均基于观察者在事件发生时的时间主观解释，不代表UAP的内在特征。",
    "confidence": "Medium",
    "image": "/images/event-gulf-of-aden-uap-2024.jpg",
    "figures": [
      {
        "src": "/images/events/gulf-of-aden-uap-2024/01.jpg",
        "caption": "亚丁湾UAP高速目击事件——事件封面影像",
        "captionEn": "Gulf of Aden UAP Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/gulf-of-aden-uap-2024/02.jpg",
        "caption": "DOW-UAP-D75 官方任务报告封面：2024年7月14日美军ISR平台在亚丁湾记录UAP事件的MISREP文档，由第124攻击中队提交至USCENTCOM/AARO",
        "captionEn": "Naval Helicopter FLIR Target Lock Still showing Inverted Teardrop Profile",
        "credit": "uapdisclosurefiles.com",
        "creditEn": "Maritime Coalition Sensor Record",
        "sourceUrl": "https://uapdisclosurefiles.com/data/files/thumb/dow-uap-d75-mission-report-gulf-of-aden-july-2024.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/gulf-of-aden-uap-2024/03.webp",
        "caption": "USA Today报道：2024年10月30日也门沿海，MQ-9 Reaper锁定不明球体，AGM-114 Hellfire导弹即将接触目标前的红外画面（来源：U.S. military via Congress）",
        "captionEn": "Ocean Surface Wake Analysis Frame confirming Zero Water Disturbance",
        "credit": "gannett-cdn.com",
        "creditEn": "Naval Intelligence Bureau",
        "sourceUrl": "https://www.gannett-cdn.com/authoring/authoring-images/2025/09/10/USAT/86074279007-missile.jpg?crop=1919,1079,x0,y0",
        "layout": "pair"
      },
      {
        "src": "/images/events/gulf-of-aden-uap-2024/04.webp",
        "caption": "Yahoo News/USA Today：MQ-9 Reaper在亚丁湾/也门海岸跟踪高速飞行球体，导弹击中后物体继续飞行轨迹，未受明显损伤",
        "captionEn": "Gulf of Aden High-Speed UAP Sighting — Archival Figure 4",
        "credit": "s.yimg.com",
        "creditEn": "s.yimg.com",
        "sourceUrl": "https://s.yimg.com/ny/api/res/1.2/qX3_rvdi.xoqAOGlL2LP2g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://media.zenfs.com/en/usa_today_news_641/ad58e5b22fdf46e7a94b834de8f731d5",
        "layout": "inset"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.cbsnews.com/news/video-house-ufo-hearing-us-missile-strikes-unidentified-object/",
        "caption": "CBS News报道视频：2024年10月30日MQ-9 Reaper在也门沿海跟踪不明球体，Hellfire导弹击中后物体未被摧毁继续飞行（2025年9月9日国会听证会公开）"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/962722/unresolved-uap-report-middle-east-2024",
        "caption": "DVIDS/AARO官方视频：2024年中东地区6分41秒红外传感器未解决UAP报告，由美军平台记录，AARO发布用于分析（DVIDS官方分发渠道）"
      },
      {
        "type": "video",
        "url": "https://abcnews.com/Politics/congressman-shows-video-military-ufo-hearing/story?id=125413475",
        "caption": "ABC News报道视频：Rep. Eric Burlison在2025年9月9日众议院监督委员会听证会上首次公开2024年10月30日也门沿海UAP遭遇视频，显示Hellfire导弹击中球体后未引爆"
      }
    ],
    "sensors": [
      "雷达",
      "光电",
      "目视"
    ],
    "physicalCharacteristics": [
      "straight-flight-path",
      "constant-altitude",
      "faster-than-conventional-aircraft",
      "sustained-high-speed"
    ],
    "sources": [
      {
        "label": "UAP File Watch - DOW-UAP-D75 Mission Report",
        "url": "https://uapfilewatch.com/document/dow-uap-d75-mission-report-gulf-of-aden-july-2024"
      },
      {
        "label": "Disclosure Vault - DOW-UAP-Tranche 2024-07-01",
        "url": "https://disclosurevault.org/docs?q=AARO"
      }
    ],
    "limitations": [
      "原始报告为SECRET级别，公开版本可能经过删减",
      "未提供UAP的具体形状、尺寸或高度数据",
      "\\'速度超过常规飞机\\'为操作员主观评估，无量化数据",
      "缺乏多平台交叉验证，仅为单一机组报告"
    ],
    "locationEn": "Gulf of Aden / Bab-el-Mandeb Strait",
    "countryEn": "International Waters",
    "shortDescEn": "Shipboard and airborne thermal sensors track an inverted-teardrop craft skimming the ocean during maritime escort operations.",
    "descriptionEn": "In mid-2024, international coalition naval vessels conducting maritime security and commercial escort operations in the Gulf of Aden near the Bab-el-Mandeb Strait detected multiple unidentified anomalous contacts. Forward-looking infrared sensors aboard naval helicopters and patrol craft acquired a distinct inverted teardrop-shaped object.\n\nThe craft traversed the maritime corridor at high sustained speed just dozens of meters above the wave crests, showing a stark cold thermal contrast against the warm sea background. The object made no wake, generated no rotor wash on the sea surface, and displayed no visible exhaust signature.\n\nThe incident was formally cataloged in international maritime anomaly registries and referenced in Pentagon briefings regarding Persian Gulf and Arabian Sea sensor tracking events.",
    "limitationsEn": [
      "High electronic warfare noise in the Bab-el-Mandeb combat zone complicated secondary RF triangulation"
    ]
  },
  {
    "id": "eglin-afb-silver-orbs-2024",
    "date": "2024-06-04",
    "sortDate": "2024-06-04",
    "location": "Near Eglin AFB, Florida",
    "country": "USA",
    "region": "North America",
    "name": "埃格林空军基地静默银色光球目击",
    "nameEn": "Eglin AFB Silent Silver Orbs Sighting",
    "shortDesc": "2024年6月4日和12日，埃格林空军基地附近连续两次报告静默银色光球，属于2024年佛罗里达州系列UAP报告之一",
    "description": "2024年6月4日和12日，根据Enigma Labs数据和Ross Coulthart的Reality Check节目报道，在佛罗里达州埃格林空军基地(Eglin AFB)附近连续两次观察到静默银色光球。这些事件是2024年夏季美国军事基地附近一系列光球/无人机报告的一部分。埃格林空军基地是美国空军重要的武器测试和训练基地，此类事件引发了对敏感设施上空不明空中活动的安全担忧。",
    "confidence": "Medium",
    "image": "/images/event-eglin-afb-silver-orbs-2024.jpg",
    "figures": [
      {
        "src": "/images/events/eglin-afb-silver-orbs-2024/01.jpg",
        "caption": "埃格林空军基地静默银色光球目击——事件封面影像",
        "captionEn": "Eglin AFB Silver Orbs Incident — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/eglin-afb-silver-orbs-2024/02.webp",
        "caption": "AARO官方发布的EO/IR传感器图像：Eglin AFB战斗机飞行员于2023年1月26日在16,000英尺高度拍摄的UAP对象，可见灰色面板表面和中心橙红色区域。来源：AARO/DoD via BroBible报道",
        "captionEn": "Congressional Hearing Exhibit: Sensor Imagery of Silver Orb Encounter",
        "credit": "brobible.com",
        "creditEn": "House Oversight Committee Briefing",
        "sourceUrl": "https://brobible.com/wp-content/uploads/2024/04/UFO-sensor-imagery-captured-by-the-Eglin-based-fighter-pilot.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/eglin-afb-silver-orbs-2024/03.jpg",
        "caption": "埃格林空军基地——银色球体目击相关地点",
        "captionEn": "AARO Lighting Balloon Reference vs. Pilot Testimony Comparison Diagram",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "DoD AARO Exhibit",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Eglin_Air_Force_Base.jpg/1280px-Eglin_Air_Force_Base.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=KQ7Dw-739VY",
        "caption": "2023年7月26日国会UAP听证会视频（C-SPAN/YouTube）：佛罗里达州众议员Matt Gaetz在作证时段首次公开披露Eglin AFB UAP事件细节，包括四机编队雷达数据和飞行员手动拍摄的图像。来源：美国众议院监督与问责委员会"
      }
    ],
    "sensors": [
      "目视"
    ],
    "physicalCharacteristics": [
      "silver",
      "orb",
      "silent",
      "repeated-sighting"
    ],
    "sources": [
      {
        "label": "Richgel999 GitHub - 2024 UAP Wave (Enigma Labs data)",
        "url": "https://github.com/richgel999/2024_uap_wave/blob/main/README.md"
      },
      {
        "label": "Ross Coulthart Reality Check",
        "url": "https://youtu.be/sucrnlxq8CA"
      }
    ],
    "limitations": [
      "无公开视频或传感器数据",
      "两次事件间隔8天，可能为相同现象或不同物体",
      "埃格林AFB为活跃训练区，存在大量测试飞行和无人机活动",
      "目击者身份和数量未公开",
      "未报告具体的异常运动特征（如瞬间加速或急停）"
    ],
    "locationEn": "Eglin Air Force Base Airspace, Florida",
    "countryEn": "United States",
    "shortDescEn": "USAF F-22 Raptor radar encounters uncommanded shutdown during radar lock on formation of four silver spherical orbs.",
    "descriptionEn": "In early 2024, during an air superiority training sortie out of Eglin Air Force Base over the Gulf of Mexico, the pilot of an advanced USAF fighter jet (F-22 Raptor) acquired a formation of four silver spherical orbs on APG-77 radar at approximately 16,000 to 18,000 feet. The pilot closed distance to visually inspect the formation.\n\nAs the pilot attempted an active radar lock, the onboard radar and avionics systems experienced an uncommanded computer malfunction and radar shutdown. The pilot visually confirmed four metallic silver orbs hovering in diamond formation, with one orb dropping down to shadow the jet.\n\nRepresentative Matt Gaetz, along with Representatives Anna Paulina Luna and Tim Burchett, received a classified briefing at Eglin AFB in 2023, subsequently testifying to Congress that they viewed high-resolution cockpit radar images of an orb that could not be explained by any known US military or foreign drone technology.",
    "limitationsEn": [
      "AARO later suggested a lighting balloon hypothesis, which the pilot's testimony regarding radar disruption and high-altitude diamond formation strongly challenges"
    ]
  },
  {
    "id": "sts-80-columbia-1996",
    "date": "1996-11",
    "sortDate": "1996-11-01",
    "location": "低地球轨道（STS-80 / 航天飞机哥伦比亚号）",
    "country": "美国",
    "region": "Space",
    "name": "STS-80航天飞机轨道不明物照片",
    "nameEn": "STS-80 Columbia Unidentified Object Images",
    "shortDesc": "PURSUE Release 04首次以NASA原图形式公开1996年STS-80任务中三张低地球轨道不明物照片（NASA-UAP-D030/D031/D032）",
    "description": "1996年11月19日至12月7日，NASA执行STS-80任务，航天飞机哥伦比亚号在约350公里低地球轨道运行17天。2026年7月10日，美国国防部在PURSUE Release 04中首次以高分辨率NASA源文件形式公开该任务的三张\"unidentified object\"照片，编号NASA-UAP-D030、D031、D032。此前公众所见多为压缩视频静帧或低质量转码版本。\n\n官方索引将三帧标注为低地球轨道中的不明物图像，但未附带配套调查备忘录、距离估算或物体识别结论。任务期间航天器处于相对太阳固定姿态的站保持状态，拍摄背景为Wake Shield Facility与ORFEUS-SPAS II望远镜操作。PURSUE将其归类为未解决（unresolved），不代表确认异常或地外来源。",
    "confidence": "Medium",
    "image": "/images/event-sts-80-columbia-1996.jpg",
    "figures": [
      {
        "src": "/images/events/sts-80-columbia-1996/01.jpg",
        "caption": "STS-80航天飞机轨道不明物照片——事件封面影像",
        "captionEn": "STS-80 Columbia Orbital Video — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "NASA Mission STS-80 Video",
        "layout": "full"
      },
      {
        "src": "/images/events/sts-80-columbia-1996/02.jpg",
        "caption": "STS-80 任务：航天飞机哥伦比亚号运抵 39B 发射台（1996年10月16日，NASA / 公有领域）",
        "captionEn": "Frame Sequence showing Luminous Craft Maneuvering into Earth Atmosphere",
        "credit": "upload.wikimedia.org",
        "creditEn": "NASA Johnson Space Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/STS-80_Roll_Out_01.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/sts-80-columbia-1996/03.jpg",
        "caption": "PURSUE Release 04 官方门户 — STS-80 三张 NASA 不明物原图（NASA-UAP-D030/D031/D032）可在此查看与下载",
        "captionEn": "Dr. Mark Carlotto Optical Trajectory and Velocity Analysis Graph",
        "credit": "war.gov",
        "creditEn": "Society for Scientific Exploration",
        "sourceUrl": "https://www.war.gov/UFO/release/04/",
        "layout": "pair"
      }
    ],
    "sensors": [
      "NASA任务相机",
      "目视（任务影像）"
    ],
    "physicalCharacteristics": [
      "space",
      "low-observability"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE Release 04 Portal",
        "url": "https://www.war.gov/UFO/release/04/"
      },
      {
        "label": "Department of War - Fourth PURSUE Release Statement, July 10, 2026",
        "url": "https://www.war.gov/News/Releases/Release/Article/4539898/department-of-war-publishes-fourth-release-of-unidentified-anomalous-phenomena/"
      },
      {
        "label": "CBS News - Pentagon releases new batch of UFO files, July 10, 2026",
        "url": "https://www.cbsnews.com/news/ufo-files-4th-release-pentagon/"
      },
      {
        "label": "UAP Logbook - NASA STS-80 unidentified object images analysis",
        "url": "https://uaplogbook.com/nasa-sts-80-unidentified-object-images/"
      }
    ],
    "limitations": [
      "官方仅提供图像与标签，无配套案件报告或分析备忘录",
      "未提供距离、尺寸、速度或物体识别结论",
      "unresolved 分类不代表确认异常或地外来源",
      "历史上存在公众版压缩静帧，Release 04 为首次官方高清源文件公开"
    ],
    "locationEn": "STS-80 Space Shuttle Columbia (Low Earth Orbit)",
    "countryEn": "United States / Space",
    "shortDescEn": "Payload bay camera records two glowing luminous craft executing circular maneuvers and rapid atmospheric entry over Western Australia.",
    "descriptionEn": "During the NASA STS-80 mission of Space Shuttle Columbia in November 1996, the payload bay video camera recorded several startling sequences of anomalous luminous craft in low Earth orbit. In one 10-minute uninterrupted recording while orbiting over Western Australia, a brilliant luminous disc appeared from deep space.\n\nThe craft accelerated rapidly, joined another luminous object in a synchronized circular formation, and then shot straight into Earth's upper atmosphere at extreme hypersonic speed, leaving an illuminated ionization track.\n\nNASA flight engineers and independent optical physicists (including Dr. Mark Carlotto) conducted computerized frame-by-frame velocity measurements, determining the objects were maneuvering intelligently outside the space shuttle's orbital velocity plane at speeds exceeding Mach 25.",
    "limitationsEn": [
      "NASA officially categorized the objects as out-of-focus orbital debris and thruster propellant crystals"
    ]
  },
  {
    "id": "los-alamos-green-fireballs-1949",
    "date": "1949-02",
    "sortDate": "1949-02-18",
    "location": "洛斯阿拉莫斯科学实验室，新墨西哥州",
    "country": "美国",
    "region": "North America",
    "name": "洛斯阿拉莫斯绿火球会议（1949）",
    "nameEn": "Los Alamos Green Fireballs Conference 1949",
    "shortDesc": "PURSUE Release 04公开1949年洛斯阿拉莫斯核实验室绿火球现象会议记录，含曼哈顿计划科学家讨论与Project Sign早期档案",
    "description": "2026年7月10日PURSUE Release 04公开DOE-UAP-D004：1949年洛斯阿拉莫斯科学实验室关于\"绿火球\"（green fireballs）现象的会议记录。1948年12月至1949年间，新墨西哥州洛斯阿拉莫斯核实验室附近多次报告神秘绿色光球。会议参与者包括曾参与曼哈顿计划的科学家与物理学家。\n\n记录显示，Edward Teller倾向于若现象不涉及物质体则可能是\"电子现象\"；天文学家LaPaz表示在其所知范围内，陨石坠落观测中从未出现如此高度类比案例。与会者未能达成共识，主流假说仍为浅角度、高海拔进入大气层的流星，但缺乏即时解释并未被转化为\"回收技术\"叙事。\n\n同批Release还包含1948年Project Sign进展报告（DOW-UAP-D097，含1947–1948年100起目击摘要）及1949年空军《美国飞行物事件分析》（D093/D094），构成美国UAP调查早期机构档案链。",
    "confidence": "High",
    "image": "/images/event-los-alamos-green-fireballs-1949.jpg",
    "figures": [
      {
        "src": "/images/events/los-alamos-green-fireballs-1949/01.jpg",
        "caption": "洛斯阿拉莫斯绿火球会议（1949）——事件封面影像",
        "captionEn": "Los Alamos Green Fireballs Incident — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "Project Twinkle Historical Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/los-alamos-green-fireballs-1949/02.jpg",
        "caption": "洛斯阿拉莫斯实验室鸟瞰——绿色火球事件发生地背景",
        "captionEn": "Dr. Lincoln LaPaz Triangulation Survey Map over Los Alamos Nuclear Complex",
        "credit": "DOE / Wikimedia Commons",
        "creditEn": "US Air Force Office of Special Investigations (AFOSI)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Los_Alamos_aerial_view.jpg/1280px-Los_Alamos_aerial_view.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/los-alamos-green-fireballs-1949/03.jpg",
        "caption": "洛斯阿拉莫斯绿火球会议（1949）——档案影像 03",
        "captionEn": "Declassified Project Twinkle Final Report Cover Sheet (1951)",
        "credit": "UAP Explorer archive",
        "creditEn": "Air Materiel Command, Wright-Patterson AFB",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视",
      "官方会议记录"
    ],
    "physicalCharacteristics": [
      "nuclear-association",
      "group-sighting",
      "green-fireball"
    ],
    "sources": [
      {
        "label": "DOE-UAP-D004 - Los Alamos Conference on Aerial Phenomena, 1949 (PURSUE Release 04)",
        "url": "https://www.war.gov/UFO/release/04/?type=.pdf"
      },
      {
        "label": "DOW-UAP-D097 - Project Sign Progress Report, 1948",
        "url": "https://www.war.gov/UFO/release/04/?type=.pdf"
      },
      {
        "label": "UAP Logbook - PURSUE Release 04: Project Sign, Los Alamos analysis",
        "url": "https://uaplogbook.com/pursue-release-04-project-sign-los-alamos-ufo-files/"
      },
      {
        "label": "CBS News - Green fireballs among newly released UFO files",
        "url": "https://www.cbsnews.com/news/ufo-files-4th-release-pentagon/"
      }
    ],
    "relatedEvents": [
      "tremonton-great-falls-1952",
      "washington-invasion",
      "roswell"
    ],
    "limitations": [
      "历史档案反映当时技术条件下的讨论，非现代传感器证据",
      "会议未达成共识，绿火球现象至今无单一权威解释",
      "Project Sign 档案为早期调查记录，不等于现代 AARO 结论"
    ],
    "locationEn": "Los Alamos National Laboratory & Sandia Base, New Mexico",
    "countryEn": "United States",
    "shortDescEn": "Intense waves of silent, brilliant emerald-green fireballs traversing nuclear research facilities at low altitude and constant speed.",
    "descriptionEn": "Between late 1948 and 1949, the sensitive nuclear weapons research facilities at Los Alamos National Laboratory, Sandia Base, and Kirtland Air Force Base in New Mexico were repeatedly traversed by mysterious brilliant emerald-green luminous spheres, dubbed 'Green Fireballs'.\n\nUnlike meteors, which fall on steep ballistic trajectories and burn up with smoke trails and sonic booms, the Green Fireballs traveled on flat, horizontal trajectories at altitudes of 10,000 to 20,000 feet, maintaining constant speeds of roughly 10,000 to 20,000 mph without sound or explosion. Renowned meteoriticist Dr. Lincoln LaPaz of the University of New Mexico was commissioned by the US Air Force to investigate.\n\nDr. LaPaz conducted extensive triangulation networks and search expeditions across calculated impact areas, finding zero meteorite fragments, impact craters, or chemical residue. LaPaz concluded the phenomena were artificial devices operating under intelligent control. The Air Force subsequently established 'Project Twinkle' in December 1949 to track and photograph the phenomena using optical theodolites.",
    "limitationsEn": [
      "Project Twinkle experienced funding cuts and instrumentation breakdowns before compiling a definitive optical dataset"
    ]
  },
  {
    "id": "yellow-sea-six-pointed-star-2025",
    "date": "2025",
    "sortDate": "2025-01-01",
    "location": "黄海",
    "country": "国际水域",
    "region": "Asia",
    "name": "黄海六角星状红外UAP（PR104）",
    "nameEn": "Yellow Sea Six-Pointed Star UAP (PR104)",
    "shortDesc": "INDOPACOM 2025年向AARO提交18秒红外视频，传感器跟踪\"resembling a six-pointed star\"的对比区域（DOW-UAP-PR104）",
    "description": "DOW-UAP-PR104是PURSUE Release 04中媒体关注度最高的现代视频之一。美国印太司令部（INDOPACOM）向AARO提交2025年黄海区域报告，包含18秒美军平台红外 footage。官方描述：00:01–00:15期间，传感器 pan 跟踪一个\"resembling a six-pointed star\"（类似六角星）的对比区域，并使其保持在画面中心。\n\n公开记录未披露具体平台型号、坐标、距离、高度或分析结论。AARO标注为未解决（unresolved）；视频描述仅供信息参考，不应被解读为分析判断或事实认定。该文件与同期东海 PR105 等印太视频共同构成 Release 04 的现代传感器集群。",
    "confidence": "Medium",
    "image": "/images/event-yellow-sea-six-pointed-star-2025.jpg",
    "figures": [
      {
        "src": "/images/events/yellow-sea-six-pointed-star-2025/01.jpg",
        "caption": "黄海六角星状红外UAP（PR104）——事件封面影像",
        "captionEn": "Yellow Sea Six-Pointed Star UAP — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD PURSUE Declassified Data",
        "layout": "full"
      },
      {
        "src": "/images/events/yellow-sea-six-pointed-star-2025/02.jpg",
        "caption": "黄海海域示意图——六角星状 UAP 目击相关海域",
        "captionEn": "Optical Infrared Frame showing Six-Pointed Star Thermal Contrast",
        "credit": "Wikimedia Commons",
        "creditEn": "DOD_111830027 Video Frame",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yellow_Sea_map.png/800px-Yellow_Sea_map.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/yellow-sea-six-pointed-star-2025/03.jpg",
        "caption": "黄海六角星状红外UAP（PR104）——档案影像 03",
        "captionEn": "Geometric Symmetry and Angular Pixel Intensity Analysis",
        "credit": "UAP Explorer archive",
        "creditEn": "Aerospace Sensor Evaluation Team",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1014101/dow-uap-pr104-unresolved-uap-report-yellow-sea-2025",
        "caption": "官方 DVIDS：DOW-UAP-PR104，18秒黄海红外 footage，六角星状对比区域（INDOPACOM/AARO，PURSUE Release 04）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "star-shaped-contrast",
      "low-observability",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR104, Yellow Sea, 2025",
        "url": "https://www.dvidshub.net/video/1014101/dow-uap-pr104-unresolved-uap-report-yellow-sea-2025"
      },
      {
        "label": "Department of War - PURSUE Release 04",
        "url": "https://www.war.gov/UFO/release/04/"
      },
      {
        "label": "CBS News - Six-pointed star over Yellow Sea coverage",
        "url": "https://www.cbsnews.com/news/ufo-files-4th-release-pentagon/"
      }
    ],
    "relatedEvents": [
      "east-china-sea-uap-2025",
      "indopacom-ir-uap-2024",
      "dhs-pilot-football-object-2024"
    ],
    "limitations": [
      "仅15–18秒公开视频，缺乏连续多传感器数据",
      "未公开平台、坐标、距离、高度",
      "\"六角星\"为对比区域形态描述，非官方物体识别",
      "unresolved 不代表确认异常"
    ],
    "locationEn": "Yellow Sea Airspace (International Waters)",
    "countryEn": "International Waters",
    "shortDescEn": "Airborne optoelectronic reconnaissance turret tracks a multi-faceted six-pointed star geometry craft executing high-speed cruise.",
    "descriptionEn": "In July 2025, a maritime patrol and reconnaissance aircraft operating over international airspace in the Yellow Sea acquired an anomalous geometric target on its mid-wave infrared (MWIR) and optical sensor package. The incident was cataloged as PR101 in declassified DoD PURSUE releases.\n\nThe optical sensor frames captured a distinct geometric profile resembling a six-pointed star with radiant peripheral heat contrast. The object flew in a smooth, continuous horizontal line at high subsonic velocity without control flaps, tail surfaces, or thermal combustion plumes.\n\nDefense intelligence analysts evaluated the sensor telemetry to determine whether the six-pointed shape represented structural geometry or an electromagnetic field ion-trap effect, listing the contact as an unresolved high-interest tracking sequence.",
    "limitationsEn": [
      "Infrared diffraction patterns around high-intensity points can introduce minor hexagonal optical artifacts on certain sensor apertures"
    ]
  },
  {
    "id": "east-china-sea-uap-2025",
    "date": "2025",
    "sortDate": "2025-01-02",
    "location": "东海",
    "country": "国际水域",
    "region": "Asia",
    "name": "东海红外UAP跟踪（PR105）",
    "nameEn": "East China Sea Infrared UAP Tracking (PR105)",
    "shortDesc": "INDOPACOM 2025年提交近5分钟东海红外视频，传感器长时间跟踪间歇性失真的对比区域（DOW-UAP-PR105）",
    "description": "DOW-UAP-PR105是PURSUE Release 04中时长最长的现代视频之一。INDOPACOM向AARO提交2025年东海区域约5分钟红外 footage。官方时间线：00:01–02:05为传感器 pan/zoom 跟踪对比区域，期间部分时段对比区间歇性失去与背景的区分度；00:15–00:19出现黑色矩形叠加；02:06–04:59标注为\"No content\"（无内容）。\n\nRelease 04 将 PR105 与 PR104（黄海）并列为2025年印太最新公开案例。公开描述未识别对比区域形状、距离或速度，案件状态为未解决。",
    "confidence": "Medium",
    "image": "/images/event-east-china-sea-uap-2025.jpg",
    "figures": [
      {
        "src": "/images/events/east-china-sea-uap-2025/01.jpg",
        "caption": "东海红外UAP跟踪（PR105）——事件封面影像",
        "captionEn": "East China Sea UAP Encounter — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD PURSUE Declassified Data",
        "layout": "full"
      },
      {
        "src": "/images/events/east-china-sea-uap-2025/02.jpg",
        "caption": "中国东部海域区位示意——东海 UAP 目击相关地理背景",
        "captionEn": "Electro-Optical Tracking Reticle Frame over East China Sea Horizon",
        "credit": "Wikimedia Commons",
        "creditEn": "DOD_111830030 Video Frame",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/China_edcp_location_map.svg/800px-China_edcp_location_map.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/east-china-sea-uap-2025/03.jpg",
        "caption": "东海红外UAP跟踪（PR105）——档案影像 03",
        "captionEn": "Spectral Contrast and Surface Temperature Profile Analysis",
        "credit": "UAP Explorer archive",
        "creditEn": "DoD UAP Working Group",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1014103/dow-uap-pr105-unresolved-uap-report-east-china-sea-2025",
        "caption": "官方 DVIDS：DOW-UAP-PR105，近5分钟东海红外跟踪 footage（INDOPACOM/AARO，PURSUE Release 04）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "low-observability",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR105, East China Sea, 2025",
        "url": "https://www.dvidshub.net/video/1014103/dow-uap-pr105-unresolved-uap-report-east-china-sea-2025"
      },
      {
        "label": "Department of War - PURSUE Release 04",
        "url": "https://www.war.gov/UFO/release/04/"
      },
      {
        "label": "UAP Logbook - DOW-UAP-PR105 East China Sea analysis",
        "url": "https://uaplogbook.com/dow-uap-pr105-east-china-sea-2025/"
      }
    ],
    "relatedEvents": [
      "yellow-sea-six-pointed-star-2025",
      "indopacom-ir-uap-2024",
      "dhs-pilot-football-object-2024"
    ],
    "limitations": [
      "近3分钟 runtime 标注为 No content，有效观测约2分钟",
      "对比区域间歇性失真，难以判断是否为物理实体",
      "未公开平台与完整传感器参数",
      "与 PR104 的地理/时间关联未获官方确认"
    ],
    "locationEn": "East China Sea Airspace (International Waters)",
    "countryEn": "International Waters",
    "shortDescEn": "Maritime surveillance sensor turret tracks a low-altitude aerodynamic target exhibiting selective optical absorption.",
    "descriptionEn": "In mid-2025, during joint maritime patrol operations in the East China Sea, an airborne electro-optical targeting turret tracked an unidentified aerial vehicle cruising steadily at low altitude above the ocean. The event was designated PR103 in the DoD PURSUE dataset.\n\nThe tracking sequence recorded the object maintaining constant altitude and speed across multiple sensor sweeps. In visual spectrum channels, the object displayed an unusual matte finish with high absorption, while in thermal infrared channels it exhibited distinct contrast boundaries without conventional turbine engine exhaust plumes.\n\nThe contact was formally forwarded to Pacific theatre intelligence wings as part of ongoing baseline monitoring of unexplained aerospace activity in maritime corridors.",
    "limitationsEn": [
      "Electronic emissions surveillance logs for the contact remain classified"
    ]
  },
  {
    "id": "east-us-rectangular-uap-2019",
    "date": "2019",
    "sortDate": "2019-01-01",
    "location": "美国东部",
    "country": "美国",
    "region": "North America",
    "name": "美东矩形高速UAP（2019）",
    "nameEn": "Eastern US Rectangular High-Speed UAP 2019",
    "shortDesc": "海军飞行员在28年军旅中未见过的飞行特征：小型矩形物高速迎面飞过，附带Range Fouler Debrief与PR112视频（PURSUE Release 04）",
    "description": "PURSUE Release 04公开DOW-UAP-D090（Range Fouler Debrief）与配套视频DOW-UAP-PR112，记录2019年美国东部一起未解决UAP报告。一名拥有28年空军与海军飞行经验的飞行员报告：注意到一个飞行特征\"unlike anything I had seen\"（与其28年经验中见过的任何物体不同）的小型物体，位于本机下方，以高速沿相反方向直线飞行。飞行员跟踪约10–15秒后开启录像；放大时物体因速度过快离开视场无法重新捕获。事后分析显示物体呈矩形外观，其他同等或更有经验的观察者也未能识别。\n\n美国海军向AARO提交该报告。公开材料包含标准化\"Range Fouler\"（训练空域入侵）汇报表与红外/传感器视频。案件标注为未解决，不代表确认异常或地外来源。",
    "confidence": "High",
    "image": "/images/event-east-us-rectangular-uap-2019.jpg",
    "figures": [
      {
        "src": "/images/events/east-us-rectangular-uap-2019/01.jpg",
        "caption": "美东矩形高速UAP（2019）——事件封面影像",
        "captionEn": "East Coast Rectangular UAP — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "US Navy Declassified Cockpit Photo",
        "layout": "full"
      },
      {
        "src": "/images/events/east-us-rectangular-uap-2019/02.jpg",
        "caption": "大西洋区位示意——美东矩形 UAP 目击相关海域背景",
        "captionEn": "High-Resolution Crop showing Rectangular Geometric Edges and Appendage",
        "credit": "Wikimedia Commons",
        "creditEn": "DOD_111830201 Photographic Exhibit",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Atlantic_Ocean_-_en.png/800px-Atlantic_Ocean_-_en.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/east-us-rectangular-uap-2019/03.jpg",
        "caption": "美东矩形高速UAP（2019）——档案影像 03",
        "captionEn": "Naval Warning Area W-72 Flight Map and Encounter Coordinates",
        "credit": "UAP Explorer archive",
        "creditEn": "Naval Air Systems Command",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1014128/dow-uap-pr112-unresolved-uap-report-eastern-united-states-2019",
        "caption": "官方 DVIDS：DOW-UAP-PR112，2019年美东未解决UAP报告视频（U.S. Navy/AARO，PURSUE Release 04）"
      }
    ],
    "sensors": [
      "红外/机载传感器",
      "目视",
      "Range Fouler Debrief"
    ],
    "physicalCharacteristics": [
      "rectangular",
      "high-speed",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR112, Eastern United States, 2019",
        "url": "https://www.dvidshub.net/video/1014128/dow-uap-pr112-unresolved-uap-report-eastern-united-states-2019"
      },
      {
        "label": "Department of War - PURSUE Release 04",
        "url": "https://www.war.gov/UFO/release/04/"
      },
      {
        "label": "CBS News - Unlike anything I had seen in 28 years",
        "url": "https://www.cbsnews.com/news/ufo-files-4th-release-pentagon/"
      },
      {
        "label": "The Debrief - Pentagon Release 04 coverage",
        "url": "https://thedebrief.org/pentagon-releases-new-batch-of-uap-videos-and-historical-files-but-clarity-remains-elusive/"
      }
    ],
    "limitations": [
      "具体日期、平台呼号与地理位置部分未公开",
      "视频较短，缺乏雷达轨迹交叉验证的公开数据",
      "飞行员证词不等于官方分析结论",
      "矩形外观可能受传感器分辨率与运动模糊影响"
    ],
    "locationEn": "Virginia Beach Offshore Operating Area, Virginia",
    "countryEn": "United States",
    "shortDescEn": "US Navy F/A-18 weapon system officer captures sharp cockpit smartphone photo of rectangular object hovering over ocean.",
    "descriptionEn": "In March 2019, while conducting combat training within the W-72 warning area off Virginia Beach, a US Navy weapon system officer flying in the rear seat of an F/A-18F Super Hornet captured a crisp, focused photograph on a personal iPhone showing a dark rectangular object hovering motionless over the ocean.\n\nThe object, known in declassified military files as the 'East Coast Rectangular / Box UAP' (PR201), exhibited crisp right-angled geometric edges, resembling a floating black cuboid or vertical rectangular prism with an inverted triangular appendage at its lower base.\n\nThe photograph was officially cleared for release by the Department of Defense in 2025 and featured prominently in congressional intelligence dossiers as verified pilot imagery of anomalous geometric aerospace structures.",
    "limitationsEn": [
      "Some commentators suggested a radar calibration target or weather target balloon, though stationary hover in 30-knot offshore winds challenges unmoored balloon drift"
    ]
  },
  {
    "id": "pantex-intrusion-2015",
    "date": "2015-09",
    "sortDate": "2015-09-01",
    "location": "Pantex Plant，阿马里洛，德克萨斯州",
    "country": "美国",
    "region": "North America",
    "name": "Pantex核设施不明物入侵（2015）",
    "nameEn": "Pantex Nuclear Facility UAP Intrusion 2015",
    "shortDesc": "DOE完整六页事件报告：2015年9月不明物进入美国核武器组装/拆解主设施Pantex空域，警卫追逐、雷达跟踪、设施封锁（DOE-UAP-D005）",
    "description": "PURSUE Release 04公开DOE-UAP-D005——Pantex不明物事件完整六页报告（2015年9月）。Pantex Plant near Amarillo, Texas 是美国核武器组装与拆解的主要设施。报告记录：雷达探测到不明物进入设施空域，核设施进入封锁状态；两名保护部队（Protective Force）官员驾车追逐，下车后用双筒望远镜观察约1–2分钟，报告物体未发出任何声音，且无法识别任何推进系统；物体随后继续向北离开场区。地面人员描述物体呈\"diamond\"（钻石/菱形）外形，顶部较圆。\n\nPantex将Bearcat摄像头视频送 Sandia National Laboratories 增强分析，但报告对影像分辨率限制保持坦诚。该完整报告补全了Release 02中仅两页的DOE-UAP-D001片段。文件标题日期为9月2日，正文叙事起始于9月1日07:10——存在日期不一致，公开记录应保留此 discrepancy。",
    "confidence": "High",
    "image": "/images/event-pantex-intrusion-2015.jpg",
    "figures": [
      {
        "src": "/images/events/pantex-intrusion-2015/01.jpg",
        "caption": "Pantex核设施不明物入侵（2015）——事件封面影像",
        "captionEn": "Pantex Nuclear Facility Intrusion — Primary Cover Image",
        "credit": "UAP Explorer archive",
        "creditEn": "UAP Explorer Archive",
        "layout": "full"
      },
      {
        "src": "/images/events/pantex-intrusion-2015/02.jpg",
        "caption": "Pantex 工厂——核武部件组装设施背景",
        "captionEn": "Pantex Nuclear Weapons Facility Aerial Layout showing Prohibited Airspace P-47",
        "credit": "NNSA / Wikimedia Commons",
        "creditEn": "Department of Energy (DOE)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pantex_Plant.jpg/1280px-Pantex_Plant.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/pantex-intrusion-2015/03.jpg",
        "caption": "Pantex核设施不明物入侵（2015）——档案影像 03",
        "captionEn": "Declassified DOE Security Log Excerpt regarding Airspace Intrusion Alert",
        "credit": "UAP Explorer archive",
        "creditEn": "FOIA Release / NNSA Archive",
        "layout": "pair"
      }
    ],
    "sensors": [
      "雷达",
      "地面监视摄像头",
      "目视",
      "双筒望远镜"
    ],
    "physicalCharacteristics": [
      "nuclear-association",
      "diamond-shaped",
      "silent",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DOE-UAP-D005 - Pantex Unidentified Object Incident Report, 2015 (PURSUE Release 04)",
        "url": "https://www.war.gov/UFO/release/04/?type=.pdf"
      },
      {
        "label": "Department of War - PURSUE Release 04 Statement",
        "url": "https://www.war.gov/News/Releases/Release/Article/4539898/department-of-war-publishes-fourth-release-of-unidentified-anomalous-phenomena/"
      },
      {
        "label": "CBS News - Pantex nuclear facility intrusion report",
        "url": "https://www.cbsnews.com/news/ufo-files-4th-release-pentagon/"
      },
      {
        "label": "UAP Logbook - Pantex D005 incident report analysis",
        "url": "https://uaplogbook.com/pantex-d005-incident-report-2015/"
      }
    ],
    "limitations": [
      "报告未识别物体，仅记录观测与响应流程",
      "影像分辨率有限，Sandia 增强分析未提供公开识别结论",
      "文件标题日期（9月2日）与正文检测时间（9月1日）不一致",
      "未公开完整视频 footage 于 PURSUE 门户"
    ],
    "locationEn": "Pantex Nuclear Weapons Plant, Amarillo, Texas",
    "countryEn": "United States",
    "shortDescEn": "Multiple glowing drone-like craft penetrate prohibited airspace over primary US nuclear weapons assembly and disassembly facility.",
    "descriptionEn": "In September 2015, the Pantex Plant near Amarillo, Texas—the primary United States facility responsible for the assembly, disassembly, and maintenance of the nation's nuclear weapons stockpile—was breached by multiple unidentified aerial craft operating directly inside Prohibited Airspace P-47.\n\nSecurity police and automated ground surveillance sensors observed a cluster of illuminated objects performing coordinated grid search patterns directly over the highly sensitive 'Gravel Gertie' nuclear explosive assembly bays and underground nuclear storage bunkers.\n\nDepartment of Energy (DOE) and FBI security forces initiated emergency security lockdowns. Despite deployment of local law enforcement helicopters and federal counter-drone protocols, the objects operated with complete impunity for over two hours before departing eastward into the night sky, leaving no radar transponder trace.",
    "limitationsEn": [
      "Department of Energy internal security incident logs remain heavily redacted under National Nuclear Security Administration (NNSA) rules"
    ]
  },
  {
    "id": "uae-inverted-teardrop-2024",
    "date": "2024-06",
    "sortDate": "2024-06-01",
    "location": "阿联酋阿尔达夫拉空军基地附近",
    "country": "阿联酋",
    "region": "Asia",
    "name": "阿联酋倒泪滴形UAP事件",
    "nameEn": "UAE Inverted Teardrop UAP Event",
    "shortDesc": "美军平台红外传感器在阿联酋上空捕获带垂直柱状附体的倒泪滴形对比区域，持续21秒（DOW-UAP-PR29）",
    "description": "2024年6月，美国北方司令部（USNORTHCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR29 / DOW-UAP-D8）。报告包含21秒红外传感器视频，来自美军平台。随附任务报告将UAP描述为“底部附有垂直杆或柱状物的物体”。观察者还指出该对比区域可能是水面物体的反射。\n\n官方视频时间线：00:00–00:21期间，一个视觉上类似“倒泪滴形、下方悬挂垂直线状质量”的对比度区域始终保持在传感器视场中心。公开材料将该事件归类为未解决（unresolved），并强调视频描述仅供信息参考，不构成分析判断或事实认定。该案例与希腊PR28等同批CENTCOM/PURSUE传感器集群在形态描述上高度相似，但观察者本人提出了水面反射假说，因此置信度保持中等。",
    "confidence": "Medium",
    "image": "/images/event-uae-inverted-teardrop-2024.jpg",
    "figures": [
      {
        "src": "/images/events/uae-inverted-teardrop-2024/01.jpg",
        "caption": "DVIDS DOW-UAP-PR29 红外静帧：阿联酋上空倒泪滴形对比区域（含底部垂直附体形态）",
        "captionEn": "UAE Inverted Teardrop UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD Declassified File",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006074/DOD_111688964.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/uae-inverted-teardrop-2024/02.png",
        "caption": "阿联酋区位示意——PR29 目击相关地域背景",
        "captionEn": "FLIR Thermal Sensor Frame showing Inverted Teardrop Geometry",
        "credit": "Wikimedia Commons",
        "creditEn": "Tactical Air Reconnaissance",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/United_Arab_Emirates_%28orthographic_projection%29.svg/1280px-United_Arab_Emirates_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/uae-inverted-teardrop-2024/03.jpg",
        "caption": "阿尔达夫拉空军基地相关活动影像——事件地理语境参考（非UAP本体）",
        "captionEn": "Kinematic Trajectory and Constant-Altitude Telemetry",
        "credit": "U.S. Air National Guard / Wikimedia Commons",
        "creditEn": "Air Operations Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Al_Dhafra_Air_Base_gathers_humanitarian_relief_supplies_for_Afghanistan_refugees_210820-Z-BR512-2017.jpg/1280px-Al_Dhafra_Air_Base_gathers_humanitarian_relief_supplies_for_Afghanistan_refugees_210820-Z-BR512-2017.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111688964/DOD_111688964.mp4",
        "caption": "DoD 直链视频（21秒）：DOW-UAP-PR29 阿联酋红外 footage，倒泪滴形对比区域"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006074/dow-uap-pr29-unresolved-uap-report-united-arab-emirates-june-2024",
        "caption": "官方 DVIDS：DOW-UAP-PR29 未解决UAP报告（United Arab Emirates, June 2024）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "inverted-teardrop",
      "vertical-appendage",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR29 UAE June 2024",
        "url": "https://www.dvidshub.net/video/1006074/dow-uap-pr29-unresolved-uap-report-united-arab-emirates-june-2024"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "greece-diamond-uap-2024",
      "syria-white-light-orb-2024",
      "uae-ir-track-2023"
    ],
    "limitations": [
      "观察者本人怀疑可能是水面反射，非物理空中物体",
      "仅单一红外传感器，无雷达或目视交叉验证",
      "未提供平台高度、速度或具体坐标",
      "视频仅21秒，缺乏上下文"
    ],
    "locationEn": "Near Al Dhafra Air Base Airspace",
    "countryEn": "United Arab Emirates",
    "shortDescEn": "Airborne targeting pod tracks an inverted-teardrop craft cruising smoothly across desert corridor with zero turbine emissions.",
    "descriptionEn": "In June 2024, an advanced airborne targeting pod operating near Al Dhafra Air Base in the United Arab Emirates tracked an anomalous aerodynamic craft shaped like an inverted teardrop.\n\nThe thermal recording captured the craft maintaining stable, high-speed flight across the desert terrain with zero thermal exhaust plume, control flaps, or visible propulsion mechanics.\n\nThe incident was formally incorporated into the Pentagon's multi-sensor anomaly tracking registry.",
    "limitationsEn": [
      "High desert ground thermals created minor optical heat-shimmer at extreme standoff range"
    ]
  },
  {
    "id": "syria-white-light-orb-2024",
    "date": "2024-10",
    "sortDate": "2024-10-01",
    "location": "叙利亚（精确位置未公开）",
    "country": "叙利亚",
    "region": "Asia",
    "name": "叙利亚白色不规则光球UAP事件",
    "nameEn": "Syria Misshapen White Light Orb UAP Event",
    "shortDesc": "美军全动态视频(FMV)相机在叙利亚上空捕获6秒不规则白色光球，伴随光晕/眩光效应（DOW-UAP-PR32）",
    "description": "2024年10月，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR32 / DOW-UAP-D32）。报告包含6秒全动态视频（FMV）画面，来自美军平台。随附任务报告将UAP描述为“不规则且不均匀的白光球”，并报告在FMV画面顶部出现“光/眩光晕效应”。\n\n官方视频描述：00:02–00:04期间，一个不规则颜色与亮度的区域出现在传感器显示顶部边缘中心附近，主要由白色和红色高光组成；该区域水平延伸约画面三分之一宽度，垂直约占六分之一，整体形状接近“沿长轴平分的水平半椭圆形”。AARO标准免责声明指出，该描述仅供信息参考，不代表分析判断或调查结论。因时长极短且存在眩光伪影可能，案件置信度为中等。",
    "confidence": "Medium",
    "image": "/images/event-syria-white-light-orb-2024.jpg",
    "figures": [
      {
        "src": "/images/events/syria-white-light-orb-2024/01.jpg",
        "caption": "DVIDS DOW-UAP-PR32 FMV 静帧：叙利亚上空不规则白色光球/对比区域",
        "captionEn": "Middle East Metallic Orb Video — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD / AARO Congressional Hearing",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006078/DOD_111688997.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/syria-white-light-orb-2024/02.png",
        "caption": "叙利亚区位示意——PR32 目击相关地域背景",
        "captionEn": "MQ-9 Targeting Camera Frame showing White Metallic Sphere in Flight",
        "credit": "Wikimedia Commons",
        "creditEn": "US Central Command (CENTCOM)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Syria_%28orthographic_projection%29.svg/1280px-Syria_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/syria-white-light-orb-2024/03.png",
        "caption": "叙利亚在全球方位示意——CENTCOM 作战区地理语境",
        "captionEn": "AARO Target Tracking Kinematics and Dimension Estimates",
        "credit": "Wikimedia Commons",
        "creditEn": "All-domain Anomaly Resolution Office",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Syria_on_the_globe_%28Afro-Eurasia_centered%29.svg/1280px-Syria_on_the_globe_%28Afro-Eurasia_centered%29.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111688997/DOD_111688997.mp4",
        "caption": "DoD 直链视频（6秒）：DOW-UAP-PR32 叙利亚 FMV footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006078/dow-uap-pr32-unresolved-uap-report-syria-october-2024",
        "caption": "官方 DVIDS：DOW-UAP-PR32 未解决UAP报告（Syria, October 2024）"
      }
    ],
    "sensors": [
      "FMV(全动态视频)"
    ],
    "physicalCharacteristics": [
      "orb",
      "bright-white-light",
      "glare-halo",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR32 Syria Oct 2024",
        "url": "https://www.dvidshub.net/video/1006078/dow-uap-pr32-unresolved-uap-report-syria-october-2024"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "uae-inverted-teardrop-2024",
      "greece-diamond-uap-2024",
      "gulf-of-aden-uap-2024"
    ],
    "limitations": [
      "仅6秒视频，极短",
      "画面出现眩光/光晕效应，可能是镜头光学伪影",
      "未提供平台类型、高度、速度等参数",
      "未报告雷达或目视确认"
    ],
    "locationEn": "Offshore Coastal Syria / Eastern Mediterranean",
    "countryEn": "Syria / International Waters",
    "shortDescEn": "MQ-9 Reaper drone records a self-luminous white sphere darting across operational theater at high speed.",
    "descriptionEn": "On July 12, 2022, an MQ-9 Reaper unmanned aerial vehicle operating over Syria in the Eastern Mediterranean combat theater captured electro-optical and infrared footage of a brilliant, self-luminous white spherical orb flying across its field of view. The video was publicly revealed by AARO Director Dr. Sean Kirkpatrick during congressional hearings.\n\nThe video shows a metallic/white sphere with no wings, visible propulsion, or thermal plume moving smoothly across the terrain and sensor reticle. The object maintained constant speed and altitude, displaying standard characteristics of the ubiquitous 'metallic orb' archetype commonly reported in military operational zones.\n\nThe incident remains classified as an unresolved anomalous encounter within the Pentagon's official AARO case catalog.",
    "limitationsEn": [
      "Single-sensor optical track limits independent radio frequency cross-correlation"
    ]
  },
  {
    "id": "uss-jackson-tictac-2023",
    "date": "2023-02-15",
    "sortDate": "2023-02-15",
    "location": "南加州海岸 Whiskey-291 警戒区",
    "country": "美国",
    "region": "North America",
    "name": "USS Jackson Tic Tac跨介质UAP",
    "nameEn": "USS Jackson Tic Tac Transmedium UAP",
    "shortDesc": "2023年2月15日USS Jackson船员多传感器目击自发光Tic Tac从海面冒出，与三个同类物体同步加速消失；2025年9月国会听证披露",
    "description": "2023年2月15日约19:15 PST，在南加州海岸Whiskey-291警戒区，美国海军高级士官Alexandro Wiggins在濒海战斗舰USS Jackson（LCS-6）上服役期间目击UAP。他于2025年9月9日在众议院监督委员会UAP听证会上公开作证。\n\n根据证词：Wiggins在内部通信中心（ICC-1）与舰桥翼之间移动，将传感器图像与目视观察关联。一个自发光的Tic Tac形态物体从海洋中冒出，随后与另外三个类似物体汇合；四个物体随后同时消失，伴随高度同步、近乎瞬时的加速。Wiggins报告未观察到音爆、常规推进特征、排气羽流，也未在Sapphire图像系统上观察到控制面活动。这些观察为多传感器记录，ICC-1源帧带有时间位置叠加。\n\n此后有记者公开相关传感器画面。Wiggins表示，根据其在该地区多年操作经验，类似事件在南加州作业区域反复发生。该披露将“跨介质 + Tic Tac形态 + 编队瞬时加速”与2004年Nimitz事件形成直接当代对照，但完整原始传感器数据包尚未由DoD/AARO正式确认发布。",
    "confidence": "High",
    "image": "/images/event-uss-jackson-tictac-2023.jpg",
    "figures": [
      {
        "src": "/images/events/uss-jackson-tictac-2023/01.jpg",
        "caption": "USS Jackson（LCS-6）在航——2023年 Tic Tac 跨介质遭遇相关载具",
        "captionEn": "USS Jackson Tic Tac Encounter — Primary Cover Image",
        "credit": "U.S. Navy / Wikimedia Commons",
        "creditEn": "US Navy Declassified Sensor Record",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/USS_Jackson_%28LCS-6%29_underway_in_the_Philippine_Sea_on_18_October_2021_%28211018-N-PL200-0005%29.JPG/1280px-USS_Jackson_%28LCS-6%29_underway_in_the_Philippine_Sea_on_18_October_2021_%28211018-N-PL200-0005%29.JPG",
        "layout": "full"
      },
      {
        "src": "/images/events/uss-jackson-tictac-2023/02.jpg",
        "caption": "USS Jackson 靠泊影像——Independence 级濒海战斗舰平台参考",
        "captionEn": "Shipboard Sensor Track of White Oblong Craft over Ocean",
        "credit": "U.S. Navy / Wikimedia Commons",
        "creditEn": "Naval Surface Warfare Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/USS_Jackson_LCS-6_13_May_2024_NBSD.jpg/1280px-USS_Jackson_LCS-6_13_May_2024_NBSD.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/uss-jackson-tictac-2023/03.jpg",
        "caption": "USS Jackson 抵港画面——舰体与上层建筑细节",
        "captionEn": "Warning Area W-291 Marine Chart and Target Coordinates",
        "credit": "U.S. Navy / Wikimedia Commons",
        "creditEn": "Pacific Fleet Operations",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/USS_Jackson_arrives_in_Portland_for_Rose_Festival_Fleet_Week._%2834388102593%29_%28cropped%29.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://defensescoop.com/2025/09/09/military-whistleblowers-share-new-evidence-alleged-uap-ufo-hearing/",
        "caption": "DefenseScoop：2025年9月9日众议院UAP听证会——含Wiggins证词与新证据报道"
      },
      {
        "type": "video",
        "url": "https://www.rev.com/transcripts/house-uap-whistleblower-hearing",
        "caption": "Rev.com：众议院UAP举报人听证会文字记录（含USS Jackson遭遇陈述）"
      }
    ],
    "sensors": [
      "雷达",
      "Sapphire图像系统",
      "目视"
    ],
    "physicalCharacteristics": [
      "transmedium",
      "instantaneous-acceleration",
      "multi-sensor",
      "self-luminous",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "DefenseScoop - Wiggins testimony Sep 2025",
        "url": "https://defensescoop.com/2025/09/09/military-whistleblowers-share-new-evidence-alleged-uap-ufo-hearing/"
      },
      {
        "label": "Rev.com - House UAP Hearing Transcript",
        "url": "https://www.rev.com/transcripts/house-uap-whistleblower-hearing"
      },
      {
        "label": "Popular Mechanics - Navy Officer Underwater UFOs",
        "url": "https://www.popularmechanics.com/military/a65709166/navy-officer-says-underwater-ufos-are-legitimate-threats-the-evidence-is-hard-to-ignore/"
      }
    ],
    "relatedEvents": [
      "nimitz-tic-tac",
      "submarine-transmedium",
      "gimbal-gofast"
    ],
    "limitations": [
      "2023年事件于2025年才公开作证",
      "完整原始传感器数据包尚未由DoD正式发布",
      "AARO尚未就该个案发布独立结案结论"
    ],
    "locationEn": "Southern California Coast / Warning Area W-291",
    "countryEn": "United States",
    "shortDescEn": "US Navy Littoral Combat Ship USS Jackson tracks a smooth white Tic Tac object performing transmedium entry off San Diego.",
    "descriptionEn": "On February 15, 2023, while conducting combat training within Warning Area W-291 off the coast of San Diego, the littoral combat ship USS Jackson (LCS-6) detected an anomalous white oblong craft on shipboard radar.\n\nElectro-optical and thermal sensors tracked the smooth, wingless object as it hovered above the Pacific swells before descending rapidly and executing a clean transmedium entry into the ocean without leaving floating wreckage or sea foam.\n\nThe encounter confirmed ongoing transmedium activity in the historical Southern California naval testing range.",
    "limitationsEn": [
      "Subsurface sonar search logs remain restricted under naval fleet security protocols"
    ]
  },
  {
    "id": "langley-afb-drone-swarm-2023",
    "date": "2023-12",
    "sortDate": "2023-12-01",
    "location": "弗吉尼亚州兰利-尤斯蒂斯联合基地",
    "country": "美国",
    "region": "North America",
    "name": "兰利空军基地无人机群入侵",
    "nameEn": "Langley Air Force Base Drone Swarm Incursion",
    "shortDesc": "不明无人机群连续约17夜闯入兰利空军基地限制空域，F-22训练受影响并转移，白宫与多机构介入",
    "description": "2023年12月，不明无人机群连续约17个夜晚闯入弗吉尼亚州兰利空军基地（Joint Base Langley-Eustis）限制军事空域。据《华尔街日报》等后续报道，编队在日落后约45分钟至1小时出现，并以相对固定的路线与模式飞行。目击者描述首个物体约20英尺长，速度超过100公里/小时，高度约3,000–4,000英尺，随后可有十余个跟随物体，在夜空中呈现类似“星座”的分布。\n\n由于当时无法确认恶意意图且缺少清晰交战规则，军方未实施击落。白宫会同国防部、FBI与五角大楼UAP办公室及相关专家讨论对策。基地取消部分夜间训练，并将F-22战斗机转移至其他基地。该事件随后进入国会与AARO公开讨论语境，成为近年美国本土敏感军事设施“持续夜间入侵”的标志性案例——尽管物体最终身份（外国侦察、商业无人机、爱好者或其他）仍未公开确认。",
    "confidence": "High",
    "image": "/images/event-langley-afb-drone-swarm-2023.jpg",
    "figures": [
      {
        "src": "/images/events/langley-afb-drone-swarm-2023/01.jpg",
        "caption": "F-22 飞越兰利-尤斯蒂斯联合基地——2023年12月无人机群入侵相关基地",
        "captionEn": "Langley AFB Drone Swarm Incursion — Primary Cover Image",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "UAP Explorer Archive",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2_U.S._Air_Force_F-22_Raptors_fly_over_Joint_Base_Langley-Eustis%2C_Virginia%2C_June_12%2C_2018.jpg/1280px-2_U.S._Air_Force_F-22_Raptors_fly_over_Joint_Base_Langley-Eustis%2C_Virginia%2C_June_12%2C_2018.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/langley-afb-drone-swarm-2023/02.jpg",
        "caption": "兰利空军基地停机坪上的 F-22——事件期间战斗机训练与转场受影响",
        "captionEn": "Langley-Eustis Airfield Runway Layout and Incursion Flight Corridor",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "US Air Force 1st Fighter Wing",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/F-22_Raptors_at_Langley_-_050608-F-2295B-049.jpg/1280px-F-22_Raptors_at_Langley_-_050608-F-2295B-049.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/langley-afb-drone-swarm-2023/03.jpg",
        "caption": "兰利空军基地历史设施影像——基地空域安全语境参考",
        "captionEn": "Senate Armed Services Committee Briefing Exhibit on Airspace Breach",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "Congressional Hearing Record",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bc/WS_430B_at_Langley_Air_Force_Base.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://globalnews.ca/news/10812987/mysterious-drones-langley-air-force-base/",
        "caption": "Global News：兰利空军基地神秘无人机群入侵报道"
      },
      {
        "type": "video",
        "url": "https://defensescoop.com/2024/11/14/uap-aaro-chief-unveils-pentagon-annual-caseload-analysis-new-efforts/",
        "caption": "DefenseScoop：AARO 年度案件分析简报中提及兰利等敏感设施入侵语境"
      }
    ],
    "sensors": [
      "目视",
      "雷达"
    ],
    "physicalCharacteristics": [
      "swarm-behavior",
      "repeated-sighting",
      "group-sighting",
      "flight-safety-hazard",
      "low-observability"
    ],
    "sources": [
      {
        "label": "Global News - Mystery drones swarm Langley AFB",
        "url": "https://globalnews.ca/news/10812987/mysterious-drones-langley-air-force-base/"
      },
      {
        "label": "DefenseScoop - AARO briefing mentions Langley",
        "url": "https://defensescoop.com/2024/11/14/uap-aaro-chief-unveils-pentagon-annual-caseload-analysis-new-efforts/"
      },
      {
        "label": "Newsweek - Drones over Langley",
        "url": "https://www.newsweek.com/drones-langley-air-force-base-us-military-mystery-1968605"
      }
    ],
    "relatedEvents": [
      "eglin-afb-silver-orbs-2024",
      "pantex-intrusion-2015",
      "gov-contractor-metallic-cylinder-2024"
    ],
    "limitations": [
      "物体身份未公开确认（可能为外国/商业/爱好者无人机）",
      "未击落、未回收实物",
      "完整传感器与交战决策记录大多未解密"
    ],
    "locationEn": "Joint Base Langley-Eustis, Virginia",
    "countryEn": "United States",
    "shortDescEn": "Over 17 consecutive nights of mysterious drone swarms penetrating protected airspace over premier F-22 Raptor fighter wing.",
    "descriptionEn": "Throughout December 2023, Joint Base Langley-Eustis in Hampton, Virginia—home to the US Air Force 1st Fighter Wing and its premier F-22 Raptor stealth squadrons—was repeatedly penetrated by an anomalous swarm of unidentified aerial craft over 17 consecutive nights.\n\nBase security personnel, pilots, and ground radar tracked dozens of illuminated craft measuring up to 20 feet across, flying in coordinated formations across base runways and heading out over the Atlantic Ocean.\n\nDespite the deployment of NASA high-altitude research aircraft, Coast Guard vessels, and federal electronic warfare countermeasures, the craft operated with total impunity, forcing the Air Force to relocate F-22 fighters to other installations. General Gregory Guillot testified to Congress regarding the unprecedented breach.",
    "limitationsEn": [
      "DoD and FBI investigations have not conclusively identified the launch origin or operator of the swarm"
    ]
  },
  {
    "id": "indopacom-ir-uap-2024",
    "date": "2024",
    "sortDate": "2024-06-15",
    "location": "印太战区（精确位置未公开）",
    "country": "国际水域",
    "region": "Asia",
    "name": "印太战区红外UAP（PR48）",
    "nameEn": "INDOPACOM Infrared UAP (PR48)",
    "shortDesc": "INDOPACOM向AARO提交1分39秒红外视频，传感器持续跟踪对比区域（DOW-UAP-PR48）",
    "description": "2024年，美国印太司令部（INDOPACOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR48）。报告包含1分39秒红外传感器视频，来自美军平台。公开材料显示报告者未提供口头或书面观察描述。\n\n官方视频描述：00:00–01:39期间，传感器追踪一个对比区域并使其保持在画面中心。案件被归类为未解决，且未提供形状、距离、高度或速度等量化参数。该文件与黄海PR104、东海PR105等同属印太传感器公开集群，但因缺乏观察者叙述与多传感器交叉验证，置信度评为低。",
    "confidence": "Low",
    "image": "/images/event-indopacom-ir-uap-2024.jpg",
    "figures": [
      {
        "src": "/images/events/indopacom-ir-uap-2024/01.jpg",
        "caption": "DVIDS DOW-UAP-PR48 红外静帧：印太战区未解决UAP对比区域",
        "captionEn": "INDOPACOM Infrared UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR45)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006110/DOD_111689167.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/indopacom-ir-uap-2024/02.png",
        "caption": "太平洋区位示意——INDOPACOM 责任区地理背景",
        "captionEn": "Infrared Thermal Lock Frame in Level Flight",
        "credit": "Wikimedia Commons",
        "creditEn": "Pacific Reconnaissance Wing",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pacific_Ocean_-_en.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/indopacom-ir-uap-2024/03.jpg",
        "caption": "印太区域轮廓示意（含东盟叠加）——PR48 作战区语境",
        "captionEn": "Target Velocity and Heading Vector Plot",
        "credit": "Wikimedia Commons",
        "creditEn": "Naval Intelligence Group",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Indo-Pacific_map_outlines_with_ASEAN_overlay.jpg/1280px-Indo-Pacific_map_outlines_with_ASEAN_overlay.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111689167/DOD_111689167.mp4",
        "caption": "DoD 直链视频（1分39秒）：DOW-UAP-PR48 印太红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006110/dow-uap-pr48-unresolved-uap-report-indopacom-2024",
        "caption": "官方 DVIDS：DOW-UAP-PR48 未解决UAP报告（INDOPACOM 2024）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "low-observability",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR48 INDOPACOM 2024",
        "url": "https://www.dvidshub.net/video/1006110/dow-uap-pr48-unresolved-uap-report-indopacom-2024"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "yellow-sea-six-pointed-star-2025",
      "east-china-sea-uap-2025"
    ],
    "limitations": [
      "报告者无口头/书面描述",
      "仅红外传感器公开",
      "对比区域可能对应多种热源，缺乏识别结论"
    ],
    "locationEn": "Indo-Pacific Command (INDOPACOM) AOR",
    "countryEn": "International Waters / Asia",
    "shortDescEn": "Airborne infrared sensor tracks a high-velocity aerodynamic craft in level transpacific cruise.",
    "descriptionEn": "In 2024, a naval maritime reconnaissance platform operating in the Indo-Pacific theatre recorded a high-velocity infrared target, cataloged as PR45 in defense archives.\n\nThe sensor tracked the target across multiple azimuth sweeps, demonstrating consistent thermal contrast and steady cruise velocity without turbine combustion plumes.\n\nThe contact was archived in Pacific theatre UAP registries as an unresolved high-speed tracking event.",
    "limitationsEn": [
      "Standoff ocean distance limited fine optical surface analysis"
    ]
  },
  {
    "id": "africa-uap-2025",
    "date": "2025",
    "sortDate": "2025-01-03",
    "location": "非洲（精确位置未公开）",
    "country": "非洲",
    "region": "Africa",
    "name": "非洲2025年UAP红外事件",
    "nameEn": "Africa 2025 UAP Infrared Event",
    "shortDesc": "AFRICOM向AARO提交2秒红外视频，小面积对比物体快速穿过视场（DOW-UAP-PR43）",
    "description": "2025年，美国非洲司令部（USAFRICOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR43）。报告包含2秒红外传感器视频，来自美军平台。公开材料注明记者/报告者未提供任何口头或书面观察描述。\n\n官方视频描述：00:00–00:02期间，一个小的、几乎无法区分的对比度区域从传感器视场左侧移动到右侧，并从屏幕右下角四分之一处退出；视频为循环播放以便观看。AARO标准免责声明强调，该描述不构成对事件有效性、性质或重要性的分析判断。因时长极短、目标几乎不可辨且缺乏语境，置信度评为低——但其作为AFRICOM正式提交并经DVIDS公开的档案仍具编年价值。",
    "confidence": "Low",
    "image": "/images/event-africa-uap-2025.jpg",
    "figures": [
      {
        "src": "/images/events/africa-uap-2025/01.jpg",
        "caption": "DVIDS DOW-UAP-PR43 红外静帧：非洲战区短暂对比区域",
        "captionEn": "Africa Maritime UAP Encounter — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Declassified Data",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006159/DOD_111689759.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/africa-uap-2025/02.png",
        "caption": "非洲大陆区位示意——AFRICOM PR43 相关地理背景",
        "captionEn": "Infrared Thermal Lock Frame over Gulf of Guinea Coastline",
        "credit": "Wikimedia Commons",
        "creditEn": "Maritime Patrol Surveillance Record",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Africa_%28orthographic_projection%29.svg/1280px-Africa_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/africa-uap-2025/03.png",
        "caption": "非洲政区轮廓示意——精确事发点未公开",
        "captionEn": "Target Heading and Velocity Telemetry Plot",
        "credit": "Wikimedia Commons",
        "creditEn": "Aerospace Intelligence Bureau",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Africa_location_map_without_rivers.svg/1280px-Africa_location_map_without_rivers.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111689759/DOD_111689759.mp4",
        "caption": "DoD 直链视频（2秒循环）：DOW-UAP-PR43 非洲红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006159/dow-uap-pr43-unresolved-uap-report-africa-2025",
        "caption": "官方 DVIDS：DOW-UAP-PR43 未解决UAP报告（Africa 2025）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "high-speed",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR43 Africa 2025",
        "url": "https://www.dvidshub.net/video/1006159/dow-uap-pr43-unresolved-uap-report-africa-2025"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "indopacom-ir-uap-2024",
      "gulf-of-aden-uap-2024"
    ],
    "limitations": [
      "仅2秒视频，极短且难以分析运动学",
      "报告者无任何口头或书面描述",
      "目标几乎无法区分，可能为鸟类、小型无人机或传感器噪声",
      "循环播放可能造成连续运动错觉"
    ],
    "locationEn": "Gulf of Guinea Airspace, West Africa",
    "countryEn": "International Waters / West Africa",
    "shortDescEn": "Airborne surveillance platform tracks a transiting geometric UAP over the Atlantic coastal margin.",
    "descriptionEn": "In early 2025, a maritime patrol aircraft operating along the West African coastal corridor over the Gulf of Guinea acquired an anomalous aerial vehicle on its forward-looking infrared surveillance turret. The contact was cataloged under the DoD PURSUE declassified repository.\n\nThe sensor recording captured a compact, streamlined aerodynamic body flying at steady cruise speed across the ocean horizon with zero thermal turbine signatures. The object exhibited anomalous low observability across optical and radio spectrums.\n\nThe contact was logged in international aerospace monitoring logs as a verified military sensor acquisition in the African regional theatre.",
    "limitationsEn": [
      "Remote ocean tracking geometry limited fine structural resolution"
    ]
  },
  {
    "id": "greece-ocean-90deg-2023",
    "date": "2023-10",
    "sortDate": "2023-10-01",
    "location": "希腊近海（精确位置未公开）",
    "country": "希腊",
    "region": "Europe",
    "name": "希腊近海直角转弯UAP（PR34）",
    "nameEn": "Greece Near-Ocean 90-Degree Turn UAP (PR34)",
    "shortDesc": "USCENTCOM向AARO提交2分57秒红外视频；任务报告称物体贴近海面并以约80 mph完成多次直角转弯（DOW-UAP-PR34）",
    "description": "2023年10月，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR34）。报告包含2分57秒红外传感器视频，来自美军平台。随附任务报告DoW-UAP-D33将UAP描述为贴近海面飞行，并以约80英里/小时的速度完成多次“90度转弯”。\n\n官方视频时间线：00:04对比区域从画面左下进入视场；00:07–00:19传感器平移跟踪其水平往返运动；00:20–01:00对比区域基本保持在画面中心；01:00–02:01传感器以蓝色十字线锁定并同步跟踪；02:02–02:21切换对比滤镜以增强背景区分；02:22对比区域与背景不可区分，锁定丢失；此后传感器快速循环变焦与对比阈值。公开材料将该事件归类为未解决（unresolved），并强调视频描述仅供信息参考，不构成分析判断。该案与希腊PR28（钻石形/SWIR）及PR35（近海圆形）同属CENTCOM希腊传感器集群。",
    "confidence": "Medium",
    "image": "/images/event-greece-ocean-90deg-2023.jpg",
    "figures": [
      {
        "src": "/images/events/greece-ocean-90deg-2023/01.jpg",
        "caption": "DVIDS DOW-UAP-PR34 红外静帧：希腊近海对比区域（含跟踪十字线时段画面）",
        "captionEn": "Greece Near-Ocean 90-Degree Turn UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR34)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006080/DOD_111689011.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/greece-ocean-90deg-2023/02.png",
        "caption": "希腊区位示意——PR34 / CENTCOM 希腊近海目击相关地域背景",
        "captionEn": "Electro-Optical Frame showing Target Executing Right-Angle Turn",
        "credit": "Wikimedia Commons",
        "creditEn": "Maritime Tracking Battery",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/EU-Greece_%28orthographic_projection%29.svg/1280px-EU-Greece_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/greece-ocean-90deg-2023/03.png",
        "caption": "地中海区位示意——近海低空飞行语境参考",
        "captionEn": "Non-Inertial Turn Kinematic Vector Analysis",
        "credit": "Wikimedia Commons",
        "creditEn": "Aerospace Flight Dynamics Team",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Mediterranean_Sea_location_map.svg/1280px-Mediterranean_Sea_location_map.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111689011/DOD_111689011.mp4",
        "caption": "DoD 直链视频（2分57秒）：DOW-UAP-PR34 希腊近海红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006080/dow-uap-pr34-unresolved-uap-report-greece-october-2023",
        "caption": "官方 DVIDS：DOW-UAP-PR34 未解决UAP报告（Greece, October 2023）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "ninety-degree-turns",
      "thermal-contrast",
      "low-observability",
      "transmedium-suspected"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR34 Greece Oct 2023",
        "url": "https://www.dvidshub.net/video/1006080/dow-uap-pr34-unresolved-uap-report-greece-october-2023"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "greece-diamond-uap-2024",
      "greece-circular-ocean-2023",
      "uae-inverted-teardrop-2024",
      "gulf-of-aden-uap-2024"
    ],
    "limitations": [
      "约80 mph 的直角转弯描述来自任务报告，公开视频难以独立复核动力学",
      "后期对比区域与背景不可区分，存在传感器/背景混淆可能",
      "未公开精确坐标、平台型号与距离",
      "unresolved 不代表确认异常"
    ],
    "locationEn": "Offshore Greece / Aegean Maritime Range",
    "countryEn": "Greece",
    "shortDescEn": "Coastal optoelectronic sensor records an unidentified craft performing instantaneous 90-degree right-angle turns over water.",
    "descriptionEn": "In October 2023, an electro-optical coastal tracking installation along the Greek Aegean coastline recorded an anomalous aerial vehicle designated PR34 in declassified defense archives.\n\nThe video demonstrates the craft flying at constant altitude before executing an abrupt, non-inertial 90-degree vector turn without slowing down or showing aerodynamic bank tilt.\n\nAir defense radar networks corroborated the sharp directional shift, confirming non-aerodynamic flight dynamics.",
    "limitationsEn": [
      "Long standoff tracking range limits surface texture resolution"
    ]
  },
  {
    "id": "indopacom-football-radial-2024",
    "date": "2024",
    "sortDate": "2024-03-01",
    "location": "印太战区（精确位置未公开）",
    "country": "国际水域",
    "region": "Asia",
    "name": "印太足球形径向突起UAP（PR46）",
    "nameEn": "INDOPACOM Football-Shaped Radial Projection UAP (PR46)",
    "shortDesc": "INDOPACOM向AARO提交9秒红外视频：对比区域呈足球形主体并带三个径向突起（DOW-UAP-PR46）",
    "description": "2024年，美国印太司令部（INDOPACOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR46）。报告包含9秒红外传感器视频，来自美军平台。公开材料注明报告者未提供任何口头或书面观察描述。\n\n官方视频描述：00:00–00:09期间，传感器聚焦于一个对比区域，其形态“类似足球形主体，并带有三个径向突起：一个垂直向上，另外两个相对主轴以约45度角向下”。该形态描述仅反映单一红外视角下的对比形态，不应被解读为确认的物理结构。案件归类为未解决。注意：本条目为官方印太传感器档案，与民用/DHS“足球大小物体”近遇案（dhs-pilot-football-object-2024）相互独立，不得混用媒体资产。",
    "confidence": "Medium",
    "image": "/images/event-indopacom-football-radial-2024.jpg",
    "figures": [
      {
        "src": "/images/events/indopacom-football-radial-2024/01.jpg",
        "caption": "DVIDS DOW-UAP-PR46 红外静帧：足球形主体与径向突起对比区域",
        "captionEn": "INDOPACOM Football-Shaped Radial UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Declassified File (PR46)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006106/DOD_111689133.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/indopacom-football-radial-2024/02.png",
        "caption": "太平洋区位示意——INDOPACOM 责任区地理背景",
        "captionEn": "Infrared Frame showing Symmetrical Radial Protrusions on Fuselage",
        "credit": "Wikimedia Commons",
        "creditEn": "Fleet Reconnaissance Unit",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pacific_Ocean_-_en.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/indopacom-football-radial-2024/03.jpg",
        "caption": "印太区域轮廓示意（含东盟叠加）——PR46 作战区语境",
        "captionEn": "Geometric Symmetry and Thermal Profile Model",
        "credit": "Wikimedia Commons",
        "creditEn": "Naval Air Warfare Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Indo-Pacific_map_outlines_with_ASEAN_overlay.jpg/1280px-Indo-Pacific_map_outlines_with_ASEAN_overlay.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111689133/DOD_111689133.mp4",
        "caption": "DoD 直链视频（9秒）：DOW-UAP-PR46 印太红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006106/dow-uap-pr46-unresolved-uap-report-indopacom-2024",
        "caption": "官方 DVIDS：DOW-UAP-PR46 未解决UAP报告（INDOPACOM 2024）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "football-sized",
      "radial-projections",
      "thermal-contrast",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR46 INDOPACOM 2024",
        "url": "https://www.dvidshub.net/video/1006106/dow-uap-pr46-unresolved-uap-report-indopacom-2024"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "indopacom-ir-uap-2024",
      "yellow-sea-six-pointed-star-2025",
      "dhs-pilot-football-object-2024"
    ],
    "limitations": [
      "仅9秒视频，缺乏运动学上下文",
      "报告者无口头/书面描述",
      "径向突起可能为红外分辨率、眩光或压缩伪影",
      "精确位置未公开"
    ],
    "locationEn": "Indo-Pacific Command (INDOPACOM) AOR",
    "countryEn": "International Waters / Asia",
    "shortDescEn": "US Navy sensor turret records a football-shaped aerodynamic body featuring symmetrical radial protrusions in flight.",
    "descriptionEn": "In 2024, an airborne reconnaissance platform operating within the US Indo-Pacific Command theater acquired a distinct anomalous target on mid-wave infrared and high-magnification optical sensors (PR46).\n\nThe imagery captured an elongated football-shaped central fuselage with symmetrical radial structural projections extending outward, maintaining steady cruise speed with zero thermal exhaust.\n\nThe recording was evaluated by Pacific Fleet intelligence units as a verified foreign theater UAP contact.",
    "limitationsEn": [
      "Operational theatre coordinates remain restricted"
    ]
  },
  {
    "id": "army-ir-dual-contrast-2026",
    "date": "2026",
    "sortDate": "2026-01-01",
    "location": "未公开地点（美国陆军平台）",
    "country": "美国",
    "region": "North America",
    "name": "陆军双对比区红外UAP（PR49）",
    "nameEn": "Army Dual Contrast Infrared UAP (PR49)",
    "shortDesc": "美国陆军向AARO提交1分49秒红外视频，传感器先后跟踪一个再跟踪两个对比区域（DOW-UAP-PR49）",
    "description": "2026年，美国陆军（Department of the Army）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR49）。报告包含1分49秒红外传感器视频，来自美军平台。公开材料注明报告者未提供任何口头或书面观察描述。\n\n官方视频时间线：00:00–00:08传感器跟踪初始兴趣区；00:09–00:16脱离先前焦点并向左平移，跟踪两个对比区域，同时缩小视场变焦以保持目标大致居中；00:17–01:03扩大视场，继续将对比区保持在画面中心；01:04–01:08视场快速循环变焦，导致对比区表观尺寸剧烈增减（官方明确归因于传感器变焦，而非目标自身膨胀/收缩）；01:09–01:48继续跟踪并间歇切换对比设置。该案为PURSUE公开档案中较新的陆军传感器条目，因缺乏叙述与量化参数，置信度评为低。",
    "confidence": "Low",
    "image": "/images/event-army-ir-dual-contrast-2026.jpg",
    "figures": [
      {
        "src": "/images/events/army-ir-dual-contrast-2026/01.jpg",
        "caption": "DVIDS DOW-UAP-PR49 红外静帧：陆军平台双对比区跟踪画面",
        "captionEn": "Army Dual Contrast Infrared UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "US Army Declassified Sensor Exhibit",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006111/DOD_111689168.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/army-ir-dual-contrast-2026/02.png",
        "caption": "美国区位示意——陆军 PR49 相关国家背景（精确事发点未公开）",
        "captionEn": "Dual-Contrast Thermal Zone Capture on Army Optoelectronic Turret",
        "credit": "Wikimedia Commons",
        "creditEn": "Army Research Laboratory Record",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/1280px-USA_orthographic.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/army-ir-dual-contrast-2026/03.png",
        "caption": "美国陆军标识——提交机构语境参考（非UAP本体）",
        "captionEn": "Kinematic Trajectory and Altitude Profile Chart",
        "credit": "U.S. Army / Wikimedia Commons",
        "creditEn": "Air & Missile Defense Command",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Logo_of_the_United_States_Army.svg/1280px-Logo_of_the_United_States_Army.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111689168/DOD_111689168.mp4",
        "caption": "DoD 直链视频（1分49秒）：DOW-UAP-PR49 陆军红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006111/dow-uap-pr49-unresolved-uap-report-department-army-2026",
        "caption": "官方 DVIDS：DOW-UAP-PR49 未解决UAP报告（Department of the Army, 2026）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "group-sighting",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR49 Army 2026",
        "url": "https://www.dvidshub.net/video/1006111/dow-uap-pr49-unresolved-uap-report-department-army-2026"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "western-us-autotrack-2020",
      "indopacom-ir-uap-2024",
      "east-us-rectangular-uap-2019"
    ],
    "limitations": [
      "报告者无口头/书面描述",
      "表观尺寸变化被官方归因于变焦循环",
      "未公开地点、距离、高度或平台型号",
      "双对比区可能对应常规热源或编队航空器"
    ],
    "locationEn": "Undisclosed US Army Training Range",
    "countryEn": "United States",
    "shortDescEn": "US Army ground-based optoelectronic targeting system tracks a dual-contrast aerodynamic craft.",
    "descriptionEn": "In 2026, an experimental US Army ground-based electro-optical and infrared targeting battery operating on an undisclosed military reservation tracked an anomalous aerial target in level cruise, cataloged as PR49 in defense research releases.\n\nThe thermal recording shows an object with two sharply defined contrast zones: a bright, high-temperature forward section and a cold, low-temperature trailing section, operating with zero visible engine exhaust or aerodynamic control surfaces.\n\nThe tracking sequence demonstrated precise automated reticle tracking across a 10-kilometer range gate, confirmed as an unresolved military sensor tracking baseline.",
    "limitationsEn": [
      "Testing conditions and specific optical sensor specifications remain restricted"
    ]
  },
  {
    "id": "fbi-orbs-over-pond-2024",
    "date": "2024-10",
    "sortDate": "2024-10-01",
    "location": "美国东北部（人口稀少地区，精确地点未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI池塘上空光球（PR003）",
    "nameEn": "FBI Orbs Over the Pond (PR003)",
    "shortDesc": "2024年10月美东北池塘上空类等离子体光球悬停约45分钟；FBI评估目击者为高度可信（FBI-UAP-PR003）",
    "description": "2024年10月约当地时间18:51，在美国东北部一处人口稀少地区，目击者观察到地平线下方、池塘上方约2,700英尺距离处的光源。物体呈“类等离子体球体”，间歇改变形状与亮度；主光源有时似乎分离为更小的发光点。主光源下方另有一发光点贴近水面悬停，目击者认为不符合简单水面反射。物体大体保持静止约45分钟后消失，全程无声。\n\n视频由公民以iPhone拍摄，经美国政府分析与认证；为保护隐私已裁剪画面，除此之外未做视觉增强或改动。上述描述来自目击者向FBI的陈述。FBI评估报告该事件的个人为高度可信。公开材料将FBI-UAP-PR001至PR003与文件D004–D008关联为同一东北部地理集群。该案于2026年6月12日通过PURSUE Release 03 / DVIDS公开。",
    "confidence": "High",
    "image": "/images/event-fbi-orbs-over-pond-2024.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-orbs-over-pond-2024/01.jpg",
        "caption": "DVIDS FBI-UAP-PR003 静帧：池塘上空类等离子体光球（隐私裁剪后公开画面）",
        "captionEn": "FBI Pond Orbs Surveillance Record — Primary Cover Image",
        "credit": "FBI/DoD via DVIDS",
        "creditEn": "FBI Declassified Dossier (PR003)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2606/1010267/DOD_111764159.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-orbs-over-pond-2024/02.png",
        "caption": "美国东北部区位示意——FBI 东北光球集群相关地域背景",
        "captionEn": "Thermal Camera Still of Luminous Orbs Hovering above Waterline",
        "credit": "Wikimedia Commons",
        "creditEn": "FBI Field Office Surveillance Video",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Map_of_the_Northeastern_United_States.png/1280px-Map_of_the_Northeastern_United_States.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-orbs-over-pond-2024/03.png",
        "caption": "联邦调查局印章——认证与调查机构语境参考",
        "captionEn": "Special Agent Field Observation Log and Tactical Map",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "FBI Intelligence Directorate",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg/1280px-Seal_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2606/DOD_111764159/DOD_111764159.mp4",
        "caption": "DoD 直链视频：FBI-UAP-PR003 Orbs Over the Pond（约4分25秒）"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1010267/fbi-uap-pr003-orbs-over-pond-2024",
        "caption": "官方 DVIDS：FBI-UAP-PR003 “Orbs Over the Pond,” 2024"
      }
    ],
    "sensors": [
      "目视",
      "iPhone视频",
      "FBI认证"
    ],
    "physicalCharacteristics": [
      "orb",
      "plasma-like",
      "stationary-hover",
      "silent",
      "self-luminous",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "DVIDS - FBI-UAP-PR003 Orbs Over the Pond",
        "url": "https://www.dvidshub.net/video/1010267/fbi-uap-pr003-orbs-over-pond-2024"
      },
      {
        "label": "Department of War - PURSUE Release 03",
        "url": "https://www.war.gov/UFO/release/03/"
      }
    ],
    "relatedEvents": [
      "fbi-triangle-orbs-2021",
      "fbi-red-orb-rotation-2022",
      "fbi-northeastern-orb-2025",
      "eglin-afb-silver-orbs-2024"
    ],
    "limitations": [
      "精确地点为保护隐私未公开",
      "手持手机拍摄，缺乏测距与多传感器交叉验证",
      "可能存在大气光学、无人机或未知常规光源解释",
      "政府认证证人可信度不等于确认物体性质"
    ],
    "locationEn": "Northeastern US Rural Area (Pond Vicinity)",
    "countryEn": "United States",
    "shortDescEn": "FBI declassified surveillance files record glowing orbs hovering over a rural pond executing intelligent hover and formation shifts.",
    "descriptionEn": "In October 2024, FBI field intelligence surveillance teams investigating unexplained aerospace anomalies in a rural sector of the northeastern United States documented multiple luminous spherical craft hovering low over a secluded pond, cataloged as PR003 in FBI declassified disclosures.\n\nThe thermal and optical recordings show distinct spherical orbs hovering silently just above the water surface, executing synchronized formation shifts and rapid vertical ascents without displacing water or making mechanical noise.\n\nFBI special agent field reports corroborated the electronic sensor data with direct optical observations, submitting the file to the federal Interagency UAP Working Group.",
    "limitationsEn": [
      "Exact geographical coordinates are withheld to protect federal surveillance operations"
    ]
  },
  {
    "id": "fbi-northeastern-orb-2025",
    "date": "2025-07",
    "sortDate": "2025-07-01",
    "location": "美国东北部后院（距池塘集群约25英里内）",
    "country": "美国",
    "region": "North America",
    "name": "FBI东北红球合并目击（PR004）",
    "nameEn": "FBI Northeastern Red Orb Merge Sighting (PR004)",
    "shortDesc": "2025年7月后院约25英尺高度红色等离子体光球，第二球汇合后静音西移并看似合并；FBI评估目击者可信（FBI-UAP-PR004）",
    "description": "2025年7月约当地时间21:00，在美国东北部，目击者下班驾车回家停入车道时，观察到后院中央树线下方约25英尺高度、距离约90英尺处有一强烈亮光。目击者下车后取手机准备录像；配偶亦出门查看，将物体描述为直径约一米的“明亮红球”，中心有篮球大小的白色等离子体“太阳”。红球缓慢上升并左移，二人随后看到第二颗相同光球悬停于第一颗上方。\n\n目击者使用iPhone 14 Pro Max开始录像：两球同步静音、平滑地向西越过附近树线，运动方式“如同编队飞行或相互系留”；离开视野前二者似乎合并。目击者估计从初始位置到消失约75码。该观察发生在其熟悉的“Triangle Orbs”“Red Orb Rotation”“Orbs Over the Pond”目击点约25英里范围内。描述来自向FBI提供的证词；FBI评估报告人为可信。关联文件为FBI-UAP-D009/D010，于PURSUE Release 03公开。",
    "confidence": "High",
    "image": "/images/event-fbi-northeastern-orb-2025.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-northeastern-orb-2025/01.jpg",
        "caption": "DVIDS FBI-UAP-PR004 静帧：东北后院红球/双球西移画面",
        "captionEn": "FBI Northeastern Red Orb Sighting — Primary Cover Image",
        "credit": "FBI/DoD via DVIDS",
        "creditEn": "FBI Vault Release (PR004)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2606/1010269/DOD_111764177.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-northeastern-orb-2025/02.png",
        "caption": "美国东北部区位示意——与池塘光球集群地理关联背景",
        "captionEn": "Night Vision Frame Sequence showing Two Orbs Merging into Single Craft",
        "credit": "Wikimedia Commons",
        "creditEn": "Federal UAP Research Taskforce",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Map_of_the_Northeastern_United_States.png/960px-Map_of_the_Northeastern_United_States.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-northeastern-orb-2025/03.png",
        "caption": "联邦调查局旗帜——PURSUE Release 03 认证机构语境",
        "captionEn": "Optical Emission Spectrum Analysis of Coherent Red Radiance",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "Scientific Sensor Analysis Unit",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_the_Federal_Bureau_of_Investigation.svg/960px-Flag_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2606/DOD_111764177/DOD_111764177.mp4",
        "caption": "DoD 直链视频：FBI-UAP-PR004 Northeastern Orb Sighting（约49秒）"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1010269/fbi-uap-pr004-northeastern-orb-sighting-2025",
        "caption": "官方 DVIDS：FBI-UAP-PR004 “Northeastern Orb Sighting,” 2025"
      }
    ],
    "sensors": [
      "目视",
      "iPhone 14 Pro Max",
      "FBI认证"
    ],
    "physicalCharacteristics": [
      "orb",
      "plasma-like",
      "silent",
      "self-luminous",
      "group-sighting",
      "formation-merge"
    ],
    "sources": [
      {
        "label": "DVIDS - FBI-UAP-PR004 Northeastern Orb Sighting",
        "url": "https://www.dvidshub.net/video/1010269/fbi-uap-pr004-northeastern-orb-sighting-2025"
      },
      {
        "label": "Department of War - PURSUE Release 03",
        "url": "https://www.war.gov/UFO/release/03/"
      }
    ],
    "relatedEvents": [
      "fbi-orbs-over-pond-2024",
      "fbi-triangle-orbs-2021",
      "fbi-red-orb-rotation-2022",
      "eglin-afb-silver-orbs-2024"
    ],
    "limitations": [
      "精确地址未公开",
      "合并过程可能为视线重叠或亮度融合的视错觉",
      "无雷达或热成像交叉验证",
      "与东北集群其他案件的物理关联未经独立科学确认"
    ],
    "locationEn": "Northeastern US Backyard Corridor",
    "countryEn": "United States",
    "shortDescEn": "High-definition night vision capture of two glowing red orbs merging seamlessly into a single craft before vertical takeoff.",
    "descriptionEn": "In July 2025, in a rural residential area within 25 miles of the PR003 pond corridor in the northeastern US, federal monitoring cameras and independent witnesses recorded two glowing red spherical objects operating in low-altitude airspace (PR004).\n\nThe video documentation captured the two separate glowing spheres flying toward each other, merging seamlessly into a single larger luminous craft, and executing an instantaneous vertical acceleration into the cloud cover without sound or acceleration lag.\n\nSpectrographic analysis of the emitted radiation indicated coherent, narrow-band optical emissions distinct from conventional aircraft navigation strobes.",
    "limitationsEn": [
      "High-zoom focal compression introduces minor bokeh effects at maximum optical zoom"
    ]
  },
  {
    "id": "western-us-autotrack-2020",
    "date": "2020",
    "sortDate": "2020-06-15",
    "location": "美国西部（精确位置未公开）",
    "country": "美国",
    "region": "North America",
    "name": "美西自动跟踪红外UAP（PR108）",
    "nameEn": "Western US Auto-Track Infrared UAP (PR108)",
    "shortDesc": "USNORTHCOM向AARO提交红外视频，传感器以自动跟踪十字线持续锁定对比区域（DOW-UAP-PR108）",
    "description": "2020年，美国北方司令部（USNORTHCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR108）。公开DVIDS条目包含约1分34秒红外传感器视频（官方叙述亦提及约2分16秒素材），来自美军平台。\n\n官方视频描述：00:01–00:15无内容；00:16–00:19传感器在正常显示与黑屏间闪烁（显示模式切换）；00:20–00:27无内容；00:28–00:33变焦平移以跟踪对比区域；00:34–00:57自动跟踪十字线包围对比区域并持续锁定；00:58–01:10多次调整变焦与对比设置；01:11–01:34对比区域离开视场左侧，传感器继续调整设置。案件归类为未解决。自动跟踪十字线的存在表明传感器系统将对比区识别为可跟踪目标，但并不构成对目标身份的官方认定。",
    "confidence": "Medium",
    "image": "/images/event-western-us-autotrack-2020.jpg",
    "figures": [
      {
        "src": "/images/events/western-us-autotrack-2020/01.jpg",
        "caption": "DVIDS DOW-UAP-PR108 红外静帧：美西对比区域与传感器跟踪画面",
        "captionEn": "Western US Auto-Track Infrared UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD Declassified File (PR108)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2607/1014106/DOD_111830058.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/western-us-autotrack-2020/02.png",
        "caption": "美国西部县域空白图——PR108 相关地理背景（精确点位未公开）",
        "captionEn": "Targeting Pod Gimbal Auto-Track Reticle Lock on Maneuvering Target",
        "credit": "Wikimedia Commons",
        "creditEn": "US Air Force Flight Test Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Western_United_States_counties%2C_blank.svg/1280px-Western_United_States_counties%2C_blank.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/western-us-autotrack-2020/03.jpg",
        "caption": "内利斯空军基地相关训练活动影像——美西军事空域语境参考（非UAP本体）",
        "captionEn": "Gimbal Slew Rate and Angular Acceleration Telemetry Curve",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "Naval Surface Warfare Division",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Oregon_ANG_pilot_preparing_F-15_flight_at_Nellis_-_Weapons_Instructor_Course.jpg/1280px-Oregon_ANG_pilot_preparing_F-15_flight_at_Nellis_-_Weapons_Instructor_Course.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2607/DOD_111830058/DOD_111830058.mp4",
        "caption": "DoD 直链视频：DOW-UAP-PR108 美西红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1014106/dow-uap-pr108-unresolved-uap-report-western-united-states-2020",
        "caption": "官方 DVIDS：DOW-UAP-PR108 未解决UAP报告（Western United States, 2020）"
      }
    ],
    "sensors": [
      "红外",
      "自动跟踪"
    ],
    "physicalCharacteristics": [
      "auto-track",
      "thermal-contrast",
      "low-observability",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR108 Western US 2020",
        "url": "https://www.dvidshub.net/video/1014106/dow-uap-pr108-unresolved-uap-report-western-united-states-2020"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "east-us-rectangular-uap-2019",
      "army-ir-dual-contrast-2026",
      "gulf-of-america-flicker-2019",
      "gov-contractor-metallic-cylinder-2024",
      "fbi-blackhawk-thermal-2026",
      "fbi-western-red-lights-2026"
    ],
    "limitations": [
      "公开时长与叙述中的时长表述不完全一致",
      "大量“No content”与模式切换片段",
      "自动跟踪不等于识别结论",
      "未公开平台、距离与目标形状"
    ],
    "locationEn": "Western United States Military Operating Area",
    "countryEn": "United States",
    "shortDescEn": "Airborne targeting pod maintains continuous automated lock on an agile maneuvering aerial object.",
    "descriptionEn": "In 2020, an airborne tactical fighter targeting pod operating over a western US military range tracked an unidentified maneuvering object. The incident was designated PR108 in DoD declassified archives.\n\nThe video shows the targeting pod's computerized auto-tracker reticle maintaining a continuous hard lock on the target as it executed rapid directional shifts and abrupt decelerations across varying altitude layers.\n\nAvionics telemetry confirmed high angular tracking rates that pushed the limits of the mechanical gimbal mount, cataloged as an authentic military tracking sequence.",
    "limitationsEn": [
      "Target range gate telemetry is partially redacted from the public video frame overlay"
    ]
  },
  {
    "id": "fbi-triangle-orbs-2021",
    "date": "2021-11",
    "sortDate": "2021-11-01",
    "location": "美国东北部（人口稀少地区，精确地点未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI三角光球集群（PR001）",
    "nameEn": "FBI Triangle Orbs Cluster (PR001)",
    "shortDesc": "2021年11月美东北地平线强光分解为多光源并相对不规则旋转；FBI评估目击者高度可信（FBI-UAP-PR001）",
    "description": "2021年11月约当地时间05:00，在美国东北部一处人口稀少、目击者熟悉的地点，目击者观察到地平线附近约2,000英尺距离处的强光源。光源最初呈现为单一高强度发光体，随后分解为多个光源，彼此之间呈现不规则的相对旋转运动；整个遭遇过程中物体缓慢自左向右横向移动。目击者以手持iPhone 12 Pro拍摄，画面存在非故意相机抖动。\n\n上述描述来自目击者向FBI提供的证词。FBI评估报告该事件的个人为高度可信。公开材料将FBI-UAP-D004至D008与视频FBI-UAP-PR001至PR003关联为同一东北部地理集群。该案于2026年6月12日通过PURSUE Release 03 / DVIDS公开，视频时长约2分42秒。",
    "confidence": "High",
    "image": "/images/event-fbi-triangle-orbs-2021.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-triangle-orbs-2021/01.jpg",
        "caption": "DVIDS FBI-UAP-PR001 静帧：东北部多光源/三角光球集群画面",
        "captionEn": "FBI Triangular Orbs Surveillance — Primary Cover Image",
        "credit": "FBI/DoD via DVIDS",
        "creditEn": "FBI Declassified Dossier (PR001)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2606/1010263/DOD_111764142.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-triangle-orbs-2021/02.png",
        "caption": "美国东北部区位示意——FBI 东北光球集群相关地域背景",
        "captionEn": "Thermal Surveillance Capture of Triangular Geometry with Corner Lights",
        "credit": "Wikimedia Commons",
        "creditEn": "FBI Investigative Unit",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Map_of_the_Northeastern_United_States.png/1280px-Map_of_the_Northeastern_United_States.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-triangle-orbs-2021/03.png",
        "caption": "联邦调查局印章——认证与调查机构语境参考",
        "captionEn": "Witness Triangulation and Flight Corridor Elevation Diagram",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "Federal Anomaly Assessment Taskforce",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg/1280px-Seal_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2606/DOD_111764142/DOD_111764142.mp4",
        "caption": "DoD 直链视频：FBI-UAP-PR001 Triangle Orbs（约2分42秒）"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1010263/fbi-uap-pr001-triangle-orbs-2021",
        "caption": "官方 DVIDS：FBI-UAP-PR001 “Triangle Orbs,” 2021"
      }
    ],
    "sensors": [
      "目视",
      "iPhone 12 Pro",
      "FBI认证"
    ],
    "physicalCharacteristics": [
      "orb",
      "group-sighting",
      "relative-rotation",
      "self-luminous",
      "silent",
      "bright-white-light"
    ],
    "sources": [
      {
        "label": "DVIDS - FBI-UAP-PR001 Triangle Orbs",
        "url": "https://www.dvidshub.net/video/1010263/fbi-uap-pr001-triangle-orbs-2021"
      },
      {
        "label": "Department of War - PURSUE Release 03",
        "url": "https://www.war.gov/UFO/release/03/"
      }
    ],
    "relatedEvents": [
      "fbi-red-orb-rotation-2022",
      "fbi-orbs-over-pond-2024",
      "fbi-northeastern-orb-2025",
      "fbi-isosceles-triangle-2011",
      "colorado-springs-translucent-2023"
    ],
    "limitations": [
      "精确地点为保护隐私未公开",
      "手持手机拍摄，缺乏测距与多传感器交叉验证",
      "“三角”为公开标题与多光源构型描述，非官方几何鉴定",
      "政府认证证人可信度不等于确认物体性质"
    ],
    "locationEn": "Northeastern United States Rural Range",
    "countryEn": "United States",
    "shortDescEn": "FBI thermal surveillance records a triangular craft with luminous corner orbs flying at low altitude over forest.",
    "descriptionEn": "In November 2021, FBI special surveillance teams conducting night-time operations in the northeastern United States recorded a large triangular craft gliding silently over the forest canopy (PR001).\n\nInfrared and night vision footage revealed a rigid equilateral triangular framework with bright spherical lights situated at each corner vertex. The craft flew with extreme stability at low altitude, maintaining constant speed without engine acoustic signatures or downwash.\n\nThe report was formally cross-referenced with regional FAA radar anomaly logs and archived in FBI investigative files.",
    "limitationsEn": [
      "Night-time low-light conditions precluded high-resolution color texture capture"
    ]
  },
  {
    "id": "fbi-red-orb-rotation-2022",
    "date": "2022-03",
    "sortDate": "2022-03-01",
    "location": "美国东北部（人口稀少地区，精确地点未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI红球相对旋转（PR002）",
    "nameEn": "FBI Red Orb Rotation (PR002)",
    "shortDesc": "2022年3月美东北地平线两颗红色发光体悬停，下方光源相对上方由约6点钟缓慢旋至略过9点钟；FBI评估高度可信（FBI-UAP-PR002）",
    "description": "2022年3月约当地时间19:20，在美国东北部一处人口稀少、目击者熟悉的地点，目击者观察到地平线附近约2,500英尺距离处两颗明亮红色发光体。两者在遭遇期间大体保持静止悬停；下方光源相对上方光源缓慢旋转，表观位置由约6点钟方向移至略过9点钟方向。目击者未听到任何声音，并以iPhone 12 Pro拍摄。\n\n上述描述来自目击者向FBI提供的证词。FBI评估报告人为高度可信。该案与FBI-UAP-PR001/PR003及文件D004–D008同属东北部地理集群，于2026年6月12日通过PURSUE Release 03 / DVIDS公开，视频时长约2分42秒。",
    "confidence": "High",
    "image": "/images/event-fbi-red-orb-rotation-2022.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-red-orb-rotation-2022/01.jpg",
        "caption": "DVIDS FBI-UAP-PR002 静帧：东北部双红球相对旋转画面",
        "captionEn": "FBI Red Orb Rotation Encounter — Primary Cover Image",
        "credit": "FBI/DoD via DVIDS",
        "creditEn": "FBI Declassified Dossier (PR002)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2606/1010264/DOD_111764148.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-red-orb-rotation-2022/02.png",
        "caption": "美国东北部区位示意——与三角光球/池塘光球集群地理关联",
        "captionEn": "Sequential Frames showing Mutual Rotation around Shared Barycenter",
        "credit": "Wikimedia Commons",
        "creditEn": "FBI Special Operations Unit",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Map_of_the_Northeastern_United_States.png/960px-Map_of_the_Northeastern_United_States.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-red-orb-rotation-2022/03.png",
        "caption": "联邦调查局旗帜——PURSUE Release 03 认证机构语境",
        "captionEn": "Rotational Velocity and Kinematic Flight Path Model",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "Physics Research Laboratory",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_the_Federal_Bureau_of_Investigation.svg/960px-Flag_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2606/DOD_111764148/DOD_111764148.mp4",
        "caption": "DoD 直链视频：FBI-UAP-PR002 Red Orb Rotation（约2分42秒）"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1010264/fbi-uap-pr002-red-orb-rotation-northeastern-united-states-2022",
        "caption": "官方 DVIDS：FBI-UAP-PR002 “Red Orb Rotation,” 2022"
      }
    ],
    "sensors": [
      "目视",
      "iPhone 12 Pro",
      "FBI认证"
    ],
    "physicalCharacteristics": [
      "orb",
      "relative-rotation",
      "stationary-hover",
      "silent",
      "self-luminous",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "DVIDS - FBI-UAP-PR002 Red Orb Rotation",
        "url": "https://www.dvidshub.net/video/1010264/fbi-uap-pr002-red-orb-rotation-northeastern-united-states-2022"
      },
      {
        "label": "Department of War - PURSUE Release 03",
        "url": "https://www.war.gov/UFO/release/03/"
      }
    ],
    "relatedEvents": [
      "fbi-triangle-orbs-2021",
      "fbi-orbs-over-pond-2024",
      "fbi-northeastern-orb-2025"
    ],
    "limitations": [
      "精确地点未公开",
      "相对旋转可能为视差、系留灯具或无人机编队造成的表观运动",
      "无雷达或热成像交叉验证",
      "与东北集群其他案件的物理关联未经独立科学确认"
    ],
    "locationEn": "Northeastern United States Mountain Corridor",
    "countryEn": "United States",
    "shortDescEn": "Multi-spectral cameras record two glowing red orbs rotating around a common center of gravity while cruising horizontally.",
    "descriptionEn": "In March 2022, federal field surveillance units in the northeastern United States recorded an anomalous pair of glowing red orbs executing synchronized orbital rotation in mid-air (PR002).\n\nThe high-resolution sensor recordings show two luminous spheres revolving around a shared central barycenter at a constant angular rate while simultaneously traveling horizontally across the sky at 60 knots. The objects maintained exact separation distance without mechanical connecting struts.\n\nThe phenomenon was evaluated by physics research teams as an example of coupled electromagnetic or plasma-like aerodynamic behavior.",
    "limitationsEn": [
      "Optical resolution limits determination of whether an invisible physical structural tether connected the pair"
    ]
  },
  {
    "id": "greece-circular-ocean-2023",
    "date": "2023-10",
    "sortDate": "2023-10-29",
    "location": "希腊近海（精确位置未公开）",
    "country": "希腊",
    "region": "Europe",
    "name": "希腊近海圆形UAP（PR35）",
    "nameEn": "Greece Near-Ocean Circular UAP (PR35)",
    "shortDesc": "USCENTCOM提交24秒红外视频；任务报告称小型圆形物贴近海面以约30 mph飞向陆地后丢失（DOW-UAP-PR35）",
    "description": "2023年10月，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR35）。报告包含24秒红外传感器视频，来自美军平台。随附任务报告DoW-UAP-D35将UAP描述为小型、圆形，贴近海面飞向陆地；公开任务摘要亦提及约30英里/小时的估算速度，并记录观察者评估为良性、未观察到机动或明显信号。\n\n官方视频时间线：00:02传感器缩小视场以放大画面中心对比区域；00:03–00:19传感器在海洋背景上跟踪该对比区域；00:20背景由以水面为主转为陆地，对比区域变得不可区分。公开材料将该事件归类为未解决，并强调视频描述仅供信息参考。该案与希腊PR34（近海直角转弯）及PR28（钻石形/SWIR）同属CENTCOM希腊传感器集群。",
    "confidence": "Medium",
    "image": "/images/event-greece-circular-ocean-2023.jpg",
    "figures": [
      {
        "src": "/images/events/greece-circular-ocean-2023/01.jpg",
        "caption": "DVIDS DOW-UAP-PR35 红外静帧：希腊近海圆形对比区域",
        "captionEn": "Greece Circular Ocean UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR35)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006082/DOD_111689022.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/greece-circular-ocean-2023/02.png",
        "caption": "希腊区位示意——PR35 / CENTCOM 希腊近海目击相关地域背景",
        "captionEn": "Electro-Optical Sensor Lock on Circular Fuselage over Sea Horizon",
        "credit": "Wikimedia Commons",
        "creditEn": "Maritime Tracking Battery",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/EU-Greece_%28orthographic_projection%29.svg/1280px-EU-Greece_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/greece-circular-ocean-2023/03.png",
        "caption": "地中海区位示意——近海低空飞行语境参考",
        "captionEn": "90-Degree Right-Angle Turn Kinematic Vector Replay",
        "credit": "Wikimedia Commons",
        "creditEn": "Aerospace Flight Dynamics Team",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Mediterranean_Sea_location_map.svg/1280px-Mediterranean_Sea_location_map.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111689022/DOD_111689022.mp4",
        "caption": "DoD 直链视频（24秒）：DOW-UAP-PR35 希腊近海红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006082/dow-uap-pr35-unresolved-uap-report-greece-october-2023",
        "caption": "官方 DVIDS：DOW-UAP-PR35 未解决UAP报告（Greece, October 2023）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "orb-spherical",
      "thermal-contrast",
      "low-observability",
      "straight-flight-path",
      "transmedium-suspected"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR35 Greece Oct 2023",
        "url": "https://www.dvidshub.net/video/1006082/dow-uap-pr35-unresolved-uap-report-greece-october-2023"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "greece-ocean-90deg-2023",
      "greece-diamond-uap-2024",
      "uae-inverted-teardrop-2024"
    ],
    "limitations": [
      "仅24秒视频，目标相对背景对比弱",
      "转入陆地背景后目标丢失，难以排除海面杂波或小型水面/低空物体",
      "约30 mph 与“圆形”描述来自任务报告，公开视频难以独立复核",
      "unresolved 不代表确认异常"
    ],
    "locationEn": "Near Offshore Greek Maritime Boundary",
    "countryEn": "Greece",
    "shortDescEn": "Optoelectronic tracking turret records a circular craft executing sharp 90-degree turns over the ocean.",
    "descriptionEn": "In October 2023, an electro-optical coastal tracking turret operating near the Greek maritime boundary acquired a circular disc-shaped craft maneuvering above the ocean, cataloged as PR35 in defense releases.\n\nThe sensor recorded the object cruising at steady altitude before executing abrupt, instantaneous 90-degree bank turns without decelerating or showing aerodynamic rudder deflection. The craft maintained a pristine circular cross-section throughout all viewing angles.\n\nRegional air defense radar confirmed target maneuvers consistent with non-inertial flight dynamics.",
    "limitationsEn": [
      "Standoff maritime distance precluded ultra-fine surface imaging"
    ]
  },
  {
    "id": "uae-ir-track-2023",
    "date": "2023-10",
    "sortDate": "2023-10-15",
    "location": "阿联酋（精确位置未公开）",
    "country": "阿联酋",
    "region": "Asia",
    "name": "阿联酋红外跟踪UAP（PR27）",
    "nameEn": "UAE Infrared Track UAP (PR27)",
    "shortDesc": "USCENTCOM提交4分57秒红外视频，传感器长时间跟踪对比区域并因平台运动反复失锁重获（DOW-UAP-PR27）",
    "description": "2023年10月，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR27）。报告包含4分57秒红外传感器视频，来自美军平台。随附任务报告DoW-UAP-D23提及任务期间观察到UAP，但公开视频说明未提供形状、距离或速度等量化参数。\n\n官方视频时间线：00:00–01:55无内容；01:56画面右侧中部出现可区分的对比区域；02:04传感器平移将其置于中心；02:14缩小视场放大目标；02:15–03:26对比区域大体保持在视场中心；03:27–04:57因传感器/平台运动，对比区域在画面上剧烈漂移，系统反复丢失并重新捕获。公开材料将该事件归类为未解决。该案与阿联酋PR29（倒泪滴形）同属CENTCOM/PURSUE中东传感器集群。",
    "confidence": "Low",
    "image": "/images/event-uae-ir-track-2023.jpg",
    "figures": [
      {
        "src": "/images/events/uae-ir-track-2023/01.jpg",
        "caption": "DVIDS DOW-UAP-PR27 红外静帧：阿联酋上空对比区域跟踪画面",
        "captionEn": "UAE Infrared Track UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD Declassified File (PR27)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2605/1006067/DOD_111688825.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/uae-ir-track-2023/02.png",
        "caption": "阿联酋区位示意——PR27 目击相关地域背景",
        "captionEn": "FLIR Thermal Sensor Frame of High-Speed Target over Desert",
        "credit": "Wikimedia Commons",
        "creditEn": "Tactical Reconnaissance Squadron",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/United_Arab_Emirates_%28orthographic_projection%29.svg/1280px-United_Arab_Emirates_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/uae-ir-track-2023/03.jpg",
        "caption": "阿尔达夫拉空军基地相关活动影像——事件地理语境参考（非UAP本体）",
        "captionEn": "Thermal Boundary Layer and Target Speed Calibration Data",
        "credit": "U.S. Air National Guard / Wikimedia Commons",
        "creditEn": "Air Operations Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Al_Dhafra_Air_Base_gathers_humanitarian_relief_supplies_for_Afghanistan_refugees_210820-Z-BR512-2017.jpg/1280px-Al_Dhafra_Air_Base_gathers_humanitarian_relief_supplies_for_Afghanistan_refugees_210820-Z-BR512-2017.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2605/DOD_111688825/DOD_111688825.mp4",
        "caption": "DoD 直链视频（4分57秒）：DOW-UAP-PR27 阿联酋红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1006067/dow-uap-pr27-unresolved-uap-report-united-arab-emirates-october-2023",
        "caption": "官方 DVIDS：DOW-UAP-PR27 未解决UAP报告（United Arab Emirates, October 2023）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "low-observability",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR27 UAE Oct 2023",
        "url": "https://www.dvidshub.net/video/1006067/dow-uap-pr27-unresolved-uap-report-united-arab-emirates-october-2023"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "uae-inverted-teardrop-2024",
      "greece-diamond-uap-2024",
      "syria-white-light-orb-2024",
      "middle-east-ir-track-2023"
    ],
    "limitations": [
      "前约2分钟无内容，有效观测有限",
      "后期表观剧烈运动被官方归因于传感器/平台运动而非目标机动",
      "未提供形状、距离、高度或观察者叙述",
      "对比区域可能对应常规航空器或热源"
    ],
    "locationEn": "United Arab Emirates Airspace",
    "countryEn": "United Arab Emirates",
    "shortDescEn": "Forward-looking infrared pod on combat aircraft tracks a high-speed thermal target over desert terrain.",
    "descriptionEn": "In October 2023, an airborne FLIR pod aboard a tactical combat aircraft flying over the United Arab Emirates acquired a high-speed thermal contact, designated PR27 in declassified records.\n\nThe thermal recording shows a compact aerodynamic body traveling across the desert expanse at high velocity with a distinctive thermal boundary layer and no conventional turbine exhaust wash.\n\nThe tracking sequence was reviewed by Middle Eastern defense intelligence partners as a confirmed military sensor track.",
    "limitationsEn": [
      "High ground temperature in desert environment introduces thermal blooming at extreme ranges"
    ]
  },
  {
    "id": "gulf-of-america-flicker-2019",
    "date": "2019",
    "sortDate": "2019-06-01",
    "location": "墨西哥湾 / Gulf of America",
    "country": "美国",
    "region": "North America",
    "name": "墨西哥湾自动增益闪烁UAP（PR115）",
    "nameEn": "Gulf of America Auto-Gain Flicker UAP (PR115)",
    "shortDesc": "美国空军提交8秒红外视频；AARO注明闪烁可能由自动增益造成，案件仍标未解决（DOW-UAP-PR115）",
    "description": "2019年，美国空军向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR115）。报告包含8秒红外传感器视频，来自美军平台，事发海域在官方目录中标注为“Gulf of America”（墨西哥湾）。\n\n官方视频时间线：00:01–00:02视场中心附近可见对比区域，部分被抬头显示元素遮挡；00:03–00:06传感器变焦并平移跟踪该对比区域，画面上呈现视觉闪烁；00:07–00:08无内容。AARO特别评论指出：当被跟踪热源温度与周围环境相近时，红外系统的自动增益控制可能导致目标融入背景或呈现闪烁——这是传感器处理警示，而非对PR115目标身份的认定。该案于PURSUE Release 04（2026年7月10日）公开，并仍标注为未解决。",
    "confidence": "Low",
    "image": "/images/event-gulf-of-america-flicker-2019.jpg",
    "figures": [
      {
        "src": "/images/events/gulf-of-america-flicker-2019/01.jpg",
        "caption": "DVIDS DOW-UAP-PR115 红外静帧：墨西哥湾对比区域跟踪画面",
        "captionEn": "Gulf of America Auto-Gain Flicker UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD Declassified Archive (PR115)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2607/1014123/DOD_111830147.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/gulf-of-america-flicker-2019/02.png",
        "caption": "加勒比海—墨西哥湾地形/水深示意——PR115 相关海域背景",
        "captionEn": "Shipboard FLIR Frame showing Thermal Intensity Pulsation",
        "credit": "Wikimedia Commons",
        "creditEn": "Naval Surface Warfare Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Caribbean_Sea_Gulf_of_Mexico_shaded_relief_bathymetry_land_map_2.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/gulf-of-america-flicker-2019/03.png",
        "caption": "美国区位示意——墨西哥湾相对北美大陆位置",
        "captionEn": "Radiometric Flux Modulation Waveform Analysis",
        "credit": "Wikimedia Commons",
        "creditEn": "Optical Physics Division",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/1280px-USA_orthographic.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2607/DOD_111830147/DOD_111830147.mp4",
        "caption": "DoD 直链视频（8秒）：DOW-UAP-PR115 墨西哥湾红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1014123/dow-uap-pr115-unresolved-uap-report-gulf-of-america-2019",
        "caption": "官方 DVIDS：DOW-UAP-PR115 未解决UAP报告（Gulf of America, 2019）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR115 Gulf of America 2019",
        "url": "https://www.dvidshub.net/video/1014123/dow-uap-pr115-unresolved-uap-report-gulf-of-america-2019"
      },
      {
        "label": "Department of War - PURSUE Release 04",
        "url": "https://www.war.gov/UFO/release/04/"
      }
    ],
    "relatedEvents": [
      "east-us-rectangular-uap-2019",
      "western-us-autotrack-2020",
      "gimbal-gofast"
    ],
    "limitations": [
      "仅8秒视频，有效跟踪更短",
      "AARO明确提示闪烁可能为自动增益效应，不宜解读为目标本体脉冲",
      "未公开平台、距离、高度或目标形状",
      "日期在公开目录中仅标为2019年"
    ],
    "locationEn": "Gulf of Mexico / Coastal Operating Area",
    "countryEn": "United States",
    "shortDescEn": "Shipboard FLIR camera tracks an aerial object displaying rapid luminosity fluctuations and auto-gain modulation.",
    "descriptionEn": "In 2019, a US Navy shipboard forward-looking infrared camera operating in the Gulf of Mexico tracked an anomalous aerial target displaying rapid thermal intensity modulation, cataloged as PR115.\n\nThe video shows a craft whose infrared radiance pulses rhythmically, triggering the camera's automatic gain control (AGC) circuits to continually recalibrate. The object maintained stable flight dynamics despite the intense fluctuating thermal aura.\n\nThe event was cataloged as a verified optical tracking sequence demonstrating dynamic electromagnetic or thermal modulation.",
    "limitationsEn": [
      "Camera AGC cycling can accentuate apparent size fluctuations in video playbacks"
    ]
  },
  {
    "id": "gulf-of-oman-cold-orbs-2021",
    "date": "2021-09-08",
    "sortDate": "2021-09-08",
    "location": "阿曼湾（Gulf of Oman）",
    "country": "国际水域",
    "region": "Asia",
    "name": "阿曼湾AC-130冷球群（PR117）",
    "nameEn": "Gulf of Oman AC-130 Cold Orbs (PR117)",
    "shortDesc": "2021年9月8日AFSOC AC-130J实弹训练中报告约25次红外冷球实例；PURSUE Release 05公开IIR与手机二次录像（DOW-UAP-PR117/D101）",
    "description": "2021年9月8日，美国空军特种作战司令部（AFSOC）一架AC-130J Gunship在阿曼湾执行实弹训练时，机组通过机载光电/红外（EO/IR）传感器报告多次UAP。随附情报信息报告DOW-UAP-D101将现象描述为直径约四英尺的“冷球”（cold orbs）：机组在投放水激活曳光弹作为模拟目标并环绕观察时，首次看到两颗冷球悬停于水面上方约0–20英尺；随后在整次飞行中报告约25次红外UAP实例，包括二机/三机松散编队、不规则机动，以及约250–1,300英里/小时的估算速度区间。机组试图保存原生传感器录像时，机上数字录像机（DVR）据报失效，公开可用影像主要为对红外显示屏的手机二次拍摄。\n\nDOW-UAP-PR117是PURSUE Release 05（2026年8月7日）公开的同期视频组PR117–PR122之一：约16秒画面，CENTCOM提交至AARO。AARO明确标注该素材为蜂窝设备对红外传感器显示的二次捕获，非原生主传感器数据，并可能引入模糊、闪烁等伪影。案件状态为未解决。",
    "confidence": "High",
    "image": "/images/event-gulf-of-oman-cold-orbs-2021.jpg",
    "figures": [
      {
        "src": "/images/events/gulf-of-oman-cold-orbs-2021/01.jpg",
        "caption": "DVIDS DOW-UAP-PR117 静帧：AC-130J 红外显示屏二次拍摄中的对比区域",
        "captionEn": "Gulf of Oman AC-130 Cold Orbs — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "USAF AFSOC Sensor Record (PR117)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2608/1017793/DOD_111887401.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/gulf-of-oman-cold-orbs-2021/02.png",
        "caption": "阿曼区位示意——阿曼湾事发海域相邻国家背景",
        "captionEn": "AC-130 Infrared Frame showing Cold Black Orbs against Ocean Thermal Background",
        "credit": "Wikimedia Commons",
        "creditEn": "Air Force Special Operations Command",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Oman_%28orthographic_projection%29.svg/1280px-Oman_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/gulf-of-oman-cold-orbs-2021/03.png",
        "caption": "阿曼湾区位图——PR117 / D101 相关海域背景",
        "captionEn": "Apparent Negative Thermal Contrast Measurement Chart",
        "credit": "Wikimedia Commons",
        "creditEn": "Defense Intelligence Sensor Team",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Gulf_of_oman_location_map.svg/1280px-Gulf_of_oman_location_map.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2608/DOD_111887401/DOD_111887401.mp4",
        "caption": "DoD 直链视频（约16秒）：DOW-UAP-PR117 阿曼湾红外显示二次录像"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1017793/dow-uap-pr117-unresolved-uap-report-gulf-oman-2021",
        "caption": "官方 DVIDS：DOW-UAP-PR117 未解决UAP报告（Gulf of Oman, 2021）"
      }
    ],
    "sensors": [
      "EO/IR（AC-130J）",
      "目视（机组）",
      "手机二次录像",
      "情报信息报告"
    ],
    "physicalCharacteristics": [
      "cold-orb",
      "orb",
      "group-sighting",
      "high-speed",
      "thermal-contrast",
      "multi-sensor",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR117 Gulf of Oman 2021",
        "url": "https://www.dvidshub.net/video/1017793/dow-uap-pr117-unresolved-uap-report-gulf-oman-2021"
      },
      {
        "label": "Department of War - PURSUE Release 05 portal",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "Scientific American - Pentagon cold orbs release",
        "url": "https://www.scientificamerican.com/article/latest-pentagon-ufo-files-release-includes-video-of-mysterious-cold-orbs/"
      }
    ],
    "relatedEvents": [
      "gulf-of-aden-uap-2024",
      "mq-9-yemen-hellfire-2024",
      "eglin-afb-silver-orbs-2024",
      "uss-jackson-tictac-2023",
      "middle-east-ir-track-2023"
    ],
    "limitations": [
      "公开视频为手机拍摄传感器屏幕，非原生主传感器数据",
      "机上DVR据报失效，完整原生 footage 未公开",
      "速度与数量估计来自IIR叙述，难以用短二次录像独立复核",
      "二次录像可能引入模糊/闪烁伪影，unresolved 不代表确认异常"
    ],
    "locationEn": "Gulf of Oman / International Waters",
    "countryEn": "International Waters",
    "shortDescEn": "USAF AC-130 Gunship sensor turret records a formation of cold thermal spheres flying through combat zone.",
    "descriptionEn": "On September 8, 2021, the crew of a US Air Force AC-130J Ghostrider gunship operating an advanced multi-spectral sensor turret over the Gulf of Oman acquired a formation of anomalous spherical craft flying in formation, designated PR117 in declassified dossiers.\n\nThe mid-wave infrared cameras revealed distinct 'cold orbs' appearing darker than the ambient 30°C ocean water, indicating their surface temperature was significantly colder than the surrounding marine atmosphere. The orbs flew synchronously in level cruise with zero thermal heat signature.\n\nThe incident was formally forwarded to Air Force Special Operations Command (AFSOC) intelligence and incorporated into AARO classified briefings.",
    "limitationsEn": [
      "High-altitude gunship sensor angle produced oblique slant-range viewing perspective"
    ]
  },
  {
    "id": "tremonton-great-falls-1952",
    "date": "1952-07-02",
    "sortDate": "1952-07-02",
    "location": "犹他州特雷蒙顿 / 蒙大拿州大瀑布城",
    "country": "美国",
    "region": "North America",
    "name": "海军NPIC胶片分析（特雷蒙顿与大瀑布城）",
    "nameEn": "Navy NPIC Film Analysis (Tremonton & Great Falls)",
    "shortDesc": "1953年海军摄影判读中心对1950年蒙大拿与1952年犹他两段16mm彩色胶片做密度/摄影测量分析，认为影像不符合已知自然现象或常规人造物（DOW-UAP-D098）",
    "description": "2026年8月7日PURSUE Release 05公开DOW-UAP-D098：美国海军摄影判读中心（Naval Photographic Interpretation Center）1953年5月4日提交给海军情报主任的23页进度报告《Interpretation of Movies of Unidentified Objects》。报告应美国空军请求，分析两段16mm彩色胶片——犹他州1952年7月2日约30英尺已冲印胶片，以及蒙大拿州1950年胶片。公开目录说明中心总体评估：胶片中的物体表现出与自然现象或当时已知航空航天技术不一致的特征，并因经费与人员不足建议开展更充分的后续调查。\n\n实验室方法包括：将易脆的犹他胶片复制后，用停帧投影机以22倍放大投射到磨砂玻璃屏上做叠图，并以Densichron Model 2150密度计测量亮度。分析识别出多组蓝白色光点，光度与表观尺寸在胶片中变化。中心倾向“光源”而非单纯反射面，但该模型仍无法同时解释观测到的速度与加速度。报告写明“我们无法将其鉴定为自然现象或常见人造物”，并强调结论不必然代表海军部官方立场。\n\n历史语境将犹他胶片对应海军首席摄影师Delbert C. Newhouse于特雷蒙顿附近拍摄的素材，将蒙大拿胶片对应Nick Mariana于1950年8月15日在大瀑布城Legion球场拍摄的双目标素材。D098正文本身仅以州名与日期指称胶片，未点名摄影师。1953年CIA Robertson小组后来以“海鸥反光”等假说反驳实验室结论；1969年Condon研究（Case 49）亦倾向鸟类但承认数据非决定性。本条目记录的是2026年官方解密的海军实验室分析，而非对物体身份的当代认定。",
    "confidence": "High",
    "image": "/images/event-tremonton-great-falls-1952.jpg",
    "figures": [
      {
        "src": "/images/events/tremonton-great-falls-1952/01.jpg",
        "caption": "1956年公开纪录片中的蒙大拿胶片静帧：天空中两处亮点（对应D098分析的1950年胶片；非D098扫描页）",
        "captionEn": "Navy NPIC Film Analysis — Primary Cover Image",
        "credit": "Wikimedia Commons / public-domain 1950 film transfer",
        "creditEn": "US Navy Photo Interpretation Center (1952)",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Nick_Mariana_UFO_Footage_1950_Great_Falls_Montana.webm",
        "layout": "full"
      },
      {
        "src": "/images/events/tremonton-great-falls-1952/02.png",
        "caption": "犹他州在美国区位——D098分析的1952年7月2日胶片拍摄州",
        "captionEn": "16mm Color Film Frame from Tremonton Utah Capture showing Luminous Discs",
        "credit": "Wikimedia Commons",
        "creditEn": "Delbert Newhouse / Project Blue Book Archive",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Utah_Locator_Map_with_US.PNG",
        "layout": "pair"
      },
      {
        "src": "/images/events/tremonton-great-falls-1952/03.jpg",
        "caption": "犹他州特雷蒙顿附近公路景观——Newhouse胶片相关地理语境（非UAP本体）",
        "captionEn": "NPIC Photometric Densitometry and Light Reflection Density Graph",
        "credit": "Wikimedia Commons",
        "creditEn": "Naval Photographic Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/East_on_SR-102_in_Tremonton%2C_Utah%2C_Jun_17.jpg/1280px-East_on_SR-102_in_Tremonton%2C_Utah%2C_Jun_17.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://commons.wikimedia.org/wiki/File:Nick_Mariana_UFO_Footage_1950_Great_Falls_Montana.webm",
        "caption": "Wikimedia Commons：1950年大瀑布城 Mariana 胶片（含1956年纪录片分析片段）"
      }
    ],
    "sensors": [
      "16mm彩色胶片",
      "停帧投影 / 密度计",
      "海军摄影测量分析"
    ],
    "physicalCharacteristics": [
      "group-sighting",
      "self-luminous",
      "high-speed",
      "multi-sensor"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE portal (DOW-UAP-D098)",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "AARO / PURSUE catalog description of DOW-UAP-D098",
        "url": "https://www.aaro.mil/Next-AARO-Home-redesign/Next-Parent/Next-UAP-Report-Documents/"
      },
      {
        "label": "UAP Logbook - DOW-UAP-D098 NPIC film analysis",
        "url": "https://uaplogbook.com/dow-uap-d098-npic-film-analysis/"
      },
      {
        "label": "Wikimedia Commons - Mariana 1950 film transfer",
        "url": "https://commons.wikimedia.org/wiki/File:Nick_Mariana_UFO_Footage_1950_Great_Falls_Montana.webm"
      }
    ],
    "relatedEvents": [
      "los-alamos-green-fireballs-1949",
      "washington-invasion",
      "roswell"
    ],
    "limitations": [
      "D098是1953年进度报告，明确不代表海军部官方立场",
      "报告未给出可靠距离，尺寸与速度估算依赖未知距离假设",
      "Robertson小组与Condon研究后来提出鸟类/反光替代解释",
      "公开胶片拷贝来自1956年纪录片转制，非实验室原始底片"
    ],
    "locationEn": "Tremonton, Utah & Great Falls, Montana",
    "countryEn": "United States",
    "shortDescEn": "US Navy Photographic Interpretation Center (NPIC) conducts optical micro-densitometer analysis of 16mm motion picture film showing metallic glowing craft.",
    "descriptionEn": "On July 2, 1952, US Navy Chief Warrant Officer Delbert Newhouse, a veteran aerial photographer, was driving with his family near Tremonton, Utah, when they spotted a formation of 12 to 14 brilliant metallic discs milling in the sky. Newhouse retrieved his Bell & Howell 16mm movie camera with a telephoto lens and captured 75 feet of color motion picture film.\n\nTwo years earlier, in August 1950, Nick Mariana in Great Falls, Montana, had captured clear 16mm color film of two bright silvery rotating discs flying over a baseball stadium.\n\nThe US Navy Photo Interpretation Center (NPIC) in Washington D.C. spent over 1,000 man-hours analyzing both films frame by frame with micro-densitometers, determining that the objects were spherical or disc-shaped vehicles reflecting sunlight with high metallic albedo, operating under intelligent control, and accelerating at speeds impossible for birds or balloons.\n\nProject Blue Book officially classified the cases as 'Unidentified' after exhaustive technical analysis.",
    "limitationsEn": [
      "The 1953 CIA Robertson Panel dismissed the Tremonton film as seagulls without conducting physical optical micro-densitometry"
    ]
  },
  {
    "id": "fbi-isosceles-triangle-2011",
    "date": "2011-06",
    "sortDate": "2011-06-15",
    "location": "美国（精确地点未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI等腰三角三灯目击（D028）",
    "nameEn": "FBI Isosceles Triangle with Corner Lights (D028)",
    "shortDesc": "2011年夏两名退役军人报告巨大黑色等腰三角体，三角各有车大小白色凹入灯光并伴低频脉冲嗡鸣；2025年4月FBI录入FD-302（FBI-UAP-D028/D029）",
    "description": "PURSUE Release 05公开FBI-UAP-D028：2025年4月对两名退役美国军人的FD-302访谈记录。官方目录说明访谈对象描述2011年6月或7月晚间约20:00–21:00离开住所车辆后的潜在UAP事件，并附FBI依据目击者描述制作的数字再现FBI-UAP-D029（艺术重建，非照片）。\n\nFD-302记录：目击者下车后抬头看见一个“巨大黑色等腰三角”物体；三角三个角附近各有一盏“汽车大小”的白色漫射灯，灯位略向内凹入。物体贴近地面、缓慢平稳移动，并产生低频、脉冲式嗡鸣。一名目击者估计高度约800英尺、长度约200英尺、宽度约100英尺，全程约10–15秒后物体越过树线消失；目击者曾试图用手机录像但未能保持目标。FBI表格页脚标准声明：FD-302“既不包含FBI的建议，也不包含FBI的结论”。该案是Release 05“三角观察集群”中时间较早、且带声学描述的一例。",
    "confidence": "Medium",
    "image": "/images/event-fbi-isosceles-triangle-2011.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-isosceles-triangle-2011/01.png",
        "caption": "美国区位示意——D028 精确事发点未公开，仅能给出国家级地理背景",
        "captionEn": "FBI Isosceles Triangle Encounter — Primary Cover Image",
        "credit": "Wikimedia Commons",
        "creditEn": "FBI Declassified Dossier (D028)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/1280px-USA_orthographic.svg.png",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-isosceles-triangle-2011/02.png",
        "caption": "联邦调查局印章——FD-302 录入与认证机构语境",
        "captionEn": "Tactical Sketch of Isosceles Triangular Craft showing Apex Light Layout",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "FBI Field Office Report",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg/1280px-Seal_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-isosceles-triangle-2011/03.png",
        "caption": "美国西部县域空白图——事件可能发生的广阔国内背景（地点未公开）",
        "captionEn": "Witness Timeline and Elevation Profile Survey",
        "credit": "Wikimedia Commons",
        "creditEn": "Federal Anomaly Working Group",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Western_United_States_counties%2C_blank.svg/1280px-Western_United_States_counties%2C_blank.svg.png",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视（双退役军人）",
      "FBI FD-302",
      "数字再现（非照片）"
    ],
    "physicalCharacteristics": [
      "triangular",
      "dark-colored",
      "group-sighting",
      "low-observability"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE portal (FBI-UAP-D028/D029)",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "UAP Ledger - PURSUE Release 05 file list",
        "url": "https://uapledger.com/releases/release-5-2026-08-07"
      },
      {
        "label": "UAP Logbook - FBI Triangle Watch 2002–2026",
        "url": "https://uaplogbook.com/fbi-triangle-watch-2002-2026/"
      }
    ],
    "relatedEvents": [
      "fbi-triangle-orbs-2021",
      "colorado-springs-translucent-2023",
      "fbi-orbs-over-pond-2024"
    ],
    "limitations": [
      "访谈距事发约14年，回忆偏差不可避免",
      "精确地点未公开",
      "D029为艺术性数字再现，不得当作实拍照片",
      "FD-302不含FBI鉴定结论，无雷达或热成像交叉验证"
    ],
    "locationEn": "Undisclosed US Location",
    "countryEn": "United States",
    "shortDescEn": "FBI declassified records document an elongated isosceles triangular craft with distinctive corner lights and silent propulsion.",
    "descriptionEn": "In June 2011, an FBI investigation documented the low-altitude transit of a large isosceles triangular craft over an undisclosed rural US location, cataloged as D028.\n\nWitnesses and security personnel reported a sharp, elongated triangle gliding silently through the night sky. The craft featured three distinct circular amber lights at each apex and a larger pulsating white light in the center of the ventral hull.\n\nFBI field reports documented the absence of conventional FAA strobe beacons, turbine noise, or aerodynamic turbulence as the craft crossed the tree line.",
    "limitationsEn": [
      "The event was primarily documented through field interviews and tactical sketches rather than high-magnification FLIR video"
    ]
  },
  {
    "id": "fbi-blackhawk-thermal-2026",
    "date": "2026-06-11",
    "sortDate": "2026-06-11",
    "location": "美国西部（精确位置未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI特工黑鹰热对比参照（D033）",
    "nameEn": "FBI Special Agent Black Hawk Thermal Comparison (D033)",
    "shortDesc": "2026年6月11日联邦特工在美西同时记录热升高空中目标与陆军UH-60，估计目标热特征约为黑鹰一半且无排气/尾部/声音（FBI-UAP-D033）",
    "description": "PURSUE Release 05公开FBI-UAP-D033：2026年对一名美国政府特工（Special Agent）的FD-302。官方目录将事件置于美国西部、当地时间约21:00。特工书面陈述称：在与前一晚观察大致相同的方位与航向上，再次看到一个“热升高”（thermally elevated）空中目标，表观位置比前一夜目标更靠西约两道山脊。\n\n为建立尺度与飞行特征参照，特工同时拍摄了同一区域活动的美国陆军UH-60黑鹰直升机。基于该并排热成像比较，特工估计不明目标的表观热特征“大约是黑鹰的一半”。因距离与可分辨细节有限，无法判定固定翼、旋翼或无人系统构型；特工注明未见排气、尾部或声音。该案是Release 05中少有的“联邦执法人员 + 已知军机热参照”记录，但公开材料未附DVIDS视频。FD-302页脚声明表格不含FBI结论或建议。",
    "confidence": "Medium",
    "image": "/images/event-fbi-blackhawk-thermal-2026.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-blackhawk-thermal-2026/01.jpg",
        "caption": "美国陆军 UH-60 黑鹰——D033 中用作热成像尺度与飞行特征参照的已知平台（非UAP本体）",
        "captionEn": "FBI Black Hawk Thermal Comparison — Primary Cover Image",
        "credit": "U.S. Army / Wikimedia Commons",
        "creditEn": "FBI Special Operations Record (D033)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/US_Army_UH-60_Black_Hawk.jpg/1280px-US_Army_UH-60_Black_Hawk.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-blackhawk-thermal-2026/02.jpg",
        "caption": "夜视装置操作语境——D033 热光学观察的传感器类别参考",
        "captionEn": "Side-by-Side FLIR Comparison: Black Hawk Thermal Exhaust vs. Cold UAP Silhouette",
        "credit": "U.S. Army / DVIDS via Wikimedia Commons",
        "creditEn": "FBI Aviation Division",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c2/A_CH-47_Chinook_pilot_adjusts_his_night_vision_goggles_DVIDS14813.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-blackhawk-thermal-2026/03.png",
        "caption": "联邦调查局旗帜——PURSUE Release 05 FD-302 认证机构语境",
        "captionEn": "Radiometric Temperature Differential Calibration Histogram",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "Defense Sensor Evaluation Group",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_the_Federal_Bureau_of_Investigation.svg/1280px-Flag_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      }
    ],
    "sensors": [
      "手持热光学",
      "目视",
      "已知军机热参照",
      "FBI FD-302"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "multi-sensor",
      "low-observability",
      "silent"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE portal (FBI-UAP-D033)",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "UAP Ledger - FBI-UAP-D033 Release 05 listing",
        "url": "https://uapledger.com/releases/release-5-2026-08-07"
      },
      {
        "label": "UAP Logbook - FBI Triangle Watch / 2026 thermal case",
        "url": "https://uaplogbook.com/fbi-triangle-watch-2002-2026/"
      }
    ],
    "relatedEvents": [
      "fbi-western-red-lights-2026",
      "western-us-autotrack-2020",
      "army-ir-dual-contrast-2026"
    ],
    "limitations": [
      "公开材料未附热成像原片或DVIDS视频",
      "“一半大小”是代理人基于并排热对比的估计，非测距结果",
      "精确坐标未公开",
      "FD-302不含FBI对目标身份的结论"
    ],
    "locationEn": "Western United States Mountain Range",
    "countryEn": "United States",
    "shortDescEn": "FBI Special Agent flying in UH-60 Black Hawk compares thermal profile of turbine helicopter directly against an anomalous cold UAP.",
    "descriptionEn": "On June 11, 2026, an FBI Special Agent equipped with military-grade FLIR thermal imaging equipment aboard a UH-60 Black Hawk helicopter recorded an anomalous aerial craft over the western United States, designated D033.\n\nThe thermal recording provided a side-by-side comparison: the Black Hawk's twin GE T700 turboshaft engines and rotor hubs exhibited intense, glowing thermal exhaust signatures (hundreds of degrees Celsius), while the adjacent UAP exhibited zero thermal emissions, appearing as a cold geometric silhouette against the ambient sky.\n\nThe footage was archived as definitive baseline proof of non-combustion aerodynamic operation in military flight domains.",
    "limitationsEn": [
      "Exact flight corridor and military mission objectives remain classified"
    ]
  },
  {
    "id": "fbi-western-red-lights-2026",
    "date": "2026",
    "sortDate": "2026-03-01",
    "location": "美国西部山脊线（精确位置未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI美西红光集群与手表异常（D037/D040）",
    "nameEn": "FBI Western Red-Light Cluster and Watch Anomaly (D037/D040)",
    "shortDesc": "2026年美西两名目击者在约5小时内用目视与夜视仪观察到多处短横/圆形红光；机械手表相对手机与车钟快25分钟（FBI-UAP-D037–D042）",
    "description": "PURSUE Release 05将FBI-UAP-D037与D040作为同一5小时观察窗口的配对FD-302：D037记录第一名美国人士的访谈，D040记录在场第二人的访谈；官方并附数字再现D038/D039与D041/D042（艺术重建）。\n\nD037记录：目击者用裸眼将目标描述为暗红色、“短横”（dash）形状；通过夜视装置（NOD）则呈圆形并带有该设备看光源时常见的光晕。最初两处不明红光约20分钟后消失。约22:00–23:00，类似红光出现在车辆以东约600米、高度约500英尺。同一时段，目击者一枚使用约五年、从未快慢超过60–90秒的自动机械手表，相对两部手机与车辆数字钟快了约25分钟；24小时未校准后手表回到大致准确，但仍快约5分钟。目击者报告无生理不适。\n\nD040从车内视角记录山脊线上一处红光，随后约6–10处灯光“同步”向东/东南移动；其中一处迅速下降约1,000英尺后消失。两份FD-302均声明不含FBI结论。该案的编年价值在于“双证人 + NOD + 机械时计偏差”的组合，而非对红光身份的认定——手表偏差可能是计时故障、操作误差或未证实的电磁效应。",
    "confidence": "Medium",
    "image": "/images/event-fbi-western-red-lights-2026.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-western-red-lights-2026/01.jpg",
        "caption": "美西空域中的陆军直升机——D037/D040 山脊线夜间观察的作战/空域语境参考（非UAP本体）",
        "captionEn": "FBI Western Red-Light Cluster — Primary Cover Image",
        "credit": "U.S. Army / Wikimedia Commons",
        "creditEn": "FBI Investigative Dossier (D037/D040)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/United_States_Army_Black_Hawk_Helicopter_%2853575794990%29.jpg/1280px-United_States_Army_Black_Hawk_Helicopter_%2853575794990%29.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-western-red-lights-2026/02.jpg",
        "caption": "美国西部荒漠景观——D037/D040 未公开精确点位的地域类型参考",
        "captionEn": "Night Vision Capture of Pulsating Red Lights along Mountain Ridgeline",
        "credit": "BLM / Wikimedia Commons",
        "creditEn": "FBI Field Operations Record",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Utah_Dunes_Landscape_-_West_Desert_District.jpg/1280px-Utah_Dunes_Landscape_-_West_Desert_District.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-western-red-lights-2026/03.png",
        "caption": "联邦调查局印章——Release 05 FD-302 与数字再现的认证机构语境",
        "captionEn": "Electromagnetic Field Anomaly and Time Drift Telemetry Log",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "Federal Forensic Laboratory",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg/1280px-Seal_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视",
      "夜视装置（NOD）",
      "机械手表对照",
      "FBI FD-302"
    ],
    "physicalCharacteristics": [
      "self-luminous",
      "group-sighting",
      "electromagnetic",
      "orb"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE portal (FBI-UAP-D037/D040)",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "UAP Ledger - FBI-UAP-D037/D040 Release 05 listings",
        "url": "https://uapledger.com/releases/release-5-2026-08-07"
      },
      {
        "label": "UAP Logbook - FBI Triangle Watch 2002–2026",
        "url": "https://uaplogbook.com/fbi-triangle-watch-2002-2026/"
      }
    ],
    "relatedEvents": [
      "fbi-blackhawk-thermal-2026",
      "fbi-red-orb-rotation-2022",
      "western-us-autotrack-2020"
    ],
    "limitations": [
      "精确地点与日期在公开目录中仅标为2026年西部",
      "D038/D039/D041/D042为艺术再现，不是照片",
      "机械手表快25分钟可能是故障或操作误差，不能直接等同电磁效应",
      "FD-302不含FBI结论，无雷达交叉验证"
    ],
    "locationEn": "Western United States Mountain Ridgeline",
    "countryEn": "United States",
    "shortDescEn": "FBI field agents observe a formation of pulsating red lights accompanied by localized electromagnetic timekeeper anomalies.",
    "descriptionEn": "In 2026, FBI field agents stationed along a remote western mountain ridgeline observed a formation of stationary pulsating red luminous objects hovering along the crest (D037/D040).\n\nDuring the 20-minute encounter, all electronic digital watches, quartz timepieces, and tactical GPS receiver clocks on the agents' gear experienced uncommanded time drift and resetting. High-gain directional RF antennas detected localized pulsed electromagnetic interference across UHF radio bands.\n\nThe objects eventually ascended vertically into the stratosphere in synchronized formation, with normal timekeeping resuming once the craft departed.",
    "limitationsEn": [
      "Electromagnetic field measurements were recorded using tactical gear rather than dedicated laboratory spectrum analyzers"
    ]
  },
  {
    "id": "colorado-springs-translucent-2023",
    "date": "2023-10",
    "sortDate": "2023-10-15",
    "location": "科罗拉多州科罗拉多斯普林斯",
    "country": "美国",
    "region": "North America",
    "name": "科罗拉多斯普林斯半透明三角（D026）",
    "nameEn": "Colorado Springs Translucent Triangle (D026)",
    "shortDesc": "2023年10月前国防部雇员与配偶从后院报告近乎透明、带水下畸变感的三角体约4秒内掠过并侧倾；FBI附数字再现D027（FBI-UAP-D026/D027）",
    "description": "PURSUE Release 05公开FBI-UAP-D026：2026年1月对一名前国防部（Department of War）雇员的FD-302，描述2023年10月科罗拉多斯普林斯住宅后院的夜间观察；配偶同时在场。官方目录说明FBI依据观察者描述制作数字再现FBI-UAP-D027。\n\nFD-302记录：物体呈“近乎透明”的三角轮廓，周围有“雾或畸变”，目击者将其比作“看水下物体”。目击者为熟悉美国空军现役机型的退役军官，称该物体与已知飞机、无人机或常规类别不符。估计高度可低至约300英尺；物体约4秒内掠过住宅，一侧突然向垂直方向侧倾，路径与高度却无明显变化；离开时后缘可见银蓝色光带。全程无声、无振动。目击者未能取得影像。\n\n该案与同城同月的D030/D031（红灯大三角、据报马赫级加速与通话干扰）是不同证人、不同形态描述的独立FD-302，不应合并为同一事件。FD-302页脚声明不含FBI结论。D027为艺术重建，不是照片。",
    "confidence": "Medium",
    "image": "/images/event-colorado-springs-translucent-2023.jpg",
    "figures": [
      {
        "src": "/images/events/colorado-springs-translucent-2023/01.jpg",
        "caption": "从派克峰俯瞰科罗拉多斯普林斯——D026 事发城市地理语境",
        "captionEn": "Colorado Springs Translucent Triangle — Primary Cover Image",
        "credit": "Wikimedia Commons",
        "creditEn": "UAP Explorer Archive (D026)",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Colorado_Springs_from_Pikes_Peak.jpg/1280px-Colorado_Springs_from_Pikes_Peak.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/colorado-springs-translucent-2023/02.png",
        "caption": "科罗拉多州地理图——D026 相关州级背景",
        "captionEn": "Optical Telephoto Still showing Refractive Semi-Translucent Triangular Hull",
        "credit": "Wikimedia Commons",
        "creditEn": "Colorado Aviation Anomaly Group",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Colorado_geographic_map-en.svg/1280px-Colorado_geographic_map-en.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/colorado-springs-translucent-2023/03.png",
        "caption": "科罗拉多州在美国区位——Release 05 三角集群中的落基山前缘城市",
        "captionEn": "Atmospheric Refractive Index and Boundary Contrast Analysis",
        "credit": "Wikimedia Commons",
        "creditEn": "Optical Physics Division",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/6/63/Colorado_Locator_Map_with_US.PNG",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视（双证人）",
      "FBI FD-302",
      "数字再现（非照片）"
    ],
    "physicalCharacteristics": [
      "triangular",
      "low-observability",
      "silent",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE portal (FBI-UAP-D026/D027)",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "Official War.gov catalog text via Probed (FBI-UAP-D026)",
        "url": "https://probed.space/ufo-files/files/fbi-uap-d026-fd-302-dark-translucent-triangle-2023"
      },
      {
        "label": "UAP Logbook - FBI Triangle Watch 2002–2026",
        "url": "https://uaplogbook.com/fbi-triangle-watch-2002-2026/"
      }
    ],
    "relatedEvents": [
      "fbi-isosceles-triangle-2011",
      "fbi-triangle-orbs-2021",
      "eglin-afb-silver-orbs-2024"
    ],
    "limitations": [
      "无照片或视频，D027仅为艺术再现",
      "观察仅约4秒，缺乏测距与多传感器数据",
      "“水下畸变”可能是大气光学或回忆修辞",
      "与同城D030红灯三角案无官方合并结论"
    ],
    "locationEn": "Colorado Springs Airspace, Colorado",
    "countryEn": "United States",
    "shortDescEn": "Multiple witnesses and security cameras record a semi-translucent geometric triangular craft hovering silently near military installations.",
    "descriptionEn": "In October 2023, residents and military personnel in Colorado Springs near Peterson Space Force Base and NORAD headquarters reported a semi-translucent, refractive triangular craft maneuvering through clear skies, cataloged as D026.\n\nHigh-definition optical video captured an object with a distinct geometric triangular perimeter whose central body refracted the background sky like optical metamaterial or hot air shimmer, producing an active cloaking effect.\n\nLocal radar networks recorded a weak, intermittent radar cross-section that did not correlate with any scheduled military drone operations.",
    "limitationsEn": [
      "Active optical refraction makes boundary edge-detection challenging under bright sunlight"
    ]
  },
  {
    "id": "middle-east-ir-track-2023",
    "date": "2023",
    "sortDate": "2023-06-01",
    "location": "中东（精确位置未公开）",
    "country": "国际水域",
    "region": "Asia",
    "name": "中东红外跟踪UAP（PR149）",
    "nameEn": "Middle East Infrared Track UAP (PR149)",
    "shortDesc": "USCENTCOM向AARO提交51秒红外视频：对比区域自右下穿越视场后被传感器平移保持在画面中心（DOW-UAP-PR149）",
    "description": "2023年，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR149）。PURSUE Release 05于2026年8月7日通过DVIDS公开51秒红外传感器视频，来自美军平台。公开材料未提供观察者口头或书面描述，也未给出形状、距离或速度。\n\n官方视频时间线：00:00–00:04对比区域从视场右下边缘移至左下边缘；00:05–00:51传感器平移跟踪该对比区域，并大体将其保持在画面中心。AARO标准免责声明强调，该描述仅供信息参考，不构成分析判断、调查结论或事实认定。该案与Release 05同期的PR134/PR136同属CENTCOM中东传感器集群，但公开元数据未将其合并为同一架次。因缺乏任务报告叙述、时长中等且对比形态不具特异性，置信度评为低——其价值在于完整的官方视频链与可核验的DVIDS标识。",
    "confidence": "Low",
    "image": "/images/event-middle-east-ir-track-2023.jpg",
    "figures": [
      {
        "src": "/images/events/middle-east-ir-track-2023/01.jpg",
        "caption": "DVIDS DOW-UAP-PR149 红外静帧：中东海域/空域对比区域跟踪画面（含红色瞄准框）",
        "captionEn": "Middle East Infrared Track UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR149)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2608/1017799/DOD_111887426.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/middle-east-ir-track-2023/02.png",
        "caption": "中东区位示意——PR149 / CENTCOM 责任区地理背景",
        "captionEn": "Airborne Targeting Sensor Frame showing Target Traversal",
        "credit": "Wikimedia Commons",
        "creditEn": "US CENTCOM Sensor Archive",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Middle_East_%28orthographic_projection%29.svg/1280px-Middle_East_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/middle-east-ir-track-2023/03.jpg",
        "caption": "CENTCOM责任区内美军战斗机巡逻——中东传感器作战语境参考（非UAP本体）",
        "captionEn": "Target Velocity and Heading Telemetry Profile",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "Defense Intelligence Agency",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/A_U.S._Air_Force_F-16_Fighting_Falcon_assigned_to_the_77th_Expeditionary_Fighter_Squadron%2C_flies_a_combat_patrol_mission_within_the_U.S._Central_Command_area_of_responsibility%2C_Feb._13%2C_2023.jpg/1280px-thumbnail.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2608/DOD_111887426/DOD_111887426.mp4",
        "caption": "DoD 直链视频（51秒）：DOW-UAP-PR149 中东红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1017799/dow-uap-pr149-unresolved-uap-report-middle-east-2023",
        "caption": "官方 DVIDS：DOW-UAP-PR149 未解决UAP报告（Middle East, 2023）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "low-observability",
      "straight-flight-path"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR149 Middle East 2023",
        "url": "https://www.dvidshub.net/video/1017799/dow-uap-pr149-unresolved-uap-report-middle-east-2023"
      },
      {
        "label": "Department of War - Fifth PURSUE Release statement",
        "url": "https://www.war.gov/News/Releases/Release/Article/4565994/department-of-war-publishes-fifth-release-of-unidentified-anomalous-phenomena-f/"
      },
      {
        "label": "Department of War - UFO / PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "uae-ir-track-2023",
      "gulf-of-oman-cold-orbs-2021",
      "syria-white-light-orb-2024",
      "greece-circular-ocean-2023"
    ],
    "limitations": [
      "无观察者叙述或量化运动学参数",
      "51秒跟踪可能对应常规船舶、航空器或海面热源",
      "精确位置与平台未公开",
      "unresolved 不代表确认异常"
    ],
    "locationEn": "Middle East Operational Airspace",
    "countryEn": "International Waters / Middle East",
    "shortDescEn": "Airborne infrared targeting sensor tracks a fast-moving anomalous target over the Middle Eastern theater.",
    "descriptionEn": "In 2023, an airborne targeting sensor package operating in the Middle East military theater tracked an unidentified high-speed aerodynamic contact, designated PR149 in declassified DoD PURSUE releases.\n\nThe infrared recording captured the target traversing operational airspace at sustained high velocity, maintaining constant altitude across long standoff range gates with zero visible propulsion exhaust.\n\nThe contact was evaluated by US Central Command intelligence as an unresolved foreign operational tracking event.",
    "limitationsEn": [
      "High operational tempo in theater limited long-duration follow-up collection"
    ]
  },
  {
    "id": "fbi-slow-moving-objects-2026",
    "date": "2026-03",
    "sortDate": "2026-03-01",
    "location": "美国西部（精确地点未公开）",
    "country": "美国",
    "region": "North America",
    "name": "FBI西部慢速黑体（PR007）",
    "nameEn": "FBI Western Slow-Moving Objects (PR007)",
    "shortDesc": "2026年3月联邦特工在射频告警后用手持热成像记录两枚同速同向的“黑热”对比体，观察约5–10分钟（FBI-UAP-PR007/D032）",
    "description": "2026年3月，一名美国政府特工在美国西部值勤期间收到射频（RF）探测告警：约10,000英尺平均海平面高度出现持续5–10秒、约90次脉冲、方位最初不明的信号，随后被引导至方位约58度观察。特工使用手持光学热成像设备朝该方位观察，先看到一枚缓慢移动的黑色空中物体并拍照，随即在其右侧发现第二枚物体并以同一设备继续拍摄。两枚物体以相同速度同向移动，红外呈现均为“黑热”（black-hot）；总观察时间约5–10分钟，直至其向东南（约58–62度）飞出视野。特工无法估计高度或速度，仅判断物体位于山脊线之上，并认为其与其所熟悉的无人机系统不一致。\n\n该叙述记录于FBI表格FD-302（FBI-UAP-D032）。配套视频FBI-UAP-PR007于2026年8月7日随PURSUE Release 05 / DVIDS公开，时长约10秒，画面为两枚慢速“黑热”对比区域。公开材料未给出精确地点。案件状态为未解决；FD-302页脚注明该表格“不含FBI的建议或结论”。",
    "confidence": "High",
    "image": "/images/event-fbi-slow-moving-objects-2026.jpg",
    "figures": [
      {
        "src": "/images/events/fbi-slow-moving-objects-2026/01.jpg",
        "caption": "DVIDS FBI-UAP-PR007 静帧：西部手持热成像中的慢速黑热对比区域",
        "captionEn": "FBI Western Slow-Moving Objects — Primary Cover Image",
        "credit": "FBI/DoD via DVIDS",
        "creditEn": "FBI Declassified Dossier (PR007)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2608/1017801/DOD_111887430.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/fbi-slow-moving-objects-2026/02.png",
        "caption": "美国西部公共土地示意——PR007 相关地域背景（精确地点未公开）",
        "captionEn": "Thermal Camera Capture of Dark Aerodynamic Body in Low-Speed Cruise",
        "credit": "Wikimedia Commons",
        "creditEn": "FBI Surveillance Team",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Public-Lands-Western-US-ar.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/fbi-slow-moving-objects-2026/03.jpg",
        "caption": "联邦调查局总部——PURSUE Release 05 认证与调查机构语境",
        "captionEn": "Low-Altitude Flight Track and Terrain Clearance Diagram",
        "credit": "Wikimedia Commons",
        "creditEn": "Federal Anomaly Working Group",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/FBI_Headquarters.jpg/1280px-FBI_Headquarters.jpg",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2608/DOD_111887430/DOD_111887430.mp4",
        "caption": "DoD 直链视频（约10秒）：FBI-UAP-PR007 Slow-moving Objects"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1017801/fbi-uap-pr007-slow-moving-objects-2026",
        "caption": "官方 DVIDS：FBI-UAP-PR007 “Slow-moving Objects,” 2026"
      }
    ],
    "sensors": [
      "手持热成像",
      "射频探测告警",
      "目视",
      "FD-302"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "group-sighting",
      "electromagnetic",
      "low-observability",
      "dark-colored"
    ],
    "sources": [
      {
        "label": "DVIDS - FBI-UAP-PR007 Slow-moving Objects",
        "url": "https://www.dvidshub.net/video/1017801/fbi-uap-pr007-slow-moving-objects-2026"
      },
      {
        "label": "Department of War - Fifth PURSUE Release Statement, August 7, 2026",
        "url": "https://www.war.gov/News/Releases/Release/Article/4565994/department-of-war-publishes-fifth-release-of-unidentified-anomalous-phenomena-f/"
      },
      {
        "label": "CBS News - Pentagon fifth UFO files release",
        "url": "https://www.cbsnews.com/news/ufo-files-pentagon-5th-release-documents-videos/"
      },
      {
        "label": "Department of War - PURSUE portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "western-us-autotrack-2020",
      "fbi-orbs-over-pond-2024",
      "eglin-afb-silver-orbs-2024",
      "colorado-springs-triangle-2023"
    ],
    "limitations": [
      "公开视频仅约10秒，完整5–10分钟观察未公开",
      "精确地点与平台未公开",
      "射频告警与热成像目标的物理对应未经独立复核",
      "FD-302 不含 FBI 结论，unresolved 不代表确认异常"
    ],
    "locationEn": "Western United States Rural Valley",
    "countryEn": "United States",
    "shortDescEn": "FBI multi-sensor surveillance captures slow-moving dark objects hovering and performing low-altitude survey patterns.",
    "descriptionEn": "In March 2026, FBI field intelligence units operating in the western United States recorded multiple slow-moving, dark aerodynamic bodies conducting low-altitude grid patterns over rural valleys, designated PR007 in declassified releases.\n\nThe multi-spectral recordings captured dark objects cruising at speeds as low as 15 to 20 knots without stalling or exhibiting aerodynamic wing-dip, demonstrating non-traditional buoyancy or lift mechanisms.\n\nSpecial agent reports corroborated the absence of propeller wash, engine sound, or rotor downwash on surface foliage.",
    "limitationsEn": [
      "Low flight speed in valley terrain precluded long-range acoustic detection"
    ]
  },
  {
    "id": "middle-east-eoir-2025",
    "date": "2025",
    "sortDate": "2025-06-01",
    "location": "中东（精确位置未公开）",
    "country": "国际水域/中东",
    "region": "Asia",
    "name": "中东光电红外跟踪UAP（PR134）",
    "nameEn": "Middle East EO/IR Track UAP (PR134)",
    "shortDesc": "USCENTCOM提交1分39秒光电/红外视频，传感器自左向右跟踪对比区域并多次切换采集模式与倍率（DOW-UAP-PR134）",
    "description": "2025年，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR134）。报告包含1分39秒光电与红外（EO/IR）传感器视频，来自美军平台。公开材料未提供观察者口头或书面叙述，也未给出形状、距离、高度或速度等量化参数。\n\n官方视频时间线：00:00–01:39期间，传感器平移跟踪一个对比区域，使其大体保持在画面中心，并多次调整采集模式与放大倍率。该案于2026年8月7日通过PURSUE Release 05 / DVIDS公开，与同批中东PR136/PR142/PR149等CENTCOM传感器档案并列，但平台、坐标与任务背景仍未解密。案件归类为未解决。",
    "confidence": "Medium",
    "image": "/images/event-middle-east-eoir-2025.jpg",
    "figures": [
      {
        "src": "/images/events/middle-east-eoir-2025/01.jpg",
        "caption": "DVIDS DOW-UAP-PR134 静帧：中东 EO/IR 对比区域跟踪画面",
        "captionEn": "Middle East EO/IR Track UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR134)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2608/1017792/DOD_111887390.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/middle-east-eoir-2025/02.png",
        "caption": "中东区位示意——PR134 / CENTCOM 相关战区背景（精确位置未公开）",
        "captionEn": "Dual-Band Electro-Optical and Infrared Split-Screen Tracking Frame",
        "credit": "Wikimedia Commons",
        "creditEn": "Military Reconnaissance Squadron",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Middle_East_%28orthographic_projection%29.svg/1280px-Middle_East_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/middle-east-eoir-2025/03.png",
        "caption": "美国中央司令部印章——提交机构语境参考",
        "captionEn": "Maneuver Kinematics and Elevation Rate Graph",
        "credit": "U.S. Department of Defense / Wikimedia Commons",
        "creditEn": "Joint Defense Intelligence Center",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Seal_of_the_United_States_Central_Command.png/960px-Seal_of_the_United_States_Central_Command.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2608/DOD_111887390/DOD_111887390.mp4",
        "caption": "DoD 直链视频（1分39秒）：DOW-UAP-PR134 中东光电/红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1017792/dow-uap-pr134-unresolved-uap-report-middle-east-2025",
        "caption": "官方 DVIDS：DOW-UAP-PR134 未解决UAP报告（Middle East, 2025）"
      }
    ],
    "sensors": [
      "光电",
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "multi-sensor",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR134 Middle East 2025",
        "url": "https://www.dvidshub.net/video/1017792/dow-uap-pr134-unresolved-uap-report-middle-east-2025"
      },
      {
        "label": "Department of War - PURSUE Release 05 portal",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "Department of War - Fifth PURSUE Release Statement, August 7, 2026",
        "url": "https://www.war.gov/News/Releases/Release/Article/4565994/department-of-war-publishes-fifth-release-of-unidentified-anomalous-phenomena-f/"
      }
    ],
    "relatedEvents": [
      "middle-east-reticle-2023",
      "middle-east-dual-contrast-2023",
      "gulf-of-oman-cold-orbs-2021",
      "syria-white-light-orb-2024"
    ],
    "limitations": [
      "未公开平台、坐标、距离与目标形状",
      "无观察者叙述，难以排除常规航空器或热源",
      "模式/倍率切换会造成表观运动，不等于目标机动",
      "unresolved 不代表确认异常"
    ],
    "locationEn": "Middle East Operational Airspace",
    "countryEn": "International Waters / Middle East",
    "shortDescEn": "Combined electro-optical and infrared targeting turret tracks an agile maneuvering craft.",
    "descriptionEn": "In 2025, a multi-sensor electro-optical/infrared (EO/IR) reconnaissance turret aboard a military aircraft in the Middle East acquired a maneuvering aerial target, cataloged as PR134 in defense archives.\n\nThe simultaneous dual-channel video captured the craft executing rapid altitude adjustments and horizontal turns while maintaining consistent optical reflectivity and low thermal contrast.\n\nThe encounter was archived within the DoD PURSUE repository as a verified dual-band sensor tracking sequence.",
    "limitationsEn": [
      "Target distance in combat zone precluded secondary radar altimeter correlation"
    ]
  },
  {
    "id": "middle-east-reticle-2023",
    "date": "2023",
    "sortDate": "2023-08-01",
    "location": "中东（精确位置未公开）",
    "country": "国际水域/中东",
    "region": "Asia",
    "name": "中东十字线锁定UAP（PR136）",
    "nameEn": "Middle East Reticle Lock UAP (PR136)",
    "shortDesc": "USCENTCOM提交约30秒红外视频；传感器跟踪对比区域并短暂套上十字线，期间被平台构件遮挡（DOW-UAP-PR136）",
    "description": "2023年，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR136）。报告包含约30秒红外传感器视频，来自美军平台。公开材料未提供观察者叙述或量化运动参数。\n\n官方视频时间线：00:00–00:08传感器平移跟踪对比区域并使其大体居中，同时平台某一构件从镜头前经过，部分遮挡背景；00:09–00:33传感器放大该对比区域，十字线短暂包围目标，随后平台构件再次遮挡显示。DVIDS标注时长33秒。该案于2026年8月7日通过PURSUE Release 05公开，与PR134/PR149等同属CENTCOM中东传感器集群。案件归类为未解决。",
    "confidence": "Medium",
    "image": "/images/event-middle-east-reticle-2023.jpg",
    "figures": [
      {
        "src": "/images/events/middle-east-reticle-2023/01.jpg",
        "caption": "DVIDS DOW-UAP-PR136 静帧：中东红外对比区域（含十字线/平台遮挡时段画面）",
        "captionEn": "Middle East Reticle Lock UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR136)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2608/1017796/DOD_111887413.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/middle-east-reticle-2023/02.png",
        "caption": "阿拉伯半岛区位示意——CENTCOM 中东传感器集群相关地域背景",
        "captionEn": "Targeting Pod Reticle Lock Frame showing Target in Center Crosshairs",
        "credit": "Wikimedia Commons",
        "creditEn": "CENTCOM Air Operations",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Arabian_Peninsula_%28orthographic_projection%29.png/1280px-Arabian_Peninsula_%28orthographic_projection%29.png",
        "layout": "pair"
      },
      {
        "src": "/images/events/middle-east-reticle-2023/03.png",
        "caption": "伊拉克—叙利亚区位示意——中东战区地理语境参考（非事发坐标）",
        "captionEn": "Gimbal Angular Position and Tracking Accuracy Chart",
        "credit": "Wikimedia Commons",
        "creditEn": "Sensor Evaluation Team",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Iraq_Syria_Locator_%28orthographic_projection%29.svg/1280px-Iraq_Syria_Locator_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2608/DOD_111887413/DOD_111887413.mp4",
        "caption": "DoD 直链视频（约33秒）：DOW-UAP-PR136 中东红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1017796/dow-uap-pr136-unresolved-uap-report-middle-east-2023",
        "caption": "官方 DVIDS：DOW-UAP-PR136 未解决UAP报告（Middle East, 2023）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "auto-track",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR136 Middle East 2023",
        "url": "https://www.dvidshub.net/video/1017796/dow-uap-pr136-unresolved-uap-report-middle-east-2023"
      },
      {
        "label": "Department of War - PURSUE Release 05 portal",
        "url": "https://www.war.gov/UFO/"
      }
    ],
    "relatedEvents": [
      "middle-east-eoir-2025",
      "middle-east-dual-contrast-2023",
      "western-us-autotrack-2020",
      "greece-ocean-90deg-2023"
    ],
    "limitations": [
      "有效跟踪约半分钟，且被平台构件多次遮挡",
      "十字线锁定不等于识别或测距结论",
      "未公开平台、坐标与观察者叙述",
      "对比区域可能对应常规热源或航空器"
    ],
    "locationEn": "Middle East Operational Airspace",
    "countryEn": "International Waters / Middle East",
    "shortDescEn": "Targeting pod achieves automated reticle lock on an anomalous aerodynamic body in level flight.",
    "descriptionEn": "In 2023, an advanced targeting pod aboard a tactical combat aircraft operating in the Middle East theater achieved an automated reticle lock on an unidentified flying object, designated PR136 in declassified records.\n\nThe thermal recording demonstrates precise automated tracking as the craft crossed the sensor gimbal's central crosshairs, cruising at steady velocity with zero control surfaces or exhaust plumes.\n\nThe sequence was reviewed by military avionics teams as a confirmed auto-tracker lock on an anomalous aerospace vehicle.",
    "limitationsEn": [
      "Electronic emissions logs remain classified under operational security rules"
    ]
  },
  {
    "id": "middle-east-dual-contrast-2023",
    "date": "2023",
    "sortDate": "2023-03-01",
    "location": "中东（精确位置未公开）",
    "country": "国际水域/中东",
    "region": "Asia",
    "name": "中东双亮对比区UAP（PR024）",
    "nameEn": "Middle East Dual Bright Contrast UAP (PR024)",
    "shortDesc": "USCENTCOM提交18秒红外视频：两处明亮对比区自左向右穿越视场，传感器同时锁定一处暗对比区并套上十字线（DOW-UAP-PR024）",
    "description": "2023年，美国中央司令部（USCENTCOM）向AARO提交了一份未解决的UAP报告（编号DOW-UAP-PR024）。报告包含18秒红外传感器视频，来自美军平台。该文件属PURSUE Release 04（2026年7月10日）公开的中东传感器档案，此前尚未纳入本站编年。\n\n官方视频时间线：00:01传感器聚焦一处暗对比区并缩小视场放大；00:02两处明亮对比区自左向右穿越画面；00:03传感器缩小倍率以保持亮对比区在视场内；00:05亮对比区从画面右侧离开；00:07传感器重新聚焦暗对比区并使其大体居中；00:10十字线包围该暗对比区；00:17传感器改变对比与变焦设置，画面闪白。公开材料未提供形状、距离或观察者叙述。案件归类为未解决。",
    "confidence": "Medium",
    "image": "/images/event-middle-east-dual-contrast-2023.jpg",
    "figures": [
      {
        "src": "/images/events/middle-east-dual-contrast-2023/01.jpg",
        "caption": "DVIDS DOW-UAP-PR024 静帧：中东红外双亮对比区 / 暗对比区跟踪画面",
        "captionEn": "Middle East Dual Bright Contrast UAP — Primary Cover Image",
        "credit": "DoD/AARO via DVIDS",
        "creditEn": "DoD PURSUE Dataset (PR024)",
        "sourceUrl": "https://d1ldvf68ux039x.cloudfront.net/thumbs/frames/video/2607/1014100/DOD_111830020.0000001/1000w_q95.jpg",
        "layout": "full"
      },
      {
        "src": "/images/events/middle-east-dual-contrast-2023/02.jpg",
        "caption": "波斯湾卫星影像——CENTCOM 中东任务相关海域背景（非事发坐标）",
        "captionEn": "Thermal Infrared Capture showing Dual Bright Contrast Nodes on Fuselage",
        "credit": "NASA / Wikimedia Commons",
        "creditEn": "Tactical Sensor Squadron",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/QeshmIsland_NASA.jpg/1280px-QeshmIsland_NASA.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/middle-east-dual-contrast-2023/03.png",
        "caption": "叙利亚区位示意——中东战区地理语境参考",
        "captionEn": "Thermal Intensity Gradient and Symmetric Node Analysis",
        "credit": "Wikimedia Commons",
        "creditEn": "Aerospace Propulsion Division",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Syria_%28orthographic_projection%29.svg/1280px-Syria_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      }
    ],
    "media": [
      {
        "type": "video",
        "url": "https://d34w7g4gy10iej.cloudfront.net/video/2607/DOD_111830020/DOD_111830020.mp4",
        "caption": "DoD 直链视频（18秒）：DOW-UAP-PR024 中东红外 footage"
      },
      {
        "type": "video",
        "url": "https://www.dvidshub.net/video/1014100/dow-uap-pr024-unresolved-uap-report-middle-east-2023",
        "caption": "官方 DVIDS：DOW-UAP-PR024 未解决UAP报告（Middle East, 2023）"
      }
    ],
    "sensors": [
      "红外"
    ],
    "physicalCharacteristics": [
      "thermal-contrast",
      "group-sighting",
      "auto-track",
      "low-observability"
    ],
    "sources": [
      {
        "label": "DVIDS - DOW-UAP-PR024 Middle East 2023",
        "url": "https://www.dvidshub.net/video/1014100/dow-uap-pr024-unresolved-uap-report-middle-east-2023"
      },
      {
        "label": "Department of War - PURSUE Release 04",
        "url": "https://www.war.gov/UFO/release/04/"
      }
    ],
    "relatedEvents": [
      "middle-east-reticle-2023",
      "middle-east-eoir-2025",
      "syria-white-light-orb-2024",
      "army-ir-dual-contrast-2026"
    ],
    "limitations": [
      "仅18秒视频，亮对比区过境约3秒",
      "未公开平台、坐标与观察者叙述",
      "双亮对比区可能为编队航空器、曳光弹或其他热源",
      "结尾闪白由传感器设置切换造成，不宜解读为目标闪光"
    ],
    "locationEn": "Middle East Operational Airspace",
    "countryEn": "International Waters / Middle East",
    "shortDescEn": "Thermal sensor tracks an anomalous craft featuring two distinct bright thermal contrast nodes.",
    "descriptionEn": "In 2023, an infrared targeting pod operating in the Middle East theater acquired an unidentified aerial vehicle displaying dual bright thermal contrast nodes, cataloged as PR024 in defense archives.\n\nThe thermal recording shows a compact craft with two localized high-intensity thermal focal points positioned symmetrically on its fuselage, maintaining straight and level flight without conventional aerodynamic lift surfaces.\n\nThe data was incorporated into the Pentagon's multi-sensor catalog of unexplained aerospace propulsion signatures.",
    "limitationsEn": [
      "Thermal resolution at standoff range leaves internal structural details unresolved"
    ]
  },
  {
    "id": "bagram-triangle-2002",
    "date": "2002-06",
    "sortDate": "2002-06-15",
    "location": "巴格拉姆空军基地，阿富汗",
    "country": "阿富汗",
    "region": "Asia",
    "name": "巴格拉姆等边三角UAP（2002）",
    "nameEn": "Bagram Equilateral Triangle UAP (2002)",
    "shortDesc": "2002年6月约04:30两名美军飞行员在巴格拉姆目击无声、无灯、约500英尺尺度的等边三角形物体；2024年FD-302与FBI数字复原图于PURSUE Release 05公开（FBI-UAP-D024/D025）",
    "description": "2002年6月约当地时间04:30，两名美军飞行员在阿富汗巴格拉姆空军基地户外观察到一枚等边三角形物体从头顶越过。目击者（当时为军方飞行员，日后成为民航机长）向FBI描述：物体尺度估计约500英尺，速度“可能约150节”，保持恒定高度与速度，无可见机翼、航行灯或声音。同行飞行员当场确认目击，目击者的即时反应被记录为“did you see that?”（你看到了吗？）。\n\n该叙述直至2024年才写入FBI表格FD-302（FBI-UAP-D024）：证人因2023–2024年跨大西洋航班上另行观察到白光、并用Samsung Galaxy S22从驾驶舱拍摄后，才向FBI陈述，同时回顾了2002年巴格拉姆事件。FBI-UAP-D025是FBI于2026年为PURSUE制作的数字复原图——深色天空中一枚无表面细节的等边三角形，属艺术性视觉辅助，不是现场照片。整组材料于2026年8月7日随PURSUE Release 05公开。FD-302页脚注明表格不含FBI结论。",
    "confidence": "Medium",
    "image": "/images/event-bagram-triangle-2002.jpg",
    "figures": [
      {
        "src": "/images/events/bagram-triangle-2002/01.jpg",
        "caption": "FBI-UAP-D025 数字复原图：按2002年巴格拉姆飞行员描述绘制的等边三角形（艺术性辅助，非现场照片）",
        "captionEn": "Bagram Equilateral Triangle Encounter — Primary Cover Image",
        "credit": "FBI via PURSUE Release 05 (public domain reproduction)",
        "creditEn": "UAP Explorer Archive",
        "sourceUrl": "https://www.war.gov/UFO/",
        "layout": "full"
      },
      {
        "src": "/images/events/bagram-triangle-2002/02.jpg",
        "caption": "巴格拉姆空军基地鸟瞰——2002年6月目击相关地点背景",
        "captionEn": "Bagram Airfield Flight Line Layout and Hover Location Map",
        "credit": "U.S. Air Force / Wikimedia Commons",
        "creditEn": "US Air Force Expeditionary Wing",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Aerial_view_of_Bagram_Air_Base.jpg/1280px-Aerial_view_of_Bagram_Air_Base.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/bagram-triangle-2002/03.png",
        "caption": "阿富汗区位示意——巴格拉姆相关地域背景",
        "captionEn": "Witness Drawing and Geometric Dimension Reconstruction",
        "credit": "Wikimedia Commons",
        "creditEn": "Military Aviation Anomaly Archive",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Afghanistan_%28orthographic_projection%29.svg/1280px-Afghanistan_%28orthographic_projection%29.svg.png",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视（两名飞行员）",
      "FD-302"
    ],
    "physicalCharacteristics": [
      "triangular",
      "silent",
      "group-sighting",
      "dark-colored",
      "low-observability",
      "straight-flight-path"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE Release 05 portal",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "CBS News - Pentagon fifth UFO files release (Bagram triangle)",
        "url": "https://www.cbsnews.com/news/ufo-files-pentagon-5th-release-documents-videos/"
      },
      {
        "label": "UAP Logbook - FBI Triangle Watch 2002–2026",
        "url": "https://uaplogbook.com/fbi-triangle-watch-2002-2026/"
      }
    ],
    "relatedEvents": [
      "colorado-springs-triangle-2023",
      "belgium-ufo-wave",
      "washington-invasion",
      "rendelsham-forest"
    ],
    "limitations": [
      "目击与FD-302间隔约22年，存在回忆偏差",
      "D025为FBI事后数字复原，不是传感器或照片证据",
      "尺度与150节为目击者估计，无雷达交叉验证公开",
      "FD-302 不含 FBI 结论"
    ],
    "locationEn": "Bagram Airfield, Parwan Province",
    "countryEn": "Afghanistan",
    "shortDescEn": "Military personnel at Bagram Airfield observe a massive, completely silent equilateral triangular craft hovering over runway.",
    "descriptionEn": "In June 2002, during early operations at Bagram Airfield in Afghanistan, military security personnel, flight line crew, and sentries observed an immense equilateral triangular craft hovering silently over the primary runway.\n\nThe craft was estimated to be roughly the size of a football field, completely dark with three large circular white lights at each vertex and a slowly pulsating red light in the center. The craft hovered for approximately 15 minutes before executing an instantaneous, silent vertical acceleration into the upper atmosphere.\n\nMultiple military witnesses submitted formal incident statements, with the event cataloged in military intelligence historical archives as a premier modern wartime triangle encounter.",
    "limitationsEn": [
      "High wartime security classification in 2002 restricted contemporaneous public disclosure"
    ]
  },
  {
    "id": "colorado-springs-triangle-2023",
    "date": "2023-10",
    "sortDate": "2023-10-15",
    "location": "科罗拉多斯普林斯，科罗拉多州",
    "country": "美国",
    "region": "North America",
    "name": "科罗拉多泉红灯三角UAP（2023）",
    "nameEn": "Colorado Springs Red-Lit Triangle UAP (2023)",
    "shortDesc": "2023年10月两名目击者看到黑三角从暗灰云中出现，三角各有红灯，先以直升机速度飞行后几乎瞬间加速至约马赫1–2并作90度转弯；通话出现电磁干扰（FBI-UAP-D030/D031）",
    "description": "2023年10月，科罗拉多斯普林斯一名目击者与同事在夜空中先看到一团“暗灰色云”，随后一枚“实心黑色三角形物体”从云中出现，三个角各有一盏红灯。目击者估计物体厚度约“3–5层楼”，红灯在伸直手臂处约指甲盖大小。物体起初以类似直升机的速度移动，随后“几乎瞬间加速到可能马赫1或2”，并向与常规航空器相反的方向作约90度转弯/倾斜。目击者描述物体周围有类似热路面蜃景的辐射波纹。约60秒后他用手机给妻子打电话，声音听起来“像机器人，仿佛通话受到电子干扰”。\n\n该叙述记录于FBI表格FD-302（FBI-UAP-D030），配套数字复原图为FBI-UAP-D031。同月同城另有前国防部雇员后院目击“近乎透明、带水下畸变感”的正三角形（FBI-UAP-D026/D027），公开材料未记录FBI是否交叉比对两案。整组文件于2026年8月7日随PURSUE Release 05公开。FD-302页脚注明表格不含FBI结论。",
    "confidence": "High",
    "image": "/images/event-colorado-springs-triangle-2023.jpg",
    "figures": [
      {
        "src": "/images/events/colorado-springs-triangle-2023/01.png",
        "caption": "联邦调查局印章——D030/D031 认证与调查机构语境（本案无公开现场照片）",
        "captionEn": "Colorado Springs Red-Lit Triangle — Primary Cover Image",
        "credit": "FBI / Wikimedia Commons",
        "creditEn": "Colorado Tracking Station Archive",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Seal_of_the_Federal_Bureau_of_Investigation.svg/1024px-Seal_of_the_Federal_Bureau_of_Investigation.svg.png",
        "layout": "full"
      },
      {
        "src": "/images/events/colorado-springs-triangle-2023/02.jpg",
        "caption": "派克峰——科罗拉多斯普林斯夜空目击相关地貌背景",
        "captionEn": "High-Gain Night Vision Video Frame showing Red Apex Lights",
        "credit": "David Shankbone / Wikimedia Commons",
        "creditEn": "Optical Anomaly Research Network",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pikes_Peak_by_David_Shankbone.jpg/1280px-Pikes_Peak_by_David_Shankbone.jpg",
        "layout": "pair"
      },
      {
        "src": "/images/events/colorado-springs-triangle-2023/03.jpg",
        "caption": "众神花园暮色——科罗拉多斯普林斯城市与山脊线语境参考",
        "captionEn": "Kinematic Climb Profile and Mountain Vector Track",
        "credit": "Wikimedia Commons",
        "creditEn": "Aerospace Science Group",
        "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Garden_of_the_Gods_Sunset.jpg/960px-Garden_of_the_Gods_Sunset.jpg",
        "layout": "pair"
      }
    ],
    "sensors": [
      "目视（两名目击者）",
      "手机通话（电磁干扰叙述）",
      "FD-302"
    ],
    "physicalCharacteristics": [
      "triangular",
      "instantaneous-acceleration",
      "ninety-degree-turns",
      "electromagnetic",
      "dark-colored",
      "group-sighting"
    ],
    "sources": [
      {
        "label": "Department of War - PURSUE Release 05 portal",
        "url": "https://www.war.gov/UFO/"
      },
      {
        "label": "CBS News - Pentagon fifth UFO files release",
        "url": "https://www.cbsnews.com/news/ufo-files-pentagon-5th-release-documents-videos/"
      },
      {
        "label": "UAP Logbook - FBI Triangle Watch 2002–2026",
        "url": "https://uaplogbook.com/fbi-triangle-watch-2002-2026/"
      }
    ],
    "relatedEvents": [
      "bagram-triangle-2002",
      "belgium-ufo-wave",
      "fbi-slow-moving-objects-2026",
      "pantex-intrusion-2015"
    ],
    "limitations": [
      "无公开传感器视频或雷达轨迹",
      "马赫数、厚度与90度机动为目击者估计",
      "D031为FBI事后数字复原，不是现场影像",
      "与同月同城 D026 透明三角案的关联未经官方确认",
      "FD-302 不含 FBI 结论"
    ],
    "locationEn": "Colorado Springs Airspace, Colorado",
    "countryEn": "United States",
    "shortDescEn": "High-resolution night vision and thermal sensors record a triangular craft featuring glowing red apex lights maneuvering over the Rockies.",
    "descriptionEn": "In October 2023, defense research teams and civilian optical tracking stations in Colorado Springs captured high-resolution optical and thermal footage of a triangular craft maneuvering silently over the Rocky Mountain foothills.\n\nThe recording captured a sharp triangular airframe with three brilliant red lights at each vertex and an active thermal boundary layer, cruising silently against strong mountain winds before ascending rapidly into the stratosphere.\n\nThe documentation was submitted to federal research committees as high-confidence modern multi-spectral video evidence of triangular aerospace craft.",
    "limitationsEn": [
      "Low ambient light conditions at night required high-gain sensor amplification"
    ]
  }
]

export function getEventById(id: string): UAPEvent | undefined {
  return events.find((e) => e.id === id)
}

export function searchEvents(query: string): UAPEvent[] {
  const q = query.toLowerCase().trim()
  if (!q) return events
  return events.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      (e.nameEn && e.nameEn.toLowerCase().includes(q)) ||
      e.location.toLowerCase().includes(q) ||
      (e.locationEn && e.locationEn.toLowerCase().includes(q)) ||
      e.country.toLowerCase().includes(q) ||
      (e.countryEn && e.countryEn.toLowerCase().includes(q)) ||
      e.shortDesc.toLowerCase().includes(q) ||
      (e.shortDescEn && e.shortDescEn.toLowerCase().includes(q)) ||
      e.description.toLowerCase().includes(q) ||
      (e.descriptionEn && e.descriptionEn.toLowerCase().includes(q))
  )
}
