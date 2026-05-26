import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 })
  const dotX  = useSpring(x, { stiffness: 700, damping: 30, mass: 0.2 })
  const dotY  = useSpring(y, { stiffness: 700, damping: 30, mass: 0.2 })

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch devices — hide custom cursor on those
    const touch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window
    setIsTouch(touch)
    if (touch) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const isInteractive = (el) =>
      el && (
        el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
      )

    const onOver = (e) => setHovering(!!isInteractive(e.target))
    const onOut  = (e) => setHovering(!!isInteractive(e.relatedTarget))

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [x, y])

  if (isTouch) return null

  return (
    <>
      {/* Ring — follows with slight lag */}
      <motion.div
        aria-hidden
        style={{
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.25 }, opacity: { duration: 0.2 } }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-9 h-9 rounded-full border border-accent/60 mix-blend-difference hidden lg:block"
      />
      {/* Dot — follows precisely */}
      <motion.div
        aria-hidden
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          scale: hovering ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.2 } }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-accent mix-blend-difference hidden lg:block"
      />
    </>
  )
}
