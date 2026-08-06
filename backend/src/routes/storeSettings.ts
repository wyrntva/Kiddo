import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate } from '../middleware/authMiddleware'
import { requireAdmin } from '../middleware/security'
import { createImageUpload } from '../lib/imageUpload'

const router = Router()

// Configure multer storage for banners
const upload = createImageUpload('banners')

// Ensure a default StoreSettings row exists
const getOrCreateSettings = async () => {
  let settings = await prisma.storeSettings.findFirst()
  if (!settings) {
    settings = await prisma.storeSettings.create({
      data: {
        id: 1,
        name: 'Kiddo',
        currency: 'VND',
        banner_scoreboard: '[]',
        banner_tournament: '[]',
        footer_description: 'Ottopia đồng hành cùng bé phát triển kỹ năng sống qua những trải nghiệm vui vẻ và ý nghĩa mỗi ngày.',
        footer_copyright: '© 2026 OTTOPIA Learning. All rights reserved.',
        bank_name: 'MB Bank (Ngân hàng Quân đội)',
        bank_account_number: '0842486222',
        bank_account_name: 'KIDDO LEARNING',
        bank_code: 'MB',
      }
    })
  }
  return settings
}

// GET /api/store-settings - Get store settings
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateSettings()
    res.json(settings)
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải thiết lập hệ thống' })
  }
})

// PUT /api/store-settings - Update store settings
router.put('/', authenticate, requireAdmin, async (req, res) => {
  const {
    name, phone, currency, address, province, district, ward, business_type,
    tiktok_url, facebook_url, youtube_url, instagram_url, phone_number, gmail, social_address,
    footer_description, footer_copyright,
    bank_name, bank_account_number, bank_account_name, bank_code
  } = req.body

  try {
    const current = await getOrCreateSettings()
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (phone !== undefined) updateData.phone = phone
    if (currency !== undefined) updateData.currency = currency
    if (address !== undefined) updateData.address = address
    if (province !== undefined) updateData.province = province
    if (district !== undefined) updateData.district = district
    if (ward !== undefined) updateData.ward = ward
    if (business_type !== undefined) updateData.business_type = business_type
    if (tiktok_url !== undefined) updateData.tiktok_url = tiktok_url
    if (facebook_url !== undefined) updateData.facebook_url = facebook_url
    if (youtube_url !== undefined) updateData.youtube_url = youtube_url
    if (instagram_url !== undefined) updateData.instagram_url = instagram_url
    if (phone_number !== undefined) updateData.phone_number = phone_number
    if (gmail !== undefined) updateData.gmail = gmail
    if (social_address !== undefined) updateData.social_address = social_address
    if (footer_description !== undefined) updateData.footer_description = footer_description
    if (footer_copyright !== undefined) updateData.footer_copyright = footer_copyright
    if (bank_name !== undefined) updateData.bank_name = bank_name
    if (bank_account_number !== undefined) updateData.bank_account_number = bank_account_number
    if (bank_account_name !== undefined) updateData.bank_account_name = bank_account_name
    if (bank_code !== undefined) updateData.bank_code = bank_code

    const updated = await prisma.storeSettings.update({
      where: { id: current.id },
      data: updateData
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Không thể cập nhật thiết lập' })
  }
})

// POST /api/store-settings/banner/:type - Upload banner
router.post('/banner/:type', authenticate, requireAdmin, upload.single('file'), async (req, res) => {
  const { type } = req.params
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được chọn' })
  }

  const filePath = `/uploads/banners/${req.file.filename}`

  try {
    const current = await getOrCreateSettings()
    
    if (type === 'scoreboard' || type === 'tournament') {
      const field = type === 'scoreboard' ? 'banner_scoreboard' : 'banner_tournament'
      let banners: string[] = []
      try {
        const value = current[field]
        if (value) {
          const parsed = JSON.parse(value)
          if (Array.isArray(parsed)) banners = parsed
        }
      } catch {
        if (current[field]) banners = [current[field] as string]
      }
      banners.push(filePath)

      const updated = await prisma.storeSettings.update({
        where: { id: current.id },
        data: { [field]: JSON.stringify(banners) }
      })
      return res.json(updated)
    } else {
      const field = type === 'ranking' ? 'banner_ranking' : 'banner_member'
      const updated = await prisma.storeSettings.update({
        where: { id: current.id },
        data: { [field]: filePath }
      })
      return res.json(updated)
    }
  } catch (error) {
    res.status(500).json({ message: 'Không thể tải banner lên' })
  }
})

// DELETE /api/store-settings/banner/:type/:index - Delete a banner from list
router.delete('/banner/:type/:index', authenticate, requireAdmin, async (req, res) => {
  const { type, index } = req.params
  const bannerIndex = parseInt(index, 10)

  try {
    const current = await getOrCreateSettings()
    if (type === 'scoreboard' || type === 'tournament') {
      const field = type === 'scoreboard' ? 'banner_scoreboard' : 'banner_tournament'
      let banners: string[] = []
      try {
        const value = current[field]
        if (value) {
          const parsed = JSON.parse(value)
          if (Array.isArray(parsed)) banners = parsed
        }
      } catch {
        if (current[field]) banners = [current[field] as string]
      }

      banners.splice(bannerIndex, 1)

      const updated = await prisma.storeSettings.update({
        where: { id: current.id },
        data: { [field]: JSON.stringify(banners) }
      })
      return res.json(updated)
    }
    res.status(400).json({ message: 'Không hỗ trợ loại banner này' })
  } catch (error) {
    res.status(500).json({ message: 'Xóa banner thất bại' })
  }
})

// DELETE /api/store-settings/banner/:type - Delete single banner
router.delete('/banner/:type', authenticate, requireAdmin, async (req, res) => {
  const { type } = req.params
  try {
    const current = await getOrCreateSettings()
    const field = type === 'ranking' ? 'banner_ranking' : 'banner_member'
    const updated = await prisma.storeSettings.update({
      where: { id: current.id },
      data: { [field]: null }
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Xóa banner thất bại' })
  }
})

export default router
