import { Suspense, lazy, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/ZeVdP7OntuKQHh8y/scene.splinecode'

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-full border-2 border-blue-200 border-t-accent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-violet-200 border-b-violet-500"
        />
      </div>
    </div>
  )
}

export default function Hero3D() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Soft outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-violet-400/15 to-amber-300/10 blur-3xl scale-90" />

      {/* Decorative rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-6%] rounded-full border border-accent/20 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-12%] rounded-full border border-dashed border-violet-300/30 pointer-events-none"
      />

      {/* Circular Spline stage */}
      <div className="spline-stage relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 shadow-2xl shadow-accent/15 ring-1 ring-ink-900/5">
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>

        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Spline scene={SCENE_URL} onLoad={() => setLoaded(true)} />
          </motion.div>
        </Suspense>

        {/* Inset highlight ring */}
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
      </div>

      {/* Orbiting accent dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-6%] pointer-events-none"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/60" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-12%] pointer-events-none"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/60" />
      </motion.div>
    </div>
  )
}
