import { SKILL_CATEGORIES } from '../../data/content'
import Reveal from '../GsapReveal'
import HeadingReveal from '../HeadingReveal'
import Stagger from '../Stagger'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-[#0c0c0b] px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <HeadingReveal className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.03em] text-white">
          Skills <span className="text-[#E8C200]">&amp; Tools</span>
        </HeadingReveal>
        <Reveal as="p" effect="up" delay={0.1} className="mt-4 max-w-xl text-base leading-[1.7] text-white/55">
          The stack behind every automation system and interface I ship.
        </Reveal>

        <div className="mt-14 flex flex-col gap-10">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <Reveal key={category.title} effect={categoryIndex % 2 === 0 ? 'left' : 'right'}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#E8C200]">{category.title}</h3>
              <p className="mt-1 text-sm text-white/45">{category.description}</p>

              <Stagger as="ul" effect="scale" each={0.05} start="top 88%" className="mt-5 flex flex-wrap gap-3">
                {category.skills.map(({ Icon, color, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={color ? { color } : { color: 'white' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-white/80">{label}</span>
                  </li>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
