const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding plans...');
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
  ];

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
    });
  }
  console.log('Seeding plans completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
