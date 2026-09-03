'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { gsap, ensureGsapRegistered, prefersReducedMotion } from '../lib/gsap'

export type RevealEffect = 'up' | 'down' | 'left' | 'right' | 'scale' | 'flip' | 'blur'

interface RevealProps {
  children: ReactNode
  effect?: RevealEffect
  delay?: number
  duration?: number
  className?: string
  as?: ElementType
  /** Tie the animation to scroll position instead of playing once on enter. */
  scrub?: boolean | number
  /** ScrollTrigger `start` override (default `top 85%`). */
  start?: string
  /** Replay every time the element scrolls back into view. */
  repeat?: boolean
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
  blur: { y: 60, opacity: 0, filter: 'blur(14px)' },
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
  blur: { opacity: 0, transform: 'translateY(60px)', filter: 'blur(14px)' },
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
  scrub = false,
  start = 'top 85%',
  repeat = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ensureGsapRegistered()
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      // No travel/scale for reduced motion, but a plain opacity fade is
      // still within the guideline and keeps the page from feeling dead.
      gsap.set(el, { clearProps: 'transform,filter' })
      const rmTween = gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
          clearProps: 'opacity',
          scrollTrigger: { trigger: el, start },
        },
      )
      return () => {
        rmTween.scrollTrigger?.kill()
        rmTween.kill()
      }
    }

    const tween = gsap.fromTo(el, FROM_VARS[effect], {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      duration,
      delay: scrub ? 0 : delay,
      ease: effect === 'scale' || effect === 'flip' ? 'back.out(1.6)' : 'power3.out',
      clearProps: scrub ? '' : 'transform,opacity,filter',
      scrollTrigger: {
        trigger: el,
        start,
        end: scrub ? 'top 45%' : undefined,
        scrub: scrub === true ? 1 : scrub || false,
        toggleActions: repeat ? 'restart none none reverse' : 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [effect, delay, duration, scrub, start, repeat])

  const Component = Tag as ElementType

  return (
    <Component ref={ref} data-reveal className={className} style={FROM_STYLES[effect]}>
      {children}
    </Component>
  )
}
