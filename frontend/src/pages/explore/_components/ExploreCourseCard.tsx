import type { ExploreCourse } from './exploreCoursesData'

interface ExploreCourseCardProps {
  course: ExploreCourse
}

export default function ExploreCourseCard({ course }: ExploreCourseCardProps) {
  return (
    <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer overflow-hidden flex flex-col">
      <div className={`bg-gradient-to-br ${course.gradient} h-[110px] flex items-center justify-center relative overflow-hidden`}>
        <span className="text-[52px] leading-none select-none group-hover:scale-110 transition-transform duration-300">
          {course.emoji}
        </span>
        {course.progress === 100 && (
          <div className="absolute top-2 right-2 bg-[#339e4a] text-white text-[11px] font-bold font-vietnam px-2 py-0.5 rounded-full">
            Hoàn thành
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

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className={`text-[12px] font-semibold font-vietnam px-2.5 py-0.5 rounded-full self-start ${course.categoryBg} ${course.categoryColor}`}>
          {course.categoryLabel}
        </span>

        <h3 className="font-baloo font-bold text-[16px] text-[#004c6e] leading-[22px] group-hover:text-[#6c04ee] transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-3 text-[12px] text-[#575e70] font-vietnam mt-auto pt-1">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            {course.lessons} bài
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {course.duration}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg key={index} width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={index < course.stars ? 'fill-[#fea01f] stroke-[#fea01f]' : 'fill-gray-200 stroke-gray-200'}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
          {course.progress === 100 && 'Ôn lại'}
        </button>
      </div>
    </div>
  )
}
