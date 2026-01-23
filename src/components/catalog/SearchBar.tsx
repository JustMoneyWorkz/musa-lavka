import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { useUIStore } from '@/store/uiStore'

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useUIStore()
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className="px-4 py-2">
      <motion.div
        ref={containerRef}
        animate={{
          boxShadow: isFocused
            ? '0 0 0 2px rgba(252, 211, 77, 0.6), 0 4px 12px rgba(0, 0, 0, 0.1)'
            : '0 0 0 0px rgba(252, 211, 77, 0), 0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center bg-gray-100 rounded-xl overflow-hidden"
      >
        <motion.div
          animate={{ 
            x: isFocused ? -2 : 0,
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-4"
        >
          <Icon 
            name="search" 
            size={20} 
            className={`transition-colors duration-200 ${isFocused ? 'text-lavka-yellow-hover' : 'text-gray-400'}`}
          />
        </motion.div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Найти в Лавке"
          className="w-full h-12 pl-12 pr-10 bg-transparent text-base placeholder:text-gray-400 outline-none"
        />
        
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClear}
              className="absolute right-3 p-1.5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
            >
              <Icon name="close" size={12} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
