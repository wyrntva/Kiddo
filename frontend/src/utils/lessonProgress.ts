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
  index?: number,
  userId?: string | null,
  lessonTitle?: string
): LessonStatus {
  const progress = getAccountLessonProgress(userId)
  const idStr = String(lessonId)

  if (progress[idStr]) {
    return progress[idStr]
  }

  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    if (progress[titleKey]) {
      return progress[titleKey]
    }
  }

  if (index !== undefined && progress[String(index + 1)]) {
    return progress[String(index + 1)]
  }

  return 'not-started'
}

export function saveLessonStatusForAccount(
  lessonId: string | number,
  status: LessonStatus,
  userId?: string | null,
  lessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const progress = getAccountLessonProgress(userId)
  progress[String(lessonId)] = status
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    progress[titleKey] = status
  }
  const key = getUserProgressKey(userId)
  localStorage.setItem(key, JSON.stringify(progress))
}

export function markLessonCompleted(
  completedLessonId: string | number,
  nextLessonId?: string | number | null,
  userId?: string | null,
  completedLessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const progress = getAccountLessonProgress(userId)
  progress[String(completedLessonId)] = 'completed'
  if (completedLessonTitle) {
    const titleKey = `title_${completedLessonTitle.toLowerCase().trim()}`
    progress[titleKey] = 'completed'
  }
  if (nextLessonId && progress[String(nextLessonId)] !== 'completed') {
    progress[String(nextLessonId)] = 'in-progress'
  }
  const key = getUserProgressKey(userId)
  localStorage.setItem(key, JSON.stringify(progress))
}

export function markLessonInProgress(
  lessonId: string | number,
  userId?: string | null,
  lessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const progress = getAccountLessonProgress(userId)
  const idStr = String(lessonId)
  if (progress[idStr] !== 'completed') {
    progress[idStr] = 'in-progress'
  }
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    if (progress[titleKey] !== 'completed') {
      progress[titleKey] = 'in-progress'
    }
  }
  const key = getUserProgressKey(userId)
  localStorage.setItem(key, JSON.stringify(progress))
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
  lessonTitle?: string,
  index?: number
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
  if (index !== undefined && feedbacks[String(index + 1)]) {
    return feedbacks[String(index + 1)]
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
