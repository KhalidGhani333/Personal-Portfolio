import { TECH_STACK } from '../../data/content'

// The track is the tech list rendered twice back to back, then animated
// left by exactly 50% of its own width - since both halves are identical,
// the loop point is invisible and the scroll reads as endless.
const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK]

export default function ClientMarquee({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-[15px] py-2.5 transition-colors duration-300 ${dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-6 px-3">
        {MARQUEE_ITEMS.map(({ Icon, color, label }, index) => (
          <span
            key={`${label}-${index}`}
            title={label}
            className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-300 ${
              color ? '' : dark ? 'text-white/70' : 'text-[#1A1A1A]/50'
            }`}
          >
            <Icon className="block h-5 w-5" style={color ? { color } : undefined} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
