import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Search, Globe } from 'lucide-react'
import BGMPlayer from './BGMPlayer'

const navLinks = [
  { label: '首页', path: '/' },
  { label: '事件', path: '/timeline' },
  { label: '分析', path: '/analysis' },
  { label: '机构', path: '/agencies' },
]

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5, 10, 15, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(138, 153, 168, 0.1)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-serif-display text-lg font-bold tracking-tight"
            style={{ color: '#EDE8E4' }}
          >
            <Globe className="w-5 h-5" style={{ color: '#30B0D0' }} />
            <span>UAP</span>
            <span className="font-sans-body font-normal text-sm opacity-70">Explorer</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive(link.path) ? '#30B0D0' : '#8A99A8',
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{ background: '#30B0D0' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <BGMPlayer />
            <button
              onClick={() => navigate('/timeline')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                background: 'rgba(48, 176, 208, 0.1)',
                color: '#30B0D0',
                border: '1px solid rgba(48, 176, 208, 0.2)',
              }}
            >
              <Search className="w-3.5 h-3.5" />
              <span>搜索</span>
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" style={{ color: '#EDE8E4' }} />
              ) : (
                <Menu className="w-5 h-5" style={{ color: '#EDE8E4' }} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: 'rgba(5, 10, 15, 0.95)', backdropFilter: 'blur(16px)' }}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="font-serif-display text-2xl transition-colors"
                style={{
                  color: isActive(link.path) ? '#30B0D0' : '#EDE8E4',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
