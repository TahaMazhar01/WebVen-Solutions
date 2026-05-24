import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const filters = ['All', 'Web', 'Mobile', 'Branding', 'SEO']

const projects = [
  {
    title: 'ASHGroup Dubai',
    tag: 'Real Estate · Web',
    cat: 'Web',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80',
    desc: 'Full digital revamp for a leading Dubai real-estate group.',
    featured: true,
  },
  {
    title: 'Nova Finance',
    tag: 'Fintech · Web',
    cat: 'Web',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80',
    desc: 'Modern dashboard for a YC-backed fintech.',
  },
  {
    title: 'Orbital App',
    tag: 'SaaS · Mobile',
    cat: 'Mobile',
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
    desc: 'Cross-platform productivity app, 4.8★.',
  },
  {
    title: 'Lumen Studio',
    tag: 'Branding · Web',
    cat: 'Branding',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    desc: 'Full rebrand for a creative agency.',
  },
  {
    title: 'Vertex Commerce',
    tag: 'E-commerce · SEO',
    cat: 'SEO',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    desc: 'Grew organic traffic 340% in 6 months.',
  },
  {
    title: 'Halcyon Health',
    tag: 'Healthcare · Web',
    cat: 'Web',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    desc: 'HIPAA-compliant patient portal.',
  },
  {
    title: 'Aurora Travel',
    tag: 'Travel · Mobile',
    cat: 'Mobile',
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    desc: 'Booking app with offline maps.',
  },
  {
    title: 'Studio Forme',
    tag: 'Fashion · Branding',
    cat: 'Branding',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
    desc: 'Luxury fashion brand identity.',
  },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((p) => p.cat === active)

  return (
    <PageWrapper>
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-4xl">
          <span className="eyebrow mb-5">Selected work</span>
          <h1 className="heading-xl mb-6">
            Projects we're <span className="gradient-text">proud of.</span>
          </h1>
          <p className="text-base sm:text-xl text-ink-500 leading-relaxed max-w-3xl">
            A curated selection of recent work — from venture-backed startups
            to established brands like ASHGroup Dubai.
          </p>
        </div>
      </section>

      <section className="container-x mb-10 sm:mb-12">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 overflow-hidden ${
                active === f
                  ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/25'
                  : 'bg-ink-50 text-ink-700 hover:bg-ink-100 hover:shadow-md'
              }`}
            >
              {active === f && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <motion.div layout className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -8 }}
                className={`group cursor-pointer ${p.featured ? 'sm:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-ink-100 mb-5 shadow-lg shadow-ink-900/5 ${
                  p.featured ? 'aspect-[16/9] sm:aspect-[16/7]' : 'aspect-[4/3]'
                }`}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/0 to-ink-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
                  </div>
                  {p.featured && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-accent uppercase tracking-[0.18em] shadow-lg shadow-ink-900/10">
                      <BadgeCheck size={12} /> Featured
                    </span>
                  )}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-ink-900 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl shadow-ink-900/20">
                    <ArrowUpRight size={18} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                      <span className="w-8 h-px bg-white/60" />
                      View Project
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-400 mb-1.5 group-hover:text-accent/70 transition-colors">{p.tag}</p>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold mb-1 group-hover:text-accent transition-colors duration-300">{p.title}</h3>
                  <p className="text-sm sm:text-base text-ink-500 group-hover:text-ink-600 transition-colors">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 text-center"
        >
          <div className="absolute inset-0">
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-accent/30 blur-3xl" 
            />
            <motion.div 
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-indigo-400/30 blur-3xl" 
            />
          </div>
          <div className="relative">
            <h2 className="heading-lg mb-4">Your project, next on this list?</h2>
            <p className="text-ink-300 mb-7 sm:mb-8 max-w-xl mx-auto">
              {"We're"} booking new work for next quarter. {"Let's"} talk about your idea.
            </p>
            <Link 
              to="/contact" 
              className="group relative inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-8 sm:px-10 py-4 sm:py-5 text-sm font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-indigo-400 to-accent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-[gradient-rotate_2s_linear_infinite]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a project</span>
              <ArrowUpRight size={16} className="relative z-10 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
