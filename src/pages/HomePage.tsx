import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalaxyBackground from '../components/GalaxyBackground'
import HeroField from '../sections/HeroField'
import PhilosophyCarousel from '../sections/PhilosophyCarousel'
import ImmersiveGallery from '../sections/ImmersiveGallery'
import MediumsGlossary from '../sections/MediumsGlossary'
import Footer from '../sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const [fluidActive, setFluidActive] = useState(true)
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
    const philEl = document.getElementById('philosophy')
    const galleryEl = document.getElementById('gallery')
    if (!heroEl || !philEl || !galleryEl) return

    const visibility = { hero: true, phil: false, gallery: false }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) visibility.hero = entry.isIntersecting
          if (entry.target === philEl) visibility.phil = entry.isIntersecting
          if (entry.target === galleryEl) visibility.gallery = entry.isIntersecting
        })
        setFluidActive(visibility.hero || visibility.phil || visibility.gallery)
      },
      { threshold: 0.05 }
    )
    observer.observe(heroEl)
    observer.observe(philEl)
    observer.observe(galleryEl)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <GalaxyBackground isActive={fluidActive} />
      <div id="hero-section" style={{ position: 'relative', zIndex: 1 }}>
        <HeroField />
      </div>
      <div id="philosophy" style={{ position: 'relative', zIndex: 2 }}>
        <PhilosophyCarousel />
      </div>
      <div id="gallery" style={{ position: 'relative', zIndex: 3 }}>
        <ImmersiveGallery />
      </div>
      <div style={{ position: 'relative', zIndex: 50 }}>
        <div id="mediums">
          <MediumsGlossary />
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  )
}
