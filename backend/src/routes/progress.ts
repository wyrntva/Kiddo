import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/authMiddleware'

const router = Router()

// All routes require authentication
router.use(authenticate)

// GET /api/progress - Get all lesson progress for current user
router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId

    const progress = await prisma.lessonProgress.findMany({
      where: { userId },
    })

    const results = await prisma.questionResult.findMany({
      where: { userId },
    })

    const lessons = await prisma.lesson.findMany({
      select: { id: true, title: true },
    })
    const lessonTitleMap: Record<string, string> = {}
    for (const l of lessons) {
      lessonTitleMap[l.id] = l.title
    }

    // Group question results by lessonId
    const questionResultsByLesson: Record<string, Record<number, boolean>> = {}
    for (const r of results) {
      if (!questionResultsByLesson[r.lessonId]) {
        questionResultsByLesson[r.lessonId] = {}
      }
      questionResultsByLesson[r.lessonId][r.questionIndex] = r.isCorrect
    }

    res.json({
      progress: progress.map(p => ({
        lessonId: p.lessonId,
        status: p.status,
        lessonTitle: lessonTitleMap[p.lessonId] || null,
      })),
      questionResults: questionResultsByLesson,
      lessonTitles: lessonTitleMap,
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    res.status(500).json({ message: 'Không thể tải tiến độ học tập' })
  }
})

// POST /api/progress/start - Start a lesson (mark as in-progress)
router.post('/start', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId
    const { lessonId } = req.body

    if (!lessonId) {
      return res.status(400).json({ message: 'Thiếu lessonId' })
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId: String(lessonId) } },
      update: {},  // Don't overwrite if already exists (could be completed)
      create: {
        userId,
        lessonId: String(lessonId),
        status: 'in-progress',
      },
    })

    res.json({ data: progress })
  } catch (error) {
    console.error('Error starting lesson:', error)
    res.status(500).json({ message: 'Không thể bắt đầu bài học' })
  }
})

// POST /api/progress/complete - Complete a lesson
router.post('/complete', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId
    const { lessonId } = req.body

    if (!lessonId) {
      return res.status(400).json({ message: 'Thiếu lessonId' })
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId: String(lessonId) } },
      update: { status: 'completed' },
      create: {
        userId,
        lessonId: String(lessonId),
        status: 'completed',
      },
    })

    // Update user stats
    await prisma.user.update({
      where: { id: userId },
      data: { lessonsCompleted: { increment: 1 } },
    })

    res.json({ data: progress })
  } catch (error) {
    console.error('Error completing lesson:', error)
    res.status(500).json({ message: 'Không thể hoàn thành bài học' })
  }
})

// GET /api/progress/:lessonId/results - Get question results for a lesson
router.get('/:lessonId/results', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId
    const { lessonId } = req.params

    const results = await prisma.questionResult.findMany({
      where: { userId, lessonId },
      orderBy: { questionIndex: 'asc' },
    })

    const resultMap: Record<number, boolean> = {}
    for (const r of results) {
      resultMap[r.questionIndex] = r.isCorrect
    }

    res.json({ data: resultMap })
  } catch (error) {
    console.error('Error fetching question results:', error)
    res.status(500).json({ message: 'Không thể tải kết quả câu hỏi' })
  }
})

// POST /api/progress/:lessonId/answer - Save a question answer
router.post('/:lessonId/answer', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId
    const { lessonId } = req.params
    const { questionIndex, isCorrect } = req.body

    if (questionIndex === undefined || isCorrect === undefined) {
      return res.status(400).json({ message: 'Thiếu questionIndex hoặc isCorrect' })
    }

    const result = await prisma.questionResult.upsert({
      where: {
        userId_lessonId_questionIndex: {
          userId,
          lessonId,
          questionIndex: Number(questionIndex),
        },
      },
      update: { isCorrect: Boolean(isCorrect) },
      create: {
        userId,
        lessonId,
        questionIndex: Number(questionIndex),
        isCorrect: Boolean(isCorrect),
      },
    })

    res.json({ data: result })
  } catch (error) {
    console.error('Error saving answer:', error)
    res.status(500).json({ message: 'Không thể lưu kết quả câu trả lời' })
  }
})

export default router
