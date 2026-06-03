
const imgMascot = "http://localhost:3845/assets/de633722309fe20675a2a35a6657b31451904c1c.png";
const imgLine3 = "http://localhost:3845/assets/2f2171b74e978a6fef8202f451396e2e4823ba99.svg";
const imgGroup = "http://localhost:3845/assets/b77cae9383274c2df6b59465b4739393d1c9dd9b.svg";
const imgIcon = "http://localhost:3845/assets/adabddc93d1682fb1279104cd51bef11813b9e25.svg";
const imgIcon1 = "http://localhost:3845/assets/d1df6482f01bc81641b471c55ec5f313856157f1.svg";

export default function AboutSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div 
          className="bg-[#f4fafd] flex flex-col lg:flex-row gap-[48px] items-center p-[24px] rounded-[24px] w-full"
          data-node-id="21:647"
        >
          {/* Left Side: Description Container */}
          <div className="flex-1 min-w-0 w-full" data-node-id="21:649">
            <div className="flex flex-col sm:flex-row gap-[16px] items-center w-full">
              {/* Mascot container */}
              <div className="h-[161px] relative shrink-0 w-[192px]" data-node-id="24:1339">
                <img 
                  alt="Mascot Otter" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                  src={imgMascot} 
                />
              </div>
              
              {/* Text content details */}
              <div className="flex-1 flex flex-col items-start min-w-0" data-node-id="21:690">
                <div className="pb-[8px]" data-node-id="21:653">
                  <h2 
                    className="font-baloo text-[32px] text-[#004c6e] leading-[56px] font-bold text-center sm:text-left whitespace-nowrap"
                    data-node-id="21:655"
                  >
                    OTTOPIA là gì?
                  </h2>
                </div>
                <div className="w-full" data-node-id="21:656">
                  <p 
                    className="font-vietnam text-[16px] text-[#37393e] leading-[24px] font-normal text-justify sm:text-left"
                    data-node-id="21:657"
                  >
                    OTTOPIA là nền tảng học kỹ năng sống bằng hình ảnh, tình huống thực tế và trò chơi tương tác, giúp trẻ phát triển toàn diện, tự tin và hạnh phúc hơn mỗi ngày.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Core Pillars */}
          <div className="flex-1 min-w-0 w-full" data-node-id="21:658">
            <div className="flex flex-col sm:flex-row gap-[24px] items-start w-full">
              
              {/* Pillar 1: Dễ hiểu */}
              <div className="flex-1 flex flex-col gap-[8px] items-center p-[24px] rounded-[32px] hover:bg-white/30 transition-colors duration-200" data-node-id="21:659">
                <div className="bg-white border border-[#fe91a3] flex items-center p-[8px] rounded-[40px] shrink-0 size-16 justify-center" data-node-id="24:733">
                  <div className="size-12 relative flex items-center justify-center">
                    <img alt="Dễ hiểu" className="block size-12 object-contain" src={imgGroup} />
                  </div>
                </div>
                <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] text-center" data-node-id="21:791">
                  Dễ hiểu
                </h3>
                <div className="font-vietnam text-[16px] text-[#37393e] leading-[24px] text-center" data-node-id="21:789">
                  <p className="mb-0">Hình ảnh sinh</p>
                  <p>động, gần gũi với trẻ</p>
                </div>
              </div>

              {/* Line 1 (rotated 90deg on desktop) */}
              <div className="hidden sm:flex h-[184px] items-center justify-center shrink-0 w-0">
                <div className="flex-none rotate-90">
                  <div className="h-0 relative w-[184px]" data-node-id="24:731">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine3} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 2: An toàn */}
              <div className="flex-1 flex flex-col gap-[8px] items-center p-[24px] rounded-[32px] hover:bg-white/30 transition-colors duration-200" data-node-id="21:669">
                <div className="bg-white border border-[#339e4a] flex items-center p-[8px] rounded-[40px] shrink-0 size-16 justify-center" data-node-id="24:734">
                  <div className="size-12 relative flex items-center justify-center">
                    <img alt="An toàn" className="block size-12 object-contain" src={imgIcon} />
                  </div>
                </div>
                <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] text-center" data-node-id="21:783">
                  An toàn
                </h3>
                <div className="font-vietnam text-[16px] text-[#37393e] leading-[24px] text-center" data-node-id="21:781">
                  <p className="mb-0">Nội dung chuẩn,</p>
                  <p>lành mạnh</p>
                </div>
              </div>

              {/* Line 2 (rotated 90deg on desktop) */}
              <div className="hidden sm:flex h-[184px] items-center justify-center shrink-0 w-0">
                <div className="flex-none rotate-90">
                  <div className="h-0 relative w-[184px]" data-node-id="24:729">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgLine3} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Hiệu quả */}
              <div className="flex-1 flex flex-col gap-[8px] items-center p-[24px] rounded-[32px] hover:bg-white/30 transition-colors duration-200" data-node-id="21:679">
                <div className="bg-white border border-[#64b3e8] flex items-center p-[8px] rounded-[40px] shrink-0 size-16 justify-center" data-node-id="24:735">
                  <div className="size-12 relative flex items-center justify-center">
                    <img alt="Hiệu quả" className="block size-12 object-contain" src={imgIcon1} />
                  </div>
                </div>
                <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] text-center" data-node-id="21:787">
                  Hiệu quả
                </h3>
                <div className="font-vietnam text-[16px] text-[#37393e] leading-[24px] text-center" data-node-id="21:785">
                  <p className="mb-0">Học mà chơi, nhớ</p>
                  <p>lâu hơn</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
