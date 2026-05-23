import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`mb-14 ${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="w-8 h-px bg-ink-900" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-ink-500">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="heading-lg mb-5">{title}</h2>
      {subtitle && <p className="text-lg text-ink-500 leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
