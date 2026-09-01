import { STATS } from '../../data/content'

export default function StatsCard({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 rounded-[20px] p-5 transition-colors duration-300 ${
        dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'
      }`}
    >
      {STATS.map(({ value, label, Icon }) => (
        <div key={label} className="flex flex-col gap-1">
          <Icon className="h-4 w-4 text-[#E8C200]" strokeWidth={2.5} aria-hidden="true" />
          <span className="text-2xl font-extrabold tracking-tight text-[#E8C200]">{value}</span>
          <span className={`text-[11px] leading-tight transition-colors duration-300 ${dark ? 'text-white/60' : 'text-[#1A1A1A]/60'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
