import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'

const emptyCartVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    }
  },
}

const emojiVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    }
  },
}

export function CartPage() {
  const { items, clearCart } = useCartStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <PageContainer>
        <div className="px-4 py-4">
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">Корзина</h1>
            <AnimatePresence>
              {items.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Очистить
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {items.length === 0 ? (
              <motion.div
                key="empty"
                variants={emptyCartVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <motion.span 
                  variants={emojiVariants}
                  className="text-6xl mb-4"
                >
                  🛒
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-gray-900 mb-2"
                >
                  Корзина пуста
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-500 mb-6 text-center"
                >
                  Добавьте товары, чтобы оформить заказ
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/">
                    <Button>Перейти в каталог</Button>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnimatePresence>
                  {items.map((item, index) => (
                    <CartItem 
                      key={item.product.id} 
                      item={item} 
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {items.length > 0 && <CartSummary />}
        </AnimatePresence>
      </PageContainer>
    </motion.div>
  )
}
