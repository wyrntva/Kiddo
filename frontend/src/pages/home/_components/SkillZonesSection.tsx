import { useEffect, useRef, useState } from 'react'
import SkillZoneDesktopCard from './SkillZoneDesktopCard'
import SkillZoneMobileSlide from './SkillZoneMobileSlide'
import { skillZoneIslands } from './skillZoneData'

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
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/assets/33efcd0a6cadb8258948d753e0545715b83e8b64.webp"
            alt="Adventure Map Background"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

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

        <div className="md:hidden relative z-10 w-full shrink-0">
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {skillZoneIslands.map((island, index) => (
              <SkillZoneMobileSlide key={index} island={island} />
            ))}
          </div>

          <div className="flex gap-[8px] items-center justify-center w-full mt-3 pb-1">
            {skillZoneIslands.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === activeIdx ? 'w-[20px] h-[7px] bg-white' : 'size-[7px] bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex gap-[24px] items-start relative z-10 w-full px-4 shrink-0 pb-6">
          {skillZoneIslands.map((island, index) => (
            <SkillZoneDesktopCard key={index} island={island} />
          ))}
        </div>
      </div>
    </section>
  )
}
