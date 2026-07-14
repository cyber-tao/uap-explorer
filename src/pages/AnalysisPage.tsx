import { useState } from 'react'
import { Radar, Zap, EyeOff, Waves, ArrowUp, Footprints, Users, Telescope, ChevronDown, ChevronUp, Globe, Share2, Box, HeartPulse, Radio, BrainCircuit } from 'lucide-react'
import { observables, observablesSection, hypotheses, infoGaps, researchDirections } from '../data/analysis'
import { confidenceColors } from '../data/events'

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
  const [expandedGaps, setExpandedGaps] = useState<Set<number>>(new Set())

  const toggleGap = (id: number) => {
    const next = new Set(expandedGaps)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedGaps(next)
  }

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      {/* Page header */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 pt-16 pb-12">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#8A99A8' }}>
          ANALYSIS & INSIGHTS / 分析与洞察
        </p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
          科学评估与真相挖掘
        </h1>
        <p className="max-w-2xl" style={{ color: '#8A99A8' }}>
          基于10个研究维度、300+独立信息源的交叉验证，对全球UAP进行系统性分析。
        </p>
      </section>

      {/* 5 Observables */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>01</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>五大可观测特征</h2>
        </div>
        <p className="mb-10 leading-relaxed" style={{ color: '#8A99A8' }}>
          {observablesSection.body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {observables.map((obs) => (
            <div key={obs.id} className="uap-card p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ background: 'rgba(48, 176, 208, 0.1)' }}>
                  <span style={{ color: '#30B0D0' }}>{iconMap[obs.icon] || <Zap className="w-6 h-6" />}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif-display text-xl font-bold" style={{ color: '#EDE8E4' }}>{obs.title}</h3>
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold"
                      style={{ background: `${obs.consistencyColor}15`, color: obs.consistencyColor, border: `1px solid ${obs.consistencyColor}30` }}
                    >
                      全球一致性: {obs.consistency}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#8A99A8' }}>{obs.titleEn}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A99A8' }}>
                {obs.description}
              </p>
              <div className="flex flex-wrap gap-2">
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
            </div>
          ))}
        </div>
      </section>

      {/* Confidence Framework */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>02</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>置信度评估框架</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { level: 'High' as const, label: '高置信度', pct: '约2-3%', criteria: '≥3个独立来源，官方档案，多传感器同步，大规模群体性目击(≥100人)+官方确认', example: 'Nimitz Tic Tac', color: '#00D9A5' },
            { level: 'Medium' as const, label: '中等置信度', pct: '约5-10%', criteria: '单一权威来源或有限多源验证(2个来源)，存在合理替代解释但未被证实', example: '罗斯威尔', color: '#F5A623' },
            { level: 'Low' as const, label: '低置信度', pct: '约20-30%', criteria: '单一来源，信息链断裂，无法独立验证', example: '部分民间社交媒体报告', color: '#FF6B35' },
            { level: 'Speculative' as const, label: '推测性', pct: '约60-70%', criteria: '间接推理，缺乏直接物理证据，古代记录，单一目击者近距离接触', example: '古代宇航员假说', color: '#B8B8B8' },
          ].map((tier) => (
            <div key={tier.level} className="uap-card overflow-hidden">
              <div className="h-1" style={{ background: tier.color }} />
              <div className="p-5">
                <div
                  className="inline-flex px-2 py-1 rounded text-[11px] font-bold mb-3"
                  style={{ background: `${tier.color}15`, color: tier.color, border: `1px solid ${tier.color}30` }}
                >
                  {tier.label}
                </div>
                <p className="font-mono-data text-2xl font-bold mb-2" style={{ color: '#EDE8E4' }}>{tier.pct}</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#8A99A8' }}>
                  {tier.criteria}
                </p>
                <p className="text-xs" style={{ color: '#30B0D0' }}>
                  示例: {tier.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hypothesis Comparison */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>03</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>主要假说框架对比</h2>
        </div>
        <p className="mb-8" style={{ color: '#8A99A8' }}>
          约2-5%的未解释案例提出了五种主要解释框架。
        </p>

        <div className="overflow-x-auto uap-scrollbar">
          <table className="w-full min-w-[800px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0F1923' }}>
                {['假说', '物理模型', '支持证据', '反对意见', '可信度'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hypotheses.map((h, idx) => {
                const color = confidenceColors[h.credibility]
                return (
                  <tr
                    key={h.id}
                    className="transition-colors"
                    style={{
                      background: idx % 2 === 0 ? '#0A1117' : '#050A0F',
                    }}
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold" style={{ color: '#EDE8E4' }}>{h.name}</div>
                      <div className="text-xs" style={{ color: '#8A99A8' }}>{h.nameEn}</div>
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>{h.physicalModel}</td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>{h.supportingEvidence}</td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>{h.opposingEvidence}</td>
                    <td className="px-4 py-4">
                      <span
                        className="px-2 py-1 rounded text-[11px] font-bold"
                        style={{ background: `${color}15`, color: color, border: `1px solid ${color}30` }}
                      >
                        {h.credibilityLabel}
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
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>04</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>七大系统性信息缺口</h2>
        </div>

        <div className="space-y-4">
          {infoGaps.map((gap) => {
            const isExpanded = expandedGaps.has(gap.id)
            return (
              <div
                key={gap.id}
                className="uap-card overflow-hidden"
                style={{ background: '#080E14' }}
              >
                <button
                  onClick={() => toggleGap(gap.id)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span
                    className="font-mono-data text-4xl font-bold shrink-0"
                    style={{ color: '#30B0D0', opacity: isExpanded ? 1 : 0.3, transition: 'opacity 0.3s' }}
                  >
                    {String(gap.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>
                      {gap.title}
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
                      {gap.description}
                    </p>
                    <p className="text-sm mb-2" style={{ color: '#FF6B35' }}>
                      <strong>影响：</strong>{gap.impact}
                    </p>
                    <p className="text-sm" style={{ color: '#00D9A5' }}>
                      <strong>建议：</strong>{gap.recommendation}
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
          <span className="font-mono-data text-2xl font-bold" style={{ color: '#30B0D0' }}>05</span>
          <h2 className="font-serif-display text-3xl font-bold" style={{ color: '#EDE8E4' }}>未来研究方向</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchDirections.map((dir) => (
            <div key={dir.id} className="uap-card p-6">
              <div className="mb-4" style={{ color: '#30B0D0' }}>
                {iconMap[dir.icon] || <Globe className="w-6 h-6" />}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#EDE8E4' }}>{dir.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8A99A8' }}>
                {dir.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
