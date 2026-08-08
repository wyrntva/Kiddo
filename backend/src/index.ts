import 'dotenv/config'
import express, { ErrorRequestHandler } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import poolArenaRouter from './routes/poolArena'
import zonesRouter from './routes/zones'
import lessonsRouter from './routes/lessons'
import newsRouter from './routes/news'
import storeSettingsRouter from './routes/storeSettings'
import analyticsRouter from './routes/analytics'
import subscriptionPlansRouter from './routes/subscriptionPlans'
import progressRouter from './routes/progress'
import chatRouter from './routes/chat'
import facebookWebhookRouter from './routes/facebookWebhook'
import contactRouter from './routes/contact'
import promotionCampaignsRouter, { checkAndUpdateCampaigns } from './routes/promotionCampaigns'

const app = express()
const PORT = process.env.PORT || 5000

app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https:",
          "wss:",
          "http:",
          "https://api.iconify.design",
          "https://api.simplesvg.com",
          "https://api.unisvg.com",
          "https://*.iconify.design",
        ],
        imgSrc: ["'self'", "data:", "blob:", "https:", "http:"],
        mediaSrc: ["'self'", "data:", "blob:", "https:", "http:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        fontSrc: ["'self'", "data:", "https:"],
      },
    },
  })
)

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:5180']

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Mobile Apps, Postman, Curl)
    if (!origin) return callback(null, true)

    const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})(:\d+)?$/.test(origin)

    if (
      allowedOrigins.includes(origin) ||
      isLocal
    ) {
      return callback(null, true)
    }

    return callback(new Error('CORS policy: Origin not allowed'), false)
  },
  credentials: true,
}))

app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ extended: false, limit: '500mb' }))
app.use(cookieParser())

// Serve static uploads
const backendUploads = path.resolve(__dirname, '../uploads')
const cwdUploads = path.resolve(process.cwd(), 'uploads')
const staticOptions = { maxAge: '30d', immutable: true }
app.use('/uploads', express.static(backendUploads, staticOptions))
app.use('/uploads', express.static(cwdUploads, staticOptions))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'KIDDO API', timestamp: new Date().toISOString() })
})

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: process.env.NODE_ENV === 'production' ? 100 : 2000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Quá nhiều yêu cầu, vui lòng thử lại sau' },
}), authRouter)
app.use('/api/users', usersRouter)
app.use('/api/pool-arena', poolArenaRouter)
app.use('/api/zones', zonesRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/news', newsRouter)
app.use('/api/store-settings', storeSettingsRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/subscription-plans', subscriptionPlansRouter)
app.use('/api/progress', progressRouter)
app.use('/api/contact', contactRouter)
app.use('/api/promotion-campaigns', promotionCampaignsRouter)
app.use('/api/chat', rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Bạn gửi quá nhanh, vui lòng thử lại sau một phút' },
}), chatRouter)
app.use('/api/webhook/facebook', facebookWebhookRouter)

// Mock roles API
app.get('/api/roles', (_req, res) => {
  res.json([
    { id: 1, name: 'Quản trị', permissions: ['*'] },
    { id: 2, name: 'Phụ huynh', permissions: [] },
    { id: 3, name: 'Học sinh', permissions: [] }
  ])
})

// Mock tournament rank settings to prevent frontend toasts
app.get('/api/tournament-settings/ranks', (_req, res) => {
  res.json([])
})

// Serve CMS React SPA build for cms.ottopia.vn
const cmsDistPath = path.resolve(__dirname, '../cms/dist')
const cmsRootDistPath = path.resolve(process.cwd(), 'cms/dist')

if (fs.existsSync(cmsDistPath)) {
  app.use(express.static(cmsDistPath))
} else if (fs.existsSync(cmsRootDistPath)) {
  app.use(express.static(cmsRootDistPath))
}

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path === '/health') {
    return next()
  }
  const cmsIndex = path.join(cmsDistPath, 'index.html')
  const cmsRootIndex = path.join(cmsRootDistPath, 'index.html')
  if (fs.existsSync(cmsIndex)) {
    return res.sendFile(cmsIndex)
  }
  if (fs.existsSync(cmsRootIndex)) {
    return res.sendFile(cmsRootIndex)
  }
  next()
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' })
})

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error?.name === 'MulterError') {
    res.status(400).json({ message: 'File tải lên không hợp lệ hoặc vượt quá 5 MB' })
    return
  }
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ message: 'Dữ liệu JSON không hợp lệ' })
    return
  }
  console.error('Unhandled request error:', error)
  res.status(500).json({ message: 'Lỗi máy chủ nội bộ' })
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`\n🦦 OTTOPIA Backend đang chạy tại http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/health`)
  console.log(`   Auth API:     http://localhost:${PORT}/api/auth\n`)

  // Run promotion campaign auto-activate checker on startup and every 30 seconds
  checkAndUpdateCampaigns()
  setInterval(checkAndUpdateCampaigns, 30000)
})

export default app
