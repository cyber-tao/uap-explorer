import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, MapPin, AlertTriangle, Link2, Share2, Film, ImageIcon, Clock, Sparkles, FileText, ChevronRight } from 'lucide-react'
import { getEventById, confidenceColors, confidenceLabels, physicalCharLabels } from '../data/events'
import { events } from '../data/events'
import { assetUrl } from '../lib/utils'
import SourceList from '../components/SourceList'

/**
 * 将长文本描述拆分为多个段落 + 关键节点
 */
function FormattedDescription({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n/).filter(Boolean)

  if (paragraphs.length === 1) {
    const sentences = text.split(/(?<=[。！？])\s*/).filter(Boolean)
    const chunks: string[][] = []
    let current: string[] = []
    sentences.forEach((s, i) => {
      current.push(s)
      if (current.length >= 4 || i === sentences.length - 1) {
        chunks.push([...current])
        current = []
      }
    })

    return (
      <div className="space-y-6">
        {chunks.map((chunk, idx) => (
          <div key={idx} className={idx === 0 ? 'relative pl-4 border-l-2' : ''} style={idx === 0 ? { borderColor: 'rgba(48, 176, 208, 0.4)' } : {}}>
            {idx === 0 && (
              <div className="absolute -left-[2px] top-0 w-[2px] h-full rounded-full" style={{ background: 'linear-gradient(to bottom, rgba(48, 176, 208, 0.5), transparent)' }} />
            )}
            <p className="leading-[1.8] text-[15px]" style={{ color: '#8A99A8' }}>
              {chunk.join('')}
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {paragraphs.map((para, idx) => {
        const isFirst = idx === 0
        const isHighlight = para.length < 80 || (para.includes('年') && para.includes('月'))

        if (isHighlight && !isFirst) {
          return (
            <div key={idx} className="flex items-start gap-3 py-3 px-4 rounded-lg" style={{ background: 'rgba(48, 176, 208, 0.04)', border: '1px solid rgba(48, 176, 208, 0.1)' }}>
              <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#30B0D0' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#EDE8E4' }}>{para}</p>
            </div>
          )
        }

        return (
          <div key={idx} className={isFirst ? 'relative pl-4' : ''} style={isFirst ? { borderLeft: '2px solid rgba(48, 176, 208, 0.3)' } : {}}>
            <p className="leading-[1.8] text-[15px]" style={{ color: isFirst ? '#B0C0D0' : '#8A99A8' }}>{para}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = id ? getEventById(id) : undefined

  if (!event) {
    return (
      <div className="pt-32 min-h-[100dvh] text-center" style={{ background: '#050A0F' }}>
        <p className="text-lg mb-4" style={{ color: '#EDE8E4' }}>未找到该事件</p>
        <button onClick={() => navigate('/timeline')} className="px-4 py-2 rounded-md text-sm font-medium" style={{ background: '#30B0D0', color: '#050A0F' }}>
          ← 返回时间线
        </button>
      </div>
    )
  }

  const confColor = confidenceColors[event.confidence]
  const confLabel = confidenceLabels[event.confidence]
  const related = event.relatedEvents?.map((rid) => events.find((e) => e.id === rid)).filter(Boolean) || []

  // Google Maps 搜索链接
  const mapsQuery = encodeURIComponent(`${event.location}, ${event.country}`)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`

  // 快速导航项
  const navItems = [
    { label: '事件详情', icon: FileText, id: 'section-description' },
    { label: '物理特征', icon: Sparkles, id: 'section-characteristics' },
    { label: '关键限制', icon: AlertTriangle, id: 'section-limitations' },
    ...(event.media && event.media.length > 0 ? [{ label: '相关媒体', icon: Film, id: 'section-media' }] : []),
    { label: '来源链接', icon: Link2, id: 'section-sources' },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#30B0D0]" style={{ color: '#8A99A8' }}>
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left content */}
          <div className="lg:col-span-3">
            {/* Hero image */}
            <div className="rounded-xl overflow-hidden mb-8 relative" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}>
              <img src={assetUrl(event.image)} alt={event.name} className="absolute inset-0 w-full h-full object-cover" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <span className="font-serif-display text-6xl opacity-10" style={{ color: '#30B0D0' }}>{event.name[0]}</span>
              </div>
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(5,10,15,0.8), transparent)' }} />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold" style={{ background: `${confColor}20`, color: confColor, border: `1px solid ${confColor}40`, boxShadow: `0 0 12px ${confColor}20` }}>{confLabel}</span>
                </div>
                <h1 className="font-serif-display text-2xl md:text-3xl font-bold" style={{ color: '#EDE8E4' }}>{event.name}</h1>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-[rgba(48,176,208,0.1)]" style={{ background: 'rgba(48, 176, 208, 0.06)', border: '1px solid rgba(48, 176, 208, 0.12)', color: '#8A99A8' }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: '#30B0D0' }} />
                {event.country} · {event.location}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>

            {/* Description */}
            <div className="mb-10" id="section-description">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>事件详情</h2>
              </div>
              <div className="rounded-xl p-6" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <FormattedDescription text={event.description} />
              </div>
            </div>

            {/* Physical characteristics */}
            <div className="mb-10" id="section-characteristics">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>物理特征</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.physicalCharacteristics.map((char) => (
                  <Link key={char} to={`/timeline?characteristic=${char}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all duration-300 hover:bg-[rgba(48,176,208,0.15)] hover:scale-[1.02]" style={{ background: 'rgba(48, 176, 208, 0.08)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.15)' }}>
                    {physicalCharLabels[char]?.label || char}
                  </Link>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div className="mb-10" id="section-limitations">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" style={{ color: '#F5A623' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>关键限制与质疑</h2>
              </div>
              <div className="space-y-3">
                {event.limitations.map((lim, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(245, 166, 35, 0.03)', border: '1px solid rgba(245, 166, 35, 0.08)' }}>
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'rgba(245, 166, 35, 0.15)', color: '#F5A623' }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#8A99A8' }}>{lim}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Gallery */}
            {event.media && event.media.length > 0 && (
              <div className="mb-10" id="section-media">
                <div className="flex items-center gap-2 mb-4">
                  <Film className="w-4 h-4" style={{ color: '#30B0D0' }} />
                  <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>相关媒体</h2>
                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0' }}>{event.media.length}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.media.map((m, idx) => (
                    m.type === 'image' ? (
                      <a key={idx} href={m.url} target="_blank" rel="noopener noreferrer" className="group relative rounded-lg overflow-hidden" style={{ aspectRatio: '16/10', background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}>
                        <img src={m.url} alt={m.caption} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(5,10,15,0.85), transparent 60%)' }} />
                        <div className="absolute bottom-2 left-2 right-2 z-20"><p className="text-xs line-clamp-2" style={{ color: '#8A99A8' }}>{m.caption}</p></div>
                        <div className="absolute top-2 right-2 z-20"><ImageIcon className="w-4 h-4" style={{ color: '#30B0D0' }} /></div>
                      </a>
                    ) : (
                      <a key={idx} href={m.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-lg overflow-hidden p-4 transition-all duration-300 hover:bg-[rgba(48,176,208,0.08)]" style={{ background: 'rgba(48, 176, 208, 0.04)', border: '1px solid rgba(48, 176, 208, 0.15)', aspectRatio: '16/10' }}>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(48, 176, 208, 0.1)' }}>
                            <Film className="w-6 h-6" style={{ color: '#30B0D0' }} />
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs line-clamp-2" style={{ color: '#8A99A8' }}>{m.caption}</p>
                          <p className="text-[10px] mt-1.5 font-mono-data flex items-center gap-1" style={{ color: '#30B0D0' }}><span>▶</span> 播放视频</p>
                        </div>
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            <div className="mb-10" id="section-sources">
              <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-4 h-4" style={{ color: '#30B0D0' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>来源与链接</h2>
              </div>
              <SourceList sources={event.sources} />
            </div>

            {/* Related events */}
            {related.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
                  <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>相关事件</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {related.map((rel) => rel && (
                    <Link key={rel.id} to={`/event/${rel.id}`} className="group flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #0F1923, #0A1117)' }}>
                        <img src={assetUrl(rel.image)} alt={rel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono-data text-[10px]" style={{ color: '#8A99A8' }}>{rel.date}</span>
                        <h4 className="font-serif-display font-bold text-sm mt-0.5 truncate" style={{ color: '#EDE8E4' }}>{rel.name}</h4>
                        <p className="text-xs line-clamp-1 mt-1" style={{ color: 'rgba(138, 153, 168, 0.7)' }}>{rel.shortDesc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: '#30B0D0' }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              {/* Metadata card */}
              <div className="rounded-xl p-6" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <h3 className="font-serif-display text-base font-bold mb-4" style={{ color: '#EDE8E4' }}>事件概览</h3>
                <div className="space-y-3">
                  {[
                    { label: '日期', value: event.date, color: '#30B0D0' },
                    { label: '地点', value: `${event.country} · ${event.location}`, color: '#30B0D0' },
                    { label: '置信度', value: confLabel, color: confColor },
                    { label: '传感器', value: event.sensors?.join(', ') || '目视目击', color: '#00D9A5' },
                  ].map((item, idx, arr) => (
                    <div key={idx} className="flex items-center justify-between py-2" style={{ borderBottom: idx < arr.length - 1 ? '1px solid rgba(138, 153, 168, 0.06)' : 'none' }}>
                      <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(138, 153, 168, 0.6)' }}>{item.label}</span>
                      <span className="text-sm font-medium" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick nav — 可点击锚点导航 */}
              <div className="rounded-xl p-5" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <h3 className="font-serif-display text-sm font-bold mb-3" style={{ color: '#EDE8E4' }}>快速导航</h3>
                <div className="space-y-1">
                  {navItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={idx}
                        onClick={() => scrollTo(item.id)}
                        className="w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-left transition-colors hover:bg-[rgba(48,176,208,0.08)] cursor-pointer"
                        style={{ color: '#8A99A8' }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: '#30B0D0' }} />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Share */}
              <div className="rounded-xl p-5" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href) }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-90" style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.2)' }}>
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
