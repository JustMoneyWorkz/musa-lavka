import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { SearchBar } from '@/components/catalog/SearchBar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { products, categories, getProductsByCategory, searchProducts } from '@/data/products'
import { useUIStore } from '@/store/uiStore'

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchQuery } = useUIStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  )

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setSearchParams({})
    } else {
      setSelectedCategory(categoryId)
      setSearchParams({ category: categoryId })
    }
  }

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery)
    }
    if (selectedCategory) {
      return getProductsByCategory(selectedCategory)
    }
    return products
  }, [searchQuery, selectedCategory])

  const groupedProducts = useMemo(() => {
    if (searchQuery || selectedCategory) {
      return null
    }
    return categories.map((category) => ({
      category,
      items: products.filter((p) => p.categoryId === category.id),
    }))
  }, [searchQuery, selectedCategory])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <PageContainer>
        <SearchBar />

        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Каталог</h1>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-3 p-4 rounded-card transition-all ${
                  selectedCategory === category.id
                    ? 'bg-lavka-yellow/20 border-2 border-lavka-yellow'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>

          {selectedCategory && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                setSelectedCategory(null)
                setSearchParams({})
              }}
              className="mb-4 text-sm text-lavka-blue hover:underline"
            >
              ← Показать все категории
            </motion.button>
          )}
        </div>

        {searchQuery || selectedCategory ? (
          <ProductGrid
            title={
              searchQuery 
                ? `Найдено: ${filteredProducts.length}` 
                : `${categories.find(c => c.id === selectedCategory)?.icon || ''} ${categories.find(c => c.id === selectedCategory)?.name || ''}`
            }
            products={filteredProducts}
          />
        ) : (
          groupedProducts?.map(
            ({ category, items }) =>
              items.length > 0 && (
                <ProductGrid
                  key={category.id}
                  title={`${category.icon} ${category.name}`}
                  products={items}
                />
              )
          )
        )}
      </PageContainer>
    </motion.div>
  )
}
