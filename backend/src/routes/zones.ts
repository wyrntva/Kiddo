import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { createImageUpload } from '../lib/imageUpload'

const router = Router()

// Configure multer storage for zones
const upload = createImageUpload()

// All routes require authentication
router.use(authenticate)

// GET /api/zones - Get all zones with lessons
router.get('/', async (req, res) => {
  try {
    const zones = await prisma.zone.findMany({
      include: {
        lessons: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { key: 'asc' },
    })
    res.json({ data: zones })
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải danh sách vùng đất' })
  }
})

// Modifying routes require admin
router.use(requireAdmin)

// POST /api/zones/upload - Upload island image
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được tải lên' })
  }
  const filePath = `/uploads/${req.file.filename}`
  res.json({ url: filePath })
})

// POST /api/zones - Create a zone
router.post('/', async (req, res) => {
  const { name, desc, color, img, key } = req.body
  try {
    const zone = await prisma.zone.create({
      data: { name, desc, color, img, key },
    })
    res.status(201).json(zone)
  } catch (error) {
    res.status(500).json({ message: 'Tạo vùng đất mới thất bại' })
  }
})

// PATCH /api/zones/:id - Update a zone
router.patch('/:id', async (req, res) => {
  const { name, desc, color, img, key } = req.body
  try {
    const zone = await prisma.zone.update({
      where: { id: req.params.id },
      data: { name, desc, color, img, key },
    })
    res.json(zone)
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật vùng đất thất bại' })
  }
})

// DELETE /api/zones/:id - Delete a zone
router.delete('/:id', async (req, res) => {
  try {
    await prisma.zone.delete({
      where: { id: req.params.id },
    })
    res.json({ message: 'Xóa vùng đất thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Xóa vùng đất thất bại' })
  }
})

export default router
