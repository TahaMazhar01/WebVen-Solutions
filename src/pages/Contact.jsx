import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Check, ArrowUpRight } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const budgets = ['< $5k', '$5k – $15k', '$15k – $50k', '$50k+']
const interests = ['Web', 'Mobile', 'SEO', 'Branding', 'Other']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    interest: '',
    message: '',
  })

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageWrapper>
      <section className="container-x py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          {/* Left: intro + info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-ink-900" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-ink-500">
                Contact
              </span>
            </div>
            <h1 className="heading-lg mb-6">
              Let's build something <span className="gradient-text animate-shimmer">great.</span>
            </h1>
            <p className="text-lg text-ink-500 leading-relaxed mb-10">
              Tell us about your project. We typically reply within one business day
              with next steps or a friendly heads-up.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:hello@webven.studio"
                className="flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-ink-900 text-white flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-400 mb-0.5">Email</p>
                  <p className="font-medium">hello@webven.studio</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ink-900 text-white flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-400 mb-0.5">Phone</p>
                  <p className="font-medium">+1 (555) 010-0420</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ink-900 text-white flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-400 mb-0.5">Studio</p>
                  <p className="font-medium">Remote · Worldwide</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-ink-50">
              <p className="text-sm text-ink-700 leading-relaxed">
                <strong className="text-ink-900">Working hours:</strong> Mon–Fri, 9am–6pm (GMT).
                We respond within one business day.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-ink-200 bg-gradient-to-br from-white to-indigo-50/30 p-6 sm:p-8 md:p-10"
            >
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                    <Check size={28} />
                  </div>
                  <h3 className="heading-md mb-3">Message sent!</h3>
                  <p className="text-ink-500 max-w-sm mx-auto">
                    Thanks for reaching out. We'll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Your name" value={form.name} onChange={update('name')} required />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      required
                    />
                  </div>

                  <Field
                    label="Company (optional)"
                    value={form.company}
                    onChange={update('company')}
                  />

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-500 mb-3 font-medium">
                      Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            form.budget === b
                              ? 'bg-ink-900 text-white border-ink-900'
                              : 'border-ink-200 text-ink-600 hover:border-ink-400'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-500 mb-3 font-medium">
                      I'm interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm({ ...form, interest: b })}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            form.interest === b
                              ? 'bg-ink-900 text-white border-ink-900'
                              : 'border-ink-200 text-ink-600 hover:border-ink-400'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-500 mb-2 font-medium">
                      Tell us about your project
                    </label>
                    <textarea
                      value={form.message}
                      onChange={update('message')}
                      required
                      rows={5}
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900 transition-colors resize-none"
                      placeholder="Goals, timeline, links — anything that helps us help you."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center mt-4">
                    Send message <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-ink-500 mb-2 font-medium">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-ink-200 px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900 transition-colors"
      />
    </div>
  )
}
