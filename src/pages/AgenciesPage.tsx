import { ExternalLink } from 'lucide-react'
import { agencies, transparencyMilestones } from '../data/agencies'
import { useI18n } from '../i18n'

const transparencyColorMap: Record<string, string> = {
  '高': '#00D9A5',
  '中': '#F5A623',
  '低': '#FF6B35',
  '极低': '#FF2E63',
}

const milestoneColorMap: Record<string, string> = {
  transparency: '#00D9A5',
  institution: '#30B0D0',
  report: '#F5A623',
}

export default function AgenciesPage() {
  const { language, t } = useI18n()

  const tableHeaders = [
    t('agenciesPage.tableHeaders.country'),
    t('agenciesPage.tableHeaders.agency'),
    t('agenciesPage.tableHeaders.established'),
    t('agenciesPage.tableHeaders.cases'),
    t('agenciesPage.tableHeaders.transparency'),
    t('agenciesPage.tableHeaders.methodology'),
    t('agenciesPage.tableHeaders.unexplainedRate'),
    t('agenciesPage.tableHeaders.link'),
  ]

  const highlightCards = language === 'en'
    ? [
        {
          tag: 'Most Mature System',
          tagColor: '#00D9A5',
          title: 'GEIPAN — Global Gold Standard',
          stats: '50 Years in Operation · 9,700+ Testimonies · 3,240+ Public Cases',
          desc: 'Affiliated with the French space agency (CNES), led by civilian scientists. The A/B/C/D 4-tier classification is referenced worldwide.',
          link: 'https://www.cnes-geipan.fr',
          linkLabel: 'Visit GEIPAN Website →',
        },
        {
          tag: 'Largest Official Inquiry',
          tagColor: '#30B0D0',
          title: 'AARO — US DoD All-Domain Anomaly Resolution Office',
          stats: 'Established 2022 · 1,600+ Cases · 21 Truly Anomalous',
          desc: 'The largest official government UAP investigation in US history. The 2024 annual report acknowledged 21 unexplained anomalies.',
          link: 'https://www.aaro.mil',
          linkLabel: 'Visit AARO →',
        },
        {
          tag: 'Historic Transparency',
          tagColor: '#F5A623',
          title: 'PURSUE — 2026 Public Declassification Project',
          stats: 'May–July 2026 · 334 Files · Release 04 (July 10)',
          desc: 'US Department of Defense ongoing declassification portal; Release 04 declassified 40 files including STS-80 photos and Indo-Pacific videos.',
          link: 'https://www.war.gov/UFO',
          linkLabel: 'Visit PURSUE →',
        },
      ]
    : [
        {
          tag: '最成熟的制度',
          tagColor: '#00D9A5',
          title: 'GEIPAN — 全球黄金标准',
          stats: '50年运行 · 9,700+证词 · 3,240+公开案例',
          desc: '隶属于法国国家航天研究中心(CNES)，由科学家主导而非情报机构。A/B/C/D四级分类系统被全球参考。',
          link: 'https://www.cnes-geipan.fr',
          linkLabel: '访问GEIPAN官网 →',
        },
        {
          tag: '最大规模政府调查',
          tagColor: '#30B0D0',
          title: 'AARO — 美国国防部全域异常解决办公室',
          stats: '2022年成立 · 1,600+案例 · 21起真正异常',
          desc: '美国历史上最大规模政府UAP调查，但结论受争议。2024年年度报告承认21起事件无法解释。',
          link: 'https://www.aaro.mil',
          linkLabel: '访问AARO →',
        },
        {
          tag: '历史性透明度',
          tagColor: '#F5A623',
          title: 'PURSUE — 2026年解密项目',
          stats: '2026年5–7月 · 334份档案 · Release 04（7/10）',
          desc: '美国国防部通过PURSUE平台持续解密UAP档案；2026年7月10日第四批公开40份，含STS-80轨道照片、印太红外视频与洛斯阿拉莫斯历史档案。',
          link: 'https://www.war.gov/UFO',
          linkLabel: '访问PURSUE →',
        },
      ]

  const methodologyRows = language === 'en'
    ? [
        ['Parent Agency', 'CNES (Civilian Space)', 'DoD (Defense/Intel)', 'Independent Study Panel'],
        ['Leadership', 'Civilian Scientists', 'Military / Intelligence', 'Civilian Scientists'],
        ['Data Openness', '3,240+ cases publicly accessible', 'Annual unclassified summary', 'Methodology whitepapers'],
        ['Classification', 'A/B/C/D 4-tier model', 'Unpublished internal schema', 'Not applicable'],
        ['Core Strength', 'Longitudinal rigor, transparency', 'Multi-sensor military datasets', 'Scientific data standards'],
        ['Core Critique', 'Category D ambiguity', 'Analytical bias & omission', 'No direct case review'],
        ['Extraterrestrial Stance', 'Neutral (Cat D ≠ Alien)', 'Dismissive (No evidence found)', 'Open (Demands more data)'],
      ]
    : [
        ['隶属机构', 'CNES (航天)', 'DoD (国防)', '独立研究小组'],
        ['主导者', '科学家', '情报/军事', '科学家'],
        ['数据公开', '3,240+案例完全公开', '年度报告摘要', '方法论报告'],
        ['分类系统', 'A/B/C/D四级', '未公开分类', '不适用'],
        ['核心优势', '透明度、长期数据', '多传感器分析', '科学方法论'],
        ['核心争议', 'D类误判率', '分析偏见、遗漏', '无案例审查'],
        ['对ETH态度', '中性（D类≠外星）', '否定（未发现证据）', '开放（需更多数据）'],
      ]

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      {/* Page header */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#8A99A8' }}>
          {t('agenciesPage.eyebrow')}
        </p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
          {t('agenciesPage.title')}
        </h1>
        <p className="max-w-2xl" style={{ color: '#8A99A8' }}>
          {t('agenciesPage.subtitle')}
        </p>
      </section>

      {/* Comparison Table */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        <div className="overflow-x-auto uap-scrollbar rounded-xl" style={{ border: '1px solid rgba(138, 153, 168, 0.15)' }}>
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr style={{ background: '#0F1923' }}>
                {tableHeaders.map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase whitespace-nowrap" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency, idx) => {
                const transColor = transparencyColorMap[agency.transparency] || '#8A99A8'
                const displayCountry = language === 'en' && agency.countryEn ? agency.countryEn : agency.country
                const displayAgency = language === 'en' && agency.agencyEn ? agency.agencyEn : agency.agency
                const displayCases = language === 'en' && agency.casesEn ? agency.casesEn : agency.cases
                const displayMethodology = language === 'en' && agency.methodologyEn ? agency.methodologyEn : agency.methodology
                const displayUnexplainedRate = language === 'en' && agency.unexplainedRateEn ? agency.unexplainedRateEn : agency.unexplainedRate
                const displayTransparency = language === 'en'
                  ? (agency.transparency === '高' ? 'High' : agency.transparency === '中' ? 'Medium' : agency.transparency === '低' ? 'Low' : 'Very Low')
                  : agency.transparency

                return (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-[#0F1923]"
                    style={{ background: idx % 2 === 0 ? '#0A1117' : '#050A0F' }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-semibold" style={{ color: '#EDE8E4' }}>{displayCountry}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-medium" style={{ color: '#EDE8E4' }}>{displayAgency}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-mono-data text-sm" style={{ color: '#8A99A8' }}>
                      {agency.established}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#8A99A8' }}>
                      {displayCases}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-0.5 rounded text-[11px] font-bold"
                        style={{ background: `${transColor}15`, color: transColor, border: `1px solid ${transColor}30` }}
                      >
                        {displayTransparency}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>
                      {displayMethodology}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#8A99A8' }}>
                      {displayUnexplainedRate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {agency.link ? (
                        <a
                          href={agency.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm transition-colors hover:text-[#30B0D0]"
                          style={{ color: '#8A99A8' }}
                        >
                          {agency.linkLabel}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sm" style={{ color: '#8A99A8' }}>—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <h2 className="font-serif-display text-2xl font-bold mb-8" style={{ color: '#EDE8E4' }}>{t('agenciesPage.highlightsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlightCards.map((card, idx) => (
            <div key={idx} className="uap-card overflow-hidden">
              <div className="p-6">
                <span
                  className="inline-block px-2 py-1 rounded text-[11px] font-bold mb-4"
                  style={{ background: `${card.tagColor}15`, color: card.tagColor, border: `1px solid ${card.tagColor}30` }}
                >
                  {card.tag}
                </span>
                <h3 className="font-serif-display text-lg font-bold mb-2" style={{ color: '#EDE8E4' }}>
                  {card.title}
                </h3>
                <p className="font-mono-data text-xs mb-4" style={{ color: '#8A99A8' }}>
                  {card.stats}
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A99A8' }}>
                  {card.desc}
                </p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: '#30B0D0' }}
                >
                  {card.linkLabel}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency Timeline */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <h2 className="font-serif-display text-2xl font-bold mb-8" style={{ color: '#EDE8E4' }}>{t('agenciesPage.milestonesTitle')}</h2>
        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-px"
            style={{ background: 'linear-gradient(to bottom, #30B0D0, rgba(48,176,208,0.2))' }}
          />
          {transparencyMilestones.map((m, idx) => {
            const isLeft = idx % 2 === 0
            const dotColor = milestoneColorMap[m.type] || '#30B0D0'
            const typeLabel = m.type === 'transparency' ? t('agenciesPage.milestoneTransparency') : m.type === 'institution' ? t('agenciesPage.milestoneInstitution') : t('agenciesPage.milestoneReport')
            const displayEvent = language === 'en' && m.eventEn ? m.eventEn : m.event

            return (
              <div
                key={idx}
                className={`relative flex items-center mb-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div
                  className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -ml-[5px] md:-ml-[6px] z-10"
                  style={{ background: dotColor, boxShadow: `0 0 12px ${dotColor}60` }}
                />
                <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="uap-card p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-data text-sm font-bold" style={{ color: dotColor }}>{m.year}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: `${dotColor}15`, color: dotColor, border: `1px solid ${dotColor}30` }}
                      >
                        {typeLabel}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#EDE8E4' }}>{displayEvent}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Methodology Comparison */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 pb-24">
        <h2 className="font-serif-display text-2xl font-bold mb-8" style={{ color: '#EDE8E4' }}>{t('agenciesPage.methodologyTitle')}</h2>
        <div className="overflow-x-auto uap-scrollbar">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ background: '#0F1923' }}>
                {[t('agenciesPage.methodologyHeaders.dimension'), 'GEIPAN', 'AARO', 'NASA'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {methodologyRows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ background: idx % 2 === 0 ? '#0A1117' : '#050A0F' }}
                >
                  {row.map((cell, cidx) => (
                    <td
                      key={cidx}
                      className="px-4 py-3 text-sm"
                      style={{ color: cidx === 0 ? '#EDE8E4' : '#8A99A8', fontWeight: cidx === 0 ? 600 : 400 }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

