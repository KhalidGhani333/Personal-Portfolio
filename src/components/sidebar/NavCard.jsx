import { NAV_ITEMS } from '../../data/content'
import { scrollToId } from '../../lib/scroll'

export default function NavCard({ active, dark = false }) {
  return (
    <nav
      className={`rounded-[20px] p-3 transition-colors duration-300 ${dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'}`}
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToId(id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex w-full items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#E8C200] text-[#1A1A1A]'
                    : dark
                      ? 'text-white/45 hover:bg-white/10 hover:text-white'
                      : 'text-[#1A1A1A]/45 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden="true" />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
