import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const fallbackLessons: ZoneLesson[] = [
  {
    id: 1,
    title: 'Niềm vui của con',
    description:
      '- Trẻ nhận biết cảm xúc vui của bản thân.\n- Trẻ biết cách chia sẻ niềm vui với người khác.',
    status: 'completed',
    stars: 5,
    image: '/assets/emotions_lesson_1.jpg',
  },
  {
    id: 2,
    title: 'Nỗi buồn bé nhỏ',
    description:
      '- Biết rằng buồn không phải là điều xấu và có thể nói ra nỗi buồn để được lắng nghe, an ủi.',
    status: 'in-progress',
    stars: 0,
    image: '/assets/emotions_lesson_2.jpg',
  },
  {
    id: 3,
    title: 'Cơn giận đang tới',
    description:
      '- Trẻ nhận biết cảm xúc tức giận và biết lựa chọn cách bình tĩnh phù hợp.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_3.jpg',
  },
  {
    id: 4,
    title: 'Khi con thấy sợ',
    description:
      '- Trẻ nhận biết cảm xúc sợ hãi và biết tìm kiếm sự giúp đỡ khi cần.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_4.jpg',
  },
  {
    id: 5,
    title: 'Nói ra cảm xúc của mình',
    description:
      '- Trẻ học cách gọi tên cảm xúc và chia sẻ với người lớn hoặc bạn bè khi cần.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_5.jpg',
  },
]

const theme: ZoneTheme = {
  titleColor: '#339E4A',
  heartColor: '#339e4a',
  progressAccent: '#418457',
  progressBorder: '#c3ffd0',
  progressShadow: '0px 0px 10px rgba(51,158,74,0.2)',
  cardBorder: '#C3FFD0',
  cardShadow: '0px 0px 10px rgba(51,158,74,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(51,158,74,0.6)',
  badgeBg: '#339e4a',
  encouragementBg: '#f2fbef',
  encouragementBorder: '#c3ffd0',
  encouragementShadow: '0px 0px 10px rgba(51,158,74,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(51,158,74,0.6)',
  encouragementTitleColor: '#418457',
}

export default function ZoneCamXucPage() {
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
        const currentZone = json.data?.find((z: any) => z.key === 'emotion')
        if (currentZone && Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
          const dbLessons = currentZone.lessons.map((l: any, index: number) => {
            const fallbackId = (index % 5) + 1
            return {
              id: l.id,
              fallbackId,
              title: l.title,
              description: `- Nhận quà tặng: ${l.stars} ⭐\n- Học thử: ${l.stepsCount} bước học\n- Thời gian học: ${l.duration}\n- Độ khó: ${l.level}`,
              status: index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'not-started',
              stars: index === 0 ? 5 : 0,
              image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : `/assets/emotions_lesson_${fallbackId}.jpg`,
            }
          })
          setLessons(dbLessons)
        }
      })
      .catch(err => console.error('Lỗi khi tải bài học:', err))
  }, [])

  const completedCount = lessons.filter(l => l.status === 'completed').length

  return (
    <ZoneLandingPage
      backgroundImage="/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.webp"
      islandImage="/assets/vung_dat_cam_xuc_island.webp"
      islandAlt="Vùng đất cảm xúc"
      title="Vùng đất cảm xúc"
      subtitle="Cùng Toro học cách nhận biết, chia sẻ và gọi tên cảm xúc nhé!"
      lessons={lessons}
      completed={completedCount}
      total={lessons.length}
      theme={theme}
      onLessonSelect={(lesson) => navigate(`/zone/emotions/lesson/${lesson.id}`)}
    />
  )
}
