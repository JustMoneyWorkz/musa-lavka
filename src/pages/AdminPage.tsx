import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useTelegram } from '@/hooks/useTelegram'
import { products, categories } from '@/data/products'
import { formatPrice } from '@/utils/format'
import type { Product } from '@/types'

type Tab = 'products' | 'orders' | 'settings'

export function AdminPage() {
  const navigate = useNavigate()
  const { isAdmin, user } = useTelegram()
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🔒</span>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Доступ запрещён</h1>
          <p className="text-gray-500 mb-4">У вас нет прав администратора</p>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'products' as Tab, label: 'Товары', icon: '📦' },
    { id: 'orders' as Tab, label: 'Заказы', icon: '📋' },
    { id: 'settings' as Tab, label: 'Настройки', icon: '⚙️' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <PageContainer>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
              <p className="text-sm text-gray-500">
                Привет, {user?.first_name || 'Admin'}!
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Все товары ({products.length})
                  </h2>
                  <Button size="sm">
                    <Icon name="plus" size={16} className="mr-1" />
                    Добавить
                  </Button>
                </div>

                <div className="space-y-3">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      className="flex gap-3 p-3 bg-gray-50 rounded-card"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {categories.find((c) => c.id === product.categoryId)?.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-sm">
                            {formatPrice(product.price)}₽
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}₽
                            </span>
                          )}
                          {product.isFrozen && (
                            <span className="text-xs text-lavka-blue">❄️</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
                        >
                          ✏️
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded">
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-12"
              >
                <span className="text-5xl mb-4 block">📋</span>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Заказы
                </h2>
                <p className="text-gray-500">
                  Здесь будут отображаться заказы.<br />
                  Уведомления приходят в Telegram.
                </p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-card">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Telegram Bot
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Настройки бота для уведомлений о заказах
                    </p>
                    <input
                      type="text"
                      placeholder="BOT_TOKEN"
                      className="w-full h-10 px-3 border border-gray-200 rounded-btn text-sm"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-card">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Администраторы
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Telegram ID пользователей с правами админа
                    </p>
                    <input
                      type="text"
                      placeholder="123456789, 987654321"
                      className="w-full h-10 px-3 border border-gray-200 rounded-btn text-sm"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-card">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Доставка
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">
                          Мин. сумма бесплатной доставки
                        </label>
                        <input
                          type="number"
                          defaultValue={1500}
                          className="w-full h-10 px-3 border border-gray-200 rounded-btn text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Стоимость доставки
                        </label>
                        <input
                          type="number"
                          defaultValue={199}
                          className="w-full h-10 px-3 border border-gray-200 rounded-btn text-sm"
                        />
                      </div>
                    </div>
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
