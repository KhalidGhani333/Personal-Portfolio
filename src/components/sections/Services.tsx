import { SERVICES } from '../../data/content'
import Reveal from '../GsapReveal'
import HeadingReveal from '../HeadingReveal'
import Stagger from '../Stagger'

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <HeadingReveal className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.03em] text-[#1A1A1A]">
          What I <span className="text-[#E8C200]">Build</span>
        </HeadingReveal>
        <Reveal
          as="p"
          effect="up"
          delay={0.1}
          className="mt-4 max-w-xl text-base leading-[1.7] text-[#1A1A1A]/65"
        >
          Four things I actually ship - not a padded list of buzzwords.
        </Reveal>

        <Stagger
          as="ul"
          effect="flip"
          each={0.12}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {SERVICES.map(({ title, description, tags, Icon }) => (
            <li key={title} className="rounded-[20px] bg-[#E4E1DA] p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8C200]">
                <Icon className="h-5 w-5 text-[#1A1A1A]" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-[#1A1A1A]">{title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-[#1A1A1A]/65">{description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#1A1A1A]/5 px-2.5 py-1 text-[10px] font-semibold text-[#1A1A1A]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
