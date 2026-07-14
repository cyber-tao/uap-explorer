import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { observables, observablesSection } from '../data/analysis'

gsap.registerPlugin(ScrollTrigger)

const ACCENT = '#30B0D0'

/**
 * Physical-characteristics section.
 *
 * Pins to the viewport and steps through the five observable UAP
 * characteristics from analysis.ts (single content source).
 */
export default function ObservablesCarousel() {
  const { eyebrow, title } = observablesSection
  const features = observables
  const sectionRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const n = features.length
    if (!section || n === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${n * 100}%`,
        pin: true,
        scrub: reduce ? false : 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (fillRef.current) {
            fillRef.current.style.transform = `scaleY(${self.progress})`
          }
          const idx = Math.min(n - 1, Math.floor(self.progress * n + 0.00001))
          setActive((prev) => (prev === idx ? prev : idx))
        },
      })
    }, section)

    return () => ctx.revert()
  }, [features.length])

  if (features.length === 0) return null
  const total = String(features.length).padStart(2, '0')

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="absolute inset-0 flex flex-col justify-center px-[7vw] py-[10vh]">
        <div className="mb-6 md:mb-10 shrink-0">
          <p
            className="font-sans-body text-[11px] md:text-[13px] tracking-[0.28em] uppercase mb-3"
            style={{ color: 'rgba(255,255,255,0.55)', textShadow: '0 2px 20px rgba(0,0,0,0.55)' }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-serif-display font-light leading-tight"
            style={{ fontSize: 'clamp(24px,3vw,44px)', color: '#fff', textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            {title}
          </h2>
        </div>

        <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[1.05fr_0.75fr] gap-10 items-center">
          <div className="relative min-h-[300px] md:h-[60vh]">
            {features.map((f, i) => {
              const isActive = i === active
              const offset = isActive ? '0px' : i < active ? '-28px' : '28px'
              return (
                <div
                  key={f.id}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${offset})`,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono-data text-sm" style={{ color: ACCENT }}>{f.index}</span>
                    <span className="h-px w-[52px]" style={{ background: 'rgba(48,176,208,0.4)' }} />
                    <span className="font-mono-data text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>/ {total}</span>
                  </div>
                  <h3
                    className="font-serif-display font-normal mb-2"
                    style={{ fontSize: 'clamp(30px,4.2vw,58px)', color: '#fff', lineHeight: 1.05, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
                  >
                    {f.cn}
                  </h3>
                  <p className="font-sans-body text-xs md:text-sm tracking-[0.14em] uppercase mb-6" style={{ color: ACCENT }}>
                    {f.titleEn}
                  </p>
                  <p
                    className="font-sans-body max-w-[48ch]"
                    style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: 1.9, color: 'rgba(255,255,255,0.78)', textShadow: '0 2px 18px rgba(0,0,0,0.5)' }}
                  >
                    {f.homeDescription}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="relative hidden md:flex items-center h-[60vh]">
            <div className="relative h-full w-px shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <div
                ref={fillRef}
                className="absolute top-0 left-0 w-full origin-top"
                style={{ height: '100%', background: ACCENT, transform: 'scaleY(0)', boxShadow: `0 0 12px ${ACCENT}` }}
              />
              {features.map((f, i) => (
                <span
                  key={f.id}
                  className="absolute -left-[5px] w-2.5 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    top: `${(i / (features.length - 1)) * 100}%`,
                    transform: 'translateY(-50%)',
                    background: i <= active ? ACCENT : 'rgba(255,255,255,0.22)',
                    boxShadow: i <= active ? `0 0 10px ${ACCENT}` : 'none',
                  }}
                />
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center pl-8">
              <div className="relative w-full" style={{ height: 'clamp(120px,15vw,210px)' }}>
                {features.map((f, i) => (
                  <span
                    key={f.id}
                    className="absolute inset-0 flex items-center justify-center font-serif-display transition-all duration-700 ease-out"
                    style={{
                      fontSize: 'clamp(120px,15vw,210px)',
                      fontWeight: 300,
                      lineHeight: 1,
                      color: 'transparent',
                      WebkitTextStroke: `1.5px rgba(48,176,208,${i === active ? 0.85 : 0})`,
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? 'scale(1)' : 'scale(0.88)',
                    }}
                  >
                    {f.index}
                  </span>
                ))}
              </div>
              <div className="relative w-full mt-4" style={{ height: '70px' }}>
                {features.map((f, i) => (
                  <div
                    key={f.id}
                    className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700"
                    style={{ opacity: i === active ? 1 : 0 }}
                  >
                    <span className="font-mono-data" style={{ fontSize: 'clamp(22px,2.6vw,36px)', color: '#fff', textShadow: `0 0 22px ${ACCENT}90` }}>
                      {f.metric}
                    </span>
                    <span className="font-sans-body text-[11px] tracking-[0.22em] uppercase mt-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {f.metricLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:hidden gap-2 mt-8 justify-center shrink-0">
          {features.map((f, i) => (
            <span
              key={f.id}
              className="h-1 rounded-full transition-all duration-500"
              style={{ width: i === active ? '26px' : '8px', background: i <= active ? ACCENT : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
