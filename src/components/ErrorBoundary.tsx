import { Component, type ErrorInfo, type ReactNode } from 'react'
import { LanguageContext } from '../i18n'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

function isChunkLoadError(error?: Error): boolean {
  if (!error?.message) return false
  const msg = error.message.toLowerCase()
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('importing a module script failed') ||
    msg.includes('chunkloaderror') ||
    msg.includes('loading chunk')
  )
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route error boundary caught:', error, info.componentStack)

    // Auto-recover from stale chunks after a new deployment
    if (isChunkLoadError(error)) {
      const reloadKey = 'uap_last_chunk_error_reload'
      const lastReload = sessionStorage.getItem(reloadKey)
      const now = Date.now()
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem(reloadKey, String(now))
        window.location.reload()
      }
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <LanguageContext.Consumer>
            {(context) => {
              const t = context?.t
              return (
                <div className="grid place-items-center px-6" style={{ minHeight: '60dvh', background: '#050A0F' }}>
                  <div className="text-center max-w-md">
                    <p className="font-serif-display text-2xl mb-3" style={{ color: '#EDE8E4' }}>
                      {t ? t('errorBoundary.title') : '页面加载失败'}
                    </p>
                    <p className="text-sm mb-6" style={{ color: '#8A99A8' }}>
                      {t ? t('errorBoundary.description') : '资源可能暂时不可用。请刷新页面或返回首页重试。'}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-opacity hover:opacity-90"
                        style={{ background: '#30B0D0', color: '#050A0F' }}
                        onClick={this.handleReload}
                      >
                        {t ? t('errorBoundary.reload') : '刷新页面'}
                      </button>
                      <a
                        href="#/"
                        className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-[rgba(48,176,208,0.15)]"
                        style={{ border: '1px solid rgba(48, 176, 208, 0.3)', color: '#EDE8E4' }}
                        onClick={() => this.setState({ hasError: false, error: undefined })}
                      >
                        {t ? t('errorBoundary.backHome') : '返回首页'}
                      </a>
                    </div>
                  </div>
                </div>
              )
            }}
          </LanguageContext.Consumer>
        )
      )
    }
    return this.props.children
  }
}


