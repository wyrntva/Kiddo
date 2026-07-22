import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  noindex?: boolean
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  schemaType?: 'WebPage' | 'CollectionPage'
}

export default function SEO({
  title,
  description,
  image,
  url,
  noindex = false,
  structuredData,
  schemaType = 'WebPage',
}: SEOProps) {
  const location = useLocation()

  useEffect(() => {
    // 1. Cập nhật Title
    const formattedTitle = title
      ? title.toLocaleUpperCase('vi').includes('OTTOPIA') ? title : `${title} | OTTOPIA`
      : 'OTTOPIA - Kỹ năng sống cho trẻ'
    document.title = formattedTitle

    // Hàm tiện ích để cập nhật hoặc tạo mới thẻ meta
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (content) {
        if (!element) {
          element = document.createElement('meta')
          element.setAttribute(attribute, name)
          document.head.appendChild(element)
        }
        element.setAttribute('content', content)
      } else if (element) {
        element.remove()
      }
    }

    // Hàm tiện ích để cập nhật canonical link
    const updateCanonicalLink = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]')
      if (href) {
        if (!element) {
          element = document.createElement('link')
          element.setAttribute('rel', 'canonical')
          document.head.appendChild(element)
        }
        element.setAttribute('href', href)
      } else if (element) {
        element.remove()
      }
    }

    const canonicalPath = location.pathname === '/home' ? '/' : location.pathname
    const currentUrl = url || `${window.location.origin}${canonicalPath}`
    const defaultDescription =
      'OTTOPIA là nền tảng học kỹ năng sống bằng hình ảnh, tình huống thực tế và trò chơi tương tác, giúp trẻ phát triển toàn diện, tự tin và hạnh phúc hơn mỗi ngày.'
    const finalDescription = description || defaultDescription
    const defaultImage = `${window.location.origin}/og-cover.webp`
    const finalImage = image || defaultImage

    // 2. Robots
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow')

    // 3. Cập nhật các thẻ Meta cơ bản
    updateMetaTag('description', finalDescription)

    // 4. Cập nhật Open Graph (Facebook)
    updateMetaTag('og:title', formattedTitle, true)
    updateMetaTag('og:description', finalDescription, true)
    updateMetaTag('og:image', finalImage, true)
    updateMetaTag('og:image:width', '1200', true)
    updateMetaTag('og:image:height', '630', true)
    updateMetaTag('og:image:alt', `${formattedTitle} - OTTOPIA`, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:site_name', 'OTTOPIA', true)
    updateMetaTag('og:locale', 'vi_VN', true)

    // 5. Cập nhật Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', formattedTitle)
    updateMetaTag('twitter:description', finalDescription)
    updateMetaTag('twitter:image', finalImage)
    updateMetaTag('twitter:image:alt', `${formattedTitle} - OTTOPIA`)

    // 6. Cập nhật Canonical Link
    updateCanonicalLink(currentUrl)

    const schemaId = 'ottopia-page-schema'
    let schemaElement = document.getElementById(schemaId) as HTMLScriptElement | null
    if (!schemaElement) {
      schemaElement = document.createElement('script')
      schemaElement.id = schemaId
      schemaElement.type = 'application/ld+json'
      document.head.appendChild(schemaElement)
    }
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: formattedTitle,
      description: finalDescription,
      url: currentUrl,
      inLanguage: 'vi-VN',
      isPartOf: { '@type': 'WebSite', name: 'OTTOPIA', url: window.location.origin },
    }
    schemaElement.textContent = JSON.stringify(structuredData || defaultSchema)

    return () => {
      document.getElementById(schemaId)?.remove()
    }
  }, [title, description, image, url, noindex, location.pathname, structuredData, schemaType])

  return null
}
