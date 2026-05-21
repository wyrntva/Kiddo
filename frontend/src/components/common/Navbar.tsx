import {
  Bell,
  BookOpen,
  Compass,
  Gamepad2,
  Home,
  Search,
  Trophy,
  Users,
} from 'lucide-react'
import logoUrl from '../../assets/logo.png'

const navItems = [
  { icon: Home, label: 'Trang chủ', active: true },
  { icon: Compass, label: 'Khám phá' },
  { icon: Gamepad2, label: 'Sân chơi' },
  { icon: BookOpen, label: 'Khoá học' },
  { icon: Trophy, label: 'Thành tích' },
  { icon: Users, label: 'Dành cho phụ huynh' },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-8 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        {/* Logo */}
        <div className="shrink-0 cursor-pointer">
          <img src={logoUrl} alt="KIDDO" className="h-12 w-auto" />
        </div>

        {/* Nav items - centered */}
        <div className="flex items-center justify-center gap-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-2 px-3 py-4 text-base font-semibold transition-colors relative ${
                active
                  ? 'text-orange-500'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg'
              }`}
            >
              <Icon size={17} />
              {label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>

          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors ml-1">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-lg border-2 border-orange-200">
              👦
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800 leading-tight">Bé An</div>
              <div className="text-[11px] text-gray-400 leading-tight">Cấp độ 3</div>
            </div>
            <span className="text-gray-300 text-xs">▾</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
