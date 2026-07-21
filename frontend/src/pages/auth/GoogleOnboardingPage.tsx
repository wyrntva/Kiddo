import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthInput from './_components/AuthInput'
import AuthShell from './_components/AuthShell'
import { ChildAgeIcon, PhoneIcon, UserIcon } from './_components/authIcons'

export default function GoogleOnboardingPage() {
  const navigate = useNavigate()
  const { completeGoogleRegistration, user, loading: authLoading } = useAuth()
  const credential = sessionStorage.getItem('googleOnboardingCredential')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    parentName: '',
    phone: '',
    name: '',
    childAge: '3',
    gender: '',
  })

  if (!authLoading && user) return <Navigate to="/home" replace />
  if (!credential) return <Navigate to="/login" replace />

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
    setError('')
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!form.gender) {
      setError('Vui lòng chọn giới tính')
      return
    }

    setLoading(true)
    setError('')
    try {
      await completeGoogleRegistration(credential!, {
        parentName: form.parentName,
        phone: form.phone,
        name: form.name,
        childAge: Number(form.childAge),
        gender: form.gender as 'MALE' | 'FEMALE' | 'OTHER',
      })
      const redirectTo = sessionStorage.getItem('googleOnboardingRedirect') || '/home'
      sessionStorage.removeItem('googleOnboardingCredential')
      sessionStorage.removeItem('googleOnboardingRedirect')
      navigate(redirectTo, { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể hoàn tất đăng ký')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Chào mừng đến với OTTOPIA!"
      subtitle="Chỉ còn một bước để bắt đầu hành trình cùng bé"
      cardTitle="Hoàn tất thông tin"
      cardDescription={<p>Vui lòng bổ sung thông tin của bé và phụ huynh</p>}
      cardClassName="gap-5 md:gap-8 p-5 sm:p-6 md:p-8 lg:p-10"
    >
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm font-vietnam">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-4 items-start w-full">
        <AuthInput icon={<UserIcon />}>
          <input name="parentName" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Họ và tên phụ huynh" value={form.parentName} onChange={handleChange} required />
        </AuthInput>

        <AuthInput icon={<PhoneIcon />}>
          <input name="phone" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Số điện thoại" type="tel" value={form.phone} onChange={handleChange} required />
        </AuthInput>

        <AuthInput icon={<UserIcon />}>
          <input name="name" className="outline-none bg-transparent w-full text-[16px] text-black font-vietnam placeholder-[#8690a7]" placeholder="Tên bé" value={form.name} onChange={handleChange} required />
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

        <button type="submit" disabled={loading} className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-vietnam font-bold text-[16px] py-[12px] w-full rounded-[40px] transition-all duration-150 shadow-md hover:shadow-lg mt-2">
          {loading ? 'Đang hoàn tất...' : 'Hoàn tất đăng ký'}
        </button>
      </form>
    </AuthShell>
  )
}
