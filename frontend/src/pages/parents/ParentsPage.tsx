import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import ParentsHeroSection from './_components/ParentsHeroSection'
import ParentsFeaturedSection from './_components/ParentsFeaturedSection'
import ParentsArticlesSection from './_components/ParentsArticlesSection'

export default function ParentsPage() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <ParentsHeroSection />
        <div className="flex flex-col gap-6 items-start px-4 md:px-[48px] py-[24px] w-full max-w-[1920px] mx-auto">
          <ParentsFeaturedSection />
          <ParentsArticlesSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
