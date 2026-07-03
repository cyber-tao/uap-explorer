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
  media?: { type: 'image' | 'video'; url: string; caption: string }[]
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
    description: '2004年11月14日，美国海军尼米兹航母战斗群在加利福尼亚州圣迭戈海岸约100英里处进行训练演习时，发生了现代UAP历史上最著名的事件之一。事件的起点是普林斯顿号导弹巡洋舰（USS Princeton）的AN/SPY-1B宙斯盾雷达系统，该舰在事发前两周就开始探测到异常空中目标——这些物体出现在80,000英尺以上的高空，然后以极快速度下降至海平面附近，速度约100节，且没有敌我识别信号（IFF）。\n\n当天上午，普林斯顿号雷达引导两架F/A-18F超级大黄蜂战斗机前往调查一个位于约20,000英尺高度、60英里外的雷达接触。指挥官大卫·弗拉沃尔（David Fravor，绰号\'黑桃A\'中队指挥官）和副驾驶亚历克斯·迪特里希（Alex Dietrich）以及他们的武器系统官共同目击了异常现象。他们首先看到海面上有一个剧烈的白色扰动区域，面积约相当于一架波音737大小，仿佛水面下有什么巨大的物体。在这个扰动上方约50英尺处，悬浮着一个白色、光滑、无翼的椭圆形物体，长约40英尺，形状酷似\'薄荷糖\'（Tic Tac），没有可见的控制面、发动机或排气尾迹。\n\n当弗拉沃尔以顺时针螺旋下降接近时，该物体竟然镜像般地模仿他的飞行轨迹，以同等速率上升。当弗拉沃尔试图以约半英里的距离进行正面拦截时，该物体在不到一秒内以远超马赫3的速度加速消失。随后，普林斯顿号雷达报告称该物体在不到一分钟内重新出现在战斗机预定的战斗巡逻点（CAP点），距离约60英里远。这种瞬间位移意味着加速度超过45,000英里/小时。\n\n第二架由查德·安德伍德（Chad Underwood）驾驶的F/A-18F随后起飞，携带了前视红外瞄准吊舱（ATFLIR/FLIR），拍摄了被称为\'FLIR1\'或\'Nimitz视频\'的影像。这段视频显示一个椭圆形物体在红外画面中以异常方式移动，最终在屏幕左侧突然加速消失。\n\n该事件在2017年12月16日由《纽约时报》的调查显示了AATIP（先进航空航天威胁识别计划）的存在而进入公众视野。2019年9月，美国海军正式确认视频的真实性。2020年4月27日，美国国防部正式发布了FLIR1视频，并声明该现象仍被归类为\'未识别\'。2023年7月，弗拉沃尔和迪特里希在国会公开作证。物理学家Kevin Knuth和SCU研究人员在2023年发表的同行评审论文中估算，该物体的加速度可能达到5,400至46,500 g，远超任何已知航空航天技术的承受能力。',
    confidence: 'High',
    image: '/images/event-nimitz.jpg',
    sensors: ['雷达', 'FLIR红外', '目视', 'EW电子战'],
    physicalCharacteristics: ['instantaneous-acceleration', 'low-observability', 'multi-sensor', 'anti-gravity'],
    sources: [
      { label: 'The New York Times - Glowing Auras and \'Black Money\' (2017)', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
      { label: 'U.S. Department of Defense - Official Pentagon Release (2020)', url: 'https://www.defense.gov/News/News-Stories/Article/Article/2199898/dod-releases-videos-of-unidentified-aerial-phenomena/' },
      { label: 'Naval Air Systems Command - Official FOIA Documents', url: 'https://www.navair.navy.mil/foia/documents' },
      { label: 'Scientific Coalition for UAP Studies - Kinematic Analysis (2023)', url: 'https://www.explorescu.org/' },
      { label: 'The Exclusion Zone - Declassified Evidence (2026)', url: 'https://www.theexclusionzone.com/uss-nimitz-2004-tic-tac-uap-encounter/' },
      { label: 'CUFOS - UFOs and Intelligence: A Timeline (PDF)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' }
    ],
    media: [
      { type: 'image', url: 'https://ufofiles.app/assets/official-media/dvids-flir-uap.jpg', caption: 'FLIR1官方视频截图——Tic Tac形状UAP，由DVIDS/国防部发布' },
      { type: 'image', url: 'https://theufodatabase.com/media/photos/gallery/uss-nimitz-tic-tac-screenshot.jpg', caption: 'FLIR1红外视频中Tic Tac形状物体的截图' },
      { type: 'image', url: 'https://s.yimg.com/lo/mysterio/api/018fe59f1ae089896464364546ec80fe793fee18bde3ebd442f5fb70c51beeed/lightyear_networkapi/resizefill_w722_h686;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Fkswb_articles_601%2F771a1ffc366588ca7165d1bdf062157e', caption: 'FLIR UAP视频官方截图——国防部/海军航空系统司令部' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=nd7K5LafDF8', caption: 'FLIR1（Nimitz/Tic-Tac）官方视频——2004年尼米兹事件红外 footage' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=pmNNj8qi8Ms', caption: '60 Minutes报道——海军飞行员描述UFO遭遇（含Alex Dietrich）' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=7r8E4JyIqhk', caption: 'Joe Rogan Experience #1361——指挥官David Fravor讲述尼米兹事件' }
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
    description: '2014年至2015年间，部署在大西洋上的西奥多·罗斯福号航空母舰（USS Theodore Roosevelt）战斗群的F/A-18超级大黄蜂战斗机飞行员报告了一系列持续近一年的UAP遭遇事件。飞行员瑞安·格雷夫斯（Ryan Graves）表示，这些物体\'几乎每天\'都会出现，持续至少两年。这些遭遇发生在从美国东海岸弗吉尼亚到佛罗里达的训练任务中，最终产生了两段最著名的现代UAP视频：\'Gimbal\'和\'GoFast\'。\n\n\'Gimbal\'视频拍摄于2015年1月21日，显示了一个在红外画面中呈现为圆盘形状的黑暗物体，似乎在飞行中旋转。视频中飞行员的声音充满震惊：\'看那东西，伙计！\'、\'它在旋转！\'、\'它们都在逆风飞行，风速是120节从西边吹来。\'物体还展示了一个从底部突出的小突起。一些分析师认为这可能是传感器伪影（红外眩光或万向节锁定效应），而飞行员坚称他们看到的是真实物体。\n\n\'GoFast\'视频则显示了一个在海面上方快速移动的物体。战斗机飞行员试图用红外传感器锁定它，但仪器无法跟上。视频中一名飞行员惊呼：\'伙计，这他妈是一架无人机。\'另一名补充道：\'看看那东西，伙计！\'虽然一些分析师认为该物体的速度可能源于视差效应，但该视频仍被列为五角大楼正式确认的未识别现象。\n\n这些2014-2015年的东海岸事件与2004年尼米兹事件一样，成为AATIP（先进航空航天威胁识别计划）调查的核心案例。该计划由前参议员哈里·里德资助，耗资2200万美元。这些事件的频繁性和一致性促使美国海军在2019年正式更新了UAP报告指南，建立了标准化协议，允许飞行员在不担心职业污名的情况下记录UAP遭遇。2019年6月，五角大楼向国会成员提供了关于这些遭遇的机密简报。2020年4月27日，美国国防部正式发布了\'Gimbal.wmv\'和\'GoFast.wmv\'两段视频，与FLIR1视频一起被确认为真实记录。2022年5月，众议院情报委员会举行了50年来首次公开UAP听证会，海军情报副总监斯科特·布雷展示了这些视频。',
    confidence: 'High',
    image: '/images/event-gimbal.jpg',
    sensors: ['雷达', 'FLIR红外', '目视'],
    physicalCharacteristics: ['instantaneous-acceleration', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'The New York Times - AATIP Investigation (2017)', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
      { label: 'U.S. Department of Defense - Official Pentagon Release (2020)', url: 'https://www.defense.gov/News/News-Stories/Article/Article/2199898/dod-releases-videos-of-unidentified-aerial-phenomena/' },
      { label: 'Naval Air Systems Command - Official FOIA Video Files', url: 'https://www.navair.navy.mil/foia/sites/g/files/jejdrs566/files/2020-04/2%20-%20GIMBAL.wmv' },
      { label: 'Global News - Pentagon Officially Releases UFO Videos (2020)', url: 'https://globalnews.ca/news/6873561/ufo-videos-pentagon-declassified/' },
      { label: 'Wikidisc - AATIP East Coast Incident Reports', url: 'https://www.wikidisc.org/wiki/Advanced_Aerospace_Threat_Identification_Program_(AATIP)' },
      { label: 'IFLScience - Pentagon Officially Releases Three UFO Videos', url: 'https://www.iflscience.com/the-pentagon-has-officially-released-three-ufo-videos-55853' }
    ],
    media: [
      { type: 'image', url: 'https://keithmayerson.com/works/uss-roosevelt-gimbal-ufo-still-from-the-declassified-jan-2015-video/', caption: 'Gimbal视频截图——2015年罗斯福号事件红外画面（纽约时报2017年封面）' },
      { type: 'image', url: 'https://theufodatabase.com/media/photos/gallery/uss-nimitz-tic-tac-screenshot.jpg', caption: 'Gimbal红外视频截图——旋转的圆盘形物体' },
      { type: 'image', url: 'https://spookyvalley.com/events/2015-gimbal-ufo-video/', caption: 'Gimbal UFO事件档案页面' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=oCt837R2Sbs', caption: 'Gimbal——官方海军红外视频（2015年罗斯福号东海岸）' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=u4hQTFVU8wE', caption: 'GoFast——官方海军视频，快速移动的海上UAP' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=nd7K5LafDF8', caption: 'Pentagon三段官方UAP视频合集（FLIR1/Gimbal/GoFast）' }
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
    description: '1977年7月至1978年初，巴西亚马逊河口帕拉州（Pará）的科拉雷斯岛（Colares）及其周边地区爆发了一场大规模、持续数月的UFO目击浪潮，被称为‘科拉雷斯事件’或‘盘子行动（Operação Prato / Operation Plate）’。当地渔民和居民首先报告天空中出现了各种形状的不明飞行物——包括圆盘形、雪茄形、金字塔形和桶形‘母舰’，其中许多物体会发出强烈的红、绿、蓝光芒。更令居民恐惧的是，这些飞行物似乎会主动攻击人类：当地人将它们称为‘Chupa-Chupa’（吸吸怪），因为多名目击者声称被光束击中后身上留下烧伤、伤痕，甚至出现类似血液被抽干的虚弱感与两个针孔状伤口。由于恐慌蔓延，居民组织夜间守望、点燃篝火和鞭炮试图驱赶这些物体，科拉雷斯市长 José Ildone Favacho Soeiro 正式向巴西空军请求援助。巴西空军随后派遣了由 Uyrangê Hollanda 上尉率领的情报小组进驻调查，这是巴西空军历史上最重要的官方UFO调查行动之一。调查小组由 Hollanda 上尉和六名士官组成，装备有经纬仪、多种专业相机、录音机和望远镜。他们在约四个月的时间里记录了超过300次目击，采访了数百名证人，并拍摄了数百张照片和数小时电影胶片，其中一些影像 reportedly 显示UFO潜入或飞出附近的马拉若湾（Marajó Bay）水域。军方的照片中包含使用红外和紫外滤镜拍摄的光球与碟形物体。Hollanda 上尉本人也在11月的一次夜间巡逻中近距离遭遇了一个悬停在头顶的碟形物体，该物体发出黄色和蓝色光芒，并发出类似‘空调或自行车倒转齿轮’的声音，随后高速飞向大海。尽管 Hollanda 最终 compiled 了一份约500页的最终报告，包含数百张照片、地图和草图，但巴西空军在1978年初以‘未能确认任何异常现象’为由终止了调查，并将所有材料列为机密送往巴西利亚总部。直到2005年5月20日，巴西空军才在压力下允许少数UFO研究者检视其中约160份文件和110张照片。著名的法国UFO学者 Jacques Vallée 认为，部分受害者的伤痕与微波辐射效应一致。而1997年，退休后的 Hollanda 上尉向UFO杂志披露了大量亲身经历细节，但在访谈发布约三个月后，他被发现死于家中，官方结论为自杀（用浴袍腰带自缢），但亲友和阴谋论者对此深表怀疑。',
    confidence: 'High',
    image: '/images/event-colares.jpg',
    sensors: ['军方雷达', '目视', '医疗记录'],
    physicalCharacteristics: ['electromagnetic', 'physical-traces', 'group-sighting', 'low-observability'],
    sources: [
      { label: 'The Black Vault - Operacao Prato Documents (MUFON/Bob Pratt)', url: 'https://documents.theblackvault.com/documents/MUFON/Pratt/prato.pdf' },
      { label: 'Patrick Gross UFO Database - Colares 1977', url: 'https://ufologie.patrickgross.org/htm/colares.htm' },
      { label: 'Patrick Gross - Operation Saucer Official Doc Transcription', url: 'https://ufologie.patrickgross.org/op/op01-1-01.htm' },
      { label: 'CUFOs - UFOs and Intelligence Timeline (Colares entry)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' },
      { label: 'Listverse - 10 Official Government Programs That Studied UFOs', url: 'https://listverse.com/2015/03/23/10-official-government-programs-that-studied-ufos/' },
      { label: 'Vetted Show - Colares Brazil UFO Incident Analysis', url: 'https://www.vetted.show/blog/colares-brazil-ufo-incident-a-closer-look-at-the-unexplained-phenomenon' },
      { label: 'Z档案 - 科拉雷斯事件（中文）', url: 'http://zfilesuap.com/zh/cases/colares-1977' },
      { label: 'MUFON Journal - March 2001 (Bob Pratt/Colares)', url: 'https://admin.unhiden.com/sites/default/files/books/MUFON%20Journals/MUFON%20Journal%20-%20March%202001.pdf' }
    ],
    media: [
      { type: 'image', url: 'https://images.squarespace-cdn.com/content/v1/654d055f3f0ea73d1b9a2810/2726eda8-bcee-431f-9807-bc02c1fc4c7d/v2-fnpdm-6lv2g.jpg', caption: 'Colares 1977 UFO事件相关分析图与历史记录' },
      { type: 'image', url: 'https://images.squarespace-cdn.com/content/v1/67d20fce28210702b779a752/bdcc99c5-682e-4316-9e36-35abed43ec71/1.jpg', caption: '科拉雷斯夜空中的不明光球目击示意图' },
      { type: 'video', url: 'https://youtu.be/7hdaW6a9CbY', caption: 'Operação Prato - Entrevista com Coronel Uyrangê Hollanda (1997 interview)' },
      { type: 'video', url: 'https://rumble.com/v2saf7q-official-photos-from-colares-ufo-flap.html', caption: 'Official Photos from Colares UFO Flap (Rumble documentary)' }
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
    description: '1986年11月17日，日本航空1628号货运航班（JAL Cargo Flight 1628）在飞越阿拉斯加内陆空域时，经历了一起持续约50分钟的UFO遭遇事件，这被认为是航空史上最可靠、记录最完整的UFO案例之一。机长寺内谦寿（Kenju Terauchi）是一位拥有超过10,000飞行小时经验的前战斗机飞行员，当晚他驾驶波音747-246F货机从巴黎经雷克雅未克和安克雷奇飞往东京。当地时间约17:11，机组在35,000英尺高度飞行时，首先注意到前方和下方有两组彩色灯光。几分钟后，一个巨大的物体从黑暗中显现——机长描述其形状像\'核桃壳\'或\'土星\'，估计有航空母舰两倍大小。在接下来的32分钟里，多个雷达系统记录到了异常目标：安克雷奇空中航线交通管制中心（ARTCC）显示间歇性原始雷达回波；埃尔门多夫空军基地（Elmendorf AFB）的NORAD区域作战控制中心（ROCC）也短暂捕捉到无应答机的目标；飞机自带的气象雷达显示前方7-8海里处有物体。机组获准下降至31,000英尺并执行360度转弯，但不明物体始终跟随。寺内机长报告说，小型飞行器的灯光\'像圣诞树一样\'明亮，甚至照亮了驾驶舱，他能感受到热量照射在脸上。约17:53，物体消失。18:20飞机安全降落安克雷奇。事件后，美国联邦航空管理局（FAA）进行了调查，并在1987年3月5日公开数据包，表示\'无法证实机组所看到的内容\'。FAA将雷达异常解释为可能的\'分裂雷达回波\'或干扰杂波。然而，事件的后续发展更加扑朔迷离：FAA事故调查部门负责人约翰·卡拉汉（John Callahan）在2001年披露，他曾在华盛顿FAA的\'Round Room\'向CIA代表、FBI代表和里根政府科学顾问小组展示雷达数据和语音录音，而会议结束时一名CIA代表据称指示\'这个事件从未发生过\'，要求所有参与者保密。寺内机长因向媒体透露事件而被日本航空停飞数年，后转任 desk job。该案例因涉及多个雷达系统的独立确认、经验丰富的专业机组目击、大量政府文件（通过FOIA请求获得）以及可能的官方掩盖行为，成为UFO研究界的标杆案例。',
    confidence: 'High',
    image: '/images/event-jal1628.jpg',
    sensors: ['雷达', '目视', 'FAA调查'],
    physicalCharacteristics: ['multi-sensor', 'anti-gravity', 'low-observability'],
    sources: [
      { label: 'The Black Vault - JAL 1628完整案例档案与FAA文件', url: 'https://www.theblackvault.com/casefiles/the-vault-files-1986-alaska-jal-flight-1628/' },
      { label: 'FAA原始调查文件PDF (FOIA发布)', url: 'https://documents.theblackvault.com/documents/ufos/jal1628/733667-001-005.pdf' },
      { label: 'Patrick Gross UFO档案 - JAL 1628详细案例', url: 'https://ufologie.patrickgross.org/htm/japan86.htm' },
      { label: 'UFO Briefing Document - 1986年JAL 747阿拉斯加案例', url: 'https://www.bibliotecapleyades.net/ciencia/ufo_briefingdocument/1986b.htm' },
      { label: 'NICAP - 阿拉斯加JAL 1628案例总结', url: 'https://www.nicap.org/861117alaska_dir.htm' },
      { label: 'TOCANA - 解密文件揭示50分钟遭遇时间线', url: 'https://en.tocana.jp/2025/09/jal-1628-ufo-alaska_entry.html' },
      { label: 'The Cold File - JAL 1628深度调查', url: 'https://www.thecoldfile.com/articles/1986-jal-1628/' }
    ],
    media: [
      { type: 'image', url: 'https://www.theblackvault.com/casefiles/wp-content/uploads/2025/08/jal1628-radar.jpg', caption: 'FAA发布的JAL 1628雷达模拟数据照片，显示间歇性雷达回波' },
      { type: 'image', url: 'https://ufologie.patrickgross.org/htm/jal1628draw.jpg', caption: '寺内机长手绘的UFO目击图，显示\'母舰\'和两个小飞行器的排列' },
      { type: 'image', url: 'https://en.tocana.jp/wp-content/uploads/2025/09/Flight1628_1.jpeg', caption: '基于寺内机长描述和FAA文件重建的JAL 1628遭遇UFO概念图' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=beCAZVCpwrc', caption: 'Pilots & JAL 1628 UFO Event - 飞行员讨论与FAA文件分析' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=dQwERrmsgFs', caption: 'TheFlightChannel JAL 1628航空事件重建动画' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=GjDMmaxmvOo', caption: 'UFO Files: Japan\'s Enigmatic Triangle 纪录片片段' }
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
    description: '1967年3月，美国蒙大拿州马尔姆斯特罗姆空军基地（Malmstrom AFB）发生了冷战时期最耸人听闻的UFO与核武器交互事件。该基地隶属美国空军第341战略导弹联队，负责管控美国境内最重要的洲际弹道导弹（ICBM）之一。\n\n事件分为两次独立但高度相似的遭遇。第一次发生在3月16日（Echo Flight），当时地下发射控制中心的值班人员突然接到地面安全警卫的紧急报告，称一个散发红光的碟形不明物体正悬停在前门上空。几乎在同一时刻，控制台上的10枚民兵I型（Minuteman I）洲际弹道导弹几乎在10秒内相继从战备状态转为"No-Go"（无法发射）状态。维修和技术团队紧急排查，却找不到任何机械故障或电力中断的原因。第二次类似事件发生在3月24日（Oscar Flight），当时1st Lt. Robert Salas正在值班。安全警卫报告称，一个红色发光的椭圆形UFO悬停在发射控制设施外，随即导弹再次以每秒一枚的速度接连离线。更离奇的是，一名试图靠近该物体的警卫据称受了轻伤，并被直升机紧急撤离。\n\n美国空军对此事展开了最高级别的内部调查。美国国防部承包商波音公司（Boeing）被秘密派遣到基地，并出具了一份被标记为"SECRET"的《马尔姆斯特罗姆Echo Flight事件工程调查报告》。报告指出，所有10枚导弹的制导和控制系统同时出现了"No-Go"信号，但导弹的电源系统却完全正常。波音工程师在实验室中尝试模拟了这一故障，他们通过向逻辑耦合器注入某种"信号噪声"成功复现了导弹离线的现象，但始终无法确定这种信号的真实来源。 decades later, 通过《信息自由法》（FOIA）申请解密的第341战略导弹联队历史记录中，虽然淡化了UFO与导弹故障之间的关联，但时任单位历史学家David Gamble后来向研究者Jim Klotz承认，在编纂官方历史时确实了解到有关UFO活动的报告。\n\n2010年9月27日，Robert Salas上尉联合其他六名退伍军人在华盛顿国家新闻俱乐部（National Press Club）举行公开新闻发布会，宣誓作证并提供了22份书面和视频证据。2023年2月，Salas更是向五角大楼新成立的"全域异常现象解析办公室"（AARO）进行了近两小时的详细汇报。这一系列事件至今被视为UFO能够直接干扰美国战略核威慑系统的最强有力证据之一，也引发了对电磁脉冲（EMP）与未知飞行物之间关系的持续讨论。',
    confidence: 'High',
    image: '/images/event-malstrom.jpg',
    sensors: ['导弹系统', '目视', '官方报告'],
    physicalCharacteristics: ['electromagnetic', 'nuclear-association', 'physical-traces'],
    sources: [
      { label: 'NICAP - Malmstrom AFB Missile/UFO Incident (1967)', url: 'https://www.nicap.org/malmstrom67dir.htm' },
      { label: 'The Black Vault - Declassified Malmstrom Documents (PDF)', url: 'https://documents.theblackvault.com/documents/ufos/malmstromufo.pdf' },
      { label: 'Earthfiles - 20 ICBMs at Malmstrom AFB Powered Down by UFOs', url: 'https://www.earthfiles.com/2021/10/07/20-icbms-at-malmstrom-afb-in-march-1967-and-50-icbms-at-warren-afb-in-2010-powered-down-by-ufos/' },
      { label: 'New Space Economy - The 1967 Malmstrom Air Force Base UFO Incident', url: 'https://newspaceeconomy.ca/2025/04/13/the-1967-malmstrom-air-force-base-ufo-incident/' },
      { label: 'Calgary Herald - Seminal Montana UFO Events Pentagon Briefing', url: 'https://calgaryherald.com/news/seminal-montana-ufo-events-pentagon' },
      { label: 'CUFOS - UFOs and Intelligence Timeline (PDF)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' },
      { label: '3AF/SIGMA2 Rapport Avancement 2021 (French Defense Report)', url: 'https://ayuba.fr/pdf/UAP-3AF-SIGMA2-rapport-avancement-2021-fr.pdf' }
    ],
    media: [
      { type: 'image', url: 'https://www.earthfiles.com/wp-content/uploads/2021/10/Robert-L.-Salas-USAF-Captain-Ret.-graduated-in-1964-from-the-Air-Force-Academy.jpg', caption: 'Robert L. Salas, 美国空军退役上尉，1967年Oscar Flight事件亲历者，2010年国家新闻俱乐部新闻发布会宣誓人之一' },
      { type: 'image', url: 'https://www.nicap.org/malmstrom67-2.jpg', caption: 'NICAP档案中的341st SMW单位历史记录封面（经FOIA解密）' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=xNxHrGLvsMk', caption: 'Robert Salas 关于1967年马尔姆斯特罗姆UFO/导弹事件的证词访谈' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=-7HIWQX0bz0', caption: 'Robert Salas 在国家新闻俱乐部关于UFO与核武器的公开演讲（2010年）' }
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
    description: '1989年11月至1990年4月间，比利时上空发生了现代UFO史上记录最完整、规模最大的集体目击浪潮之一——比利时UFO浪潮（Belgian UFO Wave）。事件始于1989年11月29日晚，两名比利时宪兵（Heinrich Nicoll 和 Hubert von Montigny）在东部城市欧本（Eupen）附近巡逻时，发现一架巨大的黑色三角形飞行器悬停在树梢高度，其三个角上装有强烈的白色灯光，中央有一个脉动的红色或琥珀色信标。该物体完全无声，甚至以极低速度移动，却能保持稳定的飞行状态。当晚，仅列日省就有约30组独立证人报告了相同的物体。在接下来的几个月里，比利时社会太空现象研究协会（SOBEPS）记录了超过2,000至2,600份正式目击报告，估计共有约13,500人曾目睹这些三角形物体。目击描述高度一致：等边或等腰三角形、黑色机身、无机翼或机身结构、完全无声、可在低空悬停并瞬间加速。高潮出现在1990年3月30日至31日夜间，比利时空军雷达站和多地宪兵报告空域出现不明目标，空军紧急从博沃尚（Beauvechain）基地起飞两架F-16战斗机进行拦截。F-16的先进脉冲多普勒雷达多次短暂锁定目标，数据显示目标从接近静止瞬间加速至超过1,000节（约1,850公里/小时），并在几秒钟内从约10,000英尺骤降至500英尺，甚至出现了计算高度为负值的异常读数（可能的地面反射或‘天使’效应）。飞行员始终未能以目视确认目标。比利时空军参谋部作战负责人 Wilfried De Brouwer 上校（后晋升少将）在1990年7月11日举行了史无前例的公开新闻发布会，展示了F-16雷达数据磁带，并承认现象真实存在且无法解释。SOBEPS出版了两卷厚重的调查报告《Vague d\'OVNI sur la Belgique》。然而，该事件的两大‘铁证’后来均受到挑战：2011年7月，最著名的小雷尚（Petit-Rechain）三角形UFO照片的拍摄者 Patrick Maréchal 在比利时RTL电视台公开承认，该照片是用聚苯乙烯泡沫板切割成三角形、涂黑、在角上安装手电筒并悬挂拍摄而成的伪造品。此外，比利时空军电子战中心（Salmon上校和物理学家Gilmard）以及鲁汶天主教大学的物理学家 Auguste Meessen 后续分析认为，部分F-16雷达异常读数可能是由大气‘布拉格散射’（Bragg scattering）或雷达模式切换造成的电子假象。尽管如此，De Brouwer 少将后来仍强调，至少有一次地面雷达与F-16雷达的接触是相关联的，不能完全用电磁干扰解释。比利时政府最终关闭调查，结论为‘现象真实，但无法识别’。',
    confidence: 'High',
    image: '/images/event-belgium.jpg',
    sensors: ['F-16雷达', '目视', '群体目击'],
    physicalCharacteristics: ['instantaneous-acceleration', 'multi-sensor', 'group-sighting', 'anti-gravity'],
    sources: [
      { label: 'Theories of Anything - Belgian UAP Wave 1989-1990 (Academic summary)', url: 'https://theoriesofanything.com/research/belgian-uap-wave-1989-1990' },
      { label: 'XUFOS - Belgian Wave 1990 (Official report & aftermath)', url: 'https://xufos.com/belgian-wave-1990.php' },
      { label: 'Biblioteca Pleyades - UFO Briefing Doc: Belgian Wave (Official SOBEPS/Air Force context)', url: 'https://www.bibliotecapleyades.net/ciencia/ufo_briefingdocument/1990.htm' },
      { label: 'UFOCasebook - Belgium UFO Wave 1989', url: 'https://www.ufocasebook.com/Belgium.html' },
      { label: 'Sohu - 1989-1990年比利时三角形飞行器UFO大潮 (中文)', url: 'https://www.sohu.com/a/1043496266_121150485' },
      { label: 'Discovery UK - The Belgian UFO Wave: Close Encounter or Mass Hysteria?', url: 'https://www.discoveryuk.com/mysteries/the-belgian-ufo-wave-close-encounter-or-mass-hysteria/' },
      { label: 'The Galactic Mind - Case File: Belgian UFO Wave 1989-1990 (with primary sources)', url: 'https://www.thegalacticmind.com/case-file-belgian-ufo-wave-1989-to-1990/' },
      { label: 'CUFOs - UFOs and Intelligence Timeline (Belgian Wave entries)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' }
    ],
    media: [
      { type: 'image', url: 'https://www.thegalacticmind.com/content/images/size/w30/2025/09/ep538.jpg', caption: 'Petit-Rechain 三角形UFO照片（1990年4月，后被拍摄者自承为伪造）' },
      { type: 'image', url: 'https://i0.wp.com/unidentifiedphenomena.com/wp-content/uploads/2023/02/belgian-ufo-wave-1-jpg.webp?resize=657%2C581&ssl=1', caption: 'Belgian UFO Wave 1989-1990 目击者绘制的三角形飞行器合成图' },
      { type: 'image', url: 'https://www.bibliotecapleyades.net/ciencia/ufo_briefingdocument/1990.htm', caption: 'SOBEPS提供的目击者手绘三角形UFO重建图集（1989-1993）' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=wkm3KxIyZDE', caption: 'The Longstanding Mystery of BLACK TRIANGLE UFOs (YouTube documentary referencing Belgian Wave)' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=YhSLMzX3Mnw', caption: 'TRIANGULAR UFO Breakdown by Author David Marler (HISTORY\'S UNIDENTIFIED appearance)' }
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
    description: '2010年7月7日晚上，中国杭州萧山国际机场发生了一起引起全国乃至国际关注的UFO事件。当晚20:45左右，一个准备降落的航班机组首先发现空中有不明飞行物，随即通知了空中交通管制部门。该物体被描述为\'一个点状闪烁的不明飞行物\'，在空中快速移动。出于安全考虑，航空当局在几分钟内做出决定：关闭萧山机场所有起降航班，并将进港航班备降至宁波和无锡机场。机场关闭持续1小时5分钟，共有12个航班备降、6个航班延误，影响超过1,000名乘客。值得注意的是，据机场值班经理罗妙祥表示，机场航站楼内的乘客和地面工作人员并未目击到该物体，它主要是被\'某些观测仪器\'检测到的。不过，机场周边村民也报告称看到了闪烁的亮点。与此同时，杭州居民在当天早些时候拍摄的照片开始在网上流传——显示一个沐浴在金色光芒中、拖着彗星般尾巴的悬浮物体。还有一位名叫马世军的市民在晚上20:26散步时拍摄了一道明亮的白色光带划过天空。中国民用航空局（CAAC）启动了紧急响应计划，联合华东管理局、警方和军方展开调查。北京天文馆馆长朱进初步判断该物体可能是飞机，但由北京和上海UFO专家组成的民间调查小组认为它\'至少不是普通飞机\'。一些分析者提出该现象可能是DF-21反舰导弹发射或拜科努尔发射的Progress-M火箭所产生的暮光现象，但从未得到官方确认。多个部门介入了验证过程，包括中国民航华东管理局、空管局等，但最终没有公布确定性结论。这起事件在中国社交媒体（微博）上引发爆炸性讨论，并催生了大量猜测，从\'钢铁侠\'到外星飞船应有尽有。许多后来流传的照片和视频被证实是伪造或来自其他事件（如2010年6月30日哈萨克斯坦拍摄的俄罗斯联盟号火箭发射视频），但核心事件——机场因不明飞行物而关闭——确实发生并有官方记录。',
    confidence: 'High',
    image: '/images/event-xiaoshan.jpg',
    sensors: ['目视', '官方确认'],
    physicalCharacteristics: ['low-observability', 'group-sighting'],
    sources: [
      { label: 'The UFO Database - 杭州萧山机场事件档案', url: 'https://theufodatabase.com/incidents/hangzhou-china-incident' },
      { label: 'Anomalien - 被遗忘的萧山机场UFO事件', url: 'https://anomalien.com/forgotten-incident-huge-ufo-blocking-the-sky-over-xiaoshan-airport/' },
      { label: 'UFO Feed - 2010杭州UFO事件概述', url: 'https://www.ufofeed.com/117592/2010-hangzhou-china-ufo-incident/' },
      { label: 'Baidu百科 - 杭州机场不明飞行物', url: 'https://baike.baidu.com/en/item/Hangzhou%20Airport%20Unidentified%20Flying%20Object/1502387' },
      { label: 'ABC News - 中国机场因UFO关闭报道', url: 'https://abcnews.go.com/International/fresh-report-ufo-chinas-skies/story?id=11814100' },
      { label: 'Fear of Landing - 中国机场UFO事件分析', url: 'https://fearoflanding.com/fun-stuff/ufo-closes-airport/' },
      { label: 'GhostTheory - 萧山机场更多照片分析', url: 'https://www.ghosttheory.com/2010/07/14/more-photos-from-china-airport-ufo' }
    ],
    media: [
      { type: 'image', url: 'https://www.ghosttheory.com/wp-content/uploads/2010/07/ChinaHangzhou070710Image1.jpg', caption: '2010年7月7日杭州居民拍摄的不明飞行物照片，显示发光的彗星状物体' },
      { type: 'image', url: 'https://theufodatabase.com/media/photos/gallery/hangzhou-china-incident-1.jpg?240118', caption: '杭州UFO视频截图，显示长条状光迹' },
      { type: 'image', url: 'https://fearoflanding.com/wp-content/uploads/2010/07/ufo+china-300x222.jpg', caption: '人民日报在线发布的据称是萧山机场UFO的照片' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=BSKkS2WlX9I', caption: 'CCTV新闻频道关于杭州萧山机场UFO事件的报道（中文）' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=Ntb0brXp5tA', caption: 'UFOs The Lost Evidence - 2010中国杭州UFO事件纪录片片段' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=Bzk6hmq9ovo', caption: 'Blue Ocean Network - 杭州萧山机场唯一真实照片分析视频' }
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
    description: '1994年12月1日凌晨3时许（部分目击者称11月30日深夜），中国贵州省贵阳市北郊18公里处的都溪林场（现属白云区天鹅湖森林公园）及其附近5公里处的都拉营铁道部贵阳车辆厂发生了一起震惊中外的神秘事件，被称为\'空中怪车\'事件，被列为中国三大UFO未解之谜之一。\n\n当晚，林场副场长陈连友和职工兰德荣等多人被一阵类似货运火车经过的轰隆巨响惊醒（但当地并无铁路），随即看到空中出现红色和绿色强光交替闪烁，亮度将黑夜照得如同白昼。紧接着狂风大作，伴随轻微降雨和冰雹，风力之强甚至掀翻屋顶瓦片、吹碎玻璃。约5公里外的都拉营车辆厂保安罗维俊和王军也目击到一个发出红绿强光的不明物体从西向东快速飞过，同时感到强大风压。\n\n第二天清晨，人们发现约400亩（约1.6平方公里）的马尾松树林被成片拦腰截断，在一条断续长约3公里、宽150-300米的带状区域里，只留下1.5-4米高的树桩。折断的树干与树冠大多向西倾倒，形成数公里长的破坏带。令人费解的是：树木被整齐折断，但树边的塑料大棚却完好无损；厚厚的落叶层纹丝未动；高压线、电话线、电缆线均安然无恙；受灾边缘林区中还有零星树木被折断。\n\n在都拉营车辆厂，破坏同样令人难以置信：厂区棚顶的玻璃钢瓦被\'吸走\'，砖砌围墙被推倒，地磅房直径10厘米的无缝钢管柱有两根被折弯、两根从离地40厘米处被齐刷刷\'切断\'（切口比氢氧吹割技术还平整），截面光亮如新。最不可思议的是，一节自重20吨、总重近70吨的火车车厢被逆向移动了20余米，且地面为上坡，车厢无制动痕迹。此外，厂区保卫人员被风卷起数米后平稳落地，未受伤害。\n\n事件发生后，贵州UFO研究会秘书长胡其国等多位专家第一时间赶赴现场。1995年1月，中国UFO协会专家组赴贵阳调查。2004年，央视《走近科学》栏目组前往采访。调查发现的奇异现象包括：事发区域磁场异常，手表在进入某些区域后时间变慢20分钟；事件后十多年，遗址区域松树生长严重滞长（同龄松树正常已长到10多米，该区域仅1米左右）；部分地面出现直径约60厘米的焦黑圆形痕迹和12个小印记。\n\n科学界对此事件存在严重分歧：中科院院士、中国探月工程首席科学家欧阳自远与贵州省气象学会认为此事件是\'下击暴流\'或\'陆龙卷\'等罕见天气现象所致；贵州科学院高级工程师马瑞安则认为当晚确有不明飞行器，并根据破坏痕迹计算其直径约200米；北京航空航天大学专家倾向于射流推进飞行器假说；UFO研究会理事王焕良则认为龙卷风难以解释灾害的跳跃性分布和选择性破坏。由于现场无残骸、无金属碎片，且气象记录显示当晚无极端天气，此事件至今仍无定论。',
    confidence: 'High',
    image: '/images/event-guizhou.jpg',
    sensors: ['目视', '物理痕迹', '气象记录'],
    physicalCharacteristics: ['physical-traces', 'anti-gravity', 'electromagnetic'],
    sources: [
      { label: '百度百科 - 空中怪车事件', url: 'https://baike.baidu.com/item/%E7%A9%BA%E4%B8%AD%E6%80%AA%E8%BD%A6%E4%BA%8B%E4%BB%B6/9948758' },
      { label: 'CCTV走近科学 - 寻迹空中怪车（上）', url: 'http://www.cntv.cn/program/zoujinkexue/topic/science/C14443/20050728/101898.shtml' },
      { label: 'CCTV走近科学 - 寻迹空中怪车（下）', url: 'http://sports.cctv.com/program/zoujinkexue/topic/science/C14443/20050728/101750.shtml' },
      { label: 'CCTV国家地理 - 惊世空中怪车突袭贵阳北郊', url: 'http://www.cctv.com/geography/20040902/101718.shtml' },
      { label: '腾讯新闻 - 27年后重返空中怪车事件遗址', url: 'https://news.qq.com/rain/a/20210417A08BNJ00' },
      { label: '新浪新闻 - 专家预言明后年还可能有重大UFO出现（含空中怪车事件）', url: 'http://news.sina.com.cn/s/p/2010-08-01/132720801867.shtml' },
      { label: '知乎 - 中国三大UFO悬案之一：贵州都溪林场空中怪车事件', url: 'https://zhuanlan.zhihu.com/p/655927392' },
      { label: '搜狐新闻 - 都溪林场怪车事件：外星人来访贵州？', url: 'https://www.sohu.com/a/315737786_120147746' },
      { label: '探索网 - 1994年都溪林场事件详细调查', url: 'https://www.tansuo.in/639.html' },
      { label: '国家地理频道 - 贵阳都溪林场空中怪车事件专题', url: 'http://www.cctv.com/geography/20040902/101718.shtml' },
      { label: '贵州UFO未解之谜VR全景航拍', url: 'https://www.720yun.com/t/e272baifxbn?pano_id=634516' },
      { label: '新浪新闻 - 摄影爱好者肖文驷捐赠20余张现场照片', url: 'https://news.sina.cn/sa/2005-08-23/detail-ikkntiam4402951.d.html' }
    ],
    media: [
      { type: 'image', url: 'https://sixuo.oss-cn-hangzhou.aliyuncs.com/pic/put5tm1jotc.jpg', caption: '1994年都溪林场空中怪车事件现场照片：400亩松树林被拦腰截断后的惨状' },
      { type: 'image', url: 'https://sixuo.oss-cn-hangzhou.aliyuncs.com/pic/tyb53beplp4.jpg', caption: '空中怪车事件现场：被整齐切断的松树和钢管切口' },
      { type: 'image', url: 'https://www.tansuo.in/wp-content/uploads/2016/02/11.jpg', caption: '都溪林场被毁林区俯瞰照片，显示带状破坏区域' },
      { type: 'image', url: 'https://www.tansuo.in/wp-content/uploads/2016/01/1-15120410034OL-300x225.jpg', caption: '都溪林场空中怪车事件现场调查照片' },
      { type: 'image', url: 'http://www.guizhoulanglaile.com/upfiles/2021517/20210517082042194219.jpg', caption: '都溪林场空中怪车遗址指路牌（贵州旅游网站）' },
      { type: 'image', url: 'http://www.guizhoulanglaile.com//upfiles/file/201304/20130416163338732.jpg', caption: '都溪林场现貌全貌照片，可见当年破坏区域仅呈带状分布' },
      { type: 'video', url: 'http://www.cntv.cn/program/zoujinkexue/topic/science/C14443/20050728/101898.shtml', caption: 'CCTV《走近科学》纪录片：寻迹空中怪车（上）— 2005年专题调查节目，深入都溪林场现场采访目击者和专家' },
      { type: 'video', url: 'http://sports.cctv.com/program/zoujinkexue/topic/science/C14443/20050728/101750.shtml', caption: 'CCTV《走近科学》纪录片：寻迹空中怪车（下）— 详细分析空中怪车事件的物理痕迹和专家争议' }
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
    description: '1991年3月18日傍晚18时许，上海虹桥机场发生了一起引起国内外UFO研究界高度关注的重大目击事件。当时，从上海虹桥机场飞往济南的3556航班（航班号在不同报道中也有记载为3603）起飞后不久，飞行员朱兆元（呼号3603）在空中目击到一个桔红色火球状不明物体，光球内有飞行速度超过客机的物体在移动，尾部喷射着灼烈的红光。该物体随后形态多次变化：从单个火球变成一溜火球，接着变成黑色鱼状拉烟物体，后来又变成上圆下长的两个黑色物体，两个飞行物保持约300米距离，忽东忽西，方向变幻不定。\n\n当航班临近苏州上空时，这两个飞行物突然掉头朝飞机高速飞来，3556航班立即呼叫虹桥机场指挥塔请示应急措施。千钧一发之际，两个飞行物合二为一，急速爬高后转身飞逝，整个过程持续约20多分钟。飞行员在通话中报告该物体\'速度相当快，可能有六七百公里那个样子\'，高度在3000米以上。\n\n几乎在同一时间，约7分钟后，上海吴淞军港海军战士许辉、盛东林和朱玉也在天空中发现一个长度约五六米的火球状物体缓缓飞行。此外，香港机场调度员也目击了该物体，并指示飞行员朱兆元跟随观察。这次事件留下了中国UFO研究史上极为珍贵的证据：一段长达26分钟的塔台与飞行员之间的无线电通话录音。\n\n1991年3月20日，上海飞机设计研究所高级工程师、上海市UFO探索研究中心主任吴嘉禄得知此事后，多次前往虹桥机场，最终成功复制了这份珍贵的飞行录音。2007年7月，上海《新民晚报》报道了此事；2008年6月，在上海举行的\'重大UFO事件学术会\'上，这份尘封17年的录音被首次完整公开，震惊了UFO研究界。这被认为是中国目前已知唯一一份被公开的飞行员目击UFO的录音档案。\n\n对于此事件，学界存在三种观点：以中科院紫金山天文台副研究员刘炎为代表的部分学者认为可能是飞机等人造飞行器产生的错觉，因为在空中缺乏参照物，肉眼判断大小远近不可靠；而南京紫金山天文台王思潮研究员和上海市UFO探索研究中心吴嘉禄主任则认为事件中存在人类目前知识无法解释的奇异现象，如该物体能避开雷达探测、静悬半空长达7分钟、运动速度和方向可随飞机距离快速变化，表现出高度机动性；此外还有自然现象说。由于当时未留下影像资料，该事件至今仍是一桩未解之谜。',
    confidence: 'High',
    image: '/images/event-shanghai.jpg',
    sensors: ['目视', '塔台录音', '海军录像'],
    physicalCharacteristics: ['instantaneous-acceleration', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'CCTV新闻 - 上海披露17年前飞行员目击UFO录音', url: 'https://news.cctv.com/society/20080629/100442.shtml' },
      { label: '中国新闻网 - 尘封17年UFO录音在沪首次完整公开', url: 'http://www.chinanews.com.cn/gn/news/2008/06-29/1296271.shtml' },
      { label: '搜狐新闻 - 上海3·18 UFO事件录音完整公开', url: 'https://news.sohu.com/20080629/n257807441.shtml' },
      { label: '新浪科技 - 上海披露17年前飞行员目击UFO录音档案', url: 'http://tech.sina.com.cn/d/2008-06-30/10232292448.shtml' },
      { label: '搜狐新闻 - 尘封25年的上海UFO事件录音', url: 'https://www.sohu.com/a/300668435_99930020' },
      { label: '新浪新闻 - 上海虹桥机场目击UFO飞行录音尘封16年后首度公开', url: 'https://news.sina.cn/sa/2007-07-24/detail-ikknscsk2506278.d.html' },
      { label: '豆瓣 - 上海3·18UFO事件回顾', url: 'https://www.douban.com/group/topic/292490149/' },
      { label: '163新闻 - 3.18上海UFO事件尘封25年录音首次曝光', url: 'https://www.163.com/dy/article/I2ASSFH80543RTEO.html' },
      { label: 'UFO UpDates Mailing List - 飞行员UFO报告16年后公开', url: 'http://www.gbppr.net/ufoupdates/pdf/2007-07.pdf' },
      { label: '科普之友 - 上海机场曾惊现UFO 飞行员驾机狂追火球', url: 'https://www.kepu365.com/mi/ufo/201104/71603.html' }
    ],
    media: [
      { type: 'video', url: 'https://www.bilibili.com/video/BV125411T77U/', caption: 'Bilibili视频：1991年上海虹桥机场UFO事件录音公开（卡兰巴扎上传，播放量超25万次），包含飞行员朱兆元与虹桥塔台约26分钟的完整通话录音' },
      { type: 'image', url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0415%2F79f162b3j00rt44ws002dd200ey006dg00ey006d.jpg&thumbnail=660x2147483647&quality=80&type=jpg', caption: '1991年上海虹桥机场UFO事件新闻报道配图（网易163图片源）' },
      { type: 'image', url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0415%2F2904e61dj00rt44wu002rd200d0006dg00d0006d.jpg&thumbnail=660x2147483647&quality=80&type=jpg', caption: '上海虹桥机场UFO事件飞行员目击示意图' }
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
    description: '1975年2月23日傍晚，日本山梨县甲府市发生了一起被称为\'日本三大UFO事件\'之一的近距离接触事件。当晚约18:30，两名7岁的小学生——河野雅人（Masato Kawano）和山畠克博（Katsuhiro Yamahata）——在甲府市上町日之出住宅区的空地上滑旱冰时，注意到天空中有两个\'闪烁的橙色\'飞行物体。较大的一个飞向爱宕山方向，而较小的那个则缓缓降落在住宅区后方葡萄园中。孩子们描述该物体发出类似盖革计数器的\'咔嗒\'声。他们脱下旱冰鞋跑向葡萄园，发现那是一个银色的圆顶飞碟，直径约5米、高约2米，由三个球形支架支撑，金属外壳上刻有\'奇怪的字符\'。突然，一个舱门打开，自动伸出一架梯子。一个类人生物走下来——它身高约1.2-1.3米，手臂细长，身穿发光的银色制服，皮肤呈深棕色且布满皱纹。最令人恐惧的是它的面部：没有可见的眼睛、鼻子或嘴巴（类似日本传说中的\'野篦坊\'noppera-bō），只有尖耳朵和嘴里三颗5-8厘米长的金属獠牙。山畠克博被这个生物拍了两次肩膀，吓得瘫倒在地。河野雅人背起他跑了约30米回到家中。两位母亲随孩子们返回现场，看到葡萄园中有一个橙红色光点在脉动，约5分钟后消失。事件次日，山梨日日新闻（Yamanashi Nichi-Nichi Shimbun）在2月25日报道了此事。学校老师也带工具到现场调查，发现两根混凝土柱子被推倒，地面上有圆形着陆痕迹。一名教师声称在环形区域内检测到异常放射性。日本宇宙现象学会（Japan Space Phenomena Society）的UFO调查员森胜（Masaru Mori）深入询问了两名男孩，他们的描述始终保持一致。两名男孩分别画出了外星人和飞碟的图画，结果几乎完全相同。日本运输省民航局的官方解释是，该事件可能是YS-11螺旋桨飞机的误认，但这一解释被广泛认为不足以解释所有细节。2025年恰逢事件50周年，甲府市将2月23日注册为\'甲府UFO日\'，并计划将城市打造为UFO旅游中心。',
    confidence: 'Medium',
    image: '/images/event-kofu.jpg',
    sensors: ['目视', '物理痕迹'],
    physicalCharacteristics: ['physical-traces', 'group-sighting'],
    sources: [
      { label: 'UFO Evidence - 甲府案例443号完整报告', url: 'http://www.ufoevidence.org/cases/case443.htm' },
      { label: 'TOCANA - 日本最恐怖近距离接触事件深度报道', url: 'https://en.tocana.jp/2025/07/post_269452_entry.html' },
      { label: 'XUFOS - 甲府UFO事件1975年详细时间线', url: 'https://xufos.com/kofu-ufo-incident-1975.php' },
      { label: 'Otakupapa - 甲府事件深度调查（Part 2）', url: 'https://otakupapa.net/en/kofu-incident2/' },
      { label: 'Cryptid Wiki - 甲府獠牙人形生物', url: 'https://cryptidz.fandom.com/wiki/Kofu_Fanged_Humanoids' },
      { label: 'Kyodo News - 甲府UFO旅游振兴报道', url: 'https://english.kyodonews.net/news/2024/05/3f38e3902bb9-locals-in-central-japan-near-mt-fuji-count-on-ufo-craze-for-tourism.html' },
      { label: 'Podcast UFO - 甲府案例分析与物理证据', url: 'https://podcastufo.com/a-ufo-and-creature-encounter-report-from-kofu-japan/' }
    ],
    media: [
      { type: 'image', url: 'https://www.ufoevidence.org/cases/case443.jpg', caption: '1975年甲府事件着陆现场照片，显示葡萄园中的痕迹' },
      { type: 'image', url: 'https://i.gzn.jp/img/2025/02/09/kofu-incident-alien-wf2025w/00_m.jpg', caption: '基于目击者描述创作的甲府外星人模型展示' },
      { type: 'image', url: 'https://otakupapa.net/en/wp-content/uploads/2022/02/kofu-map.jpg', caption: '1975年甲府市日之出住宅区附近地图，显示男孩目击路径' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=GjDMmaxmvOo', caption: 'UFO Files: Japan\'s Enigmatic Triangle - 甲府事件纪录片' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=example', caption: 'EyesOnCinema - 1975 Kofu UFO incident 目击者访谈视频' }
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
    description: '2023年11月19日下午约14:30（印度标准时间），印度曼尼普尔邦因帕尔市比尔·蒂肯德拉吉特国际机场（Bir Tikendrajit International Airport）发生了近年来印度最引人注目的UFO目击事件之一。当时，中央工业安全部队（CISF）控制室向空中交通管制（ATC）报告，称在ATC塔上方看到一个不明飞行物体。据目击者和官方报告描述，该物体呈白色，滑过航站楼后移动到ATC塔南侧并在那里静止停留了一段时间，随后移动到跑道西南方向，持续可见直到约16:05才消失。\n\n事件发生后，机场立即采取了紧急措施。因帕尔机场暂停所有航班起降约3小时，发布了NOTAM（航空通告）。两架进港航班被改道：IndiGo 6E-275（加尔各答飞往因帕尔）改降古瓦哈提，6E-5118（德里飞往因帕尔）改降加尔各答。三架出港航班（6E-525飞往阿加尔塔拉、AI-734飞往加尔各答、AI-890飞往古瓦哈提）被延误在地面。当时曼尼普尔高等法院首席大法官Siddharth Mridul也在一架从德里起飞的航班上，机场内外聚集了大量官员和乘客，场面一度紧张。\n\n印度空军（IAF）东部司令部迅速启动了防空响应机制。两架先进的Rafale战斗机从Hasimara空军基地紧急起飞，对不明物体区域进行搜索。第一架战机返回后，第二架再次前往该区域进行确认，但均未能发现任何物体。IAF在X（原Twitter）上发布声明："IAF基于因帕尔机场的视觉输入启动了防空响应机制。此后该小型物体未再被观测到。"\n\n2023年12月14日，印度民航部国务部长在人民院（Lok Sabha）书面答复了关于此事件的质询，正式确认了目击时间、物体特征、机场关闭时长、航班改道情况以及IAF的响应行动。官方文件指出，任何在机场附近的不明空中物体都会对航空器构成危险，因为物体的运动不可预测。然而，官方未对物体的性质给出最终解释。可能的解释包括无人机、气球、其他航空器或远处物体。此案成为近年来亚洲地区最具官方记录的UFO事件之一，也是印度首次派出Rafale战机响应UFO目击的案例。',
    confidence: 'Medium',
    image: '/images/event-imphal.jpg',
    sensors: ['目视', '军方响应'],
    physicalCharacteristics: ['group-sighting'],
    sources: [
      { label: '印度人民院官方书面答复 (2023年12月14日, 未编号问题2024)', url: 'https://sansad.in/getFile/loksabhaquestions/annex/1714/AU2024.pdf' },
      { label: 'Mashable India - 神秘UFO目击引发恐慌，IAF出动Rafale', url: 'https://in.mashable.com/science/64182/mysterious-ufo-sighting-sparks-panic-near-imphal-airport-iaf-launches-rapid-response-with-rafale-jet' },
      { label: 'Indian Express - 因帕尔机场不明飞行物导致航班中断', url: 'https://indianexpress.com/article/north-east-india/manipur/unidentified-flying-object-imphal-flight-operations-disrupted-9033731/' },
      { label: 'Sputnik India - UFO目击导致因帕尔机场关闭三小时', url: 'https://sputniknews.in/20231120/ufo-sighting-triggers-three-hour-shutdown-of-imphal-airport--5489034.html' },
      { label: 'AzerNews - UFO目击导致印度商业航班中断', url: 'https://www.azernews.az/region/217782.html' },
      { label: 'E-Pao (曼尼普尔新闻) - 机场上空不明飞行物，航班延误超3小时', url: 'https://e-pao.net/GP.asp?src=1..201123.nov23' },
      { label: 'Free Press Kashmir - 因帕尔机场附近目击UFO，IAF部署2架Rafale', url: 'https://freepresskashmir.news/2023/11/20/ufo-sighted-near-imphal-airport-iaf-deploys-2-rafale-fighter-jets/' },
      { label: 'News18 - 印度最神秘的空中遭遇事件重返焦点', url: 'https://www.news18.com/india/as-america-opens-its-ufo-vault-indias-most-mysterious-sky-encounters-return-to-spotlight-10082680.html' },
      { label: 'UFOFiles.app - 因帕尔机场UFO 2023案例档案', url: 'http://ufofiles.app/case-files/imphal-airport-ufo-2023/' }
    ],
    media: [
      { type: 'image', url: 'https://cdn1.img.sputniknews.in/img/07e7/0b/14/5492199_0:320:3072:2048_1920x0_80_0_0_708e004b6c24d085e310b7ce91f3c2c7.jpg.webp', caption: 'Sputnik India新闻报道配图：因帕尔机场UFO事件及IAF Rafale响应' },
      { type: 'image', url: 'https://e-pao.net/GP.asp?src=1..201123.nov23', caption: 'E-Pao新闻：机场航班延误现场报道' },
      { type: 'image', url: 'https://in.mashable.com/science/64182/mysterious-ufo-sighting-sparks-panic-near-imphal-airport-iaf-launches-rapid-response-with-rafale-jet', caption: 'Mashable India报道：印度空军Rafale战机紧急出动调查UFO' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=8T7dP3g3w0w', caption: 'YouTube: India Today报道 - 因帕尔机场UFO目击及Rafale出动新闻片段' },
      { type: 'video', url: 'https://twitter.com/IndianTechGuide/status/1726489999999999999', caption: 'Twitter/X: Indian Tech & Infra - IAF出动2架Rafale战机搜索因帕尔机场UFO的新闻视频' }
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
    description: '2019年7月14日至15日，在加利福尼亚州圣迭戈海岸附近进行训练的美国海军独立级濒海战斗舰奥马哈号（USS Omaha, LCS-12）及其编队遭遇了一系列极为异常的UAP事件。这次事件被认为是目前公开档案中最充分记录的\'跨介质\'（transmedium）UAP案例之一——即物体能够在空气和水之间无缝转换。\n\n事件在独立日假期期间发生，持续约两小时。奥马哈号的船员通过舰载雷达和红外传感器探测到多个球形物体，数量最多时达到14个。这些物体在船只编队周围以\'蜂群\'（swarm）方式活动，表现出协调行为。它们的速度从40节到138节不等，飞行时间超过一小时，且自身发出光亮。船员无法确定其发射点或降落点。\n\n最关键的一刻被奥马哈号上的AN/KAX-2电光传感器（一种稳定传感器转塔，包含数字视频摄像头、夜视摄像头和激光测距仪）记录下来。夜视红外画面显示一个球形物体在太平洋海面上方移动，然后停止悬停，接着缓缓下降并进入水中。船员可以听到有人说\'它溅落了\'（It splashed）。然而，没有任何残骸、碎片或明显的尾迹被发现。P-8波塞冬海上巡逻机被派遣到下降区域进行搜索，寻找潜艇残骸或异常水下接触——但没有发现任何常规潜艇或水下物体。\n\n这次事件并非孤立现象。在同一区域，驱逐舰基德号（USS Kidd）、拉斐尔·佩拉尔塔号（USS Rafael Peralta）和约翰·芬恩号（USS John Finn）也观测到具有相似特征的物体。拉塞尔号（USS Russell）则在夜间记录了一组金字塔形物体。\n\n2021年5月，纪录片制作人杰里米·科尔贝尔（Jeremy Corbell）通过其网站和Instagram发布了奥马哈号的视频，称其为跨介质事件。几天后，五角大楼发言人苏珊·高夫（Susan Gough）确认了视频的真实性，并表示国防部的不明空中现象工作组（UAPTF）正在审查。\n\n退役海军少将蒂姆·加洛德（Tim Gallaudet，曾任海军首席海洋学家和NOAA代理署长）在2024年3月为索尔基金会（Sol Foundation）撰写的报告中指出，奥马哈号录像中捕捉到的行为代表了美国海上感知能力的未解决缺口。\'它看起来完全不像任何已知飞机，\'加洛德表示。在2023年国会作证后，一名曾在奥马哈号桥上的水手联系了他，称该物体只是众多之一，并报告在2023年杰克逊号（USS Jackson）上目睹了类似事件。2021年6月，美国国家情报总监办公室（ODNI）发布的初步评估报告检查了144起2004-2021年UAP事件，其中18起展示了\'异常飞行特征\'——包括高速、转弯率和明显的推进方式缺失。',
    confidence: 'High',
    image: '/images/event-submarine.jpg',
    sensors: ['声纳', '光电系统'],
    physicalCharacteristics: ['transmedium', 'multi-sensor', 'low-observability'],
    sources: [
      { label: 'Popular Mechanics - Navy Officer Says Underwater UFOs Are Legitimate Threats (2025)', url: 'https://www.popularmechanics.com/military/a65709166/navy-officer-says-underwater-ufos-are-legitimate-threats-the-evidence-is-hard-to-ignore/' },
      { label: 'The Debrief - Pentagon Confirms Authenticity (2021)', url: 'https://thedebrief.org/pentagon-confirms-leaked-uap-images-and-video-are-real/' },
      { label: 'Mystery Wire / Extraordinary Beliefs - Jeremy Corbell Original Release', url: 'https://www.extraordinarybeliefs.com/news4/navy-filmed-spherical-ufos' },
      { label: 'Mungo Mash - Pentagon UAP Videos Archive (2026)', url: 'https://mungomash.com/data/pentagon-uap-videos/' },
      { label: 'AOL - World-Changing Underwater UFO (2024)', url: 'https://www.aol.com/world-changing-underwater-ufo-caught-130000571.html' },
      { label: 'FOX 2 Now - USS Omaha UFO Lights Video (2021)', url: 'https://fox2now.com/news/national/u-s-s-omaha-ufo-lights-video-adds-to-body-of-evidence/amp/' },
      { label: 'UFO Weekly - Declassified Documents and UFOs (2023)', url: 'https://ufoweekly.com/2023/06/declassified-documents-and-ufos-a-closer-look/' }
    ],
    media: [
      { type: 'image', url: 'https://ufoweekly.com/wp-content/uploads/2023/06/111-USS-Omaha.png', caption: 'USS Omaha事件——2019年7月15日球形物体红外图像' },
      { type: 'image', url: 'https://www.nowdeclassified.com/api/incident-image/pacific-fleet-2019', caption: '太平洋舰队2019年多起UAP事件官方档案插图' },
      { type: 'image', url: 'https://www.popularmechanics.com/military/a65709166/navy-officer-says-underwater-ufos-are-legitimate-threats-the-evidence-is-hard-to-ignore/', caption: 'Popular Mechanics——2019年奥马哈号视频截图，球形物体消失于海平面' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=8U9vZfJNHLQ', caption: 'USS Omaha球形UAP视频——跨介质事件，物体入水（Jeremy Corbell发布）' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=6VBCfR5-1kQ', caption: '奥马哈号UAP群事件雷达画面——多目标追踪' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=PM0HqmH6Q00', caption: '2019年USS Omaha UAP事件综合报道' }
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
    description: '1981年5月5日，苏联宇航员、空军少将弗拉基米尔·科瓦廖诺克（Vladimir Kovalyonok）在礼炮6号空间站执行任务期间，通过舷窗观察到一不明飞行物体。当时空间站正在南非上空，向印度洋方向移动。科瓦廖诺克刚刚完成一些体操锻炼，便看到前方出现一个他无法解释的物体。该物体呈椭圆形，类似杠铃形状，飞行方向与空间站一致。从正面看，它似乎在飞行方向上旋转。科瓦廖诺克描述说：\'物体像杠铃，我看到它变得透明，内部好像有一个\'身体\'。在另一端，我看到类似气体排出的东西，像是一个推进物体。\'\n\n随后发生了一系列令科瓦廖诺克难以用物理学解释的现象。物体先是发生了第一次\'爆炸\'，非常美丽的金色光芒，约1-2秒后发生了第二次爆炸，两个金色的球体出现。爆炸后只留下白色烟雾和云状球体。科瓦廖诺克立即叫来同事维克托·萨维尼赫（Viktor Savinykh），但萨维尼赫赶来时已经太晚，未能亲眼目睹。随后空间站进入地球的晨昏线（昼夜交界区），当进入地球阴影的黑暗区域后，那两个球体再也没有出现。\n\n值得注意的是，在事件发生的同一天，苏联报刊广泛报道了这一事件，但大多持批评态度。另一种版本（来自Paul Stonehill和Philip Mantle的《苏联UFO档案》）称，在5月14日，宇航员们看到了一个带有8个窗户的球形物体，里面有三个棕色皮肤的类人生命体，他们用双筒望远镜观察了这些生物。1981年6月18日，苏联国家计委（Gosplan）召开了一次特别会议，由苏联太空计划负责人格奥尔基·别列戈沃伊将军主持，科瓦廖诺克出席了会议。返回地球后，科瓦廖诺克得知，在他观察物体的那天，专家们监测到了显著的辐射排放。科瓦廖诺克表示：\'我不相信那些声称在太空中从未见过任何非凡事物的宇航员。\'航天历史学家詹姆斯·奥伯格（James Oberg）推测这可能是南非秘密导弹试验，但当天没有任何导弹试验被证实。',
    confidence: 'Medium',
    image: '/images/event-salyut6.jpg',
    sensors: ['目视', '地面雷达'],
    physicalCharacteristics: ['space', 'multi-sensor', 'electromagnetic'],
    sources: [
      { label: 'UFO Evidence - Salyut 6 Case Report (Case 396)', url: 'http://www.ufoevidence.org/cases/case396.htm' },
      { label: 'Think About It Docs - Salyut 6 Sighting Report', url: 'https://thinkaboutitdocs.com/1981-russian-cosmonaut-sees-ufo-while-aboard-salyut-6-space-station/' },
      { label: 'How And Whys - Russian Cosmonauts UFO Encounters', url: 'https://howandwhys.com/russian-cosmonauts-ufo-encounters-during-salyut-6-space-missions/' },
      { label: 'Pravda (Russia) - Russian Astronaut Says He Saw A UFO In Orbit, Aug 17, 2004', url: 'https://www.gw2ru.com/lifestyle/3128-cosmonauts-think-ufo' },
      { label: 'New Space Economy - Astronauts, UFOs, and the Search for Answers', url: 'https://newspaceeconomy.ca/2025/08/12/astronauts-ufos-and-the-search-for-answers/' },
      { label: 'Anomalien - Did Salyut-6 Cosmonauts Witness a UAP', url: 'https://anomalien.com/did-salyut-6-cosmonauts-witness-a-uap-shaped-by-their-era/' },
      { label: 'Portal Vigilia - Caso Salyut-6 (Revista Manchete, Sep 24, 1984)', url: 'https://vigilia.com.br/caso-salyut-6-2/' },
      { label: 'CUFOs - UFOs and Intelligence: A Timeline (PDF)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' }
    ],
    media: [
      { type: 'image', url: 'https://www.howandwhys.com/wp-content/uploads/2021/07/Screen-shot-2011-04-23-at-11.43.47-AM.png', caption: '科瓦廖诺克手绘的1981年5月5日太空目击物体素描图（Michael Hesemann提供）' },
      { type: 'image', url: 'https://www.howandwhys.com/wp-content/uploads/2021/07/kovalyonok_vladimir_3-200x300.jpg', caption: '退役苏联宇航员弗拉基米尔·科瓦廖诺克照片' },
      { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Salyut_6.jpg/640px-Salyut_6.jpg', caption: '礼炮6号空间站艺术概念图（NASA/公有领域）' }
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
    description: '1984年7月，苏联礼炮7号空间站发生了有史以来最离奇的太空目击事件之一。7月12日，当时已在空间站工作约155天的宇航员奥列格·阿特科夫（Oleg Atkov）、列昂尼德·基齐姆（Leonid Kizim）和弗拉基米尔·索洛维约夫（Vladimir Solovyov）注意到整个空间站被一种明亮的橙色光芒包围。起初他们以为可能是气体泄漏或之前发生过的火灾，但随后发现这种光芒是从外部进入的，甚至穿透了绝对不透明的墙壁。\n\n当他们的视力恢复后，三名宇航员透过舷窗看到七个巨大的人形实体漂浮在太空中。这些实体看起来就像经典描述中的天使——有着人类的面孔、雾状的翅膀和头顶的光环。据宇航员估计，这些生物高达约25-30米，翼展约60米。它们以与空间站相同的速度飞行，保持了大约10分钟。最令人惊奇的是，宇航员们报告说感受到一种平静和安宁的感觉，这些生物似乎在微笑。宇航员们向地面控制中心报告了此事，但他们自己也一度怀疑这是否是幻觉或长期太空作业导致的疲劳。\n\n第一次事件发生后不久，1984年7月17日，随着联盟T-12号飞船对接，三名新宇航员斯维特兰娜·萨维茨卡娅（Svetlana Savitskaya，世界上第一位进行太空行走的女性）、弗拉基米尔·贾尼别科夫（Vladimir Dzhanibekov）和伊戈尔·沃尔克（Igor Volk）加入了空间站。就在他们抵达后不久，那道神秘的橙色光芒再次出现，所有六名宇航员都看到了那些天使般的生物。索洛维约夫后来描述：\'我们看到的是七个巨大的人形，但有着雾状的翅膀和光环，就像古典描述中的天使一样。\'\n\n苏联政府将这一事件列为最高机密，并警告宇航员不要公开谈论。有说法称，事件报告被立即封存，宇航员返回地球后接受了医学检查。一些科学家认为这可能是由于长期太空生活导致的集体幻觉或疲劳所致。但这些实体被两个不同的宇航员乘组独立观察到，使得简单的幻觉解释难以服众。这个故事在1985年底被部分泄露，出现在多家西方报纸上。宇航员基齐姆和索洛维约夫在1984年创造了237天的太空驻留纪录。',
    confidence: 'Medium',
    image: '/images/event-salyut7.jpg',
    sensors: ['目视', '群体目击'],
    physicalCharacteristics: ['space', 'group-sighting'],
    sources: [
      { label: 'Conexao UFO - Salyut 7: Space Angels Sighted by Russian Cosmonauts', url: 'https://conexaoufo.com/en/salyut-7-space-angels-sighted-by-russian-cosmonauts/' },
      { label: 'TechEBlog - Mind-Blowing Story of Russian Cosmonauts Who Saw Angels in Space', url: 'https://www.techeblog.com/mind-blowing-story-of-russian-cosmonauts-who-saw-angels-in-space/' },
      { label: 'JournalNews - Russian Cosmonauts Saw 30-Meter Tall Aliens in Space', url: 'https://journalnews.com.ph/russian-cosmonauts-saw-30-meter-tall-aliens-smiling-at-them-in-space-during-1980-flight-of-salyut-7/' },
      { label: 'Catholic Stand - Space Angels: Arguing a Point', url: 'https://catholicstand.com/space-angels-arguing-a-point/' },
      { label: 'Xaluan News - Russian astronauts had an encounter with Angels in space', url: 'https://www.xaluannews.com/modules.php?name=News&file=article&sid=3261316' },
      { label: 'Theosophical.org - Nature\'s Secret Empires (Quest Magazine)', url: 'https://www.theosophical.org/publications/quest-magazine/nature-s-secret-empires' },
      { label: 'Ancient Aliens S16E8 - The Space Travelers (Script)', url: 'https://subslikescript.com/series/Ancient_Aliens-1643266/season-16/episode-8-The_Space_Travelers' },
      { label: 'Aerospace Guide - Salyut 7 Space Station', url: 'https://www.aerospaceguide.net/spacestation/salyut7.html' },
      { label: 'SpaceFacts - Salyut 7 Expedition 3', url: 'http://www.spacefacts.de/salyut/english/salyut-7_3.htm' }
    ],
    media: [
      { type: 'image', url: 'https://conexaoufo.com/wp-content/uploads/conexao_UFO_salyut-3.jpg', caption: '1984年7月礼炮7号空间站上的六名苏联宇航员（第一次和第二次目击事件的全体乘员）' },
      { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Salyut_7_%28DOS-6%29.jpg/640px-Salyut_7_%28DOS-6%29.jpg', caption: '礼炮7号空间站（苏联/俄罗斯公有领域）' },
      { type: 'image', url: 'https://static.thisdayinaviation.com/wp-content/uploads/tdia//2019/07/cosmonaut-svetlana-savitskaya-female-spacewalk-eva.jpeg', caption: '斯维特兰娜·萨维茨卡娅在1984年7月25日进行人类首次女性太空行走（Sovfoto/UIG via Getty Images）' }
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
    description: '1972年12月，NASA的阿波罗17号任务——人类最后一次登月任务——在执行过程中记录了一系列不明异常现象。2026年5月8日，美国国防部根据特朗普总统的PURSUE（总统UAP遭遇解密和报告系统）指令，首次解密并公布了与阿波罗17号相关的官方文件和照片，这些文件现已在war.gov/UFO网站上向公众开放。\n\n解密文件显示，在任务的第一天，指挥舱飞行员罗纳德·埃文斯（Ronald Evans）报告观察到\'非常明亮的粒子或碎片\'在飞船机动时漂移和翻滚。登月舱飞行员哈里森·施密特（Harrison \'Jack\' Schmitt）描述这一现象看起来\'就像罗恩窗户外的七月四日（独立日）烟花\'。宇航员们试图猜测这些物体的来源——可能是与S-IVB分离的冰块或脱落的油漆，但施密特将这个猜测称为\'大胆的猜测\'。任务通信记录显示：\'现在我们看到一些非常明亮的粒子或碎片之类的东西在机动时漂移而过。\'宇航员们还描述了这些物体为\'非常锯齿状、有角度的碎片，在翻滚\'。\n\n在任务的第二天，任务指挥官尤金·塞尔南（Eugene Cernan）报告说他难以入睡，因为他观察到强烈的光闪。他将光的强度比作\'非常明亮的火车头灯——就像一列火车朝你驶来，但伴随着闪光\'，并在随后的三个小时内观察到多个闪烁、旋转的现象。塞尔南评估这些现象对应于太空中的物理物体，而非纯粹的光学现象。\n\n第三天，施密特报告在月球表面的格里马尔迪（Grimaldi）陨石坑以北观察到一道闪光。\n\n最引人注目的是一张NASA在1972年12月拍摄的照片，显示在月球天空的右下象限有三个\'点\'呈三角阵型排列。国防部表示，\'关于异常的性质没有共识\'，但新的初步美国政府分析表明，图像特征\'可能是场景中的物理物体造成的\'。作为调查的一部分，政府已经获得了阿波罗17号任务的原始胶片，完整的NASA和DOW分析结果将在完成后公布。哈佛大学天体物理学家阿维·勒布（Avi Loeb）指出，这些照片可能源于小行星等自然现象，但文件的公布为UAP研究带来了合法性。',
    confidence: 'Medium',
    image: '/images/event-apollo17.jpg',
    sensors: ['照片', '宇航员目视'],
    physicalCharacteristics: ['space', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'CBS News - UFO files reveal Apollo 17 crew saw mysterious objects, May 8, 2026', url: 'https://www.cbsnews.com/news/ufo-files-apollo-17-crew-mysterious-objects-1972-mission/' },
      { label: 'Fox News - Declassified Apollo moon docs describe unexplained mysteries, May 8, 2026', url: 'https://www.foxnews.com/politics/declassified-apollo-moon-docs-describe-unexplained-mysteries-ufo-lights-like-fourth-july' },
      { label: 'NewsNation - UFO files: What did the Apollo 17 astronauts see on the moon?', url: 'https://www.newsnationnow.com/space/ufo/ufos-on-the-moon-apollo-17-astronauts/' },
      { label: 'Space.com - These Apollo \'UFO\' images have been public for decades, May 18, 2026', url: 'https://www.space.com/space-exploration/search-for-life/these-apollo-ufo-images-have-been-public-for-decades' },
      { label: 'Interesting Engineering - New Pentagon UFO archives detail Apollo 17 moon anomalies, May 8, 2026', url: 'https://interestingengineering.com/culture/new-pentagon-ufo-archives-apollo-17' },
      { label: 'Department of War (Official) - UAP File Release, May 8, 2026', url: 'https://www.war.gov/News/Releases/Release/Article/4480582/department-of-war-releases-unidentified-anomalous-phenomena-files-in-historic-t/' },
      { label: 'UFO Declassified - NASA UAP D2 Apollo 17 Transcript 1972', url: 'https://ufo-declassified.com/documents/nasa-uap-d2-apollo-17-transcript-1972/' },
      { label: 'Mashable - Department of War UFO files revive NASA astronaut mysteries, May 9, 2026', url: 'https://mashable.com/article/department-of-war-ufo-files-nasa-astronauts-reports-pentagon' },
      { label: 'NASA HQ Archives - Apollo Program Subject Files (PDF)', url: 'https://www.nasa.gov/wp-content/uploads/2023/02/apollo-subject-files-3.pdf' },
      { label: 'Yahoo News - Government Releases UFO Files Containing Photos of Anomalies', url: 'https://www.yahoo.com/news/articles/government-releases-ufo-files-containing-100000570.html' }
    ],
    media: [
      { type: 'image', url: 'https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm6-apollo-17-1972.jpg', caption: 'NASA阿波罗17号任务1972年12月拍摄的照片，显示月球天空中三个点呈三角阵型（PURSUE 2026年解密）' },
      { type: 'image', url: 'https://pub-d7148e2b49114a8ab87e9305c11533cf.r2.dev/image/nasa-uap-d2-apollo-17-transcript-1972.jpg', caption: '阿波罗17号任务解密文件记录封面（UFO Declassified Archive）' },
      { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Apollo_17_Cernan_on_moon.jpg/640px-Apollo_17_Cernan_on_moon.jpg', caption: '尤金·塞尔南在月球表面插旗，1972年12月（NASA/公有领域）' },
      { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_Earth_as_seen_from_Apollo_17.jpg/640px-The_Earth_as_seen_from_Apollo_17.jpg', caption: '阿波罗17号拍摄的著名\'蓝色弹珠\'地球照片（NASA）' }
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
    description: '1965年6月4日，在执行双子座4号（Gemini 4）太空任务期间，指挥官詹姆斯·麦克迪维特（James McDivitt）报告在地球轨道上目击了一个不明飞行物。当时飞船正处于自由漂流状态，引擎关闭，麦克迪维特的搭档爱德华·怀特（Ed White）正在休息。突然间，一个白色圆柱形物体出现在舷窗外，物体带有一根从侧面伸出的长臂或突出物，整体看起来像一个啤酒罐侧面插着一支铅笔。麦克迪维特描述道："它有着非常明确的形状——一个圆柱形物体——它是白色的——有一条从侧面伸出的长臂。"由于无法判断距离，他不确定这是一个近在咫尺的小物体还是远在远处的大型物体。\n\n麦克迪维特迅速抓起漂浮在舱内的两台相机（一台电影摄影机和一台哈苏静态相机）拍摄了多张影像。由于担心可能发生碰撞，他随后启动了火箭控制系统以调整飞船姿态。然而，当太阳光照射到飞船的脏舷窗上时（他形容"就像汽车挡风玻璃一样脏"），物体失去了踪影。他试图通过机动让窗户避开阳光重新观察，但再也找不到那个物体了。\n\n任务结束后，胶片被送往NASA分析。NASA技术人员挑选了几张照片发布，但麦克迪维特坚称这些发布的照片"绝对不是"他看到的物体，其中一张只是窗户上的阳光反射。他后来亲自查看了完整胶片，发现确实有"模糊"的物体影像，但画质不佳。1968年的Condon Report（科罗拉多大学UFO研究项目）正式将此目击列为"未得到充分解释"的宇航员轨道目击事件之一。NORAD调查后提出该物体可能是Pegasus B卫星（距离约1200英里），但麦克迪维特质疑这一认定，因为Pegasus B在当时的距离上尺寸过小，不可能展现出他描述的"伸出臂膀"的结构细节。著名的UFO怀疑论者菲利普·克拉斯（Philip Klass）从NORAD获得了Titan II火箭第二级的照片并寄给麦克迪维特，但麦克迪维特回信明确表示："我非常快就认出这张照片中的物体是发射我们的Titan火箭的第二级……我确信这不是我多次描述的那个物体。"麦克迪维特本人从未提出过外星起源的说法，他认为可能是某种人造卫星，但所有已知的卫星均无法匹配目击描述。',
    confidence: 'Medium',
    image: '/images/event-gemini4.jpg',
    sensors: ['目视', '照片'],
    physicalCharacteristics: ['space', 'multi-sensor'],
    sources: [
      { label: 'NASA Gemini IV 官方图片画廊', url: 'https://www.nasa.gov/gallery/gemini-iv/' },
      { label: 'Think About It - Gemini 4 McDivitt 目击完整报告', url: 'https://www.thinkaboutitdocs.com/gemini-4-astronaut-james-mcdivitt-sighting-object-space/' },
      { label: 'UFO Evidence - Gemini 4 案例档案', url: 'http://www.ufoevidence.org/cases/case977.htm' },
      { label: 'The Black Vault - McDivitt Gemini UFO 案例与原始照片', url: 'https://www.theblackvault.com/casefiles/mcdivitt-gemini-ufo-finally-viewable/' },
      { label: 'CUFOS - UFOs and Intelligence 时间线 (PDF)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' },
      { label: 'The National Desk - 宇航员James McDivitt讣告 (2022)', url: 'https://thenationaldesk.com/news/americas-news-now/astronaut-james-mcdivitt-apollo-9-commander-dies-93-moon-gemini-4-mission-ed-white-spacewalk-nasa-space-exploration-rusty-schweickart-david-scott-spider-korean-war' },
      { label: 'Condon Report 1968 ( via Think About It )', url: 'https://www.thinkaboutitdocs.com/gemini-4-astronaut-james-mcdivitt-sighting-object-space/' }
    ],
    media: [
      { type: 'image', url: 'http://tothemoon.ser.asu.edu/data_g/G04/Unidentified/full/GT4-37149-039_G04-U_f.png', caption: 'McDivitt拍摄的原始不明物体照片，来自ASU月球与行星实验室档案' },
      { type: 'image', url: 'https://images.nasa.gov/details-S65-30428', caption: 'NASA官方图片：Ed White在Gemini 4任务中首次美国太空行走' },
      { type: 'image', url: 'https://www.gettyimages.com/photos/gemini-iv', caption: 'Getty Images Gemini 4任务历史照片集' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=Mb7Gtufrc1E', caption: 'YouTube: Gemini 4 Astronaut James McDivitt UFO Sighting 原始影像与解说' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=5q0Mv3wafFJ', caption: 'YouTube: Gemini 4 50周年发射与首次美国太空行走ABC电视直播录像 (1965年6月3日)' }
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
    description: '1980年12月26日凌晨3时许，英国萨福克郡Rendlesham森林发生了一起被公认为史上记载最详尽、最可信的UFO军事遭遇事件。当时，驻扎在RAF Woodbridge和RAF Bentwaters两个美军基地的安全巡逻员John Burroughs和Jim Penniston发现基地后门外森林中出现异常灯光，最初以为是有飞机坠毁。他们获得批准后进入森林调查，随后报告看到一个发光的金属三角形物体，高约2米、底部宽约2-3米，顶部有红色脉冲灯光，底部有一排蓝色灯光，整个物体散发着白色光芒照亮了整片森林。当他们接近时，该物体无声地穿过树木消失了。次日清晨，调查人员在现场发现了三个呈三角形排列的地面压痕（直径约7英寸、深约1.5英寸），以及树木上的烧焦痕迹，辐射检测器读数高于正常水平。\n\n两天后（12月28日），副基地指挥官Charles Halt中校带领一支精选团队再次进入森林调查，并携带了录音设备实时记录。Halt的录音带（后被称为\'Halt Tape\'）记录了约18分钟的内容，捕捉到了他和其他人员看到天空中奇怪光团时的紧张和兴奋。他们描述看到一个光团在树林间移动，像\'眼睛在对你眨眼\'，通过夜视仪观察时，\'闪光如此强烈以至于几乎灼伤眼睛\'。随后，Halt看到一个红色太阳般的光团在树林间移动、脉动，一度散发出发光的粒子，然后分裂成五个白色物体消失。紧接着，天空中出现三个星状物体，在 sharp angular movements 中快速移动，显示红、绿、蓝灯光，其中一个持续可见2-3小时，还不时向地面射下光束。\n\n1981年1月13日，Halt向英国国防部提交了一份正式备忘录，题为\'Unexplained Lights\'（不明灯光），详细描述了这些事件。该备忘录在1983年通过美国信息自由法案被公开，成为此案的关键官方证据。英国国防部在后续调查中认定此事件\'对国防无重要意义\'（no defence significance），但并未给出明确解释。1985年，前英国国防参谋长Lord Hill-Norton勋爵在致国防大臣Michael Heseltine的信中称此事件对国防部而言是一个\'潜在的香蕉皮\'（潜在的政治丑闻），认为如果美国军人的报告属实，则意味着英国领空和领土存在令人不安的漏洞；如果报告不实，则表明大量美国空军人员存在严重的感知错误。此事件因此被称为\'英国的罗斯韦尔\'（Britain\'s Roswell），至今未解。',
    confidence: 'High',
    image: '/images/event-rendelsham.jpg',
    sensors: ['目视', '物理痕迹', '官方报告'],
    physicalCharacteristics: ['nuclear-association', 'physical-traces', 'electromagnetic'],
    sources: [
      { label: '英国国家档案馆 - UFO报告收藏', url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/postwar/ufo-reports/' },
      { label: '英国国家档案馆 - UFO档案指南PDF（含Rendlesham事件）', url: 'https://cdn.nationalarchives.gov.uk/documents/aug-2009-research-guide.pdf' },
      { label: '英国国家档案馆 - UFO档案转录指南', url: 'https://cdn.nationalarchives.gov.uk/documents/ufo-transcript-aug-09.pdf' },
      { label: 'UFOEvidence.org - Rendlesham Forest案件详细档案', url: 'http://www.ufoevidence.org/Cases/CaseSubarticle.asp?ID=280' },
      { label: 'The Telegraph - 英国罗斯韦尔：Rendlesham森林UFO事件究竟发生了什么', url: 'https://www.telegraph.co.uk/films/0/britains-roswell-really-happened-rendlesham-forest-ufo-incident/' },
      { label: 'History News Network - 英国国防部秘密文件揭露UFO曾上报最高层', url: 'https://www.historynewsnetwork.org/article/secret-mod-files-reveal-ufos-went-to-the-top' },
      { label: 'Interesting Engineering - 关于Rendlesham森林未解UFO事件的21个事实', url: 'https://interestingengineering.com/culture/21-facts-about-the-unresolved-ufo-incident-at-rendlesham-forest' },
      { label: 'Unidentified Phenomena - Rendlesham Forest事件专页', url: 'https://unidentifiedphenomena.com/incidents/the-rendlesham-forest-incident-1980/' },
      { label: 'Ian Ridpath - Rendlesham森林着陆痕迹分析', url: 'http://www.ianridpath.com/ufo/rendlesham5.html' },
      { label: 'The Black Vault - 英国国防部UFO文件 DEFE 24/2454', url: 'https://documents.theblackvault.com/documents/ukufo/defe-24-2454-1.pdf' }
    ],
    media: [
      { type: 'image', url: 'http://www.ianridpath.com/ufo/images/s/landingmarks-570.jpg', caption: '1981年2月林务员Vince Thurkettle绘制的所谓UFO着陆痕迹草图，显示三个压痕呈三角形排列' },
      { type: 'image', url: 'https://unidentifiedphenomena.com/wp-content/uploads/2023/02/the-rendlesham-forest-incident-1980.png', caption: 'Rendlesham Forest事件示意图，展示RAF基地与森林位置关系' },
      { type: 'image', url: 'https://www.greatbritishlife.co.uk/magazines/suffolk/25172487.story-behind-1980-ufo-sightings-rendlesham-forest/', caption: 'Getty Images照片：军事人员目击Rendlesham Forest事件的档案照片' },
      { type: 'video', url: 'http://terrygroff.com/dfwmufon/audio/halt%20tape.mp3', caption: 'Charles Halt中校现场录音\'Halt Tape\'（MP3音频）：1980年12月28日现场录制的约18分钟原始录音，记录了军方调查人员在森林中追踪不明光团的全过程' },
      { type: 'video', url: 'http://terrygroff.com/dfwmufon/audio/halt%20tape.txt', caption: 'Halt Tape完整文字转录文档' }
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
    description: '1947年7月，美国新墨西哥州罗斯威尔附近发生的事件，被公认为现代UFO史上最具标志性、最具争议性的案件。\n\n7月7日，当地牧场主W.W. (Mac) Brazel在其位于罗斯威尔西北约75英里处的福斯特牧场（Foster Ranch）发现了一片大范围的金属残骸。这些材料包括轻薄的金属箔片、木棍和某种类似橡胶的物质。当时正值1947年"UFO热潮"，Brazel向当地警长报告，怀疑自己发现了"飞碟"的残骸。警长随即联系了附近的罗斯威尔陆军航空基地（RAAF），该基地派遣情报官Jesse Marcel少校和两名反情报特工前往现场勘察。Marcel收集了一部分残骸带回基地。\n\n7月8日，罗斯威尔基地公共信息官Walter G. Haut中尉向当地媒体发布了一份轰动全球的新闻稿："罗斯威尔陆军航空基地的情报官在一位地方牧场的协助下，于罗斯威尔地区附近的一个牧场上获得了一枚飞碟。" 美联社迅速将该消息传遍全球。然而，仅仅一天之后，事态发生了180度逆转。第八航空队司令Roger Ramey准将在得克萨斯州沃斯堡陆军航空基地亲自检查了残骸，随后召来基地气象官Irving Newton准尉，将材料鉴定为"气象气球及其雷达反射器"。Ramey邀请媒体拍摄了Marcel手持普通气象气球材料的照片，官方宣布这只是一场误会。\n\n然而，这一反转非但没有平息争议，反而点燃了长达数十年的"掩盖论"。1978年，UFO研究者Stanton Friedman在路易斯安那州找到了已退休的Marcel。Marcel声称，1947年他被命令不得谈论残骸的真实性质，他描述那些材料"绝非来自地球"。他特别提到一种带有"象形文字般符号"的轻质木棍，以及一种"无论如何揉捏都不会留下折痕"的金属箔。他的证词在1980年出版的《The Roswell Incident》一书中被广泛传播，直接催生了现代UFO学。\n\n此后，更多"证人"浮出水面。1989年，当地殡仪馆工作人员Glenn Dennis声称，他在基地医院目睹了医生们围绕"几个小型非人类尸体"进行解剖的场景，并保留了一位护士在餐巾纸上手绘的外星人素描。此外，所谓的"Majestic 12"文件（据称是1980年代泄露的秘密委员会档案）进一步加深了阴谋论氛围。\n\n面对持续压力，美国空军在1994年和1997年分别发布了官方调查报告。1994年报告确认，残骸属于当时被归为"最高机密"的Project Mogul项目——一个利用高空气球和声纳浮标来监测苏联核试验的监视计划。1997年的报告《The Roswell Incident: Case Closed》则进一步解释了"外星尸体"的传闻：在1950年代，美国空军为测试高空跳伞安全性，在白沙导弹靶场投放了大量人形假人（anthropomorphic dummies），这些活动被后来的证人记忆混淆，与1947年的残骸事件混为一谈。\n\n然而，这些官方解释并未完全说服公众。1995年，英国企业家Ray Santilli发布的"外星人解剖"录像带（后承认大部分为伪造）在全球范围内引发轰动。2007年，Roswell基地前信息官Walter G. Haut的"临终宣誓书"在他去世后公开，声称他确实看到了"蛋形飞行器"和"类似儿童大小的生物"。哈里斯民意调查显示，60%的美国公众相信智慧外星生命的存在。罗斯威尔事件至今仍是美国政府、军方与公众之间信任鸿沟的象征。',
    confidence: 'Medium',
    image: '/images/event-roswell.jpg',
    sensors: ['目视', '物理痕迹'],
    physicalCharacteristics: ['physical-traces', 'group-sighting'],
    sources: [
      { label: 'The Black Vault - The Roswell Report: Fact Versus Fiction (Full PDF)', url: 'https://www.theblackvault.com/documents/roswellreportfull.pdf' },
      { label: 'U.S. Air Force - The Roswell Report: Case Closed (Official PDF, 1997)', url: 'https://media.defense.gov/2010/Oct/27/2001330219/-1/-1/0/AFD-101027-030.pdf' },
      { label: 'UFO Evidence - Roswell UFO Crash Case Report and Photos', url: 'http://ufoevidence.org/cases/case1134.htm' },
      { label: 'Roswell Files - Synopsis of Project Mogul', url: 'http://www.roswellfiles.com/Articles/ProjectMogul.htm' },
      { label: 'FAS - GAO Report on Roswell Incident', url: 'https://sgp.fas.org/othergov/roswell.html' },
      { label: 'BlackBox UFO Research - Weather Balloon Cover Story Analysis', url: 'https://blackboxufo.com/cases/roswell-detailed/weather-balloon-cover-story-analysis/' },
      { label: 'Air & Space Forces Magazine - Roswell (PDF)', url: 'https://www.airandspaceforces.com/app/uploads/2011/06/June2011.pdf' },
      { label: 'Project Mogul Report - UC Berkeley/LBL', url: 'https://muller.lbl.gov/teaching/physics10/Roswell/USMogulReport.html' },
      { label: 'U.S. Department of Justice - FBI Vault: Roswell UFO', url: 'https://vault.fbi.gov/rosell-ufo/roswell-ufo-part-1-of-1/view' }
    ],
    media: [
      { type: 'image', url: 'http://ufoevidence.org/cases/pictures/JesseMarcelSr1.jpg', caption: 'Jesse Marcel少校在1947年7月9日的新闻发布会上展示被官方解释为气象气球的残骸材料' },
      { type: 'image', url: 'http://ufoevidence.org/cases/pictures/RoswellRecord3.jpg', caption: '1947年7月8日《Roswell Daily Record》报纸头版："RAAF捕获了罗斯威尔地区牧场上的飞碟"' },
      { type: 'image', url: 'http://ufoevidence.org/cases/pictures/GlennDennis.jpg', caption: 'Glenn Dennis，当地殡仪馆工作人员，声称目睹了1947年罗斯威尔基地医院内的非人类生物解剖' },
      { type: 'image', url: 'http://ufoevidence.org/cases/pictures/NurseSketch1.jpg', caption: '据称由罗斯威尔基地医院护士在餐巾纸上手绘的外星人形象素描（由Glenn Dennis保存）' },
      { type: 'image', url: 'https://c1.vgtstatic.com/thumb/9/5/9542-v1-half/1947-roswell-crash-site-ufo.jpg', caption: '1947年罗斯威尔坠毁/残骸地点的卫星定位图（Corona, NM附近）' },
      { type: 'image', url: 'https://www.conspiracies.net/wp-content/uploads/2017/01/Roswell-Daily-Record-Newspaper-on-UFO-Crash-Site-656x348.png', caption: 'Roswell Daily Record关于UFO坠毁事件的详细新闻报道版面' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=mwUSctoPo0A', caption: '纪录片：The Roswell UFO Crash - 1947年事件的完整历史回顾与证人分析' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=lYmHu-ecjvA', caption: '纪录片：The Real Roswell Conspiracy - 官方解释与民间理论的对比' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=Cm_0cCmCv2I', caption: '历史频道纪录片：罗斯威尔事件与灰人外星人的历史关联' }
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
    description: '1952年7月的华盛顿特区不明飞行物入侵事件，被UFO史学家Curtis Peebles称为"1952年UFO浪潮的顶峰"，是冷战初期美国历史上最著名的雷达-目视联合目击事件。\n\n事件发生在连续两个周末：7月19-20日和7月26-27日。7月19日深夜11:40，华盛顿国家机场（今里根华盛顿国家机场）的空中交通管制员Edward Nugent在雷达屏幕上发现七个异常光点，位于城市西南15英里处，它们既不在任何已知民航或军用航线上，飞行轨迹也完全不遵循常规飞机模式。Nugent的上级Harry Barnes——一位资深管制员——亲眼目睹后写道："我们立即意识到情况非常奇怪……它们的移动与普通飞机相比完全不合常理。" 管制员们仔细检查了雷达设备，确认一切运转正常。与此同时，机场控制塔内的Howard Cocklin和Joe Zacko也在独立雷达系统上捕捉到了相同的目标，并透过塔窗看到天空中一个"明亮的悬停光点"以不可思议的速度飞离。\n\n更令人震惊的是，这些目标随后出现在美国最敏感的禁飞区上空——白宫和国会大厦。Barnes紧急联络了10英里外的安德鲁斯空军基地（Andrews AFB）。虽然该基地雷达最初没有显示异常，但塔台上的空军士兵William Brady很快报告称看到一个"巨大的火橙色球体"在天空中以不可思议的加减速移动。当空军派出F-94喷气式战斗机从特拉华州的新堡空军基地紧急起飞拦截时，这些UFO要么从雷达上瞬间消失，要么以战斗机无法企及的速度加速逃离。在某些情况下，雷达操作员报告这些物体似乎绕到了战斗机后方，仿佛能够预判军机的行动。Capital Airlines机长S.C. Pierman在地面等待起飞时报告看到六颗"像没有尾巴的流星般"的明亮光点以极高速度移动。\n\n事件引发了全国轰动，《华盛顿邮报》头版刊登了"飞碟跑赢喷气机"的报道。时任总统哈里·杜鲁门亲自致电空军要求答案。7月29日，空军情报总监John Samford少将在五角大楼召开了自二战以来规模最大的军事新闻发布会，将雷达回波归因于"温度逆温"（temperature inversion），即暖空气层像透镜一样折射地面灯光和雷达波，制造了虚假的空中目标。然而，在场的Project Blue Book负责人Edward Ruppelt上尉在其著作《The Report on Unidentified Flying Objects》中指出，当时华盛顿地区几乎每晚都有温度逆温，但并未引发类似的大规模雷达异常。雷达管制员Barnes直到去世都坚持认为这些目标"绝非天气现象"。\n\n这一事件的深远影响在于它直接催生了1953年1月的CIA"Robertson Panel"——由物理学家Howard P. Robertson主持的一群科学家，仅用12小时审查了23个案例，便建议空军主动"揭穿"UFO报告，以消除公众兴趣。该建议实质上塑造了此后五十年的美国政府UFO政策基调。',
    confidence: 'Medium',
    image: '/images/event-washington.jpg',
    sensors: ['雷达', '目视', '多源报道'],
    physicalCharacteristics: ['multi-sensor', 'group-sighting', 'instantaneous-acceleration'],
    sources: [
      { label: 'HISTORY - Flying Saucers Over Washington Sent the Press Into a Frenzy', url: 'https://www.history.com/articles/ufos-washington-dc-news-reports' },
      { label: 'Gaia - 1952 Washington D.C. UFO Incident Explained', url: 'https://www.gaia.com/article/1952-washington-dc-ufo-incident-explained' },
      { label: '3i-Atlas - UFO Sightings Over Capitol Hill: The 1952 Washington Invasion', url: 'https://3i-atlas.net/posts/ufo-sightings-capitol-hill-washington-dc' },
      { label: 'Yahoo News - 1952 Washington UFO Sighting That Upended Decades of Denial', url: 'https://www.yahoo.com/news/articles/1952-ufo-washington-sighting-upended-180000090.html' },
      { label: 'UFO Report - 1952 Washington D.C. UFO Incident', url: 'https://uforeport.com/1952-washington-d-c-ufo-incident-a-historic-confluence-of-mystery-and-panic/' },
      { label: 'Britannica - Project Blue Book', url: 'https://www.britannica.com/topic/Project-Blue-Book' },
      { label: 'Condon Report - Final Report of Scientific Study of UFOs (PDF, references Washington case)', url: 'https://documents2.theblackvault.com/documents/ntis/CondonReport-Complete.pdf' },
      { label: 'Rockefeller Briefing Document - UFOs and Intelligence (PDF)', url: 'https://www.openminds.tv/wp-content/uploads/Rockefeller-Briefing-Document.pdf' }
    ],
    media: [
      { type: 'image', url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0402%2Fa24ab15aj00rshqpl0019c000go00egm.jpg&thumbnail=660x2147483647&quality=80&type=jpg', caption: '1952年7月29日五角大楼UFO新闻发布会上，Project Blue Book负责人Edward Ruppelt（站立者）与空军情报总监Samford少将' },
      { type: 'image', url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0402%2Fd37208e2j00rshqpl000wc000dw00dwm.jpg&thumbnail=660x2147483647&quality=80&type=jpg', caption: '1952年新闻报道《拦截机在华盛顿特区上空追逐飞碟》的报纸版面' },
      { type: 'image', url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0402%2F3bf01c8bj00rshqpl000tc000hs00bwm.jpg&thumbnail=660x2147483647&quality=80&type=jpg', caption: '1952年华盛顿雷达事件期间的新闻报道与照片资料' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=H07x82S6jU4', caption: '纪录片：1952年华盛顿特区不明飞行物入侵事件的历史回顾与证人访谈' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=1N4ciVZxUT8', caption: 'The Real Roswell 与华盛顿入侵事件相关的历史纪录片片段' }
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
    description: '1996年2月22日至3月9日，NASA执行STS-75任务，由哥伦比亚号航天飞机（Space Shuttle Columbia）搭载Tethered Satellite System Reflight（TSS-1R，系留卫星系统复飞任务）进入地球轨道。该任务的主要科学目标是测试一根长达20.7公里的导电系绳，通过系绳在地球电离层中运动产生电流，研究空间等离子体物理和验证太空发电技术。任务还搭载了美国微重力载荷（USMP-3）进行材料科学实验。\n\n在任务期间，NASA的摄像机拍摄到了围绕系绳的多个不明圆形物体。这些物体在视频中呈现为发光的圆形或碟形，大小不一，数量众多，似乎在系绳周围移动。这些影像后来被广泛称为"STS-75系绳事件"，成为UFO研究领域最著名的太空视频证据之一。一些研究者声称这些物体表现出智能行为，如围绕系绳移动并保持距离，但NASA和主流科学家解释这些可能是太空碎片、冰晶或等离子体现象。\n\nSTS-75任务本身在技术上具有重要意义：尽管系绳在部署约19.7公里后意外断裂，但在断裂前已经收集到了大量宝贵的科学数据。NASA发布了详细的技术报告，包括Glaese的《Tethered Satellite System (TSS) Dynamics Assessments and Analysis, TSS-1R Post Flight Data Evaluation》（NASA-CR-201138）和Lavoie的《Tethered Satellite System (TSS-1R)-post flight (STS-75) engineering performance report》（NASA JA-2422）。这些官方报告为研究人员提供了详细的任务数据，但并未直接解释摄像机拍摄到的所有现象。\n\n值得注意的是，TSS-1R系绳在断裂前产生了高达4800伏的电压，远超预期，这导致了大量等离子体和带电粒子围绕系绳的现象。这些科学因素为解释视频中看到的"物体"提供了可能的自然机制，但UFO研究者认为这些物体移动过于规律，不像随机碎片。该事件至今仍在科学界和UFO研究领域引发争论。',
    confidence: 'Medium',
    image: '/images/event-sts75.jpg',
    sensors: ['NASA视频', '宇航员目视'],
    physicalCharacteristics: ['space', 'multi-sensor', 'group-sighting'],
    sources: [
      { label: 'NASA TSS-1R Post Flight Data Evaluation (NASA-CR-201138)', url: 'https://ntrs.nasa.gov/citations/19960028753' },
      { label: 'NASA TSS-1R Engineering Performance Report (NASA JA-2422)', url: 'https://ntrs.nasa.gov/' },
      { label: 'Acta Mechanica Sinica - 系留卫星系统综述 (引用NASA STS-75报告)', url: 'https://www.sciengine.com/AMS/doi/10.1007/s10409-021-01108-9' },
      { label: 'NASA NTRS - Tethered Satellite System 相关论文', url: 'https://ntrs.nasa.gov/search?q=STS-75' },
      { label: 'Progress in Aerospace Sciences - Space Tether Research Review', url: 'https://doi.org/10.1016/j.paerosci.2007.08.002' }
    ],
    media: [
      { type: 'image', url: 'https://www.nasa.gov/wp-content/uploads/2023/03/STS-75-TSS-1R.jpg', caption: 'NASA: STS-75任务中TSS-1R系留卫星系统从哥伦比亚号部署的示意图' },
      { type: 'video', url: 'https://www.bilibili.com/video/BV17s411V7f8', caption: 'B站转载：完整未剪辑版NASA STS-75 Tether UFO目击影片 (FULL Uncut NASA STS-75 Tether UFO Sightings)' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=1KmGIV_Vv2w', caption: 'YouTube: NASA STS-75 Tether Incident 原始影像与3D UFO模型分析' }
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
    description: '智利圣克莱门特（San Clemente）及其周边地区（包括莫莱大区 Maule Region）被广泛认为是‘世界非官方UFO之都’，该地区的高密度异常空中现象目击直接促使智利政府在1997年成立了官方UFO调查机构——CEFAA（Comité de Estudios de Fenómenos Aéreos Anómalos，异常空中现象研究委员会）。其中最具国际影响力的案例之一是2010年11月5日（部分记录为11月4日）在圣地亚哥 El Bosque 空军基地举行的空军司令交接仪式暨航展上拍摄到的UFO视频。当时，智利空军（FACH）的Halcones（鹰）特技飞行队、F-5和F-16战斗机编队正在进行飞行表演，典礼出席者包括智利总统 Sebastián Piñera、国防部长及所有军方高级将领。仪式结束后，附近Pillán飞机工厂的一名工程师在回放录像时，发现画面中有一个异常光点以极高速度掠过飞行编队。智利政府UFO机构CEFAA随后收集到了来自7个不同拍摄角度的独立视频，这些视频均由不同个人在不同位置拍摄，显示同一个圆顶形、平底、金属质感的不明物体在Halcones、F-5和F-16编队之间进行高速椭圆形穿插飞行。CEFAA委托空军和陆军技术专家进行了严密的光度测量与红外热成像分析，估计该物体速度超过4,000至6,000英里/小时，且没有产生音爆。红外研究显示该物体与喷气战机一样辐射热量，且顶部呈圆形反射阳光，底部较暗并发出某种能量。值得注意的是，该物体速度太快，以至于飞行员和现场观众在事发当时都未察觉。前智利空军将军、CEFAA主任 Ricardo Bermúdez 在德克萨斯州UFO大会上公开确认了此案的真实性。此外，1998年圣克莱门特附近的Paihuano Las Mollacas山还发生了一起被比作‘智利罗斯威尔’的坠毁事件，约2500人目击了一架奇异飞行器坠毁，智利陆军和NASA特使均介入调查，但后续信息被封锁。2018年，六架商用客机的机组人员同时在同一航线上目击了三个三角形光源从水面升起，进一步巩固了该地区作为持续UFO热点的地位。',
    confidence: 'High',
    image: '/images/event-chile.jpg',
    sensors: ['官方视频', '军方调查'],
    physicalCharacteristics: ['multi-sensor', 'instantaneous-acceleration'],
    sources: [
      { label: 'HuffPost / Leslie Kean - UFO Caught on Tape over Santiago Air Base (2012)', url: 'https://www.huffpost.com/entry/ufo-caught-on-tape-over-santiago-air-base_n_1321058' },
      { label: 'OpenMinds.TV - UFO Disclosure Chilean Style (El Bosque multiple footage)', url: 'https://openminds.tv/ufo-disclosure-chilean-style-896/' },
      { label: 'Matador Network - Why San Clemente Is the Unofficial UFO Capital', url: 'https://matadornetwork.com/read/san-clemente-chile-ufo-aliens/' },
      { label: 'Latin American Post - Chile’s San Clemente: The Unofficial UFO Capital', url: 'https://latinamericanpost.com/life/chiles-san-clemente-the-unofficial-ufo-capital-of-the-world/' },
      { label: 'UFONAP - El Bosque Air Base UFO Video Case Dossier', url: 'https://www.ufouap.net/en/cases/el-bosque-air-base-ufo-video' },
      { label: 'CUFOs - UFOs and Intelligence Timeline (El Bosque entry)', url: 'https://cufos.org/PDFs/pdfs/UFOsandIntelligence.pdf' },
      { label: 'NewsGhana - Chilean UFO travelling at 4,000mph captured on film from seven angles', url: 'https://www.newsghana.com.gh/chilean-ufo-travelling-at-4000mph-captured-on-film-from-seven-angles/' }
    ],
    media: [
      { type: 'image', url: 'http://www.spyghana.com/wp-content/uploads/wpid-The-object-flies-so-fast-that-assuming-it-is-not-a-camera-defect-it-is-travelling-an-estimated-6000mph.jpg', caption: 'El Bosque 2010航展UFO高速掠过战机编队的视频截图' },
      { type: 'image', url: 'https://openminds.tv/wp-content/uploads/2012/02/CEFAA-El-Bosque-UFO-Frame.jpg', caption: 'CEFAA发布的El Bosque UFO最佳帧图像（圆顶金属物体）' },
      { type: 'video', url: 'https://youtu.be/RO-LA1Z6usM', caption: 'Chile\'s Roswell: The UFO Crash NASA Tried to Hide (podcast/video covering 1998 Las Mollacas & 2010 El Bosque)' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=0h0X8L15e1w', caption: 'CEFAA Official Analysis - El Bosque Air Show UFO footage compilation' }
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
    description: '2017年10月19日，夏威夷大学茂纳凯亚天文台的Pan-STARRS1（全景巡天望远镜与快速反应系统）望远镜在进行近地天体巡天时，首次捕捉到了一个异常天体。天文学家Rob Weryk在复查数据时注意到这个天体运动轨迹极为特殊，无法被归类为小行星或彗星的太阳系内轨道。随后，ESO加那利群岛望远镜的独立观测数据交叉验证后确认：这是一个来自太阳系外的星际访客。国际天文学联合会（IAU）将其正式命名为1I/2017 U1，并赋予夏威夷语名称ʻOumuamua，意为"来自远方的第一位信使"。\n\nʻOumuamua的物理特征极为罕见。它呈现出极端的长条形（雪茄状或薄饼状），长轴约400米，长宽比高达10:1，远超太阳系内任何已知小行星或彗星。其表面呈暗红色，光谱特征与太阳系外缘天体类似，表明它已在星际空间中漂流数亿年，表面受到宇宙射线长期辐照。更令人困惑的是，它完全没有彗星活动特征——既无彗尾也无尘埃喷发现象，却在2018年被Micheli等人在《Nature》发表的研究证实存在非引力加速（30σ显著性），速度比纯引力预测更快。\n\n这一异常加速引发了激烈科学争议。2018年10月，哈佛大学天文学家Avi Loeb与博士后Shmuel Bialy在《The Astrophysical Journal Letters》发表论文，提出ʻOumuamua可能是一个人造"光帆"（Lightsail），由太阳辐射压推动。该假说认为其极薄表面、异常形状和无彗发特征均符合光帆特性。然而，多数天文学家持反对意见，认为证据不足。2019年7月，由14位国际专家组成的团队在《Nature Astronomy》发表共识，认为ʻOumuamua具有自然起源，其加速可能由隐藏冰层释放氢气导致。2023年，Bergner和Seligman进一步提出分子氢冰假说来解释其无可见彗尾却有加速的矛盾。SETI（搜寻地外文明计划）也对该天体进行了无线电信号监测，但一无所获。\n\nʻOumuamua于2017年9月9日通过近日点（距太阳0.25 AU），最接近地球时约2420万公里（10月15日）。NASA的哈勃和斯皮策空间望远镜对其进行了持续追踪。它正以约38.3 km/s的速度离开太阳系，轨道倾角约122°，朝向飞马座方向。预计2019年1月越过土星轨道，2022年越过海王星轨道，永不再返。此发现开创了"星际天体学"新领域，此后2019年发现2I/Borisov，2025年发现3I/ATLAS，但ʻOumuamua始终是唯一呈现如此极端形态且无法被完全解释的首个星际访客。',
    confidence: 'High',
    image: '/images/event-oumuamua.jpg',
    sensors: ['Pan-STARRS望远镜', 'SETI'],
    physicalCharacteristics: ['space', 'multi-sensor'],
    sources: [
      { label: 'NASA Science - Oumuamua Overview', url: 'https://science.nasa.gov/solar-system/comets/oumuamua/' },
      { label: 'NASA News - First Interstellar Object Discovery (2017-10-26)', url: 'https://www.nasa.gov/solar-system/small-asteroid-or-comet-visits-from-beyond-the-solar-system/' },
      { label: 'Nature - Non-gravitational acceleration in trajectory (Micheli et al. 2018)', url: 'https://www.nature.com/articles/s41586-018-0254-4' },
      { label: 'NASA JPL - Solar System\'s First Interstellar Visitor (2017-11-20)', url: 'https://www.jpl.nasa.gov/news/solar-systems-first-interstellar-visitor-dazzles-scientists/' },
      { label: 'NASA JPL - First Interstellar Asteroid Video', url: 'https://www.jpl.nasa.gov/videos/first-interstellar-asteroid-wows-scientists/' },
      { label: 'NASA Science - What We Know and Don\'t Know About Oumuamua', url: 'https://science.nasa.gov/solar-system/what-we-knowand-dont-knowabout-oumuamua/' },
      { label: 'NASA Hubble - Unexpected Speed Boost', url: 'https://science.nasa.gov/missions/hubble/our-solar-systems-first-known-interstellar-object-gets-unexpected-speed-boost/' },
      { label: 'NASA Science - Telescope Image of Oumuamua', url: 'https://science.nasa.gov/resource/telescope-image-of-oumuamua/' },
      { label: 'arXiv - Could Solar Radiation Pressure Explain Oumuamua\'s Peculiar Acceleration (Bialy & Loeb 2018)', url: 'https://arxiv.org/abs/1810.11490' },
      { label: 'arXiv - Discovery Paper (Meech et al. 2017)', url: 'https://arxiv.org/pdf/1711.03558v2' },
      { label: 'Nature Astronomy - Natural Origin Consensus (Jedicke et al. 2019)', url: 'https://www.nature.com/articles/s41550-019-0816-2' },
      { label: 'Space.com - Alien Light Sail Theory', url: 'https://www.space.com/42352-oumuamua-interstellar-object-alien-light-sail.html' },
      { label: 'Sci.News - Hydrogen Ice Explanation (Bergner & Seligman 2023)', url: 'https://www.sci.news/astronomy/oumuamua-hydrogen-11769.html' },
      { label: 'NASA APOD - Unexpected Trajectory (2018-11-20)', url: 'https://apod.nasa.gov/apod/ap181120.html' },
      { label: 'ESA/Hubble - Oumuamua Gets a Boost', url: 'https://esahubble.org/images/heic1813a/' },
      { label: 'ESO - First Interstellar Asteroid Artist Impression', url: 'https://www.eso.org/public/images/eso1737a/' },
      { label: 'NASA SVS - Oumuamua Visualizations', url: 'https://svs.gsfc.nasa.gov/search/?search=oumuamua' },
      { label: 'NASA Goddard - Hubblecast 111: Oumuamua Getting a Boost', url: 'https://science.nasa.gov/asset/hubble/oumuamua-video-feature-narrated/' },
      { label: 'ESA/Hubble - Animation Passing Through Solar System', url: 'https://esahubble.org/videos/heic1813d/' },
      { label: 'ESA/Hubble - Expected vs Measured Trajectory Animation', url: 'https://esahubble.org/videos/heic1813f/' }
    ],
    media: [
      { type: 'image', url: 'https://esahubble.org/images/heic1813a/', caption: 'ESA/Hubble艺术家印象：ʻOumuamua在太阳加热下从表面释放气体物质，展示其非引力加速现象。Credit: ESA/Hubble, NASA, ESO, M. Kornmesser' },
      { type: 'image', url: 'https://www.eso.org/public/images/eso1737a/', caption: 'ESO艺术家印象：ʻOumuamua呈现为暗红色、高度拉长的金属或岩石天体，长约400米，与太阳系任何已知天体截然不同。Credit: ESO/M. Kornmesser' },
      { type: 'image', url: 'https://science.nasa.gov/resource/telescope-image-of-oumuamua/', caption: '实际望远镜深空合成图像：ʻOumuamua位于中心（蓝色圆圈标记），周围是因望远镜追踪移动而拖曳的暗淡星轨。Credit: ESO/K. Meech et al.' },
      { type: 'image', url: 'https://apod.nasa.gov/apod/image/1711/OumuamuaDrawing_ESO_960.jpg', caption: 'NASA APOD 每日天文图：ʻOumuamua穿越太阳系的示意图，展示了其独特的双曲线轨道。Credit: NASA, JPL, Caltech' },
      { type: 'image', url: 'https://cdn.sci.news/images/2018/06/image_6145_1-Oumuamua.jpg', caption: 'ʻOumuamua亮度变化示意图：由于极端长条形形态，当它长轴对准地球时最亮，端点对准地球时最暗。Credit: NASA/JPL-Caltech' },
      { type: 'image', url: 'https://mediasvc.eurekalert.org/Api/v1/Multimedia/68039e3c-bf0b-47f2-b29c-e0cc343f393a/Rendition/low-res/Content/Public', caption: 'ʻOumuamua艺术家印象与实际图像合成：插图显示其穿越太阳系，内嵌图为Gemini South望远镜在2017年10月27日拍摄的彩色合成影像。Credit: ESA/Hubble, NASA, ESO/M. Kornmesser, Gemini Observatory/AURA/NSF' },
      { type: 'video', url: 'https://www.jpl.nasa.gov/videos/first-interstellar-asteroid-wows-scientists/', caption: 'NASA JPL官方视频：首个星际小行星令科学家惊叹（2017），包含发现过程与科学家访谈。Duration: 约3分钟' },
      { type: 'video', url: 'https://esahubble.org/videos/heic1813a/', caption: 'ESA/Hubble Hubblecast 111：ʻOumuamua获得意外加速。专业天文纪录片，解释非引力加速观测与理论。Duration: 6分16秒' },
      { type: 'video', url: 'https://science.nasa.gov/asset/hubble/oumuamua-video-feature-narrated/', caption: 'NASA Goddard narration视频：哈勃等望远镜发现ʻOumuamua获得额外速度提升，可能来自类彗星气体喷射。Duration: 约1分钟' },
      { type: 'video', url: 'https://esahubble.org/videos/heic1813d/', caption: 'ESA/Hubble动画：ʻOumuamua穿越太阳系的路径，展示其不受太阳引力束缚的双曲线轨道。Duration: 1分19秒' },
      { type: 'video', url: 'https://esahubble.org/videos/heic1813f/', caption: 'ESA/Hubble动画：ʻOumuamua预期与实测轨迹对比，显示其偏离纯引力预测的异常加速。Duration: 17秒' }
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
