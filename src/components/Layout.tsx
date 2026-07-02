import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-[100dvh]" style={{ background: '#050A0F' }}>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
