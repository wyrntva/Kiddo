import { Router, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { createImageUpload } from '../lib/imageUpload'

const router = Router()

// Configure multer storage
const upload = createImageUpload()

router.use(authenticate, requireAdmin)

// GET /api/pool-arena/users
router.get('/users', async (req: Request, res: Response) => {
  const { search, limit = '20', skip = '0', is_pending_paid } = req.query
  const limitNum = parseInt(limit as string, 10)
  const skipNum = parseInt(skip as string, 10)

  try {
    const searchFilter = search
      ? {
          OR: [
            { name: { contains: search as string, mode: 'insensitive' as const } },
            { email: { contains: search as string, mode: 'insensitive' as const } },
            { phone: { contains: search as string, mode: 'insensitive' as const } },
          ],
        }
      : {}

    // Find users with CHILD or PARENT role
    const whereClause: any = {
      role: { in: ['CHILD' as const, 'PARENT' as const] },
      ...searchFilter,
    }

    if (is_pending_paid !== undefined) {
      whereClause.isPendingPaid = is_pending_paid === 'true'
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        take: limitNum,
        skip: skipNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: whereClause }),
    ])

    const mappedUsers = users.map((user) => ({
      id: user.id,
      full_name: user.name,
      phone_number: user.phone || '',
      email: user.email,
      avatar_url: user.avatar,
      role: user.role,
      is_active: true,
      points: user.stars,
      rank: user.level.toString(),
      gender: user.gender ? user.gender.toLowerCase() : null,
      address: null,
      parent_name: user.parentName || '',
      is_paid: user.isPaid,
      is_pending_paid: user.isPendingPaid,
      paid_until: user.paidUntil ? user.paidUntil.toISOString() : null,
      subscription_plan_id: user.subscriptionPlanId,
      pending_plan_id: user.pendingPlanId,
      tiktok_url: null,
      facebook_url: null,
      instagram_url: null,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    }))

    res.json({
      data: mappedUsers,
      total,
      meta: { total, skip: skipNum, limit: limitNum },
    })
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải danh sách học sinh' })
  }
})

router.patch('/users/:id', async (req: Request, res: Response): Promise<void> => {
  const { full_name, phone_number, email, points, rank, avatar_url, parent_name, is_paid, is_pending_paid, paid_until, subscription_plan_id, gender } = req.body

  try {
    const updateData: any = {}
    if (full_name !== undefined) updateData.name = full_name
    if (phone_number !== undefined) updateData.phone = phone_number
    if (email !== undefined) updateData.email = email
    if (avatar_url !== undefined) updateData.avatar = avatar_url
    if (points !== undefined) updateData.stars = parseInt(points, 10) || 0
    if (rank !== undefined) updateData.level = parseInt(rank, 10) || 1
    if (parent_name !== undefined) updateData.parentName = parent_name
    
    if (is_paid !== undefined) {
      updateData.isPaid = is_paid
      if (is_paid) {
        updateData.isPendingPaid = false
        
        // Calculate expiration date based on pending plan or selected plan duration
        const currentUser = await prisma.user.findUnique({
          where: { id: req.params.id }
        })
        const planId = subscription_plan_id || currentUser?.pendingPlanId
        if (planId) {
          const plan = await prisma.subscriptionPlan.findUnique({
            where: { id: planId }
          })
          if (plan) {
            const now = new Date()
            const expiry = new Date()
            expiry.setMonth(now.getMonth() + plan.durationMonths)
            updateData.paidUntil = expiry
            updateData.subscriptionPlanId = planId
          }
        } else {
          // Fallback: 1 month duration if no planId specified
          const now = new Date()
          const expiry = new Date()
          expiry.setMonth(now.getMonth() + 1)
          updateData.paidUntil = expiry
        }
        updateData.pendingPlanId = null
      } else {
        // Demoting to free: reset all subscription properties
        updateData.paidUntil = null
        updateData.subscriptionPlanId = null
        updateData.pendingPlanId = null
      }
    }

    if (is_pending_paid !== undefined) {
      updateData.isPendingPaid = is_pending_paid
    }

    if (gender !== undefined) {
      if (gender === null || gender === '') {
        updateData.gender = null
      } else {
        const upperGender = gender.toUpperCase()
        if (['MALE', 'FEMALE', 'OTHER'].includes(upperGender)) {
          updateData.gender = upperGender
        }
      }
    }

    if (paid_until !== undefined) {
      updateData.paidUntil = paid_until ? new Date(paid_until) : null
    }

    if (subscription_plan_id !== undefined) {
      updateData.subscriptionPlanId = subscription_plan_id
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
    })

    res.json({
      id: updatedUser.id,
      full_name: updatedUser.name,
      phone_number: updatedUser.phone || '',
      email: updatedUser.email,
      avatar_url: updatedUser.avatar,
      role: updatedUser.role,
      is_active: true,
      points: updatedUser.stars,
      rank: updatedUser.level.toString(),
      gender: updatedUser.gender ? updatedUser.gender.toLowerCase() : null,
      address: null,
      parent_name: updatedUser.parentName || '',
      is_paid: updatedUser.isPaid,
      is_pending_paid: updatedUser.isPendingPaid,
      paid_until: updatedUser.paidUntil ? updatedUser.paidUntil.toISOString() : null,
      subscription_plan_id: updatedUser.subscriptionPlanId,
      pending_plan_id: updatedUser.pendingPlanId,
    })
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật thông tin thất bại' })
  }
})

// DELETE /api/pool-arena/users/:id
router.delete('/users/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.refreshToken.deleteMany({ where: { userId: req.params.id } })
    await prisma.user.delete({ where: { id: req.params.id } })
    res.json({ message: 'Xóa người dùng thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Xóa người dùng thất bại' })
  }
})

// POST /api/pool-arena/users/:id/avatar
router.post('/users/:id/avatar', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'Không có file nào được tải lên' })
    return
  }

  try {
    const avatarUrl = `/uploads/${req.file.filename}`
    await prisma.user.update({
      where: { id: req.params.id },
      data: { avatar: avatarUrl },
    })

    res.json({ avatar_url: avatarUrl })
  } catch (error) {
    res.status(500).json({ message: 'Không thể cập nhật ảnh đại diện' })
  }
})

// DELETE /api/pool-arena/users/:id/avatar
router.delete('/users/:id/avatar', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } })
    if (user?.avatar?.startsWith('/uploads/')) {
      const uploadsRoot = path.resolve(process.cwd(), 'uploads')
      const filePath = path.resolve(process.cwd(), user.avatar.slice(1))
      if (filePath.startsWith(`${uploadsRoot}${path.sep}`) && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    await prisma.user.update({
      where: { id: req.params.id },
      data: { avatar: null },
    })

    res.json({ message: 'Xóa ảnh đại diện thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Không thể xóa ảnh đại diện' })
  }
})

export default router
