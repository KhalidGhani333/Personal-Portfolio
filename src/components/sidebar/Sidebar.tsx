import { useState } from 'react'
import { motion, useMotionValueEvent, type MotionValue } from 'framer-motion'
import type { TargetRefs } from '../../lib/types'
import LogoCard from './LogoCard'
import StatsCard from './StatsCard'
import TraitsCard from './TraitsCard'
import NavCard from './NavCard'
import ClientMarquee from './ClientMarquee'
import EmailCard from './EmailCard'
import BookCallButton from '../BookCallButton'
import { scrollToId } from '../../lib/scroll'

// Kept in sync with the fadeStart/fadeEnd defaults in useFlyToTarget so the
// hero elements dissolve into these cards at the same rate they land.
const LANDING_START = 0.45
const LANDING_END = 0.92

// Derived from committed React state (not a live-bound motion value) so the
// sidebar's "visible for the rest of the page" state can never get stuck -
// once `progress` has been reported past the hero, opacity/x stay pinned at
// their resting values regardless of anything that happens to the
// underlying scroll subscription afterwards.
interface SidebarProps {
  active: string
  scrollYProgress: MotionValue<number>
  targetRefs: TargetRefs
}

export default function Sidebar({ active, scrollYProgress, targetRefs }: SidebarProps) {
  const dark = active === 'projects' || active === 'skills'
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', setProgress)

  const t = Math.min(1, Math.max(0, (progress - LANDING_START) / (LANDING_END - LANDING_START)))
  const interactive = progress > LANDING_START

  return (
    <motion.aside
      aria-hidden={!interactive}
      style={{ opacity: t, x: -24 * (1 - t) }}
      className={`no-scrollbar fixed inset-y-0 left-0 z-30 hidden w-[240px] flex-col gap-2 overflow-y-auto p-3 transition-colors duration-500 ease-out lg:flex ${
        dark ? 'bg-[#0c0c0b]' : 'bg-transparent'
      } ${interactive ? '' : 'pointer-events-none'}`}
    >
      <LogoCard
        dark={dark}
        markRef={targetRefs?.logoMark}
        sublineRef={targetRefs?.logoSubline}
        bioRef={targetRefs?.logoBio}
      />
      <div ref={targetRefs?.stats}>
        <StatsCard dark={dark} />
      </div>
      <div ref={targetRefs?.traits}>
        <TraitsCard dark={dark} />
      </div>
      <div ref={targetRefs?.nav}>
        <NavCard active={active} dark={dark} />
      </div>
      <ClientMarquee dark={dark} />
      <EmailCard dark={dark} />
      <div ref={targetRefs?.actions} className="flex gap-2">
        <BookCallButton className="flex-1 !px-3 !text-xs" showIcon={false} />
        <button
          type="button"
          onClick={() => scrollToId('about')}
          className={`flex-1 rounded-full border-2 border-[#E8C200] px-3 py-3 text-xs font-bold transition-transform hover:scale-[1.03] ${
            dark ? 'text-white' : 'text-[#1A1A1A]'
          }`}
        >
          About Me
        </button>
      </div>
    </motion.aside>
  )
}
