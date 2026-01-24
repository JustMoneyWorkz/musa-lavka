import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'

export function DeliveryBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const bikeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    gsap.fromTo(
      barRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.5 }
    )
  }, [])

  useEffect(() => {
    if (!bikeRef.current) return

    gsap.to(bikeRef.current, {
      x: 3,
      duration: 0.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <motion.div 
      ref={barRef}
      whileHover={{ scale: 1.01 }}
      className="fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 safe-bottom cursor-pointer"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div ref={bikeRef}>
            <Icon name="bike" size={24} className="text-gray-700" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Icon name="lightning" size={16} className="text-lavka-yellow" />
            </motion.div>
            <span className="text-gray-700">Доставка 0-199₽</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-700">15-30 мин</span>
          </div>
        </div>
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Icon name="chevronRight" size={20} className="text-gray-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}
