import type { AuthUser } from '../../../context/AuthContext'
import { navbarAssets } from './navbarData'

interface NavbarAccountSectionProps {
  user: AuthUser | null
  dropdownOpen: boolean
  dropdownRef: React.RefObject<HTMLDivElement>
  notifCount: number
  onToggleDropdown: () => void
  onLogout: () => void
  onLogin: () => void
  onNavigateToProfile: () => void
}

export default function NavbarAccountSection({
  user,
  dropdownOpen,
  dropdownRef,
  notifCount,
  onToggleDropdown,
  onLogout,
  onLogin,
  onNavigateToProfile,
}: NavbarAccountSectionProps) {
  return (
    <div className="hidden xl:flex gap-[24px] items-center shrink-0">
      <div className="relative p-[8px] rounded-[6px] hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="overflow-clip relative size-[24px]">
          <div className="absolute inset-[8.33%_12.5%_8.34%_12.5%]">
            <div className="absolute inset-[-3.75%_-4.17%]">
              <img alt="Notifications" className="block max-w-none size-full" src={navbarAssets.bell} />
            </div>
          </div>
        </div>
        {notifCount > 0 && (
          <div className="absolute bg-[#fea01f] text-white flex items-center justify-center p-[2px] right-[-6px] rounded-[100px] top-[-6px] w-[20px] h-[20px]">
            <span className="font-vietnam text-[12px] leading-[16px]">{notifCount}</span>
          </div>
        )}
      </div>

      {user ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex gap-[8px] items-center cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors"
            onClick={onToggleDropdown}
          >
            <div className="bg-[#d9d9d9] overflow-clip relative rounded-[40px] shrink-0 size-[48px]">
              <img alt="Avatar" className="absolute inset-0 size-full max-w-none object-cover" src={user.avatar || navbarAssets.fallbackAvatar} />
            </div>
            <div className="flex flex-col gap-[4px] items-start shrink-0">
              <span className="font-baloo text-[16px] leading-[28px] text-[#0a7ad8]">{user.name}</span>
            </div>
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <div className="absolute inset-[41.67%_32.13%_37.49%_32.13%]">
                <img
                  alt=""
                  className={`absolute block inset-0 size-full max-w-none transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  src={navbarAssets.caret}
                />
              </div>
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-[260px] bg-white border border-[#e2e6ef] rounded-[16px] shadow-lg z-50 overflow-hidden">
              <div className="flex gap-3 items-center px-4 py-4 border-b border-[#f0f2f7]">
                <div className="bg-[#d9d9d9] overflow-clip relative rounded-full shrink-0 size-[44px]">
                  <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={user.avatar || navbarAssets.fallbackAvatar} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-baloo text-[16px] font-bold text-[#001e2f] truncate">{user.name}</span>
                  <span className="font-vietnam text-[13px] text-[#575e70] truncate">{user.email}</span>
                </div>
              </div>



              <div className="py-2">
                <button onClick={onNavigateToProfile} className="w-full flex gap-3 items-center px-4 py-2.5 hover:bg-[#f8faff] transition-colors text-left">
                  <svg className="w-5 h-5 text-[#575e70] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-vietnam text-[14px] text-[#313235]">Thông tin cá nhân</span>
                </button>
                <div className="mx-4 my-1 border-t border-[#f0f2f7]" />
                <button onClick={onLogout} className="w-full flex gap-3 items-center px-4 py-2.5 hover:bg-red-50 transition-colors text-left">
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
        <button onClick={onLogin} className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 21.5V19.3333C4 18.1841 4.57946 17.0819 5.61091 16.2692C6.64236 15.4565 8.04131 15 9.5 15H15C16.4587 15 17.8576 15.4565 18.8891 16.2692C19.9205 17.0819 20.5 18.1841 20.5 19.3333V21.5" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-vietnam text-[16px] text-[#313235]">Đăng nhập</span>
        </button>
      )}
    </div>
  )
}
