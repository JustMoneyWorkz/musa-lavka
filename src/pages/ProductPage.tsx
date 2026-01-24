import { useParams, Navigate } from 'react-router-dom'
import { ProductDetail } from '@/components/product/ProductDetail'
import { products } from '@/data/products'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return <Navigate to="/" replace />
  }

  return <ProductDetail product={product} />
}
