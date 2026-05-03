/** Prefer M, else first listed size, else M. */
export function pickDefaultSize(sizes: string[]): string {
  const preferredSize = sizes.find((size) => size === 'M');
  return preferredSize ?? sizes[0] ?? 'M';
}
