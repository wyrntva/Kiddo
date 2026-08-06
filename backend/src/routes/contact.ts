import { Router } from 'express'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

const router = Router()

// POST /api/contact - Send contact request email
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ các thông tin bắt buộc.' })
  }

  // Backup: Save message to local JSON file inside uploads folder
  try {
    const uploadDir = path.join(__dirname, '../../uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    const backupFile = path.join(uploadDir, 'contact_submissions.json')
    let submissions = []
    if (fs.existsSync(backupFile)) {
      const fileData = fs.readFileSync(backupFile, 'utf8')
      submissions = JSON.parse(fileData || '[]')
    }
    submissions.push({
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString()
    })
    fs.writeFileSync(backupFile, JSON.stringify(submissions, null, 2), 'utf8')
  } catch (err) {
    console.error('Lỗi lưu bản sao lời nhắn:', err)
  }

  const smtpUser = process.env.SMTP_USER || 'ottopiaforkids@gmail.com'
  const smtpPass = process.env.SMTP_PASS // Gmail app password

  // If SMTP credentials are not set, we cannot send email
  if (!smtpPass) {
    console.warn('Gmail SMTP_PASS chưa được cấu hình trong file .env. Không thể gửi email thực tế.')
    return res.json({ 
      success: true, 
      message: 'Lời nhắn đã được ghi nhận hệ thống (Chờ cấu hình SMTP để gửi mail).' 
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // port 465 is secure
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    const mailOptions = {
      from: `"OTTOPIA Contact Form" <${smtpUser}>`,
      to: 'ottopiaforkids@gmail.com',
      replyTo: email,
      subject: `[OTTOPIA] Yêu cầu liên hệ mới từ ${name}`,
      text: `Yêu cầu liên hệ mới từ phụ huynh:\n\n- Họ và tên: ${name}\n- Email: ${email}\n- Số điện thoại: ${phone}\n- Lời nhắn: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d8edfa; border-radius: 12px; background-color: #f8faff;">
          <h2 style="color: #004c6e; border-bottom: 2px solid #fea01f; padding-bottom: 8px;">Yêu cầu liên hệ mới từ OTTOPIA</h2>
          <p>Chào ban quản trị OTTOPIA, bạn vừa nhận được một yêu cầu liên hệ mới từ phụ huynh:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; font-weight: bold; width: 30%; border-bottom: 1px solid #eef5fa;">Họ và tên:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eef5fa;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef5fa;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eef5fa;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef5fa;">Số điện thoại:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eef5fa;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
          </table>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #fea01f; margin-top: 15px;">
            <strong style="color: #3e484f;">Nội dung lời nhắn:</strong>
            <p style="margin: 8px 0 0 0; white-space: pre-wrap; color: #575e70;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center; border-top: 1px solid #eef5fa; padding-top: 15px;">
            Hệ thống thông báo tự động từ trang web OTTOPIA.
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Gửi yêu cầu liên hệ thành công!' })
  } catch (error: any) {
    console.error('Lỗi khi gửi email qua Nodemailer:', error)
    res.status(500).json({ message: 'Không thể gửi email. Lỗi hệ thống.' })
  }
})

export default router
