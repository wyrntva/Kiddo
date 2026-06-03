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
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />
      <main className="flex flex-col gap-6 bg-white py-6">
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
