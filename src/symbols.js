/** @module symbols
 * A collection of frequently used Unicode characters for drawing lines, tables, charts, and other visual elements.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-symbols}
 */

const generateSequence = (base, from, to) => {
  const result = [];

  let step;
  if (from < to) {
    step = 1;
    ++to; // to make inclusive
  } else {
    step = -1;
    --to; // to make inclusive
  }

  for (let i = from; i != to; i += step) result.push(String.fromCodePoint(base + i));
  return result;
};

// blocks

/** Vertical block elements in 1/8th increments (index 0 = space, 7 = full block).
 * @type {string[]}
 */
export const vBlocks8th = [' ', ...generateSequence(0x2581, 0, 7)];
/** Horizontal block elements in 1/8th increments (index 0 = space, 7 = full block).
 * @type {string[]}
 */
export const hBlocks8th = [' ', ...generateSequence(0x2588, 7, 0, -1)];
/** Full block character (█). */
export const fullBlock = '\u{2588}';

/** Left 1/8th block line. */
export const lLine = hBlocks8th[1];
/** Right 1/8th block line. */
export const rLine = `\u{2595}`;
/** Top 1/8th block line. */
export const tLine = `\u{2594}`;
/** Bottom 1/8th block line. */
export const bLine = vBlocks8th[1];

/** Left half block. */
export const lHalf = hBlocks8th[4];
/** Right half block. */
export const rHalf = `\u{2590}`;
/** Top half block. */
export const tHalf = `\u{2580}`;
/** Bottom half block. */
export const bHalf = vBlocks8th[4];

/** Top-left quadrant block. */
export const tlQuadrant = '\u{2598}';
/** Bottom-left quadrant block. */
export const blQuadrant = '\u{2596}';
/** Top-right quadrant block. */
export const trQuadrant = '\u{259D}';
/** Bottom-right quadrant block. */
export const brQuadrant = '\u{2597}';

/** Top-left + bottom-right diagonal quadrants. */
export const tlBrQuadrants = `\u{259A}`;
/** Top-right + bottom-left diagonal quadrants. */
export const trBlQuadrants = `\u{259E}`;

/** Negative (inverse) top-left quadrant. */
export const tlNegativeQuadrant = '\u{259F}';
/** Negative (inverse) bottom-left quadrant. */
export const blNegativeQuadrant = '\u{259C}';
/** Negative (inverse) top-right quadrant. */
export const trNegativeQuadrant = '\u{2599}';
/** Negative (inverse) bottom-right quadrant. */
export const brNegativeQuadrant = '\u{259B}';

/** All 16 quadrant block characters indexed by bitmask (TL=1, TR=2, BL=4, BR=8).
 * @type {string[]}
 */
export const quadrants = [
  ' ',
  tlQuadrant,
  trQuadrant,
  tHalf,
  blQuadrant,
  lHalf,
  trBlQuadrants,
  brNegativeQuadrant,
  brQuadrant,
  tlBrQuadrants,
  rHalf,
  blNegativeQuadrant,
  bHalf,
  trNegativeQuadrant,
  tlNegativeQuadrant,
  fullBlock
];

/** Returns the quadrant character for the given corner flags.
 * @param {boolean} tl - Top-left.
 * @param {boolean} tr - Top-right.
 * @param {boolean} bl - Bottom-left.
 * @param {boolean} br - Bottom-right.
 * @returns {string}
 */
export const quadrant = (tl, tr, bl, br) => quadrants[(tl ? 1 : 0) + (tr ? 2 : 0) + (bl ? 4 : 0) + (br ? 8 : 0)];

// shades

/** Shade characters from empty to full: space, light, medium, dark, full block.
 * @type {string[]}
 */
export const shades = [' ', ...generateSequence(0x2591, 0, 2), fullBlock];

/** Light shade character (░). */
export const shadeLight = shades[1];
/** Medium shade character (▒). */
export const shadeMedium = shades[2];
/** Dark shade character (▓). */
export const shadeDark = shades[3];

// ellipses

/** Horizontal ellipsis (…). */
export const hellip = '\u{2026}';
/** Vertical ellipsis (⋮). */
export const vellip = '\u{22EE}';
/** Centered triple dots (⋯). */
export const ctdot = '\u{22EF}';
/** Up-pointing triple dots (⋰). */
export const utdot = '\u{22F0}';
/** Down-pointing triple dots (⋱). */
export const dtdot = '\u{22F1}';

export {hellip as ellipsis};

// math

/** Infinity symbol (∞). */
export const infinity = '\u{221e}';
/** Plus-minus sign (±). */
export const plusMinus = '\u{00B1}';
/** Minus-plus sign (∓). */
export const minusPlus = '\u{2213}';
/** Tilde operator (∼). */
export const tilde = '\u{223C}';
/** Minus sign (−). */
export const minus = '\u{2212}';
/** Multiplication sign (×). */
export const multiplication = '\u{00D7}';
/** Division sign (÷). */
export const division = '\u{00F7}';
/** N-ary product (∏). */
export const product = '\u{220F}';
/** N-ary summation (∑). */
export const sum = '\u{2211}';
/** For all (∀). */
export const forAll = '\u{2200}';
/** There exists (∃). */
export const exist = '\u{2203}';
/** Degree sign (°). */
export const degree = '\u{00B0}';

export {multiplication as times};

/** Superscript plus (⁺). */
export const superscriptPlus = '\u{207A}';
/** Superscript minus (⁻). */
export const superscriptMinus = '\u{207B}';
/** Subscript plus (₊). */
export const subscriptPlus = '\u{208A}';
/** Subscript minus (₋). */
export const subscriptMinus = '\u{208B}';

/** Per mille sign (‰). */
export const permille = '\u{2030}';
/** Per myriad sign (‱). */
export const permyriad = '\u{2031}';

// dashes

/** Hyphen (‐). */
export const hyphen = '\u{2010}';
/** Figure dash (‒). */
export const figureDash = '\u{2012}';
/** En dash (–). */
export const ndash = '\u{2013}';
/** Em dash (—). */
export const mdash = '\u{2014}';
/** Horizontal bar (―). */
export const horbar = '\u{2015}';

// marks

/** Ballot box (☐). */
export const ballotBox = '\u{2610}';
/** Ballot box with check (☑). */
export const ballotBoxChecked = '\u{2611}';
/** Ballot box with bold check (🗹). */
export const ballotBoxBoldChecked = '\u{1f5f9}';
/** Ballot box with X (☒). */
export const ballotBoxX = '\u{2612}';

/** Check mark (✓). */
export const checkMark = '\u{2713}';
/** Heavy check mark (✔). */
export const checkMarkHeavy = '\u{2714}';
/** Light check mark (🗸). */
export const checkMarkLight = '\u{1f5f8}';

/** Ballot X (✖). */
export const ballotX = '\u{2716}';
/** Heavy ballot X (✗). */
export const ballotXHeavy = '\u{2717}';
/** Light ballot X (🗷). */
export const ballotXLight = '\u{1f5f7}';
