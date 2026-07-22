import sharp from 'sharp'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

async function walk(directory, output = []) {
  for (const name of await readdir(directory)) {
    const path = join(directory, name)
    const info = await stat(path)
    if (info.isDirectory()) await walk(path, output)
    else output.push(path)
  }
  return output
}

let changedFiles = 0
let changedImages = 0

for (const file of (await walk(join(root, 'src'))).filter((path) => path.endsWith('.tsx'))) {
  const source = await readFile(file, 'utf8')
  let changedInFile = 0
  const output = await replaceAsync(source, /<img\b[\s\S]*?>/g, async (tag) => {
    if (/\bwidth=/.test(tag) || /\bheight=/.test(tag)) return tag
    const sourceMatch = tag.match(/\bsrc=["'](\/assets\/[^"']+)["']/)
    if (!sourceMatch || !/\.(png|jpe?g|webp|gif|svg)$/i.test(sourceMatch[1])) return tag
    try {
      const metadata = await sharp(join(root, 'public', sourceMatch[1])).metadata()
      if (!metadata.width || !metadata.height) return tag
      changedInFile += 1
      changedImages += 1
      return tag.replace('<img', `<img width="${metadata.width}" height="${metadata.height}"`)
    } catch {
      return tag
    }
  })
  if (changedInFile) {
    await writeFile(file, output)
    changedFiles += 1
  }
}

console.log(`Added intrinsic dimensions to ${changedImages} images in ${changedFiles} files`)

async function replaceAsync(input, expression, replacer) {
  const matches = [...input.matchAll(expression)]
  const replacements = await Promise.all(matches.map((match) => replacer(match[0])))
  let cursor = 0
  let output = ''
  matches.forEach((match, index) => {
    output += input.slice(cursor, match.index) + replacements[index]
    cursor = match.index + match[0].length
  })
  return output + input.slice(cursor)
}
