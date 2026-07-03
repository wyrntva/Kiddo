import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const lessons: ZoneLesson[] = [
  { id: 1, title: 'Tự dọn dẹp đồ chơi', description: '- Trẻ biết tự cất dọn đồ chơi gọn gàng sau khi chơi xong.', status: 'completed', stars: 5 },
  { id: 2, title: 'Tự mặc quần áo', description: '- Trẻ học cách tự mặc quần áo và mang giày dép đơn giản.', status: 'in-progress', stars: 0 },
  { id: 3, title: 'Giữ gìn vệ sinh cá nhân', description: '- Trẻ biết tự rửa tay, đánh răng và giữ vệ sinh cá nhân sạch sẽ.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Giúp đỡ việc nhà nhỏ', description: '- Trẻ biết giúp đỡ cha mẹ các việc vặt như quét nhà, lau bàn.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Tự chuẩn bị đồ dùng', description: '- Trẻ biết tự chuẩn bị balo, sách vở trước khi đi học.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#895026',
  heartColor: '#895026',
  progressAccent: '#fea01f',
  progressBorder: '#ffe7bf',
  progressShadow: '0px 0px 10px rgba(254,160,31,0.2)',
  cardBorder: '#fff4bf',
  cardShadow: '0px 0px 10px rgba(254,160,31,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(254,160,31,0.6)',
  badgeBg: '#fea01f',
  encouragementBg: '#fff6e6',
  encouragementBorder: '#ffe7bf',
  encouragementShadow: '0px 0px 10px rgba(254,160,31,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(254,160,31,0.6)',
  encouragementTitleColor: '#fea01f',
}

export default function ZoneTuLapPage() {
  return (
    <ZoneLandingPage
      backgroundImage="/assets/414120eafd7f43fce93ce3ecb953fc4142aa8c32.png"
      islandImage="/assets/ngoi_lang_tu_lap_island.png"
      islandAlt="Ngôi làng tự lập"
      title="Ngôi làng tự lập"
      subtitle="Cùng Toro học cách tự lập và tự chăm sóc bản thân nhé!"
      lessons={lessons}
      completed={2}
      total={5}
      theme={theme}
    />
  )
}
