import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { Icon } from '@/components/ui/Icon'
import { useTelegram } from '@/hooks/useTelegram'
import { useOrdersStore, Order } from '@/store/ordersStore'
import { formatPrice } from '@/utils/format'

type Tab = 'orders' | 'settings'

function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.createdAt)
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          {order.status === 'confirmed' ? 'Подтверждён' : order.status === 'delivered' ? 'Доставлен' : 'Ожидает'}
        </span>
      </div>
      <div className="space-y-2 mb-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              🥜
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{item.product.name}</p>
              <p className="text-xs text-gray-500">{item.quantity} шт.</p>
            </div>
            <span className="text-sm font-medium">{formatPrice(item.price)}₽</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">Итого</span>
        <span className="font-bold">{formatPrice(order.total)}₽</span>
      </div>
    </motion.div>
  )
}

export function ProfilePage() {
  const { user } = useTelegram()
  const { orders } = useOrdersStore()
  const [activeTab, setActiveTab] = useState<Tab>('orders')

  const handleSupport = () => {
    window.open('https://t.me/support', '_blank')
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
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user?.first_name?.[0] || '👤'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {user?.first_name || 'Гость'}
              </h1>
              <p className="text-sm text-gray-500">
                {user?.username ? `@${user.username}` : 'Telegram пользователь'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 rounded-full font-medium transition-all ${
                activeTab === 'orders'
                  ? 'bg-lavka-yellow text-gray-900'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Мои заказы
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 rounded-full font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-lavka-yellow text-gray-900'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Настройки
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'orders' ? (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <span className="text-5xl mb-4 block">📦</span>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Пока нет заказов
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Ваши заказы появятся здесь
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                <button
                  onClick={handleSupport}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="chat" size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Связаться с поддержкой</p>
                    <p className="text-sm text-gray-500">Мы всегда на связи</p>
                  </div>
                  <Icon name="chevronRight" size={20} className="text-gray-400" />
                </button>

                <div className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🥜</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Мини-Лавка</p>
                    <p className="text-sm text-gray-500">Версия 1.0.0</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageContainer>
    </motion.div>
  )
}
