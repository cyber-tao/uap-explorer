import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalaxyBackground from '../components/GalaxyBackground'
import HeroField from '../sections/HeroField'
import ObservablesCarousel from '../sections/ObservablesCarousel'
import ImmersiveGallery from '../sections/ImmersiveGallery'
import AgenciesGlossary from '../sections/AgenciesGlossary'
import Footer from '../sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const [galaxyActive, setGalaxyActive] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  useEffect(() => {
    const heroEl = document.getElementById('hero-section')
    const obsEl = document.getElementById('observables')
    const galleryEl = document.getElementById('gallery')
    if (!heroEl || !obsEl || !galleryEl) return

    const visibility = { hero: true, obs: false, gallery: false }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) visibility.hero = entry.isIntersecting
          if (entry.target === obsEl) visibility.obs = entry.isIntersecting
          if (entry.target === galleryEl) visibility.gallery = entry.isIntersecting
        })
        setGalaxyActive(visibility.hero || visibility.obs || visibility.gallery)
      },
      { threshold: 0.05 }
    )
    observer.observe(heroEl)
    observer.observe(obsEl)
    observer.observe(galleryEl)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <GalaxyBackground isActive={galaxyActive} />
      <div id="hero-section" style={{ position: 'relative', zIndex: 1 }}>
        <HeroField />
      </div>
      <div id="observables" style={{ position: 'relative', zIndex: 2 }}>
        <ObservablesCarousel />
      </div>
      <div id="gallery" style={{ position: 'relative', zIndex: 3 }}>
        <ImmersiveGallery />
      </div>
      <div style={{ position: 'relative', zIndex: 50 }}>
        <AgenciesGlossary />
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  )
}
