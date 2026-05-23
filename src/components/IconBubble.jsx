import { motion } from 'framer-motion'

const variants = {
  default: 'conic-gradient(from 0deg, #0a0a0c, #6366f1, #a78bfa, #6366f1, #0a0a0c)',
  violet: 'conic-gradient(from 0deg, #4c1d95, #8b5cf6, #c084fc, #8b5cf6, #4c1d95)',
  emerald: 'conic-gradient(from 0deg, #064e3b, #10b981, #6ee7b7, #10b981, #064e3b)',
  rose: 'conic-gradient(from 0deg, #881337, #f43f5e, #fda4af, #f43f5e, #881337)',
  amber: 'conic-gradient(from 0deg, #78350f, #f59e0b, #fcd34d, #f59e0b, #78350f)',
  sky: 'conic-gradient(from 0deg, #0c4a6e, #0ea5e9, #7dd3fc, #0ea5e9, #0c4a6e)',
}

const accents = {
  default: '#a78bfa',
  violet: '#c084fc',
  emerald: '#6ee7b7',
  rose: '#fda4af',
  amber: '#fcd34d',
  sky: '#7dd3fc',
}

const sizes = {
  sm: 'w-11 h-11',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
}

export default function IconBubble({ children, variant = 'default', size = 'md', className = '' }) {
  return (
    <div
      className={`relative ${sizes[size]} rounded-2xl overflow-hidden flex items-center justify-center shadow-xl ${className}`}
      style={{
        background: variants[variant],
        boxShadow: `0 12px 30px -10px ${accents[variant]}66`,
      }}
    >
      {/* Slow conic rotation overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3) 25%, transparent 50%)',
        }}
      />
      {/* Inner dark card */}
      <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-br from-ink-900 via-ink-950 to-indigo-950 flex items-center justify-center text-white">
        {/* Shine sweep on hover via parent group */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1100ms] ease-out" />
        <span className="relative z-10">{children}</span>
      </div>
      {/* Pulsing accent dot */}
      <span
        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full z-10"
        style={{ backgroundColor: accents[variant] }}
      >
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: accents[variant], opacity: 0.6 }}
        />
      </span>
    </div>
  )
}
