import { motion } from 'framer-motion'
import { useMagnetic } from '../lib/useMagnetic'

export function MagneticLink({ href, children, className = '', cursor = 'link', onClick }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useMagnetic(0.3, 12)

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      data-cursor={cursor}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  )
}
