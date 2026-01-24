import type { Product, Category } from '@/types'

export const categories: Category[] = [
  { id: '1', name: 'Орехи', icon: '🥜', slug: 'nuts' },
  { id: '2', name: 'Сухофрукты', icon: '🍇', slug: 'dried-fruits' },
  { id: '3', name: 'Смеси', icon: '🥗', slug: 'mixes' },
  { id: '4', name: 'Цукаты', icon: '🍬', slug: 'candied' },
  { id: '5', name: 'Семена', icon: '🌻', slug: 'seeds' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Малина Franui в молочном и белом шоколаде замороженная',
    description: 'Свежая малина в нежном молочном и белом шоколаде. Идеальный десерт для любого случая. Малина собирается на экологически чистых плантациях Патагонии и покрывается натуральным бельгийским шоколадом.',
    price: 899,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1587815073078-f636169821e3?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
    ],
    tags: ['Десерты', 'Замороженные десерты', 'Franui'],
    weight: '150 г',
    inStock: true,
    isFrozen: true,
    variants: [
      { id: 'v1', name: '150 г', price: 899, weight: '150 г' },
      { id: 'v2', name: '300 г', price: 1699, weight: '300 г' },
    ],
  },
  {
    id: '2',
    name: 'Чебупицца Горячая штучка',
    description: 'Вкуснейшая чебупицца с сыром и ветчиной. Идеально подходит для быстрого перекуса. Просто разогрейте в микроволновке 2-3 минуты.',
    price: 145,
    originalPrice: 239,
    discountPercent: 39,
    categoryId: '3',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
    ],
    tags: ['Готовая еда', 'Замороженное'],
    weight: '250 г',
    inStock: true,
    isFrozen: true,
  },
  {
    id: '3',
    name: 'Миндаль жареный соленый',
    description: 'Отборный миндаль, обжаренный до золотистого цвета с морской солью. Богат витамином E и полезными жирами. Идеальный снек для здорового перекуса.',
    price: 450,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1609534717940-6dc2241c9778?w=400&h=400&fit=crop',
    ],
    tags: ['Орехи', 'Снеки'],
    weight: '200 г',
    inStock: true,
    isFrozen: false,
    variants: [
      { id: 'v1', name: '100 г', price: 250, weight: '100 г' },
      { id: 'v2', name: '200 г', price: 450, weight: '200 г' },
      { id: 'v3', name: '500 г', price: 999, weight: '500 г' },
    ],
  },
  {
    id: '4',
    name: 'Кешью натуральный',
    description: 'Нежный кешью без обработки, сохранивший все полезные свойства. Выращен во Вьетнаме. Содержит магний, цинк и железо.',
    price: 590,
    originalPrice: 690,
    discountPercent: 15,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1563292651-4d6c7b893cb8?w=400&h=400&fit=crop',
    ],
    tags: ['Орехи', 'Натуральное'],
    weight: '250 г',
    inStock: true,
    isFrozen: false,
    variants: [
      { id: 'v1', name: '250 г', price: 590, weight: '250 г' },
      { id: 'v2', name: '500 г', price: 1099, weight: '500 г' },
    ],
  },
  {
    id: '5',
    name: 'Финики Меджул премиум',
    description: 'Королевские финики Меджул — самые крупные и сладкие. Выращены в Израиле. Природный источник энергии, богаты калием и клетчаткой.',
    price: 799,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1593904308877-9bcb88b4e7b1?w=400&h=400&fit=crop',
    ],
    tags: ['Сухофрукты', 'Премиум'],
    weight: '500 г',
    inStock: true,
    isFrozen: false,
  },
  {
    id: '6',
    name: 'Курага узбекская отборная',
    description: 'Сочная курага из солнечного Узбекистана без добавления сахара. Натуральная сушка на солнце сохраняет все витамины.',
    price: 320,
    originalPrice: 399,
    discountPercent: 20,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1596273501048-8eb4c826c8c5?w=400&h=400&fit=crop',
    ],
    tags: ['Сухофрукты', 'Без сахара'],
    weight: '300 г',
    inStock: true,
    isFrozen: false,
  },
  {
    id: '7',
    name: 'Микс орехов и сухофруктов',
    description: 'Сбалансированная смесь орехов и сухофруктов для перекуса. В составе: миндаль, кешью, изюм, курага, чернослив.',
    price: 420,
    categoryId: '3',
    images: [
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop',
    ],
    tags: ['Смеси', 'Перекус'],
    weight: '250 г',
    inStock: true,
    isFrozen: false,
  },
  {
    id: '8',
    name: 'Грецкий орех очищенный',
    description: 'Отборные ядра грецкого ореха, богатые омега-3. Улучшают работу мозга и сердечно-сосудистой системы.',
    price: 380,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1605493725784-de00195cc589?w=400&h=400&fit=crop',
    ],
    tags: ['Орехи', 'Полезное'],
    weight: '200 г',
    inStock: true,
    isFrozen: false,
  },
  {
    id: '9',
    name: 'Чернослив без косточки',
    description: 'Мягкий чернослив без косточки, идеален для выпечки и употребления в чистом виде. Улучшает пищеварение.',
    price: 280,
    originalPrice: 350,
    discountPercent: 20,
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=400&h=400&fit=crop',
    ],
    tags: ['Сухофрукты', 'Для выпечки'],
    weight: '300 г',
    inStock: true,
    isFrozen: false,
  },
  {
    id: '10',
    name: 'Фундук жареный',
    description: 'Ароматный фундук, обжаренный до хруста. Богат витамином E и фолиевой кислотой. Идеален для десертов.',
    price: 520,
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1574570068583-f77c67e1d0f1?w=400&h=400&fit=crop',
    ],
    tags: ['Орехи', 'Жареные'],
    weight: '200 г',
    inStock: true,
    isFrozen: false,
  },
]

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === 'all') return products
  if (categoryId === 'frozen') return products.filter(p => p.isFrozen)
  return products.filter(p => p.categoryId === categoryId)
}

export function getSimilarProducts(product: Product, limit = 6): Product[] {
  return products
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit)
}

export function getDiscountedProducts(): Product[] {
  return products.filter(p => p.discountPercent)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
