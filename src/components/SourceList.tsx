import { ExternalLink, Link2, BookOpen, Sparkles, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SourceItem {
  label: string
  url: string
}

type SourceCategoryKey = 'official' | 'media' | 'academic' | 'other'

const OFFICIAL_KEYS = ['dod', 'pentagon', 'navy', 'defense', 'government', 'official', 'foia', 'declassified']
const MEDIA_KEYS = ['times', 'news', 'bbc', 'cbs', '60 minutes', 'cnn', 'washington post', 'guardian']
const ACADEMIC_KEYS = ['scientific', 'arxiv', 'nature', 'peer', 'journal', 'research', 'analysis', 'archive']
const ALL_KEYS = [...OFFICIAL_KEYS, ...MEDIA_KEYS, ...ACADEMIC_KEYS]

function categorizeSources(sources: SourceItem[]) {
  return {
    official: sources.filter((s) => OFFICIAL_KEYS.some((k) => s.label.toLowerCase().includes(k))),
    media: sources.filter((s) => MEDIA_KEYS.some((k) => s.label.toLowerCase().includes(k))),
    academic: sources.filter((s) => ACADEMIC_KEYS.some((k) => s.label.toLowerCase().includes(k))),
    other: sources.filter((s) => !ALL_KEYS.some((k) => s.label.toLowerCase().includes(k))),
  }
}

const categories: { key: SourceCategoryKey; label: string; icon: LucideIcon; color: string }[] = [
  { key: 'official', label: '官方来源', icon: FileText, color: '#00D9A5' },
  { key: 'media', label: '媒体报道', icon: BookOpen, color: '#30B0D0' },
  { key: 'academic', label: '学术档案', icon: Sparkles, color: '#F5A623' },
  { key: 'other', label: '其他资料', icon: Link2, color: '#8A99A8' },
]

interface SourceListProps {
  sources: SourceItem[]
}

export default function SourceList({ sources }: SourceListProps) {
  const sourceCategories = categorizeSources(sources)

  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const items = sourceCategories[cat.key]
        if (items.length === 0) return null
        const Icon = cat.icon
        return (
          <div key={cat.key}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: cat.color }}>{cat.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>{items.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((source) => (
                <a
                  key={source.label}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs transition-all duration-300 hover:translate-x-0.5"
                  style={{ background: 'rgba(10, 17, 23, 0.8)', color: '#8A99A8', border: '1px solid rgba(138, 153, 168, 0.1)' }}
                >
                  <span className="line-clamp-1 max-w-[200px]">{source.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
