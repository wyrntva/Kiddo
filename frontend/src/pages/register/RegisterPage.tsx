import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/common/Footer'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, user, loading: authLoading } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    childAge: '3',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let animationFrameId: number
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const width = 1280
    const height = 720

    const render = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height)

        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data

        const tMin = 4
        const tMax = 16

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const maxRB = r > b ? r : b
          const greenness = g - maxRB

          if (greenness > 0) {
            data[i + 1] = maxRB
          }

          if (greenness > tMin) {
            if (greenness > tMax) {
              data[i + 3] = 0
            } else {
              const alphaFactor = (tMax - greenness) / (tMax - tMin)
              data[i + 3] = Math.round(data[i + 3] * alphaFactor)
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)
      }
      animationFrameId = requestAnimationFrame(render)
    }

    video.play().catch(err => console.log("Video play failed:", err))
    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!authLoading && user) return <Navigate to="/home" replace />

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setLoading(true)
    setError('')
    try {
      await register({
        name: form.childName,
        parentName: form.parentName || undefined,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        role: 'CHILD',
      })
      navigate('/home')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-white font-vietnam select-none">
      {/* Background */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-screen z-0 pointer-events-none overflow-hidden bg-white">
        <div className="hidden lg:block absolute inset-0">
          <img
            alt=""
            className="absolute h-[162.9%] left-[-61.41%] max-w-none top-[-16.44%] w-[163.54%]"
            src="/assets/121f63ceef1e389d2946ff30bafb9c25e7246752.png"
          />
        </div>
        <div className="lg:hidden absolute inset-0">
          <img
            alt=""
            className="w-full h-full object-cover opacity-80"
            src="/assets/121f63ceef1e389d2946ff30bafb9c25e7246752.png"
          />
        </div>
      </div>

      <div className="h-4 lg:h-8 z-10 shrink-0" />

      <main className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 z-10 flex-1 py-12 lg:py-6">

        {/* Left Side */}
        <div className="flex flex-col items-center justify-center h-auto lg:h-[698px] w-full lg:w-[600px] shrink-0 select-none">
          <div className="flex flex-col items-center leading-none text-center w-full mb-6 lg:mb-0">
            <h1 className="font-baloo text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#004c6e] leading-tight lg:leading-[80px] whitespace-normal lg:whitespace-nowrap">
              Tham gia OTTOPIA!
            </h1>
            <p className="font-vietnam text-[16px] md:text-[20px] lg:text-[24px] font-bold text-[#37393e] leading-normal lg:leading-[32px] max-w-[600px] lg:max-w-none lg:whitespace-nowrap">
              Bắt đầu hành trình học kỹ năng sống thú vị
            </p>
          </div>
          <div className="hidden lg:block h-[586px] relative shrink-0 w-[412px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="hidden"
              >
                <source src="/login.webm" type="video/webm" />
                <source src="/login.mp4" type="video/mp4" />
              </video>
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="absolute w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Register Card */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto">
          <div className="bg-white border border-[#8690a7] border-solid drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)] flex flex-col gap-6 md:gap-8 items-center max-w-[600px] p-6 md:p-10 rounded-[24px] shrink-0 w-full lg:w-[600px] lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto">

            <div className="flex flex-col items-center text-center w-full">
              <h2 className="font-baloo text-[28px] md:text-[32px] text-[#001e2f] leading-tight lg:leading-[56px] font-bold">
                Đăng ký
              </h2>
              <p className="font-vietnam text-[14px] md:text-[16px] text-[#575e70] leading-[24px]">
                Tạo tài khoản để bắt đầu hành trình cùng OTTOPIA
              </p>
            </div>

            {error && (
              <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm font-vietnam">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start w-full">

              {/* Parent Name */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <svg className="w-5 h-5 text-[#8690a7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  name="parentName"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]"
                  placeholder="Họ và tên phụ huynh"
                  type="text"
                  value={form.parentName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <svg className="w-5 h-5 text-[#8690a7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input
                  name="phone"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]"
                  placeholder="Số điện thoại"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <img
                  alt=""
                  className="w-5 h-5 object-contain shrink-0"
                  src="/assets/26636ea7fb3d641da1aa96bf95733065868fa787.svg"
                />
                <input
                  name="email"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]"
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Child Name */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <svg className="w-5 h-5 text-[#8690a7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  name="childName"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]"
                  placeholder="Tên bé"
                  type="text"
                  value={form.childName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Child Age */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <svg className="w-5 h-5 text-[#8690a7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select
                  name="childAge"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam cursor-pointer"
                  value={form.childAge}
                  onChange={handleChange}
                >
                  <option value="3">Bé 3 tuổi</option>
                  <option value="4">Bé 4 tuổi</option>
                  <option value="5">Bé 5 tuổi</option>
                </select>
              </div>

              {/* Password */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <img
                  alt=""
                  className="w-4 h-5 object-contain shrink-0"
                  src="/assets/98e20cdb15ee154c0636276207e8cf86aaff39b3.svg"
                />
                <input
                  name="password"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]"
                  placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none shrink-0">
                  <img
                    alt=""
                    className="w-5 h-[14px] object-contain"
                    src="/assets/0f1fdc8e06de81e48e422b04c4231df34e8ce723.svg"
                  />
                </button>
              </div>

              {/* Confirm Password */}
              <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                <img
                  alt=""
                  className="w-4 h-5 object-contain shrink-0"
                  src="/assets/98e20cdb15ee154c0636276207e8cf86aaff39b3.svg"
                />
                <input
                  name="confirmPassword"
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]"
                  placeholder="Xác nhận mật khẩu"
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="focus:outline-none shrink-0">
                  <img
                    alt=""
                    className="w-5 h-[14px] object-contain"
                    src="/assets/0f1fdc8e06de81e48e422b04c4231df34e8ce723.svg"
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0a7ad8] hover:bg-[#085fb0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-colors duration-150 shadow-sm mt-2"
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>

              <div className="flex gap-2 items-center justify-center w-full">
                <span className="font-vietnam text-[16px] text-[#8690a7]">Đã có tài khoản?</span>
                <Link
                  to="/login"
                  className="font-vietnam font-medium text-[16px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors"
                >
                  Đăng nhập
                </Link>
              </div>

            </form>
          </div>
        </div>
      </main>

      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  )
}
