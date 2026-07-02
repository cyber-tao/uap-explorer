import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Award, TrendingUp, FileText, Globe } from 'lucide-react'
import { agencies, transparencyMilestones } from '../data/agencies'

const transparencyColorMap: Record<string, string> = {
  '高': '#00D9A5',
  '中': '#F5A623',
  '低': '#FF6B35',
  '极低': '#FF2E63',
}

const milestoneColorMap: Record<string, string> = {
  transparency: '#00D9A5',
  institution: '#30B0D0',
  report: '#F5A623',
}

export default function AgenciesPage() {
  const [tableScroll, setTableScroll] = useState(false)

  return (
    <div className="pt-16 min-h-[100dvh]" style={{ background: '#050A0F' }}>
      {/* Page header */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#8A99A8' }}>
          OFFICIAL AGENCIES / 官方调查机构
        </p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#EDE8E4' }}>
          全球UAP制度化响应对比
        </h1>
        <p className="max-w-2xl" style={{ color: '#8A99A8' }}>
          从法国GEIPAN的50年科学调查到美国AARO的大规模解密，各国官方机构的响应程度差异显著。
        </p>
      </section>

      {/* Comparison Table */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        <div className="overflow-x-auto uap-scrollbar rounded-xl" style={{ border: '1px solid rgba(138, 153, 168, 0.15)' }}>
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr style={{ background: '#0F1923' }}>
                {['国家/地区', '机构', '成立时间', '案例数量', '公开程度', '方法论', '未解释率', '官方链接'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase whitespace-nowrap" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency, idx) => {
                const transColor = transparencyColorMap[agency.transparency] || '#8A99A8'
                return (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-[#0F1923]"
                    style={{ background: idx % 2 === 0 ? '#0A1117' : '#050A0F' }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-semibold" style={{ color: '#EDE8E4' }}>{agency.country}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-medium" style={{ color: '#EDE8E4' }}>{agency.agency}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-mono-data text-sm" style={{ color: '#8A99A8' }}>
                      {agency.established}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#8A99A8' }}>
                      {agency.cases}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-0.5 rounded text-[11px] font-bold"
                        style={{ background: `${transColor}15`, color: transColor, border: `1px solid ${transColor}30` }}
                      >
                        {agency.transparency}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#8A99A8' }}>
                      {agency.methodology}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#8A99A8' }}>
                      {agency.unexplainedRate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {agency.link ? (
                        <a
                          href={agency.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm transition-colors hover:text-[#30B0D0]"
                          style={{ color: '#8A99A8' }}
                        >
                          {agency.linkLabel}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sm" style={{ color: '#8A99A8' }}>—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <h2 className="font-serif-display text-2xl font-bold mb-8" style={{ color: '#EDE8E4' }}>重点机构</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: '最成熟的制度',
              tagColor: '#00D9A5',
              title: 'GEIPAN — 全球黄金标准',
              stats: '50年运行 · 9,700+证词 · 3,240+公开案例',
              desc: '隶属于法国国家航天研究中心(CNES)，由科学家主导而非情报机构。A/B/C/D四级分类系统被全球参考。',
              link: 'https://www.cnes-geipan.fr',
              linkLabel: '访问GEIPAN官网 →',
            },
            {
              tag: '最大规模政府调查',
              tagColor: '#30B0D0',
              title: 'AARO — 美国国防部全域异常解决办公室',
              stats: '2022年成立 · 1,600+案例 · 21起真正异常',
              desc: '美国历史上最大规模政府UAP调查，但结论受争议。2024年年度报告承认21起事件无法解释。',
              link: 'https://www.aaro.mil',
              linkLabel: '访问AARO →',
            },
            {
              tag: '历史性透明度',
              tagColor: '#F5A623',
              title: 'PURSUE — 2026年解密项目',
              stats: '2026年5月 · 162份档案 · 含阿波罗任务',
              desc: '美国国防部通过PURSUE平台首次大规模解密UAP档案，标志着透明度的重大提升。',
              link: 'https://www.war.gov/UFO',
              linkLabel: '访问PURSUE →',
            },
          ].map((card, idx) => (
            <div key={idx} className="uap-card overflow-hidden">
              <div className="p-6">
                <span
                  className="inline-block px-2 py-1 rounded text-[11px] font-bold mb-4"
                  style={{ background: `${card.tagColor}15`, color: card.tagColor, border: `1px solid ${card.tagColor}30` }}
                >
                  {card.tag}
                </span>
                <h3 className="font-serif-display text-lg font-bold mb-2" style={{ color: '#EDE8E4' }}>
                  {card.title}
                </h3>
                <p className="font-mono-data text-xs mb-4" style={{ color: '#8A99A8' }}>
                  {card.stats}
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A99A8' }}>
                  {card.desc}
                </p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: '#30B0D0' }}
                >
                  {card.linkLabel}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency Timeline */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12">
        <h2 className="font-serif-display text-2xl font-bold mb-8" style={{ color: '#EDE8E4' }}>全球UAP透明度里程碑</h2>
        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-px"
            style={{ background: 'linear-gradient(to bottom, #30B0D0, rgba(48,176,208,0.2))' }}
          />
          {transparencyMilestones.map((m, idx) => {
            const isLeft = idx % 2 === 0
            const dotColor = milestoneColorMap[m.type] || '#30B0D0'
            return (
              <div
                key={idx}
                className={`relative flex items-center mb-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div
                  className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -ml-[5px] md:-ml-[6px] z-10"
                  style={{ background: dotColor, boxShadow: `0 0 12px ${dotColor}60` }}
                />
                <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="uap-card p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-data text-sm font-bold" style={{ color: dotColor }}>{m.year}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: `${dotColor}15`, color: dotColor, border: `1px solid ${dotColor}30` }}
                      >
                        {m.type === 'transparency' ? '透明度' : m.type === 'institution' ? '制度化' : '报告'}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#EDE8E4' }}>{m.event}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Methodology Comparison */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 pb-24">
        <h2 className="font-serif-display text-2xl font-bold mb-8" style={{ color: '#EDE8E4' }}>方法论对比</h2>
        <div className="overflow-x-auto uap-scrollbar">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ background: '#0F1923' }}>
                {['维度', 'GEIPAN', 'AARO', 'NASA'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase" style={{ color: '#8A99A8', borderBottom: '1px solid rgba(138,153,168,0.1)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['隶属机构', 'CNES (航天)', 'DoD (国防)', '独立研究小组'],
                ['主导者', '科学家', '情报/军事', '科学家'],
                ['数据公开', '3,240+案例完全公开', '年度报告摘要', '方法论报告'],
                ['分类系统', 'A/B/C/D四级', '未公开分类', '不适用'],
                ['核心优势', '透明度、长期数据', '多传感器分析', '科学方法论'],
                ['核心争议', 'D类误判率', '分析偏见、遗漏', '无案例审查'],
                ['对ETH态度', '中性（D类≠外星）', '否定（未发现证据）', '开放（需更多数据）'],
              ].map((row, idx) => (
                <tr
                  key={idx}
                  style={{ background: idx % 2 === 0 ? '#0A1117' : '#050A0F' }}
                >
                  {row.map((cell, cidx) => (
                    <td
                      key={cidx}
                      className="px-4 py-3 text-sm"
                      style={{ color: cidx === 0 ? '#EDE8E4' : '#8A99A8', fontWeight: cidx === 0 ? 600 : 400 }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
