import type { ComponentType, CSSProperties, RefObject } from 'react'

// Common shape for every icon used across the site: lucide-react icons,
// react-icons (Si*) marks, and the hand-rolled SVGs in lib/icons. All of
// them render an <svg> and accept className / style / strokeWidth.
export type IconComponent = ComponentType<{
  className?: string
  style?: CSSProperties
  strokeWidth?: number | string
  'aria-hidden'?: boolean | 'true' | 'false'
}>

export interface Brand {
  name: string
  mark: string
  tagline: string
  subline: string
  bio: string
  email: string
  whatsapp: string
  github: string
  linkedin: string
  facebook: string
  cta: string
}

export interface Stat {
  value: string
  label: string
  Icon: IconComponent
}

export interface NavItem {
  id: string
  label: string
  Icon: IconComponent
}

export interface TechStackItem {
  Icon: IconComponent
  color: string | null
  label: string
}

export interface Trait {
  label: string
  Icon: IconComponent
}

export interface SkillCategory {
  title: string
  description: string
  skills: TechStackItem[]
}

export interface Service {
  title: string
  description: string
  tags: string[]
  Icon: IconComponent
}

export interface TimelineEntry {
  year: string
  title: string
  text: string
  handle: string
  time: string
  role: string
  company: string
  period: string
  details: string[]
}

export interface FeaturedProject {
  number: string
  name: string
  description: string
  tags: string[]
  link?: string
  image?: string
}

export interface GridProject {
  name: string
  description: string
  tags: string[]
  live: string | null
  github: string | null
  image?: string
  Icon: IconComponent
  tone: number
}

export interface WhatYouGetItem {
  title: string
  text: string
  Icon: IconComponent
}

export interface Faq {
  question: string
  answer: string
}

// Landing spots in the fixed sidebar that the hero's floating elements fly
// into on scroll. Filled in by Sidebar / LogoCard, read by Hero via
// useFlyToTarget.
export interface TargetRefs {
  stats: RefObject<HTMLDivElement | null>
  traits: RefObject<HTMLDivElement | null>
  nav: RefObject<HTMLDivElement | null>
  actions: RefObject<HTMLDivElement | null>
  logoMark: RefObject<HTMLSpanElement | null>
  logoSubline: RefObject<HTMLParagraphElement | null>
  logoBio: RefObject<HTMLParagraphElement | null>
}
