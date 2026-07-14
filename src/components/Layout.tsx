import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    // HomePage owns scroll via Lenis; avoid fighting it with native scrollTo
    if (isHome) return
    window.scrollTo(0, 0)
  }, [location.pathname, isHome])

  return (
    <div className="min-h-[100dvh]" style={{ background: '#050A0F' }}>
      <Navigation />
      <main>
        <Outlet />
      </main>
      {/* HomePage renders sections/Footer with footerConfig; avoid duplicate */}
      {!isHome && <Footer />}
    </div>
  )
}
