import { memo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ProductImage } from './ProductImage'
import { PriceDisplay } from './PriceDisplay'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  index?: number
}

export const ProductCard = memo(function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: index * 0.08,
        ease: 'power3.out',
      }
    )
  }, [index])

  const handleMouseEnter = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }} 
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        ref={cardRef}
        to={`/product/${product.id}`}
        className="block w-[160px] shrink-0 opacity-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative mb-2 overflow-hidden rounded-card">
          <div ref={imageRef}>
            <ProductImage
              src={product.images[0] || '/images/placeholder.png'}
              alt={product.name}
            />
          </div>
          {product.discountPercent && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20, delay: index * 0.08 + 0.2 }}
              className="absolute top-2 left-2"
            >
              <Badge variant="discount">-{product.discountPercent}%</Badge>
            </motion.div>
          )}
          <div className="absolute bottom-2 right-2">
            <AddToCartButton product={product} />
          </div>
        </div>

        <div className="space-y-1">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />
          <h3 className="text-sm text-gray-900 leading-tight line-clamp-2">
            {product.name}{' '}
            <span className="text-gray-400">{product.weight}</span>
          </h3>
          {product.isFrozen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 + 0.3 }}
            >
              <Badge variant="frozen" className="mt-1">
                <Icon name="snowflake" size={12} />
                из морозилки
              </Badge>
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  )
})
