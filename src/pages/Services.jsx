import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Globe2,
  Smartphone,
  TrendingUp,
  Palette,
  Zap,
  Sparkles,
  Check,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import IconBubble from '../components/IconBubble'

const services = [
  {
    icon: Globe2,
    variant: 'default',
    title: 'Web Development',
    desc: 'Modern, lightning-fast websites built with React, Next.js, and the JAMstack.',
    features: ['Custom design', 'CMS integration', 'Performance optimization', 'A/B ready'],
    price: 'From $4,500',
  },
  {
    icon: Smartphone,
    variant: 'violet',
    title: 'Mobile Apps',
    desc: 'Native-feeling iOS & Android apps built with React Native or Flutter.',
    features: ['iOS + Android', 'Push notifications', 'Offline-first', 'App Store launch'],
    price: 'From $12,000',
  },
  {
    icon: TrendingUp,
    variant: 'emerald',
    title: 'SEO & Growth',
    desc: 'Technical SEO, content strategy, and analytics that grow your traffic.',
    features: ['Technical audit', 'Keyword strategy', 'Content plan', 'Monthly reporting'],
    price: 'From $1,800/mo',
  },
  {
    icon: Palette,
    variant: 'rose',
    title: 'UI/UX Design',
    desc: 'Beautiful, accessible interfaces that users love and convert better.',
    features: ['Figma design system', 'User flows', 'Prototyping', 'Design QA'],
    price: 'From $3,200',
  },
  {
    icon: Zap,
    variant: 'amber',
    title: 'Performance',
    desc: 'Make your existing site 3–5x faster. Core Web Vitals, bundle size, lazy loading.',
    features: ['Lighthouse audit', 'Code splitting', 'Image optimization', 'CDN setup'],
    price: 'From $1,500',
  },
  {
    icon: Sparkles,
    variant: 'sky',
    title: 'Branding',
    desc: 'Logo, identity, and brand guidelines that set you apart.',
    features: ['Logo design', 'Color & type', 'Brand guidelines', 'Asset kit'],
    price: 'From $2,800',
  },
]

const process = [
  { step: '01', title: 'Discover', desc: 'We dig into your goals, audience, and constraints.' },
  { step: '02', title: 'Design', desc: 'Wireframes, mockups, and a design system you own.' },
  { step: '03', title: 'Build', desc: 'Clean code, weekly demos, transparent progress.' },
  { step: '04', title: 'Launch', desc: 'QA, deploy, analytics setup, and post-launch support.' },
]

export default function Services() {
  return (
    <PageWrapper>
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-4xl">
          <span className="eyebrow mb-5">Services</span>
          <h1 className="heading-xl mb-6 text-white">
            Everything you need to <span className="gradient-text">grow online.</span>
          </h1>
          <p className="text-base sm:text-xl text-white/65 leading-relaxed max-w-3xl">
            From a landing page to a full product launch, we cover the entire digital
            stack — design, code, and growth.
          </p>
        </div>
      </section>

      <section className="container-x pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="pro-card group"
              >
                <div className="mb-6 inline-block">
                  <IconBubble variant={s.variant} size="md">
                    <Icon size={22} strokeWidth={2} />
                  </IconBubble>
                </div>
                <h3 className="heading-md mb-3">{s.title}</h3>
                <p className="text-ink-500 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                      <Check size={14} className="text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-5 border-t border-ink-100 flex items-center justify-between">
                  <span className="font-display font-semibold">{s.price}</span>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all">
                    Inquire <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gradient-to-br from-ink-950 via-ink-900 to-indigo-950 text-white mt-20 sm:mt-28 py-20 sm:py-28">
        <div className="container-x">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="eyebrow mb-5 !bg-white/10 !border-white/20 !text-white/90">
              How we work
            </span>
            <h2 className="heading-lg mb-5">A simple, transparent process.</h2>
            <p className="text-base sm:text-lg text-ink-300 leading-relaxed">
              We've refined our process over 100+ projects. Here's what working
              with us actually looks like.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative border-t border-white/15 pt-6"
              >
                <div className="font-display text-sm text-indigo-300 mb-3">{p.step}</div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-ink-300 leading-relaxed text-sm sm:text-base">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-ink-200 bg-gradient-to-br from-white via-blue-50/40 to-violet-50/30 p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-ink-900/10"
        >
          <h2 className="heading-lg mb-4 !text-ink-900">Not sure which service fits?</h2>
          <p className="text-base sm:text-lg text-ink-500 mb-7 sm:mb-8 max-w-xl mx-auto">
            Book a free 30-minute call. We'll help you scope your project — no pressure.
          </p>
          <Link to="/contact" className="btn-primary">
            Book a call <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
