import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'
import {
  ArrowUpRight,
  Compass,
  Rocket,
  Lightbulb,
  HandHeart,
  Sparkles,
  Quote,
  Linkedin,
  Twitter,
  Github,
} from 'lucide-react'
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
  { name: 'Taha Mazhar',    role: 'Founder & Lead Developer', img: '/team/taha.jpg' },
  { name: 'Ayesha Asad',    role: 'Engineering Lead',         img: '/team/ayesha-asad.jpg' },
  { name: 'Tayyab Mehmood', role: 'Motion & 3D Designer',     img: '/team/tayyab.jpg' },
  { name: 'Ayesha Nadeem',  role: 'Growth & SEO Strategist',  img: '/team/ayesha-nadeem.jpg' },
]

export default function About() {
  return (
    <PageWrapper>
      {/* ===== HERO INTRO ===== */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow mb-5">
              <Sparkles size={12} /> About Webven
            </span>
            <h1 className="heading-xl mb-6">
              Crafting the modern{' '}
              <span className="gradient-text">web.</span>
            </h1>
            <p className="text-base sm:text-xl text-ink-500 leading-relaxed max-w-3xl">
              Webven is a remote-first design and engineering studio. We partner with
              founders, marketers, and product teams to ship beautiful digital products
              that actually perform.
            </p>
          </div>

          {/* Compact stats — right side of intro */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {[
              { v: '120+', l: 'Projects' },
              { v: '40+',  l: 'Clients' },
              { v: '8+',   l: 'Years' },
              { v: '99%',  l: 'Retention' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-blue-50/30 p-4">
                <div className="font-display text-3xl font-bold text-ink-900">{s.v}</div>
                <div className="text-[10px] text-ink-500 uppercase tracking-[0.18em] mt-1 font-semibold">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STUDIO IN MOTION — clean Spline display ===== */}
      <StudioInMotion />

      {/* ===== OUR STORY ===== */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14">
          <div className="md:col-span-5">
            <span className="eyebrow mb-5">Our story</span>
            <h2 className="heading-lg">
              Founded on the idea that the web should{' '}
              <span className="gradient-text">feel alive.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-ink-600 leading-relaxed">
            <p>
              We started Webven with a simple belief: most websites were boring, slow,
              and forgettable. We wanted to build a studio where craft mattered.
            </p>
            <p>
              We've shipped over 120 projects — including a full digital revamp for{' '}
              <strong className="text-ink-900">ASHGroup Dubai</strong>. Our team brings
              together designers, engineers, and strategists who genuinely love
              what we do.
            </p>
            <p>
              You work directly with the people building your product —
              no layers, no handoffs, no surprises. Just clean code,
              thoughtful design, and on-time delivery.
            </p>

            {/* Pull-quote */}
            <div className="relative mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100">
              <Quote size={28} className="text-accent opacity-30 absolute top-4 left-4" />
              <p className="relative pl-10 italic text-ink-700 font-medium">
                "Craft is the difference between something that works and something
                that's worth using."
              </p>
              <p className="relative pl-10 mt-3 text-xs uppercase tracking-[0.18em] text-ink-500 font-semibold">
                Taha Mazhar · Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="container-x py-20 sm:py-28">
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
                <h3 className="font-display font-semibold text-lg sm:text-xl mb-2">
                  {v.title}
                </h3>
                <p className="text-sm sm:text-base text-ink-500 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ===== TEAM ===== */}
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
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-ink-100 to-blue-50 border border-ink-100">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Bottom gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Social icons reveal on hover */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {[Linkedin, Twitter, Github].map((Ico, idx) => (
                    <span
                      key={idx}
                      className="w-8 h-8 rounded-full bg-white/95 text-ink-900 flex items-center justify-center cursor-pointer hover:bg-accent hover:text-white transition-colors shadow-lg"
                    >
                      <Ico size={12} />
                    </span>
                  ))}
                </div>
              </div>
              <h4 className="font-display font-semibold text-base sm:text-lg">{p.name}</h4>
              <p className="text-xs sm:text-sm text-ink-500">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container-x pb-20">
        <div className="rounded-3xl border border-ink-200 bg-gradient-to-br from-white via-blue-50/30 to-violet-50/30 p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="heading-lg mb-4">Want to work with us?</h2>
          <p className="text-ink-500 mb-7 sm:mb-8 max-w-xl mx-auto">
            We're always open to interesting projects and great collaborations.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}

/* ===== Studio in Motion — clean, wide, centered Spline ===== */
function StudioInMotion() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="container-x">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Eyebrow row above frame */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1">
          <span className="eyebrow">
            <Sparkles size={12} /> Studio in motion
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-ink-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Interactive · drag to explore
          </span>
        </div>

        {/* Frame — wider with proper aspect ratio so robot has room */}
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-blue-950 aspect-[16/10] sm:aspect-[16/8] shadow-2xl shadow-accent/15 ring-1 ring-white/10">
          {/* Loader */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border-2 border-white/10 border-t-accent"
              />
            </div>
          )}

          {/* Spline — scaled + shifted up to cut the bottom rectangle/floor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 scale-[1.18] -translate-y-[8%] origin-center"
          >
            <Suspense fallback={null}>
              <Spline scene={STUDIO_SCENE} onLoad={() => setLoaded(true)} />
            </Suspense>
          </motion.div>

          {/* Strong bottom fade — covers the rectangle/floor entirely */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent z-10" />

          {/* Solid bottom bar — completely hides any residual rectangle */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-ink-950 z-10 flex items-center justify-center border-t border-white/5">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/40 font-semibold">
              ★ Webven · Studio of motion ★
            </p>
          </div>

          {/* Soft top hint label */}
          <div className="pointer-events-none absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.22em] text-white/80 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Live · 3D scene
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-sm text-ink-500 mt-5 italic max-w-xl mx-auto">
          "We don't just build websites — we craft experiences that feel alive."
        </p>
      </motion.div>
    </section>
  )
}
