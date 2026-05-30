import { useEffect, useRef, forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react'

/* Theme-scoped CSS (Webven palette) */
const STYLES = `
.webven-footer {
  --pill-bg-1:        rgba(255,255,255,0.04);
  --pill-bg-2:        rgba(255,255,255,0.02);
  --pill-shadow:      rgba(0,0,0,0.5);
  --pill-highlight:   rgba(255,255,255,0.08);
  --pill-inset-shadow:rgba(0,0,0,0.6);
  --pill-border:      rgba(255,255,255,0.12);

  --pill-bg-1-hover:  rgba(255,255,255,0.08);
  --pill-bg-2-hover:  rgba(255,255,255,0.03);
  --pill-border-hover:rgba(255,255,255,0.25);
  --pill-shadow-hover:rgba(0,102,255,0.30);
  --pill-highlight-hover: rgba(255,255,255,0.20);
}

@keyframes webven-footer-breathe {
  0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.55; }
  100% { transform: translate(-50%,-50%) scale(1.08); opacity: 0.95; }
}
@keyframes webven-footer-marquee {
  from { transform: translateX(0);    }
  to   { transform: translateX(-50%); }
}

.webven-footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

.webven-footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0,102,255,0.28) 0%,
    rgba(167,139,250,0.18) 40%,
    transparent 70%
  );
  animation: webven-footer-breathe 8s ease-in-out infinite alternate;
}

.webven-footer-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.webven-footer-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
}

.webven-footer-giant {
  font-size: clamp(4rem, 15vw, 15rem);   /* smaller so full word is visible */
  line-height: 0.85;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.10);
  background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}

.webven-footer-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(0,102,255,0.25));
}
`

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Web Development</span> <span className="text-accent/70">✦</span>
    <span>AI Solutions</span>     <span className="text-violet-400/70">✦</span>
    <span>Mobile Apps</span>      <span className="text-accent/70">✦</span>
    <span>SEO Strategy</span>     <span className="text-violet-400/70">✦</span>
    <span>Modern Design</span>    <span className="text-accent/70">✦</span>
    <span>Premium Studio</span>   <span className="text-violet-400/70">✦</span>
  </div>
)

/* Magnetic button — works on hover, no scroll trigger needed */
const MagneticButton = forwardRef(function MagneticButton(
  { className = '', children, as: As = 'button', ...rest }, fwdRef
) {
  const localRef = useRef(null)

  useEffect(() => {
    const el = localRef.current
    if (!el || typeof window === 'undefined') return
    // Disable magnetic effect on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const ctx = gsap.context(() => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        gsap.to(el, { x: x * 0.30, y: y * 0.30, scale: 1.04, ease: 'power2.out', duration: 0.4 })
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, scale: 1, ease: 'elastic.out(1, 0.4)', duration: 1.1 })
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <As
      ref={(node) => {
        localRef.current = node
        if (typeof fwdRef === 'function') fwdRef(node)
        else if (fwdRef) fwdRef.current = node
      }}
      className={`cursor-pointer inline-flex items-center justify-center ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
})

export default function CinematicFooter() {
  const { pathname } = useLocation()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Force re-mount on route change so animations refresh
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        key={pathname}    /* re-init on every page */
        className="webven-footer relative bg-ink-950 text-white font-sans overflow-hidden mt-24 sm:mt-32"
      >
        {/* === Aurora glow + grid background === */}
        <div className="webven-footer-aurora absolute left-1/2 top-1/2 h-[55%] w-[80%] rounded-[50%] blur-[80px] pointer-events-none z-0" />
        <div className="webven-footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* === Giant WEBVEN background text === */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="webven-footer-giant absolute left-1/2 -translate-x-1/2 bottom-0 whitespace-nowrap z-0 pointer-events-none select-none font-display"
        >
          WEBVEN
        </motion.div>

        {/* === Tilted marquee (top) === */}
        <div className="relative w-full overflow-hidden border-y border-white/10 bg-ink-950/70 backdrop-blur-md py-4 z-10 -rotate-1 scale-110 shadow-2xl">
          <div className="flex w-max text-xs md:text-sm font-bold tracking-[0.3em] text-white/60 uppercase"
               style={{ animation: 'webven-footer-marquee 40s linear infinite' }}>
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* === Center content === */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 sm:pt-28 pb-14 w-full max-w-5xl mx-auto min-h-[60vh]">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black webven-footer-glow tracking-tighter mb-10 sm:mb-12 text-center"
          >
            Let's build something great.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 w-full"
          >
            {/* Primary CTAs */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
              <MagneticButton as={Link} to="/contact" className="webven-footer-pill px-7 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-sm md:text-base gap-3 group">
                Start a project
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </MagneticButton>

              <MagneticButton as={Link} to="/portfolio" className="webven-footer-pill px-7 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-sm md:text-base gap-3 group">
                View our work
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </MagneticButton>
            </div>

            {/* Secondary text links */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full mt-2">
              <MagneticButton as={Link} to="/about"     className="webven-footer-pill px-5 py-2.5 rounded-full text-white/65 hover:text-white font-medium text-xs md:text-sm">About</MagneticButton>
              <MagneticButton as={Link} to="/services"  className="webven-footer-pill px-5 py-2.5 rounded-full text-white/65 hover:text-white font-medium text-xs md:text-sm">Services</MagneticButton>
              <MagneticButton as={Link} to="/solutions" className="webven-footer-pill px-5 py-2.5 rounded-full text-white/65 hover:text-white font-medium text-xs md:text-sm">Solutions</MagneticButton>
              <MagneticButton as="a" href="mailto:hello@webven.studio" className="webven-footer-pill px-5 py-2.5 rounded-full text-white/65 hover:text-white font-medium text-xs md:text-sm">Email</MagneticButton>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-3">
              {[
                { Icon: Twitter,   href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
                { Icon: Github,    href: '#', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <MagneticButton key={label} as="a" href={href} aria-label={label}
                  className="webven-footer-pill w-10 h-10 rounded-full text-white/65 hover:text-white">
                  <Icon size={15} />
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === Bottom bar (no Crafted with badge) === */}
        <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} Webven Studio. All rights reserved.
          </div>

          <a href="mailto:hello@webven.studio"
             className="text-white/40 hover:text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase order-3 sm:order-2 hidden md:block transition-colors">
            hello@webven.studio
          </a>

          <MagneticButton as="button" onClick={scrollToTop} aria-label="Back to top"
            className="w-12 h-12 rounded-full webven-footer-pill text-white/65 hover:text-white group order-1 sm:order-3">
            <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </>
  )
}
