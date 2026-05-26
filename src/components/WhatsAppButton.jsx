import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const WA_NUMBER = '923180678879'
const PRESET = 'Hi Webven! I came from your website and would like to discuss a project.'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openWA = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(PRESET)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 flex flex-col items-start gap-3"
        >
          {/* Tooltip card on hover */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="relative rounded-2xl bg-white border border-ink-100 shadow-xl shadow-ink-900/10 p-4 w-64"
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-2 right-2 w-6 h-6 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-400"
                >
                  <X size={12} />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <MessageCircle size={16} fill="white" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm leading-tight">Webven Studio</p>
                    <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online now
                    </p>
                  </div>
                </div>
                <p className="text-xs text-ink-600 leading-relaxed mb-3">
                  👋 Hi! Got a project in mind? Chat with us on WhatsApp — we reply within 1 business day.
                </p>
                <button
                  onClick={openWA}
                  className="w-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors"
                >
                  Start chat →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating button */}
          <motion.button
            onClick={() => (open ? openWA() : setOpen(true))}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Chat on WhatsApp"
            className="relative w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <MessageCircle size={24} fill="white" className="relative z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
