import { Flame, Crosshair, Sparkles, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Radio, Compass } from 'lucide-react'
import { REGION_PRESETS, type RegionPreset } from '../../data/worldGeoData'
import { useI18n } from '../../i18n'

export type LayerMode = 'heatmap' | 'tactical' | 'hybrid'

interface HotspotsControlsProps {
  layerMode: LayerMode
  onLayerModeChange: (mode: LayerMode) => void
  onSelectRegionPreset: (preset: RegionPreset) => void
  currentZoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
  radarActive: boolean
  onToggleRadar: () => void
}

export default function HotspotsControls({
  layerMode,
  onLayerModeChange,
  onSelectRegionPreset,
  currentZoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isFullscreen,
  onToggleFullscreen,
  radarActive,
  onToggleRadar,
}: HotspotsControlsProps) {
  const { language, t } = useI18n()

  const layerOptions: { mode: LayerMode; label: string; icon: typeof Flame }[] = [
    { mode: 'heatmap', label: t('hotspots.layerHeatmap'), icon: Flame },
    { mode: 'tactical', label: t('hotspots.layerTactical'), icon: Crosshair },
    { mode: 'hybrid', label: t('hotspots.layerHybrid'), icon: Sparkles },
  ]

  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2.5 max-w-[calc(100%-2rem)]">
      {/* Top Bar: Layer Mode Switcher & Radar status */}
      <div
        className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border shadow-lg backdrop-blur-md"
        style={{
          background: 'rgba(7, 13, 19, 0.85)',
          borderColor: 'rgba(138, 153, 168, 0.2)',
        }}
      >
        {/* Layer Mode Pill Buttons */}
        <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.04)] p-0.5 rounded-lg border border-[rgba(255,255,255,0.05)]">
          {layerOptions.map((opt) => {
            const Icon = opt.icon
            const active = layerMode === opt.mode
            return (
              <button
                key={opt.mode}
                type="button"
                onClick={() => onLayerModeChange(opt.mode)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: active ? 'rgba(48, 176, 208, 0.2)' : 'transparent',
                  color: active ? '#30B0D0' : '#8A99A8',
                  border: active ? '1px solid rgba(48, 176, 208, 0.4)' : '1px solid transparent',
                  boxShadow: active ? '0 0 12px rgba(48, 176, 208, 0.2)' : 'none',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>

        {/* Radar Pulse Toggle */}
        <button
          type="button"
          onClick={onToggleRadar}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono-data transition-all cursor-pointer border"
          style={{
            background: radarActive ? 'rgba(0, 217, 165, 0.12)' : 'rgba(255, 255, 255, 0.04)',
            color: radarActive ? '#00D9A5' : '#8A99A8',
            borderColor: radarActive ? 'rgba(0, 217, 165, 0.35)' : 'rgba(138, 153, 168, 0.15)',
          }}
          title="Toggle Radar Sweep Line Animation"
        >
          <Radio className={`w-3.5 h-3.5 ${radarActive ? 'animate-pulse' : ''}`} />
          <span className="hidden sm:inline">{t('hotspots.radarSweep')}</span>
        </button>
      </div>

      {/* Region Presets Fast-Jump Bar */}
      <div
        className="flex items-center gap-1 p-1.5 rounded-xl border shadow-lg backdrop-blur-md overflow-x-auto max-w-full uap-scrollbar"
        style={{
          background: 'rgba(7, 13, 19, 0.85)',
          borderColor: 'rgba(138, 153, 168, 0.2)',
        }}
      >
        <div className="flex items-center gap-1 text-[11px] text-[#8A99A8] px-2 font-mono-data shrink-0">
          <Compass className="w-3.5 h-3.5 text-[#30B0D0]" />
          <span>{t('hotspots.quickJump')}:</span>
        </div>
        {REGION_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectRegionPreset(preset)}
            className="px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all duration-150 cursor-pointer font-medium hover:bg-[rgba(48,176,208,0.15)] hover:text-[#30B0D0] text-[#8A99A8] border border-transparent hover:border-[rgba(48,176,208,0.3)]"
          >
            {language === 'en' ? preset.labelEn : preset.labelZh}
          </button>
        ))}
      </div>

      {/* Vertical Zoom & Display Controls (Bottom Left in map HUD) */}
      <div
        className="fixed bottom-6 left-6 z-20 flex flex-col items-center gap-1.5 p-1.5 rounded-xl border shadow-2xl backdrop-blur-md"
        style={{
          background: 'rgba(7, 13, 19, 0.9)',
          borderColor: 'rgba(48, 176, 208, 0.3)',
        }}
      >
        {/* Zoom In */}
        <button
          type="button"
          onClick={onZoomIn}
          className="p-2 rounded-lg text-[#8A99A8] hover:text-[#30B0D0] hover:bg-[rgba(48,176,208,0.15)] transition-colors cursor-pointer"
          title={t('hotspots.zoomIn')}
          aria-label={t('hotspots.zoomIn')}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Readout */}
        <div className="text-[10px] font-mono-data font-bold text-[#30B0D0] py-0.5 px-1 bg-[rgba(48,176,208,0.1)] rounded border border-[rgba(48,176,208,0.2)]">
          {currentZoom.toFixed(1)}x
        </div>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={onZoomOut}
          className="p-2 rounded-lg text-[#8A99A8] hover:text-[#30B0D0] hover:bg-[rgba(48,176,208,0.15)] transition-colors cursor-pointer"
          title={t('hotspots.zoomOut')}
          aria-label={t('hotspots.zoomOut')}
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-5 h-px bg-[rgba(138,153,168,0.2)] my-0.5" />

        {/* Reset Zoom */}
        <button
          type="button"
          onClick={onResetZoom}
          className="p-2 rounded-lg text-[#8A99A8] hover:text-[#EDE8E4] hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
          title={t('hotspots.resetZoom')}
          aria-label={t('hotspots.resetZoom')}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg text-[#8A99A8] hover:text-[#EDE8E4] hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
          title={isFullscreen ? t('hotspots.exitFullscreen') : t('hotspots.fullscreen')}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
