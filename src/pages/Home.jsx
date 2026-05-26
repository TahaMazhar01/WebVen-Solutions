import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Sparkles,
  Star,
  Globe2,
  Brain,
  Smartphone,
  Layers,
  Zap,
  ShieldCheck,
  BadgeCheck,
  Code2,
} from 'lucide-react'
import Hero3D from '../components/Hero3D'
import PageWrapper from '../components/PageWrapper'
import CountUp from '../components/CountUp'
import MagneticButton from '../components/MagneticButton'
import IconBubble from '../components/IconBubble'
import BentoSection from '../components/BentoSection'
import Testimonials from '../components/Testimonials'

const services = [
  {
    icon: Code2,
    variant: 'default',
    title: 'Web Development',
    desc: 'Modern, lightning-fast websites and web apps built with the latest tech stack.',
    tags: ['React', 'Next.js', 'Vite'],
  },
  {
    icon: Brain,
    variant: 'violet',
    title: 'AI Solutions',
    desc: 'Smart AI features — chatbots, automation, content generation — built into your product.',
    tags: ['OpenAI', 'Claude', 'LangChain'],
  },
  {
    icon: Smartphone,
    variant: 'emerald',
    title: 'Mobile Apps',
    desc: 'Native-feeling iOS & Android apps with smooth UX and clean architecture.',
    tags: ['React Native', 'Flutter'],
  },
]

const features = [
  { icon: Zap, label: 'Ship in weeks', desc: 'Most sites delivered in 3–5 weeks.' },
  { icon: Layers, label: 'Pixel-perfect', desc: 'Designed and engineered together.' },
  { icon: ShieldCheck, label: 'Secure by default', desc: 'Best practice from day one.' },
  { icon: BadgeCheck, label: 'Post-launch care', desc: 'We stay around after launch.' },
]

const stats = [
  { value: 120, suffix: '+', label: 'Projects' },
  { value: 40, suffix: '+', label: 'Clients' },
  { value: 8, suffix: '+', label: 'Years' },
  { value: 99, suffix: '%', label: 'Retention' },
]

const projects = [
  {
    title: 'ASHGroup Dubai',
    tag: 'Real Estate · Web',
    img: 'https://cloud.famproperties.com/fam/blog/2107-161958.webp',
    featured: true,
  },
  {
    title: 'Nova Finance',
    tag: 'Fintech · Web',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=85',
  },
  {
    title: 'Orbital App',
    tag: 'SaaS · Mobile',
    img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1400&q=85',
  },
  {
    title: 'Vertex Commerce',
    tag: 'E-commerce · SEO',
    img: 'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*VNoETQG1aBwujmj9qMBbLQ.png',
  },
  {
    title: 'Pulse Analytics',
    tag: 'SaaS · Dashboard',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85',
  },
]

export default function Home() {
  return (
    <PageWrapper>
      {/* ===== HERO ===== */}
      <section className="relative">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2 lg:pt-8 pb-12 lg:pb-16">
            {/* Left content — 7 cols */}
            <div className="lg:col-span-7 relative z-10 order-2 lg:order-1">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="eyebrow mb-4 sm:mb-5"
              >
                <Sparkles size={12} /> Web Dev · AI Solutions
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="heading-xl mb-4 sm:mb-5"
              >
                We build modern websites and{' '}
                <span className="gradient-text">AI solutions.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-base sm:text-lg text-ink-500 max-w-xl leading-relaxed mb-7"
              >
                Webven is a digital studio crafting fast websites, mobile apps,
                and AI-powered features for ambitious brands worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-7 sm:mb-8"
              >
                <MagneticButton className="w-full sm:w-auto">
                  <Link to="/contact" className="btn-primary w-full sm:w-auto">
                    Start a project <ArrowUpRight size={16} />
                  </Link>
                </MagneticButton>
                <MagneticButton className="w-full sm:w-auto">
                  <Link to="/portfolio" className="btn-secondary w-full sm:w-auto">
                    View our work
                  </Link>
                </MagneticButton>
              </motion.div>

              {/* Inline stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-xl"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-ink-100 bg-white/60 backdrop-blur px-3 sm:px-4 py-3"
                  >
                    <div className="font-display text-xl sm:text-3xl font-bold text-ink-900">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[9px] sm:text-xs text-ink-500 uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — 3D circle — 5 cols */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative">
              <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] mx-auto">
                <Hero3D />

                {/* Tagline badge — top-left, inside circle area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="hidden sm:flex absolute top-6 left-2 lg:left-0 z-20 items-center gap-2 rounded-full bg-ink-950 text-white px-4 py-2 shadow-xl shadow-ink-900/20"
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium tracking-wide">Open for new projects</span>
                </motion.div>

                {/* Social-proof badge — bottom-right, OVER the white rectangle in animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="hidden sm:flex absolute bottom-6 right-2 lg:right-0 z-20 items-center gap-3 rounded-2xl border border-ink-100 bg-white/95 backdrop-blur-lg px-4 py-2.5 shadow-xl shadow-ink-900/15"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-ink-100"
                      >
                        <img src={`https://i.pravatar.cc/60?img=${i + 10}`} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="font-semibold text-ink-900 ml-0.5">5.0</span>
                    </div>
                    <div className="text-ink-500">40+ happy clients</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="pointer-events-none absolute top-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-violet-400/10 blur-3xl" />
      </section>

      {/* ===== FEATURED CLIENT ===== */}
      <section className="container-x py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-ink-50 via-white to-blue-50/40 p-7 sm:p-10 lg:p-14"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">
                <BadgeCheck size={12} /> Featured client
              </span>
              <h2 className="heading-lg mb-4">
                We built <span className="gradient-text">ASHGroup Dubai</span>'s digital presence.
              </h2>
              <p className="text-base sm:text-lg text-ink-500 leading-relaxed max-w-2xl mb-6">
                A full website build for one of Dubai's leading real-estate groups —
                a fast marketing site, lead-gen flows, and an AI chatbot for property inquiries.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {['Web Development', 'AI Chatbot', 'SEO', 'Hosting'].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium text-ink-700 px-3 py-1.5 rounded-full bg-white border border-ink-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <MagneticButton>
                <Link to="/portfolio" className="btn-primary">
                  View case study <ArrowUpRight size={16} />
                </Link>
              </MagneticButton>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-ink-900/10">
                <img
                  src="https://cloud.famproperties.com/fam/blog/2107-161958.webp"
                  alt="ASHGroup Dubai"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs opacity-80">Live project</p>
                    <p className="font-display font-semibold text-lg">ASHGroup Dubai</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-ink-900 flex items-center justify-center">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="container-x py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <span className="eyebrow mb-5">What we do</span>
          <h2 className="heading-lg mb-4">
            Web development meets <span className="gradient-text">AI.</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-500 leading-relaxed">
            We build modern websites, mobile apps, and AI-powered features —
            everything you need to launch and grow online.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="pro-card group"
              >
                <div className="mb-6 inline-block">
                  <IconBubble variant={s.variant} size="md">
                    <Icon size={22} strokeWidth={2} />
                  </IconBubble>
                </div>
                <h3 className="heading-md mb-3">{s.title}</h3>
                <p className="text-ink-500 leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium text-ink-600 px-2.5 py-1 rounded-md bg-ink-50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-ink-100 hover:border-accent/30 hover:bg-blue-50/30 transition-colors"
              >
                <IconBubble variant={['default', 'violet', 'amber', 'emerald'][i % 4]} size="sm" className="shrink-0">
                  <Icon size={18} />
                </IconBubble>
                <div>
                  <h4 className="font-display font-semibold text-sm mb-0.5">{f.label}</h4>
                  <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ===== BENTO GRID ===== */}
      <BentoSection />

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />

      {/* ===== STATS DARK BAR ===== */}
      <section className="py-14 sm:py-16 bg-gradient-to-br from-ink-950 via-ink-900 to-blue-950 text-white">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-br from-white to-accent bg-clip-text text-transparent">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] sm:text-xs text-ink-300 uppercase tracking-[0.18em]">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORK ===== */}
      <section className="container-x py-16 sm:py-24">
        <div className="flex items-end justify-between mb-10 sm:mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow mb-4">Selected work</span>
            <h2 className="heading-lg mb-3">Recent projects.</h2>
            <p className="text-base sm:text-lg text-ink-500">A glimpse of what we've shipped lately.</p>
          </div>
          <Link to="/portfolio" className="btn-secondary mb-1">
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group cursor-pointer ${p.featured ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-ink-100 mb-5 ${
                p.featured ? 'aspect-[16/9] sm:aspect-[16/7]' : 'aspect-[4/3]'
              }`}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {p.featured && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[11px] font-bold text-ink-900 uppercase tracking-[0.18em] shadow-sm">
                    <BadgeCheck size={12} /> Featured
                  </span>
                )}
                <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-ink-900 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-md">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </div>
              <div className="px-1">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-400 mb-1.5">{p.tag}</p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container-x py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-ink-950 text-white p-8 sm:p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-accent/40 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-violet-500/30 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="heading-lg mb-5">Need a website or AI feature?</h2>
            <p className="text-base sm:text-lg text-ink-300 max-w-2xl mx-auto mb-8 sm:mb-10">
              We're booking new web development and AI projects.
              Tell us what you're building — we'll send back a plan.
            </p>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold hover:bg-accent hover:text-white transition-all duration-300"
              >
                Start a conversation <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
