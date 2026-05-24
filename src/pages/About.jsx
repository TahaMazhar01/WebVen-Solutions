import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ArrowUpRight, Compass, Rocket, Lightbulb, HandHeart, Sparkles } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import IconBubble from '../components/IconBubble'

const Spline = lazy(() => import('@splinetool/react-spline'))
const STUDIO_SCENE = 'https://prod.spline.design/f185J3lWKa17nAfO/scene.splinecode'

const values = [
  {
    icon: Compass,
    variant: 'default',
    title: 'Craft first',
    desc: 'Every pixel, every line of code is intentional and considered.',
  },
  {
    icon: Rocket,
    variant: 'violet',
    title: 'Move fast',
    desc: 'We ship in weeks, not quarters — without cutting corners.',
  },
  {
    icon: Lightbulb,
    variant: 'amber',
    title: 'Stay curious',
    desc: 'New tools, new techniques. Always learning, always improving.',
  },
  {
    icon: HandHeart,
    variant: 'rose',
    title: 'Be honest',
    desc: 'Straightforward pricing, scope, and timelines from day one.',
  },
]

const team = [
  { name: 'Alex Morgan', role: 'Founder & Lead Designer', img: 'https://i.pravatar.cc/400?img=12' },
  { name: 'Sara Khan', role: 'Engineering Lead', img: 'https://i.pravatar.cc/400?img=20' },
  { name: 'Jordan Lee', role: 'Motion & 3D', img: 'https://i.pravatar.cc/400?img=14' },
  { name: 'Maya Patel', role: 'Growth & SEO', img: 'https://i.pravatar.cc/400?img=23' },
]

export default function About() {
  return (
    <PageWrapper>
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-4xl">
          <span className="eyebrow mb-5">About Webven</span>
          <h1 className="heading-xl mb-6">
            A small studio with <span className="gradient-text">big ambition.</span>
          </h1>
          <p className="text-base sm:text-xl text-ink-500 leading-relaxed max-w-3xl">
            Webven is a remote-first design and engineering studio. We partner with founders,
            marketers, and product teams to ship beautiful digital products that perform.
          </p>
        </div>
      </section>

      {/* ===== STUDIO IN MOTION (Spline scene) ===== */}
      <section className="container-x py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-[820px]"
        >
          {/* Eyebrow label above the frame */}
          <div className="flex items-center justify-between mb-5 px-1">
            <span className="eyebrow">
              <Sparkles size={12} /> Studio in motion
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Interactive · drag to explore
            </span>
          </div>

          {/* Polished frame */}
          <div className="relative rounded-[28px] p-1.5 bg-gradient-to-br from-accent/30 via-violet-500/20 to-accent/30 shadow-2xl shadow-accent/20">
            <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-blue-950 aspect-[4/3] sm:aspect-[16/10]">
              {/* Tiny window-bar at top (browser-style) */}
              <div className="absolute top-0 left-0 right-0 z-30 flex items-center gap-1.5 px-4 py-2.5 bg-ink-950/95 backdrop-blur border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                  webven · live preview
                </span>
              </div>

              {/* Spline canvas — scaled up to crop out watermark and floor rectangle */}
              <div className="absolute inset-0 scale-[1.22] -translate-y-[3%] origin-center">
                <Suspense
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-10 h-10 rounded-full border-2 border-white/10 border-t-accent"
                      />
                    </div>
                  }
                >
                  <Spline scene={STUDIO_SCENE} />
                </Suspense>
              </div>

              {/* Bottom gradient fade — hides watermark + any base rectangle */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent z-20" />

              {/* Side gradient fades — subtle vignette */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink-950/70 to-transparent z-20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-950/70 to-transparent z-20" />

              {/* Radial vignette — soft focus on the robot */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 70% at center 45%, transparent 0%, transparent 50%, rgba(10,10,12,0.6) 100%)',
                }}
              />

              {/* Decorative caption inside frame — bottom overlay (replaces watermark area visually) */}
              <div className="absolute bottom-4 left-0 right-0 z-30 text-center">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/40 font-semibold">
                  ★ Webven · Studio of motion ★
                </p>
              </div>

              {/* Inset highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/5 z-20" />
            </div>
          </div>

          {/* Caption under the frame */}
          <p className="text-center text-sm text-ink-500 mt-5 italic">
            "We don't just build websites — we craft experiences that feel alive."
          </p>
        </motion.div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-12">
          <div className="md:col-span-5">
            <span className="eyebrow mb-5">Our story</span>
            <h2 className="heading-lg mb-3">Founded on the idea that the web should feel alive.</h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-ink-600 leading-relaxed">
            <p>
              We started Webven in 2017 with a simple belief: most websites were boring, slow,
              and forgettable. We wanted to build a studio where craft mattered.
            </p>
            <p>
              Eight years later, we've shipped over 120 projects for startups, scale-ups, and
              established brands — including <strong className="text-ink-900">ASHGroup Dubai</strong>.
              We've grown into a tight-knit team of designers, engineers, and strategists
              who genuinely love what we do.
            </p>
            <p>
              We're proud to be a small team — it means you work directly with the people
              building your product. No layers, no handoffs, no surprises.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-ink-50 to-indigo-50/40 py-20 sm:py-28">
        <div className="container-x">
          <div className="text-center mx-auto max-w-2xl mb-12 sm:mb-14">
            <span className="eyebrow mb-5">What we believe</span>
            <h2 className="heading-lg">The principles behind our work.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="pro-card group"
                >
                  <div className="mb-5 inline-block">
                    <IconBubble variant={v.variant} size="md">
                      <Icon size={20} />
                    </IconBubble>
                  </div>
                  <h3 className="font-display font-semibold text-lg sm:text-xl mb-2">{v.title}</h3>
                  <p className="text-sm sm:text-base text-ink-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <span className="eyebrow mb-5">The team</span>
          <h2 className="heading-lg">People behind the pixels.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {team.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-ink-100 relative shadow-lg shadow-ink-900/5 group-hover:shadow-xl group-hover:shadow-accent/10 transition-shadow duration-500">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/0 to-ink-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-ink-900 text-xs">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="font-display font-semibold text-base sm:text-lg group-hover:text-accent transition-colors">{p.name}</h4>
              <p className="text-xs sm:text-sm text-ink-500">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-ink-200 bg-gradient-to-br from-white to-indigo-50/30 p-8 sm:p-12 lg:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.06),transparent_50%)]" />
          <div className="relative">
            <h2 className="heading-lg mb-4">Want to work with us?</h2>
            <p className="text-ink-500 mb-7 sm:mb-8 max-w-xl mx-auto">
              {"We're"} always open to interesting projects and great collaborations.
            </p>
            <Link to="/contact" className="btn-primary">
              Get in touch <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
