import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, type ReactNode } from 'react'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'

const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const AnalysisPage = lazy(() => import('./pages/AnalysisPage'))
const AgenciesPage = lazy(() => import('./pages/AgenciesPage'))
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'))

function PageFallback() {
  return (
    <div className="grid place-items-center" style={{ minHeight: '100dvh', background: '#050A0F' }}>
      <div
        className="animate-spin rounded-full"
        style={{ width: 40, height: 40, border: '2px solid rgba(48,176,208,0.2)', borderTopColor: '#30B0D0' }}
      />
    </div>
  )
}

function LazyPage({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/timeline"
          element={
            <LazyPage>
              <TimelinePage />
            </LazyPage>
          }
        />
        <Route
          path="/analysis"
          element={
            <LazyPage>
              <AnalysisPage />
            </LazyPage>
          }
        />
        <Route
          path="/agencies"
          element={
            <LazyPage>
              <AgenciesPage />
            </LazyPage>
          }
        />
        <Route
          path="/event/:id"
          element={
            <LazyPage>
              <EventDetailPage />
            </LazyPage>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
