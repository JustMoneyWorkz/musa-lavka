import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from './PriceDisplay'
import { ProductGrid } from './ProductGrid'
import { useFavoritesStore } from '@/store/favoritesStore'
import { useCartStore } from '@/store/cartStore'
import { getSimilarProducts } from '@/data/products'
import { formatPrice } from '@/utils/format'
import type { Product, ProductVariant } from '@/types'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const { items, addItem } = useCartStore()
  
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  )
  const [quantity, setQuantity] = useState(1)
  
  const isLiked = isFavorite(product.id)
  const cartItem = items.find((item) => item.product.id === product.id)
  const cartQuantity = cartItem?.quantity || 0
  
  const similarProducts = getSimilarProducts(product)
  
  const currentPrice = selectedVariant?.price || product.price
  const totalPrice = currentPrice * quantity

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setQuantity(1)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    navigate('/checkout')
  }

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product.id])

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pb-40"
    >
      {/* Image Gallery with Frame */}
      <div className="relative px-4 pt-4">
        <div className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
          <div className="aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage] || '/images/placeholder.png'}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <Icon name="chevronLeft" size={20} className="text-gray-700" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <Icon name="chevronRight" size={20} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 px-3 py-1.5 rounded-full">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeImage 
                      ? 'bg-white w-4' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Top Buttons - outside the frame */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            variant="icon"
            size="lg"
            onClick={handleToggleFavorite}
          >
            <motion.div ref={heartRef}>
              <Icon
                name={isLiked ? 'heartFilled' : 'heart'}
                className={isLiked ? 'text-red-500' : 'text-gray-700'}
              />
            </motion.div>
          </Button>
          <Button variant="icon" size="lg" onClick={() => navigate(-1)}>
            <Icon name="close" className="text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
              <Icon name="chevronRight" size={14} className="inline ml-1" />
            </button>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {product.name}
        </h1>
        <p className="text-gray-400 mb-4">
          {selectedVariant?.weight || product.weight}
        </p>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Описание</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 1 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Размер упаковки</h2>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    selectedVariant?.id === variant.id
                      ? 'border-lavka-yellow bg-lavka-yellow/10 text-gray-900'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{variant.name}</div>
                  <div className="text-sm text-gray-500">{formatPrice(variant.price)}₽</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Количество</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 rounded-l-xl transition-colors"
              >
                <Icon name="minus" size={20} />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 rounded-r-xl transition-colors"
              >
                <Icon name="plus" size={20} />
              </button>
            </div>
            <div className="text-gray-500">
              = <span className="font-bold text-gray-900">{formatPrice(totalPrice)}₽</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        {product.isFrozen && (
          <div className="flex items-center gap-2 mb-6 text-lavka-blue">
            <Icon name="snowflake" size={18} />
            <span className="text-sm font-medium">Из морозилки</span>
          </div>
        )}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <ProductGrid title="Похожие товары" products={similarProducts} />
        </div>
      )}

      {/* Fixed Bottom Bar with 2 Buttons */}
      <div className="fixed bottom-14 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-40">
        <div className="flex flex-col gap-2">
          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div>
              <PriceDisplay
                price={currentPrice}
                originalPrice={product.originalPrice}
                discountPercent={product.discountPercent}
                size="lg"
              />
              {quantity > 1 && (
                <p className="text-sm text-gray-500">
                  {quantity} шт. = {formatPrice(totalPrice)}₽
                </p>
              )}
            </div>
            {cartQuantity > 0 && (
              <span className="text-sm text-gray-500">
                В корзине: {cartQuantity} шт.
              </span>
            )}
          </div>
          
          {/* Buttons Row */}
          <div className="flex gap-2">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleAddToCart} 
              className="flex-1"
            >
              В корзину
            </Button>
            <Button 
              size="lg" 
              onClick={handleBuyNow} 
              className="flex-1"
            >
              Купить сейчас
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
