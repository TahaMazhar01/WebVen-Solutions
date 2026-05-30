import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const PROGRESS_DURATION = 2500
const HOLD_AT_100 = 500
const FADE_DURATION = 450        // shorter, snappier exit
const TOTAL = PROGRESS_DURATION + HOLD_AT_100

const statusMessages = [
  { at: 0,   text: 'INITIALIZING' },
  { at: 25,  text: 'LOADING ASSETS' },
  { at: 55,  text: 'PREPARING SCENE' },
  { at: 80,  text: 'ALMOST READY' },
  { at: 100, text: 'WELCOME' },
]

/* ===== Ripple shader (simplified for smoothness · Webven palette) ===== */
const VERTEX_SRC = `void main() { gl_Position = vec4(position, 1.0); }`
const FRAGMENT_SRC = `
  precision mediump float;
  uniform vec2 resolution;
  uniform float time;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time * 0.05;
    float L = length(uv);
    float M = mod(uv.x + uv.y, 0.2);
    vec3 color = vec3(0.0);

    // 3 channels × 2 iterations = 6 ops total (was 9) — much lighter
    // Channel 0 — blue ripples
    color[0] += 0.004 / abs(fract(t) * 5.0 - L + M);
    color[0] += 0.016 / abs(fract(t + 0.015) * 5.0 - L + M);
    // Channel 1 — violet
    color[1] += 0.004 / abs(fract(t - 0.01) * 5.0 - L + M);
    color[1] += 0.016 / abs(fract(t + 0.005) * 5.0 - L + M);
    // Channel 2 — white
    color[2] += 0.004 / abs(fract(t - 0.02) * 5.0 - L + M);
    color[2] += 0.016 / abs(fract(t - 0.005) * 5.0 - L + M);

    // Webven palette
    vec3 col =
        color[0] * vec3(0.30, 0.45, 1.00)
      + color[1] * vec3(0.65, 0.55, 1.00)
      + color[2] * vec3(0.95, 0.97, 1.00);

    gl_FragColor = vec4(col, 1.0);
  }
`

function RippleCanvas({ paused }) {
  const containerRef = useRef(null)
  const pausedRef = useRef(paused)
  useEffect(() => { pausedRef.current = paused }, [paused])

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SRC,
      fragmentShader: FRAGMENT_SRC,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Lower DPR than usual — splash doesn't need sharp pixels, just smooth motion
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    })
    renderer.setPixelRatio(0.5)   // 50% native — much smoother on every device
    container.appendChild(renderer.domElement)
    // HW accel hints
    renderer.domElement.style.willChange = 'transform'
    renderer.domElement.style.transform = 'translateZ(0)'

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }
    onResize()
    window.addEventListener('resize', onResize)

    // 24fps cap + stop completely when paused (exit)
    let raf
    let last = 0
    const FRAME_MS = 1000 / 24
    const animate = (now) => {
      raf = requestAnimationFrame(animate)
      if (pausedRef.current) return        // stop rendering during exit
      if (now - last < FRAME_MS) return
      last = now
      uniforms.time.value += 0.125
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#02020a' }}
    />
  )
}

/* ===== Splash Screen ===== */
export default function SplashScreen() {
  const [show, setShow] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / PROGRESS_DURATION) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(tick)
    }, 16)
    // Stop shader BEFORE exit animation starts → no lag
    const exitTimer = setTimeout(() => setExiting(true), TOTAL - 100)
    const hideTimer = setTimeout(() => setShow(false), TOTAL)
    return () => {
      clearInterval(tick)
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    // Tell CloudsBackdrop to pause while splash is on screen
    window.__webvenSplashActive = show
    return () => {
      document.body.style.overflow = ''
      window.__webvenSplashActive = false
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
          exit={{ opacity: 0 }}                                  /* just fade — no scale (no jank) */
          transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] overflow-hidden"
        >
          {/* Background shader (pauses before exit so no lag) */}
          <RippleCanvas paused={exiting} />

          {/* Soft vignette to focus the center */}
          <div className="pointer-events-none absolute inset-0 bg-radial-vignette"
               style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />

          {/* ===== Center content ===== */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

            {/* Logo W mark — glassy badge */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl shadow-accent/40 backdrop-blur-md mb-7"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              <svg viewBox="0 0 32 32" className="w-14 h-14 sm:w-16 sm:h-16 relative z-10" fill="none">
                <defs>
                  <linearGradient id="splashWG" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M4 8L9 24L16 12L23 24L28 8"
                  stroke="url(#splashWG)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, delay: 0.3, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="28" cy="8" r="2.6" fill="#34d399"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
                >
                  <animate attributeName="r" values="2.6;3.4;2.6" dur="2.2s" repeatCount="indefinite" />
                </motion.circle>
              </svg>
            </motion.div>

            {/* WEBVEN letters — staggered drop */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-2 overflow-hidden">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight inline-block"
                  style={{ textShadow: '0 0 24px rgba(167,139,250,0.5)' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Sublabel */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="text-[10px] sm:text-xs text-white/65 uppercase tracking-[0.5em] font-semibold mb-10"
            >
              Digital · Studio
            </motion.p>

            {/* Slim progress bar — frosted */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="relative w-64 sm:w-80 h-[3px] bg-white/12 rounded-full overflow-hidden backdrop-blur-md"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-accent to-white rounded-full shadow-lg shadow-accent/40"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer */}
                <motion.div
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />
              </motion.div>
            </motion.div>

            {/* Status + percent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="mt-4 flex items-center justify-between w-64 sm:w-80"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] sm:text-xs text-white/65 font-mono tracking-[0.22em] uppercase">
                  {status}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-white font-mono tabular-nums tracking-wider">
                {Math.round(progress).toString().padStart(3, '0')}
                <span className="text-white/40">/100</span>
              </span>
            </motion.div>
          </div>

          {/* Bottom corner tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center gap-2 text-[10px] text-white/40 font-mono tracking-wider"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            v1.0.0 · build {new Date().getFullYear()}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-[10px] text-white/40 font-mono tracking-wider"
          >
            © Webven Studio
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
