import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import type { Banner } from '@/types'

const banners: Banner[] = [
  {
    id: '1',
    title: 'Если забыли что-то купить',
    image: '/images/banner-forgot.png',
    bgColor: 'bg-emerald-500',
    textColor: 'text-white',
    link: '/catalog?category=all',
  },
  {
    id: '2',
    title: 'Завтраки в январе',
    subtitle: 'Каши, мюсли и хлопья',
    image: '/images/banner-breakfast.png',
    bgColor: 'bg-amber-400',
    textColor: 'text-gray-900',
    link: '/catalog?category=3',
  },
  {
    id: '3',
    title: 'Готовая еда',
    subtitle: 'Замороженные блюда',
    image: '/images/banner-ready.png',
    bgColor: 'bg-lime-400',
    textColor: 'text-gray-900',
    link: '/catalog?category=frozen',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
}

export function BannerCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const bannerElements = containerRef.current.querySelectorAll('.banner-card')
    
    bannerElements.forEach((banner) => {
      const content = banner.querySelector('.banner-content')
      const decoration = banner.querySelector('.banner-decoration')

      banner.addEventListener('mouseenter', () => {
        gsap.to(content, {
          y: -3,
          duration: 0.2,
          ease: 'power2.out',
        })
        gsap.to(decoration, {
          scale: 1.1,
          opacity: 0.3,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      banner.addEventListener('mouseleave', () => {
        gsap.to(content, {
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        })
        gsap.to(decoration, {
          scale: 1,
          opacity: 0.2,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  }, [])

  return (
    <motion.div 
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex overflow-x-auto gap-3 pl-4 pr-4 py-2 no-scrollbar"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          variants={itemVariants}
          style={{ scrollSnapAlign: 'start' }}
        >
          <Link
            to={banner.link}
            className={`banner-card block relative overflow-hidden rounded-2xl ${banner.bgColor} ${
              index === 0 ? 'w-[180px] h-[160px]' : 'w-[260px] h-[160px]'
            } shrink-0`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-full"
            >
              <div className="banner-content absolute inset-0 p-4 flex flex-col justify-between z-10">
                <div>
                  <h3 className={`text-base font-semibold leading-tight ${banner.textColor} max-w-[120px]`}>
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className={`text-sm mt-1 ${banner.textColor} opacity-80`}>
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="banner-decoration absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20">
                <div className="w-full h-full bg-white rounded-tl-[30px]" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
