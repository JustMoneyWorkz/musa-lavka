import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { useFavoritesStore } from '@/store/favoritesStore'

const emptyVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  },
}

const heartVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: 'easeOut',
    }
  },
}

export function FavoritesPage() {
  const { items } = useFavoritesStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <PageContainer>
        <motion.div 
          className="px-4 py-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Любимое</h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              variants={emptyVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <motion.span 
                variants={heartVariants}
                className="text-6xl mb-4"
              >
                ❤️
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                Пока пусто
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 mb-6 text-center"
              >
                Добавляйте товары в избранное, чтобы не потерять их
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
            >
              <ProductGrid products={items} />
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </motion.div>
  )
}
