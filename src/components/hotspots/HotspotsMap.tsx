import { useState, useRef, useEffect, useMemo } from 'react'
import type { UAPEvent } from '../../data/events'
import { confidenceColors } from '../../data/events'
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  geoToSvg,
  WORLD_COUNTRIES,
  WORLD_BORDERS_PATH,
  WORLD_LAND_OUTLINE_PATH,
  STRATEGIC_OCEAN_LABELS,
  TACTICAL_GRID_LINES,
  type CountryGeometry,
} from '../../data/worldGeoData'
import { useI18n } from '../../i18n'
import type { LayerMode } from './HotspotsControls'

interface HotspotsMapProps {
  events: UAPEvent[]
  layerMode: LayerMode
  radarActive: boolean
  onSelectEvent: (event: UAPEvent) => void
  onSelectCluster: (cluster: UAPEvent[]) => void
  selectedEventId: string | null
  activeCorridorEventIds: string[] | null
  flyToTarget: { x: number; y: number; zoom: number; timestamp: number } | null
  onZoomChange: (zoom: number) => void
}

interface ClusterNode {
  id: string
  x: number
  y: number
  events: UAPEvent[]
  isCluster: boolean
  highestConfidence: UAPEvent['confidence']
}

export default function HotspotsMap({
  events,
  layerMode,
  radarActive,
  onSelectEvent,
  onSelectCluster,
  selectedEventId,
  activeCorridorEventIds,
  flyToTarget,
  onZoomChange,
}: HotspotsMapProps) {
  const { language, getConfidenceLabel } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Viewport transformation state
  const [viewState, setViewState] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  })
  const viewStateRef = useRef(viewState)
  useEffect(() => {
    viewStateRef.current = viewState
  }, [viewState])

  // Dragging interaction state
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, viewX: 0, viewY: 0 })

  // Hovered item for HUD Tooltip
  const [hoveredNode, setHoveredNode] = useState<{
    node: ClusterNode
    screenX: number
    screenY: number
  } | null>(null)

  // Hovered Country
  const [hoveredCountry, setHoveredCountry] = useState<{
    country: CountryGeometry
    eventCount: number
    screenX: number
    screenY: number
  } | null>(null)

  // Map events to projected SVG coordinates
  const projectedEvents = useMemo(() => {
    return events
      .filter((e) => e.coordinates && e.coordinates.length === 2)
      .map((e) => {
        const { x, y } = geoToSvg(e.coordinates!)
        return {
          event: e,
          x,
          y,
        }
      })
  }, [events])

  // Pre-calculate event count per country for map HUD inspection
  const countryEventCountMap = useMemo(() => {
    const map = new Map<string, number>()
    for (const { event } of projectedEvents) {
      if (event.country) {
        map.set(event.country, (map.get(event.country) || 0) + 1)
      }
      if (event.countryEn) {
        map.set(event.countryEn, (map.get(event.countryEn) || 0) + 1)
      }
    }
    return map
  }, [projectedEvents])

  // Synchronize zoom state to parent for HUD display
  useEffect(() => {
    onZoomChange(viewState.zoom)
  }, [viewState.zoom, onZoomChange])

  // 1. Native non-passive Wheel Event Listener to completely prevent page scrolling & errors
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const zoomFactor = e.deltaY < 0 ? 1.18 : 0.85
      setViewState((prev) => {
        const newZoom = Math.max(0.75, Math.min(10.0, prev.zoom * zoomFactor))
        if (newZoom === prev.zoom) return prev

        const scale = newZoom / prev.zoom
        const newX = mouseX - (mouseX - prev.x) * scale
        const newY = mouseY - (mouseY - prev.y) * scale

        return {
          zoom: newZoom,
          x: newX,
          y: newY,
        }
      })
    }

    container.addEventListener('wheel', handleWheelNative, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheelNative)
    }
  }, [])

  // Handle smooth fly-to animations
  useEffect(() => {
    if (!flyToTarget || !containerRef.current) return

    const startX = viewStateRef.current.x
    const startY = viewStateRef.current.y
    const startZoom = viewStateRef.current.zoom

    const targetZoom = flyToTarget.zoom
    const rect = containerRef.current.getBoundingClientRect()

    const targetX = rect.width / 2 - (flyToTarget.x * (rect.width / MAP_WIDTH)) * targetZoom
    const targetY = rect.height / 2 - (flyToTarget.y * (rect.height / MAP_HEIGHT)) * targetZoom

    const duration = 650
    const startTime = performance.now()

    let animationFrameId: number

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(1, elapsed / duration)
      const ease = 1 - Math.pow(1 - progress, 3)

      setViewState({
        x: startX + (targetX - startX) * ease,
        y: startY + (targetY - startY) * ease,
        zoom: startZoom + (targetZoom - startZoom) * ease,
      })

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [flyToTarget])

  // Spatial clustering calculation based on current zoom level
  const clusters = useMemo(() => {
    const clusterDistanceThreshold = 36 / Math.max(1, viewState.zoom * 0.8)
    const result: ClusterNode[] = []
    const visited = new Set<string>()

    const getConfidenceRank = (c: UAPEvent['confidence']) => {
      if (c === 'High') return 4
      if (c === 'Medium') return 3
      if (c === 'Low') return 2
      return 1
    }

    for (let i = 0; i < projectedEvents.length; i++) {
      const current = projectedEvents[i]
      if (visited.has(current.event.id)) continue

      visited.add(current.event.id)
      const group: UAPEvent[] = [current.event]
      let sumX = current.x
      let sumY = current.y

      if (viewState.zoom < 3.8) {
        for (let j = i + 1; j < projectedEvents.length; j++) {
          const other = projectedEvents[j]
          if (visited.has(other.event.id)) continue

          const dx = current.x - other.x
          const dy = current.y - other.y
          const dist = Math.hypot(dx, dy)

          if (dist < clusterDistanceThreshold) {
            visited.add(other.event.id)
            group.push(other.event)
            sumX += other.x
            sumY += other.y
          }
        }
      }

      let highestConf = group[0].confidence
      for (const ev of group) {
        if (getConfidenceRank(ev.confidence) > getConfidenceRank(highestConf)) {
          highestConf = ev.confidence
        }
      }

      result.push({
        id: group.length === 1 ? group[0].id : `cluster-${group[0].id}-${group.length}`,
        x: sumX / group.length,
        y: sumY / group.length,
        events: group,
        isCluster: group.length > 1,
        highestConfidence: highestConf,
      })
    }

    return result
  }, [projectedEvents, viewState.zoom])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    setIsDragging(true)
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      viewX: viewState.x,
      viewY: viewState.y,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.mouseX
      const dy = e.clientY - dragStartRef.current.mouseY
      setViewState((prev) => ({
        ...prev,
        x: dragStartRef.current.viewX + dx,
        y: dragStartRef.current.viewY + dy,
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Double click to zoom in at point
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    setViewState((prev) => {
      const newZoom = Math.min(10.0, prev.zoom * 1.6)
      const scale = newZoom / prev.zoom
      return {
        zoom: newZoom,
        x: mouseX - (mouseX - prev.x) * scale,
        y: mouseY - (mouseY - prev.y) * scale,
      }
    })
  }

  // Node click handler
  const handleNodeClick = (node: ClusterNode, e: React.MouseEvent) => {
    e.stopPropagation()
    if (node.isCluster) {
      if (viewState.zoom < 3.2) {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          const nextZoom = Math.min(8, viewState.zoom * 1.9)
          setViewState({
            zoom: nextZoom,
            x: rect.width / 2 - (node.x * (rect.width / MAP_WIDTH)) * nextZoom,
            y: rect.height / 2 - (node.y * (rect.height / MAP_HEIGHT)) * nextZoom,
          })
        }
      }
      onSelectCluster(node.events)
    } else {
      onSelectEvent(node.events[0])
    }
  }

  // Country click handler (Fly to country)
  const handleCountryClick = (country: CountryGeometry, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isDragging) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const nextZoom = Math.max(2.4, Math.min(6, viewState.zoom * 1.5))
      setViewState({
        zoom: nextZoom,
        x: rect.width / 2 - (country.center.x * (rect.width / MAP_WIDTH)) * nextZoom,
        y: rect.height / 2 - (country.center.y * (rect.height / MAP_HEIGHT)) * nextZoom,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      className="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#050A0F]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(12, 28, 44, 0.45) 0%, rgba(5, 10, 15, 0.98) 100%)',
      }}
    >
      {/* Radar Sweep Animated Beam Layer */}
      {radarActive && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-25"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(48, 176, 208, 0.06) 50%, rgba(48, 176, 208, 0.25) 98%, #30B0D0 100%)',
            animation: 'radarSweep 6s linear infinite',
          }}
        />
      )}

      {/* Main SVG Vector Canvas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-full origin-top-left transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${viewState.x}px, ${viewState.y}px, 0) scale(${viewState.zoom})`,
          transformOrigin: '0 0',
        }}
      >
        <defs>
          {/* Heatmap Glow Filters */}
          <radialGradient id="heatGlowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#30B0D0" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#00D9A5" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#0A1E2F" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050A0F" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="heatGlowAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#30B0D0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050A0F" stopOpacity="0" />
          </radialGradient>

          <filter id="sonarPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Tactical Lat/Lon Grid Lines */}
        <g opacity="0.25" stroke="#30B0D0" strokeWidth="0.5" strokeDasharray="3 3">
          {TACTICAL_GRID_LINES.map((grid, idx) => {
            if (grid.x !== undefined) {
              return (
                <line
                  key={`v-${idx}`}
                  x1={grid.x}
                  y1={0}
                  x2={grid.x}
                  y2={MAP_HEIGHT}
                  strokeWidth={grid.major ? 0.8 : 0.4}
                  strokeOpacity={grid.major ? 0.6 : 0.25}
                />
              )
            }
            if (grid.y !== undefined) {
              return (
                <line
                  key={`h-${idx}`}
                  x1={0}
                  y1={grid.y}
                  x2={MAP_WIDTH}
                  y2={grid.y}
                  strokeWidth={grid.major ? 0.8 : 0.4}
                  strokeOpacity={grid.major ? 0.6 : 0.25}
                />
              )
            }
            return null
          })}
        </g>

        {/* Tactical Grid Axis Labels */}
        <g fontSize="7" fontFamily="JetBrains Mono, monospace" fill="#8A99A8" opacity="0.45">
          {TACTICAL_GRID_LINES.map((grid, idx) => {
            if (grid.y !== undefined) {
              return (
                <text key={`ly-${idx}`} x="8" y={grid.y - 3}>
                  {grid.label}
                </text>
              )
            }
            if (grid.x !== undefined && grid.major) {
              return (
                <text key={`lx-${idx}`} x={grid.x + 4} y="15">
                  {grid.label}
                </text>
              )
            }
            return null
          })}
        </g>

        {/* 2. Strategic Oceans & Maritime Watermark Labels */}
        <g opacity="0.2" fill="#8A99A8" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="bold">
          {STRATEGIC_OCEAN_LABELS.map((ocean) => (
            <text
              key={ocean.id}
              x={ocean.x}
              y={ocean.y}
              textAnchor="middle"
              letterSpacing={ocean.tracking}
            >
              {language === 'zh' ? ocean.labelZh : ocean.labelEn}
            </text>
          ))}
        </g>

        {/* 3. World Sovereign Countries (177 nations with polygons, hover high-tech glow & events counts) */}
        <g>
          {WORLD_COUNTRIES.map((country, index) => {
            const hasEvents =
              (countryEventCountMap.get(country.name) || 0) +
                (countryEventCountMap.get(country.nameZh) || 0) >
              0

            return (
              <path
                key={`country-${country.id}-${index}`}
                d={country.path}
                fill={hasEvents ? 'rgba(18, 34, 50, 0.85)' : 'rgba(12, 22, 32, 0.75)'}
                className="transition-all duration-200 cursor-pointer hover:fill-[rgba(48,176,208,0.3)] hover:stroke-[#30B0D0]"
                stroke="none"
                onClick={(e) => handleCountryClick(country, e)}
                onMouseEnter={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect()
                  if (rect) {
                    const count =
                      (countryEventCountMap.get(country.name) || 0) +
                      (countryEventCountMap.get(country.nameZh) || 0)
                    setHoveredCountry({
                      country,
                      eventCount: count,
                      screenX: e.clientX - rect.left,
                      screenY: e.clientY - rect.top,
                    })
                  }
                }}
                onMouseLeave={() => setHoveredCountry(null)}
              />
            )
          })}
        </g>

        {/* 4. Fine National Borders Mesh (Sharp Tactical Neon Lines) */}
        <path
          d={WORLD_BORDERS_PATH}
          fill="none"
          stroke="rgba(48, 176, 208, 0.35)"
          strokeWidth="0.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="pointer-events-none"
        />

        {/* 5. Continental Coastline Highlights (Glow Perimeter) */}
        <path
          d={WORLD_LAND_OUTLINE_PATH}
          fill="none"
          stroke="rgba(48, 176, 208, 0.6)"
          strokeWidth="0.8"
          className="pointer-events-none"
        />

        {/* 6. Major Tactical Country / Region Label Pins (Visible when zoomed in or key areas) */}
        <g
          fontFamily="Noto Sans SC, sans-serif"
          fontSize={viewState.zoom > 2.5 ? '6' : '5'}
          fill="#8A99A8"
          opacity={viewState.zoom > 1.8 ? 0.7 : 0.4}
          className="pointer-events-none select-none"
        >
          {WORLD_COUNTRIES.filter((c) => {
            const count =
              (countryEventCountMap.get(c.name) || 0) +
              (countryEventCountMap.get(c.nameZh) || 0)
            return count > 0 || ['United States of America', 'China', 'Brazil', 'Russia', 'Australia', 'Canada', 'India'].includes(c.name)
          }).map((c, index) => (
            <text key={`c-label-${c.id}-${index}`} x={c.center.x} y={c.center.y} textAnchor="middle">
              {language === 'zh' ? c.nameZh : c.name}
            </text>
          ))}
        </g>

        {/* 7. Heatmap Density Glow Circles (LayerMode === 'heatmap' or 'hybrid') */}
        {(layerMode === 'heatmap' || layerMode === 'hybrid') && (
          <g opacity={layerMode === 'heatmap' ? 0.95 : 0.7} style={{ mixBlendMode: 'screen' }}>
            {projectedEvents.map(({ event, x, y }) => {
              const isHigh = event.confidence === 'High'
              const radius = isHigh ? 38 : 28
              return (
                <circle
                  key={`heat-${event.id}`}
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={isHigh ? 'url(#heatGlowAmber)' : 'url(#heatGlowCyan)'}
                  opacity="0.8"
                />
              )
            })}
          </g>
        )}

        {/* 8. Active Corridor Overlay Vector Bounds */}
        {activeCorridorEventIds && activeCorridorEventIds.length > 0 && (
          <g>
            {projectedEvents
              .filter(({ event }) => activeCorridorEventIds.includes(event.id))
              .map(({ event, x, y }) => (
                <circle
                  key={`corridor-glow-${event.id}`}
                  cx={x}
                  cy={y}
                  r="24"
                  fill="none"
                  stroke="#30B0D0"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  opacity="0.8"
                  className="animate-pulse"
                />
              ))}
          </g>
        )}

        {/* 9. Incident Nodes / Clusters / Beacons (LayerMode === 'tactical' or 'hybrid') */}
        {(layerMode === 'tactical' || layerMode === 'hybrid') && (
          <g>
            {clusters.map((node) => {
              const color = confidenceColors[node.highestConfidence]
              const isSelected =
                !node.isCluster && node.events[0].id === selectedEventId
              const isCorridorActive =
                activeCorridorEventIds &&
                node.events.some((e) => activeCorridorEventIds.includes(e.id))

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={(e) => handleNodeClick(node, e)}
                  onMouseEnter={(e) => {
                    const rect = containerRef.current?.getBoundingClientRect()
                    if (rect) {
                      setHoveredNode({
                        node,
                        screenX: e.clientX - rect.left,
                        screenY: e.clientY - rect.top,
                      })
                    }
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Sonar Ring */}
                  <circle
                    r={node.isCluster ? 14 : isSelected ? 12 : isCorridorActive ? 10 : 8}
                    fill={isCorridorActive ? '#30B0D0' : color}
                    fillOpacity={isSelected ? 0.35 : isCorridorActive ? 0.25 : 0.15}
                    stroke={isCorridorActive ? '#30B0D0' : color}
                    strokeWidth={isSelected || isCorridorActive ? 1.5 : 0.8}
                    strokeOpacity={0.9}
                    className="transition-all group-hover:scale-125"
                  />

                  {/* Sonar Beacon expanding ripple */}
                  <circle
                    r={node.isCluster ? 20 : 14}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                    className="animate-ping"
                    style={{ animationDuration: '2.5s' }}
                  />

                  {/* Inner Solid Pin Core */}
                  <circle
                    r={node.isCluster ? 9 : isSelected ? 5.5 : 3.5}
                    fill={color}
                    stroke="#050A0F"
                    strokeWidth="1"
                    filter="url(#sonarPulseGlow)"
                  />

                  {/* Cluster Counter Label */}
                  {node.isCluster && (
                    <text
                      y="3.2"
                      textAnchor="middle"
                      fill="#050A0F"
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                    >
                      {node.events.length}
                    </text>
                  )}

                  {/* Crosshair Bracket for Selected Event */}
                  {isSelected && (
                    <g stroke="#EDE8E4" strokeWidth="1" opacity="0.9">
                      <path d="M -16 -6 L -16 -16 L -6 -16" fill="none" />
                      <path d="M 6 -16 L 16 -16 L 16 -6" fill="none" />
                      <path d="M 16 6 L 16 16 L 6 16" fill="none" />
                      <path d="M -6 16 L -16 16 L -16 6" fill="none" />
                    </g>
                  )}
                </g>
              )
            })}
          </g>
        )}
      </svg>

      {/* Floating Tactical HUD Tooltip on Hover (Node or Country) */}
      {hoveredNode && (
        <div
          className="pointer-events-none absolute z-40 p-3 rounded-lg border shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: Math.min(window.innerWidth - 300, hoveredNode.screenX + 16),
            top: Math.max(20, hoveredNode.screenY - 30),
            background: 'rgba(7, 13, 19, 0.95)',
            borderColor: confidenceColors[hoveredNode.node.highestConfidence],
            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.7), 0 0 16px ${confidenceColors[hoveredNode.node.highestConfidence]}40`,
            maxWidth: 280,
          }}
        >
          {hoveredNode.node.isCluster ? (
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono-data font-bold text-[#30B0D0]">
                  {hoveredNode.node.events.length} INCIDENTS CLUSTER
                </span>
                <span className="text-[10px] font-mono-data text-[#8A99A8]">
                  Click to inspect
                </span>
              </div>
              <p className="text-xs text-[#EDE8E4] font-medium truncate">
                {hoveredNode.node.events.map((e) => e.name).slice(0, 2).join(' / ')}
                {hoveredNode.node.events.length > 2 && ' ...'}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono-data font-bold uppercase"
                  style={{
                    background: `${confidenceColors[hoveredNode.node.events[0].confidence]}20`,
                    color: confidenceColors[hoveredNode.node.events[0].confidence],
                    border: `1px solid ${confidenceColors[hoveredNode.node.events[0].confidence]}50`,
                  }}
                >
                  {getConfidenceLabel(hoveredNode.node.events[0].confidence)}
                </span>
                <span className="text-[10px] font-mono-data text-[#8A99A8]">
                  {hoveredNode.node.events[0].date}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#EDE8E4] mb-1 leading-tight">
                {language === 'en' && hoveredNode.node.events[0].nameEn
                  ? hoveredNode.node.events[0].nameEn
                  : hoveredNode.node.events[0].name}
              </h4>
              <p className="text-[11px] text-[#8A99A8] truncate">
                {language === 'en' && hoveredNode.node.events[0].locationEn
                  ? hoveredNode.node.events[0].locationEn
                  : hoveredNode.node.events[0].location}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Floating Country HUD Tooltip when hovering over a Country territory */}
      {!hoveredNode && hoveredCountry && (
        <div
          className="pointer-events-none absolute z-30 px-3 py-2 rounded-lg border shadow-xl backdrop-blur-xl animate-in fade-in duration-100"
          style={{
            left: Math.min(window.innerWidth - 220, hoveredCountry.screenX + 14),
            top: Math.max(20, hoveredCountry.screenY - 25),
            background: 'rgba(7, 13, 19, 0.92)',
            borderColor: 'rgba(48, 176, 208, 0.4)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30B0D0]" />
            <span className="text-xs font-bold text-[#EDE8E4]">
              {language === 'zh' ? hoveredCountry.country.nameZh : hoveredCountry.country.name}
            </span>
          </div>
          {hoveredCountry.eventCount > 0 ? (
            <div className="text-[11px] text-[#30B0D0] font-mono-data mt-0.5">
              {hoveredCountry.eventCount} {language === 'zh' ? '起 UAP 解密事件' : 'UAP incidents'}
            </div>
          ) : (
            <div className="text-[10px] text-[#8A99A8] font-mono-data mt-0.5">
              {language === 'zh' ? '点击可聚焦此国' : 'Click to focus'}
            </div>
          )}
        </div>
      )}

      {/* Map Legend (Bottom Right HUD Overlay) */}
      <div
        className="hidden md:flex items-center gap-4 px-3.5 py-2 rounded-xl border backdrop-blur-md absolute bottom-6 right-88 z-10 text-[11px] font-mono-data"
        style={{
          background: 'rgba(7, 13, 19, 0.85)',
          borderColor: 'rgba(138, 153, 168, 0.2)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00D9A5] shadow-[0_0_8px_#00D9A5]" />
          <span className="text-[#8A99A8]">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] shadow-[0_0_8px_#F5A623]" />
          <span className="text-[#8A99A8]">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_#FF6B35]" />
          <span className="text-[#8A99A8]">Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B8B8B8]" />
          <span className="text-[#8A99A8]">Speculative</span>
        </div>
      </div>
    </div>
  )
}
