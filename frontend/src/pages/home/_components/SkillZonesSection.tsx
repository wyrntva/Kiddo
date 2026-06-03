const islands = [
  {
    nameLine1: 'Vùng Đất',
    nameLine2: 'Cảm Xúc',
    islandImg: 'http://localhost:3845/assets/cd8d6407ff6da486e6c19f5f7fa0dbf28e059a91.png',
    pinImg: 'http://localhost:3845/assets/67cbb1d253573913de929c8e5defc07216c22d02.svg',
    dotImg: 'http://localhost:3845/assets/3c8d21371e81a377bcca6c05c654a965af6f00ff.svg',
    textColor: 'text-[#339e4a]',
    width: 'w-[103px]',
  },
  {
    nameLine1: 'Thành Phố',
    nameLine2: 'Giao Tiếp',
    islandImg: 'http://localhost:3845/assets/cd8d6407ff6da486e6c19f5f7fa0dbf28e059a91.png',
    pinImg: 'http://localhost:3845/assets/83af9dee8e53416434ffd6356eb91dd81f18a260.svg',
    dotImg: 'http://localhost:3845/assets/4a88c1a92050ca5805c351afe4a1b47c1bcdcb1e.svg',
    textColor: 'text-[#0a7ad8]',
    width: 'w-[113px]',
  },
  {
    nameLine1: 'Ngôi Làng',
    nameLine2: 'Tự Lập',
    islandImg: 'http://localhost:3845/assets/cd8d6407ff6da486e6c19f5f7fa0dbf28e059a91.png',
    pinImg: 'http://localhost:3845/assets/787ecf283a0ff128e81493c2847e8c3d9cd931fa.svg',
    dotImg: 'http://localhost:3845/assets/3c8d21371e81a377bcca6c05c654a965af6f00ff.svg',
    textColor: 'text-[#fdd444]',
    width: 'w-[108px]',
  },
  {
    nameLine1: 'Khu Vườn',
    nameLine2: 'Bạn Bè',
    islandImg: 'http://localhost:3845/assets/fa96937bdcc218b926f614f2c9506c6ef151e2a5.png',
    pinImg: 'http://localhost:3845/assets/ad00ad15470f8f06bee1c3e6c9c90fb81fdcf19d.svg',
    dotImg: 'http://localhost:3845/assets/4a88c1a92050ca5805c351afe4a1b47c1bcdcb1e.svg',
    textColor: 'text-[#e55c72]',
    width: 'w-[105px]',
  },
  {
    nameLine1: 'Hành Tinh',
    nameLine2: 'Tình Huống',
    islandImg: 'http://localhost:3845/assets/cd8d6407ff6da486e6c19f5f7fa0dbf28e059a91.png',
    pinImg: 'http://localhost:3845/assets/0444ca80dc53a1225dc9ec173cc989f114d681d1.svg',
    dotImg: 'http://localhost:3845/assets/4a88c1a92050ca5805c351afe4a1b47c1bcdcb1e.svg',
    textColor: 'text-[#9560d8]',
    width: 'w-[116px]',
  },
]

export default function SkillZonesSection() {
  return (
    <section id="adventure-map" className="bg-white scroll-mt-20">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="bg-[#f2fbef] flex flex-col gap-[24px] items-start p-[24px] rounded-[24px] relative min-h-[480px] lg:min-h-0 lg:aspect-[1824/597] w-full overflow-hidden shadow-lg border border-gray-100">
          
          {/* Panoramic map background */}
          <div className="absolute inset-0 lg:top-[-40px] lg:bottom-0 lg:h-auto w-full z-0">
            <img
              src="http://localhost:3845/assets/33efcd0a6cadb8258948d753e0545715b83e8b64.png"
              alt="Adventure Map Background"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>

          {/* Heading 2 */}
          <div className="flex gap-[12px] items-center w-[607px] relative z-10 bg-white/85 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-[#c3ffd0]/60 shadow-sm select-none">
            <img
              src="http://localhost:3845/assets/5a9453f78ced6122636cc3fcfc9d7d132cd3f8e7.svg"
              alt="Map icon"
              className="size-[48px] object-contain shrink-0"
            />
            <div className="flex flex-col items-start leading-none">
              <h2 className="font-baloo text-[24px] font-bold text-[#6c04ee] leading-[40px]">
                Bản đồ phiêu lưu
              </h2>
              <p className="text-[#575e70] text-[16px] leading-[24px] font-medium font-sans mt-0.5">
                Cùng Ottopia khám phá tất cả các vùng đất trên bản đồ kỳ diệu
              </p>
            </div>
          </div>

          {/* Islands container */}
          <div className="flex gap-[24px] items-start relative z-10 w-full px-4 mb-2 overflow-x-auto overflow-y-hidden shrink-0 pb-6 scrollbar-thin scrollbar-thumb-purple-100">
            {islands.map((island, idx) => (
              <div
                key={idx}
                className="flex-grow flex-shrink-0 flex flex-col h-[289px] items-center relative group min-w-[140px] md:min-w-px"
              >
                
                {/* Island shape image */}
                <div className="aspect-[2254/2254] overflow-clip relative w-full shrink-0 select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                  <div className="absolute inset-[3.02%_8.43%_6.79%_9.23%]">
                    <img
                      src={island.islandImg}
                      alt={island.nameLine1 + " " + island.nameLine2}
                      className="absolute left-0 max-w-none size-full top-0 object-contain"
                    />
                  </div>
                </div>

                {/* Marker area absolute at bottom of card */}
                <div className={`absolute bottom-0 h-[142px] left-[50%] -translate-x-[50%] ${island.width} z-20`}>
                  
                  {/* Pin icon with inner dot */}
                  <div className="absolute left-[50%] -translate-x-[50%] size-[60px] top-[3px] select-none pointer-events-none drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                    <div className="absolute left-1/2 -translate-x-1/2 top-[8.33%] bottom-[8.33%] aspect-[14.4865/20]">
                      <img
                        src={island.pinImg}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <img
                      src={island.dotImg}
                      alt=""
                      className="absolute left-[20px] top-[12.5px] size-[20px] object-contain"
                    />
                  </div>

                  {/* Text card wrapper - exact Figma 2-line layout and styling */}
                  <div className="absolute bg-white flex flex-col items-center justify-center px-[20px] py-[12px] rounded-[100px] top-[54px] left-1/2 -translate-x-1/2 w-max min-w-[110px] max-w-[140px] border border-gray-100 shadow-md cursor-pointer select-none h-[88px]">
                    <div className={`flex flex-col items-center justify-center font-baloo text-[16px] font-bold text-center leading-[22px] not-italic ${island.textColor}`}>
                      <span className="whitespace-nowrap block">{island.nameLine1}</span>
                      <span className="whitespace-nowrap block">{island.nameLine2}</span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
