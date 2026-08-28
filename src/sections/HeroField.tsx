import { heroConfig } from '../config';

export default function HeroField() {
  const textShadow = '0 2px 24px rgba(0,0,0,0.45)';

  if (!heroConfig.wordmarkText && !heroConfig.titleLine1) {
    return null;
  }

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
            {heroConfig.wordmarkText}
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-[460px] mx-auto md:mx-0 md:pl-8">
          {heroConfig.eyebrow && (
            <p
              className="font-sans-body text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase mb-4 md:mb-7"
              style={{
                color: 'rgba(255,255,255,0.75)',
                textShadow,
              }}
            >
              {heroConfig.eyebrow}
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
            {heroConfig.titleLine1}
            {heroConfig.titleLine2 && (
              <>
                <br />
                {heroConfig.titleLine2}
              </>
            )}
          </h1>

          {(heroConfig.descriptionLine1 || heroConfig.descriptionLine2) && (
            <p
              className="font-sans-body text-xs sm:text-sm leading-relaxed md:leading-[1.9] mb-6 md:mb-10 font-light"
              style={{
                color: 'rgba(255,255,255,0.75)',
                textShadow,
              }}
            >
              {heroConfig.descriptionLine1}
              {heroConfig.descriptionLine2 && (
                <>
                  <br />
                  {heroConfig.descriptionLine2}
                </>
              )}
            </p>
          )}

          {heroConfig.ctaText && (
            <button
              className="font-sans-body px-8 py-3.5 rounded-full text-xs md:text-sm tracking-[0.15em] transition-all duration-300 cursor-pointer"
              onClick={() => {
                if (heroConfig.ctaTargetId) {
                  document
                    .getElementById(heroConfig.ctaTargetId)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.5)',
                color: '#ffffff',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
            >
              {heroConfig.ctaText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
