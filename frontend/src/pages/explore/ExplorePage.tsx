import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import ExploreZoneMap from './_components/ExploreZoneMap'

export default function ExplorePage() {
  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <main className="h-auto xl:h-[calc(100vh-66px)] max-w-[1920px] mx-auto w-full py-[24px] flex flex-col overflow-visible xl:overflow-hidden">
        <ExploreZoneMap />
      </main>
      <Footer />
    </div>
  )
}
