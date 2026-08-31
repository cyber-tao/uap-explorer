import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, MapPin, AlertTriangle, Link2, Share2, Film, Clock, Sparkles, FileText, ChevronRight, ImageIcon } from 'lucide-react'
import { getEventById, confidenceColors } from '../data/events'
import { assetUrl } from '../lib/utils'
import SourceList from '../components/SourceList'
import EventEditorialBody from '../components/EventEditorialBody'
import { useI18n } from '../i18n'

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { language, t, getConfidenceLabel, getCharLabel } = useI18n()
  const [copied, setCopied] = useState(false)
  const event = id ? getEventById(id) : undefined

  if (!event) {
    return (
      <div className="pt-32 min-h-[100dvh] text-center" style={{ background: '#050A0F' }}>
        <p className="text-lg mb-4" style={{ color: '#EDE8E4' }}>{t('eventDetail.notFound')}</p>
        <button onClick={() => navigate('/timeline')} className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer" style={{ background: '#30B0D0', color: '#050A0F' }}>
          {t('eventDetail.backToTimeline')}
        </button>
      </div>
    )
  }

  const confColor = confidenceColors[event.confidence]
  const confLabel = getConfidenceLabel(event.confidence)
  const displayName = language === 'en' && event.nameEn ? event.nameEn : event.name
  const displayCountry = language === 'en' && event.countryEn ? event.countryEn : event.country
  const displayLocation = language === 'en' && event.locationEn ? event.locationEn : event.location
  const displayDescription = language === 'en' && event.descriptionEn ? event.descriptionEn : event.description
  const displayLimitations = language === 'en' && event.limitationsEn && event.limitationsEn.length > 0 ? event.limitationsEn : event.limitations
  const displaySensors = language === 'en' && event.sensorsEn && event.sensorsEn.length > 0 ? event.sensorsEn : event.sensors
  const related = (event.relatedEvents || []).map(getEventById).filter(Boolean)
  const videos = event.media?.filter((m) => m.type === 'video') || []
  const mapsQuery = event.mapsQuery || `${event.locationEn || event.location}, ${event.countryEn || event.country}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`

  const navItems = [
    { label: t('eventDetail.description'), icon: FileText, id: 'section-description' },
    { label: t('eventDetail.figures'), icon: ImageIcon, id: 'section-figures' },
    { label: t('eventDetail.characteristics'), icon: Sparkles, id: 'section-characteristics' },
    { label: t('eventDetail.limitations'), icon: AlertTriangle, id: 'section-limitations' },
    ...(videos.length > 0 ? [{ label: t('eventDetail.videos'), icon: Film, id: 'section-videos' }] : []),
    { label: t('eventDetail.sources'), icon: Link2, id: 'section-sources' },
  ]

  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#30B0D0] cursor-pointer" style={{ color: '#8A99A8' }}>
          <ArrowLeft className="w-4 h-4" />
          {t('eventDetail.back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden mb-8 relative" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}>
              <img src={assetUrl(event.image)} alt={displayName} className="absolute inset-0 w-full h-full object-cover" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <span className="font-serif-display text-6xl opacity-10" style={{ color: '#30B0D0' }}>{displayName[0]}</span>
              </div>
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(5,10,15,0.8), transparent)' }} />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold" style={{ background: `${confColor}20`, color: confColor, border: `1px solid ${confColor}40`, boxShadow: `0 0 12px ${confColor}20` }}>{confLabel}</span>
                </div>
                <h1 className="font-serif-display text-2xl md:text-3xl font-bold" style={{ color: '#EDE8E4' }}>{displayName}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-[rgba(48,176,208,0.1)]" style={{ background: 'rgba(48, 176, 208, 0.06)', border: '1px solid rgba(48, 176, 208, 0.12)', color: '#8A99A8' }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: '#30B0D0' }} />
                {displayCountry} · {displayLocation}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm" style={{ background: 'rgba(48, 176, 208, 0.06)', border: '1px solid rgba(48, 176, 208, 0.12)', color: '#8A99A8' }}>
                <Clock className="w-3.5 h-3.5" style={{ color: '#30B0D0' }} />
                {event.date}
              </span>
            </div>

            <div className="mb-10" id="section-description">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>{t('eventDetail.description')}</h2>
              </div>
              <div className="rounded-xl p-6" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <EventEditorialBody description={displayDescription} figures={event.figures} />
              </div>
            </div>

            <div className="mb-10" id="section-characteristics">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>{t('eventDetail.characteristics')}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.physicalCharacteristics.map((char) => (
                  <Link key={char} to={`/timeline?characteristic=${char}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all duration-300 hover:bg-[rgba(48,176,208,0.15)] hover:scale-[1.02]" style={{ background: 'rgba(48, 176, 208, 0.08)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.15)' }}>
                    {getCharLabel(char)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-10" id="section-limitations">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" style={{ color: '#F5A623' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>{t('eventDetail.limitations')}</h2>
              </div>
              <div className="space-y-3">
                {displayLimitations.map((lim, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(245, 166, 35, 0.03)', border: '1px solid rgba(245, 166, 35, 0.08)' }}>
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'rgba(245, 166, 35, 0.15)', color: '#F5A623' }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#8A99A8' }}>{lim}</p>
                  </div>
                ))}
              </div>
            </div>

            {videos.length > 0 && (
              <div className="mb-10" id="section-videos">
                <div className="flex items-center gap-2 mb-4">
                  <Film className="w-4 h-4" style={{ color: '#30B0D0' }} />
                  <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>{t('eventDetail.videos')}</h2>
                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0' }}>{videos.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {videos.map((m, idx) => (
                    <a key={idx} href={m.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-lg overflow-hidden p-4 transition-all duration-300 hover:bg-[rgba(48,176,208,0.08)]" style={{ background: 'rgba(48, 176, 208, 0.04)', border: '1px solid rgba(48, 176, 208, 0.15)', minHeight: 140 }}>
                      <div className="flex-1 flex items-center justify-center py-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(48, 176, 208, 0.1)' }}>
                          <Film className="w-6 h-6" style={{ color: '#30B0D0' }} />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs line-clamp-2" style={{ color: '#8A99A8' }}>
                          {language === 'en' && m.captionEn ? m.captionEn : m.caption}
                        </p>
                        <p className="text-[10px] mt-1.5 font-mono-data flex items-center gap-1" style={{ color: '#30B0D0' }}><span>▶</span> {t('eventDetail.playVideo')}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10" id="section-sources">
              <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-4 h-4" style={{ color: '#30B0D0' }} />
                <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>{t('eventDetail.sources')}</h2>
              </div>
              <SourceList sources={(language === 'en' && event.sourcesEn && event.sourcesEn.length > 0) ? event.sourcesEn : event.sources} />
            </div>

            {related.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
                  <h2 className="font-serif-display text-lg font-bold" style={{ color: '#EDE8E4' }}>{t('eventDetail.relatedEvents')}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {related.map((rel) => {
                    if (!rel) return null
                    const relName = language === 'en' && rel.nameEn ? rel.nameEn : rel.name
                    const relShortDesc = language === 'en' && rel.shortDescEn ? rel.shortDescEn : rel.shortDesc
                    return (
                      <Link key={rel.id} to={`/event/${rel.id}`} className="group flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #0F1923, #0A1117)' }}>
                          <img src={assetUrl(rel.image)} alt={relName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-mono-data text-[10px]" style={{ color: '#8A99A8' }}>{rel.date}</span>
                          <h4 className="font-serif-display font-bold text-sm mt-0.5 truncate" style={{ color: '#EDE8E4' }}>{relName}</h4>
                          <p className="text-xs line-clamp-1 mt-1" style={{ color: 'rgba(138, 153, 168, 0.7)' }}>{relShortDesc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: '#30B0D0' }} />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-xl p-6" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <h3 className="font-serif-display text-base font-bold mb-4" style={{ color: '#EDE8E4' }}>{t('eventDetail.overview')}</h3>
                <div className="space-y-3">
                  {[
                    { label: t('eventDetail.date'), value: event.date, color: '#30B0D0' },
                    { label: t('eventDetail.location'), value: `${displayCountry} · ${displayLocation}`, color: '#30B0D0', href: mapsUrl },
                    { label: t('eventDetail.confidence'), value: confLabel, color: confColor },
                    { label: t('eventDetail.sensors'), value: displaySensors?.join(', ') || t('eventDetail.visualWitness'), color: '#00D9A5' },
                  ].map((item, idx, arr) => (
                    <div key={idx} className="flex items-center justify-between py-2" style={{ borderBottom: idx < arr.length - 1 ? '1px solid rgba(138, 153, 168, 0.06)' : 'none' }}>
                      <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(138, 153, 168, 0.6)' }}>{item.label}</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-right max-w-[60%] inline-flex items-center justify-end gap-1.5 transition-colors hover:underline hover:opacity-100"
                          style={{ color: item.color }}
                          title={t('eventDetail.viewOnMap')}
                        >
                          <span className="truncate">{item.value}</span>
                          <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-right max-w-[60%]" style={{ color: item.color }}>{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-5" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <h3 className="font-serif-display text-sm font-bold mb-3" style={{ color: '#EDE8E4' }}>{t('eventDetail.fastNav')}</h3>
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

              <div className="rounded-xl p-5" style={{ background: 'rgba(10, 17, 23, 0.6)', border: '1px solid rgba(138, 153, 168, 0.06)' }}>
                <button onClick={handleCopyLink} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-90 cursor-pointer" style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0', border: '1px solid rgba(48, 176, 208, 0.2)' }}>
                  <Share2 className="w-4 h-4" />
                  {copied ? t('eventDetail.copied') : t('eventDetail.copyLink')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

