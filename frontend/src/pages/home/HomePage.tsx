import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import AboutSection from './_components/AboutSection'
import BenefitsSection from './_components/BenefitsSection'
import CTABanner from './_components/CTABanner'
import HeroSection from './_components/HeroSection'
import JourneySection from './_components/JourneySection'
import SkillZonesSection from './_components/SkillZonesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Kỹ năng sống cho trẻ"
        description="OTTOPIA là nền tảng học kỹ năng sống bằng hình ảnh, tình huống thực tế và trò chơi tương tác, giúp trẻ phát triển toàn diện, tự tin và hạnh phúc hơn mỗi ngày."
      />
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 md:px-6 xl:px-[48px] py-[20px] md:py-[24px] flex flex-col gap-[20px] md:gap-[24px] bg-white">
        <h1 className="sr-only">OTTOPIA - Nền tảng học kỹ năng sống trực tuyến cho trẻ em</h1>
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <JourneySection />
        <SkillZonesSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
