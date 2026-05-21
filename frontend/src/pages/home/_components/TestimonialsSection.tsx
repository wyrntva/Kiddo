const testimonials = [
  {
    quote:
      'KIDDO giúp bé nhà mình bình tĩnh hơn, biết nói cảm xúc thay vì khóc hay giận dỗi. Mình rất yên tâm!',
    name: 'Chị Minh Thư',
    role: 'Mẹ bé Bến, 4 tuổi',
    avatar: '👩',
    stars: 5,
  },
  {
    quote:
      'Bài học ngắn gọn, hình ảnh dễ thương và trò chơi thú vị. Bé học mỗi ngày mà không hề chán!',
    name: 'Chị Hoài An',
    role: 'Mẹ bé Sữa, 3 tuổi',
    avatar: '👩‍👧',
    stars: 5,
  },
  {
    quote:
      'Mình thích nhất là các tình huống rất gần gũi với cuộc sống hàng ngày của bé. Rất thực tế!',
    name: 'Anh Quốc Bảo',
    role: 'Ba bé Kem, 5 tuổi',
    avatar: '👨',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-black text-gray-800 text-center mb-10">
          Phụ huynh nói gì về KIDDO? 💬
        </h2>

        <div className="grid grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <span className="text-purple-300 text-4xl font-serif leading-none">"</span>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>
          ))}

          {/* Trust card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3">
            <span className="text-3xl">❤️</span>
            <p className="font-black text-gray-800 text-base leading-snug">
              Hơn 10,000+ phụ huynh tin tưởng và đồng hành cùng KIDDO
            </p>
            <div className="flex -space-x-2 mt-1">
              {['🧑', '👩', '👨', '👩‍👧'].map((e, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-base border-2 border-white"
                >
                  {e}
                </div>
              ))}
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 border-white">
                +10k
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
