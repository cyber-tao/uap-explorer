import { useNavigate } from 'react-router-dom'
import { events, confidenceColors, confidenceLabels, physicalCharLabels } from '../data/events'
import { featuredEventIds } from '../data/featured'
import { assetUrl } from '../lib/utils'

/**
 * 高置信度案例精选画廊 — 首页"Featured Events"
 * 使用真实事件数据，杂志风卡片布局，图片叠加文字，悬停动效
 */
export default function ImmersiveGallery() {
  const navigate = useNavigate()

  const featured = featuredEventIds
    .map((id) => events.find((e) => e.id === id))
    .filter((e): e is (typeof events)[number] => Boolean(e))

  return (
    <section className="relative z-10 py-24 md:py-32" style={{ background: 'transparent' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <p
            className="font-sans-body text-[10px] tracking-[0.25em] uppercase mb-4"
            style={{ color: 'rgba(138, 153, 168, 0.7)' }}
          >
            FEATURED EVENTS / 重点事件
          </p>
          <h2
            className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light"
            style={{ color: '#EDE8E4', letterSpacing: '0.05em', lineHeight: 1.2 }}
          >
            高置信度案例
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: '#8A99A8' }}>
            从 {events.length} 起全球事件中精选的 6 个标杆案例，每个均有多传感器验证、官方记录或大规模目击证据。
          </p>
        </div>

        {/* Grid — 杂志风卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((event, i) => {
            const confColor = confidenceColors[event.confidence]
            const confLabel = confidenceLabels[event.confidence]

            // 第一张和第四张跨高（杂志感），其余标准比例
            const isLarge = i === 0 || i === 3

            return (
              <div
                key={event.id}
                className={`
                  group relative cursor-pointer rounded-xl overflow-hidden
                  transition-all duration-500 ease-out
                  hover:-translate-y-1
                  ${isLarge ? 'md:row-span-2' : ''}
                `}
                style={{
                  background: '#0A1117',
                  border: '1px solid rgba(138, 153, 168, 0.08)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(48, 176, 208, 0.25)'
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(48, 176, 208, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(138, 153, 168, 0.08)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
                }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                {/* Image container */}
                <div className="relative overflow-hidden" style={{ aspectRatio: isLarge ? '3/4' : '16/10' }}>
                  <img
                    src={assetUrl(event.image)}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />

                  {/* Fallback gradient background */}
                  <div
                    className="absolute inset-0 -z-10"
                    style={{ background: 'linear-gradient(135deg, #0F1923, #0A1117)' }}
                  />

                  {/* Top badge — confidence */}
                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className="px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase"
                      style={{
                        background: `${confColor}18`,
                        color: confColor,
                        border: `1px solid ${confColor}30`,
                        boxShadow: `0 0 10px ${confColor}15`,
                      }}
                    >
                      {confLabel}
                    </span>
                  </div>

                  {/* Bottom gradient overlay */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-10"
                    style={{
                      height: isLarge ? '55%' : '70%',
                      background: 'linear-gradient(to top, rgba(5,10,15,0.92) 0%, rgba(5,10,15,0.4) 60%, transparent 100%)',
                    }}
                  />

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-data text-[10px]" style={{ color: '#8A99A8' }}>
                        {event.date}
                      </span>
                      <span style={{ color: 'rgba(138, 153, 168, 0.3)' }}>·</span>
                      <span className="text-[10px] font-medium" style={{ color: '#8A99A8' }}>
                        {event.country}
                      </span>
                    </div>

                    <h3
                      className="font-serif-display text-lg md:text-xl font-semibold leading-snug mb-2"
                      style={{ color: '#EDE8E4' }}
                    >
                      {event.name}
                    </h3>

                    <p
                      className="text-xs leading-relaxed line-clamp-2 mb-3"
                      style={{ color: 'rgba(138, 153, 168, 0.8)' }}
                    >
                      {event.shortDesc}
                    </p>

                    {/* Physical characteristic tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {event.physicalCharacteristics.slice(0, 3).map((char) => (
                        <span
                          key={char}
                          className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                          style={{
                            background: 'rgba(48, 176, 208, 0.08)',
                            color: 'rgba(48, 176, 208, 0.7)',
                            border: '1px solid rgba(48, 176, 208, 0.15)',
                          }}
                        >
                          {physicalCharLabels[char]?.label || char}
                        </span>
                      ))}
                    </div>

                    {/* Hover reveal arrow */}
                    <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[11px] font-medium" style={{ color: '#30B0D0' }}>
                        查看详情
                      </span>
                      <span className="text-[11px]" style={{ color: '#30B0D0' }}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View all link */}
        <div className="mt-12 md:mt-16 text-center">
          <button
            onClick={() => navigate('/timeline')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: 'rgba(48, 176, 208, 0.1)',
              color: '#30B0D0',
              border: '1px solid rgba(48, 176, 208, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(48, 176, 208, 0.18)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(48, 176, 208, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(48, 176, 208, 0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            浏览全部 {events.length} 个事件
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
