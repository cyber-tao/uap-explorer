import { useState, useMemo, useCallback } from 'react'
import {
  Flame,
  Calendar,
  Shield,
  RotateCcw,
  Search,
  Radar,
} from 'lucide-react'
import { events, type UAPEvent, type PhysicalCharacteristic } from '../data/events'
import { corePhysicalCharacteristics, physicalCharLabels } from '../data/events'
import { HOTSPOT_CORRIDORS, type RegionPreset, type HotspotCorridor, geoToSvg } from '../data/worldGeoData'
import HotspotsMap from '../components/hotspots/HotspotsMap'
import HotspotsControls, { type LayerMode } from '../components/hotspots/HotspotsControls'
import HotspotsDrawer from '../components/hotspots/HotspotsDrawer'
import HotspotsSidebar from '../components/hotspots/HotspotsSidebar'
import { useI18n } from '../i18n'

export default function HotspotsPage() {
  const { language, t, getConfidenceLabel, getRegionLabel } = useI18n()

  // Layer mode state
  const [layerMode, setLayerMode] = useState<LayerMode>('hybrid')
  const [radarActive, setRadarActive] = useState(true)

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedConfidence, setSelectedConfidence] = useState<string>('')
  const [selectedChar, setSelectedChar] = useState<string>('')
  const [yearRange, setYearRange] = useState<[number, number]>([1947, 2026])
  const [searchQuery, setSearchQuery] = useState('')

  // Map navigation & Selection states
  const [currentZoom, setCurrentZoom] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<UAPEvent | null>(null)
  const [clusterEvents, setClusterEvents] = useState<UAPEvent[] | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeCorridor, setActiveCorridor] = useState<HotspotCorridor | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Fly-to trigger target
  const [flyToTarget, setFlyToTarget] = useState<{
    x: number
    y: number
    zoom: number
    timestamp: number
  } | null>(null)

  // Filtered events calculation
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // 1. Coordinates check
      if (!e.coordinates || e.coordinates.length !== 2) return false

      // 2. Region check
      if (selectedRegion && e.region !== selectedRegion) return false

      // 3. Confidence check
      if (selectedConfidence && e.confidence !== selectedConfidence) return false

      // 4. Physical characteristic check
      if (selectedChar && !e.physicalCharacteristics.includes(selectedChar as PhysicalCharacteristic)) {
        return false
      }

      // 5. Year range check
      const eventYear = parseInt(e.date.slice(0, 4), 10)
      if (!isNaN(eventYear)) {
        if (eventYear < yearRange[0] || eventYear > yearRange[1]) {
          return false
        }
      }

      // 6. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = e.name.toLowerCase().includes(q) || (e.nameEn && e.nameEn.toLowerCase().includes(q))
        const matchLoc = e.location.toLowerCase().includes(q) || (e.locationEn && e.locationEn.toLowerCase().includes(q))
        if (!matchName && !matchLoc) return false
      }

      return true
    })
  }, [selectedRegion, selectedConfidence, selectedChar, yearRange, searchQuery])

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedRegion) count++
    if (selectedConfidence) count++
    if (selectedChar) count++
    if (yearRange[0] !== 1947 || yearRange[1] !== 2026) count++
    if (searchQuery.trim()) count++
    return count
  }, [selectedRegion, selectedConfidence, selectedChar, yearRange, searchQuery])

  const clearAllFilters = () => {
    setSelectedRegion('')
    setSelectedConfidence('')
    setSelectedChar('')
    setYearRange([1947, 2026])
    setSearchQuery('')
    setActiveCorridor(null)
  }

  // Handle Event selection
  const handleSelectEvent = useCallback((event: UAPEvent | null) => {
    setSelectedEvent(event)
    if (event && event.coordinates) {
      const { x, y } = geoToSvg(event.coordinates)
      setFlyToTarget({
        x,
        y,
        zoom: Math.max(3.2, currentZoom),
        timestamp: Date.now(),
      })
      setDrawerOpen(true)
    } else if (!event) {
      setSelectedEvent(null)
    }
  }, [currentZoom])

  // Handle Cluster selection
  const handleSelectCluster = useCallback((cluster: UAPEvent[]) => {
    setClusterEvents(cluster)
    setSelectedEvent(null)
    setDrawerOpen(true)
  }, [])

  // Handle Region Preset Jump
  const handleSelectRegionPreset = useCallback((preset: RegionPreset) => {
    setActiveCorridor(null)
    setFlyToTarget({
      x: preset.center.x,
      y: preset.center.y,
      zoom: preset.zoom,
      timestamp: Date.now(),
    })
  }, [])

  // Handle Corridor Jump
  const handleSelectCorridor = useCallback((corridor: HotspotCorridor) => {
    setActiveCorridor(corridor)
    const { x, y } = geoToSvg([corridor.center.lng, corridor.center.lat])
    setFlyToTarget({
      x,
      y,
      zoom: corridor.zoom,
      timestamp: Date.now(),
    })
  }, [])

  // Zoom controls
  const handleZoomIn = () => {
    setCurrentZoom((prev) => {
      const next = Math.min(10, prev * 1.3)
      setFlyToTarget((target) => ({
        x: target?.x ?? 500,
        y: target?.y ?? 260,
        zoom: next,
        timestamp: Date.now(),
      }))
      return next
    })
  }

  const handleZoomOut = () => {
    setCurrentZoom((prev) => {
      const next = Math.max(0.75, prev * 0.75)
      setFlyToTarget((target) => ({
        x: target?.x ?? 500,
        y: target?.y ?? 260,
        zoom: next,
        timestamp: Date.now(),
      }))
      return next
    })
  }

  const handleResetZoom = () => {
    setActiveCorridor(null)
    setFlyToTarget({
      x: 500,
      y: 260,
      zoom: 1,
      timestamp: Date.now(),
    })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Key stats
  const highConfidenceCount = useMemo(() => {
    return events.filter((e) => e.confidence === 'High').length
  }, [])

  return (
    <div className="pt-16 min-h-[100dvh] flex flex-col" style={{ background: '#050A0F' }}>
      {/* Page Header section (Hidden when in fullscreen HUD mode) */}
      {!isFullscreen && (
        <section className="max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(138,153,168,0.15)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00D9A5] animate-ping" />
                <p className="text-xs font-mono-data font-bold tracking-widest uppercase text-[#30B0D0]">
                  {t('hotspots.eyebrow')}
                </p>
              </div>
              <h1 className="font-serif-display text-3xl md:text-5xl font-bold text-[#EDE8E4] mb-3">
                {t('hotspots.title')}
              </h1>
              <p className="text-sm text-[#8A99A8] max-w-3xl leading-relaxed">
                {t('hotspots.subtitle')}
              </p>
            </div>

            {/* Strategic KPI Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-xl border bg-[rgba(10,17,23,0.8)] border-[rgba(48,176,208,0.25)] flex items-center gap-3 shadow-lg">
                <Radar className="w-6 h-6 text-[#30B0D0]" />
                <div>
                  <div className="text-lg font-mono-data font-bold text-[#EDE8E4]">{events.length}</div>
                  <div className="text-[10px] text-[#8A99A8] uppercase tracking-wider">{t('hotspots.statsIncidents')}</div>
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-xl border bg-[rgba(10,17,23,0.8)] border-[rgba(245,166,35,0.25)] flex items-center gap-3 shadow-lg">
                <Flame className="w-6 h-6 text-[#F5A623]" />
                <div>
                  <div className="text-lg font-mono-data font-bold text-[#EDE8E4]">{HOTSPOT_CORRIDORS.length}</div>
                  <div className="text-[10px] text-[#8A99A8] uppercase tracking-wider">{t('hotspots.statsCorridors')}</div>
                </div>
              </div>

              <div className="hidden lg:flex px-4 py-2.5 rounded-xl border bg-[rgba(10,17,23,0.8)] border-[rgba(0,217,165,0.25)] items-center gap-3 shadow-lg">
                <Shield className="w-6 h-6 text-[#00D9A5]" />
                <div>
                  <div className="text-lg font-mono-data font-bold text-[#EDE8E4]">{highConfidenceCount}</div>
                  <div className="text-[10px] text-[#8A99A8] uppercase tracking-wider">{t('hotspots.statsDeclassified')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tactical Filters & Horizon Scrubbing Toolbar */}
          <div className="pt-6 pb-2 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Filter Selectors */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Region Filter */}
                <select
                  id="hotspots-region-select"
                  name="region"
                  aria-label={t('hotspots.regionFilterLabel')}
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-data bg-[rgba(15,25,35,0.8)] text-[#EDE8E4] border border-[rgba(138,153,168,0.2)] focus:border-[#30B0D0] outline-none cursor-pointer"
                >
                  <option value="">{t('hotspots.regionFilterLabel')}: All</option>
                  <option value="North America">{getRegionLabel('North America')}</option>
                  <option value="Europe">{getRegionLabel('Europe')}</option>
                  <option value="Asia">{getRegionLabel('Asia')}</option>
                  <option value="South America">{getRegionLabel('South America')}</option>
                  <option value="Africa">{getRegionLabel('Africa')}</option>
                  <option value="Space">{getRegionLabel('Space')}</option>
                </select>

                {/* Confidence Filter */}
                <select
                  id="hotspots-confidence-select"
                  name="confidence"
                  aria-label={t('hotspots.confidenceFilterLabel')}
                  value={selectedConfidence}
                  onChange={(e) => setSelectedConfidence(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-data bg-[rgba(15,25,35,0.8)] text-[#EDE8E4] border border-[rgba(138,153,168,0.2)] focus:border-[#30B0D0] outline-none cursor-pointer"
                >
                  <option value="">{t('hotspots.confidenceFilterLabel')}: All</option>
                  <option value="High">{getConfidenceLabel('High')}</option>
                  <option value="Medium">{getConfidenceLabel('Medium')}</option>
                  <option value="Low">{getConfidenceLabel('Low')}</option>
                  <option value="Speculative">{getConfidenceLabel('Speculative')}</option>
                </select>

                {/* Observable Characteristic Filter */}
                <select
                  id="hotspots-characteristic-select"
                  name="characteristic"
                  aria-label={t('hotspots.characteristicFilterLabel')}
                  value={selectedChar}
                  onChange={(e) => setSelectedChar(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-data bg-[rgba(15,25,35,0.8)] text-[#EDE8E4] border border-[rgba(138,153,168,0.2)] focus:border-[#30B0D0] outline-none cursor-pointer"
                >
                  <option value="">{t('hotspots.characteristicFilterLabel')}: All</option>
                  {corePhysicalCharacteristics.map((slug) => (
                    <option key={slug} value={slug}>
                      {language === 'en'
                        ? slug.replace(/-/g, ' ')
                        : physicalCharLabels[slug]?.label || slug}
                    </option>
                  ))}
                </select>

                {/* Keyword Search Input */}
                <div className="relative">
                  <input
                    id="hotspots-search-input"
                    name="search"
                    aria-label="Search UAP events"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'zh' ? '搜索事件或海空位置...' : 'Search vector or location...'}
                    className="w-48 md:w-56 pl-8 pr-3 py-1.5 rounded-lg text-xs font-mono-data bg-[rgba(15,25,35,0.8)] text-[#EDE8E4] border border-[rgba(138,153,168,0.2)] focus:border-[#30B0D0] outline-none placeholder-[#8A99A8]"
                  />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#8A99A8]" />
                </div>

                {/* Reset Filters button */}
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-[#30B0D0] bg-[rgba(48,176,208,0.1)] border border-[rgba(48,176,208,0.3)] hover:bg-[rgba(48,176,208,0.2)] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t('hotspots.clearFilters')} ({activeFiltersCount})</span>
                  </button>
                )}
              </div>

              {/* Time Horizon Slider Bar */}
              <div className="flex items-center gap-3 bg-[rgba(15,25,35,0.7)] px-4 py-1.5 rounded-xl border border-[rgba(138,153,168,0.2)]">
                <Calendar className="w-3.5 h-3.5 text-[#30B0D0]" />
                <span className="text-xs font-mono-data text-[#8A99A8] shrink-0">
                  {yearRange[0]} – {yearRange[1]}
                </span>
                <input
                  type="range"
                  min="1947"
                  max="2026"
                  value={yearRange[0]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10)
                    setYearRange([val, Math.max(val, yearRange[1])])
                  }}
                  className="w-24 accent-[#30B0D0] cursor-pointer"
                  title="Starting year"
                />
                <input
                  type="range"
                  min="1947"
                  max="2026"
                  value={yearRange[1]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10)
                    setYearRange([Math.min(yearRange[0], val), val])
                  }}
                  className="w-24 accent-[#30B0D0] cursor-pointer"
                  title="Ending year"
                />
              </div>
            </div>

            {/* Filter result status count */}
            <div className="flex items-center justify-between text-xs text-[#8A99A8] font-mono-data">
              <span>
                {language === 'zh'
                  ? `匹配点位：${filteredEvents.length} / 全部 ${events.length} 起事件`
                  : `Telemetry Matched: ${filteredEvents.length} of ${events.length} verified events`}
              </span>
              {activeCorridor && (
                <span className="text-[#30B0D0] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  {language === 'en' ? activeCorridor.titleEn : activeCorridor.titleZh}
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Map Interactive Canvas Viewport */}
      <div
        className={`relative w-full flex-1 transition-all duration-300 border-y ${
          isFullscreen
            ? 'fixed inset-0 z-50 h-[100dvh] border-none'
            : 'h-[620px] md:h-[720px] max-w-[1400px] mx-auto border-[rgba(48,176,208,0.2)] md:rounded-2xl md:overflow-hidden md:border md:my-4'
        }`}
        style={{
          boxShadow: isFullscreen ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(48, 176, 208, 0.1)',
        }}
      >
        {/* Map Vector Component */}
        <HotspotsMap
          events={filteredEvents}
          layerMode={layerMode}
          radarActive={radarActive}
          onSelectEvent={handleSelectEvent}
          onSelectCluster={handleSelectCluster}
          selectedEventId={selectedEvent?.id ?? null}
          activeCorridorEventIds={activeCorridor?.eventIds ?? null}
          flyToTarget={flyToTarget}
          onZoomChange={setCurrentZoom}
        />

        {/* HUD Controls */}
        <HotspotsControls
          layerMode={layerMode}
          onLayerModeChange={setLayerMode}
          onSelectRegionPreset={handleSelectRegionPreset}
          currentZoom={currentZoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          radarActive={radarActive}
          onToggleRadar={() => setRadarActive(!radarActive)}
        />

        {/* Tactical Dossier Drawer */}
        <HotspotsDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedEvent={selectedEvent}
          clusterEvents={clusterEvents}
          onSelectEvent={handleSelectEvent}
        />

        {/* Hotspot Strategic Corridors Sidebar Toplist */}
        <HotspotsSidebar
          onSelectCorridor={handleSelectCorridor}
          activeCorridorId={activeCorridor?.id ?? null}
          totalEventsCount={events.length}
          filteredEventsCount={filteredEvents.length}
        />
      </div>
    </div>
  )
}
