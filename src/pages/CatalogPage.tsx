import { Header } from '@/components/layout/Header'
import { PageContainer } from '@/components/layout/PageContainer'
import { SearchBar } from '@/components/catalog/SearchBar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { products, categories } from '@/data/products'
import { useUIStore } from '@/store/uiStore'

export function CatalogPage() {
  const { searchQuery } = useUIStore()

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  const groupedProducts = categories.map((category) => ({
    category,
    items: filteredProducts.filter((p) => p.categoryId === category.id),
  }))

  return (
    <>
      <Header />
      <PageContainer>
        <SearchBar />

        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Каталог</h1>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-card hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {searchQuery ? (
          <ProductGrid
            title={`Найдено: ${filteredProducts.length}`}
            products={filteredProducts}
          />
        ) : (
          groupedProducts.map(
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
    </>
  )
}
