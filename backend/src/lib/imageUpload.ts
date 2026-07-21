import crypto from 'crypto'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

const imageExtensions: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
}

export function createImageUpload(subdirectory = ''): multer.Multer {
  const uploadDir = path.join(process.cwd(), 'uploads', subdirectory)
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      fs.mkdirSync(uploadDir, { recursive: true })
      callback(null, uploadDir)
    },
    filename: (_req, file, callback) => {
      const extension = imageExtensions[file.mimetype]
      callback(null, `${Date.now()}-${crypto.randomBytes(12).toString('hex')}${extension}`)
    },
  })

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, callback) => {
      if (!imageExtensions[file.mimetype]) {
        callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
        return
      }
      callback(null, true)
    },
  })
}
