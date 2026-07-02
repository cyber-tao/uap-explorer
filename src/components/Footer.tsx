import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const footerLinks = [
  {
    heading: '数据来源',
    entries: [
      { text: 'GEIPAN', href: 'https://www.cnes-geipan.fr' },
      { text: 'AARO', href: 'https://www.aaro.mil' },
      { text: 'NASA UAP', href: 'https://science.nasa.gov/uap' },
      { text: 'PURSUE', href: 'https://www.war.gov/UFO' },
      { text: '巴西国家档案馆', href: 'https://www.arquivo.gov.br' },
      { text: '英国国家档案馆', href: 'https://www.nationalarchives.gov.uk' },
    ],
  },
  {
    heading: '导航',
    entries: [
      { text: '首页', href: '/#' },
      { text: '事件时间线', href: '/#/timeline' },
      { text: '分析洞察', href: '/#/analysis' },
      { text: '官方机构', href: '/#/agencies' },
    ],
  },
  {
    heading: '声明',
    entries: [
      { text: '数据截至 2026-07-02' },
      { text: '置信度框架：High / Medium / Low / Speculative' },
      { text: '参考文献：300+独立信息源' },
      { text: '覆盖范围：全球22国/地区' },
    ],
  },
]

export default function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <footer
      className="relative"
      style={{
        background: '#050A0F',
        borderTop: '1px solid rgba(138, 153, 168, 0.15)',
      }}
    >
      {/* Data stream decoration */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(48, 176, 208, 0.4), transparent)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Vision text */}
        <div className="max-w-3xl mb-16">
          <p
            className="font-serif-display text-lg md:text-xl leading-relaxed"
            style={{ color: '#8A99A8', lineHeight: 1.75 }}
          >
            UAP是真实存在的物理现象，但截至2026年7月，全球没有任何国家公开独立验证过外星技术碎片。
            约2-5%的案例仍无法解释——这不是"是否真实"的问题，而是"是什么"的问题。
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-xs font-bold tracking-widest uppercase mb-6"
                style={{ color: '#8A99A8' }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.entries.map((entry, i) => (
                  <li key={i}>
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target={entry.href.startsWith('http') ? '_blank' : undefined}
                        rel={entry.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#30B0D0]"
                        style={{ color: '#EDE8E4' }}
                      >
                        {entry.text}
                        {entry.href.startsWith('http') && (
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        )}
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: '#8A99A8' }}>
                        {entry.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(138, 153, 168, 0.1)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-bold" style={{ color: '#EDE8E4' }}>
              UAP Explorer
            </span>
            <span className="text-xs" style={{ color: '#8A99A8' }}>
              · 不明异常现象探索者
            </span>
          </div>
          <p className="text-xs" style={{ color: '#8A99A8' }}>
            © 2026 UAP Explorer · 数据截至 2026-07-02
          </p>
        </div>
      </div>
    </footer>
  )
}
