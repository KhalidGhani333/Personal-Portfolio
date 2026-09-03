'use client'

import { type CSSProperties, type ElementType, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'

interface ParallaxProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: ElementType
  /**
   * How far the element drifts over the scroll through its own height,
   * as a fraction of that height. Positive = moves up relative to normal
   * scroll (foreground feel); negative = lags behind (background feel).
   */
  speed?: number
  /** Optional counter-rotation, in degrees across the same range. */
  rotate?: number
}

// Scrubbed parallax drift tied to the element passing through the viewport.
export default function Parallax({
  children,
  className,
  style,
  as: Tag = 'div',
  speed = 0.2,
  rotate = 0,
}: ParallaxProps) {
  const ref = useGsap<HTMLElement>(({ self }) => {
    gsap.to(self, {
      yPercent: -speed * 100,
      rotate,
      ease: 'none',
      scrollTrigger: {
        trigger: self,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [speed, rotate])

  const Component = Tag as ElementType
  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  )
}
