
const features = [
  {
    title: 'Tạo tài khoản và khám phá Ottopia',
    icon: '/assets/1193d0f8e076c509cc61df75561d541294ec3529.svg',
    iconBg: 'bg-[#0a7ad8]',
    free: true,
    paid: true
  },
  {
    title: 'Xem thử một phần bài học',
    icon: '/assets/b21b3dfbbb7b5405724418fecc3183aa0263b85c.svg',
    iconBg: 'bg-[#9560d8]',
    free: true,
    paid: true
  },
  {
    title: 'Theo dõi tiến độ học tập của bé',
    icon: '/assets/cf66ab221229ffd1d1e4ce55d3999060f8684d8f.svg',
    iconBg: 'bg-[#e71c3d]',
    free: false,
    paid: true
  },
  {
    title: 'Tích lũy sao và huy hiệu',
    icon: '/assets/9bad416525c4091459f629eac4707a21797c549b.svg',
    iconBg: 'bg-[#fea01f]',
    free: false,
    paid: true
  },
  {
    title: 'Mở khóa đầy đủ 5 chủ đề kỹ năng sống',
    icon: '/assets/34986fa487cdf757571d3c4a0772600fb271068d.svg',
    iconBg: 'bg-[#339e4a]',
    free: false,
    paid: true
  }
]

export default function ComparisonSection() {
  return (
    <section className="w-full">
      <div className="border-4 border-[#fea01f] rounded-[24px] p-6 bg-white overflow-x-auto scrollbar-none">
        <div className="min-w-[800px] grid grid-cols-3 gap-6">
          {/* Column 1: Rights list */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#fea01f] text-white font-vietnam font-bold text-[18px] py-3 px-4 rounded-[40px] text-center">
              QUYỀN LỢI HỌC TẬP
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              {features.map((feat, index) => (
                <div key={index} className="flex gap-3 items-center py-2 h-[56px]">
                  <div className={`${feat.iconBg} p-2 rounded-[100px] shrink-0`}>
                    <img
                      alt=""
                      className="w-6 h-6 object-contain"
                      src={feat.icon}
                      loading="lazy"
                    />
                  </div>
                  <span className="font-vietnam font-medium text-[16px] text-black leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Free Account */}
          <div className="bg-[#fef9ed] rounded-[24px] px-6 py-4 flex flex-col gap-4">
            <div className="text-[#0a7ad8] font-vietnam font-bold text-[18px] py-3 text-center">
              TÀI KHOẢN MIỄN PHÍ
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              {features.map((feat, index) => (
                <div key={index} className="flex justify-center items-center h-[56px] border-b border-[#e2e2ea] last:border-0 py-2">
                  {feat.free ? (
                    <div className="bg-[#339e4a] p-2 rounded-[100px] shrink-0">
                      <img
                        alt="Yes"
                        className="w-6 h-6 object-contain"
                        src="/assets/36ad9f1432da45db964bbac8d805b994e5cf282a.svg"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="p-2 shrink-0">
                      <img
                        alt="No"
                        className="w-6 h-6 object-contain"
                        src="/assets/6b55ea1258a2e294aac35c0b5c34c5efbaee5d50.svg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Paid Account */}
          <div className="bg-[#fef9ed] border-4 border-[#339e4a] rounded-[24px] px-6 py-4 flex flex-col gap-4">
            <div className="text-[#339e4a] font-vietnam font-bold text-[18px] py-3 text-center">
              TÀI KHOẢN TRẢ PHÍ
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              {features.map((_, index) => (
                <div key={index} className="flex justify-center items-center h-[56px] border-b border-[#e2e2ea] last:border-0 py-2">
                  <div className="bg-[#339e4a] p-2 rounded-[100px] shrink-0">
                    <img
                      alt="Yes"
                      className="w-6 h-6 object-contain"
                      src="/assets/36ad9f1432da45db964bbac8d805b994e5cf282a.svg"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
