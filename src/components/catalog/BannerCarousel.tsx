import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
}

export function BannerCarousel() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 py-2"
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Главный баннер — на всю ширину */}
        <motion.div variants={itemVariants} className="col-span-2">
          <Link 
            to="/catalog?category=1" 
            className="block relative overflow-hidden rounded-2xl h-32 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
          >
            {/* Декоративные круги */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />
            
            <div className="absolute inset-0 p-5 flex flex-col justify-center">
              <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">Коллекция</p>
              <h3 className="text-xl font-bold text-white">
                Премиум орехи
              </h3>
              <p className="text-sm text-white/80 mt-1">Миндаль, кешью, фундук</p>
            </div>
          </Link>
        </motion.div>

        {/* Два маленьких баннера */}
        <motion.div variants={itemVariants}>
          <Link 
            to="/catalog?category=2" 
            className="block relative overflow-hidden rounded-2xl h-28 bg-gradient-to-br from-violet-500 to-purple-600"
          >
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full" />
            
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <h3 className="text-base font-bold text-white">
                Сухофрукты
              </h3>
              <p className="text-xs text-white/80 mt-0.5">Финики, курага</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link 
            to="/catalog?category=3" 
            className="block relative overflow-hidden rounded-2xl h-28 bg-gradient-to-br from-emerald-500 to-teal-600"
          >
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
            
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <h3 className="text-base font-bold text-white">
                Смеси
              </h3>
              <p className="text-xs text-white/80 mt-0.5">Микс орехов</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
