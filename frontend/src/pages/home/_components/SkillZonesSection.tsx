import { useEffect, useRef, useState } from 'react'
import SkillZoneDesktopCard from './SkillZoneDesktopCard'
import SkillZoneMobileSlide from './SkillZoneMobileSlide'
import { skillZoneIslands } from './skillZoneData'

const desktopVisibilityClasses = [
  'flex',
  'flex',
  'hidden lg:flex',
  'hidden xl:flex',
  'hidden xl:flex',
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
      <div className="bg-[#f2fbef] flex flex-col gap-[16px] sm:gap-[24px] items-start p-[16px] sm:p-[24px] rounded-[24px] relative w-full overflow-hidden shadow-lg border border-gray-100 min-h-[420px] md:min-h-0 md:aspect-[1824/760] lg:h-auto lg:aspect-[1824/440]">
        <div className="absolute inset-0 w-full h-full z-0">
          <img width="2090" height="682" loading="lazy" decoding="async"
            src="/assets/33efcd0a6cadb8258948d753e0545715b83e8b64.webp"
            alt="Adventure Map Background"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        <div className="relative z-10 w-full md:absolute md:left-4 md:top-4 md:w-[320px] lg:left-6 lg:top-6 lg:w-[280px] xl:w-[clamp(320px,30vw,607px)]">
          <div className="flex gap-2 sm:gap-[12px] items-center w-full bg-white/85 backdrop-blur-sm px-3 md:px-3.5 xl:px-4 py-2 md:py-2.5 rounded-2xl border border-[#c3ffd0]/60 shadow-sm select-none">
            <img width="48" height="48" loading="lazy" decoding="async"
              src="/assets/5a9453f78ced6122636cc3fcfc9d7d132cd3f8e7.svg"
              alt="Map icon"
              className="size-[34px] md:size-[38px] xl:size-[48px] object-contain shrink-0"
            />
            <div className="flex flex-col items-start leading-none min-w-0">
              <h2 className="font-baloo text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-bold text-[#6c04ee] leading-[24px] md:leading-[28px] lg:leading-[30px] xl:leading-[40px] md:whitespace-nowrap">
                Bản đồ phiêu lưu
              </h2>
              <p className="text-[#575e70] text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] xl:text-[16px] leading-[18px] sm:leading-[20px] lg:leading-[22px] xl:leading-[24px] font-medium font-vietnam mt-0.5 max-w-[220px] sm:max-w-[320px] md:max-w-none">
                Cùng Ottopia khám phá tất cả các vùng đất trên bản đồ kỳ diệu
              </p>
            </div>
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

        <div className="hidden md:flex justify-center relative z-10 w-full shrink-0 pt-[76px] md:pb-1 md:mt-auto lg:absolute lg:left-0 lg:right-0 lg:top-[60%] lg:-translate-y-1/2 lg:mt-0 lg:pt-0 lg:pb-0 xl:top-[59%]">
          <div
            className="flex justify-center gap-1.5 lg:gap-3 xl:gap-[24px] items-end w-full px-0 lg:px-2 xl:px-4 origin-center"
            style={{ transform: 'scale(clamp(0.72, calc(100vw / 1500), 1))' }}
          >
            {skillZoneIslands.map((island, index) => (
              <SkillZoneDesktopCard key={index} island={island} className={desktopVisibilityClasses[index] ?? 'hidden'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
