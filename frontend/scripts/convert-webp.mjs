import sharp from 'sharp'
import { readdir, unlink, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const assetsDir = new URL('../public/assets', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const files = await readdir(assetsDir)
const pngFiles = files.filter(f => extname(f).toLowerCase() === '.png')

let totalBefore = 0
let totalAfter = 0

for (const file of pngFiles) {
  const input = join(assetsDir, file)
  const output = join(assetsDir, basename(file, '.png') + '.webp')

  const before = (await stat(input)).size
  await sharp(input)
    .webp({ quality: 85 })
    .toFile(output)
  const after = (await stat(output)).size

  totalBefore += before
  totalAfter += after

  const saved = Math.round((1 - after / before) * 100)
  console.log(`✓ ${file}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${saved}%)`)
}

console.log(`\nTổng: ${(totalBefore/1024/1024).toFixed(2)} MB → ${(totalAfter/1024/1024).toFixed(2)} MB  (tiết kiệm ${((totalBefore-totalAfter)/1024/1024).toFixed(2)} MB)`)
console.log(`\n✓ Giữ nguyên file PNG gốc. Bạn có thể xóa thủ công sau khi kiểm tra.`)
