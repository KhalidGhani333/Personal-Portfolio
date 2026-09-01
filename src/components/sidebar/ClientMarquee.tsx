import { TECH_STACK } from '../../data/content'

export default function ClientMarquee({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[15px] py-5 transition-colors duration-300 ${dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'}`}>
      <div className="flex flex-wrap items-center justify-center gap-3 px-3">
        {TECH_STACK.map(({ Icon, color, label }) => (
          <span
            key={label}
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
