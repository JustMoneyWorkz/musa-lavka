import { cn } from '@/utils/cn'

interface BadgeProps {
  variant?: 'discount' | 'tag' | 'frozen'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'tag', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full',
        {
          'bg-lavka-red text-white': variant === 'discount',
          'text-lavka-blue': variant === 'tag',
          'text-lavka-blue': variant === 'frozen',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
