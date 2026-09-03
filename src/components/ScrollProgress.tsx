'use client'

import { gsap, ScrollTrigger } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'

// Thin accent bar pinned to the top of the viewport that fills as the page
// scrolls. Driven by a single document-wide ScrollTrigger.
export default function ScrollProgress() {
  const ref = useGsap<HTMLDivElement>(({ self }) => {
    const bar = self.firstElementChild as HTMLElement
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
    return () => ScrollTrigger.refresh()
  })

  return (
    <div ref={ref} className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div className="h-full w-full bg-[#E8C200]" />
    </div>
  )
}
