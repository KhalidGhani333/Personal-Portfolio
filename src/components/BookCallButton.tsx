'use client'

import { useRef, type ComponentPropsWithoutRef, type MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BRAND } from '../data/content'
import { gsap } from '../lib/gsap'

const WHATSAPP_URL = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Khalid, I'd like to book a call.")}`

interface BookCallButtonProps extends ComponentPropsWithoutRef<'a'> {
  label?: string
  showIcon?: boolean
}

// How far the button follows the cursor, as a fraction of the cursor's
// offset from center - this is the site's primary CTA and appears in every
// section, so it gets the one "always on" bold touch rather than a
// scroll-triggered one.
const MAGNETIC_STRENGTH = 0.35

export default function BookCallButton({
  className = '',
  label = 'Book a Call',
  showIcon = true,
  ...props
}: BookCallButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const bounds = el.getBoundingClientRect()
    const x = (e.clientX - bounds.left - bounds.width / 2) * MAGNETIC_STRENGTH
    const y = (e.clientY - bounds.top - bounds.height / 2) * MAGNETIC_STRENGTH
    gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <a
      ref={ref}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#E8C200] px-6 py-3 text-sm font-bold text-[#1A1A1A] ${className}`}
      {...props}
    >
      {label}
      {showIcon && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
    </a>
  )
}
