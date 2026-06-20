import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/common/Footer'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, user, loading: authLoading } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(phone, password)
      navigate('/home')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-white font-vietnam select-none overflow-x-hidden">
      {/* Background Image Layer */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
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
            className="absolute h-[175%] w-auto max-w-none top-[-37.5%] left-[50%] -translate-x-[68%] opacity-80"
            src="/assets/121f63ceef1e389d2946ff30bafb9c25e7246752.png"
          />
        </div>
      </div>

      {/* Top spacing / mobile branding */}
      <div className="z-10 shrink-0 flex flex-col items-center w-full px-6 pt-8 lg:pt-8 lg:h-8">
        <div className="lg:hidden flex flex-col items-center gap-2 text-center">
          <img
            src="/assets/logo_ottopia.png"
            alt="OTTOPIA"
            className="h-16 w-auto object-contain animate-float"
          />
          <p className="font-vietnam text-[14px] font-bold text-[#575e70] max-w-[280px]">
            Cùng bé học hỏi, trưởng thành và khám phá mỗi ngày
          </p>
        </div>
      </div>

      <main className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 z-10 flex-1 py-8 lg:py-6">

        {/* Left Side: Welcome & Otter Mascot (hidden on mobile, visible on desktop) */}
        <div className="hidden lg:flex flex-col items-center justify-center h-auto lg:h-[698px] w-full lg:w-[600px] shrink-0 select-none">
          <div className="flex flex-col items-center leading-none text-center w-full mb-6 lg:mb-0">
            <h1 className="font-baloo text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#004c6e] leading-tight lg:leading-[80px] whitespace-normal lg:whitespace-nowrap">
              Chào mừng đến với OTTOPIA!
            </h1>
            <p className="font-vietnam text-[16px] md:text-[20px] lg:text-[24px] font-bold text-[#37393e] leading-normal lg:leading-[32px] max-w-[600px] lg:max-w-none lg:whitespace-nowrap">
              Cùng bé học hỏi, trưởng thành và khám phá mỗi ngày
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

        {/* Right Side: Login Card */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto">
          <div className="bg-white/90 backdrop-blur-md border border-[#e6f4fe] lg:border-[#8690a7] shadow-xl lg:shadow-md flex flex-col gap-6 md:gap-10 items-center max-w-[600px] p-6 md:p-12 rounded-[24px] shrink-0 w-full lg:w-[600px] transition-all duration-300">

            <div className="flex flex-col items-center text-center w-full">
              <h2 className="font-baloo text-[28px] md:text-[32px] text-[#001e2f] leading-tight lg:leading-[56px] font-bold">
                Đăng nhập
              </h2>
              <div className="font-vietnam text-[14px] md:text-[16px] text-[#575e70] leading-[24px] text-center max-w-[400px]">
                <p>Đăng nhập để tiếp tục hành trình học kỹ năng sống</p>
                <p>cùng OTTOPIA</p>
              </div>
            </div>

            {error && (
              <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm font-vietnam -mt-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-6 items-start w-full">

              <div className="flex flex-col gap-6 items-start w-full">
                {/* Phone Input */}
                <div className="bg-white border border-[#8690a7] border-solid flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                  <svg className="w-5 h-5 text-[#8690a7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input
                    className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-normal placeholder-[#8690a7]"
                    placeholder="Số điện thoại"
                    type="text"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError('') }}
                    required
                  />
                </div>

                {/* Password Input Group */}
                <div className="flex flex-col gap-2 items-end w-full">
                  <div className="bg-white border border-[#8690a7] border-solid flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
                    <div className="relative shrink-0 w-6 h-6">
                      <img
                        alt="Lock icon"
                        className="absolute w-[14px] h-[20px] left-[5px] top-[2px] object-contain"
                        src="/assets/98e20cdb15ee154c0636276207e8cf86aaff39b3.svg"
                      />
                    </div>
                    <input
                      className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-normal placeholder-[#8690a7]"
                      placeholder="Mật khẩu"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError('') }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none hover:opacity-80 transition-opacity relative shrink-0 w-6 h-6"
                    >
                      <img
                        alt="Toggle password visibility"
                        className="absolute w-[19.5px] h-[13.5px] left-[2.25px] top-[5.25px] object-contain"
                        src="/assets/0f1fdc8e06de81e48e422b04c4231df34e8ce723.svg"
                      />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="font-vietnam font-medium text-[16px] text-[#fea01f] hover:text-[#e58f1a] transition-colors cursor-pointer"
                  >
                    Quên mật khẩu
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6 items-start w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer"
                >
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                <div className="flex gap-2 items-center justify-center shrink-0 w-full">
                  <span className="font-vietnam text-[16px] text-[#8690a7] whitespace-nowrap">Chưa có tài khoản?</span>
                  <Link
                    to="/register"
                    className="font-vietnam font-medium text-[16px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors cursor-pointer"
                  >
                    Đăng ký ngay
                  </Link>
                </div>
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
