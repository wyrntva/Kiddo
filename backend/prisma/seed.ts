import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  const testPassword = process.env.SEED_TEST_PASSWORD
  if (!adminPassword || adminPassword.length < 12 || !testPassword || testPassword.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD and SEED_TEST_PASSWORD must each contain at least 12 characters')
  }

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ottopia.vn' },
    update: {},
    create: {
      email: 'admin@ottopia.vn',
      name: 'Admin OTTOPIA',
      password: await bcrypt.hash(adminPassword, 12),
      role: 'ADMIN',
      level: 10,
      stars: 999,
      badges: 50,
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'test@ottopia.vn' },
    update: {},
    create: {
      email: 'test@ottopia.vn',
      phone: '0901234567',
      name: 'Bé Ottie',
      parentName: 'Nguyễn Văn A',
      password: await bcrypt.hash(testPassword, 12),
      role: 'CHILD',
      level: 3,
      stars: 120,
      badges: 8,
      lessonsCompleted: 24,
      weeklyProgress: 65,
    },
  })

  // Seed Zones (the 5 lands)
  console.log('Seeding Zones and Lessons...')
  await prisma.lesson.deleteMany()
  await prisma.zone.deleteMany()

  const zonesData = [
    { name: 'Vùng Đất Cảm Xúc', desc: 'Nhận biết, hiểu rõ và gọi tên cảm xúc', color: '#339e4a', img: '/assets/vung_dat_cam_xuc_island.webp', key: 'emotion' },
    { name: 'Khu Vườn Bạn Bè', desc: 'Nuôi dưỡng sẻ chia, quan tâm, hợp tác.', color: '#e55c72', img: '/assets/khu_vuon_ban_be_island.webp', key: 'friendship' },
    { name: 'Thành Phố Giao Tiếp', desc: 'Rèn luyện giao tiếp, lắng nghe và tự tin.', color: '#0a7ad8', img: '/assets/thanh_pho_giao_tiep_island.webp', key: 'communication' },
    { name: 'Ngôi Làng Tự Lập', desc: 'Học cách tự chăm sóc bản thân và tự lập.', color: '#fea01f', img: '/assets/ngoi_lang_tu_lap_island.webp', key: 'independence' },
    { name: 'Hành Tinh Tình Huống', desc: 'Khám phá tình huống thực tế, đưa ra lựa chọn.', color: '#9560d8', img: '/assets/hanh_tinh_tinh_huong_island.webp', key: 'situation' },
  ]

  const zones: Record<string, any> = {}
  for (const z of zonesData) {
    zones[z.key] = await prisma.zone.create({ data: z })
  }

  // Seed Lessons
  const lessonsData = [
    // Vùng Đất Cảm Xúc
    { title: 'Niềm vui của con', zoneKey: 'emotion', emoji: '😊', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5, img: '/uploads/emotions_lesson_1.jpg' },
    { title: 'Nỗi buồn bé nhỏ', zoneKey: 'emotion', emoji: '😢', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5, img: '/uploads/emotions_lesson_2.jpg' },
    { title: 'Cơn giận đang tới', zoneKey: 'emotion', emoji: '😤', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5, img: '/uploads/emotions_lesson_3.jpg' },
    { title: 'Khi con thấy sợ', zoneKey: 'emotion', emoji: '😰', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5, img: '/uploads/emotions_lesson_4.jpg' },
    { title: 'Nói ra cảm xúc của mình', zoneKey: 'emotion', emoji: '🗣️', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5, img: '/uploads/emotions_lesson_5.jpg' },

    // Khu Vườn Bạn Bè
    { title: 'Biết cách chia sẻ', zoneKey: 'friendship', emoji: '🎁', level: 'Cơ bản', duration: '22 phút', stars: 5, stepsCount: 5 },
    { title: 'Lắng nghe bạn bè', zoneKey: 'friendship', emoji: '👂', level: 'Cơ bản', duration: '22 phút', stars: 5, stepsCount: 5 },
    { title: 'Hợp tác nhóm', zoneKey: 'friendship', emoji: '🤝', level: 'Cơ bản', duration: '22 phút', stars: 5, stepsCount: 5 },
    { title: 'Giải quyết xung đột', zoneKey: 'friendship', emoji: '🕊️', level: 'Cơ bản', duration: '22 phút', stars: 5, stepsCount: 5 },
    { title: 'Cảm thông và giúp đỡ', zoneKey: 'friendship', emoji: '❤️', level: 'Cơ bản', duration: '22 phút', stars: 5, stepsCount: 5 },

    // Thành Phố Giao Tiếp
    { title: 'Con biết chào hỏi', zoneKey: 'communication', emoji: '👋', level: 'Cơ bản', duration: '24 phút', stars: 5, stepsCount: 5 },
    { title: 'Con nói lời cảm ơn', zoneKey: 'communication', emoji: '🙏', level: 'Cơ bản', duration: '24 phút', stars: 5, stepsCount: 5 },
    { title: 'Con nói lời xin lỗi', zoneKey: 'communication', emoji: '🙇', level: 'Cơ bản', duration: '24 phút', stars: 5, stepsCount: 5 },
    { title: 'Con biết lắng nghe', zoneKey: 'communication', emoji: '👂', level: 'Cơ bản', duration: '24 phút', stars: 5, stepsCount: 5 },
    { title: 'Con biết nhờ giúp đỡ', zoneKey: 'communication', emoji: '🙋', level: 'Cơ bản', duration: '24 phút', stars: 5, stepsCount: 5 },

    // Ngôi Làng Tự Lập
    { title: 'Tự dọn dẹp đồ chơi', zoneKey: 'independence', emoji: '🧹', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Tự mặc quần áo', zoneKey: 'independence', emoji: '👕', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Giữ gìn vệ sinh cá nhân', zoneKey: 'independence', emoji: '🧼', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Giúp đỡ việc nhà nhỏ', zoneKey: 'independence', emoji: '🏠', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Tự chuẩn bị đồ dùng', zoneKey: 'independence', emoji: '🎒', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },

    // Hành Tinh Tình Huống
    { title: 'Khi bị lạc đường', zoneKey: 'situation', emoji: '🗺️', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Gặp người lạ nói chuyện', zoneKey: 'situation', emoji: '👥', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Ứng phó khi xảy ra hỏa hoạn', zoneKey: 'situation', emoji: '🔥', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Sử dụng thiết bị điện an toàn', zoneKey: 'situation', emoji: '⚡', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
    { title: 'Gọi điện số khẩn cấp', zoneKey: 'situation', emoji: '📞', level: 'Cơ bản', duration: '20 phút', stars: 5, stepsCount: 5 },
  ]

  const initialQuestions: Record<string, Array<{ prompt: string, correctOptionId: number, options: any[] }>> = {
    'Niềm vui của con': [
      {
        prompt: 'Theo con, lúc này Toro đang cảm thấy thế nào?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Vui', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Buồn', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Sợ hãi', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ],
    'Nỗi buồn bé nhỏ': [
      {
        prompt: 'Theo con, lúc chiếc diều bị rách, Toro đang cảm thấy thế nào?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Buồn', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 2, label: 'Vui', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 3, label: 'Tức giận', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      },
      {
        prompt: 'Điều gì khiến Toro cảm thấy buồn?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Chiếc diều bị rách', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 2, label: 'Toro được tặng quà', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 3, label: 'Toro được cô giáo khen', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      },
      {
        prompt: 'Khi buồn, Toro nên làm gì để cảm thấy dễ chịu hơn?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Nói với Bunny rằng mình đang buồn', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Bỏ đi một mình', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Giấu chiếc diều đi', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      },
      {
        prompt: 'Toro có thể chia sẻ nỗi buồn với ai?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Bunny', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Cái cây', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Chiếc ghế', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ],
    'Cơn giận đang tới': [
      {
        prompt: 'Việc nào dưới đây thường khiến các bạn nhỏ cảm thấy vui?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Chơi cùng bạn bè', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Bị giành đồ chơi', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Làm hỏng món đồ yêu thích', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ],
    'Khi con thấy sợ': [
      {
        prompt: 'Nếu là Toro, con sẽ làm gì tiếp theo?',
        correctOptionId: 1,
        options: [
          { id: 1, label: 'Kể cho Bunny nghe niềm vui của mình', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
          { id: 2, label: 'Giấu bức tranh đi', sprite: '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png', style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
          { id: 3, label: 'Chê tranh của bạn khác', sprite: '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png', style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
        ]
      }
    ]
  }

  for (const l of lessonsData) {
    const zone = zones[l.zoneKey]
    if (zone) {
      const createdLesson = await prisma.lesson.create({
        data: {
          title: l.title,
          emoji: l.emoji,
          img: (l as any).img || '',
          level: l.level,
          duration: l.duration,
          stars: l.stars,
          stepsCount: l.stepsCount,
          zoneId: zone.id,
        }
      })

      // If we have questions for this lesson, seed them
      const questions = initialQuestions[l.title]
      if (questions) {
        for (const q of questions) {
          await prisma.quizQuestion.create({
            data: {
              prompt: q.prompt,
              correctOptionId: q.correctOptionId,
              options: q.options as any,
              lessonId: createdLesson.id
            }
          })
        }
      }
    }
  }

  // Seed Subscription Plans
  console.log('Seeding Subscription Plans...')
  const plansData = [
    {
      key: 'month_1',
      name: 'Gói 1 tháng',
      price: 99000,
      period: '/ tháng',
      isPopular: false,
      features: [
        'Đầy đủ bài học',
        'Cập nhật nội dung mới',
        'Nhận sao sau mỗi bài',
        'Linh hoạt từng tháng'
      ]
    },
    {
      key: 'month_3',
      name: 'Gói 3 tháng',
      price: 79000,
      period: '/ tháng',
      isPopular: true,
      features: [
        'Học lại không giới hạn',
        'Cập nhật nội dung mới',
        'Theo dõi tiến độ & sao thưởng',
        'Tiết kiệm hơn 20%'
      ]
    },
    {
      key: 'month_12',
      name: 'Gói 12 tháng',
      price: 49000,
      period: '/ tháng',
      isPopular: false,
      features: [
        'Học không giới hạn cả năm',
        'Cập nhật nội dung mới',
        'Lưu hành trình & huy hiệu',
        'Tiết kiệm hơn 40%'
      ]
    }
  ]

  for (const plan of plansData) {
    await prisma.subscriptionPlan.upsert({
      where: { key: plan.key },
      update: {},
      create: {
        key: plan.key,
        name: plan.name,
        price: plan.price,
        period: plan.period,
        isPopular: plan.isPopular,
        features: plan.features
      }
    })
  }

  console.log('Seeded:', { admin: admin.email, testUser: testUser.email })
  console.log('Seeded 5 zones and 12 lessons successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
