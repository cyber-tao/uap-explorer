import type { CSSProperties, MouseEvent } from 'react'
import { footerConfig } from '../config'

export default function Footer() {
  if (!footerConfig.visionText && !footerConfig.brandName && footerConfig.columns.length === 0) {
    return null;
  }

  return (
    <footer
      id="footer"
      style={{
        position: 'relative',
        width: '100%',
        background: '#050A0F',
        zIndex: 4,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '20vh 8vw 8vh',
        }}
      >
        {footerConfig.visionText && (
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
              {footerConfig.visionText}
            </p>
          </div>
        )}

        {footerConfig.columns.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '48px',
              paddingBottom: '60px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {footerConfig.columns.map((col) => (
              <div key={col.heading}>
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
                  {col.heading}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {col.entries.map((entry, idx) => {
                    const linkStyle: CSSProperties = {
                      color: '#EDE8E4',
                      opacity: 0.6,
                      fontSize: '15px',
                      textDecoration: 'none',
                      lineHeight: 1.8,
                      transition: 'opacity 0.4s',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }
                    const hoverIn = (e: MouseEvent<HTMLElement>) => {
                      e.currentTarget.style.opacity = '1'
                    }
                    const hoverOut = (e: MouseEvent<HTMLElement>) => {
                      e.currentTarget.style.opacity = '0.6'
                    }

                    if (entry.scrollTargetId) {
                      return (
                        <button
                          key={idx}
                          type="button"
                          style={linkStyle}
                          onMouseEnter={hoverIn}
                          onMouseLeave={hoverOut}
                          onClick={() => {
                            document
                              .getElementById(entry.scrollTargetId!)
                              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                        >
                          {entry.text}
                        </button>
                      )
                    }

                    if (entry.href) {
                      const external = /^https?:\/\//.test(entry.href)
                      return (
                        <a
                          key={idx}
                          href={entry.href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          style={linkStyle}
                          onMouseEnter={hoverIn}
                          onMouseLeave={hoverOut}
                        >
                          {entry.text}
                        </a>
                      )
                    }

                    return (
                      <span
                        key={idx}
                        style={{
                          color: '#EDE8E4',
                          opacity: 0.6,
                          fontSize: '15px',
                          lineHeight: 1.8,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {entry.text}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '32px',
          }}
        >
          {footerConfig.brandName && (
            <p
              className="font-serif-display"
              style={{
                fontSize: '16px',
                letterSpacing: '0.15em',
                color: 'rgba(237,232,228,0.5)',
              }}
            >
              {footerConfig.brandName}
            </p>
          )}
          {footerConfig.copyright && (
            <p
              className="font-sans-body"
              style={{
                fontSize: '12px',
                color: 'rgba(237,232,228,0.25)',
              }}
            >
              {footerConfig.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
