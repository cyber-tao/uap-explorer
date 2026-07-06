import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

// Route-level code splitting: only the home page (and its heavy 3D / scroll
// dependencies) ships in the initial bundle; the remaining pages — including
// the chart-heavy analysis page — load on demand.
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/timeline"
          element={
            <Suspense fallback={<PageFallback />}>
              <TimelinePage />
            </Suspense>
          }
        />
        <Route
          path="/analysis"
          element={
            <Suspense fallback={<PageFallback />}>
              <AnalysisPage />
            </Suspense>
          }
        />
        <Route
          path="/agencies"
          element={
            <Suspense fallback={<PageFallback />}>
              <AgenciesPage />
            </Suspense>
          }
        />
        <Route
          path="/event/:id"
          element={
            <Suspense fallback={<PageFallback />}>
              <EventDetailPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App