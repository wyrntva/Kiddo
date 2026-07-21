import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'

const router = Router()

// Apply authentication to all endpoints in this router
router.use(authenticate, requireAdmin)

// GET /api/users - Get all staff/admin users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        parentName: true,
        role: true,
        avatar: true,
        level: true,
        stars: true,
        badges: true,
        lessonsCompleted: true,
        weeklyProgress: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải danh sách nhân viên' })
  }
})

// GET /api/users/:id - Get a single staff/admin user
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        parentName: true,
        role: true,
        avatar: true,
        level: true,
        stars: true,
        badges: true,
        lessonsCompleted: true,
        weeklyProgress: true,
        isActive: true,
        createdAt: true,
      },
    })
    if (!user) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' })
      return
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy chi tiết người dùng' })
  }
})

// POST /api/users - Create a new admin account
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { full_name, phone, username, email, password, is_active } = req.body
  const activePhone = phone || username
  if (!full_name || !activePhone || !email || !password) {
    res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' })
    return
  }

  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: activePhone },
          { email }
        ]
      }
    })
    if (existing) {
      res.status(400).json({ message: 'Số điện thoại hoặc Gmail đã được sử dụng' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        name: full_name,
        phone: activePhone,
        email,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: is_active !== undefined ? is_active : true,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Tạo tài khoản quản trị thất bại' })
  }
})


// POST /api/users/promote-from-customer - Promote a user to ADMIN
router.post('/promote-from-customer', async (req: Request, res: Response): Promise<void> => {
  const { pool_arena_user_id } = req.body
  if (!pool_arena_user_id) {
    res.status(400).json({ message: 'Thiếu ID người dùng cần thăng chức' })
    return
  }

  try {
    const user = await prisma.user.update({
      where: { id: pool_arena_user_id },
      data: {
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
        avatar: true,
        level: true,
        stars: true,
        badges: true,
      },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Không thể thăng chức người dùng thành nhân viên' })
  }
})

// PATCH /api/users/:id - Update user details
router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  const { full_name, email, phone, username, password, role_id, is_active } = req.body
  const activePhone = phone !== undefined ? phone : username

  try {
    const updateData: any = {}
    if (full_name !== undefined) updateData.name = full_name
    if (email !== undefined) updateData.email = email
    if (activePhone !== undefined) updateData.phone = activePhone
    if (is_active !== undefined) updateData.isActive = is_active
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 12)
    }
    // Map role_id from frontend (1 = ADMIN, 2 = PARENT, 3 = CHILD)
    if (role_id !== undefined) {
      updateData.role = role_id === 1 ? 'ADMIN' : (role_id === 2 ? 'PARENT' : 'CHILD')
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        parentName: true,
        role: true,
        avatar: true,
        level: true,
        stars: true,
        badges: true,
        isActive: true,
      },
    })
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật thông tin nhân viên thất bại' })
  }
})

// DELETE /api/users/:id - Delete a user
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    // Delete user's refresh tokens first due to cascade reference
    await prisma.refreshToken.deleteMany({
      where: { userId: req.params.id },
    })

    await prisma.user.delete({
      where: { id: req.params.id },
    })
    res.json({ message: 'Xóa nhân viên thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Xóa nhân viên thất bại' })
  }
})

// PATCH /api/users/me/password - Change logged-in user password
router.patch('/me/password', async (req: AuthRequest, res: Response): Promise<void> => {
  const { old_password, password } = req.body
  if (!old_password || !password) {
    res.status(400).json({ message: 'Vui lòng điền mật khẩu cũ và mới' })
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    })

    if (!user) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản' })
      return
    }

    const isValid = await bcrypt.compare(old_password, user.password)
    if (!isValid) {
      res.status(400).json({ message: 'Mật khẩu cũ không đúng' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { password: hashedPassword },
    })

    res.json({ message: 'Đổi mật khẩu thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Đổi mật khẩu thất bại' })
  }
})

export default router
