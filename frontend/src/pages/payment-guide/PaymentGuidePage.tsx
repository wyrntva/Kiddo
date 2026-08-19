import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import SEO from '../../components/common/SEO'

export default function PaymentGuidePage() {
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [bankSettings, setBankSettings] = useState({
    bankName: 'MB Bank (Ngân hàng Quân đội)',
    bankAccountNumber: '0842486222',
    bankAccountName: 'KIDDO LEARNING',
    bankCode: 'MB'
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${API_URL}/api/store-settings`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setBankSettings({
            bankName: data.bank_name || 'MB Bank (Ngân hàng Quân đội)',
            bankAccountNumber: data.bank_account_number || '0842486222',
            bankAccountName: data.bank_account_name || 'KIDDO LEARNING',
            bankCode: data.bank_code || 'MB'
          })
        }
      })
      .catch(() => {})
  }, [API_URL])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  const steps = [
    {
      step: '1',
      badgeColor: 'bg-[#0a7ad8]',
      title: 'Chọn gói học phù hợp',
      desc: 'Truy cập trang Khóa học trên thanh điều hướng hoặc nhấn nút "Khóa học" để xem danh sách các gói học phí (1 tháng, 6 tháng hoặc 12 tháng) với đầy đủ thông tin quyền lợi và ưu đãi.',
      actionText: 'Xem các gói học →',
      actionLink: '/courses',
    },
    {
      step: '2',
      badgeColor: 'bg-[#fea01f]',
      title: 'Đăng nhập hoặc Tạo tài khoản',
      desc: 'Bố mẹ tiến hành Đăng nhập bằng Email, Số điện thoại hoặc Đăng nhập nhanh bằng Google để hệ thống liên kết gói học với tài khoản của bé.',
      actionText: 'Đăng nhập / Đăng ký →',
      actionLink: '/login',
    },
    {
      step: '3',
      badgeColor: 'bg-[#339e4a]',
      title: 'Quét mã VietQR hoặc Chuyển khoản ngân hàng',
      desc: 'Cửa sổ thanh toán sẽ hiển thị mã VietQR kèm số tiền và nội dung chuyển khoản tự động. Bố mẹ mở ứng dụng ngân hàng bất kỳ để quét mã QR hoặc chuyển khoản theo số tài khoản được cung cấp.',
    },
    {
      step: '4',
      badgeColor: 'bg-[#8e44ad]',
      title: 'Xác nhận chuyển khoản trên hệ thống',
      desc: 'Sau khi hoàn tất giao dịch trên ứng dụng ngân hàng, bố mẹ nhấn nút "Tôi đã chuyển khoản" trên cửa sổ thanh toán để gửi thông tin xác nhận lên hệ thống.',
    },
    {
      step: '5',
      badgeColor: 'bg-[#e83552]',
      title: 'Kích hoạt khóa học & Bắt đầu trải nghiệm',
      desc: 'Hệ thống sẽ đối soát và kích hoạt gói học trong vòng 5 - 10 phút. Sau khi được kích hoạt, bé có thể truy cập toàn bộ các bài học, trò chơi tương tác trên khắp bản đồ OTTOPIA.',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faff] font-vietnam">
      <SEO
        title="Hướng dẫn thanh toán - OTTOPIA"
        description="Hướng dẫn chi tiết các bước thanh toán học phí, chuyển khoản ngân hàng và quét mã VietQR để kích hoạt khóa học kỹ năng sống tại OTTOPIA."
        schemaType="WebPage"
      />
      <Navbar />

      <main className="w-full flex-1 px-3 pb-10 pt-4 sm:px-6 md:px-8 md:pb-16 xl:px-12">
        <article className="mx-auto w-full max-w-[1400px] overflow-hidden rounded-[20px] border border-[#d8edfa] bg-white shadow-[0_8px_28px_rgba(0,76,110,0.07)] md:rounded-[28px]">
          
          {/* Header Banner */}
          <div className="flex justify-center px-4 sm:px-6">
            <div className="flex min-h-[48px] w-full max-w-[580px] items-center justify-center rounded-b-[24px] bg-[#0a7ad8] px-6 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.1)] sm:min-h-[54px] sm:rounded-b-[30px]">
              <h1 className="text-center font-baloo text-[19px] font-bold uppercase leading-[28px] text-white sm:text-[23px] sm:leading-[32px] md:text-[25px]">
                HƯỚNG DẪN THANH TOÁN
              </h1>
            </div>
          </div>

          <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12">
            
            {/* Intro Alert Box */}
            <div className="mb-10 rounded-[18px] border-l-4 border-[#fea01f] bg-[#fef9ed] p-5 sm:p-6 shadow-sm">
              <h2 className="font-baloo text-[18px] sm:text-[20px] font-bold text-[#004c6e] mb-2">
                Thanh toán nhanh chóng & An toàn cùng OTTOPIA
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[26px] sm:leading-[28px] text-[#3e484f]">
                OTTOPIA hỗ trợ thanh toán học phí trực tuyến 24/7 thông qua hình thức <strong>Chuyển khoản ngân hàng 24/7 (Napas247)</strong> và <strong>Quét mã VietQR</strong> tiện lợi. Hệ thống tự động ghi nhận và kích hoạt gói học nhanh chóng giúp các bé không bị gián đoạn giờ học.
              </p>
            </div>

            {/* 5 Steps Grid */}
            <section className="mb-12">
              <h2 className="font-baloo text-[22px] sm:text-[26px] font-bold text-[#004c6e] mb-6 flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#e5f2ff] text-[#0a7ad8] text-[18px]">📋</span>
                Quy trình thanh toán 5 bước
              </h2>

              <div className="flex flex-col gap-5">
                {steps.map((s) => (
                  <div
                    key={s.step}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-[20px] border border-[#e0f0fc] bg-gradient-to-br from-white to-[#f9fdff] p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,76,110,0.04)] hover:shadow-md transition-shadow"
                  >
                    <div className={`flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full text-white font-baloo text-[18px] sm:text-[20px] font-bold ${s.badgeColor} shadow-sm`}>
                      {s.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-baloo text-[18px] sm:text-[20px] font-bold text-[#004c6e] mb-1.5">
                        {s.title}
                      </h3>
                      <p className="text-[15px] sm:text-[16px] leading-[26px] text-[#575e70]">
                        {s.desc}
                      </p>
                      {s.actionLink && (
                        <Link
                          to={s.actionLink}
                          className="inline-flex items-center gap-1.5 mt-2.5 font-vietnam font-semibold text-[14px] text-[#0a7ad8] hover:text-[#0860ab] transition-colors"
                        >
                          {s.actionText}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bank Info Card */}
            <section className="mb-12 rounded-[24px] border-2 border-[#b9e2fe] bg-[#f0f8ff] p-6 sm:p-8 shadow-sm">
              <h2 className="font-baloo text-[22px] sm:text-[24px] font-bold text-[#004c6e] mb-4 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-white text-[#0a7ad8] text-[18px] shadow-sm">💳</span>
                Thông tin tài khoản nhận thanh toán
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#575e70] mb-6">
                Quý phụ huynh có thể chuyển khoản trực tiếp qua thông tin tài khoản chính thức của OTTOPIA:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-[20px] border border-[#d2ecfe]">
                <div className="space-y-1">
                  <span className="text-[13px] sm:text-[14px] text-gray-500 font-medium">Ngân hàng thụ hưởng:</span>
                  <p className="font-vietnam font-bold text-[16px] sm:text-[17px] text-[#004c6e]">{bankSettings.bankName}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[13px] sm:text-[14px] text-gray-500 font-medium">Tên chủ tài khoản:</span>
                  <p className="font-vietnam font-bold text-[16px] sm:text-[17px] text-[#004c6e] uppercase">{bankSettings.bankAccountName}</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="text-[13px] sm:text-[14px] text-gray-500 font-medium">Số tài khoản:</span>
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f8fbff] p-3 rounded-xl border border-[#cde8fc]">
                    <span className="font-mono font-bold text-[18px] sm:text-[20px] text-[#0a7ad8] tracking-wider">{bankSettings.bankAccountNumber}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(bankSettings.bankAccountNumber)}
                      className="px-4 py-2 rounded-lg bg-[#0a7ad8] hover:bg-[#0860ab] text-white font-vietnam font-medium text-[13px] transition-colors cursor-pointer"
                    >
                      {copiedAccount ? '✓ Đã sao chép' : 'Sao chép STK'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="text-[13px] sm:text-[14px] text-gray-500 font-medium">Cú pháp chuyển khoản chuẩn:</span>
                  <div className="bg-[#fff9ed] p-3 rounded-xl border border-[#ffe6b3]">
                    <p className="font-mono font-bold text-[15px] sm:text-[16px] text-[#fea01f]">
                      [Số điện thoại hoặc Email đăng ký] [Tên gói học]
                    </p>
                    <p className="text-[13px] text-gray-500 mt-1">
                      <em>Ví dụ: 0987654321 GOI 6 THANG</em>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ / Notes */}
            <section className="space-y-6">
              <h2 className="font-baloo text-[22px] sm:text-[26px] font-bold text-[#004c6e] flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#fef4e6] text-[#fea01f] text-[18px]">💡</span>
                Những lưu ý quan trọng
              </h2>

              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#e8edf5] bg-white p-5 shadow-sm">
                  <h3 className="font-baloo text-[17px] sm:text-[18px] font-bold text-[#004c6e] mb-1.5">
                    1. Thời gian kích hoạt khóa học là bao lâu?
                  </h3>
                  <p className="text-[15px] leading-[26px] text-[#575e70]">
                    Thông thường sau khi bố mẹ nhấn <strong>"Tôi đã chuyển khoản"</strong>, hệ thống sẽ kiểm tra đối soát và kích hoạt khóa học trong vòng từ <strong>5 – 10 phút</strong>.
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#e8edf5] bg-white p-5 shadow-sm">
                  <h3 className="font-baloo text-[17px] sm:text-[18px] font-bold text-[#004c6e] mb-1.5">
                    2. Nếu quên ghi nội dung chuyển khoản hoặc ghi sai thì sao?
                  </h3>
                  <p className="text-[15px] leading-[26px] text-[#575e70]">
                    Bố mẹ đừng lo lắng, hãy chụp lại màn hình biên lai chuyển khoản thành công và gửi ngay cho đội ngũ hỗ trợ qua Hotline/Zalo hoặc Fanpage OTTOPIA. Đội ngũ chăm sóc khách hàng sẽ kiểm tra và kích hoạt thủ công cho bé ngay lập tức.
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#e8edf5] bg-white p-5 shadow-sm">
                  <h3 className="font-baloo text-[17px] sm:text-[18px] font-bold text-[#004c6e] mb-1.5">
                    3. Chính sách hoàn tiền và đổi gói như thế nào?
                  </h3>
                  <p className="text-[15px] leading-[26px] text-[#575e70]">
                    OTTOPIA có chính sách hỗ trợ hoàn tiền hoặc nâng cấp gói học trong các trường hợp chuyển nhầm hoặc sự cố kỹ thuật. Bố mẹ vui lòng tham khảo chi tiết tại trang{' '}
                    <Link to="/refund" className="font-semibold text-[#0a7ad8] underline hover:text-[#0860ab]">
                      Chính sách Đổi trả và Hoàn tiền
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Need help box */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[20px] bg-gradient-to-r from-[#0a7ad8] to-[#2799f9] p-6 text-white shadow-md">
                <div>
                  <h3 className="font-baloo text-[19px] sm:text-[21px] font-bold">Cần hỗ trợ thanh toán trực tiếp?</h3>
                  <p className="font-vietnam text-[14px] sm:text-[15px] text-blue-50 mt-1">
                    Đội ngũ OTTOPIA luôn sẵn sàng hỗ trợ bố mẹ 24/7.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="rounded-full bg-white px-6 py-3 font-baloo text-[15px] font-bold text-[#0a7ad8] shadow-sm hover:bg-[#f0f8ff] transition-all whitespace-nowrap active:scale-95"
                >
                  Liên hệ hỗ trợ ngay
                </Link>
              </div>
            </section>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
