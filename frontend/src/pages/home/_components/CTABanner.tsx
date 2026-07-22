import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useChromaKey } from '../../../hooks/useChromaKey';

const imgGiftBoxTop = "/assets/72f3d2fdacd5ea2504405ff90a0e6ef4c5a8dcb6.webp";
const imgGiftBoxBottom = "/assets/330d325c53308385eccccfde11e7e7ff4b4a97f9.webp";
const imgIconCirclePlus = "/assets/f17506ee7bf025828132541fc90a1dfe513d8065.svg";

export default function CTABanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useChromaKey(videoRef, canvasRef, { width: 908, height: 512 });

  return (
    <section className="w-full font-vietnam">
      <div
        className="bg-[#fef9ed] flex flex-col lg:flex-row gap-[48px] items-center p-[24px] rounded-[24px] w-full border border-[#fff4bf]/40 justify-between overflow-hidden shadow-sm lg:min-h-[256px] relative"
      >
        {/* Left Side: Staked Gift Box Composition */}
        <div className="hidden lg:block absolute left-0 bottom-0 size-[250px] select-none">
          <div className="relative size-full">
            <div className="absolute h-[90px] left-0 top-0 w-[250px] overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[278.45%] left-[-2.24%] max-w-none top-0 w-[104.49%]"
                src={imgGiftBoxTop}
                loading="lazy" decoding="async"
              />
            </div>
            <div className="absolute h-[245px] left-0 top-0 w-[36px] overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[102.29%] left-[-15.59%] max-w-none top-0 w-[725.62%]"
                src={imgGiftBoxTop}
                loading="lazy" decoding="async"
              />
            </div>
            <div className="absolute h-[176px] left-0 top-[74px] w-[250px] overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[142.05%] left-[-10.42%] max-w-none top-[-42.05%] w-[104.46%]"
                src={imgGiftBoxBottom}
                loading="lazy" decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Center Side: Text and Buttons Content */}
        <div className="flex-1 w-full text-center lg:px-[260px] lg:py-[12px] z-10">
          <div className="flex flex-col gap-[12px] items-center w-full">
            <h2 className="font-baloo text-[24px] sm:text-[32px] text-[#004c6e] leading-[36px] sm:leading-[56px] font-bold px-1">
              Bắt đầu hành trình tuyệt vời cùng OTTOPIA!
            </h2>
            <div className="font-vietnam font-bold text-[#3e484f] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] max-w-[800px] mb-2 text-center">
              <p className="mb-0">Đăng ký ngay để bé nhận những bài học thú vị</p>
              <p>và phần thưởng hấp dẫn mỗi ngày.</p>
            </div>
            <button
              onClick={() => { navigate(user ? '/explore' : '/register') }}
              className="bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] active:scale-98 transition-all duration-150 text-white flex gap-[8px] items-center justify-center px-[24px] py-[12px] rounded-[40px] border border-white cursor-pointer shadow-md shadow-orange-500/10 group"
            >
              <span className="font-baloo text-[18px] leading-[36px] font-bold">
                Tạo tài khoản miễn phí
              </span>
              <div className="relative shrink-0 size-[24px] flex items-center justify-center group-hover:scale-105 transition-transform">
                <img alt="Plus icon" className="size-6 block max-w-none" src={imgIconCirclePlus} loading="lazy" decoding="async" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Side: Trophy Mascot Otter (Video) */}
        <div className="hidden lg:block absolute right-0 bottom-0 size-[256px] select-none">
          <div className="absolute h-[256px] left-[-198px] top-0 w-[454px]">
            <video ref={videoRef} autoPlay loop muted playsInline className="hidden">
              <source src="/hello.webm" type="video/webm" />
              <source src="/hello.mp4" type="video/mp4" />
            </video>
            <canvas
              ref={canvasRef}
              width={908}
              height={512}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
