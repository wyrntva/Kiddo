import crypto from 'crypto'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

const audioExtensions: Record<string, string> = {
  'audio/mpeg': '.mp3',
  'audio/mp3': '.mp3',
  'audio/x-mp3': '.mp3',
  'audio/wav': '.wav',
  'audio/x-wav': '.wav',
  'audio/mp4': '.m4a',
  'audio/x-m4a': '.m4a',
  'audio/aac': '.aac',
  'audio/ogg': '.ogg',
  'audio/webm': '.webm',
}

export function createAudioUpload(subdirectory = 'voices'): multer.Multer {
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
      const ext = audioExtensions[file.mimetype] || path.extname(file.originalname) || '.mp3'
      callback(null, `${Date.now()}-${crypto.randomBytes(12).toString('hex')}${ext}`)
    },
  })

  return multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, callback) => {
      if (!file.mimetype.startsWith('audio/') && !file.mimetype.startsWith('application/octet-stream')) {
        callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
        return
      }
      callback(null, true)
    },
  })
}
