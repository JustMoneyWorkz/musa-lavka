import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { useCartStore } from '@/store/cartStore'

export function CartSummary() {
  const { items, getTotal, getItemCount } = useCartStore()
  const total = getTotal()
  const itemCount = getItemCount()

  if (items.length === 0) return null

  const getItemWord = (count: number) => {
    if (count === 1) return 'товар'
    if (count >= 2 && count <= 4) return 'товара'
    return 'товаров'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 safe-bottom shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <motion.p 
            className="text-sm text-gray-500"
            key={itemCount}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {itemCount} {getItemWord(itemCount)}
          </motion.p>
          <p className="text-xl font-bold text-gray-900">
            <AnimatedNumber value={total} suffix="₽" />
          </p>
        </div>
        <Link to="/checkout">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button size="lg">Оформить заказ</Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
