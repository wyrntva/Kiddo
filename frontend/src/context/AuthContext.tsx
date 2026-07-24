import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (typeof window !== 'undefined' && window.location && window.location.hostname.includes('ottopia.vn')) {
    return window.location.origin
  }
  return 'http://localhost:5000'
}

const API_URL = getApiUrl()

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export interface AuthUser {
  id: string
  name: string
  email: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  childAge?: number
  role: string
  avatar?: string
  level: number
  stars: number
  badges: number
  lessonsCompleted: number
  weeklyProgress: number
  isPaid: boolean
}

interface RegisterData {
  name: string
  parentName?: string
  email: string
  password: string
  phone?: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  childAge: number
  role?: 'CHILD' | 'PARENT'
}

interface AuthContextType {
  user: AuthUser | null
  accessToken: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (credential: string) => Promise<{ requiresProfile: boolean }>
  completeGoogleRegistration: (credential: string, data: GoogleProfileData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  upgradeSubscription: () => Promise<void>
}

interface GoogleProfileData {
  parentName: string
  phone: string
  name: string
  childAge: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  function persistSession(nextAccessToken: string, nextUser: AuthUser) {
    setAccessToken(nextAccessToken)
    setUser(nextUser)
    localStorage.setItem('accessToken', nextAccessToken)
    localStorage.setItem('user', JSON.stringify(nextUser))
  }

  function clearSession() {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem('accessToken')
      const storedUser = localStorage.getItem('user')

      if (!storedUser) {
        clearSession()
        setLoading(false)
        return
      }

      const parsedUser = JSON.parse(storedUser) as AuthUser

      if (token && !isTokenExpired(token)) {
        setAccessToken(token)
        setUser(parsedUser)
        setLoading(false)
        return
      }

      try {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })

        const refreshData = await refreshResponse.json()
        if (!refreshResponse.ok) {
          throw new Error(refreshData.message || 'Khôi phục phiên đăng nhập thất bại')
        }

        const meResponse = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${refreshData.accessToken}`,
          },
        })

        const meData = await meResponse.json().catch(() => null)
        const nextUser = meResponse.ok && meData?.user ? (meData.user as AuthUser) : parsedUser

        persistSession(refreshData.accessToken, nextUser)
      } catch {
        clearSession()
      } finally {
        setLoading(false)
      }
    }

    void restoreSession()
  }, [])

  async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Đăng nhập thất bại')

    persistSession(data.accessToken, data.user)
  }

  async function loginWithGoogle(credential: string) {
    const response = await fetch(`${API_URL}/api/auth/google`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Đăng nhập Google thất bại')

    if (data.requiresProfile) return { requiresProfile: true }

    persistSession(data.accessToken, data.user)
    return { requiresProfile: false }
  }

  async function completeGoogleRegistration(credential: string, profileData: GoogleProfileData) {
    const response = await fetch(`${API_URL}/api/auth/google/complete`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, ...profileData }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Không thể hoàn tất đăng ký Google')

    persistSession(data.accessToken, data.user)
  }

  async function register(registerData: RegisterData) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại')

    persistSession(data.accessToken, data.user)
  }

  async function logout() {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {})

    clearSession()
  }

  async function upgradeSubscription() {
    if (!accessToken) return
    const response = await fetch(`${API_URL}/api/auth/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Không thể nâng cấp tài khoản')
    persistSession(accessToken, data.user)
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, loginWithGoogle, completeGoogleRegistration, register, logout, upgradeSubscription }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider')
  return context
}
