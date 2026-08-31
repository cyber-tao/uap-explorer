import { useState } from 'react'
import { ChevronDown, ChevronUp, Navigation2, Flame } from 'lucide-react'
import { HOTSPOT_CORRIDORS, type HotspotCorridor } from '../../data/worldGeoData'
import { useI18n } from '../../i18n'

interface HotspotsSidebarProps {
  onSelectCorridor: (corridor: HotspotCorridor) => void
  activeCorridorId: string | null
  totalEventsCount?: number
  filteredEventsCount?: number
}

export default function HotspotsSidebar({
  onSelectCorridor,
  activeCorridorId,
}: HotspotsSidebarProps) {
  const { language, t } = useI18n()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`absolute bottom-6 right-4 z-20 transition-all duration-300 w-80 max-w-[calc(100%-2rem)] rounded-xl border shadow-2xl backdrop-blur-xl ${
        collapsed ? 'h-12' : 'max-h-[380px]'
      } flex flex-col overflow-hidden`}
      style={{
        background: 'rgba(7, 13, 19, 0.92)',
        borderColor: 'rgba(48, 176, 208, 0.25)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 16px rgba(48, 176, 208, 0.1)',
      }}
    >
      {/* Header with collapse button */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer border-b select-none transition-colors hover:bg-[rgba(48,176,208,0.06)]"
        style={{
          background: 'rgba(10, 17, 23, 0.9)',
          borderColor: 'rgba(138, 153, 168, 0.15)',
        }}
      >
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#30B0D0]" />
          <span className="text-xs font-serif-display font-bold text-[#EDE8E4] tracking-wide">
            {t('hotspots.corridorsTitle')}
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-mono-data rounded bg-[rgba(48,176,208,0.15)] text-[#30B0D0]">
            {HOTSPOT_CORRIDORS.length}
          </span>
        </div>

        <button
          type="button"
          className="p-1 rounded text-[#8A99A8] hover:text-[#EDE8E4] transition-colors"
          aria-label={collapsed ? 'Expand corridor list' : 'Collapse corridor list'}
        >
          {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Corridor items list */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 uap-scrollbar space-y-2">
          <p className="text-[11px] text-[#8A99A8] px-1 mb-2 font-mono-data">
            {t('hotspots.corridorsSubtitle')}
          </p>
          {HOTSPOT_CORRIDORS.map((corridor) => {
            const isActive = activeCorridorId === corridor.id
            const title = language === 'en' ? corridor.titleEn : corridor.titleZh
            const desc = language === 'en' ? corridor.descriptionEn : corridor.descriptionZh

            return (
              <div
                key={corridor.id}
                onClick={() => onSelectCorridor(corridor)}
                className="p-2.5 rounded-lg border transition-all duration-200 cursor-pointer group"
                style={{
                  background: isActive ? 'rgba(48, 176, 208, 0.15)' : 'rgba(15, 25, 35, 0.6)',
                  borderColor: isActive ? '#30B0D0' : 'rgba(138, 153, 168, 0.12)',
                  boxShadow: isActive ? '0 0 16px rgba(48, 176, 208, 0.2)' : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <h4
                    className="text-xs font-bold transition-colors group-hover:text-[#30B0D0]"
                    style={{ color: isActive ? '#30B0D0' : '#EDE8E4' }}
                  >
                    {title}
                  </h4>
                  <span className="text-[10px] font-mono-data px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-[#8A99A8] shrink-0">
                    {corridor.eventIds.length} {language === 'zh' ? '案例' : 'cases'}
                  </span>
                </div>
                <p className="text-[11px] text-[#8A99A8] line-clamp-2 leading-relaxed mb-2">
                  {desc}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono-data text-[#30B0D0] pt-1.5 border-t border-[rgba(138,153,168,0.1)]">
                  <span className="flex items-center gap-1">
                    <Navigation2 className="w-3 h-3 rotate-45" />
                    <span>
                      {corridor.center.lat.toFixed(1)}°N, {corridor.center.lng.toFixed(1)}°E
                    </span>
                  </span>
                  <span className="group-hover:underline">
                    {language === 'zh' ? '飞越侦测 →' : 'Fly To →'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
