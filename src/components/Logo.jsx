import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Logo({ size = 'md', invert = false }) {
  const sizes = {
    sm: { box: 'w-9 h-9 rounded-lg', text: 'text-lg', sub: 'text-[8px]', gap: 'gap-2' },
    md: { box: 'w-12 h-12 rounded-xl', text: 'text-2xl', sub: 'text-[10px] tracking-[0.32em]', gap: 'gap-3' },
    lg: { box: 'w-16 h-16 rounded-2xl', text: 'text-3xl', sub: 'text-[11px] tracking-[0.32em]', gap: 'gap-3' },
  }
  const s = sizes[size]
  const textColor = invert ? 'text-white' : 'text-ink-900'
  const subColor = invert ? 'text-ink-300' : 'text-ink-400'

  return (
    <Link to="/" className={`flex items-center ${s.gap} group select-none`}>
      <motion.div
        whileHover={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.6 }}
        className={`relative ${s.box} overflow-hidden flex items-center justify-center shadow-lg shadow-accent/25 group-hover:shadow-xl group-hover:shadow-accent/50 transition-shadow duration-500`}
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, #0a0a0c, #0066ff, #3b82f6, #0066ff, #0a0a0c)',
        }}
      >
        {/* Animated conic background rotation */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, transparent, rgba(59,130,246,0.7), transparent 30%)',
          }}
        />
        {/* Inner card */}
        <div className="absolute inset-[2px] rounded-[inherit] bg-gradient-to-br from-ink-900 via-ink-950 to-blue-950 flex items-center justify-center">
          {/* Shine sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1100ms] ease-out" />

          {/* W mark */}
          <svg viewBox="0 0 32 32" className="w-2/3 h-2/3 relative z-10" fill="none">
            <defs>
              <linearGradient id="logoG" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M4 8L9 24L16 12L23 24L28 8"
              stroke="url(#logoG)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pulsing accent dot */}
            <circle cx="28" cy="8" r="2.4" fill="#34d399">
              <animate attributeName="r" values="2.4;3.2;2.4" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.6;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </motion.div>

      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold ${s.text} tracking-tight ${textColor}`}>
          Webven
        </span>
        <span
          className={`${s.sub} uppercase tracking-[0.3em] font-semibold mt-1.5 ${subColor}`}
        >
          Studio
        </span>
      </div>
    </Link>
  )
}
