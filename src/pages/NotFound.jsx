import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="container-x py-20 sm:py-28 min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-2xl text-center">
          {/* Glitchy 404 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mb-8"
          >
            <div className="font-display font-black tracking-tight text-[120px] sm:text-[180px] lg:text-[220px] leading-none gradient-text">
              404
            </div>

            {/* Decorative pulsing rings behind */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 -z-10 mx-auto w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent/15 blur-3xl"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="eyebrow mb-5">
              <Search size={12} /> Page not found
            </span>
            <h1 className="heading-lg mb-5">
              This page took a <span className="gradient-text">wrong turn.</span>
            </h1>
            <p className="text-base sm:text-lg text-ink-500 leading-relaxed mb-9 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/" className="btn-primary">
                <Home size={16} /> Back to home
              </Link>
              <Link to="/contact" className="btn-secondary">
                <ArrowLeft size={14} /> Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
