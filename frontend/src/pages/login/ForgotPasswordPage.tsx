import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import AuthShell from '../auth/_components/AuthShell'
import AuthInput from '../auth/_components/AuthInput'
import { EmailIcon, EyeToggleIcon, LockIcon } from '../auth/_components/authIcons'

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (typeof window !== 'undefined' && window.location && window.location.hostname.includes('ottopia.vn')) {
    return window.location.origin
  }
  return 'http://localhost:5000'
}

const API_URL = getApiUrl()

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [timer, setTimer] = useState(0)

  // Resend code countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  // Step 1: Send verification code to email
  const handleRequestCode = async (event?: React.FormEvent) => {
    if (event) event.preventDefault()
    setError('')
    setSuccessMessage('')

    const normalizedEmail = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Vui lòng nhập đúng địa chỉ email')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Gửi mã xác nhận thất bại')
      }

      setSuccessMessage(data.message || 'Mã xác nhận đã được gửi vào email của bạn.')
      setStep(2)
      setTimer(60) // Start 60s cooldown
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gửi mã xác nhận thất bại')
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify code
  const handleVerifyCode = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (code.trim().length !== 6) {
      setError('Mã xác nhận phải gồm đúng 6 ký tự')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code: code.trim().toUpperCase(),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Xác minh mã thất bại')
      }

      setSuccessMessage('Xác minh mã thành công!')
      setTimeout(() => {
        setSuccessMessage('')
        setStep(3)
      }, 1000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Xác minh mã thất bại')
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Reset password
  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code: code.trim().toUpperCase(),
          newPassword,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Đặt lại mật khẩu thất bại')
      }

      setSuccessMessage('Mật khẩu đã được cập nhật thành công!')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đặt lại mật khẩu thất bại')
    } finally {
      setLoading(false)
    }
  }

  const getCardTitle = () => {
    if (step === 1) return 'Quên mật khẩu'
    if (step === 2) return 'Xác minh mã'
    return 'Đặt lại mật khẩu'
  }

  const getCardDescription = () => {
    if (step === 1) {
      return <p>Nhập email của bạn để nhận mã xác minh khôi phục mật khẩu</p>
    }
    if (step === 2) {
      return (
        <p>
          Chúng tôi đã gửi mã xác minh 6 ký tự đến email <strong className="text-black">{email}</strong>. 
          Vui lòng nhập mã để tiếp tục.
        </p>
      )
    }
    return <p>Thiết lập mật khẩu mới cho tài khoản của bạn.</p>
  }

  return (
    <>
      <SEO title="Quên mật khẩu" noindex={true} />
      <AuthShell
        title="Chào mừng đến với OTTOPIA!"
        subtitle="Cùng bé học hỏi, trưởng thành và khám phá mỗi ngày"
        cardTitle={getCardTitle()}
        cardDescription={getCardDescription()}
        cardClassName="gap-6 md:gap-8 p-4 sm:p-6 md:p-12"
      >
        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm font-vietnam -mt-4 animate-fadeIn">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="w-full bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 text-green-600 text-sm font-vietnam -mt-4 animate-fadeIn">
            {successMessage}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestCode} className="flex flex-col gap-6 items-start w-full">
            <AuthInput icon={<EmailIcon />}>
              <input
                className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-normal placeholder-[#8690a7]"
                placeholder="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError('')
                }}
                required
              />
            </AuthInput>

            <div className="flex flex-col gap-4 items-start w-full">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer"
              >
                {loading ? 'Đang gửi mã...' : 'Gửi mã xác nhận'}
              </button>

              <div className="flex justify-center shrink-0 w-full">
                <Link to="/login" className="font-vietnam font-medium text-[16px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors cursor-pointer">
                  Quay lại Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-4 items-start w-full">
              <div className="w-full flex gap-2 items-center">
                <AuthInput>
                  <input
                    className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-bold tracking-[6px] text-center placeholder-[#8690a7]"
                    placeholder="MÃ XÁC MINH (6 KÝ TỰ)"
                    type="text"
                    maxLength={6}
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value.toUpperCase())
                      setError('')
                    }}
                    required
                  />
                </AuthInput>
                
                <button
                  type="button"
                  disabled={timer > 0 || loading}
                  onClick={() => handleRequestCode()}
                  className="shrink-0 bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed font-vietnam font-semibold text-[14px] text-[#575e70] px-4 py-3 rounded-[24px] transition-all"
                >
                  {timer > 0 ? `${timer}s` : 'Gửi lại mã'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-start w-full">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer"
              >
                {loading ? 'Đang xác minh...' : 'Tiếp tục'}
              </button>

              <div className="flex justify-between w-full">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1)
                    setError('')
                    setSuccessMessage('')
                  }}
                  className="font-vietnam font-medium text-[15px] text-[#8690a7] hover:text-[#575e70] transition-colors"
                >
                  Thay đổi email
                </button>

                <Link to="/login" className="font-vietnam font-medium text-[15px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors">
                  Quay lại Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-4 items-start w-full">
              <AuthInput
                icon={<LockIcon />}
                suffix={
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="focus:outline-none hover:opacity-80 transition-opacity shrink-0">
                    <EyeToggleIcon />
                  </button>
                }
              >
                <input
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-normal placeholder-[#8690a7]"
                  placeholder="Mật khẩu mới"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value)
                    setError('')
                  }}
                  required
                />
              </AuthInput>

              <AuthInput
                icon={<LockIcon />}
                suffix={
                  <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="focus:outline-none hover:opacity-80 transition-opacity shrink-0">
                    <EyeToggleIcon />
                  </button>
                }
              >
                <input
                  className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-normal placeholder-[#8690a7]"
                  placeholder="Xác nhận mật khẩu mới"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value)
                    setError('')
                  }}
                  required
                />
              </AuthInput>
            </div>

            <div className="flex flex-col gap-4 items-start w-full">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer"
              >
                {loading ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
              </button>

              <div className="flex justify-end w-full">
                <Link to="/login" className="font-vietnam font-medium text-[15px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors">
                  Quay lại Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        )}
      </AuthShell>
    </>
  )
}
