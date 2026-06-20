
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const imgGiftBoxTop = "/assets/72f3d2fdacd5ea2504405ff90a0e6ef4c5a8dcb6.png";
const imgGiftBoxBottom = "/assets/330d325c53308385eccccfde11e7e7ff4b4a97f9.png";
const imgIconCirclePlus = "/assets/f17506ee7bf025828132541fc90a1dfe513d8065.svg";

export default function CTABanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animationFrameId: number;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 908;
    const height = 512;

    const render = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Chroma key settings optimized for high resolution
        const tMin = 4;
        const tMax = 16;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const maxRB = r > b ? r : b;
          const greenness = g - maxRB;

          // Despilling
          if (greenness > 0) {
            data[i + 1] = maxRB;
          }

          // Soft green-screen keying
          if (greenness > tMin) {
            if (greenness > tMax) {
              data[i + 3] = 0;
            } else {
              const alphaFactor = (tMax - greenness) / (tMax - tMin);
              data[i + 3] = Math.round(data[i + 3] * alphaFactor);
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    video.play().catch(err => console.log("Video play failed:", err));
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="w-full font-vietnam">
      <div 
        className="bg-[#fef9ed] flex flex-col lg:flex-row gap-[48px] items-center p-[24px] rounded-[24px] w-full border border-[#fff4bf]/40 justify-between overflow-hidden shadow-sm lg:min-h-[256px] relative"
        data-node-id="22:535"
      >
        {/* Left Side: Staked Gift Box Composition */}
        <div className="hidden lg:block absolute left-0 bottom-0 size-[250px] select-none" data-node-id="24:1311">
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
        <div className="flex-1 w-full text-center lg:px-[260px] lg:py-[12px] z-10" data-node-id="22:540">
          <div className="flex flex-col gap-[12px] items-center w-full">
            <h2
              className="font-baloo text-[24px] sm:text-[32px] text-[#004c6e] leading-[36px] sm:leading-[56px] font-bold px-1"
              data-node-id="24:1156"
            >
              Bắt đầu hành trình tuyệt vời cùng OTTOPIA!
            </h2>
            
            <div
              className="font-vietnam font-bold text-[#3e484f] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] max-w-[800px] mb-2 text-center"
              data-node-id="24:1154"
            >
              <p className="mb-0">Đăng ký ngay để bé nhận những bài học thú vị</p>
              <p>và phần thưởng hấp dẫn mỗi ngày.</p>
            </div>

            {/* Gradient CTA Button */}
            <button
              onClick={() => {
                if (user) {
                  navigate('/explore');
                } else {
                  navigate('/register');
                }
              }}
              className="bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] active:scale-98 transition-all duration-150 text-white flex gap-[8px] items-center justify-center px-[24px] py-[12px] rounded-[40px] border border-white cursor-pointer shadow-md shadow-orange-500/10 group"
              data-node-id="22:735"
            >
              <span className="font-baloo text-[18px] leading-[36px] font-bold">
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

        {/* Right Side: Trophy Mascot Otter (Video) */}
        <div className="hidden lg:block absolute right-0 bottom-0 size-[256px] select-none" data-node-id="24:1324">
          <div className="absolute h-[256px] left-[-198px] top-0 w-[454px]" data-node-id="138:3280" data-name="Homepage (5) 1">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="hidden"
            >
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
