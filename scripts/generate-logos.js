// Generate PNG logos for Instagram and social media.
// Run:  node scripts/generate-logos.js
//
// Produces files in /logo-exports/

import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'logo-exports')
mkdirSync(OUT, { recursive: true })

/* ===== SVG building blocks ===== */

// Just the W mark with the green accent dot
const wMark = (size = 200, strokeColor = '#ffffff', accentColor = '#34d399') => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${strokeColor}" />
        <stop offset="1" stop-color="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M4 8L9 24L16 12L23 24L28 8"
          stroke="url(#g)" stroke-width="3.2"
          stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <circle cx="28" cy="8" r="2.4" fill="${accentColor}" />
  </svg>
`

/* ===== 1. Instagram POST 1080x1080 (dark, branded) ===== */
const instagramPost = `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1080" y2="1080" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#0a0a0c" />
        <stop offset="0.5" stop-color="#0d1230" />
        <stop offset="1"   stop-color="#1e1b4b" />
      </linearGradient>
      <radialGradient id="glow" cx="540" cy="420" r="350" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#0066ff" stop-opacity="0.35" />
        <stop offset="1"   stop-color="#0066ff" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="wG" x1="320" y1="280" x2="760" y2="600" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#3b82f6" />
      </linearGradient>
      <linearGradient id="textG" x1="0" y1="0" x2="1080" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#a78bfa" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1080" height="1080" fill="url(#bg)" />
    <rect width="1080" height="1080" fill="url(#glow)" />

    <!-- Subtle grid -->
    <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
      ${Array.from({ length: 18 }).map((_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="1080" />`).join('')}
      ${Array.from({ length: 18 }).map((_, i) => `<line x1="0" y1="${i * 60}" x2="1080" y2="${i * 60}" />`).join('')}
    </g>

    <!-- Halo ring behind W -->
    <circle cx="540" cy="420" r="240" stroke="#0066ff" stroke-opacity="0.35" stroke-width="2" fill="none" />
    <circle cx="540" cy="420" r="280" stroke="#a78bfa" stroke-opacity="0.18" stroke-width="1.5" fill="none" stroke-dasharray="4 8" />

    <!-- W mark (big) -->
    <g transform="translate(320 220) scale(13.75)">
      <path d="M4 8L9 24L16 12L23 24L28 8"
            stroke="url(#wG)" stroke-width="3.2"
            stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="28" cy="8" r="2.4" fill="#34d399" />
    </g>

    <!-- WEBVEN wordmark -->
    <text x="540" y="780" font-family="'Space Grotesk', 'Inter', sans-serif"
          font-size="120" font-weight="900" fill="url(#textG)"
          text-anchor="middle" letter-spacing="-2">WEBVEN</text>

    <!-- Tagline -->
    <text x="540" y="840" font-family="'Inter', sans-serif"
          font-size="22" font-weight="600" fill="#ffffff" fill-opacity="0.5"
          text-anchor="middle" letter-spacing="10">STUDIO</text>

    <!-- Bottom service line -->
    <text x="540" y="960" font-family="'Inter', sans-serif"
          font-size="24" font-weight="500" fill="#ffffff" fill-opacity="0.7"
          text-anchor="middle" letter-spacing="6">WEB DEVELOPMENT · AI SOLUTIONS</text>

    <!-- Corner brackets -->
    <g stroke="#0066ff" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M 60 100 L 60 60 L 100 60" />
      <path d="M 1020 60 L 980 60 M 1020 60 L 1020 100" transform="rotate(0)" />
      <path d="M 60 980 L 60 1020 L 100 1020" />
      <path d="M 1020 1020 L 980 1020 L 1020 980" />
    </g>
  </svg>
`

/* ===== 2. Instagram PROFILE 1080x1080 (will be cropped to circle) ===== */
const instagramProfile = `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg2" x1="0" y1="0" x2="1080" y2="1080" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#0a0a0c" />
        <stop offset="0.5" stop-color="#0d1230" />
        <stop offset="1"   stop-color="#1e1b4b" />
      </linearGradient>
      <radialGradient id="glow2" cx="540" cy="540" r="450" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#0066ff" stop-opacity="0.45" />
        <stop offset="1"   stop-color="#0066ff" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="wG2" x1="240" y1="240" x2="840" y2="840" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#3b82f6" />
      </linearGradient>
    </defs>

    <!-- Full circle bg (safe for Instagram circle crop) -->
    <rect width="1080" height="1080" fill="url(#bg2)" />
    <circle cx="540" cy="540" r="540" fill="url(#glow2)" />

    <!-- Halo rings -->
    <circle cx="540" cy="540" r="380" stroke="#0066ff" stroke-opacity="0.35" stroke-width="3" fill="none" />
    <circle cx="540" cy="540" r="420" stroke="#a78bfa" stroke-opacity="0.2" stroke-width="2" fill="none" stroke-dasharray="6 10" />

    <!-- Centered W mark (huge — fills the safe circle zone) -->
    <g transform="translate(240 220) scale(20)">
      <path d="M4 8L9 24L16 12L23 24L28 8"
            stroke="url(#wG2)" stroke-width="3.2"
            stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="28" cy="8" r="2.4" fill="#34d399" />
    </g>
  </svg>
`

/* ===== 3. White background variant (for light themes) ===== */
const lightVariant = `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wG3" x1="320" y1="280" x2="760" y2="600" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#0a0a0c" />
        <stop offset="1" stop-color="#0066ff" />
      </linearGradient>
    </defs>

    <rect width="1080" height="1080" fill="#ffffff" />

    <!-- Subtle blue glow -->
    <circle cx="540" cy="420" r="350" fill="#0066ff" fill-opacity="0.08" />

    <!-- Halo ring -->
    <circle cx="540" cy="420" r="240" stroke="#0066ff" stroke-opacity="0.3" stroke-width="2" fill="none" />

    <!-- W mark (dark on white) -->
    <g transform="translate(320 220) scale(13.75)">
      <path d="M4 8L9 24L16 12L23 24L28 8"
            stroke="url(#wG3)" stroke-width="3.2"
            stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="28" cy="8" r="2.4" fill="#34d399" />
    </g>

    <!-- WEBVEN text in dark -->
    <text x="540" y="780" font-family="'Space Grotesk', 'Inter', sans-serif"
          font-size="120" font-weight="900" fill="#0a0a0c"
          text-anchor="middle" letter-spacing="-2">WEBVEN</text>

    <text x="540" y="840" font-family="'Inter', sans-serif"
          font-size="22" font-weight="600" fill="#0a0a0c" fill-opacity="0.5"
          text-anchor="middle" letter-spacing="10">STUDIO</text>

    <text x="540" y="960" font-family="'Inter', sans-serif"
          font-size="24" font-weight="500" fill="#0066ff"
          text-anchor="middle" letter-spacing="6">WEB DEVELOPMENT · AI SOLUTIONS</text>
  </svg>
`

/* ===== 4. Transparent W mark only ===== */
const transparentMark = wMark(2048)

/* ===== Generate all variants ===== */
const exports = [
  { name: 'webven-instagram-post.png',           svg: instagramPost,    size: 1080 },
  { name: 'webven-instagram-profile.png',        svg: instagramProfile, size: 1080 },
  { name: 'webven-light.png',                    svg: lightVariant,     size: 1080 },
  { name: 'webven-mark-transparent.png',         svg: transparentMark,  size: 2048 },
  { name: 'webven-mark-512.png',                 svg: wMark(512),       size: 512 },
  { name: 'webven-favicon-256.png',              svg: wMark(256, '#ffffff', '#34d399'), size: 256 },
]

console.log('📦 Generating logo PNGs...\n')

for (const { name, svg, size } of exports) {
  const out = join(OUT, name)
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(out)
  console.log(`✓ ${name}  (${size}×${size})`)
}

console.log(`\n✅ All logos generated in: ${OUT}`)
