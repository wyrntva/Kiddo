import { useState, useEffect } from 'react'

// Assets — all already in public/assets/
const imgLogo       = "/assets/logo_ottopia.webp"
const imgAvatar     = "/assets/567c1f8e1a376373c8c7749b158426dd62cb60c2.webp"
const imgAvatar1    = "/assets/de633722309fe20675a2a35a6657b31451904c1c.webp"
const imgFacebook   = "/assets/999d0b74019cdcd7dc4ee450117c038bf7b46dff.svg"
const imgYoutube    = "/assets/5b775e88ecb300259c2df3b7bec5922f579027ba.svg"
const imgTiktok     = "/assets/d90e182ab78acaa1ae26ca4006a9509dc49db0ca.svg"
const imgInstagram  = "/assets/89c64997fd9e5661072f99cb94c0efd17ab9e551.svg"
const imgHeart      = "/assets/bdbbb95075ff18bc1732686588996909478aedcc.svg"
const imgMessages   = "/assets/159e68ad449696f37117068d1ffc4c11894c8114.svg"

interface StoreSettings {
  name: string
  phone: string | null
  gmail: string | null
  facebook_url: string | null
  youtube_url: string | null
  tiktok_url: string | null
  instagram_url: string | null
  footer_description: string | null
  footer_copyright: string | null
  phone_number: string | null
}

function ColHeading({ children }: { children: string }) {
  return (
    <p className="font-baloo font-bold text-[18px] leading-[32px] text-[#004c6e] not-italic uppercase">
      {children}
    </p>
  )
}

function FooterLink({ children, href = '#' }: { children: string; href?: string }) {
  return (
    <a href={href} className="font-vietnam text-[16px] leading-[24px] text-[#575e70] hover:text-[#004c6e] transition-colors">
      {children}
    </a>
  )
}

function SocialBtn({ icon, inset }: { icon: string; inset: string }) {
  return (
    <div className="bg-[#0a7ad8] flex items-center justify-center p-[8px] rounded-[100px] shrink-0 cursor-pointer hover:bg-[#085fb0] transition-colors">
      <div className="relative size-[24px]">
        <div className={`absolute ${inset}`}>
          <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 size-full max-w-none" src={icon} />
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${API_URL}/api/store-settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Lỗi tải cấu hình footer:', err))
  }, [API_URL])

  const facebookUrl = settings?.facebook_url || "https://www.facebook.com/ottopia.kynangsongchotre";
  const youtubeUrl = settings?.youtube_url || "";
  const tiktokUrl = settings?.tiktok_url || "";
  const instagramUrl = settings?.instagram_url || "";
  const email = settings?.gmail || "ottopia@gmail.com";
  const phone = settings?.phone_number || "0987654321";

  return (
    <footer className="relative z-10 bg-[#e6f6ff] flex flex-col items-start pt-[48px] w-full font-vietnam">

      {/* ── Main columns ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 xl:gap-[48px] items-start px-4 md:px-8 xl:px-[48px] w-full">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-[24px] items-start pb-[32px]">
          {/* Logo — aspect ratio 506:224 từ Figma */}
          <div className="w-full max-w-[220px]" style={{ aspectRatio: '506/224' }}>
            <img loading="lazy" decoding="async" alt="OTTOPIA" className="w-full h-full object-contain" src={imgLogo} />
          </div>
          <p className="font-vietnam text-[16px] leading-[24px] text-[#3e484f] pr-[16px]">
            {settings?.footer_description || "Ottopia đồng hành cùng bé phát triển kỹ năng sống qua những trải nghiệm vui vẻ và ý nghĩa mỗi ngày."}
          </p>
          <div className="flex gap-[24px] items-start">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <SocialBtn icon={imgFacebook}  inset="inset-[11.98%_29.06%_11.98%_28.65%]" />
              </a>
            )}
            {youtubeUrl && (
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                <SocialBtn icon={imgYoutube}   inset="inset-[19.56%_7.86%]" />
              </a>
            )}
            {tiktokUrl && (
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
                <SocialBtn icon={imgTiktok}    inset="inset-[12.5%_15.9%_10.75%_16.67%]" />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <SocialBtn icon={imgInstagram} inset="inset-[11.64%_11.7%]" />
              </a>
            )}
          </div>
        </div>

        {/* Col 2 — Khám phá */}
        <div className="flex flex-col gap-[24px] items-start">
          <ColHeading>KHÁM PHÁ</ColHeading>
          <div className="flex flex-col gap-[8px] items-start">
            <FooterLink>Vùng Đất Cảm Xúc</FooterLink>
            <FooterLink>Thành Phố Giao Tiếp</FooterLink>
            <FooterLink>Ngôi Làng Tự Lập</FooterLink>
            <FooterLink>Khu Vườn Bạn Bè</FooterLink>
            <FooterLink>Hành Tinh Tình Huống</FooterLink>
          </div>
        </div>

        {/* Col 3 — Hỗ trợ */}
        <div className="flex flex-col gap-[24px] items-start">
          <ColHeading>HỖ TRỢ</ColHeading>
          <div className="flex flex-col gap-[8px] items-start">
            <FooterLink>Câu hỏi thường gặp</FooterLink>
            <FooterLink>Liên hệ</FooterLink>
          </div>
        </div>

        {/* Col 4 — Về Ottopia */}
        <div className="flex flex-col gap-[24px] items-start">
          <ColHeading>VỀ OTTOPIA</ColHeading>
          <div className="flex flex-col gap-[8px] items-start">
            <FooterLink>Về chúng tôi</FooterLink>
            <FooterLink>Chính sách bảo mật</FooterLink>
            <FooterLink href="/terms">Điều khoản sử dụng</FooterLink>
          </div>
        </div>

        {/* Col 5 — Kết nối */}
        <div className="flex flex-col gap-[24px] items-start">
          <ColHeading>KẾT NỐI</ColHeading>
          <div className="flex flex-col gap-[8px] items-start">
            <FooterLink href={`mailto:${email}`}>{`Email: ${email}`}</FooterLink>
            <FooterLink href={`tel:${phone}`}>{`Số điện thoại: ${phone}`}</FooterLink>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#c9e6ff] px-4 md:px-8 xl:px-[48px] w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between py-[24px] w-full gap-4 lg:gap-0">

          {/* Left — copyright */}
          <p className="font-vietnam text-[14px] leading-[20px] text-[#575e70] tracking-[0.28px] whitespace-nowrap">
            {settings?.footer_copyright || "© 2026 OTTOPIA Learning. All rights reserved."}
          </p>

          {/* Center — Made with ❤ */}
          <div className="flex gap-[4px] items-center">
            <p className="font-vietnam text-[14px] leading-[20px] text-[#575e70] tracking-[0.28px]">Made with</p>
            <div className="relative size-[16px]">
              <div className="absolute inset-[21.88%_13.54%_17.71%_13.54%]">
                <img loading="lazy" decoding="async" alt="❤" className="absolute block inset-0 size-full max-w-none" src={imgHeart} />
              </div>
            </div>
            <p className="font-vietnam text-[14px] leading-[20px] text-[#575e70] tracking-[0.28px]">for kids and parents</p>
          </div>

          {/* Right — Liên hệ button */}
          <div className="bg-[#fef9ed] flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[40px] cursor-pointer hover:bg-[#fef3d3] transition-colors shrink-0">
            <div className="relative rounded-[66.667px] size-[24px] shrink-0">
              <div className="absolute inset-0 pointer-events-none rounded-[66.667px] overflow-hidden">
                <img loading="lazy" decoding="async" alt="" className="absolute size-full object-cover rounded-[66.667px]" src={imgAvatar} />
                <div className="absolute inset-0 overflow-hidden rounded-[66.667px]">
                  <img loading="lazy" decoding="async"
                    alt=""
                    className="absolute max-w-none"
                    style={{ height: '153.33%', left: '-52.76%', top: '0.3%', width: '182.9%' }}
                    src={imgAvatar1}
                  />
                </div>
              </div>
            </div>
            <p className="font-baloo text-[14px] leading-[24px] text-[#fea01f] whitespace-nowrap">
              Liên hệ với OTTOPIA
            </p>
            <div className="relative size-[24px] shrink-0">
              <img loading="lazy" decoding="async" alt="" className="absolute block inset-0 size-full max-w-none" src={imgMessages} />
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}
