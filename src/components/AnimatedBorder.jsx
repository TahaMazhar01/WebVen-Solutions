import { motion } from 'framer-motion'

export default function AnimatedBorder({ rounded = 'rounded-3xl', show = true }) {
  if (!show) return null
  return (
    <div className={`pointer-events-none absolute -inset-px ${rounded} overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
      <motion.div
        className={`absolute inset-0`}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, #0066ff 15%, #3b82f6 25%, transparent 40%, transparent 100%)',
        }}
      />
    </div>
  )
}
