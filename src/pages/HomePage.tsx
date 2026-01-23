import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { SearchBar } from '@/components/catalog/SearchBar'
import { BannerCarousel } from '@/components/catalog/BannerCarousel'
import { CategoryFilter } from '@/components/catalog/CategoryFilter'
import { ProductGrid } from '@/components/product/ProductGrid'
import { products } from '@/data/products'
import { useUIStore } from '@/store/uiStore'

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      !activeCategory ||
      (activeCategory === 'sale' && product.discountPercent) ||
      (activeCategory === 'favorites') ||
      (activeCategory === 'history')
    return matchesSearch && matchesCategory
  })

  const discountProducts = products.filter((p) => p.discountPercent)
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

        {searchQuery ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="animate-section"
          >
            <ProductGrid
              title={`Результаты: ${filteredProducts.length}`}
              products={filteredProducts}
            />
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
