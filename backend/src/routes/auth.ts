import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt'
import { authenticate, AuthRequest } from '../middleware/authMiddleware'

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2, 'Tên bé phải có ít nhất 2 ký tự').max(100),
  parentName: z.string().min(2, 'Tên phụ huynh phải có ít nhất 2 ký tự').max(100).optional(),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ').optional(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  role: z.enum(['CHILD', 'PARENT']).default('CHILD'),
})

const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email hoặc số điện thoại'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
})

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const result = registerSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({
      message: result.error.errors[0].message,
      errors: result.error.flatten().fieldErrors,
    })
    return
  }

  const { name, parentName, email, password, phone, role } = result.data

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
  })
  if (existing) {
    res.status(409).json({ message: 'Email hoặc số điện thoại đã được sử dụng' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, parentName, email, password: hashedPassword, phone, role },
    select: {
      id: true, name: true, parentName: true, email: true,
      phone: true, role: true, avatar: true,
      level: true, stars: true, badges: true,
    },
  })

  const payload = { userId: user.id, email: user.email, role: user.role }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  res.status(201).json({
    message: 'Đăng ký thành công! Chào mừng đến với OTTOPIA!',
    user,
    accessToken,
    refreshToken,
  })
})

// POST /api/auth/login  (hỗ trợ email hoặc số điện thoại)
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({
      message: result.error.errors[0].message,
      errors: result.error.flatten().fieldErrors,
    })
    return
  }

  const { email: identifier, password } = result.data

  // Tìm user bằng email hoặc số điện thoại
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { phone: identifier },
      ],
    },
  })

  if (!user) {
    res.status(401).json({ message: 'Email/SĐT hoặc mật khẩu không đúng' })
    return
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    res.status(401).json({ message: 'Email/SĐT hoặc mật khẩu không đúng' })
    return
  }

  const payload = { userId: user.id, email: user.email, role: user.role }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  res.json({
    message: 'Đăng nhập thành công!',
    user: {
      id: user.id,
      name: user.name,
      parentName: user.parentName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      level: user.level,
      stars: user.stars,
      badges: user.badges,
      lessonsCompleted: user.lessonsCompleted,
      weeklyProgress: user.weeklyProgress,
    },
    accessToken,
    refreshToken,
  })
})

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    res.status(400).json({ message: 'Thiếu refresh token' })
    return
  }

  try {
    const payload = verifyRefreshToken(refreshToken)
    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } })
    if (!stored || stored.expiresAt < new Date()) {
      res.status(401).json({ message: 'Refresh token không hợp lệ hoặc đã hết hạn' })
      return
    }

    await prisma.refreshToken.delete({ where: { token: refreshToken } })

    const newPayload = { userId: payload.userId, email: payload.email, role: payload.role }
    const newAccessToken = signAccessToken(newPayload)
    const newRefreshToken = signRefreshToken(newPayload)

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
  } catch {
    res.status(401).json({ message: 'Refresh token không hợp lệ' })
  }
})

// POST /api/auth/logout
router.post('/logout', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { refreshToken } = req.body
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } })
  }
  res.json({ message: 'Đăng xuất thành công' })
})

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: {
      id: true, name: true, parentName: true, email: true, phone: true,
      role: true, avatar: true, level: true, stars: true,
      badges: true, lessonsCompleted: true, weeklyProgress: true,
      createdAt: true,
    },
  })
  if (!user) {
    res.status(404).json({ message: 'Người dùng không tồn tại' })
    return
  }
  res.json({ user })
})

export default router
