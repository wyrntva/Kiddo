import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ottopia.vn' },
    update: {},
    create: {
      email: 'admin@ottopia.vn',
      name: 'Admin OTTOPIA',
      password: await bcrypt.hash('Admin@123', 12),
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
      password: await bcrypt.hash('Test@123', 12),
      role: 'CHILD',
      level: 3,
      stars: 120,
      badges: 8,
      lessonsCompleted: 24,
      weeklyProgress: 65,
    },
  })

  console.log('Seeded:', { admin: admin.email, testUser: testUser.email })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
