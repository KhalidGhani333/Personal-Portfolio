import { useRef } from 'react'
import { MotionConfig, useScroll } from 'framer-motion'
import { NAV_IDS } from '../data/content'
import useActiveSection from '../lib/useActiveSection'
import Sidebar from './sidebar/Sidebar'
import MobileNav from './MobileNav'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import WhatYouGet from './sections/WhatYouGet'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

// Hoisted so it's the same array reference on every render - passing a
// fresh literal here each render was re-triggering framer-motion's scroll
// subscription on every `active` section change, which could leave
// scrollYProgress stuck if that happened to land while heroRef was
// mid-reattach.
const HERO_SCROLL_OFFSET = ['start start', 'end start']

function MainSite() {
  const active = useActiveSection(NAV_IDS)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: HERO_SCROLL_OFFSET })

  // Landing spots for the hero's floating elements as they fly into the
  // sidebar on scroll - filled in by Sidebar, read from Hero. See
  // useFlyToTarget for the math.
  const targetRefs = {
    stats: useRef(null),
    traits: useRef(null),
    nav: useRef(null),
    actions: useRef(null),
    logoMark: useRef(null),
    logoSubline: useRef(null),
    logoBio: useRef(null),
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#DCD8CF]">
        <Sidebar active={active} scrollYProgress={scrollYProgress} targetRefs={targetRefs} />
        <MobileNav active={active} />

        <main className="pb-20 lg:pb-0">
          <Hero ref={heroRef} active={active} scrollYProgress={scrollYProgress} targetRefs={targetRefs} />

          <div className="lg:ml-[240px]">
            <About />
            <Projects />
            <WhatYouGet />
            <FAQ />
            <Footer />
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}

export default MainSite
