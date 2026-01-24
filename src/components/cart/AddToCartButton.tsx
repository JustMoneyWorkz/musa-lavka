import { useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
  variant?: 'icon' | 'full'
  size?: 'sm' | 'md' | 'lg'
}

export function AddToCartButton({
  product,
  variant = 'icon',
  size = 'md',
}: AddToCartButtonProps) {
  const { items, addItem, updateQuantity } = useCartStore()
  const cartItem = items.find((item) => item.product.id === product.id)
  const quantity = cartItem?.quantity || 0
  const buttonRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  const animateAdd = useCallback(() => {
    if (iconRef.current) {
      gsap.timeline()
        .to(iconRef.current, {
          scale: 1.3,
          rotate: 90,
          duration: 0.15,
          ease: 'power2.out',
        })
        .to(iconRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'back.out(1.7)',
        })
    }
  }, [])

  const animatePulse = useCallback(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        }
      )
    }
  }, [])

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    animateAdd()
  }

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateQuantity(product.id, quantity - 1)
    animatePulse()
  }

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateQuantity(product.id, quantity + 1)
    animatePulse()
  }

  if (variant === 'full') {
    return (
      <div ref={buttonRef}>
        <AnimatePresence mode="wait">
          {quantity === 0 ? (
            <motion.div
              key="add"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Button onClick={handleAdd} size={size} className="w-full">
                В корзину
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="quantity"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="flex items-center justify-between bg-lavka-yellow rounded-btn overflow-hidden"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrease}
                className="h-12 px-4 flex items-center justify-center hover:bg-lavka-yellow-hover transition-colors"
              >
                <Icon name="minus" size={20} />
              </motion.button>
              <motion.span 
                key={quantity}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-bold text-lg"
              >
                {quantity}
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrease}
                className="h-12 px-4 flex items-center justify-center hover:bg-lavka-yellow-hover transition-colors"
              >
                <Icon name="plus" size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div ref={buttonRef}>
      <AnimatePresence mode="wait">
        {quantity === 0 ? (
          <motion.div
            key="add"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Button variant="icon" size={size} onClick={handleAdd}>
              <div ref={iconRef}>
                <Icon name="plus" size={20} />
              </div>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="quantity"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="flex items-center gap-0.5 bg-white rounded-full shadow-btn"
          >
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon name="minus" size={16} />
            </motion.button>
            <motion.span 
              key={quantity}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="w-5 text-center font-bold text-sm"
            >
              {quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleIncrease}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon name="plus" size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
