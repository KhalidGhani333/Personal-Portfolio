import type { RefObject } from 'react'
import { BRAND } from '../../data/content'
import { GitHubIcon, LinkedInIcon, FacebookIcon } from '../../lib/icons'

const socialLinkClass = (dark: boolean) =>
  `flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#E8C200] hover:text-[#1A1A1A] ${
    dark ? 'bg-white/10 text-white' : 'bg-[#1A1A1A] text-[#DCD8CF]'
  }`

interface LogoCardProps {
  dark?: boolean
  markRef?: RefObject<HTMLSpanElement | null>
  sublineRef?: RefObject<HTMLParagraphElement | null>
  bioRef?: RefObject<HTMLParagraphElement | null>
}

export default function LogoCard({ dark = false, markRef, sublineRef, bioRef }: LogoCardProps) {
  return (
    <div className={`rounded-[20px] p-5 transition-colors duration-300 ${dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'}`}>
      <div className="flex items-center justify-between">
        <span
          ref={markRef}
          className="rounded-md bg-[#E8C200] px-2.5 py-1 text-sm font-extrabold tracking-tight text-[#1A1A1A]"
        >
          {BRAND.mark}
        </span>
        <div className="flex items-center gap-1.5">
          <a
            href={BRAND.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className={socialLinkClass(dark)}
          >
            <GitHubIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={BRAND.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={socialLinkClass(dark)}
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook profile"
            className={socialLinkClass(dark)}
          >
            <FacebookIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <p
        ref={sublineRef}
        className={`mt-3 text-xs font-semibold leading-snug transition-colors duration-300 ${dark ? 'text-white/85' : 'text-[#1A1A1A]/85'}`}
      >
        {BRAND.subline}
      </p>
      <p
        ref={bioRef}
        className={`mt-1.5 text-xs leading-relaxed transition-colors duration-300 ${dark ? 'text-white/60' : 'text-[#1A1A1A]/60'}`}
      >
        {BRAND.bio}
      </p>
    </div>
  )
}
