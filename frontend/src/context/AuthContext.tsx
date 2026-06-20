import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

interface AuthUser {
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

interface AuthContextType {
  user: AuthUser | null
  accessToken: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

interface RegisterData {
  name: string
  parentName?: string
  email: string
  password: string
  phone?: string
  role?: 'CHILD' | 'PARENT'
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const stored = localStorage.getItem('user')
    if (token && stored) {
      setAccessToken(token)
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại')

    setUser(data.user)
    setAccessToken(data.accessToken)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  async function register(registerData: RegisterData) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại')

    setUser(data.user)
    setAccessToken(data.accessToken)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('user', JSON.stringify(data.user))
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
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải được dùng bên trong AuthProvider')
  return ctx
}
