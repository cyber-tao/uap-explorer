import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, LayoutGrid, AlignVerticalJustifyCenter, X, Radar, Zap, EyeOff, Waves, ArrowUp, Footprints, Users, Telescope, ArrowUpDown } from 'lucide-react'
import { events, confidenceColors, confidenceLabels, physicalCharLabels, regionLabels, searchEvents } from '../data/events'
import type { UAPEvent, ConfidenceLevel } from '../data/events'
import { assetUrl } from '../lib/utils'

const confidenceOptions: { value: string; label: string }[] = [
  { value: '', label: '全部置信度' },
  { value: 'High', label: '高置信度' },
  { value: 'Medium', label: '中等置信度' },
  { value: 'Low', label: '低置信度' },
  { value: 'Speculative', label: '推测性' },
]

const regionOptions: { value: string; label: string }[] = [
  { value: '', label: '全部地区' },
  { value: 'North America', label: '北美洲' },
  { value: 'South America', label: '南美洲' },
  { value: 'Europe', label: '欧洲' },
  { value: 'Asia', label: '亚洲' },
  { value: 'Oceania', label: '大洋洲' },
  { value: 'Africa', label: '非洲' },
  { value: 'Space', label: '太空/月球' },
]

const charOptions: { value: string; label: string }[] = [
  { value: '', label: '全部特征' },
  { value: 'instantaneous-acceleration', label: '瞬时加速' },
  { value: 'low-observability', label: '低可观测性' },
  { value: 'transmedium', label: '跨介质' },
  { value: 'anti-gravity', label: '正升力/反重力' },
  { value: 'multi-sensor', label: '多传感器' },
  { value: 'electromagnetic', label: '电磁效应' },
  { value: 'physical-traces', label: '物理痕迹' },
  { value: 'nuclear-association', label: '核关联' },
  { value: 'group-sighting', label: '群体目击' },
  { value: 'space', label: '太空目击' },
]

const iconMap: Record<string, React.ReactNode> = {
  'instantaneous-acceleration': <Zap className="w-3 h-3" />,
  'low-observability': <EyeOff className="w-3 h-3" />,
  'transmedium': <Waves className="w-3 h-3" />,
  'anti-gravity': <ArrowUp className="w-3 h-3" />,
  'multi-sensor': <Radar className="w-3 h-3" />,
  'electromagnetic': <Zap className="w-3 h-3" />,
  'physical-traces': <Footprints className="w-3 h-3" />,
  'nuclear-association': <Zap className="w-3 h-3" />,
  'group-sighting': <Users className="w-3 h-3" />,
  'space': <Telescope className="w-3 h-3" />,
}

export default function TimelinePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [confidenceFilter, setConfidenceFilter] = useState(searchParams.get('confidence') || '')
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || '')
  const [charFilter, setCharFilter] = useState(searchParams.get('characteristic') || '')
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid')
  const [sortBy, setSortBy] = useState<'confidence' | 'date'>(searchParams.get('sort') as 'confidence' | 'date' || 'confidence')

  // Sync filters to URL params
  useEffect(() => {
    const params: Record<string, string> = {}
    if (searchQuery) params.search = searchQuery
    if (confidenceFilter) params.confidence = confidenceFilter
    if (regionFilter) params.region = regionFilter
    if (charFilter) params.characteristic = charFilter
    if (sortBy !== 'confidence') params.sort = sortBy
    setSearchParams(params, { replace: true })
  }, [searchQuery, confidenceFilter, regionFilter, charFilter, sortBy, setSearchParams])

  const filteredEvents = useMemo(() => {
    let result = [...events]
    if (searchQuery) result = searchEvents(searchQuery)
    if (confidenceFilter) result = result.filter((e) => e.confidence === confidenceFilter)
    if (regionFilter) result = result.filter((e) => e.region === regionFilter)
    if (charFilter) result = result.filter((e) => e.physicalCharacteristics.includes(charFilter))

    // Sort
    const confidenceWeight: Record<string, number> = { High: 4, Medium: 3, Low: 2, Speculative: 1 }
    if (sortBy === 'confidence') {
      result.sort((a, b) => confidenceWeight[b.confidence] - confidenceWeight[a.confidence])
    } else {
      result.sort((a, b) => {
        const dateA = new Date(a.sortDate).getTime() || 0
        const dateB = new Date(b.sortDate).getTime() || 0
        return dateB - dateA
      })
    }
    return result
  }, [searchQuery, confidenceFilter, regionFilter, charFilter, sortBy])

  const activeFilters = Boolean(confidenceFilter || regionFilter || charFilter || searchQuery)

  const clearFilters = () => {
    setSearchQuery('')
    setConfidenceFilter('')
    setRegionFilter('')
    setCharFilter('')
  }

  const renderCard = (event: UAPEvent) => {
    const confColor = confidenceColors[event.confidence]
    const confLabel = confidenceLabels[event.confidence]

    return (
      <div
        key={event.id}
        className="uap-card cursor-pointer group overflow-hidden"
        onClick={() => navigate(`/event/${event.id}`)}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <img
            src={assetUrl(event.image)}
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center -z-10"
            style={{ background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}
          >
            <span className="font-serif-display text-2xl opacity-20" style={{ color: '#30B0D0' }}>
              {event.name[0]}
            </span>
          </div>
          {/* Confidence badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold rounded z-10"
            style={{
              background: `${confColor}20`,
              color: confColor,
              border: `1px solid ${confColor}40`,
              boxShadow: `0 0 12px ${confColor}20`,
            }}
          >
            {confLabel}
          </div>
          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 z-10" style={{ background: 'linear-gradient(transparent, rgba(5,10,15,0.8))' }} />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono-data text-xs" style={{ color: '#8A99A8' }}>{event.date}</span>
            <span className="text-xs" style={{ color: '#8A99A8' }}>·</span>
            <span className="text-sm font-semibold" style={{ color: '#EDE8E4' }}>
              {event.country} · {event.location}
            </span>
          </div>
          <h3 className="font-serif-display text-lg font-bold mb-2" style={{ color: '#EDE8E4' }}>
            {event.name}
          </h3>
          <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#8A99A8' }}>
            {event.shortDesc}
          </p>
          {/* Physical characteristic tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {event.physicalCharacteristics.slice(0, 3).map((char) => (
              <span
                key={char}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
                style={{ background: 'rgba(48,176,208,0.1)', color: '#30B0D0', border: '1px solid rgba(48,176,208,0.2)' }}
              >
                {iconMap[char]}
                {physicalCharLabels[char]?.label || char}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: '#30B0D0' }}>
              查看详情 →
            </span>
            <span className="text-xs font-mono-data" style={{ color: '#8A99A8' }}>
              {event.sensors?.join(' / ') || '目视目击'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const renderTimeline = () => {
    return (
      <div className="relative max-w-4xl mx-auto">
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-px"
          style={{ background: 'linear-gradient(to bottom, #30B0D0, transparent)' }}
        />
        {filteredEvents.map((event, idx) => {
          const confColor = confidenceColors[event.confidence]
          const isLeft = idx % 2 === 0
          return (
            <div
              key={event.id}
              className={`relative flex items-center mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -ml-[5px] md:-ml-[6px] z-10"
                style={{ background: confColor, boxShadow: `0 0 12px ${confColor}60` }}
              />
              <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                <div
                  className="uap-card cursor-pointer"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-data text-xs" style={{ color: confColor }}>{event.date}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: `${confColor}20`, color: confColor }}
                      >
                        {confidenceLabels[event.confidence]}
                      </span>
                    </div>
                    <h4 className="font-serif-display font-bold mb-1" style={{ color: '#EDE8E4' }}>
                      {event.name}
                    </h4>
                    <p className="text-xs line-clamp-2" style={{ color: '#8A99A8' }}>
                      {event.shortDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      {/* Page header */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-8">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#8A99A8' }}>
          EVENT ARCHIVE / 事件档案
        </p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
          全球UAP事件时间线
        </h1>
        <p className="max-w-2xl" style={{ color: '#8A99A8' }}>
          20+高置信度事件与全球目击报告的科学编年。按置信度、地区与物理特征筛选。
        </p>
      </section>

      {/* Filter bar */}
      <div
        className="sticky top-16 z-30"
        style={{ background: 'rgba(5, 10, 15, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(138, 153, 168, 0.15)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8A99A8' }} />
              <input
                type="text"
                placeholder="搜索事件、地点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md text-sm outline-none focus:ring-2 transition-all"
                style={{
                  background: '#0F1923',
                  border: '1px solid rgba(138, 153, 168, 0.2)',
                  color: '#EDE8E4',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-3.5 h-3.5" style={{ color: '#8A99A8' }} />
                </button>
              )}
            </div>

            {/* Confidence */}
            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
              style={{ background: '#0F1923', border: '1px solid rgba(138, 153, 168, 0.2)', color: '#EDE8E4' }}
            >
              {confidenceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Region */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
              style={{ background: '#0F1923', border: '1px solid rgba(138, 153, 168, 0.2)', color: '#EDE8E4' }}
            >
              {regionOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Characteristic */}
            <select
              value={charFilter}
              onChange={(e) => setCharFilter(e.target.value)}
              className="px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
              style={{ background: '#0F1923', border: '1px solid rgba(138, 153, 168, 0.2)', color: '#EDE8E4' }}
            >
              {charOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {activeFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-md text-sm transition-colors hover:text-[#30B0D0]"
                style={{ color: '#8A99A8' }}
              >
                重置
              </button>
            )}

            <div className="flex-1" />

            <div className="flex-1" />

            {/* Sort toggle */}
            <div className="flex items-center gap-1 mr-3">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1" style={{ color: '#8A99A8' }} />
              <button
                onClick={() => setSortBy('confidence')}
                className="px-2.5 py-1.5 rounded text-xs font-medium transition-colors"
                style={{
                  background: sortBy === 'confidence' ? 'rgba(48, 176, 208, 0.15)' : 'transparent',
                  color: sortBy === 'confidence' ? '#30B0D0' : '#8A99A8',
                  border: sortBy === 'confidence' ? '1px solid rgba(48, 176, 208, 0.3)' : '1px solid transparent',
                }}
              >
                可信度
              </button>
              <button
                onClick={() => setSortBy('date')}
                className="px-2.5 py-1.5 rounded text-xs font-medium transition-colors"
                style={{
                  background: sortBy === 'date' ? 'rgba(48, 176, 208, 0.15)' : 'transparent',
                  color: sortBy === 'date' ? '#30B0D0' : '#8A99A8',
                  border: sortBy === 'date' ? '1px solid rgba(48, 176, 208, 0.3)' : '1px solid transparent',
                }}
              >
                时间
              </button>
            </div>

            {/* View toggle */}
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1px solid rgba(138, 153, 168, 0.2)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="p-2 transition-colors"
                style={{ background: viewMode === 'grid' ? '#0F1923' : 'transparent', color: viewMode === 'grid' ? '#30B0D0' : '#8A99A8' }}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className="p-2 transition-colors"
                style={{ background: viewMode === 'timeline' ? '#0F1923' : 'transparent', color: viewMode === 'timeline' ? '#30B0D0' : '#8A99A8' }}
              >
                <AlignVerticalJustifyCenter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(48,176,208,0.1)', color: '#30B0D0', border: '1px solid rgba(48,176,208,0.2)' }}>
                  搜索: {searchQuery}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {confidenceFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: `${confidenceColors[confidenceFilter as ConfidenceLevel]}15`, color: confidenceColors[confidenceFilter as ConfidenceLevel], border: `1px solid ${confidenceColors[confidenceFilter as ConfidenceLevel]}30` }}>
                  {confidenceLabels[confidenceFilter as ConfidenceLevel]}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setConfidenceFilter('')} />
                </span>
              )}
              {regionFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>
                  {regionLabels[regionFilter]}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setRegionFilter('')} />
                </span>
              )}
              {charFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(255,46,99,0.1)', color: '#FF2E63', border: '1px solid rgba(255,46,99,0.2)' }}>
                  {physicalCharLabels[charFilter]?.label}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setCharFilter('')} />
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
        <p className="text-sm" style={{ color: '#8A99A8' }}>
          共 <span className="font-mono-data font-bold" style={{ color: '#30B0D0' }}>{filteredEvents.length}</span> 个事件
        </p>
      </div>

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-24">
            <Search className="w-12 h-12 mx-auto mb-4" style={{ color: '#8A99A8' }} />
            <p className="text-lg mb-2" style={{ color: '#EDE8E4' }}>未找到匹配的事件</p>
            <p className="text-sm mb-6" style={{ color: '#8A99A8' }}>请尝试调整筛选条件</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ background: '#30B0D0', color: '#050A0F' }}
            >
              重置所有筛选
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(renderCard)}
          </div>
        ) : (
          renderTimeline()
        )}
      </section>
    </div>
  )
}
