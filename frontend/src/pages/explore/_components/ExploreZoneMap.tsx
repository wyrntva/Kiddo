const imgBg      = "/assets/e94d886415022da265290d8e31f5b28fde251515.png"
const imgIsland1 = "/assets/cd8d6407ff6da486e6c19f5f7fa0dbf28e059a91.png"
const imgIsland2 = "/assets/fa96937bdcc218b926f614f2c9506c6ef151e2a5.png"
const imgProgress = "/assets/85904cccae7efdb562125190683cf78c2060ace9.png"
const imgLessons  = "/assets/da92cb5be6e6e4fd040e85fdada518f2ece5db3e.png"
const imgReward   = "/assets/6fc943659db657cb5653210363b1d069170f406f.png"
const imgStar  = "/assets/cde3881a9b58bf8553a83885dd1c801f88523421.svg"
const imgArrow = "/assets/842266eec31c7f827059850d5346f69745e98d74.svg"

/**
 * Island decorative overlays — Figma node 34:4601 (1824 × 914px container)
 * Background image is 1960px wide, centered → extends 68px beyond each side.
 * left/width as % of 1824px container; top in px (container has fixed 914px height).
 *
 * Sizes reduced to ~60% of raw Figma values so they read as accents, not blocks.
 * (Raw: 350, 380, 350, 500, 450 → scaled: 210, 228, 210, 300, 270)
 */
// left: calc(figma% + 20px shift right), staggered float delay per island
const ISLANDS = [
  { img: imgIsland1, left: 'calc(19.9% + 50px)', top: 166, size: 308, delay: '0s' },
  { img: imgIsland1, left: 'calc(37.5% + 50px)', top: 136, size: 334, delay: '0.6s' },
  { img: imgIsland1, left: 'calc(59.3% + 50px)', top:  77, size: 308, delay: '1.2s' },
  { img: imgIsland2, left: 'calc(17.4% + 50px)', top: 404, size: 440, delay: '1.8s' },
  { img: imgIsland1, left: 'calc(46.8% + 50px)', top: 336, size: 396, delay: '0.9s' },
]

const zones = [
  { name: 'Vùng Đất\nCảm Xúc',    desc: 'Nhận biết, hiểu rõ và gọi tên cảm xúc',          color: '#339e4a', img: imgIsland1 },
  { name: 'Khu Vườn\nBạn Bè',      desc: 'Nuôi dưỡng sẻ chia, quan tâm, hợp tác.',          color: '#e55c72', img: imgIsland2 },
  { name: 'Thành Phố\nGiao Tiếp',  desc: 'Rèn luyện giao tiếp, lắng nghe và tự tin.',       color: '#0a7ad8', img: imgIsland1 },
  { name: 'Ngôi Làng\nTự Lập',     desc: 'Học cách tự chăm sóc bản thân và tự lập.',        color: '#fdd444', img: imgIsland1 },
  { name: 'Hành Tinh\nTình Huống', desc: 'Khám phá tình huống thực tế, đưa ra lựa chọn.',   color: '#9560d8', img: imgIsland1 },
]

function ZoneCard({ zone }: { zone: typeof zones[0] }) {
  return (
    <div
      className="bg-white rounded-[24px] flex gap-2 items-center p-3 w-[320px] shrink-0 cursor-pointer hover:scale-[1.02] transition-all duration-200"
      style={{ boxShadow: '0px 0px 5px rgba(0,76,110,0.6)' }}
    >
      <div className="relative shrink-0 w-[120px] h-[120px] rounded-[12px] overflow-hidden">
        <img src={zone.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p
          className="font-baloo text-[22px] leading-[34px] font-bold whitespace-pre-line"
          style={{ color: zone.color }}
        >
          {zone.name}
        </p>
        <p className="font-vietnam text-[13px] text-[#37393e] leading-[20px]">{zone.desc}</p>
      </div>
      <div
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: zone.color }}
      >
        <img src={imgArrow} alt="" className="w-4 h-4" />
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
  return (
    <section className="px-12">
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

      {/* Container — Figma: 1824 × 914px */}
      <div
        className="relative rounded-[24px] overflow-hidden"
        style={{ height: 854 }}
      >
        {/* ── Background: exact Figma sizing (1960 × 1010, centered, top-0) ── */}
        <img
          src={imgBg}
          alt=""
          className="absolute top-0 pointer-events-none select-none"
          style={{
            width: 1960,
            height: 1010,
            left: '50%',
            transform: 'translateX(-50%)',
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
                top: cloud.top,
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
        {ISLANDS.map((island, i) => (
          <div
            key={i}
            className="absolute animate-float pointer-events-none select-none"
            style={{
              left: island.left,
              top: island.top,
              width: island.size,
              zIndex: 2,
              animationDelay: island.delay,
            }}
          >
            {/* Island image */}
            <img
              src={island.img}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 2,
              }}
            />
          </div>
        ))}

        {/* ── Content layer (z-10, above islands) ── */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{ zIndex: 10, padding: 24, gap: 24 }}
        >
          {/* Title — Figma: y=24, h=80 */}
          <div className="flex flex-col items-center justify-center" style={{ height: 80 }}>
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

          {/* Zone cards — Figma: 34:4922, h=634, py=24, justify-between */}
          <div
            className="flex items-center justify-between"
            style={{ height: 574, paddingTop: 24, paddingBottom: 24 }}
          >
            {/* Left: 2 cards, h=376, justify-between */}
            <div className="flex flex-col justify-between" style={{ height: 316 }}>
              <ZoneCard zone={zones[0]} />
              <ZoneCard zone={zones[1]} />
            </div>

            {/* Right: 3 cards, gap=23px */}
            <div className="flex flex-col gap-[23px]">
              <ZoneCard zone={zones[2]} />
              <ZoneCard zone={zones[3]} />
              <ZoneCard zone={zones[4]} />
            </div>
          </div>

          {/* Stats row — Figma: 34:4898, h=104 */}
          <div className="grid grid-cols-3 gap-6" style={{ height: 104 }}>

            {/* Tiến trình */}
            <div
              className="bg-white rounded-[24px] flex gap-4 items-center px-4"
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
              className="bg-white rounded-[24px] flex gap-4 items-center px-4"
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
              className="bg-white rounded-[24px] flex gap-4 items-center px-4"
              style={{ boxShadow: '0px 0px 5px rgba(0,76,110,0.6)' }}
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
    </section>
  )
}
