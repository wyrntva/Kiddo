import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import ExploreZoneMap from './_components/ExploreZoneMap'

export default function ExplorePage() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <main className="flex-1 h-auto max-w-[1920px] mx-auto w-full py-[20px] md:py-[24px] flex flex-col overflow-visible">
        <ExploreZoneMap />
      </main>
      <Footer />
    </div>
  )
}
