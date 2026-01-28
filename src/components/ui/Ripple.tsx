import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RippleItem {
  id: number
  x: number
  y: number
}

export function useRipple(color = 'rgba(255, 255, 255, 0.3)') {
  const [ripples, setRipples] = useState<RippleItem[]>([])

  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { id, x, y }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }, [])

  const RippleContainer = () => (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 50,
            height: 50,
            marginLeft: -25,
            marginTop: -25,
            borderRadius: '50%',
            backgroundColor: color,
            pointerEvents: 'none',
          }}
        />
      ))}
    </AnimatePresence>
  )

  return { createRipple, RippleContainer }
}
