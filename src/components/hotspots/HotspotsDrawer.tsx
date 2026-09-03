import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, MapPin, Calendar, Radio, Sparkles, Layers, ChevronRight } from 'lucide-react'
import type { UAPEvent } from '../../data/events'
import { confidenceColors, physicalCharLabels } from '../../data/events'
import { assetUrl, formatCoordinates } from '../../lib/utils'
import { useI18n } from '../../i18n'

interface HotspotsDrawerProps {
  isOpen: boolean
  onClose: () => void
  selectedEvent: UAPEvent | null
  clusterEvents: UAPEvent[] | null
  onSelectEvent: (event: UAPEvent | null) => void
}

export default function HotspotsDrawer({
  isOpen,
  onClose,
  selectedEvent,
  clusterEvents,
  onSelectEvent,
}: HotspotsDrawerProps) {
  const { language, t, getConfidenceLabel } = useI18n()
  const navigate = useNavigate()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || (!selectedEvent && (!clusterEvents || clusterEvents.length === 0))) {
    return null
  }

  const isCluster = clusterEvents && clusterEvents.length > 1 && !selectedEvent

  return (
    <div
      ref={drawerRef}
      className="absolute top-4 right-4 bottom-4 w-[calc(100%-2rem)] max-w-md z-30 flex flex-col rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 animate-in slide-in-from-right-8"
      style={{
        background: 'rgba(7, 13, 19, 0.94)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(48, 176, 208, 0.3)',
        boxShadow: '0 16px 48px -8px rgba(0, 0, 0, 0.8), 0 0 24px rgba(48, 176, 208, 0.15)',
      }}
    >
      {/* Drawer Header */}
      <div
        className="px-5 py-4 border-b flex items-center justify-between"
        style={{
          background: 'rgba(10, 17, 23, 0.8)',
          borderColor: 'rgba(138, 153, 168, 0.15)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#30B0D0', boxShadow: '0 0 8px #30B0D0' }}
          />
          <span className="text-xs font-mono-data tracking-wider uppercase text-[#30B0D0]">
            {isCluster
              ? `${clusterEvents.length} ${t('hotspots.clusterLabel')}`
              : t('hotspots.drawerTitle')}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#8A99A8] hover:text-[#EDE8E4] hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
          aria-label="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 uap-scrollbar space-y-5">
        {/* Cluster List Mode */}
        {isCluster ? (
          <div className="space-y-3">
            <p className="text-xs text-[#8A99A8] mb-3">
              {language === 'zh'
                ? `该聚集区域内共包含 ${clusterEvents.length} 起 UAP 事件，点击单张卡片查看战术简报：`
                : `This cluster contains ${clusterEvents.length} localized UAP incidents. Select an entry to review:`}
            </p>
            {clusterEvents.map((ev) => {
              const confColor = confidenceColors[ev.confidence]
              const title = language === 'en' && ev.nameEn ? ev.nameEn : ev.name
              const location = language === 'en' && ev.locationEn ? ev.locationEn : ev.location
              return (
                <div
                  key={ev.id}
                  onClick={() => onSelectEvent(ev)}
                  className="p-3.5 rounded-lg border transition-all cursor-pointer group hover:border-[#30B0D0] hover:bg-[rgba(48,176,208,0.08)]"
                  style={{
                    background: 'rgba(15, 25, 35, 0.6)',
                    borderColor: 'rgba(138, 153, 168, 0.15)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-[#EDE8E4] group-hover:text-[#30B0D0] transition-colors">
                      {title}
                    </h4>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono-data font-bold shrink-0"
                      style={{
                        background: `${confColor}18`,
                        color: confColor,
                        border: `1px solid ${confColor}40`,
                      }}
                    >
                      {getConfidenceLabel(ev.confidence)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8A99A8] mb-2 font-mono-data">
                    <span>{ev.date}</span>
                    <span>•</span>
                    <span className="truncate">{location}</span>
                  </div>
                  <p className="text-xs text-[#8A99A8] line-clamp-2 leading-relaxed">
                    {language === 'en' && ev.shortDescEn ? ev.shortDescEn : ev.shortDesc}
                  </p>
                </div>
              )
            })}
          </div>
        ) : selectedEvent ? (
          /* Single Event Detailed Dossier Mode */
          <>
            {/* If viewed from a cluster, allow back button */}
            {clusterEvents && clusterEvents.length > 1 && (
              <button
                type="button"
                onClick={() => onSelectEvent(null)}
                className="flex items-center gap-1.5 text-xs text-[#30B0D0] hover:underline cursor-pointer mb-2 font-mono-data"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {language === 'zh'
                    ? `← 返回聚集列表 (${clusterEvents.length})`
                    : `← Back to Cluster (${clusterEvents.length})`}
                </span>
              </button>
            )}

            {/* Cover Image & Confidence Badge */}
            <div className="relative rounded-lg overflow-hidden border border-[rgba(138,153,168,0.2)] bg-black aspect-video">
              <img
                src={assetUrl(selectedEvent.image)}
                alt={selectedEvent.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2.5 right-2.5">
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-mono-data font-bold backdrop-blur-md shadow-lg"
                  style={{
                    background: 'rgba(5, 10, 15, 0.85)',
                    color: confidenceColors[selectedEvent.confidence],
                    border: `1px solid ${confidenceColors[selectedEvent.confidence]}60`,
                  }}
                >
                  {getConfidenceLabel(selectedEvent.confidence)}
                </span>
              </div>
              {selectedEvent.region === 'Space' && (
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-data uppercase bg-[rgba(48,176,208,0.3)] text-[#30B0D0] border border-[#30B0D0] backdrop-blur-md">
                    {t('hotspots.orbitalEventNote')}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Date */}
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#EDE8E4] leading-snug mb-1">
                {language === 'en' && selectedEvent.nameEn ? selectedEvent.nameEn : selectedEvent.name}
              </h3>
              {language !== 'en' && selectedEvent.nameEn && (
                <p className="text-xs text-[#8A99A8] font-mono-data mb-2">{selectedEvent.nameEn}</p>
              )}
            </div>

            {/* Tactical Telemetry Key-Value Grid */}
            <div
              className="p-3.5 rounded-lg border space-y-2.5 text-xs font-mono-data"
              style={{
                background: 'rgba(15, 25, 35, 0.5)',
                borderColor: 'rgba(138, 153, 168, 0.15)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#8A99A8] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#30B0D0]" />
                  {t('hotspots.drawerDate')}
                </span>
                <span className="text-[#EDE8E4] font-bold">{selectedEvent.date}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8A99A8] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#30B0D0]" />
                  {t('hotspots.drawerLocation')}
                </span>
                <span className="text-[#EDE8E4] max-w-[200px] text-right truncate">
                  {language === 'en' && selectedEvent.locationEn
                    ? selectedEvent.locationEn
                    : selectedEvent.location}
                </span>
              </div>

              {selectedEvent.coordinates && (
                <div className="flex items-center justify-between">
                  <span className="text-[#8A99A8] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#30B0D0]" />
                    {t('hotspots.drawerCoordinates')}
                  </span>
                  <span className="text-[#30B0D0]">
                    {formatCoordinates(selectedEvent.coordinates, 2)}
                  </span>
                </div>
              )}
            </div>

            {/* Physical Characteristics Observables */}
            {selectedEvent.physicalCharacteristics && selectedEvent.physicalCharacteristics.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A99A8] font-mono-data mb-2">
                  {t('hotspots.drawerCharacteristics')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.physicalCharacteristics.map((slug) => {
                    const charObj = physicalCharLabels[slug]
                    const label =
                      language === 'en'
                        ? slug.replace(/-/g, ' ')
                        : charObj?.label || slug
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium"
                        style={{
                          background: 'rgba(48, 176, 208, 0.1)',
                          color: '#30B0D0',
                          border: '1px solid rgba(48, 176, 208, 0.25)',
                        }}
                      >
                        <Sparkles className="w-3 h-3 opacity-70" />
                        {label}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Sensors */}
            {selectedEvent.sensors && selectedEvent.sensors.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A99A8] font-mono-data mb-2">
                  {t('hotspots.drawerSensors')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'en' && selectedEvent.sensorsEn
                    ? selectedEvent.sensorsEn
                    : selectedEvent.sensors
                  ).map((sensor, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono-data text-[#EDE8E4] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]"
                    >
                      {sensor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Summary description */}
            <div className="space-y-2">
              <p className="text-xs leading-relaxed text-[#8A99A8]">
                {language === 'en' && selectedEvent.shortDescEn
                  ? selectedEvent.shortDescEn
                  : selectedEvent.shortDesc}
              </p>
            </div>
          </>
        ) : null}
      </div>

      {/* Drawer Footer CTA */}
      {selectedEvent && (
        <div
          className="p-4 border-t"
          style={{
            background: 'rgba(10, 17, 23, 0.9)',
            borderColor: 'rgba(138, 153, 168, 0.15)',
          }}
        >
          <button
            type="button"
            onClick={() => navigate(`/event/${selectedEvent.id}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(48,176,208,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #1C6B82 0%, #30B0D0 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(48, 176, 208, 0.6)',
            }}
          >
            <span>{t('hotspots.viewFullDossier')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
