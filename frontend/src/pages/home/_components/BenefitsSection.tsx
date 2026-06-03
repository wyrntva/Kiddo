const benefits = [
  {
    title: 'Phát triển tư duy',
    desc: 'Giúp trẻ hiểu và xử lý tình huống tốt hơn',
    titleColor: 'text-[#ed052a]',
    leftOffset: '-5.99%',
  },
  {
    title: 'Tự tin & độc lập',
    desc: 'Trẻ biết tự chăm sóc và đưa ra quyết định',
    titleColor: 'text-[#fdd444]',
    leftOffset: '-108.98%',
  },
  {
    title: 'Giao tiếp & ứng xử',
    desc: 'Trẻ biết yêu thương, tôn trọng mọi người',
    titleColor: 'text-[#418457]',
    leftOffset: '-212.45%',
  },
  {
    title: 'Hành trang tương lai',
    desc: 'Nền tảng quan trọng để trưởng thành hạnh phúc',
    titleColor: 'text-[#004c6e]',
    leftOffset: '-313.18%',
  },
  {
    title: 'Gắn kết gia đình',
    desc: 'Cùng học — cùng chơi — cùng phát triển',
    titleColor: 'text-[#8234e4]',
    leftOffset: '-409.23%',
  },
]

export default function BenefitsSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="bg-[#fef9ed] rounded-[24px] p-[24px] flex flex-col gap-[24px] items-start border border-[#fff4bf]/60 shadow-sm">
          
          {/* Header with stars */}
          <div className="flex items-center justify-center gap-[16px] w-full shrink-0">
            <img
              src="http://localhost:3845/assets/b88c4904531cd4b1ec90fb81ed103fec521e0cab.svg"
              alt=""
              className="w-[32px] h-[32px] object-contain shrink-0 animate-pulse"
            />
            <h2 className="font-baloo text-[32px] font-bold text-[#004c6e] text-center leading-[56px] select-none">
              Vì sao nên học kỹ năng sống từ sớm?
            </h2>
            <img
              src="http://localhost:3845/assets/b88c4904531cd4b1ec90fb81ed103fec521e0cab.svg"
              alt=""
              className="w-[32px] h-[32px] object-contain shrink-0 animate-pulse"
            />
          </div>

          {/* Grid list of benefits with clipped sprite illustrations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 w-full">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center text-center p-[12px] rounded-2xl transition-all duration-300 hover:bg-white/40 group hover:shadow-lg hover:shadow-amber-100/30"
              >
                {/* Clipped sprite image illustration */}
                <div className="w-[100px] h-[100px] shrink-0 overflow-hidden relative mb-2 rounded-full bg-white/50 border border-amber-100/50 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://localhost:3845/assets/4a3a20c7b43be191920d6ee39130336140f274e9.png"
                    alt={b.title}
                    className="absolute max-w-none h-[119%] top-[-9.79%] w-[512.47%]"
                    style={{ left: b.leftOffset }}
                  />
                </div>

                {/* Title */}
                <h3 className={`font-sans font-bold text-[18px] leading-[24px] mb-2 select-none ${b.titleColor}`}>
                  {b.title}
                </h3>

                {/* Description */}
                <p className="text-[#37393e] text-[16px] leading-[24px] font-medium font-sans">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
