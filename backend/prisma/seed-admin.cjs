const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const password = process.env.ADMIN_PASSWORD || 'admin123456'
  const hash = await bcrypt.hash(password, 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@ottopia.vn' },
    update: { password: hash, role: 'ADMIN' },
    create: {
      email: 'admin@ottopia.vn',
      name: 'Admin OTTOPIA',
      password: hash,
      role: 'ADMIN',
      level: 10,
      stars: 999,
      badges: 50,
    },
  })
  console.log('SUCCESS_ADMIN_UPDATED:', user.email, 'with password:', password)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
