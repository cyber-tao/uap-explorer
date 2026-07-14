import { useState, useMemo } from 'react'
import { ImageIcon } from 'lucide-react'
import { assetUrl } from '../lib/utils'
import type { EventFigure } from '../data/events'
import ImageLightbox from './ImageLightbox'

function splitParagraphs(text: string): string[] {
  const byBreak = text.split(/\n\n/).map((p) => p.trim()).filter(Boolean)
  if (byBreak.length > 1) return byBreak

  const sentences = text.split(/(?<=[。！？])\s*/).filter(Boolean)
  const chunks: string[] = []
  let current: string[] = []
  sentences.forEach((s, i) => {
    current.push(s)
    if (current.length >= 4 || i === sentences.length - 1) {
      chunks.push(current.join(''))
      current = []
    }
  })
  return chunks.length > 0 ? chunks : [text]
}

function FigureCard({
  figure,
  onOpen,
}: {
  figure: EventFigure
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full text-left rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
      style={{ background: 'linear-gradient(135deg, #0A1117, #0F1923)' }}
    >
      <div className="relative w-full" style={{ aspectRatio: figure.layout === 'inset' ? '4/3' : '16/10' }}>
        <img
          src={assetUrl(figure.src)}
          alt={figure.caption}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,10,15,0.88), transparent 55%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#B0C0D0' }}>
            {figure.caption}
          </p>
          {figure.credit && (
            <p className="text-[10px] mt-1 font-mono-data" style={{ color: 'rgba(138, 153, 168, 0.7)' }}>
              {figure.credit}
            </p>
          )}
        </div>
        <div className="absolute top-2 right-2 z-20 opacity-60 group-hover:opacity-100 transition-opacity">
          <ImageIcon className="w-4 h-4" style={{ color: '#30B0D0' }} />
        </div>
      </div>
    </button>
  )
}

interface EventEditorialBodyProps {
  description: string
  figures: EventFigure[]
}

export default function EventEditorialBody({ description, figures }: EventEditorialBodyProps) {
  const paragraphs = useMemo(() => splitParagraphs(description), [description])
  const limited = useMemo(() => figures.slice(0, 6), [figures])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openAt = (globalIndex: number) => setLightboxIndex(globalIndex)

  // Auto composition: after para0 → full; mid → pair/inset; remainder → strip
  const plan = useMemo(() => {
    const figs = limited
    if (figs.length === 0) {
      return { bodySlots: [] as Array<{ afterPara: number; items: number[] }>, strip: [] as number[] }
    }

    const indices = figs.map((_, i) => i)
    const bodySlots: Array<{ afterPara: number; items: number[] }> = []
    let cursor = 0

    // First figure after first paragraph
    if (indices.length > 0 && paragraphs.length > 0) {
      bodySlots.push({ afterPara: 0, items: [indices[cursor++]] })
    }

    // Pair in the middle if we have room
    if (indices.length - cursor >= 2 && paragraphs.length >= 3) {
      const mid = Math.min(Math.floor(paragraphs.length / 2), paragraphs.length - 2)
      bodySlots.push({ afterPara: mid, items: [indices[cursor++], indices[cursor++]] })
    } else if (indices.length - cursor >= 1 && paragraphs.length >= 2) {
      const mid = Math.min(1, paragraphs.length - 1)
      // Avoid duplicate afterPara
      if (!bodySlots.some((s) => s.afterPara === mid)) {
        bodySlots.push({ afterPara: mid, items: [indices[cursor++]] })
      }
    }

    const used = new Set(bodySlots.flatMap((s) => s.items))
    const strip = indices.filter((i) => !used.has(i))

    return { bodySlots, strip }
  }, [limited, paragraphs.length])

  const slotMap = useMemo(() => {
    const map = new Map<number, number[]>()
    for (const slot of plan.bodySlots) {
      map.set(slot.afterPara, slot.items)
    }
    return map
  }, [plan.bodySlots])

  return (
    <div className="space-y-6">
      {paragraphs.map((para, idx) => {
        const isFirst = idx === 0
        const isHighlight = !isFirst && (para.length < 80 || (para.includes('年') && para.includes('月')))
        const slotIndices = slotMap.get(idx)

        return (
          <div key={idx} className="space-y-5">
            {isHighlight ? (
              <div
                className="flex items-start gap-3 py-3 px-4 rounded-lg"
                style={{ background: 'rgba(48, 176, 208, 0.04)', border: '1px solid rgba(48, 176, 208, 0.1)' }}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#EDE8E4' }}>{para}</p>
              </div>
            ) : (
              <div
                className={isFirst ? 'relative pl-4' : ''}
                style={isFirst ? { borderLeft: '2px solid rgba(48, 176, 208, 0.3)' } : undefined}
              >
                <p className="leading-[1.8] text-[15px]" style={{ color: isFirst ? '#B0C0D0' : '#8A99A8' }}>
                  {para}
                </p>
              </div>
            )}

            {slotIndices && slotIndices.length === 1 && (
              <FigureCard figure={limited[slotIndices[0]]} onOpen={() => openAt(slotIndices[0])} />
            )}
            {slotIndices && slotIndices.length === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slotIndices.map((fi) => (
                  <FigureCard key={fi} figure={limited[fi]} onOpen={() => openAt(fi)} />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Anchor always present for sidebar nav; strip shows leftover figures */}
      <div id="section-figures" className="pt-2">
        {plan.strip.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#30B0D0' }} />
              <h3 className="font-serif-display text-base font-bold" style={{ color: '#EDE8E4' }}>影像记录</h3>
              <span
                className="text-xs ml-1 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(48, 176, 208, 0.1)', color: '#30B0D0' }}
              >
                {limited.length}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {plan.strip.map((fi) => (
                <FigureCard key={fi} figure={limited[fi]} onOpen={() => openAt(fi)} />
              ))}
            </div>
          </>
        ) : limited.length > 0 ? (
          <p className="text-xs font-mono-data" style={{ color: 'rgba(138, 153, 168, 0.5)' }}>
            共 {limited.length} 张影像已穿插于正文
          </p>
        ) : null}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          figures={limited}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
