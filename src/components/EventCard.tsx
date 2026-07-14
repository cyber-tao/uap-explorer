import { confidenceColors, confidenceLabels, physicalCharLabels } from '../data/events'
import type { UAPEvent } from '../data/events'
import { assetUrl } from '../lib/utils'
import { characteristicIconMap } from './characteristicIcons'

interface EventCardProps {
  event: UAPEvent
  onSelect: (id: string) => void
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  const confColor = confidenceColors[event.confidence]
  const confLabel = confidenceLabels[event.confidence]

  return (
    <div
      className="uap-card cursor-pointer group overflow-hidden"
      onClick={() => onSelect(event.id)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={assetUrl(event.image)}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center -z-10"
          style={{ background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}
        >
          <span className="font-serif-display text-2xl opacity-20" style={{ color: '#30B0D0' }}>
            {event.name[0]}
          </span>
        </div>
        <div
          className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold rounded z-10"
          style={{
            background: `${confColor}20`,
            color: confColor,
            border: `1px solid ${confColor}40`,
            boxShadow: `0 0 12px ${confColor}20`,
          }}
        >
          {confLabel}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 z-10" style={{ background: 'linear-gradient(transparent, rgba(5,10,15,0.8))' }} />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono-data text-xs" style={{ color: '#8A99A8' }}>{event.date}</span>
          <span className="text-xs" style={{ color: '#8A99A8' }}>·</span>
          <span className="text-sm font-semibold" style={{ color: '#EDE8E4' }}>
            {event.country} · {event.location}
          </span>
        </div>
        <h3 className="font-serif-display text-lg font-bold mb-2" style={{ color: '#EDE8E4' }}>
          {event.name}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#8A99A8' }}>
          {event.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {event.physicalCharacteristics.slice(0, 3).map((char) => (
            <span
              key={char}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
              style={{ background: 'rgba(48,176,208,0.1)', color: '#30B0D0', border: '1px solid rgba(48,176,208,0.2)' }}
            >
              {characteristicIconMap[char]}
              {physicalCharLabels[char]?.label || char}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: '#30B0D0' }}>
            查看详情 →
          </span>
          <span className="text-xs font-mono-data" style={{ color: '#8A99A8' }}>
            {event.sensors?.join(' / ') || '目视目击'}
          </span>
        </div>
      </div>
    </div>
  )
}
