import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PAGE_ROUTES = {
  home:         '/home',
  explore:      '/explore',
  courses:      '/courses',
  diary:        '/diary',
  parents:      '/parents',
} as const

type Page = keyof typeof PAGE_ROUTES

// ── Icons (exact assets from Figma node 34:5045) ──────────────────────────
const imgLogo1  = "/assets/logo_ottopia.webp"
const imgImage3 = "/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.webp"
const imgBell   = "/assets/6115f81b903d7a7ab9319b63a5138ed188023521.svg"
const imgCaret  = "/assets/f27acb75d87783efe25d645b00f1389650a727c8.svg"

// ── Nav items shared between desktop tabs & mobile drawer ─────────────────
const NAV_ITEMS: { page: Page; label: string; icon: React.ReactNode }[] = [
  {
    page: 'home', label: 'Trang chủ',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 17 19" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.90847 2.12652C9.0379 1.29116 7.66339 1.29116 6.79283 2.12652L2.16639 6.56585C2.05303 6.67462 1.97679 6.81631 1.94845 6.97083C1.39432 9.99268 1.35342 13.0863 1.82746 16.1218L1.93998 16.8423H4.91644V10.6309C4.91644 10.2167 5.25222 9.88094 5.66644 9.88094H11.0349C11.4491 9.88094 11.7849 10.2167 11.7849 10.6309V16.8423H14.7613L14.8738 16.1218C15.3479 13.0863 15.307 9.99268 14.7528 6.97083C14.7245 6.81631 14.6483 6.67462 14.5349 6.56585L9.90847 2.12652ZM5.75428 1.0442C7.20522 -0.348066 9.49607 -0.348066 10.947 1.0442L15.5735 5.48353C15.914 5.81033 16.1431 6.23602 16.2282 6.70028C16.8128 9.8879 16.8559 13.1512 16.3559 16.3532L16.1751 17.5107C16.1004 17.9894 15.6881 18.3423 15.2036 18.3423H11.0349C10.6206 18.3423 10.2849 18.0065 10.2849 17.5923V11.3809H6.41644V17.5923C6.41644 18.0065 6.08065 18.3423 5.66644 18.3423H1.49771C1.01323 18.3423 0.600941 17.9894 0.526186 17.5107L0.345423 16.3532C-0.154625 13.1512 -0.111478 9.8879 0.473052 6.70028C0.558185 6.23602 0.787269 5.81033 1.12784 5.48353L5.75428 1.0442Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    page: 'explore', label: 'Khám phá',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.875 15.4554L20.875 19.4602C21.0536 19.6589 21.0448 19.9631 20.855 20.1511L20.155 20.8519C20.0611 20.9467 19.9333 21 19.8 21C19.6667 21 19.5389 20.9467 19.445 20.8519L15.445 16.8471C15.3344 16.7362 15.234 16.6156 15.145 16.4867L14.395 15.4855C13.1541 16.4776 11.613 17.0178 10.025 17.0173C6.75261 17.0287 3.90902 14.7686 3.17773 11.5751C2.44643 8.38161 4.0226 5.10699 6.9731 3.68991C9.92359 2.27284 13.461 3.09151 15.491 5.66125C17.521 8.23099 17.5019 11.866 15.445 14.4142L16.445 15.105C16.6012 15.2051 16.7454 15.3226 16.875 15.4554ZM5.025 10.0089C5.025 12.7736 7.26357 15.0149 10.025 15.0149C11.3511 15.0149 12.6228 14.4875 13.5605 13.5487C14.4982 12.6099 15.025 11.3365 15.025 10.0089C15.025 7.24411 12.7864 5.00284 10.025 5.00284C7.26357 5.00284 5.025 7.24411 5.025 10.0089Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    page: 'courses', label: 'Khóa học',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 21V7C12 5.89543 12.8954 5 14 5H21.4C21.7314 5 22 5.26863 22 5.6V18.7143" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 21V7C12 5.89543 11.1046 5 10 5H2.6C2.26863 5 2 5.26863 2 5.6V18.7143" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 19H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 19H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 21C12 19.8954 12.8954 19 14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21C12 19.8954 11.1046 19 10 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    page: 'diary', label: 'Nhật ký của bé',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.75 8C3.75 5.37665 5.87665 3.25 8.5 3.25H18.5C19.4665 3.25 20.25 4.0335 20.25 5V20C20.25 20.9665 19.4665 21.75 18.5 21.75H7.5C5.42893 21.75 3.75 20.0711 3.75 18V8ZM18.75 5V14.25H7.5C6.6558 14.25 5.87675 14.529 5.25 14.9997V8C5.25 6.20507 6.70507 4.75 8.5 4.75H11.7079C11.4446 6.73154 11.4683 8.74229 11.7794 10.72L11.8418 11.1166C11.8865 11.4006 12.0896 11.6341 12.3648 11.7176C12.6399 11.8012 12.9385 11.7201 13.1336 11.5089L14.5 10.0297L15.8664 11.5089C16.0615 11.7201 16.3601 11.8012 16.6353 11.7176C16.9104 11.6341 17.1135 11.4006 17.1582 11.1166L17.2206 10.72C17.5318 8.74228 17.5554 6.73154 17.2921 4.75H18.5C18.6381 4.75 18.75 4.86193 18.75 5ZM15.7779 4.75H13.2221C13.005 6.26418 12.9688 7.79819 13.1139 9.31967L13.7654 8.61431C14.1614 8.1857 14.8386 8.1857 15.2346 8.61431L15.8861 9.31967C16.0312 7.79819 15.995 6.26418 15.7779 4.75ZM7.5 15.75H18.75V20C18.75 20.1381 18.6381 20.25 18.5 20.25H7.5C6.25736 20.25 5.25 19.2426 5.25 18C5.25 16.7574 6.25736 15.75 7.5 15.75Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    page: 'parents', label: 'Dành cho phụ huynh',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M7 18V17C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 18V17C1 15.3431 2.34315 14 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 18V17C23 15.3431 21.6569 14 20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

// ── Hamburger icon (custom SVG per design) ────────────────────────────────
function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect y="1.85718" width="20" height="2" rx="1" fill="#418457"/>
      <rect y="9" width="20" height="2" rx="1" fill="#FEA01F"/>
      <rect y="16" width="12" height="2" rx="1" fill="#0A7AD8"/>
    </svg>
  )
}

function TabLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="hidden lg:block font-baloo text-[16px] leading-[24px] relative">
      {/* Reserve width of bold text so layout never shifts */}
      <span className="font-bold invisible select-none">{label}</span>
      <span className={`absolute inset-0 ${active ? 'font-bold' : 'font-normal'}`}>{label}</span>
    </span>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [drawerOpen, setDrawerOpen]     = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notifCount = 0

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  async function handleLogout() {
    setDropdownOpen(false)
    setDrawerOpen(false)
    await logout()
    navigate('/login')
  }

  const nav      = (page: Page) => navigate(PAGE_ROUTES[page])
  const isActive = (page: Page) => pathname === PAGE_ROUTES[page]

  const tabCls = (page: Page) =>
    `h-full flex gap-[8px] items-center justify-center px-[16px] shrink-0 cursor-pointer border-b-2 transition-colors duration-150
     font-vietnam text-[16px] leading-[24px] not-italic
     ${isActive(page)
       ? 'border-[#fea01f] text-[#fea01f]'
       : 'border-transparent text-[#313235] hover:bg-gray-50'}`

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          NAVBAR BAR
      ══════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 w-full">
        <div className="hidden xl:block" style={{ height: 4, backgroundColor: '#E6F6FF' }} />
        <div className="bg-white drop-shadow-[0px_4px_5px_rgba(0,0,0,0.05)] w-full h-[46px] xl:h-[62px]">
          <div className="h-full max-w-[1920px] mx-auto px-4 xl:px-[48px] flex items-center gap-2 xl:gap-6">

            {/* ── Logo ── */}
            <div className="shrink-0 cursor-pointer" style={{ width: 127 }} onClick={() => nav('home')}>
              <img alt="OTTOPIA" className="w-full h-[40px] xl:h-[65px] object-contain" src={imgLogo1} />
            </div>

            {/* ── Desktop nav tabs ── */}
            <div className="hidden xl:flex flex-1 h-full items-stretch justify-start xl:justify-center overflow-x-auto scrollbar-none">
              {NAV_ITEMS.map(({ page, label, icon }) => (
                <button key={page} onClick={() => nav(page)} className={tabCls(page)}>
                  <div className="relative shrink-0 size-[24px] flex items-center justify-center">
                    {icon}
                  </div>
                  <TabLabel label={label} active={isActive(page)} />
                </button>
              ))}
            </div>

            {/* ── Spacer (mobile) ── */}
            <div className="flex-1 xl:hidden" />

            {/* ── Desktop user actions ── */}
            <div className="hidden xl:flex gap-[24px] items-center shrink-0">

              {/* Bell */}
              <div className="relative p-[8px] rounded-[6px] hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="overflow-clip relative size-[24px]">
                  <div className="absolute inset-[8.33%_12.5%_8.34%_12.5%]">
                    <div className="absolute inset-[-3.75%_-4.17%]">
                      <img alt="Notifications" className="block max-w-none size-full" src={imgBell} />
                    </div>
                  </div>
                </div>
                {notifCount > 0 && (
                  <div className="absolute bg-[#fea01f] text-white flex items-center justify-center p-[2px] right-[-6px] rounded-[100px] top-[-6px] w-[20px] h-[20px]">
                    <span className="font-vietnam text-[12px] leading-[16px]">{notifCount}</span>
                  </div>
                )}
              </div>

              {/* User profile / login */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex gap-[8px] items-center cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors"
                    onClick={() => setDropdownOpen(o => !o)}
                  >
                    <div className="bg-[#d9d9d9] overflow-clip relative rounded-[40px] shrink-0 size-[48px]">
                      {user.avatar
                        ? <img alt="Avatar" className="absolute inset-0 size-full max-w-none object-cover" src={user.avatar} />
                        : <img alt="Avatar" className="absolute inset-0 size-full max-w-none object-cover" src={imgImage3} />
                      }
                    </div>
                    <div className="flex flex-col gap-[4px] items-start shrink-0">
                      <span className="font-baloo text-[16px] leading-[28px] text-[#0a7ad8]">{user.name}</span>
                      <span className="font-vietnam text-[14px] leading-[20px] text-[#575e70] tracking-[0.28px]">Cấp độ {user.level}</span>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]">
                      <div className="absolute inset-[41.67%_32.13%_37.49%_32.13%]">
                        <img
                          alt=""
                          className={`absolute block inset-0 size-full max-w-none transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                          src={imgCaret}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Desktop dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] w-[260px] bg-white border border-[#e2e6ef] rounded-[16px] shadow-lg z-50 overflow-hidden">
                      <div className="flex gap-3 items-center px-4 py-4 border-b border-[#f0f2f7]">
                        <div className="bg-[#d9d9d9] overflow-clip relative rounded-full shrink-0 size-[44px]">
                          {user.avatar
                            ? <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={user.avatar} />
                            : <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={imgImage3} />
                          }
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-baloo text-[16px] font-bold text-[#001e2f] truncate">{user.name}</span>
                          <span className="font-vietnam text-[13px] text-[#575e70] truncate">{user.email}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-px bg-[#f0f2f7] border-b border-[#f0f2f7]">
                        {[
                          { label: 'Cấp độ', value: user.level },
                          { label: 'Sao',    value: user.stars  },
                          { label: 'Huy hiệu', value: user.badges },
                        ].map(s => (
                          <div key={s.label} className="bg-white flex flex-col items-center py-3">
                            <span className="font-baloo text-[18px] font-bold text-[#0a7ad8]">{s.value}</span>
                            <span className="font-vietnam text-[12px] text-[#8690a7]">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="py-2">
                        <button className="w-full flex gap-3 items-center px-4 py-2.5 hover:bg-[#f8faff] transition-colors text-left">
                          <svg className="w-5 h-5 text-[#575e70] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-vietnam text-[14px] text-[#313235]">Thông tin cá nhân</span>
                        </button>
                        <button className="w-full flex gap-3 items-center px-4 py-2.5 hover:bg-[#f8faff] transition-colors text-left">
                          <svg className="w-5 h-5 text-[#575e70] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-vietnam text-[14px] text-[#313235]">Cài đặt</span>
                        </button>
                        <div className="mx-4 my-1 border-t border-[#f0f2f7]" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex gap-3 items-center px-4 py-2.5 hover:bg-red-50 transition-colors text-left"
                        >
                          <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="font-vietnam text-[14px] text-red-500 font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 21.5V19.3333C4 18.1841 4.57946 17.0819 5.61091 16.2692C6.64236 15.4565 8.04131 15 9.5 15H15C16.4587 15 17.8576 15.4565 18.8891 16.2692C19.9205 17.0819 20.5 18.1841 20.5 19.3333V21.5" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-vietnam text-[16px] text-[#313235]">Đăng nhập</span>
                </button>
              )}
            </div>

            {/* ── Hamburger button (mobile only) ── */}
            <button
              id="mobile-menu-btn"
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-50 transition-colors shrink-0"
              onClick={() => setDrawerOpen(o => !o)}
              aria-label="Mở menu"
            >
              <HamburgerIcon />
            </button>

          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          MOBILE DRAWER OVERLAY
      ══════════════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[55] bg-black/40 xl:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ══════════════════════════════════════════════════════
          MOBILE DRAWER PANEL
      ══════════════════════════════════════════════════════ */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out xl:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 border-b border-[#f0f2f7]" style={{ height: 46 }}>
          <img src={imgLogo1} alt="OTTOPIA" className="h-10 object-contain" />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setDrawerOpen(false)}
            aria-label="Đóng menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4L14 14" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* User info (if logged in) */}
        {user && (
          <div className="flex items-center gap-3 px-5 py-4 bg-[#f8faff] border-b border-[#f0f2f7]">
            <div className="bg-[#d9d9d9] overflow-clip relative rounded-full shrink-0 size-[44px]">
              {user.avatar
                ? <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={user.avatar} />
                : <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={imgImage3} />
              }
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-baloo text-[15px] font-bold text-[#001e2f] truncate">{user.name}</span>
              <span className="font-vietnam text-[12px] text-[#575e70] truncate">{user.email}</span>
            </div>
          </div>
        )}

        {/* Nav items list */}
        <div className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => { nav(page); setDrawerOpen(false) }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                isActive(page)
                  ? 'text-[#fea01f] bg-[#fff8ee] border-r-[3px] border-[#fea01f]'
                  : 'text-[#313235] hover:bg-gray-50'
              }`}
            >
              <span className="shrink-0">{icon}</span>
              <span className="font-vietnam text-[15px]">{label}</span>
            </button>
          ))}
        </div>

        {/* Account footer */}
        <div className="border-t border-[#f0f2f7] pb-safe">
          {user ? (
            <>
              {/* Mini stats */}
              <div className="grid grid-cols-3 divide-x divide-[#f0f2f7] border-b border-[#f0f2f7]">
                {[
                  { label: 'Cấp độ',   value: user.level  },
                  { label: 'Sao',      value: user.stars  },
                  { label: 'Huy hiệu', value: user.badges },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center py-3">
                    <span className="font-baloo text-[16px] font-bold text-[#0a7ad8]">{s.value}</span>
                    <span className="font-vietnam text-[11px] text-[#8690a7]">{s.label}</span>
                  </div>
                ))}
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors text-left"
              >
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-vietnam text-[15px] text-red-500 font-medium">Đăng xuất</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate('/login'); setDrawerOpen(false) }}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 21.5V19.3333C4 18.1841 4.57946 17.0819 5.61091 16.2692C6.64236 15.4565 8.04131 15 9.5 15H15C16.4587 15 17.8576 15.4565 18.8891 16.2692C19.9205 17.0819 20.5 18.1841 20.5 19.3333V21.5" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-vietnam text-[15px] text-[#313235]">Đăng nhập</span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}
