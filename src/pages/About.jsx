import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, Suspense, lazy } from 'react'
import { 
  ArrowUpRight, 
  Zap, 
  Globe, 
  Cpu, 
  Sparkles, 
  Code2, 
  Palette, 
  Rocket,
  Shield,
  Clock,
  MessageSquare,
  TrendingUp,
  Brain,
  Layers
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import IconBubble from '../components/IconBubble'

const Spline = lazy(() => import('@splinetool/react-spline'))
const STUDIO_SCENE = 'https://prod.spline.design/f185J3lWKa17nAfO/scene.splinecode'

const services = [
  {
    icon: Code2,
    variant: 'default',
    title: 'Modern Web Development',
    desc: 'Next.js, React, Vue - fast, SEO-optimized websites that convert visitors into customers.',
  },
  {
    icon: Brain,
    variant: 'violet',
    title: 'AI Integration',
    desc: 'ChatGPT, Claude, custom AI solutions - automate workflows and enhance user experience.',
  },
  {
    icon: Palette,
    variant: 'amber',
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces that users love and keep coming back to.',
  },
  {
    icon: Rocket,
    variant: 'emerald',
    title: 'Performance & SEO',
    desc: '90+ Lighthouse scores, fast load times, and search engine dominance.',
  },
]

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '2-4', label: 'Week Turnaround' },
  { value: '24/7', label: 'Support Available' },
]

const whyUs = [
  {
    icon: Zap,
    title: 'Lightning Fast Delivery',
    desc: 'We ship in weeks, not months. Your website goes live while your competitors are still planning.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    desc: 'Clean code, responsive design, accessibility-first. We build it right the first time.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    desc: 'No middlemen. Work directly with the developers building your project.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    desc: 'Every pixel serves a purpose. We optimize for conversions, not just aesthetics.',
  },
]

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python',
  'OpenAI', 'Vercel', 'Supabase', 'Prisma', 'Framer Motion', 'Three.js'
]

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-indigo-950">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 rounded-full bg-accent/30 blur-[80px] sm:blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 lg:w-80 h-32 sm:h-48 lg:h-80 rounded-full bg-violet-500/25 blur-[60px] sm:blur-[80px]" 
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="container-x relative z-10 py-16 sm:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] sm:text-xs lg:text-sm font-medium text-white/90 mb-4 sm:mb-6"
              >
                <Sparkles size={12} className="text-accent" />
                Web Development + AI Solutions
              </motion.span>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
                We Build
                <span className="block mt-1 sm:mt-2">
                  <span className="bg-gradient-to-r from-accent via-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Digital Experiences
                  </span>
                </span>
                <span className="block mt-1 sm:mt-2 text-white/90">That Convert</span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                WebVen is a modern freelance studio specializing in cutting-edge web development 
                powered by AI. We transform your ideas into high-performance websites that 
                drive real business results.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary justify-center sm:justify-start">
                  Start Your Project <ArrowUpRight size={16} />
                </Link>
                <Link to="/portfolio" className="btn-secondary justify-center sm:justify-start">
                  View Our Work
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 lg:pt-10 border-t border-white/10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 mt-0.5 sm:mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-blue-400 shadow-lg shadow-accent/30 flex items-center justify-center"
                >
                  <Code2 size={28} className="text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-2 -left-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-400 shadow-lg shadow-violet-500/30 flex items-center justify-center"
                >
                  <Brain size={24} className="text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [0, 3, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute top-1/2 -right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/30 flex items-center justify-center"
                >
                  <Zap size={20} className="text-white" />
                </motion.div>

                {/* 3D Spline Container */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ink-800/50 to-ink-900/50 backdrop-blur-sm border border-white/10 aspect-square">
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-12 h-12 rounded-full border-2 border-white/10 border-t-accent"
                        />
                      </div>
                    }
                  >
                    <div className="absolute inset-0 scale-[1.3] -translate-y-[5%]">
                      <Spline scene={STUDIO_SCENE} />
                    </div>
                  </Suspense>
                  
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={containerRef} className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-50 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-violet-500/5 blur-2xl" />
        </div>

        <div className="container-x relative">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-5 inline-flex"
            >
              <Layers size={12} /> What We Do
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-4"
            >
              Modern Solutions for
              <span className="gradient-text"> Modern Businesses</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-ink-500 text-base sm:text-lg"
            >
              From concept to launch, we handle every aspect of your digital presence
              with cutting-edge technology and AI-powered solutions.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="pro-card group cursor-pointer"
                >
                  <motion.div 
                    className="mb-5 inline-block"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconBubble variant={s.variant} size="md">
                      <Icon size={22} />
                    </IconBubble>
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg sm:text-xl mb-2 group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-500 leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Parallax Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-ink-50 to-indigo-50/50 relative overflow-hidden">
        {/* Parallax elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-10 left-10 w-20 h-20 rounded-2xl bg-accent/10 rotate-12 hidden lg:block"
        />
        <motion.div 
          style={{ y: y2, rotate }}
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-violet-500/10 hidden lg:block"
        />

        <div className="container-x relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="eyebrow mb-5 inline-flex"
              >
                <Shield size={12} /> Why WebVen
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="heading-lg mb-6"
              >
                Why Businesses Choose
                <span className="gradient-text"> Us</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-ink-500 text-base sm:text-lg mb-8 leading-relaxed"
              >
                {"We're"} not just developers {"—"} {"we're"} your digital partners. 
                We combine technical expertise with business acumen to deliver 
                solutions that actually work for your bottom line.
              </motion.p>
              
              <Link to="/contact" className="btn-primary">
                {"Let's"} Talk <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {whyUs.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-ink-100 shadow-sm hover:shadow-xl hover:shadow-accent/10 hover:border-accent/20 transition-all duration-500 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-base sm:text-lg mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Marquee */}
      <section className="py-12 sm:py-16 bg-ink-950 overflow-hidden">
        <div className="container-x mb-8">
          <p className="text-center text-white/50 text-sm uppercase tracking-widest">
            Technologies We Master
          </p>
        </div>
        
        <div className="relative">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 sm:gap-12"
          >
            {[...techStack, ...techStack, ...techStack].map((tech, i) => (
              <span 
                key={i} 
                className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white/20 hover:text-white/60 transition-colors whitespace-nowrap cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-5 inline-flex"
            >
              <Clock size={12} /> Our Process
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg mb-4"
            >
              From Idea to
              <span className="gradient-text"> Launch</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { num: '01', title: 'Discovery', desc: 'We dive deep into your goals, audience, and competition to create a winning strategy.' },
              { num: '02', title: 'Design', desc: 'Beautiful, user-focused designs that align with your brand and convert visitors.' },
              { num: '03', title: 'Develop', desc: 'Clean, optimized code with modern frameworks. Fast, secure, and scalable.' },
              { num: '04', title: 'Deploy', desc: 'Launch day and beyond. We ensure everything runs smoothly and provide ongoing support.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-ink-100 group-hover:text-accent/20 transition-colors">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-lg sm:text-xl mt-2 mb-2 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-ink-500 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-x py-16 sm:py-20 lg:pb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-ink-950 via-ink-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-20 text-center"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-accent/40 blur-3xl" 
            />
            <motion.div 
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              className="absolute bottom-0 right-1/4 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-violet-500/30 blur-3xl" 
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6 sm:mb-8"
            >
              <Rocket size={32} className="text-white" />
            </motion.div>
            
            <h2 className="heading-lg mb-4 sm:mb-5">
              Ready to Build Something
              <span className="block mt-1 bg-gradient-to-r from-accent via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              {"Let's"} discuss your project and see how we can help you achieve your digital goals. 
              Free consultation, no obligations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink-900 px-8 sm:px-10 py-4 sm:py-5 text-sm font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-blue-400 to-accent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Start Your Project
                </span>
                <ArrowUpRight size={16} className="relative z-10 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
              </Link>
              <Link 
                to="/portfolio" 
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-all"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
