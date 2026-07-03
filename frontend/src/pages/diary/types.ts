export interface DiaryLesson {
  id: string
  title: string
  status: 'active' | 'learning' | 'locked' | 'completed'
  statusLabel: string
  isCompleted: boolean
  feedback: {
    title: string
    strengths: string[]
    practice: string[]
    tips: string[]
  }
}

export interface DiarySkill {
  label: string
  progress: number
  color: string
  spriteOffset: string
}

export interface DiaryIsland {
  name: string
  bgColor: string
  borderColor: string
  image: string
  bgHex: string
  textColor: string
  fillColor: string
  caretIcon: string
  skills: DiarySkill[]
}
