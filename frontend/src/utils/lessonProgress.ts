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

  const match = idStr.match(/lesson-(\d+)/i)
  if (match && progress[match[1]]) {
    return progress[match[1]]
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

  const qResults = getSavedQuestionResultsForAccount(lessonId, userId, lessonTitle, index)
  if (Object.keys(qResults).length > 0) {
    return 'in-progress'
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

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (typeof window !== 'undefined' && window.location && window.location.hostname.includes('ottopia.vn')) {
    return window.location.origin
  }
  return 'http://localhost:5000'
}

const API_URL = getApiUrl()

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = localStorage.getItem('accessToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function syncProgressFromAPI(userId?: string | null): Promise<boolean> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  if (!token) return false

  try {
    const res = await fetch(`${API_URL}/api/progress`, {
      headers: { ...getAuthHeader() },
    })
    if (!res.ok) return false
    const data = await res.json()

    if (data.progress) {
      const progressMap = getAccountLessonProgress(userId)
      for (const p of data.progress) {
        const idStr = String(p.lessonId)
        progressMap[idStr] = p.status as LessonStatus
        const match = idStr.match(/lesson-(\d+)/i)
        if (match) {
          progressMap[match[1]] = p.status as LessonStatus
        }
        if (p.lessonTitle) {
          const titleKey = `title_${p.lessonTitle.toLowerCase().trim()}`
          progressMap[titleKey] = p.status as LessonStatus
        }
      }
      const key = getUserProgressKey(userId)
      localStorage.setItem(key, JSON.stringify(progressMap))
    }

    if (data.questionResults) {
      const existingResults = getAccountQuestionResults(userId)
      const mergedResults = { ...existingResults, ...data.questionResults }
      if (data.lessonTitles) {
        for (const lId in data.questionResults) {
          const title = data.lessonTitles[lId]
          if (title) {
            const titleKey = `title_${title.toLowerCase().trim()}`
            mergedResults[titleKey] = data.questionResults[lId]
          }
        }
      }
      const key = getQuestionResultsKey(userId)
      localStorage.setItem(key, JSON.stringify(mergedResults))
    }

    return true
  } catch (err) {
    console.warn('Sync progress failed:', err)
    return false
  }
}

export async function apiStartLesson(lessonId: string | number) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  if (!token) return

  try {
    await fetch(`${API_URL}/api/progress/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ lessonId: String(lessonId) }),
    })
  } catch (err) {
    console.warn('API start lesson failed:', err)
  }
}

export async function apiCompleteLesson(lessonId: string | number) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  if (!token) return

  try {
    await fetch(`${API_URL}/api/progress/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ lessonId: String(lessonId) }),
    })
  } catch (err) {
    console.warn('API complete lesson failed:', err)
  }
}

export async function apiSaveAnswer(lessonId: string | number, questionIndex: number, isCorrect: boolean) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  if (!token) return

  try {
    await fetch(`${API_URL}/api/progress/${lessonId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ questionIndex, isCorrect }),
    })
  } catch (err) {
    console.warn('API save answer failed:', err)
  }
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

  void apiCompleteLesson(completedLessonId)
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

  void apiStartLesson(lessonId)
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

export function clearLessonFeedbackForAccount(
  lessonId: string | number,
  userId?: string | null,
  lessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const feedbacks = getAccountLessonFeedbacks(userId)
  if (lessonId && feedbacks[String(lessonId)]) {
    delete feedbacks[String(lessonId)]
  }
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    if (feedbacks[titleKey]) {
      delete feedbacks[titleKey]
    }
  }
  const key = getUserFeedbackKey(userId)
  localStorage.setItem(key, JSON.stringify(feedbacks))
}

export function getQuestionResultsKey(userId?: string | null): string {
  return `user_question_results_${userId || 'guest'}`
}

export function getAccountQuestionResults(userId?: string | null): Record<string, Record<number, boolean>> {
  if (typeof window === 'undefined') return {}
  const key = getQuestionResultsKey(userId)
  const saved = localStorage.getItem(key)
  if (!saved) return {}
  try {
    return JSON.parse(saved)
  } catch {
    return {}
  }
}

export function getSavedQuestionResultsForAccount(
  lessonId: string | number,
  userId?: string | null,
  lessonTitle?: string,
  index?: number
): Record<number, boolean> {
  const allResults = getAccountQuestionResults(userId)
  const idStr = String(lessonId)

  if (lessonId && allResults[idStr]) {
    return allResults[idStr]
  }

  const match = idStr.match(/lesson-(\d+)/i)
  if (match && allResults[match[1]]) {
    return allResults[match[1]]
  }

  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    if (allResults[titleKey]) {
      return allResults[titleKey]
    }
  }

  if (index !== undefined && allResults[String(index + 1)]) {
    return allResults[String(index + 1)]
  }

  return {}
}

export function clearQuestionResultsForAccount(
  lessonId: string | number,
  userId?: string | null,
  lessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const allResults = getAccountQuestionResults(userId)
  const idStr = String(lessonId)
  if (allResults[idStr]) {
    delete allResults[idStr]
  }
  const match = idStr.match(/lesson-(\d+)/i)
  if (match && allResults[match[1]]) {
    delete allResults[match[1]]
  }
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    if (allResults[titleKey]) {
      delete allResults[titleKey]
    }
  }
  const key = getQuestionResultsKey(userId)
  localStorage.setItem(key, JSON.stringify(allResults))
}

export function saveQuestionResultsForAccount(
  lessonId: string | number,
  results: Record<number, boolean>,
  userId?: string | null,
  lessonTitle?: string
) {
  if (typeof window === 'undefined') return
  const allResults = getAccountQuestionResults(userId)
  if (lessonId) {
    allResults[String(lessonId)] = results
  }
  if (lessonTitle) {
    const titleKey = `title_${lessonTitle.toLowerCase().trim()}`
    allResults[titleKey] = results
  }
  const key = getQuestionResultsKey(userId)
  localStorage.setItem(key, JSON.stringify(allResults))

  if (lessonId) {
    for (const qIdx in results) {
      void apiSaveAnswer(lessonId, Number(qIdx), results[qIdx])
    }
  }
}
