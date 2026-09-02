import { useState } from 'react'
import { FileCode2 } from 'lucide-react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiPython,
  SiGithub,
  SiN8N,
  SiSanity,
} from 'react-icons/si'
import { BRAND, FAQS } from '../../data/content'
import { OpenAIIcon, GoHighLevelIcon } from '../../lib/icons'
import type { Faq, IconComponent } from '../../lib/types'
import Reveal from '../GsapReveal'

interface SkillIcon {
  Icon: IconComponent
  color: string
  top: string
  left: string
}

// Skill badges scattered around the giant KHALID wordmark. Position is
// percentage-based (relative to the banner) so it scales with the
// responsive banner height instead of using fixed pixel offsets. Laid out
// as a top row and bottom row so a growing icon set doesn't need re-tuning
// each time - only left offsets need spacing out.
const SKILL_ICONS: SkillIcon[] = [
  // top row
  { Icon: SiReact, color: '#61DAFB', top: '10%', left: '5%' },
  { Icon: SiNextdotjs, color: '#1A1A1A', top: '15%', left: '19%' },
  { Icon: SiTypescript, color: '#3178C6', top: '9%', left: '33%' },
  { Icon: SiTailwindcss, color: '#38BDF8', top: '14%', left: '50%' },
  { Icon: SiJavascript, color: '#F7DF1E', top: '9%', left: '67%' },
  { Icon: SiNodedotjs, color: '#339933', top: '15%', left: '81%' },
  { Icon: SiHtml5, color: '#E34F26', top: '10%', left: '95%' },
  // bottom row
  { Icon: SiCss, color: '#1572B6', top: '88%', left: '10%' },
  { Icon: SiPython, color: '#3776AB', top: '84%', left: '20%' },
  { Icon: OpenAIIcon, color: '#1A1A1A', top: '90%', left: '30%' },
  { Icon: SiGithub, color: '#1A1A1A', top: '88%', left: '40%' },
  { Icon: GoHighLevelIcon, color: '#E8C200', top: '84%', left: '50%' },
  { Icon: SiN8N, color: '#EA4B71', top: '90%', left: '60%' },
  { Icon: OpenAIIcon, color: '#1A1A1A', top: '88%', left: '70%' },
  { Icon: SiSanity, color: '#F03E2F', top: '84%', left: '80%' },
  { Icon: FileCode2, color: '#E8C200', top: '90%', left: '90%' },
]

function SkillBadge({ Icon, color, top, left }: SkillIcon) {
  return (
    <span
      style={{ top, left }}
      className="absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DCD8CF] shadow-md sm:h-12 sm:w-12"
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} aria-hidden="true" />
    </span>
  )
}

function AccordionItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-[20px] bg-[#E4E1DA]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-bold tracking-tight text-[#1A1A1A]">{faq.question}</span>
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]">
          <span className="absolute h-0.5 w-3.5 rounded-full bg-[#E8C200]" aria-hidden="true" />
          {!open && <span className="absolute h-3.5 w-0.5 rounded-full bg-[#E8C200]" aria-hidden="true" />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="pt-4 text-sm leading-[1.7] text-[#1A1A1A]/65">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden pb-24 pt-12 sm:pb-32">
      <div className="relative flex h-40 select-none items-center justify-center sm:h-56 lg:h-64">
        <span
          aria-hidden="true"
          className="whitespace-nowrap text-[22vw] font-extrabold leading-none tracking-tighter text-[#E8C200] lg:text-[min(16vw,13rem)]"
        >
          {BRAND.mark}
        </span>
        {SKILL_ICONS.map((skill) => (
          <SkillBadge key={`${skill.top}-${skill.left}`} {...skill} />
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <Reveal
          as="span"
          effect="up"
          className="inline-block rounded-full bg-[#E8C200] px-4 py-1.5 text-xs font-bold text-[#1A1A1A]"
        >
          FAQ
        </Reveal>
        <Reveal
          as="h2"
          effect="up"
          delay={0.1}
          className="mt-6 text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.03em] text-[#1A1A1A]"
        >
          Got any questions?
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} effect={index % 2 === 0 ? 'right' : 'left'}>
              <AccordionItem faq={faq} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
