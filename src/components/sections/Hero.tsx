import { forwardRef, useCallback, useRef, type ReactNode, type RefObject } from 'react'
import { motion, useTransform, type MotionStyle, type MotionValue } from 'framer-motion'
import { BRAND, NAV_ITEMS, TRAITS } from '../../data/content'
import type { NavItem, TargetRefs } from '../../lib/types'
import { scrollToId } from '../../lib/scroll'
import { gsap } from '../../lib/gsap'
import { useGsap } from '../../lib/useGsap'
import { fadeUpBlur, staggerContainer } from '../Reveal'
import BookCallButton from '../BookCallButton'
import useFlyToTarget, { type FlyStyle } from '../../lib/useFlyToTarget'

const HERO_NAV_LEFT = NAV_ITEMS.slice(0, 3)
const HERO_NAV_RIGHT = NAV_ITEMS.slice(3)

// Hero content is visible on first paint (no scroll needed to trigger it),
// so it animates in on mount rather than via whileInView.
const heroStagger = staggerContainer(0.12, 0.1)

// The nav that lives inside the hero itself - once the page scrolls, the
// fixed Sidebar takes over and this fades out with the section.
// `flyRef`/`flyStyle` (from useFlyToTarget) are applied to an inner wrapper
// rather than the motion.nav itself, so the scroll-driven fly transform
// never fights with the mount-in `fadeUpBlur` variant animating on the
// same node.
interface HeroNavProps {
  active: string
  flyRef: RefObject<HTMLDivElement | null>
  flyStyle: FlyStyle
}

function HeroNav({ active, flyRef, flyStyle }: HeroNavProps) {
  function renderGroup(items: NavItem[]) {
    return items.map(({ id, label }, i) => (
      <span key={id} className="flex items-center gap-3">
        {i > 0 && <span className="text-[#1A1A1A]/20">|</span>}
        <motion.button
          type="button"
          onClick={() => scrollToId(id)}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          className={`text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
            active === id ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
          }`}
        >
          {label}
        </motion.button>
      </span>
    ))
  }

  return (
    <motion.nav
      variants={fadeUpBlur}
      aria-label="Primary"
      className="absolute inset-x-8 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-between lg:flex"
    >
      <motion.div ref={flyRef} style={flyStyle} className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">{renderGroup(HERO_NAV_LEFT)}</div>
        <div className="flex items-center gap-3">{renderGroup(HERO_NAV_RIGHT)}</div>
      </motion.div>
    </motion.nav>
  )
}

function FloatingCard({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUpBlur}
      whileHover={{ scale: 1.03 }}
      className={`rounded-[20px] border border-white/50 bg-white/40 p-4 text-[#1A1A1A] shadow-xl backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Transparent cutout photo of Khalid - sits directly on the page background
// and the giant wordmark with no box around it. Mount-fades independently
// of the filter style, which is driven separately by scroll.
function PortraitFigure({ className = '', style }: { className?: string; style?: MotionStyle }) {
  return (
    <motion.img
      src="/hero-image.png"
      alt="Khalid, AI automation developer"
      draggable={false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={style}
      className={`pointer-events-none select-none object-contain object-bottom ${className}`}
    />
  )
}

// Hero forwards its section ref up to App, which uses it as the scroll
// target driving `scrollYProgress` - shared with the Sidebar so the hero's
// floating elements and the sidebar cards they fly into stay in perfect
// sync as the user scrolls.
interface HeroProps {
  active: string
  scrollYProgress: MotionValue<number>
  targetRefs: TargetRefs
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { active, scrollYProgress, targetRefs },
  forwardedRef
) {
  const sectionRef = useRef<HTMLElement>(null)
  // Memoized so this callback ref has a stable identity across re-renders
  // (Hero re-renders on every `active` section change) - an inline function
  // here would make React null-then-reattach the ref on every one of those
  // renders, which could tear down and rebuild App's scroll subscription at
  // the wrong moment.
  const setSectionRef = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef]
  )

  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 20])
  const blurFilter = useTransform(blurPx, (v: number) => `blur(${v}px)`)

  // The oversized KHALID wordmark behind the portrait drifts down and
  // swells slightly as the hero scrolls away, adding a layer of depth
  // behind framer-motion's fly-to-sidebar choreography.
  const wordmarkRef = useGsap<HTMLSpanElement>(({ self }) => {
    gsap.to(self, {
      yPercent: 9,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: self, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  const headlineRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const traitsRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLSpanElement>(null)
  const bioRef = useRef<HTMLSpanElement>(null)

  const headlineFly = useFlyToTarget({ sourceRef: headlineRef, targetRef: targetRefs?.logoMark, heroRef: sectionRef, scrollYProgress })
  const navFly = useFlyToTarget({ sourceRef: navRef, targetRef: targetRefs?.nav, heroRef: sectionRef, scrollYProgress })
  const statsFly = useFlyToTarget({ sourceRef: statsRef, targetRef: targetRefs?.stats, heroRef: sectionRef, scrollYProgress })
  const traitsFly = useFlyToTarget({ sourceRef: traitsRef, targetRef: targetRefs?.traits, heroRef: sectionRef, scrollYProgress })
  const actionsFly = useFlyToTarget({ sourceRef: actionsRef, targetRef: targetRefs?.actions, heroRef: sectionRef, scrollYProgress })
  const sublineFly = useFlyToTarget({ sourceRef: sublineRef, targetRef: targetRefs?.logoSubline, heroRef: sectionRef, scrollYProgress })
  const bioFly = useFlyToTarget({ sourceRef: bioRef, targetRef: targetRefs?.logoBio, heroRef: sectionRef, scrollYProgress })

  // Plain identifiers (rather than `x.nodeRef` inline in JSX) so the ref
  // attribute reads as a simple ref, not a member expression.
  const headlineNodeRef = headlineFly.nodeRef
  const actionsNodeRef = actionsFly.nodeRef
  const sublineNodeRef = sublineFly.nodeRef
  const bioNodeRef = bioFly.nodeRef

  return (
    <section
      id="home"
      ref={setSectionRef}
      className="relative flex min-h-screen scroll-mt-20 flex-col overflow-hidden pt-16 lg:pt-0"
    >
      <span
        ref={wordmarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex -translate-y-[7vh] select-none items-center justify-center whitespace-nowrap text-[32vw] font-extrabold leading-none tracking-tighter text-[#E8C200] sm:-translate-y-[4vh] lg:translate-y-0 lg:text-[24vw]"
      >
        {BRAND.mark}
      </span>

      {/* Mobile / tablet layout. Below md everything stacks in one centered
          column; from md (768px) up - still short of the lg desktop layout
          at 1024px - it switches to a two-column arrangement (portrait +
          cards on one side, copy + actions on the other) so the tablet
          band isn't just a stretched-out phone view. */}
      <div className="relative flex flex-1 flex-col items-center justify-start px-4 pb-16 pt-24 sm:justify-center lg:hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStagger}
          className="relative flex w-full max-w-4xl flex-col items-center md:flex-row md:items-center md:justify-center md:gap-10"
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <motion.h1
              variants={fadeUpBlur}
              className="max-w-[300px] text-center text-[27px] font-bold leading-[1.15] tracking-tight text-[#1A1A1A] sm:max-w-none sm:text-4xl"
            >
              AI Automation,
              <br />
              Applied Differently.
            </motion.h1>

            <FloatingCard className="w-full max-w-[176px] text-center sm:max-w-[220px]">
              <span className="block text-3xl font-extrabold tracking-tight text-[#E8C200] sm:text-4xl">20+</span>
              <span className="text-xs text-[#1A1A1A]/70 sm:text-sm">Projects delivered end to end</span>
            </FloatingCard>

            <div className="relative w-full max-w-[min(90vw,400px)] aspect-[894/1116] sm:max-w-[380px] md:max-w-[320px]">
              <PortraitFigure style={{ filter: blurFilter }} className="absolute inset-0 h-full w-full" />
            </div>

            <FloatingCard className="w-full max-w-[220px]">
              <ul className="flex flex-col gap-2">
                {TRAITS.map(({ label, Icon }) => (
                  <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]/80">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[#E8C200]" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </FloatingCard>
          </div>

          <div className="flex flex-col items-center md:max-w-xs md:items-start">
            <motion.p variants={fadeUpBlur} className="mt-10 max-w-md text-center text-sm text-[#1A1A1A]/70 md:mt-0 md:text-left">
              {BRAND.subline}
            </motion.p>
            <motion.p variants={fadeUpBlur} className="mt-3 max-w-md text-center text-sm text-[#1A1A1A]/60 md:text-left">
              {BRAND.bio}
            </motion.p>

            <motion.div variants={fadeUpBlur} className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
              <BookCallButton />
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToId('about')}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#E8C200] px-6 py-3 text-sm font-bold text-[#1A1A1A]"
              >
                About Me
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Desktop layout: full-bleed cutout figure, headline over the chest,
          floating cards anchored to the image, corner copy at the base -
          the image blurs as the section scrolls out of view. */}
      <motion.div initial="hidden" animate="visible" variants={heroStagger} className="relative hidden flex-1 lg:block">
        <HeroNav active={active} flyRef={navFly.nodeRef} flyStyle={navFly.style} />

        <PortraitFigure
          style={{ filter: blurFilter }}
          className="absolute bottom-0 left-1/2 h-[108%] -translate-x-1/2"
        />

        <motion.div
          variants={fadeUpBlur}
          className="pointer-events-none absolute inset-x-0 top-[calc(42%+15px)] z-10 flex justify-center px-6"
        >
          <motion.h1
            ref={headlineNodeRef}
            style={headlineFly.style}
            className="max-w-2xl text-center text-[clamp(2.5rem,4.2vw,4rem)] font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
          >
            AI Automation,
            <br />
            Applied Differently.
          </motion.h1>
        </motion.div>

        {/* The fly transform lives on this outer wrapper (position + size)
            so the whole card - border, glass background, shadow - travels
            as one piece, not just the text inside it. */}
        <motion.div
          ref={statsFly.nodeRef}
          style={statsFly.style}
          className="absolute bottom-[20%] left-[10%] z-10 w-[190px] xl:left-[16%]"
        >
          <FloatingCard>
            <span className="block text-4xl font-extrabold tracking-tight text-[#E8C200]">20+</span>
            <span className="text-sm text-[#1A1A1A]/70">Projects</span>
          </FloatingCard>
        </motion.div>

        <motion.div
          ref={traitsFly.nodeRef}
          style={traitsFly.style}
          className="absolute right-[10%] top-[16%] z-10 w-[190px] xl:right-[16%]"
        >
          <FloatingCard>
            <ul className="flex flex-col gap-2">
              {TRAITS.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]/80">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#E8C200]" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </FloatingCard>
        </motion.div>

        <motion.div variants={fadeUpBlur} className="absolute inset-x-0 bottom-[9%] z-10 flex justify-center gap-3">
          <motion.div ref={actionsNodeRef} style={actionsFly.style} className="flex items-center gap-3">
            <BookCallButton />
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToId('about')}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#E8C200] px-6 py-3 text-sm font-bold text-[#1A1A1A]"
            >
              About Me
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.p
          variants={fadeUpBlur}
          className="absolute bottom-[2%] left-[6%] z-10 max-w-[220px] text-sm leading-relaxed text-[#1A1A1A]/70"
        >
          <motion.span ref={sublineNodeRef} style={sublineFly.style} className="block">
            {BRAND.subline}
          </motion.span>
        </motion.p>
        <motion.p
          variants={fadeUpBlur}
          className="absolute bottom-[2%] right-[6%] z-10 max-w-[260px] text-right text-sm leading-relaxed text-[#1A1A1A]/60"
        >
          <motion.span ref={bioNodeRef} style={bioFly.style} className="block">
            {BRAND.bio}
          </motion.span>
        </motion.p>
      </motion.div>
    </section>
  )
})

export default Hero
