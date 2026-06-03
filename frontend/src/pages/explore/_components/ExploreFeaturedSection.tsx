import { Play, Star } from 'lucide-react'

const featured = [
  {
    id: 1,
    title: 'Nhận diện cảm xúc',
    subtitle: 'Học cách hiểu và diễn đạt cảm xúc của bản thân',
    category: 'Cảm Xúc',
    categoryColor: 'text-[#339e4a]',
    categoryBg: 'bg-[#f2fbef]',
    gradient: 'from-[#339e4a] to-[#56c46e]',
    emoji: '😊',
    lessons: 8,
    stars: 5,
    level: 'Cơ bản',
    levelBg: 'bg-[#e5f2ff]',
    levelText: 'text-[#0a7ad8]',
    isNew: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Nói lên suy nghĩ của mình',
    subtitle: 'Kỹ năng giao tiếp tự tin và rõ ràng với mọi người',
    category: 'Giao Tiếp',
    categoryColor: 'text-[#0a7ad8]',
    categoryBg: 'bg-[#e5f2ff]',
    gradient: 'from-[#0a7ad8] to-[#38a1ff]',
    emoji: '💬',
    lessons: 10,
    stars: 5,
    level: 'Trung cấp',
    levelBg: 'bg-[#fef9ed]',
    levelText: 'text-[#895026]',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Tự mặc quần áo',
    subtitle: 'Bé học cách tự chăm sóc bản thân mỗi ngày',
    category: 'Tự Lập',
    categoryColor: 'text-[#895026]',
    categoryBg: 'bg-[#fef9ed]',
    gradient: 'from-[#e8a000] to-[#fdd444]',
    emoji: '⭐',
    lessons: 6,
    stars: 4,
    level: 'Cơ bản',
    levelBg: 'bg-[#f2fbef]',
    levelText: 'text-[#339e4a]',
    isNew: false,
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Kết bạn và chia sẻ',
    subtitle: 'Học cách xây dựng tình bạn đẹp và ý nghĩa',
    category: 'Bạn Bè',
    categoryColor: 'text-[#e55c72]',
    categoryBg: 'bg-[#fff0f3]',
    gradient: 'from-[#e55c72] to-[#ff8fa3]',
    emoji: '🤝',
    lessons: 7,
    stars: 5,
    level: 'Cơ bản',
    levelBg: 'bg-[#e5f2ff]',
    levelText: 'text-[#0a7ad8]',
    isNew: true,
    isFeatured: true,
  },
]

export default function ExploreFeaturedSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#fea01f] to-[#fd6907] rounded-full" />
            <h2 className="font-baloo font-bold text-[24px] text-[#004c6e] leading-[36px]">
              Nổi bật hôm nay
            </h2>
          </div>
          <button className="text-[#0a7ad8] text-[15px] font-semibold font-vietnam hover:underline transition-all">
            Xem tất cả →
          </button>
        </div>

        {/* Cards horizontal scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-100">
          {featured.map(item => (
            <div
              key={item.id}
              className="shrink-0 w-[280px] md:w-[300px] bg-white rounded-[20px] border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden"
            >
              {/* Card thumbnail */}
              <div className={`relative bg-gradient-to-br ${item.gradient} p-6 h-[140px] flex items-center justify-center overflow-hidden`}>
                <span className="text-[64px] leading-none select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </span>
                {item.isNew && (
                  <div className="absolute top-3 right-3 bg-[#fea01f] text-white text-[11px] font-bold font-vietnam px-2.5 py-1 rounded-full shadow-md">
                    MỚI
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[12px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Play size={10} fill="white" />
                  {item.lessons} bài học
                </div>
              </div>

              {/* Card content */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-semibold font-vietnam px-2.5 py-0.5 rounded-full ${item.categoryBg} ${item.categoryColor}`}>
                    {item.category}
                  </span>
                  <span className={`text-[12px] font-medium font-vietnam px-2.5 py-0.5 rounded-full ${item.levelBg} ${item.levelText}`}>
                    {item.level}
                  </span>
                </div>

                <h3 className="font-baloo font-bold text-[17px] text-[#004c6e] leading-[24px]">
                  {item.title}
                </h3>

                <p className="text-[13px] text-[#575e70] leading-[20px] font-vietnam line-clamp-2">
                  {item.subtitle}
                </p>

                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < item.stars ? 'text-[#fea01f] fill-[#fea01f]' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>

                <button className="mt-2 w-full bg-gradient-to-r from-[#6c04ee] to-[#9560d8] hover:from-[#5a03c5] hover:to-[#7d4cbc] text-white font-baloo font-bold text-[14px] py-2.5 rounded-[12px] transition-all duration-200 active:scale-95 shadow-sm">
                  Bắt đầu học
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
