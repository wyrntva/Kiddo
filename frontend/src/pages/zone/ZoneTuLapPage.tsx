import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, markLessonInProgress } from '../../utils/lessonProgress'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'
import AlertDialog from '../../components/common/AlertDialog'

const fallbackLessons: ZoneLesson[] = [
  { id: 1, title: 'Tự mặc quần áo & Đi giày', description: '- Trẻ tự chuẩn bị trang phục và đi giày dép khi đi ra ngoài.', status: 'not-started', stars: 0 },
  { id: 2, title: 'Tự dọn dẹp đồ chơi', description: '- Trẻ học tính ngăn nắp, tự thu dọn đồ chơi sau khi chơi xong.', status: 'not-started', stars: 0 },
  { id: 3, title: 'Vệ sinh cá nhân đúng cách', description: '- Trẻ tự đánh răng, rửa mặt và rửa tay xà phòng trước khi ăn.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Tự chuẩn bị đồ dùng học tập', description: '- Trẻ biết kiểm tra và xếp sách vở, hộp bút vào cặp trước khi đi học.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Giúp đỡ công việc nhà đơn giản', description: '- Trẻ cùng bố mẹ làm việc nhà như lau bàn, nhặt rau hoặc gấp quần áo nhỏ.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#FEA01F',
  heartColor: '#FEA01F',
  progressAccent: '#FEA01F',
  progressBorder: '#FFE6C9',
  progressShadow: '0px 0px 10px rgba(254,160,31,0.2)',
  cardBorder: '#FFE6C9',
  cardShadow: '0px 0px 10px rgba(254,160,31,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(254,160,31,0.6)',
  badgeBg: '#FEA01F',
  encouragementBg: '#FFF8F0',
  encouragementBorder: '#FFE6C9',
  encouragementShadow: '0px 0px 10px rgba(254,160,31,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(254,160,31,0.6)',
  encouragementTitleColor: '#FEA01F',
}

export default function ZoneTuLapPage() {
  const navigate = useNavigate()
  const { user, syncProfile } = useAuth()
  const [lessons, setLessons] = useState<ZoneLesson[]>(fallbackLessons)
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean
    title?: string
    message: string
    type?: 'info' | 'warning' | 'success' | 'lock'
    buttonText?: string
    onConfirm?: () => void
  }>({ isOpen: false, message: '' })

  useEffect(() => {
    syncProfile?.()
  }, [syncProfile])

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
        if (currentZone) {
          const zLock = currentZone.lockStatus || 'UNLOCKED'
          if (zLock === 'DEV') {
            setAlertDialog({
              isOpen: true,
              title: 'Thông báo',
              message: 'Hòn đảo này đang trong quá trình phát triển, vui lòng quay lại sau!',
              type: 'warning',
              onConfirm: () => navigate('/explore'),
            })
            return
          }
          if (zLock === 'PAID' && (!user || !user.isPaid)) {
            setAlertDialog({
              isOpen: true,
              title: 'Nội dung trả phí',
              message: 'Hòn đảo này dành cho tài khoản trả phí. Vui lòng đăng ký gói để mở khóa!',
              type: 'lock',
              buttonText: 'Xem gói học',
              onConfirm: () => navigate('/courses'),
            })
            return
          }

          if (Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
            const dbLessons = currentZone.lessons.map((l: any, index: number) => {
              const isDev = l.lockStatus === 'DEV'
              const isPaidLocked = l.lockStatus === 'PAID' && (!user || !user.isPaid)
              const isLocked = isDev || isPaidLocked

              const status = isLocked ? 'not-started' : getLessonStatusForAccount(l.id, index, user?.id)
              return {
                id: l.id,
                fallbackId: (index % 5) + 1,
                title: l.title,
                description: l.description || '',
                status,
                stars: status === 'completed' ? 5 : 0,
                image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : undefined,
                lockStatus: l.lockStatus || 'UNLOCKED',
              }
            })
            setLessons(dbLessons)
          }
        }
      })
      .catch(err => console.error('Lỗi khi tải bài học:', err))
  }, [user?.id, user?.isPaid, navigate])

  const completedCount = lessons.filter(l => l.status === 'completed').length

  return (
    <>
      <ZoneLandingPage
        backgroundImage="/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.webp"
        islandImage="/assets/vung_dat_tu_lap_island.webp"
        islandAlt="Vùng đất tự lập"
        title="Vùng đất tự lập"
        subtitle="Cùng Toro rèn luyện thói quen tự chăm sóc bản thân mỗi ngày nhé!"
        lessons={lessons}
        completed={completedCount}
        total={lessons.length}
        theme={theme}
        onLessonSelect={(lesson) => {
          if (lesson.lockStatus === 'DEV') {
            setAlertDialog({
              isOpen: true,
              title: 'Thông báo',
              message: 'Bài học này đang trong quá trình phát triển, vui lòng quay lại sau!',
              type: 'warning',
            })
            return
          }
          if (lesson.lockStatus === 'PAID') {
            if (!user || !user.isPaid) {
              setAlertDialog({
                isOpen: true,
                title: 'Nội dung trả phí',
                message: 'Bài học này dành cho tài khoản trả phí. Vui lòng đăng ký gói để mở khóa!',
                type: 'lock',
                buttonText: 'Xem gói học',
                onConfirm: () => navigate('/courses'),
              })
              return
            }
          }
          markLessonInProgress(lesson.id, user?.id, lesson.title)
          navigate(`/zone/independence/lesson/${lesson.id}`)
        }}
      />

      <AlertDialog
        isOpen={alertDialog.isOpen}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
        buttonText={alertDialog.buttonText}
        onClose={() => setAlertDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={alertDialog.onConfirm}
      />
    </>
  )
}
