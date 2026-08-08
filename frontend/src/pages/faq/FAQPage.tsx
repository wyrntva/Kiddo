import { useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'

type FAQItem = {
  question: string
  answer: React.ReactNode
}

type FAQCategory = {
  id: string
  name: string
  items: FAQItem[]
}

const FAQ_DATA: FAQCategory[] = [
  {
    id: 'about',
    name: 'Câu hỏi về OTTOPIA',
    items: [
      {
        question: '1. OTTOPIA là gì?',
        answer: 'OTTOPIA là nền tảng học kỹ năng sống tương tác dành cho trẻ từ 3–5 tuổi. Thông qua câu chuyện ngắn, câu hỏi tình huống, trò chơi và phản hồi sau bài học, OTTOPIA giúp bé tiếp cận những bài học đầu đời theo cách trực quan, nhẹ nhàng và gần gũi với cuộc sống hằng ngày.'
      },
      {
        question: '2. OTTOPIA dành cho trẻ ở độ tuổi nào?',
        answer: 'OTTOPIA được thiết kế dành cho trẻ từ 3–5 tuổi. Nội dung, hình ảnh, âm thanh, thời lượng bài học và thao tác tương tác đều được xây dựng phù hợp với khả năng tiếp nhận của trẻ mầm non.'
      },
      {
        question: '3. Trẻ sẽ học được gì tại OTTOPIA?',
        answer: 'Trẻ được làm quen với những kỹ năng gần gũi như nhận biết cảm xúc, giao tiếp, tự lập, hợp tác và xử lý tình huống. Các khóa học và chủ đề mới sẽ tiếp tục được phát triển để đồng hành cùng trẻ qua từng giai đoạn.'
      },
      {
        question: '4. Trẻ học tại OTTOPIA như thế nào?',
        answer: 'Mỗi bài học bắt đầu bằng một câu chuyện hoạt hình, sau đó trẻ trả lời câu hỏi và tham gia trò chơi tương tác. Cách học này giúp trẻ được quan sát, lựa chọn và thực hành thay vì chỉ xem nội dung một chiều.'
      },
      {
        question: '5. Phụ huynh có thể theo dõi quá trình học của con không?',
        answer: 'Có. Sau mỗi bài học, phụ huynh có thể xem nội dung trẻ đã làm tốt, kỹ năng cần luyện tập thêm và những gợi ý để tiếp tục đồng hành cùng con tại nhà.'
      },
      {
        question: '6. Trẻ có thể tự học tại OTTOPIA không?',
        answer: 'Các hoạt động được thiết kế đơn giản, có hình ảnh và giọng nói hướng dẫn để trẻ dễ thực hiện. Tuy nhiên, phụ huynh nên đồng hành trong những lần học đầu tiên và hỗ trợ trẻ áp dụng bài học vào thực tế.'
      },
      {
        question: '7. OTTOPIA có thay thế việc dạy trẻ tại gia đình và trường học không?',
        answer: 'Không. OTTOPIA là công cụ hỗ trợ giúp bài học kỹ năng sống trở nên sinh động và dễ tiếp cận hơn. Sự hướng dẫn của phụ huynh, người chăm sóc và giáo viên vẫn đóng vai trò quan trọng trong quá trình phát triển của trẻ.'
      },
      {
        question: '8. Toro là ai?',
        answer: 'Toro là chú rái cá nhỏ thân thiện, tò mò và ham khám phá. Cùng Bunny, Foxy, Berry và Tiki, Toro đồng hành với trẻ trong từng câu chuyện và bài học tại OTTOPIA.'
      }
    ]
  },
  {
    id: 'usage',
    name: 'Câu hỏi về sử dụng nền tảng',
    items: [
      {
        question: '1. Có cần tải ứng dụng để sử dụng OTTOPIA không?',
        answer: 'Không. OTTOPIA hoạt động trực tiếp trên website nên phụ huynh và trẻ có thể truy cập bằng trình duyệt mà không cần cài đặt ứng dụng.'
      },
      {
        question: '2. Hướng dẫn tạo tài khoản OTTOPIA',
        answer: (
          <div className="space-y-2">
            <p>Ba mẹ truy cập website chính thức của OTTOPIA, chọn Đăng ký và nhập số điện thoại hoặc email cùng các thông tin cần thiết theo hướng dẫn.</p>
            <p>Sau khi tạo tài khoản, ba mẹ có thể thiết lập hồ sơ cho bé để hệ thống ghi nhận tiến trình học và phản hồi sau mỗi bài.</p>
          </div>
        )
      },
      {
        question: '3. Có cần tải ứng dụng OTTOPIA không?',
        answer: (
          <div className="space-y-2">
            <p>Không. OTTOPIA hoạt động trực tiếp trên website nên ba mẹ không cần tải ứng dụng riêng.</p>
            <p>Ba mẹ chỉ cần truy cập website chính thức, đăng nhập tài khoản và chọn bài học để bắt đầu.</p>
          </div>
        )
      },
      {
        question: '4. OTTOPIA sử dụng được trên những thiết bị nào?',
        answer: 'Nền tảng có thể được truy cập bằng điện thoại, máy tính bảng, máy tính và TV có trình duyệt phù hợp. Để trẻ thao tác thuận tiện hơn, phụ huynh nên ưu tiên thiết bị có màn hình đủ lớn và hỗ trợ cảm ứng hoặc chuột.'
      },
      {
        question: '5. OTTOPIA có thể sử dụng offline không?',
        answer: 'Không. Hiện tại, OTTOPIA cần kết nối Internet để tải video, câu hỏi, trò chơi và lưu tiến trình học của bé.'
      },
      {
        question: '6. Tôi nên làm gì khi bài học không tải được?',
        answer: 'Hãy kiểm tra kết nối Internet, tải lại trang và đăng nhập lại tài khoản. Nếu lỗi vẫn tiếp diễn, vui lòng liên hệ bộ phận hỗ trợ và gửi kèm hình ảnh màn hình để được kiểm tra nhanh hơn.'
      },
      {
        question: '7. Trợ lý Toro có thể hỗ trợ những gì?',
        answer: 'Trợ lý Toro có thể giải đáp thông tin về khóa học, tài khoản, đăng ký, thanh toán và hướng dẫn xử lý một số lỗi thường gặp. Với vấn đề cần kiểm tra riêng, Toro sẽ hướng dẫn phụ huynh liên hệ bộ phận hỗ trợ.'
      }
    ]
  },
  {
    id: 'billing',
    name: 'Câu hỏi về đăng ký gói',
    items: [
      {
        question: '1. OTTOPIA có những loại gói học nào?',
        answer: (
          <div className="space-y-2">
            <p>OTTOPIA cung cấp bài học trải nghiệm và các gói học khác nhau về nội dung, thời hạn sử dụng hoặc phạm vi truy cập.</p>
            <p>Thông tin cụ thể về giá, thời hạn và quyền lợi của từng gói sẽ được hiển thị rõ trên website tại thời điểm đăng ký.</p>
          </div>
        )
      },
      {
        question: '2. Ba mẹ có thể cho bé học thử trước khi mua gói không?',
        answer: (
          <div className="space-y-2">
            <p>Có. OTTOPIA cung cấp bài học trải nghiệm miễn phí để ba mẹ và bé làm quen với nội dung và cách học trước khi đăng ký gói trả phí.</p>
            <p>Bài học trải nghiệm có thể được cập nhật theo từng giai đoạn.</p>
          </div>
        )
      },
      {
        question: '3. Làm thế nào để đăng ký gói học?',
        answer: (
          <div className="space-y-2">
            <p>Ba mẹ chọn gói học phù hợp trên website, sau đó kiểm tra nội dung, thời hạn sử dụng, mức giá và quyền lợi đi kèm.</p>
            <p>Sau khi xác nhận thông tin tài khoản và tổng giá trị giao dịch, ba mẹ thực hiện thanh toán theo hướng dẫn trên màn hình.</p>
          </div>
        )
      },
      {
        question: '4. OTTOPIA hỗ trợ những phương thức thanh toán nào?',
        answer: (
          <div className="space-y-2">
            <p>Các phương thức thanh toán đang được hỗ trợ sẽ được hiển thị trực tiếp tại bước thanh toán trên website.</p>
            <p>Ba mẹ nên kiểm tra kỹ tên đơn vị nhận tiền, số tiền và nội dung giao dịch trước khi xác nhận.</p>
          </div>
        )
      },
      {
        question: '5. Đã thanh toán nhưng gói học chưa được kích hoạt thì làm gì?',
        answer: (
          <div className="space-y-3">
            <p>Ba mẹ vui lòng kiểm tra trạng thái giao dịch và chờ hệ thống xử lý trong thời gian ngắn.</p>
            <p>Nếu gói học vẫn chưa được kích hoạt, hãy liên hệ OTTOPIA và cung cấp:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#3e484f]">
              <li>Số điện thoại hoặc email đăng ký.</li>
              <li>Tên gói học.</li>
              <li>Mã giao dịch.</li>
              <li>Ảnh chụp xác nhận thanh toán nếu có.</li>
            </ul>
            <div className="pt-1 font-semibold text-[#0a7ad8] space-y-1">
              <p>📞 Hotline: 0976716116</p>
              <p>✉️ Email: ottopiaforkids@gmail.com</p>
            </div>
          </div>
        )
      },
      {
        question: '6. Có thể hủy gói học hoặc yêu cầu hoàn tiền không?',
        answer: (
          <div className="space-y-2">
            <p>Việc hủy gói hoặc hoàn tiền được thực hiện theo chính sách áp dụng tại thời điểm đăng ký. Điều kiện có thể khác nhau tùy từng gói học, chương trình ưu đãi, thời hạn sử dụng và mức độ đã truy cập nội dung.</p>
            <p>Ba mẹ nên đọc kỹ thông tin gói học và chính sách hủy, hoàn tiền trước khi thanh toán.</p>
          </div>
        )
      },
      {
        question: '7. Khi gói học hết hạn, tiến trình của bé có bị mất không?',
        answer: (
          <div className="space-y-2">
            <p>Khi gói học hết hạn, quyền truy cập vào một số bài học hoặc tính năng có thể bị giới hạn.</p>
            <p>Tiến trình học và dữ liệu tài khoản được lưu giữ theo chính sách hiện hành của OTTOPIA. Ba mẹ có thể xem thông tin tại thời điểm đăng ký hoặc liên hệ đội ngũ hỗ trợ khi cần kiểm tra, chỉnh sửa hay xử lý dữ liệu liên quan đến tài khoản của bé.</p>
          </div>
        )
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('about')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
    setExpandedIndex(0) // Mặc định mở câu hỏi đầu tiên của danh mục mới
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const currentCategory = FAQ_DATA.find((c) => c.id === activeCategory) || FAQ_DATA[0]

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faff]">
      <SEO
        title="Câu hỏi thường gặp (FAQ) - OTTOPIA"
        description="Giải đáp các câu hỏi thường gặp về nền tảng học tập tương tác kỹ năng sống cho trẻ em OTTOPIA."
      />
      <Navbar />

      <main className="w-full flex-1 px-4 pb-16 pt-6 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1000px]">
          {/* Page Title */}
          <div className="mb-8 text-center sm:mb-10">
            <h1 className="font-baloo text-[32px] font-bold text-[#004c6e] sm:text-[40px] md:text-[46px] leading-tight">
              OTTOPIA – Chơi để hiểu, học để lớn
            </h1>
            <p className="mt-3 font-vietnam text-[14px] text-[#56646e] sm:text-[16px] max-w-[800px] mx-auto leading-relaxed">
              Ba mẹ có thể tìm nhanh câu trả lời về OTTOPIA, cách bé học và sử dụng nền tảng, cùng các thông tin liên quan đến đăng ký gói học.
            </p>
          </div>

          {/* Horizontal Tabs Layout */}
          <div className="mb-8 flex w-full justify-start overflow-x-auto pb-3 gap-3 md:justify-center border-b border-[#e4ebf0] scrollbar-none">
            {FAQ_DATA.map((cat) => {
              const isActive = cat.id === activeCategory
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-6 py-2.5 rounded-full font-vietnam text-[14px] font-semibold transition-all duration-200 shrink-0 select-none ${
                    isActive
                      ? 'bg-[#e5f2ff] text-[#0a7ad8]'
                      : 'bg-transparent text-[#004c6e] hover:text-[#0a7ad8]'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Accordion White Card Container */}
          <div className="rounded-[24px] border border-[#d8edfa] bg-white p-5 shadow-[0_12px_36px_rgba(0,76,110,0.06)] sm:p-7 md:p-8 space-y-4">
            {currentCategory.items.map((item, idx) => {
              const isExpanded = expandedIndex === idx
              return (
                <div
                  key={idx}
                  className={`border rounded-[16px] transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-[#0a7ad8] bg-[#fdfeff] shadow-[0_4px_16px_rgba(10,122,216,0.05)]'
                      : 'border-[#e4ebf0] bg-white hover:border-[#b8c6cf] hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left focus:outline-none sm:p-5"
                  >
                    <span className="font-vietnam text-[15px] font-bold leading-snug text-[#001e2f] transition-colors hover:text-[#0a7ad8] sm:text-[17px]">
                      {item.question}
                    </span>
                    <span
                      className={`flex size-[28px] shrink-0 items-center justify-center rounded-full text-[18px] font-semibold transition-all duration-300 ${
                        isExpanded
                          ? 'bg-[#0a7ad8] text-white rotate-180'
                          : 'bg-[#f0f7ff] text-[#0a7ad8]'
                      }`}
                    >
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded
                        ? 'max-h-[800px] opacity-100 border-t border-[#e4ebf0]'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 sm:p-5 font-vietnam text-[14px] leading-relaxed text-[#3e484f] sm:text-[15px]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
