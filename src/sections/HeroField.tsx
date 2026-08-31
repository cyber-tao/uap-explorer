import { useI18n } from '../i18n'

export default function HeroField() {
  const { t } = useI18n()
  const textShadow = '0 2px 24px rgba(0,0,0,0.45)'

  const wordmarkText = t('hero.wordmarkText')
  const eyebrow = t('hero.eyebrow')
  const titleLine1 = t('hero.titleLine1')
  const titleLine2 = t('hero.titleLine2')
  const descriptionLine1 = t('hero.descriptionLine1')
  const descriptionLine2 = t('hero.descriptionLine2')
  const ctaText = t('hero.ctaText')

  return (
    <section
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="flex-1 relative grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center px-6 md:px-[6vw] py-24 md:py-0 gap-8 md:gap-[6vw]">
        <div className="flex items-center justify-center text-center">
          <h2
            className="font-serif-display"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 112px)',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '0.15em',
              textShadow,
              margin: 0,
            }}
          >
            {wordmarkText}
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-[460px] mx-auto md:mx-0 md:pl-8">
          {eyebrow && (
            <p
              className="font-sans-body text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase mb-4 md:mb-7"
              style={{
                color: 'rgba(255,255,255,0.75)',
                textShadow,
              }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className="font-serif-display leading-tight mb-4 md:mb-6"
            style={{
              fontSize: 'clamp(28px, 2.8vw, 52px)',
              fontWeight: 300,
              color: '#ffffff',
              wordBreak: 'keep-all',
              textShadow,
            }}
          >
            {titleLine1}
            {titleLine2 && (
              <>
                <br />
                {titleLine2}
              </>
            )}
          </h1>

          {(descriptionLine1 || descriptionLine2) && (
            <p
              className="font-sans-body text-xs sm:text-sm leading-relaxed md:leading-[1.9] mb-6 md:mb-10 font-light"
              style={{
                color: 'rgba(255,255,255,0.75)',
                textShadow,
              }}
            >
              {descriptionLine1}
              {descriptionLine2 && (
                <>
                  <br />
                  {descriptionLine2}
                </>
              )}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {ctaText && (
              <button
                className="font-sans-body px-7 py-3 rounded-full text-xs md:text-sm tracking-[0.15em] transition-all duration-300 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById('observables')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  color: '#ffffff',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                }}
              >
                {ctaText}
              </button>
            )}

            <a
              href="/hotspots"
              className="font-sans-body px-6 py-3 rounded-full text-xs md:text-sm tracking-[0.12em] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              style={{
                background: 'rgba(48, 176, 208, 0.15)',
                border: '1px solid rgba(48, 176, 208, 0.5)',
                color: '#30B0D0',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(48, 176, 208, 0.3)'
                e.currentTarget.style.borderColor = 'rgba(48, 176, 208, 0.9)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(48, 176, 208, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(48, 176, 208, 0.5)'
              }}
            >
              <span>{t('nav.hotspots')}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

