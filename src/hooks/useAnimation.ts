import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'

export function useStaggerReveal<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.children
    gsap.fromTo(
      items,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all'
      }
    )
  }, [])

  return containerRef
}

export function usePageTransition<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        ease: 'power2.out' 
      }
    )
  }, [])

  return ref
}

export function useScrollReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 40 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                ease: 'power2.out' 
              }
            )
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function usePulse() {
  const pulse = useCallback((element: HTMLElement) => {
    gsap.fromTo(
      element,
      { scale: 1 },
      {
        scale: 1.15,
        duration: 0.15,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      }
    )
  }, [])

  return pulse
}

export function useShake() {
  const shake = useCallback((element: HTMLElement) => {
    gsap.to(element, {
      keyframes: [
        { x: -5, duration: 0.1 },
        { x: 5, duration: 0.1 },
        { x: -5, duration: 0.1 },
        { x: 5, duration: 0.1 },
        { x: 0, duration: 0.1 },
      ],
      ease: 'power2.out',
    })
  }, [])

  return shake
}

export function useBounce() {
  const bounce = useCallback((element: HTMLElement) => {
    gsap.fromTo(
      element,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }
    )
  }, [])

  return bounce
}
