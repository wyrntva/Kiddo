import { useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import { useAuth } from '../../context/AuthContext'

const PRESET_AVATARS = [
  { type: 'image', value: '/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.webp', label: 'Bé con' },
  { type: 'image', value: '/assets/63994d049c46d89ab6ace318a3f3b1fb39d17839.webp', label: 'Otter Otter' },
  { type: 'image', value: '/assets/toro-chatbot-DJuM-Q15.webp', label: 'Toro Toro' },
  { type: 'emoji', value: '🦁', label: 'Sư tử' },
  { type: 'emoji', value: '🦊', label: 'Cáo nhỏ' },
  { type: 'emoji', value: '🐼', label: 'Panda' },
  { type: 'emoji', value: '🐻', label: 'Gấu nâu' },
  { type: 'emoji', value: '🐱', label: 'Mèo con' },
  { type: 'emoji', value: '🐰', label: 'Thỏ bông' },
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function ProfilePage() {
  const { user, updateProfile, accessToken } = useAuth()
  
  // Tab control state
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')

  // Profile Form State
  const [form, setForm] = useState({
    parentName: user?.parentName || '',
    phone: user?.phone || '',
    name: user?.name || '',
    childAge: user?.childAge ? String(user.childAge) : '3',
    gender: user?.gender || 'OTHER',
    avatar: user?.avatar || '/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.webp',
  })

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)

  if (!user) return null

  const isAvatarEmoji = (val: string) => {
    return val && !val.startsWith('/') && !val.includes('.')
  }

  const resolveAvatar = (avatar: string) => {
    if (!avatar) return '/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.webp'
    if (isAvatarEmoji(avatar)) return avatar
    if (avatar.startsWith('http') || avatar.startsWith('data:')) return avatar
    if (avatar.startsWith('/uploads')) return `${API_URL}${avatar}`
    return avatar
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
    setError('')
    setSuccess(false)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
    setError('')
    setSuccess(false)
  }

  function handleSelectGender(gender: 'MALE' | 'FEMALE' | 'OTHER') {
    setForm((previous) => ({ ...previous, gender }))
    setError('')
    setSuccess(false)
  }

  function handleSelectAvatar(avatarValue: string) {
    setForm((previous) => ({ ...previous, avatar: avatarValue }))
    setAvatarModalOpen(false)
    setSuccess(false)
  }

  async function handleUploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước ảnh không được vượt quá 5MB')
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch(`${API_URL}/api/auth/profile/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      const resData = await response.json()
      if (!response.ok) throw new Error(resData.message || 'Tải ảnh lên thất bại')

      setForm((previous) => ({ ...previous, avatar: resData.avatarUrl }))
      setAvatarModalOpen(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể tải ảnh lên')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitProfile(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await updateProfile({
        name: form.name,
        parentName: form.parentName,
        phone: form.phone,
        gender: form.gender as 'MALE' | 'FEMALE' | 'OTHER',
        childAge: Number(form.childAge),
        avatar: form.avatar,
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lưu thông tin thất bại')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitPassword(event: React.FormEvent) {
    event.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Xác nhận mật khẩu mới không khớp')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      setError('Mật khẩu mới phải chứa ít nhất 6 ký tự')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch(`${API_URL}/api/auth/profile/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      const resData = await response.json()
      if (!response.ok) throw new Error(resData.message || 'Đổi mật khẩu thất bại')

      setSuccess(true)
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể đổi mật khẩu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4fafd] font-vietnam">
      <SEO title="Thông tin cá nhân" noindex={true} />
      <Navbar />

      <main className="w-full flex-1 max-w-[1920px] mx-auto px-4 md:px-6 xl:px-[48px] py-6 sm:py-8 flex flex-col gap-6">
        <div className="w-full max-w-[1824px] mx-auto flex flex-col lg:flex-row gap-6 items-start mt-[10px]">
          
          {/* Left Column: Avatar and Stats */}
          <div className="w-full lg:w-[360px] xl:w-[400px] flex flex-col gap-6 shrink-0">
            <div className="bg-white rounded-[24px] border border-[#e2e6ef] shadow-sm p-6 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4" onClick={() => setAvatarModalOpen(true)}>
                <div className="bg-[#e6f4fe] border-4 border-[#0a7ad8]/10 rounded-full size-[120px] sm:size-[140px] flex items-center justify-center overflow-hidden relative shadow-inner">
                  {isAvatarEmoji(form.avatar) ? (
                    <span className="text-6xl sm:text-7xl select-none">{form.avatar}</span>
                  ) : (
                    <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={resolveAvatar(form.avatar)} />
                  )}
                </div>
                <div className="absolute bottom-1 right-1 bg-[#0a7ad8] hover:bg-[#0868ba] text-white p-2 rounded-full shadow-md flex items-center justify-center transition-all group-hover:scale-105 size-[36px] sm:size-[40px]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              <h2 className="font-baloo text-[22px] font-bold text-[#001e2f] leading-none mb-1">{user.name}</h2>
              <p className="text-[14px] text-[#575e70] mb-4">{user.email}</p>


            </div>
          </div>

          {/* Right Column: Tabbed Edit Section */}
          <div className="flex-1 w-full bg-white rounded-[24px] border border-[#e2e6ef] shadow-sm p-5 sm:p-8">
            
            {/* Tabs Selector */}
            <div className="flex gap-6 border-b border-[#f0f2f7] mb-6">
              <button
                type="button"
                onClick={() => { setActiveTab('profile'); setError(''); setSuccess(false); }}
                className={`pb-3 font-baloo text-[18px] font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-[#0a7ad8] text-[#0a7ad8]'
                    : 'border-transparent text-[#8690a7] hover:text-[#575e70]'
                }`}
              >
                Thông tin cá nhân
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('password'); setError(''); setSuccess(false); }}
                className={`pb-3 font-baloo text-[18px] font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'password'
                    ? 'border-[#0a7ad8] text-[#0a7ad8]'
                    : 'border-transparent text-[#8690a7] hover:text-[#575e70]'
                }`}
              >
                Đổi mật khẩu
              </button>
            </div>

            {error && (
              <div className="w-full bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-600 text-sm mb-6 animate-shake">
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div className="w-full bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 text-green-600 text-sm mb-6 flex items-center gap-2 animate-fade-in-down">
                ✅ Thao tác thành công!
              </div>
            )}

            {/* Tab 1: Profile Form */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmitProfile} className="flex flex-col gap-6 items-start w-full">
                
                {/* Parent Info Section */}
                <div className="w-full flex flex-col gap-4">
                  <h3 className="font-baloo text-[18px] font-bold text-[#37393e] border-b border-[#f0f2f7] pb-2">
                    Thông tin phụ huynh
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[14px] font-bold text-[#575e70]">Họ và tên phụ huynh</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                        <input
                          name="parentName"
                          className="outline-none bg-transparent w-full text-[16px] text-black"
                          placeholder="Nhập tên phụ huynh"
                          value={form.parentName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[14px] font-bold text-[#575e70]">Số điện thoại</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                        <input
                          name="phone"
                          className="outline-none bg-transparent w-full text-[16px] text-black"
                          placeholder="Nhập số điện thoại"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold text-[#575e70]">Địa chỉ Email (Đăng ký tài khoản)</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#e2e2ea] bg-gray-50 text-gray-500 cursor-not-allowed">
                      <svg className="w-5 h-5 text-[#8690a7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        className="outline-none bg-transparent w-full text-[16px] text-gray-500 cursor-not-allowed"
                        value={user.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Child Info Section */}
                <div className="w-full flex flex-col gap-4 mt-2">
                  <h3 className="font-baloo text-[18px] font-bold text-[#37393e] border-b border-[#f0f2f7] pb-2">
                    Thông tin của bé
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[14px] font-bold text-[#575e70]">Tên/Biệt danh của bé</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                        <input
                          name="name"
                          className="outline-none bg-transparent w-full text-[16px] text-black"
                          placeholder="Nhập tên bé"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[14px] font-bold text-[#575e70]">Tuổi của bé</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                        <select
                          name="childAge"
                          className="outline-none bg-transparent w-full text-[16px] text-black cursor-pointer"
                          value={form.childAge}
                          onChange={handleChange}
                        >
                          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                            <option key={age} value={age}>
                              {age} tuổi
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold text-[#575e70]">Giới tính của bé</label>
                    <div className="grid grid-cols-3 gap-3 w-full">
                      {[
                        { value: 'MALE', label: 'Bé Trai' },
                        { value: 'FEMALE', label: 'Bé Gái' },
                        { value: 'OTHER', label: 'Khác' },
                      ].map((genderOption) => {
                        const isSelected = form.gender === genderOption.value
                        return (
                          <button
                            key={genderOption.value}
                            type="button"
                            onClick={() => handleSelectGender(genderOption.value as any)}
                            className={`rounded-full border py-3 text-center font-vietnam text-[15px] font-bold shadow-sm transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#0a7ad8] bg-[#0a7ad8] text-white shadow-[0_4px_12px_rgba(10,122,216,0.22)]'
                                : 'border-[#c9e6ff] bg-[#f4fafd] text-[#0a7ad8] hover:border-[#0a7ad8] hover:bg-[#e5f2ff]'
                            }`}
                          >
                            {genderOption.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-baloo font-bold text-[18px] py-3 px-8 rounded-full transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer mt-4 self-end"
                >
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </form>
            )}

            {/* Tab 2: Password Form */}
            {activeTab === 'password' && (
              <form onSubmit={handleSubmitPassword} className="flex flex-col gap-6 items-start w-full">
                <div className="w-full flex flex-col gap-4">
                  <h3 className="font-baloo text-[18px] font-bold text-[#37393e] border-b border-[#f0f2f7] pb-2">
                    Đổi mật khẩu tài khoản
                  </h3>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] font-bold text-[#575e70]">Mật khẩu hiện tại</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                      <input
                        name="oldPassword"
                        type="password"
                        className="outline-none bg-transparent w-full text-[16px] text-black"
                        placeholder="Nhập mật khẩu hiện tại"
                        value={passwordForm.oldPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[14px] font-bold text-[#575e70]">Mật khẩu mới</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                        <input
                          name="newPassword"
                          type="password"
                          className="outline-none bg-transparent w-full text-[16px] text-black"
                          placeholder="Tối thiểu 6 ký tự"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[14px] font-bold text-[#575e70]">Xác nhận mật khẩu mới</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#c9e6ff] bg-[#f4fafd]/50 focus-within:border-[#0a7ad8] focus-within:bg-white transition-all">
                        <input
                          name="confirmPassword"
                          type="password"
                          className="outline-none bg-transparent w-full text-[16px] text-black"
                          placeholder="Nhập lại mật khẩu mới"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0a7ad8] hover:bg-[#085fb0] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-baloo font-bold text-[18px] py-3 px-8 rounded-full transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer mt-4 self-end"
                >
                  {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                </button>
              </form>
            )}

          </div>
        </div>
      </main>
      <Footer />

      {/* Avatar Modal Selector */}
      {avatarModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#e2e6ef] shadow-2xl max-w-md w-full p-6 animate-zoom-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-baloo text-[22px] font-bold text-[#004c6e]">Chọn Avatar của bé</h3>
              <button onClick={() => setAvatarModalOpen(false)} className="text-[#8690a7] hover:text-[#313235] cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-h-[360px] overflow-y-auto p-1">
              
              {/* Special Custom Image Upload Card */}
              <div
                onClick={() => document.getElementById('avatar-file-input')?.click()}
                className="border-2 border-dashed border-[#0a7ad8] rounded-[20px] p-3 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm bg-[#f4fafd] hover:bg-[#e6f4fe] group"
              >
                <div className="size-[60px] rounded-full bg-white flex items-center justify-center text-[#0a7ad8] mb-1 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[12px] font-bold text-[#0a7ad8] mt-1 text-center">Tải ảnh lên</span>
                <input
                  id="avatar-file-input"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleUploadAvatar}
                />
              </div>

              {PRESET_AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectAvatar(avatar.value)}
                  className={`border-2 rounded-[20px] p-3 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm ${
                    form.avatar === avatar.value
                      ? 'border-[#0a7ad8] bg-[#f4fafd]'
                      : 'border-[#e2e6ef] bg-white hover:border-[#0a7ad8]'
                  }`}
                >
                  {avatar.type === 'emoji' ? (
                    <span className="text-5xl select-none py-1">{avatar.value}</span>
                  ) : (
                    <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden mb-1">
                      <img alt={avatar.label} className="absolute inset-0 size-full object-cover" src={resolveAvatar(avatar.value)} />
                    </div>
                  )}
                  <span className="text-[12px] font-bold text-[#575e70] mt-1 text-center">{avatar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
