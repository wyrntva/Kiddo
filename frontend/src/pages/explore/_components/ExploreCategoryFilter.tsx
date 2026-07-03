const categories = [
  { id: 'all', label: 'Tất cả', emoji: '🌟', activeBg: 'bg-[#6c04ee]', activeText: 'text-white', inactiveBg: 'bg-gray-100', inactiveText: 'text-[#575e70]', activeBorder: 'border-[#6c04ee]' },
  { id: 'emotion', label: 'Cảm Xúc', emoji: '😊', activeBg: 'bg-[#339e4a]', activeText: 'text-white', inactiveBg: 'bg-[#f2fbef]', inactiveText: 'text-[#339e4a]', activeBorder: 'border-[#339e4a]' },
  { id: 'communication', label: 'Giao Tiếp', emoji: '💬', activeBg: 'bg-[#0a7ad8]', activeText: 'text-white', inactiveBg: 'bg-[#e5f2ff]', inactiveText: 'text-[#0a7ad8]', activeBorder: 'border-[#0a7ad8]' },
  { id: 'independence', label: 'Tự Lập', emoji: '⭐', activeBg: 'bg-[#e8a000]', activeText: 'text-white', inactiveBg: 'bg-[#fef9ed]', inactiveText: 'text-[#895026]', activeBorder: 'border-[#e8a000]' },
  { id: 'friendship', label: 'Bạn Bè', emoji: '🤝', activeBg: 'bg-[#e55c72]', activeText: 'text-white', inactiveBg: 'bg-[#fff0f3]', inactiveText: 'text-[#e55c72]', activeBorder: 'border-[#e55c72]' },
  { id: 'situation', label: 'Tình Huống', emoji: '🎯', activeBg: 'bg-[#9560d8]', activeText: 'text-white', inactiveBg: 'bg-[#f2f0fe]', inactiveText: 'text-[#9560d8]', activeBorder: 'border-[#9560d8]' },
]

interface ExploreCategoryFilterProps {
  activeCategory: string
  onChange: (id: string) => void
}

export default function ExploreCategoryFilter({ activeCategory, onChange }: ExploreCategoryFilterProps) {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => {
            const isActive = activeCategory === category.id

            return (
              <button
                key={category.id}
                onClick={() => onChange(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-[100px] border text-[15px] font-semibold font-vietnam whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? `${category.activeBg} ${category.activeText} ${category.activeBorder} shadow-md scale-105`
                    : `${category.inactiveBg} ${category.inactiveText} border-transparent hover:scale-105 hover:shadow-sm`
                }`}
              >
                <span className="text-[18px] leading-none">{category.emoji}</span>
                <span>{category.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
