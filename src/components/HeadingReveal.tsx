'use client'

import { type ElementType, type ReactNode } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'

interface HeadingRevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** ScrollTrigger start (default `top 82%`). */
  start?: string
  /** Per-word stagger in seconds. */
  each?: number
}

// Word-by-word entrance for big section headings, built on SplitText.
// `autoSplit` re-splits on font load and resize so wrapping stays correct;
// the tween returned from `onSplit` is what GSAP re-creates each time.
// SSR renders the plain heading text - the split only happens after mount,
// and not at all when the OS asks for reduced motion.
export default function HeadingReveal({
  children,
  className,
  as: Tag = 'h2',
  start = 'top 82%',
  each = 0.04,
}: HeadingRevealProps) {
  const ref = useGsap<HTMLHeadingElement>(({ self }) => {
    const split = SplitText.create(self, {
      type: 'lines,words',
      autoSplit: true,
      onSplit: (instance) =>
        gsap.from(instance.words, {
          yPercent: 60,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.9,
          ease: 'power4.out',
          stagger: each,
          scrollTrigger: { trigger: self, start, once: true },
        }),
    })

    return () => split.revert()
  }, [start, each])

  const Component = Tag as ElementType
  return (
    <Component ref={ref} data-reveal className={className}>
      {children}
    </Component>
  )
}
