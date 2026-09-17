import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MagneticLink } from './MagneticLink'
import logo from '../assets/brand/logo.jpg'

const LINKS = [
  { label: 'Why Wave', href: '#why-wave' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'Case studies', href: '#case-studies' },
]

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-full bg-cream py-2 pr-2 pl-4 shadow-[0_8px_30px_-12px_rgba(13,13,13,0.35)] sm:pl-5">
        <MagneticLink href="#top" cursor="link" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="Wave" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-display text-lg leading-none font-bold lowercase tracking-tight text-ink">
            wave
          </span>
        </MagneticLink>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <MagneticLink
              key={link.href}
              href={link.href}
              cursor="link"
              className="text-[13px] font-medium tracking-wide text-ink/60 transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </MagneticLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MagneticLink
            href="#start-a-wave"
            cursor="button"
            className="hidden items-center gap-2 rounded-full bg-wave-orange-deep py-1.5 pr-1.5 pl-4 text-[13px] font-semibold tracking-wide text-cream transition-colors duration-200 hover:bg-ink sm:flex"
          >
            Start a wave
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/20 text-sm"
            >
              ↗
            </span>
          </MagneticLink>

          <button
            type="button"
            aria-label="Toggle menu"
            data-cursor="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors lg:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-4xl overflow-hidden rounded-3xl bg-cream shadow-[0_8px_30px_-12px_rgba(13,13,13,0.35)] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink"
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
