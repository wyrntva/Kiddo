export interface ExploreZone {
  name: string
  desc: string
  color: string
  img: string
}

export const EXPLORE_ZONES: ExploreZone[] = [
  { name: 'Vùng Đất\nCảm Xúc', desc: 'Nhận biết, hiểu rõ và gọi tên cảm xúc', color: '#339e4a', img: '/assets/vung_dat_cam_xuc_island.webp' },
  { name: 'Khu Vườn\nBạn Bè', desc: 'Nuôi dưỡng sẻ chia, quan tâm, hợp tác.', color: '#e55c72', img: '/assets/khu_vuon_ban_be_island.webp' },
  { name: 'Thành Phố\nGiao Tiếp', desc: 'Rèn luyện giao tiếp, lắng nghe và tự tin.', color: '#0a7ad8', img: '/assets/thanh_pho_giao_tiep_island.webp' },
  { name: 'Ngôi Làng\nTự Lập', desc: 'Học cách tự chăm sóc bản thân và tự lập.', color: '#fea01f', img: '/assets/ngoi_lang_tu_lap_island.webp' },
  { name: 'Hành Tinh\nTình Huống', desc: 'Khám phá tình huống thực tế, đưa ra lựa chọn.', color: '#9560d8', img: '/assets/hanh_tinh_tinh_huong_island.webp' },
]

export const GRADIENTS = [
  'from-[#93cbee] via-[#e0f2fe] to-white',
  'from-[#b4c6e7] via-[#f1f5f9] to-white',
  'from-[#7dd3fc] via-[#f0f9ff] to-white',
]

export const DRIFTING_CLOUDS = [
  { top: 60, width: 80, height: 20, speed: 140, delay: -10, zIndex: 1, opacity: 0.35, type: 'A', gradIdx: 0 },
  { top: 100, width: 110, height: 28, speed: 120, delay: -45, zIndex: 1, opacity: 0.4, type: 'B', gradIdx: 1 },
  { top: 140, width: 95, height: 24, speed: 150, delay: -80, zIndex: 1, opacity: 0.3, type: 'C', gradIdx: 2 },
  { top: 180, width: 120, height: 30, speed: 110, delay: -25, zIndex: 1, opacity: 0.45, type: 'A', gradIdx: 0 },
  { top: 220, width: 85, height: 21, speed: 160, delay: -110, zIndex: 1, opacity: 0.35, type: 'B', gradIdx: 1 },
  { top: 260, width: 105, height: 26, speed: 130, delay: -60, zIndex: 1, opacity: 0.4, type: 'C', gradIdx: 2 },
  { top: 300, width: 90, height: 22, speed: 145, delay: -15, zIndex: 1, opacity: 0.3, type: 'A', gradIdx: 0 },
  { top: 340, width: 115, height: 29, speed: 125, delay: -75, zIndex: 1, opacity: 0.42, type: 'B', gradIdx: 1 },
  { top: 380, width: 100, height: 25, speed: 135, delay: -125, zIndex: 1, opacity: 0.38, type: 'C', gradIdx: 2 },
  { top: 420, width: 125, height: 31, speed: 115, delay: -35, zIndex: 1, opacity: 0.48, type: 'A', gradIdx: 0 },
  { top: 460, width: 90, height: 22, speed: 155, delay: -95, zIndex: 1, opacity: 0.35, type: 'B', gradIdx: 1 },
  { top: 500, width: 110, height: 28, speed: 125, delay: -50, zIndex: 1, opacity: 0.4, type: 'C', gradIdx: 2 },
  { top: 540, width: 80, height: 20, speed: 150, delay: -130, zIndex: 1, opacity: 0.3, type: 'A', gradIdx: 0 },
  { top: 580, width: 120, height: 30, speed: 120, delay: -20, zIndex: 1, opacity: 0.45, type: 'B', gradIdx: 1 },
  { top: 620, width: 95, height: 24, speed: 140, delay: -85, zIndex: 1, opacity: 0.35, type: 'C', gradIdx: 2 },
  { top: 660, width: 105, height: 26, speed: 130, delay: -40, zIndex: 1, opacity: 0.4, type: 'A', gradIdx: 0 },
  { top: 700, width: 115, height: 29, speed: 125, delay: -105, zIndex: 1, opacity: 0.42, type: 'B', gradIdx: 1 },
  { top: 740, width: 85, height: 21, speed: 160, delay: -70, zIndex: 1, opacity: 0.3, type: 'C', gradIdx: 2 },
  { top: 120, width: 130, height: 32, speed: 85, delay: -30, zIndex: 3, opacity: 0.65, type: 'A', gradIdx: 0 },
  { top: 250, width: 110, height: 28, speed: 95, delay: -70, zIndex: 3, opacity: 0.6, type: 'B', gradIdx: 1 },
  { top: 370, width: 140, height: 35, speed: 80, delay: -15, zIndex: 3, opacity: 0.7, type: 'C', gradIdx: 2 },
  { top: 490, width: 125, height: 31, speed: 90, delay: -55, zIndex: 3, opacity: 0.62, type: 'A', gradIdx: 0 },
  { top: 610, width: 135, height: 34, speed: 75, delay: -115, zIndex: 3, opacity: 0.65, type: 'B', gradIdx: 1 },
  { top: 730, width: 115, height: 29, speed: 100, delay: -40, zIndex: 3, opacity: 0.58, type: 'C', gradIdx: 2 },
] as const

export const EXPLORE_ISLANDS = [
  { zoneIdx: 0, img: '/assets/vung_dat_cam_xuc_island.png', left: 477, top: 239, width: 280, height: 254, delay: '0s', color: '#339e4a' },
  { zoneIdx: 1, img: '/assets/khu_vuon_ban_be_island.png', left: 722, top: 502, width: 387, height: 303, delay: '0.6s', color: '#e55c72' },
  { zoneIdx: 2, img: '/assets/thanh_pho_giao_tiep_island.png', left: 783, top: 88, width: 238, height: 238, delay: '1.2s', color: '#0a7ad8' },
  { zoneIdx: 3, img: '/assets/ngoi_lang_tu_lap_island.png', left: 1163, top: 154, width: 253, height: 239, delay: '1.8s', color: '#fea01f' },
  { zoneIdx: 4, img: '/assets/hanh_tinh_tinh_huong_island.png', left: 1088, top: 360, width: 339, height: 267, delay: '0.9s', color: '#9560d8' },
] as const

export const ZONE_ROUTES: Record<number, string> = {
  0: '/zone/emotions',
  1: '/zone/friends',
  2: '/zone/communication',
  3: '/zone/independence',
  4: '/zone/situations',
}
