import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import './index.css'
import App from './App.tsx'

// Automatically reload if a dynamic import chunk fails due to a new release or stale cache
window.addEventListener('vite:preloadError', (event) => {
  const reloadKey = 'uap_last_chunk_preload_reload'
  const lastReload = sessionStorage.getItem(reloadKey)
  const now = Date.now()
  if (!lastReload || now - Number(lastReload) > 10000) {
    sessionStorage.setItem(reloadKey, String(now))
    event.preventDefault?.()
    window.location.reload()
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>
  </StrictMode>
)
