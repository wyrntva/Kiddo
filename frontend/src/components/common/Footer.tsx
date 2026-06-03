const imgImage6 = "/assets/f014672cf8ce88994cfceff8c3763b5295f847fb.png"
const imgAvatar = "/assets/567c1f8e1a376373c8c7749b158426dd62cb60c2.png"
const imgAvatar1 = "/assets/de633722309fe20675a2a35a6657b31451904c1c.png"
const imgUnion = "/assets/999d0b74019cdcd7dc4ee450117c038bf7b46dff.svg"
const imgSubtract = "/assets/5b775e88ecb300259c2df3b7bec5922f579027ba.svg"
const imgGroup = "/assets/d90e182ab78acaa1ae26ca4006a9509dc49db0ca.svg"
const imgSubtract1 = "/assets/89c64997fd9e5661072f99cb94c0efd17ab9e551.svg"
const imgIcon = "/assets/bdbbb95075ff18bc1732686588996909478aedcc.svg"
const imgVuesaxBoldMessages = "/assets/159e68ad449696f37117068d1ffc4c11894c8114.svg"

const links = [
  {
    heading: 'KHÁM PHÁ',
    items: ['Rừng Cảm Xúc', 'Thành Phố Giao Tiếp', 'Làng Tự Lập', 'Khu Vườn Bạn Bè', 'Hành Tinh Tình Huống'],
  },
  {
    heading: 'HỖ TRỢ',
    items: ['Trung tâm hỗ trợ', 'Hướng dẫn sử dụng', 'Câu hỏi thường gặp', 'Liên hệ'],
  },
  {
    heading: 'VỀ OTTOPIA',
    items: ['Giới thiệu', 'Phương pháp giáo dục', 'Chính sách bảo mật', 'Điều khoản sử dụng'],
  },
  {
    heading: 'DÀNH CHO PHỤ HUYNH',
    items: ['Kiến thức nuôi dạy con', 'Hoạt động cùng bé', 'Gợi ý theo độ tuổi', 'Cộng đồng phụ huynh'],
  },
]

const socials = [
  { icon: imgUnion, label: 'Facebook' },
  { icon: imgSubtract, label: 'YouTube' },
  { icon: imgGroup, label: 'TikTok' },
  { icon: imgSubtract1, label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-[#e6f6ff]">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-10 pb-6 font-vietnam">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-8">
          {/* Brand column */}
          <div className="col-span-1">
            <div className="w-[126px] h-[56px] relative overflow-hidden mb-3">
              <img src={imgImage6} alt="OTTOPIA" className="absolute inset-0 size-full object-contain" />
            </div>
            <p className="text-[#3e484f] text-[16px] leading-[24px] mb-5 font-normal">
              Ottopia đồng hành cùng bé phát triển kỹ năng sống qua những trải nghiệm vui vẻ và ý nghĩa mỗi ngày.
            </p>
            <div className="flex gap-6">
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-10 h-10 bg-[#0a7ad8] hover:bg-[#0863b0] rounded-full flex items-center justify-center transition-colors"
                >
                  <img src={s.icon} alt={s.label} className="w-5 h-5 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {links.map((col) => (
            <div key={col.heading}>
              <h4 className="font-baloo text-[#004c6e] text-[18px] mb-4 tracking-wider leading-[32px]">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#575e70] text-[16px] hover:text-[#313235] transition-colors font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#c9e6ff] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#575e70] text-sm font-medium">© 2026 OTTOPIA Learning. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#575e70] text-sm font-medium">
            <span>Made with</span>
            <img src={imgIcon} alt="Heart" className="w-4 h-4 object-contain inline-block mx-0.5" />
            <span>for kids and parents</span>
          </div>
          <button className="flex items-center gap-2 bg-[#fef9ed] hover:bg-[#fff4bf]/80 text-[#fea01f] text-sm font-bold px-4 py-2 rounded-full border border-transparent transition-colors">
            <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
              <img alt="" className="absolute inset-0 size-full object-cover" src={imgAvatar} />
              <img alt="" className="absolute h-[153.33%] left-[-52.76%] top-[0.3%] w-[182.9%] max-w-none" src={imgAvatar1} />
            </div>
            <span className="font-baloo leading-[24px] text-[14px]">Liên hệ với OTTOPIA</span>
            <img src={imgVuesaxBoldMessages} alt="Message icon" className="w-6 h-6 object-contain shrink-0" />
          </button>
        </div>
      </div>
    </footer>
  )
}
