const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const email = 'poolarena.vn@gmail.com'
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.log(`USER_NOT_FOUND: User with email ${email} was not found.`)
    return
  }

  console.log('USER_FOUND_BEFORE_UPDATE:', {
    email: user.email,
    name: user.name,
    isPaid: user.isPaid,
    isPendingPaid: user.isPendingPaid,
    paidUntil: user.paidUntil,
    subscriptionPlanId: user.subscriptionPlanId,
    role: user.role
  })

  // Set paidUntil to 10 years in the future
  const farFutureDate = new Date()
  farFutureDate.setFullYear(farFutureDate.getFullYear() + 10)

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      isPaid: true,
      paidUntil: farFutureDate,
      // If there's a subscription plan ID we can assign it, or keep the existing one if present
      subscriptionPlanId: user.subscriptionPlanId || 'premium_yearly'
    }
  })

  console.log('USER_UPDATED:', {
    email: updatedUser.email,
    name: updatedUser.name,
    isPaid: updatedUser.isPaid,
    isPendingPaid: updatedUser.isPendingPaid,
    paidUntil: updatedUser.paidUntil,
    subscriptionPlanId: updatedUser.subscriptionPlanId,
    role: updatedUser.role
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
