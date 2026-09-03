'use client'

import { useRef } from 'react'
import { MotionConfig, useScroll } from 'framer-motion'
import { NAV_IDS } from '../data/content'
import type { TargetRefs } from '../lib/types'
import useActiveSection from '../lib/useActiveSection'
import Sidebar from './sidebar/Sidebar'
import MobileNav from './MobileNav'
import ScrollProgress from './ScrollProgress'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Services from './sections/Services'
import Skills from './sections/Skills'
import WhatYouGet from './sections/WhatYouGet'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

// Hoisted so it's the same array reference on every render - passing a
// fresh literal here each render was re-triggering framer-motion's scroll
// subscription on every `active` section change, which could leave
// scrollYProgress stuck if that happened to land while heroRef was
// mid-reattach.
const HERO_SCROLL_OFFSET: ('start start' | 'end start')[] = ['start start', 'end start']

function MainSite() {
  const active = useActiveSection(NAV_IDS)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: HERO_SCROLL_OFFSET })

  // Landing spots for the hero's floating elements as they fly into the
  // sidebar on scroll - filled in by Sidebar, read from Hero. See
  // useFlyToTarget for the math.
  const targetRefs: TargetRefs = {
    stats: useRef<HTMLDivElement>(null),
    traits: useRef<HTMLDivElement>(null),
    nav: useRef<HTMLDivElement>(null),
    actions: useRef<HTMLDivElement>(null),
    logoMark: useRef<HTMLSpanElement>(null),
    logoSubline: useRef<HTMLParagraphElement>(null),
    logoBio: useRef<HTMLParagraphElement>(null),
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#DCD8CF]">
        <ScrollProgress />
        <Sidebar active={active} scrollYProgress={scrollYProgress} targetRefs={targetRefs} />
        <MobileNav active={active} />

        <main className="pb-20 lg:pb-0">
          <Hero ref={heroRef} active={active} scrollYProgress={scrollYProgress} targetRefs={targetRefs} />

          <div className="lg:ml-[240px]">
            <About />
            <Projects />
            <Services />
            <Skills />
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
