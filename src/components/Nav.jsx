import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavTheme } from '../lib/navTheme'
import { MagneticLink } from './MagneticLink'
import logo from '../assets/brand/logo.jpg'

const LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Wave', href: '#why-wave' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'Case Studies', href: '#case-studies' },
]

export function Nav() {
  const { onDark } = useNavTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ink = onDark ? 'text-cream' : 'text-ink'
  const inkMuted = onDark
    ? 'text-cream/70 hover:text-cream'
    : 'text-ink/65 hover:text-ink'
  const pillBg = onDark
    ? 'bg-ink-soft/70 border-cream/15'
    : 'bg-cream/80 border-ink/10'

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5">
      <motion.nav
        animate={{
          paddingBlock: scrolled ? 8 : 12,
          boxShadow: scrolled
            ? '0 8px 30px rgba(23,13,8,0.12)'
            : '0 0px 0px rgba(23,13,8,0)',
        }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 backdrop-blur-xl transition-colors duration-500 sm:px-5 ${pillBg}`}
      >
        <MagneticLink
          href="#top"
          cursor="link"
          className="flex shrink-0 items-center gap-2.5"
        >
          <img
            src={logo}
            alt="Wave"
            className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
          />
          <span
            className={`font-display text-xl leading-none font-bold lowercase tracking-tight sm:text-2xl ${ink}`}
          >
            wave
          </span>
        </MagneticLink>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <MagneticLink
              key={link.href}
              href={link.href}
              cursor="link"
              className={`rounded-full px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${inkMuted}`}
            >
              {link.label}
            </MagneticLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MagneticLink
            href="#start-a-wave"
            cursor="button"
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 sm:flex ${
              onDark
                ? 'bg-cream text-ink hover:bg-wave-yellow'
                : 'bg-ink text-cream hover:bg-wave-red'
            }`}
          >
            Start a Wave
            <span aria-hidden="true">→</span>
          </MagneticLink>

          <button
            type="button"
            aria-label="Toggle menu"
            data-cursor="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors lg:hidden ${
              onDark ? 'border-cream/20 text-cream' : 'border-ink/15 text-ink'
            }`}
          >
            <div className="flex h-2.5 w-4 flex-col justify-between">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                className="h-[1.5px] w-full origin-center bg-current"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                className="h-[1.5px] w-full origin-center bg-current"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-[calc(100%+0.5rem)] left-4 right-4 z-40 flex flex-col gap-1 rounded-3xl border border-ink/10 bg-cream/95 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-ink uppercase hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#start-a-wave"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-xl bg-ink px-4 py-3 text-center text-sm font-semibold tracking-wide text-cream uppercase"
            >
              Start a Wave →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
