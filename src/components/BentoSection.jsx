import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Brain, Code2, Smartphone, Zap, Globe2, Rocket } from 'lucide-react'
import CountUp from './CountUp'

const techLogos = [
  'React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind', 'OpenAI',
  'Claude', 'LangChain', 'Supabase', 'Firebase', 'Framer', 'Figma',
]

export default function BentoSection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-10 sm:mb-12"
      >
        <span className="eyebrow mb-5">Capabilities</span>
        <h2 className="heading-lg mb-4">
          Everything you need to <span className="gradient-text">launch and scale.</span>
        </h2>
        <p className="text-base sm:text-lg text-ink-500 leading-relaxed">
          A complete digital toolkit — from beautiful interfaces to AI features,
          all built in-house and shipped fast.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-5">
        {/* === BIG: AI feature (4 cols) === */}
        <BentoCard className="sm:col-span-4 sm:row-span-2 min-h-[260px] sm:min-h-[340px] bg-gradient-to-br from-ink-950 via-ink-900 to-blue-950 text-white p-7 sm:p-9 overflow-hidden">
          <span className="eyebrow mb-4 !bg-white/10 !border-white/20 !text-white">
            <Brain size={12} /> AI Solutions
          </span>
          <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-3">
            Built for the
            <br />
            <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
              AI era.
            </span>
          </h3>
          <p className="text-ink-300 max-w-md text-sm sm:text-base leading-relaxed mb-6">
            Chatbots, smart search, automation, and custom AI features integrated
            directly into your product — powered by GPT, Claude, and modern LLMs.
          </p>

          <Link to="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent transition-colors">
            Explore AI solutions <ArrowUpRight size={14} />
          </Link>

          {/* Decorative orb */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-accent/40 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 right-8 w-32 h-32 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute top-1/3 right-16 w-16 h-16 rounded-full border border-white/10" />
        </BentoCard>

        {/* === Stats (2 cols, 1 row) === */}
        <BentoCard className="sm:col-span-2 min-h-[160px] bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-7">
          <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-accent">By the numbers</span>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-ink-900">
                <CountUp to={120} suffix="+" />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mt-1">Projects</p>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-ink-900">
                <CountUp to={40} suffix="+" />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mt-1">Clients</p>
            </div>
          </div>
        </BentoCard>

        {/* === Speed (2 cols) === */}
        <BentoCard className="sm:col-span-2 min-h-[160px] bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-amber-700">Speed</span>
              <p className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mt-3 leading-tight">
                Ship in
                <br />
                <span className="text-amber-600">3–5 weeks</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Zap size={18} className="text-amber-600" />
            </div>
          </div>
        </BentoCard>

        {/* === Web Dev (3 cols) === */}
        <BentoCard className="sm:col-span-3 min-h-[180px] bg-white border border-ink-100 p-6 sm:p-7 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ink-900 to-blue-900 text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Code2 size={20} />
          </div>
          <h4 className="font-display font-bold text-xl text-ink-900 mb-2">Web Development</h4>
          <p className="text-sm text-ink-500 leading-relaxed mb-3">
            Modern React + Next.js sites with great UX, fast load times, and SEO baked in.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'Next.js', 'Vite'].map((t) => (
              <span key={t} className="text-[10px] font-medium text-ink-700 px-2 py-0.5 rounded bg-ink-50">{t}</span>
            ))}
          </div>
        </BentoCard>

        {/* === Mobile Apps (3 cols) === */}
        <BentoCard className="sm:col-span-3 min-h-[180px] bg-white border border-ink-100 p-6 sm:p-7 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Smartphone size={20} />
          </div>
          <h4 className="font-display font-bold text-xl text-ink-900 mb-2">Mobile Apps</h4>
          <p className="text-sm text-ink-500 leading-relaxed mb-3">
            Native-feeling iOS & Android apps with React Native or Flutter.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['React Native', 'Flutter', 'Expo'].map((t) => (
              <span key={t} className="text-[10px] font-medium text-ink-700 px-2 py-0.5 rounded bg-ink-50">{t}</span>
            ))}
          </div>
        </BentoCard>

        {/* === Tech stack marquee (full width) === */}
        <BentoCard className="sm:col-span-6 min-h-[120px] bg-ink-950 text-white overflow-hidden p-0 relative">
          <div className="absolute top-5 left-7 right-7 flex items-center justify-between z-10 pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-white/60">Our tech stack</span>
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Always learning
            </span>
          </div>

          {/* Marquee */}
          <div className="absolute inset-x-0 bottom-0 pb-7 pt-12 overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-10 whitespace-nowrap"
            >
              {[...techLogos, ...techLogos].map((logo, i) => (
                <span key={i} className="font-display text-2xl sm:text-3xl font-bold text-white/70 hover:text-white transition-colors">
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent z-[5]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent z-[5]" />
        </BentoCard>
      </div>
    </section>
  )
}

function BentoCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {children}
    </motion.div>
  )
}
