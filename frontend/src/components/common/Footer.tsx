import logoUrl from '../../assets/logo.png'

const links = [
  {
    heading: 'Khám phá',
    items: ['Rừng Cảm Xúc', 'Thành Phố Giao Tiếp', 'Làng Tự Lập', 'Khu Vườn Bạn Bè', 'Hành Tinh Tình Huống'],
  },
  {
    heading: 'Hỗ trợ',
    items: ['Trung tâm hỗ trợ', 'Hướng dẫn sử dụng', 'Câu hỏi thường gặp', 'Liên hệ'],
  },
  {
    heading: 'Về KIDDO',
    items: ['Giới thiệu', 'Phương pháp giáo dục', 'Chính sách bảo mật', 'Điều khoản sử dụng'],
  },
  {
    heading: 'Dành cho phụ huynh',
    items: ['Kiến thức nuôi dạy con', 'Hoạt động cùng bé', 'Gợi ý theo độ tuổi', 'Cộng đồng phụ huynh'],
  },
]

const socials = [
  { icon: '📘', label: 'Facebook' },
  { icon: '▶️', label: 'YouTube' },
  { icon: '🎵', label: 'TikTok' },
  { icon: '📷', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        {/* Main grid */}
        <div className="grid grid-cols-5 gap-10 mb-8">
          {/* Brand column */}
          <div className="col-span-1">
            <img src={logoUrl} alt="KIDDO" className="h-10 w-auto mb-1" />
            <p className="text-gray-400 text-[11px] font-semibold tracking-wide uppercase mb-3">
              Học kỹ năng – Lớn mỗi ngày ❤️
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mb-5">
              KIDDO đồng hành cùng bé phát triển kỹ năng sống qua những trải nghiệm vui vẻ và ý nghĩa mỗi ngày.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-sm transition-colors"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {links.map((col) => (
            <div key={col.heading}>
              <h4 className="font-black text-gray-800 text-sm mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 text-sm hover:text-gray-800 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
          <p className="text-gray-400 text-xs">© 2024 KIDDO. All rights reserved.</p>
          <p className="text-gray-400 text-xs">Made with ❤️ for kids and parents</p>
          <button className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-500 text-sm font-bold px-4 py-2 rounded-full border border-orange-200 transition-colors">
            <span className="text-base">🦦</span>
            Liên hệ với KIDDO
          </button>
        </div>
      </div>
    </footer>
  )
}
