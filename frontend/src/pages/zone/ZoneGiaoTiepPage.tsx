import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const fallbackLessons: ZoneLesson[] = [
  { id: 1, title: 'Con biết chào hỏi', description: 'Bé hiểu khi nào cần chào hỏi, biết chọn lời chào phù hợp với từng người và thể hiện thái độ lễ phép, thân thiện khi giao tiếp.', status: 'completed', stars: 5 },
  { id: 2, title: 'Con nói lời cảm ơn', description: 'Bé hiểu vì sao cần nói cảm ơn, biết nhận ra tình huống cần cảm ơn và chọn cách nói cảm ơn phù hợp, chân thành.', status: 'in-progress', stars: 0 },
  { id: 3, title: 'Con nói lời xin lỗi', description: 'Bé hiểu lời xin lỗi giúp sửa chữa tình huống, biết nhận ra khi mình làm sai và chọn cách xin lỗi phù hợp để thể hiện sự quan tâm đến người khác.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Con biết lắng nghe', description: 'Bé hiểu lắng nghe là một phần quan trọng của giao tiếp, biết chú ý khi người khác nói, không ngắt lời và phản hồi phù hợp.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Con biết nhờ giúp đỡ', description: 'Bé hiểu khi nào cần nhờ giúp đỡ, biết nói rõ điều mình cần và chọn cách nhờ giúp đỡ lịch sự, phù hợp với tình huống.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#0a7ad8',
  heartColor: '#0a7ad8',
  progressAccent: '#0a7ad8',
  progressBorder: '#bce2ff',
  progressShadow: '0px 0px 10px rgba(10,122,216,0.2)',
  cardBorder: '#C9E6FF',
  cardShadow: '0px 0px 10px rgba(10,122,216,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(10,122,216,0.6)',
  badgeBg: '#0a7ad8',
  encouragementBg: '#e5f2ff',
  encouragementBorder: '#bce2ff',
  encouragementShadow: '0px 0px 10px rgba(10,122,216,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(10,122,216,0.6)',
  encouragementTitleColor: '#0a7ad8',
}

export default function ZoneGiaoTiepPage() {
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
        const currentZone = json.data?.find((z: any) => z.key === 'communication')
        if (currentZone && Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
          const dbLessons = currentZone.lessons.map((l: any, index: number) => ({
            id: l.id,
            fallbackId: (index % 5) + 1,
            title: l.title,
            description: `- Nhận quà tặng: ${l.stars} ⭐\n- Học thử: ${l.stepsCount} bước học\n- Thời gian học: ${l.duration}\n- Độ khó: ${l.level}`,
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
      backgroundImage="/assets/91f866117dd6591a067bf62bae3766ed02c65b97.webp"
      islandImage="/assets/thanh_pho_giao_tiep_island.webp"
      islandAlt="Thành phố giao tiếp"
      title="Thành phố giao tiếp"
      subtitle="Cùng Toro học cách giao tiếp lễ phép và tự tin nhé!"
      lessons={lessons}
      completed={completedCount}
      total={lessons.length}
      theme={theme}
      onLessonSelect={(lesson) => navigate(`/zone/emotions/lesson/${lesson.id}`)}
    />
  )
}
