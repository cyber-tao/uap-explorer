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
  const { language, t, dict } = useI18n()

  const tableHeaders = [
    t('agenciesPage.tableHeaders.country'),
    t('agenciesPage.tableHeaders.agency'),
    t('agenciesPage.tableHeaders.established'),
    t('agenciesPage.tableHeaders.cases'),
    t('agenciesPage.tableHeaders.transparency'),
    t('agenciesPage.tableHeaders.methodology'),
    t('agenciesPage.tableHeaders.unexplainedRate'),
    t('agenciesPage.tableHeaders.officialLink'),
  ]

  const highlightCards = dict.agenciesPage.highlightCards
  const methodologyRows = dict.agenciesPage.methodologyRows

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
                {[t('agenciesPage.methodologyDimension'), 'GEIPAN', 'AARO', 'NASA'].map((h) => (
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

