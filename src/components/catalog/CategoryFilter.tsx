import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/utils/cn'

const filters = [
  { id: 'history', icon: 'clock' as const, label: 'уже брали' },
  { id: 'favorites', icon: 'heartFilled' as const, label: 'любимое', iconColor: 'text-red-500' },
  { id: 'sale', icon: null, label: 'скидки', emoji: '🏷️' },
  { id: 'new', icon: null, label: 'новинки', emoji: '✨' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

export function CategoryFilter() {
  const { activeCategory, setActiveCategory } = useUIStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.filter-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 15, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      }
    )
  }, [])

  return (
    <motion.div 
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="scroll-container py-3"
    >
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setActiveCategory(activeCategory === filter.id ? null : filter.id)
          }
          className={cn(
            'filter-item scroll-item flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap',
            activeCategory === filter.id
              ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm'
          )}
        >
          {filter.emoji ? (
            <motion.span 
              className="text-base"
              animate={activeCategory === filter.id ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {filter.emoji}
            </motion.span>
          ) : filter.icon ? (
            <Icon
              name={filter.icon}
              size={18}
              className={filter.iconColor || ''}
            />
          ) : null}
          <span className="text-sm font-medium">{filter.label}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}
