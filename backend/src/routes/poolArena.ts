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

// GET /api/pool-arena/users/conversations - Get all user chat conversations for CMS Admin
router.get('/users/conversations', async (req: Request, res: Response): Promise<void> => {
  try {
    const search = (req.query.search as string)?.trim();
    const whereClause: any = search
      ? {
          role: { in: ['CHILD', 'PARENT'] },
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { parentName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { phone: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {
          chatMessages: {
            some: {},
          },
        };

    const usersWithMessages = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isPaid: true,
        isPendingPaid: true,
        chatMessages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { chatMessages: true },
        },
      },
    })

    const conversations = usersWithMessages
      .map((u) => ({
        id: u.id,
        name: u.name,
        parentName: u.parentName,
        email: u.email,
        phone: u.phone,
        avatar: u.avatar,
        role: u.role,
        isPaid: u.isPaid,
        isPendingPaid: u.isPendingPaid,
        totalMessages: u._count.chatMessages,
        lastMessage: u.chatMessages[0] || null,
      }))
      .sort((a, b) => {
        const timeA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0
        const timeB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0
        return timeB - timeA
      })

    res.json({ conversations })
  } catch (error) {
    console.error('Error fetching chat conversations:', error)
    res.status(500).json({ message: 'Lỗi khi tải danh sách trò chuyện' })
  }
})

// GET /api/pool-arena/users/conversations/:userId - Get conversation detail for a user
router.get('/users/conversations/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isPaid: true,
        childAge: true,
        gender: true,
      },
    })

    if (!targetUser) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' })
      return
    }

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    res.json({ user: targetUser, messages })
  } catch (error) {
    console.error('Error fetching conversation detail:', error)
    res.status(500).json({ message: 'Lỗi khi tải nội dung trò chuyện' })
  }
})

// POST /api/pool-arena/users/conversations/:userId/reply - Admin reply to user conversation
router.post('/users/conversations/:userId/reply', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const { text } = req.body

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ message: 'Nội dung tin nhắn không được để trống' })
      return
    }

    const message = await prisma.chatMessage.create({
      data: {
        userId,
        sender: 'ADMIN',
        text: text.trim(),
      },
    })

    res.json({ message })
  } catch (error) {
    console.error('Error replying to user conversation:', error)
    res.status(500).json({ message: 'Gửi tin nhắn phản hồi thất bại' })
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

// GET /api/pool-arena/transactions
router.get('/transactions', async (req: Request, res: Response) => {
  try {
    // 1. Backfill step: Find users with isPendingPaid === true who don't have any pending transactions
    const pendingUsers = await prisma.user.findMany({
      where: {
        isPendingPaid: true,
        transactions: {
          none: {
            status: 'pending'
          }
        }
      }
    })

    for (const user of pendingUsers) {
      const plan = user.pendingPlanId ? await prisma.subscriptionPlan.findUnique({
        where: { id: user.pendingPlanId }
      }) : null

      await prisma.transaction.create({
        data: {
          userId: user.id,
          planId: user.pendingPlanId || null,
          planName: plan?.name || 'Gói nâng cấp',
          price: plan?.price || 0,
          status: 'pending'
        }
      })
    }

    // 2. Backfill step 2: Find users with isPaid === true who don't have any transactions
    const paidUsers = await prisma.user.findMany({
      where: {
        isPaid: true,
        transactions: {
          none: {}
        }
      }
    })

    for (const user of paidUsers) {
      const planId = user.subscriptionPlanId || user.pendingPlanId
      const plan = planId ? await prisma.subscriptionPlan.findUnique({
        where: { id: planId }
      }) : null

      await prisma.transaction.create({
        data: {
          userId: user.id,
          planId: planId || null,
          planName: plan?.name || 'Gói nâng cấp',
          price: plan?.price || 0,
          status: 'approved',
          createdAt: user.updatedAt
        }
      })
    }

    // 3. Fetch all transactions with user information

    const transactions = await prisma.transaction.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 3. Map to format expected by frontend
    const mappedTransactions = transactions.map(tx => ({
      id: tx.id,
      plan_id: tx.planId,
      plan_name: tx.planName,
      price: tx.price,
      status: tx.status,
      created_at: tx.createdAt.toISOString(),
      updated_at: tx.updatedAt.toISOString(),
      user: {
        id: tx.user.id,
        full_name: tx.user.name,
        phone_number: tx.user.phone || '',
        email: tx.user.email,
        avatar_url: tx.user.avatar,
        role: tx.user.role,
        parent_name: tx.user.parentName || '',
        is_paid: tx.user.isPaid,
        is_pending_paid: tx.user.isPendingPaid,
        paid_until: tx.user.paidUntil ? tx.user.paidUntil.toISOString() : null,
      }
    }))

    res.json(mappedTransactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({ message: 'Không thể tải danh sách giao dịch' })
  }
})

// POST /api/pool-arena/transactions/:id/approve
router.post('/transactions/:id/approve', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id }
    })

    if (!transaction) {
      res.status(404).json({ message: 'Không tìm thấy giao dịch' })
      return
    }

    if (transaction.status !== 'pending') {
      res.status(400).json({ message: 'Giao dịch đã được xử lý hoặc không hợp lệ' })
      return
    }

    // Update transaction status
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: { status: 'approved' }
    })

    // Calculate expiration date based on plan
    let paidUntil: Date | null = null
    const planId = transaction.planId
    if (planId) {
      const plan = await prisma.subscriptionPlan.findUnique({
        where: { id: planId }
      })
      if (plan) {
        const now = new Date()
        const expiry = new Date()
        expiry.setMonth(now.getMonth() + plan.durationMonths)
        paidUntil = expiry
      }
    }

    if (!paidUntil) {
      const now = new Date()
      const expiry = new Date()
      expiry.setMonth(now.getMonth() + 1) // default 1 month
      paidUntil = expiry
    }

    // Update user
    await prisma.user.update({
      where: { id: transaction.userId },
      data: {
        isPaid: true,
        isPendingPaid: false,
        paidUntil,
        subscriptionPlanId: planId,
        pendingPlanId: null
      }
    })

    res.json({ message: 'Duyệt kích hoạt tài khoản thành công', transaction: updatedTransaction })
  } catch (error) {
    console.error('Error approving transaction:', error)
    res.status(500).json({ message: 'Duyệt kích hoạt tài khoản thất bại' })
  }
})

// POST /api/pool-arena/transactions/:id/reject
router.post('/transactions/:id/reject', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id }
    })

    if (!transaction) {
      res.status(404).json({ message: 'Không tìm thấy giao dịch' })
      return
    }

    if (transaction.status !== 'pending') {
      res.status(400).json({ message: 'Giao dịch đã được xử lý hoặc không hợp lệ' })
      return
    }

    // Update transaction status
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: { status: 'rejected' }
    })

    // Update user: remove pending paid request
    await prisma.user.update({
      where: { id: transaction.userId },
      data: {
        isPendingPaid: false,
        pendingPlanId: null
      }
    })

    res.json({ message: 'Đã từ chối yêu cầu kích hoạt tài khoản', transaction: updatedTransaction })
  } catch (error) {
    console.error('Error rejecting transaction:', error)
    res.status(500).json({ message: 'Từ chối yêu cầu kích hoạt thất bại' })
  }
})

// GET /api/pool-arena/chat/conversations
router.get('/chat/conversations', async (_req: Request, res: Response): Promise<void> => {
  try {
    const usersWithMessages = await prisma.user.findMany({
      where: {
        chatMessages: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isPaid: true,
        isPendingPaid: true,
        chatMessages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { chatMessages: true },
        },
      },
    })

    const conversations = usersWithMessages
      .map((u) => ({
        id: u.id,
        name: u.name,
        parentName: u.parentName,
        email: u.email,
        phone: u.phone,
        avatar: u.avatar,
        role: u.role,
        isPaid: u.isPaid,
        isPendingPaid: u.isPendingPaid,
        totalMessages: u._count.chatMessages,
        lastMessage: u.chatMessages[0] || null,
      }))
      .sort((a, b) => {
        const timeA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0
        const timeB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0
        return timeB - timeA
      })

    res.json({ conversations })
  } catch (error) {
    console.error('Error fetching chat conversations:', error)
    res.status(500).json({ message: 'Lỗi khi tải danh sách trò chuyện' })
  }
})

// GET /api/pool-arena/chat/conversations/:userId
router.get('/chat/conversations/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isPaid: true,
        childAge: true,
        gender: true,
      },
    })

    if (!targetUser) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' })
      return
    }

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    res.json({ user: targetUser, messages })
  } catch (error) {
    console.error('Error fetching conversation details:', error)
    res.status(500).json({ message: 'Lỗi khi tải nội dung trò chuyện' })
  }
})

// POST /api/pool-arena/chat/conversations/:userId/reply
router.post('/chat/conversations/:userId/reply', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const { text } = req.body

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ message: 'Nội dung tin nhắn không được để trống' })
      return
    }

    const message = await prisma.chatMessage.create({
      data: {
        userId,
        sender: 'ADMIN',
        text: text.trim(),
      },
    })

    res.json({ message })
  } catch (error) {
    console.error('Error replying to conversation:', error)
    res.status(500).json({ message: 'Gửi tin nhắn phản hồi thất bại' })
  }
})

export default router

