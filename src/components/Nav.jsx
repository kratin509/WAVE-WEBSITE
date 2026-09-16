import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavTheme } from '../lib/navTheme'
import { MagneticLink } from './MagneticLink'
import logo from '../assets/brand/logo.jpg'

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why Wave', href: '#why-wave' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'Case studies', href: '#case-studies' },
]

export function Nav() {
  const { onDark } = useNavTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ink = onDark ? 'text-cream' : 'text-ink'
  const inkMuted = onDark
    ? 'text-cream/70 hover:text-cream'
    : 'text-ink/60 hover:text-ink'
  const borderTone = onDark ? 'border-cream/20' : 'border-ink/15'
  // Transparent over whatever's beneath by default - matching the
  // reference's minimal glass nav - with just a blur (no solid fill)
  // once scrolled, so text stays legible over fast-moving content below.
  const barBg = scrolled ? (onDark ? 'bg-ink/30 backdrop-blur-md' : 'bg-white/30 backdrop-blur-md') : 'bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${barBg}`}>
      <nav className="mx-auto grid max-w-[1400px] grid-cols-2 items-center px-6 py-5 sm:px-10 lg:grid-cols-[1fr_auto_1fr]">
        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <MagneticLink
              key={link.href}
              href={link.href}
              cursor="link"
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${inkMuted}`}
            >
              {link.label}
            </MagneticLink>
          ))}
        </div>

        <MagneticLink href="#top" cursor="link" className="flex shrink-0 items-center gap-2.5 justify-self-start lg:justify-self-center">
          <img src={logo} alt="Wave" className="h-8 w-8 rounded-full object-cover" />
          <span className={`font-display text-xl leading-none font-semibold lowercase tracking-tight ${ink}`}>
            wave
          </span>
        </MagneticLink>

        <div className="flex items-center justify-end gap-3">
          <MagneticLink
            href="#start-a-wave"
            cursor="button"
            className="hidden items-center gap-1.5 rounded-full bg-wave-orange-deep px-5 py-2 text-[13px] font-semibold tracking-wide text-cream transition-colors duration-200 hover:bg-ink sm:flex"
          >
            Start a wave
            <span aria-hidden="true">→</span>
          </MagneticLink>

          <button
            type="button"
            aria-label="Toggle menu"
            data-cursor="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors lg:hidden ${borderTone} ${ink}`}
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
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`overflow-hidden border-t lg:hidden ${borderTone} ${onDark ? 'bg-ink/80' : 'bg-white/80'} backdrop-blur-md`}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-2 py-2.5 text-sm font-medium ${ink}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#start-a-wave"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-wave-orange-deep px-4 py-2.5 text-center text-sm font-semibold text-cream"
              >
                Start a wave →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
