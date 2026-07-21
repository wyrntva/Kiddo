import { NextFunction, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest } from './authMiddleware'

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.userId
    if (!userId) {
      res.status(401).json({ message: 'Bạn cần đăng nhập để tiếp tục' })
      return
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, isActive: true },
    })
    if (!user || !user.isActive) {
      res.status(401).json({ message: 'Tài khoản không tồn tại hoặc đã bị khóa' })
      return
    }
    if (user.role !== 'ADMIN') {
      res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này' })
      return
    }

    next()
  } catch (error) {
    next(error)
  }
}
