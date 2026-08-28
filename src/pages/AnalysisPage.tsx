import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Radar, Zap, EyeOff, Waves, ArrowUp, Footprints, Users, Telescope, ChevronDown, ChevronUp, Globe, Share2, Box, HeartPulse, Radio, BrainCircuit } from 'lucide-react'
import { observables, hypotheses, infoGaps, researchDirections } from '../data/analysis'
import { confidenceColors, getEventById } from '../data/events'
import { useI18n } from '../i18n'

const iconMap: Record<string, React.ReactNode> = {
  'Zap': <Zap className="w-6 h-6" />,
  'EyeOff': <EyeOff className="w-6 h-6" />,
  'Waves': <Waves className="w-6 h-6" />,
  'ArrowUp': <ArrowUp className="w-6 h-6" />,
  'Radar': <Radar className="w-6 h-6" />,
  'Footprints': <Footprints className="w-6 h-6" />,
  'Radioactive': <Radio className="w-6 h-6" />,
  'Users': <Users className="w-6 h-6" />,
  'Telescope': <Telescope className="w-6 h-6" />,
  'Globe': <Globe className="w-6 h-6" />,
  'Share2': <Share2 className="w-6 h-6" />,
  'Box': <Box className="w-6 h-6" />,
  'HeartPulse': <HeartPulse className="w-6 h-6" />,
  'Radio': <Radio className="w-6 h-6" />,
  'BrainCircuit': <BrainCircuit className="w-6 h-6" />,
}

export default function AnalysisPage() {
  const { language, t, dict, getConfidenceLabel } = useI18n()
  const [expandedGaps, setExpandedGaps] = useState<Set<number>>(new Set())

  const toggleGap = (id: number) => {
    const next = new Set(expandedGaps)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedGaps(next)
  }

  const confidenceTiers = language === 'en'
    ? [
        { level: 'High' as const, pct: 'approx. 2-3%', criteria: '≥3 independent sources, declassified archives, synchronized multi-sensor tracks, mass sightings (≥100 witnesses) + official corroboration', example: 'Nimitz Tic Tac', color: '#00D9A5' },
        { level: 'Medium' as const, pct: 'approx. 5-10%', criteria: 'Single authoritative source or limited 2-source verification, plausible alternative hypotheses existing but unproven', example: 'Roswell (1947)', color: '#F5A623' },
        { level: 'Low' as const, pct: 'approx. 20-30%', criteria: 'Single source, fragmented chain of custody, lacking independent validation', example: 'Unverified social media reports', color: '#FF6B35' },
        { level: 'Speculative' as const, pct: 'approx. 60-70%', criteria: 'Indirect deduction, lacking direct physical evidence, ancient mythic records, single-witness close encounters', example: 'Extraterrestrial Hypothesis (ETH)', color: '#B8B8B8' },
      ]
    : [
        { level: 'High' as const, pct: '约2-3%', criteria: '≥3个独立来源，官方档案，多传感器同步，大规模群体性目击(≥100人)+官方确认', example: 'Nimitz Tic Tac', color: '#00D9A5' },
        { level: 'Medium' as const, pct: '约5-10%', criteria: '单一权威来源或有限多源验证(2个来源)，存在合理替代解释但未被证实', example: '罗斯威尔', color: '#F5A623' },
        { level: 'Low' as const, pct: '约20-30%', criteria: '单一来源，信息链断裂，无法独立验证', example: '部分民间社交媒体报告', color: '#FF6B35' },
        { level: 'Speculative' as const, pct: '约60-70%', criteria: '间接推理，缺乏直接物理证据，古代记录，单一目击者近距离接触', example: '古代宇航员假说', color: '#B8B8B8' },
      ]

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      {/* Page header */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 pt-16 pb-12">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#8A99A8' }}>
          {t('analysis.eyebrow')}
        </p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
          {t('analysis.title')}
        </h1>
        <p className="max-w-2xl" style={{ color: '#8A99A8' }}>
          {t('analysis.subtitle')}
        </p>
      </section>

      {/* 5 Observables */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>{t('analysis.section1Number')}</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>{t('analysis.section1Title')}</h2>
        </div>
        <p className="mb-10 leading-relaxed" style={{ color: '#8A99A8' }}>
          {t('observablesSection.body')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {observables.map((obs) => {
            const localized = dict.observables[obs.id]
            const title = localized?.title || obs.title
            const desc = localized?.description || obs.description
            const consistency = localized?.consistency || obs.consistency

            return (
              <div key={obs.id} className="uap-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(48, 176, 208, 0.1)' }}>
                    <span style={{ color: '#30B0D0' }}>{iconMap[obs.icon] || <Zap className="w-6 h-6" />}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif-display text-xl font-bold" style={{ color: '#EDE8E4' }}>{title}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-[11px] font-bold"
                        style={{ background: `${obs.consistencyColor}15`, color: obs.consistencyColor, border: `1px solid ${obs.consistencyColor}30` }}
                      >
                        {t('analysis.consistencyLabel')}: {consistency}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: '#8A99A8' }}>{obs.titleEn}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A99A8' }}>
                  {desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {obs.examples.map((ex) => (
                    <span
                      key={ex}
                      className="px-2 py-1 rounded text-xs"
                      style={{ background: 'rgba(138, 153, 168, 0.1)', color: '#8A99A8' }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
                {obs.eventIds.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(138, 153, 168, 0.08)' }}>
                    <span className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(138, 153, 168, 0.6)' }}>
                      {t('analysis.relatedEventsLabel')}
                    </span>
                    {obs.eventIds.map((id) => {
                      const ev = getEventById(id)
                      if (!ev) return null
                      const evName = language === 'en' && ev.nameEn ? ev.nameEn : ev.name
                      return (
                        <Link
                          key={id}
                          to={`/event/${id}`}
                          className="px-2 py-1 rounded text-xs transition-colors hover:opacity-100"
                          style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0', opacity: 0.9 }}
                        >
                          {evName}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Confidence Framework */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>{t('analysis.section2Number')}</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>{t('analysis.section2Title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {confidenceTiers.map((tier) => (
            <div key={tier.level} className="uap-card overflow-hidden">
              <div className="h-1" style={{ background: tier.color }} />
              <div className="p-5">
                <div
                  className="inline-flex px-2 py-1 rounded text-[11px] font-bold mb-3"
                  style={{ background: `${tier.color}15`, color: tier.color, border: `1px solid ${tier.color}30` }}
                >
                  {getConfidenceLabel(tier.level)}
                </div>
                <p className="font-mono-data text-2xl font-bold mb-2" style={{ color: '#EDE8E4' }}>{tier.pct}</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#8A99A8' }}>
                  {tier.criteria}
                </p>
                <p className="text-xs" style={{ color: '#30B0D0' }}>
                  {tier.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hypothesis Comparison */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>{t('analysis.section3Number')}</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>{t('analysis.section3Title')}</h2>
        </div>
        <p className="mb-8" style={{ color: '#8A99A8' }}>
          {t('analysis.section3Subtitle')}
        </p>

        <div className="overflow-x-auto uap-scrollbar">
          <table className="w-full min-w-[800px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0F1923' }}>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                  {t('analysis.hypothesesTable.hypothesis')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                  {t('analysis.hypothesesTable.physicalModel')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                  {t('analysis.hypothesesTable.supportingEvidence')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                  {t('analysis.hypothesesTable.opposingEvidence')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                  {t('analysis.hypothesesTable.credibility')}
                </th>
              </tr>
            </thead>
            <tbody>
              {hypotheses.map((h, idx) => {
                const color = confidenceColors[h.credibility]
                const displayName = language === 'en' && h.nameEn ? h.nameEn : h.name
                const displayModel = language === 'en' && h.physicalModelEn ? h.physicalModelEn : h.physicalModel
                const displaySupporting = language === 'en' && h.supportingEvidenceEn ? h.supportingEvidenceEn : h.supportingEvidence
                const displayOpposing = language === 'en' && h.opposingEvidenceEn ? h.opposingEvidenceEn : h.opposingEvidence

                return (
                  <tr
                    key={h.id}
                    className="transition-colors"
                    style={{
                      background: idx % 2 === 0 ? '#0A1117' : '#050A0F',
                    }}
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold" style={{ color: '#EDE8E4' }}>{displayName}</div>
                      {language !== 'en' && <div className="text-xs" style={{ color: '#8A99A8' }}>{h.nameEn}</div>}
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>{displayModel}</td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>{displaySupporting}</td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>{displayOpposing}</td>
                    <td className="px-4 py-4">
                      <span
                        className="px-2 py-1 rounded text-[11px] font-bold"
                        style={{ background: `${color}15`, color: color, border: `1px solid ${color}30` }}
                      >
                        {getConfidenceLabel(h.credibility)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Information Gaps */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>{t('analysis.section4Number')}</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>{t('analysis.section4Title')}</h2>
        </div>

        <div className="space-y-4">
          {infoGaps.map((gap) => {
            const isExpanded = expandedGaps.has(gap.id)
            const displayTitle = language === 'en' && gap.titleEn ? gap.titleEn : gap.title
            const displayDesc = language === 'en' && gap.descriptionEn ? gap.descriptionEn : gap.description
            const displayImpact = language === 'en' && gap.impactEn ? gap.impactEn : gap.impact
            const displayRecommendation = language === 'en' && gap.recommendationEn ? gap.recommendationEn : gap.recommendation

            return (
              <div
                key={gap.id}
                className="uap-card overflow-hidden"
                style={{ background: '#080E14' }}
              >
                <button
                  onClick={() => toggleGap(gap.id)}
                  className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                >
                  <span
                    className="font-mono-data text-4xl font-bold shrink-0"
                    style={{ color: '#30B0D0', opacity: isExpanded ? 1 : 0.3, transition: 'opacity 0.3s' }}
                  >
                    {String(gap.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>
                      {displayTitle}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 shrink-0" style={{ color: '#8A99A8' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0" style={{ color: '#8A99A8' }} />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pl-16">
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#8A99A8' }}>
                      {displayDesc}
                    </p>
                    <p className="text-sm mb-2" style={{ color: '#FF6B35' }}>
                      <strong>{t('analysis.impactLabel')}</strong>{displayImpact}
                    </p>
                    <p className="text-sm" style={{ color: '#00D9A5' }}>
                      <strong>{t('analysis.recommendationLabel')}</strong>{displayRecommendation}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Future Research */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>{t('analysis.section5Number')}</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>{t('analysis.section5Title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchDirections.map((dir) => {
            const displayTitle = language === 'en' && dir.titleEn ? dir.titleEn : dir.title
            const displayDesc = language === 'en' && dir.descriptionEn ? dir.descriptionEn : dir.description

            return (
              <div key={dir.id} className="uap-card p-6">
                <div className="mb-4" style={{ color: '#30B0D0' }}>
                  {iconMap[dir.icon] || <Globe className="w-6 h-6" />}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#EDE8E4' }}>{displayTitle}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A99A8' }}>
                  {displayDesc}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

