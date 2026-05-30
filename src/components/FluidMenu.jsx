import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Lightbulb,
  FolderOpen,
  Mail,
} from 'lucide-react'

const links = [
  { to: '/',          label: 'Home',      Icon: Home },
  { to: '/about',     label: 'About',     Icon: User },
  { to: '/services',  label: 'Services',  Icon: Briefcase },
  { to: '/solutions', label: 'Solutions', Icon: Lightbulb },
  { to: '/portfolio', label: 'Work',      Icon: FolderOpen },
  { to: '/contact',   label: 'Contact',   Icon: Mail },
]

export default function FluidMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('touchstart', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('touchstart', onClickOutside)
    }
  }, [open])

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock scroll when expanded
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const ITEM_SIZE  = 52     // px — slightly smaller for mobile navbar
  const ITEM_GAP   = 8      // px between items
  const STEP       = ITEM_SIZE + ITEM_GAP

  return (
    <div
      ref={containerRef}
      className="relative lg:hidden"
      style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
    >
      {/* === Toggle button (always visible, z-50) === */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-ink-900 text-white shadow-xl shadow-ink-900/40 z-50 transition-transform duration-300 hover:scale-105 active:scale-95 will-change-transform"
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
      >
        <span className="relative w-5 h-5">
          {/* X icon */}
          <X
            size={20}
            strokeWidth={2.5}
            className="absolute inset-0 transition-all duration-300"
            style={{
              transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
              opacity: open ? 1 : 0,
            }}
          />
          {/* Menu icon */}
          <Menu
            size={20}
            strokeWidth={2.5}
            className="absolute inset-0 transition-all duration-300"
            style={{
              transform: open ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
              opacity: open ? 0 : 1,
            }}
          />
        </span>
      </button>

      {/* === Expanding items === */}
      {links.map((l, i) => {
        const isActive = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to))
        return (
          <button
            key={l.to}
            type="button"
            onClick={() => { navigate(l.to); setOpen(false) }}
            aria-label={l.label}
            className={`group absolute top-0 left-0 flex flex-col items-center justify-center rounded-full backdrop-blur-md will-change-transform shadow-xl ${
              isActive
                ? 'bg-accent text-white shadow-accent/40'
                : 'bg-ink-900/95 text-white/85 shadow-ink-900/30 hover:bg-ink-800'
            }`}
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              transform: open
                ? `translateY(${(i + 1) * STEP}px) scale(1)`
                : 'translateY(0) scale(0.4)',
              opacity: open ? 1 : 0,
              zIndex: 40 - i,
              transition: `transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1) ${open ? i * 35 : (links.length - i) * 25}ms,
                           opacity 280ms ease ${open ? i * 30 : 0}ms,
                           background-color 200ms ease`,
              border: '1px solid rgba(255,255,255,0.10)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            <l.Icon
              size={18}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-[8px] uppercase tracking-[0.16em] font-bold mt-1 leading-none">
              {l.label}
            </span>
          </button>
        )
      })}

      {/* Background dim overlay when menu is open */}
      {open && (
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-ink-950/40 backdrop-blur-sm"
          style={{ animation: 'fluidMenuFade 200ms ease forwards' }}
        />
      )}

      <style>{`
        @keyframes fluidMenuFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
