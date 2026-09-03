// gsap ships types for its ESM entry points ('gsap', 'gsap/ScrollTrigger', …)
// but not for the 'gsap/dist/*' UMD bundles we import from (see lib/gsap.ts
// for why). Re-map each dist path to the matching typed entry.
declare module 'gsap/dist/gsap' {
  export * from 'gsap'
}

declare module 'gsap/dist/ScrollTrigger' {
  export * from 'gsap/ScrollTrigger'
}

declare module 'gsap/dist/SplitText' {
  export * from 'gsap/SplitText'
}
