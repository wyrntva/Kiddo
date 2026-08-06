import { useState, useEffect } from 'react'
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
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    fetch(`${API_URL}/api/store-settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.warn('Lỗi khi tải thông tin liên hệ:', err))
  }, [])

  const contactPhone = settings?.phone_number || "0987654321"
  const contactEmail = settings?.gmail || "ottopia@gmail.com"
  const contactFacebook = settings?.facebook_url || "https://www.facebook.com/ottopia.kynangsongchotre"

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
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, message }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Gửi liên hệ thất bại')
        setSubmitted(true)
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setErrors({})
      })
      .catch((err) => {
        setErrors({ submit: err.message || 'Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.' })
      })
      .finally(() => {
        setLoading(false)
      })
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
            <div className="p-6 sm:p-10 lg:p-14 border-b md:border-b-0 md:border-r border-[#eef5fa]">
              <h1 className="font-baloo text-[28px] font-bold text-[#004c6e] mb-2">Liên hệ với chúng tôi</h1>
              <p className="font-vietnam text-[16px] text-[#575e70] mb-8">
                Hãy để lại lời nhắn, OTTOPIA sẽ phản hồi bạn trong vòng 24 giờ làm việc.
              </p>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-[12px] font-vietnam text-[15px]">
                  Cảm ơn bạn! Lời nhắn của bạn đã được gửi đi thành công.
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[12px] font-vietnam text-[15px]">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setSubmitted(false)
                      setErrors(prev => ({ ...prev, name: '', submit: '' }))
                    }}
                    placeholder="Họ và tên của phụ huynh"
                    className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px]`}
                  />
                  {errors.name && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setSubmitted(false)
                        setErrors(prev => ({ ...prev, email: '', submit: '' }))
                      }}
                      placeholder="parent@example.com"
                      className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px]`}
                    />
                    {errors.email && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        setSubmitted(false)
                        setErrors(prev => ({ ...prev, phone: '', submit: '' }))
                      }}
                      placeholder="0987654321"
                      className={`w-full px-4 py-2.5 rounded-[12px] border ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#d8edfa] focus:border-[#fea01f]'} focus:outline-none font-vietnam text-[15px]`}
                    />
                    {errors.phone && <p className="text-[13px] text-red-500 font-vietnam mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-vietnam font-medium text-[15px] text-[#3e484f] mb-1.5">
                    Lời nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      setSubmitted(false)
                      setErrors(prev => ({ ...prev, message: '', submit: '' }))
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
            <div className="bg-[#fef9ed]/50 p-6 sm:p-10 lg:p-14 flex flex-col gap-10 md:justify-between">
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
                      <p className="font-vietnam text-[16px] text-[#575e70]">{contactPhone}</p>
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
                      <p className="font-vietnam text-[16px] text-[#575e70]">{contactEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#fef3d3]">
                <p className="font-vietnam font-medium text-[15px] text-[#575e70] mb-3">Kết nối xã hội</p>
                <a
                  href={contactFacebook}
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
