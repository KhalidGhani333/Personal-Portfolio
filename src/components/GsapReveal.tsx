'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { gsap, ensureGsapRegistered } from '../lib/gsap'

export type RevealEffect = 'up' | 'down' | 'left' | 'right' | 'scale' | 'flip'

interface RevealProps {
  children: ReactNode
  effect?: RevealEffect
  delay?: number
  duration?: number
  className?: string
  as?: ElementType
}

// Starting (hidden) state for each effect. `up`/`down`/`left`/`right` travel
// further than a typical scroll-reveal would - bolder motion was requested
// over a subtle one - while `scale`/`flip` overshoot past 1 via the
// back-ease below for a punchier pop-in.
const FROM_VARS: Record<RevealEffect, gsap.TweenVars> = {
  up: { y: 90, opacity: 0 },
  down: { y: -90, opacity: 0 },
  left: { x: -120, opacity: 0 },
  right: { x: 120, opacity: 0 },
  scale: { scale: 0.6, opacity: 0 },
  flip: { rotateY: 100, opacity: 0, transformPerspective: 900 },
}

// Plain-CSS equivalents of FROM_VARS above, used only for the initial inline
// style (React can't interpret GSAP's x/y/rotateY shorthand) so first paint
// already matches the state GSAP will animate from.
const FROM_STYLES: Record<RevealEffect, CSSProperties> = {
  up: { opacity: 0, transform: 'translateY(90px)' },
  down: { opacity: 0, transform: 'translateY(-90px)' },
  left: { opacity: 0, transform: 'translateX(-120px)' },
  right: { opacity: 0, transform: 'translateX(120px)' },
  scale: { opacity: 0, transform: 'scale(0.6)' },
  flip: { opacity: 0, transform: 'perspective(900px) rotateY(100deg)' },
}

// Scroll-triggered entrance animation. Renders with the effect's hidden
// state as an inline style so the very first paint (server-rendered HTML
// included) already matches what GSAP will animate from - no flash of
// fully-visible content before the reveal plays.
export default function Reveal({
  children,
  effect = 'up',
  delay = 0,
  duration = 1,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ensureGsapRegistered()
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(el, FROM_VARS[effect], {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      duration,
      delay,
      ease: effect === 'scale' || effect === 'flip' ? 'back.out(1.6)' : 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [effect, delay, duration])

  const Component = Tag as any

  return (
    <Component ref={ref} className={className} style={FROM_STYLES[effect]}>
      {children}
    </Component>
  )
}
