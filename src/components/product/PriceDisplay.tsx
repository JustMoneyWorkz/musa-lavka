import { formatPrice } from '@/utils/format'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  discountPercent?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceDisplay({
  price,
  originalPrice,
  discountPercent,
  size = 'md',
  className,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice && originalPrice > price

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <span
        className={cn('font-bold text-gray-900', {
          'text-base': size === 'sm',
          'text-lg': size === 'md',
          'text-2xl': size === 'lg',
        })}
      >
        {formatPrice(price)}₽
      </span>
      {hasDiscount && (
        <>
          <span
            className={cn('text-gray-400 line-through', {
              'text-xs': size === 'sm',
              'text-sm': size === 'md',
              'text-base': size === 'lg',
            })}
          >
            {formatPrice(originalPrice)}₽
          </span>
          {discountPercent && (
            <Badge variant="discount">-{discountPercent}%</Badge>
          )}
        </>
      )}
    </div>
  )
}
