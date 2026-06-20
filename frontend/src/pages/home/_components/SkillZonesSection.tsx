import { useState, useRef, useEffect } from 'react'

const islands = [
  {
    nameLine1: 'Vùng Đất',
    nameLine2: 'Cảm Xúc',
    islandImg: '/assets/d40b12e9e0ded0d71e21206c1a1fd7e7547fb778.png',
    pinImg: '/assets/67cbb1d253573913de929c8e5defc07216c22d02.svg',
    dotImg: '/assets/3c8d21371e81a377bcca6c05c654a965af6f00ff.svg',
    textColor: 'text-[#339e4a]',
    width: 'w-[103px]',
    leftOffset: 'left-[calc(50%-0.5px)]',
    cropClass: 'absolute h-[127.92%] left-[2.42%] max-w-none top-[-20.38%] w-[99.88%]'
  },
  {
    nameLine1: 'Thành Phố',
    nameLine2: 'Giao Tiếp',
    islandImg: '/assets/6649c5db8b886aa107c45f5dbb701e32edbea3c0.png',
    pinImg: '/assets/83af9dee8e53416434ffd6356eb91dd81f18a260.svg',
    dotImg: '/assets/4a88c1a92050ca5805c351afe4a1b47c1bcdcb1e.svg',
    textColor: 'text-[#0a7ad8]',
    width: 'w-[113px]',
    leftOffset: 'left-[calc(50%-0.7px)]',
    cropClass: 'absolute h-[123.46%] left-[0.07%] max-w-none top-[-16.94%] w-[99.86%]'
  },
  {
    nameLine1: 'Ngôi Làng',
    nameLine2: 'Tự Lập',
    islandImg: '/assets/e5918ab9ae82e87df94eaff599ce35005cf104c0.png',
    pinImg: '/assets/787ecf283a0ff128e81493c2847e8c3d9cd931fa.svg',
    dotImg: '/assets/3c8d21371e81a377bcca6c05c654a965af6f00ff.svg',
    textColor: 'text-[#fea01f]',
    width: 'w-[108px]',
    leftOffset: 'left-[calc(50%-0.5px)]',
    cropClass: 'absolute h-[120.78%] left-[8.03%] max-w-none top-[-15.77%] w-[100.07%]'
  },
  {
    nameLine1: 'Khu Vườn',
    nameLine2: 'Tình Bạn',
    islandImg: '/assets/74029fdf0a39839782dd1ef90cf3c2ab4a28201e.png',
    pinImg: '/assets/ad00ad15470f8f06bee1c3e6c9c90fb81fdcf19d.svg',
    dotImg: '/assets/4a88c1a92050ca5805c351afe4a1b47c1bcdcb1e.svg',
    textColor: 'text-[#e55c72]',
    width: 'w-[105px]',
    leftOffset: 'left-[calc(50%-8.1px)]',
    cropClass: 'absolute h-[117.82%] left-0 max-w-none top-[-17.74%] w-[99.86%]'
  },
  {
    nameLine1: 'Hành Tinh',
    nameLine2: 'Tình Huống',
    islandImg: '/assets/9487ee0bf430883542d2907f36b137ed4d20f6ff.png',
    pinImg: '/assets/0444ca80dc53a1225dc9ec173cc989f114d681d1.svg',
    dotImg: '/assets/4a88c1a92050ca5805c351afe4a1b47c1bcdcb1e.svg',
    textColor: 'text-[#9560d8]',
    width: 'w-[116px]',
    leftOffset: 'left-[calc(50%-8.8px)]',
    cropClass: 'absolute h-[122.38%] left-0 max-w-none top-[-21.22%] w-full'
  },
]

export default function SkillZonesSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const onScroll = () => {
      const idx = Math.round(slider.scrollLeft / slider.clientWidth)
      setActiveIdx(idx)
    }
    slider.addEventListener('scroll', onScroll, { passive: true })
    return () => slider.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (idx: number) => {
    const slider = sliderRef.current
    if (!slider) return
    slider.scrollTo({ left: idx * slider.clientWidth, behavior: 'smooth' })
  }

  return (
    <section id="adventure-map" className="w-full scroll-mt-20">
      <div className="bg-[#f2fbef] flex flex-col gap-[16px] sm:gap-[24px] items-start p-[16px] sm:p-[24px] rounded-[24px] relative lg:min-h-0 lg:aspect-[1824/597] w-full overflow-hidden shadow-lg border border-gray-100">

        {/* Panoramic map background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/assets/33efcd0a6cadb8258948d753e0545715b83e8b64.png"
            alt="Adventure Map Background"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Heading */}
        <div className="flex gap-[10px] sm:gap-[12px] items-center w-full max-w-[607px] relative z-10 bg-white/85 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-[#c3ffd0]/60 shadow-sm select-none">
          <img
            src="/assets/5a9453f78ced6122636cc3fcfc9d7d132cd3f8e7.svg"
            alt="Map icon"
            className="size-[36px] sm:size-[48px] object-contain shrink-0"
          />
          <div className="flex flex-col items-start leading-none">
            <h2 className="font-baloo text-[16px] sm:text-[24px] font-bold text-[#6c04ee] leading-[24px] sm:leading-[40px]">
              Bản đồ phiêu lưu
            </h2>
            <p className="hidden sm:block text-[#575e70] text-[16px] leading-[24px] font-medium font-vietnam mt-0.5">
              Cùng Ottopia khám phá tất cả các vùng đất trên bản đồ kỳ diệu
            </p>
          </div>
        </div>

        {/* ── Mobile carousel (hidden on md+) ── */}
        <div className="md:hidden relative z-10 w-full shrink-0">
          {/* Slider — scrollbar fully hidden via overflow-hidden on parent */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {islands.map((island, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0 flex flex-col items-center snap-center px-6 py-2"
              >
                {/* Island image — object-contain, tỷ lệ đúng, không méo */}
                <div className="w-full max-w-[260px] aspect-square flex items-center justify-center">
                  <img
                    src={island.islandImg}
                    alt={`${island.nameLine1} ${island.nameLine2}`}
                    className="w-full h-full object-contain drop-shadow-lg select-none pointer-events-none"
                  />
                </div>

                {/* Pin + label nằm dưới ảnh, không đè */}
                <div className="flex flex-col items-center -mt-3">
                  <div className="relative w-[52px] h-[60px] drop-shadow-sm">
                    <img src={island.pinImg} alt="" className="absolute inset-0 w-full h-full object-contain" />
                    <img src={island.dotImg} alt="" className="absolute left-[17px] top-[11px] size-[18px] object-contain" />
                  </div>
                  <div className="bg-white flex flex-col items-center justify-center px-[22px] py-[10px] rounded-[100px] border border-gray-100 shadow-md cursor-pointer select-none min-w-[120px] -mt-1">
                    <div className={`flex flex-col items-center font-baloo text-[15px] font-bold text-center leading-[21px] ${island.textColor}`}>
                      <span className="whitespace-nowrap">{island.nameLine1}</span>
                      <span className="whitespace-nowrap">{island.nameLine2}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex gap-[8px] items-center justify-center w-full mt-3 pb-1">
            {islands.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-200 ${
                  idx === activeIdx
                    ? 'w-[20px] h-[7px] bg-white'
                    : 'size-[7px] bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop flex layout (hidden on mobile) ── */}
        <div className="hidden md:flex gap-[24px] items-start relative z-10 w-full px-4 shrink-0 pb-6">
          {islands.map((island, idx) => (
            <div
              key={idx}
              className="flex-1 flex-shrink-0 flex flex-col h-[289px] items-center relative group min-w-[160px]"
            >
              <div className="aspect-[2254/2254] overflow-clip relative w-full shrink-0 select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                <div className="-translate-x-1/2 absolute left-1/2 size-[280px] top-0 overflow-hidden">
                  <img
                    src={island.islandImg}
                    alt={`${island.nameLine1} ${island.nameLine2}`}
                    className={island.cropClass}
                  />
                </div>
              </div>

              <div className={`absolute bottom-0 h-[142px] ${island.leftOffset} -translate-x-[50%] ${island.width} z-20`}>
                <div className="absolute left-[50%] -translate-x-[50%] size-[60px] top-[3px] select-none pointer-events-none drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <div className="absolute left-1/2 -translate-x-1/2 top-[8.33%] bottom-[8.33%] aspect-[14.4865/20]">
                    <img src={island.pinImg} alt="" className="w-full h-full object-contain" />
                  </div>
                  <img src={island.dotImg} alt="" className="absolute left-[20px] top-[12.5px] size-[20px] object-contain" />
                </div>
                <div className="absolute bg-white flex flex-col items-center justify-center px-[20px] py-[12px] rounded-[100px] top-[54px] left-1/2 -translate-x-1/2 w-max min-w-[110px] max-w-[140px] border border-gray-100 shadow-md cursor-pointer select-none h-[88px]">
                  <div className={`flex flex-col items-center justify-center font-baloo text-[16px] font-bold text-center leading-[22px] not-italic ${island.textColor}`}>
                    <span className="whitespace-nowrap block">{island.nameLine1}</span>
                    <span className="whitespace-nowrap block">{island.nameLine2}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
