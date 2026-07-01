import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import iconv from 'iconv-lite'

// PowerShell 5.1 read the UTF-8 files as CP1252 (Windows ANSI) then wrote
// them back as UTF-8 with BOM. To reverse:
// 1. Read garbled file as raw bytes (skip BOM if present)
// 2. Decode those bytes as UTF-8 → get the CP1252-interpreted Unicode chars
// 3. Re-encode those chars as CP1252 bytes → recover original UTF-8 bytes
// 4. Decode those bytes as UTF-8 → get the original Vietnamese text
function fixCP1252toUTF8(filePath) {
  const raw = readFileSync(filePath)
  // Strip UTF-8 BOM if present (EF BB BF)
  const content = (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF)
    ? raw.slice(3).toString('utf8')
    : raw.toString('utf8')

  // Re-encode as CP1252 bytes, then decode as UTF-8
  const cp1252Bytes = iconv.encode(content, 'cp1252')
  return cp1252Bytes.toString('utf8')
}

function isGarbled(filePath) {
  const raw = readFileSync(filePath)
  // Check for BOM (sign of PS 5.1 UTF-8 write)
  if (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) return true
  // Also check for common garbled Vietnamese patterns
  const str = raw.toString('utf8')
  return /Ã[¡-¿]|á»|áº/.test(str)
}

function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full, exts, files)
    } else if (exts.includes(extname(entry).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

const srcDir = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const indexHtml = new URL('../index.html', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const tsxFiles = walk(srcDir, ['.tsx', '.ts'])

let processed = 0

for (const file of tsxFiles) {
  let content

  if (isGarbled(file)) {
    content = fixCP1252toUTF8(file)
    console.log(`  fix encoding: ${file.split('\\').pop()}`)
  } else {
    content = readFileSync(file, 'utf8')
  }

  // Replace /assets/*.png → /assets/*.webp
  const newContent = content.replace(/\/assets\/([^"'\s]+)\.png/g, '/assets/$1.webp')

  if (newContent !== content || isGarbled(file)) {
    writeFileSync(file, newContent, 'utf8')
    processed++
    console.log(`✓ ${file.split('\\').pop()}`)
  }
}

// Fix index.html
let html
if (isGarbled(indexHtml)) {
  html = fixCP1252toUTF8(indexHtml)
} else {
  html = readFileSync(indexHtml, 'utf8')
}
const newHtml = html.replace(/\/assets\/([^"'\s]+)\.png/g, '/assets/$1.webp')
if (newHtml !== html || isGarbled(indexHtml)) {
  writeFileSync(indexHtml, newHtml, 'utf8')
  console.log('✓ index.html')
}

console.log(`\n✓ Đã xử lý ${processed} files`)
