import { ArrowUpRight } from 'lucide-react'
import { BRAND } from '../data/content'

const WHATSAPP_URL = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Khalid, I'd like to book a call.")}`

export default function BookCallButton({ className = '', label = 'Book a Call', showIcon = true, ...props }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#E8C200] px-6 py-3 text-sm font-bold text-[#1A1A1A] ${className}`}
      {...props}
    >
      {label}
      {showIcon && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
    </a>
  )
}
