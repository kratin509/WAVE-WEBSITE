const TONES = {
  // small contrasting rectangular label — variant per surface, so it always
  // reads as a quiet signal rather than another loud element
  light: 'bg-wave-peach-light/70 text-ink/70',
  dark: 'bg-cream/10 text-cream/80',
  orange: 'bg-ink text-cream/90',
}

export function SectionLabel({ children, tone = 'light', className = '', ...props }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase ${TONES[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
