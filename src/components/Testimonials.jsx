import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      "Webven rebuilt our entire storefront from the ground up. Site speed went from 4s to 0.8s, and our checkout conversion lifted by 27% in the first month.",
    name: 'Layla Rahman',
    role: 'Founder, Vertex Commerce',
    avatar: 'https://i.pravatar.cc/200?img=29',
    rating: 5,
  },
  {
    quote:
      "Their attention to detail is unreal. Every animation, every interaction feels intentional. Our conversion rate jumped 38% post-launch.",
    name: 'Sara Mitchell',
    role: 'Head of Product, Nova Finance',
    avatar: 'https://i.pravatar.cc/200?img=47',
    rating: 5,
  },
  {
    quote:
      "Best decision we made was working with Webven. Clean code, on-time delivery, and they understood what we needed before we did.",
    name: 'Daniel Park',
    role: 'Founder, Orbital App',
    avatar: 'https://i.pravatar.cc/200?img=58',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="container-x py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-12 sm:mb-14"
      >
        <span className="eyebrow mb-5">What clients say</span>
        <h2 className="heading-lg mb-4">
          Trusted by founders <span className="gradient-text">worldwide.</span>
        </h2>
        <p className="text-base sm:text-lg text-ink-500 leading-relaxed">
          Don't just take our word for it. Here's what our clients have to say
          about working with us.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative group rounded-3xl bg-gradient-to-br from-white to-blue-50/40 border border-ink-100 p-7 sm:p-8 hover:border-accent/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
          >
            {/* Decorative quote mark */}
            <Quote
              size={40}
              className="text-accent/15 absolute top-6 right-6 group-hover:text-accent/30 transition-colors"
            />

            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-ink-700 leading-relaxed text-sm sm:text-base mb-7 relative z-10">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-ink-100">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-ink-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
