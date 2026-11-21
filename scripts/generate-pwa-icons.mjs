import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'icons')

const BG = '#0c0c0e'
const ACCENT = '#ff7a1a'

function svgLabel(size, label, maskable) {
  const padding = maskable ? Math.round(size * 0.2) : Math.round(size * 0.12)
  const fontSize = Math.round(size * 0.28)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <rect x="${padding}" y="${padding}" width="${size - padding * 2}" height="${size - padding * 2}" rx="${Math.round(size * 0.12)}" fill="${ACCENT}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="${BG}" font-family="Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="${fontSize}" font-weight="700">${label}</text>
</svg>`
}

async function writeIcon(name, size, maskable) {
  const buffer = await sharp(Buffer.from(svgLabel(size, 'WG', maskable))).png().toBuffer()
  await writeFile(path.join(outDir, name), buffer)
}

await mkdir(outDir, { recursive: true })
await writeIcon('icon-192.png', 192, false)
await writeIcon('icon-512.png', 512, false)
await writeIcon('icon-maskable-512.png', 512, true)

console.log('PWA icons written to public/icons')