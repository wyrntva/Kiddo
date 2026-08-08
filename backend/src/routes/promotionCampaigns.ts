import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'

const router = Router()

const BASE_PLANS: Record<string, { name: string; price: number }> = {
  month_1: { name: 'Gói 1 tháng', price: 139000 },
  month_3: { name: 'Gói 6 tháng', price: 499000 },
  month_12: { name: 'Gói 12 tháng', price: 799000 }
}

const convertInputToDisplayDateTime = (dateTimeStr: string) => {
  if (!dateTimeStr) return ''
  const parts = dateTimeStr.split('T')
  if (parts.length !== 2) return dateTimeStr
  const dateParts = parts[0].split('-')
  if (dateParts.length !== 3) return dateTimeStr
  const time = parts[1] // HH:mm
  return `${time} ${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
}

export async function checkAndUpdateCampaigns() {
  const now = new Date()

  try {
    const campaigns = await prisma.promotionCampaign.findMany()

    // 1. Determine which campaigns should be active based on time and manual pause
    const shouldBeActiveCampaigns = campaigns.filter(c => {
      const start = new Date(c.startDate)
      const end = new Date(c.endDate)
      return start <= now && now <= end && !c.isManuallyPaused
    })

    // Sort active campaigns by priority: latest startDate, then latest createdAt
    shouldBeActiveCampaigns.sort((a, b) => {
      const startDiff = new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      if (startDiff !== 0) return startDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // 2. Map plan keys to the campaign that should apply to them (priority to higher ranked campaign)
    const planToCampaignMap: Record<string, typeof campaigns[0]> = {}
    for (const campaign of shouldBeActiveCampaigns) {
      const keys = campaign.targetPlanKeys.split(',')
      for (const key of keys) {
        if (!planToCampaignMap[key]) {
          planToCampaignMap[key] = campaign
        }
      }
    }

    // 3. Update subscription plans based on active campaigns
    const dbPlans = await prisma.subscriptionPlan.findMany()
    for (const plan of dbPlans) {
      const activeCampaign = planToCampaignMap[plan.key]

      if (activeCampaign) {
        const baseName = plan.baseName || BASE_PLANS[plan.key]?.name || plan.name
        const basePrice = plan.basePrice || BASE_PLANS[plan.key]?.price || plan.price
        const discountedPrice = Math.round((basePrice * (100 - activeCampaign.discountPercent)) / 100)

        let cleanCampaignName = activeCampaign.name.trim()
        const duplicateRegex = new RegExp(`^giả?m\\s+${activeCampaign.discountPercent}%(?:\\s*-\\s*)?`, 'i')
        cleanCampaignName = cleanCampaignName.replace(duplicateRegex, '')
        const midDuplicateRegex = new RegExp(`\\s*giả?m\\s+${activeCampaign.discountPercent}%\\s*`, 'gi')
        cleanCampaignName = cleanCampaignName.replace(midDuplicateRegex, '')
        cleanCampaignName = cleanCampaignName.replace(/^[- \s]+|[- \s]+$/g, '')

        const startDisp = convertInputToDisplayDateTime(activeCampaign.startDate)
        const endDisp = convertInputToDisplayDateTime(activeCampaign.endDate)

        const newName = cleanCampaignName
          ? `${baseName} (GIẢM ${activeCampaign.discountPercent}% ${cleanCampaignName} từ ${startDisp} đến ${endDisp})`
          : `${baseName} (GIẢM ${activeCampaign.discountPercent}% từ ${startDisp} đến ${endDisp})`

        if (plan.name !== newName || plan.price !== discountedPrice || !plan.baseName || !plan.basePrice) {
          await prisma.subscriptionPlan.update({
            where: { id: plan.id },
            data: {
              name: newName,
              price: discountedPrice,
              baseName: plan.baseName || baseName,
              basePrice: plan.basePrice || basePrice
            }
          })
        }
      } else {
        const baseName = plan.baseName || BASE_PLANS[plan.key]?.name || plan.name
        const basePrice = plan.basePrice || BASE_PLANS[plan.key]?.price || plan.price
        if (plan.name !== baseName || plan.price !== basePrice || !plan.baseName || !plan.basePrice) {
          await prisma.subscriptionPlan.update({
            where: { id: plan.id },
            data: {
              name: baseName,
              price: basePrice,
              baseName: plan.baseName || baseName,
              basePrice: plan.basePrice || basePrice
            }
          })
        }
      }
    }

    // 4. Update the isActive status of campaigns in DB to keep them in sync
    for (const campaign of campaigns) {
      const shouldBeActive = shouldBeActiveCampaigns.some(c => c.id === campaign.id)
      if (campaign.isActive !== shouldBeActive) {
        await prisma.promotionCampaign.update({
          where: { id: campaign.id },
          data: { isActive: shouldBeActive }
        })
      }
    }
  } catch (error) {
    console.error('[Auto-Campaign] Error in checkAndUpdateCampaigns:', error)
  }
}

// GET /api/promotion-campaigns - List all campaigns
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    await checkAndUpdateCampaigns()
    const campaigns = await prisma.promotionCampaign.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(campaigns)
  } catch (error) {
    console.error('Failed to load campaigns:', error)
    res.status(500).json({ message: 'Không thể tải danh sách chiến dịch' })
  }
})

// POST /api/promotion-campaigns - Create a new campaign
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, discountPercent, startDate, endDate, targetPlanKeys } = req.body

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Tên chiến dịch không hợp lệ' })
  }

  const percent = parseInt(discountPercent, 10)
  if (isNaN(percent) || percent < 0 || percent > 100) {
    return res.status(400).json({ message: 'Mức giảm giá không hợp lệ' })
  }

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Vui lòng cung cấp ngày bắt đầu và kết thúc' })
  }

  if (!targetPlanKeys || !targetPlanKeys.trim()) {
    return res.status(400).json({ message: 'Vui lòng chọn ít nhất một gói áp dụng' })
  }

  try {
    const campaign = await prisma.promotionCampaign.create({
      data: {
        name: name.trim(),
        discountPercent: percent,
        startDate,
        endDate,
        targetPlanKeys: targetPlanKeys.trim(),
        isActive: false
      }
    })
    res.status(201).json(campaign)
  } catch (error) {
    console.error('Failed to create campaign:', error)
    res.status(500).json({ message: 'Không thể tạo chiến dịch khuyến mãi' })
  }
})

// PUT /api/promotion-campaigns/:id/toggle - Activate or deactivate a campaign
router.put('/:id/toggle', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params
  
  try {
    const campaign = await prisma.promotionCampaign.findUnique({ where: { id } })
    if (!campaign) {
      return res.status(404).json({ message: 'Không tìm thấy chiến dịch' })
    }

    const newManuallyPaused = !campaign.isManuallyPaused

    await prisma.promotionCampaign.update({
      where: { id },
      data: {
        isManuallyPaused: newManuallyPaused,
        isActive: newManuallyPaused ? false : campaign.isActive
      }
    })

    // Run synchronization logic to activate/deactivate campaigns and apply plan prices
    await checkAndUpdateCampaigns()

    const updatedCampaign = await prisma.promotionCampaign.findUnique({ where: { id } })
    res.json(updatedCampaign)
  } catch (error) {
    console.error('Failed to toggle campaign:', error)
    res.status(500).json({ message: 'Không thể thay đổi trạng thái chiến dịch' })
  }
})

// DELETE /api/promotion-campaigns/:id - Delete a campaign
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params

  try {
    const campaign = await prisma.promotionCampaign.findUnique({ where: { id } })
    if (!campaign) {
      return res.status(404).json({ message: 'Không tìm thấy chiến dịch' })
    }

    // If campaign was active, restore base prices first
    if (campaign.isActive) {
      const targetKeys = campaign.targetPlanKeys.split(',')
      const dbPlans = await prisma.subscriptionPlan.findMany()

      for (const plan of dbPlans) {
        if (targetKeys.includes(plan.key)) {
          const baseInfo = BASE_PLANS[plan.key]
          if (baseInfo) {
            await prisma.subscriptionPlan.update({
              where: { id: plan.id },
              data: {
                name: baseInfo.name,
                price: baseInfo.price
              }
            })
          }
        }
      }
    }

    await prisma.promotionCampaign.delete({ where: { id } })
    res.json({ message: 'Đã xóa chiến dịch thành công' })
  } catch (error) {
    console.error('Failed to delete campaign:', error)
    res.status(500).json({ message: 'Không thể xóa chiến dịch' })
  }
})

export default router
