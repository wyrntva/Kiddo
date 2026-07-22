import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteUrl = 'https://ottopia.vn'
const distDir = new URL('../dist/', import.meta.url)
const distPath = fileURLToPath(distDir)
const template = await readFile(new URL('index.html', distDir), 'utf8')

const pages = [
  {
    path: '/',
    title: 'OTTOPIA - Kỹ năng sống cho trẻ',
    description: 'OTTOPIA là nền tảng học kỹ năng sống bằng hình ảnh, tình huống thực tế và trò chơi tương tác, giúp trẻ phát triển toàn diện, tự tin và hạnh phúc hơn mỗi ngày.',
    heading: 'Nền tảng học kỹ năng sống trực tuyến cho trẻ em',
    intro: 'Học kỹ năng sống qua hình ảnh, tình huống thực tế và trò chơi tương tác phù hợp với trẻ em.',
    type: 'WebPage',
    sections: [
      ['Vì sao phụ huynh chọn OTTOPIA?', 'Nội dung lành mạnh, hình ảnh gần gũi và phương pháp học mà chơi giúp trẻ ghi nhớ tự nhiên.'],
      ['Năm vùng kỹ năng thiết yếu', 'Trẻ rèn luyện quản lý cảm xúc, giao tiếp, tự lập, tình bạn và cách ứng phó với các tình huống hằng ngày.'],
      ['Hành trình học phù hợp với trẻ 3–5 tuổi', 'Bài học ngắn, hoạt động tương tác và phần thưởng tích cực giúp trẻ duy trì hứng thú.'],
    ],
  },
  {
    path: '/explore',
    title: 'Khám phá bản đồ học tập | OTTOPIA',
    description: 'Cùng phiêu lưu trên bản đồ học tập OTTOPIA để rèn luyện kỹ năng tự lập, giao tiếp, quản lý cảm xúc và ứng phó tình huống.',
    heading: 'Khám phá thế giới kỹ năng sống',
    intro: 'Khám phá năm vùng đất giúp trẻ rèn luyện cảm xúc, giao tiếp, tự lập, tình bạn và ứng phó tình huống.',
    type: 'CollectionPage',
    sections: [
      ['Vùng đất cảm xúc', 'Giúp trẻ nhận biết, gọi tên và điều chỉnh cảm xúc theo cách tích cực.'],
      ['Thành phố giao tiếp', 'Rèn luyện cách lắng nghe, diễn đạt mong muốn và trò chuyện lịch sự.'],
      ['Ngôi làng tự lập', 'Xây dựng những thói quen tự chăm sóc và chủ động phù hợp với độ tuổi.'],
      ['Khu vườn bạn bè', 'Học cách chia sẻ, hợp tác, tôn trọng và giải quyết mâu thuẫn với bạn.'],
      ['Hành tinh tình huống', 'Thực hành lựa chọn cách xử lý an toàn trước các tình huống quen thuộc.'],
    ],
  },
  {
    path: '/courses',
    title: 'Khóa học kỹ năng sống | OTTOPIA',
    description: 'Tổng hợp các khóa học kỹ năng sống chất lượng cao cho trẻ em từ OTTOPIA. Học qua trải nghiệm thực tế và trò chơi tương tác.',
    heading: 'Khóa học kỹ năng sống cho trẻ em',
    intro: 'Các chương trình học trực tuyến giúp trẻ phát triển kỹ năng qua trải nghiệm và trò chơi tương tác.',
    type: 'CollectionPage',
    sections: [
      ['Học qua tình huống thực tế', 'Bài học đưa trẻ vào những hoàn cảnh gần gũi để quan sát, suy nghĩ và lựa chọn cách phản ứng.'],
      ['Lộ trình phù hợp với độ tuổi', 'Nội dung được chia thành các bước ngắn, trực quan và dễ thực hành cùng phụ huynh.'],
      ['Theo dõi tiến trình học tập', 'Phụ huynh có thể đồng hành và ghi nhận sự tiến bộ của trẻ trong từng nhóm kỹ năng.'],
    ],
  },
  {
    path: '/parents',
    title: 'Góc phụ huynh | OTTOPIA',
    description: 'Theo dõi tiến trình học tập, quản lý tài khoản và tìm hiểu phương pháp giáo dục kỹ năng sống tốt nhất cho con cùng OTTOPIA.',
    heading: 'Góc phụ huynh OTTOPIA',
    intro: 'Kiến thức và phương pháp giúp phụ huynh đồng hành cùng con trong hành trình phát triển kỹ năng sống.',
    type: 'CollectionPage',
    sections: [
      ['Đồng hành cùng con mỗi ngày', 'Gợi ý hoạt động đơn giản giúp phụ huynh củng cố kỹ năng sau mỗi bài học.'],
      ['Hiểu sự phát triển của trẻ', 'Nội dung tham khảo về cảm xúc, giao tiếp, tự lập và quan hệ bạn bè ở độ tuổi mầm non.'],
      ['Theo dõi hành trình học tập', 'Quan sát tiến trình để lựa chọn hoạt động và cách khích lệ phù hợp với trẻ.'],
    ],
  },
  {
    path: '/terms',
    title: 'Điều khoản và Chính sách bảo mật | OTTOPIA',
    description: 'Điều khoản sử dụng dịch vụ và chính sách bảo mật thông tin người dùng trên nền tảng OTTOPIA.',
    heading: 'Điều khoản sử dụng và Chính sách bảo mật',
    intro: 'Thông tin về điều kiện sử dụng dịch vụ và cách OTTOPIA bảo vệ dữ liệu người dùng.',
    type: 'WebPage',
    sections: [
      ['Điều kiện sử dụng', 'Quy định về tài khoản, quyền và trách nhiệm khi sử dụng nền tảng OTTOPIA.'],
      ['Bảo vệ thông tin người dùng', 'Nguyên tắc thu thập, sử dụng và bảo vệ dữ liệu trong quá trình cung cấp dịch vụ.'],
    ],
  },
]

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function render(page) {
  const url = `${siteUrl}${page.path}`
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': page.type,
    name: page.title,
    description: page.description,
    url,
    inLanguage: 'vi-VN',
    isPartOf: { '@type': 'WebSite', name: 'OTTOPIA', url: siteUrl },
  }).replaceAll('<', '\\u003c')

  const sections = page.sections
    .map(([heading, text]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`)
    .join('')
  const content = `<div id="root"><header><a href="/" aria-label="OTTOPIA - Trang chủ"><img src="/assets/logo_ottopia.webp" alt="OTTOPIA" width="180" height="65"></a><nav aria-label="Điều hướng chính"><a href="/explore">Khám phá</a> <a href="/courses">Khóa học</a> <a href="/parents">Dành cho phụ huynh</a> <a href="/terms">Điều khoản</a></nav></header><main><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.intro)}</p>${sections}</main></div>`

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${url}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta name="twitter:image:alt"[^>]*>/, `<meta name="twitter:image:alt" content="${escapeHtml(page.title)}" />`)
    .replace('</head>', `    <script id="ottopia-page-schema" type="application/ld+json">${schema}</script>\n  </head>`)
    .replace('<div id="root"></div>', content)
}

for (const page of pages) {
  const html = render(page)
  if (page.path === '/') {
    await writeFile(new URL('index.html', distDir), html)
    continue
  }
  const outputDir = join(distPath, page.path.slice(1))
  await mkdir(outputDir, { recursive: true })
  await writeFile(join(outputDir, 'index.html'), html)
}

const notFound = template
  .replace(/<title>.*?<\/title>/s, '<title>Không tìm thấy trang | OTTOPIA</title>')
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />')
  .replace(/\s*<link rel="canonical"[^>]*>/, '')
  .replace('<div id="root"></div>', '<div id="root"><main><h1>Không tìm thấy trang</h1><p>Trang bạn đang tìm không tồn tại hoặc đã được chuyển đi.</p><a href="/">Về trang chủ</a></main></div>')

await writeFile(new URL('404.html', distDir), notFound)
console.log(`Prerendered ${pages.length} public pages and 404.html`)
