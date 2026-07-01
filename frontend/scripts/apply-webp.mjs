/**
 * 1. Fix double-encoded UTF-8 (PowerShell CP1252 bug)
 * 2. Replace /assets/*.png → /assets/*.webp in all TSX files + index.html
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import iconv from 'iconv-lite'

function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, exts, files)
    else if (exts.includes(extname(entry).toLowerCase())) files.push(full)
  }
  return files
}

function fixAndReplace(filePath) {
  const raw = readFileSync(filePath)

  // Detect BOM (EF BB BF) — written by PS 5.1 with -Encoding utf8
  const hasBOM = raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF

  // Detect partial-fix artifact (EF BF BD = U+FFFD replacement char at byte 0)
  const hasFFD = raw[0] === 0xEF && raw[1] === 0xBF && raw[2] === 0xBD

  let content

  if (hasBOM) {
    // PS wrote UTF-8 WITH BOM; the text is CP1252-chars encoded as UTF-8
    // Strip BOM, decode as UTF-8 → get CP1252 code points → encode as CP1252 bytes → decode as UTF-8
    const garbled = raw.slice(3).toString('utf8')
    const bytes = iconv.encode(garbled, 'cp1252')
    content = bytes.toString('utf8')
    console.log(`  [encoding fixed] ${filePath.split('\\').pop()}`)
  } else if (hasFFD) {
    // Partial fix was already applied; U+FFFD replaced unrecoverable bytes.
    // We cannot fully recover these, but the ASCII/common Vietnamese chars are intact.
    // Just strip the leading U+FFFD and continue.
    content = raw.toString('utf8').replace(/^�/, '')
    console.log(`  [BOM stripped] ${filePath.split('\\').pop()}`)
  } else {
    content = raw.toString('utf8')
  }

  // Replace /assets/*.png → /assets/*.webp
  const updated = content.replace(/\/assets\/([^"'\s]+)\.png/g, '/assets/$1.webp')

  if (updated !== content || hasBOM || hasFFD) {
    writeFileSync(filePath, updated, 'utf8')
    return true
  }
  return false
}

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const srcDir = join(root, 'src')
const indexHtml = join(root, 'index.html')

const files = walk(srcDir, ['.tsx', '.ts'])
let count = 0
for (const f of files) {
  if (fixAndReplace(f)) {
    count++
    console.log(`✓ ${f.split('\\').pop()}`)
  }
}

// index.html
if (fixAndReplace(indexHtml)) {
  console.log('✓ index.html')
  count++
}

console.log(`\n✓ Done: ${count} files processed`)
