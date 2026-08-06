import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'

const router = Router()

// GET /api/subscription-plans - Get all plans
router.get('/', async (req, res) => {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      orderBy: { price: 'asc' }
    })
    res.json(plans)
  } catch (error) {
    console.error('Failed to load subscription plans:', error)
    res.status(500).json({ message: 'Không thể tải danh sách gói học phí' })
  }
})

// PUT /api/subscription-plans/:id - Update plan details (price, name, features)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { name, price, features, durationMonths } = req.body

  const updateData: any = {}

  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'Giá trị tiền không hợp lệ' })
    }
    updateData.price = price
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Tên gói không hợp lệ' })
    }
    updateData.name = name
  }

  if (features !== undefined) {
    if (!Array.isArray(features) || !features.every(f => typeof f === 'string')) {
      return res.status(400).json({ message: 'Danh sách quyền lợi không hợp lệ' })
    }
    updateData.features = features
  }

  if (durationMonths !== undefined) {
    if (typeof durationMonths !== 'number' || durationMonths < 1) {
      return res.status(400).json({ message: 'Thời hạn gói học không hợp lệ' })
    }
    updateData.durationMonths = durationMonths
  }

  try {
    const updated = await prisma.subscriptionPlan.update({
      where: { id: req.params.id },
      data: updateData
    })
    res.json(updated)
  } catch (error) {
    console.error('Failed to update subscription plan:', error)
    res.status(500).json({ message: 'Không thể cập nhật gói học phí' })
  }
})

export default router
