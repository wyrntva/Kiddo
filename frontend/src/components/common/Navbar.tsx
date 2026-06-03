const imgLogo1 = "/assets/783debbe8e244f74c646dc0e0a4ac9cd34af4842.png";
const imgImage3 = "/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.png";
const imgVector = "/assets/6115f81b903d7a7ab9319b63a5138ed188023521.svg";
const imgIcon = "/assets/f27acb75d87783efe25d645b00f1389650a727c8.svg";
const imgHome3Filled = "/assets/c24dccab32826c8a272e478b982c0a315f7b4c56.svg";
const imgIconColor = "/assets/da828473b40379d239a1c049d14ba3a21e009c3d.svg";
const imgVector1 = "/assets/f414e1dcd188379b53a4a08868c12abf285d306a.svg";
const imgVector2 = "/assets/08a10b5f4015b17d276b3e4223bb1e11a13a4d53.svg";
const imgVector3 = "/assets/fdd99e6ef72be86b802330dfc2f08a3a08d3c149.svg";
const imgVector4 = "/assets/e77288181cf82f12eb4bc4c28802818a09470e77.svg";
const imgVector5 = "/assets/b7c350ec24116f9d7e8e2a8f18c3115724b9676e.svg";
const imgVector6 = "/assets/b00dad65700d48ad74e5089b05218629c68fb931.svg";
const imgVuesaxLinearMedalStar = "/assets/48fb7b94221a1cb2f7b3dd82c6a344e7220d8834.svg";
const imgIcon1 = "/assets/fb077e3649a548459e3f8d504be86499ec30eb52.svg";
const imgVector7 = "/assets/992eadc13169286966ba1c69e6e9f62a02cbc0a1.svg";
const imgVector8 = "/assets/9dab4e70c8131ca98f8897a654622a58ccd8422b.svg";
const imgVector9 = "/assets/4b381a208b45a7b36e0e58597d61e233d246f598.svg";
const imgVector10 = "/assets/ef5bb27d0df351021833c965115a311ed3f4708c.svg";
const imgVector11 = "/assets/c51daab219f7d9d0836e7e67961304b500e4349b.svg";
const imgVector12 = "/assets/184e2bfce720e96c5b5788bb7475df0ba7b1df42.svg";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-[0px_4px_5px_rgba(0,0,0,0.05)] sticky top-0 z-50 w-full font-vietnam">
      {/* Container matching Navitop Section */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col gap-4 py-2">
        
        {/* ROW 1: Navi top */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50 md:border-b-0">
          
          {/* Logo 1 - exactly matching absolute layout without distortion */}
          <div className="h-[50px] w-[150px] relative cursor-pointer overflow-visible">
            <div className="-translate-y-1/2 absolute h-[85px] left-0 top-[calc(50%+0.5px)] w-[150px] overflow-hidden">
              <img 
                alt="OTTOPIA" 
                className="absolute h-[128.37%] left-[-14.49%] max-w-none top-[-12.91%] w-[128.99%]" 
                src={imgLogo1} 
              />
            </div>
          </div>
          
          {/* Right actions */}
          <div className="flex gap-6 items-center">
            
            {/* Only icon (bell + badge) - Figma design coordinates */}
            <div className="relative p-2 rounded-[6px] hover:bg-gray-50 cursor-pointer transition-colors shrink-0">
              <div className="size-[24px] relative overflow-hidden shrink-0">
                <div className="absolute inset-[8.33%_12.5%_8.34%_12.5%]">
                  <div className="absolute inset-[-3.75%_-4.17%]">
                    <img 
                      alt="Notifications" 
                      className="block max-w-none size-full" 
                      src={imgVector} 
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#fea01f] text-white flex items-center justify-center p-[2px] -right-1.5 rounded-[100px] -top-1.5 w-5 h-5 shadow-sm">
                <span className="text-[12px] font-medium leading-[16px]">2</span>
              </div>
            </div>
            
            {/* Profile details - Figma exact fonts and layouts */}
            <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors shrink-0">
              <div className="bg-[#d9d9d9] overflow-hidden rounded-[40px] size-12 relative shrink-0">
                <img 
                  alt="Avatar" 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-12 max-w-none object-cover" 
                  src={imgImage3} 
                />
              </div>
              <div className="flex flex-col gap-[4px] items-start shrink-0">
                <div className="font-baloo font-bold text-[16px] text-[#0a7ad8] leading-[28px]">
                  Bé An
                </div>
                <div className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px] font-vietnam">
                  Cấp độ 3
                </div>
              </div>
              <div className="size-[24px] relative overflow-hidden shrink-0">
                <div className="absolute inset-[41.67%_32.13%_37.49%_32.13%]">
                  <img 
                    alt="Dropdown" 
                    className="absolute block inset-0 size-full max-w-none" 
                    src={imgIcon} 
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* ROW 2: Navi (Tabs) - exact Figma tab widths and paddings */}
        <div className="flex items-center justify-center border-t border-gray-100/60 pt-1">
          <div className="flex items-center gap-1 md:gap-4 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            
            {/* Tab 1: Trang chủ (Active) - w-[174px] */}
            <button className="border-[#fea01f] border-b-2 border-solid flex gap-2 items-center justify-center p-[16px] shrink-0 w-[140px] md:w-[174px] transition-all duration-150">
              <div className="size-[24px] relative overflow-hidden shrink-0">
                <img 
                  alt="Trang chủ" 
                  className="absolute block inset-0 size-full max-w-none" 
                  src={imgHome3Filled} 
                />
              </div>
              <span className="font-bold text-[16px] text-[#fea01f] whitespace-nowrap leading-[24px]">
                Trang chủ
              </span>
            </button>

            {/* Tab 2: Khám phá - w-[196px] */}
            <button className="flex gap-2 items-center justify-center p-[16px] shrink-0 w-[140px] md:w-[196px] hover:bg-gray-50 rounded-t-xl transition-all duration-150 text-[#313235] hover:text-gray-800 group">
              <div className="size-[24px] relative shrink-0">
                <div className="absolute inset-[12.5%_12.49%_12.5%_12.5%]">
                  <img 
                    alt="Khám phá" 
                    className="absolute block inset-0 size-full max-w-none group-hover:scale-105 transition-transform" 
                    src={imgIconColor} 
                  />
                </div>
              </div>
              <span className="font-medium text-[16px] whitespace-nowrap leading-[24px]">
                Khám phá
              </span>
            </button>

            {/* Tab 3: Khóa học - w-[196px] */}
            <button className="flex gap-2 items-center justify-center p-[16px] shrink-0 w-[140px] md:w-[196px] hover:bg-gray-50 rounded-t-xl transition-all duration-150 text-[#313235] hover:text-gray-800 group">
              <div className="size-[24px] relative overflow-hidden shrink-0">
                {/* Custom stacked vectors for book outline from Figma */}
                <div className="absolute inset-0">
                  <div className="absolute bottom-[12.5%] left-1/2 right-[8.33%] top-[20.83%]">
                    <div className="absolute inset-[-4.69%_-7.5%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector1} />
                    </div>
                  </div>
                  <div className="absolute bottom-[12.5%] left-[8.33%] right-1/2 top-[20.83%]">
                    <div className="absolute inset-[-4.69%_-7.5%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector2} />
                    </div>
                  </div>
                  <div className="absolute inset-[79.17%_8.33%_20.83%_58.33%]">
                    <div className="absolute inset-[-0.75px_-9.38%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector3} />
                    </div>
                  </div>
                  <div className="absolute inset-[79.17%_58.33%_20.83%_8.33%]">
                    <div className="absolute inset-[-0.75px_-9.38%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector4} />
                    </div>
                  </div>
                  <div className="absolute bottom-[12.5%] left-1/2 right-[41.67%] top-[79.17%]">
                    <div className="absolute inset-[-37.5%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector5} />
                    </div>
                  </div>
                  <div className="absolute bottom-[12.5%] left-[41.67%] right-1/2 top-[79.17%]">
                    <div className="absolute inset-[-37.5%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector6} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="font-medium text-[16px] whitespace-nowrap leading-[24px]">
                Khóa học
              </span>
            </button>

            {/* Tab 4: Thành tích - w-[196px] */}
            <button className="flex gap-2 items-center justify-center p-[16px] shrink-0 w-[140px] md:w-[196px] hover:bg-gray-50 rounded-t-xl transition-all duration-150 text-[#313235] hover:text-gray-800 group">
              <div className="size-[24px] relative shrink-0">
                <div className="absolute inset-0">
                  <img 
                    alt="Thành tích" 
                    className="absolute block inset-0 size-full max-w-none group-hover:scale-105 transition-transform" 
                    src={imgVuesaxLinearMedalStar} 
                  />
                </div>
              </div>
              <span className="font-medium text-[16px] whitespace-nowrap leading-[24px]">
                Thành tích
              </span>
            </button>

            {/* Tab 5: Sân chơi - w-[196px] */}
            <button className="flex gap-2 items-center justify-center p-[16px] shrink-0 w-[140px] md:w-[196px] hover:bg-gray-50 rounded-t-xl transition-all duration-150 text-[#313235] hover:text-gray-800 group">
              <div className="size-[24px] relative shrink-0">
                <div className="absolute inset-[9.38%_9.64%_13.54%_9.64%]">
                  <img 
                    alt="Sân chơi" 
                    className="absolute block inset-0 size-full max-w-none group-hover:scale-105 transition-transform" 
                    src={imgIcon1} 
                  />
                </div>
              </div>
              <span className="font-medium text-[16px] whitespace-nowrap leading-[24px]">
                Sân chơi
              </span>
            </button>

            {/* Tab 6: Dành cho phụ huynh - w-[196px] */}
            <button className="flex gap-2 items-center justify-center p-[16px] shrink-0 w-[160px] md:w-[196px] hover:bg-gray-50 rounded-t-xl transition-all duration-150 text-[#313235] hover:text-gray-800 group">
              <div className="size-[24px] relative overflow-hidden shrink-0">
                {/* Custom stacked vectors for user group from Figma */}
                <div className="absolute inset-0">
                  <div className="absolute bottom-1/4 left-[29.17%] right-[29.17%] top-1/2">
                    <div className="absolute inset-[-12.5%_-7.5%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector7} />
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 left-[4.17%] right-[83.33%] top-[58.33%]">
                    <div className="absolute inset-[-18.75%_-25%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector8} />
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 left-[83.33%] right-[4.17%] top-[58.33%]">
                    <div className="absolute inset-[-18.75%_-25%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector9} />
                    </div>
                  </div>
                  <div className="absolute bottom-1/2 left-[37.5%] right-[37.5%] top-1/4">
                    <div className="absolute inset-[-12.5%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector10} />
                    </div>
                  </div>
                  <div className="absolute bottom-[41.67%] left-[8.33%] right-3/4 top-[41.67%]">
                    <div className="absolute inset-[-18.75%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector11} />
                    </div>
                  </div>
                  <div className="absolute bottom-[41.67%] left-3/4 right-[8.33%] top-[41.67%]">
                    <div className="absolute inset-[-18.75%]">
                      <img alt="" className="block size-full max-w-none" src={imgVector12} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="font-medium text-[16px] whitespace-nowrap leading-[24px]">
                Dành cho phụ huynh
              </span>
            </button>

          </div>
        </div>

      </div>
    </nav>
  )
}
