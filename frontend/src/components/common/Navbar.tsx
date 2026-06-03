import type { Page } from '../../App'

// ── Icons (exact assets from Figma node 34:5045) ──────────────────────────
const imgLogo1     = "/assets/783debbe8e244f74c646dc0e0a4ac9cd34af4842.png"
const imgImage3    = "/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.png"
const imgBell      = "/assets/6115f81b903d7a7ab9319b63a5138ed188023521.svg"
const imgCaret     = "/assets/f27acb75d87783efe25d645b00f1389650a727c8.svg"

// Tab icons — Figma names
const imgHomeOutline   = "/assets/5e36bf3c672a640141be4e2f89b11e0ef72074b2.svg"  // home_2_outline (inactive)
const imgHomeFilled    = "/assets/c24dccab32826c8a272e478b982c0a315f7b4c56.svg"  // home filled orange (active)
const imgSearchInactive = "/assets/da828473b40379d239a1c049d14ba3a21e009c3d.svg" // magnifying_glass inactive
const imgSearchActive  = "/assets/b22d56e532d30e7d8527239bea71f46c3cbf65cc.svg"  // magnifying_glass_filled orange (active)
// book_outline (6 vectors)
const imgBookV1 = "/assets/f414e1dcd188379b53a4a08868c12abf285d306a.svg"
const imgBookV2 = "/assets/08a10b5f4015b17d276b3e4223bb1e11a13a4d53.svg"
const imgBookV3 = "/assets/fdd99e6ef72be86b802330dfc2f08a3a08d3c149.svg"
const imgBookV4 = "/assets/e77288181cf82f12eb4bc4c28802818a09470e77.svg"
const imgBookV5 = "/assets/b7c350ec24116f9d7e8e2a8f18c3115724b9676e.svg"
const imgBookV6 = "/assets/b00dad65700d48ad74e5089b05218629c68fb931.svg"
const imgMedal     = "/assets/48fb7b94221a1cb2f7b3dd82c6a344e7220d8834.svg"  // reward_outline
const imgGamepad   = "/assets/fb077e3649a548459e3f8d504be86499ec30eb52.svg"  // Outline/Devices/Gamepad
// user_group_outline (6 vectors)
const imgUserV1 = "/assets/992eadc13169286966ba1c69e6e9f62a02cbc0a1.svg"
const imgUserV2 = "/assets/9dab4e70c8131ca98f8897a654622a58ccd8422b.svg"
const imgUserV3 = "/assets/4b381a208b45a7b36e0e58597d61e233d246f598.svg"
const imgUserV4 = "/assets/ef5bb27d0df351021833c965115a311ed3f4708c.svg"
const imgUserV5 = "/assets/c51daab219f7d9d0836e7e67961304b500e4349b.svg"
const imgUserV6 = "/assets/184e2bfce720e96c5b5788bb7475df0ba7b1df42.svg"

// CSS filter: convert any dark icon → #fea01f (orange, active)
const ORANGE_FILTER = 'brightness(0) saturate(100%) invert(68%) sepia(97%) saturate(476%) hue-rotate(347deg) brightness(103%) contrast(101%)'

interface NavbarProps {
  activePage?: Page
  onNavigate?: (page: Page) => void
}

export default function Navbar({ activePage = 'home', onNavigate }: NavbarProps) {
  const nav = (page: Page) => onNavigate?.(page)
  const isActive = (page: Page) => activePage === page

  // Inactive: #313235, weight 400 | Active: #fea01f, weight 700, border-b-2
  const tabCls = (page: Page) =>
    `h-full flex gap-[8px] items-center justify-center px-[16px] shrink-0 cursor-pointer border-b-2 transition-all duration-150
     font-vietnam text-[16px] leading-[24px] not-italic
     ${isActive(page)
       ? 'border-[#fea01f] text-[#fea01f] font-bold'
       : 'border-transparent text-[#313235] font-normal hover:bg-gray-50'}`

  return (
    <nav
      className="bg-white drop-shadow-[0px_4px_5px_rgba(0,0,0,0.05)] sticky top-0 z-50 w-full"
      style={{ height: 62 }}
    >
      <div className="h-full max-w-[1920px] mx-auto px-[48px] flex items-center gap-6">

        {/* ── Logo ── */}
        <div
          className="shrink-0 cursor-pointer relative overflow-visible"
          style={{ height: 50, width: 160 }}
          onClick={() => nav('home')}
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-0" style={{ width: 160, height: 86 }}>
            <img
              alt="OTTOPIA"
              className="absolute max-w-none"
              style={{ height: '128.37%', left: '-14.49%', top: '-12.91%', width: '128.99%' }}
              src={imgLogo1}
            />
          </div>
        </div>

        {/* ── Nav tabs ── */}
        <div className="flex-1 h-full flex items-stretch justify-center overflow-x-auto scrollbar-none">

          {/* Tab: Trang chủ */}
          <button onClick={() => nav('home')} className={tabCls('home')}>
            <div className="overflow-clip relative shrink-0 size-[24px]">
              {isActive('home') ? (
                // active: dùng home filled orange
                <img alt="" className="absolute block inset-0 size-full max-w-none" src={imgHomeFilled} />
              ) : (
                // inactive: home_2_outline, Figma inset
                <div className="absolute inset-[8.31%_8.29%_8.33%_8.28%]">
                  <div className="absolute inset-[-3.75%]">
                    <img alt="" className="block max-w-none size-full" src={imgHomeOutline} />
                  </div>
                </div>
              )}
            </div>
            <span className="whitespace-nowrap">Trang chủ</span>
          </button>

          {/* Tab: Khám phá */}
          <button onClick={() => nav('explore')} className={tabCls('explore')}>
            <div className="relative shrink-0 size-[24px]">
              <div className="absolute inset-[12.5%_12.49%_12.5%_12.5%]">
                <img
                  alt=""
                  className="absolute block inset-0 size-full max-w-none"
                  src={isActive('explore') ? imgSearchActive : imgSearchInactive}
                  style={isActive('explore') ? {} : { filter: `brightness(0) opacity(0.85)` }}
                />
              </div>
            </div>
            <span className="whitespace-nowrap">Khám phá</span>
          </button>

          {/* Tab: Khóa học — book_outline (6 vectors) */}
          <button onClick={() => nav('courses')} className={tabCls('courses')}>
            <div
              className="overflow-clip relative shrink-0 size-[24px]"
              style={isActive('courses') ? { filter: ORANGE_FILTER } : {}}
            >
              <div className="absolute bottom-[12.5%] left-1/2 right-[8.33%] top-[20.83%]"><div className="absolute inset-[-4.69%_-7.5%]"><img alt="" className="block max-w-none size-full" src={imgBookV1} /></div></div>
              <div className="absolute bottom-[12.5%] left-[8.33%] right-1/2 top-[20.83%]"><div className="absolute inset-[-4.69%_-7.5%]"><img alt="" className="block max-w-none size-full" src={imgBookV2} /></div></div>
              <div className="absolute inset-[79.17%_8.33%_20.83%_58.33%]"><div className="absolute inset-[-0.75px_-9.38%]"><img alt="" className="block max-w-none size-full" src={imgBookV3} /></div></div>
              <div className="absolute inset-[79.17%_58.33%_20.83%_8.33%]"><div className="absolute inset-[-0.75px_-9.38%]"><img alt="" className="block max-w-none size-full" src={imgBookV4} /></div></div>
              <div className="absolute bottom-[12.5%] left-1/2 right-[41.67%] top-[79.17%]"><div className="absolute inset-[-37.5%]"><img alt="" className="block max-w-none size-full" src={imgBookV5} /></div></div>
              <div className="absolute bottom-[12.5%] left-[41.67%] right-1/2 top-[79.17%]"><div className="absolute inset-[-37.5%]"><img alt="" className="block max-w-none size-full" src={imgBookV6} /></div></div>
            </div>
            <span className="whitespace-nowrap">Khóa học</span>
          </button>

          {/* Tab: Thành tích — reward_outline */}
          <button onClick={() => nav('achievements')} className={tabCls('achievements')}>
            <div
              className="relative shrink-0 size-[24px]"
              style={isActive('achievements') ? { filter: ORANGE_FILTER } : {}}
            >
              <img alt="" className="absolute block inset-0 size-full max-w-none" src={imgMedal} />
            </div>
            <span className="whitespace-nowrap">Thành tích</span>
          </button>

          {/* Tab: Sân chơi — Outline/Devices/Gamepad */}
          <button onClick={() => nav('playground')} className={tabCls('playground')}>
            <div
              className="relative shrink-0 size-[24px]"
              style={isActive('playground') ? { filter: ORANGE_FILTER } : {}}
            >
              <div className="absolute inset-[9.38%_9.64%_13.54%_9.64%]">
                <img alt="" className="absolute block inset-0 size-full max-w-none" src={imgGamepad} />
              </div>
            </div>
            <span className="whitespace-nowrap">Sân chơi</span>
          </button>

          {/* Tab: Dành cho phụ huynh — user_group_outline (6 vectors) */}
          <button onClick={() => nav('parents')} className={tabCls('parents')}>
            <div
              className="overflow-clip relative shrink-0 size-[24px]"
              style={isActive('parents') ? { filter: ORANGE_FILTER } : {}}
            >
              <div className="absolute bottom-1/4 left-[29.17%] right-[29.17%] top-1/2"><div className="absolute inset-[-12.5%_-7.5%]"><img alt="" className="block size-full" src={imgUserV1} /></div></div>
              <div className="absolute bottom-1/4 left-[4.17%] right-[83.33%] top-[58.33%]"><div className="absolute inset-[-18.75%_-25%]"><img alt="" className="block size-full" src={imgUserV2} /></div></div>
              <div className="absolute bottom-1/4 left-[83.33%] right-[4.17%] top-[58.33%]"><div className="absolute inset-[-18.75%_-25%]"><img alt="" className="block size-full" src={imgUserV3} /></div></div>
              <div className="absolute bottom-1/2 left-[37.5%] right-[37.5%] top-1/4"><div className="absolute inset-[-12.5%]"><img alt="" className="block size-full" src={imgUserV4} /></div></div>
              <div className="absolute bottom-[41.67%] left-[8.33%] right-3/4 top-[41.67%]"><div className="absolute inset-[-18.75%]"><img alt="" className="block size-full" src={imgUserV5} /></div></div>
              <div className="absolute bottom-[41.67%] left-3/4 right-[8.33%] top-[41.67%]"><div className="absolute inset-[-18.75%]"><img alt="" className="block size-full" src={imgUserV6} /></div></div>
            </div>
            <span className="whitespace-nowrap">Dành cho phụ huynh</span>
          </button>

        </div>

        {/* ── User actions ── */}
        <div className="flex gap-[24px] items-center shrink-0">

          {/* Bell */}
          <div className="relative p-[8px] rounded-[6px] hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="overflow-clip relative size-[24px]">
              <div className="absolute inset-[8.33%_12.5%_8.34%_12.5%]">
                <div className="absolute inset-[-3.75%_-4.17%]">
                  <img alt="Notifications" className="block max-w-none size-full" src={imgBell} />
                </div>
              </div>
            </div>
            <div className="absolute bg-[#fea01f] text-white flex items-center justify-center p-[2px] right-[-6px] rounded-[100px] top-[-6px] w-[20px] h-[20px]">
              <span className="font-vietnam text-[12px] leading-[16px]">2</span>
            </div>
          </div>

          {/* User profile */}
          <div className="flex gap-[8px] items-center cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors">
            <div className="bg-[#d9d9d9] overflow-clip relative rounded-[40px] shrink-0 size-[48px]">
              <img alt="Avatar" className="absolute inset-0 size-full max-w-none object-cover" src={imgImage3} />
            </div>
            <div className="flex flex-col gap-[4px] items-start shrink-0">
              <span className="font-baloo text-[16px] leading-[28px] text-[#0a7ad8]">Bé An</span>
              <span className="font-vietnam text-[14px] leading-[20px] text-[#575e70] tracking-[0.28px]">Cấp độ 3</span>
            </div>
            {/* caret_down_filled */}
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <div className="absolute inset-[41.67%_32.13%_37.49%_32.13%]">
                <img alt="" className="absolute block inset-0 size-full max-w-none" src={imgCaret} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}
