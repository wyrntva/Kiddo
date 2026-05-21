import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import CTABanner from './_components/CTABanner'
import FeaturesStrip from './_components/FeaturesStrip'
import HeroSection from './_components/HeroSection'
import SkillZonesSection from './_components/SkillZonesSection'
import TestimonialsSection from './_components/TestimonialsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesStrip />
        <SkillZonesSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
