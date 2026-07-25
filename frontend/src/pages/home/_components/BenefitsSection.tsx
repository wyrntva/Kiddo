const benefits = [
  {
    title: 'Phát triển tư duy',
    desc: 'Giúp trẻ hiểu và xử lý tình huống tốt hơn',
    titleColor: 'text-[#ed052a]',
    img: '/assets/10ff2dcd9dd7f3fb6b07b0871c783aa4b6565f61.webp',
    left: 'left-[-84.55%]',
    top: 'top-[-20.66%]',
    width: 'w-[270.22%]',
    height: 'h-[152%]'
  },
  {
    title: 'Tự tin & độc lập',
    desc: 'Trẻ biết tự chăm sóc và đưa ra quyết định',
    titleColor: 'text-[#fdd444]',
    img: '/assets/35280bcc80ef69d5939af8f018da49f79b362526.webp',
    left: 'left-[-103.94%]',
    top: 'top-[-37.11%]',
    width: 'w-[309.09%]',
    height: 'h-[173.86%]'
  },
  {
    title: 'Giao tiếp & ứng xử',
    desc: 'Trẻ biết yêu thương, tôn trọng mọi người',
    titleColor: 'text-[#418457]',
    img: '/assets/bda3e111c571fbddd7774f85c455d5ff0c74066d.webp',
    left: 'left-[-108.47%]',
    top: 'top-[-39.08%]',
    width: 'w-[317.38%]',
    height: 'h-[178.52%]'
  },
  {
    title: 'Hành trang tương lai',
    desc: 'Nền tảng quan trọng để trưởng thành hạnh phúc',
    titleColor: 'text-[#004c6e]',
    img: '/assets/b479d984a09205c9400fcd221e710df5c9fe9618.webp',
    left: 'left-[-107.33%]',
    top: 'top-[-33%]',
    width: 'w-[314.67%]',
    height: 'h-[177%]'
  },
  {
    title: 'Gắn kết gia đình',
    desc: 'Cùng học — cùng chơi — cùng phát triển',
    titleColor: 'text-[#8234e4]',
    img: '/assets/aab2bcb3c53191c384468ab579ce4496875b214f.webp',
    left: 'left-[-84.63%]',
    top: 'top-[-25.76%]',
    width: 'w-[268.44%]',
    height: 'h-[151%]'
  },
]

const imgVuesaxBoldMagicStar = "/assets/b88c4904531cd4b1ec90fb81ed103fec521e0cab.svg";

export default function BenefitsSection() {
  return (
    <section className="w-full">
      <div className="bg-[#fef9ed] rounded-[24px] p-[24px] flex flex-col gap-[24px] items-start border border-[#fff4bf]/60 shadow-sm">

        {/* Header with stars */}
        <div className="flex items-center justify-center gap-[16px] w-full shrink-0">
          <div className="size-[32px] relative">
            <img
              src={imgVuesaxBoldMagicStar}
              alt=""
              className="absolute inset-0 size-full object-contain shrink-0 animate-pulse"
              loading="lazy" decoding="async"
            />
          </div>
          <h2 className="font-baloo text-[22px] sm:text-[32px] font-bold text-[#004c6e] text-center leading-[36px] sm:leading-[56px] select-none">
            Vì sao nên học kỹ năng sống từ sớm?
          </h2>
          <div className="size-[32px] relative">
            <img
              src={imgVuesaxBoldMagicStar}
              alt=""
              className="absolute inset-0 size-full object-contain shrink-0 animate-pulse"
              loading="lazy" decoding="async"
            />
          </div>
        </div>

        {/* Grid list of benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-4 w-full">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center text-center p-[12px] rounded-2xl transition-all duration-300 hover:bg-white/40 group hover:shadow-lg hover:shadow-amber-100/30"
            >
              <div className="w-[100px] h-[100px] shrink-0 overflow-hidden relative mb-2 rounded-full bg-white/50 border border-amber-100/50 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src={b.img}
                  alt={b.title}
                  className={`absolute max-w-none ${b.left} ${b.top} ${b.width} ${b.height}`}
                  loading="lazy" decoding="async"
                />
              </div>
              <h3 className={`font-vietnam font-bold text-[18px] leading-[24px] mb-2 select-none ${b.titleColor}`}>
                {b.title}
              </h3>
              <p className="text-[#37393e] text-[16px] leading-[24px] font-normal font-vietnam">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
