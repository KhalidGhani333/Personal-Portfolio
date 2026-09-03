'use client'

import { type ElementType, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'

type StaggerEffect = 'up' | 'scale' | 'flip'

const FROM: Record<StaggerEffect, gsap.TweenVars> = {
  up: { y: 64, opacity: 0 },
  scale: { scale: 0.7, opacity: 0, transformOrigin: '50% 100%' },
  flip: { rotateX: -60, opacity: 0, transformPerspective: 800, transformOrigin: '50% 0%' },
}

interface StaggerProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Which descendants to stagger. Defaults to the direct element children. */
  selector?: string
  effect?: StaggerEffect
  each?: number
  from?: 'start' | 'end' | 'center' | 'edges' | 'random'
  start?: string
}

// Wraps a list/grid and reveals its items one after another as the block
// scrolls into view. Unlike <Reveal> this animates the *children*, so a
// single ScrollTrigger drives the whole group in sequence.
export default function Stagger({
  children,
  className,
  as: Tag = 'div',
  selector,
  effect = 'up',
  each = 0.09,
  from = 'start',
  start = 'top 80%',
}: StaggerProps) {
  const ref = useGsap<HTMLElement>(({ self }) => {
    const items = selector
      ? gsap.utils.toArray<HTMLElement>(self.querySelectorAll(selector))
      : (Array.from(self.children) as HTMLElement[])
    if (!items.length) return

    gsap.set(items, FROM[effect])
    gsap.to(items, {
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      opacity: 1,
      duration: 0.9,
      ease: effect === 'up' ? 'power3.out' : 'back.out(1.5)',
      stagger: { each, from },
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: self, start },
    })
  }, [selector, effect, each, from, start])

  const Component = Tag as ElementType
  return (
    <Component ref={ref} data-reveal className={className}>
      {children}
    </Component>
  )
}
