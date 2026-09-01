const PALETTE = ['#1A1A1A', '#3A3A38', '#54524A']

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Avatar({ name, size = 44, className = '' }) {
  const bg = PALETTE[hashString(name) % PALETTE.length]
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-[#E8C200] ${className}`}
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.36 }}
      role="img"
      aria-label={`${name} avatar`}
    >
      {initials(name)}
    </div>
  )
}
