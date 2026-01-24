import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useTelegram } from '@/hooks/useTelegram'

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const { user, isAdmin } = useTelegram()

  useEffect(() => {
    if (!headerRef.current || !logoRef.current) return

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )

    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180 },
      { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
    )
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100/50">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            ref={logoRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center shadow-md"
          >
            <span className="text-lg">🥜</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-tight">Мини-Лавка</span>
            <span className="text-[10px] text-gray-400 leading-tight">сухофрукты и орехи</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1 text-xs font-medium text-white bg-lavka-blue rounded-full"
              >
                Admin
              </motion.div>
            </Link>
          )}
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full overflow-hidden shadow-md cursor-pointer bg-gradient-to-br from-purple-500 to-pink-500"
          >
            {user?.photo_url ? (
              <img 
                src={user.photo_url} 
                alt={user.first_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
                {user?.first_name?.[0] || '👤'}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  )
}
