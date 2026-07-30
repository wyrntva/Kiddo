import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import SEO from '../../components/common/SEO'
import AuthShell from '../auth/_components/AuthShell'
import AuthInput from '../auth/_components/AuthInput'
import { ChildAgeIcon, EmailIcon, EyeToggleIcon, LockIcon, PhoneIcon, UserIcon } from '../auth/_components/authIcons'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, user, loading: authLoading } = useAuth()
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
    gender: '',
    password: '',
    confirmPassword: '',
  })

  if (!authLoading && user) return <Navigate to="/" replace />

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
    setError('')
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const normalizedEmail = form.email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Vui lòng nhập đúng địa chỉ email')
      return
    }

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
        email: normalizedEmail,
        password: form.password,
        phone: form.phone || undefined,
        gender: form.gender as 'MALE' | 'FEMALE' | 'OTHER',
        childAge: Number(form.childAge),
        role: 'CHILD',
      })
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Đăng ký tài khoản" noindex={true} />
      <AuthShell
        title="Tham gia OTTOPIA!"
        subtitle="Bắt đầu hành trình học kỹ năng sống thú vị"
      cardTitle="Đăng ký"
      cardDescription={<p>Tạo tài khoản để bắt đầu hành trình cùng OTTOPIA</p>}
      cardClassName="gap-5 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-10"
    >
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm font-vietnam">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-4 items-start w-full">
        <AuthInput icon={<UserIcon />}>
          <input name="parentName" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Họ và tên phụ huynh" type="text" value={form.parentName} onChange={handleChange} required />
        </AuthInput>

        <AuthInput icon={<PhoneIcon />}>
          <input name="phone" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Số điện thoại" type="tel" value={form.phone} onChange={handleChange} required />
        </AuthInput>

        <AuthInput icon={<EmailIcon />}>
          <input name="email" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={handleChange} required />
        </AuthInput>

        <AuthInput icon={<UserIcon />}>
          <input name="childName" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Tên bé" type="text" value={form.childName} onChange={handleChange} required />
        </AuthInput>

        <AuthInput icon={<ChildAgeIcon />}>
          <select name="childAge" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam cursor-pointer" value={form.childAge} onChange={handleChange}>
            <option value="3">Bé 3 tuổi</option>
            <option value="4">Bé 4 tuổi</option>
            <option value="5">Bé 5 tuổi</option>
          </select>
        </AuthInput>

        <AuthInput icon={<UserIcon />}>
          <select name="gender" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam cursor-pointer" value={form.gender} onChange={handleChange} required>
            <option value="" disabled>Chọn giới tính</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
            <option value="OTHER">Khác</option>
          </select>
        </AuthInput>

        <AuthInput
          icon={<LockIcon />}
          suffix={
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="focus:outline-none shrink-0">
              <EyeToggleIcon />
            </button>
          }
        >
          <input name="password" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Mật khẩu (tối thiểu 6 ký tự)" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} minLength={6} maxLength={128} required />
        </AuthInput>

        <AuthInput
          icon={<LockIcon />}
          suffix={
            <button type="button" onClick={() => setShowConfirm((value) => !value)} className="focus:outline-none shrink-0">
              <EyeToggleIcon />
            </button>
          }
        >
          <input name="confirmPassword" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Xác nhận mật khẩu" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} required />
        </AuthInput>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-all duration-150 shadow-md hover:shadow-lg mt-2"
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <div className="flex gap-2 items-center justify-center w-full">
          <span className="font-vietnam text-[16px] text-[#8690a7]">Đã có tài khoản?</span>
          <Link to="/login" className="font-vietnam font-medium text-[16px] text-[#0a7ad8] hover:text-[#085fb0] transition-colors">
            Đăng nhập
          </Link>
        </div>
      </form>
    </AuthShell>
    </>
  )
}
