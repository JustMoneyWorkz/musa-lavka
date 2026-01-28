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
      <div className="grid grid-cols-5 grid-rows-2 gap-3 h-[280px]">
        <motion.div variants={itemVariants} className="col-span-2 row-span-1">
          <Link to="/catalog?category=1" className="block relative overflow-hidden rounded-2xl h-full bg-gradient-to-br from-amber-400 to-amber-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-80">🥜</span>
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
              <h3 className="text-sm font-bold leading-tight text-white drop-shadow-lg">
                Орехи на любой вкус
              </h3>
              <p className="text-xs mt-0.5 text-white/90 drop-shadow">Миндаль, кешью, фундук</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-3 row-span-2">
          <Link to="/catalog?category=2" className="block relative overflow-hidden rounded-2xl h-full bg-gradient-to-br from-orange-400 to-orange-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-75">🍇</span>
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
              <h3 className="text-xl font-bold leading-tight text-white drop-shadow-lg">
                Сухофрукты премиум
              </h3>
              <p className="text-sm mt-1 text-white/90 drop-shadow">Финики, курага, инжир</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-2 row-span-1">
          <Link to="/catalog?category=3" className="block relative overflow-hidden rounded-2xl h-full bg-gradient-to-br from-lime-400 to-lime-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-80">🥗</span>
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
              <h3 className="text-sm font-bold leading-tight text-white drop-shadow-lg">
                Полезные смеси
              </h3>
              <p className="text-xs mt-0.5 text-white/90 drop-shadow">Микс орехов</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
