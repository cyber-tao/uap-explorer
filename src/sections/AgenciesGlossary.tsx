import { useEffect, useRef, useCallback, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { agenciesPreviewConfig } from '../config'
import { agencies } from '../data/agencies'
import { useI18n } from '../i18n'

interface AgencyPreviewItem {
  cn: string
  en: string
  description: string
}

function toPreviewItem(agencyName: string, countryEn: string, description: string): AgencyPreviewItem {
  const cn = agencyName.replace(/（.*?）/g, '').split(/[\s/]/)[0] || agencyName
  return {
    cn,
    en: `${countryEn}`.toUpperCase(),
    description,
  }
}

function GooeyTextRow({ item, filterId, onHover, onLeaveHover }: { item: AgencyPreviewItem; filterId: string; onHover: () => void; onLeaveHover: () => void }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<SVGTextElement>(null)
  const text2Ref = useRef<SVGTextElement>(null)
  const textsGroupRef = useRef<SVGGElement>(null)
  const feBlurRef = useRef<SVGFEGaussianBlurElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const primitiveValues = useRef({ stdDeviation: 0 })
  const isHovered = useRef(false)

  const buildTimeline = useCallback(() => {
    if (!text1Ref.current || !text2Ref.current || !textsGroupRef.current || !feBlurRef.current) return

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (textsGroupRef.current) textsGroupRef.current.style.filter = 'none'
      },
      onReverseComplete: () => {
        if (textsGroupRef.current) textsGroupRef.current.style.filter = 'none'
      },
      onUpdate: () => {
        if (feBlurRef.current) {
          feBlurRef.current.setAttribute('stdDeviation', String(primitiveValues.current.stdDeviation))
        }
      },
    })

    // stdDeviation 0 -> 1.5
    tl.to(primitiveValues.current, {
      duration: 0.5,
      ease: 'none',
      stdDeviation: 1.5,
      startAt: { stdDeviation: 0 },
    }, 0)

    // stdDeviation 1.5 -> 0
    tl.to(primitiveValues.current, {
      duration: 0.5,
      ease: 'none',
      stdDeviation: 0,
    })

    // text_1 opacity fade out
    tl.to(text1Ref.current, {
      duration: 1,
      ease: 'none',
      opacity: 0,
    }, 0)

    // text_2 opacity fade in
    tl.to(text2Ref.current, {
      duration: 1,
      ease: 'none',
      opacity: 1,
    }, 0)

    // text_1 slide right
    tl.to(text1Ref.current, {
      duration: 1,
      ease: 'Power2.easeInOut',
      x: 8,
    }, 0)

    // text_2 slide from left
    tl.to(text2Ref.current, {
      duration: 1,
      ease: 'Power2.easeInOut',
      startAt: { x: -8 },
      x: 0,
    }, 0)

    tlRef.current = tl
  }, [])

  useEffect(() => {
    // Set initial state
    if (text2Ref.current) {
      gsap.set(text2Ref.current, { opacity: 0 })
    }
    buildTimeline()

    return () => {
      if (tlRef.current) tlRef.current.kill()
    }
  }, [buildTimeline])

  const onEnter = () => {
    isHovered.current = true
    if (textsGroupRef.current) {
      textsGroupRef.current.style.filter = `url(#${filterId})`
    }
    if (tlRef.current) tlRef.current.play()
    onHover()
  }

  const onLeave = () => {
    isHovered.current = false
    if (textsGroupRef.current) {
      textsGroupRef.current.style.filter = `url(#${filterId})`
    }
    if (tlRef.current) tlRef.current.reverse()
    onLeaveHover()
  }

  return (
    <div
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 0',
        transition: 'border-color 0.4s',
      }}
    >
      <svg
        viewBox="0 0 400 50"
        style={{ width: '100%', maxWidth: '500px', height: '50px', overflow: 'visible' }}
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              ref={feBlurRef}
              in="SourceGraphic"
              stdDeviation="0"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 16 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <g ref={textsGroupRef}>
          <text
            ref={text1Ref}
            x="0"
            y="35"
            fill="#EDE8E4"
            fontFamily="'Noto Serif SC', Georgia, serif"
            fontSize="32"
            fontWeight="300"
            letterSpacing="0.08em"
          >
            {item.cn}
          </text>
          <text
            ref={text2Ref}
            x="0"
            y="35"
            fill="#30B0D0"
            fontFamily="'Noto Sans SC', Helvetica, sans-serif"
            fontSize="28"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            {item.en}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default function AgenciesGlossary() {
  const { language, t } = useI18n()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const previewItems = useMemo(() => {
    return agenciesPreviewConfig.previewAgencyMatchers
      .map((matcher) => {
        const agency = agencies.find((a) => a.agency.includes(matcher))
        if (!agency) return null
        const name = language === 'en' && agency.agencyEn ? agency.agencyEn : agency.agency
        const desc = language === 'en' && agency.descriptionEn ? agency.descriptionEn : agency.description
        return toPreviewItem(name, agency.countryEn, desc)
      })
      .filter((item): item is AgencyPreviewItem => Boolean(item))
  }, [language])

  const activeItem =
    hoveredIndex !== null
      ? previewItems[hoveredIndex]
      : previewItems[selectedIndex] || previewItems[0] || null

  if (previewItems.length === 0) {
    return null
  }

  return (
    <section
      id="agencies-preview"
      className="relative w-full min-h-[70vh] bg-[#050A0F] z-[4] flex flex-col md:flex-row px-6 md:px-[8vw] py-16 md:py-[16vh] gap-8 md:gap-[8vw]"
    >
      {/* Left — titles */}
      <div className="w-full md:w-1/2">
        <p
          className="font-sans-body text-xs tracking-[0.3em] uppercase mb-8 md:mb-12"
          style={{ color: 'rgba(237,232,228,0.35)' }}
        >
          {t('agenciesPreview.sectionLabel')}
        </p>
        <div>
          {previewItems.map((item, idx) => (
            <div key={item.cn} onClick={() => setSelectedIndex(idx)}>
              <GooeyTextRow
                item={item}
                filterId={`goo-suliu-${idx}`}
                onHover={() => {
                  setHoveredIndex(idx)
                  setSelectedIndex(idx)
                }}
                onLeaveHover={() => setHoveredIndex(null)}
              />
            </div>
          ))}
          <div className="mt-8 md:mt-10">
            <Link
              to="/agencies"
              className="font-sans-body text-xs md:text-sm tracking-[0.12em] transition-colors hover:underline"
              style={{
                color: '#30B0D0',
                textDecoration: 'none',
              }}
            >
              {t('agenciesPreview.viewAll')}
            </Link>
          </div>
        </div>
      </div>

      {/* Right — description on hover / touch selection */}
      <div className="w-full md:w-1/2 flex items-center relative min-h-[160px] md:min-h-0 pt-4 md:pt-0">
        <div
          className="transition-all duration-400 max-w-[460px]"
          style={{
            opacity: activeItem ? 1 : 0,
            transform: activeItem ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          {activeItem && (
            <>
              <p
                className="font-sans-body text-xs tracking-[0.25em] uppercase mb-3 md:mb-4"
                style={{ color: '#30B0D0' }}
              >
                {activeItem.en}
              </p>
              <p
                className="font-sans-body text-lg md:text-[22px] leading-relaxed md:leading-[2] font-light"
                style={{
                  color: 'rgba(237,232,228,0.75)',
                }}
              >
                {activeItem.description}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

