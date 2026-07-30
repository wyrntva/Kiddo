import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import NavbarAccountSection from './navbar/NavbarAccountSection'
import NavbarMobileDrawer from './navbar/NavbarMobileDrawer'
import { NAV_ITEMS, navbarAssets, PAGE_ROUTES, type Page } from './navbar/navbarData'

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect y="1.85718" width="20" height="2" rx="1" fill="#418457" />
      <rect y="9" width="20" height="2" rx="1" fill="#FEA01F" />
      <rect y="16" width="12" height="2" rx="1" fill="#0A7AD8" />
    </svg>
  )
}

function TabLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="hidden lg:block font-baloo text-[16px] leading-[24px] relative">
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notifCount = 0

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  async function handleLogout() {
    setDropdownOpen(false)
    setDrawerOpen(false)
    await logout()
    navigate('/login')
  }

  const nav = (page: Page) => navigate(PAGE_ROUTES[page])
  const isActive = (page: Page) => pathname === PAGE_ROUTES[page]

  const tabClassName = (page: Page) =>
    `h-full flex gap-[4px] lg:gap-[6px] xl:gap-[8px] items-center justify-center px-[8px] lg:px-[12px] xl:px-[16px] shrink-0 cursor-pointer border-b-2 transition-colors duration-150 font-vietnam text-[14px] lg:text-[15px] xl:text-[16px] leading-[24px] not-italic ${
      isActive(page)
        ? 'border-[#fea01f] text-[#fea01f]'
        : 'border-transparent text-[#313235] hover:bg-gray-50'
    }`

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 w-full">
        <div className="hidden xl:block" style={{ height: 4, backgroundColor: '#E6F6FF' }} />
        <div className="bg-white drop-shadow-[0px_4px_5px_rgba(0,0,0,0.05)] w-full h-[56px] md:h-[64px] xl:h-[62px]">
          <div className="h-full max-w-[1920px] mx-auto px-4 md:px-6 xl:px-[48px] flex items-center gap-2 md:gap-4 xl:gap-6">
            <div className="shrink-0 cursor-pointer w-[110px] sm:w-[127px]" onClick={() => nav('home')}>
              <img alt="OTTOPIA" className="w-full h-[40px] md:h-[44px] xl:h-[65px] object-contain" src={navbarAssets.logo} />
            </div>

            <div className="hidden lg:flex flex-1 h-full items-stretch justify-start lg:justify-center overflow-x-auto scrollbar-none">
              {NAV_ITEMS.map(({ page, label, icon }) => (
                <button key={page} onClick={() => nav(page)} className={tabClassName(page)}>
                  <div className="relative shrink-0 size-[24px] flex items-center justify-center">{icon}</div>
                  <TabLabel label={label} active={isActive(page)} />
                </button>
              ))}
            </div>

            <div className="flex-1 lg:hidden" />

            <NavbarAccountSection
              user={user}
              dropdownOpen={dropdownOpen}
              dropdownRef={dropdownRef}
              notifCount={notifCount}
              onToggleDropdown={() => setDropdownOpen((value) => !value)}
              onLogout={handleLogout}
              onLogin={() => navigate('/login')}
              onNavigateToProfile={() => {
                setDropdownOpen(false)
                navigate('/profile')
              }}
            />

            <button
              id="mobile-menu-btn"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-50 transition-colors shrink-0"
              onClick={() => setDrawerOpen((value) => !value)}
              aria-label="Mở menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>

      <div aria-hidden="true" className="h-[56px] shrink-0 md:h-[64px] xl:h-[66px]" />

      <NavbarMobileDrawer
        drawerOpen={drawerOpen}
        user={user}
        isActive={isActive}
        nav={nav}
        onClose={() => setDrawerOpen(false)}
        onLogout={handleLogout}
        onLogin={() => {
          navigate('/login')
          setDrawerOpen(false)
        }}
      />
    </>
  )
}
