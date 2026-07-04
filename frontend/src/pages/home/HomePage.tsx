import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import AboutSection from './_components/AboutSection'
import BenefitsSection from './_components/BenefitsSection'
import CTABanner from './_components/CTABanner'
import HeroSection from './_components/HeroSection'
import JourneySection from './_components/JourneySection'
import SkillZonesSection from './_components/SkillZonesSection'
import TestimonialsSection from './_components/TestimonialsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 md:px-6 xl:px-[48px] py-[20px] md:py-[24px] flex flex-col gap-[20px] md:gap-[24px] bg-white">
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <JourneySection />
        <SkillZonesSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
