import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const Spline = lazy(() => import('@splinetool/react-spline'))
const SPLASH_SCENE = 'https://prod.spline.design/f185J3lWKa17nAfO/scene.splinecode'

export default function SplashScreen() {
  const [show, setShow] = useState(true)
  const [splineLoaded, setSplineLoaded] = useState(false)

  // Auto-dismiss after 3.5s max
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3500)
    return () => clearTimeout(t)
  }, [])

  // Dismiss 800ms after Spline loads
  useEffect(() => {
    if (splineLoaded) {
      const t = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(t)
    }
  }, [splineLoaded])

  // Lock scroll while splash is up
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-ink-950 via-ink-900 to-blue-950 flex items-center justify-center overflow-hidden"
        >
          {/* Spline background */}
          <div className="absolute inset-0 opacity-90">
            <Suspense fallback={null}>
              <Spline scene={SPLASH_SCENE} onLoad={() => setSplineLoaded(true)} />
            </Suspense>
          </div>

          {/* Soft vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-transparent to-ink-950/60" />

          {/* Centered logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center px-6"
          >
            <div className="inline-block">
              <Logo size="lg" invert />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 text-xs sm:text-sm text-white/60 uppercase tracking-[0.4em] font-medium"
            >
              Crafting digital experiences
            </motion.p>

            {/* Loader bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
