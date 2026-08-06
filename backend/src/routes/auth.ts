import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { createImageUpload } from '../lib/imageUpload'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt'
import { authenticate, AuthRequest } from '../middleware/authMiddleware'
import nodemailer from 'nodemailer'

const router = Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const avatarUpload = createImageUpload('avatars')
const REFRESH_COOKIE = 'kiddo_refresh'
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000

function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/auth',
    maxAge: REFRESH_TTL_MS,
  })
}

function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
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
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(128),
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
      isPaid: true, isPendingPaid: true,
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
      isPaid: user.isPaid,
      isPendingPaid: user.isPendingPaid,
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
        isPaid: user.isPaid,
        isPendingPaid: user.isPendingPaid,
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
        isPaid: user.isPaid,
        isPendingPaid: user.isPendingPaid,
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
    res.status(401).json({ message: 'Thiếu refresh token' })
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
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: req.user!.userId }
    })
    
    if (currentUser && currentUser.isPaid && currentUser.paidUntil && currentUser.paidUntil < new Date()) {
      // Expiration check: Demote expired subscription to free
      await prisma.user.update({
        where: { id: req.user!.userId },
        data: {
          isPaid: false,
          subscriptionPlanId: null,
          paidUntil: null
        }
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true, name: true, parentName: true, email: true, phone: true,
        role: true, avatar: true, level: true, stars: true,
        badges: true, lessonsCompleted: true, weeklyProgress: true,
        isPaid: true,
        isPendingPaid: true,
        paidUntil: true,
        subscriptionPlanId: true,
        pendingPlanId: true,
        createdAt: true,
      },
    })
    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại' })
      return
    }
    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi đồng bộ thông tin tài khoản' })
  }
})

// POST /api/auth/upgrade - Upgrade user to paid
router.post('/upgrade', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data: { isPaid: true, isPendingPaid: false },
    })
    res.json({
      message: 'Nâng cấp tài khoản thành công',
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
        isPaid: user.isPaid,
        isPendingPaid: user.isPendingPaid,
        paidUntil: user.paidUntil,
        subscriptionPlanId: user.subscriptionPlanId,
        pendingPlanId: user.pendingPlanId,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Không thể nâng cấp tài khoản' })
  }
})

// POST /api/auth/request-upgrade - Request subscription upgrade (set isPendingPaid to true)
router.post('/request-upgrade', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { planId } = req.body
  try {
    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data: { isPendingPaid: true, pendingPlanId: planId },
    })

    // Fetch plan details to construct notification email
    const plan = planId ? await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    }) : null

    if (plan && user) {
      const smtpUser = process.env.SMTP_USER || 'ottopiaforkids@gmail.com'
      const smtpPass = process.env.SMTP_PASS

      if (smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: smtpUser,
              pass: smtpPass
            }
          })

          const planNameClean = plan.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .toUpperCase()
          const contactInfo = user.phone || user.email.split('@')[0] || ''
          const transferContent = `DANG KY ${planNameClean} ${contactInfo}`.replace(/\s+/g, ' ')

          const mailOptions = {
            from: `"OTTOPIA Subscription" <${smtpUser}>`,
            to: 'ottopiaforkids@gmail.com',
            subject: `[OTTOPIA] Yêu cầu nâng cấp gói học mới từ phụ huynh ${user.name}`,
            text: `Yêu cầu kích hoạt gói học mới đang chờ phê duyệt:\n\n` +
                  `- Phụ huynh: ${user.name}\n` +
                  `- Email: ${user.email}\n` +
                  `- Số điện thoại: ${user.phone || 'Chưa cung cấp'}\n` +
                  `- Gói đăng ký: ${plan.name}\n` +
                  `- Học phí: ${plan.price.toLocaleString('vi-VN')} VND\n` +
                  `- Thời hạn: ${plan.durationMonths || 1} tháng\n` +
                  `- Cú pháp chuyển khoản đối soát: ${transferContent}\n\n` +
                  `Vui lòng truy cập trang quản trị để kiểm tra và xác nhận chuyển khoản cho phụ huynh.`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ffebc3; border-radius: 12px; background-color: #fffcf5;">
                <h2 style="color: #fea01f; border-bottom: 2px solid #fea01f; padding-bottom: 8px; margin-top: 0;">Yêu cầu nâng cấp gói học mới đang chờ phê duyệt</h2>
                <p>Chào ban quản trị OTTOPIA, hệ thống vừa ghi nhận một yêu cầu đăng ký mua gói học phí của phụ huynh cần đối soát chuyển khoản:</p>
                
                <h3 style="color: #004c6e; margin-bottom: 8px;">Thông tin tài khoản:</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px; font-weight: bold; width: 35%; border-bottom: 1px solid #ffebc3;">Tên phụ huynh:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ffebc3;">${user.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ffebc3;">Email tài khoản:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ffebc3;"><a href="mailto:${user.email}">${user.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ffebc3;">Số điện thoại:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ffebc3;">${user.phone || 'Chưa cung cấp'}</td>
                  </tr>
                </table>

                <h3 style="color: #004c6e; margin-bottom: 8px;">Thông tin gói đăng ký:</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px; font-weight: bold; width: 35%; border-bottom: 1px solid #ffebc3;">Gói đăng ký:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ffebc3; font-weight: bold; color: #0a7ad8;">${plan.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ffebc3;">Học phí:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ffebc3; font-weight: bold; color: #e83552;">${plan.price.toLocaleString('vi-VN')} VND</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ffebc3;">Thời hạn kích hoạt:</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ffebc3;">${plan.durationMonths || 1} tháng</td>
                  </tr>
                </table>

                <div style="background-color: #fff8e8; padding: 15px; border-radius: 8px; border-left: 4px solid #fea01f; margin-top: 15px; margin-bottom: 20px;">
                  <strong style="color: #3e484f;">Cú pháp chuyển khoản đối soát (bắt buộc):</strong>
                  <p style="margin: 8px 0 0 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #fea01f;">${transferContent}</p>
                </div>
                
                <p style="margin-top: 25px;">Vui lòng truy cập cổng quản lý CMS quản trị viên, xác nhận chuyển khoản và phê duyệt mở khóa cho tài khoản phụ huynh này.</p>
                <p style="font-size: 11px; color: #999; margin-top: 30px; text-align: center; border-top: 1px solid #ffebc3; padding-top: 15px;">
                  Hệ thống thông báo tự động từ trang web học tập OTTOPIA.
                </p>
              </div>
            `
          }

          await transporter.sendMail(mailOptions)
        } catch (mailErr) {
          console.error('Lỗi khi gửi email thông báo nâng cấp cho admin:', mailErr)
        }
      }
    }

    res.json({
      message: 'Yêu cầu nâng cấp tài khoản đang chờ xử lý',
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
        isPaid: user.isPaid,
        isPendingPaid: user.isPendingPaid,
        paidUntil: user.paidUntil,
        subscriptionPlanId: user.subscriptionPlanId,
        pendingPlanId: user.pendingPlanId,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Không thể gửi yêu cầu nâng cấp' })
  }
})

// POST /api/auth/cancel-upgrade - Cancel subscription upgrade request (set isPendingPaid to false)
router.post('/cancel-upgrade', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data: { isPendingPaid: false },
    })
    res.json({
      message: 'Đã hủy yêu cầu nâng cấp tài khoản',
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
        isPaid: user.isPaid,
        isPendingPaid: user.isPendingPaid,
        paidUntil: user.paidUntil,
        subscriptionPlanId: user.subscriptionPlanId,
        pendingPlanId: user.pendingPlanId,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Không thể hủy yêu cầu nâng cấp' })
  }
})

// PUT /api/auth/profile - Update user profile details
router.put('/profile', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, parentName, phone, gender, childAge, avatar } = req.body

  try {
    const updateData: any = {}
    if (name !== undefined) updateData.name = name.trim()
    if (parentName !== undefined) updateData.parentName = parentName.trim()
    if (phone !== undefined) updateData.phone = phone.trim()
    if (gender !== undefined) {
      if (['MALE', 'FEMALE', 'OTHER'].includes(gender)) {
        updateData.gender = gender
      }
    }
    if (childAge !== undefined) {
      const ageNum = Number(childAge)
      if (!isNaN(ageNum)) {
        updateData.childAge = ageNum
      }
    }
    if (avatar !== undefined) updateData.avatar = avatar.trim()

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        level: true,
        stars: true,
        badges: true,
        lessonsCompleted: true,
        weeklyProgress: true,
        isPaid: true,
        isPendingPaid: true,
      },
    })

    res.json({
      message: 'Cập nhật thông tin cá nhân thành công',
      user: updatedUser,
    })
  } catch (error) {
    res.status(500).json({ message: 'Không thể cập nhật thông tin cá nhân' })
  }
})

// POST /api/auth/profile/avatar - Upload custom avatar image
router.post('/profile/avatar', authenticate, avatarUpload.single('avatar'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Vui lòng chọn file ảnh hợp lệ' })
      return
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`
    res.json({
      message: 'Tải ảnh đại diện thành công',
      avatarUrl,
    })
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải ảnh đại diện lên server' })
  }
})

// PUT /api/auth/profile/password - Change password for logged-in user
router.put('/profile/password', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    res.status(400).json({ message: 'Vui lòng nhập đầy đủ mật khẩu cũ và mới' })
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    })

    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại' })
      return
    }

    if (user.password) {
      const isValid = await bcrypt.compare(oldPassword, user.password)
      if (!isValid) {
        res.status(400).json({ message: 'Mật khẩu cũ không chính xác' })
        return
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { password: hashedPassword },
    })

    res.json({ message: 'Đổi mật khẩu thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Không thể đổi mật khẩu' })
  }
})

const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email không hợp lệ'),
})

const resetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email không hợp lệ'),
  code: z.string().trim().min(6, 'Mã xác nhận phải có 6 ký tự').max(6, 'Mã xác nhận phải có 6 ký tự'),
  newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự').max(128),
})

function generateResetCode(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response): Promise<void> => {
  const result = forgotPasswordSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: result.error.errors[0].message })
    return
  }

  const { email } = result.data

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(404).json({ message: 'Gmail không tồn tại.' })
      return
    }

    const resetCode = generateResetCode()
    const resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    await prisma.user.update({
      where: { email },
      data: { resetCode, resetCodeExpires }
    })

    const smtpUser = process.env.SMTP_USER || 'ottopiaforkids@gmail.com'
    const smtpPass = process.env.SMTP_PASS

    console.log(`[FORGOT PASSWORD] Mã khôi phục mật khẩu của email ${email} là: ${resetCode}`)

    if (!smtpPass) {
      console.warn('Gmail SMTP_PASS chưa được cấu hình trong file .env. Không thể gửi email thực tế.')
      res.json({
        message: 'Yêu cầu thành công! (Chế độ phát triển: Mã xác nhận đã được in ra log của backend).'
      })
      return
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    const mailOptions = {
      from: `"OTTOPIA Support" <${smtpUser}>`,
      to: email,
      subject: `[OTTOPIA] Mã xác nhận khôi phục mật khẩu`,
      text: `Mã xác nhận khôi phục mật khẩu của bạn là: ${resetCode}\nHiệu lực trong 10 phút.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ffebc3; border-radius: 12px; background-color: #fffcf5;">
          <h2 style="color: #fea01f; border-bottom: 2px solid #fea01f; padding-bottom: 8px; margin-top: 0;">Khôi phục mật khẩu OTTOPIA</h2>
          <p>Chào phụ huynh,</p>
          <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu cho tài khoản liên kết với email này. Vui lòng sử dụng mã xác nhận bên dưới để đặt lại mật khẩu mới:</p>
          
          <div style="background-color: #fff8e8; padding: 15px; border-radius: 8px; border-left: 4px solid #fea01f; margin: 20px 0; text-align: center;">
            <strong style="color: #3e484f; display: block; margin-bottom: 8px;">Mã xác minh của bạn (hiệu lực trong 10 phút):</strong>
            <p style="margin: 0; font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #fea01f;">${resetCode}</p>
          </div>

          <p>Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email này. Mật khẩu của bạn sẽ được giữ nguyên an toàn.</p>
          <p style="margin-top: 25px;">Trân trọng,<br/>Đội ngũ hỗ trợ OTTOPIA</p>
          <p style="font-size: 11px; color: #999; margin-top: 30px; text-align: center; border-top: 1px solid #ffebc3; padding-top: 15px;">
            Hệ thống thông báo tự động từ trang web học tập OTTOPIA.
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    res.json({ message: 'Mã xác nhận khôi phục mật khẩu đã được gửi vào email của bạn.' })
  } catch (error) {
    console.error('Lỗi khi xử lý quên mật khẩu:', error)
    res.status(500).json({ message: 'Không thể xử lý yêu cầu. Lỗi hệ thống.' })
  }
})

const verifyResetCodeSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email không hợp lệ'),
  code: z.string().trim().min(6, 'Mã xác nhận phải có 6 ký tự').max(6, 'Mã xác nhận phải có 6 ký tự'),
})

// POST /api/auth/verify-reset-code
router.post('/verify-reset-code', async (req: Request, res: Response): Promise<void> => {
  const result = verifyResetCodeSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: result.error.errors[0].message })
    return
  }

  const { email, code } = result.data

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại.' })
      return
    }

    if (!user.resetCode || !user.resetCodeExpires) {
      res.status(400).json({ message: 'Yêu cầu khôi phục mật khẩu không tồn tại hoặc đã hết hạn.' })
      return
    }

    if (user.resetCode.toUpperCase() !== code.toUpperCase()) {
      res.status(400).json({ message: 'Mã xác nhận không đúng.' })
      return
    }

    if (user.resetCodeExpires < new Date()) {
      res.status(400).json({ message: 'Mã xác nhận đã hết hiệu lực.' })
      return
    }

    res.json({ message: 'Xác minh mã thành công.' })
  } catch (error) {
    console.error('Lỗi khi xác minh mã:', error)
    res.status(500).json({ message: 'Không thể xác minh mã. Lỗi hệ thống.' })
  }
})

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response): Promise<void> => {
  const result = resetPasswordSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: result.error.errors[0].message })
    return
  }

  const { email, code, newPassword } = result.data

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại.' })
      return
    }

    if (!user.resetCode || !user.resetCodeExpires) {
      res.status(400).json({ message: 'Yêu cầu khôi phục mật khẩu không tồn tại hoặc đã hết hạn.' })
      return
    }

    if (user.resetCode.toUpperCase() !== code.toUpperCase()) {
      res.status(400).json({ message: 'Mã xác nhận không đúng.' })
      return
    }

    if (user.resetCodeExpires < new Date()) {
      res.status(400).json({ message: 'Mã xác nhận đã hết hiệu lực.' })
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetCode: null,
        resetCodeExpires: null
      }
    })

    res.json({ message: 'Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.' })
  } catch (error) {
    console.error('Lỗi khi xử lý đặt lại mật khẩu:', error)
    res.status(500).json({ message: 'Không thể đặt lại mật khẩu. Lỗi hệ thống.' })
  }
})

export default router


