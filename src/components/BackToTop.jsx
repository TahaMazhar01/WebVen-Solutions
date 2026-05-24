import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={toTop}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ink-900 text-white flex items-center justify-center shadow-xl shadow-ink-900/30 hover:bg-accent hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300"
        >
          <ArrowUp size={18} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" />
          {/* Ping ring */}
          <span className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-30 animate-ping" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
