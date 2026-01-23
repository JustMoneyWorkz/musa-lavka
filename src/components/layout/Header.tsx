import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current || !logoRef.current) return

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )

    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180 },
      { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
    )
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100/50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <motion.div 
            ref={logoRef}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg cursor-pointer"
          >
            <span className="text-white text-sm font-bold">М</span>
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500"
          >
            Круглосуточно
          </motion.span>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md cursor-pointer"
        />
      </div>
    </header>
  )
}
