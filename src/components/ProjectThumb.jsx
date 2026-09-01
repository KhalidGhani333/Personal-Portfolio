import { FRONTEND_TONES } from '../data/content'

// Generated cover art for a project card - no photo/screenshot exists for
// these, so each thumbnail is a deterministic gradient (picked via `tone`)
// with the project's tech icon and initials, rendered as inline SVG rather
// than a shipped image asset.
export default function ProjectThumb({ name, Icon, tone = 0, className = '' }) {
  const [from, to] = FRONTEND_TONES[tone % FRONTEND_TONES.length]
  const gradientId = `thumb-${tone}`
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      role="img"
      aria-label={`${name} cover art`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${gradientId})`} />
      <text
        x="24"
        y="200"
        fontFamily="Poppins, sans-serif"
        fontWeight="800"
        fontSize="88"
        fill="#ffffff"
        fillOpacity="0.14"
      >
        {initials}
      </text>
      {Icon && (
        <foreignObject x="140" y="70" width="120" height="120">
          <div className="flex h-full w-full items-center justify-center">
            <Icon className="h-14 w-14 text-white/90" strokeWidth={1.5} />
          </div>
        </foreignObject>
      )}
    </svg>
  )
}
