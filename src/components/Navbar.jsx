import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import FluidMenu from './FluidMenu'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/portfolio', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`relative flex items-center justify-between rounded-2xl border transition-all duration-500 ${
            scrolled
              ? 'bg-white/85 backdrop-blur-xl border-ink-200/60 shadow-xl shadow-ink-900/8 px-3 sm:px-4 py-2'
              : 'bg-gradient-to-r from-white/60 via-white/50 to-white/60 backdrop-blur-md border-white/70 px-4 sm:px-5 py-2'
          }`}
          style={{
            backgroundImage: scrolled
              ? undefined
              : 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(238,242,255,0.6), rgba(255,255,255,0.6))',
          }}
        >
          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-1 bg-ink-50/60 rounded-full p-1 border border-ink-100">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive ? 'text-white' : 'text-ink-600 hover:text-ink-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-ink-900 rounded-full"
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink-900 text-white pl-5 pr-2 py-2 text-sm font-semibold transition-all duration-300 hover:bg-accent hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Hire us
              <span className="w-8 h-8 rounded-full bg-white text-ink-900 flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </span>
            </Link>
          </div>

          <FluidMenu />
        </div>
      </div>
    </motion.header>
  )
}
