import type { Page } from '../../App'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import ExploreZoneMap from './_components/ExploreZoneMap'

interface ExplorePageProps {
  activePage?: Page
  onNavigate?: (page: Page) => void
}

export default function ExplorePage({ activePage, onNavigate }: ExplorePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage={activePage} onNavigate={onNavigate} />
      <main className="flex flex-col gap-6 py-6">
        <ExploreZoneMap />
      </main>
      <Footer />
    </div>
  )
}
