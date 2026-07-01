import { useState } from 'react'

const imgOtterMascot = "/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.webp"
const imgStarIcon = "/assets/b88c4904531cd4b1ec90fb81ed103fec521e0cab.svg"

export default function ExploreHeroSection() {
  const [query, setQuery] = useState('')

  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#6c04ee] via-[#9560d8] to-[#0a7ad8] p-8 md:p-12 shadow-xl border border-purple-300/30 min-h-[220px] flex items-center">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 left-1/3 w-48 h-48 bg-[#fea01f]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-[20%] w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

          {/* Stars decoration */}
          <img src={imgStarIcon} alt="" className="absolute top-6 left-[40%] w-8 h-8 opacity-60 animate-pulse pointer-events-none select-none" />
          <img src={imgStarIcon} alt="" className="absolute bottom-8 left-[55%] w-6 h-6 opacity-40 animate-pulse pointer-events-none select-none" style={{ animationDelay: '0.8s' }} />
          <img src={imgStarIcon} alt="" className="absolute top-10 right-[30%] w-5 h-5 opacity-50 animate-pulse pointer-events-none select-none" style={{ animationDelay: '1.4s' }} />

          {/* Content */}
          <div className="relative z-10 flex-1 max-w-2xl">
            <h1 className="font-baloo font-bold text-white text-[32px] md:text-[40px] leading-tight mb-2 select-none">
              Khám phá thế giới kỹ năng sống!
            </h1>
            <p className="text-white/80 text-[16px] md:text-[18px] leading-[28px] font-vietnam mb-6 select-none">
              Tìm kiếm bài học yêu thích, khám phá chủ đề mới cùng Ottopia
            </p>

            {/* Search bar */}
            <div className="flex items-center gap-3 bg-white rounded-[16px] px-4 py-3 shadow-lg max-w-[560px]">
              <svg className="text-[#9560d8] shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm kiếm bài học, chủ đề, kỹ năng..."
                className="flex-1 text-[16px] text-[#313235] placeholder:text-gray-400 outline-none font-vietnam bg-transparent"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              )}
              <button className="bg-gradient-to-r from-[#6c04ee] to-[#9560d8] text-white font-baloo font-bold text-[14px] px-5 py-2 rounded-[10px] hover:opacity-90 active:scale-95 transition-all duration-150 whitespace-nowrap shrink-0">
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Mascot */}
          <div className="hidden lg:flex absolute right-8 bottom-0 w-[200px] h-[200px] items-end justify-center pointer-events-none select-none">
            <img
              src={imgOtterMascot}
              alt="Otter mascot"
              className="w-full h-full object-contain drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
