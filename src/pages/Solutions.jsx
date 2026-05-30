import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FileCode2,
  Layers,
  ShieldCheck,
  Database,
  Brain,
  Check,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import IconBubble from '../components/IconBubble'

const solutions = [
  {
    icon: FileCode2,
    variant: 'default',
    eyebrow: 'Single Page Apps',
    title: 'Lightning-fast Single Page Applications.',
    desc:
      'Modern SPAs that load once and feel instant. Perfect for dashboards, web apps, and product sites that need maximum interactivity.',
    features: [
      'Instant navigation — no full page reloads',
      'Smooth transitions and rich animations',
      'Offline-capable with service workers',
      'Higher engagement & conversion rates',
    ],
    tech: ['React', 'Vite', 'Vue', 'Svelte', 'TypeScript'],
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=85',
  },
  {
    icon: Layers,
    variant: 'violet',
    eyebrow: 'Multi-page Sites',
    title: 'SEO-optimized Multi-page Websites.',
    desc:
      'Traditional multi-page sites with distinct URLs for each section. Best for content-heavy sites, marketing pages, blogs, and ecommerce.',
    features: [
      'Better SEO with unique URLs per page',
      'Faster initial page loads',
      'Easy content management with CMS',
      'Perfect for blogs, ecommerce & marketing',
    ],
    tech: ['Next.js', 'Astro', 'WordPress', 'Webflow', 'Sanity'],
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=85',
  },
  {
    icon: ShieldCheck,
    variant: 'rose',
    eyebrow: 'Authentication',
    title: 'Secure Authentication Systems.',
    desc:
      'Enterprise-grade authentication and authorization. Login, signup, social auth, MFA, role-based access — all wired up and secure from day one.',
    features: [
      'Email + password with hashed storage',
      'Social login (Google, Apple, GitHub)',
      'Two-factor authentication (2FA / OTP)',
      'Role-based permissions & sessions',
    ],
    tech: ['Auth0', 'Clerk', 'Firebase Auth', 'Supabase', 'NextAuth'],
    img: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1400&q=85',
  },
  {
    icon: Database,
    variant: 'emerald',
    eyebrow: 'Databases',
    title: 'Scalable Database Solutions.',
    desc:
      'From simple storage to complex relational schemas — we design and integrate the right database stack for your data, performance, and growth.',
    features: [
      'SQL & NoSQL — we pick the right tool',
      'Real-time sync and live updates',
      'Automated backups & point-in-time recovery',
      'Indexed and optimized for scale',
    ],
    tech: ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Prisma'],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85',
  },
  {
    icon: Brain,
    variant: 'amber',
    eyebrow: 'AI Integration',
    title: 'AI-powered Features & Automation.',
    desc:
      'Integrate ChatGPT, Claude, image generation, and custom AI models into your product. Smart features your users actually love.',
    features: [
      'Custom chatbots & virtual assistants',
      'AI-powered search & recommendations',
      'Image & content generation',
      'Predictive analytics & insights',
    ],
    tech: ['OpenAI', 'Claude', 'Gemini', 'HuggingFace', 'LangChain'],
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=85',
  },
]

export default function Solutions() {
  return (
    <PageWrapper>
      {/* Intro */}
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-4xl">
          <span className="eyebrow mb-5">Solutions</span>
          <h1 className="heading-xl mb-6 text-white">
            Every kind of <span className="gradient-text">web solution.</span>
          </h1>
          <p className="text-base sm:text-xl text-white/65 leading-relaxed max-w-3xl">
            From simple landing pages to AI-powered platforms — here are the
            technologies and architectures we build with, and when each one fits.
          </p>
        </div>
      </section>

      {/* Solutions — alternating split layout */}
      <section className="container-x">
        {solutions.map((s, i) => {
          const Icon = s.icon
          const reverse = i % 2 === 1
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center py-12 sm:py-16 lg:py-20 ${
                i !== solutions.length - 1 ? 'border-b border-ink-100' : ''
              }`}
            >
              {/* Content side */}
              <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                <div className="mb-5 inline-block">
                  <IconBubble variant={s.variant} size="md">
                    <Icon size={22} strokeWidth={2} />
                  </IconBubble>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] font-semibold text-accent mb-3">
                  {s.eyebrow}
                </p>
                <h2 className="heading-lg mb-5 text-white">{s.title}</h2>
                <p className="text-base sm:text-lg text-white/65 leading-relaxed mb-6">
                  {s.desc}
                </p>
                <ul className="space-y-3 mb-7">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm sm:text-base text-white/80"
                    >
                      <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium text-white/80 px-3 py-1.5 rounded-full bg-white/8 backdrop-blur border border-white/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image side */}
              <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                <div className="group relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl shadow-ink-900/15">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-transparent to-transparent" />
                  {/* Number badge */}
                  <div className="absolute top-6 left-6 flex items-baseline gap-2">
                    <span className="font-display text-5xl sm:text-7xl font-bold text-white drop-shadow-lg">
                      0{i + 1}
                    </span>
                    <span className="text-xs uppercase tracking-[0.22em] text-white/80 font-semibold">
                      / 0{solutions.length}
                    </span>
                  </div>
                  {/* Bottom chip */}
                  <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-bold text-ink-900 uppercase tracking-[0.18em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {s.eyebrow}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* CTA */}
      <section className="container-x py-16 sm:py-24">
        <div className="rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-blue-950 text-white p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="heading-lg mb-4">Not sure which fits?</h2>
          <p className="text-ink-300 mb-8 max-w-xl mx-auto">
            Book a free 30-minute consultation. We'll help you pick the right
            architecture for your product — no pressure.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold hover:bg-accent hover:text-white transition-all"
          >
            Book a call <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
