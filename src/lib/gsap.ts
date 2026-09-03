import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

let registered = false

// GSAP plugin registration touches the DOM, so it can only run once we're
// actually in the browser - called from every animation hook's mount effect
// rather than at module load, which would blow up during SSR.
export function ensureGsapRegistered() {
  if (registered || typeof window === 'undefined') return

  gsap.registerPlugin(ScrollTrigger, SplitText)

  // ignoreMobileResize stops ScrollTrigger from re-measuring every time the
  // mobile URL bar shows/hides, which otherwise makes pinned/scrubbed
  // sections jitter as you scroll on a phone.
  ScrollTrigger.config({ ignoreMobileResize: true })
  gsap.defaults({ ease: 'power3.out', duration: 1 })

  // Poppins loads from Google Fonts after first paint; the reflow when it
  // swaps in shifts every element's position, so triggers measured before
  // then would fire at the wrong scroll offset. Re-measure once it's ready.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }

  registered = true
}

// Honour the OS "reduce motion" setting - callers skip their animation and
// leave the element in its natural, fully-visible state.
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export { gsap, ScrollTrigger, SplitText }
