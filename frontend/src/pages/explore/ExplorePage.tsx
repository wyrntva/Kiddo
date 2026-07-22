import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import ExploreZoneMap from './_components/ExploreZoneMap'

export default function ExplorePage() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SEO
        title="Khám phá bản đồ học tập"
        description="Cùng phiêu lưu trên bản đồ học tập OTTOPIA để rèn luyện kỹ năng tự lập, giao tiếp, quản lý cảm xúc và ứng phó tình huống."
        schemaType="CollectionPage"
      />
      <Navbar />
      <main className="flex-1 h-auto max-w-[1920px] mx-auto w-full py-[20px] md:py-[24px] flex flex-col overflow-visible">
        <ExploreZoneMap />
      </main>
      <Footer />
    </div>
  )
}
