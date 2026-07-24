/**
 * Seed script: Đẩy dữ liệu bài học "Niềm vui của con" lên server
 * Chạy: npx ts-node prisma/seed-niem-vui.ts
 * Hoặc trong Docker: docker exec kiddo_backend node dist/prisma/seed-niem-vui.js
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding lesson "Niềm vui của con"...')

  // 1. Tìm hoặc tạo zone "Cảm xúc"
  let zone = await prisma.zone.findFirst({ where: { name: 'Cảm xúc' } })
  if (!zone) {
    zone = await prisma.zone.findFirst({ where: { name: { contains: 'c' } } })
  }
  if (!zone) {
    zone = await prisma.zone.create({
      data: {
        name: 'Cảm xúc',
        description: 'Vùng đất cảm xúc',
        icon: '😊',
        color: '#FEA01F',
      },
    })
    console.log('  ✅ Created zone "Cảm xúc"')
  }

  // 2. Upsert bài học "Niềm vui của con"
  const existingLesson = await prisma.lesson.findFirst({
    where: { title: 'Niềm vui của con', zoneId: zone.id },
  })

  const lessonData = {
    title: 'Niềm vui của con',
    description: 'Niềm vui của con',
    emoji: '😊',
    img: '/uploads/emotions_lesson_1.jpg',
    level: 'Cơ bản',
    duration: '20 phút',
    stars: 5,
    stepsCount: 5,
    zoneId: zone.id,
    welcomeText:
      'Xin chào bé, Toro đây. Hôm nay Toro sẽ cùng bé học về "Niềm vui của con". Bé đã sẵn sàng chưa nhỉ? Hãy chạm vào nút bắt đầu bên dưới để đi cùng Toro nào',
    preVideoText:
      'Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã vui vì những điều gì nha!',
    postVideoText:
      'Mình vừa xem xong câu chuyện rồi! Bé có thích câu chuyện không nào? Bây giờ, Toro có vài câu hỏi dành cho bé đây. Bé hãy lắng nghe thật kỹ và chọn đáp án đúng nhé!',
    welcomeAudio: '/uploads/voices/gioi_thieu.mp3',
    preVideoAudio: '/uploads/voices/truoc_video.mp3',
    postVideoAudio: '/uploads/voices/sau_video.mp3',
    videoUrl: '/uploads/videos/videobai1.mov',
    postQuestionText:
      'Tadaaa, chúc mừng bé đã hoàn thành bài học hôm nay. Giờ thì hãy cùng Toro giải trí một chút nhé. Nhớ nhìn kỹ màn hình rồi làm theo hướng dẫn nha.',
    postQuestionAudio: '/uploads/voices/1784898985604-df5946d2bffbc7950694a82d.mp3',
  }

  let lesson: { id: string }
  if (existingLesson) {
    lesson = await prisma.lesson.update({
      where: { id: existingLesson.id },
      data: lessonData,
    })
    console.log(`  ✅ Updated lesson "${lessonData.title}" (${lesson.id})`)
  } else {
    lesson = await prisma.lesson.create({ data: lessonData })
    console.log(`  ✅ Created lesson "${lessonData.title}" (${lesson.id})`)
  }

  // 3. Xóa câu hỏi cũ và tạo mới
  await prisma.quizQuestion.deleteMany({ where: { lessonId: lesson.id } })
  console.log('  🗑️  Cleared old quiz questions')

  const questions = [
    {
      prompt:
        'Theo bé, hình nào là khuôn mặt vui của Toro? Bé hãy nhìn thật kỹ rồi chạm vào khuôn mặt đang cười nhé.',
      voiceUrl: '/uploads/voices/1784899517095-06c24ea3ec4a16c4c4b2ad05.mp3',
      correctOptionId: 1,
      options: [
        { id: 1, label: '', sprite: '/uploads/1784899520357-e0cf406cba2f783c05317ab8.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 2, label: '', sprite: '/uploads/1784899523088-d9343aaab90c888f395bf8b1.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 3, label: '', sprite: '/uploads/1784899525652-1e33a814869aba7226ad81c5.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
      ],
    },
    {
      prompt:
        'Vì sao Toro lại cảm thấy vui nhỉ? Bé hãy nhớ lại câu chuyện và chạm vào hình thể hiện điều đã làm Toro vui nha.',
      voiceUrl: '/uploads/voices/1784899569107-9573baba4fb33136f2b3e60b.mp3',
      correctOptionId: 1,
      options: [
        { id: 1, label: '', sprite: '/uploads/1784899555043-9df0b09fecbc667d7af358b5.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 2, label: '', sprite: '/uploads/1784899560896-5480ec40e6d2e0629079070b.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 3, label: '', sprite: '/uploads/1784899564503-4196d28e948dc295f46aae6f.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
      ],
    },
    {
      prompt:
        'Toro vui quá vì đã làm xong chiếc lá! Theo bé, Toro đã làm gì để thể hiện niềm vui của mình nhỉ',
      voiceUrl: '/uploads/voices/1784899593128-8b391199ca1536a67b381acd.mp3',
      correctOptionId: 1,
      options: [
        { id: 1, label: '', sprite: '/uploads/1784899599159-162295f887d05c25e8efda00.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 2, label: '', sprite: '/uploads/1784899601487-015a27f20de5815b06287524.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 3, label: '', sprite: '/uploads/1784899603974-e1471b0e05b7c0a8a2948671.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
      ],
    },
    {
      prompt:
        'Khi Toro đã vẽ xong chiếc lá, cậu cảm thấy rất vui. Toro nên làm gì để các bạn cùng vui với mình nhỉ? Bé hãy chọn hành động đúng theo câu chuyện nhé',
      voiceUrl: '/uploads/voices/1784899617761-454d861be4a84b60c1370fbc.mp3',
      correctOptionId: 1,
      options: [
        { id: 1, label: '', sprite: '/uploads/1784899621796-9636e823dff6af99728e3493.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 2, label: '', sprite: '/uploads/1784899624353-21139435bfe6bc5be7b3e667.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
        { id: 3, label: '', sprite: '/uploads/1784899626514-fbed637102ba00b8192f7c7d.png', style: { top: '0%', left: '0%', width: '100%', height: '100%' } },
      ],
    },
  ]

  for (const q of questions) {
    await prisma.quizQuestion.create({
      data: {
        lessonId: lesson.id,
        prompt: q.prompt,
        voiceUrl: q.voiceUrl,
        correctOptionId: q.correctOptionId,
        options: q.options,
      },
    })
  }

  console.log(`  ✅ Created ${questions.length} quiz questions`)
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
