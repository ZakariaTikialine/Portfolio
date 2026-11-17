/**
 * Input normalization for visitor messages.
 *
 * Invisible characters are listed as numeric code points on purpose: writing them literally (or
 * as escapes that tooling may decode) would put invisible and bidirectional-control characters
 * into the source file itself, the "Trojan Source" problem.
 */
const HIDDEN_RANGES: readonly [number, number][] = [
  [0x0000, 0x0008], // C0 controls (tab 0x09 and newline 0x0a are kept)
  [0x000b, 0x000c],
  [0x000e, 0x001f],
  [0x007f, 0x007f], // delete
  [0x200b, 0x200f], // zero-width space/joiners, LTR/RTL marks
  [0x202a, 0x202e], // bidirectional embedding and override
  [0x2060, 0x2064], // word joiner and invisible operators
  [0x2066, 0x2069], // bidirectional isolates
  [0xfeff, 0xfeff], // byte-order mark / zero-width no-break space
]

function isHidden(codePoint: number): boolean {
  return HIDDEN_RANGES.some(([from, to]) => codePoint >= from && codePoint <= to)
}

/** NFKC folds look-alike characters (full-width letters and similar) before screening. */
export function sanitizeMessage(text: string): string {
  return [...text.normalize("NFKC")]
    .filter((character) => !isHidden(character.codePointAt(0) ?? 0))
    .join("")
    .trim()
}
