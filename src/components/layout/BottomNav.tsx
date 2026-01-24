import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore } from '@/store/favoritesStore'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/favorites', icon: 'heart' as const },
  { to: '/catalog', icon: 'grid' as const },
  { to: '/', icon: 'home' as const },
  { to: '/cart', icon: 'cart' as const },
]

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 20,
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: { duration: 0.15 }
  },
}

export function BottomNav() {
  const itemCount = useCartStore((s) => s.getItemCount())
  const favCount = useFavoritesStore((s) => s.items.length)

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom"
    >
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-center w-14 h-14 relative transition-colors duration-200',
                isActive ? 'text-gray-900' : 'text-gray-400'
              )
            }
          >
            {({ isActive }) => (
              <motion.div 
                className="relative"
                whileTap={{ scale: 0.9 }}
              >
                <Icon
                  name={item.icon === 'heart' && favCount > 0 ? 'heartFilled' : item.icon}
                  size={26}
                  className={cn(
                    'transition-colors duration-200',
                    item.icon === 'heart' && favCount > 0 && 'text-red-500',
                    isActive && item.icon !== 'heart' && 'text-gray-900',
                    !isActive && item.icon !== 'heart' && 'text-gray-400'
                  )}
                />
                
                <AnimatePresence>
                  {item.icon === 'cart' && itemCount > 0 && (
                    <motion.span
                      key={`cart-${itemCount}`}
                      variants={badgeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-lavka-yellow text-gray-900 text-xs font-bold rounded-full flex items-center justify-center px-1"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {item.icon === 'heart' && favCount > 0 && (
                    <motion.span
                      key={`fav-${favCount}`}
                      variants={badgeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-lavka-red text-white text-xs font-bold rounded-full flex items-center justify-center px-1"
                    >
                      {favCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
