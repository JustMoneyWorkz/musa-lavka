import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BottomNav } from '@/components/layout/BottomNav'
import { DeliveryBar } from '@/components/layout/DeliveryBar'
import { HomePage } from '@/pages/HomePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { ProductPage } from '@/pages/ProductPage'
import { CartPage } from '@/pages/CartPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { CheckoutPage } from '@/pages/CheckoutPage'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: {
      duration: 0.2,
    }
  },
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const isProductPage = location.pathname.startsWith('/product/')

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/catalog" element={<AnimatedPage><CatalogPage /></AnimatedPage>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<AnimatedPage><CartPage /></AnimatedPage>} />
          <Route path="/favorites" element={<AnimatedPage><FavoritesPage /></AnimatedPage>} />
          <Route path="/checkout" element={<AnimatedPage><CheckoutPage /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
      
      <AnimatePresence>
        {!isProductPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <DeliveryBar />
          </motion.div>
        )}
      </AnimatePresence>
      
      <BottomNav />
    </div>
  )
}
