import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { footerConfig } from '../config'
import { theme } from '../lib/theme'
import { useI18n } from '../i18n'

export type FooterVariant = 'home' | 'default'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ExternalSourceList({ links }: { links: { text: string; href: string }[] }) {
  return (
    <ul className="space-y-3">
      {links.map((entry) => (
        <li key={entry.text}>
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors hover:opacity-100"
            style={{ color: theme.ivory, opacity: 0.85 }}
          >
            {entry.text}
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Footer({ variant = 'default' }: { variant?: FooterVariant }) {
  const { t, dict } = useI18n()
  const sourceLinks = [...footerConfig.sources, ...footerConfig.archiveLinks]

  const homeNav = [
    { text: dict.footer.homeNav.home, scrollTargetId: 'hero-section' },
    { text: dict.footer.homeNav.observables, scrollTargetId: 'observables' },
    { text: dict.footer.homeNav.gallery, scrollTargetId: 'gallery' },
    { text: dict.footer.homeNav.agencies, scrollTargetId: 'agencies-preview' },
  ]

  const pageNav = [
    { text: dict.footer.pageNav.home, to: '/' },
    { text: dict.footer.pageNav.timeline, to: '/timeline' },
    { text: dict.footer.pageNav.analysis, to: '/analysis' },
    { text: dict.footer.pageNav.agencies, to: '/agencies' },
  ]

  const legalItems = dict.footer.legal

  if (variant === 'home') {
    return (
      <footer
        id="footer"
        style={{
          position: 'relative',
          width: '100%',
          background: theme.base,
          zIndex: 4,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, padding: '20vh 8vw 8vh' }}>
          <div style={{ maxWidth: '720px', marginBottom: '120px' }}>
            <p
              className="font-serif-display"
              style={{
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: 2.2,
                color: 'rgba(237,232,228,0.75)',
                letterSpacing: '0.02em',
              }}
            >
              {t('footer.visionText')}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '48px',
              paddingBottom: '60px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  color: 'rgba(237,232,228,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {t('footer.sourcesTitle')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {footerConfig.sources.map((entry) => (
                  <a
                    key={entry.text}
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.ivory,
                      opacity: 0.6,
                      fontSize: '15px',
                      textDecoration: 'none',
                      lineHeight: 1.8,
                    }}
                  >
                    {entry.text}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  color: 'rgba(237,232,228,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {t('footer.navTitle')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {homeNav.map((entry) => (
                  <button
                    key={entry.scrollTargetId}
                    type="button"
                    onClick={() => scrollToSection(entry.scrollTargetId)}
                    style={{
                      color: theme.ivory,
                      opacity: 0.6,
                      fontSize: '15px',
                      lineHeight: 1.8,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    {entry.text}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  color: 'rgba(237,232,228,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {t('footer.legalTitle')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {legalItems.map((text) => (
                  <span
                    key={text}
                    style={{
                      color: theme.ivory,
                      opacity: 0.6,
                      fontSize: '15px',
                      lineHeight: 1.8,
                    }}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '32px',
            }}
          >
            <p
              className="font-serif-display"
              style={{
                fontSize: '16px',
                letterSpacing: '0.15em',
                color: 'rgba(237,232,228,0.5)',
              }}
            >
              {t('footer.brandName')}
            </p>
            <p
              className="font-sans-body"
              style={{
                fontSize: '12px',
                color: 'rgba(237,232,228,0.25)',
              }}
            >
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className="relative"
      style={{
        background: theme.base,
        borderTop: `1px solid ${theme.muted}26`,
      }}
    >
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.cyan}66, transparent)`,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-3xl mb-16">
          <p
            className="font-serif-display text-lg md:text-xl leading-relaxed"
            style={{ color: theme.muted, lineHeight: 1.75 }}
          >
            {t('footer.visionText')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: theme.muted }}
            >
              {t('footer.sourcesTitle')}
            </h4>
            <ExternalSourceList links={sourceLinks} />
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: theme.muted }}
            >
              {t('footer.navTitle')}
            </h4>
            <ul className="space-y-3">
              {pageNav.map((entry) => (
                <li key={entry.to}>
                  <Link
                    to={entry.to}
                    className="inline-flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: theme.ivory }}
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
              style={{ color: theme.muted }}
            >
              {t('footer.legalTitle')}
            </h4>
            <ul className="space-y-3">
              {legalItems.map((text) => (
                <li key={text}>
                  <span className="text-sm" style={{ color: theme.muted }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${theme.muted}1a` }}
        >
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-bold" style={{ color: theme.ivory }}>
              {t('footer.brandName')}
            </span>
            <span className="text-xs" style={{ color: theme.muted }}>
              · {t('footer.brandTagline')}
            </span>
          </div>
          <p className="text-xs" style={{ color: theme.muted }}>
            {t('footer.copyright')} · {legalItems[0]}
          </p>
        </div>
      </div>
    </footer>
  )
}

