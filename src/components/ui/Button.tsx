import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-lavka-yellow hover:bg-lavka-yellow-hover text-gray-900 rounded-btn shadow-btn':
              variant === 'primary',
            'bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-btn':
              variant === 'secondary',
            'hover:bg-gray-100 text-gray-700 rounded-btn': variant === 'ghost',
            'rounded-full bg-white shadow-btn hover:shadow-card-hover':
              variant === 'icon',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          variant === 'icon' && {
            'h-8 w-8': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-12 w-12': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
