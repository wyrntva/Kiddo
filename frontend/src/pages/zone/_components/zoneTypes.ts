export type ZoneLessonStatus = 'completed' | 'in-progress' | 'not-started'

export interface ZoneLesson {
  id: string | number
  fallbackId?: number
  title: string
  description: string
  status: ZoneLessonStatus
  stars: number
  image?: string
}

export interface ZoneTheme {
  titleColor: string
  heartColor: string
  progressAccent: string
  progressBorder: string
  progressShadow: string
  cardBorder: string
  cardShadow: string
  cardHoverShadow: string
  badgeBg: string
  encouragementBg: string
  encouragementBorder: string
  encouragementShadow: string
  encouragementHoverShadow: string
  encouragementTitleColor: string
}
