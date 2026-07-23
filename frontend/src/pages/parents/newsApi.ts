export interface NewsArticle {
  id: number
  title: string
  category: string
  date: string
  author: string
  image: string
  excerpt: string
  content: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface NewsListResponse {
  items: NewsArticle[]
  total: number
  page: number
  limit: number
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const resolveNewsImage = (image: string) =>
  image && !image.startsWith('http') ? `${API_URL}${image}` : image

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Không thể tải bài viết (${response.status})`)
  }
  return response.json() as Promise<T>
}

export async function getNews(search = ''): Promise<NewsListResponse> {
  const params = new URLSearchParams({ page: '1', limit: '100' })
  if (search) params.set('search', search)
  const response = await fetch(`${API_URL}/api/news?${params.toString()}`)
  return parseResponse<NewsListResponse>(response)
}

export async function getNewsArticle(id: number): Promise<NewsArticle> {
  const response = await fetch(`${API_URL}/api/news/${id}`)
  return parseResponse<NewsArticle>(response)
}
