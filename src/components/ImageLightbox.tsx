import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { assetUrl } from '../lib/utils'
import type { EventFigure } from '../data/events'

interface ImageLightboxProps {
  figures: EventFigure[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ImageLightbox({ figures, index, onClose, onNavigate }: ImageLightboxProps) {
  const figure = figures[index]
  const hasPrev = index > 0
  const hasNext = index < figures.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1)
  }, [hasPrev, index, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1)
  }, [hasNext, index, onNavigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, goPrev, goNext])

  if (!figure) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: 'rgba(5, 10, 15, 0.94)' }}
      role="dialog"
      aria-modal="true"
      aria-label="影像查看"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
        <span className="font-mono-data text-xs" style={{ color: '#8A99A8' }}>
          {index + 1} / {figures.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-md transition-colors hover:bg-[rgba(48,176,208,0.1)]"
          style={{ color: '#EDE8E4' }}
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 md:px-16 relative min-h-0" onClick={(e) => e.stopPropagation()}>
        {hasPrev && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 md:left-4 z-10 p-2 rounded-full transition-colors hover:bg-[rgba(48,176,208,0.15)]"
            style={{ color: '#30B0D0', background: 'rgba(10, 17, 23, 0.7)' }}
            aria-label="上一张"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <img
          src={assetUrl(figure.src)}
          alt={figure.caption}
          className="max-w-full max-h-[min(72vh,720px)] object-contain rounded-lg"
        />
        {hasNext && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 md:right-4 z-10 p-2 rounded-full transition-colors hover:bg-[rgba(48,176,208,0.15)]"
            style={{ color: '#30B0D0', background: 'rgba(10, 17, 23, 0.7)' }}
            aria-label="下一张"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="px-6 py-4 shrink-0 max-w-3xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm leading-relaxed" style={{ color: '#EDE8E4' }}>{figure.caption}</p>
        {(figure.credit || figure.sourceUrl) && (
          <p className="text-xs mt-2 flex items-center gap-2 flex-wrap" style={{ color: '#8A99A8' }}>
            {figure.credit && <span>{figure.credit}</span>}
            {figure.sourceUrl && (
              <a
                href={figure.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#30B0D0]"
              >
                原始出处 <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
