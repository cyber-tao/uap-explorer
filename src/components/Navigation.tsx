import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, Globe, ChevronDown, Check, Languages } from 'lucide-react'
import { useI18n } from '../i18n'
import { SUPPORTED_LANGUAGES, type Language } from '../i18n/types'
import BGMPlayer from './BGMPlayer'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language, setLanguage, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.timeline'), path: '/timeline' },
    { label: t('nav.analysis'), path: '/analysis' },
    { label: t('nav.agencies'), path: '/agencies' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0]

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5, 10, 15, 0.88)' : 'transparent',
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

          <div className="flex items-center gap-2.5">
            <BGMPlayer />

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: langDropdownOpen ? 'rgba(48, 176, 208, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: langDropdownOpen ? '#30B0D0' : '#EDE8E4',
                  border: langDropdownOpen ? '1px solid rgba(48, 176, 208, 0.35)' : '1px solid rgba(138, 153, 168, 0.15)',
                }}
                aria-expanded={langDropdownOpen}
                aria-label="Language Selector"
              >
                <Languages className="w-3.5 h-3.5" style={{ color: '#30B0D0' }} />
                <span>{currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 opacity-60 transition-transform duration-200" style={{ transform: langDropdownOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 rounded-lg py-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  style={{
                    background: 'rgba(10, 17, 23, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(48, 176, 208, 0.25)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isCurrent = lang.code === language
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code as Language)
                          setLangDropdownOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left cursor-pointer hover:bg-[rgba(48,176,208,0.12)]"
                        style={{
                          color: isCurrent ? '#30B0D0' : '#EDE8E4',
                          fontWeight: isCurrent ? 600 : 400,
                        }}
                      >
                        <div className="flex flex-col">
                          <span>{lang.nativeLabel}</span>
                          <span className="text-[10px] opacity-60 font-mono-data">{lang.label}</span>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5" style={{ color: '#30B0D0' }} />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/timeline')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer"
              style={{
                background: 'rgba(48, 176, 208, 0.1)',
                color: '#30B0D0',
                border: '1px solid rgba(48, 176, 208, 0.2)',
              }}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t('nav.search')}</span>
            </button>

            <button
              className="md:hidden p-2 cursor-pointer"
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
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
          style={{ background: 'rgba(5, 10, 15, 0.96)', backdropFilter: 'blur(16px)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="flex flex-col items-center justify-center gap-6 px-8 w-full max-w-xs text-center"
            onClick={(e) => e.stopPropagation()}
          >
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

            {/* Mobile language switch buttons */}
            <div className="w-full pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <p className="text-[11px] uppercase tracking-widest text-[#8A99A8] mb-3">
                {t('nav.language')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code)
                      setMobileOpen(false)
                    }}
                    className="px-3 py-2 rounded-md text-xs font-medium transition-all cursor-pointer"
                    style={{
                      background: lang.code === language ? 'rgba(48, 176, 208, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: lang.code === language ? '#30B0D0' : '#EDE8E4',
                      border: lang.code === language ? '1px solid rgba(48, 176, 208, 0.4)' : '1px solid rgba(138, 153, 168, 0.1)',
                    }}
                  >
                    {lang.nativeLabel}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileOpen(false)
                navigate('/timeline')
              }}
              className="flex items-center justify-center gap-2 mt-2 w-full px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
              style={{
                background: 'rgba(48, 176, 208, 0.12)',
                color: '#30B0D0',
                border: '1px solid rgba(48, 176, 208, 0.25)',
              }}
            >
              <Search className="w-4 h-4" />
              <span>{t('nav.searchAll')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

