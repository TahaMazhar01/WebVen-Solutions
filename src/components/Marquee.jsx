import { motion } from 'framer-motion'

export default function Marquee({ items, speed = 40, reverse = false }) {
  const repeated = [...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden py-6 sm:py-8 border-y border-ink-100 bg-gradient-to-r from-indigo-50/40 via-white to-violet-50/40">
      <motion.div
        className="flex gap-12 sm:gap-16 whitespace-nowrap"
        animate={{ x: reverse ? ['-33.33%', '0%'] : ['0%', '-33.33%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-12 sm:gap-16 shrink-0">
            <span className="font-display text-2xl sm:text-4xl font-bold text-ink-900 tracking-tight">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
