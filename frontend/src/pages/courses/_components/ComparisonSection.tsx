const features = [
  {
    title: 'Tạo tài khoản và khám phá Ottopia',
    icon: '/assets/1193d0f8e076c509cc61df75561d541294ec3529.svg',
    iconBg: 'bg-[#0a7ad8]',
    free: true,
    paid: true,
  },
  {
    title: 'Xem thử một phần bài học',
    icon: '/assets/b21b3dfbbb7b5405724418fecc3183aa0263b85c.svg',
    iconBg: 'bg-[#9560d8]',
    free: true,
    paid: true,
  },
  {
    title: 'Theo dõi tiến độ học tập của bé',
    icon: '/assets/cf66ab221229ffd1d1e4ce55d3999060f8684d8f.svg',
    iconBg: 'bg-[#e71c3d]',
    free: false,
    paid: true,
  },
  {
    title: 'Tích lũy sao và huy hiệu',
    icon: '/assets/9bad416525c4091459f629eac4707a21797c549b.svg',
    iconBg: 'bg-[#fea01f]',
    free: false,
    paid: true,
  },
  {
    title: 'Mở khóa đầy đủ 5 chủ đề kỹ năng sống',
    icon: '/assets/34986fa487cdf757571d3c4a0772600fb271068d.svg',
    iconBg: 'bg-[#339e4a]',
    free: false,
    paid: true,
  },
] as const

function StatusIcon({ active }: { active: boolean }) {
  return active ? (
    <div className="bg-[#339e4a] p-1 md:p-2 rounded-[100px] shrink-0">
      <img width="21" height="15"
        alt="Có"
        className="w-[18px] h-[18px] md:w-6 md:h-6 object-contain"
        src="/assets/36ad9f1432da45db964bbac8d805b994e5cf282a.svg"
        loading="lazy" decoding="async"
      />
    </div>
  ) : (
    <div className="p-1 md:p-2 shrink-0">
      <img width="14" height="2"
        alt="Không"
        className="w-[18px] h-[18px] md:w-6 md:h-6 object-contain"
        src="/assets/6b55ea1258a2e294aac35c0b5c34c5efbaee5d50.svg"
        loading="lazy" decoding="async"
      />
    </div>
  )
}

export default function ComparisonSection() {
  return (
    <section className="w-full">
      <div className="lg:hidden border-4 border-[#fea01f] rounded-[24px] p-3 sm:p-5 bg-white">
        <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr] gap-1.5 sm:gap-3">
          {/* Column 1: Quyền lợi */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="bg-[#fea01f] text-white font-vietnam font-bold text-[9px] min-[360px]:text-[10px] sm:text-[14px] py-3 px-1 rounded-[40px] text-center min-h-[38px] flex items-center justify-center whitespace-nowrap">
              QUYỀN LỢI HỌC TẬP
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-1.5 sm:gap-2.5 items-center py-2 h-[68px]">
                  <div className={`${feature.iconBg} p-1 sm:p-1.5 rounded-[100px] shrink-0`}>
                    <img
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      src={feature.icon}
                      loading="lazy" decoding="async"
                    />
                  </div>
                  <span className="font-vietnam font-medium text-[11px] sm:text-[15px] text-black leading-snug">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Miễn phí */}
          <div className="bg-[#fef9ed] rounded-[16px] px-2 pt-2 pb-2 sm:px-3 sm:pt-4 sm:pb-3 flex flex-col gap-4">
            <div className="text-[#0a7ad8] font-vietnam font-bold text-[9px] min-[360px]:text-[10px] sm:text-[14px] py-1 text-center min-h-[38px] flex items-center justify-center whitespace-nowrap">
              MIỄN PHÍ
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex justify-center items-center h-[68px] border-b border-[#e2e2ea] last:border-0 py-2">
                  <StatusIcon active={feature.free} />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Trả phí */}
          <div className="bg-[#fef9ed] border-2 border-[#339e4a] rounded-[16px] px-2 pt-[6px] pb-[6px] sm:px-3 sm:pt-[12px] sm:pb-[10px] flex flex-col gap-4">
            <div className="text-[#339e4a] font-vietnam font-bold text-[9px] min-[360px]:text-[10px] sm:text-[14px] py-1 text-center min-h-[38px] flex items-center justify-center whitespace-nowrap">
              TRẢ PHÍ
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex justify-center items-center h-[68px] border-b border-[#e2e2ea] last:border-0 py-2">
                  <StatusIcon active={feature.paid} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block border-4 border-[#fea01f] rounded-[24px] p-6 bg-white">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 pt-4">
            <div className="bg-[#fea01f] text-white font-vietnam font-bold text-[18px] py-3 px-4 rounded-[40px] text-center">
              QUYỀN LỢI HỌC TẬP
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3 items-center py-2 h-[64px]">
                  <div className={`${feature.iconBg} p-2 rounded-[100px] shrink-0`}>
                    <img
                      alt=""
                      className="w-6 h-6 object-contain"
                      src={feature.icon}
                      loading="lazy" decoding="async"
                    />
                  </div>
                  <span className="font-vietnam font-medium text-[16px] text-black leading-tight">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#fef9ed] rounded-[24px] px-6 pt-4 pb-2 flex flex-col gap-4">
            <div className="text-[#0a7ad8] font-vietnam font-bold text-[18px] py-3 text-center">
              TÀI KHOẢN MIỄN PHÍ
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex justify-center items-center h-[64px] border-b border-[#e2e2ea] last:border-0 py-2">
                  <StatusIcon active={feature.free} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#fef9ed] border-4 border-[#339e4a] rounded-[24px] px-6 pt-[12px] pb-[4px] flex flex-col gap-4">
            <div className="text-[#339e4a] font-vietnam font-bold text-[18px] py-3 text-center">
              TÀI KHOẢN TRẢ PHÍ
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex justify-center items-center h-[64px] border-b border-[#e2e2ea] last:border-0 py-2">
                  <StatusIcon active={feature.paid} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
