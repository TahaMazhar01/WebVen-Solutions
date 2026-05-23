import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

export default function CountUp({ from = 0, to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, from, to, suffix, duration])

  return <span ref={ref}>{from}{suffix}</span>
}
