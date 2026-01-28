import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
}

export function AnimatedNumber({ 
  value, 
  duration = 0.5, 
  className,
  suffix = ''
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const prevValue = useRef(0)

  useEffect(() => {
    if (!ref.current) return

    const obj = { val: prevValue.current }
    
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val).toLocaleString('ru-RU') + suffix
        }
      },
    })

    prevValue.current = value
  }, [value, duration, suffix])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('ru-RU')}{suffix}
    </span>
  )
}
