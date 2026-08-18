import { Router, Request, Response, NextFunction } from 'express'
import OpenAI from 'openai'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { verifyAccessToken } from '../lib/jwt'

const router = Router()

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(2000),
})

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
})

const ZONE_ROUTES: Record<string, string> = {
  emotion: '/zone/emotions',
  friendship: '/zone/friends',
  communication: '/zone/communication',
  independence: '/zone/independence',
  situation: '/zone/situations',
}

function cleanCatalogText(value: string, maxLength = 500) {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function getUserIdFromReq(req: Request): string | null {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  const token = authHeader.slice(7).trim()
  if (!token) return null
  try {
    const payload = verifyAccessToken(token)
    return payload.userId || null
  } catch {
    return null
  }
}

async function getLearningCatalogPrompt() {
  const [zones, plans] = await Promise.all([
    prisma.zone.findMany({
      select: {
        name: true,
        desc: true,
        key: true,
        lessons: {
          select: {
            title: true,
            description: true,
            level: true,
            duration: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.subscriptionPlan.findMany({
      select: {
        name: true,
        price: true,
        period: true,
        durationMonths: true,
        features: true,
      },
      orderBy: { price: 'asc' },
    }),
  ])

  const catalog = zones.map((zone, zoneIndex) => ({
    order: zoneIndex + 1,
    name: cleanCatalogText(zone.name, 120),
    description: cleanCatalogText(zone.desc, 400),
    key: cleanCatalogText(zone.key, 80),
    route: ZONE_ROUTES[zone.key] || '/explore',
    lessons: zone.lessons.map((lesson, lessonIndex) => ({
      order: lessonIndex + 1,
      title: cleanCatalogText(lesson.title, 160),
      description: cleanCatalogText(lesson.description, 500),
      level: cleanCatalogText(lesson.level, 80),
      duration: cleanCatalogText(lesson.duration, 80),
    })),
  }))

  const formattedPlans = plans.map((p) => ({
    name: cleanCatalogText(p.name, 100),
    price: `${p.price.toLocaleString('vi-VN')} VNĐ`,
    period: cleanCatalogText(p.period, 50),
    durationMonths: p.durationMonths,
    features: (p.features as string[]) || [],
  }))

  return `DỮ LIỆU TỪ DATABASE OTTOPIA:

1. DANH SÁCH KHÓA HỌC / GÓI HỌC HỌC PHÍ (Dùng khi người dùng hỏi "khóa học", "gói học", "học phí", "bảng giá", "đăng ký khóa học"):
${JSON.stringify(formattedPlans, null, 2)}

2. DANH SÁCH VÙNG ĐẤT & BÀI HỌC KỸ NĂNG (Dùng khi người dùng hỏi "bài học", "chủ đề", "vùng đất", "lộ trình học kỹ năng"):
${JSON.stringify(catalog, null, 2)}`
}

const SYSTEM_PROMPT = `Bạn tên là Toro 🦦, trợ lý AI siêu dễ thương của OTTOPIA - nền tảng giáo dục kỹ năng sống cho trẻ em.

QUY TẮC XƯNG HÔ & PHONG CÁCH — BẮT BUỘC
- BẮT BUỘC: Xưng là "con" (vd: "Con chào ba mẹ 💖", "Con gợi ý ba mẹ...", "Con có thể giúp gì cho ba mẹ ạ? 🌟"). TUYỆT ĐỐI không xưng "mình", "em", "tôi" hay "Toro".
- BẮT BUỘC: Luôn gọi phụ huynh/người dùng là "ba mẹ".
- CỰC KỲ NGẮN GỌN: Trả lời ngắn súc tích, tối đa 2 đến 3 câu hoặc 2-3 gạch đầu dòng ngắn! TUYỆT ĐỐI KHÔNG viết câu dài dòng, văn tự lê thê.
- EMOJI SINH ĐỘNG: Luôn kèm emoji thân thiện vui vẻ (vd: 🌟, ✨, 🦦, 💖, 🚀, 📚, 😊, 💡) để tạo sự ấm áp, ngoan ngoãn và hào hứng.

PHÂN BIỆT RÕ THUẬT NGỮ OTTOPIA (RẤT QUAN TRỌNG!):
1. KHÓA HỌC / GÓI HỌC (Subscription Plans):
   - Khi ba mẹ hỏi "có những khóa học nào", "gói học nào", "bảng giá", "đăng ký khóa học", "học phí":
   - KHÔNG ĐƯỢC trả lời danh sách Vùng đất hay bài học!
   - Hãy trả lời danh sách các GÓI HỌC (Gói 1 tháng, 6 tháng, 1 năm...) từ Database kèm giá tiền & thời hạn.
   - Luôn đính kèm đường dẫn: [Xem gói học](https://ottopia.vn/courses) 📚.

2. VÙNG ĐẤT / BÀI HỌC (Zones & Lessons):
   - Là các khu vực rèn luyện kỹ năng (Vùng Đất Cảm Xúc, Khu Vườn Bạn Bè, Thành Phố Giao Tiếp...).
   - Chỉ nói về Vùng đất khi ba mẹ hỏi "bài học", "chủ đề kỹ năng", "lộ trình rèn luyện".

3. ĐĂNG KÝ TÀI KHOẢN MỚI:
   - Chỉ hướng dẫn tạo tài khoản khi hỏi "đăng ký tài khoản", "tạo tài khoản new":
     • Truy cập [Đăng ký tài khoản](https://ottopia.vn/register) hoặc [Đăng nhập với Google](https://ottopia.vn/login) 🚀.

CÁCH ĐƯA LINK HƯỚNG DẪN THAO TÁC (BẮT BUỘC)
- Luôn dùng cú pháp link ngắn gọn có nhãn rõ ràng:
  • Gói học / Khóa học: [Xem gói học](https://ottopia.vn/courses)
  • Đăng ký tài khoản: [Đăng ký tài khoản](https://ottopia.vn/register)
  • Đăng nhập: [Đăng nhập ngay](https://ottopia.vn/login)
  • Khám phá bài học: [Khám phá ngay](https://ottopia.vn/explore)
- TUYỆT ĐỐI KHÔNG viết dạng URL thô hay chữ "đây". Viết nhãn ngắn gọn, rõ ràng!

Tên miền chính thức luôn là https://ottopia.vn.`

// ── GET USER CHAT HISTORY ──
router.get('/history', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      res.status(401).json({ message: 'Bạn cần đăng nhập để xem lịch sử chat' })
      return
    }

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    res.json({
      messages: messages.map((msg) => ({
        id: msg.id,
        role: msg.sender === 'USER' ? 'user' : 'assistant',
        text: msg.text,
        sender: msg.sender,
        createdAt: msg.createdAt,
      })),
    })
  } catch (error) {
    next(error)
  }
})

// ── DELETE USER CHAT HISTORY ──
router.delete('/history', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      res.status(401).json({ message: 'Bạn cần đăng nhập để xóa lịch sử chat' })
      return
    }

    await prisma.chatMessage.deleteMany({
      where: { userId },
    })

    res.json({ message: 'Đã xóa lịch sử trò chuyện thành công' })
  } catch (error) {
    next(error)
  }
})

// ── POST AI LESSON SUGGESTIONS (AI STUDIO - DÀNH CHO PHỤ HUYNH) ──
const lessonSuggestionSchema = z.object({
  lessonTitle: z.string().optional().default('Bài học kỹ năng'),
  strengths: z.array(z.string()).optional().default([]),
  practice: z.array(z.string()).optional().default([]),
  tips: z.array(z.string()).optional().default([]),
})

function generateFallbackLessonSuggestions(
  lessonTitle: string,
  practice: string[],
  tips: string[],
  _strengths: string[]
) {
  const parentGuides = (tips.length > 0
    ? tips
    : ['Dành 5-10 phút trò chuyện và lắng nghe chia sẻ của bé mỗi ngày.']
  ).slice(0, 4).map((tip, index) => {
    const titles = [
      'Khoảnh khắc kết nối và đồng cảm',
      'Câu hỏi gợi mở trong sinh hoạt hàng ngày',
      'Cùng con gọi tên và thấu hiểu cảm xúc',
      'Khích lệ và khen ngợi hành vi tích cực',
    ]
    const tipsPractical = [
      'Lắng nghe chăm chú bằng ánh mắt và không vội ngắt lời khi bé đang nói.',
      'Đặt câu hỏi mở để con tự do trải lòng về cảm xúc trong ngày.',
      'Chia sẻ cảm xúc của chính ba mẹ một cách tự nhiên để làm gương cho con.',
      'Khen ngợi cụ thể nỗ lực của bé khi con biết biểu đạt cảm xúc phù hợp.',
    ]
    return {
      id: `parent-${index + 1}`,
      title: titles[index % titles.length],
      description: tip,
      tip: tipsPractical[index % tipsPractical.length],
    }
  })

  return {
    title: 'Gợi ý đồng hành dành cho ba mẹ',
    summary: `Dựa trên các kỹ năng trong bài học "${lessonTitle}", Toro tổng hợp những gợi ý thực tế để ba mẹ đồng hành và hỗ trợ bé rèn luyện tốt hơn mỗi ngày.`,
    parentGuides,
    toroMessage: 'Mỗi khoảnh khắc trò chuyện và đồng hành của ba mẹ là bước đệm quý giá giúp con tự tin và thấu hiểu cảm xúc hơn.',
  }
}

router.post('/lesson-suggestions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = lessonSuggestionSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ message: 'Dữ liệu bài học không hợp lệ' })
      return
    }

    const { lessonTitle, strengths, practice, tips } = parsed.data

    if (!process.env.OPENAI_API_KEY) {
      const fallback = generateFallbackLessonSuggestions(lessonTitle, practice, tips, strengths)
      res.json(fallback)
      return
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const promptInstructions = `Bạn là Toro - Chuyên gia tâm lý và sư phạm giáo dục kỹ năng sống cho trẻ em của nền tảng giáo dục OTTOPIA.

Dữ liệu bài học bé vừa hoàn thành:
- Tên bài học: "${lessonTitle}"
- Điểm mạnh bé đã đạt: ${JSON.stringify(strengths)}
- CẦN LUYỆN TẬP THÊM: ${JSON.stringify(practice)}
- GỢI Ý CHO PHỤ HUYNH TỪ BÀI HỌC: ${JSON.stringify(tips)}

NHIỆM VỤ:
Dựa kỹ vào nội dung "CẦN LUYỆN TẬP THÊM" và "GỢI Ý CHO PHỤ HUYNH", hãy tạo các gợi ý đồng hành chuyên sâu, thực tế và dễ áp dụng dành riêng cho BA MẸ của bé (phụ huynh):
1. "parentGuides": Mảng 3-4 gợi ý hành động, câu hỏi gợi mở, hoạt động sinh hoạt gia đình thực tế để ba mẹ hỗ trợ bé khắc phục các điểm bé còn yếu và phát huy thế mạnh. Mỗi mục gồm:
   - "id": string (vd "1", "2")
   - "title": string (Tiêu đề ngắn gọn, rõ ràng, tuyệt đối KHÔNG chứa emoji hoặc icon)
   - "description": string (Hướng dẫn chi tiết cách ba mẹ tương tác, trò chuyện với con, 2-3 câu súc tích, không chứa emoji)
   - "tip": string (Mẹo nhỏ thực tế, hữu ích khi ba mẹ áp dụng cùng bé, không chứa emoji)
2. "title": "Gợi ý đồng hành dành cho ba mẹ" (Không chứa emoji/icon)
3. "summary": Tóm tắt ngắn gọn 1-2 câu nhận xét tích cực và định hướng cho ba mẹ (Không chứa emoji/icon)
4. "toroMessage": Lời nhắn nhủ ngắn gọn, ấm áp và động viên gửi đến ba mẹ (Không chứa emoji/icon)

QUY ĐỊNH BẮT BUỘC:
- TUYỆT ĐỐI KHÔNG sử dụng icon hoặc emoji trong toàn bộ văn bản phản hồi.
- Trả về ĐÚNG ĐỊNH DẠNG JSON thuần túy (không bọc text ngoài JSON).
- Cấu trúc JSON:
{
  "title": "Gợi ý đồng hành dành cho ba mẹ",
  "summary": "Tóm tắt ngắn gọn cho ba mẹ...",
  "parentGuides": [
    {
      "id": "1",
      "title": "Tên hoạt động hoặc phương pháp",
      "description": "Hướng dẫn cụ thể cho ba mẹ...",
      "tip": "Mẹo nhỏ cho ba mẹ..."
    }
  ],
  "toroMessage": "Lời nhắn gửi ba mẹ..."
}`

    try {
      let jsonText = ''
      try {
        const completion = await client.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are Toro, an expert child education AI. Always output valid JSON without any emojis or icons.',
            },
            { role: 'user', content: promptInstructions },
          ],
          response_format: { type: 'json_object' },
          max_tokens: 1000,
          temperature: 0.7,
        })
        jsonText = completion.choices[0]?.message?.content?.trim() || ''
      } catch {
        const resp = await client.responses.create({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          instructions: 'You are Toro, an expert child education AI. Always output valid JSON without any emojis or icons.',
          input: promptInstructions,
          max_output_tokens: 1000,
        })
        jsonText = resp.output_text?.trim() || ''
      }

      if (jsonText) {
        const cleaned = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
        const parsedJson = JSON.parse(cleaned)
        if (parsedJson && Array.isArray(parsedJson.parentGuides) && parsedJson.parentGuides.length > 0) {
          res.json(parsedJson)
          return
        }
      }
    } catch (aiErr) {
      console.warn('OpenAI lesson-suggestions error, using fallback:', aiErr)
    }

    const fallback = generateFallbackLessonSuggestions(lessonTitle, practice, tips, strengths)
    res.json(fallback)
  } catch (error) {
    next(error)
  }
})

// ── POST AI CHAT MESSAGE ──
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserIdFromReq(req)
    if (!userId) {
      res.status(401).json({ message: 'Ba mẹ vui lòng đăng nhập để chat với AI nhé!' })
      return
    }

    const parsed = chatRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ message: 'Nội dung trò chuyện không hợp lệ' })
      return
    }

    const lastUserMessage = parsed.data.messages.filter((m) => m.role === 'user').pop()
    if (lastUserMessage) {
      await prisma.chatMessage.create({
        data: {
          userId,
          sender: 'USER',
          text: lastUserMessage.content,
        },
      })
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(503).json({ message: 'Trợ lý AI chưa được cấu hình trên máy chủ' })
      return
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const learningCatalogPrompt = await getLearningCatalogPrompt()

    // Fetch recent 20 messages for context from DB
    const dbMessages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    const orderedDbMessages = dbMessages.reverse()

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      instructions: `${SYSTEM_PROMPT}\n\n${learningCatalogPrompt}`,
      input: orderedDbMessages.map((m) => ({
        role: m.sender === 'USER' ? 'user' : 'assistant',
        content: m.text,
      })),
      max_output_tokens: 500,
    })

    const reply = response.output_text.trim()
    if (!reply) {
      res.status(502).json({ message: 'Trợ lý AI chưa tạo được câu trả lời' })
      return
    }

    await prisma.chatMessage.create({
      data: {
        userId,
        sender: 'BOT',
        text: reply,
      },
    })

    res.json({ reply })
  } catch (error) {
    next(error)
  }
})

// ── ADMIN: GET ALL CONVERSATIONS ──
const getAdminConversations = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const usersWithMessages = await prisma.user.findMany({
      where: {
        chatMessages: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isPaid: true,
        isPendingPaid: true,
        chatMessages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { chatMessages: true },
        },
      },
    })

    const conversations = usersWithMessages
      .map((u) => ({
        id: u.id,
        name: u.name,
        parentName: u.parentName,
        email: u.email,
        phone: u.phone,
        avatar: u.avatar,
        role: u.role,
        isPaid: u.isPaid,
        isPendingPaid: u.isPendingPaid,
        totalMessages: u._count.chatMessages,
        lastMessage: u.chatMessages[0] || null,
      }))
      .sort((a, b) => {
        const timeA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0
        const timeB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0
        return timeB - timeA
      })

    res.json({ conversations })
  } catch (error) {
    next(error)
  }
}

router.get('/admin/conversations', authenticate, requireAdmin, getAdminConversations)
router.get('/conversations', authenticate, requireAdmin, getAdminConversations)

// ── ADMIN: GET CONVERSATION MESSAGES FOR USER ──
const getAdminConversationDetail = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        parentName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isPaid: true,
        childAge: true,
        gender: true,
      },
    })

    if (!targetUser) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' })
      return
    }

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    res.json({ user: targetUser, messages })
  } catch (error) {
    next(error)
  }
}

router.get('/admin/conversations/:userId', authenticate, requireAdmin, getAdminConversationDetail)
router.get('/conversations/:userId', authenticate, requireAdmin, getAdminConversationDetail)

// ── ADMIN: REPLY TO USER CONVERSATION ──
const replyAdminConversation = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const { text } = req.body

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ message: 'Nội dung tin nhắn không được để trống' })
      return
    }

    const message = await prisma.chatMessage.create({
      data: {
        userId,
        sender: 'ADMIN',
        text: text.trim(),
      },
    })

    res.json({ message })
  } catch (error) {
    next(error)
  }
}

router.post('/admin/conversations/:userId/reply', authenticate, requireAdmin, replyAdminConversation)
router.post('/conversations/:userId/reply', authenticate, requireAdmin, replyAdminConversation)

export default router
