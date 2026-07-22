import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import ParentsHeroSection from './_components/ParentsHeroSection'
import ParentsFeaturedSection from './_components/ParentsFeaturedSection'
import ParentsArticlesSection from './_components/ParentsArticlesSection'

export default function ParentsPage() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SEO
        title="Góc phụ huynh"
        description="Theo dõi tiến trình học tập, quản lý tài khoản và tìm hiểu phương pháp giáo dục kỹ năng sống tốt nhất cho con cùng OTTOPIA."
        schemaType="CollectionPage"
      />
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <h1 className="sr-only">Góc phụ huynh OTTOPIA - Đồng hành học kỹ năng sống cùng con</h1>
        <ParentsHeroSection />
        <div className="flex flex-col gap-6 items-start px-4 md:px-6 xl:px-[48px] py-[20px] md:py-[24px] w-full max-w-[1920px] mx-auto">
          <ParentsFeaturedSection />
          <ParentsArticlesSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
