import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore } from '@/store/favoritesStore'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/favorites', icon: 'heart' as const, label: 'Любимое' },
  { to: '/catalog', icon: 'grid' as const, label: 'Каталог' },
  { to: '/', icon: 'home' as const, label: 'Главная' },
  { to: '/cart', icon: 'cart' as const, label: 'Корзина' },
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

const iconVariants = {
  tap: { scale: 0.85 },
  hover: { scale: 1.1 },
}

export function BottomNav() {
  const itemCount = useCartStore((s) => s.getItemCount())
  const favCount = useFavoritesStore((s) => s.items.length)

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-lavka-dark safe-bottom"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-4 py-2 relative',
                isActive ? 'text-white' : 'text-gray-400'
              )
            }
          >
            {({ isActive }) => (
              <motion.div 
                className="flex flex-col items-center gap-1"
                whileTap="tap"
                whileHover="hover"
                variants={iconVariants}
              >
                <div className="relative">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      name={item.icon === 'heart' && favCount > 0 ? 'heartFilled' : item.icon}
                      size={24}
                      className={item.icon === 'heart' && favCount > 0 ? 'text-red-400' : ''}
                    />
                  </motion.div>
                  
                  <AnimatePresence>
                    {item.icon === 'cart' && itemCount > 0 && (
                      <motion.span
                        key={`cart-${itemCount}`}
                        variants={badgeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-lavka-yellow text-gray-900 text-xs font-bold rounded-full flex items-center justify-center px-1"
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
                        className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-lavka-red text-white text-xs font-bold rounded-full flex items-center justify-center px-1"
                      >
                        {favCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                <span className="text-[10px]">{item.label}</span>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -bottom-0.5 w-1 h-1 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
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
