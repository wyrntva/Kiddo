import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
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
