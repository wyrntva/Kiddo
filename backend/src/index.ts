import 'dotenv/config'
import express, { ErrorRequestHandler } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import path from 'path'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import poolArenaRouter from './routes/poolArena'
import zonesRouter from './routes/zones'
import lessonsRouter from './routes/lessons'
import newsRouter from './routes/news'
import storeSettingsRouter from './routes/storeSettings'
import analyticsRouter from './routes/analytics'
import subscriptionPlansRouter from './routes/subscriptionPlans'

const app = express()
const PORT = process.env.PORT || 5000

app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

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

app.use(express.json({ limit: '200kb' }))
app.use(express.urlencoded({ extended: false, limit: '200kb' }))
app.use(cookieParser())

// Serve static uploads
const backendUploads = path.resolve(__dirname, '../uploads')
const cwdUploads = path.resolve(process.cwd(), 'uploads')
app.use('/uploads', express.static(backendUploads))
app.use('/uploads', express.static(cwdUploads))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'KIDDO API', timestamp: new Date().toISOString() })
})

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
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
})

export default app
