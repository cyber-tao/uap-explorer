import { Component, type ErrorInfo, type ReactNode } from 'react'
import { LanguageContext } from '../i18n'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route error boundary caught:', error, info.componentStack)
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
                    <a
                      href="#/"
                      className="inline-block px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                      style={{ background: '#30B0D0', color: '#050A0F' }}
                      onClick={() => this.setState({ hasError: false })}
                    >
                      {t ? t('errorBoundary.backHome') : '返回首页'}
                    </a>
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


