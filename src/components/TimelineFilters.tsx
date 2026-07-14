import { Search, X, LayoutGrid, AlignVerticalJustifyCenter, ArrowUpDown } from 'lucide-react'
import {
  confidenceColors,
  confidenceLabels,
  physicalCharLabels,
  regionLabels,
  corePhysicalCharacteristics,
} from '../data/events'
import type { ConfidenceLevel } from '../data/events'

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
  ...corePhysicalCharacteristics.map((value) => ({
    value,
    label: physicalCharLabels[value].label,
  })),
]

interface TimelineFiltersProps {
  searchQuery: string
  confidenceFilter: string
  regionFilter: string
  charFilter: string
  sortBy: 'confidence' | 'date'
  viewMode: 'grid' | 'timeline'
  onUpdateFilters: (updates: Record<string, string | null>) => void
  onClearFilters: () => void
  onViewModeChange: (mode: 'grid' | 'timeline') => void
}

export default function TimelineFilters({
  searchQuery,
  confidenceFilter,
  regionFilter,
  charFilter,
  sortBy,
  viewMode,
  onUpdateFilters,
  onClearFilters,
  onViewModeChange,
}: TimelineFiltersProps) {
  const activeFilters = Boolean(confidenceFilter || regionFilter || charFilter || searchQuery)

  return (
    <div
      className="sticky top-16 z-30"
      style={{ background: 'rgba(5, 10, 15, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(138, 153, 168, 0.15)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8A99A8' }} />
            <input
              type="text"
              placeholder="搜索事件、地点..."
              value={searchQuery}
              onChange={(e) => onUpdateFilters({ search: e.target.value || null })}
              className="w-full pl-9 pr-4 py-2 rounded-md text-sm outline-none focus:ring-2 transition-all"
              style={{
                background: '#0F1923',
                border: '1px solid rgba(138, 153, 168, 0.2)',
                color: '#EDE8E4',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onUpdateFilters({ search: null })}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5" style={{ color: '#8A99A8' }} />
              </button>
            )}
          </div>

          <select
            value={confidenceFilter}
            onChange={(e) => onUpdateFilters({ confidence: e.target.value || null })}
            className="px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
            style={{ background: '#0F1923', border: '1px solid rgba(138, 153, 168, 0.2)', color: '#EDE8E4' }}
          >
            {confidenceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={regionFilter}
            onChange={(e) => onUpdateFilters({ region: e.target.value || null })}
            className="px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
            style={{ background: '#0F1923', border: '1px solid rgba(138, 153, 168, 0.2)', color: '#EDE8E4' }}
          >
            {regionOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={charFilter}
            onChange={(e) => onUpdateFilters({ characteristic: e.target.value || null })}
            className="px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
            style={{ background: '#0F1923', border: '1px solid rgba(138, 153, 168, 0.2)', color: '#EDE8E4' }}
          >
            {charOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {activeFilters && (
            <button
              onClick={onClearFilters}
              className="px-3 py-2 rounded-md text-sm transition-colors hover:text-[#30B0D0]"
              style={{ color: '#8A99A8' }}
            >
              重置
            </button>
          )}

          <div className="flex-1" />

          <div className="flex items-center gap-1 mr-3">
            <ArrowUpDown className="w-3.5 h-3.5 mr-1" style={{ color: '#8A99A8' }} />
            <button
              onClick={() => onUpdateFilters({ sort: null })}
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
              onClick={() => onUpdateFilters({ sort: 'date' })}
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

          <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1px solid rgba(138, 153, 168, 0.2)' }}>
            <button
              onClick={() => onViewModeChange('grid')}
              className="p-2 transition-colors"
              style={{ background: viewMode === 'grid' ? '#0F1923' : 'transparent', color: viewMode === 'grid' ? '#30B0D0' : '#8A99A8' }}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className="p-2 transition-colors"
              style={{ background: viewMode === 'timeline' ? '#0F1923' : 'transparent', color: viewMode === 'timeline' ? '#30B0D0' : '#8A99A8' }}
            >
              <AlignVerticalJustifyCenter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(48,176,208,0.1)', color: '#30B0D0', border: '1px solid rgba(48,176,208,0.2)' }}>
                搜索: {searchQuery}
                <X className="w-3 h-3 cursor-pointer" onClick={() => onUpdateFilters({ search: null })} />
              </span>
            )}
            {confidenceFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: `${confidenceColors[confidenceFilter as ConfidenceLevel]}15`, color: confidenceColors[confidenceFilter as ConfidenceLevel], border: `1px solid ${confidenceColors[confidenceFilter as ConfidenceLevel]}30` }}>
                {confidenceLabels[confidenceFilter as ConfidenceLevel]}
                <X className="w-3 h-3 cursor-pointer" onClick={() => onUpdateFilters({ confidence: null })} />
              </span>
            )}
            {regionFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>
                {regionLabels[regionFilter]}
                <X className="w-3 h-3 cursor-pointer" onClick={() => onUpdateFilters({ region: null })} />
              </span>
            )}
            {charFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(255,46,99,0.1)', color: '#FF2E63', border: '1px solid rgba(255,46,99,0.2)' }}>
                {physicalCharLabels[charFilter as keyof typeof physicalCharLabels]?.label}
                <X className="w-3 h-3 cursor-pointer" onClick={() => onUpdateFilters({ characteristic: null })} />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
