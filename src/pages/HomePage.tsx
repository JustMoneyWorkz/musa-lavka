import { useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { SearchBar } from '@/components/catalog/SearchBar'
import { BannerCarousel } from '@/components/catalog/BannerCarousel'
import { CategoryFilter } from '@/components/catalog/CategoryFilter'
import { ProductGrid } from '@/components/product/ProductGrid'
import { products, getDiscountedProducts, searchProducts } from '@/data/products'
import { useUIStore } from '@/store/uiStore'
import { useFavoritesStore } from '@/store/favoritesStore'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    }
  },
  exit: { opacity: 0 },
}

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
}

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { searchQuery, activeCategory } = useUIStore()
  const { items: favoriteItems } = useFavoritesStore()

  const filteredProducts = useMemo(() => {
    let result = products

    if (searchQuery) {
      result = searchProducts(searchQuery)
    } else if (activeCategory) {
      switch (activeCategory) {
        case 'favorites':
          result = favoriteItems
          break
        case 'sale':
          result = getDiscountedProducts()
          break
        case 'new':
          result = products.slice(0, 5)
          break
        case 'history':
          result = products.slice(3, 8)
          break
        default:
          result = products
      }
    }

    return result
  }, [searchQuery, activeCategory, favoriteItems])

  const discountProducts = getDiscountedProducts()
  const frozenProducts = products.filter((p) => p.isFrozen)

  useEffect(() => {
    if (!containerRef.current) return

    const sections = containerRef.current.querySelectorAll('.animate-section')
    
    gsap.fromTo(
      sections,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      }
    )
  }, [])

  const showFiltered = searchQuery || activeCategory

  return (
    <motion.div 
      ref={containerRef}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      <PageContainer>
        <motion.div variants={sectionVariants} className="animate-section">
          <SearchBar />
        </motion.div>
        
        <motion.div variants={sectionVariants} className="animate-section">
          <BannerCarousel />
        </motion.div>
        
        <motion.div variants={sectionVariants} className="animate-section">
          <CategoryFilter />
        </motion.div>

        {showFiltered ? (
          <motion.div
            key={`filtered-${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="animate-section"
          >
            {filteredProducts.length > 0 ? (
              <ProductGrid
                title={
                  searchQuery 
                    ? `Результаты: ${filteredProducts.length}` 
                    : activeCategory === 'favorites' 
                      ? '❤️ Любимое'
                      : activeCategory === 'sale'
                        ? '🏷️ Скидки'
                        : activeCategory === 'new'
                          ? '✨ Новинки'
                          : '🕐 Уже брали'
                }
                products={filteredProducts}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <span className="text-5xl mb-4">🔍</span>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Ничего не найдено
                </h2>
                <p className="text-gray-500 text-center">
                  {activeCategory === 'favorites' 
                    ? 'Добавьте товары в избранное'
                    : 'Попробуйте изменить запрос'}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {discountProducts.length > 0 && (
              <motion.div variants={sectionVariants} className="animate-section">
                <ProductGrid title="🏷️ Скидки" products={discountProducts} />
              </motion.div>
            )}
            {frozenProducts.length > 0 && (
              <motion.div variants={sectionVariants} className="animate-section">
                <ProductGrid title="❄️ Из морозилки" products={frozenProducts} />
              </motion.div>
            )}
            <motion.div variants={sectionVariants} className="animate-section">
              <ProductGrid title="🥜 Орехи и сухофрукты" products={products} />
            </motion.div>
          </>
        )}
      </PageContainer>
    </motion.div>
  )
}
