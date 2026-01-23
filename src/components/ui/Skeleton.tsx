import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded-card',
        className
      )}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="w-[160px] shrink-0">
      <Skeleton className="w-full aspect-square rounded-card mb-2" />
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
