import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'delivered'
  createdAt: string
  address: string
  phone: string
}

interface OrdersState {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void
  getOrders: () => Order[]
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'confirmed',
        }
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))
      },

      getOrders: () => get().orders,
    }),
    {
      name: 'lavka-orders',
    }
  )
)
