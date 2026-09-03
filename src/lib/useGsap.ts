'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { gsap, ensureGsapRegistered, prefersReducedMotion } from './gsap'

type Ctx = { self: HTMLElement; gsap: typeof gsap }
type Cleanup = void | (() => void)

// Runs `setup` inside a scoped gsap.context() bound to the returned ref's
// element, so every tween/ScrollTrigger created in it is reverted together
// on unmount (and re-created on the next run under React StrictMode's
// double-invoke). Selector strings passed to gsap inside `setup` are scoped
// to that element automatically.
//
// `deps` are the caller's explicit re-run triggers - keep `setup` free of
// values that aren't listed there. When the OS asks for reduced motion
// `setup` never runs; the markup is authored in its resting state.
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: Ctx) => Cleanup,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ensureGsapRegistered()
    const self = ref.current
    if (!self || prefersReducedMotion()) return

    let cleanup: Cleanup
    const ctx = gsap.context(() => {
      cleanup = setup({ self, gsap })
    }, self)

    return () => {
      cleanup?.()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
