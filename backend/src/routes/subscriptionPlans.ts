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

// PUT /api/subscription-plans/:id - Update plan price
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { price } = req.body

  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: 'Giá trị tiền không hợp lệ' })
  }

  try {
    const updated = await prisma.subscriptionPlan.update({
      where: { id: req.params.id },
      data: { price }
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Không thể cập nhật giá gói học phí' })
  }
})

export default router
