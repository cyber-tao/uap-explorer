import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { theme } from '../lib/theme'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (isHome) return
    window.scrollTo(0, 0)
  }, [location.pathname, isHome])

  return (
    <div className="min-h-[100dvh]" style={{ background: theme.base }}>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer variant={isHome ? 'home' : 'default'} />
    </div>
  )
}
