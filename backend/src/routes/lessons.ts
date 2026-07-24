import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { createImageUpload } from '../lib/imageUpload'
import { createAudioUpload } from '../lib/audioUpload'
import { createVideoUpload } from '../lib/videoUpload'

const router = Router()

// Configure multer storage for lessons
const upload = createImageUpload()
const audioUpload = createAudioUpload()
const videoUpload = createVideoUpload()

// GET /api/lessons/:id/quiz - Get quiz questions (public for student client)
router.get('/:id/quiz', async (req, res) => {
  try {
    const questions = await prisma.quizQuestion.findMany({
      where: { lessonId: req.params.id },
      orderBy: { createdAt: 'asc' },
    })
    res.json({ data: questions })
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải câu hỏi của bài học' })
  }
})

// GET /api/lessons/:id - Get a lesson by ID (public for student client)
router.get('/:id', async (req, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { zone: true }
    })
    if (!lesson) {
      return res.status(404).json({ message: 'Không tìm thấy bài học' })
    }
    res.json(lesson)
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải chi tiết bài học' })
  }
})

// All other routes require authentication and admin
router.use(authenticate, requireAdmin)

// POST /api/lessons/upload - Upload lesson image
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được tải lên' })
  }
  const filePath = `/uploads/${req.file.filename}`
  res.json({ url: filePath })
})

router.post('/upload-audio', audioUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file âm thanh nào được tải lên' })
  }
  res.json({ url: `/uploads/voices/${req.file.filename}` })
})

router.post('/upload-video', videoUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file video nào được tải lên' })
  }
  res.json({ url: `/uploads/videos/${req.file.filename}` })
})

// GET /api/lessons - Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        zone: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ data: lessons })
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải danh sách bài học' })
  }
})

// POST /api/lessons - Create a lesson
router.post('/', async (req, res) => {
  const { title, description, emoji, img, level, duration, stars, stepsCount, zoneId,
          welcomeText, preVideoText, postVideoText, welcomeAudio, preVideoAudio, postVideoAudio, videoUrl,
          postQuestionText, postQuestionAudio } = req.body
  try {
    const lesson = await prisma.lesson.create({
      data: {
        title,
        description: description || '',
        emoji,
        img: img || '',
        level,
        duration,
        stars: parseInt(stars, 10) || 10,
        stepsCount: parseInt(stepsCount, 10) || 5,
        zoneId,
        welcomeText: welcomeText || '',
        preVideoText: preVideoText || '',
        postVideoText: postVideoText || '',
        welcomeAudio: welcomeAudio || '',
        preVideoAudio: preVideoAudio || '',
        postVideoAudio: postVideoAudio || '',
        videoUrl: videoUrl || '',
        postQuestionText: postQuestionText || '',
        postQuestionAudio: postQuestionAudio || '',
      },
      include: {
        zone: true,
      }
    })
    res.status(201).json(lesson)
  } catch (error) {
    res.status(500).json({ message: 'Tạo bài học mới thất bại' })
  }
})

// PATCH /api/lessons/:id - Update a lesson
router.patch('/:id', async (req, res) => {
  const { title, description, emoji, img, level, duration, stars, stepsCount, zoneId,
          welcomeText, preVideoText, postVideoText, welcomeAudio, preVideoAudio, postVideoAudio, videoUrl,
          postQuestionText, postQuestionAudio } = req.body
  try {
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (emoji !== undefined) updateData.emoji = emoji
    if (img !== undefined) updateData.img = img
    if (level !== undefined) updateData.level = level
    if (duration !== undefined) updateData.duration = duration
    if (stars !== undefined) updateData.stars = parseInt(stars, 10) || 0
    if (stepsCount !== undefined) updateData.stepsCount = parseInt(stepsCount, 10) || 0
    if (zoneId !== undefined) updateData.zoneId = zoneId
    if (welcomeText !== undefined) updateData.welcomeText = welcomeText
    if (preVideoText !== undefined) updateData.preVideoText = preVideoText
    if (postVideoText !== undefined) updateData.postVideoText = postVideoText
    if (welcomeAudio !== undefined) updateData.welcomeAudio = welcomeAudio
    if (preVideoAudio !== undefined) updateData.preVideoAudio = preVideoAudio
    if (postVideoAudio !== undefined) updateData.postVideoAudio = postVideoAudio
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl
    if (postQuestionText !== undefined) updateData.postQuestionText = postQuestionText
    if (postQuestionAudio !== undefined) updateData.postQuestionAudio = postQuestionAudio

    const lesson = await prisma.lesson.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        zone: true,
      }
    })
    res.json(lesson)
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật bài học thất bại' })
  }
})

// DELETE /api/lessons/:id - Delete a lesson
router.delete('/:id', async (req, res) => {
  try {
    await prisma.lesson.delete({
      where: { id: req.params.id },
    })
    res.json({ message: 'Xóa bài học thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Xóa bài học thất bại' })
  }
})

// GET /api/lessons/:id/questions - Admin list questions
router.get('/:id/questions', async (req, res) => {
  try {
    const questions = await prisma.quizQuestion.findMany({
      where: { lessonId: req.params.id },
      orderBy: { createdAt: 'asc' },
    })
    res.json({ data: questions })
  } catch (error) {
    console.error('Error getting questions:', error)
    res.status(500).json({ message: 'Không thể tải danh sách câu hỏi' })
  }
})

// POST /api/lessons/:id/questions - Admin create question
router.post('/:id/questions', async (req, res) => {
  const { prompt, voiceUrl, correctOptionId, options } = req.body
  try {
    const question = await prisma.quizQuestion.create({
      data: {
        prompt,
        voiceUrl: voiceUrl || '',
        correctOptionId: parseInt(correctOptionId, 10) || 1,
        options: options || [],
        lessonId: req.params.id,
      },
    })
    res.status(201).json(question)
  } catch (error) {
    console.error('Error creating question:', error)
    res.status(500).json({ message: 'Tạo câu hỏi mới thất bại' })
  }
})

// PATCH /api/lessons/:id/questions/:questionId - Admin update question
router.patch('/:id/questions/:questionId', async (req, res) => {
  const { prompt, voiceUrl, correctOptionId, options } = req.body
  try {
    const updateData: any = {}
    if (prompt !== undefined) updateData.prompt = prompt
    if (voiceUrl !== undefined) updateData.voiceUrl = voiceUrl
    if (correctOptionId !== undefined) updateData.correctOptionId = parseInt(correctOptionId, 10) || 1
    if (options !== undefined) updateData.options = options

    const question = await prisma.quizQuestion.update({
      where: { id: req.params.questionId },
      data: updateData,
    })
    res.json(question)
  } catch (error) {
    console.error('Error updating question:', error)
    res.status(500).json({ message: 'Cập nhật câu hỏi thất bại' })
  }
})

// DELETE /api/lessons/:id/questions/:questionId - Admin delete question
router.delete('/:id/questions/:questionId', async (req, res) => {
  try {
    await prisma.quizQuestion.delete({
      where: { id: req.params.questionId },
    })
    res.json({ message: 'Xóa câu hỏi thành công' })
  } catch (error) {
    console.error('Error deleting question:', error)
    res.status(500).json({ message: 'Xóa câu hỏi thất bại' })
  }
})

export default router
