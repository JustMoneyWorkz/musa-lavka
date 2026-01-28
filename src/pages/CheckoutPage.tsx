import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { useCartStore } from '@/store/cartStore'
import { useOrdersStore } from '@/store/ordersStore'
import type { Product } from '@/types'

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
}

interface DirectPurchaseState {
  directPurchase: boolean
  product: Product
  quantity: number
  price: number
  total: number
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, getTotal, clearCart } = useCartStore()
  const { addOrder } = useOrdersStore()
  
  const directState = location.state as DirectPurchaseState | null
  const isDirectPurchase = directState?.directPurchase === true
  
  const total = isDirectPurchase ? directState.total : getTotal()
  const deliveryFee = total >= 1500 ? 0 : 199
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isDirectPurchase && directState) {
      addOrder({
        items: [{
          product: directState.product,
          quantity: directState.quantity,
          price: directState.total,
        }],
        total: directState.total + deliveryFee,
        address: formData.address,
        phone: formData.phone,
      })
    } else {
      addOrder({
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        })),
        total: total + deliveryFee,
        address: formData.address,
        phone: formData.phone,
      })
      clearCart()
    }

    setIsSuccess(true)
    
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  if (items.length === 0 && !isSuccess && !isDirectPurchase) {
    navigate('/cart')
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <PageContainer>
        <div className="px-4 py-4">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-500 mb-4"
          >
            <Icon name="chevronLeft" size={20} />
            <span>Назад</span>
          </motion.button>

          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Оформление заказа
          </motion.h1>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl"
                  >
                    ✓
                  </motion.span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold text-gray-900 mb-2"
                >
                  Заказ оформлен!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-500"
                >
                  Ожидайте доставку
                </motion.p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={fieldVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full h-12 px-4 border border-gray-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-lavka-yellow transition-shadow"
                    placeholder="Как к вам обращаться?"
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full h-12 px-4 border border-gray-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-lavka-yellow transition-shadow"
                    placeholder="+7 (___) ___-__-__"
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Адрес доставки
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full h-12 px-4 border border-gray-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-lavka-yellow transition-shadow"
                    placeholder="Улица, дом, квартира"
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Комментарий
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className="w-full h-24 px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-lavka-yellow resize-none transition-shadow"
                    placeholder="Комментарий к заказу"
                  />
                </motion.div>

                <motion.div 
                  variants={fieldVariants}
                  className="border-t border-gray-100 pt-4 mt-6"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Товары</span>
                    <span className="font-medium">
                      <AnimatedNumber value={total} suffix="₽" />
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Доставка</span>
                    <motion.span 
                      className="font-medium"
                      animate={deliveryFee === 0 ? { color: '#10B981' } : {}}
                    >
                      {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee}₽`}
                    </motion.span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                    <span>Итого</span>
                    <span>
                      <AnimatedNumber value={total + deliveryFee} suffix="₽" />
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Button
                    ref={buttonRef}
                    type="submit"
                    size="lg"
                    className="w-full mt-4"
                    disabled={isSubmitting}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            ⏳
                          </motion.span>
                          Оформляем...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="pay"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Оплатить
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </PageContainer>
    </motion.div>
  )
}
