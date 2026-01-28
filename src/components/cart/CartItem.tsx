import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ProductImage } from '@/components/product/ProductImage'
import { PriceDisplay } from '@/components/product/PriceDisplay'
import { Icon } from '@/components/ui/Icon'
import { useCartStore } from '@/store/cartStore'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
  index?: number
}

export function CartItem({ item, index = 0 }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()
  const { product, quantity } = item
  const itemRef = useRef<HTMLDivElement>(null)
  const quantityRef = useRef<HTMLSpanElement>(null)

  const animateQuantityChange = () => {
    if (quantityRef.current) {
      gsap.fromTo(
        quantityRef.current,
        { scale: 1.3, color: '#FCD34D' },
        { scale: 1, color: '#1F2937', duration: 0.3, ease: 'back.out(1.7)' }
      )
    }
  }

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1)
    animateQuantityChange()
  }

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1)
    animateQuantityChange()
  }

  const handleRemove = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => removeItem(product.id),
      })
    }
  }

  return (
    <motion.div
      ref={itemRef}
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        delay: index * 0.05
      }}
      className="flex gap-3 py-3 border-b border-gray-100"
    >
      <motion.div 
        className="w-20 h-20 shrink-0"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <ProductImage
          src={product.images[0] || '/images/placeholder.png'}
          alt={product.name}
        />
      </motion.div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{product.weight}</p>
        <motion.div
          key={quantity}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
        >
          <PriceDisplay price={product.price * quantity} size="sm" />
        </motion.div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <motion.button
          onClick={handleRemove}
          whileHover={{ scale: 1.1, color: '#EF4444' }}
          whileTap={{ scale: 0.9 }}
          className="p-1 text-gray-400 transition-colors"
        >
          <Icon name="close" size={18} />
        </motion.button>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full">
          <motion.button
            onClick={handleDecrease}
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <Icon name="minus" size={16} />
          </motion.button>
          <motion.span 
            ref={quantityRef}
            className="w-5 text-center font-medium text-sm"
          >
            {quantity}
          </motion.span>
          <motion.button
            onClick={handleIncrease}
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <Icon name="plus" size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
