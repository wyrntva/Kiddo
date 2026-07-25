import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, markLessonInProgress } from '../../utils/lessonProgress'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const fallbackLessons: ZoneLesson[] = [
  { id: 1, title: 'Tự dọn dẹp đồ chơi', description: '- Trẻ biết tự cất dọn đồ chơi gọn gàng sau khi chơi xong.', status: 'not-started', stars: 0 },
  { id: 2, title: 'Tự mặc quần áo', description: '- Trẻ học cách tự mặc quần áo và mang giày dép đơn giản.', status: 'not-started', stars: 0 },
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
  const navigate = useNavigate()
  const { user } = useAuth()
  const [lessons, setLessons] = useState<ZoneLesson[]>(fallbackLessons)

  useEffect(() => {
    setLessons(fallbackLessons.map((l, index) => {
      const status = getLessonStatusForAccount(l.id, index, user?.id)
      return {
        ...l,
        status,
        stars: status === 'completed' ? 5 : 0,
      }
    }))
  }, [user?.id])

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn') ? window.location.origin : 'http://localhost:5000')
    const token = localStorage.getItem('accessToken')

    fetch(`${API_URL}/api/zones`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        const currentZone = json.data?.find((z: any) => z.key === 'independence')
        if (currentZone && Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
          const dbLessons = currentZone.lessons.map((l: any, index: number) => {
            const status = getLessonStatusForAccount(l.id, index, user?.id)
            return {
              id: l.id,
              fallbackId: (index % 5) + 1,
              title: l.title,
              description: l.description || '',
              status,
              stars: status === 'completed' ? 5 : 0,
              image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : undefined,
            }
          })
          setLessons(dbLessons)
        }
      })
      .catch(err => console.error('Lỗi khi tải bài học:', err))
  }, [user?.id])

  const completedCount = lessons.filter(l => l.status === 'completed').length

  return (
    <ZoneLandingPage
      backgroundImage="/assets/414120eafd7f43fce93ce3ecb953fc4142aa8c32.webp"
      islandImage="/assets/ngoi_lang_tu_lap_island.webp"
      islandAlt="Ngôi làng tự lập"
      title="Ngôi làng tự lập"
      subtitle="Cùng Toro học cách tự lập và tự chăm sóc bản thân nhé!"
      lessons={lessons}
      completed={completedCount}
      total={lessons.length}
      theme={theme}
      onLessonSelect={(lesson) => {
        markLessonInProgress(lesson.id, user?.id, lesson.title)
        navigate(`/zone/emotions/lesson/${lesson.id}`)
      }}
    />
  )
}
