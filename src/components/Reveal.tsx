import type { Variants } from 'framer-motion'

// Animation variants used by Hero.tsx's mount-in sequence. The Reveal /
// RevealGroup / RevealItem scroll-triggered wrapper components that used to
// live here were removed along with all non-Hero animation in the app.
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})
