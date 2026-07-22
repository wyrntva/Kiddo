import sharp from 'sharp'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(root, 'src')

async function walk(directory, output = []) {
  for (const name of await readdir(directory)) {
    const path = join(directory, name)
    const info = await stat(path)
    if (info.isDirectory()) await walk(path, output)
    else output.push(path)
  }
  return output
}

const sourceFiles = (await walk(srcDir)).filter((path) => ['.ts', '.tsx', '.css'].includes(extname(path)))
const replacements = new Map()
let bytesBefore = 0
let bytesAfter = 0

for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, 'utf8')
  for (const match of source.matchAll(/(?<!\.)\/assets\/[^'"\s)]+\.png/gi)) {
    const assetUrl = match[0]
    if (replacements.has(assetUrl)) continue

    const input = join(root, 'public', assetUrl)
    const output = input.replace(/\.png$/i, '.webp')
    const outputUrl = assetUrl.replace(/\.png$/i, '.webp')
    const inputSize = (await stat(input)).size

    try {
      await stat(output)
    } catch {
      await sharp(input).webp({ quality: 82, effort: 5 }).toFile(output)
    }

    const outputSize = (await stat(output)).size
    if (outputSize < inputSize * 0.9) {
      replacements.set(assetUrl, outputUrl)
      bytesBefore += inputSize
      bytesAfter += outputSize
    }
  }
}

let changedFiles = 0
for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, 'utf8')
  let optimized = source
  for (const [from, to] of replacements) optimized = optimized.replaceAll(from, to)
  if (optimized !== source) {
    await writeFile(sourceFile, optimized)
    changedFiles += 1
  }
}

console.log(`Optimized ${replacements.size} referenced images in ${changedFiles} source files`)
console.log(`Referenced transfer: ${(bytesBefore / 1024 / 1024).toFixed(2)} MB -> ${(bytesAfter / 1024 / 1024).toFixed(2)} MB`)
