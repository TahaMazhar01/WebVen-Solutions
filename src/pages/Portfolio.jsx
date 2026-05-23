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
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === f
                  ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/20'
                  : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
              }`}
            >
              {f}
            </button>
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`group cursor-pointer ${p.featured ? 'sm:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-ink-100 mb-5 ${
                  p.featured ? 'aspect-[16/9] sm:aspect-[16/7]' : 'aspect-[4/3]'
                }`}>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/15 transition-colors duration-500" />
                  {p.featured && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[11px] font-bold text-accent uppercase tracking-[0.18em] shadow-sm">
                      <BadgeCheck size={12} /> Featured
                    </span>
                  )}
                  <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-ink-900 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-md">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="px-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-400 mb-1.5">{p.tag}</p>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold mb-1 group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-sm sm:text-base text-ink-500">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <div className="rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="heading-lg mb-4">Your project, next on this list?</h2>
          <p className="text-ink-300 mb-7 sm:mb-8 max-w-xl mx-auto">
            We're booking new work for next quarter. Let's talk about your idea.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold hover:bg-indigo-500 hover:text-white transition-all">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
