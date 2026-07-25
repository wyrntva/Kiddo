export type LessonStatus = 'completed' | 'in-progress' | 'not-started'

export function getUserProgressKey(userId?: string | null): string {
  return `user_lesson_progress_${userId || 'guest'}`
}

export function getAccountLessonProgress(userId?: string | null): Record<string, LessonStatus> {
  if (typeof window === 'undefined') return {}
  const key = getUserProgressKey(userId)
  const saved = localStorage.getItem(key)
  if (!saved) return {}
  try {
    return JSON.parse(saved)
  } catch {
    return {}
  }
}

export function getLessonStatusForAccount(
  lessonId: string | number,
  _index?: number,
  userId?: string | null
): LessonStatus {
  const progress = getAccountLessonProgress(userId)
  const idStr = String(lessonId)

  if (progress[idStr]) {
    return progress[idStr]
  }

  // Brand new account or no saved progress yet:
  // All lessons start as 'not-started'
  return 'not-started'
}

export function saveLessonStatusForAccount(
  lessonId: string | number,
  status: LessonStatus,
  userId?: string | null
) {
  if (typeof window === 'undefined') return
  const progress = getAccountLessonProgress(userId)
  progress[String(lessonId)] = status
  const key = getUserProgressKey(userId)
  localStorage.setItem(key, JSON.stringify(progress))
}

export function markLessonCompleted(
  completedLessonId: string | number,
  nextLessonId?: string | number | null,
  userId?: string | null
) {
  if (typeof window === 'undefined') return
  const progress = getAccountLessonProgress(userId)
  progress[String(completedLessonId)] = 'completed'
  if (nextLessonId && progress[String(nextLessonId)] !== 'completed') {
    progress[String(nextLessonId)] = 'in-progress'
  }
  const key = getUserProgressKey(userId)
  localStorage.setItem(key, JSON.stringify(progress))
}

export function markLessonInProgress(
  lessonId: string | number,
  userId?: string | null
) {
  if (typeof window === 'undefined') return
  const progress = getAccountLessonProgress(userId)
  if (progress[String(lessonId)] !== 'completed') {
    progress[String(lessonId)] = 'in-progress'
    const key = getUserProgressKey(userId)
    localStorage.setItem(key, JSON.stringify(progress))
  }
}

export interface SavedLessonFeedback {
  title: string
  strengths: string[]
  practice: string[]
  tips: string[]
}

export function getUserFeedbackKey(userId?: string | null): string {
  return `user_lesson_feedback_${userId || 'guest'}`
}

export function getAccountLessonFeedbacks(userId?: string | null): Record<string, SavedLessonFeedback> {
  if (typeof window === 'undefined') return {}
  const key = getUserFeedbackKey(userId)
  const saved = localStorage.getItem(key)
  if (!saved) return {}
  try {
    return JSON.parse(saved)
  } catch {
    return {}
  }
}

export function getSavedLessonFeedbackForAccount(
  lessonId: string | number,
  userId?: string | null,
  lessonTitle?: string
): SavedLessonFeedback | null {
  const feedbacks = getAccountLessonFeedbacks(userId)
  if (lessonId && feedbacks[String(lessonId)]) {
    return feedbacks[String(lessonId)]
  }
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    if (feedbacks[titleKey]) {
      return feedbacks[titleKey]
    }
  }
  return null
}

export function saveLessonFeedbackForAccount(
  lessonId: string | number,
  feedback: SavedLessonFeedback,
  userId?: string | null,
  lessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const feedbacks = getAccountLessonFeedbacks(userId)
  if (lessonId) {
    feedbacks[String(lessonId)] = feedback
  }
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    feedbacks[titleKey] = feedback
  }
  const key = getUserFeedbackKey(userId)
  localStorage.setItem(key, JSON.stringify(feedbacks))
}
