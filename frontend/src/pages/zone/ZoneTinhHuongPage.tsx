import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const fallbackLessons: ZoneLesson[] = [
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
  const navigate = useNavigate()
  const [lessons, setLessons] = useState<ZoneLesson[]>(fallbackLessons)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const token = localStorage.getItem('accessToken')

    fetch(`${API_URL}/api/zones`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        const currentZone = json.data?.find((z: any) => z.key === 'situation')
        if (currentZone && Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
          const dbLessons = currentZone.lessons.map((l: any, index: number) => ({
            id: l.id,
            fallbackId: (index % 5) + 1,
            title: l.title,
            description: l.description || '',
            status: index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'not-started',
            stars: index === 0 ? 5 : 0,
            image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : undefined,
          }))
          setLessons(dbLessons)
        }
      })
      .catch(err => console.error('Lỗi khi tải bài học:', err))
  }, [])

  const completedCount = lessons.filter(l => l.status === 'completed').length

  return (
    <ZoneLandingPage
      backgroundImage="/assets/131500a5eda7eb53e290d9d7a3da955581279cdd.webp"
      islandImage="/assets/hanh_tinh_tinh_huong_island.webp"
      islandAlt="Hành tinh tình huống"
      title="Hành tinh tình huống"
      subtitle="Cùng Toro học cách xử lý các tình huống khéo léo nhé!"
      lessons={lessons}
      completed={completedCount}
      total={lessons.length}
      theme={theme}
      onLessonSelect={(lesson) => navigate(`/zone/emotions/lesson/${lesson.id}`)}
    />
  )
}
