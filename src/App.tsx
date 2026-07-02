import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TimelinePage from './pages/TimelinePage'
import AnalysisPage from './pages/AnalysisPage'
import AgenciesPage from './pages/AgenciesPage'
import EventDetailPage from './pages/EventDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/agencies" element={<AgenciesPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App