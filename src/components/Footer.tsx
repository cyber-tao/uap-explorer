import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const externalLinks = [
  { text: 'GEIPAN', href: 'https://www.cnes-geipan.fr' },
  { text: 'AARO', href: 'https://www.aaro.mil' },
  { text: 'NASA UAP', href: 'https://science.nasa.gov/uap' },
  { text: 'PURSUE', href: 'https://www.war.gov/UFO' },
  { text: '巴西国家档案馆', href: 'https://www.arquivo.gov.br' },
  { text: '英国国家档案馆', href: 'https://www.nationalarchives.gov.uk' },
]

const navLinks = [
  { text: '首页', to: '/' },
  { text: '事件时间线', to: '/timeline' },
  { text: '分析洞察', to: '/analysis' },
  { text: '官方机构', to: '/agencies' },
]

const legalEntries = [
  '数据截至 2026-07-10',
  '置信度框架：High / Medium / Low / Speculative',
  '参考文献：300+独立信息源',
  '覆盖范围：全球22国/地区',
]

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: '#050A0F',
        borderTop: '1px solid rgba(138, 153, 168, 0.15)',
      }}
    >
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(48, 176, 208, 0.4), transparent)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-3xl mb-16">
          <p
            className="font-serif-display text-lg md:text-xl leading-relaxed"
            style={{ color: '#8A99A8', lineHeight: 1.75 }}
          >
            UAP是真实存在的物理现象，但截至2026年7月，全球没有任何国家公开独立验证过外星技术碎片。
            约2-5%的案例仍无法解释——这不是"是否真实"的问题，而是"是什么"的问题。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#8A99A8' }}
            >
              数据来源
            </h4>
            <ul className="space-y-3">
              {externalLinks.map((entry) => (
                <li key={entry.text}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#30B0D0]"
                    style={{ color: '#EDE8E4' }}
                  >
                    {entry.text}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#8A99A8' }}
            >
              导航
            </h4>
            <ul className="space-y-3">
              {navLinks.map((entry) => (
                <li key={entry.to}>
                  <Link
                    to={entry.to}
                    className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#30B0D0]"
                    style={{ color: '#EDE8E4' }}
                  >
                    {entry.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#8A99A8' }}
            >
              声明
            </h4>
            <ul className="space-y-3">
              {legalEntries.map((text) => (
                <li key={text}>
                  <span className="text-sm" style={{ color: '#8A99A8' }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
            © 2026 UAP Explorer · 数据截至 2026-07-10
          </p>
        </div>
      </div>
    </footer>
  )
}
