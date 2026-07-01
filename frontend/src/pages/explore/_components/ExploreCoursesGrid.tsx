
const allCourses = [
  {
    id: 1,
    title: 'Quản lý cơn tức giận',
    category: 'emotion',
    categoryLabel: 'Cảm Xúc',
    categoryColor: 'text-[#339e4a]',
    categoryBg: 'bg-[#f2fbef]',
    emoji: '😤',
    gradient: 'from-[#f2fbef] to-[#c3ffd0]',
    accentColor: '#339e4a',
    lessons: 5,
    duration: '25 phút',
    stars: 4,
    progress: 0,
    level: 'Cơ bản',
  },
  {
    id: 2,
    title: 'Lắng nghe người khác',
    category: 'communication',
    categoryLabel: 'Giao Tiếp',
    categoryColor: 'text-[#0a7ad8]',
    categoryBg: 'bg-[#e5f2ff]',
    emoji: '👂',
    gradient: 'from-[#e5f2ff] to-[#c9e6ff]',
    accentColor: '#0a7ad8',
    lessons: 6,
    duration: '30 phút',
    stars: 5,
    progress: 40,
    level: 'Cơ bản',
  },
  {
    id: 3,
    title: 'Tự dọn dẹp phòng',
    category: 'independence',
    categoryLabel: 'Tự Lập',
    categoryColor: 'text-[#895026]',
    categoryBg: 'bg-[#fef9ed]',
    emoji: '🧹',
    gradient: 'from-[#fef9ed] to-[#fff4bf]',
    accentColor: '#e8a000',
    lessons: 4,
    duration: '20 phút',
    stars: 4,
    progress: 75,
    level: 'Cơ bản',
  },
  {
    id: 4,
    title: 'Chia sẻ đồ chơi',
    category: 'friendship',
    categoryLabel: 'Bạn Bè',
    categoryColor: 'text-[#e55c72]',
    categoryBg: 'bg-[#fff0f3]',
    emoji: '🎁',
    gradient: 'from-[#fff0f3] to-[#ffd6de]',
    accentColor: '#e55c72',
    lessons: 5,
    duration: '22 phút',
    stars: 5,
    progress: 0,
    level: 'Cơ bản',
  },
  {
    id: 5,
    title: 'Xử lý khi bị bắt nạt',
    category: 'situation',
    categoryLabel: 'Tình Huống',
    categoryColor: 'text-[#9560d8]',
    categoryBg: 'bg-[#f2f0fe]',
    emoji: '🛡️',
    gradient: 'from-[#f2f0fe] to-[#e9d8ff]',
    accentColor: '#9560d8',
    lessons: 7,
    duration: '35 phút',
    stars: 5,
    progress: 20,
    level: 'Trung cấp',
  },
  {
    id: 6,
    title: 'Thể hiện tình yêu thương',
    category: 'emotion',
    categoryLabel: 'Cảm Xúc',
    categoryColor: 'text-[#339e4a]',
    categoryBg: 'bg-[#f2fbef]',
    emoji: '💚',
    gradient: 'from-[#f2fbef] to-[#c3ffd0]',
    accentColor: '#339e4a',
    lessons: 6,
    duration: '28 phút',
    stars: 5,
    progress: 60,
    level: 'Cơ bản',
  },
  {
    id: 7,
    title: 'Tự chuẩn bị bữa sáng',
    category: 'independence',
    categoryLabel: 'Tự Lập',
    categoryColor: 'text-[#895026]',
    categoryBg: 'bg-[#fef9ed]',
    emoji: '🍳',
    gradient: 'from-[#fef9ed] to-[#fff4bf]',
    accentColor: '#e8a000',
    lessons: 5,
    duration: '25 phút',
    stars: 4,
    progress: 0,
    level: 'Trung cấp',
  },
  {
    id: 8,
    title: 'Nói xin lỗi đúng cách',
    category: 'communication',
    categoryLabel: 'Giao Tiếp',
    categoryColor: 'text-[#0a7ad8]',
    categoryBg: 'bg-[#e5f2ff]',
    emoji: '🙏',
    gradient: 'from-[#e5f2ff] to-[#c9e6ff]',
    accentColor: '#0a7ad8',
    lessons: 4,
    duration: '18 phút',
    stars: 5,
    progress: 100,
    level: 'Cơ bản',
  },
  {
    id: 9,
    title: 'Kết bạn mới ở trường',
    category: 'friendship',
    categoryLabel: 'Bạn Bè',
    categoryColor: 'text-[#e55c72]',
    categoryBg: 'bg-[#fff0f3]',
    emoji: '👫',
    gradient: 'from-[#fff0f3] to-[#ffd6de]',
    accentColor: '#e55c72',
    lessons: 6,
    duration: '30 phút',
    stars: 4,
    progress: 0,
    level: 'Cơ bản',
  },
  {
    id: 10,
    title: 'Ứng xử khi bị ngã',
    category: 'situation',
    categoryLabel: 'Tình Huống',
    categoryColor: 'text-[#9560d8]',
    categoryBg: 'bg-[#f2f0fe]',
    emoji: '🩹',
    gradient: 'from-[#f2f0fe] to-[#e9d8ff]',
    accentColor: '#9560d8',
    lessons: 3,
    duration: '15 phút',
    stars: 4,
    progress: 0,
    level: 'Cơ bản',
  },
  {
    id: 11,
    title: 'Vui chơi công bằng',
    category: 'friendship',
    categoryLabel: 'Bạn Bè',
    categoryColor: 'text-[#e55c72]',
    categoryBg: 'bg-[#fff0f3]',
    emoji: '🎲',
    gradient: 'from-[#fff0f3] to-[#ffd6de]',
    accentColor: '#e55c72',
    lessons: 5,
    duration: '22 phút',
    stars: 5,
    progress: 30,
    level: 'Cơ bản',
  },
  {
    id: 12,
    title: 'Nhận ra khi mình sai',
    category: 'emotion',
    categoryLabel: 'Cảm Xúc',
    categoryColor: 'text-[#339e4a]',
    categoryBg: 'bg-[#f2fbef]',
    emoji: '🤔',
    gradient: 'from-[#f2fbef] to-[#c3ffd0]',
    accentColor: '#339e4a',
    lessons: 4,
    duration: '20 phút',
    stars: 5,
    progress: 0,
    level: 'Trung cấp',
  },
]

interface ExploreCoursesGridProps {
  activeCategory: string
}

export default function ExploreCoursesGrid({ activeCategory }: ExploreCoursesGridProps) {
  const filtered = activeCategory === 'all'
    ? allCourses
    : allCourses.filter(c => c.category === activeCategory)

  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#0a7ad8] to-[#6c04ee] rounded-full" />
            <h2 className="font-baloo font-bold text-[24px] text-[#004c6e] leading-[36px]">
              {activeCategory === 'all' ? 'Tất cả khóa học' : `Khóa học ${allCourses.find(c => c.category === activeCategory)?.categoryLabel ?? ''}`}
            </h2>
            <span className="bg-gray-100 text-[#575e70] text-[13px] font-medium font-vietnam px-2.5 py-1 rounded-full">
              {filtered.length} khóa
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-[60px] mb-4">🔍</span>
            <p className="font-baloo font-bold text-[20px] text-[#004c6e] mb-2">Chưa có khóa học</p>
            <p className="text-[#575e70] font-vietnam text-[15px]">Chúng tôi đang cập nhật thêm nội dung mới!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className={`bg-gradient-to-br ${course.gradient} h-[110px] flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-[52px] leading-none select-none group-hover:scale-110 transition-transform duration-300">
                    {course.emoji}
                  </span>
                  {course.progress === 100 && (
                    <div className="absolute top-2 right-2 bg-[#339e4a] text-white text-[11px] font-bold font-vietnam px-2 py-0.5 rounded-full">
                      ✓ Hoàn thành
                    </div>
                  )}
                  {course.progress > 0 && course.progress < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%`, backgroundColor: course.accentColor }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className={`text-[12px] font-semibold font-vietnam px-2.5 py-0.5 rounded-full self-start ${course.categoryBg} ${course.categoryColor}`}>
                    {course.categoryLabel}
                  </span>

                  <h3 className="font-baloo font-bold text-[16px] text-[#004c6e] leading-[22px] group-hover:text-[#6c04ee] transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 text-[12px] text-[#575e70] font-vietnam mt-auto pt-1">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                      {course.lessons} bài
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={i < course.stars ? 'fill-[#fea01f] stroke-[#fea01f]' : 'fill-gray-200 stroke-gray-200'}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] text-[#575e70] font-vietnam">{course.level}</span>
                  </div>

                  <button
                    className="mt-2 w-full py-2 rounded-[10px] text-[13px] font-bold font-vietnam transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: course.progress === 0 ? 'transparent' : undefined,
                      background: course.progress > 0 && course.progress < 100
                        ? `linear-gradient(to right, ${course.accentColor}, ${course.accentColor}cc)`
                        : course.progress === 100
                          ? '#f2fbef'
                          : undefined,
                      border: course.progress === 0 ? `2px solid ${course.accentColor}` : 'none',
                      color: course.progress === 0 ? course.accentColor : course.progress === 100 ? '#339e4a' : 'white',
                    }}
                  >
                    {course.progress === 0 && 'Bắt đầu học'}
                    {course.progress > 0 && course.progress < 100 && `Tiếp tục (${course.progress}%)`}
                    {course.progress === 100 && '✓ Ôn lại'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
