import type { AuthUser } from '../../../context/AuthContext'
import { NAV_ITEMS, navbarAssets, type Page } from './navbarData'

interface NavbarMobileDrawerProps {
  drawerOpen: boolean
  user: AuthUser | null
  isActive: (page: Page) => boolean
  nav: (page: Page) => void
  onClose: () => void
  onLogout: () => void
  onLogin: () => void
}

export default function NavbarMobileDrawer({
  drawerOpen,
  user,
  isActive,
  nav,
  onClose,
  onLogout,
  onLogin,
}: NavbarMobileDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[55] bg-black/40 xl:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out xl:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 border-b border-[#f0f2f7]" style={{ height: 46 }}>
          <img src={navbarAssets.logo} alt="OTTOPIA" className="h-10 object-contain" />
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors" onClick={onClose} aria-label="Đóng menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4L14 14" stroke="#37393E" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {user && (
          <div className="flex items-center gap-3 px-5 py-4 bg-[#f8faff] border-b border-[#f0f2f7]">
            <div className="bg-[#d9d9d9] overflow-clip relative rounded-full shrink-0 size-[44px]">
              <img alt="Avatar" className="absolute inset-0 size-full object-cover" src={user.avatar || navbarAssets.fallbackAvatar} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-baloo text-[15px] font-bold text-[#001e2f] truncate">{user.name}</span>
              <span className="font-vietnam text-[12px] text-[#575e70] truncate">{user.email}</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => {
                nav(page)
                onClose()
              }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${isActive(page) ? 'text-[#fea01f] bg-[#fff8ee] border-r-[3px] border-[#fea01f]' : 'text-[#313235] hover:bg-gray-50'}`}
            >
              <span className="shrink-0">{icon}</span>
              <span className="font-vietnam text-[15px]">{label}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[#f0f2f7] pb-safe">
          {user ? (
            <>

              <button onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors text-left">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-vietnam text-[15px] text-red-500 font-medium">Đăng xuất</span>
              </button>
            </>
          ) : (
            <button onClick={onLogin} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors">
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
