const features = [
  {
    icon: '🎬',
    title: 'Học qua tình huống',
    description: 'Video tương tác sinh động, dễ hiểu',
    color: 'bg-orange-50',
  },
  {
    icon: '👦',
    title: 'Bé chủ động chọn',
    description: 'Bé chọn phần mình thích và học theo cách riêng',
    color: 'bg-blue-50',
  },
  {
    icon: '🎮',
    title: 'Học mà chơi, chơi mà học',
    description: 'Mini game thú vị giúp bé ôn luyện mỗi ngày',
    color: 'bg-purple-50',
  },
  {
    icon: '📊',
    title: 'Theo dõi tiến trình',
    description: 'Ba mẹ theo dõi sự tiến bộ của bé dễ dàng',
    color: 'bg-green-50',
  },
]

export default function FeaturesStrip() {
  return (
    <section className="bg-white py-5 shadow-sm border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div
                className={`w-11 h-11 ${feature.color} rounded-2xl flex items-center justify-center text-2xl shrink-0`}
              >
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm leading-tight mb-0.5">
                  {feature.title}
                </div>
                <div className="text-xs text-gray-400 leading-snug">{feature.description}</div>
              </div>
              <span className="text-gray-200 group-hover:text-orange-400 transition-colors text-lg font-light mt-1 shrink-0">
                ›
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
