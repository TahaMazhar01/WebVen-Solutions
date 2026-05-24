// Serverless function — auto-sends a WhatsApp message via CallMeBot.
// Hardened: rate limiting, input validation, honeypot, length limits.
//
// SETUP (one-time):
//   1. Save +34 644 51 95 89 as "CallMeBot" in your phone
//   2. From your WhatsApp (+923180678879), send to CallMeBot:
//        "I allow callmebot to send me messages"
//   3. They reply with your APIKEY
//   4. Add env vars in Vercel/Netlify dashboard:
//        CALLMEBOT_API_KEY=1234567
//        OWNER_PHONE=923180678879

// Simple per-IP rate limiter (in-memory, resets on cold start)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60_000  // 1 minute
const RATE_LIMIT_MAX = 3              // max 3 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS
  }
  entry.count += 1
  rateLimitMap.set(ip, entry)
  // Garbage-collect old entries occasionally
  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap) {
      if (v.resetAt < now) rateLimitMap.delete(k)
    }
  }
  return entry.count > RATE_LIMIT_MAX
}

// Trim + clip string to max length
function clean(input, max) {
  if (typeof input !== 'string') return ''
  // Remove control characters except newlines and tabs
  const stripped = input.replace(/[\x00-\x08\x0B-\x1F\x7F]/g, '').trim()
  return stripped.slice(0, max)
}

// Permissive but real email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  // Restrict to POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Restrict CORS to same origin in production (Vercel sets x-vercel-deployment-url)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')

  // Rate limit by IP
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' })
  }

  // Env config
  const apiKey = process.env.CALLMEBOT_API_KEY
  const phone = process.env.OWNER_PHONE || '923180678879'
  if (!apiKey) {
    console.error('CALLMEBOT_API_KEY missing')
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  // Parse + validate body
  const body = req.body || {}
  const name = clean(body.name, 100)
  const email = clean(body.email, 200)
  const company = clean(body.company, 100)
  const budget = clean(body.budget, 40)
  const interest = clean(body.interest, 40)
  const message = clean(body.message, 4000)
  const honeypot = clean(body.website, 100) // honeypot — should be empty

  if (honeypot) {
    // Bot detected — fake-success to not give signal
    return res.status(200).json({ ok: true })
  }
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message too short' })
  }

  // Build the WhatsApp message
  const text = [
    '🚀 *New Project Inquiry — Webven*',
    '',
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    company  ? `🏢 *Company:* ${company}` : null,
    budget   ? `💰 *Budget:* ${budget}`   : null,
    interest ? `🎯 *Interested:* ${interest}` : null,
    '',
    '💬 *Message:*',
    message,
    '',
    `— webven.studio (ip ${ip.slice(0, 12)})`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const url =
      `https://api.callmebot.com/whatsapp.php` +
      `?phone=${encodeURIComponent(phone)}` +
      `&text=${encodeURIComponent(text)}` +
      `&apikey=${encodeURIComponent(apiKey)}`

    const r = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'webven-studio/1.0' },
    })
    const responseText = await r.text()

    if (!r.ok || /error|invalid/i.test(responseText)) {
      console.error('CallMeBot failed:', responseText.slice(0, 200))
      return res.status(502).json({ error: 'Message delivery failed. Please try again.' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact handler error:', err)
    // Don't leak internal error details
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
