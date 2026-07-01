import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth'

const app = express()
const PORT = process.env.PORT || 5000

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
      (process.env.NODE_ENV === 'development' && isLocal)
    ) {
      return callback(null, true)
    }

    return callback(new Error('CORS policy: Origin not allowed'), false)
  },
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'KIDDO API', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' })
})

app.listen(PORT, () => {
  console.log(`\n🦦 OTTOPIA Backend đang chạy tại http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/health`)
  console.log(`   Auth API:     http://localhost:${PORT}/api/auth\n`)
})

export default app
