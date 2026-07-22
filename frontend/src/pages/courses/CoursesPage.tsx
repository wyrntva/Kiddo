import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import SEO from '../../components/common/SEO'
import CoursesHeroSection from './_components/CoursesHeroSection'
import ComparisonSection from './_components/ComparisonSection'
import PricingSection from './_components/PricingSection'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white font-vietnam">
      <SEO
        title="Khóa học kỹ năng sống"
        description="Tổng hợp các khóa học kỹ năng sống chất lượng cao cho trẻ em từ OTTOPIA. Học qua trải nghiệm thực tế và trò chơi tương tác."
        schemaType="CollectionPage"
      />
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 md:px-6 xl:px-[48px] py-[20px] md:py-[24px] flex flex-col gap-8 md:gap-10 bg-white">
        <CoursesHeroSection />
        <ComparisonSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
