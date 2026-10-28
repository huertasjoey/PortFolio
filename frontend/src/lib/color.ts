export type RGB = [number, number, number]

/** Reads "#rgb" or "#rrggbb" (as used by the CSS theme variables). Falls back when it can't parse. */
export const hexToRgb = (value: string, fallback: RGB): RGB => {
  let hex = value.trim().replace('#', '')
  if (hex.length === 3) hex = [...hex].map((c) => c + c).join('') // #111 -> #111111
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback
  const n = parseInt(hex, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
