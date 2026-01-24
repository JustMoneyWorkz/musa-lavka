export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discountPercent?: number
  categoryId: string
  images: string[]
  tags: string[]
  weight: string
  inStock: boolean
  isFrozen: boolean
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  weight: string
}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
  variantId?: string
}

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  bgColor: string
  textColor: string
  link: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'processing' | 'delivered'
  customerName: string
  customerPhone: string
  deliveryAddress: string
  createdAt: string
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  language_code?: string
}
