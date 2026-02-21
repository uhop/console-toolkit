/** @module symbols
 * Unicode characters for drawing lines, tables, charts, and other visual elements.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-symbols}
 */

/** Vertical block elements in 1/8th increments (index 0 = space, 7 = full block). */
export const vBlocks8th: string[];
/** Horizontal block elements in 1/8th increments (index 0 = space, 7 = full block). */
export const hBlocks8th: string[];
/** Full block character (█). */
export const fullBlock: string;

/** Left 1/8th block line. */
export const lLine: string;
/** Right 1/8th block line. */
export const rLine: string;
/** Top 1/8th block line. */
export const tLine: string;
/** Bottom 1/8th block line. */
export const bLine: string;

/** Left half block. */
export const lHalf: string;
/** Right half block. */
export const rHalf: string;
/** Top half block. */
export const tHalf: string;
/** Bottom half block. */
export const bHalf: string;

/** Top-left quadrant block. */
export const tlQuadrant: string;
/** Bottom-left quadrant block. */
export const blQuadrant: string;
/** Top-right quadrant block. */
export const trQuadrant: string;
/** Bottom-right quadrant block. */
export const brQuadrant: string;

/** Top-left + bottom-right diagonal quadrants. */
export const tlBrQuadrants: string;
/** Top-right + bottom-left diagonal quadrants. */
export const trBlQuadrants: string;

/** Negative (inverse) top-left quadrant. */
export const tlNegativeQuadrant: string;
/** Negative (inverse) bottom-left quadrant. */
export const blNegativeQuadrant: string;
/** Negative (inverse) top-right quadrant. */
export const trNegativeQuadrant: string;
/** Negative (inverse) bottom-right quadrant. */
export const brNegativeQuadrant: string;

/** All 16 quadrant block characters indexed by bitmask (TL=1, TR=2, BL=4, BR=8). */
export const quadrants: string[];

/** Returns the quadrant character for the given corner flags.
 * @param tl - Top-left filled.
 * @param tr - Top-right filled.
 * @param bl - Bottom-left filled.
 * @param br - Bottom-right filled.
 * @returns The quadrant block character.
 */
export function quadrant(tl: boolean, tr: boolean, bl: boolean, br: boolean): string;

/** Shade characters from empty to full: space, light, medium, dark, full block. */
export const shades: string[];
/** Light shade character (░). */
export const shadeLight: string;
/** Medium shade character (▒). */
export const shadeMedium: string;
/** Dark shade character (▓). */
export const shadeDark: string;

// ellipses
/** Horizontal ellipsis (…). */
export const hellip: string;
/** Vertical ellipsis (⋮). */
export const vellip: string;
/** Centered triple dots (⋯). */
export const ctdot: string;
/** Up-pointing triple dots (⋰). */
export const utdot: string;
/** Down-pointing triple dots (⋱). */
export const dtdot: string;

/** Alias for `hellip`. */
export {hellip as ellipsis};

// math
/** Infinity symbol (∞). */
export const infinity: string;
/** Plus-minus sign (±). */
export const plusMinus: string;
/** Minus-plus sign (∓). */
export const minusPlus: string;
/** Tilde operator (∼). */
export const tilde: string;
/** Minus sign (−). */
export const minus: string;
/** Multiplication sign (×). */
export const multiplication: string;
/** Division sign (÷). */
export const division: string;
/** N-ary product (∏). */
export const product: string;
/** N-ary summation (∑). */
export const sum: string;
/** For all (∀). */
export const forAll: string;
/** There exists (∃). */
export const exist: string;
/** Degree sign (°). */
export const degree: string;

/** Alias for `multiplication`. */
export {multiplication as times};

/** Superscript plus (⁺). */
export const superscriptPlus: string;
/** Superscript minus (⁻). */
export const superscriptMinus: string;
/** Subscript plus (₊). */
export const subscriptPlus: string;
/** Subscript minus (₋). */
export const subscriptMinus: string;

/** Per mille sign (‰). */
export const permille: string;
/** Per myriad sign (‱). */
export const permyriad: string;

// dashes
/** Hyphen (‐). */
export const hyphen: string;
/** Figure dash (‒). */
export const figureDash: string;
/** En dash (–). */
export const ndash: string;
/** Em dash (—). */
export const mdash: string;
/** Horizontal bar (―). */
export const horbar: string;

// marks
/** Ballot box (☐). */
export const ballotBox: string;
/** Ballot box with check (☑). */
export const ballotBoxChecked: string;
/** Ballot box with bold check (☒-variant). */
export const ballotBoxBoldChecked: string;
/** Ballot box with X (☒). */
export const ballotBoxX: string;

/** Check mark (✓). */
export const checkMark: string;
/** Heavy check mark (✔). */
export const checkMarkHeavy: string;
/** Light check mark (✓-variant). */
export const checkMarkLight: string;

/** Ballot X (✗). */
export const ballotX: string;
/** Heavy ballot X (✘). */
export const ballotXHeavy: string;
/** Light ballot X (✗-variant). */
export const ballotXLight: string;
