export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Speculative'

export interface UAPEvent {
  id: string
  date: string
  location: string
  country: string
  region: 'North America' | 'South America' | 'Europe' | 'Asia' | 'Oceania' | 'Africa' | 'Space'
  name: string
  nameEn?: string
  shortDesc: string
  description: string
  confidence: ConfidenceLevel
  image: string
  sensors?: string[]
  physicalCharacteristics: string[]
  sources: { label: string; url: string }[]
  limitations: string[]
  relatedEvents?: string[]
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

export const physicalCharLabels: Record<string, { label: string; icon: string }> = {
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
    id: 'nimitz-tic-tac',
    date: '2004-11-14',
    location: '圣地亚哥海岸',
    country: '美国',
    region: 'North America',
    name: 'Nimitz Tic Tac事件',
    nameEn: 'Nimitz Tic Tac Incident',
    shortDesc: '白色椭圆形物体，无可见推进系统，在8万英尺瞬间降至海面，多传感器同步捕获',
    description: 'VF-41中队F/A-18F飞行员使用AN/ASQ-228 ATFLIR吊舱捕获了著名的"Tic Tac"视频。UAP被描述为白色椭圆形物体，约40英尺长，无可见推进系统，在8万英尺高空瞬间降至海面，并在海面上方以超音速飞行，无音爆。E-2C预警机雷达、SPY-1宙斯盾雷达、飞行员目视和FLIR红外同步捕获。',
    confidence: 'High',
    image: '/images/event-nimitz.jpg',
    sensors: ['雷达', 'FLIR红外', '目视', 'EW电子战'],
    physicalCharacteristics: ['instantaneous-acceleration', 'low-observability', 'multi-sensor', 'anti-gravity'],
    sources: [
      { label: 'AARO 2024年度报告', url: 'https://www.aaro.mil' },
      { label: '美国海军官方确认', url: 'https://www.navy.mil' },
      { label: '纽约时报2017披露', url: 'https://www.nytimes.com' },
    ],
    limitations: ['物体从未被拦截或回收', '物理性质仍为未解之谜'],
    relatedEvents: ['gimbal-gofast', 'submarine-transmedium'],
  },
  {
    id: 'gimbal-gofast',
    date: '2014-2015',
    location: '美国东海岸',
    country: '美国',
    region: 'North America',
    name: '东海岸Gimbal/GoFast事件',
    nameEn: 'East Coast Gimbal / GoFast',
    shortDesc: '航母战斗群多传感器验证，Gimbal"旋转"物体，GoFast高速低空飞行',
    description: 'Gimbal视频显示一个"旋转"的物体，被飞行员描述为"整个舰队在编队飞行"；GoFast视频显示一个高速低空物体。两起事件均被AN/ASQ-228 ATFLIR系统捕获，飞行员和雷达系统同时确认。Gimbal事件涉及USS Princeton巡洋舰上的多传感器同步记录。',
    confidence: 'High',
    image: '/images/event-gimbal.jpg',
    sensors: ['雷达', 'FLIR红外', '目视'],
    physicalCharacteristics: ['instantaneous-acceleration', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'AARO 2024年度报告', url: 'https://www.aaro.mil' },
      { label: '美国海军', url: 'https://www.navy.mil' },
    ],
    limitations: ['AARO 2024暗示部分案例可能与Starlink卫星闪光相关'],
  },
  {
    id: 'colares',
    date: '1986-05-19',
    location: 'Colares及Belterra',
    country: '巴西',
    region: 'South America',
    name: 'Colares事件（Operação Prato）',
    nameEn: 'Colares Incident (Operation Prato)',
    shortDesc: '军方正式调查，21名平民和5名军人受伤，超过2000名目击者，战斗机未能拦截',
    description: '巴西空军正式启动Operação Prato（飞碟行动），由Uyrangê Hollanda上尉指挥。1986年5月19日大规模事件中，21名平民和5名军人受伤（被光束照射导致烧伤、脱发、低血压等）。超过2000名目击者报告低空发光物体。巴西空军部署F-5E和F-103战斗机，但未能拦截目标。2022年巴西国家档案馆正式公开档案。',
    confidence: 'High',
    image: '/images/event-colares.jpg',
    sensors: ['军方雷达', '目视', '医疗记录'],
    physicalCharacteristics: ['electromagnetic', 'physical-traces', 'group-sighting', 'low-observability'],
    sources: [
      { label: '巴西国家档案馆', url: 'https://www.arquivo.gov.br' },
      { label: 'BBC Brasil', url: 'https://www.bbc.com/portuguese' },
    ],
    limitations: ['物理样本未被保存于可靠证据链中', '部分平民报告可能受社会心理因素影响'],
  },
  {
    id: 'jal-1628',
    date: '1986-11-17',
    location: '阿拉斯加上空',
    country: '日本',
    region: 'Asia',
    name: 'JAL 1628号班机UFO事件',
    nameEn: 'JAL 1628 UFO Incident',
    shortDesc: '机长目击巨型UAP（"两倍于航空母舰大小"），Anchorage空管雷达确认，FAA正式介入',
    description: '机长Kenju Terauchi报告目击两个小型UAP和一个巨型UAP（暗灰色，矩形，表面有灯光）。Anchorage空管在雷达上确认飞机附近存在不明目标（JAL 1628航班以东8英里处）。美国联邦航空管理局（FAA）正式介入调查，事件被FAA列为"未解释"。',
    confidence: 'High',
    image: '/images/event-jal1628.jpg',
    sensors: ['雷达', '目视', 'FAA调查'],
    physicalCharacteristics: ['multi-sensor', 'anti-gravity', 'low-observability'],
    sources: [
      { label: 'FAA内部调查文件', url: 'https://www.faa.gov' },
      { label: '航空周刊', url: 'https://aviationweek.com' },
    ],
    limitations: ['FAA未公开完整调查报告', '无其他航班同时目击', '可能是视觉误判距离/大小'],
  },
  {
    id: 'malstrom-icbm',
    date: '1967-03',
    location: '蒙大拿州Malmstrom',
    country: '美国',
    region: 'North America',
    name: 'Malmstrom空军基地ICBM失效',
    nameEn: 'Malmstrom ICBM Failure',
    shortDesc: '10枚民兵洲际弹道导弹同时失效，基地安保目击低空发光物体',
    description: '10枚民兵洲际弹道导弹（ICBM）在同一时间段内突然失效，无法发射。基地安保人员报告目击低空发光物体在导弹发射井附近飞行。后续调查（Condon委员会、Blue Book）未能解释导弹失效的技术原因。SCU和哈佛伽利略项目对1945-1975年UAP-核设施关联进行了统计确认。',
    confidence: 'High',
    image: '/images/event-malstrom.jpg',
    sensors: ['导弹系统', '目视', '官方报告'],
    physicalCharacteristics: ['electromagnetic', 'nuclear-association', 'physical-traces'],
    sources: [
      { label: 'AARO 2024报告', url: 'https://www.aaro.mil' },
      { label: 'Condon委员会记录', url: 'https://www.ncbi.nlm.nih.gov' },
    ],
    limitations: ['因果关系未被证明', '可能是时间巧合或电磁效应导致'],
  },
  {
    id: 'belgium-ufo-wave',
    date: '1989-1991',
    location: '比利时全境',
    country: '比利时',
    region: 'Europe',
    name: '比利时UFO波',
    nameEn: 'Belgium UFO Wave',
    shortDesc: '超过3000起目击报告，13,500人目击，F-16雷达9次锁定，政府公开承认',
    description: '1989-1991年间，比利时发生了超过3000起UAP目击报告。最具代表性的是1990年3月30-31日夜间事件，约13,500人（包括警察、军人、平民）报告目击低空三角形UAP。比利时空军启动F-16战斗机紧急拦截，雷达多次锁定目标（AN/APG-66雷达，9次锁定），但飞行员未能目视确认。',
    confidence: 'High',
    image: '/images/event-belgium.jpg',
    sensors: ['F-16雷达', '目视', '群体目击'],
    physicalCharacteristics: ['instantaneous-acceleration', 'multi-sensor', 'group-sighting', 'anti-gravity'],
    sources: [
      { label: 'SOBEPS官方报告', url: 'https://www.sobeps.org' },
      { label: '比利时空军', url: 'https://www.mil.be' },
    ],
    limitations: ['F-16雷达锁定但飞行员未目视确认', '可能是雷达回波异常（地面杂波或气象现象）'],
  },
  {
    id: 'xiaoshan-airport',
    date: '2010-07-07',
    location: '杭州萧山国际机场',
    country: '中国',
    region: 'Asia',
    name: '杭州萧山机场UFO事件',
    nameEn: 'Hangzhou Xiaoshan Airport UFO',
    shortDesc: '航班机组同时目击，机场关闭跑道1小时零5分钟，12架航班备降，新华社官方确认',
    description: '两架准备降落的航班机组人员同时报告机场上空出现不明发光体。空管部门基于飞行安全考虑，立即关闭机场跑道长达1小时零5分钟，导致12架进港航班备降宁波、无锡等地，6架出港航班延误。新华社于7月8日发布官方电讯确认事件。',
    confidence: 'High',
    image: '/images/event-xiaoshan.jpg',
    sensors: ['目视', '官方确认'],
    physicalCharacteristics: ['low-observability', 'group-sighting'],
    sources: [
      { label: '新华社报道', url: 'http://www.xinhuanet.com' },
      { label: '民航华东管理局', url: 'https://www.caac.gov.cn' },
    ],
    limitations: ['民航雷达未探测到该物体', '专家组提出多种假说但无法完全解释全部观测要素'],
  },
  {
    id: 'guizhou-forest',
    date: '1994-12-01',
    location: '贵州都溪林场',
    country: '中国',
    region: 'Asia',
    name: '贵州都溪"空中怪车"事件',
    nameEn: 'Guizhou "Sky Monster" Incident',
    shortDesc: '400亩树木被成片拦腰截断，50-70吨火车车厢逆向位移20余米，无人员伤亡',
    description: '数百名目击者被巨大轰鸣声惊醒，目击空中出现发红、绿色强光的不明物体。事件造成：①都溪林场约400亩马尾松被成片拦腰截断，断口高度集中在1.5-4米，倒伏方向一致；②相距5公里的贵阳车辆厂，50-70吨重火车车厢在略上坡轨道上逆向位移20余米；③钢管柱被切断、砖砌围墙被推倒。现场无人员、牲畜伤亡，高压线、电话线、电缆完好。',
    confidence: 'High',
    image: '/images/event-guizhou.jpg',
    sensors: ['目视', '物理痕迹', '气象记录'],
    physicalCharacteristics: ['physical-traces', 'anti-gravity', 'electromagnetic'],
    sources: [
      { label: '央视《走近科学》', url: 'https://tv.cctv.com' },
      { label: '贵州UFO研究会', url: '#' },
    ],
    limitations: ['无军方传感器记录', '无金属残骸或物理样本回收', '下击暴流假说无法解释全部异常'],
  },
  {
    id: 'shanghai-hongqiao',
    date: '1991-03-18',
    location: '上海虹桥机场及苏州空域',
    country: '中国',
    region: 'Asia',
    name: '上海虹桥机场UFO追踪',
    nameEn: 'Shanghai Hongqiao Airport UFO Chase',
    shortDesc: '橙红色火球分裂为两个物体，与飞机保持300米距离，26分钟塔台录音档案',
    description: '飞行员朱兆元报告遭遇橙红色火球状不明物体，该物体随后分裂为两个黑色物体（圆形与长方形），与飞机保持约300米距离，忽东忽西，方向变幻不定，并在临近苏州上空时突然掉头高速向飞机飞来，后急速爬高消失。虹桥机场塔台与飞行员的实时对话录音被保存，是国内已知唯一一份飞行员UFO目击录音档案。',
    confidence: 'High',
    image: '/images/event-shanghai.jpg',
    sensors: ['目视', '塔台录音', '海军录像'],
    physicalCharacteristics: ['instantaneous-acceleration', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: '新民晚报', url: 'https://xmwb.xinmin.cn' },
      { label: '上海UFO探索研究中心', url: '#' },
      { label: '紫金山天文台', url: 'http://www.pmo.ac.cn' },
    ],
    limitations: ['雷达未公开确认锁定该物体', '海军战士录像画质有限', '可能为远距离光源'],
  },
  {
    id: 'kofu-incident',
    date: '1975-02-23',
    location: '日本山梨县甲府市',
    country: '日本',
    region: 'Asia',
    name: '甲府UFO事件',
    nameEn: 'Kofu Incident',
    shortDesc: '两名儿童目击橙色发光物体着陆，类人实体触碰，混凝土柱被推倒，土壤放射性异常',
    description: '两名7岁小学生目击两个橙色发光物体，其中一个在葡萄园附近着陆。男孩报告称从飞碟中走出一个约1.3米高、穿银色服装、有四根手指的类人实体，其中一个男孩被该实体触碰右肩。次日调查团队在现场发现两根实心混凝土柱被推倒、土壤中存在环形压痕和轻微放射性异常报告。',
    confidence: 'Medium',
    image: '/images/event-kofu.jpg',
    sensors: ['目视', '物理痕迹'],
    physicalCharacteristics: ['physical-traces', 'group-sighting'],
    sources: [
      { label: '甲府市官方网页', url: 'https://www.city.kofu.yamanashi.jp' },
      { label: '共同通信社', url: 'https://www.kyodonews.jp' },
    ],
    limitations: ['目击者仅为两名儿童', '存在恶作剧可能性', '放射性检测存在争议'],
  },
  {
    id: 'imphal-airport',
    date: '2023-11-19',
    location: '印度曼尼普尔邦英帕尔',
    country: '印度',
    region: 'Asia',
    name: '英帕尔机场UFO事件',
    nameEn: 'Imphal Airport UFO Incident',
    shortDesc: '机场关闭数小时，印度空军出动"阵风"战斗机搜索，东部司令部官方推特确认',
    description: '机场工作人员目视发现不明飞行物体，导致机场航班运营暂停数小时。印度空军东部司令部启动防空响应机制，从哈希马拉空军基地紧急出动两架"阵风"（Rafale）战斗机升空搜索。飞行员进行了低空搜索，但未发现任何目标。印度空军在官方推特确认"激活了防空响应机制"。',
    confidence: 'Medium',
    image: '/images/event-imphal.jpg',
    sensors: ['目视', '军方响应'],
    physicalCharacteristics: ['group-sighting'],
    sources: [
      { label: 'India Today', url: 'https://www.indiatoday.in' },
      { label: '印度空军推特', url: 'https://twitter.com/IAF_MCC' },
    ],
    limitations: ['无雷达确认记录', '无影像数据公开', '可能为无人机或气球'],
  },
  {
    id: 'submarine-transmedium',
    date: '2022',
    location: '太平洋某海域',
    country: '美国',
    region: 'North America',
    name: '核潜艇跨介质球形物体',
    nameEn: 'Submarine Transmedium Sphere',
    shortDesc: 'AARO确认球形物体从空中进入水中高速移动后离开水面，正式排除气球假说',
    description: 'AARO 2024年报告确认，2022年一艘美国核潜艇在执行任务期间，通过声纳和光电系统捕获了一个球形物体，该物体从空中进入水中，在水中以高速移动，然后再次离开水面。AARO正式排除了气球假说。该事件被AARO列为21起"真正异常"之一。',
    confidence: 'High',
    image: '/images/event-submarine.jpg',
    sensors: ['声纳', '光电系统'],
    physicalCharacteristics: ['transmedium', 'multi-sensor', 'low-observability'],
    sources: [
      { label: 'AARO 2024年度报告', url: 'https://www.aaro.mil' },
    ],
    limitations: ['未公开视频、照片或详细传感器数据', '核潜艇传感器数据通常不对外公开'],
  },
  {
    id: 'salyut6',
    date: '1981-05',
    location: '礼炮6号空间站',
    country: '苏联',
    region: 'Space',
    name: '礼炮6号宇航员目击',
    nameEn: 'Salyut 6 Cosmonaut Sighting',
    shortDesc: '宇航员Kovalyonok目击"手指大小"物体爆炸分裂，地面监控中心探测到大量电磁波',
    description: '苏联宇航员Vladimir Kovalyonok在2004年莫斯科记者招待会上公开表示，他在礼炮空间站上通过舷窗看到一个"手指大小的物体"，该物体按轨道飞行，随后突然爆炸并分成两个互相连接的部分。另一名宇航员Viktor Savinykh也目击了该现象。返回地球后得知当天地面监控中心探测到了大量电磁波。',
    confidence: 'Medium',
    image: '/images/event-salyut6.jpg',
    sensors: ['目视', '地面雷达'],
    physicalCharacteristics: ['space', 'multi-sensor', 'electromagnetic'],
    sources: [
      { label: '俄罗斯新闻网', url: 'https://www.rbc.ru' },
    ],
    limitations: ['无照片或录像记录', '可能是太空碎片或卫星解体事件'],
  },
  {
    id: 'salyut7-angels',
    date: '1984-07-12',
    location: '礼炮7号空间站',
    country: '苏联',
    region: 'Space',
    name: '礼炮7号"太空天使"事件',
    nameEn: 'Salyut 7 "Space Angels"',
    shortDesc: '6名宇航员两次独立目击七个人形发光生物，约20-30米高，有翅膀和光环',
    description: '第一次目击（7月12日）：宇航员报告整个空间站被明亮的橙色光芒包围，随后看到七个人形发光生物（估计约20-30米高），有薄雾状的翅膀、光环和人类的面部。第二次目击（7月25日）：新到达的三名宇航员在太空行走任务期间同样看到七名"天使"再次出现，六名在轨宇航员共同目击。',
    confidence: 'Medium',
    image: '/images/event-salyut7.jpg',
    sensors: ['目视', '群体目击'],
    physicalCharacteristics: ['space', 'group-sighting'],
    sources: [
      { label: '俄罗斯电视台', url: 'https://www.1tv.ru' },
    ],
    limitations: ['无照片、视频、雷达或任何仪器记录', '可能是疲劳、缺氧或宇宙射线引发的视觉现象'],
  },
  {
    id: 'apollo17',
    date: '1972-12',
    location: '月球表面附近',
    country: '美国',
    region: 'Space',
    name: '阿波罗17号月球照片三个光点',
    nameEn: 'Apollo 17 Three Lights',
    shortDesc: '2026年Pentagon通过PURSUE首次官方公开，照片中三个光点呈三角形排列',
    description: '2026年5月8日，美国国防部通过PURSUE平台首次以官方身份公开了阿波罗任务期间的UAP相关影像。一张照片中显示"月球天空右下象限内有三个呈三角形排列的点，放大后清晰可见"。宇航员Eugene Cernan报告称观察到"闪烁、旋转的现象"，并判断为"空间中的物理物体而非纯粹光学现象"。',
    confidence: 'Medium',
    image: '/images/event-apollo17.jpg',
    sensors: ['照片', '宇航员目视'],
    physicalCharacteristics: ['space', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'PURSUE平台', url: 'https://www.war.gov/UFO' },
      { label: 'CBS News', url: 'https://www.cbsnews.com' },
    ],
    limitations: ['宇航员当时推测可能是航天器脱落的冰或油漆碎片', '照片未经多传感器交叉验证', '美国国防部声明为"preliminary"初步分析'],
  },
  {
    id: 'gemini4-mcdivitt',
    date: '1965-06-04',
    location: '地球轨道（太平洋上空）',
    country: '美国',
    region: 'Space',
    name: '双子座4号McDivitt目击',
    nameEn: 'Gemini 4 McDivitt Sighting',
    shortDesc: 'McDivitt目击白色圆柱形物体（"像啤酒罐插着铅笔"），Condon报告确认三项未解释事件之一',
    description: '宇航员James McDivitt看到窗外出现一个白色圆柱形物体，带有从侧面伸出的"长臂"（like a beer can with a pencil sticking out）。McDivitt估计观察约30秒，用两台相机拍摄了照片。返回地球后，McDivitt检查NASA发布的照片，确认它们不是他看到的物体。Condon报告官方确认此事件为"在轨宇航员目视观察中，三项未能得到充分解释的事件之一"。',
    confidence: 'Medium',
    image: '/images/event-gemini4.jpg',
    sensors: ['目视', '照片'],
    physicalCharacteristics: ['space', 'multi-sensor'],
    sources: [
      { label: 'NASA任务档案', url: 'https://www.nasa.gov' },
      { label: 'Condon报告', url: 'https://www.ncbi.nlm.nih.gov' },
      { label: 'The Black Vault', url: 'https://www.theblackvault.com' },
    ],
    limitations: ['McDivitt是唯一直接目击者（White在睡觉）', 'NORAD提出可能是Pegasus B卫星但角尺寸不符'],
  },
  {
    id: 'rendelsham-forest',
    date: '1980-12',
    location: 'Rendelsham Forest',
    country: '英国',
    region: 'Europe',
    name: 'Rendelsham Forest事件',
    nameEn: 'Rendelsham Forest Incident',
    shortDesc: '美国空军基地核武器储存区UAP着陆，英国国防部/Condign报告确认',
    description: '美国空军基地核武器储存区发生UAP着陆事件。军事人员报告看到发光物体在森林中降落，留下物理痕迹。英国国防部进行了调查，Condign报告（2000年）对事件进行了科学评估。该事件是英国最著名的UAP案例之一，涉及核武器设施的敏感区域。',
    confidence: 'High',
    image: '/images/event-rendelsham.jpg',
    sensors: ['目视', '物理痕迹', '官方报告'],
    physicalCharacteristics: ['nuclear-association', 'physical-traces', 'electromagnetic'],
    sources: [
      { label: '英国国家档案馆', url: 'https://www.nationalarchives.gov.uk' },
      { label: 'Condign报告', url: 'https://www.nationalarchives.gov.uk' },
    ],
    limitations: ['部分细节存在争议', '可能是灯塔或军事试验'],
  },
  {
    id: 'roswell',
    date: '1947',
    location: '新墨西哥州罗斯威尔',
    country: '美国',
    region: 'North America',
    name: '罗斯威尔事件',
    nameEn: 'Roswell Incident',
    shortDesc: '坠毁物回收，军方最初声明为"飞碟"，后改口为气象气球，多源争议',
    description: '1947年7月，美国新墨西哥州罗斯威尔附近 rancher 报告发现坠毁物残骸。美国空军最初发布新闻稿称回收了"飞碟"，但随后改口为气象气球。该事件成为UFO研究中最著名的案例之一，涉及大量争议和阴谋论。尽管官方解释为气象气球（Mogul项目），但部分研究者认为存在隐瞒。',
    confidence: 'Medium',
    image: '/images/event-roswell.jpg',
    sensors: ['目视', '物理痕迹'],
    physicalCharacteristics: ['physical-traces', 'group-sighting'],
    sources: [
      { label: 'FBI档案', url: 'https://vault.fbi.gov' },
      { label: '美国空军报告', url: 'https://www.af.mil' },
    ],
    limitations: ['官方解释为Mogul项目气象气球', '缺乏多传感器验证', '大量二手信息被夸大'],
  },
  {
    id: 'washington-invasion',
    date: '1952',
    location: '华盛顿特区',
    country: '美国',
    region: 'North America',
    name: '华盛顿入侵',
    nameEn: 'Washington Invasion',
    shortDesc: '华盛顿特区UAP集中目击，雷达确认，多源报道，引发全国关注',
    description: '1952年7月，华盛顿国家机场和安德鲁斯空军基地的雷达多次捕捉到不明飞行目标。华盛顿国家机场的雷达操作员Harry Barnes报告了7个目标，其中一些以超过已知飞机速度移动。该事件引发了全国媒体关注，促使美国空军成立Project Blue Book。',
    confidence: 'Medium',
    image: '/images/event-washington.jpg',
    sensors: ['雷达', '目视', '多源报道'],
    physicalCharacteristics: ['multi-sensor', 'group-sighting', 'instantaneous-acceleration'],
    sources: [
      { label: 'Project Blue Book档案', url: 'https://www.archives.gov' },
    ],
    limitations: ['部分目标可能是温度逆转造成的雷达异常', '缺乏照片或物理证据'],
  },
  {
    id: 'sts75-tether',
    date: '1996',
    location: '太空轨道',
    country: '美国',
    region: 'Space',
    name: 'STS-75系绳事件',
    nameEn: 'STS-75 Tether Incident',
    shortDesc: 'NASA官方视频，碟形物体围绕断裂系绳飞行，引发广泛关注',
    description: 'NASA STS-75任务期间，12英里长的系绳在太空中断裂。NASA官方视频显示了多个碟形物体围绕断裂系绳飞行。这些物体被描述为圆形，带有凹陷中心，在视频中清晰可见。该视频成为太空UAP研究中最著名的视觉证据之一。',
    confidence: 'Medium',
    image: '/images/event-sts75.jpg',
    sensors: ['NASA视频', '宇航员目视'],
    physicalCharacteristics: ['space', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'NASA官方视频', url: 'https://www.nasa.gov' },
    ],
    limitations: ['物体可能是系绳附近的碎片或冰晶', '距离和尺寸难以判断'],
  },
  {
    id: 'chile-san-clemente',
    date: '2010',
    location: 'San Clemente空军基地',
    country: '智利',
    region: 'South America',
    name: '智利San Clemente空军基地',
    nameEn: 'Chile San Clemente Air Base',
    shortDesc: '智利空军官方发布的UAP视频，CEFAA科学调查确认',
    description: '智利空军在San Clemente空军基地拍摄到UAP视频，由智利空军UAP研究委员会（CEFAA）进行科学调查。视频显示不明飞行物体以高速移动，引发军方和科学界关注。CEFAA是南美最活跃的UAP调查机构之一。',
    confidence: 'High',
    image: '/images/event-chile.jpg',
    sensors: ['官方视频', '军方调查'],
    physicalCharacteristics: ['multi-sensor', 'instantaneous-acceleration'],
    sources: [
      { label: 'CEFAA', url: 'https://www.dgac.gob.cl' },
      { label: '智利空军', url: 'https://www.fach.cl' },
    ],
    limitations: ['部分技术细节未公开', '可能是已知飞行物或自然现象'],
  },
  {
    id: 'oumuamua',
    date: '2017',
    location: '太阳系',
    country: '——',
    region: 'Space',
    name: 'Oumuamua',
    nameEn: '1I/ʻOumuamua',
    shortDesc: '首个确认的星际物体，非引力加速度，极端形状，SETI null results',
    description: 'Oumuamua是首个被确认的星际物体（1I/2017 U1），于2017年10月被夏威夷的Pan-STARRS望远镜发现。其异常特征包括：非引力加速度（无法用太阳辐射压完全解释）、极端长宽比（约6:1或更高）、低黄道面倾角。所有SETI搜索均为null results。Bergner & Seligman（Nature, 2023）提出氢气冰体假说可解释其加速行为。',
    confidence: 'High',
    image: '/images/event-oumuamua.jpg',
    sensors: ['Pan-STARRS望远镜', 'SETI'],
    physicalCharacteristics: ['space', 'multi-sensor'],
    sources: [
      { label: 'Nature论文', url: 'https://www.nature.com' },
      { label: 'SETI Institute', url: 'https://www.seti.org' },
    ],
    limitations: ['星际物体与近地UAP是两个独立现象', '异常特征可被自然物理解释'],
  },
]

export function getEventById(id: string): UAPEvent | undefined {
  return events.find((e) => e.id === id)
}

export function getEventsByConfidence(level: ConfidenceLevel): UAPEvent[] {
  return events.filter((e) => e.confidence === level)
}

export function getEventsByRegion(region: string): UAPEvent[] {
  return events.filter((e) => e.region === region)
}

export function getEventsByCharacteristic(char: string): UAPEvent[] {
  return events.filter((e) => e.physicalCharacteristics.includes(char))
}

export function searchEvents(query: string): UAPEvent[] {
  const q = query.toLowerCase()
  return events.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.country.toLowerCase().includes(q) ||
      e.shortDesc.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
  )
}
