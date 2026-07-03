import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const lessons: ZoneLesson[] = [
  { id: 1, title: 'Khi bị lạc đường', description: '- Trẻ biết tìm kiếm sự giúp đỡ từ người đáng tin cậy khi bị lạc.', status: 'completed', stars: 5 },
  { id: 2, title: 'Gặp người lạ nói chuyện', description: '- Trẻ biết cách từ chối quà và không đi theo người lạ.', status: 'in-progress', stars: 0 },
  { id: 3, title: 'Ứng phó khi xảy ra hỏa hoạn', description: '- Trẻ học cách di chuyển an toàn và thoát hiểm khi có cháy.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Sử dụng thiết bị điện an toàn', description: '- Trẻ nhận biết các mối nguy hiểm từ ổ điện và đồ dùng điện.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Gọi điện số khẩn cấp', description: '- Trẻ nhớ số điện thoại khẩn cấp và cách gọi điện báo cáo tình huống.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#F2F0FE',
  heartColor: '#F2F0FE',
  progressAccent: '#9560d8',
  progressBorder: '#ebd6ff',
  progressShadow: '0px 0px 10px rgba(149,96,216,0.2)',
  cardBorder: '#e9d8ff',
  cardShadow: '0px 0px 10px rgba(149,96,216,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(149,96,216,0.6)',
  badgeBg: '#9560d8',
  encouragementBg: '#f8f0ff',
  encouragementBorder: '#ebd6ff',
  encouragementShadow: '0px 0px 10px rgba(149,96,216,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(149,96,216,0.6)',
  encouragementTitleColor: '#9560d8',
}

export default function ZoneTinhHuongPage() {
  return (
    <ZoneLandingPage
      backgroundImage="/assets/131500a5eda7eb53e290d9d7a3da955581279cdd.png"
      islandImage="/assets/hanh_tinh_tinh_huong_island.png"
      islandAlt="Hành tinh tình huống"
      title="Hành tinh tình huống"
      subtitle="Cùng Toro học cách xử lý các tình huống khéo léo nhé!"
      lessons={lessons}
      completed={2}
      total={5}
      theme={theme}
    />
  )
}
