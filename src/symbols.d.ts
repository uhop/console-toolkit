/** @module symbols
 * Unicode characters for drawing lines, tables, charts, and other visual elements.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-symbols}
 */

/** Vertical block elements in 1/8th increments (index 0 = space, 7 = full block). */
export const vBlocks8th: string[];
/** Horizontal block elements in 1/8th increments (index 0 = space, 7 = full block). */
export const hBlocks8th: string[];
export const fullBlock: string;

export const lLine: string;
export const rLine: string;
export const tLine: string;
export const bLine: string;

export const lHalf: string;
export const rHalf: string;
export const tHalf: string;
export const bHalf: string;

export const tlQuadrant: string;
export const blQuadrant: string;
export const trQuadrant: string;
export const brQuadrant: string;

export const tlBrQuadrants: string;
export const trBlQuadrants: string;

export const tlNegativeQuadrant: string;
export const blNegativeQuadrant: string;
export const trNegativeQuadrant: string;
export const brNegativeQuadrant: string;

/** All 16 quadrant block characters indexed by bitmask (TL=1, TR=2, BL=4, BR=8). */
export const quadrants: string[];

/** Returns the quadrant character for the given corner flags. */
export function quadrant(tl: boolean, tr: boolean, bl: boolean, br: boolean): string;

/** Shade characters from empty to full: space, light, medium, dark, full block. */
export const shades: string[];
export const shadeLight: string;
export const shadeMedium: string;
export const shadeDark: string;

// ellipses
export const hellip: string;
export const vellip: string;
export const ctdot: string;
export const utdot: string;
export const dtdot: string;

export {hellip as ellipsis};

// math
export const infinity: string;
export const plusMinus: string;
export const minusPlus: string;
export const tilde: string;
export const minus: string;
export const multiplication: string;
export const division: string;
export const product: string;
export const sum: string;
export const forAll: string;
export const exist: string;
export const degree: string;

export {multiplication as times};

export const superscriptPlus: string;
export const superscriptMinus: string;
export const subscriptPlus: string;
export const subscriptMinus: string;

export const permille: string;
export const permyriad: string;

// dashes
export const hyphen: string;
export const figureDash: string;
export const ndash: string;
export const mdash: string;
export const horbar: string;

// marks
export const ballotBox: string;
export const ballotBoxChecked: string;
export const ballotBoxBoldChecked: string;
export const ballotBoxX: string;

export const checkMark: string;
export const checkMarkHeavy: string;
export const checkMarkLight: string;

export const ballotX: string;
export const ballotXHeavy: string;
export const ballotXLight: string;
