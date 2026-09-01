import { TRAITS } from '../../data/content'

export default function TraitsCard({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex flex-wrap gap-1.5 rounded-[20px] p-3 transition-colors duration-300 ${
        dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'
      }`}
    >
      {TRAITS.map(({ label, Icon }) => (
        <span
          key={label}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-300 ${
            dark ? 'bg-white/10 text-white/80' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]/75'
          }`}
        >
          <Icon className="h-3 w-3 shrink-0 text-[#E8C200]" aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  )
}
