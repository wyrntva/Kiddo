import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const router = Router()

// Apply authentication to all endpoints in this router
router.use(authenticate, requireAdmin)

// ─── Date Parsing Helper ──────────────────────────────────────────────────────

function parseGa4Date(dateStr: string, isEnd = false): Date {
  const now = new Date()
  if (dateStr === 'today') {
    if (isEnd) {
      now.setHours(23, 59, 59, 999)
    } else {
      now.setHours(0, 0, 0, 0)
    }
    return now
  }
  if (dateStr === 'yesterday') {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    if (isEnd) {
      d.setHours(23, 59, 59, 999)
    } else {
      d.setHours(0, 0, 0, 0)
    }
    return d
  }
  const relativeMatch = dateStr.match(/^(\d+)daysAgo$/)
  if (relativeMatch) {
    const days = parseInt(relativeMatch[1], 10)
    const d = new Date()
    d.setDate(d.getDate() - days)
    if (isEnd) {
      d.setHours(23, 59, 59, 999)
    } else {
      d.setHours(0, 0, 0, 0)
    }
    return d
  }
  
  // Format YYYY-MM-DD
  const parsed = new Date(dateStr)
  if (isNaN(parsed.getTime())) {
    const d = new Date()
    if (isEnd) {
      d.setHours(23, 59, 59, 999)
    } else {
      d.setDate(d.getDate() - 30)
      d.setHours(0, 0, 0, 0)
    }
    return d
  }
  if (isEnd) {
    parsed.setHours(23, 59, 59, 999)
  } else {
    parsed.setHours(0, 0, 0, 0)
  }
  return parsed
}

// Helper to construct array of dates between start and end
function getDatesInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = []
  let current = new Date(start)
  // Clean time components for comparison
  const endCompare = new Date(end)
  endCompare.setHours(0, 0, 0, 0)
  
  while (true) {
    const temp = new Date(current)
    temp.setHours(0, 0, 0, 0)
    if (temp > endCompare) break
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return dates
}

// ─── GA4 Client Setup & Queries ──────────────────────────────────────────────

let analyticsDataClient: BetaAnalyticsDataClient | null = null

function getGa4Client(): BetaAnalyticsDataClient | null {
  if (analyticsDataClient) return analyticsDataClient

  const propertyId = process.env.GA4_PROPERTY_ID
  const clientEmail = process.env.GA4_CLIENT_EMAIL
  let privateKey = process.env.GA4_PRIVATE_KEY

  if (!propertyId || !clientEmail || !privateKey) {
    return null
  }

  // Handle newlines in environment variable
  privateKey = privateKey.replace(/\\n/g, '\n')

  try {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    })
    return analyticsDataClient
  } catch (error) {
    console.error('Error initializing GA4 client:', error)
    return null
  }
}

// Generate beautiful mock GA4 data for preview/development
function getMockGa4Data(startDateStr: string, endDateStr: string) {
  const start = parseGa4Date(startDateStr, false)
  const end = parseGa4Date(endDateStr, true)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))

  // Base counts per day
  const sessionsPerDay = 120 + Math.floor(Math.random() * 40)
  const usersPerDay = 90 + Math.floor(Math.random() * 30)
  const pageviewsPerDay = 320 + Math.floor(Math.random() * 80)

  const totalSessions = sessionsPerDay * diffDays
  const totalUsers = usersPerDay * diffDays
  const totalPageviews = pageviewsPerDay * diffDays

  return {
    summary: {
      sessions: totalSessions,
      users: totalUsers,
      pageviews: totalPageviews,
      bounce_rate: 42, // percent
      avg_session_duration: 165, // seconds
    },
    top_pages: [
      { path: '/', title: 'Trang chủ | Kiddo', pageviews: Math.round(totalPageviews * 0.42), users: Math.round(totalUsers * 0.45) },
      { path: '/explore', title: 'Khám phá thế giới | Kiddo', pageviews: Math.round(totalPageviews * 0.22), users: Math.round(totalUsers * 0.25) },
      { path: '/courses', title: 'Khóa học của bé | Kiddo', pageviews: Math.round(totalPageviews * 0.18), users: Math.round(totalUsers * 0.16) },
      { path: '/parents', title: 'Góc phụ huynh | Kiddo', pageviews: Math.round(totalPageviews * 0.10), users: Math.round(totalUsers * 0.08) },
      { path: '/terms', title: 'Điều khoản dịch vụ | Kiddo', pageviews: Math.round(totalPageviews * 0.05), users: Math.round(totalUsers * 0.04) },
      { path: '/diary', title: 'Nhật ký học tập | Kiddo', pageviews: Math.round(totalPageviews * 0.03), users: Math.round(totalUsers * 0.02) },
    ],
    traffic_sources: [
      { source: 'google', medium: 'organic', sessions: Math.round(totalSessions * 0.45), users: Math.round(totalUsers * 0.48) },
      { source: '(direct)', medium: '(none)', sessions: Math.round(totalSessions * 0.32), users: Math.round(totalUsers * 0.30) },
      { source: 'facebook', medium: 'social', sessions: Math.round(totalSessions * 0.15), users: Math.round(totalUsers * 0.16) },
      { source: 'zalo', medium: 'referral', sessions: Math.round(totalSessions * 0.05), users: Math.round(totalUsers * 0.04) },
      { source: 'bing', medium: 'organic', sessions: Math.round(totalSessions * 0.03), users: Math.round(totalUsers * 0.02) },
    ],
    devices: [
      { device: 'mobile', sessions: Math.round(totalSessions * 0.68), users: Math.round(totalUsers * 0.70) },
      { device: 'desktop', sessions: Math.round(totalSessions * 0.28), users: Math.round(totalUsers * 0.26) },
      { device: 'tablet', sessions: Math.round(totalSessions * 0.04), users: Math.round(totalUsers * 0.04) },
    ],
    countries: [
      { country: 'Vietnam', sessions: Math.round(totalSessions * 0.96), users: Math.round(totalUsers * 0.97) },
      { country: 'United States', sessions: Math.round(totalSessions * 0.02), users: Math.round(totalUsers * 0.02) },
      { country: 'Japan', sessions: Math.round(totalSessions * 0.01), users: Math.round(totalUsers * 0.005) },
      { country: 'Singapore', sessions: Math.round(totalSessions * 0.01), users: Math.round(totalUsers * 0.005) },
    ],
  }
}

async function fetchRealGa4Data(startDateStr: string, endDateStr: string) {
  const client = getGa4Client()
  if (!client) return null

  const propertyId = process.env.GA4_PROPERTY_ID

  try {
    // 1. Run Summary Report
    const [summaryRes] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    })

    const summaryRow = summaryRes.rows?.[0]
    let bounceRateVal = Number(summaryRow?.metricValues?.[3]?.value || 0)
    // GA4 bounceRate can be a fraction (e.g. 0.42) or a percentage (42). Format to 0-100 percentage.
    if (bounceRateVal <= 1 && bounceRateVal > 0) {
      bounceRateVal = bounceRateVal * 100
    }

    const summary = {
      sessions: Number(summaryRow?.metricValues?.[0]?.value || 0),
      users: Number(summaryRow?.metricValues?.[1]?.value || 0),
      pageviews: Number(summaryRow?.metricValues?.[2]?.value || 0),
      bounce_rate: Math.round(bounceRateVal),
      avg_session_duration: Math.round(Number(summaryRow?.metricValues?.[4]?.value || 0)),
    }

    // 2. Run Top Pages Report
    const [pagesRes] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
      ],
      orderBys: [
        { metric: { metricName: 'screenPageViews' }, desc: true },
      ],
      limit: 10,
    })

    const top_pages = (pagesRes.rows || []).map(row => ({
      path: row.dimensionValues?.[0]?.value || '',
      title: row.dimensionValues?.[1]?.value || '',
      pageviews: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    }))

    // 3. Run Traffic Sources Report
    const [trafficRes] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true },
      ],
      limit: 10,
    })

    const traffic_sources = (trafficRes.rows || []).map(row => ({
      source: row.dimensionValues?.[0]?.value || '',
      medium: row.dimensionValues?.[1]?.value || '',
      sessions: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    }))

    // 4. Run Devices Report
    const [devicesRes] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
    })

    const devices = (devicesRes.rows || []).map(row => ({
      device: (row.dimensionValues?.[0]?.value || '').toLowerCase(),
      sessions: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    }))

    // 5. Run Countries Report
    const [countriesRes] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
      dimensions: [{ name: 'country' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
      orderBys: [
        { metric: { metricName: 'sessions' }, desc: true },
      ],
      limit: 10,
    })

    const countries = (countriesRes.rows || []).map(row => ({
      country: row.dimensionValues?.[0]?.value || '',
      sessions: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    }))

    return {
      summary,
      top_pages,
      traffic_sources,
      devices,
      countries,
    }
  } catch (error) {
    console.error('Error fetching GA4 reports from Google API:', error)
    return null
  }
}

// ─── Core Calculations ────────────────────────────────────────────────────────

async function getNewUsersStats(parsedStart: Date, parsedEnd: Date) {
  // 1. New users chart data
  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: parsedStart,
        lte: parsedEnd,
      },
    },
    select: {
      createdAt: true,
    },
  })

  const dateMap = new Map<string, number>()
  for (const u of users) {
    const dStr = u.createdAt.toISOString().split('T')[0]
    dateMap.set(dStr, (dateMap.get(dStr) || 0) + 1)
  }

  const rangeDates = getDatesInRange(parsedStart, parsedEnd)
  const chart = rangeDates.map(date => {
    const dateStr = date.toISOString().split('T')[0]
    return {
      date: dateStr,
      count: dateMap.get(dateStr) || 0,
    }
  })

  // 2. New users today stats
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)

  const startOfYesterday = new Date()
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)
  startOfYesterday.setHours(0, 0, 0, 0)
  const endOfYesterday = new Date()
  endOfYesterday.setDate(endOfYesterday.getDate() - 1)
  endOfYesterday.setHours(23, 59, 59, 999)

  const todayCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  })

  const yesterdayCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfYesterday,
        lte: endOfYesterday,
      },
    },
  })

  let growth_percent: number | null = null
  if (yesterdayCount > 0) {
    growth_percent = Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100)
  } else if (todayCount > 0) {
    growth_percent = 100
  }

  return {
    today: {
      count: todayCount,
      growth_percent,
    },
    chart,
  }
}

async function getReturningUsersStats(parsedStart: Date, parsedEnd: Date) {
  // Unique users with created_at < login_date who logged in via RefreshToken on login_date
  const tokens = await prisma.refreshToken.findMany({
    where: {
      createdAt: {
        gte: parsedStart,
        lte: parsedEnd,
      },
    },
    select: {
      userId: true,
      createdAt: true,
      user: {
        select: {
          createdAt: true,
        },
      },
    },
  })

  const loginMap = new Map<string, Set<string>>()
  for (const t of tokens) {
    if (!t.user) continue
    const dStr = t.createdAt.toISOString().split('T')[0]
    const startOfLoginDay = new Date(dStr + 'T00:00:00.000Z')
    
    if (t.user.createdAt < startOfLoginDay) {
      if (!loginMap.has(dStr)) {
        loginMap.set(dStr, new Set())
      }
      loginMap.get(dStr)!.add(t.userId)
    }
  }

  const rangeDates = getDatesInRange(parsedStart, parsedEnd)
  const chart = rangeDates.map(date => {
    const dateStr = date.toISOString().split('T')[0]
    return {
      date: dateStr,
      count: loginMap.get(dateStr)?.size || 0,
    }
  })

  return {
    chart,
  }
}

// ─── Route Handlers ──────────────────────────────────────────────────────────

// GET /api/analytics/overview
router.get('/overview', async (req, res) => {
  const startDateStr = (req.query.startDate as string) || '30daysAgo'
  const endDateStr = (req.query.endDate as string) || 'today'

  const parsedStart = parseGa4Date(startDateStr, false)
  const parsedEnd = parseGa4Date(endDateStr, true)

  try {
    // 1. Database stats
    const newUsers = await getNewUsersStats(parsedStart, parsedEnd)
    const returningUsers = await getReturningUsersStats(parsedStart, parsedEnd)

    // 2. GA4 stats
    let ga4 = await fetchRealGa4Data(startDateStr, endDateStr)
    if (!ga4 && process.env.GA4_MOCK === 'true') {
      ga4 = getMockGa4Data(startDateStr, endDateStr)
    }

    res.json({
      ga4,
      new_users_today: newUsers.today,
      new_users_chart: newUsers.chart,
      returning_users_chart: returningUsers.chart,
    })
  } catch (error) {
    console.error('Error computing analytics overview:', error)
    res.status(500).json({ message: 'Không thể tính toán thống kê phân tích' })
  }
})

// GET /api/analytics/new-users
router.get('/new-users', async (req, res) => {
  // Default to 30 days ago
  const parsedStart = parseGa4Date('30daysAgo', false)
  const parsedEnd = parseGa4Date('today', true)

  try {
    const stats = await getNewUsersStats(parsedStart, parsedEnd)
    res.json(stats)
  } catch (error) {
    console.error('Error fetching new users statistics:', error)
    res.status(500).json({ message: 'Không thể tải thống kê tài khoản mới' })
  }
})

// GET /api/analytics/returning-users
router.get('/returning-users', async (req, res) => {
  const parsedStart = parseGa4Date('30daysAgo', false)
  const parsedEnd = parseGa4Date('today', true)

  try {
    const stats = await getReturningUsersStats(parsedStart, parsedEnd)
    res.json(stats)
  } catch (error) {
    console.error('Error fetching returning users statistics:', error)
    res.status(500).json({ message: 'Không thể tải thống kê tài khoản cũ quay lại' })
  }
})

export default router
