import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, MapPin, Phone, Check, ArrowUpRight, User, Building2, MessageSquare,
  Globe2, Smartphone, TrendingUp, Sparkles, MoreHorizontal,
  Wallet, BadgeDollarSign, CreditCard, Banknote,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import BubbleText from '../components/BubbleText'

const budgets = [
  { value: '< $5k',     label: 'Under $5k',     hint: 'Landing page',     icon: Wallet },
  { value: '$5k-$15k',  label: '$5k – $15k',    hint: 'Small website',    icon: BadgeDollarSign },
  { value: '$15k-$50k', label: '$15k – $50k',   hint: 'Full project',     icon: CreditCard },
  { value: '$50k+',     label: '$50k+',         hint: 'Enterprise',       icon: Banknote },
]

const interests = [
  { value: 'Web',      label: 'Web Design',  icon: Globe2 },
  { value: 'Mobile',   label: 'Mobile App',  icon: Smartphone },
  { value: 'SEO',      label: 'SEO & Growth',icon: TrendingUp },
  { value: 'Branding', label: 'Branding',    icon: Sparkles },
  { value: 'Other',    label: 'Something else', icon: MoreHorizontal },
]

// Input limits (must match server-side limits in api/contact.js)
const LIMITS = { name: 100, email: 200, company: 100, message: 4000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    budget: '', interest: '', message: '',
    website: '', // honeypot — must stay empty
  })

  const update = (k) => (e) => {
    setError('')
    const max = LIMITS[k]
    const val = max ? e.target.value.slice(0, max) : e.target.value
    setForm({ ...form, [k]: val })
  }

  const submit = (e) => {
    e.preventDefault()

    // Honeypot check — silently bail if bot filled hidden field
    if (form.website) {
      setSent(true)
      return
    }

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (form.message.trim().length < 10) {
      setError('Please tell us a bit more about your project (10+ characters).')
      return
    }

    setSubmitting(true)

    // Build a nicely formatted WhatsApp message
    const lines = [
      '🚀 *New Project Inquiry — Webven*',
      '',
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      form.company ? `🏢 *Company:* ${form.company}` : null,
      form.budget   ? `💰 *Budget:* ${form.budget}`   : null,
      form.interest ? `🎯 *Interested in:* ${form.interest}` : null,
      '',
      '💬 *Message:*',
      form.message,
      '',
      '— Sent from webven.studio contact form',
    ]
      .filter(Boolean)
      .join('\n')

    const waUrl = `https://wa.me/923180678879?text=${encodeURIComponent(lines)}`

    // Brief delay for UX, then open WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
      setSent(true)
      setSubmitting(false)
    }, 700)
  }

  return (
    <PageWrapper>
      <section className="container-x py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          {/* === LEFT: intro + info === */}
          <div className="lg:col-span-5">
            <span className="eyebrow mb-5">
              <Sparkles size={12} /> Get in touch
            </span>
            <h1 className="heading-lg mb-6 text-white">
              <BubbleText>
                Let's build something <span className="gradient-text">great.</span>
              </BubbleText>
            </h1>
            <p className="text-base sm:text-lg text-white/65 leading-relaxed mb-10">
              Tell us about your project. We typically reply within one business day
              with next steps or a friendly heads-up.
            </p>

            <div className="space-y-4">
              <ContactRow
                icon={Mail}
                label="Email"
                value="hello@webven.studio"
                href="mailto:hello@webven.studio"
              />
              <ContactRow icon={Phone} label="Phone" value="+1 (555) 010-0420" href="tel:+15550100420" />
              <ContactRow icon={MapPin} label="Studio" value="Remote · Worldwide" />
            </div>

            <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-ink-50 to-blue-50/40 border border-ink-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 font-semibold">
                  Currently available
                </p>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">
                <strong className="text-ink-900">Mon–Fri</strong>, 9am–6pm GMT.
                We respond within one business day.
              </p>
            </div>
          </div>

          {/* === RIGHT: form === */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl p-[1px] bg-gradient-to-br from-accent/40 via-violet-400/30 to-accent/40 shadow-2xl shadow-accent/10"
            >
              <div className="relative rounded-[23px] bg-white p-6 sm:p-8 lg:p-10 overflow-hidden">
                {/* Decorative background blob */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                        className="relative w-20 h-20 mx-auto mb-7"
                      >
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                          <Check size={32} strokeWidth={3} />
                        </div>
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="heading-md mb-3"
                      >
                        WhatsApp opened!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="text-ink-500 max-w-sm mx-auto mb-2"
                      >
                        Your message is ready in WhatsApp. Just hit <strong className="text-ink-900">send</strong> there to finish.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="text-xs text-ink-400 mb-7"
                      >
                        We typically reply within one business day.
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => {
                          setSent(false)
                          setForm({ name: '', email: '', company: '', budget: '', interest: '', message: '' })
                        }}
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        Send another message →
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative space-y-7"
                    >
                      {/* Step header */}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-semibold text-lg">Project brief</h3>
                        <span className="text-xs text-ink-400 font-mono tracking-wider">01 / 03</span>
                      </div>

                      {/* Section 1: Personal info */}
                      <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FloatField
                            icon={User}
                            label="Your name"
                            value={form.name}
                            onChange={update('name')}
                            required
                          />
                          <FloatField
                            icon={Mail}
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={update('email')}
                            required
                          />
                        </div>
                        <FloatField
                          icon={Building2}
                          label="Company (optional)"
                          value={form.company}
                          onChange={update('company')}
                        />
                      </div>

                      {/* Divider */}
                      <div className="border-t border-ink-100 pt-7">
                        <div className="flex items-center justify-between mb-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-ink-500 font-semibold">
                            What's your budget?
                          </p>
                          <span className="text-xs text-ink-400 font-mono tracking-wider">02 / 03</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {budgets.map((b) => {
                            const Icon = b.icon
                            const active = form.budget === b.value
                            return (
                              <button
                                type="button"
                                key={b.value}
                                onClick={() => setForm({ ...form, budget: b.value })}
                                className={`group relative flex items-start gap-3 p-4 rounded-2xl border transition-all duration-300 text-left ${
                                  active
                                    ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10'
                                    : 'border-ink-100 hover:border-ink-300 hover:bg-ink-50/50'
                                }`}
                              >
                                <span
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    active ? 'bg-accent text-white' : 'bg-ink-50 text-ink-600'
                                  }`}
                                >
                                  <Icon size={16} />
                                </span>
                                <div className="min-w-0">
                                  <div className={`text-sm font-semibold ${active ? 'text-accent' : 'text-ink-900'}`}>
                                    {b.label}
                                  </div>
                                  <div className="text-xs text-ink-500 mt-0.5">{b.hint}</div>
                                </div>
                                {active && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center"
                                  >
                                    <Check size={11} strokeWidth={3} />
                                  </motion.span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Section 3: Interest */}
                      <div className="border-t border-ink-100 pt-7">
                        <div className="flex items-center justify-between mb-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-ink-500 font-semibold">
                            What are you interested in?
                          </p>
                          <span className="text-xs text-ink-400 font-mono tracking-wider">03 / 03</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((b) => {
                            const Icon = b.icon
                            const active = form.interest === b.value
                            return (
                              <button
                                type="button"
                                key={b.value}
                                onClick={() => setForm({ ...form, interest: b.value })}
                                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                                  active
                                    ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20'
                                    : 'border-ink-200 text-ink-700 hover:border-ink-400'
                                }`}
                              >
                                <Icon size={14} />
                                {b.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="border-t border-ink-100 pt-7">
                        <FloatField
                          as="textarea"
                          icon={MessageSquare}
                          label="Tell us about your project"
                          value={form.message}
                          onChange={update('message')}
                          required
                          rows={5}
                          placeholder="Goals, timeline, links — anything that helps us help you."
                        />
                      </div>

                      {/* Honeypot — hidden from real users, bots fill it */}
                      <div className="absolute opacity-0 pointer-events-none -left-[9999px]" aria-hidden="true">
                        <label htmlFor="website">Website (leave blank)</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={update('website')}
                        />
                      </div>

                      {/* Error message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700"
                        >
                          {error}
                        </motion.div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={!submitting ? { y: -2 } : {}}
                        whileTap={!submitting ? { y: 0 } : {}}
                        className="relative w-full rounded-2xl bg-gradient-to-r from-ink-900 via-ink-900 to-accent text-white py-4 font-semibold overflow-hidden group disabled:opacity-70 transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30"
                      >
                        {/* Sweep on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative flex items-center justify-center gap-2">
                          {submitting ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send message
                              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </motion.button>

                      <p className="text-center text-xs text-ink-400">
                        By submitting, you agree to our{' '}
                        <a href="#" className="text-ink-700 hover:text-accent underline">privacy policy</a>.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

// ===== Floating-label field =====
function FloatField({ icon: Icon, label, as = 'input', rows = 5, ...props }) {
  const isTextarea = as === 'textarea'
  const Cmp = isTextarea ? 'textarea' : 'input'
  const hasValue = props.value && String(props.value).length > 0

  return (
    <div className="relative group">
      <Cmp
        {...props}
        rows={isTextarea ? rows : undefined}
        placeholder={props.placeholder || ' '}
        className={`peer w-full bg-ink-50/40 border border-ink-100 rounded-xl ${
          Icon ? 'pl-11' : 'pl-4'
        } pr-4 ${isTextarea ? 'pt-7 pb-3' : 'pt-6 pb-2'} text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all duration-200 ${
          isTextarea ? 'resize-none' : ''
        }`}
      />
      {Icon && (
        <span
          className={`absolute left-3.5 ${
            isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'
          } text-ink-400 peer-focus:text-accent transition-colors`}
        >
          <Icon size={18} />
        </span>
      )}
      <label
        className={`absolute ${Icon ? 'left-11' : 'left-4'} pointer-events-none origin-left transition-all duration-200 ${
          hasValue
            ? 'top-2 text-[10px] uppercase tracking-[0.16em] text-accent font-semibold'
            : 'top-1/2 -translate-y-1/2 text-sm text-ink-400'
        } peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-accent peer-focus:font-semibold`}
        style={isTextarea && !hasValue ? { top: '20px', transform: 'none' } : undefined}
      >
        {label}
      </label>
    </div>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="w-11 h-11 rounded-xl bg-ink-900 text-white flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:rotate-3 transition-all duration-300">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-400 mb-0.5 font-semibold">{label}</p>
        <p className="font-medium text-ink-900 group-hover:text-accent transition-colors">{value}</p>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block">{inner}</a>
  ) : (
    <div>{inner}</div>
  )
}
