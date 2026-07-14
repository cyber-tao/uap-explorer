import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { events, confidenceColors, confidenceLabels, searchEvents } from '../data/events'
import type { PhysicalCharacteristic } from '../data/events'
import EventCard from '../components/EventCard'
import TimelineFilters from '../components/TimelineFilters'

type SortBy = 'confidence' | 'date'
type ViewMode = 'grid' | 'timeline'

function parseSort(value: string | null): SortBy {
  return value === 'date' ? 'date' : 'confidence'
}

export default function TimelinePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const searchQuery = searchParams.get('search') || ''
  const confidenceFilter = searchParams.get('confidence') || ''
  const regionFilter = searchParams.get('region') || ''
  const charFilter = searchParams.get('characteristic') || ''
  const sortBy = parseSort(searchParams.get('sort'))
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const updateFilters = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(updates)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    if (parseSort(next.get('sort')) === 'confidence') next.delete('sort')
    setSearchParams(next, { replace: true })
  }

  const filteredEvents = useMemo(() => {
    let result = [...events]
    if (searchQuery) result = searchEvents(searchQuery)
    if (confidenceFilter) result = result.filter((e) => e.confidence === confidenceFilter)
    if (regionFilter) result = result.filter((e) => e.region === regionFilter)
    if (charFilter) {
      result = result.filter((e) =>
        e.physicalCharacteristics.includes(charFilter as PhysicalCharacteristic)
      )
    }

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

  const clearFilters = () => {
    updateFilters({
      search: null,
      confidence: null,
      region: null,
      characteristic: null,
    })
  }

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
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

      <TimelineFilters
        searchQuery={searchQuery}
        confidenceFilter={confidenceFilter}
        regionFilter={regionFilter}
        charFilter={charFilter}
        sortBy={sortBy}
        viewMode={viewMode}
        onUpdateFilters={updateFilters}
        onClearFilters={clearFilters}
        onViewModeChange={setViewMode}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
        <p className="text-sm" style={{ color: '#8A99A8' }}>
          共 <span className="font-mono-data font-bold" style={{ color: '#30B0D0' }}>{filteredEvents.length}</span> 个事件
        </p>
      </div>

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
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
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
        )}
      </section>
    </div>
  )
}
