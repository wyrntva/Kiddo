import { useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Vui lòng điền vào trường này.'
    if (!email.trim()) {
      newErrors.email = 'Vui lòng điền vào trường này.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Địa chỉ email không đúng định dạng.'
    }
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng điền vào trường này.'
    } else if (!/^\d{10,11}$/.test(phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ.'
    }
    if (!message.trim()) newErrors.message = 'Vui lòng điền vào trường này.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setErrors({})
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faff]">
      <SEO
        title="Liên hệ với OTTOPIA"
        description="Liên hệ với OTTOPIA để nhận hỗ trợ về các khóa học kỹ năng sống cho trẻ."
      />
      <Navbar />
      <main className="w-full flex-1 px-4 pb-12 pt-6 sm:px-6 md:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-[24px] border border-[#d8edfa] bg-white shadow-[0_8px_28px_rgba(0,76,110,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Contact Form */}
            <div className="p-6 sm:p-10 lg:p-14 border-r border-[#eef5fa]">
              <h1 className="font-baloo text-[28px] font-bold text-[#004c6e] mb-2">Liên hệ với chúng tôi</h1>
              <p className="font-vietnam text-[16px] text-[#575e70] mb-8">
                Hãy để lại lời nhắn, OTTOPIA sẽ phản hồi bạn trong vòng 24 giờ làm việc.
              </p>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-[12px] font-vietnam text-[15px]">
                  Cảm ơn bạn! Lời nhắn của bạn đã được gửi đi thành công.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">Họ và tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                    }}
                    placeholder="Họ và tên của phụ huynh"
                    className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px]`}
                  />
                  {errors.name && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                      }}
                      placeholder="parent@example.com"
                      className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px]`}
                    />
                    {errors.email && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">Số điện thoại</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                      }}
                      placeholder="0987654321"
                      className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px]`}
                    />
                    {errors.phone && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">Lời nhắn</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (errors.message) setErrors(prev => ({ ...prev, message: '' }))
                    }}
                    placeholder="Nội dung cần hỗ trợ..."
                    className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px] resize-none`}
                  />
                  {errors.message && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-3 rounded-[40px] transition-all duration-150 shadow-md cursor-pointer text-center"
                >
                  {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
              </form>
            </div>

            {/* Right Side: Information */}
            <div className="bg-[#fef9ed]/50 p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <h2 className="font-baloo text-[24px] font-bold text-[#004c6e] mb-6">Thông tin liên hệ</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-[#fef3d3]">
                      <svg className="w-5 h-5 text-[#fea01f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-vietnam font-bold text-[15px] text-[#3e484f]">Hotline</p>
                      <p className="font-vietnam text-[16px] text-[#575e70]">0987654321</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-[#fef3d3]">
                      <svg className="w-5 h-5 text-[#fea01f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-vietnam font-bold text-[15px] text-[#3e484f]">Email</p>
                      <p className="font-vietnam text-[16px] text-[#575e70]">ottopia@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-[#fef3d3]">
                      <svg className="w-5 h-5 text-[#fea01f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-vietnam font-bold text-[15px] text-[#3e484f]">Địa chỉ</p>
                      <p className="font-vietnam text-[16px] text-[#575e70]">Tầng 3, Tòa nhà OTTOPIA, Cầu Giấy, Hà Nội</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#fef3d3]">
                <p className="font-vietnam font-medium text-[15px] text-[#575e70] mb-3">Kết nối xã hội</p>
                <a
                  href="https://www.facebook.com/ottopia.kynangsongchotre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0a7ad8] hover:text-[#085fb0] font-vietnam font-medium text-[15px] transition-colors"
                >
                  Ghé thăm Facebook của OTTOPIA
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
