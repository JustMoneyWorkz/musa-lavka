import { useRef, useEffect } from 'react'
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
    link: '/catalog',
  },
  {
    id: '2',
    title: 'Завтраки в январе',
    image: '/images/banner-breakfast.png',
    bgColor: 'bg-amber-400',
    textColor: 'text-gray-900',
    link: '/catalog/breakfast',
  },
  {
    id: '3',
    title: 'Готовая еда',
    image: '/images/banner-ready.png',
    bgColor: 'bg-lime-400',
    textColor: 'text-gray-900',
    link: '/catalog/ready',
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
    y: 30,
    scale: 0.9,
    rotateY: -15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
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
          y: -5,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(decoration, {
          scale: 1.1,
          opacity: 0.4,
          duration: 0.4,
          ease: 'power2.out',
        })
      })

      banner.addEventListener('mouseleave', () => {
        gsap.to(content, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(decoration, {
          scale: 1,
          opacity: 0.2,
          duration: 0.4,
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
      className="scroll-container py-2"
    >
      {banners.map((banner, index) => (
        <motion.a
          key={banner.id}
          href={banner.link}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`banner-card scroll-item relative overflow-hidden rounded-2xl ${banner.bgColor} ${
            index === 0 ? 'w-[200px] h-[180px]' : 'w-[280px] h-[180px]'
          } cursor-pointer`}
          style={{ perspective: '1000px' }}
        >
          <div className="banner-content absolute inset-0 p-4 flex flex-col justify-between z-10">
            <h3 className={`text-lg font-semibold leading-tight ${banner.textColor} max-w-[140px]`}>
              {banner.title}
            </h3>
          </div>
          <div className="banner-decoration absolute bottom-0 right-0 w-2/3 h-2/3 opacity-20">
            <div className="w-full h-full bg-white rounded-tl-[40px]" />
          </div>
          <motion.div 
            className="absolute inset-0 bg-black opacity-0"
            whileHover={{ opacity: 0.05 }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      ))}
    </motion.div>
  )
}
