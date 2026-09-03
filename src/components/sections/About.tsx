'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { TIMELINE } from '../../data/content'
import type { TimelineEntry } from '../../lib/types'
import { gsap } from '../../lib/gsap'
import { useGsap } from '../../lib/useGsap'
import Avatar from '../Avatar'
import Reveal from '../GsapReveal'
import HeadingReveal from '../HeadingReveal'

// A gentle S-curve rather than a straight drop, echoing the reference's
// meandering connector. preserveAspectRatio="none" lets this thin viewBox
// stretch to the timeline's actual (variable) height.
const TIMELINE_CURVE = 'M10 0 C 16 8, 4 17, 10 25 C 16 33, 4 42, 10 50 C 16 58, 4 67, 10 75 C 16 83, 4 92, 10 100'

interface TimelineCardProps {
  item: TimelineEntry
  onReadMore: (item: TimelineEntry) => void
}

function TimelineCard({ item, onReadMore }: TimelineCardProps) {
  return (
    <div className="rounded-[20px] bg-[#E4E1DA] p-6 sm:max-w-md sm:p-7 lg:max-w-none">
      <span className="block text-5xl font-extrabold leading-none tracking-tight text-[#E8C200] sm:text-6xl">
        {item.year}
      </span>
      <h3 className="mt-3 text-xl font-bold tracking-tight text-[#1A1A1A]">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/65">{item.text}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar name={item.handle} size={32} />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-semibold text-[#1A1A1A]">{item.handle}</p>
            <p className="text-[11px] text-[#1A1A1A]/50">{item.time}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onReadMore(item)}
          className="shrink-0 rounded-full bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-[#E8C200]"
        >
          Read more
        </button>
      </div>
    </div>
  )
}

interface RoleModalProps {
  item: TimelineEntry | null
  onClose: () => void
}

function RoleModal({ item, onClose }: RoleModalProps) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-[20px] bg-[#DCD8CF] p-6 sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-[#E8C200]"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="block text-4xl font-extrabold leading-none tracking-tight text-[#E8C200]">
          {item.year}
        </span>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-[#1A1A1A]">{item.role}</h3>
        <p className="mt-1 text-sm font-medium text-[#1A1A1A]/60">
          {item.company} &middot; {item.period}
        </p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {item.details?.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-[#1A1A1A]/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8C200]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function About() {
  const [activeItem, setActiveItem] = useState<TimelineEntry | null>(null)

  // The connector curve draws itself in and the year markers pop on their
  // pins as you scroll the timeline, both scrubbed to scroll position.
  const timelineRef = useGsap<HTMLDivElement>(({ self }) => {
    // The curve carries vector-effect="non-scaling-stroke" inside a
    // non-uniformly stretched SVG, so its length can't be measured (rules
    // out DrawSVG). pathLength="100" normalises dash math instead - animate
    // the dash offset from a full 100 down to 0 to "draw" it in.
    const accent = self.querySelector<SVGPathElement>('[data-timeline-accent]')
    if (accent) {
      gsap.set(accent, { strokeDasharray: 100 })
      gsap.fromTo(
        accent,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: self,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: 1,
          },
        },
      )
    }

    gsap.utils.toArray<HTMLElement>(self.querySelectorAll('[data-timeline-dot]')).forEach((dot) => {
      gsap.from(dot, {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
        duration: 0.5,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: dot, start: 'top 82%' },
      })
    })
  })

  return (
    <section id="about" className="scroll-mt-20 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <HeadingReveal className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#1A1A1A]">
          About Me <span className="text-[#E8C200]">&amp;</span> My Journey
        </HeadingReveal>
        <Reveal as="p" effect="up" delay={0.1} className="mt-6 max-w-xl text-base leading-[1.7] text-[#1A1A1A]/65">
          From building frontend components as an intern to engineering full automation systems at
          Techgenics - here's how I got here.
        </Reveal>

        <div ref={timelineRef} className="relative mt-20">
          <svg
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-4 -translate-x-1/2 lg:left-1/2"
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
          >
            <path
              d={TIMELINE_CURVE}
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
              className="text-[#1A1A1A]/15"
            />
            <path
              data-timeline-accent
              d={TIMELINE_CURVE}
              pathLength={100}
              stroke="#E8C200"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
          </svg>

          <ul className="flex flex-col gap-14 sm:gap-16">
            {TIMELINE.map((item, i) => (
              <Reveal
                key={item.year}
                as="li"
                effect={i % 2 === 0 ? 'right' : 'left'}
                className="relative grid grid-cols-1 gap-6 pl-12 lg:grid-cols-2 lg:gap-x-16 lg:pl-0"
              >
                <span
                  data-timeline-dot
                  className="absolute left-4 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-4 border-[#DCD8CF] bg-[#E8C200] lg:left-1/2"
                />

                {i % 2 === 0 ? (
                  <>
                    <TimelineCard item={item} onReadMore={setActiveItem} />
                    <div className="hidden lg:block" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" aria-hidden="true" />
                    <TimelineCard item={item} onReadMore={setActiveItem} />
                  </>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <RoleModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  )
}
