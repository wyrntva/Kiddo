const imgMapIcon = '/assets/5a9453f78ced6122636cc3fcfc9d7d132cd3f8e7.svg'
const imgArrowRight = '/assets/307df52bf95db3f8214fe9c0404892bc2b4f690d.svg'

const zones = [
  { name: 'Vùng Đất Cảm Xúc', count: 12, color: 'bg-[#f2fbef] border-[#c3ffd0]', textColor: 'text-[#339e4a]', emoji: '😊' },
  { name: 'Thành Phố Giao Tiếp', count: 10, color: 'bg-[#e5f2ff] border-[#c9e6ff]', textColor: 'text-[#0a7ad8]', emoji: '💬' },
  { name: 'Ngôi Làng Tự Lập', count: 8, color: 'bg-[#fef9ed] border-[#fff4bf]', textColor: 'text-[#895026]', emoji: '⭐' },
  { name: 'Khu Vườn Bạn Bè', count: 9, color: 'bg-[#fff0f3] border-[#ffd6de]', textColor: 'text-[#e55c72]', emoji: '🤝' },
  { name: 'Hành Tinh Tình Huống', count: 11, color: 'bg-[#f2f0fe] border-[#e9d8ff]', textColor: 'text-[#9560d8]', emoji: '🎯' },
]

export default function ExploreSkillZonesBanner() {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-r from-[#f8f0ff] to-[#eef6ff] rounded-[24px] p-6 border border-purple-100/60 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <img src={imgMapIcon} alt="" className="w-8 h-8 object-contain shrink-0" loading="lazy" decoding="async" />
            <h2 className="font-baloo font-bold text-[22px] text-[#6c04ee] leading-[32px]">
              Khám phá theo Vùng đất
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {zones.map((zone, index) => (
              <button
                key={index}
                className={`${zone.color} border rounded-[16px] p-3 xl:p-4 flex flex-col items-center gap-1.5 xl:gap-2 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group`}
              >
                <span className="text-[30px] xl:text-[36px] leading-none group-hover:scale-110 transition-transform duration-200">
                  {zone.emoji}
                </span>
                <span className={`font-baloo font-bold text-[13px] xl:text-[14px] text-center leading-[18px] xl:leading-[20px] ${zone.textColor}`}>
                  {zone.name}
                </span>
                <span className="text-[11px] xl:text-[12px] text-[#575e70] font-vietnam">
                  {zone.count} bài học
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <button className="flex items-center gap-2 bg-white border border-purple-200 text-[#6c04ee] font-baloo font-bold text-[15px] px-6 py-2.5 rounded-[100px] hover:bg-purple-50 transition-all duration-200 active:scale-95 shadow-sm">
              <span>Xem bản đồ phiêu lưu</span>
              <img src={imgArrowRight} alt="" className="w-5 h-5 object-contain" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
