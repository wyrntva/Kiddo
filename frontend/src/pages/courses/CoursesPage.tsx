import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import CoursesHeroSection from './_components/CoursesHeroSection'
import ComparisonSection from './_components/ComparisonSection'
import PricingSection from './_components/PricingSection'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white font-vietnam">
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 md:px-[48px] py-[24px] flex flex-col gap-10 bg-white">
        <CoursesHeroSection />
        <ComparisonSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
