
type Plan = {
  name: string
  price: string
  period: string
  bgClass: string
  borderClass: string
  icon: string
  iconBg: string
  checkIcon: string
  buttonBg: string
  textColor: string
  btnText: string
  features: string[]
  isPopular?: boolean
}

const plans: Plan[] = [
  {
    name: 'Gói 1 tháng',
    price: '99.000đ',
    period: '/ tháng',
    bgClass: 'bg-[#f4fafd]',
    borderClass: 'border border-[#7bc9ff]',
    icon: '/assets/3c3f39995745105cf6008eb2eb4c0fb2a25ba1bb.svg',
    iconBg: 'bg-[#c9e6ff]',
    checkIcon: '/assets/dfc0fd4a7226ab8dabdc2a5e582c88014bad289a.svg',
    buttonBg: 'bg-[#0a7ad8] hover:bg-[#085fb0]',
    textColor: 'text-[#0a7ad8]',
    btnText: 'Chọn gói',
    features: [
      'Đầy đủ bài học',
      'Cập nhật nội dung mới',
      'Nhận sao sau mỗi bài',
      'Linh hoạt từng tháng'
    ]
  },
  {
    name: 'Gói 3 tháng',
    price: '79.000đ',
    period: '/ tháng',
    bgClass: 'bg-[#fef9ed]',
    borderClass: 'border border-[#ffdc64]',
    icon: '/assets/6b00c04b54d964442be7b81612e99371c9b695d0.svg',
    iconBg: 'bg-[#ffdc64]',
    checkIcon: '/assets/5ff06334161ed0621fed80bef95568a1a034d49f.svg',
    buttonBg: 'bg-[#fea01f] hover:bg-[#e58f1a]',
    textColor: 'text-[#fea01f]',
    btnText: 'Chọn gói',
    features: [
      'Học lại không giới hạn',
      'Cập nhật nội dung mới',
      'Theo dõi tiến độ & sao thưởng',
      'Tiết kiệm hơn 20%'
    ],
    isPopular: true
  },
  {
    name: 'Gói 12 tháng',
    price: '49.000đ',
    period: '/ tháng',
    bgClass: 'bg-[#f2fbef]',
    borderClass: 'border border-[#9de4af]',
    icon: '/assets/d5df2987e88f6150a8448d212afd90bae454497f.svg',
    iconBg: 'bg-[#c3ffd0]',
    checkIcon: '/assets/0b40b5852870bd86ba33ba6078e2bd0b4b0b6bad.svg',
    buttonBg: 'bg-[#339e4a] hover:bg-[#2a853e]',
    textColor: 'text-[#339e4a]',
    btnText: 'Chọn gói',
    features: [
      'Học không giới hạn cả năm',
      'Cập nhật nội dung mới',
      'Lưu hành trình & huy hiệu',
      'Tiết kiệm hơn 40%'
    ]
  }
]

export default function PricingSection() {
  return (
    <section className="w-full pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-[24px] ${plan.bgClass} ${plan.borderClass} ${plan.isPopular ? 'border-4 border-[#339e4a]' : ''} p-6 flex flex-col gap-6 items-center justify-between shadow-sm`}
          >
            {/* popular badge */}
            {plan.isPopular && (
              <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-[#fea01f] flex gap-1 items-center px-4 py-1 rounded-[40px] text-white font-vietnam font-medium text-[14px]">
                <img 
                  alt="Popular" 
                  className="w-5 h-5 object-contain" 
                  src="/assets/ac919f35d87a1eccc24123b31500eba2cfa34cee.svg" 
                />
                <span>Phổ biến nhất</span>
              </div>
            )}

            {/* Header info */}
            <div className="flex flex-col gap-3 items-center">
              {/* icon */}
              <div className={`p-2 rounded-[100px] shrink-0 ${plan.iconBg}`}>
                <img 
                  alt="" 
                  className="w-6 h-6 object-contain" 
                  src={plan.icon} 
                />
              </div>

              {/* name and price */}
              <div className="flex flex-col items-center">
                <span className="font-vietnam font-bold text-[18px] text-black">
                  {plan.name}
                </span>
                <div className="flex gap-2 items-end">
                  <span className={`font-baloo text-[48px] ${plan.textColor} leading-none font-bold`}>
                    {plan.price}
                  </span>
                  <span className={`font-baloo text-[16px] ${plan.textColor} mb-2`}>
                    {plan.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-3 w-full max-w-[240px] align-start">
              {plan.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex gap-2 items-center w-full">
                  <img 
                    alt="check" 
                    className="w-7 h-7 object-contain shrink-0" 
                    src={plan.checkIcon} 
                  />
                  <span className="font-vietnam font-medium text-[16px] text-[#313235]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className={`${plan.buttonBg} text-white font-baloo text-[20px] py-2 w-full rounded-[40px] transition-colors duration-150`}>
              {plan.btnText}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
