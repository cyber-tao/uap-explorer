export interface Observable {
  id: string
  index: string
  title: string
  titleEn: string
  /** Short Chinese label for home carousel */
  cn: string
  icon: string
  metric: string
  metricLabel: string
  consistency: '强' | '中等' | '弱'
  consistencyColor: string
  /** Analysis page summary */
  description: string
  /** Home carousel long-form description */
  homeDescription: string
  examples: string[]
  eventIds: string[]
}

export const observablesSection = {
  eyebrow: 'PHYSICAL CHARACTERISTICS / 物理特征',
  title: '五类可观测特征',
  body: '全球高可信度UAP案例在五个物理维度上显示出跨文化一致性：瞬时加速、低可观测性、跨介质能力、正升力/反重力、以及多传感器同步验证。这些特征构成了区分已知现象与真正异常的科学基准。',
} as const

export interface Hypothesis {
  id: string
  name: string
  nameEn: string
  proponent: string
  physicalModel: string
  physicalModelEn?: string
  supportingEvidence: string
  supportingEvidenceEn?: string
  opposingEvidence: string
  opposingEvidenceEn?: string
  credibility: 'High' | 'Medium' | 'Low' | 'Speculative'
  credibilityLabel: string
}

export interface InfoGap {
  id: number
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  impact: string
  impactEn?: string
  recommendation: string
  recommendationEn?: string
}

export interface ResearchDirection {
  id: string
  title: string
  titleEn?: string
  icon: string
  description: string
  descriptionEn?: string
}

export const observables: Observable[] = [
  {
    id: 'instantaneous-acceleration',
    index: '01',
    title: '瞬时加速 / 高超音速',
    titleEn: 'Instantaneous Acceleration / Hypersonic Velocity',
    cn: '瞬时加速',
    icon: 'Zap',
    metric: '> 5,000 g',
    metricLabel: '估算峰值加速度',
    consistency: '强',
    consistencyColor: '#00D9A5',
    description: 'UAP能够在瞬间从静止状态加速到极高速度，或在极短时间内完成直角转弯，且不产生音爆。这是全球高可信度UAP中最一致的物理特征。',
    homeDescription: '高可信度案例中，UAP 展现出远超已知飞行器与生物耐受极限的加速能力。Nimitz「Tic Tac」在数秒内完成大高度俯冲，多份雷达记录显示其瞬时速度变化对应数千 g 的加速度，却无可见推进羽流、音爆或热信号——这种近乎「无惯性」的运动，是区分真正异常与常规航空器的首要判据。',
    examples: ['Nimitz Tic Tac', 'Gimbal/GoFast', '上海虹桥', '比利时UFO波', '科罗拉多泉三角'],
    eventIds: ['nimitz-tic-tac', 'gimbal-gofast', 'shanghai-hongqiao', 'belgium-ufo-wave', 'colorado-springs-triangle-2023'],
  },
  {
    id: 'low-observability',
    index: '02',
    title: '低可观测性 / 隐身性',
    titleEn: 'Low Observability / Stealth',
    cn: '低可观测性',
    icon: 'EyeOff',
    metric: '多波段隐身',
    metricLabel: '跨光谱特征管理',
    consistency: '强',
    consistencyColor: '#00D9A5',
    description: 'UAP在雷达上表现为低可探测性，或仅在特定传感器上显示。部分案例中民航雷达完全无法探测，但机组目视确认。',
    homeDescription: '部分目标仅在特定传感器波段可见。2024 年 Eglin 空军基地案例中的银色球体仅在短波红外（SWIR）中显现，可见光与雷达近乎无回波。目标可选择性地规避雷达、红外与目视探测，暗示其表面材质或场效应具备主动的多光谱管理能力，远超现役隐身技术的水平。',
    examples: ['Nimitz Tic Tac', '萧山机场', '贵州都溪', '希腊PR34', '科罗拉多半透明三角', '巴格拉姆三角'],
    eventIds: ['nimitz-tic-tac', 'xiaoshan-airport', 'guizhou-forest', 'greece-ocean-90deg-2023', 'colorado-springs-translucent-2023', 'bagram-triangle-2002'],
  },
  {
    id: 'transmedium',
    index: '03',
    title: '跨介质能力',
    titleEn: 'Transmedium Travel',
    cn: '跨介质',
    icon: 'Waves',
    metric: '空 ↔ 海 无减速',
    metricLabel: '介质穿越能力',
    consistency: '弱',
    consistencyColor: '#FF6B35',
    description: 'UAP能够在不同介质（空中、水下、太空）之间自由移动而不减速或改变形态。目前仅美国2022年核潜艇事件获得官方确认。',
    homeDescription: '跨介质指目标在空气、水体乃至临近真空之间自由穿行而不减速、不解体。Nimitz 事件中目标潜入海面下方仍保持高速；亚丁湾与潜艇声呐亦记录到水下高速运动体。空气与水的密度相差约 800 倍，常规载具无法承受这种介质突变——跨介质因此成为最具颠覆性的观测特征。',
    examples: ['2022核潜艇', 'USS Jackson Tic Tac（2023）', 'Colares（民间报告）'],
    eventIds: ['submarine-transmedium', 'uss-jackson-tictac-2023', 'colares'],
  },
  {
    id: 'anti-gravity',
    index: '04',
    title: '正升力 / 反重力',
    titleEn: 'Positive Lift / Anti-Gravity',
    cn: '正升力',
    icon: 'ArrowUp',
    metric: '无气动控制面',
    metricLabel: '升力生成机制',
    consistency: '中等',
    consistencyColor: '#F5A623',
    description: 'UAP在没有可见机翼、旋翼、喷气发动机或任何已知气动控制面的情况下保持悬停和飞行。',
    homeDescription: '目标在无机翼、无旋翼、无喷气推进羽流的构型下，能够长时间稳定悬停或进行极端机动。传统空气动力学要求气流流经机翼产生压差升力，而 UAP 展现出的无控制面飞行能力，强烈暗示其利用了某种非传统升力生成机制——如引力场调控或局部时空度规工程。',
    examples: ['Nimitz（无机翼/尾翼）', 'Gimbal（旋转无控制面）', '比利时三角', '日航1628', '贵州林场'],
    eventIds: ['nimitz-tic-tac', 'gimbal-gofast', 'belgium-ufo-wave', 'jal-1628', 'guizhou-forest'],
  },
  {
    id: 'multi-sensor',
    index: '05',
    title: '多传感器同步捕获',
    titleEn: 'Multi-Sensor Correlation',
    cn: '多传感器',
    icon: 'Radar',
    metric: '≥ 3类独立传感器',
    metricLabel: '同步验证要求',
    consistency: '强',
    consistencyColor: '#00D9A5',
    description: 'UAP能够同时被多个独立传感器系统（雷达、红外、目视、电磁）同步捕获。这是区分真正异常与误判的黄金标准。',
    homeDescription: '最高可信度的判据，是同一目标被多个相互独立的传感器同时捕获。Nimitz 事件由 SPY-1 宙斯盾雷达、E-2C 预警机、飞行员目视与 ATFLIR 红外四路同步锁定，排除了单一传感器伪影、光学错觉与软件故障的可能。多传感器一致性，将「个人目击」提升为可被科学检验的物理证据。',
    examples: ['Nimitz（黄金标准）', 'Gimbal', 'JAL 1628', 'USS Jackson', '美西PR108', '海军NPIC胶片', 'FBI慢速黑体'],
    eventIds: ['nimitz-tic-tac', 'gimbal-gofast', 'jal-1628', 'uss-jackson-tictac-2023', 'western-us-autotrack-2020', 'tremonton-great-falls-1952', 'fbi-slow-moving-objects-2026'],
  },
]

export const hypotheses: Hypothesis[] = [
  {
    id: 'eth',
    name: '地外文明假说',
    nameEn: 'Extraterrestrial Hypothesis (ETH)',
    proponent: 'Jacques Vallée, Stanton Friedman, Avi Loeb',
    physicalModel: '外星文明派遣的探测器或载人飞行器，使用未知推进技术（反重力、曲率驱动、量子真空推进）',
    physicalModelEn: 'Probes or piloted craft dispatched by extraterrestrial intelligence, utilizing advanced field propulsion (anti-gravity, metric warp drives, or vacuum energy).',
    supportingEvidence: '全球多文明独立记载发光圆盘；某些事件表现出超已知物理的机动性；核设施关联模式暗示对技术的主动兴趣；古代记录中的某些难以解释案例',
    supportingEvidenceEn: 'Global independent historic records of disk craft; extreme accelerations exceeding known material limits; statistical clustering around nuclear weapon sites.',
    opposingEvidence: '无直接物理证据（碎片、金属、生物样本）；AARO 2024未发现外星技术证据；所有SETI搜索均为null results；若外星文明存在且访问地球，SETI的null results构成系统性不利证据',
    opposingEvidenceEn: 'Absence of peer-reviewed recovered physical artifacts/biological matter; AARO reports find no confirmed alien signatures; persistent null results across classical radio SETI.',
    credibility: 'Speculative',
    credibilityLabel: '推测性',
  },
  {
    id: 'natural',
    name: '自然现象假说',
    nameEn: 'Natural Phenomena Hypothesis',
    proponent: 'NASA, AARO, GEIPAN, 大气物理学家',
    physicalModel: '等离子体、球状闪电、大气光学现象、未知气象现象、流星、火流星等',
    physicalModelEn: 'Coherent plasmas, ball lightning, atmospheric temperature inversion mirages, parhelia, bolides, or rare geophysical piezoelectric luminosities.',
    supportingEvidence: '绝大多数UAP报告（约95-98%）可被解释；Condign报告的等离子体假说；球状闪电可解释部分低空发光球体；古代十日并出明确对应幻日现象',
    supportingEvidenceEn: 'Over 95–98% of reported sightings resolve into known meteorological/astronomical phenomena; Project Condign plasma models; verified ball lightning physics.',
    opposingEvidence: '无法解释多传感器同步捕获的超机动事件（如Nimitz）；无法解释核设施导弹失效；部分自然现象假说缺乏独立验证',
    opposingEvidenceEn: 'Incapable of explaining multi-sensor verified, highly structured craft performing intelligent tactical intercepts (e.g. Nimitz Tic Tac) or ICBM launch shutdown overrides.',
    credibility: 'High',
    credibilityLabel: '高',
  },
  {
    id: 'human-tech',
    name: '人造技术假说',
    nameEn: 'Human Technology Hypothesis',
    proponent: '军事评论员, Mick West, 日本防卫省',
    physicalModel: '秘密军事试验、无人机、间谍气球、高超音速飞行器、未知ISR平台',
    physicalModelEn: 'Classified black-budget defense programs, advanced UAS swarms, stratospheric surveillance balloons, hypersonic test vehicles, or next-gen EW decoys.',
    supportingEvidence: '中国侦察气球被确认是部分UAP sightings的来源；各国秘密军事试验（如X-37B）确实存在于轨道上；2022年韩国无人机恐慌显示已知技术可制造UAP效应',
    supportingEvidenceEn: 'Confirmed high-altitude ISR balloons and stealth UAV programs (e.g. RQ-180, X-37B); electronic warfare radar ghosting demonstrations.',
    opposingEvidence: '无法解释早期事件（1940s-1960s）中当时不存在的先进技术；无法解释跨介质能力和超机动性；若全为人造技术，则无法解释AARO 21起真正异常中的部分案例',
    opposingEvidenceEn: 'Fails to account for matching high-acceleration flight dynamics documented in the 1940s–1960s before modern avionics existed; transmedium zero-boundary transitions.',
    credibility: 'High',
    credibilityLabel: '高/低',
  },
  {
    id: 'interdimensional',
    name: '跨维度/时间假说',
    nameEn: 'Interdimensional/Time Travel Hypothesis',
    proponent: 'Jacques Vallée, 部分理论物理学家',
    physicalModel: 'UAP不是传统飞行器，而是涉及时空扭曲或跨维度交互的现象，可能在过去和现在以不同形式出现',
    physicalModelEn: 'Phenomena resulting from extra spatial dimensions, localized spacetime topology folds, or closed timelike curves interfacing temporarily with our 4D continuum.',
    supportingEvidence: '现代UAP的瞬时加速、无惯性运动等特征似乎违反已知物理定律；古代和现代记录中的某些共性（如无声、光球）可能指向同一底层现象',
    supportingEvidenceEn: 'Apparent absence of aerodynamic drag/sonic booms consistent with local spacetime metric distortion; historical invariant motifs across millennia.',
    opposingEvidence: '完全缺乏物理理论框架和可重复实验；该假说过于灵活，几乎可以解释任何现象，因此在科学上不可证伪；缺乏任何可独立验证的预测',
    opposingEvidenceEn: 'Lacks falsifiable mathematical models within standard quantum field theory/general relativity; untestable without repeatable experimental handles.',
    credibility: 'Speculative',
    credibilityLabel: '推测性',
  },
  {
    id: 'ancient-astronaut',
    name: '古代宇航员假说',
    nameEn: 'Ancient Astronaut Theory',
    proponent: 'Erich von Däniken, Zecharia Sitchin',
    physicalModel: '地外智能文明在古代访问地球，传授技术，被人类尊为神',
    physicalModelEn: 'Extraterrestrial intelligences visited Earth in prehistory, altering human evolution/technology, recorded in mythologies as divine entities.',
    supportingEvidence: '全球神话中飞行装置/神从天降的母题普遍性；某些古代建筑的精确性被声称超越当时技术水平',
    supportingEvidenceEn: 'Cross-cultural mythic motifs of flying chariots and descending celestial beings; monumental architecture alignments.',
    opposingEvidence: '已被主流考古学和人类学彻底否定；岩画解释的投射偏差；缺乏DNA或材料证据；带有种族主义渊源（贬低非欧洲古代文明）',
    opposingEvidenceEn: 'Overwhelmingly debunked by mainstream archaeology and anthropology; psychological projection on ancient art; total absence of unambiguous genetic or physical proof.',
    credibility: 'Speculative',
    credibilityLabel: '推测性',
  },
]

export const infoGaps: InfoGap[] = [
  {
    id: 1,
    title: '官方档案获取壁垒',
    titleEn: 'Official Archival Access Barriers',
    description: '中国、日本、印度、俄罗斯军方从未系统性公开UAP调查档案。日本正在讨论建立类似AARO的机构，但尚无公开数据库。中国PLA的UAP报告机制完全保密。',
    descriptionEn: 'Militaries across Asia, Russia, and other key powers rarely declassify raw telemetry. While US AARO releases annual summaries, global access remains heavily compartmentalized.',
    impact: '研究者无法获取雷达原始数据、飞行员报告、传感器记录等核心证据。导致全球UAP研究存在严重的美国中心偏差。',
    impactEn: 'Researchers are locked out of raw phased-array radar streams and calibrated sensor files, creating an acute US-centric data bias.',
    recommendation: '推动国际UAP数据共享协议，参考GEIPAN的公开模式。',
    recommendationEn: 'Establish international scientific UAP data exchanges modeled on France GEIPAN civilian transparency standards.',
  },
  {
    id: 2,
    title: '多传感器同步证据稀缺',
    titleEn: 'Scarcity of Synchronized Multi-Sensor Data',
    description: '亚洲所有已知UAP事件均缺少雷达+红外（FLIR）+光电+目视的多传感器同步捕获。南美、欧洲虽有部分多源案例，但传感器质量远低于美国。',
    descriptionEn: 'The vast majority of civilian and global sightings lack simultaneous 4-way corroboration (Aegis radar + forward IR + EO tracker + pilot visual).',
    impact: '无法区分真正的物理异常与已知的对抗性活动或自然现象的误判。',
    impactEn: 'Prevents definitive discrimination between novel physical propulsion anomalies and electronic warfare or sensor artifacts.',
    recommendation: '推动全球军事和民航传感器数据的标准化记录和共享；在UAP热点区域部署多传感器监测网络。',
    recommendationEn: 'Deploy standardized multi-spectral ground recording stations across verified recurring UAP corridors.',
  },
  {
    id: 3,
    title: '物理样本回收为零',
    titleEn: 'Zero Verified Physical Specimen Retention',
    description: '贵州空中怪车、巴西Colares、日本甲府等事件的现场痕迹（土壤、放射性、混凝土柱、树木）从未被保存于可靠证据链中，也未在同行评审期刊上发表系统分析。',
    descriptionEn: 'Ground traces (soil isotopic ratios, sheared structural pillars, biological burns) have historically lacked continuous cryptographic custody and peer-reviewed material forensics.',
    impact: '缺乏物理样本是UAP研究无法升级为硬科学的核心瓶颈。没有物理样本，就无法确定UAP的材料组成、推进机制或来源。',
    impactEn: 'Without peer-reviewed physical artifacts, the domain cannot graduate from phenomenology into rigorous materials science.',
    recommendation: '建立全球UAP物理样本快速响应协议（类似陨石收集协议），确保未来事件中的痕迹被科学保存。',
    recommendationEn: 'Institute rapid-response field collection protocols analogous to the Antarctic meteorite recovery pipeline.',
  },
  {
    id: 4,
    title: '核设施关联在亚洲未验证',
    titleEn: 'Nuclear Facility Correlation Unverified Outside the West',
    description: '与美国已确认的UAP-核设施统计关联不同，亚洲核设施（中国罗布泊、印度核试验场、巴基斯坦核设施）附近是否存在UAP集中模式，完全缺乏公开数据。',
    descriptionEn: 'While US and French historical records indicate tight statistical correlation between UAP incursions and nuclear weapons/power facilities, Eurasian data remains unverified.',
    impact: '如果核设施-UAP关联是全球性模式，则亚洲数据的缺失严重限制了该模式的有效性。',
    impactEn: 'Limits testing whether nuclear surveillance is a universal behavioral signature or an observational artifact.',
    recommendation: '通过国际合作或开源情报（OSINT）分析亚洲核设施附近的UAP报告。',
    recommendationEn: 'Perform systematic OSINT and open satellite environmental telemetry studies around global nuclear infrastructure.',
  },
  {
    id: 5,
    title: '跨介质能力仅限美国确认',
    titleEn: 'Transmedium Transitions Confirmed Solely by US Navy',
    description: '2022年美国核潜艇跨介质球形物体是AARO正式确认的唯一跨介质案例。亚洲海域、欧洲、南美均无跨介质传感器验证。',
    descriptionEn: 'The 2022 USS Omaha transmedium sphere remains the sole publicly confirmed case of seamless hydrodynamic-to-aerodynamic entry without deceleration splash.',
    impact: '如果跨介质是UAP的普遍能力，则其在美国以外地区的低报告率可能是由于海军传感器数据的保密性，而非现象不存在。',
    impactEn: 'Obscures whether transmedium physics is universal or an artifact of submarine sensor sensitivity disparities.',
    recommendation: '推动海军UAP数据的有限解密，特别是跨介质事件的去标识化报告。',
    recommendationEn: 'Advocate for sanitized declassification of military ocean surveillance acoustic and FLIR datasets.',
  },
  {
    id: 6,
    title: '长期生态/物理效应研究缺失',
    titleEn: 'Absence of Longitudinal Biophysical & Ecological Follow-up',
    description: '贵州事件中树木生长滞后、电磁异常等说法从未被长期科学监测验证。巴西Colares平民受伤的医疗记录未进行系统性流行病学分析。',
    descriptionEn: 'Reported secondary radiation burns, cellular puncture lesions, and vegetation growth anomalies (e.g. Colares, Guizhou) lack longitudinal epidemiological follow-up.',
    impact: '若存在长期生态或生物效应，这些将是UAP研究的重要物理线索。但目前这些后遗症仅停留在传闻层面。',
    impactEn: 'Leaves crucial physiological and electromagnetic emission data unquantified.',
    recommendation: '对历史UAP事件目击者进行长期健康跟踪研究；对声称有物理痕迹的地点进行长期环境监测。',
    recommendationEn: 'Conduct blinded clinical and environmental isotopic studies on historical encounter sites and witnesses.',
  },
  {
    id: 7,
    title: '区分真正异常与对抗性ISR的方法论空白',
    titleEn: 'Methodological Gap in Discriminating Anomalies from Foreign ISR',
    description: '在亚洲复杂的地缘政治环境中，目前缺乏可靠框架来区分未知物理现象与已知对抗性情报活动。美国AARO同样面临此挑战。',
    descriptionEn: 'Distinguishing between novel propulsion phenomenology and next-generation adversary ISR drone/balloon swarms poses a severe analytical challenge.',
    impact: '导致大量UAP事件可被双重解释，降低了研究的可信度。',
    impactEn: 'Risks muddying scientific investigations with conventional national security threat mitigation.',
    recommendation: '开发AI/ML驱动的UAP-ISR区分算法，结合多传感器数据、飞行模式分析和地理政治背景。',
    recommendationEn: 'Develop explainable AI/ML kinematic classifiers integrating multi-sensor flight envelopes and signature analytics.',
  },
]

export const researchDirections: ResearchDirection[] = [
  {
    id: 'sensor-network',
    title: '全球UAP多传感器监测网络',
    titleEn: 'Global Multi-Sensor UAP Monitoring Array',
    icon: 'Globe',
    description: '在热点区域（日本西部至中国、比利时、巴西Colares、美国东海岸）部署高分辨率、多光谱的自动监测站。',
    descriptionEn: 'Deploy high-resolution, multi-spectral automated sensor nodes across recurring geographic corridors (East Coast US, Western Europe, South America).',
  },
  {
    id: 'data-sharing',
    title: '国际UAP数据共享协议',
    titleEn: 'International UAP Scientific Data Accord',
    icon: 'Share2',
    description: '参考GEIPAN模式，建立跨国UAP数据库，标准化A/B/C/D分类系统。',
    descriptionEn: 'Establish an open multilateral database adopting standardized GEIPAN-style A/B/C/D evidentiary classification frameworks.',
  },
  {
    id: 'sample-collection',
    title: '物理样本快速响应协议',
    titleEn: 'Physical Specimen Rapid Recovery Protocol',
    icon: 'Box',
    description: '建立类似陨石收集的全球UAP痕迹收集网络，确保未来事件中的物理证据被科学保存。',
    descriptionEn: 'Create a global rapid-response network for securing landing site soil, radiation, and metallurgical traces with unbroken chain-of-custody.',
  },
  {
    id: 'health-tracking',
    title: '长期健康跟踪研究',
    titleEn: 'Longitudinal Witness Clinical & Health Studies',
    icon: 'HeartPulse',
    description: '对历史UAP事件目击者（特别是声称有生物效应的）进行系统性流行病学调查。',
    descriptionEn: 'Conduct systematic epidemiological and physiological assessments of close-encounter witnesses reporting acute bio-effects.',
  },
  {
    id: 'interstellar-monitoring',
    title: '星际物体持续监测',
    titleEn: 'Interstellar Object Telescopic Surveillance',
    icon: 'Telescope',
    description: 'Vera Rubin Observatory、James Webb Space Telescope、FAST等将显著提升UAP检测能力。Hayabusa2（2031年对1998 KY26）将提供直接物理证据。',
    descriptionEn: 'Leverage the Vera C. Rubin Observatory (LSST), JWST, and deep radar arrays to survey hyperbolic interstellar interlopers.',
  },
  {
    id: 'seti-expansion',
    title: 'SETI频段扩展',
    titleEn: 'Next-Gen Multi-Messenger SETI Expansion',
    icon: 'Radio',
    description: '当前SETI主要覆盖无线电频段。需要开发中微子、引力波、光学/红外技术签名的探测方法。',
    descriptionEn: 'Broaden search bands beyond narrow radio waves into optical/IR technosignatures, neutrino flux, and quantum telemetry.',
  },
  {
    id: 'ai-ml',
    title: 'AI/ML区分算法',
    titleEn: 'AI/ML Kinematic Discrimination Algorithms',
    icon: 'BrainCircuit',
    description: '利用AI在模式识别、传感器数据融合、ISR-UAP区分方面的应用提升调查效率。',
    descriptionEn: 'Apply neural networks to automate multi-sensor sensor fusion, kinematic outlier detection, and drone-vs-anomaly triage.',
  },
]
