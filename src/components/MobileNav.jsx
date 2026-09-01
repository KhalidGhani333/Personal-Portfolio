import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BRAND, NAV_ITEMS } from '../data/content'
import { scrollToId } from '../lib/scroll'
import BookCallButton from './BookCallButton'

export default function MobileNav({ active }) {
  const [open, setOpen] = useState(false)
  const dark = active === 'projects'

  function handleNavClick(id) {
    setOpen(false)
    setTimeout(() => scrollToId(id), 50)
  }

  return (
    <div className="lg:hidden">
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 backdrop-blur transition-colors duration-300 ${
          dark ? 'bg-[#0c0c0b]/90' : 'bg-[#DCD8CF]/90'
        }`}
      >
        <span className="rounded-md bg-[#E8C200] px-2.5 py-1 text-sm font-extrabold tracking-tight text-[#1A1A1A]">
          {BRAND.mark}
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-[#E8C200]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#DCD8CF] p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-[#E8C200] px-2.5 py-1 text-sm font-extrabold tracking-tight text-[#1A1A1A]">
              {BRAND.mark}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-[#E8C200]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col justify-center gap-2" aria-label="Section navigation">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = active === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNavClick(id)}
                  className={`flex items-center gap-4 rounded-full px-5 py-4 text-lg font-semibold transition-colors hover:text-[#1A1A1A] ${
                    isActive ? 'bg-[#E8C200] text-[#1A1A1A]' : 'text-[#1A1A1A]/50'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </nav>

          <BookCallButton className="w-full" />
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1A1A1A]/10 bg-[#DCD8CF]/95 p-3 backdrop-blur">
        <BookCallButton className="w-full" />
      </div>
    </div>
  )
}
