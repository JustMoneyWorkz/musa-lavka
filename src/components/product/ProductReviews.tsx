import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { useReviewsStore, Review } from '@/store/reviewsStore'
import { useOrdersStore } from '@/store/ordersStore'
import { useTelegram } from '@/hooks/useTelegram'

interface ProductReviewsProps {
  productId: string
  productName: string
}

function StarRating({ rating, size = 16, interactive = false, onChange }: { 
  rating: number
  size?: number
  interactive?: boolean
  onChange?: (rating: number) => void 
}) {
  const [hovered, setHovered] = useState(0)
  
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onChange?.(star)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Icon 
            name={(hovered || rating) >= star ? 'starFilled' : 'star'} 
            size={size}
            className={(hovered || rating) >= star ? 'text-amber-400' : 'text-gray-300'}
          />
        </motion.button>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const date = new Date(review.createdAt)
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
            {review.userName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.userName}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size={14} />
      </div>

      {review.advantages && (
        <div className="mb-2">
          <p className="text-xs font-medium text-green-600 mb-1">✓ Достоинства</p>
          <p className="text-sm text-gray-700">{review.advantages}</p>
        </div>
      )}

      {review.disadvantages && review.disadvantages !== 'Нет' && (
        <div className="mb-2">
          <p className="text-xs font-medium text-red-500 mb-1">✗ Недостатки</p>
          <p className="text-sm text-gray-700">{review.disadvantages}</p>
        </div>
      )}

      {review.comment && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      )}
    </motion.div>
  )
}

function WriteReviewForm({ productId, productName, onClose }: { 
  productId: string
  productName: string
  onClose: () => void 
}) {
  const { user } = useTelegram()
  const { addReview } = useReviewsStore()
  const [rating, setRating] = useState(5)
  const [advantages, setAdvantages] = useState('')
  const [disadvantages, setDisadvantages] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addReview({
      productId,
      userId: user?.id?.toString() || 'guest',
      userName: user?.first_name || 'Гость',
      rating,
      advantages,
      disadvantages: disadvantages || 'Нет',
      comment,
    })
    
    setIsSubmitting(false)
    onClose()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-4 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Ваш отзыв</h3>
        <button type="button" onClick={onClose}>
          <Icon name="close" size={20} className="text-gray-400" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">{productName}</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Оценка</label>
        <StarRating rating={rating} size={28} interactive onChange={setRating} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Достоинства</label>
        <input
          type="text"
          value={advantages}
          onChange={(e) => setAdvantages(e.target.value)}
          placeholder="Что понравилось?"
          className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lavka-yellow"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Недостатки</label>
        <input
          type="text"
          value={disadvantages}
          onChange={(e) => setDisadvantages(e.target.value)}
          placeholder="Что не понравилось?"
          className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lavka-yellow"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Расскажите подробнее..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-lavka-yellow"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
      </Button>
    </motion.form>
  )
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { getProductReviews, getAverageRating, getReviewCount } = useReviewsStore()
  const { orders } = useOrdersStore()
  const [showWriteForm, setShowWriteForm] = useState(false)

  const reviews = getProductReviews(productId)
  const averageRating = getAverageRating(productId)
  const reviewCount = getReviewCount(productId)

  const orderedProductIds = orders.flatMap(order => order.items.map(item => item.product.id))
  const canWrite = orderedProductIds.includes(productId)

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percent: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 px-4">
        Отзывы {reviewCount > 0 && <span className="text-gray-400 font-normal">({reviewCount})</span>}
      </h2>

      {reviewCount > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 rounded-2xl p-4 mx-4 mb-4"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <motion.p 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-4xl font-bold text-gray-900"
              >
                {averageRating}
              </motion.p>
              <StarRating rating={Math.round(averageRating)} size={14} />
              <p className="text-xs text-gray-400 mt-1">{reviewCount} отзывов</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {ratingCounts.map(({ star, count, percent }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3">{star}</span>
                  <Icon name="starFilled" size={12} className="text-amber-400" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.5, delay: star * 0.1 }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="px-4 mb-4">
        {canWrite ? (
          <AnimatePresence mode="wait">
            {showWriteForm ? (
              <WriteReviewForm 
                key="form"
                productId={productId} 
                productName={productName}
                onClose={() => setShowWriteForm(false)} 
              />
            ) : (
              <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setShowWriteForm(true)}
                >
                  Написать отзыв
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <p className="text-sm text-gray-400 text-center py-2">
            Оставить отзыв можно после покупки товара
          </p>
        )}
      </div>

      <div className="space-y-3 px-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))
        ) : (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">💬</span>
            <p className="text-gray-500">Пока нет отзывов</p>
            <p className="text-sm text-gray-400">Станьте первым!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function ProductRatingBadge({ productId, onClick }: { productId: string; onClick?: () => void }) {
  const { getAverageRating, getReviewCount } = useReviewsStore()
  const averageRating = getAverageRating(productId)
  const reviewCount = getReviewCount(productId)

  if (reviewCount === 0) return null

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm"
    >
      <Icon name="starFilled" size={16} className="text-amber-400" />
      <span className="font-medium text-gray-900">{averageRating}</span>
      <span className="text-gray-400">({reviewCount} отзывов)</span>
    </motion.button>
  )
}
