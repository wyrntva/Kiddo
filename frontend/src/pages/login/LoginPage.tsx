import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthShell from '../auth/_components/AuthShell'
import AuthInput from '../auth/_components/AuthInput'
import { EyeToggleIcon, LockIcon, PhoneIcon } from '../auth/_components/authIcons'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user, loading: authLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const redirectTo = location.state?.from?.pathname || '/home'

  if (!authLoading && user) return <Navigate to={redirectTo} replace />

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(phone, password)
      navigate(redirectTo, { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Chào mừng đến với OTTOPIA!"
      subtitle="Cùng bé học hỏi, trưởng thành và khám phá mỗi ngày"
      cardTitle="Đăng nhập"
      cardDescription={
        <>
          <p>Đăng nhập để tiếp tục hành trình học kỹ năng sống</p>
          <p>cùng OTTOPIA</p>
        </>
      }
      cardClassName="gap-6 md:gap-10 p-6 md:p-12"
    >
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm font-vietnam -mt-4">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-6 items-start w-full">
        <div className="flex flex-col gap-6 items-start w-full">
          <AuthInput icon={<PhoneIcon />}>
            <input
              className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam font-normal placeholder-[#8690a7]"
              placeholder="Số điện thoại"
              type="text"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value)
                setError('')
              }}
              required
            />
          </AuthInput>

          <div className="flex flex-col gap-2 items-end w-full">
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
                placeholder="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError('')
                }}
                required
              />
            </AuthInput>

            <button
              type="button"
              onClick={() => alert('Tính năng đặt lại mật khẩu sẽ sớm ra mắt!')}
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
            <Link to="/register" className="font-vietnam font-medium text-[16px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors cursor-pointer">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </form>
    </AuthShell>
  )
}
