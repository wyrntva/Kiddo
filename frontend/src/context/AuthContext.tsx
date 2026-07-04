import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

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
  role: string
  avatar?: string
  level: number
  stars: number
  badges: number
  lessonsCompleted: number
  weeklyProgress: number
}

interface RegisterData {
  name: string
  parentName?: string
  email: string
  password: string
  phone?: string
  role?: 'CHILD' | 'PARENT'
}

interface AuthContextType {
  user: AuthUser | null
  accessToken: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  function persistSession(nextAccessToken: string, nextRefreshToken: string | null, nextUser: AuthUser) {
    setAccessToken(nextAccessToken)
    setUser(nextUser)
    localStorage.setItem('accessToken', nextAccessToken)
    if (nextRefreshToken) {
      localStorage.setItem('refreshToken', nextRefreshToken)
    }
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
      const refreshToken = localStorage.getItem('refreshToken')
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

      if (!refreshToken) {
        clearSession()
        setLoading(false)
        return
      }

      try {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
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

        persistSession(refreshData.accessToken, refreshData.refreshToken, nextUser)
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Đăng nhập thất bại')

    persistSession(data.accessToken, data.refreshToken, data.user)
  }

  async function register(registerData: RegisterData) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại')

    persistSession(data.accessToken, data.refreshToken, data.user)
  }

  async function logout() {
    const refreshToken = localStorage.getItem('refreshToken')
    const token = accessToken || localStorage.getItem('accessToken')

    if (token) {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {})
    }

    clearSession()
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider')
  return context
}
