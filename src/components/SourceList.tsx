import { ExternalLink, Link2, BookOpen, Sparkles, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useI18n } from '../i18n'

export interface SourceItem {
  label: string
  url: string
}

type SourceCategoryKey = 'official' | 'media' | 'academic' | 'other'

const OFFICIAL_PATTERNS = [
  /\.gov(\/|$|\.)/i,
  /\.mil(\/|$|\.)/i,
  /cnes-geipan\.fr|dvidshub\.net|blackvault\.com/i,
  /\b(dod|pentagon|navy|defense|government|official|foia|declassified|centcom|indopacom|fbi|aaro|geipan|cnes|usaf|air force|faa|ntsb|pursue)\b/i,
  /(?:国防|军方|政府|档案|解密|官方|国家航天|空军|海军)/,
]

const ACADEMIC_PATTERNS = [
  /\.edu(\/|$|\.)/i,
  /\.ac\.uk(\/|$|\.)/i,
  /arxiv\.org|nature\.com|science\.org|springer\.com|wiley\.com|researchgate\.net|sciencedirect\.com|agu\.org|ieee\.org/i,
  /\b(scientific|arxiv|nature|peer|journal|research|analysis|cufos|nicap|mufon|academic|university)\b/i,
  /(?:学术|论文|期刊|研究|科学|分析报告|调查报告)/,
]

const MEDIA_PATTERNS = [
  /nytimes\.com|bbc\.(?:com|co\.uk)|cnn\.com|cbsnews\.com|washingtonpost\.com|theguardian\.com|reuters\.com|apnews\.com|usatoday\.com|nbcnews\.com|forbes\.com|time\.com|thehill\.com|politico\.com|thepaper\.cn|xinhuanet\.com/i,
  /\b(times|news|bbc|cbs|60 minutes|cnn|washington post|guardian|reuters|associated press|nbc|abc|forbes|press|media|newspaper|broadcasting)\b/i,
  /(?:新闻|时报|卫报|路透社|新华社|央视|澎湃|报道|通讯社)/,
]

function matchesAny(item: SourceItem, patterns: RegExp[]): boolean {
  const target = `${item.label} ${item.url}`
  return patterns.some((p) => p.test(target))
}

function categorizeSources(sources: SourceItem[]) {
  const result: Record<SourceCategoryKey, SourceItem[]> = {
    official: [],
    academic: [],
    media: [],
    other: [],
  }

  for (const item of sources) {
    if (matchesAny(item, OFFICIAL_PATTERNS)) {
      result.official.push(item)
    } else if (matchesAny(item, ACADEMIC_PATTERNS)) {
      result.academic.push(item)
    } else if (matchesAny(item, MEDIA_PATTERNS)) {
      result.media.push(item)
    } else {
      result.other.push(item)
    }
  }

  return result
}

interface SourceListProps {
  sources: SourceItem[]
}

export default function SourceList({ sources }: SourceListProps) {
  const { t } = useI18n()
  const sourceCategories = categorizeSources(sources)

  const categories: { key: SourceCategoryKey; label: string; icon: LucideIcon; color: string }[] = [
    { key: 'official', label: t('sourceCategories.official'), icon: FileText, color: '#00D9A5' },
    { key: 'media', label: t('sourceCategories.media'), icon: BookOpen, color: '#30B0D0' },
    { key: 'academic', label: t('sourceCategories.academic'), icon: Sparkles, color: '#F5A623' },
    { key: 'other', label: t('sourceCategories.other'), icon: Link2, color: '#8A99A8' },
  ]

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

