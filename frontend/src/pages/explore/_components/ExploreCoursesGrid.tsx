import ExploreCourseCard from './ExploreCourseCard'
import { allCourses } from './exploreCoursesData'

interface ExploreCoursesGridProps {
  activeCategory: string
}

export default function ExploreCoursesGrid({ activeCategory }: ExploreCoursesGridProps) {
  const filteredCourses = activeCategory === 'all'
    ? allCourses
    : allCourses.filter((course) => course.category === activeCategory)

  const activeCategoryLabel = activeCategory === 'all'
    ? 'Tất cả khóa học'
    : `Khóa học ${allCourses.find((course) => course.category === activeCategory)?.categoryLabel ?? ''}`

  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#0a7ad8] to-[#6c04ee] rounded-full" />
            <h2 className="font-baloo font-bold text-[24px] text-[#004c6e] leading-[36px]">{activeCategoryLabel}</h2>
            <span className="bg-gray-100 text-[#575e70] text-[13px] font-medium font-vietnam px-2.5 py-1 rounded-full">
              {filteredCourses.length} khóa
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[14px] text-[#575e70] font-vietnam hidden md:block">Sắp xếp:</span>
            <select className="text-[14px] text-[#313235] font-vietnam border border-gray-200 rounded-[10px] px-3 py-1.5 outline-none cursor-pointer bg-white hover:border-[#9560d8] transition-colors">
              <option>Phổ biến nhất</option>
              <option>Mới nhất</option>
              <option>Đang học</option>
              <option>Hoàn thành</option>
            </select>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-[60px] mb-4">🔍</span>
            <p className="font-baloo font-bold text-[20px] text-[#004c6e] mb-2">Chưa có khóa học</p>
            <p className="text-[#575e70] font-vietnam text-[15px]">Chúng tôi đang cập nhật thêm nội dung mới!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <ExploreCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
