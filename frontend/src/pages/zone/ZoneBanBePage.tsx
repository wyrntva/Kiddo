import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const lessons: ZoneLesson[] = [
  { id: 1, title: 'Biết cách chia sẻ', description: '- Trẻ học cách chia sẻ đồ chơi và đồ ăn với các bạn.', status: 'completed', stars: 5 },
  { id: 2, title: 'Lắng nghe bạn bè', description: '- Trẻ học cách lắng nghe và tôn trọng ý kiến của bạn.', status: 'in-progress', stars: 0 },
  { id: 3, title: 'Hợp tác nhóm', description: '- Trẻ học cách hợp tác và chơi chung vui vẻ với nhóm bạn.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Giải quyết xung đột', description: '- Trẻ học cách giải hòa bằng lời nói khi có tranh chấp với bạn.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Cảm thông và giúp đỡ', description: '- Trẻ biết quan tâm, an ủi khi thấy bạn gặp khó khăn hoặc buồn.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#e55c72',
  heartColor: '#e55c72',
  progressAccent: '#e55c72',
  progressBorder: '#ffd6db',
  progressShadow: '0px 0px 10px rgba(229,92,114,0.2)',
  cardBorder: '#ffc9d1',
  cardShadow: '0px 0px 10px rgba(229,92,114,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(229,92,114,0.6)',
  badgeBg: '#e55c72',
  encouragementBg: '#fff0f2',
  encouragementBorder: '#ffd6db',
  encouragementShadow: '0px 0px 10px rgba(229,92,114,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(229,92,114,0.6)',
  encouragementTitleColor: '#e55c72',
}

export default function ZoneBanBePage() {
  return (
    <ZoneLandingPage
      backgroundImage="/assets/2404296262476703df2b4a673defe4ce7ede08d1.png"
      islandImage="/assets/khu_vuon_ban_be_island.png"
      islandAlt="Khu vườn bạn bè"
      title="Khu vườn bạn bè"
      subtitle="Cùng Toro học cách kết bạn và chia sẻ yêu thương nhé!"
      lessons={lessons}
      completed={2}
      total={5}
      theme={theme}
    />
  )
}
