import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Calendar, MapPin, AlertTriangle, Link2, Share2 } from 'lucide-react'
import { getEventById, confidenceColors, confidenceLabels, physicalCharLabels } from '../data/events'
import { events } from '../data/events'

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = id ? getEventById(id) : undefined

  if (!event) {
    return (
      <div className="pt-32 min-h-[100dvh] text-center" style={{ background: '#050A0F' }}>
        <p className="text-lg mb-4" style={{ color: '#EDE8E4' }}>未找到该事件</p>
        <button
          onClick={() => navigate('/timeline')}
          className="px-4 py-2 rounded-md text-sm font-medium"
          style={{ background: '#30B0D0', color: '#050A0F' }}
        >
          ← 返回时间线
        </button>
      </div>
    )
  }

  const confColor = confidenceColors[event.confidence]
  const confLabel = confidenceLabels[event.confidence]
  const related = event.relatedEvents
    ?.map((rid) => events.find((e) => e.id === rid))
    .filter(Boolean) || []

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#30B0D0]"
          style={{ color: '#8A99A8' }}
        >
          <ArrowLeft className="w-4 h-4" />
          ← 返回
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left content */}
          <div className="lg:col-span-3">
            {/* Hero image placeholder */}
            <div
              className="rounded-xl overflow-hidden mb-8 relative"
              style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif-display text-6xl opacity-10" style={{ color: '#30B0D0' }}>
                  {event.name[0]}
                </span>
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,10,15,0.8), transparent)' }} />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2.5 py-1 rounded text-[11px] font-bold"
                    style={{ background: `${confColor}20`, color: confColor, border: `1px solid ${confColor}40`, boxShadow: `0 0 12px ${confColor}20` }}
                  >
                    {confLabel}
                  </span>
                </div>
                <h1 className="font-serif-display text-2xl md:text-3xl font-bold" style={{ color: '#EDE8E4' }}>
                  {event.name}
                </h1>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm" style={{ color: '#8A99A8' }}>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {event.country} · {event.location}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-serif-display text-xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
                事件详情
              </h2>
              <p className="leading-relaxed" style={{ color: '#8A99A8' }}>
                {event.description}
              </p>
            </div>

            {/* Physical characteristics */}
            <div className="mb-8">
              <h2 className="font-serif-display text-xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
                物理特征
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.physicalCharacteristics.map((char) => (
                  <span
                    key={char}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm"
                    style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.2)' }}
                  >
                    {physicalCharLabels[char]?.label || char}
                  </span>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div className="mb-8">
              <h2 className="font-serif-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#EDE8E4' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#F5A623' }} />
                关键限制与质疑
              </h2>
              <ul className="space-y-2">
                {event.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#8A99A8' }}>
                    <span style={{ color: '#F5A623' }}>•</span>
                    {lim}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sources */}
            <div className="mb-8">
              <h2 className="font-serif-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#EDE8E4' }}>
                <Link2 className="w-5 h-5" style={{ color: '#30B0D0' }} />
                官方来源与链接
              </h2>
              <div className="flex flex-wrap gap-3">
                {event.sources.map((source) => (
                  <a
                    key={source.label}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors hover:bg-[rgba(48,176,208,0.2)]"
                    style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.2)' }}
                  >
                    {source.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Related events */}
            {related.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif-display text-xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
                  相关事件
                </h2>
                <div className="flex gap-4 overflow-x-auto uap-scrollbar pb-2">
                  {related.map((rel) => rel && (
                    <Link
                      key={rel.id}
                      to={`/event/${rel.id}`}
                      className="uap-card shrink-0 w-64 p-4"
                    >
                      <span className="font-mono-data text-xs" style={{ color: '#8A99A8' }}>{rel.date}</span>
                      <h4 className="font-serif-display font-bold mt-1 mb-2" style={{ color: '#EDE8E4' }}>{rel.name}</h4>
                      <p className="text-xs line-clamp-2" style={{ color: '#8A99A8' }}>{rel.shortDesc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Metadata card */}
              <div className="uap-card p-6">
                <h3 className="font-serif-display text-lg font-bold mb-4" style={{ color: '#EDE8E4' }}>
                  事件元数据
                </h3>
                <div className="space-y-4">
                  {[
                    { label: '日期', value: event.date },
                    { label: '地点', value: `${event.country} · ${event.location}` },
                    { label: '置信度', value: confLabel, color: confColor },
                    { label: '传感器', value: event.sensors?.join(', ') || '目视目击' },
                    { label: '状态', value: '未解释' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider" style={{ color: '#8A99A8' }}>{item.label}</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: (item as any).color || '#EDE8E4' }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="uap-card p-6">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
                  style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.2)' }}
                >
                  <Share2 className="w-4 h-4" />
                  复制链接
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
