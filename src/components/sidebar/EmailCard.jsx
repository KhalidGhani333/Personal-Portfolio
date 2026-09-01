import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { BRAND } from '../../data/content'

export default function EmailCard({ dark = false }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(BRAND.email)
    } catch {
      // clipboard API unavailable; ignore silently
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`relative flex items-center justify-between gap-2 rounded-[20px] p-2 pl-4 transition-colors duration-300 ${
        dark ? 'bg-[#1A1A1A]' : 'bg-[#E4E1DA]'
      }`}
    >
      <span className={`truncate text-xs font-medium transition-colors duration-300 ${dark ? 'text-white/80' : 'text-[#1A1A1A]/80'}`}>
        {BRAND.email}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#E8C200] ${
          dark ? 'bg-white/10' : 'bg-[#1A1A1A]'
        }`}
        aria-label="Copy email address"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
      {copied && (
        <span className="absolute -top-8 right-0 rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-semibold text-[#E8C200]">
          Copied
        </span>
      )}
    </div>
  )
}
