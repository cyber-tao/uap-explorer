import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { agenciesPreviewConfig } from '../config';
import { agencies } from '../data/agencies';

interface AgencyPreviewItem {
  cn: string;
  en: string;
  description: string;
}

function toPreviewItem(agencyName: string, countryEn: string, description: string): AgencyPreviewItem {
  const cn = agencyName.replace(/（.*?）/g, '').split(/[\s/]/)[0] || agencyName;
  return {
    cn,
    en: `${countryEn}`.toUpperCase(),
    description,
  };
}

function GooeyTextRow({ item, filterId, onHover, onLeaveHover }: { item: AgencyPreviewItem; filterId: string; onHover: () => void; onLeaveHover: () => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<SVGTextElement>(null);
  const text2Ref = useRef<SVGTextElement>(null);
  const textsGroupRef = useRef<SVGGElement>(null);
  const feBlurRef = useRef<SVGFEGaussianBlurElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const primitiveValues = useRef({ stdDeviation: 0 });
  const isHovered = useRef(false);

  const buildTimeline = useCallback(() => {
    if (!text1Ref.current || !text2Ref.current || !textsGroupRef.current || !feBlurRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (textsGroupRef.current) textsGroupRef.current.style.filter = 'none';
      },
      onReverseComplete: () => {
        if (textsGroupRef.current) textsGroupRef.current.style.filter = 'none';
      },
      onUpdate: () => {
        if (feBlurRef.current) {
          feBlurRef.current.setAttribute('stdDeviation', String(primitiveValues.current.stdDeviation));
        }
      },
    });

    // stdDeviation 0 -> 1.5
    tl.to(primitiveValues.current, {
      duration: 0.5,
      ease: 'none',
      stdDeviation: 1.5,
      startAt: { stdDeviation: 0 },
    }, 0);

    // stdDeviation 1.5 -> 0
    tl.to(primitiveValues.current, {
      duration: 0.5,
      ease: 'none',
      stdDeviation: 0,
    });

    // text_1 opacity fade out
    tl.to(text1Ref.current, {
      duration: 1,
      ease: 'none',
      opacity: 0,
    }, 0);

    // text_2 opacity fade in
    tl.to(text2Ref.current, {
      duration: 1,
      ease: 'none',
      opacity: 1,
    }, 0);

    // text_1 slide right
    tl.to(text1Ref.current, {
      duration: 1,
      ease: 'Power2.easeInOut',
      x: 8,
    }, 0);

    // text_2 slide from left
    tl.to(text2Ref.current, {
      duration: 1,
      ease: 'Power2.easeInOut',
      startAt: { x: -8 },
      x: 0,
    }, 0);

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    // Set initial state
    if (text2Ref.current) {
      gsap.set(text2Ref.current, { opacity: 0 });
    }
    buildTimeline();

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [buildTimeline]);

  const onEnter = () => {
    isHovered.current = true;
    if (textsGroupRef.current) {
      textsGroupRef.current.style.filter = `url(#${filterId})`;
    }
    if (tlRef.current) tlRef.current.play();
    onHover();
  };

  const onLeave = () => {
    isHovered.current = false;
    if (textsGroupRef.current) {
      textsGroupRef.current.style.filter = `url(#${filterId})`;
    }
    if (tlRef.current) tlRef.current.reverse();
    onLeaveHover();
  };

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
  );
}

export default function AgenciesGlossary() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const previewItems = useMemo(() => {
    return agenciesPreviewConfig.previewAgencyMatchers
      .map((matcher) => {
        const agency = agencies.find((a) => a.agency.includes(matcher));
        if (!agency) return null;
        return toPreviewItem(agency.agency, agency.countryEn, agency.description);
      })
      .filter((item): item is AgencyPreviewItem => Boolean(item));
  }, []);
  const hovered = hoveredIndex !== null ? previewItems[hoveredIndex] : null;

  if (previewItems.length === 0) {
    return null;
  }

  return (
    <section
      id="agencies-preview"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#050A0F',
        zIndex: 4,
        display: 'flex',
        padding: '16vh 8vw',
        gap: '8vw',
      }}
    >
      {/* Left — titles */}
      <div style={{ flex: '0 0 50%' }}>
        <p
          className="font-sans-body"
          style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            color: 'rgba(237,232,228,0.35)',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          {agenciesPreviewConfig.sectionLabel}
        </p>
        <div>
          {previewItems.map((item, idx) => (
            <GooeyTextRow
              key={item.cn}
              item={item}
              filterId={`goo-suliu-${idx}`}
              onHover={() => setHoveredIndex(idx)}
              onLeaveHover={() => setHoveredIndex(null)}
            />
          ))}
          <div style={{ marginTop: '40px' }}>
            <Link
              to="/agencies"
              className="font-sans-body"
              style={{
                fontSize: '13px',
                letterSpacing: '0.12em',
                color: '#30B0D0',
                textDecoration: 'none',
              }}
            >
              查看全部官方机构 →
            </Link>
          </div>
        </div>
      </div>

      {/* Right — description on hover */}
      <div
        style={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            maxWidth: '420px',
          }}
        >
          {hovered && (
            <>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.25em',
                  color: '#30B0D0',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {hovered.en}
              </p>
              <p
                className="font-sans-body"
                style={{
                  fontSize: '22px',
                  lineHeight: 2,
                  color: 'rgba(237,232,228,0.65)',
                  fontWeight: 300,
                }}
              >
                {hovered.description}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
