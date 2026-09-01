import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainSite from './components/MainSite'
import FrontendProjects from './pages/FrontendProjects'
import FullStackProjects from './pages/FullStackProjects'
import AIProjects from './pages/AIProjects'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/frontend-projects" element={<FrontendProjects />} />
        <Route path="/full-stack-projects" element={<FullStackProjects />} />
        <Route path="/ai-projects" element={<AIProjects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
