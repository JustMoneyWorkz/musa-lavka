import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from './PriceDisplay'
import { ProductGrid } from './ProductGrid'
import { ProductReviews, ProductRatingBadge } from './ProductReviews'
import { useFavoritesStore } from '@/store/favoritesStore'
import { useCartStore } from '@/store/cartStore'
import { getSimilarProducts, getFrequentlyBoughtTogether } from '@/data/products'
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
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showComposition, setShowComposition] = useState(false)
  
  const isLiked = isFavorite(product.id)
  const isLongDescription = product.description.length > 150
  const cartItem = items.find((item) => item.product.id === product.id)
  const cartQuantity = cartItem?.quantity || 0
  
  const similarProducts = getSimilarProducts(product)
  const frequentlyBought = getFrequentlyBoughtTogether(product)
  const reviewsRef = useRef<HTMLDivElement>(null)

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
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
    navigate('/checkout', { 
      state: { 
        directPurchase: true,
        product,
        quantity,
        price: currentPrice,
        total: totalPrice
      } 
    })
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
      className="min-h-screen bg-gray-50 pb-40 relative overflow-hidden"
    >
      <div className="absolute top-20 -left-20 w-64 h-64 bg-amber-100 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-96 -right-32 w-80 h-80 bg-orange-100 rounded-full opacity-25 blur-3xl" />
      <div className="absolute bottom-96 -left-16 w-48 h-48 bg-lime-100 rounded-full opacity-30 blur-3xl" />
      {/* Image Gallery with Frame */}
      <div className="relative px-4 pt-4">
        <div className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
          <div className="aspect-square">
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
        <p className="text-gray-400 mb-2">
          {selectedVariant?.weight || product.weight}
        </p>
        
        {/* Rating Badge */}
        <div className="mb-4">
          <ProductRatingBadge productId={product.id} onClick={scrollToReviews} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Описание</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={showFullDescription ? 'full' : 'short'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-gray-600 leading-relaxed">
                {showFullDescription || !isLongDescription 
                  ? product.description 
                  : `${product.description.slice(0, 150)}...`}
              </p>
            </motion.div>
          </AnimatePresence>
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-lavka-yellow font-medium text-sm mt-2 flex items-center gap-1"
            >
              {showFullDescription ? 'Свернуть' : 'Читать полностью'}
              <motion.span
                animate={{ rotate: showFullDescription ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="chevronDown" size={16} />
              </motion.span>
            </button>
          )}
        </div>

        {/* Composition - Expandable */}
        {product.composition && (
          <div className="border-t border-gray-200">
            <button
              onClick={() => setShowComposition(!showComposition)}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="font-semibold text-gray-900">Состав</span>
              <motion.span
                animate={{ rotate: showComposition ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="chevronDown" size={18} className="text-gray-400" />
              </motion.span>
            </button>
            <AnimatePresence>
              {showComposition && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-500 leading-relaxed pb-3">
                    {product.composition}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Nutrition Info - Always Visible */}
        {product.nutrition && (
          <div className="border-t border-gray-200 py-3">
            <p className="font-semibold text-gray-900 mb-2">Пищевая ценность</p>
            <p className="text-xs text-gray-400 mb-2">на {product.nutrition.per}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{product.nutrition.calories} ккал</span>
              <span className="text-gray-300">|</span>
              <span>Б {product.nutrition.protein} г</span>
              <span className="text-gray-300">|</span>
              <span>Ж {product.nutrition.fat} г</span>
              <span className="text-gray-300">|</span>
              <span>У {product.nutrition.carbs} г</span>
            </div>
            {product.nutrition.fiber && (
              <p className="text-xs text-gray-400 mt-1">
                Клетчатка: {product.nutrition.fiber} г
              </p>
            )}
          </div>
        )}

        {/* Variants */}
        {product.variants && product.variants.length > 1 && (
          <div className="mb-4 border-t border-gray-200 pt-3">
            <p className="font-semibold text-gray-900 mb-3">Размер упаковки</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`flex-shrink-0 w-20 rounded-xl border-2 transition-all overflow-hidden ${
                    selectedVariant?.id === variant.id
                      ? 'border-lavka-yellow'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {variant.image ? (
                    <div className="w-full aspect-square bg-gray-100">
                      <img 
                        src={variant.image} 
                        alt={variant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                  )}
                  <div className="p-1.5 text-center bg-white">
                    <p className="text-xs font-medium text-gray-900">{variant.name}</p>
                    <p className="text-xs text-gray-500">{formatPrice(variant.price)}₽</p>
                  </div>
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

      {/* Frequently Bought Together */}
      {frequentlyBought.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <ProductGrid title="🛒 Часто берут вместе" products={frequentlyBought} />
        </div>
      )}

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4 bg-white">
          <ProductGrid title="🥜 Похожие товары" products={similarProducts} />
        </div>
      )}

      {/* Reviews Section */}
      <div ref={reviewsRef} className="bg-white">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>

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
