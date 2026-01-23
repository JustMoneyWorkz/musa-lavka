import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from './PriceDisplay'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { useFavoritesStore } from '@/store/favoritesStore'
import type { Product } from '@/types'

interface ProductDetailProps {
  product: Product
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  },
}

const imageVariants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
}

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, delay: 0.2 }
  },
}

export function ProductDetail({ product }: ProductDetailProps) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const [activeImage, setActiveImage] = useState(0)
  const isLiked = isFavorite(product.id)

  const handleToggleFavorite = () => {
    toggleFavorite(product)
    
    if (heartRef.current && !isLiked) {
      gsap.timeline()
        .to(heartRef.current, {
          scale: 1.4,
          duration: 0.15,
          ease: 'power2.out',
        })
        .to(heartRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div 
      ref={containerRef}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-white"
    >
      <div className="relative">
        <motion.div 
          className="aspect-square bg-gray-100 overflow-hidden"
          variants={imageVariants}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={product.images[activeImage] || '/images/placeholder.png'}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Button
            variant="icon"
            size="lg"
            onClick={handleToggleFavorite}
          >
            <motion.div 
              ref={heartRef}
              animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Icon
                name={isLiked ? 'heartFilled' : 'heart'}
                className={isLiked ? 'text-red-500' : 'text-gray-700'}
              />
            </motion.div>
          </Button>
          <Button variant="icon" size="lg" onClick={() => navigate(-1)}>
            <Icon name="close" className="text-gray-700" />
          </Button>
        </motion.div>

        {product.images.length > 1 && (
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {product.images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveImage(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === activeImage ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>

      <motion.div 
        className="px-4 py-4"
        variants={contentVariants}
      >
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.05 }}
        >
          {product.tags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
              <Icon name="chevronRight" size={14} className="inline ml-1" />
            </motion.button>
          ))}
        </motion.div>

        <motion.h1 
          className="text-2xl font-bold text-gray-900 mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {product.name}
        </motion.h1>
        <motion.p 
          className="text-gray-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {product.weight}
        </motion.p>

        {product.description && (
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {product.description}
          </motion.p>
        )}
      </motion.div>

      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 safe-bottom"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between gap-4">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
            size="lg"
          />
          <div className="flex-1 max-w-[200px]">
            <AddToCartButton product={product} variant="full" size="lg" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
