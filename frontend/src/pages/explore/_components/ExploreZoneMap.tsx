import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const DESIGN_WIDTH = 1824
const DESIGN_HEIGHT = 1026

const imgBg      = "/assets/explore_cover_banner.png"
const imgProgress = "/assets/85904cccae7efdb562125190683cf78c2060ace9.png"
const imgLessons  = "/assets/da92cb5be6e6e4fd040e85fdada518f2ece5db3e.png"
const imgReward   = "/assets/6fc943659db657cb5653210363b1d069170f406f.png"
const imgStar  = "/assets/cde3881a9b58bf8553a83885dd1c801f88523421.svg"
const imgArrow = "/assets/842266eec31c7f827059850d5346f69745e98d74.svg"

const zones = [
  { name: 'Vùng Đất\nCảm Xúc',    desc: 'Nhận biết, hiểu rõ và gọi tên cảm xúc',          color: '#339e4a', img: "/assets/vung_dat_cam_xuc_island.png" },
  { name: 'Khu Vườn\nBạn Bè',      desc: 'Nuôi dưỡng sẻ chia, quan tâm, hợp tác.',          color: '#e55c72', img: "/assets/khu_vuon_ban_be_island.png" },
  { name: 'Thành Phố\nGiao Tiếp',  desc: 'Rèn luyện giao tiếp, lắng nghe và tự tin.',       color: '#0a7ad8', img: "/assets/thanh_pho_giao_tiep_island.png" },
  { name: 'Ngôi Làng\nTự Lập',     desc: 'Học cách tự chăm sóc bản thân và tự lập.',        color: '#fea01f', img: "/assets/ngoi_lang_tu_lap_island.png" },
  { name: 'Hành Tinh\nTình Huống', desc: 'Khám phá tình huống thực tế, đưa ra lựa chọn.',   color: '#9560d8', img: "/assets/hanh_tinh_tinh_huong_island.png" },
]

interface ZoneCardProps {
  zone: typeof zones[0]
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

function ZoneCard({ zone, isHovered, onHoverStart, onHoverEnd, onClick, className, style }: ZoneCardProps) {
  return (
    <div
      className={`bg-white rounded-[20px] xl:rounded-[24px] flex gap-2.5 items-center p-2.5 xl:p-3 shrink-0 cursor-pointer hover:scale-[1.02] transition-all duration-200 ${className || 'w-[320px]'}`}
      style={{
        boxShadow: isHovered
          ? `0px 0px 18px ${zone.color}`
          : '0px 0px 5px rgba(0,76,110,0.6)',
        ...style,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="relative shrink-0 w-[75px] h-[75px] xl:w-[120px] xl:h-[120px] flex items-center justify-center">
        <img src={zone.img} alt="" className="w-full h-full object-contain pointer-events-none select-none" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p
          className="font-baloo text-[15px] leading-[20px] xl:text-[22px] xl:leading-[34px] font-bold whitespace-pre-line"
          style={{ color: zone.color }}
        >
          {zone.name}
        </p>
        <p className="font-vietnam text-[11px] leading-[15px] xl:text-[13px] xl:leading-[20px] text-[#37393e] line-clamp-2">{zone.desc}</p>
      </div>
      <div
        className="shrink-0 w-6 h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center transition-transform duration-200"
        style={{
          backgroundColor: zone.color,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <img src={imgArrow} alt="" className="w-3 h-3 xl:w-4 xl:h-4" />
      </div>
    </div>
  )
}

const GRADIENTS = [
  'from-[#93cbee] via-[#e0f2fe] to-white', // Bright sky blue shadow
  'from-[#b4c6e7] via-[#f1f5f9] to-white', // Greyish/lavender shadow
  'from-[#7dd3fc] via-[#f0f9ff] to-white', // Light sky blue shadow
]

const DRIFTING_CLOUDS = [
  // Background clouds (zIndex: 1, speed: 110s - 160s, opacity: 0.3 - 0.48)
  { top: 60,  width: 80,  height: 20, speed: 140, delay: -10,  zIndex: 1, opacity: 0.35, type: 'A', gradIdx: 0 },
  { top: 100, width: 110, height: 28, speed: 120, delay: -45,  zIndex: 1, opacity: 0.40, type: 'B', gradIdx: 1 },
  { top: 140, width: 95,  height: 24, speed: 150, delay: -80,  zIndex: 1, opacity: 0.30, type: 'C', gradIdx: 2 },
  { top: 180, width: 120, height: 30, speed: 110, delay: -25,  zIndex: 1, opacity: 0.45, type: 'A', gradIdx: 0 },
  { top: 220, width: 85,  height: 21, speed: 160, delay: -110, zIndex: 1, opacity: 0.35, type: 'B', gradIdx: 1 },
  { top: 260, width: 105, height: 26, speed: 130, delay: -60,  zIndex: 1, opacity: 0.40, type: 'C', gradIdx: 2 },
  { top: 300, width: 90,  height: 22, speed: 145, delay: -15,  zIndex: 1, opacity: 0.30, type: 'A', gradIdx: 0 },
  { top: 340, width: 115, height: 29, speed: 125, delay: -75,  zIndex: 1, opacity: 0.42, type: 'B', gradIdx: 1 },
  { top: 380, width: 100, height: 25, speed: 135, delay: -125, zIndex: 1, opacity: 0.38, type: 'C', gradIdx: 2 },
  { top: 420, width: 125, height: 31, speed: 115, delay: -35,  zIndex: 1, opacity: 0.48, type: 'A', gradIdx: 0 },
  { top: 460, width: 90,  height: 22, speed: 155, delay: -95,  zIndex: 1, opacity: 0.35, type: 'B', gradIdx: 1 },
  { top: 500, width: 110, height: 28, speed: 125, delay: -50,  zIndex: 1, opacity: 0.40, type: 'C', gradIdx: 2 },
  { top: 540, width: 80,  height: 20, speed: 150, delay: -130, zIndex: 1, opacity: 0.30, type: 'A', gradIdx: 0 },
  { top: 580, width: 120, height: 30, speed: 120, delay: -20,  zIndex: 1, opacity: 0.45, type: 'B', gradIdx: 1 },
  { top: 620, width: 95,  height: 24, speed: 140, delay: -85,  zIndex: 1, opacity: 0.35, type: 'C', gradIdx: 2 },
  { top: 660, width: 105, height: 26, speed: 130, delay: -40,  zIndex: 1, opacity: 0.40, type: 'A', gradIdx: 0 },
  { top: 700, width: 115, height: 29, speed: 125, delay: -105, zIndex: 1, opacity: 0.42, type: 'B', gradIdx: 1 },
  { top: 740, width: 85,  height: 21, speed: 160, delay: -70,  zIndex: 1, opacity: 0.30, type: 'C', gradIdx: 2 },

  // Foreground clouds (zIndex: 3, speed: 75s - 100s, opacity: 0.58 - 0.7)
  { top: 120, width: 130, height: 32, speed: 85,  delay: -30,  zIndex: 3, opacity: 0.65, type: 'A', gradIdx: 0 },
  { top: 250, width: 110, height: 28, speed: 95,  delay: -70,  zIndex: 3, opacity: 0.60, type: 'B', gradIdx: 1 },
  { top: 370, width: 140, height: 35, speed: 80,  delay: -15,  zIndex: 3, opacity: 0.70, type: 'C', gradIdx: 2 },
  { top: 490, width: 125, height: 31, speed: 90,  delay: -55,  zIndex: 3, opacity: 0.62, type: 'A', gradIdx: 0 },
  { top: 610, width: 135, height: 34, speed: 75,  delay: -115, zIndex: 3, opacity: 0.65, type: 'B', gradIdx: 1 },
  { top: 730, width: 115, height: 29, speed: 100, delay: -40,  zIndex: 3, opacity: 0.58, type: 'C', gradIdx: 2 },
]

function getCloudPuffs(type: string, gradientClass: string) {
  switch (type) {
    case 'B':
      return (
        <>
          <div className={`absolute rounded-full w-[80%] h-[55%] left-[10%] bottom-[5%] bg-gradient-to-t ${gradientClass} opacity-95`} />
          <div className={`absolute rounded-full w-[35%] h-[80%] left-[25%] bottom-[12%] bg-gradient-to-t ${gradientClass}`} />
          <div className={`absolute rounded-full w-[40%] h-[75%] right-[20%] bottom-[10%] bg-gradient-to-t ${gradientClass} opacity-90`} />
          <div className={`absolute rounded-full w-[25%] h-[60%] left-[5%] bottom-[8%] bg-gradient-to-t ${gradientClass} opacity-90`} />
        </>
      )
    case 'C':
      return (
        <>
          <div className={`absolute rounded-full w-[70%] h-[75%] left-[15%] bottom-[5%] bg-gradient-to-t ${gradientClass} opacity-95`} />
          <div className={`absolute rounded-full w-[45%] h-[95%] left-[28%] bottom-[15%] bg-gradient-to-t ${gradientClass}`} />
          <div className={`absolute rounded-full w-[35%] h-[70%] left-[8%] bottom-[8%] bg-gradient-to-t ${gradientClass} opacity-90`} />
          <div className={`absolute rounded-full w-[40%] h-[80%] right-[12%] bottom-[10%] bg-gradient-to-t ${gradientClass} opacity-90`} />
        </>
      )
    case 'A':
    default:
      return (
        <>
          <div className={`absolute rounded-full w-[65%] h-[70%] left-[18%] bottom-[5%] bg-gradient-to-t ${gradientClass} opacity-95`} />
          <div className={`absolute rounded-full w-[42%] h-[85%] left-[5%] bottom-[8%] bg-gradient-to-t ${gradientClass} opacity-90`} />
          <div className={`absolute rounded-full w-[48%] h-[90%] left-[26%] bottom-[12%] bg-gradient-to-t ${gradientClass}`} />
          <div className={`absolute rounded-full w-[45%] h-[78%] right-[5%] bottom-[6%] bg-gradient-to-t ${gradientClass} opacity-90`} />
        </>
      )
  }
}

export default function ExploreZoneMap() {
  const navigate = useNavigate()
  const [hoveredZoneIdx, setHoveredZoneIdx] = useState<number | null>(null)
  const [activeZoneIdx, setActiveZoneIdx] = useState<number>(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(DESIGN_HEIGHT)

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        const wScale = wrapperRef.current.offsetWidth / DESIGN_WIDTH
        setScale(wScale)
        setHeight(wrapperRef.current.offsetHeight)
      }
    }
    update()
    const timer = setTimeout(update, 50)
    window.addEventListener('resize', update)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Absolute positioning bounds matching Figma Rectangle nodes (1824 x 1026 layout space)
  const islands = [
    { zoneIdx: 0, img: "/assets/vung_dat_cam_xuc_island.png", left: 342, top: 227, width: 350, height: 317, delay: '0s', color: '#339e4a' },
    { zoneIdx: 1, img: "/assets/khu_vuon_ban_be_island.png", left: 709, top: 552, width: 400, height: 313, delay: '0.6s', color: '#e55c72' },
    { zoneIdx: 2, img: "/assets/thanh_pho_giao_tiep_island.png", left: 758, top: 68, width: 248, height: 248, delay: '1.2s', color: '#0a7ad8' },
    { zoneIdx: 3, img: "/assets/ngoi_lang_tu_lap_island.png", left: 1205, top: 123, width: 288, height: 271, delay: '1.8s', color: '#fea01f' },
    { zoneIdx: 4, img: "/assets/hanh_tinh_tinh_huong_island.png", left: 1122, top: 445, width: 350, height: 276, delay: '0.9s', color: '#9560d8' },
  ]

  const handleNavigate = () => {
    navigate('/courses')
  }

  const vScale = scale > 0 ? (height / scale) / DESIGN_HEIGHT : 1
  const mobileScale = 0.75

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return

      const island = islands.find(isl => isl.zoneIdx === activeZoneIdx)
      if (!island) return

      // Center of the island in original coordinates
      const X_c = island.left + island.width / 2
      const Y_c = island.top + island.height / 2

      // Center of the island in scaled coordinates
      const X_scaled = X_c * mobileScale
      const Y_scaled = Y_c * mobileScale

      // Viewport dimensions of the scroll container
      const W_v = container.clientWidth
      const H_v = container.clientHeight

      container.scrollTo({
        left: X_scaled - W_v / 2,
        top: Y_scaled - H_v / 2,
        behavior: 'smooth'
      })
    }

    const timer = setTimeout(handleScroll, 150)
    return () => clearTimeout(timer)
  }, [activeZoneIdx])

  useEffect(() => {
    const cardContainer = cardContainerRef.current
    if (!cardContainer) return

    const activeCard = cardContainer.children[activeZoneIdx] as HTMLElement
    if (!activeCard) return

    const containerWidth = cardContainer.clientWidth
    const cardWidth = activeCard.clientWidth
    const cardLeft = activeCard.offsetLeft

    cardContainer.scrollTo({
      left: cardLeft - (containerWidth - cardWidth) / 2,
      behavior: 'smooth'
    })
  }, [activeZoneIdx])

  return (
    <section className="px-4 xl:px-[48px] w-full h-full flex flex-col">
      {/* Keyframe animation stylesheet for drifting clouds */}
      <style>{`
        @keyframes drift {
          0% {
            transform: translateX(-400px);
          }
          100% {
            transform: translateX(2000px);
          }
        }
        .animate-drift {
          animation: drift linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* SVG Filters for realistic fluffy cloud edges */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <defs>
          <filter id="cloud-filter-back">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="cloud-filter-front">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* MOBILE LAYOUT (xl:hidden) */}
      <div className="flex flex-col gap-6 xl:hidden w-full pb-8">
        {/* Title */}
        <div className="flex flex-col items-center justify-center text-center gap-1.5 mt-2">
          <div className="flex items-center gap-2">
            <img src={imgStar} alt="" className="w-6 h-6 animate-pulse" />
            <h1 className="font-baloo font-bold text-[24px] text-[#004c6e] leading-[36px]">
              Khám phá 5 vùng đất
            </h1>
            <img src={imgStar} alt="" className="w-6 h-6 animate-pulse" />
          </div>
          <p className="font-vietnam text-[13px] text-[#004c6e] leading-[18px]">
            Mỗi vùng đất là một hành trình giúp bé học và trưởng thành hơn mỗi ngày
          </p>
        </div>

        {/* Square Map Container */}
        <div className="w-full aspect-square max-w-[400px] mx-auto relative rounded-[24px] overflow-hidden shadow-lg bg-[#93cbee]">
          {/* Scrollable Viewport */}
          <div
            ref={scrollContainerRef}
            className="w-full h-full overflow-auto scroll-smooth scrollbar-none"
          >
            {/* The scaled map canvas */}
            <div
              className="relative"
              style={{
                width: DESIGN_WIDTH * mobileScale,
                height: DESIGN_HEIGHT * mobileScale,
              }}
            >
              {/* Scale wrapper */}
              <div
                className="absolute"
                style={{
                  width: DESIGN_WIDTH,
                  height: DESIGN_HEIGHT,
                  transform: `scale(${mobileScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <img
                  src={imgBg}
                  alt=""
                  className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none"
                />

                {/* Clouds */}
                {DRIFTING_CLOUDS.map((cloud, idx) => {
                  const isBack = cloud.zIndex === 1;
                  const filterId = isBack ? 'url(#cloud-filter-back)' : 'url(#cloud-filter-front)';
                  const blurVal = isBack ? '3px' : '2px';
                  const shadowColor = isBack ? 'rgba(0, 50, 80, 0.12)' : 'rgba(0, 50, 80, 0.08)';
                  const gradientClass = GRADIENTS[cloud.gradIdx];

                  return (
                    <div
                      key={idx}
                      className="absolute animate-drift pointer-events-none select-none"
                      style={{
                        top: cloud.top + 50,
                        width: cloud.width,
                        height: cloud.height,
                        zIndex: cloud.zIndex,
                        opacity: cloud.opacity,
                        filter: `${filterId} blur(${blurVal}) drop-shadow(0 6px 12px ${shadowColor})`,
                        animationDuration: `${cloud.speed}s`,
                        animationDelay: `${cloud.delay}s`,
                      }}
                    >
                      {getCloudPuffs(cloud.type, gradientClass)}
                    </div>
                  );
                })}

                {/* Islands */}
                {islands.map((island, i) => {
                  const isActive = activeZoneIdx === island.zoneIdx
                  const isHovered = hoveredZoneIdx === island.zoneIdx
                  return (
                    <div
                      key={i}
                      className="absolute animate-float cursor-pointer transition-all duration-300 select-none"
                      style={{
                        left: island.left,
                        top: island.top,
                        width: island.width,
                        height: island.height,
                        zIndex: 2,
                        animationDelay: island.delay,
                        filter: (isActive || isHovered)
                          ? `drop-shadow(0 0 35px ${island.color})`
                          : 'drop-shadow(0 10px 15px rgba(0, 40, 70, 0.25))',
                        transform: (isActive || isHovered) ? 'scale(1.1) translateY(-6px)' : 'scale(1)',
                      }}
                      onClick={() => {
                        if (isActive) {
                          handleNavigate()
                        } else {
                          setActiveZoneIdx(island.zoneIdx)
                        }
                      }}
                    >
                      <img
                        src={island.img}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                          position: 'relative',
                          zIndex: 2,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* List of Cards below the map */}
        <div
          ref={cardContainerRef}
          className="flex flex-row gap-4 overflow-x-auto pt-3 pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory px-4 -mx-4"
        >
          {zones.map((zone, idx) => {
            const isActive = activeZoneIdx === idx
            return (
              <div key={idx} className="snap-center shrink-0">
                <ZoneCard
                  zone={zone}
                  isHovered={isActive}
                  onHoverStart={() => {}}
                  onHoverEnd={() => {}}
                  onClick={() => {
                    if (isActive) {
                      handleNavigate()
                    } else {
                      setActiveZoneIdx(idx)
                    }
                  }}
                  className="w-[245px] border-2 transition-all duration-300"
                  style={{
                    borderColor: isActive ? zone.color : '#e2e8f0',
                    boxShadow: isActive ? `0px 4px 20px ${zone.color}33` : '0px 2px 8px rgba(0,0,0,0.05)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Stats Row for Mobile */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Progress */}
          <div className="bg-white rounded-[24px] flex gap-4 items-center p-4 shadow-sm border border-slate-100">
            <div className="bg-[#f7f6f8] rounded-[40px] p-2 shrink-0 w-14 h-14 flex items-center justify-center">
              <img src={imgProgress} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <p className="font-baloo font-bold text-[18px] text-[#004c6e] leading-[24px]">
                Tiến trình khám phá
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3.5 bg-[#f0f2f4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#fdd444] rounded-full w-4/5" />
                </div>
                <span className="font-vietnam text-[14px] text-[#004c6e] whitespace-nowrap font-bold">80%</span>
              </div>
            </div>
          </div>

          {/* Lessons & Rewards Side-by-Side or row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Lessons */}
            <div className="bg-white rounded-[24px] flex gap-4 items-center p-4 shadow-sm border border-slate-100">
              <div className="bg-[#f7f6f8] rounded-[40px] p-2 shrink-0 w-14 h-14 flex items-center justify-center">
                <img src={imgLessons} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <p className="font-baloo font-bold text-[20px] text-[#004c6e] leading-[28px]">15/25</p>
                <p className="font-vietnam text-[14px] text-[#004c6e]">Bài học đã hoàn thành</p>
              </div>
            </div>

            {/* Rewards */}
            <div
              className="bg-white rounded-[24px] flex gap-4 items-center p-4 shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition-transform"
              onClick={handleNavigate}
            >
              <div className="bg-[#f7f6f8] rounded-[40px] p-2 shrink-0 w-14 h-14 flex items-center justify-center">
                <img src={imgReward} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col">
                <p className="font-baloo font-bold text-[20px] text-[#004c6e] leading-[28px]">Phần thưởng</p>
                <p className="font-vietnam text-[13px] text-[#004c6e] leading-[18px]">
                  Thu thập sao nhận phần thưởng
                </p>
              </div>
              <div className="bg-[#0a7ad8] w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <img src={imgArrow} alt="" className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT (hidden xl:block) */}
      <div ref={wrapperRef} className="w-full flex-1 min-h-0 hidden xl:block">
        {/* Container — scaled from 1824 × 1026px design */}
        <div
          className="relative rounded-[24px] overflow-hidden shadow-2xl bg-[#93cbee]"
          style={{
            width: DESIGN_WIDTH,
            height: scale > 0 ? height / scale : DESIGN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        >
          {/* ── Background: exact Figma sizing (1824 × 1026) ── */}
          <img
            src={imgBg}
            alt=""
            className="absolute left-0 pointer-events-none select-none w-full object-cover"
            style={{
              top: -50,
              height: 'calc(100% + 100px)',
              transform: 'translateY(50px)',
            }}
          />

          {/* ── Drifting clouds (independent horizontal movement) ── */}
          {DRIFTING_CLOUDS.map((cloud, idx) => {
            const isBack = cloud.zIndex === 1;
            const filterId = isBack ? 'url(#cloud-filter-back)' : 'url(#cloud-filter-front)';
            const blurVal = isBack ? '3px' : '2px';
            const shadowColor = isBack ? 'rgba(0, 50, 80, 0.12)' : 'rgba(0, 50, 80, 0.08)';
            const gradientClass = GRADIENTS[cloud.gradIdx];

            return (
              <div
                key={idx}
                className="absolute animate-drift pointer-events-none select-none"
                style={{
                  top: (cloud.top * vScale) + 50,
                  width: cloud.width,
                  height: cloud.height,
                  zIndex: cloud.zIndex,
                  opacity: cloud.opacity,
                  filter: `${filterId} blur(${blurVal}) drop-shadow(0 6px 12px ${shadowColor})`,
                  animationDuration: `${cloud.speed}s`,
                  animationDelay: `${cloud.delay}s`,
                }}
              >
                {getCloudPuffs(cloud.type, gradientClass)}
              </div>
            );
          })}

          {/* ── Island decorative overlays ── */}
          {islands.map((island, i) => {
            const isHovered = hoveredZoneIdx === island.zoneIdx
            return (
              <div
                key={i}
                className="absolute animate-float cursor-pointer transition-all duration-300 select-none"
                style={{
                  left: island.left,
                  top: island.top * vScale,
                  width: island.width,
                  height: island.height,
                  zIndex: 2,
                  animationDelay: island.delay,
                  filter: isHovered
                    ? `drop-shadow(0 0 25px ${island.color})`
                    : 'drop-shadow(0 10px 15px rgba(0, 40, 70, 0.25))',
                  transform: isHovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
                }}
                onMouseEnter={() => setHoveredZoneIdx(island.zoneIdx)}
                onMouseLeave={() => setHoveredZoneIdx(null)}
                onClick={handleNavigate}
              >
                {/* Island image */}
                <img
                  src={island.img}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    position: 'relative',
                    zIndex: 2,
                  }}
                />
              </div>
            )
          })}

          {/* ── Content layer (z-10, above islands) ── */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col justify-between"
            style={{ zIndex: 10, top: 50, padding: '32px 24px 24px 24px', gap: 24 }}
          >
            {/* Title — Figma: y=24, h=80 */}
            <div className="flex flex-col items-center justify-center" style={{ height: 80, transform: 'translateY(-60px)' }}>
              <div className="flex items-center gap-4">
                <img src={imgStar} alt="" className="w-8 h-8" />
                <h1 className="font-baloo font-bold text-[32px] text-[#004c6e] leading-[56px]">
                  Khám phá 5 vùng đất
                </h1>
                <img src={imgStar} alt="" className="w-8 h-8" />
              </div>
              <p className="font-vietnam text-[16px] text-[#004c6e] text-center leading-[24px]">
                Mỗi vùng đất là một hành trình giúp bé học và trưởng thành hơn mỗi ngày
              </p>
            </div>

            {/* Zone cards */}
            <div
              className="flex-1 flex items-center justify-between pointer-events-none min-h-0"
            >
              {/* Left Column (Zone 0 & 1) */}
              <div className="flex flex-col gap-[24px] pointer-events-auto">
                <ZoneCard
                  zone={zones[0]}
                  isHovered={hoveredZoneIdx === 0}
                  onHoverStart={() => setHoveredZoneIdx(0)}
                  onHoverEnd={() => setHoveredZoneIdx(null)}
                  onClick={handleNavigate}
                />
                <ZoneCard
                  zone={zones[1]}
                  isHovered={hoveredZoneIdx === 1}
                  onHoverStart={() => setHoveredZoneIdx(1)}
                  onHoverEnd={() => setHoveredZoneIdx(null)}
                  onClick={handleNavigate}
                />
              </div>

              {/* Right Column (Zone 2, 3 & 4) */}
              <div className="flex flex-col gap-[24px] pointer-events-auto">
                <ZoneCard
                  zone={zones[2]}
                  isHovered={hoveredZoneIdx === 2}
                  onHoverStart={() => setHoveredZoneIdx(2)}
                  onHoverEnd={() => setHoveredZoneIdx(null)}
                  onClick={handleNavigate}
                />
                <ZoneCard
                  zone={zones[3]}
                  isHovered={hoveredZoneIdx === 3}
                  onHoverStart={() => setHoveredZoneIdx(3)}
                  onHoverEnd={() => setHoveredZoneIdx(null)}
                  onClick={handleNavigate}
                />
                <ZoneCard
                  zone={zones[4]}
                  isHovered={hoveredZoneIdx === 4}
                  onHoverStart={() => setHoveredZoneIdx(4)}
                  onHoverEnd={() => setHoveredZoneIdx(null)}
                  onClick={handleNavigate}
                />
              </div>
            </div>

            {/* Stats row — h=104 */}
            <div className="flex gap-[24px] shrink-0" style={{ height: 104 }}>

              {/* Tiến trình */}
              <div
                className="flex-1 bg-white rounded-[24px] flex gap-4 items-center px-4"
                style={{ boxShadow: '0px 0px 5px rgba(0,76,110,0.6)' }}
              >
                <div className="bg-[#f7f6f8] rounded-[40px] p-2 shrink-0 w-16 h-16 flex items-center justify-center">
                  <img src={imgProgress} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-baloo font-bold text-[20px] text-[#004c6e] leading-[28px]">
                    Tiến trình khám phá
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-5 bg-[#f0f2f4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#fdd444] rounded-full w-4/5" />
                    </div>
                    <span className="font-vietnam text-[16px] text-[#004c6e] whitespace-nowrap">80%</span>
                  </div>
                </div>
              </div>

              {/* Bài học */}
              <div
                className="flex-1 bg-white rounded-[24px] flex gap-4 items-center px-4"
                style={{ boxShadow: '0px 0px 5px rgba(0,76,110,0.6)' }}
              >
                <div className="bg-[#f7f6f8] rounded-[40px] p-2 shrink-0 w-16 h-16 flex items-center justify-center">
                  <img src={imgLessons} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-baloo font-bold text-[24px] text-[#004c6e] leading-[40px]">15/25</p>
                  <p className="font-vietnam text-[16px] text-[#004c6e]">Bài học đã hoàn thành</p>
                </div>
              </div>

              {/* Phần thưởng */}
              <div
                className="flex-1 bg-white rounded-[24px] flex gap-4 items-center px-4 cursor-pointer hover:scale-[1.01] transition-transform"
                style={{ boxShadow: '0px 0px 5px rgba(0,76,110,0.6)' }}
                onClick={handleNavigate}
              >
                <div className="bg-[#f7f6f8] rounded-[40px] p-2 shrink-0 w-16 h-16 flex items-center justify-center">
                  <img src={imgReward} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-baloo font-bold text-[24px] text-[#004c6e] leading-[40px]">Phần thưởng</p>
                  <p className="font-vietnam text-[16px] text-[#004c6e]">
                    Thu thập sao để nhận phần thưởng hấp dẫn
                  </p>
                </div>
                <div className="bg-[#0a7ad8] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <img src={imgArrow} alt="" className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>{/* end measure wrapper */}
    </section>
  )
}
