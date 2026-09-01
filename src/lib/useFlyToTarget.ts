import { useEffect, useState, type RefObject } from 'react'
import { useTransform, type MotionValue } from 'framer-motion'

interface Rects {
  source: DOMRect
  target: DOMRect
  heroHeight: number
}

export interface FlyStyle {
  x: MotionValue<number>
  translateY: MotionValue<number>
  scale: MotionValue<number>
  opacity: MotionValue<number>
}

interface FlyOptions<S extends HTMLElement, T extends HTMLElement> {
  sourceRef: RefObject<S | null>
  targetRef?: RefObject<T | null>
  heroRef: RefObject<HTMLElement | null>
  scrollYProgress: MotionValue<number>
  fadeStart?: number
  fadeEnd?: number
}

// Makes the element at `sourceRef` look like it detaches from the hero and
// flies into `targetRef` (a card living in the fixed left Sidebar) as the
// page scrolls through the hero section. The element keeps its normal
// document position - this only layers a transform + opacity on top, driven
// by `scrollYProgress` (0 at the top of the hero, 1 once it has scrolled
// fully out of view), so no layout needs to change.
//
// Math: at progress p the page has scrolled by p * heroHeight (the hero is
// the first thing on the page, so that's exactly how far `start start` ->
// `end start` moves). Left to its own devices the element's viewport
// position would drift by that same amount as it scrolls with the page. The
// transform below cancels that drift and replaces it with a straight-line
// interpolation from the element's resting spot to the target's resting
// spot (the target is `fixed`, so its viewport spot never moves).
export default function useFlyToTarget<S extends HTMLElement, T extends HTMLElement>({
  sourceRef,
  targetRef,
  heroRef,
  scrollYProgress,
  fadeStart = 0.45,
  fadeEnd = 0.92,
}: FlyOptions<S, T>) {
  const [rects, setRects] = useState<Rects | null>(null)

  useEffect(() => {
    function measure() {
      if (!sourceRef.current || !targetRef?.current || !heroRef.current) return
      const source = sourceRef.current.getBoundingClientRect()
      const target = targetRef.current.getBoundingClientRect()
      const heroHeight = heroRef.current.offsetHeight
      setRects({ source, target, heroHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [sourceRef, targetRef, heroRef])

  const dx = rects ? rects.target.left - rects.source.left : 0
  const dy = rects ? rects.target.top - rects.source.top + rects.heroHeight : 0
  const scale = rects && rects.source.width ? rects.target.width / rects.source.width : 1

  const x = useTransform(scrollYProgress, [0, 1], [0, dx])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, dy])
  const flyScale = useTransform(scrollYProgress, [0, 1], [1, scale])
  const opacity = useTransform(scrollYProgress, [0, fadeStart, fadeEnd], [1, 1, 0])

  const style: FlyStyle = { x, translateY, scale: flyScale, opacity }
  return { nodeRef: sourceRef, style }
}
