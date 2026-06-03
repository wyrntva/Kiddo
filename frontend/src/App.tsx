import { useState } from 'react'
import ExplorePage from './pages/explore/ExplorePage'
import HomePage from './pages/home/HomePage'

export type Page = 'home' | 'explore' | 'courses' | 'achievements' | 'playground' | 'parents'

function App() {
  const [page, setPage] = useState<Page>('home')

  if (page === 'explore') {
    return <ExplorePage activePage={page} onNavigate={setPage} />
  }

  return <HomePage activePage={page} onNavigate={setPage} />
}

export default App
