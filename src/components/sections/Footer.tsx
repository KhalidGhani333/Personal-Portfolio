import { BRAND } from '../../data/content'
import { GitHubIcon, LinkedInIcon, FacebookIcon } from '../../lib/icons'
import BookCallButton from '../BookCallButton'
import Reveal from '../GsapReveal'
import HeadingReveal from '../HeadingReveal'
import Stagger from '../Stagger'

const socialLinkClass =
  'flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E8C200] hover:text-[#1A1A1A]'

export default function Footer() {
  return (
    <footer id="book-a-call" className="scroll-mt-20 px-4 pb-8 pt-16 lg:pb-16">
      <Reveal effect="scale" className="mx-auto flex max-w-5xl flex-col items-start gap-8 rounded-[20px] bg-[#1A1A1A] p-8 sm:p-12">
        <HeadingReveal className="text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
          Let&apos;s build something.
        </HeadingReveal>

        <BookCallButton />

        <Stagger
          as="div"
          effect="up"
          each={0.08}
          start="top 90%"
          className="flex w-full flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <a href={`mailto:${BRAND.email}`} className="text-sm font-medium text-white/70 hover:text-white">
            {BRAND.email}
          </a>

          <div className="flex items-center gap-3">
            <a href={BRAND.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className={socialLinkClass}>
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a href={BRAND.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className={socialLinkClass}>
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a href={BRAND.facebook} target="_blank" rel="noreferrer" aria-label="Facebook profile" className={socialLinkClass}>
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {BRAND.mark}. All rights reserved.</p>
        </Stagger>
      </Reveal>
    </footer>
  )
}
