import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/types'

interface ProductGridProps {
  title?: string
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ title, products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <section className="py-2">
        {title && (
          <h2 className="px-4 mb-3 text-xl font-bold text-gray-900">
            {title}
          </h2>
        )}
        <div className="scroll-container">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="py-2">
      {title && (
        <h2 className="px-4 mb-3 text-xl font-bold text-gray-900">
          {title}
        </h2>
      )}
      <div className="scroll-container">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
