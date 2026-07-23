import { useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import ParentsHeroSection from './_components/ParentsHeroSection'
import ParentsFeaturedSection from './_components/ParentsFeaturedSection'
import ParentsArticlesSection from './_components/ParentsArticlesSection'

export default function ParentsPage() {
  const [category, setCategory] = useState('Tất cả')
  const categories = ['Tất cả', 'Kỹ năng sống', 'Phát triển cảm xúc']

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
        <div className="flex flex-col gap-6 items-start px-4 md:px-6 xl:px-[48px] pt-[48px] pb-[20px] md:pb-[24px] w-full max-w-[1920px] mx-auto">
          <div className="flex w-full flex-col gap-5">
            <h2 className="font-baloo text-[30px] font-bold leading-tight text-[#004c6e] sm:text-[36px]">
              Dành cho phụ huynh
            </h2>
            <div className="flex w-full gap-3 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 font-vietnam text-[15px] font-bold shadow-sm transition-colors sm:px-6 ${
                    category === item
                      ? 'border-[#fea01f] bg-[#fea01f] text-white shadow-[0_4px_12px_rgba(254,160,31,0.22)]'
                      : 'border-[#c9e6ff] bg-[#f4fafd] text-[#0a7ad8] hover:border-[#0a7ad8] hover:bg-[#e5f2ff]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <ParentsFeaturedSection activeCategory={category} />
          <ParentsArticlesSection activeCategory={category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
