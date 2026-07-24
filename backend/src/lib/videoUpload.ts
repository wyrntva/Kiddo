import crypto from 'crypto'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

const videoExtensions: Record<string, string> = {
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'video/quicktime': '.mov',
  'video/x-matroska': '.mkv',
  'video/avi': '.avi',
  'video/x-msvideo': '.avi',
}

export function createVideoUpload(subdirectory = 'videos'): multer.Multer {
  const primaryUploadDir = path.resolve(__dirname, '../../uploads', subdirectory)
  const secondaryUploadDir = path.join(process.cwd(), 'uploads', subdirectory)

  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      fs.mkdirSync(primaryUploadDir, { recursive: true })
      try {
        fs.mkdirSync(secondaryUploadDir, { recursive: true })
      } catch {}
      callback(null, primaryUploadDir)
    },
    filename: (_req, file, callback) => {
      const ext = videoExtensions[file.mimetype] || path.extname(file.originalname) || '.mp4'
      callback(null, `${Date.now()}-${crypto.randomBytes(12).toString('hex')}${ext}`)
    },
  })

  return multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, callback) => {
      if (!file.mimetype.startsWith('video/')) {
        callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
        return
      }
      callback(null, true)
    },
  })
}
