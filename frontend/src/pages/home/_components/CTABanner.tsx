
const imgGiftBoxTop = "http://localhost:3845/assets/72f3d2fdacd5ea2504405ff90a0e6ef4c5a8dcb6.png";
const imgGiftBoxBottom = "http://localhost:3845/assets/330d325c53308385eccccfde11e7e7ff4b4a97f9.png";
const imgTrophyMascotRight = "http://localhost:3845/assets/c78066bc662e6c83f3a797f14cf9eb0b875b8637.png";
const imgIconCirclePlus = "http://localhost:3845/assets/f17506ee7bf025828132541fc90a1dfe513d8065.svg";

export default function CTABanner() {
  return (
    <section className="bg-white font-vietnam">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div 
          className="bg-[#fef9ed] flex flex-col lg:flex-row gap-[48px] items-center p-[24px] rounded-[24px] w-full border border-[#fff4bf]/40 justify-between overflow-hidden shadow-sm"
          data-node-id="22:535"
        >
          {/* Left Side: Staked Gift Box Composition */}
          <div className="relative shrink-0 size-[250px] mx-auto lg:mx-0 select-none" data-node-id="24:1311">
            <div className="relative size-full">
              {/* Gift top lid horizontal ribbon crop */}
              <div className="absolute h-[90px] left-0 top-0 w-[250px] overflow-hidden pointer-events-none" data-node-id="24:1312">
                <img 
                  alt="" 
                  className="absolute h-[278.45%] left-[-2.24%] max-w-none top-0 w-[104.49%]" 
                  src={imgGiftBoxTop} 
                />
              </div>
              {/* Gift left vertical ribbon crop */}
              <div className="absolute h-[245px] left-0 top-0 w-[36px] overflow-hidden pointer-events-none" data-node-id="24:1314">
                <img 
                  alt="" 
                  className="absolute h-[102.29%] left-[-15.59%] max-w-none top-0 w-[725.62%]" 
                  src={imgGiftBoxTop} 
                />
              </div>
              {/* Gift bottom box container crop */}
              <div className="absolute h-[176px] left-0 top-[74px] w-[250px] overflow-hidden pointer-events-none" data-node-id="24:1301">
                <img 
                  alt="" 
                  className="absolute h-[142.05%] left-[-10.42%] max-w-none top-[-42.05%] w-[104.46%]" 
                  src={imgGiftBoxBottom} 
                />
              </div>
            </div>
          </div>

          {/* Center Side: Text and Buttons Content */}
          <div className="flex-1 w-full text-center" data-node-id="22:540">
            <div className="flex flex-col gap-[12px] items-center w-full">
              <h2 
                className="font-baloo text-[32px] text-[#004c6e] leading-[44px] md:leading-[56px] font-bold px-1"
                data-node-id="24:1156"
              >
                Bắt đầu hành trình tuyệt vời cùng OTTOPIA!
              </h2>
              
              <div 
                className="font-vietnam font-medium text-[#3e484f] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] max-w-[800px] mb-2 whitespace-pre-wrap"
                data-node-id="24:1154"
              >
                <p className="mb-0">Đăng ký ngay để bé nhận những bài học thú vị</p>
                <p>và phần thưởng hấp dẫn mỗi ngày.</p>
              </div>

              {/* Gradient CTA Button */}
              <button 
                onClick={() => {
                  alert('Chức năng đăng ký tài khoản sẽ sớm ra mắt!');
                }}
                className="bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] active:scale-98 transition-all duration-150 text-white flex gap-[8px] items-center justify-center px-[24px] py-[12px] rounded-[40px] border border-white cursor-pointer shadow-md shadow-orange-500/10 group"
                data-node-id="22:735"
              >
                <span className="font-baloo text-[20px] leading-[36px] font-bold">
                  Tạo tài khoản miễn phí
                </span>
                <div className="relative shrink-0 size-[24px] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img 
                    alt="Plus icon" 
                    className="size-6 block max-w-none" 
                    src={imgIconCirclePlus} 
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: Trophy Mascot Otter */}
          <div className="relative shrink-0 size-[256px] mx-auto lg:mx-0 select-none" data-node-id="24:1324">
            <img 
              alt="Trophy Mascot" 
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
              src={imgTrophyMascotRight} 
            />
          </div>

        </div>
      </div>
    </section>
  )
}
