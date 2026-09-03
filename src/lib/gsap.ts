// Import the UMD builds from gsap/dist rather than the ESM entry points.
// gsap's package.json sets "sideEffects": false, which lets a production
// bundler tree-shake ScrollTrigger's module-level wiring (its ticker hook)
// even though the export is used - the result is triggers that register but
// never fire once built. The dist bundles are self-contained and share one
// core, so they survive that pass. Works in `next dev` AND `next build`.
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'

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

  refreshWhenSettled()
  startRevealFailsafe()
  registered = true
}

// Absolute last resort. If a `[data-reveal]` block (or one of its children)
// has been scrolled well up the viewport but is still fully transparent, its
// ScrollTrigger never fired - show it so content is never lost on a live
// build. Deliberately conservative: it stays out of ScrollTrigger's way
// (no sweeps for the first few seconds, and only for elements far past any
// reasonable trigger point) so real reveals still get to play - important
// on mobile, where the short viewport puts many sections "near view" at
// once and an eager failsafe would blank every animation.
function startRevealFailsafe() {
  let armed = false
  setTimeout(() => {
    armed = true
  }, 3500)

  const sweep = () => {
    if (!armed) return
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((block) => {
      const r = block.getBoundingClientRect()
      // Past a sensible trigger point but still hidden. `isTweening` below
      // keeps this off anything ScrollTrigger is actively playing, and the
      // 3.5s arm delay gives every real reveal first crack.
      if (r.bottom <= 0 || r.top >= window.innerHeight * 0.6) return
      const stuck = [block, ...block.querySelectorAll<HTMLElement>('*')].filter(
        (n) => getComputedStyle(n).opacity === '0' && !gsap.isTweening(n),
      )
      // Keep layout-critical inline styles (e.g. SplitText's display) - only
      // undo what a reveal tween would have.
      if (stuck.length) gsap.set(stuck, { clearProps: 'opacity,transform,filter,visibility' })
    })
  }

  let last = 0
  window.addEventListener(
    'scroll',
    () => {
      const now = Date.now()
      if (now - last < 250) return
      last = now
      sweep()
    },
    { passive: true },
  )
  setTimeout(sweep, 6000)
  setTimeout(sweep, 12000)
}

// Trigger positions are measured the moment each animation is created - but
// that's before below-the-fold images have loaded, before the web font
// swaps in, and before other reveals finish and drop their transforms. Each
// of those grows or shifts the page, leaving every trigger's start/end at a
// stale scroll offset (the classic "works in dev, dead after build"). Re-run
// refresh() across all those settle points.
export function refreshWhenSettled() {
  if (typeof window === 'undefined') return

  let queued = false
  const refresh = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      ScrollTrigger.refresh()
    })
  }

  document.fonts?.ready.then(refresh)
  window.addEventListener('pageshow', refresh)
  // Capture phase catches every <img> load event too (they don't bubble),
  // so the page is re-measured as below-the-fold images pop in.
  window.addEventListener('load', refresh, true)
  // First user scroll = layout is definitely settled by now.
  window.addEventListener('scroll', refresh, { once: true, passive: true })
  // Tab opened in the background: rAF (and the ticker) were parked, so
  // triggers set up against an unpainted page. Re-measure on reveal.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refresh()
  })

  // Late catch-alls for slow connections / entrance animations clearing out.
  setTimeout(refresh, 400)
  setTimeout(refresh, 1500)
  setTimeout(refresh, 3500)
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
