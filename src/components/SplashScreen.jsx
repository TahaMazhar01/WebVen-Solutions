import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROGRESS_DURATION = 2700
const HOLD_AT_100 = 700
const FADE_DURATION = 800
const TOTAL = PROGRESS_DURATION + HOLD_AT_100

const statusMessages = [
  { at: 0,   text: 'INITIALIZING' },
  { at: 22,  text: 'CONNECTING' },
  { at: 45,  text: 'LOADING ASSETS' },
  { at: 68,  text: 'PREPARING SCENE' },
  { at: 88,  text: 'ALMOST READY' },
  { at: 100, text: 'WELCOME' },
]

// ===== Animated Sine-Wave Progress =====
function WaveProgress({ progress }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => p + 0.08), 30)
    return () => clearInterval(id)
  }, [])

  const W = 360
  const H = 70
  const CY = H / 2
  const AMP = 14
  const CYCLES = 3.5
  const STEP = 2

  const pathFromAmp = (amp, phaseShift, freqMod = 1) => {
    let d = `M 0 ${CY}`
    for (let x = 0; x <= W; x += STEP) {
      const t = (x / W) * Math.PI * 2 * CYCLES * freqMod + phase + phaseShift
      const y = CY + Math.sin(t) * amp * (0.6 + 0.4 * Math.sin(t * 0.5))
      d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`
    }
    return d
  }

  const mainPath = useMemo(() => pathFromAmp(AMP, 0), [phase])
  const subPath = useMemo(() => pathFromAmp(AMP * 0.7, 0.6, 1.3), [phase])

  const fillX = (progress / 100) * W
  const fillY =
    CY + Math.sin((fillX / W) * Math.PI * 2 * CYCLES + phase) * AMP * 0.85

  return (
    <svg viewBox={`-4 -4 ${W + 8} ${H + 8}`} className="w-full h-20 sm:h-24">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0066ff" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#0066ff" />
        </linearGradient>
        <clipPath id="waveClip">
          <rect x="0" y="-10" width={fillX} height={H + 20} />
        </clipPath>
        <filter id="waveGlow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Faint subwave (background depth) */}
      <path
        d={subPath}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Faint main wave */}
      <path
        d={mainPath}
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Glow halo of filled portion */}
      <g clipPath="url(#waveClip)">
        <path
          d={mainPath}
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.35"
          filter="url(#waveGlow)"
        />
        {/* Sharp colored wave */}
        <path
          d={mainPath}
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Leading pulse dot */}
      <circle cx={fillX} cy={fillY} r="6" fill="#fff" opacity="0.3">
        <animate attributeName="r" values="5;10;5" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={fillX} cy={fillY} r="3.5" fill="#fff" />
    </svg>
  )
}

// ===== Splash =====
export default function SplashScreen() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / PROGRESS_DURATION) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(tick)
    }, 16)
    const timer = setTimeout(() => setShow(false), TOTAL)
    return () => {
      clearInterval(tick)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  const status = statusMessages.reduce(
    (acc, s) => (progress >= s.at ? s.text : acc),
    statusMessages[0].text
  )
  const letters = 'WEBVEN'.split('')

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: FADE_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] bg-ink-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Tech grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Aurora glows */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute w-[700px] h-[700px] rounded-full bg-accent/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-3xl translate-x-32 translate-y-32"
          />

          {/* Horizontal scanning line */}
          <motion.div
            animate={{ y: ['-100%', '100vh'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent shadow-[0_0_12px_2px_rgba(0,102,255,0.6)]"
          />

          {/* Corner brackets */}
          <CornerBracket position="top-6 left-6 sm:top-10 sm:left-10" rotate={0} />
          <CornerBracket position="top-6 right-6 sm:top-10 sm:right-10" rotate={90} />
          <CornerBracket position="bottom-6 left-6 sm:bottom-10 sm:left-10" rotate={-90} />
          <CornerBracket position="bottom-6 right-6 sm:bottom-10 sm:right-10" rotate={180} />

          {/* Floating dots */}
          {Array.from({ length: 30 }).map((_, i) => {
            const left = (i * 53) % 100
            const top = (i * 31) % 100
            return (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent/70"
                style={{ left: `${left}%`, top: `${top}%` }}
                animate={{ opacity: [0.15, 0.8, 0.15], scale: [1, 1.6, 1] }}
                transition={{
                  duration: 2 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut',
                }}
              />
            )
          })}

          {/* ===== CONTENT ===== */}
          <div className="relative z-10 text-center px-6 w-full max-w-md">
            {/* Logo with progress ring */}
            <div className="relative mx-auto mb-7 w-32 h-32">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" />
                <motion.circle
                  cx="50" cy="50" r="46"
                  stroke="url(#splashProgressG)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
                <defs>
                  <linearGradient id="splashProgressG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0066ff" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-3 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  background:
                    'conic-gradient(from 0deg, #0a0a0c, #0066ff, #3b82f6, #0066ff, #0a0a0c)',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent, rgba(167,139,250,0.6), transparent 30%)',
                  }}
                />
                <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-br from-ink-900 via-ink-950 to-blue-950 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-14 h-14" fill="none">
                    <defs>
                      <linearGradient id="splashLogoG2" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M4 8L9 24L16 12L23 24L28 8"
                      stroke="url(#splashLogoG2)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.3, delay: 0.3, ease: 'easeInOut' }}
                    />
                    <motion.circle
                      cx="28" cy="8" r="2.4" fill="#34d399"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
                    >
                      <animate attributeName="r" values="2.4;3.2;2.4" dur="2.2s" repeatCount="indefinite" />
                    </motion.circle>
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* WEBVEN letters */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-2 overflow-hidden">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight inline-block"
                  style={{ textShadow: '0 0 30px rgba(0,102,255,0.3)' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.5em] font-semibold mb-7"
            >
              Digital · Studio
            </motion.p>

            {/* === WAVE PROGRESS === */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="w-full"
            >
              <WaveProgress progress={progress} />
            </motion.div>

            {/* Status + percent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="mt-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] sm:text-xs text-white/60 font-mono tracking-[0.22em] uppercase">
                  {status}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-white font-mono tabular-nums tracking-wider">
                {Math.round(progress).toString().padStart(3, '0')}
                <span className="text-white/40">/100</span>
              </span>
            </motion.div>
          </div>

          {/* Bottom-left version */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center gap-2 text-[10px] text-white/30 font-mono tracking-wider"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            v1.0.0 · build {new Date().getFullYear()}
          </motion.div>

          {/* Bottom-right copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-[10px] text-white/30 font-mono tracking-wider"
          >
            © Webven Studio
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CornerBracket({ position, rotate }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      width="36" height="36" viewBox="0 0 32 32"
      className={`pointer-events-none absolute ${position}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
    >
      <path d="M 2 16 L 2 2 L 16 2" stroke="rgba(0,102,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="2" cy="2" r="1.5" fill="rgba(0,102,255,0.6)" />
    </motion.svg>
  )
}
