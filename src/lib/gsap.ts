import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

// GSAP plugin registration touches the DOM, so it can only run once we're
// actually in the browser - called from Reveal's mount effect rather than
// at module load, which would blow up during SSR.
export function ensureGsapRegistered() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export { gsap, ScrollTrigger }
