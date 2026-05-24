// Vercel/Netlify serverless function — auto-sends a WhatsApp message
// when a contact form is submitted, using CallMeBot (free).
//
// SETUP STEPS (one-time, takes 2 minutes):
//   1. Save +34 644 51 95 89 in your phone as "CallMeBot"
//   2. From your WhatsApp (+923180678879), send this exact message:
//        "I allow callmebot to send me messages"
//   3. CallMeBot replies with your API key. Example:
//        "API Activated for your phone number. Your APIKEY is 1234567"
//   4. Add this env var in Vercel / Netlify:
//        CALLMEBOT_API_KEY=1234567
//        OWNER_PHONE=923180678879
//
// Deploy to Vercel (free):
//   $ npm i -g vercel
//   $ vercel
//
// Frontend can then POST to /api/contact with the form JSON
// and the message will arrive on your WhatsApp instantly.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.CALLMEBOT_API_KEY
  const phone = process.env.OWNER_PHONE || '923180678879'

  if (!apiKey) {
    return res.status(500).json({
      error: 'CALLMEBOT_API_KEY not set. See setup steps in /api/contact.js',
    })
  }

  const { name, email, company, budget, interest, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const text = [
    '🚀 *New Project Inquiry — Webven*',
    '',
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    company  ? `🏢 *Company:* ${company}`   : null,
    budget   ? `💰 *Budget:* ${budget}`     : null,
    interest ? `🎯 *Interested:* ${interest}` : null,
    '',
    '💬 *Message:*',
    message,
    '',
    '— webven.studio',
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const url =
      `https://api.callmebot.com/whatsapp.php` +
      `?phone=${encodeURIComponent(phone)}` +
      `&text=${encodeURIComponent(text)}` +
      `&apikey=${encodeURIComponent(apiKey)}`

    const r = await fetch(url)
    const body = await r.text()

    if (!r.ok || /error/i.test(body)) {
      return res.status(502).json({ error: 'WhatsApp send failed', detail: body })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
