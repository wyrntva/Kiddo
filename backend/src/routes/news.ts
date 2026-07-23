import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { createImageUpload } from '../lib/imageUpload'

const router = Router()

// Configure multer storage for news images
const upload = createImageUpload('news')

// POST /api/news/upload-image - Upload news image
router.post('/upload-image', authenticate, requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được tải lên' })
  }
  const filePath = `/uploads/news/${req.file.filename}`
  res.json({ url: filePath })
})

// GET /api/news/categories - Get reusable news categories
router.get('/categories', authenticate, requireAdmin, async (_req, res) => {
  try {
    const categories = await prisma.newsCategory.findMany({
      orderBy: { name: 'asc' },
    })
    res.json(categories)
  } catch {
    res.status(500).json({ message: 'Không thể tải danh sách danh mục' })
  }
})

// POST /api/news/categories - Create a reusable news category
router.post('/categories', authenticate, requireAdmin, async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : ''
  if (!name) return res.status(400).json({ message: 'Tên danh mục không được để trống' })

  try {
    const existing = await prisma.newsCategory.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    })
    if (existing) return res.status(409).json({ message: 'Danh mục đã tồn tại', category: existing })

    const category = await prisma.newsCategory.create({ data: { name } })
    res.status(201).json(category)
  } catch {
    res.status(500).json({ message: 'Tạo danh mục thất bại' })
  }
})

// GET /api/news - Get all news with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1
  const limit = parseInt(req.query.limit as string, 10) || 10
  const search = (req.query.search as string) || ''

  try {
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { author: { contains: search, mode: 'insensitive' as const } },
            { category: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.news.count({ where }),
    ])

    res.json({ items, total, page, limit })
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải danh sách tin tức' })
  }
})

// GET /api/news/:id - Get single news
router.get('/:id', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    })
    if (!news) return res.status(404).json({ message: 'Không tìm thấy bài viết' })
    res.json(news)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải bài viết' })
  }
})

// POST /api/news - Create news
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { title, category, date, author, image, excerpt, content, featured, fanpage_image } = req.body
  try {
    const news = await prisma.news.create({
      data: {
        title,
        category: category || 'Tin tức',
        date: date || new Date().toLocaleDateString('vi-VN'),
        author,
        image: image || '',
        excerpt: excerpt || '',
        content: content || [],
        featured: featured || false,
        fanpage_image: fanpage_image || null,
      },
    })
    res.status(201).json(news)
  } catch (error) {
    res.status(500).json({ message: 'Tạo bài viết thất bại' })
  }
})

// PUT /api/news/:id - Update news
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { title, category, date, author, image, excerpt, content, featured, fanpage_image } = req.body
  try {
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (category !== undefined) updateData.category = category
    if (date !== undefined) updateData.date = date
    if (author !== undefined) updateData.author = author
    if (image !== undefined) updateData.image = image
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content !== undefined) updateData.content = content
    if (featured !== undefined) updateData.featured = featured
    if (fanpage_image !== undefined) updateData.fanpage_image = fanpage_image

    const news = await prisma.news.update({
      where: { id: parseInt(req.params.id, 10) },
      data: updateData,
    })
    res.json(news)
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật bài viết thất bại' })
  }
})

// DELETE /api/news/:id - Delete news
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.news.delete({
      where: { id: parseInt(req.params.id, 10) },
    })
    res.json({ message: 'Xóa bài viết thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Xóa bài viết thất bại' })
  }
})

export default router
