import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt'
import { authenticate, AuthRequest } from '../middleware/authMiddleware'

const router = Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const REFRESH_COOKIE = 'kiddo_refresh'
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000

function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth',
    maxAge: REFRESH_TTL_MS,
  })
}

function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth',
  })
}

const registerSchema = z.object({
  name: z.string().min(2, 'Tên bé phải có ít nhất 2 ký tự').max(100),
  parentName: z.string().min(2, 'Tên phụ huynh phải có ít nhất 2 ký tự').max(100).optional(),
  email: z.string()
    .trim()
    .toLowerCase()
    .email('Email không hợp lệ'),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ').optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    required_error: 'Vui lòng chọn giới tính',
  }),
  childAge: z.coerce.number().int().min(3).max(5),
  password: z.string().min(10, 'Mật khẩu phải có ít nhất 10 ký tự').max(128),
  role: z.enum(['CHILD', 'PARENT']).default('CHILD'),
})

const loginSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu').max(128),
})

const googleLoginSchema = z.object({
  credential: z.string().min(1, 'Thiếu Google ID token'),
})

const googleCompleteSchema = googleLoginSchema.extend({
  parentName: z.string().trim().min(2, 'Tên phụ huynh phải có ít nhất 2 ký tự').max(100),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ'),
  name: z.string().trim().min(2, 'Tên bé phải có ít nhất 2 ký tự').max(100),
  childAge: z.coerce.number().int().min(3).max(5),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
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

  const { name, parentName, email, password, phone, gender, childAge, role } = result.data

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
  })
  if (existing) {
    res.status(409).json({ message: 'Email hoặc số điện thoại đã được sử dụng' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, parentName, email, password: hashedPassword, phone, gender, childAge, role },
    select: {
      id: true, name: true, parentName: true, email: true,
      phone: true, gender: true, childAge: true, role: true, avatar: true,
      level: true, stars: true, badges: true,
      lessonsCompleted: true, weeklyProgress: true,
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
  setRefreshCookie(res, refreshToken)

  res.status(201).json({
    message: 'Đăng ký thành công! Chào mừng đến với OTTOPIA!',
    user,
    accessToken,
  })
})

// POST /api/auth/login (email and password only)
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({
      message: result.error.errors[0].message,
      errors: result.error.flatten().fieldErrors,
    })
    return
  }

  const { email, password } = result.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' })
    return
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' })
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
  setRefreshCookie(res, refreshToken)

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
  })
})

// POST /api/auth/google
router.post('/google', async (req: Request, res: Response): Promise<void> => {
  const result = googleLoginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: result.error.errors[0].message })
    return
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  if (!clientId) {
    res.status(503).json({ message: 'Đăng nhập Google chưa được cấu hình' })
    return
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: result.data.credential,
      audience: clientId,
    })
    const profile = ticket.getPayload()

    if (!profile?.email || !profile.email_verified) {
      res.status(401).json({ message: 'Tài khoản Google chưa xác minh email' })
      return
    }

    const email = profile.email.trim().toLowerCase()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.parentName || !user.phone || !user.gender || !user.childAge) {
      res.json({
        requiresProfile: true,
        googleProfile: {
          email,
          name: profile.name,
          picture: profile.picture,
        },
      })
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
    setRefreshCookie(res, refreshToken)

    res.json({
      message: 'Đăng nhập Google thành công!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        avatar: user.avatar,
        level: user.level,
        stars: user.stars,
        badges: user.badges,
        lessonsCompleted: user.lessonsCompleted,
        weeklyProgress: user.weeklyProgress,
      },
      accessToken,
    })
  } catch {
    res.status(401).json({ message: 'Google ID token không hợp lệ hoặc đã hết hạn' })
  }
})

// POST /api/auth/google/complete
router.post('/google/complete', async (req: Request, res: Response): Promise<void> => {
  const result = googleCompleteSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: result.error.errors[0].message })
    return
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  if (!clientId) {
    res.status(503).json({ message: 'Đăng nhập Google chưa được cấu hình' })
    return
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: result.data.credential,
      audience: clientId,
    })
    const profile = ticket.getPayload()
    if (!profile?.email || !profile.email_verified) {
      res.status(401).json({ message: 'Tài khoản Google chưa xác minh email' })
      return
    }

    const email = profile.email.trim().toLowerCase()
    const existingUser = await prisma.user.findUnique({ where: { email } })

    const existingPhone = await prisma.user.findUnique({ where: { phone: result.data.phone } })
    if (existingPhone && existingPhone.id !== existingUser?.id) {
      res.status(409).json({ message: 'Số điện thoại đã được sử dụng' })
      return
    }

    const profileData = {
        email,
        parentName: result.data.parentName,
        phone: result.data.phone,
        name: result.data.name,
        childAge: result.data.childAge,
        gender: result.data.gender,
        avatar: profile.picture,
        password: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12),
        role: 'CHILD',
      } as const

    const user = existingUser
      ? await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            parentName: profileData.parentName,
            phone: profileData.phone,
            name: profileData.name,
            childAge: profileData.childAge,
            gender: profileData.gender,
            avatar: profileData.avatar,
          },
        })
      : await prisma.user.create({ data: profileData })

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
    setRefreshCookie(res, refreshToken)

    res.status(201).json({
      message: 'Hoàn tất đăng ký Google thành công!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        childAge: user.childAge,
        role: user.role,
        avatar: user.avatar,
        level: user.level,
        stars: user.stars,
        badges: user.badges,
        lessonsCompleted: user.lessonsCompleted,
        weeklyProgress: user.weeklyProgress,
      },
      accessToken,
    })
  } catch {
    res.status(401).json({ message: 'Google ID token không hợp lệ hoặc đã hết hạn' })
  }
})

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE]
  if (!refreshToken) {
    res.status(400).json({ message: 'Thiếu refresh token' })
    return
  }

  try {
    const payload = verifyRefreshToken(refreshToken)
    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: { select: { email: true, role: true, isActive: true } } },
    })
    if (!stored || stored.userId !== payload.userId || !stored.user.isActive || stored.expiresAt < new Date()) {
      clearRefreshCookie(res)
      res.status(401).json({ message: 'Refresh token không hợp lệ hoặc đã hết hạn' })
      return
    }

    await prisma.refreshToken.delete({ where: { token: refreshToken } })

    const newPayload = { userId: stored.userId, email: stored.user.email, role: stored.user.role }
    const newAccessToken = signAccessToken(newPayload)
    const newRefreshToken = signRefreshToken(newPayload)

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })
    setRefreshCookie(res, newRefreshToken)

    res.json({ accessToken: newAccessToken })
  } catch {
    clearRefreshCookie(res)
    res.status(401).json({ message: 'Refresh token không hợp lệ' })
  }
})

// POST /api/auth/logout
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE]
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } })
  }
  clearRefreshCookie(res)
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
