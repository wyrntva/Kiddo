import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken, JwtPayload } from '../lib/jwt'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Bạn cần đăng nhập để tiếp tục' })
    return
  }

  const token = authHeader.slice(7).trim()
  if (!token) {
    res.status(401).json({ message: 'Token đăng nhập không hợp lệ' })
    return
  }
  try {
    req.user = verifyAccessToken(token)
    next()
  } catch {
    res.status(401).json({ message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại' })
  }
}
