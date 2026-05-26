// Generate favicon + PWA icon pack
// Run:  node scripts/generate-favicons.js

import sharp from 'sharp'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

// Rounded-square branded W (matches the favicon.svg)
const baseSvg = (size = 512, withRadius = true, paddingPct = 0) => {
  const pad = (size * paddingPct) / 100
  const inner = size - 2 * pad
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
        <stop offset="0"    stop-color="#0a0a0c"/>
        <stop offset="0.55" stop-color="#0066ff"/>
        <stop offset="1"    stop-color="#3b82f6"/>
      </linearGradient>
      <linearGradient id="w" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#dbeafe"/>
      </linearGradient>
    </defs>

    ${withRadius
      ? `<rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${inner * 0.22}" ry="${inner * 0.22}" fill="url(#bg)"/>`
      : `<rect width="${size}" height="${size}" fill="url(#bg)"/>`}

    <!-- W mark, centered & scaled to inner area -->
    <g transform="translate(${pad + inner * 0.1875} ${pad + inner * 0.28125}) scale(${(inner * 0.625) / 40})">
      <path d="M0 0 L8 28 L20 8 L32 28 L40 0"
            stroke="url(#w)" stroke-width="6"
            stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="40" cy="0" r="4.4" fill="#34d399"/>
    </g>
  </svg>
  `
}

const exports = [
  // Standard browser favicons
  { name: 'favicon-16.png',          size: 16,   svg: baseSvg(64) },
  { name: 'favicon-32.png',          size: 32,   svg: baseSvg(64) },
  { name: 'favicon-48.png',          size: 48,   svg: baseSvg(64) },
  { name: 'favicon-96.png',          size: 96,   svg: baseSvg(96) },
  // Apple Touch Icon (iOS home screen)
  { name: 'apple-touch-icon.png',    size: 180,  svg: baseSvg(180) },
  // PWA Android home screen
  { name: 'icon-192.png',            size: 192,  svg: baseSvg(192) },
  { name: 'icon-512.png',            size: 512,  svg: baseSvg(512) },
  // Maskable icon — uses safe zone (80% inside, no rounded corners)
  { name: 'icon-512-maskable.png',   size: 512,  svg: baseSvg(512, false, 12) },
  // Microsoft tile
  { name: 'mstile-270.png',          size: 270,  svg: baseSvg(270) },
]

console.log('📦 Generating favicon + PWA icon pack...\n')

for (const { name, size, svg } of exports) {
  const out = join(PUBLIC, name)
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(out)
  console.log(`✓ ${name}  (${size}×${size})`)
}

console.log(`\n✅ All icons generated in: ${PUBLIC}`)
