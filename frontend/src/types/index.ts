export interface User {
  name: string
  level: number
  stars: number
  badges: number
  lessonsCompleted: number
  weeklyProgress: number
}

export interface SkillZone {
  id: string
  name: string
  lessons: number
  emoji: string
  gradient: string
}
