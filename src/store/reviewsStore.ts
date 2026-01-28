import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  advantages: string
  disadvantages: string
  comment: string
  createdAt: string
}

interface ReviewsState {
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  getProductReviews: (productId: string) => Review[]
  getAverageRating: (productId: string) => number
  getReviewCount: (productId: string) => number
  canWriteReview: (productId: string, orderedProductIds: string[]) => boolean
}

const initialReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'Анна М.',
    rating: 5,
    advantages: 'Свежий, хрустящий, отличный вкус',
    disadvantages: 'Нет',
    comment: 'Очень вкусный миндаль! Заказываю уже третий раз, всегда свежий и качественный.',
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    userName: 'Дмитрий К.',
    rating: 4,
    advantages: 'Хорошее качество, быстрая доставка',
    disadvantages: 'Хотелось бы упаковку побольше',
    comment: 'Хороший миндаль, но хотелось бы вариант упаковки 1кг.',
    createdAt: '2026-01-18T15:30:00Z',
  },
  {
    id: 'r3',
    productId: '2',
    userId: 'u3',
    userName: 'Елена С.',
    rating: 5,
    advantages: 'Натуральный вкус, крупные орешки',
    disadvantages: 'Нет',
    comment: 'Лучший кешью что я пробовала! Очень нежный и вкусный.',
    createdAt: '2026-01-15T12:00:00Z',
  },
  {
    id: 'r4',
    productId: '3',
    userId: 'u4',
    userName: 'Михаил П.',
    rating: 5,
    advantages: 'Сладкие, мягкие, крупные',
    disadvantages: 'Цена высоковата',
    comment: 'Финики просто шикарные! Как конфеты, только полезные.',
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'r5',
    productId: '4',
    userId: 'u5',
    userName: 'Ольга В.',
    rating: 4,
    advantages: 'Натуральная, без сахара',
    disadvantages: 'Немного суховата',
    comment: 'Хорошая курага, но бывает и более сочная.',
    createdAt: '2026-01-08T14:00:00Z',
  },
]

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: initialReviews,

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review-${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }))
      },

      getProductReviews: (productId) => {
        return get().reviews.filter((r) => r.productId === productId)
      },

      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter((r) => r.productId === productId)
        if (productReviews.length === 0) return 0
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0)
        return Math.round((sum / productReviews.length) * 10) / 10
      },

      getReviewCount: (productId) => {
        return get().reviews.filter((r) => r.productId === productId).length
      },

      canWriteReview: (productId, orderedProductIds) => {
        return orderedProductIds.includes(productId)
      },
    }),
    {
      name: 'lavka-reviews',
    }
  )
)
